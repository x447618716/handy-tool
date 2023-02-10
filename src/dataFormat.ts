export interface divisionSize {
  index: number;
  separator?: string;
}

export interface reductionSize {
  index: number;
  deleteCount?: number;
}

/**
 * 数据分割
 * */
export const division = (
  source: string | number,
  option: {
    size: number | Array<divisionSize>;
    separator?: string;
  }
) => {
  if (source) {
    let startData = source.toString().split("");
    if (typeof option.size == "number") {
      let length = Math.floor(startData.length / option.size);
      for (let i = 1; i <= length; i++) {
        startData.splice(i * option.size + (i - 1), 0, option.separator || "");
      }
      return startData.join("");
    } else if (Array.isArray(option.size)) {
      let length = 0;
      option.size.forEach((item) => {
        startData.splice(
          item.index + length,
          0,
          item.separator || option.separator || ""
        );
        length += 1;
      });
      return startData.join("");
    } else {
      return new Error("size 类型应为数字或数组对象！");
    }
  } else {
    return source;
  }
};

/**
 * 数据还原
 * */
export const reduction = (
  source: string | number,
  option: {
    deleteCount?: number;
    size: number | Array<reductionSize>;
  }
) => {
  if (source) {
    let startData = source.toString().split("");
    if (typeof option.size == "number") {
      let length = Math.floor(startData.length / option.size);
      for (let i = 1; i <= length; i++) {
        startData.splice(i * option.size, option.deleteCount || 0);
      }
      return startData.join("");
    } else if (Array.isArray(option.size)) {
      let length = 0;
      option.size.forEach((item) => {
        startData.splice(
          item.index - length,
          item.deleteCount || option.deleteCount || 0
        );
        length += item.deleteCount || option.deleteCount || 0;
      });
      return startData.join("");
    } else {
      return new Error("size 类型应为数字或数组对象！");
    }
  } else {
    return source;
  }
};

export default {
  division,
  reduction,
};
