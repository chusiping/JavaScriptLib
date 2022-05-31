  
// 显示页面局部信息iframe
// myIframe.div["width"] = "220px";
// myIframe.div["height"] = "320px";
// myIframe.div["scrolling"] = "no";
// myIframe.frame["margin-left"] = "-20px";
// myIframe.frame["margin-top"] = "-200px";
// myIframe.SetDiv("#dv3");
const myIframe ={
    div :   { "width":"1020px","height":"180px","overflow":"auto","border":"1px" , "display": "inline-block","border": "solid 1px" ,"vertical-align":"top"},
    frame : { "width":"1200px" ,"height":"1500px", "margin-left":"-200px","margin-top":"-360px", "border": "solid 1px","scrolling":"no"},
    SetDiv(CtrName){  
        $(CtrName).css(this.div);
        $(CtrName).find("iframe").css(this.frame);  
    }
};


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
  },
  //读取 [{"key_datalist":"aa1"},{"key_datalist":"aa2"}]
  ReadStorage(ControlName,DateListName){
      if(!window.localStorage){
          alert("浏览器支持localstorage");
          return null;
      }else
      {
          var storage=window.localStorage;
          var json=storage.getItem(DateListName);
          var jsonObj=JSON.parse(json);
          console.log(typeof jsonObj);
          if(jsonObj==null) return []; //若干地产以
          return jsonObj;
      }
  },
  //调用：save_input("#key","keyWord");
  //写入结果：数组类型子串 [{"keyWord":"aa1"},{"keyWord":"aa2"}]
  save_input(ControlName,DateListName,Clear)
  {
      var storage=window.localStorage;
      //参数为clear，就清除全部
      if(Clear == "clear") storage.setItem(DateListName,""); 
      if(!window.localStorage){
          alert("浏览器支持localstorage");
      }else
      {
          var vl =  $(ControlName).val(); 
          if(vl == "") return;
          var newob = {}; newob[DateListName] = vl ;
          
          var hisObject = this.ReadStorage(ControlName,DateListName);
          for(var i=0;i<hisObject.length;i++){
              for(var key in hisObject[i]){
                  if(key == DateListName && hisObject[i][key] == vl ) return;
              }
          };
          //数组追加对象
          hisObject.push(newob);
          var d = JSON.stringify(hisObject);
          storage.setItem(DateListName,d);
      }
  }
};

 
//  //自动生成table表格
//  参数1:th列的中文名 -> "姓名,年龄,习惯   
//  参数2:不显示的列名 -> "age,hobby"   
//  参数3:td数据列     -> myList  
//  参数4:table的ID    -> <table id="ttt">
//  参数5:自定义显示数据顺序     -> "hobby,age,name"
// var myList = [  
//    { "name": "abc",  "age": 50 ,  "hobby": "打麻将"},  
//    { "name": "李四", "age": "25", "hobby": "swimming" },  
//    { "name": "王五", "age": "13", "hobby": "dak" },  
//    { "name": "赵六", "age": "44", "hobby": "smoke" },  
//    { "name": "张七", "age": "21", "hobby": "sleep" },  
//    { "name": "xyz",  "age": "18", "hobby": "programming" }  ];  
// //var par = { "列名":"auto" , "数据组": myList , "表ID" : "tableMSA" , "隐藏列":"", "列顺序":"","合并显示":"false","  合并主键":"code" };  
// myTable.par["列名"] = "a,b,c";
// var html =  myTable.get_html_table(myList);  
// $('#app').html(html);  

const myTable ={
  arr_cp : new Array(),
  par: { "列名":"auto" , "表ID" : "tableMSA" , "隐藏列":"", "列顺序":"","合并显示":"false","  合并主键":"code" },
  
  get_html_table(JsonData) {
    lieList =   this.par["列名"];
    date_list = JsonData;
    tb_id =     this.par["表ID"];
    hide_col =  this.par["隐藏列"]; 
    orderStr =  this.par["列顺序"]; 
    IsSpan =    this.par["合并显示"];
    Span_mk =   this.par["合并主键"]

    lieList = this.GetColName(date_list,lieList)

    th_list = lieList.split(',');
    var th= '<table id="'+ tb_id +'">';
    for (var i = 0; i < th_list.length; i++) {
        th += '<th>'+ th_list[i]  +'</th>';
    }  

    rrt = this.set_colspan(th_list.length,date_list,Span_mk); 
    for (var i = 0; i < date_list.length; i++) {
        var tdstr = ''; 
        temp = date_list[i][Span_mk];
        if(typeof(orderStr) == "undefined" ||  orderStr.trim() == '')  {                   //无指定数据顺序
          for (var value in date_list[i]) {  
              if(typeof(hide_col) != "undefined" &&  hide_col.indexOf(value) >=0 ) continue; 
                  item_v = date_list[i][value];
                  if(IsSpan == "true"){
                      if(i>0 && (item_v == date_list[i-1][value]) && date_list[i][Span_mk] == date_list[i-1][Span_mk] ) {
                          
                      }
                      else{
                          sp_n = rrt[i][value];
                          rowstr = ' rowspan='+ sp_n;
                          if(sp_n == 1) rowstr = '';
                          tdstr += '<td ' + rowstr +'>'+ item_v +'</td>';
                      }
                  }else {           
                          tdstr += '<td>'+ item_v +'</td>';
                  }            
          }
        }
        else{
          odrArr = orderStr.split(',');
          for (index = 0; index < odrArr.length; index++) {                               //指定数据顺序,则hide_col无效
              for (var value in date_list[i]) {  
                  if(odrArr[index] == value) {
                      tdstr += '<td>'+ date_list[i][value] +'</td>';
                  }
              }
          }
        }
        th+= '<tr>'+ tdstr +'</tr>';
    }
    th += "</table>";
    return th;
  },
  //----------- 如果是auto，则自动显示select语句里每个列的列名----------------
  GetColName(date_list,lieList)
  {
      if(lieList == 'auto'){
          tdstr= '';
          for (var value in date_list[0]) {          
              tdstr += value +',';
          }
          return this.rtrim(tdstr); 
      }
      else{
          return lieList;
      }
  },
  //------------初始化泛型集合-----------------
  init_span(per_row)
  {
      var obj = {};
      for (var value in per_row) {  
          obj[value] = {"val":"","col":1};
      }
      return obj;
  },
  set_colspan(col_cnt,date_list,span_mk)
  {        
      turn_n = ''; rrt = []; 
      var obj_col = this.init_span(date_list[0]) ;  
      for (item_i = date_list.length-1; item_i >-1; item_i--) {      
          per_row = date_list[item_i];
                            
          var rt = {};
          for (var value in per_row) {                                        
              if(obj_col[value].val == per_row[value] ) {             //如果每个td的值比对相等，则rowspan累加1
                  obj_col[value].col++;                                      
              }
              else { 
                  //当换了新行的时候,对象属相清零
                  if(turn_n !='' && span_mk == value  ){              
                       obj_col = this.init_span(per_row)
                  }
                  //当值不相等，则重新计算
                  obj_col[value].val = per_row[value];                
                  obj_col[value].col = 1;
                  //主键更换 
                  if(span_mk == value ) turn_n = per_row[value];                      
              }
              rt[value] = obj_col[value]["col"];
          }
          rrt[item_i] = rt;
      }
      return rrt;
  },
  /******************************* 通用:去到最右边的逗号   1,2,3, -->  1,2,3  ************************************/ 
  rtrim(s) {
  var lastIndex = s.lastIndexOf(',');
      if (lastIndex > -1) {
          s = s.substring(0, lastIndex);
      }
      return s;　　
  }
}

 //2022-5-31 14:20 调佣方法
    // JsontoTable.data = data.list;
    // JsontoTable.para.列名 = ["a","b"]  未实现
    // JsontoTable.para.隐藏列 = ["日期","序号"] 未实现
    // JsontoTable.setDivHtml("#mydiv2");
    let JsontoTable = {
        data : [{"序号":"1","信息ID":"1001","信息内容":"xxx超速","日期":"2022-5-15","接受对象":"张三","类型":"app","所属单位":"佛山项目"},{"序号":"2","信息ID":"1002","信息内容":"xxx违规打电话","日期":"2022-5-16","接受对象":"李四","类型":"钉钉","所属单位":"资产部"},{"序号":"3","信息ID":"1003","信息内容":"xxx超速","日期":"2022-5-17","接受对象":"张三","类型":"微信","所属单位":"信息化部"},{"序号":"4","信息ID":"1004","信息内容":"xxx违规打电话","日期":"2022-5-18","接受对象":"李四","类型":"app","所属单位":"佛山项目"},{"序号":"5","信息ID":"1005","信息内容":"xxx超速","日期":"2022-5-19","接受对象":"张三","类型":"钉钉","所属单位":"资产部"},{"序号":"6","信息ID":"1006","信息内容":"xxx违规打电话","日期":"2022-5-20","接受对象":"李四","类型":"微信","所属单位":"信息化部"},{"序号":"7","信息ID":"1007","信息内容":"xxx超速","日期":"2022-5-21","接受对象":"张三","类型":"app","所属单位":"佛山项目"}],
        para :{ "列名":[], "表ID" : "" , "隐藏列": [], "列顺序":"","合并显示":'false',"合并主键":"code" },
        setDivHtml:function(divTag) {
            let str = this.get_html_table();
            $(divTag).html(str);
            // console.log(this.data);
            // console.log(JSON.stringify(this.para));
            
        },
        forArr: (obj,type)=>{ //循环对象的属性值
            let rt = [];
            for (var key in obj){
                if(type=="1") //value
                    rt.push(obj[key]);
                else
                    rt.push(key); //key
            }
            return rt;
        },
        displayNone:(arr,key)=>{ //没有用到,保留吧
            if(arr.includes(key))
                return ` style="display:none";`;
            else
                return "";
        },
        get_html_table: function () {
            lieList = this.para["列名"];
            date_list = this.data;
            tb_id = this.para["表ID"]; //id="tableMSM"
            hide_col = this.para["隐藏列"];//用逗号隔开
            orderStr = this.para["列顺序"];//拟定列的顺序,以逗号隔开
            IsSpan = this.para["合并显示"];
            Span_mk = this.para["合并主键"]

            let template = `<table id="_id_"> _th_ _tr_ </table> `;
            let thArr = this.forArr(date_list[0],0); //data里的数组head
            let table_Arrth = lieList.length > 0 ? lieList : thArr;

            let table_th = table_Arrth.map(x=> `\n\t<td>${x}</td>`);

            let table_trs = date_list.map(x => {
                let rt = this.forArr(x,1);   // 取出每个tr对象
                let rt_hide = this.forArr(x,0);   
                let Arr_tdStr = rt.map( x=> `\n\t<td>${x}</td>` );  // td加到数组
                let td_str =Arr_tdStr.join("");
                let tr = `\n<tr>${td_str}</tr>\n`;
                return tr;
            } );
            let rt = template.replace("_id_",tb_id).replace("_th_",table_th.join("")).replace("_tr_",table_trs.join(""));
            return rt ;    
        }
    }
//给table添加编辑删除按钮
//$(document).ready(function () {
//  myButton.AddTableBtn('#app div table');
// });
let myButton =  {
    btn : function(sname,sty) {
        return `<button type="button" class="btn  btn-xs ${sty}">${sname}</button> `;
    },
    AddTableBtn : function (Tabel_Tag) {
        var table = Tabel_Tag; 
        $(table).attr("class","table  table-bordered table-hover");
        var trList = $(table).find("tr");
        for (var i=0;i<trList.length;i++) {
            var tr = trList[i];
            if(i==0){
                $(tr).append("<td>操作</td>");
            }else{
                $(tr).append('<td>'+  this.btn('详情','btn-warning') + this.btn('编辑','btn-primary') + this.btn('删除','btn-danger')+'</td>' );
            }
        };
    }
}


