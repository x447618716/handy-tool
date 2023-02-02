import Base64 from './base64';
import CryptoJS from "crypto-js"
import constants from "./store/constants";
import LZString from "lz-string/";
import AES from "crypto-js/aes";
import DES from "crypto-js/tripledes";
import RABBIT from 'crypto-js/rabbit';
import RC4 from 'crypto-js/rc4';

interface config {
    isCompression: boolean;
    encryptionSecret: any;
    production: boolean;
    encodingType: string;
    storage: any
}

export default class Secure {
    private config: { isCompression: boolean; encryptionSecret: any; production: boolean; encodingType: string; storage: any };
    private constants: any;
    private _isBase64: any;
    private _isAES: boolean | undefined;
    private _isRabbit: boolean | undefined;
    private _isDES: boolean | undefined;
    private _isRC4: boolean | undefined;
    private _isCompression: boolean | undefined;

    constructor({
                    encodingType,
                    encryptionSecret,
                    isCompression,
                    production,
                    storage
                }: { isCompression: boolean, production: boolean, storage: Storage, encodingType: string, encryptionSecret: string }) {
        this.constants = constants;

        this.config = {
            isCompression: isCompression ? Boolean(isCompression) : true,
            production: production ? Boolean(production) : true,
            storage: storage || window.localStorage,
            encodingType: encodingType ? encodingType.toLowerCase() : 'base64',
            encryptionSecret: encryptionSecret
        };

        this.init();
    }

    init() {
        if (!this._checkType()) {
            throw new Error(`不支持[${this.config.encodingType}]的编码类型,可选编码类型有: ${Object.values(this.constants.encodingType).join(',')}`)
        }

        if (!this._checkStorage()) {
            throw new Error(`不支持[${this.config.storage}]的存储类型,可选存储类型有: window.sessionStorage 与 window.localStorage`)
        }

        this._isBase64 = this._isBase64EncryptionType();
        this._isAES = this._isAESEncryptionType();
        this._isDES = this._isDESEncryptionType();
        this._isRabbit = this._isRabbitEncryptionType();
        this._isRC4 = this._isRC4EncryptionType();
        this._isCompression = this._isDataCompressionEnabled();
    }

    _checkType() {
        return Object.values(this.constants.encodingType).includes(this.config.encodingType)
    }

    _checkStorage() {
        return Object.prototype.toString.call(this.config.storage) === '[object Storage]'
    }

    _isBase64EncryptionType() {
        return Base64 && this.config.encodingType === this.constants.encodingType.BASE64
    };

    _isAESEncryptionType() {
        return AES && (this.config.encodingType === this.constants.encodingType.AES);
    };

    _isDESEncryptionType() {
        return DES && (this.config.encodingType === this.constants.encodingType.DES);
    };

    _isRabbitEncryptionType() {
        return RABBIT && (this.config.encodingType === this.constants.encodingType.RABBIT);
    };

    _isRC4EncryptionType() {
        return RC4 && (this.config.encodingType === this.constants.encodingType.RC4);
    };

    _isDataCompressionEnabled() {
        return this.config.isCompression;
    }

    get(key: any) {
        if (!key) {
            throw new Error(`未提供关键的Key`)
            return;
        }
        let decodedData = '',
            jsonData = '',
            deCompressedData,
            bytes,
            data;

        data = this.config.storage.getItem(key);

        if (!data) {
            return jsonData;
        }

        if (this.config.production) {
            deCompressedData = data;
            if (this._isCompression) {
                deCompressedData = LZString.decompressFromUTF16(data);
            }

            decodedData = deCompressedData;
            if (this._isBase64) {
                decodedData = Base64.decode(deCompressedData);
            } else {
                if (this._isAES) {
                    bytes = AES.decrypt(deCompressedData.toString(), this.config.encryptionSecret || this.constants.encryptionSecret);
                } else if (this._isDES) {
                    bytes = DES.decrypt(deCompressedData.toString(), this.config.encryptionSecret || this.constants.encryptionSecret);
                } else if (this._isRabbit) {
                    bytes = RABBIT.decrypt(deCompressedData.toString(), this.config.encryptionSecret || this.constants.encryptionSecret);
                } else if (this._isRC4) {
                    bytes = RC4.decrypt(deCompressedData.toString(), this.config.encryptionSecret || this.constants.encryptionSecret);
                }

                if (bytes) {
                    decodedData = bytes.toString(CryptoJS.enc.Utf8);
                }
            }

            try {
                jsonData = JSON.parse(decodedData);
            } catch (e) {
                throw new Error('Could not parse JSON');
            }

            return jsonData;
        } else {
            return data;
        }
    }

    set(key: string, data: any):void {
        if (!key) {
            throw new Error(`未提供关键的Key！`)
            return;
        }
        if (this.config.production) {
            if (data === null || data === undefined || data === '') {
                return;
            }

            let jsonData, encodedData, compressedData;

            try {
                jsonData = JSON.stringify(data);
            } catch (e) {
                throw new Error('Could not stringify data.');
            }


            encodedData = jsonData;
            if (this._isBase64) {
                encodedData = Base64.encode(jsonData);
            } else {
                if (this._isAES) {
                    encodedData = AES.encrypt(jsonData, this.config.encryptionSecret || this.constants.encryptionSecret);
                } else if (this._isDES) {
                    encodedData = DES.encrypt(jsonData, this.config.encryptionSecret || this.constants.encryptionSecret);
                } else if (this._isRabbit) {
                    encodedData = RABBIT.encrypt(jsonData, this.config.encryptionSecret || this.constants.encryptionSecret);
                } else if (this._isRC4) {
                    encodedData = RC4.encrypt(jsonData, this.config.encryptionSecret || this.constants.encryptionSecret);
                }

                encodedData = encodedData && encodedData.toString();
            }

            compressedData = encodedData;
            if (this._isCompression) {
                compressedData = LZString.compressToUTF16(encodedData);
            }
            this.config.storage.setItem(key, compressedData)
        } else {
            this.config.storage.setItem(key, data)
        }
    }

    remove(key: string) {
        if (!key) {
            throw new Error(`未提供关键的Key`)
            return;
        }
        return this.config.storage.removeItem(key)
    }

    removeAll() {
        return this.config.storage.clear()
    }
}
