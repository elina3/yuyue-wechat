/**
 * Created by 18262 on 2017/9/1.
 */
/**
 * [tools 帮助对象 提供公共方法 ]
 * @type {Object}
 */
const tools = {};
//(function() {
/**
 * 可以补充注释
 * @returns {boolean}
 */
tools.isWeiXin = function () {
    return window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger' ? true : false;
}
/**
 *
 * @param text
 * @param defaultValue
 * @returns {number|*|Number}
 */
tools.toNumber = function (text, defaultValue) {
    return +text || defaultValue || NaN;
}
/**
 *将需要存储的对象存到session中
 * @param key  键
 * @param value  值
 */
tools.setSessionStorage = function (key, value) {
    window.sessionStorage.setItem(key, value);
}
/**
 * 将需要存储的对象存到storage中
 * @param key
 * @param value
 */
tools.setLocalStorage = function (key, value) {
    window.localStorage.setItem(key, value);
}

/**
 * 从session中取出存的值
 * @param key
 */
tools.getSessionStorage = function (key) {
    return window.sessionStorage.getItem(key)
}
/**
 * 从storage中取出存的值
 * @param key
 */
tools.getLocalStorage = function (key) {
    return window.localStorage.getItem(key)
}
/**
 * 将当前键对应的值从session中清除
 * @param key
 */
tools.clearSessionStorage = function (key) {
    window.sessionStorage.removeItem(key);
}
/**
 * 从cookie中取出值
 * @param key
 * @returns {null}
 */
tools.getCookie = function (key) {
    var arr, reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) return unescape(arr[2]); else return null;
}
/**
 * 将需要的对象存储到cookie中
 * @param key
 * @param value
 */
tools.setcookie = function (key, value) {
    var expdate = new Date();
    expdate.setTime(expdate.getTime() + 30 * 60 * 1000);
    document.cookie = key + "=" + value + ";expires=" + expdate.toGMTString() + ";path=/";
}

/**
 * [isUndefined 是否是未定义的]
 * @param  {Anyone}  obj [要判断的参数]
 * @return {Boolean}     [true: 是undefined]
 */
tools.isUndefined = function (obj) {
    return (typeof (obj) == "undefined");
}

/**
 * [isNull 是否是null]
 * @param  {Anyone}  obj [要判断的参数]
 * @return {Boolean}     [true: 是null]
 */
tools.isNull = function (obj) {
    return (obj === null);
}

/**
 * [isUndefinedOrNull 是否是未定义的或者为空]
 * @param  {Anyone}  obj [要判断的参数]
 * @return {Boolean}     [true: 是undefineded or null]
 */
tools.isUndefinedOrNull = function (obj) {
    // return (tools.isUndefined(obj) || tools.isNull(obj));
    return (obj == null);
}

/**
 * [isValidUrlParam Url参数是否有效]
 * @param  {string}  param [要判断的参数]
 * @return {Boolean}     [true:有效,false:无效]
 */
tools.isValidUrlParam = function(param){
    return param &&  param !== 'undefined' && param !== 'null';
};

/**
 * [isString 是否是字符串]
 * @param  {anyone}  str [要判断的参数]
 * @return {Boolean}     [true:是String]
 */
tools.isString = function (str) {
    return (typeof (str) == "string");
}

/**
 * [isRightString 是否是正确的字符串]
 * @param  {anyone}  str [要判断的参数]
 * @return {Boolean}     [true:是字符串]
 */
tools.isRightString = function (str) {
    return (tools.isString(str) && str.length > 0);
};

/**
 * [isRightNumber 是否是正确的数字]
 * @param  {anyone}  num [要判断的参数]
 * @return {Boolean}     [true:是正确Number]
 */
tools.isRightNumber = function (num) {
    return (!tools.isUndefinedOrNull(num) && !isNaN(num));
};

/**
 * [isObject 是不是对象]
 * @param  {anyone}  obj [参数]
 * @return {Boolean}     [true:是对象]
 */
tools.isObject = function (obj) {
    return (typeof (obj) == "object");
};

/**
 * [isArray 是否是数组]
 * @param  {anyone}  arr [要判断的参数]
 * @return {Boolean}     [true:是Array]
 */
tools.isArray = function (arr) {
    return (tools.isObject(arr) && arr instanceof Array);
}

/**
 * [isRightArray 是否是正确的数组]
 * @param  {anyone}  arr [要判断的参数]
 * @return {Boolean}     [true:是正确的Array]
 */
tools.isRightArray = function (arr) {
    return (tools.isArray(arr) && arr.length > 0);
}

/**
 * [setNullDefault 将对象中的null空值置为def(私有方法)]
 * @param  {anyone}  arr [要判断的参数]
 * @return {Boolean}     [true:是正确的Array]
 */
tools.setNullDefault = function (obj, def) {
    if (tools.isArray(obj)) {//是数组?
        obj.forEach(function (data, index) {//遍历数组
            for (var key in data) {
                if (tools.isNull(data[key])) {//属性值为空?
                    data[key] = def;
                }
            }
        });

        return obj;
    }

    if (tools.isObject(obj)) {//是普通对象
        for (var key in obj) {
            if (tools.isNull(obj[key])) {//属性值为空?
                obj[key] = def;
            }
        }
    }

    return obj;
};

/**
 * [setNullOrUndefinedDefault 将对象中的null或undefined空值置为def]
 * @param  {anyone}  arr [要判断的参数]
 * @return {Boolean}     [true:是正确的Array]
 */
tools.setNullOrUndefinedDefault = function (obj, def) {
    if (tools.isArray(obj)) {//是数组?
        obj.forEach(function (data, index) {//遍历数组
            for (var key in data) {
                if (tools.isUndefinedOrNull(data[key])) {//属性值为空?
                    data[key] = def;
                }
            }
        });

        return obj;
    }

    if (tools.isObject(obj)) {//是普通对象
        for (var key in obj) {
            if (tools.isUndefinedOrNull(obj[key])) {//属性值为空?
                obj[key] = def;
            }
        }
    }

    return obj;
};

/**
 * [setNullAllDefault 将对象中的null空值(包括字符串)置为def(私有方法)]
 * @param  {anyone}  arr [要判断的参数]
 * @return {Boolean}     [true:是正确的Array]
 */
tools.setNullAllDefault = function (obj, def) {
    if (tools.isArray(obj)) {//是数组?
        obj.forEach(function (data, index) { //遍历数组
            for (var key in data) {
                if (tools.isNull(data[key]) || data[key] == "null") {//属性值为空?
                    data[key] = def;
                }
            }
        });

        return obj;
    }

    if (tools.isObject(obj)) {//是普通对象
        for (var key in obj) {
            if (tools.isNull(obj[key]) || obj[key] == "null") {//属性值为空?
                obj[key] = def;
            }
        }
    }

    return obj;
};

/**
 * [setNullOrUndefinedAllDefault 将对象中的null或undefined空值(包括字符串)置为def]
 * @param  {anyone}  arr [要判断的参数]
 * @return {Boolean}     [true:是正确的Array]
 */
tools.setNullOrUndefinedAllDefault = function (obj, def) {
    if (tools.isArray(obj)) {//是数组?
        obj.forEach(function (data, index) {//遍历数组
            for (var key in data) {
                if (tools.isUndefinedOrNull(data[key]) || data[key] == "null" || data[key] == "undefined") {//属性值为空?
                    data[key] = def;
                }
            }
        });

        return obj;
    }

    if (tools.isObject(obj)) {//是普通对象
        for (var key in obj) {
            if (tools.isUndefinedOrNull(obj[key]) || obj[key] == "null" || data[key] == "undefined") {//属性值为空?
                obj[key] = def;
            }
        }
    }

    return obj;
};

/**
 * [isEmptyObject 是否是空对象]
 * @param  {anyone}  arr [要判断的参数]
 * @return {Boolean}     [true:是空对象]
 */
tools.isEmptyObject = function (obj) {
    if (tools.isObject(obj)) {//是对象?
        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {//排除原型链上的属性
                return false;//不是空对象
            }
        }
        return true;//说明是空对象啦
    }

    return false;
};

/**
 * [isEmpty 是否是空(包含undefined, null, 空对象)]
 * @param  {anyone}  obj [要判断的参数]
 * @return {Boolean}     [true:是空]
 */
tools.isEmpty = function (obj) {
    return (tools.isUndefinedOrNull(obj) || tools.isEmptyObject(obj));
};

/**
 * [trim 去除左右空字符]
 * @param  {String} str [替换字符]
 * @return {String|Anyone}     [去除空格后的字符串或者原值]
 */
tools.trim = function (str) {
    if (tools.isRightString(str)) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }

    return str;
};

/**
 * [lTrim 去除左空字符]
 * @param  {String} str [替换字符]
 * @return {String|Anyone}     [去除左空格后的字符串或者原值]
 */
tools.lTrim = function (str) {
    if (tools.isRightString(str)) {
        return str.replace(/(^\s*)/g, "");
    }

    return str;
};

/**
 * [rTrim 去除右空字符]
 * @param  {String} str [替换字符]
 * @return {String|Anyone}     [去除右空格后的字符串或者原值]
 */
tools.rTrim = function (str) {
    if (tools.isRightString(str)) {
        return str.replace(/(\s*$)/g, "");
    }
    return str;
}
/**
 * [timeStamp2String 格式化时间]
 * @param  {String} time [需要格式化的时间]
 * @param  {String} type [需要格式化的类型]
 * @return {String| 顾锦华}     [返回的日期格式类型]
 */
tools.timeStamp2String = function (time, type) {
    var datetime = new Date();
    if (0 !== time) {
        //datetime.setTime(time);
        datetime = time;
    }
    if (typeof time === 'string') {
        //替换日期中的-为/
        time = time.replace(/-/g, '/');
        datetime = new Date(time);
    }
    if (typeof time === 'number' && 0 !== time) {
        datetime = new Date(time);
    }
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    var hour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
    var minute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
    var second = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
    var day = datetime.getDay();
    //返回周几 周日为0
    if (type === 'datetime') {
        return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    }
    //年月日时分秒 年以2位 
    if (type === 'datetime2') {
        return year.toString().substr(2, 2) + "" + month + "" + date + "" + hour + "" + minute + "" + second;
    }
    if (type === 'date') {
        return year + "-" + month + "-" + date;
    }
    if (type === 'date2') {
        return year + month + date;
    }
    if (type === 'time') {
        return (hour + ":" + minute + ' ') + ((hour <= 12) ? 'AM' : 'PM');
    }
    if (type === 'time_2') {
        return (hour + ":" + minute + ' ');
    }
    if (type === 'day') {
        return day == 0 ? 7 : day;
    }
    if (type === 'month') {
        return month;
    }
    if (type === 'year') {
        return year;
    }
    if (type === 'month-day') {
        return month + "-" + date;
    }
    if (type === 'month+day') {
        return month + "月" + date + "日";
    }
    if (type === 'birthday') {
        return year + month + date;
    }
}
/**
 * 
 * [changeDate 返回最近3天、7天、30天的日期字符串]
 * @param  {String} days [需要格式化的时间]
 * @param  {String} type [需要格式化的类型]
 * @return {String| 顾锦华}     [返回的日期格式类型]
 */
tools.changeDate = function (days, type) {
    var today = new Date(); // 获取今天时间
    var begin, end;
    if (days === 1) {
        today.setTime(today.getTime());

        var begin_year = today.getFullYear();
        var begin_month = today.getMonth() + 1 < 10 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1;
        var begin_date = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();

        var end_year = new Date().getFullYear();
        var end_month = new Date().getMonth() + 1 < 10 ? "0" + (new Date().getMonth() + 1) : new Date().getMonth() + 1;
        var end_date = new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate();

        begin = begin_year + "-" + begin_month + "-" + begin_date;
        end = end_year + "-" + end_month + "-" + end_date;
        // begin = today.format('yyyy-MM-dd');
        // end = new Date().format('yyyy-MM-dd');   //format不能使用
    } else if (days === 3) {
        today.setTime(today.getTime() - 3 * 24 * 3600 * 1000);

        var begin_year = today.getFullYear();
        var begin_month = today.getMonth() + 1 < 10 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1;
        var begin_date = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();

        var end_year = new Date().getFullYear();
        var end_month = new Date().getMonth() + 1 < 10 ? "0" + (new Date().getMonth() + 1) : new Date().getMonth() + 1;
        var end_date = new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate();

        begin = begin_year + "-" + begin_month + "-" + begin_date;
        end = end_year + "-" + end_month + "-" + end_date;

        // begin = today.format('yyyy-MM-dd');
        // end = new Date().format('yyyy-MM-dd');

    } else if (days === 7) {
        today.setTime(today.getTime() - 7 * 24 * 3600 * 1000);

        var begin_year = today.getFullYear();
        var begin_month = today.getMonth() + 1 < 10 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1;
        var begin_date = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();

        var end_year = new Date().getFullYear();
        var end_month = new Date().getMonth() + 1 < 10 ? "0" + (new Date().getMonth() + 1) : new Date().getMonth() + 1;
        var end_date = new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate();

        begin = begin_year + "-" + begin_month + "-" + begin_date;
        end = end_year + "-" + end_month + "-" + end_date;
        // begin = today.format('yyyy-MM-dd');
        // end = new Date().format('yyyy-MM-dd');
    } else if (days === 30) {
        today.setTime(today.getTime() - 30 * 24 * 3600 * 1000);

        var begin_year = today.getFullYear();
        var begin_month = today.getMonth() + 1 < 10 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1;
        var begin_date = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();

        var end_year = new Date().getFullYear();
        var end_month = new Date().getMonth() + 1 < 10 ? "0" + (new Date().getMonth() + 1) : new Date().getMonth() + 1;
        var end_date = new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate();

        begin = begin_year + "-" + begin_month + "-" + begin_date;
        end = end_year + "-" + end_month + "-" + end_date;
        // begin = today.format('yyyy-MM-dd');
        // end = new Date().format('yyyy-MM-dd');
    }
    if (typeof type != 'undefined' && type == 1) {
        return begin;
    }
    return end;
};

tools.isJsonString = function (str) {
    try {
        var obj = JSON.parse(str);
        if (typeof obj == "object" && obj !== null) {
            return true;
        }
    } catch (e) { }
    return false;
}
/**
 * 
 * [contains 判断一个值在不在当前数组中]
 * @param  {Array} arr [检测数组]
 * @param  {string} obj [值]
 */
tools.contains = function (arr, obj) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
}
/**
 * 打开弹窗
 */
tools.toast = function(msg){
    var duration = 3000;
    var locationId = 'toastFollow';
    if(msg.hasOwnProperty('duration')){
        duration = msg.duration;
    }
    if(msg.hasOwnProperty('location')){
        var location = msg.location;
        if(location == 'top'){
            locationId = 'toastTop';
        }
        if(location == 'middle'){
            locationId = 'toastMiddle';
        }
    }
    var d = dialog({
        align: 'top',
        follow: document.getElementById(locationId),
        // content: msg.msg,
        innerHTML:"<label style='background-color:#ccc;font-size:20px;border-radius:5px;padding:10px 20px'>"+msg.msg+"</label>",
        'zIndex':99999
    });
    d.width(200);
    d.show();
    setTimeout(function () {
        d.close().remove();
    }, duration);
}
//})();
export default tools
