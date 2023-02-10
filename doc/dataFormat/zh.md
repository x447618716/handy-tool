[中文](./zh.md) | [English](./en.md)

## 安装
```shell script
npm i handy-tool --save
```

## API

###  division(source, option)

数据按指定分隔符分割

- `source` (`String | Number`) 数据源
- `option` (`Object`), 必填
    - `separator` (`String`) 分隔符 (默认为 `''`)
    - `size` (`Number | Object`) 当类型为Number时，按等比长度使用分隔符分割；当为Object时，按指定位置使用分隔符分割
        - `index` (`Number`)  指定分割的位置。 按数据源索引 如数据源为 123， 指定位置index为 1，分割符为& 那么返回结果为 1&23
        - `separator` (`String`) 分隔符。 可选， 如果未指定选用 `option.separator`

###  reduction(source, option)

Data restore function

- `source` (`String | Number`) 数据源
- `option` (`Object`), 必填
    - `deleteCount` (`Number`) 要被清除的字符数 (默认为 `0`)
    - `size` (`Number | Object`) 当类型为Number时，按等比长度清除指定的字符数；当为Object时，按指定位置清除指定的字符数
        - `index` (`Number`)  指定清除的位置。 按数据源索引 如数据源为 1&23， 指定位置index为 1，需减少字符数为 1  那么返回结果为 123
        - `deleteCount` (`Number`) 要清除的字符数。 可选， 如果未指定选用 `option.deleteCount`

## Usage

```shell script
import handyTool from "handy-tool"

handyTool.dataFormat.division(source,option)
handyTool.dataFormat.reduction(source,option)

let data = handyTool.dataFormat.division(95624578451475, {
  separator: ' ', size: 4
});
console.log(data) //9562 4578 4514 75
let data2 = handyTool.dataFormat.reduction(data, {
  deleteCount: 1, size: 4
})
console.log(data2) //95624578451475
```
Or
```shell script
import {reduction,division} from "handy-tool"

division(source,option)
reduction(source,option)

let data = division(95624578451475, {
  separator: ' ', size: 4
});
console.log(data) //9562 4578 4514 75
let data2 = reduction(data, {
  deleteCount: 1, size: 4
})
console.log(data2) //95624578451475
```
