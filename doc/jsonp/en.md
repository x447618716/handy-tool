[中文](./zh.md) | [English](./en.md)

## jsonpRequest

Used to implement jsonp requests

## Install
```shell script
npm i handy-tool --save
``` 

## Usage

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

- `url` (`String`) url to fetch
- `opts` (`Object`), optional
  - `data` (`Object`) Request parameters
  - `timeout` (`Number`) Set timeout
  - `callbackKey` (`String`) key for the global callback functions that handle jsonp responses (defaults to `jsonp`)
  - `callbackName` (`String`) name of the global callback functions that handle jsonp response (defaults to `jsonp_`+ random)
  - `success` (`Function`) Callback method for successful request
  - `fail` (`Function`) Callback method for request failure


