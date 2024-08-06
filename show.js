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
var date=new Date();
thisyear=date.getFullYear();//加载当前年份
function about(division_num,_rus)//输出版权信息
{
    var _name="哈儿实验室",_name_rus="Лаборатория Хаера",tmp=String(division_num);
    if(division_num>=0)
    {
        if(division_num<10)tmp="0"+String(division_num);
        _name+=tmp+"分部";
        _name_rus="Подразделение "+tmp+" Лаборатории Хаера";
    }
    if(_rus)document.getElementById("_copyright").innerHTML=_name+" &copy; 2018-"+thisyear+" 保留所有权利。<br>"+_name_rus+" &copy; 2018-"+thisyear+" Все права защищены.";
    else document.getElementById("_copyright").innerHTML=_name+" &copy; 2018-"+thisyear+" 保留所有权利。";
    return;
}