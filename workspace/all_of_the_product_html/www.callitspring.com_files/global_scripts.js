
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
function P7_ShowPic(a,b) { //v2.0 by PVII
 var g,gg,d,dd,ic,im;if((g=MM_findObj(b))!=null){
 if(!document.P7ShowPic){document.P7ShowPic=true;}else{
 if((d=MM_findObj(document.P7SPlay))!=null){
  dd=(document.layers)?d:d.style;dd.visibility="hidden";}}
 document.P7SPlay=b;gg=(document.layers)?g:g.style;im=b+"im";
 if((ic=MM_findObj(im))!=null){ic.src=a;gg.visibility="visible";}}
}

function addEvent(obj, evType, fn, useCapture){
	if (obj.addEventListener) {
		obj.addEventListener(evType, fn, useCapture);
		return true;
	} else if (obj.attachEvent) {
		var r = obj.attachEvent("on"+evType, fn);
		return r;
	} else {
		return false;
	}
}

document.getElementsByClassName = function(className) {
  var children = document.getElementsByTagName('*') || document.all;
  var elements = new Array();

  for (var i = 0; i < children.length; i++) {
    var child = children[i];
    var classNames = child.className.split(' ');
    for (var j = 0; j < classNames.length; j++) {
      if (classNames[j] == className) {
        elements.push(child);
        break;
      }
    }
  }

  return elements;
}

addEvent(document, "click", document_onclick, true);

var iframeIds = ["popUpHoldersizeGuru","popUpHolder"];

function document_onclick(){
	try {
		var divs = document.getElementById("popUpContent");
		if (divs != null) { divs.parentNode.style.display = "none";	}
	} catch (e) {}

	for (var index = 0; index < iframeIds.length; index++){
		var iframe = document.getElementById(iframeIds[index]);
		if (iframe){ iframe.style.display = "none"; }
	}
}

sfHover = function()
{
	if (!document.getElementsByTagName) return false;
	/* Used for Country Selection Drop Down */
	if(document.getElementById("topnav"))
	{
		var sfEls = document.getElementById("topnav").getElementsByTagName("LI");
		for (var i=0; i<sfEls.length; i++)
		{
			sfEls[i].onmouseover=function()
			{
				this.className+=" sfhover";
			}
			sfEls[i].onmouseout=function()
			{
				this.className=this.className.replace(new RegExp(" sfhover\\b"), "");
			}
		}
	}
	/* Used for Top Navigation Menus */
	if(document.getElementById("mainnav"))
	{
		var sfEls1 = document.getElementById("mainNav").getElementsByTagName("li");
		for (var i=0; i<sfEls1.length; i++)
		{
			sfEls1[i].onmouseover=function()
			{
				this.className+=" sfhover";
			}
			sfEls1[i].onmouseout=function()
			{
				this.className=this.className.replace(new RegExp(" sfhover\\b"), "");
			}
		}


		/* By request of LS + SK,  <select> boxes on the page will be made hidden
		   once you mouseover the top menu. */

		if(document.getElementById("hideTheseDropDowns"))
		{

		 	var selects = document.getElementsByTagName("select");

			for (var i=0; i<sfEls1.length; i++)
			{
				sfEls1[i].onmouseover=function()
				{
					this.className+=" sfhover";
					for (var n=0; n<selects.length; n++)
					{
						/* Hides <select> tags, which appear above menu in IE */
						selects[n].className+=" hideThis";
					}
				}
				sfEls1[i].onmouseout=function()
				{
					this.className=this.className.replace(new RegExp(" sfhover\\b"), "");
					for (var n=0; n<selects.length; n++)
					{
						/* Makes <select> tags visible again */
						selects[n].className = selects[n].className.replace(new RegExp(" hideThis\\b"), "");
					}
				}
			}
		}
	}
}

if (window.attachEvent) window.attachEvent("onload", sfHover);


function retrieveCartInfo(){

		errorFound = checkErrorPage();

		 if(!errorFound)
		 {
		 	if(!document.getElementById('SmartMessage'))
		 	{
		 		new ShoppingCart().get({position:'fixed',posX:570,posY:35,messageTimeout:15000,scrollTop:true,onError:'center', lang: '#variables.actualLang#', parameters:false, onSuccess : _ShoppingCart_action_productDetails_OnSuccess});

		 	}
		 }
		 else
		 {
		 	new ShoppingCart().get({position:'fixed',posX:570,posY:35,messageTimeout:15000,scrollTop:true,onError:'center', lang: '#variables.actualLang#', parameters:false, onSuccess : _ShoppingCart_action_productDetails_OnSuccess});
		 }
}
function _ShoppingCart_action_productDetails_OnSuccess(request){
	_ShoppingCart_action_OnSuccess(request);
}
function checkErrorPage()
{
	ret_er = false;
	if(document.getElementById('SmartMessage'))
	{
		findError = document.getElementById('SmartMessageContent').innerHTML;
		if(findError.toLowerCase().indexOf("<error>") != -1){
  			ret_er = true;
	  	}
	  	else{
	  		ret_er = false;
		}
		/*for(str=findError.length-7;str<=findError.length;str++)
		{
		  	getToken += findError.charAt(str);
		}

		  if(getToken=='<error>'||getToken=='<ERROR>')
		  {
		  	ret_er = true;
		  }
		  else
		  {
		  	ret_er = false;
		  }*/
	}
	return ret_er;
}


function serialize_form(ele)
{
	ele = $(ele);
	/*for(d in ele)
	{
		alert(d + " = " + ele[d])
	}*/

	n = (ele.children)?ele.children.length:ele.childNodes.length;
	str_return = "";
	ar_error = new Array();


	for(x=0;x<n;x++)
	{
		if(ele[x])
		{
			setFormObject(ele[x]);
			val = formObj.value;

			if(ele[x].type.toUpperCase() == 'CHECKBOX'&&!ele[x].checked)
			{
				val = "N";
			}
			if((formObj.toValidate&&validateForm)||formObj._type=='TN')
			{
				formValidation();
			}
			if(formObj.isNumeric)
			{
				str_return+=formObj.name+"|"+val+"~";
			}
			else
			{
				str_return+=formObj.name+"|'"+val+"'~";
			}
		}
	}
	str_return = (ar_error.length>0)?false:str_return;

	return str_return;

}

function formValidation()
{
	if(formObj._type=='TF')
	{
		if(formObj.value.length == 0)
		{
			ar_error.push(formObj.origin);
		}

	}

	if(formObj._type=='TN') ///Numeric fields
	{
		if(formObj.value.length == 0||!IsNumber(formObj.value))
		{
			ar_error.push(formObj.origin);
		}
	}

	if(formObj._type=='EM')
	{
		if(formObj.value.length == 0||!testEmail(formObj.value))
		{
			ar_error.push(formObj.origin);
		}
	}
	if(formObj._type=='SB')
	{
		if(formObj.value == 0 || formObj.value == '00000' || formObj.value.length == 0)
		{
			ar_error.push(formObj.origin);
		}
	}
	if(formObj._type=='CB')
	{
		if(!formObj.checked)
		{
			ar_error.push(formObj.origin);
		}
	}
}

function setFormObject(i)
{
	fn = i.name.split("_");
	formObj = {name:fn[0],toValidate:(fn[1]=='Y')?true:false,_type:fn[2],isNumeric:(fn[3]=='Y')?true:false,value:i.value,origin:i.name};
}

function FieldsNormalState(e)
{
	e = $(e);

	for(z=0;z < e.length;z++)
	{
		if(e[z])
		{
			if(e[z].tagName.toUpperCase() != 'BUTTON')
			{
				findLabel(e[z],false)
				e[z].className = (e[z].tagName.toUpperCase()=='INPUT')?'inp_' + e[z].type:'inp_' + e[z].tagName;
			}
		}
	}
}

function handle_erros()
{
	for(c=0;c<ar_error.length;c++)
	{
		e = $(ar_error[c]);
		par = (e.parentElement)?e.parentElement:e.parentNode;

		findLabel(e,true)

		classError = (e.tagName.toUpperCase()=='INPUT')?'inp_' + e.type:'inp_' + e.tagName;
		e.className = classError+'_error';
	}
}

function findLabel(obj,error)
{

	prev = obj.previousSibling.previousSibling;

	if(prev.htmlFor == obj.id)
	{
		prev.className = (error)?'fieldLabel_error':'fieldLabel';
	}
}


function testEmail(src) {
     var emailReg = "^[\\w-_\.]*[\\w-_\.]\@[\\w]\.+[\\w]+[\\w]$";
     var regex = new RegExp(emailReg);
     return regex.test(src);
  }

function flushForm(e)
{
	for(z=0;z<e.length;z++)
	{
		if(e[z].type.toUpperCase() != "HIDDEN")
		{
			if(e[z].type.toUpperCase() == "CHECKBOX")
			{
				e[z].checked = false;
			}
			else if(e[z].tagName.toUpperCase() == "SELECT")
			{
				e[z].selectedIndex = 0;
			}
			else
			{
				e[z].value = '';
			}
		}
	}
	FieldsNormalState(e);
}



	function showhide(elem1,elem2,state1,state2)

	{

	document.getElementById(elem1).style.display=state1;

	document.getElementById(elem2).style.display=state2;

	}



//this function mounts dynamic select box START //
	  function createResultStructure(sel,text,value)
	{

		_ret = {};
		_ret.name = sel;
		_ret.text = text;
		_ret.value = value;
		return _ret;
	}

	function updateSelect(result)
	{

		if($(_selObj.name)&&result!='')
		{
			mySelect = $(_selObj.name);
			mySelectChildren = $(_selObj.name).getElementsByTagName('OPTION');
			for(x=mySelectChildren.length-1;x>0;x--)
			{
				$(_selObj.name).removeChild(mySelectChildren[x]);
			}

			for(x=0;x<result.length;x++)
			{
				opt = document.createElement('OPTION');
				opt.innerHTML = result[x][_selObj.text];
				opt.value = result[x][_selObj.value];
				$(_selObj.name).appendChild(opt);
			}
		}
		else
		{
		    mySelect = $(_selObj.name);
			mySelectChildren = $(_selObj.name).getElementsByTagName('OPTION');
			for(x=mySelectChildren.length-1;x>0;x--)
			{
				$(_selObj.name).removeChild(mySelectChildren[x]);
			}
		}

	}
//this function mounts dynamic select box END //

