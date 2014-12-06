String.prototype.trim=function(){return this.replace(/(^\s*)|(\s*$)/g,"")};String.prototype.startsWith=function(str){return this.substring(0,str.length)==str};String.prototype.endsWith=function(str){return this.lastIndexOf(str)==this.length-str.length};String.prototype.pad=function(l,s,t){return s||(s=" "),(l-=this.length)>0?(s=new Array(Math.ceil(l/s.length)+1).join(s)).substr(0,t=!t?l:t==1?0:Math.ceil(l/2))+this+s.substr(0,l-t):this};String.prototype.repeat=function(c){var s="";for(var i=0;i<c;i++){s+=this}return s};Array.prototype.copy=function(){var a=new Array;for(var i=0,l=this.length;i<l;i++){a[i]=this[i]}return a};Array.prototype.indexOf=function(v){for(var i=0,l=this.length;i<l;i++){if(this[i]==v){return i}}return -1};var fn_number_array_sort=function(a,b){return a-b};function page_init(){toggleSearchFields(null,true)}function showPic(whichpic){document.getElementById("placeholder").src=whichpic.href}function NarrowByPrice(value){var form=document.forms.searchform;form.p_price.value=value;finishSearch()}function NarrowByStyle(value,name){var form=document.forms.searchform;form.p_style2.value=value;form.p_style2name.value=name;finishSearch()}function changePage(value){var nd=document.getElementById("page");if(nd){nd.value=value}finishSearch()}function newSearch(){var nd=document.getElementById("page");if(nd){nd.value=""}if(SearchVerify()){document.forms.searchform.submit()}}function finishSearch(){if(SearchVerify()){document.forms.searchform.submit()}}function clearSearch(){var form=document.forms.searchform;form.p_gender.options[0].selected=true;form.p_brand.options[0].selected=true;form.p_style.options[0].selected=true;form.p_color.options[0].selected=true;form.p_color.disabled=false;form.p_size.options[0].selected=true;form.p_price.options[0].selected=true;form.p_instock.checked=false;form.p_keyword.value="Enter Item # or Keyword";if(form.page){form.page.value="1"}toggleSearchFields(null,true)}function SearchVerify(){var form=document.forms.searchform;if(form.p_keyword.value.toLowerCase().trim().startsWith("enter item")){form.p_keyword.value=""}return valSearch()}function getSearchFields(){if(document.getElementById("p_gender")){var flds,form=document.forms.searchform;if(form){flds=[form.p_gender,form.p_brand,form.p_style,form.p_color,form.p_size,form.p_price,form.p_keyword];if(form.p_style2){flds.push(form.p_style2)}if(form.p_style2name){flds.push(form.p_style2name)}}else{flds=[]}}else{flds=[]}return flds}function valSearch(){var ok=false;var fields=getSearchFields();if(fields.length>0){for(var i=0;i<fields.length;i++){if(fields[i].value!=""){ok=true;break}}if(ok){toggleSearchFields(fields)}else{alert("Please specify search criteria before continuing.")}}return ok}function toggleSearchFields(fields,t){if(!fields){fields=getSearchFields()}if(fields.length>0){for(var i=0;i<fields.length;i++){fields[i].disabled=t==null?(fields[i].value==""?true:false):!t}}}function jsstyle(val){var form=document.forms.searchform;if((val=="tp_100")||(val=="wp_100")||(val=="prtun")||(val=="prwarm")){form.p_color.disabled=true}else{form.p_color.disabled=false}}function isEmpty(str){str=alltrim(str);return(str==null)||(str.length==0)}function isNotEmpty(str){return(str.length>0)}function IsNumeric(sText){var ValidChars="0123456789";var IsNumber=true;var Char;for(i=0;i<sText.length&&IsNumber==true;i++){Char=sText.charAt(i);if(ValidChars.indexOf(Char)==-1){IsNumber=false}}return IsNumber}function isEmail(value){return/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value)}function isEmail_retired(mailvalue){if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(mailvalue)){return(true)}return(false)}function alltrim(str){return typeof(str)=="string"?str.replace(/^\s+|\s+$/g,""):str}function chkEmailSub(){var frmErrors=new Array();var focus="";if($("#email").val().trim()==""){frmErrors[frmErrors.length]="Please enter your email address.";focus="email"}else{if(!isEmail($("#email").val())){frmErrors[frmErrors.length]="Please correct your email address.";focus="email"}else{if($("#email").val()!=$("#confirm").val()){frmErrors[frmErrors.length]="Emails do not match.";focus="confirm"}}}if(frmErrors.length==0){return true}var errorMsg="<ul>";for(i=0;i<frmErrors.length;i++){errorMsg=errorMsg+"<li>"+frmErrors[i]+"</li>"}errorMsg=errorMsg+"</ul>";$("#emailError").html(errorMsg);$("#emailError").show();return false}function chkEmailForm(site){if(site==1){if(!isEmail($("#txtSignUpEmail").val())){$("#thankyou").show();$("#txtSignUpEmail").focus();return false}}else{if($("#txtSignUpEmail").val().trim()==""){alert("Please enter your email.");$("#txtSignUpEmail").focus();return false}else{if(!isEmail($("#txtSignUpEmail").val())){alert("Please correct your email.");$("#txtSignUpEmail").focus();return false}}}return true}function chkCartform(frm){var i=0;for(i=0;i<frm.elements.length;i++){if(frm.elements[i].name.indexOf("qty")==0){if(isEmpty(frm.elements[i].value)){alert("Please enter a Quantity");frm.elements[i].value="";frm.elements[i].focus();return false}if(!IsNumeric(frm.elements[i].value)){alert("Please enter a Quantity");frm.elements[i].value="";frm.elements[i].focus();return false}}}return true}function showpop(page,title){showpop_wsize(page,title,350,420)}function showpop_wsize(page,title,height,width){var winName=title;var args="height="+height+",width="+width+",left=l0,top=10,toolbar=0,location=0,directories=0,status=1,menubar=0,scrollbars=1,resizable=1";window.open(page,winName,args)}function GotoNext(form){var newIndex=document.getElementById("fieldname").selectedIndex;if(newIndex==0){alert("Please select a location!")}else{cururl=document.getElementById("fieldname").options[newIndex].value;window.location.assign(cururl)}}function updateSize(fname,itemno,clrcode){var ie=document.all&&navigator.userAgent.indexOf("Opera")==-1;var dom=document.getElementById&&navigator.userAgent.indexOf("Opera")==-1;if(clrcode!=""){if(ie||dom){var iframeobj=document.getElementById?document.getElementById("ifrm"):document.all.sizecheck;iframeobj.src="/product-sizecheck.asp?fname="+fname+"&itemno="+itemno+"&clrcode="+clrcode}}}function additem(frmno){var itemno,clrcode,szcode,gensku;if(document.getElementById("rselcolor_"+frmno).disabled==true){szcode=document.getElementById("rselsize_"+frmno).value;if(szcode=="-1"){alert("Please select a size!");return false}else{itemno=document.getElementById("gensku_"+frmno).value;if(szcode=="-2"){szcode=""}gensku=itemno+" "+szcode;document.getElementById("relitem_"+frmno).gensku.value=gensku;document.getElementById("relitem_"+frmno).color.value="";document.getElementById("relitem_"+frmno).size.value=szcode}}else{clrcode=document.getElementById("rselcolor_"+frmno).value;if(clrcode=="-1"){alert("Please select a color!");return false}else{szcode=document.getElementById("rselsize_"+frmno).value;if(szcode=="-2"){szcode=""}itemno=document.getElementById("gensku_"+frmno).value;gensku=itemno+" "+clrcode+" "+szcode;document.getElementById("relitem_"+frmno).gensku.value=gensku;document.getElementById("relitem_"+frmno).color.value=clrcode;document.getElementById("relitem_"+frmno).size.value=szcode}}return true}function MoveToWishlist(nID,nSKU,nQty){var r=confirm("Would you like to move this item to your Wish List?");if(r==true){cururl="updatecart.asp?move="+nID+"&sku="+nSKU+"&qty="+nQty;window.location.assign(cururl)}}function MovetoCart(){var frm=document.getElementById("frmwishlist");frm.action="/buywishlist.asp";frm.submit()}function DeleteCartItem(nID,nEmb,nQty,nPrice){var r=confirm("Would you like to remove this item from your cart?");if(r==true){cururl="updatecart.asp?remove="+nID+"&emb="+nEmb+"&qty="+nQty+"&price="+nPrice;window.location.assign(cururl)}}function DeleteWishList(){var r=confirm("Would you like to remove the selected item(s) from your Wish List?");if(r==true){var frm=document.getElementById("frmwishlist");frm.action="/mywishlist-del.asp";frm.submit()}}function openDir(form){var newIndex=form.fieldname.selectedIndex;if(newIndex==0){alert("Please select a location!")}else{cururl=form.fieldname.options[newIndex].value;window.location.assign(cururl)}}function showTab(field,title){var i=0;for(i=0;i<=9;i++){if(document.getElementById("logos"+i)){document.getElementById("logos"+i).style.display="none"}}document.getElementById(field).style.display="inline";document.getElementById("logotypename").innerHTML="<b>"+title+"</b>"}function chooseLogo(logo){if(window.opener.document.getElementById("logoname")){window.opener.document.getElementById("logoname").value=logo;var origsku=window.opener.document.getElementById("logoname").options[window.opener.document.getElementById("logoname").selectedIndex].value;var sku=origsku.toLowerCase();sku=sku.replace(" ","_");if(sku!="none"){window.opener.document.getElementById("logonameimg").innerHTML='<img src="/images/logos/'+sku+'.jpg">'}else{window.opener.document.getElementById("logonameimg").innerHTML=""}var logo=window.opener.document.getElementById("logoname").options[window.opener.document.getElementById("logoname").selectedIndex].value;if(logo!=""){window.opener.document.getElementById("logocolor").disabled=false;if(window.opener.document.getElementById("logocenterside")){window.opener.document.getElementById("logocenterside").disabled=false}else{window.opener.document.getElementById("logoleftside").disabled=false;window.opener.document.getElementById("logorightside").disabled=false;window.opener.document.getElementById("logoleftsleeve").disabled=false;window.opener.document.getElementById("logorightsleeve").disabled=false}}else{window.opener.document.getElementById("logocolor").disabled=true;window.opener.document.getElementById("logoleftside").disabled=true;window.opener.document.getElementById("logorightside").disabled=true;if(window.opener.document.getElementById("logocenterside")){window.opener.document.getElementById("logocenterside").disabled=true}else{window.opener.document.getElementById("logoleftside").disabled=false;window.opener.document.getElementById("logorightside").disabled=false;window.opener.document.getElementById("logoleftsleeve").disabled=false;window.opener.document.getElementById("logorightsleeve").disabled=false}}}window.close()}function GetXmlHttpObject(){var xmlHttp=null;try{xmlHttp=new XMLHttpRequest()}catch(e){try{xmlHttp=new ActiveXObject("Msxml2.XMLHTTP")}catch(e){xmlHttp=new ActiveXObject("Microsoft.XMLHTTP")}}return xmlHttp}function ajxShipMethod(){var shipmethod=alltrim(document.getElementById("shipmethod").value);var total=document.getElementById("totalhidden").value;var url="/ajaxed/select-shippingmethod.asp?shipmethod="+shipmethod+"&total="+total;xmlhttp=new GetXmlHttpObject();xmlhttp.open("GET",url,true);xmlhttp.onreadystatechange=function(){if(xmlhttp.readyState==4&&xmlhttp.status==200){document.getElementById("totalprice").innerHTML="<b>"+xmlhttp.responseText+"</b>";document.getElementById("shipmethod").options[document.getElementById("shipmethod").selectedIndex].value=shipmethod}};xmlhttp.send(null)}if(typeof(util)!="object"){util=new function(){this.PopupWndw=function(url,WndwName,WndwHandle,w,h,Menubar,Resizable,Scrollbars,Status,Toolbar,bSilent){var cur_url;try{cur_url=WndwHandle.document.location}catch(e){}if(WndwHandle!=null&&typeof(WndwHandle)=="object"&&!WndwHandle.closed&&cur_url==url){WndwHandle.focus()}else{var Width=(w)?w:620,Height=(h)?h:400;var screenPosX=window.screen.availWidth/2-Width/2;var screenPosY=window.screen.availHeight/2-Height/2-30;Menubar=(!Menubar)?"no":"yes";Resizable=(!Resizable)?"no":"yes";Scrollbars=(Scrollbars==null||Scrollbars)?"yes":"no";Status=(Status==null||Status)?"yes":"no";Toolbar=(!Toolbar)?"no":"yes";WndwHandle=window.open(url,(WndwName?WndwName:"Wndw"),"dependent=yes,hotkeys=no,width="+Width+",height="+Height+",left="+screenPosX+",top="+screenPosY+",menubar="+Menubar+",resizable="+Resizable+",scrollbars="+Scrollbars+",status="+Status+",toolbar="+Toolbar);if(WndwHandle){try{WndwHandle.focus()}catch(e){WndwHandle=null}}if(!WndwHandle&&!bSilent){alert("Popup window could not be launched or was blocked! \nPlease allow popup windows for this site.")}}return WndwHandle}}}function launch_team_sizing_tool(){var site=document.location.href;site=(site.indexOf("lydias")>-1||site.indexOf("lpu.")>-1?"lydias":(site.indexOf("uniformwarehouse")>-1||site.indexOf("uw.")>-1?"uwhouse":"lydias"));launch_team_sizing_tool.wndw=util.PopupWndw("/static/"+site+"/team_sizing_tool.htm","team_sizing_tool_wndw",launch_team_sizing_tool.wndw,850,567,0,1,1,0,0,0)}launch_team_sizing_tool.wndw=null;function openwindow2(page){window.open(page,"mywindow","menubar=0,resizable=0,width=500,height=100")}var submitted=false;function onSubmit(){if(!submitted){submitted=true;return true}return false}function onload_thumb(img){img.onload=null;var h=img.height;if(img.height>88880){if(h<125){img.style.paddingTop=parseInt((125-h)/2)+"px"}}}var toptimeout=500;var topclosetimer=0;var topddmenuitem=0;var topddsubmenuitem=0;function showTopDropDown(tab){if(topddmenuitem){topddmenuitem.style.visibility="hidden"}if(document.getElementById("topdropdown"+tab)){topddmenuitem=document.getElementById("topdropdown"+tab);topddmenuitem.style.visibility="visible"}}function hideTopDropDowns(){if(topddmenuitem){topddmenuitem.style.visibility="hidden"}}var logtimeout=500;var logclosetimer=0;var logddmenuitem=0;var logddsubmenuitem=0;function showLogIn(){if(logddmenuitem){logddmenuitem.style.visibility="hidden"}if(document.getElementById("logindrop")){logddmenuitem=document.getElementById("logindrop");logddmenuitem.style.visibility="visible"}}function hideLogIn(){if(logddmenuitem){logddmenuitem.style.visibility="hidden"}}function check_cdfs(form){return true}function doEmailSubmit(){if(check_cdfs(document.survey)){window.open("","signup","resizable=1,scrollbars=0,width=300,height=150");return true}else{return false}}function sh_details(sku){da=document.getElementById(sku+"_details_display");dl=document.getElementById(sku+"_details_link");if(da.style.display=="none"){da.style.display="block";dl.innerHTML="[-] Hide Item Details"}else{da.style.display="none";dl.innerHTML="[+] See Item Details"}};