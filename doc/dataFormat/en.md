[中文](./zh.md) | [English](./en.md)

## Install
```shell script
npm i handy-tool --save
```

## API

###  division(source, option)  

Data separation function

- `source` (`String | Number`) Source data
- `option` (`Object`), Required
    - `separator` (`String`) separation character (defaults to `''`)
    - `size` (`Number | Object`) When the type is Number, the separator is used according to the proportional length; When it is an object, it is separated by the separator at the specified position
      - `index` (`Number`)  Specify the location of the split. According to the data source index, if the data source is 123, the specified location index is 1, and the separator is&, the return result is 1&23
      - `separator` (`String`) separation character。 Optional Select if not specified `option.separator`

###  reduction(source, option)

Data restore function

- `source` (`String | Number`) Source data
- `option` (`Object`), Required
    - `deleteCount` (`Number`) Number of characters to be cleared (defaults to `0`)
    - `size` (`Number | Object`) When the type is Number, clear the specified number of characters according to the proportional length; When it is Object, clear the specified number of characters by the specified position
      - `index` (`Number`)  Specify the location of the purge. According to the data source index, if the data source is 1&23, the specified position index is 1, and the number of characters to be reduced to 1, the return result is 123
      - `deleteCount` (`Number`) Number of characters to clear。 Optional Select if not specified `option.deleteCount`

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

