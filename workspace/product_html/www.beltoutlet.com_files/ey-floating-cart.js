function roundVal(val){
	var dec = 2;
	var result = Math.round(val*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}

function getCookie(name){
var cookie,list,i,equals,match;
cookie=document.cookie;
if(cookie.length==0){
return '';
}

else{
list=cookie.split(';');
for(i=0;i<list.length;i=i+1){
equals=list[i].indexOf('=');
match=list[i].substring(0,equals);
if(match.substr(0,1)==' '){
match=match.substr(1);
}
if(match==name){
return list[i].substring(equals+1,list[i].length);
}
}
return '';
}
}

var eyC=getCookie("count");
var eyST=getCookie("subtotal");
var EYtfs;

if (eyC.length==0)
{
document.write("<div class='cookClass'>0 ITEMS - $0.00 <span>| $50 more for FREE SHIPPING!</span></div>");
}
else{
EYtfs = 50 - (eyST.split('$').join(''));
EYtfs = roundVal(EYtfs);
EYtfs = EYtfs.toFixed(2);

if(EYtfs > 0)
{
document.write("<div class='cookClass'>"+eyC+" ITEMS - "+eyST+" <span>| $"+EYtfs+" more for FREE SHIPPING!</span></div>");
}
else
{
document.write("<div class='cookClass'>"+eyC+" ITEMS - "+eyST+" <span>| You are eligible for FREE SHIPPING!</span></div>");
}
}