/*! Stand Alone Share Solution for H&M 1.1 2014-03-20, 09:44:35 */
!function(a,b){HMShare=function(a){var c={};c.Widgets={},c.Proxy={};var d={};return d.service=a,d.created=!1,d.init=function(){c.Widgets=new HMShareWidget,c.Proxy=new HMShareProxy},d.getOG=function(a){var c=b(['meta[property="og:',a,'"]'].join(""));return c.length?c.attr("content"):null},d.getMeta=function(a){var c=b(['meta[name="',a,'"]'].join(""));return c.length?c.attr("content"):null},c.appendTemplate=function(a,c){d.created=!0,a&&(b("body").append(a),c=c?c:".share-holder",d.shareHolder=b(".share-holder"))},c.destroy=function(){b(".share-holder").remove(),c.Widgets.destroyAll(),d.created=!1},c.create=function(a,e,f){if(d.created&&c.destroy(),e){var g=b(e);c.appendTemplate(g.html(),f)}else d.created=!0;a.shortUrl=location.href,a.title=d.getOG("title")||b("title").text(),a.description=d.getOG("description")||d.getMeta("description")||a.twitterText,a.smallImageURL=d.getOG("image")||"",a.largeImageURL=d.getOG("image")||"",c.Widgets.replaceAll(a)},c.isCreated=function(){return d.created},c.createIsolated=function(a,e,f){if(d.created&&c.destroy(),e){var g=b(e);c.appendTemplate(g.html(),f)}else d.created=!0;a.returnUrl&&!a.shortUrl&&(a.shortUrl=a.returnUrl),c.Proxy.generateShortUrl(a,function(b){b.fbAppId=a.fbAppId||null,c.Widgets.replaceAll(b)})},c.show=function(){d.shareHolder&&d.shareHolder.show()},c.hide=function(){d.shareHolder&&d.shareHolder.hide()},d.init(),c},a.Plugin=HMShare}(this,jQuery),function(a,b){HMShareProxy=function(){var a={},c={};return c.data={},c.apiURL="http://share.hm.com/forward/api",a.generateShortUrl=function(a,b){c.callback=b,c.data=a,c.data.returnUrl=c.data.shortUrl=c.data.shortUrl?c.data.shortUrl:location.href,c.getShortUrl()},c.getShortUrl=function(){c.data.useShortURL=!0,c.data.disableProxy=!1,b.ajax({type:"POST",url:c.apiURL+"/getShortURL",data:c.data,success:c.updateShortUrl,error:function(a,b,c){alert("[ HMShareProxy.js / private.getShortUrl ]\ntype: "+b+"\nmessage: "+c)},dataType:"JSONP"})},c.updateShortUrl=function(a){c.data.shortUrl=a.url,"function"==typeof c.callback&&c.callback.apply(null,[c.data])},a},a.Plugin=HMShareProxy}(this,jQuery),function(a,b){HMShareWidget=function(a){var c={},d={};return d.widgets=[],d.proxy=a,d.socialIconsSprite="'data:image/png;base64,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'",-1!=navigator.appVersion.indexOf("MSIE 8.")&&(d.socialIconsSprite="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAABwCAIAAACYZWdsAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NUVDMDE5M0E4RDhBMTFFM0EzMDI5MDA3ODUxNTREQ0YiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NUVDMDE5M0I4RDhBMTFFM0EzMDI5MDA3ODUxNTREQ0YiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1RUMwMTkzODhEOEExMUUzQTMwMjkwMDc4NTE1NERDRiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1RUMwMTkzOThEOEExMUUzQTMwMjkwMDc4NTE1NERDRiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpcC7AoAAA2JSURBVHjajFgLdFTF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'"),d.shareCSS='<style type="text/css">#share-dialog>.share-content>#content-facebook>.fb_iframe_widget{display:block!important;margin:0}#share-dialog>.share-content>#content-facebook>.fb_iframe_widget>span{min-height:20px;min-width:120px;width:150px;display:block!important;margin:0 auto}#share-dialog>.share-content>#content-facebook>.fb_iframe_widget>span>iframe{min-height:20px;min-width:150px;width:150px;position:relative;left:0;margin:0!important}#share-dialog>.share-header>.share-tab>a{cursor:pointer}#share-dialog>.share-header>.share-tab>a>span{background:url('+d.socialIconsSprite+") no-repeat;background-size:16px 112px;width:16px;height:16px;text-indent:-9999em;font-size:0;display:block;position:absolute;margin:auto;top:0;left:0;right:0;bottom:0;border-radius:2px}#share-dialog>.share-header>#header-facebook>a>span{background-position:0 0}#share-dialog>.share-header>#header-twitter>a>span{background-position:0 -16px}#share-dialog>.share-header>#header-googleplus>a>span{background-position:0 -32px}#share-dialog>.share-header>#header-pinterest>a>span{background-position:0 -48px}#share-dialog>.share-header>#header-tumblr>a>span{background-position:0 -64px}#share-dialog>.share-header>#header-vkontakte>a>span{background-position:0 -80px}#share-dialog>.share-header>#header-sinaweibo>a>span{background-position:0 -96px}#share-dialog>.share-header>.share-tab{float:left;width:70px;height:48px;line-height:30px;background:#f1f1f1}.singleTab{min-width:70px;width:100%}#share-dialog>.share-header>.share-tab a{height:100%;display:block;position:relative}.share-dialog{background:#fff;display:none;position:relative;z-index:90}.share-dialog .close{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NURENkRCOTBFNzk2MTFFMTk4NTdCRkYyNDIyRkM4OEEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NURENkRCOTFFNzk2MTFFMTk4NTdCRkYyNDIyRkM4OEEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1REQ2REI4RUU3OTYxMUUxOTg1N0JGRjI0MjJGQzg4QSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1REQ2REI4RkU3OTYxMUUxOTg1N0JGRjI0MjJGQzg4QSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrROooQAAAJFSURBVHjalFU9bxpBEJ3jB2CqFI4tkTbnAilFgl0EYgVMB7LBZWz3TuAHRJA6EoiUkaW0AVsmVfiQLGgCjlJAYVLHcn6A4z9wmbfZJXvH7YGfNNqP2X03N7P7lsgAx3EibAdsLbax8x9jOQdfxLTfMpBWuHnDFrm5+U3Tqyn9nE6F77Ftk71h0/r6Goa3bHXLsioUBBllH2ENvw2d3eyes/rgoa+9fJFy2l87+l9EfCOWjv7dn7tY+W2Fmo0mLYOdTJpq9RqFV8ITHiY5+lsvcYubbGo7LX79PkBqehdddAdMnEQnJEmzIEWkOilHYSTTfdiDvYwEijojZpRRpJOPJ64ovv+4pMJ+YY4Uc/BhjQL2ggNcgpi/EOU2ppP+25wXUdU+VF3k6GMOPqzRUX1fRRNlzhjSUERZnz55Nlf5xufm7PAWj0vCFODzrgeHWi7OLHqmY6WTB5Eqk6iEFlW89LrkKij6mDNhNByheb6QGDnVi4S+X0Fnflus/RUKOlqqUECzcSoM8BbU5xheI8c4e87RqyNXrkyF8hZU3wMOiWyIb8oAYpI3RIAo9ZyiryL3Ip3ZEcLEnF8sTc3Ke7m8Sr5AfDPuGuvw+rRr/Q5qZ2kCNOabE01tp4iF6F5agbyenZ+CHAL0CEIkiicVKQeNxYIgjQggxTCn1G12KngCspfDV00a4SeZvYueivRQ1sv/BRH3nOgT9AOi0m13qNPuutZsbsUJxZavyESSTpb6Re29M6GvJHLpN8/nIwnXJu2XTfgrwAAS/tudUhZ0xwAAAABJRU5ErkJggg==) no-repeat center center;display:block;height:24px;position:absolute;right:-12px;top:-12px;width:24px;cursor:pointer}#share-dialog .share-content{clear:both;padding:0 10px}.share-content .fb-buttons>div{display:inline-block;margin:0 10px}#share-dialog .open .share-tab{background:#f1f1f1}#share-dialog .share-header div.active{background:#fff}.share-page{display:none;float:left;min-height:34px;width:100%;padding:14px 0 0}.share-page.active,.share-page>table{display:inline-block}.share-holder{text-align:center;position:fixed;width:100%;top:20%;z-index:50;height:0}.shareOverlay{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDZCOEVBMEFFREU0MTFFMThBNzdBMTk4MEE5NzY1NDkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDZCOEVBMEJFREU0MTFFMThBNzdBMTk4MEE5NzY1NDkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0NkI4RUEwOEVERTQxMUUxOEE3N0ExOTgwQTk3NjU0OSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0NkI4RUEwOUVERTQxMUUxOEE3N0ExOTgwQTk3NjU0OSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrErJ8gAAAGfSURBVHja7NMBDQAACMOwg39PWMMACkgrYckqyQQ4tQRgEDAIGAQMAgYBg4BBwCBgEMAgYBAwCBgEDAIGAYOAQcAgYBDAIGAQMAgYBAwCBgGDgEHAIIBBwCBgEDAIGAQMAgYBg4BBwCCAQcAgYBAwCBgEDAIGAYOAQQCDgEHAIGAQMAgYBAwCBgGDgEEAg4BBwCBgEDAIGAQMAgYBgwAGAYOAQcAgYBAwCBgEDAIGAYMABgGDgEHAIGAQMAgYBAwCBgGDSAAGAYOAQcAgYBAwCBgEDAIGAQwCBgGDgEHAIGAQMAgYBAwCBgEMAgYBg4BBwCBgEDAIGAQMAhgEDAIGAYOAQcAgYBAwCBgEDAIYBAwCBgGDgEHAIGAQMAgYBDAIGAQMAgYBg4BBwCBgEDAIGAQwCBgEDAIGAYOAQcAgYBAwCGAQMAgYBAwCBgGDgEHAIGAQMAhgEDAIGAQMAgYBg4BBwCBgEDCIBGAQMAgYBAwCBgGDgEHAIGAQwCBgEDAIGAQMAgYBg4BBwCBgEMAgYBAwCBgEDAIGAYPARyvAAG9mAk+HuCoiAAAAAElFTkSuQmCC);bottom:0;left:0;position:fixed;right:0;top:0;z-index:40}#content-facebook,#content-facebook *{font-size:16px}.share-page.active .fb-like iframe{position:absolute}.share-page.active .fb-like{position:relative}.share-page.active .fb-send,.share-page.active .fb-share-button{position:relative;top:-5px}.twitter-share-button{position:relative;left:22px}.tumlbr-button{cursor:pointer;display:inline-block;text-indent:-9999px;overflow:hidden;width:129px;height:20px;background:url(http://platform.tumblr.com/v1/share_3.png) top left no-repeat transparent}div.fb_iframe_widget_fluid{width:auto!important;display:inline-block!important}.share-content>.fb-buttons{max-height:34px}.share-dialog-show{display:-moz-inline-stack;display:inline-block;zoom:1;*display:inline}.fb_edge_widget_with_comment span.fb_edge_comment_widget iframe.fb_ltr{display:none!important}.share-tab:only-child{width:100%;min-width:200px}.share-holder,.share-holder *{-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;opacity:1}#content-sinaweibo{text-align:right;}</style>",d.services=["FacebookWidget","TwitterWidget","GooglePlusWidget","PinterestWidget","TumblrWidget","vKontakteWidget","SinaWeiboWidget"],c.replaceAll=function(a){var e,f;b("document").find("a").each(function(){this.onclick||(this.onclick="")});for(e in d.services)f=d.services[e],"object"==typeof c[f]&&c[f].run(a)},c.destroyAll=function(){for(var a in d.services){var b=d.services[a];"object"==typeof c[b]&&c[b].destroy()}},d.init=function(){for(var a in d.services){var e=d.services[a];"undefined"!=typeof window[e]&&"object"!=typeof c[e]&&(c[e]=new window[e])}b("head").append(d.shareCSS)},d.init(),c},a.Plugin=HMShareWidget}(this,jQuery),function(a,b){FacebookWidget=function(){var a={},c={};return c.data={},c.appId="595590203841130",c.locale=navigator.userLanguage||navigator.systemLanguage||navigator.browserLanguage||navigator.language||"en-US",c.locale.replace("-","_"),c.scriptTag='<script id="facebook-jssdk" src="http://connect.facebook.net/'+c.locale+"/all.js#xfbml=1&appId="+c.appId+'"></script>',c.script=document.createElement("script"),c.script.id="facebook-jssdk",c.script.src="//connect.facebook.net/"+c.locale+"/all.js#xfbml=1&appId="+c.appId,c.fbLikeWidget='<div class="fb-like" data-href="http://developers.facebook.com/docs/plugins/" data-width="150" data-layout="button_count" data-action="like" data-show-faces="false" data-share="true"></div>',c.fbSendWidget='<div class="fb-send" data-href="http://developers.facebook.com/docs/plugins/" data-colorscheme="light"></div>',c.fbShareWidget='<div class="fb-share-button" data-href="http://developers.facebook.com/docs/plugins/" data-colorscheme="light" data-type="button_count"></div>',c.scriptTagSelectors="facebook-jssdk",a.run=function(a){c.data=a||{},c.addScriptTags(),b(".campaign-share[data-service=facebook-send]").each(function(){c.replaceSend(b(this))}),b(".campaign-share[data-service=facebook-like]").each(function(){c.replaceLike(b(this))}),b(".campaign-share[data-service=facebook-share]").each(function(){c.replaceShare(b(this))})},a.createLike=function(d,e){c.addScriptTags();var f=b("<div>").addClass("campaign-widget campaign-share").attr("data-class","fb-likebtn").attr("data-service","facebook-like");d.replaceWith(f),a.run(e)},a.createSend=function(d,e){c.addScriptTags();var f=b("<div>").addClass("campaign-widget campaign-share").attr("data-class","fb-sendbtn").attr("data-service","facebook-send");d.replaceWith(f),a.run(e)},a.createShare=function(d,e){c.addScriptTags();var f=b("<div>").addClass("campaign-widget campaign-share").attr("data-class","fb-sharebtn").attr("data-service","facebook-share");d.replaceWith(f),a.run(e)},a.destroy=function(){b("script").each(function(){b(this).attr("id")===c.scriptTagSelectors&&b(this).remove()}),b(".fb_iframe_widget, .fb-like, .fb_send face,.fb-send, .fb-share-button").remove(),b("#fb-root").remove(),b("html").removeAttr("xmlns:fb");try{delete window.FB}catch(a){window.FB=""}},c.addScriptTags=function(){c.data&&c.data.fbAppId&&null!==c.data.fbAppId&&(c.appId=c.data.fbAppId,c.script.src=c.script.src.replace(/appId=.*";/,"appId="+c.appId+'";')),b("html").attr("xmlns:fb","http://ogp.me/ns/fb#"),0===b("#fb-root").length&&(b(".campaign-share[data-service=facebook-like]").length>0||b(".campaign-share[data-service=facebook-send]").length>0||b(".campaign-share[data-service=facebook-share]").length>0)&&(b("body").prepend('<div id="fb-root"></div>'),b("body").append(c.scriptTag),b("#facebook-jssdk").length||document.body.appendChild(c.script))},c.replaceLike=function(a){$fbLikeBtn=b(c.fbLikeWidget).addClass("campaign-share").addClass(a.data("class")),$fbLikeBtn.attr("data-href","undefined"!=typeof c.data&&""!==c.data.shortUrl?c.data.shortUrl:"undefined"!=typeof a.data("href")?a.data("href"):location.href),$fbLikeBtn.attr("data-share",b(a).attr("data-share")||!1),b(a).replaceWith($fbLikeBtn)},c.replaceSend=function(a){$fbSendBtn=b(c.fbSendWidget).addClass("campaign-share").addClass(a.data("class")),$fbSendBtn.attr("data-href","undefined"!=typeof c.data&&""!==c.data.shortUrl?c.data.shortUrl:"undefined"!=typeof a.data("href")?a.data("href"):location.href),b(a).replaceWith($fbSendBtn)},c.replaceShare=function(a){$fbShareBtn=b(c.fbShareWidget).addClass("campaign-share").addClass(a.data("class")),$fbShareBtn.attr("data-href","undefined"!=typeof c.data&&""!==c.data.shortUrl?c.data.shortUrl:"undefined"!=typeof a.data("href")?a.data("href"):location.href),b(a).replaceWith($fbShareBtn)},a},a.Plugin=FacebookWidget}(this,jQuery),function(a,b){GooglePlusWidget=function(a){var c={},d={};return d.proxy=a,d.scriptTag='<script type="text/javascript" src="https://apis.google.com/js/platform.js" id="google-wjs"></script>',d.googlePlusWidget='<div class="g-plus" data-action="share" data-height="20" data-width="100" data-annotation="bubble"></div>',d.scriptTagSelectors="google-wjs",d.replaceWith=function(a){$serviceBtn=b(d.googlePlusWidget).addClass("campaign-share").addClass(a.data("class")),$serviceBtn.attr("data-href","undefined"!=typeof d.data?d.data.shortUrl:location.href),b(a).replaceWith($serviceBtn)},d.addScriptTags=function(){b(".campaign-share[data-service=googleplus]").length>0&&b("body").append(d.scriptTag)},c.run=function(a){d.data=a,d.addScriptTags(),b(".campaign-share[data-service=googleplus]").each(function(){d.replaceWith(b(this))})},c.create=function(a,e){d.addScriptTags();var f=b("<div>").addClass("campaign-widget campaign-share").attr("data-class","googleplusbtn").attr("data-service","googleplus").attr("data-href",e.shortUrl);return a.replaceWith(f),c.run(e),this},c.destroy=function(){b("script").each(function(){b(this).attr("id")===d.scriptTagSelectors&&b(this).remove()}),b('div[id^="___plus_"]').remove(),b('iframe[id^="oauth2relay"]').remove(),b('script[src*="apis.google.com"]').remove()},c},a.Plugin=GooglePlusWidget}(this,jQuery),function(a,b){PinterestWidget=function(a){var c={},d={};return d.proxy=a,d.scriptTag="<script id=\"pinterest-wjs\">var s=screen,w=750,h=300,l=Math.floor((s.width-w)*.5),t=Math.floor((s.height-h)*.5);$('.pinterestWidget').on('click', function(e){e.preventDefault();window.open($(this).attr('href'),'_blank','width='+w+',height='+h+',top='+t+',left='+l+',location=no,menubar=no,status=no,titlebar=no,toolbar=no')});</script>",d.serviceWidget='<a href="" data-href="http://www.pinterest.com/pin/create/button/" data-pin-do="buttonPin" data-pin-color="red" data-pin-config="beside" class="pinterestWidget">        <img src="//assets.pinterest.com/images/pidgets/pin_it_button.png" /></a>',d.scriptTagSelectors="pinterest-wjs",d.replaceWith=function(a){$serviceBtn=b(d.serviceWidget).addClass("campaign-share").addClass(a.data("class"));var c=[$serviceBtn.attr("data-href"),"?",b.param({url:d.data.shortUrl,media:d.data.largeImageURL,description:d.data.title})].join("");$serviceBtn.attr("href",c),b(a).replaceWith($serviceBtn)},d.addScriptTags=function(){b(".pinterestWidget").length>0&&b("body").append(d.scriptTag)},c.run=function(a){d.data=a,b(".campaign-share[data-service=pinterest]").each(function(){d.replaceWith(b(this))}),d.addScriptTags()},c.create=function(a,e){d.data=e||{shortUrl:location.href};var f=b("<div>").addClass("campaign-widget campaign-share").attr("data-class","pinterestbtn").attr("data-service","pinterest").attr("data-href",d.data.shortUrl);a.replaceWith(f),c.run(e)},c.destroy=function(){b("script").each(function(){b(this).attr("id")===d.scriptTagSelectors&&b(this).remove()}),b(".pinterestWidget").remove(),b('a[class*="pin_it_button"]').remove(),b('script[src*="assets.pinterest.com"]').remove()},c},a.Plugin=PinterestWidget}(this,jQuery),function(a,b){SinaWeiboWidget=function(a){var c={},d={};return d.proxy=a,d.scriptTag='<script id="sinaweibo-wjs" src="//tjs.sjs.sinajs.cn/open/api/js/wb.js"></script>',d.serviceWidget='<wb:share-button addition="number" type="button" language="zh_cn" class="sinaweibo-w"></wb:share-button>',d.scriptTagSelectors="sinaweibo-wjs",d.replaceWith=function(a){var c=b(d.serviceWidget);if(c.attr("url",d.data.shortUrl),d.data&&d.data.twitterText){var e=d.data.twitterText.replace("&",encodeURIComponent("&"));c.attr("default_text",e+" @HM中国")}d.data&&d.data.smallImageURL&&c.attr("pic",d.data.smallImageURL),b(a).replaceWith(c)},d.addScriptTags=function(){b(".sinaweibo-w").length>0&&b("body").append(d.scriptTag)},c.run=function(a){d.data=a||{},b(".campaign-share[data-service=sinaweibo]").each(function(){d.replaceWith(b(this))}),d.addScriptTags()},c.create=function(a,d){d=d||{shortUrl:location.href};var e=b("<div>").addClass("campaign-widget campaign-share").attr("data-class","sinaweibobtn").attr("data-service","sinaweibo").attr("data-href",d.shortUrl);a.replaceWith(e),c.run(d)},c.destroy=function(){b("script").each(function(){b(this).attr("id")===d.scriptTagSelectors&&b(this).remove()}),b("wb\\:share-button").remove(),b("body").removeAttr("xmlns:wb")},c},a.Plugin=SinaWeiboWidget}(this,jQuery),function(a,b){TumblrWidget=function(a){var c={},d={};return d.proxy=a,d.isLink=!1,d.scriptTag="<script id=\"tumblr-wjs\">var s=screen,w=450,h=430,l=Math.floor((s.width-w)*.5),t=Math.floor((s.height-h)*.5);$('.tumblrButton').on('click', function(e){e.preventDefault();window.open($(this).attr('href'),'_blank','width='+w+',height='+h+',top='+t+',left='+l+',location=no,menubar=no,status=no,titlebar=no,toolbar=no')});</script>",d.serviceWidget='<a href="http://www.tumblr.com/share/photo" class="tumblrButton" title="Share on Tumblr" style="display:inline-block; text-indent:-9999px; overflow:hidden; width:129px; height:20px; background:url(\'http://platform.tumblr.com/v1/share_3.png\') top left no-repeat transparent;">Share on Tumblr</a>',d.scriptTagSelectors="tumblr-wjs",d.replaceWith=function(a){var c=b(d.serviceWidget).addClass("campaign-share").addClass(a.data("class")),e=d.data.title||"";e+=d.data.title&&d.data.description?" - ":"",e+=d.data.description||"";var f=["http://www.tumblr.com/share/photo?",b.param({source:d.data.largeImageURL||"",caption:e,clickthru:d.data.shortUrl||location.href})].join("");c.removeAttr("data-href"),c.attr("href",f),b(a).replaceWith(c)},d.addScriptTags=function(){b(".campaign-share.tumblrbtn").length>0&&b("body").append(d.scriptTag)},d.activateTumblr=function(){if("undefined"!=typeof Tumblr&&Tumblr&&Tumblr.activate_share_on_tumblr_buttons){var a=!1;b(".tumblrButton").each(function(){this.onclick&&"function"==typeof this.onclick&&(a=!0)}),a||Tumblr.activate_share_on_tumblr_buttons(),window.clearInterval(d.activateInterval)}},c.run=function(a){d.data=a||{},b(".campaign-share[data-service=tumblr]").each(function(){d.replaceWith(b(this))}),d.addScriptTags()},c.create=function(a,d){d=d||{shortUrl:location.href};var e=b("<div>").addClass("campaign-widget campaign-share").attr("data-class","tumblrbtn").attr("data-service","tumblr").attr("data-href",d.shortUrl);a.replaceWith(e),c.run(d)},c.destroy=function(){window.clearInterval(d.activateInterval),b("script").each(function(){b(this).attr("id")===d.scriptTagSelectors&&b(this).remove()}),b(".campaign-share.tumblrbtn").remove();try{delete window.Tumblr}catch(a){window.Tumblr=""}},c},a.Plugin=TumblrWidget}(this,jQuery),function(a,b){TwitterWidget=function(a){var c={},d={};return d.proxy=a,d.scriptTag='<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>',d.serviceWidget='<a href="https://twitter.com/share" class="twitter-share-button" data-lang="en"></a>',d.scriptTagSelectors="twitter-wjs",d.replaceWith=function(a){$twitterBtn=b(d.serviceWidget).addClass("campaign-share").addClass(a.data("class")),$twitterBtn.attr("data-text",("undefined"!=typeof d.data?d.data.twitterText:a.data("text"))+" via @hm"),$twitterBtn.attr("data-url","undefined"!=typeof d.data?d.data.shortUrl:location.href),b(a).replaceWith($twitterBtn)},d.addScriptTags=function(){b(".campaign-share[data-service=twitter]").length>0&&b("body").append(d.scriptTag)},c.run=function(a){d.data=a,d.addScriptTags(),b(".campaign-share[data-service=twitter]").each(function(){d.replaceWith(b(this))})},c.create=function(a,e){d.addScriptTags();var f=b("<div>").addClass("campaign-widget campaign-share").attr("data-class","twittertbn").attr("data-service","twitter").attr("data-url",e.shortUrl).attr("data-text",e.twitterText);a.replaceWith(f),c.run(e)},c.destroy=function(){b("script").each(function(){b(this).attr("id")===d.scriptTagSelectors&&b(this).remove()}),b("body").removeAttr("data-twttr-rendered"),b(".twitter-tweet-button").remove(),b("script").each(function(){var a=b(this);-1!==a.text().indexOf("platform.twitter.com")&&a.remove()});try{delete window.twttr}catch(a){window.twttr=""}},c},a.Plugin=TwitterWidget}(this,jQuery),function(a,b){vKontakteWidget=function(a){var c={},d={};return d.proxy=a,d.data={},d.scriptTag='<script type="text/javascript" src="http://vkontakte.ru/js/api/share.js?9" charset="windows-1251"></script>',c.run=function(a){d.data=a||{shortUrl:location.href},b(".campaign-share[data-service=vkontakte]").each(function(){c.create(b(this),d.data)})},c.create=function(a,c){d.data=c||{shortUrl:location.href},b.getScript("http://vkontakte.ru/js/api/share.js?9").done(function(){var c=VK.Share.button({url:d.data.shortUrl||location.href,title:d.data.title||b("title").text(),description:d.data.description||null,image:d.data.largeImageURL||null,noparse:!0});b(a).replaceWith(c)})},c.destroy=function(){b("table[id^=vkshare]").remove();try{delete window.VK}catch(a){window.VK=""}},c},a.Plugin=vKontakteWidget}(this,jQuery);