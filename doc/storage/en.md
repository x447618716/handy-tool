## Storage

Secure data with high level of encryption and data compression.

## Features

* Secure data with various types of encryption including AES, DES, Rabbit and RC4. (defaults to Base64 encoding).
* Compress data before storing it to save extra bytes (defaults to true).

## Usage

```shell script
import handyTool from "handy-tool"

let encode = handyTool.base64.encode("123456");
console.log(encode)
let decode = handyTool.base64.decode(encode)
console.log(decode)
``` 
