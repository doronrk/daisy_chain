/**
* Login check
*/
function isLogin(){
	
	var remoteId = getCookie("remoteId");
	var optVal = getCookie("iPlanetDirectoryProOptVal");

	if ((remoteId != null) && (remoteId != "")){
		
		return true;
	}else if((optVal != null) && (optVal != "")){
			
		loginUser(optVal);
		
	} else{
		return false;
	}
	
	
}
function loginUser(val){
   $.ajax({
        type: "POST",
        url: "http://sso-us.samsung.com/sso/profile/saLoginUser?optVal="+val,
        dataType: "jsonp",
        async: false,
        cache: false,
        jsonpCallback: "callbackSso",
		jsonp: "callback"
    });
}

function callbackSso(data){
	if(data.login){
	var loginLink = $('.login');
	 var logoutLink = $('.logout');
	 loginLink.text('HI, ' + getUserName());
	  $('.login-trigger').hover(function(){
          loginLink.addClass('account-open');
          $(".myaccount-dropdown").css({opacity:1, display:'block'});
      }, function(){
          loginLink.removeClass('account-open');
          $(".myaccount-dropdown").css({opacity:0, display:'none'});
          open = false;
      });
	  
	  hostName();
      loginLink.text('HI, ' + getUserName());
      logoutLink.click(function(){
         dropCookiesHistory(logoutLink.attr('href'));
      });
	}
}

 function hostName(){
    var hostName = location.hostname;
    var logout = $('.logout');

    if(hostName.indexOf('devus') !== -1 || hostName.indexOf('devwww') !== -1 || hostName.indexOf('dev') !== -1) {
        logout.attr("href" ,'http://sso-dev.us.samsung.com/sso/logout');
    }
    else if(hostName.indexOf('stgwww') !== -1 || hostName.indexOf('stgapp') !== -1) {
        logout.attr("href" ,'http://sso-stg.us.samsung.com/sso/logout');
    }
    else if(hostName.indexOf('stgweb') !== -1) {
        logout.attr("href" ,'http://sso-us.samsung.com/sso/logout');
    }
    else {
        logout.attr("href" ,'http://sso-us.samsung.com/sso/logout');
    }

}
function dropCookiesHistory(href){
    var thisURL=document.URL;

    if(thisURL.indexOf("/us/appstore") >= 0){
        thisURL = thisURL.substring(0,thisURL.indexOf("/us/appstore"))+"/us/appstore";
        if(thisURL.indexOf("https://secureus") === 0){
            thisURL = thisURL.replace("https://secureus", "http://www");
        }
    }

    var finalURL = href + "?url=" + thisURL;

    $('.logout').attr("href", finalURL);

    deleteCookie("prof_country", "/", document.domain);
    deleteCookie("prof_prolist_saved", "/", "");
    deleteCookie("prof_id", "/", document.domain);
    deleteCookie("prof_lname", "/", document.domain);
    deleteCookie("prof_bpno_s", "/", document.domain);
    deleteCookie("prof_fname", "/", document.domain);
    deleteCookie("prof_login_success", "/", document.domain);
    deleteCookie("bvdisplaycode", "/", "");
    deleteCookie("bvproductid", "/", "");
    deleteCookie("bvpage", "/", "");
    deleteCookie("bvcontenttype", "/", "");
    deleteCookie("bvauthenticateuser", "/", "");
    deleteCookie("bzv_url", "/", "");
    deleteCookie("auth_flag", "/", "");
    deleteCookie("iPlanetDirectoryProOptVal", "/", document.domain);
    deleteCookie("iPlanetDirectoryPro", "/", document.domain);
    deleteCookie("tppid", "/", document.domain);
    deleteCookie("tmktid", "/", document.domain);
    deleteCookie("tmktname", "/", document.domain);
    deleteCookie("tlgimg", "/", document.domain);
    deleteCookie("taccessrtype", "/", document.domain);
    deleteCookie("dr_a_token", "/", document.domain);
    deleteCookie("dr_r_token", "/", document.domain);
    deleteCookie("work_email", "/", document.domain);
    deleteCookie("work_pin", "/", document.domain);

    $.ajax({
        url: "http://shop.us.samsung.com/store?Action=Logout&Locale=en_US&SiteID=samsung&sout=json",
        dataType:'jsonp',
        data:'jsonp=callbackLogout'

    });

    return true;
}
/**
* Logout
*/
function clearCookiesAndMakeFinalURL(hrefValue)
{
     var mainURL=document.URL;

	 if(mainURL.indexOf("/us/appstore") >= 0){ 
		 mainURL = mainURL.substring(0,mainURL.indexOf("/us/appstore"))+"/us/appstore";
		 if(mainURL.indexOf("https://secureus") == 0){
			 mainURL = mainURL.replace("https://secureus", "http://www");
		 }
	 }

     var finalURL=hrefValue+"?url="+mainURL;
     $(".logout").attr("href", finalURL);
    

     deleteCookie("prof_country", "/", document.domain);
     deleteCookie("prof_id", "/", document.domain);
     //deleteCookie("prof_prolist", "/", document.domain);
     deleteCookie("bvdisplaycode", "/", "");
     deleteCookie("bvproductid", "/", "");
     deleteCookie("bvpage", "/", "");
     deleteCookie("bvcontenttype", "/", "");
     deleteCookie("bvauthenticateuser", "/", "");
     deleteCookie("bzv_url", "/", "");
     deleteCookie("auth_flag", "/", "");
     
     $.ajax({

	url: "http://shop.us.samsung.com/store?Action=Logout&Locale=en_US&SiteID=samsung&sout=json",
	dataType:'jsonp',
	data:'jsonp=callbackLogout'

	  
     });
     return true;
}

function callbackLogout(data){

/*
var mainURL=document.URL;

	 if(mainURL.indexOf("/us/appstore") >= 0){ 
		 mainURL = mainURL.substring(0,mainURL.indexOf("/us/appstore"))+"/us/appstore";
		 if(mainURL.indexOf("https://secureus") == 0){
			 mainURL = mainURL.replace("https://secureus", "http://www");
		 }
	 }

     var finalURL=hrefValue+"?url="+mainURL;
     
location.href = finalURL;
*/
}
/**
* get UserName
*/
function getUserName() {
    var prof_fname = getCookie("prof_fname");
    var name = "";

    try {
        if (prof_fname)
            name = prof_fname.substring(0, 10);
    } catch (e) {
    }

    return name;
}