import Base64 from "./base64";
import CryptoJS from "crypto-js";
import LZString from "lz-string/";
import AES from "crypto-js/aes";
import DES from "crypto-js/tripledes";
import RABBIT from "crypto-js/rabbit";
import RC4 from "crypto-js/rc4";

const constants = {
  encodingType: {
    BASE64: "base64",
    AES: "aes",
    DES: "des",
    RABBIT: "rabbit",
    RC4: "rc4",
  },
  encryptionSecret: "",
};

export class Storage {
  private readonly config: {
    isCompression: boolean;
    encryptionSecret: string;
    production: boolean;
    encodingType: string;
    storage: any;
  };

  constructor(config?: {
    isCompression?: boolean;
    production?: boolean;
    storage?: any;
    encodingType?: string;
    encryptionSecret?: string;
  }) {
    this.config = {
      isCompression:
        config && config.isCompression ? Boolean(config.isCompression) : true,
      production:
        config && config.production ? Boolean(config.production) : true,
      storage: (config && config.storage) || window.localStorage,
      encodingType:
        config && config.encodingType
          ? config.encodingType.toLowerCase()
          : "base64",
      encryptionSecret:
        config && config.encryptionSecret ? config.encryptionSecret : "",
    };

    this.init();
  }

  private init() {
    if (!this._checkType()) {
      throw new Error(
        `不支持[${
          this.config.encodingType
        }]的编码类型,可选编码类型有: ${Object.values(
          constants.encodingType
        ).join(",")}`
      );
    }

    if (!this._checkStorage()) {
      throw new Error(
        `不支持[${this.config.storage}]的存储类型,可选存储类型有: window.sessionStorage 与 window.localStorage`
      );
    }
  }

  private _checkType() {
    return Object.values(constants.encodingType).includes(
      this.config.encodingType
    );
  }

  private _checkStorage() {
    return (
      Object.prototype.toString.call(this.config.storage) === "[object Storage]"
    );
  }

  private _decryptType(encodingType: string, data: any): string {
    let decodedData: string = "",
      bytes: any,
      deCompressedData = data;
    if (this.config.isCompression) {
      deCompressedData = LZString.decompressFromUTF16(data);
    }
    switch (encodingType) {
      case constants.encodingType.BASE64:
        decodedData = Base64.decode(deCompressedData);
        break;
      case constants.encodingType.AES:
        bytes = AES.decrypt(
          deCompressedData.toString(),
          this.config.encryptionSecret || constants.encryptionSecret
        );
        break;
      case constants.encodingType.DES:
        bytes = DES.decrypt(
          deCompressedData.toString(),
          this.config.encryptionSecret || constants.encryptionSecret
        );
        break;
      case constants.encodingType.RABBIT:
        bytes = RABBIT.decrypt(
          deCompressedData.toString(),
          this.config.encryptionSecret || constants.encryptionSecret
        );
        break;
      case constants.encodingType.RC4:
        bytes = RC4.decrypt(
          deCompressedData.toString(),
          this.config.encryptionSecret || constants.encryptionSecret
        );
        break;
    }
    if (bytes) {
      decodedData = bytes.toString(CryptoJS.enc.Utf8);
    }

    return decodedData;
  }

  private _encryptType(encodingType: string, data: any) {
    let encodedData: string = "",
      compressedData;
    switch (encodingType) {
      case constants.encodingType.BASE64:
        encodedData = Base64.encode(data);
        break;
      case constants.encodingType.AES:
        encodedData = AES.encrypt(
          data,
          this.config.encryptionSecret || constants.encryptionSecret
        ).toString();
        break;
      case constants.encodingType.DES:
        encodedData = DES.encrypt(
          data,
          this.config.encryptionSecret || constants.encryptionSecret
        ).toString();
        break;
      case constants.encodingType.RABBIT:
        encodedData = RABBIT.encrypt(
          data,
          this.config.encryptionSecret || constants.encryptionSecret
        ).toString();
        break;
      case constants.encodingType.RC4:
        encodedData = RC4.encrypt(
          data,
          this.config.encryptionSecret || constants.encryptionSecret
        ).toString();
        break;
    }
    compressedData = encodedData;
    if (this.config.isCompression) {
      compressedData = LZString.compressToUTF16(encodedData);
    }
    return compressedData;
  }

  getItem(key: string) {
    let jsonData = "",
      data;

    if (!key) {
      throw new Error(`未提供关键的Key`);
      return;
    }

    data = this.config.storage.getItem(key);

    if (!data) {
      return jsonData;
    }

    if (this.config.production) {
      try {
        jsonData = JSON.parse(
          this._decryptType(this.config.encodingType, data)
        );
      } catch (e) {
        throw new Error("Could not parse JSON");
      }

      return jsonData;
    } else {
      return data;
    }
  }

  setItem(key: string, data: any): void {
    if (!key) {
      throw new Error(`未提供关键的Key！`);
      return;
    }
    if (this.config.production) {
      if (data === null || data === undefined || data === "") {
        return;
      }

      let jsonData, compressedData;

      try {
        jsonData = JSON.stringify(data);
      } catch (e) {
        throw new Error("Could not stringify data.");
      }

      compressedData = this._encryptType(this.config.encodingType, jsonData);

      this.config.storage.setItem(key, compressedData);
    } else {
      this.config.storage.setItem(key, data);
    }
  }

  removeItem(key: string): void {
    if (!key) {
      throw new Error(`未提供关键的Key`);
      return;
    }
    return this.config.storage.removeItem(key);
  }

  clear(): void {
    return this.config.storage.clear();
  }
}

export default Storage;
