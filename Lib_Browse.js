// 写入浏览器的cookie
// MyCookie.setCookie("mydata","2022-3-19 11:16","10s");
// console.log(MyCookie.getCookie("mydata")); 
const MyCookie = {
  setCookie(name,value,time)  //setCookie("mydata","2022-5-9 11:16","10s")
  { 
      var strsec = this.getsec(time); 
      var exp = new Date(); 
      exp.setTime(exp.getTime() + strsec*1); 
      document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
  } ,
  getCookie(name)  // console.log(getCookie(mydata)); 
  { 
      var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
   
      if(arr=document.cookie.match(reg))
   
          return unescape(arr[2]); 
      else 
          return null; 
  } ,
  getsec(str) //判断时间单位
  { 
    //  alert(str); 
     var str1=str.substring(1,str.length)*1; 
     var str2=str.substring(0,1); 
     if (str2=="s")
     { 
          return str1*1000; 
     }
     else if (str2=="h")
     { 
         return str1*60*60*1000; 
     }
     else if (str2=="d")
     { 
         return str1*24*60*60*1000; 
     } 
  }  
}