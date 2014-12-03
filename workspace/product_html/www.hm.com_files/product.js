/*! 
 * jquery.event.drag - v 2.0.0 
 * Copyright (c) 2010 Three Dub Media - http://threedubmedia.com
 * Open Source MIT License - http://threedubmedia.com/code/license
 */;(function($){$.fn.drag=function(str,arg,opts){var type=typeof str=="string"?str:"",fn=$.isFunction(str)?str:$.isFunction(arg)?arg:null;if(type.indexOf("drag")!==0)
type="drag"+type;opts=(str==fn?arg:opts)||{};return fn?this.bind(type,opts,fn):this.trigger(type);};var $event=$.event,$special=$event.special,drag=$special.drag={defaults:{which:1,distance:0,not:':input',handle:null,relative:false,drop:true,click:false},datakey:"dragdata",livekey:"livedrag",add:function(obj){var data=$.data(this,drag.datakey),opts=obj.data||{};data.related+=1;if(!data.live&&obj.selector){data.live=true;$event.add(this,"draginit."+drag.livekey,drag.delegate);}
$.each(drag.defaults,function(key,def){if(opts[key]!==undefined)
data[key]=opts[key];});},remove:function(){$.data(this,drag.datakey).related-=1;},setup:function(){if($.data(this,drag.datakey))
return;var data=$.extend({related:0},drag.defaults);$.data(this,drag.datakey,data);$event.add(this,"mousedown",drag.init,data);if(this.attachEvent)
this.attachEvent("ondragstart",drag.dontstart);},teardown:function(){if($.data(this,drag.datakey).related)
return;$.removeData(this,drag.datakey);$event.remove(this,"mousedown",drag.init);$event.remove(this,"draginit",drag.delegate);drag.textselect(true);if(this.detachEvent)
this.detachEvent("ondragstart",drag.dontstart);},init:function(event){var dd=event.data,results;if(dd.which>0&&event.which!=dd.which)
return;if($(event.target).is(dd.not))
return;if(dd.handle&&!$(event.target).closest(dd.handle,event.currentTarget).length)
return;dd.propagates=1;dd.interactions=[drag.interaction(this,dd)];dd.target=event.target;dd.pageX=event.pageX;dd.pageY=event.pageY;dd.dragging=null;results=drag.hijack(event,"draginit",dd);if(!dd.propagates)
return;results=drag.flatten(results);if(results&&results.length){dd.interactions=[];$.each(results,function(){dd.interactions.push(drag.interaction(this,dd));});}
dd.propagates=dd.interactions.length;if(dd.drop!==false&&$special.drop)
$special.drop.handler(event,dd);drag.textselect(false);$event.add(document,"mousemove mouseup",drag.handler,dd);return false;},interaction:function(elem,dd){return{drag:elem,callback:new drag.callback(),droppable:[],offset:$(elem)[dd.relative?"position":"offset"]()||{top:0,left:0}};},handler:function(event){var dd=event.data;switch(event.type){case!dd.dragging&&'mousemove':if(Math.pow(event.pageX-dd.pageX,2)+Math.pow(event.pageY-dd.pageY,2)<Math.pow(dd.distance,2))
break;event.target=dd.target;drag.hijack(event,"dragstart",dd);if(dd.propagates)
dd.dragging=true;case'mousemove':if(dd.dragging){drag.hijack(event,"drag",dd);if(dd.propagates){if(dd.drop!==false&&$special.drop)
$special.drop.handler(event,dd);break;}
event.type="mouseup";}
case'mouseup':$event.remove(document,"mousemove mouseup",drag.handler);if(dd.dragging){if(dd.drop!==false&&$special.drop)
$special.drop.handler(event,dd);drag.hijack(event,"dragend",dd);}
drag.textselect(true);if(dd.click===false&&dd.dragging){jQuery.event.triggered=true;setTimeout(function(){jQuery.event.triggered=false;},20);dd.dragging=false;}
break;}},delegate:function(event){var elems=[],target,events=$.data(this,"events")||{};$.each(events.live||[],function(i,obj){if(obj.preType.indexOf("drag")!==0)
return;target=$(event.target).closest(obj.selector,event.currentTarget)[0];if(!target)
return;$event.add(target,obj.origType+'.'+drag.livekey,obj.origHandler,obj.data);if($.inArray(target,elems)<0)
elems.push(target);});if(!elems.length)
return false;return $(elems).bind("dragend."+drag.livekey,function(){$event.remove(this,"."+drag.livekey);});},hijack:function(event,type,dd,x,elem){if(!dd)
return;var orig={event:event.originalEvent,type:event.type},mode=type.indexOf("drop")?"drag":"drop",result,i=x||0,ia,$elems,callback,len=!isNaN(x)?x:dd.interactions.length;event.type=type;event.originalEvent=null;dd.results=[];do if(ia=dd.interactions[i]){if(type!=="dragend"&&ia.cancelled)
continue;callback=drag.properties(event,dd,ia);ia.results=[];$(elem||ia[mode]||dd.droppable).each(function(p,subject){callback.target=subject;result=subject?$event.handle.call(subject,event,callback):null;if(result===false){if(mode=="drag"){ia.cancelled=true;dd.propagates-=1;}
if(type=="drop"){ia[mode][p]=null;}}
else if(type=="dropinit")
ia.droppable.push(drag.element(result)||subject);if(type=="dragstart")
ia.proxy=$(drag.element(result)||ia.drag)[0];ia.results.push(result);delete event.result;if(type!=="dropinit")
return result;});dd.results[i]=drag.flatten(ia.results);if(type=="dropinit")
ia.droppable=drag.flatten(ia.droppable);if(type=="dragstart"&&!ia.cancelled)
callback.update();}
while(++i<len)
event.type=orig.type;event.originalEvent=orig.event;return drag.flatten(dd.results);},properties:function(event,dd,ia){var obj=ia.callback;obj.drag=ia.drag;obj.proxy=ia.proxy||ia.drag;obj.startX=dd.pageX;obj.startY=dd.pageY;obj.deltaX=event.pageX-dd.pageX;obj.deltaY=event.pageY-dd.pageY;obj.originalX=ia.offset.left;obj.originalY=ia.offset.top;obj.offsetX=event.pageX-(dd.pageX-obj.originalX);obj.offsetY=event.pageY-(dd.pageY-obj.originalY);obj.drop=drag.flatten((ia.drop||[]).slice());obj.available=drag.flatten((ia.droppable||[]).slice());return obj;},element:function(arg){if(arg&&(arg.jquery||arg.nodeType==1))
return arg;},flatten:function(arr){return $.map(arr,function(member){return member&&member.jquery?$.makeArray(member):member&&member.length?drag.flatten(member):member;});},textselect:function(bool){$(document)[bool?"unbind":"bind"]("selectstart",drag.dontstart).attr("unselectable",bool?"off":"on").css("MozUserSelect",bool?"":"none");},dontstart:function(){return false;},callback:function(){}};drag.callback.prototype={update:function(){if($special.drop&&this.available.length)
$.each(this.available,function(i){$special.drop.locate(this,i);});}};$special.draginit=$special.dragstart=$special.dragend=drag;})(jQuery);(function($){hm.zoom=function(input){this.ZOOMED=0;this.ENABLED=1;var self=this,opts={view:'',img:{element:'',url:'',full:'',type:'',zoom:1,x:0.5,y:0.33,state:0},zap:{layer:100,size:128,ver:1.22,queue:4},dur:{wait:100,zoomIn:200,zoomOut:200,zoomOutSwap:0,imgFadeOut:0,imgFadeIn:0,tilesFadeIn:0,tilesFadeOut:0,tilesFadeOutSwap:0},zoom:{scale:4,x:0.5,y:0.33,clickIn:1,clickOut:1},event:{zoomInStart:function(){},zoomInComplete:function(){},zoomOutStart:function(){},zoomOutComplete:function(){},swapStart:function(){},swapComplete:function(){},tileLoadStart:function(){},tileLoadComplete:function(){}}};opts.view=input.view?input.view:opts.view;$.extend(opts.img,input.img);$.extend(opts.zap,input.zap);$.extend(opts.dur,input.dur);$.extend(opts.zoom,input.zoom);$.extend(opts.event,input.event);var zapUrl='&zap=ver['+opts.zap.ver+'],size['+opts.zap.size+'],x[0],y[0],layer['+opts.zap.layer+']&sink',$view=opts.view.selector?opts.view:$(opts.view),$img=opts.img.element?opts.img.element.selector?opts.img.element:$(opts.img.element):$view.find('img'),$pan=$(document.createElement('div')),$tiles=$(document.createElement('div')),viewW=$view.width(),viewH=$view.height(),fullW=viewW*opts.zoom.scale,fullH=viewH*opts.zoom.scale,cols=Math.ceil(fullW/opts.zap.size),rows=Math.ceil(fullH/opts.zap.size),vCols=Math.ceil(viewW/opts.zap.size)+1,vRows=Math.ceil(viewH/opts.zap.size)+1,tTotal=cols*rows,panL=viewW-fullW,panT=viewH-fullH,panB=0,panR=0,outX=0,outY=0,data=[],pan_to,img,tileQ=[],gridkey='';opts.img.url=opts.img.url?opts.img.url:$img.attr('src');opts.img.type=opts.img.type?opts.img.type:$img.attr('class');opts.img.alt=opts.img.alt?opts.img.alt:$img.attr('alt');$view.addClass('zoom-view').css('overflow','hidden');if($view.css('position')!=='absolute'){$pan.css('position','relative');}
$pan.appendTo($view).addClass(opts.img.zoom?'zoom-pan zoomable':'zoom-pan').css({width:viewW,height:viewH,position:$pan.css('position')!=='absolute'?'relative':'absolute'}).drag(function(e,dt){if(dt&&self.ZOOMED){$(this).css({top:Math.min(panB,Math.max(panT,dt.offsetY)),left:Math.min(panR,Math.max(panL,dt.offsetX))});}},{relative:1});if(!$pan.css('left')&&!$pan.css('right')){$pan.css('left',0);}
if(!$pan.css('top')&&!$pan.css('bottom')){$pan.css('top',0);}
$img.appendTo($pan).addClass('zoom-image').css({position:'absolute',left:0,right:0,width:'100%',height:'100%'});$tiles.appendTo($pan).addClass('zoom-tiles').css({position:'absolute',left:0,top:0,width:fullW,height:fullH}).hide(0);if(opts.zoom.clickIn){$pan.bind('mouseup',function(e){if(!self.ZOOMED){self.zoomIn(e,{x:(e.pageX-$img.offset().left)/$img.width(),y:(e.pageY-$img.offset().top)/$img.height()});}});}
if(opts.zoom.clickOut){$pan.bind('mouseup',function(e){if(self.ZOOMED&&self.mousedownTime&&(new Date()).getTime()-self.mousedownTime<95){self.zoomOut(e);}});}
$pan.bind('mousedown',function(e){self.mousedownTime=(new Date()).getTime();});this.enablePan=function(){$pan.bind('draginit',function(e){pan_to=setInterval(self.loadTiles,1000);}).bind('dragend',function(e){clearInterval(pan_to);self.loadTiles();});};this.disablePan=function(){$pan.unbind('draginit').unbind('dragend');clearInterval(pan_to);};this.getData=function(key){return key&&data[key]?img&&data[img]?data[img]:data:data;};this.isZoomable=function(){return data[img].zoom;};this.add=function(newImg){if(!data[cleanUrl(newImg.url)]){data[cleanUrl(newImg.url)]={url:cleanUrl(newImg.url),full:cleanUrl(newImg.url).replace('file:/product/large','file:/product/zoom'),type:newImg.type||'',alt:newImg.alt||'',x:newImg.x||opts.zoom.x,y:newImg.y||opts.zoom.y,zoom:newImg.zoom||1,tCount:0,tiles:[],state:0};}
if(!img){img=cleanUrl(newImg.url);}};self.add(opts.img);this.swapImg=function(e){var vImg,fimg;if(cleanUrl($img.attr('src'))!==img){self.ENABLED=0;opts.event.swapStart();$tiles.empty();tileQ=[];loadedTiles=0;data[img].tiles=[];data[img].tCount=0;$img.fadeOut(opts.dur.imgFadeOut,function(){$img.attr({src:img,alt:data[img].alt}).attr('class','zoom-image '+data[img].type);vImg=img;fimg=data[img].full;$img.fadeIn(opts.dur.imgFadeIn,function(){self.ENABLED=1;opts.event.swapComplete();});});}};this.loadTile=function(target,col,row,callback){var $tile=target.tiles[row+'-'+col];if(!$tile){$tile=target.tiles[row+'-'+col]=$(document.createElement('img'));$tile.css({display:'block',position:'absolute',left:col*opts.zap.size,top:row*opts.zap.size,width:opts.zap.size,height:opts.zap.size}).appendTo($tiles);if(callback&&typeof callback==='function'){$tile.bind('load',callback);}
$tile.attr('src',target.full+zapUrl.replace('x[0]','x['+col+']').replace('y[0]','y['+row+']'));if($tile.complete||($tile.readyState&&$tile.readyState===4)){$tile.trigger('load');}
target.tCount+=1;}
else if(callback&&typeof callback==='function'){callback();}};this.loadTiles=function(){switch(data[img].state){case 0:data[img].state=1;opts.event.tileLoadStart();self.loadTile(data[img],0,0,function(){data[img].state=2;self.loadTiles();opts.event.tileLoadComplete();});break;case 1:if(data[img].tiles['0-0'].complete||(data[img].tiles['0-0'].readyState&&data[img].tiles['0-0'].readyState===4)){data[img].tiles['0-0'].trigger('load');}
break;case 2:var pos=$pan.position(),x=Math.abs(pos.left),y=Math.abs(pos.top),fCol=Math.floor(x/opts.zap.size),fRow=Math.floor(y/opts.zap.size),lCol=fCol+vCols>=cols?cols:fCol+vCols,lRow=fRow+vRows>=rows?rows:fRow+vRows,col=fCol,row=fRow,tile_url=data[img].full+zapUrl,key=row+'-'+col,$tile;if(data[img]&&data[img].tCount!==null&&data[img].tCount<tTotal&&gridkey!==key){gridkey=key;while(row<lRow){col=fCol;while(col<lCol){key=row+'-'+col;self.loadTile(data[img],col,row);col+=1;}
row+=1;}}
break;}};function cleanUrl(url){if(url.substring(0,2)!=='//'){url=url.split('//');url.shift();url='//'+url.join();}
return url;}
this.setImg=function(newImg){newImg=cleanUrl(newImg);if(img!==newImg&&data[newImg]){clearInterval(pan_to);img=newImg;if(self.ZOOMED){self.zoomOut(null,1);}
else{self.swapImg();}
if(data[img].zoom&&!$pan.hasClass('zoomable')){$pan.addClass('zoomable');}
else if(!data[img].zoom&&$pan.hasClass('zoomable')){$pan.removeClass('zoomable');}}};this.zoomIn=function(e,coords){if(e){e.preventDefault();}
if(self.ENABLED&&data[img].zoom){self.ENABLED=0;opts.event.zoomInStart();coords=coords?coords:{x:data[img].x,y:data[img].y};var top=Math.round(-(fullH*coords.y)+(viewH*0.5)),left=Math.round(-(fullW*coords.x)+(viewW*0.5));$pan.animate({top:Math.min(panB,Math.max(panT,top)),left:Math.min(panR,Math.max(panL,left)),width:fullW,height:fullH},opts.dur.zoomIn,function(){self.loadTiles();self.enablePan();self.ENABLED=1;opts.event.zoomInComplete();$tiles.fadeIn(opts.dur.tilesFadeIn,function(){self.ZOOMED=1;});});}};this.zoomOut=function(e,swap){if(e){e.preventDefault();}
if(self.ENABLED){self.ENABLED=0;opts.event.zoomOutStart();self.disablePan();$tiles.fadeOut(swap?opts.dur.tilesFadeOutSwap:opts.dur.tilesFadeOut,function(){$pan.animate({left:outX,top:outY,width:viewW,height:viewH},swap?opts.dur.zoomOutSwap:opts.dur.zoomOut,function(){self.ZOOMED=0;self.ENABLED=1;self.swapImg();opts.event.zoomOutComplete();});});}};return this;};})(jQuery);(function($,hm){'use strict';hm.related={ensureUrlFormatForBackend:function(relatedUrl){if(window.location.pathname.substr(-1)!=="/"){relatedUrl=hm.data.product.code+'/'+relatedUrl;}
return relatedUrl;},initRelatedArea:function(area,relatedUrl){relatedUrl=this.ensureUrlFormatForBackend(relatedUrl);var self=this;hm.ajax.loadHtml(relatedUrl,function(html){(self.callbacks.displayRelatedHtml.apply(self,[area]))(html);},{},{'type':'GET',cache:true,displaySpinner:false});},initAreaWithHtml:function(area,html){var $related=$(html);$related.find('.viewport > ul:not(:first-child)').hide();area.html($related);hm.display.relatedScroll(area,true);},callbacks:{displayRelatedHtml:function(area){return function(html){hm.related.initAreaWithHtml(area,html);area.find(".recommendation").on('click',hm.related.callbacks.logRecommendationClick);};},logRecommendationClick:function(){var ticket=$(this).data('recommendationticket'),locale=hm.url.getLocalizationUrlPrefix(),collectUrl=locale+'/collect/click/'+ticket;$.ajax({async:false,timeout:100,url:collectUrl,type:'POST',cache:false});}}};}(jQuery,hm));(function($){hm.event.bind('ready',function(){var bcCookie=cookie.get('HMBC');if(bcCookie&&document.referrer.indexOf('subdepartment')!=-1){var breadcrumbs=$.parseJSON(bcCookie);$('#product-breadcrumbs > .breadcrumbs').html(hm.template.render('tpl-breadcrumbs',{breadcrumbs:breadcrumbs}));cookie.set('HMBC','',{path:'/'+hm.url.getSegment(1),duration:-1});}
$('#link-sizeFit').bind('click',function(e){e.preventDefault();var $this=$(this),url=$this.attr('href').indexOf('?')>-1?$this.attr('href')+'&':$this.attr('href')+'?';url=url+'lightbox=1';hm.ajax.loadHtml(url,function(html){hm.display.overlay(html,'overlay-sizeFit');},null,{type:'get',cache:true});});$('#link-safetyInfo').bind('click',function(e){e.preventDefault();var $layer=$('#layer-safetyInfo');$layer.show().find('> .close').bind('click',function(e){e.preventDefault();$layer.hide();});});hm.display.relatedScroll();productController.init();hm.event.bind('status.received',productController.setShopStatus);hm.event.bind('bag.error',productController.setBagAddError);hm.url.addCallback(function(){var articleId=hm.url.getHashParam('article'),variantId=hm.url.getHashParam('variant'),prevArticle=hm.url.getHashParam('prevarticle'),prevStockSize=hm.url.getHashParam('prevstocksize'),campaign=hm.url.getHashParam('campaign'),campaignType=hm.url.getHashParam('campaignType');if(articleId){productController.changeArticle(articleId);}
if(variantId){productController.changeVariant(articleId||hm.url.getQueryParam('article'),variantId);}
if(prevStockSize==true){prevStockSize='';}
if(prevArticle&&prevStockSize){productController.updatePrevVariant(prevArticle,prevStockSize);}
if(campaign){productController.updateCampaign(campaign);}
if(campaignType){productController.updateCampaignType(campaignType);}});});productController=(function(){return new function(){var self=this,product,currentArticleId,currentVariantId,articles,images,templates={},elements={},scrollApi,tooltipApi;this.init=function(data){var i;product=new hm.product(hm.data.product);templates.variants=hm.template.render('tpl-options-variants');templates.price=hm.template.render('tpl-price');templates.selectedVar=hm.template.render('tpl-selected-variant');templates.availability=hm.template.render('tpl-availability');templates.tooltipAltArticle=hm.template.render('tpl-tooltip-altArticle');templates.tooltipAltVariant=hm.template.render('tpl-tooltip-altVariant');templates.tooltipShopClosed=hm.template.render('tpl-tooltip-shopClosed');templates.tooltipMaxRows=hm.template.render('tpl-tooltip-maxRows');templates.tooltipMaxQty=hm.template.render('tpl-tooltip-maxQty');templates.tooltipMaxQtyErp=hm.template.render('tpl-tooltip-maxQtyErp');templates.tooltipSoonAvailable=hm.template.render('tpl-tooltip-soonAvailable');templates.tooltipSelectedStores=hm.template.render('tpl-tooltip-selectedStores');templates.tooltipSoldOut=hm.template.render('tpl-tooltip-soldOut');templates.tooltipNoSize=hm.template.render('tpl-tooltip-noSize');templates.thumb=hm.template.render('tpl-thumb');templates.image=hm.template.render('tpl-image');templates.promo=hm.template.render('tpl-promo');templates.zoom=hm.template.render('tpl-zoom');templates.largeImg=hm.template.render('tpl-largeImage');templates.zoomedImg=hm.template.render('tpl-zoomedImage');templates.fullscreen=hm.template.render('tpl-fullscreen');elements.form=$('#product');elements.inputArticle=$('#input-article');elements.inputActivityArticle=$('#input-activity-article');elements.inputSize=$('#input-size');elements.inputPrevArticle=$('#input-prevArticle');elements.inputPrevStockSize=$('#input-prevStockSize');elements.inputShopOrigin=$('#input-shopOrigin');elements.inputCampaign=$('#input-campaign');elements.inputCampaignType=$('#input-campaignType');elements.articles=$('#options-articles');elements.variants=$('#options-variants');elements.selectedArt=$('#text-selected-article');elements.selectedVar=$('#text-selected-variant');elements.price=$('#text-price');elements.information=$('#text-information');elements.composition=$('#text-composition');elements.careInstruction=$('#text-careInstruction');elements.deviation=$('#text-deviation');elements.availability=$('#text-availability');elements.alternative=$('#text-alternative');elements.articleNumber=$('#text-activityArticleNumber');elements.shareThis=$('#link-shareThis');elements.addToBag=$('#btn-addToBag');elements.thumbs=$('#product-thumbs');elements.images=$('#images');elements.image=$('#product-image');elements.zoomView=$('#product-image-box');elements.promos=$('#product-promos');elements.imagenav=$('.product-nav');elements.imagenav.prepend(templates.zoom({}));elements.zoom=elements.imagenav.find('.zoom');elements.fullscreen=elements.imagenav.find('.fullscreen');elements.relatedInformation=$('#relatedInformationContainer');elements.backToSearch=$('#backToSearch');elements.tooltipAlt=$('<div/>',{'class':'tooltip'}).appendTo('body');elements.tooltipAddToBag=$('<div/>',{'class':'tooltip'}).appendTo('body');articles=product.getArticles();for(i in articles){if(articles.hasOwnProperty(i)){self.initArticle(articles[i].code);}}
elements.form.bind('submit',function(e){if(!elements.form.hasClass('reload')){e.preventDefault();var url=$(this).attr('action'),params=$(this).serialize();hm.bag.add(url,params,function(html){hm.display.bagAdd(html,null,$('#images').offset(),$('#content').innerWidth(),$('#product').innerHeight());});}});elements.zoomLink=$('a',elements.zoom);elements.zoomView.addClass('on');this.zoom=new hm.zoom({view:elements.zoomView,img:{full:elements.image.attr('src').replace('/large','/zoom')},event:{zoomInStart:function(){elements.zoom.addClass('off');elements.zoomLink.removeAttr('href');elements.zoomView.removeClass('on');elements.images.removeClass('btg');},zoomInComplete:function(){elements.zoom.removeClass('off').addClass('zoomed');elements.zoomLink.attr('href','#');elements.zoomView.addClass('zoomed');},zoomOutStart:function(){elements.zoom.addClass('off');elements.zoomLink.removeAttr('href');elements.zoomView.removeClass('zoomed');},zoomOutComplete:function(){elements.zoom.removeClass('off zoomed');elements.zoomLink.attr('href','#');elements.zoomView.addClass('on');elements.images.addClass('btg');},swapStart:function(){if(!self.zoom.isZoomable()){elements.zoom.hide();}},swapComplete:function(){if(self.zoom.isZoomable()){elements.zoom.show();}},tileLoadStart:function(){hm.event.trigger('loading.start');},tileLoadComplete:function(){hm.event.trigger('loading.stop');}}});elements.zoom.delegate('a','click',function(e){if(self.zoom.ZOOMED){self.zoom.zoomOut(e);}
else{self.zoom.zoomIn(e);}});elements.fullscreen.delegate('a','click',function(e){e.preventDefault();var $html,overlay;hm.event.trigger('loading.start');$html=$('<div class="content"><img src="'+$(this).attr('href')+'"></div>');$html.find('img').bind('load',function(e){hm.event.trigger('loading.stop');});overlay=hm.display.overlay($html,'fullscreen',null,{top:108});$html.bind('click',function(e){overlay.close();});});images=product.getArticle(self.getCurrentArticleId()).images;for(i in images){if(images.hasOwnProperty(i)){self.zoom.add({url:templates.largeImg(images[i]),full:templates.zoomedImg(images[i]),alt:images[i].alttext,type:images[i].type,zoom:images[i].type!=='DETAIL'});}}
scrollApi=elements.thumbs.parent().thumbScroll().data('thumbScroll');scrollApi.scrollTo(elements.thumbs.find('.act').index(),0);elements.images.find('.prev, .next').bind('click',function(e){e.preventDefault();});elements.thumbs.on('click','a',function(e){e.preventDefault();var $this=$(this),$parent=$this.parent();self.zoom.setImg($this.attr('href'));elements.images.attr('class','');elements.images.addClass('btg article-'+self.getCurrentArticleId()+' '+$this.attr('class'));elements.image.attr('data-type',$this.attr('data-type'));elements.fullscreen.find('a').attr('href',$this.attr('href').replace('/product/large','/product/full'));$parent.siblings().removeClass('act');$parent.addClass('act');self.showRelatedWithCode($this.attr('data-code'));});tooltipApi=elements.addToBag.removeAttr('disabled').tooltip({tip:elements.tooltipAddToBag,position:'top center',lazy:true,delay:0,cancelDefault:false,onBeforeShow:function(){tooltipApi.getConf().offset=[hm.cookieinfo.getCurrentOffset()*-1,0];if(elements.addToBag.hasClass('shopClosed')){elements.tooltipAddToBag.html(templates.tooltipShopClosed({}));return true;}else if(elements.addToBag.hasClass('maxRows')){elements.tooltipAddToBag.html(templates.tooltipMaxRows({}));return true;}else if(elements.addToBag.hasClass('maxQty')){elements.tooltipAddToBag.html(templates.tooltipMaxQty({}));return true;}else if(elements.addToBag.hasClass('maxQtyErp')){elements.tooltipAddToBag.html(templates.tooltipMaxQtyErp({}));return true;}else if(elements.addToBag.hasClass('soldOut')){elements.tooltipAddToBag.html(templates.tooltipSoldOut({}));return true;}else if(elements.addToBag.hasClass('soonAvailable')){elements.tooltipAddToBag.html(templates.tooltipSoonAvailable({}));return true;}else if(elements.addToBag.hasClass('selectedStores')){elements.tooltipAddToBag.html(templates.tooltipSelectedStores({}));return true;}else if(elements.addToBag.hasClass('noSize')){elements.tooltipAddToBag.html(templates.tooltipNoSize({}));return true;}
return false;}}).data('tooltip');hm.related.initRelatedArea(elements.relatedInformation,productController.getCurrentArticleId()+'/related');self.setBackLinkIfCommingFromSearch(elements.backToSearch);};this.getCurrentArticleId=function(){return currentArticleId||false;};this.getCurrentShare=function(){if(!hm.data.product||!hm.data.product.articles[currentArticleId]){return false;}
return hm.data.product.articles[currentArticleId].share||false;};this.getCurrentVariantId=function(){return currentVariantId||hm.data.currentVariantId||false;};this.setCurrentArticleId=function(articleId){currentArticleId=articleId;};this.setCurrentVariantId=function(variantId){hm.data.currentVariantId=currentVariantId=variantId;};this.showRelatedWithCode=function(code){var $list=$(),article,image,i;if(code&&code.toString().length>0){$list=elements.relatedInformation.find('.goesWith > .viewport > ul[data-code="'+code+'"]');}
if($list.length===0){article=product.getArticle(self.getCurrentArticleId());for(i=0,image=null;image=article.images[i];i++){if(image.articleCode===self.getCurrentArticleId()){$list=elements.relatedInformation.find('#relatedInformation > .goesWith > .viewport > ul[data-code="'+image.code+'"]');if($list.length){break;}}}}
if($list.length){elements.relatedInformation.find('.goesWith > .viewport > ul').hide();$list.show();elements.relatedInformation.find('.goesWith.scrollable-initiated').removeClass('scrollable-initiated').addClass('scrollable');hm.display.relatedScroll(elements.relatedInformation,true);}
if(elements.relatedInformation.find('#relatedInformation > .goesWith > .viewport > ul:visible').length===0){elements.relatedInformation.find('#relatedInformation > .goesWith > .viewport > ul:first-child').show();elements.relatedInformation.find('.goesWith.scrollable-initiated').removeClass('scrollable-initiated').addClass('scrollable');hm.display.relatedScroll(elements.relatedInformation,true);}};this.initArticle=function(articleId,previewOnly){var i,article=product.getArticle(articleId),variants=product.getArticleVariants(articleId),$article=$('#option-article-'+articleId);if(!previewOnly&&$article.hasClass('act')){self.setCurrentArticleId(articleId);}
if(!article.availableForPurchase&&elements.alternative.length){$article.tooltip({tip:elements.tooltipAlt,position:'top center',lazy:true,delay:0,cancelDefault:true,onBeforeShow:function(){this.getConf().offset=[hm.cookieinfo.getCurrentOffset()*-1,0];elements.tooltipAlt.html(templates.tooltipAltArticle({name:article.description}));}});}
$article.find('> a').bind('click',function(e){e.preventDefault();self.changeArticle(articleId);self.updateHistory();if(self.getCurrentVariantId()){self.changeVariant(articleId,self.getCurrentVariantId());}}).bind('mouseenter',function(e){e.preventDefault();if(articleId!==self.getCurrentArticleId()){self.changeArticle(articleId,true);}}).bind('mouseleave',function(e){e.preventDefault();if(self.getCurrentArticleId()!==articleId){self.changeArticle(self.getCurrentArticleId());if(self.getCurrentVariantId()){self.changeVariant(self.getCurrentArticleId(),self.getCurrentVariantId());}}});if(self.getCurrentArticleId()===articleId){for(i in variants){if(variants.hasOwnProperty(i)){self.initVariant(articleId,variants[i].size.id,previewOnly);}}}};this.changeArticle=function(articleId,previewOnly){if(product.getArticle(articleId)){var article=product.getArticle(articleId),variants=product.getArticleVariants(articleId),$article=$('#option-article-'+articleId);if(article.sizeRange){self.updateSelectedVariant(article);}else{self.updateVariants(articleId,variants,previewOnly);}
self.updateSelectedArticle(article.description);self.updateAvailability(article);if(!self.getCurrentVariantId()){self.updatePrice(article.price);}
if(!previewOnly&&articleId!==self.getCurrentArticleId()){self.setCurrentArticleId(articleId);self.updateAlternative(articleId,article);$('li',elements.articles).removeClass('act');$article.addClass('act');elements.inputActivityArticle.val(article.currentActivityArticleNumber);elements.inputArticle.val(article.code);elements.shareThis.attr('data-article',article.code);self.updateInformation(article.information);self.updateCareInstruction(article.careInstruction);self.updateDeviation(article.deviation);self.updateComposition(article.composition);self.updateArticleNumber(article.catalogActivityArticleNumber);elements.images.attr('class','');elements.images.addClass('article-'+self.getCurrentArticleId());self.updateImages(article.images);self.updatePromos(article);self.updateAddToBag(true,'maxQty');self.updateAddToBag(true,'maxQtyErp');self.updateAddToBag(!article.soonAvailable,'soonAvailable');self.updateAddToBag(!(article.soldOut||article.afterShopExposure),'soldOut');}}};this.initVariant=function(articleId,variantId,previewOnly){var article=product.getArticle(articleId),variant=product.getArticleVariant(articleId,variantId),$variant=$('#option-variant-'+articleId+'-'+variantId);if(!previewOnly&&$variant.hasClass('act')){self.setCurrentVariantId(variantId);}
if(!variant.availableForPurchase&&elements.alternative.length){$variant.tooltip({tip:elements.tooltipAlt,position:'top center',lazy:true,delay:0,cancelDefault:true,onBeforeShow:function(){this.getConf().offset=[hm.cookieinfo.getCurrentOffset()*-1,0];elements.tooltipAlt.html(templates.tooltipAltVariant(variant.size));}});}
$variant.find('> a').bind('click',function(e){e.preventDefault();self.changeVariant(articleId,variantId);self.updateHistory();}).bind('mouseenter',function(e){e.preventDefault();if(variantId!==self.getCurrentVariantId()){self.changeVariant(articleId,variantId,true);}}).bind('mouseleave',function(e){e.preventDefault();if(self.getCurrentVariantId()){self.changeVariant(articleId,self.getCurrentVariantId(),previewOnly);}else{self.updatePrice(article.price);self.updateSelectedVariant({name:null});self.updateAvailability(article);}});};this.changeVariant=function(articleId,variantId,previewOnly){if(product.getArticleVariant(articleId,variantId)){var variant=product.getArticleVariant(articleId,variantId),variants=product.getArticleVariants(articleId),$variant=$('#option-variant-'+articleId+'-'+variantId);self.updateSelectedVariant(variant.size);self.updateAvailability(variant);self.updatePrice(variant.price);if(!previewOnly){if(variantId!==self.getCurrentVariantId()){self.updateAlternative(articleId,variant);}
self.setCurrentVariantId(variantId);$('li',elements.variants).removeClass('act');$variant.addClass('act');elements.inputSize.val(variantId);self.updateAddToBag(true,'maxQty');self.updateAddToBag(true,'maxQtyErp');self.updateAddToBag(true,'noSize');self.updateAddToBag(!variant.soonAvailable,'soonAvailable');self.updateAddToBag(!(variant.soldOut||variant.afterShopExposure),'soldOut');}}};this.updateVariants=function(articleId,variants,previewOnly){var i,variant,variantId;elements.variants.empty();for(i in variants){if(variants.hasOwnProperty(i)){variant=variants[i];variantId=variant.size.id;elements.variants.append(templates.variants({articleId:articleId,variant:variant}));self.initVariant(articleId,variantId);if(self.getCurrentVariantId()===variantId){self.changeVariant(articleId,variantId,previewOnly);}}}};this.updateSelectedArticle=function(article){elements.selectedArt.html(article);};this.updateSelectedVariant=function(size){if(size.sizeRange){elements.selectedVar.html(size.sizeRange);}else{elements.selectedVar.html(templates.selectedVar(size));}};this.updatePrice=function(price){elements.price.html(templates.price(price));};this.updateAvailability=function(variant){if(elements.availability.length){if(!variant.availableForPurchase){elements.availability.html(templates.availability(variant));}else{elements.availability.empty();}}};this.updateAlternative=function(articleId,variant){if(elements.alternative.length){if(variant.availableForPurchase){elements.alternative.empty();}else{hm.ajax.loadHtml('availableOption',function(html){elements.alternative.html(html);},{articleCode:articleId,stockSizeCode:(variant.size)?variant.size.id:''},{type:'get',cache:true});}}};this.updateHistory=function(){if(self.getCurrentArticleId()){hm.url.addHistory('article='+self.getCurrentArticleId());}};this.updateInformation=function(information){elements.information.html(information);};this.updateCareInstruction=function(instruction){if(instruction&&instruction.text){elements.careInstruction.html(instruction.text);}else{elements.careInstruction.empty();}};this.updateArticleNumber=function(articleNumber){elements.articleNumber.html(articleNumber);};this.updateDeviation=function(deviation){elements.deviation.html(deviation);};this.updateComposition=function(composition){elements.composition.html(composition);};this.updateAddToBag=function(enabled,reason){if(elements.addToBag.length){elements.addToBag.toggleClass(reason,!enabled);elements.addToBag.toggleClass('disabled',!enabled||!(elements.addToBag.attr('class')||'').match(/^(btn|bag|large|metricEvent|disabled|\s)+$/));}};this.updatePrevVariant=function(articleId,stockSizeId){elements.inputPrevArticle.val(articleId);elements.inputPrevStockSize.val(stockSizeId);};this.updateShopOrigin=function(shopOrigin){elements.inputShopOrigin.val(shopOrigin);};this.updateCampaign=function(campaign){elements.inputCampaign.val(campaign);};this.updateCampaignType=function(campaignType){elements.inputCampaignType.val(campaignType);};this.setActiveThumb=function($thumb,imageData){self.zoom.setImg(templates.largeImg(imageData));elements.images.addClass(imageData.type+' btg');elements.fullscreen.html(templates.fullscreen(imageData));$thumb.find('a').trigger('click');elements.image.attr('data-type',$thumb.find('a').attr('data-type'));return imageData;};this.updateImages=function(images){var i,activeType,activeImg=null,$thumb;if(images.length){activeType=elements.image.attr('data-type');elements.thumbs.empty();for(i in images){if(images.hasOwnProperty(i)){self.zoom.add({url:templates.largeImg(images[i]),full:templates.zoomedImg(images[i]),alt:images[i].alttext,type:images[i].type,zoom:images[i].type!=='DETAIL'});$thumb=$(templates.thumb(images[i]));elements.thumbs.append($thumb);if(activeType===images[i].type){if(activeImg===null){activeImg=self.setActiveThumb($thumb,images[i]);}
else if(self.getCurrentArticleId()===images[i].articleCode){activeImg=self.setActiveThumb($thumb,images[i]);}}}}
if(activeImg===null){if(elements.thumbs.find('a.FASHION_FRONT').length>0){elements.thumbs.find('a.FASHION_FRONT').trigger('click');}
else if(elements.thumbs.find('a.STILL_LIFE_FRONT').length>0){elements.thumbs.find('a.STILL_LIFE_FRONT').trigger('click');}
else if(elements.thumbs.find('a.FASHION_BACK').length>0){elements.thumbs.find('a.FASHION_BACK').trigger('click');}
else if(elements.thumbs.find('a.STILL_LIFE_BACK').length>0){elements.thumbs.find('a.STILL_LIFE_BACK').trigger('click');}
else{elements.thumbs.find('li:first-child > a').trigger('click');}}
scrollApi.init();scrollApi.scrollTo(elements.thumbs.find('.act').index(),0);}};this.updatePromos=function(article){var i,l;elements.promos.empty();if(article.saleOffer){elements.promos.append(templates.promo(article.saleOffer));}
if(article.offers.length){for(i=0,l=article.offers.length;i<l;i+=1){elements.promos.append(templates.promo(article.offers[i]));}}};this.setShopStatus=function(status){if(elements.form){self.updateAddToBag((status!=='partiallyClosed'),'shopClosed');tooltipApi.show();}};this.setBagAddError=function(error){if(elements.form){self.updateAddToBag(false,error);tooltipApi.show();}};this.setBackLinkIfCommingFromSearch=function($elem){"use strict";var lastSearchUrl=localStorage&&localStorage.getItem("search.url");if(lastSearchUrl){$elem.find('li > a').on('click',function(e){e.preventDefault();window.location.href=lastSearchUrl;});}else{$elem.hide();}};};})();})(jQuery);(function($){"use strict";var accordionHeadersSelector="#product .description h3";var foldableSectionSelector="*:not(h3):not(div)";$(function(){var toggleContentSiblings=function($element){var sibling=$element.next(foldableSectionSelector);if(sibling.length>0){sibling.toggleClass("folded");toggleContentSiblings(sibling);}};$(accordionHeadersSelector).each(function(index,element){var heading=$(element);if(!heading.hasClass("expanded")){toggleContentSiblings(heading);}});$(accordionHeadersSelector).click(function(e){var heading=$(this);heading.toggleClass("expanded");toggleContentSiblings(heading);});$(accordionHeadersSelector).last().addClass("last");});}(jQuery));