/*
Author: Robert Hashemian
http://www.hashemian.com/

You can use this code in any manner so long as the author's
name, Web address and this disclaimer is kept intact.
********************************************************
Usage Sample:

<script language="JavaScript">
TargetDate = "12/31/2020 5:00 AM";
BackColor = "palegreen";
ForeColor = "navy";
CountActive = true;
CountStepper = -1;
LeadingZero = true;
DisplayFormat = "%%D%% Days, %%H%% Hours, %%M%% Minutes, %%S%% Seconds.";
FinishMessage = "It is finally here!";
</script>
<script language="JavaScript" src="http://scripts.hashemian.com/js/countdown.js"></script>
*/

function calcage(secs, num1, num2) {
  s = ((Math.floor(secs/num1))%num2).toString();
  if (LeadingZero && s.length < 2)
    s = "0" + s;
	var className = '';
	switch(num1){
	  case 86400:
	   	className = 'days';
		break;
	  case 3600:
	   	className = 'hour';
		break;
	  case 60:
	   	className = 'minute';
		break;
	  case 1:
	   	className = 'second';
		break;
	}

  return "<span class='"+className+"'>" + s + "</span>";
}

function CountBack(secs) {
  if (secs < 0) {
    document.getElementById("cntdwn").innerHTML = FinishMessage;
    return;
  }
  DisplayStr = DisplayFormat.replace(/%%D%%/g, calcage(secs,86400,100000));
  DisplayStr = DisplayStr.replace(/%%H%%/g, calcage(secs,3600,24));
  DisplayStr = DisplayStr.replace(/%%M%%/g, calcage(secs,60,60));
  DisplayStr = DisplayStr.replace(/%%S%%/g, calcage(secs,1,60));

  document.getElementById("cntdwn").innerHTML = DisplayStr;
  if (CountActive)
    setTimeout("CountBack(" + (secs+CountStepper) + ")", SetTimeOutPeriod);
}

function putspan(backcolor, forecolor) {
 document.write("<span id='cntdwn' style='background-color:" + backcolor + 
                "; color:" + forecolor + "'></span>");
}


