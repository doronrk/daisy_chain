define("pageLocation/pageLocation",["jquery","get!core/eBags"],function(n,t){var i={};return i.setCookie=function(n){document.cookie="pl="+escape(n)+"; path=/;"},i.saveUserData=function(n,i,r){var u=[{PageInteractionTracking:n}];i&&u.push({Page:i});r&&u.push(r);t.saveUserData(u)},i.init=function(){i.setCookie("0");n("a[data-pl], input[data-pl], area[data-pl]").live("click",function(){var n=i.buildPlValue("data-pl",this);i.setCookie(n)});n("a[data-pl-share]").live("click",function(){var t=n(this).closest("[data-pl-root]"),r;n("[data-pl-share="+n(this).attr("data-pl-share")+"]").attr("data-pl-share",t.attr("data-pl-root"));t.length>0&&(r=i.buildPlValue("data-pl-share",this),i.setCookie(r))});n("li[data-pl]").live("click",function(){var r=n(this).attr("data-pl"),t=n(this).attr("data-pitp");t==undefined&&(t=n(this).find("a:first").text());i.saveUserData(r,t)})},i.buildPlValue=function(t,i){var r=n(i).attr(t),u;if(n(i).attr("data-pl-no-index")==undefined)try{u=n("["+t+"="+r+"]").index(i);r+=u+1}catch(f){}return r},i})