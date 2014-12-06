var expDays=60;
var expDate = new Date();
expDate.setTime(expDate.getTime()+(expDays*24*60*60*1000))

function setCookie(name,id,imageurl,price,saleprice){
	var theCookie,totalCookie,nextCookie,cookieArray
	var ctr = 0 ;
	var recentItemArray = new Array();
	var the_cookie = unescape(document.cookie);
	if(the_cookie.indexOf(id) > -1){
		var exists = true;
	}else{
		theCookie = escape("productName:" + name + "|id:"  + id + "|imageurl:" + imageurl + "|price:" + price + "|salepric:" + saleprice) + "; expires=" + expDate.toGMTString() + "; path=/";
		if(the_cookie.length > 0){
			var cookieArray = the_cookie.split(";");
			for(i=0;i<cookieArray.length;i++){
				if(cookieArray[i].indexOf(cookieName) > -1){
					recentItemArray[ctr] = cookieArray[i];
					ctr = ctr + 1;
				}
			}
			if(ctr > 0){
				for(i=0;i<ctr;i++){
					if(i == 2) break;
					nextCookie = i + 1;
					passCookie = recentItemArray[i].split("=");
					document.cookie = cookieName + nextCookie + "=" + passCookie[1] + "; expires=" + expDate.toGMTString() + "; path=/";
				}
				document.cookie = cookieName + "0=" + theCookie;
			}else{
				document.cookie = cookieName + "0=" + theCookie;
			}
		}else{
			document.cookie = cookieName + "0=" + theCookie;
		}
	}
}

function writeCookie(){
	var name,id,imageurl,price,saleprice,Lname,Lid,Limageurl,Lprice,Lsaleprice,cookieVal
	Lname = "productName:";
	Lid = "id:";
	Limageurl = "imageurl:";
	Lprice = "price:";
	Lsaleprice = "salepric:";
	var nvp = new Array();
	var recentItemArray = new Array();
	var the_cookie = unescape(document.cookie);
	var ctr = 0 ;
	if(the_cookie.length > 0){
		var cookieArray = the_cookie.split(";");
		for(i=0;i<cookieArray.length;i++){
			if(cookieArray[i].indexOf(cookieName) > -1){
				recentItemArray[ctr] = cookieArray[i];
				ctr = ctr + 1;
			}
		}
		if(recentItemArray.length>0){
			for(j=0;j<recentItemArray.length;j++){
				name = "";
				id = "";
				imageurl = "";
				price = "";
				saleprice = "";							
				cookieVal = unescape(recentItemArray[j])
				nvp = cookieVal.split("=");
				nvp = nvp[1].split("|");
				for(k=0;k<nvp.length;k++){
					if(nvp[k].indexOf("productName:") > -1)
						name = nvp[k].substr(Lname.length);
					if(nvp[k].indexOf("id:") > -1)
						id = nvp[k].substr(Lid.length);
					if(nvp[k].indexOf("imageurl:") > -1)
						imageurl = nvp[k].substr(Limageurl.length);
					if(nvp[k].indexOf("price:") > -1)
						price = nvp[k].substr(Lprice.length);
					if(nvp[k].indexOf("salepric:") > -1)
						saleprice = nvp[k].substr(Lsaleprice.length);
				}
				document.write("<td width='33%' align=center valign=bottom>");
				document.write("<table width='100%' border='0' cellpadding='0' cellspacing='0'><tr><td valign=middle align=center height=80>");
				document.write("<a href=" + id + "><img src=" + imageurl + " border=0></a></td></tr>");
				document.write("<tr><td valign=top align=center><a href=" + id + ">" + name + "</a></td></tr>");				
				if(price != "" && price != "0"){
					document.write("<tr><td align=center class=price>");
					if(saleprice != "" && saleprice != "0")
						document.write(priceText + " ");
					else
						document.write("");
					document.write("$" + price);
					if(saleprice == "" || saleprice == "0")
						document.write("");					
					document.write("</td></tr>");
				}
				if(saleprice != "" && saleprice != "0")
					document.write("<tr><td align=center class=sale-price><span>" + salePriceText + " $" + saleprice + "</span></td></tr>");
				document.write("</table></td>");
			}
		}		
	}
}