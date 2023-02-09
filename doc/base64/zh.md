[中文](./zh.md) | [English](./en.md)

## API

* **encode** Base64 加密函数
* **decode** Base64 解密函数
* **utf8Encode** utf8 加密函数
* **utf8Decode** utf8 解密函数


## 使用

```shell script
import handyTool from "handy-tool"

let encode = handyTool.base64.encode("123456");
console.log(encode)
let decode = handyTool.base64.decode(encode)
console.log(decode)

let utf8encode = handyTool.base64.utf8Encode("123456");
console.log(utf8encode)
let utf8decode = handyTool.base64.utf8Decode(utf8encode)
console.log(utf8decode)
``` 
Or
```shell script
import {encode,decode,utf8Encode,utf8Decode} from "handy-tool"

let encodeString = encode("123456");
console.log(encodeString)
let decodeString = decode(encodeString)
console.log(decodeString)

let utf8encodeString = utf8Encode("123456");
console.log(utf8encodeString)
let utf8decodeString = utf8Decode(utf8encodeString)
console.log(utf8decodeString  )

```
