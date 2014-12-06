/*
	Author : Dinesh Pandey
	Project: Chaos
	Module :
	Created on:
	---------------------------------------------------------

	This file will show pop message on mouse over over a text in <a>...</a>.
*/

//--------------------------------------------------------------------------------
//-------------- Global Variables ------------------------------------------------
//--------------------------------------------------------------------------------
Xoffset=+10;    // modify these values to ...
Yoffset= 10;    // change the showMessageBox position.

var old,myMessage,iex=(document.all),yyy=-550;

var ns4=document.layers
var ns6=document.getElementById&&!document.all
var ie4=document.all

if (ns4)
	myMessage=document.errorblockdiv_cs
else if (ns6)
	myMessage=document.getElementById("errorblockdiv_cs").style
else if (ie4)
	myMessage=document.all.errorblockdiv_cs.style
if(ns4)
	document.captureEvents(Event.MOUSEMOVE);
else{
	myMessage=document.getElementById("errorblockdiv_cs").style;
	myMessage.visibility="visible"
	myMessage.display="none"
}
document.onmousemove=get_mouse;


function showMessageBox(msg,divId){
	
var messageBoxDivId ='errorblockdiv_cs';
if(divId){
	messageBoxDivId =divId;
}

var content=
"<table border=0 cellpadding=0 cellspacing=0>"+
"	<tr>"+
"		<td colspan=2 height=30 valign=top>"+
"	<img src='/images/armaniexchange/en_us/local/localgraphics/error2.gif' alt='Error' border='0'>"+
"		&nbsp;"+
"		</td>"+			
"		<td valign=top class=errorblockhead>"+
"		</td>"+
"	</tr><tr><td><font color='red'>"+msg+	
"</font></td></tr></table>"+
"<div align='right'><img src='/images/armaniexchange/en_us/local/localbuttons/close2_btn.gif' class='btnImage' onClick=MarketLive.P2P.hidErroBlock('"+messageBoxDivId+"');></div>";

	/*yyy=Yoffset;
	var temp = document.getElementById("errorblockdiv_cs").style.top;
	var top_of_div = temp.substring(0,temp.indexOf("p"));*/
	jQuery("#"+messageBoxDivId).html(content).css("visibility","visible").css("display","");
	//window.scroll(0,top_of_div);
	 /*** if(ns4){myMessage.document.write(content);myMessage.document.close();myMessage.visibility="visible"}
	 if(ns6){document.getElementById("errorblockdiv_cs").innerHTML=content;myMessage.display=''}
	 if(ie4){document.all("errorblockdiv_cs").innerHTML=content;myMessage.display=''} /***/
}

function get_mouse(e){
	var x=(ns4||ns6)?e.pageX:event.x+document.body.scrollLeft;
	//myMessage.left=10;
	var y=(ns4||ns6)?e.pageY:event.y+document.body.scrollTop;
	//myMessage.top=10;
}

function hideMessageBox()
{
	yyy=-1000;
	if(ns4)
	{
		myMessage.visibility="hidden";
	}
	else if (ns6||ie4)
	myMessage.display="none"
}







/*

How to use this?
-----------------
1. add these line in youe <HEAD> part of html.

<STYLE TYPE="text/css">
<!--
#myDivId {POSITION:absolute;VISIBILITY:hidden;Z-INDEX:200;}
//-->
</STYLE>

2. After <BODY> tag use these lines.

<DIV ID="myDivId"></DIV>
<script src="showMessageBoxMsg.js"></script>

3. Call this as below.
<a href="#" onMouseOver="showMessageBox('<b><font color=red>Hi,</font>   </b><br>How r u?','lightyellow')"  ONMOUSEOUT="hideMessageBox()">Hi dinesh...</a>

*/






