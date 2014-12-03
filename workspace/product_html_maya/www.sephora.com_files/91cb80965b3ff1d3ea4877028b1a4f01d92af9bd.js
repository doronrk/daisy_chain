function timePart(t,z,y){dc=new Date('1/1/2000');f=15;ne=8;if(dc.getDay()!=6||dc.getMonth()!=0){return'Data Not Available'}
else{z=parseInt(z);if(y=='2009'){f=8;ne=1};gmar=new Date('3/1/'+y);dsts=f-gmar.getDay();gnov=new Date('11/1/'+y);dste=ne-gnov.getDay();spr=new Date('3/'+dsts+'/'+y);fl=new Date('11/'+dste+'/'+y);cd=new Date();if(cd>spr&&cd<fl){z=z+1}else{z=z};utc=cd.getTime()+(cd.getTimezoneOffset()*60000);tz=new Date(utc+(3600000*z));thisy=tz.getFullYear();var days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];if(thisy!=y){return'Data Not Available'}else{thish=tz.getHours();thismin=tz.getMinutes();thisd=tz.getDay();var dow=days[thisd];var ap='AM';var dt='Weekday';var mint='00';if(thismin>30){mint='30'}
if(thish>=12){ap='PM';thish=thish-12};if(thish==0){thish=12;};if(thisd==6||thisd==0){dt='Weekend';};var timestring=thish+':'+mint+ap;var daystring=dow;var endstring=dt;if(t=='h'){return timestring}
if(t=='d'){return daystring};if(t=='w'){return endstring}}};}

function pad(value) { if(value < 10) { return '0' + value; } else { return value; } }
function padArray(t,s,v){var l=Math.abs(s)-t.length;var a=[].concat(t);if(l<=0)return a;for(var i=0;i<l;i++)
s<0?a.unshift(v):a.push(v);return a;};

function currentTime(){var now=new Date();var _h=now.getHours();var _m=now.getMinutes();var _t=_h>12?"PM":"AM";return _h+":"+_m+" "+_t;};


function getSerialize(fn,decycle){var seen=[],keys=[];decycle=decycle||function(key,value){return'[Circular '+getPath(value,seen,keys)+']'};return function(key,value){var ret=value;if(typeof value==='object'&&value){if(seen.indexOf(value)!==-1)
ret=decycle(key,value);else{seen.push(value);keys.push(key);}}
if(fn)ret=fn(key,ret);return ret;}}

function getPath(value,seen,keys){var index=seen.indexOf(value);var path=[keys[index]];for(index--;index>=0;index--){if(seen[index][path[0]]===value){value=seen[index];path.unshift(keys[index]);}}
return'~'+path.join('.');}

function bt_deleteCookie(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};