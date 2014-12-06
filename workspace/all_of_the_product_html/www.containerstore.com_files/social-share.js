var shareWindowWidth=650;
var shareWindowHeight=300;
$(document).ready(function(){$(".social-share-buttons img").click(function(){var type=$(this).data("type");
var parent=$(this).parent();
var url=parent.data("url")||document.URL;
var title=parent.data("title")||document.title;
if(providers.hasOwnProperty(type)){providers[type](url,parent.data("title"),parent.data("image"),parent.data("description"))
}_gaq.push(["_trackEvent","social-share",type,url])
})
});
function updateShareData(data){for(key in data){$(".social-share-buttons").data(key,data[key])
}}function openWindow(url,title,width,height){var top=(screen.height/2)-(height/2);
var left=(screen.width/2)-(width/2);
window.open(url,title,"top="+top+",left="+left+",toolbar=0,status=0,width="+width+",height="+height)
}var providers={facebook:function(url,title,image,description){var query=$.param({s:100,p:{title:title,summary:description,url:url,images:[image]}});
openWindow("//www.facebook.com/sharer.php?"+query,"sharer",shareWindowWidth,shareWindowHeight)
},pinterest:function(url,title,image){var query=$.param({description:title,url:url,media:image});
openWindow("//pinterest.com/pin/create/button/?"+query,"sharer",shareWindowWidth,shareWindowHeight)
},twitter:function(url,title){var query=$.param({text:title,url:url});
openWindow("//twitter.com/share?"+query,"sharer",shareWindowWidth,shareWindowHeight)
},google:function(url){var query=$.param({url:url});
openWindow("//plus.google.com/share?"+query,"sharer",shareWindowWidth,shareWindowHeight)
},print:function(){window.print()
},email:function(url,title,image,description){window.location.href="mailto:?subject="+title+"&body="+description+encodeURI("\n\r")+url
}};