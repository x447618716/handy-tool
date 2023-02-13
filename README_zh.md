[中文](./README_zh.md) | [English](./README.md)

## handy-tool

快速通用的JavaScript/node.js实用程序函数。

## API

* [JSONP](./doc/jsonp/zh.md) 用于实现jsonp请求
* [Storage](./doc/storage/zh.md) 用于本地存储安全加密
* [Base64](./doc/base64/zh.md) 用于Base64加解密
* [DataFormat](./doc/dataFormat/zh.md) 用于数据操作


## 安装
```shell script
npm i handy-tool --save
``` 


## 使用(以 Base64 为例)

```shell script
import handyTool from "handy-tool"

let encode = handyTool.base64.encode("123456");
console.log(encode)
let decode = handyTool.base64.decode(encode)
console.log(decode)
``` 
Or
```shell script
import {encode,decode} from "handy-tool"

let encodeString = encode("123456");
console.log(encodeString)
let decodeString = decode(encodeString)
console.log(decodeString)
```
