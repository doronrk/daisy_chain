
/*script:flash.js*/
var startTScript=new Date().getTime ();
var DELL=window.DELL||{};DELL.com=DELL.com||{};DELL.com.Utils=DELL.com.Utils||{};DELL.com.Utils.Flash=DELL.com.Utils.Flash||{};(function($){(function(){this.resizeFlash=function(w,h,id){var flash=document.getElementById(id);if(flash===null){flash=document.getElementByName(id);}
if(!isNaN(w)){flash.width=w;}
if(!isNaN(h)){flash.height=h;}
return id;},this.renderFlash=function(context){if(context.size()<=0)
return;var $fc=$('.inlineflash');if(swfobject.hasFlashPlayerVersion("1")){$fc.each(function(i){var lwp=DELL.com.Delphi.PageSettings.lwp;var fr=DELL.com.Delphi.PageSettings.FlashRoot;var f=$(this);var fuid=f.attr("fuid");if(fuid==null||fuid.length==0){fuid="fuid_"+Math.floor(Math.random()*10000);f.attr("id",fuid);}
var fa=f.attr("fa");var fpv=f.attr("fpv");if(fpv==null||fpv.length==0){fpv="9.0.0";}
var url=f.attr("rel");var fw=f.attr("fwidth");var fh=f.attr("fheight");var fasa=f.attr("fasa");var fplay=f.attr("fplay");var fmenu=f.attr("fmenu");var fscale=f.attr("fscale");var fdf=f.attr("fdf");var fwm=f.attr("fwm");var fslc=f.attr("fslc");var floop=f.attr("floop");var fq=f.attr("fq");var fsa=f.attr("fsa");var fbgc=f.attr("fbgc");if(fbgc==null||fbgc.length==0){fbgc="#FFFFFF";}
var fst=f.attr("fst");var fafs=f.attr("fafs");var fan=f.attr("fan");var flashvars=f.attr("flashvars");var p={allowscriptaccess:fasa,play:fplay,menu:fmenu,scale:fscale,devicefont:fdf,wmode:fwm,swliveconnect:fslc,loop:floop,quality:fq,salign:fsa,bgcolor:fbgc,seamlesstabbing:fst,allowfullscreen:fafs,allownetworking:fan};var fv={country:lwp.Country,language:lwp.Language,customerset:lwp.CustomerSet,segment:lwp.Segment,r:"us",containerURL:escape(document.location.href)};var fvar=f.attr("fvar");if(fvar!=null&&fvar.length>0){var fvars=fvar.split("&");for(var i=0;i<fvars.length;i++){var parts=fvars[i].toString().split("=");if(parts[0]!=null&&parts[0].length>0)
fv[parts[0]]=parts[1];}}
var attributes={id:fuid};swfobject.embedSWF(url,fuid,fw,fh,fpv,fr+"media_player/expressinstall.swf",fv,p,attributes);});}else{$fc.find(".flashAlt").css({'visibility':'visible'});}}
var onLoad={initFlash:function(){var context=DELL.com.Utils.Context.$PRIMARYCONTAINER||$("#primaryContent, #franchisePrimaryContent");DELL.com.Utils.Flash.renderFlash(context);}};DELL.com.Utils.Initialize(onLoad);}).call(DELL.com.Utils.Flash);})(jQuery);
if (window.console){console.log('ex time: flash.js', new Date().getTime() - startTScript);}



/*script:global.js*/
var startTScript=new Date().getTime ();

var resizeFlash=DELL.com.Utils.Flash.resizeFlash;
if (window.console){console.log('ex time: global.js', new Date().getTime() - startTScript);}



/*script:scene7_player.js*/
var startTScript=new Date().getTime ();

var $j=jQuery;var DELL=window.DELL||{};DELL.com=DELL.com||{};DELL.com.Scene7=DELL.com.Scene7||{};(function($){(function(){var Scene7Player=function(__id){this.initialize();}
Scene7Player.prototype={initialize:function(){}};this.init=function(){var context=DELL.com.Utils.Context.$PRIMARYCONTAINER||$("#primaryContent, #franchisePrimaryContent");if(context.size()<=0){return;}
context.find('a.scene7PlayerEmbedLink').click(function(e){e.preventDefault();})
if(context.find('a.scene7PlayerEmbedLink').length>0){var swfPath="";if(document.getElementById("scene7")&&document.getElementById("scene7").getAttribute("href"))
{swfPath=document.getElementById("scene7").getAttribute("href");}
var flashvars={},parameters={allowscriptaccess:'always',wmode:'transparent',allowfullscreen:'true',src:swfPath,width:"965",height:"450"},attributes={id:"productScene7",name:"productScene7",data:swfPath,flashvars:""};swfobject.createSWF(attributes,parameters,"productScene7");}}
if(!$(".bigHeroImg").length>0)
DELL.com.Scene7.init();}).call(DELL.com.Scene7);})(jQuery);function onScene7ViewerClick(){document.getElementById("ctl00_ctl00_MainBodyPlacerHolder_MainBodyTopPlaceHolder_ProductMicroContentControl1").style.display="none";}
if (window.console){console.log('ex time: scene7_player.js', new Date().getTime() - startTScript);}



/*script:scene7_noFlash.js*/
var startTScript=new Date().getTime ();

var $j=jQuery;var DELL=window.DELL||{};DELL.com=DELL.com||{};DELL.com.Scene7noFlash=DELL.com.Scene7noFlash||{};(function($){(function(){this.init=function(){var myHref=$("#scene7").length>0?$("#scene7").attr('href'):$("#productScene7").attr('data');var alternateMarkup03e13f6a17bb4a84a9d303f3db8f5c92="";if(swfobject.hasFlashPlayerVersion("1")&&myHref){}else{if(typeof myHref!="undefined"){var myHrefArr1=myHref.split("&asset=DellComputer/");if(myHrefArr1.length>1){}else{var myHrefArr1=myHref.split("&media=DellComputer/");}
var myHrefArr2=myHrefArr1[1].split("&");alternateMarkup03e13f6a17bb4a84a9d303f3db8f5c92=myHrefArr2[0];}
$("#scene7").remove();if(alternateMarkup03e13f6a17bb4a84a9d303f3db8f5c92.length>0){if($('#productScene7').css('float')=='right'){$("#productScene7").html('<img src=\"http://scene7-cdn.dell.com/is/image/DellComputer/'+alternateMarkup03e13f6a17bb4a84a9d303f3db8f5c92+'?hei=450&wid=500\" style="float:right;"/>');}else{$("#productScene7").html('<img src=\"http://scene7-cdn.dell.com/is/image/DellComputer/'+alternateMarkup03e13f6a17bb4a84a9d303f3db8f5c92+'?hei=366&wid=965\"/>');}}}};onload={initialize:function(){DELL.com.Scene7noFlash.init();}};DELL.com.Utils.Initialize(onload);}).call(DELL.com.Scene7noFlash);})(jQuery);
if (window.console){console.log('ex time: scene7_noFlash.js', new Date().getTime() - startTScript);}



/*script:flickr.js*/
var startTScript=new Date().getTime ();

var DELL=window.DELL||{};DELL.com=DELL.com||{};DELL.com.Flickr=DELL.com.Flickr||{};(function($){(function(){var self=this;var container=false;var flickrURL="http://api.flickr.com/services/feeds/photos_public.gne?id=31173559@N07&lang=en-us&format=json";var flickrElement=$('div.rssReaderContainer div.flickrReader');var flickrList=$(flickrElement).find('ul');var linktarget=$(flickrElement).find("input[name='linkTarget']").val();var show=$(flickrList).attr("class");var maxWidth="60";var imgArray=new Array();jsonFlickrFeed=function(data){$.each(data.items,function(i,item){if(i==show)return false;var listItem=$("<li/>");var link=$("<a/>").attr({href:item.link,target:linktarget||"_blank"});$("<img/>").attr({src:item.media.m,alt:item.title,target:"_self",className:((i+1)%3==0)?"last":false}).bind("load",self.resizeImage).appendTo(link);$(link).appendTo(listItem);$(listItem).appendTo(flickrList);});$(flickrElement).append($("<a/>").attr({href:data.link,target:"_self",className:"viewMore"}).text("View more"));};self.resizeImage=function(){var ratio;var notLoaded=imgArray.length;$(this).css("display","inline");if(notLoaded>0){if(imgArray[notLoaded-1].width>0){ratio=maxWidth/imgArray[notLoaded-1].width;imgArray[notLoaded-1].width=ratio*imgArray[notLoaded-1].width;imgArray[notLoaded-1].height=ratio*imgArray[notLoaded-1].height;imgArray.pop();}}
if(this.width>0){ratio=maxWidth/this.width;height=this.height;this.width=ratio*this.width;this.height=ratio*height;}else{imgArray.push(this);}};self.getPhotos=function(){$.ajax({url:flickrURL,dataType:"jsonp",jsonpCallback:"self.formatPhotos"});};self.onload={initialize:function(){if(DELL.com.Utils.Context.$PRIMARYCONTAINER.find(".flickrReader").size()>0){self.getPhotos();}}};DELL.com.Utils.Initialize(self.onload);}).call(DELL.com.Flickr)})(jQuery);
if (window.console){console.log('ex time: flickr.js', new Date().getTime() - startTScript);}



/*script:youtube.js*/
var startTScript=new Date().getTime ();

var DELL=window.DELL||{};DELL.com=DELL.com||{};DELL.com.YouTubeLoader=DELL.com.YouTubeLoader||{};(function($){(function(){var getObject=function(__playerID){return document.getElementById(__playerID);},loadVideoById=function(id,startSeconds,__playerID)
{if(id.indexOf('v=')!=-1)
{var newid=id.split("v=");id=newid[1];}
if(id.indexOf('&')!=-1)
{var newid=id.split("&");id=newid[0];}
var obj=getObject(__playerID);obj.loadVideoById(id,startSeconds);},cueNewVideo=function(id,startSeconds,__playerID)
{var obj=getObject(__playerID);obj.cueVideoById(id,startSeconds);},clearVideo=function(__playerID)
{var obj=getObject(__playerID);obj.clearVideo();},setSize=function(w,h,__playerID)
{var obj=getObject(__playerID);obj.setSize(w,h);},play=function(__playerID)
{var obj=getObject(__playerID);obj.playVideo();},pause=function(__playerID)
{var obj=getObject(__playerID);obj.pauseVideo();},stop=function(__playerID)
{var obj=getObject(__playerID);obj.stopVideo();},seekTo=function(seconds,__playerID)
{var obj=getObject(__playerID);obj.seekTo(seconds,true);},getPlayerState=function(__playerID)
{var obj=getObject(__playerID);return obj.getPlayerState();},getBytesLoaded=function(__playerID)
{var obj=getObject(__playerID);return obj.getVideoBytesLoaded();},getBytesTotal=function(__playerID)
{var obj=getObject(__playerID);return obj.getVideoBytesTotal();},getCurrentTime=function(__playerID)
{var obj=getObject(__playerID);return obj.getCurrentTime();},getDuration=function(__playerID)
{var obj=getObject(__playerID);return obj.getDuration();},getStartBytes=function(__playerID)
{var obj=getObject(__playerID);return obj.getVideoStartBytes();},setVolume=function(newVolume,__playerID)
{var obj=getObject(__playerID);obj.setVolume(newVolume);},getVolume=function(__playerID)
{var obj=getObject(__playerID);return obj.getVolume();},mute=function(__playerID)
{var obj=getObject(__playerID);obj.mute();},unMute=function(__playerID)
{var obj=getObject(__playerID);obj.unMute();},getEmbedCode=function(__playerID)
{var obj=getObject(__playerID);return obj.getVideoEmbedCode();},getVideoUrl=function(__playerID)
{var obj=getObject(__playerID);return obj.getVideoUrl();};this.loadVideoById=loadVideoById;this.cueNewVideo=cueNewVideo;this.clearVideo=clearVideo;this.setSize=setSize;this.play=play;this.pause=pause;this.stop=stop;this.seekTo=seekTo;this.getPlayerState=getPlayerState;this.getBytesLoaded=getBytesLoaded;this.getBytesTotal=getBytesTotal;this.getCurrentTime=getCurrentTime;this.getDuration=getDuration;this.getStartBytes=getStartBytes;this.setVolume=setVolume;this.getVolume=getVolume;this.mute=mute;this.unMute=unMute;this.getEmbedCode=getEmbedCode;this.getVideoUrl=getVideoUrl;}).apply(DELL.com.YouTubeLoader);var youTubeStateChangeFunction;function getYouTubeObject(__playerID)
{return document.getElementById(__playerID);}
function onYouTubePlayerReady(__playerID)
{var obj=getYouTubeObject(__playerID);youTubeStateChangeFunction=function(__newState)
{var obj=getYouTubeObject(__playerID);obj.playerStateUpdateHandler(__newState);}
obj.addEventListener("onStateChange","onYouTubeStateChange");}
function onYouTubeStateChange(__newState)
{youTubeStateChangeFunction(__newState);}})(jQuery);
if (window.console){console.log('ex time: youtube.js', new Date().getTime() - startTScript);}



/*script:media_player.js*/
var startTScript=new Date().getTime ();

(function($){var MediaPlayer=function(__id){this.initialize();}
MediaPlayer.prototype={initialize:function(){}};$(document).ready(function(){var context=DELL.com.Utils.Context.$PRIMARYCONTAINER||$("#primaryContent, #franchisePrimaryContent");if(context.size()<=0)
return;context.find('a.mediaPlayerEmbedLink').click(function(e){e.preventDefault();if($(this).parent().parent().prev().attr('id')){var movieName=$(this).parent().parent().prev().attr('id');}
else{var movieName=$('.mediaPlayerContainer object').attr('id');}
if(navigator.appName.indexOf("Microsoft")!=-1){window[movieName].openEmbedPanel();}
else{document[movieName].openEmbedPanel();}})
$('.inlinevideo',context).each(function(i){var fr=DELL.com.Delphi.PageSettings.FlashRoot;var v=$(this);var m=v.attr("rel");var oid=v.attr("oid");var wide=v.attr("ws");var b=$(".iv_thumb",v).attr("src");var t=escape($(".iv_title",v).html());var d=$("a",v).attr("href")||"#";var pt=v.attr("pt")||"related";var c=v.attr("css")||fr+"media_player/assets/css/media_player_theme.css";var l=v.attr("lang")||"en";var w
v.attr("width")!=undefined?w=v.attr("width").replace("px",""):w=250;var h
v.attr("height")!=undefined?h=v.attr("height").replace("px",""):h=232;var id=v.attr("id");if(id==null||id.length==0){id="fid_"+Math.floor(Math.random()*10000);v.attr("id",id);}
if(oid!=null&&oid!=""){var swfPath="http://i.dell.com/images/global/ooyala/swf/ooyala_player.swf";var mode="";switch(pt.toUpperCase()){case"FEATURED":mode="normal";break;case"RELATED":mode="rightRail";break;case"INLINE":mode="rightRail";break;case"MAIN":mode="main";break;default:mode="normal";break;}
if(String(wide).toUpperCase()=="YES"){h=(w*.5625);}
var fv={themePath:"images/global/ooyala/swf/theme-about_dell.swf",xmlPath:"images/global/ooyala/xml/playerMasterCopy.xml",mode:mode,playerWidth:w,playerHeight:h,embedCode:oid,autoplay:0,l:l,hostedAtURL:d,enableFullScreen:0};if(String(wide).toUpperCase()=="YES"&&mode!="rightRail"){h=h+44;}
var p={allowscriptaccess:'always',wmode:'transparent',allowfullscreen:'true',src:swfPath,width:w,height:h};var attributes={id:id};}
else{var swfPath=fr+"media_player/delphi_media_player.swf";var p={allowscriptaccess:'always',wmode:'transparent',allowfullscreen:'true',src:swfPath,width:w,height:h,base:fr};var labelResume=DELL.com.Utils.Localize('label_resume')
var labelReplay=DELL.com.Utils.Localize('label_replay')
var labelShare=DELL.com.Utils.Localize('label_share')
var labelEmbed=DELL.com.Utils.Localize('label_embed')
var labelEmbedBtn=DELL.com.Utils.Localize('label_embed_btn')
var labelEmbedBtnPressed=DELL.com.Utils.Localize('label_embed_btn_pressed')
var labelPlayPause=DELL.com.Utils.Localize('label_play_pause')
var labelExpandContract=DELL.com.Utils.Localize('label_expand_contract')
var fv={appWidth:w,media:m,thumb:b,mediaTitle:t,destination:d,languageCode:l,basePath:fr+"media_player/",playerType:pt,CSSFile:c,flashID:id,labelResume:labelResume,labelReplay:labelReplay,labelShare:labelShare,labelEmbed:labelEmbed,labelEmbedBtn:labelEmbedBtn,labelEmbedBtnPressed:labelEmbedBtnPressed,labelPlayPause:labelPlayPause,labelExpandContract:labelExpandContract};var attributes={id:id};}
if(m.indexOf(".wmv")>-1){if(pt=='main'){this.innerHTML='<object id="MediaPlayer" width="'+w+'" height="'+h+'" classid="CLSID:22D6f312-B0F6-11D0-94AB-0080C74C7E95" standby="Loading�" type="application/x-oleobject" codebase="http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=6,4,7,1112"><param name="AllowChangeDisplaySize" value="true"><param name="autosize" value="false"><param name="filename" value="'+m+'" /><param name="Showcontrols" value="True" /><param name="autoStart" value="True" /><embed type="application/x-mplayer2" autoStart="true" src="'+m+'" name="MediaPlayer" width="'+w+'" height="'+h+'"></embed></object>';}
return;}
if(m.indexOf(".swf")>-1){swfobject.embedSWF(m,id,w,h,"9.0.0",fr+"media_player/expressinstall.swf",fv,{},{});return;}
swfobject.embedSWF(swfPath,id,w,h,"9.0.0",fr+"media_player/expressinstall.swf",fv,p,attributes);})
DELL.com.Utils.ooyalaCallback=function(playerId,eventName,parameters){}});})(jQuery);
if (window.console){console.log('ex time: media_player.js', new Date().getTime() - startTScript);}


