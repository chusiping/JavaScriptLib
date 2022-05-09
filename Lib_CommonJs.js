// 按指定字符截断
// console.log("33:".rtrim(':'));       打印结果 33
// console.log("123$456".rtrim('456')); 打印结果 123$
String.prototype.rtrim = function (strc = ',') {
    var lastIndex = this.lastIndexOf(strc);
    var rt = "";
    if (lastIndex > -1) {
        rt = this.substring(0, lastIndex);
    } else { rt = this.toString(); }
    return rt;
};

//时间对象转string
// console.log((new Date()).Format("yyyy-MM-dd hh:mm")); 
// console.log((new Date()).Format("yyyyMMddhhmm")); 
//打印结果 2022-05-07
//打印结果 202205071722
Date.prototype.Format = function (fmt) {
    var o = {
        "y+": this.getFullYear(),
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S+": this.getMilliseconds()             //毫秒
    };
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            if (k == "y+") {
                fmt = fmt.replace(RegExp.$1, ("" + o[k]).substr(4 - RegExp.$1.length));
            }
            else if (k == "S+") {
                var lens = RegExp.$1.length;
                lens = lens == 1 ? 3 : lens;
                fmt = fmt.replace(RegExp.$1, ("00" + o[k]).substr(("" + o[k]).length - 1, lens));
            }
            else {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
    }
    return fmt;
}




