declare const window: any;

const formatParams = (data: object | undefined) => {
  let arr = [];
  for (let name in data) {
    arr.push(
      `${encodeURIComponent(name)}=${encodeURIComponent(
        data[name as keyof typeof data]
      )}`
    );
  }
  return arr.length ? `&${arr.join("&")}` : "";
};

export const jsonpRequest = (
  url: string,
  options: {
    data?: object;
    timeout?: number;
    callbackKey?: string;
    callbackName?: string;
    success?: (data: any) => void;
    fail?: (error: any) => void;
  }
) => {
  return new Promise((resolve, reject) => {
    if (!url) {
      throw new Error("请求地址不能为空！");
    }

    //创建 script 标签并加入到页面中
    let callbackName: string = ("jsonp_" + Math.random()).replace(".", "");
    let oHead = document.getElementsByTagName("head")[0];
    let params = formatParams(options.data);
    let oS: any = document.createElement("script");
    oHead.appendChild(oS);
    oS.onerror = (e: any) => {
      reject(e);
      options.fail && options.fail(e);
    };

    //创建jsonp回调函数
    window[options.callbackName ? options.callbackName : callbackName] =
      function (json: any) {
        oHead.removeChild(oS);
        clearTimeout(oS.timer);
        window[options.callbackName ? options.callbackName : callbackName] =
          null;
        options.success && options.success(json);
        resolve(json);
      };

    //发送请求
    if (url.search(/\?/g) != -1) {
      oS.src =
        url +
        `&${options.callbackKey ? options.callbackKey : "jsonp"}=${
          options.callbackName ? options.callbackName : callbackName
        }` +
        params;
    } else {
      oS.src =
        url +
        `?${options.callbackKey ? options.callbackKey : "jsonp"}=${
          options.callbackName ? options.callbackName : callbackName
        }` +
        params;
    }

    //超时处理
    if (options.timeout) {
      oS.timer = setTimeout(function () {
        window[options.callbackName ? options.callbackName : callbackName] =
          null;
        oHead.removeChild(oS);
        options.fail && options.fail({ message: "Time out" });
        reject({ message: "Time out" });
      }, options.timeout);
    }
  });
};

export default jsonpRequest;
