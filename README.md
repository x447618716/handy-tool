[中文](./README_zh.md) | [English](./README.md)

## handy-tool 

A set of fast and universal JavaScript/node.js utility functions.

## API

* [JSONP](./doc/jsonp/en.md) for to initiate jsonp requests
* [Storage](./doc/storage/en.md) for local storage security encryption
* [Base64](./doc/base64/en.md) for Base64 encryption and decryption
* [DataFormat](./doc/dataFormat/en.md) for Base64 encryption and decryption


## Install
```shell script
npm i handy-tool --save
``` 


## Usage(Take base64 as an example)

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
