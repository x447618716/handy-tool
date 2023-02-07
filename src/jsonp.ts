interface options {
    url: string,
    data: object,
    time?: number,
    callbackKey?: string,
    callbackName?: string,
    success?: (json: any) => void,
    fail?: (json: any) => void
}

const formatParams = (data: object) => {
    let arr = [];
    for (let name in data) {
        arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name as keyof typeof data]));
    }
    return arr.join('&');
}

export const jsonp = (options: options) => {
    return new Promise((resolve, reject) => {
        if (!options.url) {
            throw new Error("参数不合法");
        }

        //创建 script 标签并加入到页面中
        let window: any;
        let timer: any;
        let callbackName: string = ('jsonp_' + Math.random()).replace(".", "");
        let oHead = document.getElementsByTagName('head')[0];
        let params = formatParams(options.data);
        let oS = document.createElement('script');
        oHead.appendChild(oS);
        oS.onerror = (e) => {
            reject(e);
            options.fail && options.fail(e);
        };

        //创建jsonp回调函数
        window[options.callbackName ? options.callbackName : callbackName] = function (json: any) {
            oHead.removeChild(oS);
            clearTimeout(timer);
            window[options.callbackName ? options.callbackName : callbackName] = null;
            options.success && options.success(json);
            resolve(json)
        };

        //发送请求
        if (options.url.search(/\?/g) != -1) {
            oS.src = options.url + `&${options.callbackKey ? options.callbackKey : 'jsonp'}=${options.callbackName ? options.callbackName : callbackName}` + params;
        } else {
            oS.src = options.url + `?${options.callbackKey ? options.callbackKey : 'jsonp'}=${callbackName}` + params;
        }

        //超时处理
        if (options.time) {
            timer = setTimeout(function () {
                window[options.callbackName ? options.callbackName : callbackName] = null;
                oHead.removeChild(oS);
                options.fail && options.fail({message: "Time out"});
                reject({message: "Time out"})
            }, options.time);
        }

    })
}

export default jsonp
