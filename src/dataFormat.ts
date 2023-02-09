export interface size {
  index: number;
  separator?: string | number | null | undefined;
}

/**
 * 数据分割
 * */
export const division = (
  source: string | number,
  option: {
    size: number | Array<size>;
    separator?: string;
  }
) => {
  if (source) {
    let startData = source.toString().split("");
    if (typeof option.size == "number") {
      let length = Math.floor(startData.length / option.size);
      let length2 = (option.separator || "").toString().length;
      for (let i = 1; i <= length; i++) {
        startData.splice(
          i * option.size + (i - 1) * length2,
          0,
          option.separator || ""
        );
      }
      return startData.join("");
    } else if (Array.isArray(option.size)) {
      let length = 0;
      option.size.forEach((item) => {
        startData.splice(
          item.index + length,
          0,
          (item.separator as string) || option.separator || ""
        );
        length += (item.separator || option.separator || "").toString().length;
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
    separator?: string;
    size: number | Array<size>;
  }
) => {
  if (source) {
    let startData = source.toString().split("");
    if (typeof option.size == "number") {
      let length = Math.floor(startData.length / option.size);
      let length2 = (option.separator || "").toString().length;
      for (let i = 1; i <= length; i++) {
        startData.splice(i * option.size, length2);
      }
      return startData.join("");
    } else if (Array.isArray(option.size)) {
      option.size.forEach((item) => {
        let length = (item.separator || option.separator || "").toString()
          .length;
        if (item.index > startData.length) {
          startData.splice(startData.length - 1, length);
        } else {
          startData.splice(item.index, length);
        }
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
  reduction
};
