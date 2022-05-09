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

对象是否为空  
var a;  
console.log(isEmpty(a));  


//股票处理类  
//转带前缀的sh00154，sz600545  
console.log(MyStock.toShSz('600123'));   


//自动生成table表格  
var myList = [  
   { "name": "abc",  "age": 50 ,  "hobby": "打麻将"},  
   { "name": "李四", "age": "25", "hobby": "swimming" },  
   { "name": "王五", "age": "13", "hobby": "dak" },  
   { "name": "赵六", "age": "44", "hobby": "smoke" },  
   { "name": "张七", "age": "21", "hobby": "sleep" },  
   { "name": "xyz",  "age": "18", "hobby": "programming" }  ];  
// var par = { "列名":"auto" , "数据组": myList , "表ID" : "tableMSA" , "隐藏列":"", "列顺序":"","合并显示":"false","  合并主键":"code" };  
myTable.par["列名"] = "a,b,c";  
var html =  myTable.get_html_table(myList);  
$('#app').html(html);  


//写入和读取local Storege  
console.log(MyCookie.save_input("#key","testData"));  
console.log(MyCookie.ReadStorage("#key","testData"))     


## 参考网文

 [prototype属性为javascript对象扩展属性和方法](https://www.cnblogs.com/jishume/articles/2052655.html)