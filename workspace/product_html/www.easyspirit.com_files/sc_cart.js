var sc_cartSKU = 137;
var sc_qtyEID = 140;
var sc_priceID = 139;
var sc_cartAmt = 141;
var sc_qtyPID = 147;
var sc_purchAmt = 142;
var sc_purchAmtAdj = 146;
var sc_cartcoll = 'sc.easyspiritmail.com';
var sc_cartaff = 'easyspirit';

function hsEvSpl(str){
arr = str.split("~");
ret_arr = new Array();
for(i=0; i<arr.length;i+=2){ret_arr[arr[i]] = arr[i+1];}
return ret_arr;
}
function hsExist(hsEvId,hsArr){
if(hsArr[hsEvId] || hsArr[hsEvId] == ""){       return true;}
return false;   
}
function hsGrabValue(hsEvId,hsArr){
if(hsArr[hsEvId] || hsArr[hsEvId] != ""){       return hsArr[hsEvId];}
return false;   
}
function hs_gtSearch (hs_cn)
{ var hs_tcne=hs_cn+"=";
var hs_ca=document.cookie.split(';');
for(var i=0;i < hs_ca.length;i++)
{ var hs_tcn=hs_ca[i];
while (hs_tcn.charAt(0)==' ') hs_tcn=hs_tcn.substring(1,hs_tcn.length);
if (hs_tcn.indexOf(hs_tcne) == 0) return hs_tcn.substring(hs_tcne.length,hs_tcn.length);}
return 0;}

function hs_stSearch(hs_cn, hs_cv, hs_perm)
{ var hs_ckExp="";
if (hs_perm == 1)
{ var has_expDate=new Date();
has_expDate.setTime(has_expDate.getTime()+(15768000000));
hs_ckExp="; expires="+has_expDate.toGMTString();}
document.cookie=hs_cn+"="+hs_cv+hs_ckExp+"; path=/";}


/**
 * SiteClarity Shopping Cart Sku Helper
 * Copyright (c) 2000-2006 CheetahMail, an Experian Company All rights reserved.
 */

/* Global variables */
// Cookie path
this.__A='path=/;';
// Get sku string
this.__B=(window.hs_sku)?window.hs_sku:'';
// Cookie name
this.__C='hs_basket=';
// Cookie path
this.__D='path=/;';
// Date check cookie name
this.__E='remarketing_return=';
// Cookie expire 30 days from now
this.__F=2592000000;
// Sku
var hs_sku='';

/**
 * SiteClarity Sku holder
 */
 

SC_Sku=function() {}
/**
 * Retrieve Sku cookie
 * @params a {string} Sku
 * @returns Sku value from cookie
 */
SC_Sku.getCookie_ReMarketing=function(a) {
    if(!a || typeof(a)=='undefined')
        a=0;
    var b=document.cookie.split(';');
    for(var i=0;i<b.length;i++) {
        var c=b[i];
        while(c.charAt(0)==' ')
            c=c.substring(1,c.length);
        if(a==0 && c.indexOf(__C)==0)
            return c.substring(__C.length,c.length);
        else if(a==1 && c.indexOf(__E)==0)
            return c.substring(__E.length,c.length);   
    }
    return '';
}

SC_Sku.getCookie_eCommerce=function(a) {
    var b=document.cookie.split(';');
    for(var i=0;i<b.length;i++) {
        var c=b[i];
        while(c.charAt(0)==' ')
            c=c.substring(1,c.length);
        if(c.indexOf(a)==0)
	    return c.substring(a.length,c.length);
    }
    return '';
}
/**
 * Get cookie expiration date
 * @returns cookie expiration date string
 */
SC_Sku.getExpiration=function() {
    // set expiration date
    var a=new Date();
    a.setTime(a.getTime()+__F);
    var b='expires='+a.toGMTString();+';';
    return b;
}
/**
 * Add sku in the beginning of the cookie or create new cookie
 * @returns None
 */
SC_Sku.add=function() {
    
    var hs_bitm = hs_sku;
    var hs_exist=SC_Sku.getCookie_ReMarketing('hs_basket');
    if(hs_bitm) {
    if(hs_bitm.indexOf(',')) {
        eVs=hs_bitm.split(',');
        for(i=0;i<eVs.length;i++) {
            if(hs_exist!='' && hs_exist.indexOf('337~'+eVs[i])<0) {
                if(hs_sku!='' && hs_sku.indexOf('337~'+eVs[i])<0)
                    hs_sku='337~'+eVs[i];
                else if(hs_sku=='')
                    hs_sku='337~'+eVs[i];
            } else if(hs_exist=='') {
                if(hs_sku!='' && hs_sku.indexOf('337~'+eVs[i])<0)
                    hs_sku='337~'+eVs[i];
                else if(hs_sku=='')
                    hs_sku='337~'+eVs[i];
            }
        }
    } else {
        if(hs_exist!='' && hs_exist.indexOf('337~'+hs_bitm)<0) {
            if(hs_sku!='' && hs_sku.indexOf('337~'+hs_bitm)<0)
                hs_sku='337~'+hs_bitm;
            else if(hs_sku=='')
                hs_sku='337~'+hs_bitm;
        } else if(hs_exist=='') {
            if(hs_sku!='' && hs_sku.indexOf('337~'+hs_bitm)<0)
                hs_sku='337~'+hs_bitm;
            else if(hs_sku=='')
                hs_sku='337~'+hs_bitm;
        }
    }
} 	
	
    
     __B = hs_sku;
    // set expiration date
    var b=SC_Sku.getExpiration();
    // get current cookie
    
    var c=SC_Sku.getCookie_ReMarketing();
    // no cookie yet
    if(c=='' && __B!='') {
        document.cookie=__C+__B+'|; '+b+'; '+__D;
        document.cookie=__E+(new Date().getTime())+'; '+b+'; '+__D
    } else if(__B!='') {
        // if the cookie is too long, clip off the last entry first
        if (c.length>2000) {
            var d=c.indexOf('|');
            var e=c;
            var f=d;
            if(d<c.length-2) {
                var g;
                while(d>=0) {
                    e=e.substring(d+1);
                    d=e.indexOf('|');
                    if(d==(e.length-1) && d>=0)
                        g=e.length;
                }
                f=c.length-g;
                c=c.substring(0,f);
            }
        }
        // look for current sku
        var h=c.indexOf(__B);
        // replace existing cookie
        if(h>=0) {
            var j=c.substring(0,h);
            var k=c.substring(h);
            h=k.indexOf('|')+1;
            k=(h>=k.length)?'':k.substring(h);
            document.cookie=__C+__B+'|'+j+k+'; '+b+'; '+__D;
        }
        // add-on to existing cookie
        else
            document.cookie=__C+__B+'|'+c+'; '+b+'; '+__D;
    }
}
/**
 * Remove sku string from cookie
 * @returns None
 */
SC_Sku.del=function() {
    // set expiration date
    var b=SC_Sku.getExpiration();   
    // get current cookie
    var c=SC_Sku.getCookie_ReMarketing();      
    // cookie exists, no cookie... no love :p
    __B = hs_sku;     
    if(c!='') {
        // look for current sku
        var d=c.indexOf(__B);       
        // remove existing cookie
        if(d>=0) {       
            var e=c.substring(0,d);            
            var f=c.substring(d);           
            d=f.indexOf('|')+1;           
            f=(d>=f.length)?'':f.substring(d);           
            document.cookie=__C+e+f+'; '+b+'; '+__D;          
        }
    }
}
/**
 * Destroy sku cookie
 * @returns None
 */
SC_Sku.destroy=function() {
    // set expiration date
    var b=SC_Sku.getExpiration();
    // get current cookie
    var c=SC_Sku.getCookie_ReMarketing(0);
    var d=SC_Sku.getCookie_ReMarketing(1);
    // process only when cookie exist, otherwise c-ya!
    if(c!=''||d!='') {
        document.cookie=__C+'; '+b+'; '+__D;
        document.cookie=__E+'; '+b+'; '+__D;
    }
}
/**
 * Check existing cart
 * @returns {string} Event id 1020 string 
 */
SC_Sku.existingCart=function() {
    // get date check cookie
    var a=SC_Sku.getCookie_ReMarketing(1);
    if(a) {
        var b=new Date().getTime();
        // more than 1 day old
	if(b-a>86400000) {
            var c=(b-a);
            var d=parseInt(c/86400000);
            return d;
        } else
            return '';
    } else
        return '';
}

/**
 * Add sku in the beginning of the cookie or create new cookie
 * @params a {string} Sku
 * @params b {string} Event string
 * @params c {int} Quantity
 * @params d {float} Price
 * @returns None
 */
SC_Sku.addToCart=function(a,b,c,d) {	
    var z=SC_Sku.getExpiration();	
	// no cookie yet	
    var e=SC_Sku.getCookie_eCommerce(a);	
    if(e=='' || e=='=') {	
	    var f=b;
        SC_Sku.writeImage(a,f,c,d);
		// check  cookie length and number of cookies.		
		var rm_cookie = SC_Sku.getCookie_ReMarketing();
		fields = rm_cookie.split("|");
		len=0;
		for(i =0; i < fields.length; i++){
			sku = fields[i].split("~")[1];
			len+=SC_Sku.getCookie_eCommerce(sku).length;			
		}
		len+=f.length;
		if(i < 10 && len < 1500){ 		
			document.cookie=a+'='+c+'|'+d+'|'+b+'; '+z+'; '+__A;		
			hs_sku = a;			
			SC_Sku.add();
		}
    } else{
    var g=-1; // existing qty
    var j=0; // existing price
    // cookie exists, no cookie... no love :p
    // look for current sku and get quantity
        var f=e.indexOf('=');
        // remove existing cookie
        if(f>=0) {
            g=e.substring(f+1,e.indexOf('|'));
            g=(g)?parseInt(g):parseInt(c);
        }
        SC_Sku.updateCart(a,c+g);
	}
 	
}


/**
 * Update sku in existing cookie
 * @params a {string} Sku
 * @params b {int} Quantity
 */
SC_Sku.updateCart=function(a,b) {
    var z=SC_Sku.getExpiration();
    if(parseInt(b)<=0) {
	hs_sku = "337~" + a;
        SC_Sku.deleteFromCart(a);
        return;
    }
    // get current cookie
    var c=SC_Sku.getCookie_eCommerce(a);
    // cookie exists, no cookie... no love :p
    if(c!='' && c!='=') {
        // look for current sku
        var d=c.indexOf('|');
        // remove existing cookie
        if(d>=0) {
            var e=c.substring(d);
            var f=SC_Sku.getSKUEventString(a);
            SC_Sku.writeImage(a,f,b,0);
            document.cookie=a+'='+b+e+'; '+z+'; '+__A;
	    hs_sku = a;
	    SC_Sku.add();
        }
    }
}

/**
 * Remove sku cookie
 * @params a {string} Sku
 * @returns Nonee
 */
SC_Sku.deleteFromCart=function(a) {
    var z=SC_Sku.getExpiration();
    // get current cookie
    var b=SC_Sku.getCookie_eCommerce(a);
    if(b!='' && b!='=')
        var c=SC_Sku.getSKUEventString(a);
        SC_Sku.writeImage(a,c,-1,-1);
        document.cookie=a+'=; '+z+'; '+__A;
	hs_sku="337~" + a;
	SC_Sku.del();
}

/**
 * Unload sku cookie
 * @params a {string} Sku
 * @params b {int} Quantity
 * @params c {float} Amount
 */
SC_Sku.unloadCookie=function(a,b,c,attr) {
    if(window.hs_aOE && window.hs_aOE != "" && hsExist('143',hsEvSpl(window.hs_aOE))){
    var orID =  hsGrabValue('143',hsEvSpl(window.hs_aOE));
    var emailAddress = hsGrabValue('1009',hsEvSpl(window.hs_aOE));
    }
	if(SC_Sku.existingCart()!= ""){
	hs_aOE += "1011~"+SC_Sku.existingCart()+"~";
	hs_stSearch('remarketing_return','',0);}
			
    var z=SC_Sku.getExpiration();
    // get event string from current cookie
    var d=SC_Sku.getSKUEventString(a);
    if((d == undefined || d == ""|| d == a+"=" ||d == a) && attr)
    d = attr;
    if((d == undefined || d == ""|| d == a+"=" ||d == a) && !attr)
    d = "131~";	
    if(orID && orID != "" && orID != undefined)
    d = "1120~"+a+"~158~"+emailAddress+"~1009~"+emailAddress+"~143~" + orID +"~"+ d;
    SC_Sku.writeImage(a,d,-1,-1,sc_qtyPID+'~'+b+'~'+sc_purchAmt+'~'+c+'~1018~'+a);
    document.cookie=a+'=; '+z+'; '+__A;

}

/**
 * Get sku event string
 * @params a {string} Sku
 * @returns {string} Sku Event String
 */
SC_Sku.getSKUEventString=function(a) {
    // get current cookie
    var b=SC_Sku.getCookie_eCommerce(a);
    if(b!='' && b!='=') {
        var c=b.lastIndexOf('|')+1;
        return ((c>=b.length)?'':b.substring(c,b.length));
    }
    return '';
}

/**
 * Write event string image to the page
 * @param a {string} Sku
 * @param b {string} Event string
 * @param c {int} New Quantity
 * @param d {float} Price
 * @param q {string} Unload cookie params
 * @returns None
 */
SC_Sku.writeImage=function(a,b,c,d,q) {
    var k=Math.random();
    var sc_prot="http"; if (document.location.protocol.indexOf('https') > -1) {  sc_prot="https"; }
    if(q) {
        var p='29~~28~'+sc_cartaff+'~'+q+'~'+b+'~'+sc_cartSKU+'~'+a;
        //document.write('<img src="'+sc_prot+'://'+sc_cartcoll+'/spacer.gif?RN='+k+'&event='+p+'" width="1" height="1" >');
		var pixel = document.createElement('img');
		pixel.src = sc_prot+'://'+sc_cartcoll+'/spacer.gif?RN='+k+'&event='+p;
		pixel.width = '1';
		pixel.height = '1';
		document.body.appendChild(pixel);
		return;
    }
    // get current cookie
    var e=SC_Sku.getCookie_eCommerce(a);
    var g=0; // existing qty
    var j=0; // existing price
    // cookie exists, no cookie... no love :p
    if(e!='' && e!='=') {
        // look for current sku and get quantity
        var f=e.indexOf('=');
        // remove existing cookie
        if(f>=0) {
            g=e.substring(f+1,e.indexOf('|'));
            g=(g)?parseInt(g):parseInt(c);
            var h=e.indexOf('|');
            if(h>=0) {
                var i=e.substring(h+1);
                j=i.substring(0,i.indexOf('|'));
                j=(j)?parseFloat(j):0;
            }

        }
    }
    var l=parseInt(c);
    if(l!=-1 && (l>g || l<g) && l!=1)
        l=l-g; // passing quantity
    else if(l!=-1 && (l>g || l<g) && l==1)
        l=l; // passing quantity
    else if(l==-1)
        l=l*g;
    var m=(d && d!=-1)?parseFloat(d):j;
    var n=parseFloat(l*m); // passing total
    var o='29~~28~'+sc_cartaff+'~'+sc_qtyEID+'~'+l+'~'+sc_priceID+'~'+m+'~'+sc_cartAmt+'~'+n+'~'+b+'~'+sc_cartSKU+'~'+a;
    //document.write('<img src="'+sc_prot+'://'+sc_cartcoll+'/spacer.gif?RN='+k+'&event='+o+'" width="1" height="1" >');

	var pixel2 = document.createElement('img');
	pixel2.src = sc_prot+'://'+sc_cartcoll+'/spacer.gif?RN='+k+'&event='+o;
	pixel2.width = '1';
	pixel2.height = '1';
	document.body.appendChild(pixel2);
}






