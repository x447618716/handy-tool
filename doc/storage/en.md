[中文](./zh.md) | [English](./en.md)

## SecureStorage

Secure data with high level of encryption and data compression.

## Features

* Secure data with various types of encryption including AES, DES, Rabbit and RC4. (defaults to Base64 encoding).
* Compress data before storing it to save extra bytes (defaults to true).


## Install
```shell script
npm i handy-tool --save
``` 

## Usage

```shell script
import handyTool from "handy-tool"

let secure = new handyTool.SecureStorage()
secure.setItem("key", "sdjklajsdkj")
console.log(secure.getItem('key'))
``` 

Or

```shell script
import {SecureStorage} from "handy-tool"

let secure = new SecureStorage()
secure.setItem("key", "sdjklajsdkj")
console.log(secure.getItem('key'))
``` 


## API

###  Create an instance / reference before using.

```shell script
let secure = new SecureStorage()
```

`Contructor` accepts a configurable `Object` with all three keys being optional.


| Config Keys              | default        | accepts                                  |
| ------------------------ |----------------|------------------------------------------|
| **encodingType**         | Base64         | `base64`/`aes`/`des`/`rabbit`/`rc4`/`''` |
| **isCompression**        | `true`         | `true`/`false`                           |
| **encryptionSecret**     | " "            | String                                   |
| **isProduction**  | `true`         | `true`/`false`                                |
| **storage**  | `localStorage` | `localStorage`/`sessionStorage`            |

**Note:** `encryptionSecret` will only be used for the Encryption and Decryption of data
with `AES`, `DES`, `RC4`, `RABBIT`, and the library will discard it if no encoding / Base64
encoding method is choosen.


#### Methods

* **`setItem`**
Saves `data` in specifed `key` in Storage. If the key is not provided, the library will warn.

```shell script
secure.setItem('key-name','123456')
```

* **`getItem`**
Gets `data` back from specified `key` from the Storage library. If the key is not provided, the library will warn.

```shell script
secure.getItem('key-name')
```

* **`removeItem`**
Removes the value of a key from the Storage. 

```shell script
secure.removeItem('key-name')
```

* **`clear`**
Removes all the keys ever created for that particular domain.

```shell script
secure.clear()
```
