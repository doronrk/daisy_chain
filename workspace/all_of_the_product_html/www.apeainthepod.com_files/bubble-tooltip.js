/************************************************************************************************************
Ajax dynamic list
Copyright (C) September 2005  DTHMLGoodies.com, Alf Magne Kalleland

This library is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License as published by the Free Software Foundation; either
version 2.1 of the License, or (at your option) any later version.

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this library; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA

Dhtmlgoodies.com., hereby disclaims all copyright interest in this script
written by Alf Magne Kalleland.

Alf Magne Kalleland, 2006
Owner of DHTMLgoodies.com
	
************************************************************************************************************/	
function showToolTip(e,text){
	if(document.all)e = event;
	
	var obj = document.getElementById('bubble_tooltip');
	var obj2 = document.getElementById('bubble_tooltip_content');
	obj2.innerHTML = text;
	obj.style.display = 'block';
	var st = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
	if(navigator.userAgent.toLowerCase().indexOf('safari')>=0)st=0; 
	//var leftPos = 0;//e.clientX - 100;
	//if(leftPos<0)leftPos = 0;
	//obj.style.left = leftPos + 'px';
	//obj.style.top = e.clientY - obj.offsetHeight - 500 + st + 'px';
}

function showToolTipF(e, text, loc){
	if(document.all)e = event;
	
	var obj = document.getElementById('bubble_tooltip'+loc);
	var obj2 = document.getElementById('bubble_tooltip_content'+loc);
	obj2.innerHTML = text;
	obj.style.display = 'block';
	var st = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
	if(navigator.userAgent.toLowerCase().indexOf('safari')>=0)st=0; 
	var leftPos = 0;//e.clientX - 100;
	if(leftPos<0)leftPos = 0;
	obj.style.left = leftPos + 'px';
	obj.style.top = e.clientY - obj.offsetHeight -230 + st + 'px';
}

function showAddSize(e,text){
	if(document.all)e = event;
	
	var obj = document.getElementById('addsize_tooltip');
	var obj2 = document.getElementById('addsize_tooltip_content');
	obj2.innerHTML = text;
	obj.style.display = 'block';
	var st = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
	if(navigator.userAgent.toLowerCase().indexOf('safari')>=0)st=0; 
	//var leftPos = 0; //e.clientX - 100;
	//if(leftPos<0)leftPos = 0;
	//obj.style.left = leftPos + 'px';
	//obj.style.top = e.clientY - obj.offsetHeight - 5 + st + 'px';
}

function showAddSizeF(e,text, loc){
	if(document.all)e = event;
	
	var obj = document.getElementById('addsize_tooltip'+loc);
	var obj2 = document.getElementById('addsize_tooltip_content'+loc);
	obj2.innerHTML = text;
	obj.style.display = 'block';
	var st = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
	if(navigator.userAgent.toLowerCase().indexOf('safari')>=0)st=0; 
	//var leftPos = 0; //e.clientX - 100;
	//if(leftPos<0)leftPos = 0;
	//obj.style.left = leftPos + 'px';
	//obj.style.top = e.clientY - obj.offsetHeight - 5 + st + 'px';
}

function hideToolTip()
{
	document.getElementById('bubble_tooltip').style.display = 'none';
	
}

function hideToolTipF(loc)
{
	document.getElementById('bubble_tooltip'+loc).style.display = 'none';
	
}

function hideAddSize()
{
	document.getElementById('addsize_tooltip').style.display = 'none';
	
}

function hideAddSizeF(loc)
{
	var i;
	for (i=1; i<=loc; i++) {
		document.getElementById('addsize_tooltip'+loc).style.display = 'none';
	}
	
}