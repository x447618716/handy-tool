export * from './storage';
export * from './base64';
import storage from './storage';
declare const _default: {
    storage: typeof storage;
    base64: {
        encode: (e: string) => string;
        decode: (e: string) => string;
        _utf8Encode: (e: string) => string;
        _utf8Decode: (e: string) => string;
    };
};
export default _default;
