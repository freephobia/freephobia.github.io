console.log("文件版本正确。");//祝您好运！
function getQ(hname)//获取参数
{
    var reg=new RegExp("(^|&)"+hname+"=([^&]*)(&|$)","i");
    var r=window.location.search.substr(1).match(reg);
    if(r!=null)
	{
		return unescape(r[2]);
	}
    return null;
}
const dg=["类人型哈儿","高智商哈儿","中智商哈儿","低智商哈儿","化学物质型哈儿","待销毁哈儿","已销毁哈儿","外逃哈儿","不存在此哈儿","已灭亡哈儿"];//各类哈儿综合能力等级（ХИРГ）的名称
//           0             1            2       3           4            5         6           7         8           9
const dgclr=["#00FF00","#AA00FF","#FFFF00","#00FFFF","#CC0000","#D06A0D","#6B6895","#2A5750","#FFFFFF","#88AAEE"];//每个ХИРГ的对应颜色
const clrs=["#FFAAAA","#FFFFAA","#AAFFAA","#AAFFFF","#FFAAFF","#AAFFFF"];//链接颜色，共6个；数据库存储文件URL
const ne_title="不支持 - 哈儿实验室危险哈儿数据库 БДОХЛХ",ne_body="<h1 style=\" color: #FFAAAA;\">浏览器版本太旧，请使用更高版本的浏览器</h1>",XMLFILEURL_ORI="bdohlh/haerlib.xml";//База Данных Опасных Хаеры Лаборатории Хаера=БДОХЛХ
var hname,born,des,dgs,info,haerona,dgmhx,age,die,xmlfileurl,localurl=window.location.protocol+"//"+window.location.host;//hname：名称（临时存储用的变量），born：出生年份，des：概要，dgs：ХИРГ（临时存储用的变量），info：信息（描述），haerona：此哈儿的负责人，dgmhx：哈儿性质（0=哈儿，1=哈儿团，2=哈儿簇，临时存储用的变量）,age：年龄（临时存储用的变量），die：被销毁或死亡年份（临时存储用的变量，用以标注年龄），xmlfileurl：XML文件路径，localurl：当前主域名
var mhn,minhn,thisyear,actualminhn,rg,qj;//mhn为最大编号，minhn为最小编号，直接影响到索引的表格行数和“当前可用编号”的数值；thisyear为当前年份（公历），用于计算哈儿的年龄；actualminhn为实际最小哈儿编号；rg为循环替换如[br]之类的简略符号的循环次数，32次足够多；可用哈儿区间
var xmlDoc,date=new Date();
thisyear=date.getFullYear();//加载当前年份
if(localurl.charAt(localurl.length-1)!="/")localurl+="/";
xmlfileurl=localurl+XMLFILEURL_ORI;//加载XML文件地址
console.log("[Info]: [thisyear: "+thisyear+" xmlfileurl:"+xmlfileurl+"]");

//重新编写危险哈儿数据库期间暂停访问
function jump2notice()
{
	window.location.href="notice.html";
	return;
}

function about()//输出版权信息
{
  document.getElementById("about_index").innerHTML="哈儿实验室 &copy; 2018-"+thisyear+" 保留所有权利。<br>Лаборатория Хаера &copy; 2018-"+thisyear+" Все права защищены.";
  return;
}
function tproc()//预处理
{
    //恢复访问后删去下面一行！！
	jump2notice();//重新编写危险哈儿数据库期间暂停访问，恢复访问后删去本行！！
	//恢复访问后删去上面一行！！
	
	let xmlhttp=new XMLHttpRequest();
	if(!window.XMLHttpRequest)return false;//如果此方法不可用，则提示用户更新浏览器
	xmlhttp.open("GET",xmlfileurl,false);
	xmlhttp.send();
	xmlDoc=xmlhttp.responseXML;//以上均为获取XML文件的步骤
	mhn=Number(xmlDoc.getElementsByTagName("mhn")[0].childNodes[0].nodeValue);
	minhn=Number(xmlDoc.getElementsByTagName("minhn")[0].childNodes[0].nodeValue);
	actualminhn=Number(xmlDoc.getElementsByTagName("actualminhn")[0].childNodes[0].nodeValue);
	rg=Number(xmlDoc.getElementsByTagName("rg")[0].childNodes[0].nodeValue);//以上为获取这些基本值的步骤
	return true;
}
function run()//БДОХЛХ主页面运行函数
{
	var idd=getQ("haer");//idd：请求的哈儿编号
	document.getElementById("sid").value=idd;//将编号填充至搜索框内
	if(!tproc())//浏览器版本太旧，提示用户更新浏览器
	{
		document.getElementById("title").innerHTML=ne_title;//页面标题
		document.getElementById("main").innerHTML=ne_body;//页面内容（正文）
		about();//输出版权信息
		return;//不知为何，我试图用IE打开时，什么也没有输出？？（反正都应该不会用这种古董了，算了）
	}
	qj="["+minhn+","+mhn+"]";
	console.log("[BasicInfo]: [mhn:"+mhn+" minhn:"+minhn+" actualminhn:"+actualminhn+" rg:"+rg+"]");//输出测试信息
	if((idd<actualminhn)||(idd>mhn))//没有档案，输出没有档案的说明并停止运行
	{
		document.getElementById("title").innerHTML="无档案 - 哈儿实验室危险哈儿数据库 БДОХЛХ";//页面标题
		document.getElementById("main").innerHTML="<h1 style=\" color: #FFAAAA;\">没有关于这个哈儿的档案</h1>";//页面内容（正文）
		document.getElementById("haernum").innerHTML=qj;//当前可用哈儿
		about();//输出版权信息
		return;
	}
	if(idd==null)
	{
		document.getElementById("title").innerHTML="未选择 - 哈儿实验室危险哈儿数据库 БДОХЛХ";//页面标题
		document.getElementById("main").innerHTML="<h1 style=\" color: #FFAAAA;\">请选择一个哈儿</h1>";//页面内容（正文）
		document.getElementById("haernum").innerHTML=qj;//当前可用哈儿
		about();//输出版权信息
		return;
	}
	hname=xmlDoc.getElementById("name_"+idd).childNodes[0].nodeValue;
	born=Number(xmlDoc.getElementById("born_"+idd).childNodes[0].nodeValue);
	des=xmlDoc.getElementById("des_"+idd).childNodes[0].nodeValue;
	dgs=Number(xmlDoc.getElementById("dgs_"+idd).childNodes[0].nodeValue);
	info=xmlDoc.getElementById("info_"+idd).childNodes[0].nodeValue;
	haerona=xmlDoc.getElementById("haerona_"+idd).childNodes[0].nodeValue;
	dgmhx=Number(xmlDoc.getElementById("dgmhx_"+idd).childNodes[0].nodeValue);
	die=Number(xmlDoc.getElementById("die_"+idd).childNodes[0].nodeValue);
	console.log(hname);
	((dgs==6)||(dgs==8)||(dgs==9))?(age=(born>0)?(die-born):(die-born-1)):(age=(born>0)?(thisyear-born):(thisyear-born-1));//将出生（死亡）年份转换为年龄
	for(var i=0;i<rg;++i)//处理info字符串中的简略符号（写的时候为了方便以及需要时统一更改）
	{
		info=info.replace("[Uns]","<strong style=\"color: #FF0000;\">[禁止显示]</strong>");//[uns]=“禁止显示”符号
		info=info.replace("[uns]","<strong style=\"color: #FF0000;\">[禁止显示]</strong>");
		info=info.replace("[br]","\n<br>\n");//[br]=换行
		info=info.replace("[lstr]","<strong style=\"color: #FF0000;\">");//[lstr]=红色加粗字体开始
		info=info.replace("[lstrw]","<strong>");//[lstrw]=加粗字体开始
		info=info.replace("[rstr]","</strong>");//[rstr]=（红色）加粗字体结束
		info=info.replace("[flagoj]","\n<br>\n<strong style=\"color: #CC0000;\">（注：图片是此哈儿的个人旗帜，由此哈儿亲自设计）</strong>");//哈儿旗帜标识
		info=info.replace("[la]","<a target=\"_blank\" href=\"index.html?haer=");
		info=info.replace("[las]","<a target=\"_blank\" href=\"");
		info=info.replace("[lb]","\" style=\"color: "+clrs[Math.floor(Math.random()*60)%6]+";\">");
		info=info.replace("[lc]","</a>");
		info=info.replace("[cfls]","ШИЯЧ");
		info=info.replace("[sub]","<sub>");
		info=info.replace("[rsub]","</sub>");
		info=info.replace("[sup]","<sup>");
		info=info.replace("[rsup]","</sup>");
	}
	document.getElementById("title").innerHTML=hname+" - 哈儿实验室危险哈儿数据库 БДОХЛХ";
	document.getElementById("t1").innerHTML=document.getElementById("t2").innerHTML=hname;
	document.getElementById("des").innerHTML=des;
	document.getElementById("img").alt=document.getElementById("id1").innerHTML=idd;
	document.getElementById("age").innerHTML=Number(age);
	document.getElementById("info").innerHTML=info;
	document.getElementById("img").src="haer-img\\"+idd+".jpg";
	document.getElementById("img").title=hname+" - "+idd;//这几行内容将大部分要展示的页面内容输出到页面，包括：页面标题、哈儿名称、概要、哈儿编号、哈儿年龄、信息（描述）、哈儿（团）的图片或关于此哈儿（团）的图片
	if(dgmhx==0)//输出ХИРГ
	{
		document.getElementById("dg").innerHTML=dg[dgs];
	}
	else if(dgmhx==1)
	{
		document.getElementById("dg").innerHTML=dg[dgs]+"团";//表示这是一个危险哈儿团，使得ХИРГ名称由“XXX哈儿”变为“XXX哈儿团”
	}
	else if(dgmhx==2)
	{
		document.getElementById("dg").innerHTML=dg[dgs]+"簇";//表示这是一个危险哈儿簇，使得ХИРГ名称由“XXX哈儿”变为“XXX哈儿簇”
	}
	document.getElementById("dg").style="color: "+dgclr[dgs]+";";//将颜色设置为ХИРГ对应的颜色
	document.getElementById("haerona").innerHTML=haerona;//输出哈儿的负责人
	document.getElementById("haernum").innerHTML=qj;//输出当前可用哈儿（这两个变量直接关系到索引的运行！！）
  	about();//输出版权信息
	return;
}
function runtable()//БДОХЛХ索引运行函数
{
	let rng="<tr><th>危险哈儿号码</th><th>危险哈儿名称</th><th><a style=\"color: #FFFFFF;\" href=\"\" target=\"_blank\">哈儿综合能力等级</a></th></tr>\n",dgsv,dgsest,dgmht,hnlt;//rng：表格内容，初始化时只有这个表头；dgsv：ХИРГ名称（临时存储用的变量）
	if(!tproc())//浏览器版本太旧
	{
		document.getElementsByTagName("title")[0].innerHTML=ne_title;//页面标题
		document.getElementByTagName("body")[0].innerHTML=ne_body;//页面内容（正文）
		about();//输出版权信息
		return;
	}
	for(let j=minhn;j<=mhn;++j)//j相当于run()中的idd变量
	{
		dgsest=xmlDoc.getElementById("dgs_"+j).childNodes[0].nodeValue;
		dgmht=xmlDoc.getElementById("dgmhx_"+j).childNodes[0].nodeValue;
		hnlt=xmlDoc.getElementById("name_"+j).childNodes[0].nodeValue;
		dgsv=dg[dgsest];//获取此哈儿对应的ХИРГ名称
		if(dgmht==1)dgsv+="团";//如果是哈儿团就使ХИРГ名称由“XXX哈儿”变为“XXX哈儿团”
		else if(dgmht==2)dgsv+="簇";
		rng+="<tr><td style=\"color: #AAFFAA;\">"+j+"</td><td><a style=\"color: #AAFFFF;\" href=\"index.html?haer="+j+"\" target=\"_blank\">"+hnlt+"</a></td><td style=\"color: #FFFFAA;\">"+dgsv+"</td></tr>\n";//添加每行的内容
	}
	document.getElementById("table").innerHTML=rng;//输出到页面
  	about();//输出版权信息
	return;
}
function nextbutton(ifnext)//БДОХЛХ主页面翻页按钮运行函数，若ifnext=1则翻到后一个哈儿，否则翻到前一个哈儿
{
	let idd=getQ("haer");//idd：请求的哈儿编号
	if(ifnext==1)window.location.href="index.html?haer="+(Number(idd)+Number(1));//向后翻页
	else window.location.href="index.html?haer="+(Number(idd)-Number(1));//向前翻页
	return;
}
function test001()//测试能否连接到hssrgov网站
{
	return "reply";
}
function test002(string)//测试能否连接到hssrgov网站并测试js是否正常运行
{
	return "reply: req="+string;
}
//function tmpshow1()//show.js 2022年初大改中帮助修改的临时函数
//{
//	var str="";
//	for(var i=0;i<=mhn;++i)
//	{
//		str+="//"+i+"<br>";
//		str+=hnl[i]+"<br>";
//		str+="!出生年份"+"<br>";
//		str+="!概要"+"<br>";
//		str+=dgses[i]+"<br>";
//		str+="!负责人"+"<br>";
//		str+=dgmh[i]+"<br>";
//		str+="!被销毁或死亡的年份"+"<br>";
//		str+="!哈儿详细信息"+"<br>";
//		str+="[info-end]<br><br>";
//	}
//	document.getElementById("show").innerHTML=str;
//	return;
//}