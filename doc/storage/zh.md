[中文](./zh.md) | [English](./en.md)

## SecureStorage

使用高级加密和数据压缩保护数据。

## 特征

* 使用各种类型的加密保护数据，包括`AES`,`DES`,`Rabbit` 和 `RC4`.(默认编码为 `Base64`)
* 在将数据存储之前压缩数据以节省额外的字节（默认为true）。


## 安装
```shell script
npm i handy-tool --save
``` 

## 使用

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

###  使用前创建一个实例/引用。

```shell script
let secure = new SecureStorage()
```

`Contructor`接受一个可选配置对象


| 配置键                  | 默认             | 接受                                       |
|----------------------|----------------|------------------------------------------|
| **encodingType**     | Base64         | `base64`/`aes`/`des`/`rabbit`/`rc4`/`''` |
| **isCompression**    | `true`         | `true`/`false`                           |
| **encryptionSecret** | " "            | String                                   |
| **isProduction**     | `true`         | `true`/`false`                           |
| **storage**          | `localStorage` | `localStorage`/`sessionStorage`          |

**注意:** `encryptionSecret` 只会用于数据的加解密类型为 `AES`, `DES`, `RC4`, `RABBIT`,  如果没有选择编码方式或者编码方式为 `Base64`,库将丢弃它.


#### 方法

* **`setItem`**
保存`data`在指定`key`的存储中。如果未提供密钥，库将发出警告。

```shell script
secure.setItem('key-name','123456')
```

* **`getItem`**
`data`从指定`key`的存储库中获取。如果未提供密钥，库将发出警告。

```shell script
secure.getItem('key-name')
```

* **`removeItem`**
从存储中删除密钥的值。

```shell script
secure.removeItem('key-name')
```

* **`clear`**
删除为该特定域创建的所有密钥。

```shell script
secure.clear()
```
