[中文](./zh.md) | [English](./en.md)

## jsonpRequest

用于实现jsonp请求

## 安装
```shell script
npm i handy-tool --save
``` 

## 使用

```shell script
import handyTool from "handy-tool"

handyTool.jsonpRequest(url,opts)

#or

handyTool.jsonpRequest(url).then().catch()
```
Or
```shell script
import {jsonpRequest} from "handy-tool"

jsonpRequest(url,opts)

#or

jsonpRequest(url).then().catch()
```

## API

###  jsonpRequest(url, opts)

- `url` (`String`) jsonp请求地址
- `opts` (`Object`), 可选
    - `data` (`Object`) 请求参数自动拼接到请求地址
    - `timeout` (`Number`) 设置超时时间
    - `callbackKey` (`String`) 处理jsonp响应的全局回调函数的键（默认为`jsonp`）
    - `callbackName` (`String`) 处理jsonp响应的全局回调函数的名称（默认为`jsonp_`+ 随机数）
    - `success` (`Function`) 请求成功回调函数
    - `fail` (`Function`) 请求失败回调函数


