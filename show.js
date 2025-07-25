console.log("Version: 20250725 ##1");
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
const TITLE_TAIL=" - 哈儿实验室危险哈儿数据库 БДОХЛХ",HAER_GROUP_ENDING=["","团","簇"];//表示这是一个危险哈儿团/簇，使得ХИРГ名称由“XXX哈儿”变为“XXX哈儿团/簇”
const dg=["类人型哈儿","高智商哈儿","中智商哈儿","低智商哈儿","化学物质型哈儿","待销毁哈儿","已销毁哈儿","外逃哈儿","不存在此哈儿","已灭亡哈儿"];//各类哈儿综合能力等级（ХИРГ）的名称
//           0             1            2       3           4            5         6           7         8           9
const dgclr=["#00FF00","#AA00FF","#FFFF00","#00FFFF","#CC0000","#D06A0D","#6B6895","#2A5750","#FFFFFF","#88AAEE"];//每个ХИРГ的对应颜色
const clrs=["#FFAAAA","#FFFFAA","#AAFFAA","#AAFFFF","#FFAAFF","#AAFFFF"];//链接颜色，共6个；数据库存储文件URL
const ne_title="不支持"+TITLE_TAIL,ne_body="<h1 style=\" color: #FFAAAA;\">浏览器版本太旧，请使用更高版本的浏览器</h1>",XMLFILEURL_ORI="haerlib.xml";//База Данных Опасных Хаеры Лаборатории Хаера=БДОХЛХ
const list1=["[Uns]","[br]","[lstr]","[lstrw]","[rstr]","[flagoj]","[la]","[las]","[lc]","[cfls]","[sub]","[rsub]","[sup]","[rsup]"],list2=["<strong style=\"color: #FF0000;\">[禁止显示]</strong>","\n<br>\n","<strong style=\"color: #FF0000;\">","<strong>","</strong>","\n<br>\n<strong style=\"color: #CC0000;\">（注：图片是此哈儿的个人旗帜，由此哈儿亲自设计）</strong>","<a target=\"_blank\" href=\"/?haer=","<a target=\"_blank\" href=\"","</a>","ШИЯЧ","<sub>","</sub>","<sup>","</sup>"];//替换的标识符，应尽快修改
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
function about(division_num,_rus)//输出版权信息
{
    var _name="哈儿实验室",_name_rus="Лаборатория Хаера",tmp=String(division_num);
    if(division_num>=0)
    {
        if(division_num<10)tmp="0"+String(division_num);
        _name+=tmp+"分部";
        _name_rus="Подразделение "+tmp+" Лаборатории Хаера";
    }
    if(_rus)document.getElementById("about_index").innerHTML=_name+" &copy; 2018-"+thisyear+" 保留所有权利。<br>"+_name_rus+" &copy; 2018-"+thisyear+" Все права защищены.";
    else document.getElementById("about_index").innerHTML=_name+" &copy; 2018-"+thisyear+" 保留所有权利。";
    return;
}
function tproc()//预处理（XMLHttpRequest方法）
{
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
// function tproc2()//预处理
// {
// 	fetch(XMLFILEURL_ORI)
//         .then(response => response.text())
//         .then(xmlString => {
//             const parser = new DOMParser();
//             const xmlDoc = parser.parseFromString(xmlString, "text/xml");

//             mhn=Number(xmlDoc.getElementsByTagName("mhn")[0].childNodes[0].nodeValue);
// 			minhn=Number(xmlDoc.getElementsByTagName("minhn")[0].childNodes[0].nodeValue);
// 			actualminhn=Number(xmlDoc.getElementsByTagName("actualminhn")[0].childNodes[0].nodeValue);
// 			rg=Number(xmlDoc.getElementsByTagName("rg")[0].childNodes[0].nodeValue);//以上为获取这些基本值的步骤

//     	})
// 		.catch(error => {return false});
// 	return true;
// }
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
		document.getElementById("title").innerHTML="无档案"+TITLE_TAIL;//页面标题
		document.getElementById("main").innerHTML="<h1 style=\" color: #FFAAAA;\">没有关于这个哈儿的档案</h1>";//页面内容（正文）
		document.getElementById("haernum").innerHTML=qj;//当前可用哈儿
		about();//输出版权信息
		return;
	}
	if(idd==null)
	{
		document.getElementById("title").innerHTML="未选择"+TITLE_TAIL;//页面标题
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
		// info=info.replace("[Uns]","<strong style=\"color: #FF0000;\">[禁止显示]</strong>");//[uns]=“禁止显示”符号
		// info=info.replace("[uns]","<strong style=\"color: #FF0000;\">[禁止显示]</strong>");
		// info=info.replace("[br]","\n<br>\n");//[br]=换行
		// info=info.replace("[lstr]","<strong style=\"color: #FF0000;\">");//[lstr]=红色加粗字体开始
		// info=info.replace("[lstrw]","<strong>");//[lstrw]=加粗字体开始
		// info=info.replace("[rstr]","</strong>");//[rstr]=（红色）加粗字体结束
		// info=info.replace("[flagoj]","\n<br>\n<strong style=\"color: #CC0000;\">（注：图片是此哈儿的个人旗帜，由此哈儿亲自设计）</strong>");//哈儿旗帜标识
		// info=info.replace("[la]","<a target=\"_blank\" href=\"/?haer=");
		// info=info.replace("[las]","<a target=\"_blank\" href=\"");
		for (let i=0;i<list1.length;++i)info=info.replace(list1[i],list2[i]);
		info=info.replace("[lb]","\" style=\"color: "+clrs[Math.floor(Math.random()*60)%6]+";\">");
		// info=info.replace("[lc]","</a>");
		// info=info.replace("[cfls]","ШИЯЧ");
		// info=info.replace("[sub]","<sub>");
		// info=info.replace("[rsub]","</sub>");
		// info=info.replace("[sup]","<sup>");
		// info=info.replace("[rsup]","</sup>");
	}
	document.getElementById("title").innerHTML=hname+TITLE_TAIL;
	document.getElementById("t1").innerHTML=document.getElementById("t2").innerHTML=hname;
	document.getElementById("des").innerHTML=des;
	document.getElementById("img").alt=document.getElementById("id1").innerHTML=idd;
	document.getElementById("age").innerHTML=Number(age);
	document.getElementById("info").innerHTML=info;
	document.getElementById("img").src="haer-img\\"+idd+".jpg";
	document.getElementById("img").title=hname+" - "+idd;//这几行内容将大部分要展示的页面内容输出到页面，包括：页面标题、哈儿名称、概要、哈儿编号、哈儿年龄、信息（描述）、哈儿（团）的图片或关于此哈儿（团）的图片
	document.getElementById("dg").innerHTML=dg[dgs]+HAER_GROUP_ENDING[dgmhx];//输出ХИРГ
	document.getElementById("dg").style="color: "+dgclr[dgs]+";";//将颜色设置为ХИРГ对应的颜色
	document.getElementById("haerona").innerHTML=haerona;//输出哈儿的负责人
	document.getElementById("haernum").innerHTML=qj;//输出当前可用哈儿（这两个变量直接关系到索引的运行！！）
  	about(-1,true);//输出版权信息
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
		rng+="<tr><td style=\"color: #AAFFAA;\">"+j+"</td><td><a style=\"color: #AAFFFF;\" href=\"/?haer="+j+"\" target=\"_blank\">"+hnlt+"</a></td><td style=\"color: #FFFFAA;\">"+dgsv+"</td></tr>\n";//添加每行的内容
	}
	document.getElementById("table").innerHTML=rng;//输出到页面
  	about(-1,true);//输出版权信息
	return;
}
function nextbutton(ifnext)//БДОХЛХ主页面翻页按钮运行函数，若ifnext=1则翻到后一个哈儿，否则翻到前一个哈儿
{
	let idd=getQ("haer");//idd：请求的哈儿编号
	if(ifnext==1)window.location.href="?haer="+(Number(idd)+Number(1));//向后翻页
	else window.location.href="?haer="+(Number(idd)-Number(1));//向前翻页
	return;
}