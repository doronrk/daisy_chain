/* Script imported from http://www.kay.com/js/socialmedia/SocialMediaJS.js */
(function(d){var js,id="facebook-jssdk";if(d.getElementById(id)){return;}js=d.createElement("script");js.id=id;js.async=true;js.src="//connect.facebook.net/en_US/all.js";d.getElementsByTagName("head")[0].appendChild(js);}(document));window.fbAsyncInit=function(){FB.init({appId:"252040081528535",status:true,cookie:true,xfbml:true});FB.Event.subscribe("edge.create",function(href,widget){cmCreateElementTag(socialItemSku,"Facebook Likes","");cmCreateManualLinkClickTag("Facebook Likes","Facebook Likes","PRODUCT:"+socialItemSku);});FB.Event.subscribe("edge.remove",function(href,widget){cmCreateElementTag(socialItemSku,"Facebook UnLikes","");cmCreateManualLinkClickTag("Facebook Unlikes","Facebook Unlikes","PRODUCT:"+socialItemSku);});};(function(){var po=document.createElement("script");po.type="text/javascript";po.async=true;po.src="https://apis.google.com/js/plusone.js";var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(po,s);})();function googlePlusCallBack(jsonParam){if(jsonParam.state=="on"){cmCreateElementTag(socialItemSku,"GooglePlus Share","");cmCreateManualLinkClickTag("GooglePlus Share","GooglePlus Share","PRODUCT:"+socialItemSku);}}function postToTwitter(url,prodDesc){url=encodeURIComponent(url);prodDesc=encodeURIComponent(prodDesc);window.open("http://twitter.com/share?url="+url+"&text="+prodDesc+"&via=KayJewelers","sharer","toolbar=0,status=0,width=626,height=436");cmCreateElementTag(socialItemSku,"Twitter tweet ");cmCreateManualLinkClickTag("Twitter tweet","Twitter tweet","PRODUCT:"+socialItemSku);}function loadFacebookAnalytics(){cmCreateElementTag("Facebook Likes","Facebook Likes","");cmCreateManualLinkClickTag("Facebook Likes","Facebook Likes"," ");}function loadTwitterAnalytics(){cmCreateElementTag("Twitter Follow","Twitter Follow","");cmCreateManualLinkClickTag("Twitter Follow","Twitter Follow"," ");}function pinThisCallback(urlPin,hostName,imagePath,prodDescrip){if(urlPin.substring(0,4)!="http"){urlPin="http://"+hostName+urlPin;}urlPin=encodeURIComponent(urlPin);prodDescrip=encodeURIComponent(prodDescrip);if(imagePath.substring(0,7)=="/images"){imagePath=hostName+imagePath;}if(imagePath.substring(0,2)=="//"){imagePath=imagePath.replace("//","");}var mediaUrl="http://"+imagePath;mediaUrl=encodeURIComponent(mediaUrl);window.open("http://pinterest.com/pin/create/button/?url="+urlPin+"&media="+mediaUrl+"&description="+prodDescrip,"signin","height=300,width=665");cmCreateElementTag(socialItemSku,"Pin It");cmCreateManualLinkClickTag("Pin It","Pin It","PRODUCT:"+socialItemSku);}