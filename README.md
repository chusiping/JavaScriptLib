## Lib_CommonJs.js方法列表

按指定字符截断  
console.log("33:".rtrim(':'));       打印结果 33  
console.log("123$456".rtrim('456')); 打印结果 123$  

时间对象转string  
console.log((new Date()).Format("yyyy-MM-dd hh:mm"));  
console.log((new Date()).Format("yyyyMMddhhmm"));   
打印结果 2022-05-07  
打印结果 202205071722  


## Lib_Browse.js方法列表  

写入浏览器的cookie
MyCookie.setCookie("mydata","2022-3-19 11:16","10s");
console.log(MyCookie.getCookie("mydata"));  





## 参考网文

 [prototype属性为javascript对象扩展属性和方法](https://www.cnblogs.com/jishume/articles/2052655.html)