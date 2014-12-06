function CoolOver(lnk) {
	lnk.style.backgroundColor = "cornflowerblue"
	lnk.style.color = "white" 
  }
function CoolOut(lnk) {
	lnk.style.backgroundColor = "LightSteelBlue"
	lnk.style.color = "mediumblue"
  }
var browser_name = navigator.appName;
var browser_version = parseFloat(navigator.appVersion);
var s_win;
function search_open() {
  var win_y = screen.height / 2 - 25;
  var this_loc = window.location.host;
  var win_x;
	if (this_loc.indexOf("tiger") == -1) {
	      win_x = screen.width  / 2 - 100;
	}
	else {
	      win_x = screen.width  / 4 - 100;
	}
	if (browser_version >= 4.0) {
	 s_win = window.open('','waiting','toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,width=230,height=100,resizable=0,screenX=' + win_x + ',screenY=' + win_y + ',left=' + win_x + ',top=' + win_y);
	 s_win.document.writeln('<BODY BGCOLOR="#90B5C6">');
	 s_win.document.writeln('<TABLE WIDTH="210" BORDER="0" ALIGN="CENTER"><TR><TD ALIGN="CENTER" VALIGN="MIDDLE" HEIGHT="60">');
	 s_win.document.writeln('<font size="2" face="verdana, arial">Generating report...<br><img src="http://images.tigerdirect.com/B2B/processing_rep.gif" align="absmiddle" border="0"');
	 s_win.document.writeln('</TD></TR></TABLE>');
	 s_win.document.writeln('</BODY>');
	}
}
function search_close() {
	if (s_win) {
	 s_win.close();
	}
}
function expdf(url,file){
   if (url=="") return;
   var uri = "/applications/html2pdf/html2pdf.aspx?u=" + url + "&f=" + file;
   window.open(uri,'displayWindow','menubar=no,scrollbars=yes,status=yes,width=617,height=550');
}

function autotab(current,to){
    if (current.getAttribute && 
      current.value.length==current.getAttribute("maxlength")) {
        to.focus() 
        }
}














