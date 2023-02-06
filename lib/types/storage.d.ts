export default class Storage {
    private config;
    constructor(config?: {
        isCompression?: boolean;
        production?: boolean;
        storage?: any;
        encodingType?: string;
        encryptionSecret?: string;
    });
    init(): void;
    _checkType(): boolean;
    _checkStorage(): boolean;
    _decryptType(encodingType: string, data: any): string;
    _encryptType(encodingType: string, data: any): string;
    getItem(key: string): any;
    setItem(key: string, data: any): void;
    removeItem(key: string): void;
    clear(): void;
}
