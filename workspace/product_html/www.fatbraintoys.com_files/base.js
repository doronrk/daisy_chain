<!--

function popUp(url,width,height,scroll) {
sealWin=window.open(url,"win","toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars="+scroll+",resizable=1,width="+width+",height="+height);
self.name = "mainWin";}

function popShow(myURL) {
	ColdFusion.navigate(myURL,'csWindow');
	ColdFusion.Window.show('csWindow');
}

function confirmMe(url) {
var result = confirm("Are you sure you wish to permanently delete this item?");
if (result) {
	document.location = url;
	}
}

function disableSubmit(form) {
    if(document.shopper.submitted)return false;
    document.shopper.submit();
    document.shopper.submitbutton.disabled = true;
    return true;
}

function showResult(str)
{
if (str.length < 2) //==0
  { 
  document.getElementById("live_search").innerHTML="";
  document.getElementById("live_search").style.border="0px";
  document.getElementById("live_search").style.padding="0";
  return;
  }
else if (str.length >= 2)
	{
		if (window.XMLHttpRequest)
		  {// code for IE7+, Firefox, Chrome, Opera, Safari
		  xmlhttp=new XMLHttpRequest();
		  }
		else
		  {// code for IE6, IE5
		  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		  }
		xmlhttp.onreadystatechange=function()
		  {
		  if (xmlhttp.readyState==4 && xmlhttp.status==200 && xmlhttp.responseText=='')
			{
				hideMe();
			}
		  else if (xmlhttp.readyState==4 && xmlhttp.status==200 && xmlhttp.responseText!='')
			{
			document.getElementById("live_search").innerHTML=xmlhttp.responseText;
			document.getElementById("live_search").style.display = "block";
			document.getElementById("live_search").style.border="1px solid #A5ACB2";
			document.getElementById("live_search").style.padding="10px";
			//document.getElementById("live_search").style.background="white url('indicator.gif') right center no-repeat";
			}
		  }
		xmlhttp.open("GET","/templates/ajax_search/live_search3.cfm?q="+str,true);
		xmlhttp.send();											
		}
	}											
function hideMe(what) {
	document.getElementById("live_search").style.display = "none";
}										

function quickJump(url) {
	document.location = url;
	}

function compareProducts() {
	if(!(parseInt(navigator.appVersion) < 4)) {
		if(validate(window.document.compare) != false) {
			window.document.compare.submit();
		}
	}
	else {
		window.document.compare.submit();
	}
}

function validate(myform) {
	if(!(parseInt(navigator.appVersion) < 4)) {
		var value = 0;
		if (myform != null) {
			for (var i = 0; i < myform.elements.length; i++) {
				if (myform.elements[i].checked) {
					value++;
				}
			}
		}
		if (value < 2) {
			alert('This feature allows you to do side-by-side comparisons of two or more products. To use this feature, please "check" the boxes of the products you would like to compare.');
			return false;
		}
	}
}
		  
	function dobk(url,title){
		window.open(url, title,'scrollbars=1,resizable=1,toolbar=no,width=700,height=500'); 				
	}						
	function bookDelicious(title){
		dobk( 'http://del.icio.us/post?v=4&noui&jump=close&url='+encodeURIComponent(location.href)+'&title='+encodeURIComponent(title),'delicious');
	}
	function bookMagnolia(title){
		dobk( 'http://ma.gnolia.com/bookmarklet/add?url='+encodeURIComponent(location.href)+'&title='+encodeURIComponent(title),'magnolia');
	}
	function bookGoogle(title){
		dobk( 'http://www.google.com/bookmarks/mark?op=edit&output=popup&bkmk='+encodeURIComponent(location.href)+'&title='+encodeURIComponent(title),'google');
	}
	function bookYahoo(title){
		dobk( 'http://myweb2.search.yahoo.com/myresults/bookmarklet?u='+encodeURIComponent(location.href)+'&t='+encodeURIComponent(title),'yahoo');
	}
	function bookBlinklist(title){
		dobk( 'http://blinklist.com/index.php?Action=Blink/addblink.php&Url='+encodeURIComponent(location.href)+'&Name='+encodeURIComponent(title),'blinklist');
	}

	function bookStyleHive(title){
		dobk( 'http://my.stylehive.com/authenticated/bookmark/add.htm?bookmark.url='+encodeURIComponent(location.href)+'&bookmark.title='+encodeURIComponent(title),'stylehive');
	}			

// End -->