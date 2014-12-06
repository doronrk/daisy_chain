
/*! Olapic widget base */
var olapicWidgets =  olapicWidgets || {};

function olapicStartWidgets(olapicRequire){
	(function (r) {
		r.require.config({
			urlArgs: "olapicwversion=v2.04"+(olapicjQuery.browser.mobile ? '&mobile=fromMobile':''),
			paths: {"Magic/videojs": "//vjs.zencdn.net/4.2/video"}
		});
		r.require(['Magic/olapic.objects'], function($) {
			var addViewer = false;
			olapicWidgets.widgets = olapicWidgets.widgets || [];

			olapicjQuery.each(olapicWidgetSettings, function(widgetID, wSettings){
				r.require(['Magic/widget_'+wSettings.widgetype], function($){
					addViewer = (wSettings.initViewer == 1) || addViewer;
					
					var widgetLoaded = false;
					for(var element in olapicWidgets.widgets) {
						if(typeof olapicWidgets.widgets[element].options != 'undefined'){
							if(widgetID == olapicWidgets.widgets[element].getIndex()) {
								widgetLoaded = true;
							}
						}
					}

					if(!widgetLoaded) {
						var newWidget = new olapicWidget();
						newWidget.init(wSettings);
						newWidget.setIndex(widgetID);
						olapicWidgets.widgets.push(newWidget);
					}
				});
			});
			OlapicCommons.heardMessages();
		});

	}(olapicRequire));
}
if (olapicjQuery.browser.msie  && parseInt(olapicjQuery.browser.version, 10) === 8) {
	olapicjQuery( document ).ready(function() {
		olapicStartWidgets(olapicRequire);
	});
}else{
	setTimeout(function(){olapicStartWidgets(olapicRequire);}, 0);
};
olapicRequire.define("olapic.widget", function(){});

/*! Olapic widget : button */
olapicRequire.define("Magic/widget_button",["Magic/olapic.widgets"], function () {
		olapicWidget.prototype.initVars = function(){
			this.widgetName = "button";
			this.styles = [];
			this.css = [];
			this.cssIE = [];
		};
		olapicWidget.prototype.render = function(){

			this.options.widget = olapicjQuery.extend({
				id:0,
				settings: {css:'', call_to_action:''}
			}, this.options.widget);
			
			if(this.options.widget.settings.css === '' || this.options.widget.settings.css === undefined){
				this.styles.push(this.options.widget_url + "/static/css/Widget/olapic/button_#widgetStyle#.css".replace('#widgetStyle#', this.options.widgetstyle));
			}
			// Only load facebox.css if the browser is NOT mobile
			if(!olapicjQuery.browser.mobile){
				this.styles.push(this.options.widget_url + "/static/css/commons/facebox.css");
			}
			this.styles.push(this.options.widget_url + "/static/css/Widget/olapic/commons.css");

			for(thecss=0; thecss<this.styles.length; thecss++){
				this.createCss(this.styles[thecss]);
			}
			olapicjQuery("<a/>", {
				"class": "olapic_upload_button",
				"text": this.options.widget.settings.call_to_action
			}).appendTo("#"+this.options.elementId);
		};
		olapicWidget.prototype.afterRender = function(){
			var instance = this;
			olapicjQuery("#"+this.options.elementId).addClass("olapic_widget_container olapic_lang"+instance.options.lang);
			olapicjQuery(this.options.actionName).click(function(e){
				instance._tracker.track({
					'event':'WIDGET_PHOTO_CLICK',
					'extra': {
						'wId':parseInt(instance.options.widget.id, 10),
						'gId':parseInt(instance.options.galleryId, 10),
					},
					'object_id': '',
				});
				instance.loadUploadWindow(e);
			});
		};
	});
olapicRequire.define("Magic/widget_button", function(){});

/*! Olapic widget : area */
	olapicRequire.define("Magic/widget_area",["Magic/olapic.widgets"], function () {
		olapicWidget.prototype.initVars = function(){
			this.widgetName = "area";
			this.styles = [];
			this.css = [];
			this.cssIE = [];
		};
		olapicWidget.prototype.render = function(){

			this.options.widget = olapicjQuery.extend({
				id:0,
				settings: {css:'', call_to_action:''}
			}, this.options.widget);

			if(this.options.widget.settings.css === '' || this.options.widget.settings.css === undefined){
				this.styles.push(this.options.widget_url + "/static/css/Widget/olapic/area_#widgetStyle#.css".replace('#widgetStyle#', this.options.widgetstyle));
			}
			this.styles.push(this.options.widget_url + "/static/css/commons/fontawesome-olapic-custom.css");
			this.styles.push(this.options.widget_url + "/static/css/Widget/olapic/commons.css");
			// Only load facebox.css if the browser is NOT mobile
			if(!olapicjQuery.browser.mobile){
				this.styles.push(this.options.widget_url + "/static/css/commons/facebox.css");
			}

			for(thecss=0; thecss<this.styles.length; thecss++){
				this.createCss(this.styles[thecss]);
			}

			olapicjQuery("<div/>", {
				"class": "olapic_upload_button olapic_widget_area",
				"html": this.options.widget.settings.call_to_action
			}).appendTo("#"+this.options.elementId);
		};
		olapicWidget.prototype.afterRender = function(){
			var instance = this;
			olapicjQuery("#"+this.options.elementId).addClass("olapic_widget_container olapic_lang"+instance.options.lang);
			olapicjQuery(this.options.actionName).click(function(e){ instance.loadUploadWindow(e); });
			olapicjQuery(".mainimg_"+this.options.elementId).click(function(e){
				instance._tracker.track({
					'event':'WIDGET_PHOTO_CLICK',
					'extra': {
						'wId':parseInt(instance.options.widget.id, 10),
						'gId':parseInt(instance.options.galleryId, 10),
					},
					'object_id': '',
				});
				instance.loadViewer(e, olapicjQuery(this).attr("id"));
			});
			instance.afterRenderCallback();
		};
	});
olapicRequire.define("Magic/widget_area", function(){});

/*! Olapic widget : gallery // */

	olapicRequire.define("Magic/widget_olapic_wall",["Magic/olapic.widgets"], function () {
		olapicWidget.prototype.initVars = function(){
			this.styles = [];
			this.oldscroll = 0;
			this.galleryTop = 0;
			this.galleryHeigth = 0;
			this.on_progress = 0;
			this._tracker = null;
			this.photoInfo = {}; //used to save a photo data
			this.inprocess = false; //flat to avoid double request on viewer load
			this.streamsInfo = {}; // used to render streams menu filter
			this.responseInfo = {};
			this.colw1Class = 'colWidth1';
			this.colw2Class = 'colWidth2 '+((olapicjQuery.browser.msie) ? 'ie-colWidth2' : '' );

			this.options.widget = olapicjQuery.extend({
				id:0,
				settings: {css:'', call_to_action:'', custom_html:'', custom_default:'', get_streams: false, number_of_streams: 10, secondClassBy:5, keepLayoutAfterFilter:'1'}
			}, this.options.widget);

			this.options.widget.settings = olapicjQuery.extend(this.options.widget.settings, {
				pageOffset : 0, // pageLimit * pageNumber
				pageNumber : 0, // current page number
				loadedPages : 0, // number of pages currently loaded in widget
				page_batch : this.options.widget.settings.page_batch || 7,
				get_streams : this.options.widget.settings.get_streams || false,
				number_of_streams: this.options.widget.settings.number_of_streams || 10,
				secondClassBy: this.options.widget.settings.secondClassBy || 5,
				keepLayoutAfterFilter: this.options.widget.settings.keepLayoutAfterFilter || '0'
			});

			this.viewerUrl = this.options.site_url+'/viewer/'+this.options.owner+'/';

			this.options.widget_api_url = "";

			// api url parsing
			this.apiparams = {};
			if (olapicjQuery.browser.msie || (window.location.href.search('about') > -1)){
				this.options.olapic_api_url = (this.options.olapic_api_url.search(/http|https/) > -1) ? this.options.olapic_api_url : (window.location.protocol + this.options.olapic_api_url);
			}

			this.options.widget_api_url = this.options.olapic_api_url + '/v1/photos/';
			this.apiparams.api_key = this.options.olapic_api_key;
			if(this.options.galleryId > 0){
				this.options.stream = this.options.galleryId;
			}else if(this.options.categoryId >0){
				this.options.category = this.options.categoryId;
			}
			//for IE background cover
			this.positions = {
				top: 0,
				left: 0,
				bottom: 1,
				right: 1,
				center: 0.5
			};

			this.pageNumberFilters = {};
			this.offsetFilters = {};
			this.loadMoreButtonsStatus = {};
			this.lastStreamRequested = null;
		};
		olapicWidget.prototype.loadStyles = function(){
			var instance = this;
			return olapicjQuery.Deferred(function(dfd){ instance.dfdLoadStyles(dfd); }).promise();
		};
		olapicWidget.prototype.dfdLoadStyles = function(dfd) {
			var sL = new OlapicStylesLoader({
				queue: this.styles,
				after: function(){ dfd.resolve(); }
			}).run();
		};
		olapicWidget.prototype.render = function(){
			if (window.XDomainRequest) { OlapicCommons.IEAjaxFixes(); }

			var instance = this;
			
			if(this.options.widget.settings.css === '' || this.options.widget.settings.css === undefined){
				this.styles.push(this.options.staticCdnURL + "/static/css/Widget/olapic/olapic_wall_#widgetStyle#.css".replace('#widgetStyle#', this.options.widgetstyle));
			}
			// Only load facebox.css if the browser is NOT mobile
			if(!olapicjQuery.browser.mobile){
				this.styles.push(this.options.staticCdnURL + "/static/css/commons/facebox.css");
			}
			// Load the customer fontawesome if is the viewer 1
			if((typeof this.options.vieweraddon !== "undefined") && (this.options.vieweraddon == 'viewer1')){
				this.styles.push(this.options.staticCdnURL + "/static/css/commons/fontawesome-olapic-custom.css");
			}

			//callbacks
			window.settings = window.settings || {};
			window.settings.functionOlapicWallItemInject = 'olapicWallAfterInjectItem_'+instance.options.ownerdir;
			window.settings.functionOlapicWallAfterLoadPage = 'olapicWallAfterLoadPage_'+instance.options.ownerdir;
			window.settings.functionOlapicWallAfterLoad = 'olapicWallAfterLoad_'+instance.options.ownerdir;
			window.settings.functionOlapicWallBatchCompleted = 'olapicWallBatchCompleted_'+instance.options.ownerdir;
			window.settings.functionOlapicWallAvatarMouseHover = 'olapicWallAvatarMouseHover_'+instance.options.ownerdir;
			window.settings.functionOlapicWallAvatarMouseOut = 'olapicWallAvatarMouseOut_'+instance.options.ownerdir;
			window.settings.functionOlapicWallStreamsList = 'olapicWallStreamsList_'+instance.options.ownerdir;

			olapicjQuery.when(this.loadStyles()).done(function(){

				instance.prepareURL(false);

				olapicjQuery.when(instance.getStreams()).done(function(){

					instance.prepareHtmlStructure();
					
					olapicjQuery.when(instance.prepareSorting()).done(function(){
						olapicjQuery.when(instance.request(false, instance.getPhotosRequest)).done(function(){
							instance.attachEvents();
						});
					});	
				});
			});
		};
		
		olapicWidget.prototype.afterRender = function(){
			// Click event for all medias.
			var instance = this;

			olapicjQuery(".olapic_image_thumbnail", "#"+instance.options.elementId).live('click',function(e){
				instance.openViewer(this);
			});

			// Upload Button Click
			olapicjQuery(".widget-header-upload a", "#"+instance.options.elementId).live('click',function(e){
				olapicGoogleTracker.trackEvent({'category':'OlapicWallWidget', 'event':'UploadButton', 'label': instance.options.ga_Client});
				instance._tracker.track({'event':'WIDGET_UPLOAD_BUTTON', 'extra': {'widget_config':instance.options.widget.id}, 'object_id': instance.options.galleryId });
				instance.loadUploadWindow(e);
			});

			var fn = window[settings.functionOlapicWallAfterLoad];
			if(typeof fn === 'function') {
				fn(this.options);
			}
		};
		/* open viewer functions */
		olapicWidget.prototype.checkOpi = function(){
			var instance = this;
			// Hashtag OPI on url
			var reg = new RegExp('^#opi([0-9]+)$');
			var opiTest = reg.exec(window.location.hash);
			if(opiTest){
				//just open the viewer
				instance.openViewer(null, opiTest[1]);
			}
		};
		olapicWidget.prototype.openViewer = function(element, photoId){
			var instance = this;
			if(typeof photoId == 'undefined') photoId = olapicjQuery(element).attr("id");
			olapicGoogleTracker.trackEvent({'category':'OlapicWallWidget', 'event':'MediaClick', 'label': instance.options.ga_Client});
			instance._tracker.track({
				'event':'WIDGET_PHOTO_CLICK',
				'extra': {
					'wId':parseInt(instance.options.widget.id, 10),
					'gId':parseInt(instance.options.galleryId, 10),
				},
				'object_id': photoId,
			});
			instance.loadViewer(null, photoId);
		};
		/* end open viewer functions */
		olapicWidget.prototype.prepareHtmlStructure = function(){
			var instance = this;
			
			// get specific widget element
			var widgetElement = olapicjQuery("#"+instance.options.elementId);
			
			// global wrapper
			var globalWrapper = olapicjQuery('<div />',{'id' : 'olapic-widget-wall-wrapper'});
			
			// armado de estructura global
			globalWrapper.append(this.prepareHtmlHeader());

			// armado de estructura global
			globalWrapper.append(this.prepareHtmlMain());

			// armado de estructura global
			globalWrapper.append(this.prepareHtmlFooter());

			// ultimo append al contenedor general
			widgetElement.append(globalWrapper);

			widgetElement.addClass("olapic_lang"+instance.options.lang);
		};
		olapicWidget.prototype.prepareHtmlHeader = function() {
			var instance = this;

			// header 
			var widgetHeader = olapicjQuery('<div />',{'class' : 'widget-header'});
			var widgetHeaderTitle = '';
			if(instance.options.widget.settings.title !== undefined && instance.options.widget.settings.title !== '') {
				widgetHeaderTitle = olapicjQuery('<div />',{'class' : 'widget-header-title'});
				widgetHeaderTitle.append(olapicjQuery('<h3 />').html(instance.options.widget.settings.title));
			}
			
			var widgetHeaderUpload = olapicjQuery('<div />',{'class' : 'widget-header-upload'});

			var widgetHeaderUploadLink = olapicjQuery('<a/>',{
				'html'	: instance.options.widget.settings.upload_button_text,
				'target': '_self',
				'href'	: '#'
			});

			var widgetHeaderViewAll = olapicjQuery('<div />',{'class' : 'widget-header-view-all'});

			// wall widget filter streams menu
			var widgetHeaderStreamsFilter = olapicjQuery('<ul />',{'class' : 'widget-header-streams-filter'});	

			if(!olapicjQuery.isEmptyObject(instance.options.widget.settings.streams_list) && instance.options.widget.settings.sorting != 'packery' && instance.options.widget.settings.streams_filter !== '0') {
				var streams = instance.options.widget.settings.streams_list;
				if(instance.options.widget.settings.streams_filter_show_all == 1) {
					var menuElement = '<li><a href="javascript:void(0)" class="active" rel="*">Show All</a></li>';
					widgetHeaderStreamsFilter.append(menuElement);
					instance.pageNumberFilters[0] = 0;
					instance.offsetFilters[0] = 0;
				}
				
				var streams_each = streams;
				var streams_order_enabled = false;
				if(instance.options.widget.settings.streams_order){
					streams_each = instance.options.widget.settings.streams_order;
					streams_order_enabled = true;
				}
				olapicjQuery.each(streams_each, function(index, stream){
					var menuElement = '';
					var streamID = 0;
					if(streams_order_enabled){
						menuElement = '<li><a href="javascript:void(0)" rel="li.category_'+stream+'" data-id="'+stream+'">'+streams[stream]+'</a></li>';
						streamID = stream;
					} else {
						menuElement = '<li><a href="javascript:void(0)" rel="li.category_'+index+'" data-id="'+index+'">'+stream+'</a></li>';
						streamID = index;
					}
					instance.pageNumberFilters[streamID] = 0;
					instance.offsetFilters[streamID] = 0;
					widgetHeaderStreamsFilter.append(menuElement);
				});
			}

			var widgetHeaderExtraHtml = olapicjQuery('<div />',{'class' : 'widget-header-extra-html'});
			
			if(instance.options.widget.settings.html_header !== '' && instance.options.widget.settings.html_header !== undefined) {
				widgetHeaderExtraHtml.append(instance.options.widget.settings.html_header);
			}

			widgetHeaderUpload.append(widgetHeaderUploadLink);

			widgetHeader.append(widgetHeaderTitle).append(widgetHeaderViewAll).append(widgetHeaderUpload).append(widgetHeaderStreamsFilter).append(widgetHeaderExtraHtml);

			return widgetHeader;
		};
		olapicWidget.prototype.prepareHtmlMain = function() {
			var instance = this;

			var widgetMain = olapicjQuery('<div />',{'class' : 'widget-main'});
			
			var widgetMainLoading = '<div class="widget-main-loading"><div class="widget-main-loading-img"></div></div>';

			var widgetMainExtraHtml = olapicjQuery('<div />',{'class' : 'widget-main-extra-html'});

			if(instance.options.widget.settings.middle_extra_html !== '' && instance.options.widget.settings.middle_extra_html !== undefined) {
				widgetMainExtraHtml.append(instance.options.widget.settings.middle_extra_html);
			}

			var widgetMainImages = olapicjQuery('<ul />',{'class' : 'widget-main-images'});

			widgetMain.append(widgetMainExtraHtml).append(widgetMainImages).append(widgetMainLoading);
			olapicjQuery('.widget-main-loading').hide();

			return widgetMain;
		};
		olapicWidget.prototype.prepareHtmlFooter = function() {
				var instance = this;

			var widgetFooterContainer = olapicjQuery('<div />',{'class' : 'widget-footer'});

			var widgetFooter = olapicjQuery('<div />',{'class' : 'widget-footer-extra-html'});

			if(instance.options.widget.settings.html_footer !== '' && instance.options.widget.settings.html_footer !== undefined) {
				widgetFooterContainer.append(widgetFooter.append(instance.options.widget.settings.html_footer));
			}

			var disclosure = '<!-- ************************************************************************'+
							'The following attribution MUST NOT be removed as per our licensing agreement.'+
							'You may change the location or the styling to better match your site, but the wording and the link must remain in the template and visible to all end users. '+
							'************************************************************************ -->';

			var copyright = olapicjQuery('<div/>',{'class':'newcopyright-olapic'}).append(disclosure+'<p><a href="http://www.olapic.com" target="_blank">Powered by Olapic</a></p>');

			widgetFooterContainer.append(copyright);

			return widgetFooterContainer;
		};
		olapicWidget.prototype.prepareHtmlImage = function(imageData, itemIndex) {
			var instance = this,
				hideElement = false,
				//categories class
				categories = '',
				extrasClasses = ( ((itemIndex > 1) && (itemIndex % instance.options.widget.settings.secondClassBy === 0)) ? instance.colw2Class : instance.colw1Class );

			olapicjQuery.each(imageData.streams, function(i, e){
				// Only show the elements if the streams is equal to the filter selected
				categories += ' category_'+e.stream_id;
			});


			var liThumb = olapicjQuery('<li/>',{'id':'item_'+imageData.id, 'class':'item_source_'+imageData.source+' '+categories +' '+extrasClasses +' item_'+instance.options.elementId});
			if(instance.options.widget.settings.sorting !== 'isotope' && olapicjQuery('.widget-header-streams-filter a.active').data('id') !== undefined){
				if(categories.search('category_'+olapicjQuery('.widget-header-streams-filter a.active').data('id')) === 0){
					liThumb.hide();
				}
			}
			
			var divThumb = olapicjQuery('<div/>',{'class':'olapicitemlink olapicitem'+instance.options.elementId+'-'+imageData.id+' '+categories,'href':imageData.id});
			var span = olapicjQuery('<span/>', {'style':'display:none', 'class':'type-'+imageData.type, 'html':'<i class="olapic-icon-facetime-video"></i>'});
			divThumb.append(span);
			
			// prepare Avatar
			var avatarThumb = instance.getAvatarThumb(imageData.uploader);
			var imageThumb = olapicjQuery('<div/>', {
				'class':'olapic_image_thumbnail img_from_'+imageData.source,
				'id':imageData.id
			});
			if (olapicjQuery.browser.msie && (parseInt(olapicjQuery.browser.version, 10) <= 8 )){
				var coverImage = olapicjQuery('<img />', {'id': 'imageItem-'+imageData.id, 'src':imageData.images[instance.options.widget.settings.img_size], 'class':'coveredImage imageItem'+imageData.id, 'style':'position: relative'});
				imageThumb.append(coverImage);
			}else{
				imageThumb.css({'background-image' : 'url('+imageData.images[instance.options.widget.settings.img_size]+')'});	
			}
			liThumb.append(divThumb.append(imageThumb).append(avatarThumb)); 

			return liThumb;
		};
		olapicWidget.prototype.addItem = function(item, index){
			var atBegging = (typeof arguments[1] == 'boolean') ? arguments[1] : false;
			var singleImage = this.prepareHtmlImage(item, index);
			this.insertNewElement(singleImage, atBegging, item.id);
			// Execute this for each photo inserted in the pagination
			if(typeof window[settings.functionOlapicWallItemInject] === 'function') {
				window[settings.functionOlapicWallItemInject](item);
			}
		};
		olapicWidget.prototype.getAvatarThumb = function(uploader){
			var divThumb = {};
			var nameElement = {};

			if(!uploader.default_avatar) {
				divThumb = olapicjQuery('<div/>', {
					'class' : "widget-avatar-thumb"
				}).css({'background-image':'url("'+uploader.avatar+'") no-repeat'});

				nameElement = olapicjQuery('<span/>',{
					'class' : 'widget-avatar-uploader'
				}).html(uploader.username);
			} else {
				divThumb = olapicjQuery('<div/>', {
					'class' : "widget-avatar-thumb"
				});

				nameElement = olapicjQuery('<span/>',{
					'class' : 'widget-avatar-uploader default_avatar'
				}).html(uploader.username);
			}
			
			divThumb.html(nameElement);
			return divThumb;
		};
		olapicWidget.prototype.request = function(onScroll, responseCallBack) {
			var instance = this;
			
			if(onScroll)
				instance.showLoader();
			else
				instance.hideLoader();
			
			return olapicjQuery.Deferred(
				function(dfd) {

					if(instance.inprocess) dfd.fail();
					instance.inprocess = true;
					if(olapicjQuery.browser.msie && window.XDomainRequest) {
						// Use Microsoft XDR
						var xdr = new XDomainRequest();
						xdr.open("get", instance.apiurl);
						xdr.onload = function () {
							var JSON = olapicjQuery.parseJSON(xdr.responseText);
							if (JSON === null || typeof (JSON) == 'undefined'){
								JSON = olapicjQuery.parseJSON(data.firstChild.textContent);
							}
							responseCallBack(JSON, instance);
							dfd.resolve();
						};
						xdr.onprogress = function(){ };
						xdr.ontimeout = function(){ };
						xdr.onerror = function () { dfd.fail(); };
						setTimeout(function(){
							xdr.send();
						}, 0);

					} else {
						olapicjQuery.ajax({
							url:instance.apiurl, 
							dataType:'json',
							method: 'GET',
							error: function(jqXHR, textStatus, errorThrown){
								dfd.fail();
							},
							success: function(JSON){
								responseCallBack(JSON, instance);
								dfd.resolve();
							}
						});

					}
				}
			).promise();
		};
		olapicWidget.prototype.attachEvents = function(){
			var instance = this;
			
			// Scroll Event for pagination.
			var scrollElement = olapicjQuery(window);
			if(instance.options.widget.settings.scroll_element === 0) {
				scrollElement= olapicjQuery('#'+instance.options.elementId);
				instance.galleryTop = 0;
			} 
			scrollElement.scroll(function() {
				if( instance.oldscroll <= scrollElement.scrollTop() ){
					instance.oldscroll = scrollElement.scrollTop();
					var limitScroll = olapicjQuery('.widget-main').height() - scrollElement.height() + instance.galleryTop;
					if(
						(limitScroll <= scrollElement.scrollTop()) &&
						(instance.options.widget.settings.loadedPages < instance.options.widget.settings.page_batch)
					){
						if(instance.on_progress === 0) {
							instance.on_progress = 1;
							if(olapicjQuery('.widget-header-streams-filter a.active', '#'+instance.options.elementId).data('id') !== undefined){
								instance.prepareURL(true, olapicjQuery('.widget-header-streams-filter a.active', '#'+instance.options.elementId).data('id'));
							} else {
								instance.prepareURL(true);
							}
							instance.request(true, instance.getPhotosRequest);
						}
					}
				}
			});

			// Avatar mouse over
			olapicjQuery('.olapicitemlink', '#'+instance.options.elementId).hover(function(){
				// Adding callback for hover
				var element = this;
				if(typeof window[settings.functionOlapicWallAvatarMouseHover] === 'function'){
					window[settings.functionOlapicWallAvatarMouseHover](element);
				}
			}, function(){
				var element = this;
				if(typeof window[settings.functionOlapicWallAvatarMouseOut] === 'function'){
					window[settings.functionOlapicWallAvatarMouseOut](element);
				}
			});

			// Wall Widget Menu filtering
			olapicjQuery('.widget-header-streams-filter a').live('click', function(e){
				e.preventDefault();
				olapicjQuery('.widget-header-streams-filter a').removeClass('active');
				olapicjQuery(this).addClass('active');

				if(olapicjQuery(this).data('id') !== undefined){
					instance.options.widget.settings.pageNumber = (instance.pageNumberFilters[olapicjQuery(this).data('id')] !== undefined) ? instance.pageNumberFilters[olapicjQuery(this).data('id')] : 0;
					instance.options.widget.settings.pageOffset = (instance.offsetFilters[olapicjQuery(this).data('id')] !== undefined) ? instance.offsetFilters[olapicjQuery(this).data('id')] : 0; 
				} else {
					var finalPageNumber = 0;
					var finalOffset = 0;
					for(var index in instance.pageNumberFilters){
						finalPageNumber = finalPageNumber + instance.pageNumberFilters[index];
						finalOffset = finalOffset + instance.offsetFilters[index];
					}
					instance.options.widget.settings.pageNumber = (finalPageNumber !== 0) ? finalPageNumber : 1;
					instance.options.widget.settings.pageOffset = finalOffset;
				}
			
				var cat = olapicjQuery(this).attr('rel');
				if(instance.options.widget.settings.sorting == 'isotope') {
					olapicjQuery('ul.widget-main-images').isotope({ filter: cat}, function(){ instance.afterFilter(); } );
				} else {
					if(cat != '*') {
						olapicjQuery(".olapicitemlink").fadeOut();
						olapicjQuery("."+cat.split(".")[1], '#'+instance.options.elementId).fadeIn();
					} else {
						olapicjQuery(".olapicitemlink").fadeIn();
					}
				}

				if(olapicjQuery(this).data('id') !== undefined && olapicjQuery(this).attr('rel') !== '*'){
					instance.prepareURL(false,olapicjQuery(this).data('id'));
					instance.request(false, instance.getPhotosRequest);	
				}
			});

			instance.checkOpi();

		};
		// Parameter onScroll true for attached event on Scroll
		olapicWidget.prototype.prepareURL = function(onScroll, filterStreamId) {
			var instance = this;
			instance.apiurl = instance.options.widget_api_url + '?' + olapicjQuery.param( instance.apiparams );
			// Hashtag Parse URL
			var reg = new RegExp('^#olapic-page-([0-9]+)$');
			var specificPage = reg.exec(window.location.hash);
			
			instance.options.widget.settings.pageOffset = instance.options.widget.settings.page_limit * instance.options.widget.settings.pageNumber;
			
			// Scroll Flag for request calls.
			if(specificPage){ 
				if(!onScroll) {
					instance.options.widget.settings.pageNumber = parseInt(specificPage[1], 0);
				} else {
					instance.options.widget.settings.pageNumber++;
				}
				instance.options.widget.settings.pageOffset = instance.options.widget.settings.page_limit * instance.options.widget.settings.pageNumber;
			} else {
				instance.options.widget.settings.pageNumber++;
			}

			if(filterStreamId !== undefined){
				instance.apiurl += '&stream='+filterStreamId + '&limit='+instance.options.widget.settings.page_limit+'&offset=' + instance.options.widget.settings.pageOffset;
			} else {
				if(instance.options.galleryId > 0){
					instance.apiurl += '&stream='+instance.options.stream + '&limit='+instance.options.widget.settings.page_limit+'&offset=' + instance.options.widget.settings.pageOffset;
				} else if (instance.options.categoryId > 0){
					instance.apiurl += '&category='+instance.options.categoryId + '&limit='+instance.options.widget.settings.page_limit+'&offset=' + instance.options.widget.settings.pageOffset;
				} else {
					instance.apiurl += '&limit='+instance.options.widget.settings.page_limit+'&offset=' + instance.options.widget.settings.pageOffset;				
				}
			}

			if(filterStreamId !== undefined){
				instance.pageNumberFilters[filterStreamId] = instance.options.widget.settings.pageNumber;
				instance.offsetFilters[filterStreamId] = instance.options.widget.settings.pageOffset;
			} else {
				instance.pageNumberFilters[0] = instance.options.widget.settings.pageNumber;
				instance.offsetFilters[0] = instance.options.widget.settings.pageOffset;
			}
			
			return instance.apiurl;
		};
		olapicWidget.prototype.showLoader = function() {
			olapicjQuery('.widget-main-loading', '#'+this.options.elementId).show();
		};
		olapicWidget.prototype.hideLoader = function() {
			olapicjQuery('.widget-main-loading', '#'+this.options.elementId).hide();
		};
		olapicWidget.prototype.getStreams = function(){
			var instance = this;
			return olapicjQuery.Deferred(
				function(dfd) {
					if(instance.options.widget.settings.get_streams) {
						var url = instance.options.widget_api_url.replace('photos', 'streams') + "?api_key=" + instance.options.olapic_api_key + "&limit=" + instance.options.widget.settings.number_of_streams;
						olapicjQuery.ajax({
							url: url,
							dataType: 'json',
							method: 'GET',
							success: function(e){
								instance.streamsInfo = e.response;
								if(typeof window[settings.functionOlapicWallStreamsList] === 'function') {
									window[settings.functionOlapicWallStreamsList](instance.streamsInfo);
								}
								dfd.resolve();
							}
						});
					} else {
						dfd.resolve();		
					}
				}
			);
		};
		// Sorting
		olapicWidget.prototype.prepareSorting = function(){
			var _self = this;
			return olapicjQuery.Deferred(
				function(dfd) {
					if(_self.options.widget.settings.sorting == 'isotope'){
						olapicRequire.require(['Magic/jquery.isotope.min'], function(){
							olapicjQuery('ul.widget-main-images', "#"+_self.options.elementId).isotope({ filter: "*" });
							dfd.resolve();
						});
					}else if(_self.options.widget.settings.sorting == 'packery'){
						olapicRequire.require(['Magic/packery.pkgd.min'], function(){
							dfd.resolve();
						});
					}else{
						dfd.resolve();
					}
				}
			).promise();
		};
		olapicWidget.prototype.insertNewElement = function(singleImage, atBegging, itemId){
			var _self = this;
			if(atBegging === true){
				olapicjQuery('.widget-main-images', "#"+_self.options.elementId).prepend(singleImage);
				if(_self.options.widget.settings.sorting == 'isotope'){
					//isotope shorting
					olapicjQuery('ul.widget-main-images', "#"+_self.options.elementId).isotope( 'reloadItems' ).isotope({ sortBy: 'original-order' });
				}
			}else{
				if(_self.options.widget.settings.sorting == 'isotope'){
					//isotope shorting
					olapicjQuery('ul.widget-main-images', "#"+_self.options.elementId).isotope( 'insert', olapicjQuery(singleImage) ); 
				}else if(_self.options.widget.settings.sorting == 'packery'){
					if(typeof _self.sortingContainer === 'undefined') {
						var container = document.querySelector('.widget-main-images');
						var pckry = new Packery( container );	
						_self.sortingContainer = pckry;
					}
					olapicjQuery('ul.widget-main-images', "#"+_self.options.elementId).append(singleImage);	
					_self.sortingContainer.appended( olapicjQuery(singleImage) );
					
				}else {
					//default behavior
					olapicjQuery('ul.widget-main-images', "#"+_self.options.elementId).append(singleImage);
				}
			}
			if (olapicjQuery.browser.msie && (parseInt(olapicjQuery.browser.version, 10) <= 8 )){
				_self.centerCoverImage(itemId);
			}
		};
		//IE background cover
		//based on: https://github.com/louisremi/jquery.backgroundSize.js/blob/master/jquery.backgroundSize.js
		olapicWidget.prototype.centerCoverImage = function(itemId){
			if(typeof olapicjQuery('#'+itemId).data('done') == 'undefined'){
				olapicjQuery('#'+itemId).data('done', true);
				var itemDimentions = {
					width: olapicjQuery('#'+itemId).innerWidth(),
					height: olapicjQuery('#'+itemId).innerHeight()
				};
				var imageDimentions = {
					width: olapicjQuery('#imageItem-'+itemId).innerWidth(true),
					height: olapicjQuery('#imageItem-'+itemId).innerHeight(true)
				};
				var pos = ( 
					// Firefox, Chrome (for debug)
					olapicjQuery('#'+itemId).css('background-backgroundPosition') ||
					// IE8
					olapicjQuery('#'+itemId).css('backgroundPositionX') + " " + olapicjQuery('#'+itemId).css('backgroundPositionY')
				).split(" ");
				pos = [ 
					this.positions[ pos[0] ] || parseFloat( pos[0] ) / 100, 
					this.positions[ pos[1] ] || parseFloat( pos[1] ) / 100
				];
				var elemRatio = itemDimentions.width / itemDimentions.height,
					imgRatio = imageDimentions.width / imageDimentions.height,
					delta, imageCover;
				if( imgRatio > elemRatio ) {
					delta = Math.floor( ( itemDimentions.height * imgRatio - itemDimentions.width ) * pos[1] );
					imageCover = {
						left: -delta,
						height:"100%",
						width: "auto",
						top: 0
					};
				} else {
					delta = Math.floor( ( itemDimentions.width / imgRatio - itemDimentions.height ) * pos[0] );
					imageCover = {
						top: -delta,
						width: "100%",
						height: "auto",
						left: 0
					};
				}
				olapicjQuery('.imageItem'+itemId, '#'+this.options.elementId).css(imageCover);
				olapicjQuery('#'+itemId).data('imageCover', imageCover);
			}else{
				olapicjQuery(olapicjQuery('.imageItem'+itemId).get(1)).css(olapicjQuery('#'+itemId).data('imageCover'));
			}
		};
		olapicWidget.prototype.afterFilter = function() {
			var _self = this,
				items = olapicjQuery('ul.widget-main-images li:not(.isotope-hidden)', "#"+this.options.elementId),
				a = 0,
				itemSelector = '',
				loadMoreButton = olapicjQuery('.olapic-load-more', '#'+this.options.elementId);
			_self.verifyLoadMoreButton(_self);

			if(_self.options.widget.settings.keepLayoutAfterFilter == '1'){
				olapicjQuery(items).removeClass('colWidth1 colWidth2 ie-colWidth2');
				olapicjQuery(items).each(function(index,item){
					olapicjQuery(item).addClass( ((index > 1) && (index % _self.options.widget.settings.secondClassBy === 0)) ? _self.colw2Class : _self.colw1Class );
				});

				olapicjQuery('ul.widget-main-images', "#"+this.options.elementId).isotope('reLayout');
			}
		};

		olapicWidget.prototype.getPhotosRequest = function(responseData, instance){
			var  data = responseData,
				newpage = '', 
				offset_control = null,
				initIndex = olapicjQuery('ul.widget-main-images li', "#"+instance.options.elementId).length;

			olapicjQuery(data.response).each(function(index,value){
				if(olapicjQuery('#item_'+value.id+'.item_'+instance.options.elementId).length === 0){
					instance.addItem(value, initIndex);
					initIndex ++;
				}
			});

			// Execute this when the request whas done, whit all the photos
			if(typeof window[settings.functionOlapicWallAfterLoadPage] === 'function'){
				window[settings.functionOlapicWallAfterLoadPage](data.response);
			}
			if(instance.options.widget.settings.sorting == 'isotope'){
				olapicjQuery('ul.widget-main-images', '#'+instance.options.elementId).isotope( 'reloadItems' );
			}
			
			instance.options.widget.settings.loadedPages++;
			
			if(typeof data.cursor != 'undefined'){
				offset_control = (typeof data.cursor.next_offset != 'undefined') ? offset_control = data.cursor.next_offset : offset_control = 0;
			} else { offset_control = 0; }
			
			if(instance.options.widget.settings.loadedPages == instance.options.widget.settings.page_batch && offset_control !== 0) {
				
				var loadMoreWrapper = olapicjQuery('<div/>',{
					'class' : 'load-more-wrapper'
				});
				
				var externalNewPage = instance.options.widget.settings.pageNumber;

				var theLinkElement = olapicjQuery('<a/>',{
					'class' : "olapic-load-more",
					'href' : window.location.href.replace(window.location.hash, '') + '#olapic-page-'+externalNewPage
				}).html('Load More Photos');

				olapicjQuery(theLinkElement).appendTo(loadMoreWrapper);

				var widgetLoadMoreContainer = olapicjQuery('<div />',{'class' : 'widget-load-more'}).html('LOAD MORE');
				var widgetElement = olapicjQuery('.widget-main', '#'+instance.options.elementId);
				widgetElement.append(loadMoreWrapper);

				// #6435399346096 load more pages click
				olapicjQuery(theLinkElement).click(function(e){
					e.preventDefault();
					
					if(instance.options.widget.settings.external_batch == 1) {
						window.location.href = olapicjQuery(this).attr('href');
						window.location.reload();
					} else {
						if(olapicjQuery('.widget-header-streams-filter a.active').data('id') !== undefined){
							instance.prepareURL(false, olapicjQuery('.widget-header-streams-filter a.active').data('id'));
						} else {
							instance.prepareURL(false);
						}
						instance.request(true, instance.getPhotosRequest);
					}
				});
			}

			var loadMoreButton = olapicjQuery('.olapic-load-more', '#'+instance.options.elementId);
			instance.verifyLoadMoreButton(instance);

			if(data.response.length === 0) {
				loadMoreButton.hide();
				instance.loadMoreButtonsStatus[instance.lastStreamRequested] = '-';
			} else {
				loadMoreButton.show();
			}

			instance.on_progress = 0;
			instance.hideLoader();
		};

		olapicWidget.prototype.getFilterPhotos = function(responseData, instance) {
			var tmpIndex = 0, 
				data = responseData,
				initIndex = olapicjQuery('ul.widget-main-images li', "#"+instance.options.elementId).length;

			olapicjQuery.each(data.response, function(index, photo){
				if(olapicjQuery('#item_'+photo.id+'.item'+instance.options.elementId).length === 0){
					instance.addItem(photo, initIndex);
					initIndex ++;
				}
			});
		};

		olapicWidget.prototype.verifyLoadMoreButton = function(instance){
			var loadMoreButton = olapicjQuery('.olapic-load-more', '#'+instance.options.elementId);
			if(instance.lastStreamRequested){
				if(typeof instance.loadMoreButtonsStatus[instance.lastStreamRequested] === 'undefined'){
					loadMoreButton.show();
				}else{
					loadMoreButton.hide();
				}
			}
		};
	});

olapicRequire.define("Magic/widget_olapic_wall", function(){});

var olapicModules = [];
olapicModules.push('Magic/commons');
olapicModules.push('Magic/olapic.googleTracker');
/**
Only load facebox & olapic.lightboxViewer if we launch the modal.
If the browser is mobile we open a new window, so it's not necessary this elements.
**/
if(!olapicjQuery.browser.mobile){
	olapicModules.push('Magic/facebox');
}else{
	olapicModules.push('Magic/olapic.galleryMobile');
}
	
if(typeof olapicsettings !== 'undefined'){
	if((typeof olapicsettings.vieweraddon !== "undefined") && (olapicsettings.vieweraddon.search('viewer2') > -1)){
		olapicModules.push('Magic/olapic.lightboxViewer');
	}
}else if(typeof olapicWidgetSettings !== 'undefined'){
	if((typeof olapicWidgetSettings.vieweraddon !== "undefined") && (olapicWidgetSettings.vieweraddon.search('viewer2') > -1)){
		olapicModules.push('Magic/olapic.lightboxViewer');
	}
}

olapicRequire.define("Magic/olapic.objects",olapicModules, function(){
	/*! Olapic Objects */
	Olapic = function(){ return this;};
	function OlapicSocial(options){ this.options = options; return this;}
	function OlapicGallery(options){ this.init(options); return this; }
	OlapicViewer2section = function(options){ this.options = options; return this; };
	function OlapicUploader2section(options){ this.options = options; return this; }

		/********** Extends Olapic Object **************/
		Olapic.prototype.init = function(options){
			options.dosetkeypress = (typeof options.dosetkeypress === "undefined") ? true : options.dosetkeypress;
			options.doresize = (typeof options.doresize  === "undefined") ? true : options.doresize;
			options.dochengeurl = (typeof options.dochengeurl === "undefined") ? true : options.dochengeurl;
			options.vieweraddon = (typeof options.vieweraddon === "undefined") ? 'viewer' : options.vieweraddon;

			options.olapic_api_url = (typeof options.olapic_api_url === "undefined") ? '' : options.olapic_api_url;
			options.olapic_api_key = (typeof options.olapic_api_key === "undefined") ? '' : options.olapic_api_key;
			options.olapic_u = (typeof options.olapic_u === "undefined") ? '' : options.olapic_u;

			this.options = options;
			if(olapicjQuery.browser.msie && olapicjQuery.browser.version == "8.0") {
				this._parent = parent;
			} else { 
				this._parent = parent.window; 
			}
			this.social = new OlapicSocial(this.options);
			this._tracker = new OlapicTracker();
			this._tracker.init({
				_api_url: options.olapic_api_url,
				_api_key: options.olapic_api_key,
				_olapic_u: options.olapic_u
			});

			this.execute();
			
			//google tracker
			olapicGoogleTracker.create();
			olapicGoogleTracker.trackPageView({'partner':this.options.owner, 'section':this.options.section, 'page':this.options.page});

			return this;
		};

		Olapic.prototype.execute = function(){
			if(typeof window.settings == 'object'){
				window.settings.viewerpreLoadCallback = 'olapicPreLoadFunction';
			}else{
				window.settings = {
					viewerpreLoadCallback: 'olapicPreLoadFunction'
				};
			}
			if(typeof this.options.facebook_gallery != 'undefined' && this.options.facebook_gallery){
				this.sectionDefault();
			} else {
				if(this.options.page=='ViewGallery')
					this.sectionGallery();
				else if(this.options.page=='Home')
					this.sectionGallery();
				else if(this.options.page=='ViewMedia')
					this.sectionMedia();
				else if(this.options.page=='ViewMedia-Viewer2')
					this.sectionViewer2();
				else if(this.options.page=='Uploader2')
					this.sectionUploader2();
				else if(this.options.page=='StreamsMobile' || this.options.page=='StreamsMobileSingle')
					this.sectionStreamsMobile();
				else
					this.sectionDefault();
			}
		};

		Olapic.prototype.sectionGallery = function(){
			// this.social.initall('');
			this.social.initFacebook('');
			// this.social.initAddThis();
			this.social.initGooglePlus();
			this.social.initTwitter();

			this.options.photoitemtemplate = photoitemtemplate||'';
			window.olapicGallery = new OlapicGallery(this.options);
		};

		Olapic.prototype.closeModal = function(){
			this._parent.postMessage(olapicjQuery.stringify({'from':'olapic.magic', 'justClose':'true'}), "*");
		};

		Olapic.prototype.sectionMedia = function(){	
			var instance = this;
			OlapicCommons.heardMessages();
			this.social.initall(olapicjQuery('.olapic-photo-viewer').attr('rel'));

			olapicjQuery('.olapic_previous_button, .olapic_previous_button, .olapic_next_button, .olapic_next_button').click(function(e){ e.preventDefault(); });

			OlapicCommons.reportPhoto(null, olapicjQuery('#olapic_ecomm_lightbox').innerWidth(), 'dialogreport', 'reportform');

			var fromwidget = (window.location.href.search(/widget/) > -1);
			if(!fromwidget) {
				instance._parent.postMessage(olapicjQuery.stringify({'from':'olapic.magic', 'method':'bestphotocontrol', 'refurl':  window.location.href}), "*");
			} else {
				this.options.widgetid = this.options.widgetid ? this.options.widgetid : OlapicCommons.getUrlVars().widget;
				instance._parent.postMessage(olapicjQuery.stringify({
					'from': 'olapic.magic', 
					'method': 'widgetphotocontrol', 
					'widget_id': this.options.widgetid, 
					'siteurl':this.options.siteurl, 
					'refurl':window.location.href, 
					'media_id':this.options.media_id, 
					'ownerdir':this.options.ownerdir
				}), "*");
			}
			if(typeof instance._tracker !== "undefined" && instance._tracker !== null && instance.options.olapic_u === 1){
				instance._tracker.track({'event':'MEDIA_VIEW', 'object_id': instance.options.media_id });
			}

			if(this.options.dosetkeypress) instance._parent.postMessage(olapicjQuery.stringify({'from':'olapic.magic', 'method':'setparentkey'}), "*");

			if(olapicjQuery.browser.msie && olapicjQuery.browser.version == 8.0) {
				var contentSize = olapicjQuery('#olapic_ecomm_lightbox').innerHeight() - 10;
				instance._parent.postMessage(olapicjQuery.stringify({'from':'olapic.magic', 'method':'resize', 'contentSize': contentSize}), "*");
			} else {
				olapicjQuery('<img />', {'src':this.options.mediaurl}).load(function(){
					olapicjQuery('#olapic_ecomm_lightbox_img img').attr('src', instance.options.mediaurl);
					if(instance.options.doresize) {
						var contentSize = olapicjQuery('#olapic_ecomm_lightbox').innerHeight() - 10;
						if (contentSize < 350) contentSize = 350; // hack for weird behavior with olapicjQuery('#olapic_ecomm_lightbox').innerHeight() 
						instance._parent.postMessage(olapicjQuery.stringify({'from':'olapic.magic', 'method':'resize', 'contentSize': contentSize}), "*");
					}
				});
			}
			if(window.location.href.search(/nopush/) == -1){
				if(this.options.dochengeurl) instance._parent.postMessage(olapicjQuery.stringify({'from':'olapic.magic', 'method':'changeUrl', 'media_id': this.options.media_id}), "*");
			}

			olapicjQuery('.external, .button-shop-this').click(function(event){
				var theurl = (olapicjQuery(this).attr('rel') !== undefined) ? olapicjQuery(this).attr('rel') : olapicjQuery(this).attr('href');
				if(olapicjQuery('.button-shop-this').hasClass('fb-button-shop')) olapicjQuery('.button-shop-this').click();
				event.preventDefault();
				olapicGoogleTracker.trackEvent({'category':'EcommerceViewer', 'event':'ShopThisProduct', 'label': instance.options.ga_Client});
				instance._parent.postMessage(olapicjQuery.stringify({'from':'olapic.magic', 'method':'faceboxClose', 'url': theurl}), "*");
			});

			olapicjQuery('.olapic_next_button, .olapic_previous_button').attr('href','#');

			olapicjQuery('.source a').live('click', function(event){
				var src = olapicjQuery(this).parent().attr("class").split("-");
				if(typeof instance._tracker !== "undefined" && instance._tracker !== null)
				instance._tracker.track({'event':'EXTERNAL_PHOTO_CLICK', 'extra': {'src': src[1]}, 'object_id': instance.options.media_id });
			});
			olapicjQuery('.olapic_next_button').live('click', function(event){
				olapicGoogleTracker.trackEvent({'category':'EcommerceViewer', 'event':'NextPhoto', 'label': instance.options.ga_Client});
				var extra = {
					wId: Number(instance.options.wId),
					gId: Number(instance.options.gId),
					cId: Number(instance.options.cId),
					dir: 'next'
				};
				if(typeof instance._tracker !== "undefined" && instance._tracker !== null)
				instance._tracker.track({'event':'WIDGET_VIEWER_MOVE', 'extra': extra, 'object_id': instance.options.media_id });
				if(typeof olapicjQuery(this).attr('rel') !== 'undefined') {
					window.location.replace(olapicjQuery(this).attr('rel')+'?source=iframe' + ( instance.options.wId !== undefined ? '&wId='+instance.options.wId+'&cId='+instance.options.cId+'&gId='+instance.options.gId:''));
				}
			});

			olapicjQuery('.olapic_previous_button').live('click', function(event){
				olapicGoogleTracker.trackEvent({'category':'EcommerceViewer', 'event':'PreviousPhoto', 'label': instance.options.ga_Client});
				var extra = {
					wId: Number(instance.options.wId),
					gId: Number(instance.options.gId),
					cId: Number(instance.options.cId),
					dir: 'prev'
				};
				if(typeof instance._tracker !== "undefined" && instance._tracker !== null)
				instance._tracker.track({'event':'WIDGET_VIEWER_MOVE', 'extra': extra, 'object_id': instance.options.media_id });
				if(typeof olapicjQuery(this).attr('rel') !== 'undefined') {
					window.location.replace(olapicjQuery(this).attr('rel')+'?source=iframe' + ( instance.options.wId !== undefined ? '&wId='+instance.options.wId+'&cId='+instance.options.cId+'&gId='+instance.options.gId:''));
				}
			});

			olapicjQuery('.olapic_base_copyright').find('.copyright').find('a').live('click', function(event){
				olapicGoogleTracker.trackEvent({'category':'EcommerceViewer', 'event':'PoweredByOlapic', 'label': instance.options.ga_Client});
				if(typeof instance._tracker !== "undefined" && instance._tracker !== null)
				instance._tracker.track({'event':'WIDGET_POWERED_BY', 'extra': {'gId': instance.options.gallery_id}, 'object_id': instance.options.media_id });
			});

			OlapicCommons.prepareTwitterPops('.twitter-action');

			//sandboxmode
			if(instance.options.mode == 2){
				olapicjQuery('#viewerimg').before('<div style="position: absolute; background: rgba(255, 255, 255, .6); padding: 8px; font-size: 10px; -webkit-border-bottom-right-radius: 3px; -moz-border-radius-bottomright: 3px; border-bottom-right-radius: 3px;">SandboxMode</div>');
			}

			//video support
			if( olapicjQuery('.videoplayer').length > 0 ) {
				olapicjQuery('.olapic_previous_button').width('0');
				olapicjQuery('.olapic_next_button').width('0');
			
				olapicRequire.require(['Magic/videojs', 'Magic/videojs.youtube'], function(){
					olapicjQuery('#olapic_ecomm_lightbox_main .type-video').remove();
					
					var videourl = olapicjQuery('.video-container:first').data('video-url') || '';
					var videosource = olapicjQuery('.video-container:first').data('video-source') || '';

					var videoOptions = { "controls": true, "autoplay": false, "preload": "auto", "poster":instance.options.mediaurl, "muted": true };
					
					if(videosource == 'youtube'){
						olapicjQuery('.videoplayer').addClass('video-js vjs-default-skin');
						olapicjQuery('.report-photo').css({bottom:'5px'});
						olapicjQuery('.viewer-video-controls').hide();
						videoOptions.techOrder = ["youtube"];
						videoOptions.src = videourl;
					}
					window.theplayer = videojs('video_viewer_'+instance.options.media_id, videoOptions, function(){
						if(videosource == 'youtube'){
							window.theplayer.muted(true);
						}
						if(olapicjQuery.browser.mozilla) { window.theplayer.muted(true); }
					} );

					window.theplayer.on('play', function(e) {
						olapicjQuery('.viewer-video-controls').hide();
					});
					window.theplayer.on("ended", function(){
						window.theplayer.currentTime(0);
						window.theplayer.pause();
						if(videosource !== 'youtube'){
							olapicjQuery('.viewer-video-controls').show();
						}
					});

					// Fix for firefox, to show the poster image on the videos
					if(olapicjQuery.browser.mozilla) {
						olapicjQuery('.vjs-poster').css({'display':'block', 'margin-top':'-612px'});
					}

					olapicjQuery('.viewer-video-controls').click(function(e){
						e.preventDefault();
						window.theplayer.play();
						olapicjQuery(this).hide();
					});

					olapicjQuery('.sound-video').click(function(e){
						e.preventDefault();
						olapicjQuery(this).children().toggleClass('icon-volume-up');
						if(olapicjQuery(this).children().hasClass('icon-volume-up')){
							window.theplayer.muted(false);
						} else {
							window.theplayer.muted(true);
						}
					});
				});
			}
		};

		Olapic.prototype.sectionViewer2 = function(viewerurl, shareData, social){
			var olapicViewer = new OlapicViewer2section({'shareData':{'id':this.options.media_id, 'customer_id':this.options.customer_id}, 'olapic_api_url':this.options.olapic_api_url, 'olapic_api_key':this.options.olapic_api_key, 'olapic_u':this.options.olapic_u }).init();
		};

		Olapic.prototype.sectionUploader2 = function(){
			var uploader = new OlapicUploader2section(this.options).init();
		};

		Olapic.prototype.sectionDefault = function(){
			this.social.initFacebook('');
			this.social.initGooglePlus();
			this.social.initTwitter();
			
			var reg = new RegExp("showmedia([0-9]+)");
			var test = reg.exec(olapicjQuery('#bestphotos_content').attr('class'));
			var firstlink = (olapicjQuery('.olapic-link-viewer:first').length === 0)?'':olapicjQuery('.olapic-link-viewer:first');
			var sizes = OlapicCommons.getFacebokDimentions(firstlink);
			var url = '';
			if(test){
				// var url = this.options.site_url+'/viewer/'+this.options.owner+'/'+parseInt(test[1]);
				// olapicjQuery.facebox({iframe: url, height: sizes.h, width: sizes.w}, 'olapic_viewer_popup');
				url = OlapicCommons.viewerLink({siteurl:this.options.site_url, ownerdir:this.options.owner, mediaid:test[1], vieweraddon:this.options.vieweraddon, extras:"context=pg"});
				OlapicCommons.openViewer({iframe: url, height: sizes.h, width: sizes.w, vieweraddon: this.options.vieweraddon, forceViewerModal:this.options.forceViewerModal});
			}else if(olapicjQuery('#bestphotos_content').length === 0){
				reg = new RegExp('^#opi([0-9]+)$');
				test = reg.exec(window.location.hash);
				if(test){
					// var url = this.options.site_url+'/viewer/'+this.options.owner+'/'+parseInt(test[1]);
					// olapicjQuery.facebox({iframe: url, height: sizes.h, width: sizes.w}, 'olapic_viewer_popup');
					url = OlapicCommons.viewerLink({siteurl:this.options.site_url, ownerdir:this.options.owner, mediaid:test[1], vieweraddon:this.options.vieweraddon, extras:"context=pg"});
					OlapicCommons.openViewer({iframe: url, height: sizes.h, width: sizes.w, vieweraddon: this.options.vieweraddon, forceViewerModal:this.options.forceViewerModal});
				}
			} else {
				reg = new RegExp('^#opi([0-9]+)$');
				test = reg.exec(window.location.hash);
				if(test){
					// var url = this.options.site_url+'/viewer/'+this.options.owner+'/'+parseInt(test[1]);
					// olapicjQuery.facebox({iframe: url, height: sizes.h, width: sizes.w}, 'olapic_viewer_popup');
					url = OlapicCommons.viewerLink({siteurl:this.options.site_url, ownerdir:this.options.owner, mediaid:test[1], vieweraddon:this.options.vieweraddon, extras:"context=pg"});
					OlapicCommons.openViewer({iframe: url, height: sizes.h, width: sizes.w, vieweraddon: this.options.vieweraddon, forceViewerModal:this.options.forceViewerModal});
				}
			}
			OlapicCommons.heardMessages();

			if ( olapicjQuery('#olapic-gallery-wrapper').length == 1 ) window.olapicGallery = new OlapicGallery(this.options);
			else {
				// check if there is a widget on the PG code
				if(olapicjQuery('#olapic_upload').length > 0){
					OlapicCommons.loadWidget(olapicjQuery('#olapic_upload'));
				}
			}

			//Report photo
			OlapicCommons.reportPhoto(null, 790, 'olapic-viewer-dialogreport', 'olapicreportform');
		};

		Olapic.prototype.sectionStreamsMobile = function(){
			var instance = this;
			this.social.initFacebook('');
			olapicRequire.require(['Magic/olapic.galleryMobile'], function(){
				var gMobile = new olapicjQuery.galleryMobile(instance.options);
			});
		};
		/********* END Extends Olapic Object **********/


		/**************** Extends OlapicSocial ****************/
		OlapicSocial.prototype.init = function(options){ this.options = options; };

		OlapicSocial.prototype.initall = function(fbid){
			this.initFacebook(fbid);
			this.initGooglePlus();
			this.initTwitter();
			this.initPinterest();
		};

		OlapicSocial.prototype.initFacebook = function(media_id){
			var instance = this;
			var facebook_app_id = instance.options.fb_app_id;
			var addon = instance.options.addon;
			window.fbAsyncInit = function() {
				FB.init({ appId: facebook_app_id, status: true, cookie: true, oauth: true, xfbml: true });

				FB._https = true;
				if (FB._https && window == window.parent) {
				if (FB._domain && FB._domain.staticfb && FB._domain.https_staticfb)
					FB._domain.staticfb = FB._domain.https_staticfb;
				}

				if(typeof instance.options.facebook_gallery != 'undefined' && instance.options.facebook_gallery){
					FB.Canvas.setSize();
					FB.Canvas.setAutoGrow();
					olapicjQuery(document).ready(function(){
						FB.Canvas.setSize();
						FB.Canvas.setAutoGrow();
					});
				}

				if(media_id !== ''){
					likeFunction = function(response) {
						var href = response;
						olapicGoogleTracker.trackSocial({'network':'facebook','action':'like','target':href});
						olapicjQuery.ajax({
							type: 'POST',
							url: instance.options.site_url+'/api/'+instance.options.owner+'/v1/media/love/'+media_id,
							datatype: 'json',
							success: function(data){ console.log(data); }
						});
					};

					unlikeFunction = function(response) {
						var href = response;
						olapicGoogleTracker.trackSocial({'network':'facebook','action':'unlike','target':href});
						olapicjQuery.ajax({
							type: 'DELETE',
							url: instance.options.site_url+'/api/'+instance.options.owner+'/v1/media/love/'+media_id,
							datatype: 'json',
							success: function(data){ console.log(data); }
						});
					};

					FB.Event.subscribe('edge.create', likeFunction);
					FB.Event.subscribe('edge.remove', unlikeFunction);
				}
			};
			(function(d){
				var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
				js = d.createElement('script'); js.id = id; js.async = true;
				js.src = "//connect.facebook.net/en_US/all.js";
				d.getElementsByTagName('head')[0].appendChild(js);
			}(document));
		};

		OlapicSocial.prototype.initAddThis =function(){
			olapicjQuery.getScript('https://s7.addthis.com/js/250/addthis_widget.js?async=1#pubid=olapic');
			var addthis_config = {
				data_ga_property: 'UA-284996-2',
				data_ga_social : true
			};
		};

		OlapicSocial.prototype.initGooglePlus = function(){
			olapicjQuery.getScript('https://apis.google.com/js/plusone.js');
		};

		OlapicSocial.prototype.initTwitter = function(){
			olapicjQuery.getScript('https://platform.twitter.com/widgets.js');
		};

		OlapicSocial.prototype.initPinterest = function(){
			olapicjQuery.getScript('https://assets.pinterest.com/js/pinit.js');
		};

		OlapicSocial.prototype.facebookSharer = function(data){
			if(olapicjQuery.browser.mobile){
				window.open("http://www.facebook.com/sharer.php?u=" + encodeURIComponent(data.url), "_blank");
			}else{
				var extras = '';
				extras += "&s=100";
				extras += "&p[title]=" + encodeURIComponent(data.title);
				extras += "&p[summary]=" + encodeURIComponent(data.summary);
				if(data.images.length > 0){
					for(x=0; x<data.images.length; x++){
						extras += "&p[images]["+x+"]=" + encodeURIComponent(data.images[x]);
					}
				}
				extras += "&p[url]=" + encodeURIComponent(data.url);
				window.open("http://www.facebook.com/sharer/sharer.php?m2w" + extras, "mypopup", "height=300, width=600");
			}
		};

		OlapicSocial.prototype.twitterStatus = function(data){
			if(olapicjQuery.browser.mobile){
				window.open("http://twitter.com/home?status=" + encodeURIComponent(data.title + ' ' +data.url), "_blank");
			}else{
				window.open("http://twitter.com/home?status=" + encodeURIComponent(data.title + ' ' +data.url), "mypopup", "height=300, width=600");
			}
		};

		OlapicSocial.prototype.pinterestPin = function(data){
			var extras = '';
			extras += "url=" + encodeURIComponent(data.url);
			if(data.images.length > 0){
				extras += "&media=" + encodeURIComponent(data.images[0]);
			}
			extras += "&description=" + encodeURIComponent(data.summary || data.url);
			if(olapicjQuery.browser.mobile){
				window.open("http://pinterest.com/pin/create/button/?" + extras, "_blank");
			}else{
				window.open("http://pinterest.com/pin/create/button/?" + extras, "mypopup", "height=300, width=600");
			}
		};

		
		/**************** End Extends OlapicSocial ****************/


		/**************** Extends OlapicGallery ****************/
		OlapicGallery.prototype.init = function(options){
			this.options = options;
			this.percent = 0.40;
			this.on_progress = 0;
			this.oldscroll = 0;
			this.galleryTop = 0;
			this.galleryHeigth = 0;
			this.galleryBottom = 0;
			this.scrollDistance = 800;
			this.responselength = 0;
			//not good
			this.photoitemtemplate = options.photoitemtemplate || '';
			this.usemobile = false;
			this.productUrlTemplate = null;

			this.options.mode = (typeof this.options.mode === undefined ) ? 0 : this.options.mode;

			//sandboxmode
			if(this.options.mode == 2){
				olapicjQuery('body').prepend('<div style="position: absolute; background: rgba(255, 255, 255, .6); padding: 8px; margin-left: -69px; left: 50%; font-size: 10px; -webkit-border-bottom-right-radius: 3px;-webkit-border-bottom-left-radius: 3px;-moz-border-radius-bottomright: 3px;-moz-border-radius-bottomleft: 3px;border-bottom-right-radius: 3px;border-bottom-left-radius: 3px;">SandboxMode</div>');
			}

			if(options.vieweraddon.search('viewer2') > -1){
				var viwersettings = this.options;
				viwersettings.fromwidget = false;
				this.olapicviewerHandler = new olapicjQuery.olapicViewer(viwersettings);
				//define the callback function so the viewer remove the #opi hash
				window.olapicViewer2CloseFunction = this.controlOncloseViewer;
			}else{
				var instance = this;
				olapicjQuery(document).bind('afterClose.facebox', instance.controlOncloseViewer);
			}

			this.checkOpi();
			OlapicCommons.heardMessages();

			this.loading = olapicjQuery('<div id="olapic-loading"><img alt="Loading..." src="/static/images/commons/olapic/loading_black_32.gif" /></div>');
			this.calculateGalleryPosition();
			this.attachEvents();
			if(olapicjQuery('#next-page-link').length > 0) olapicjQuery('#next-page-link').hide();
			if(this.photoitemtemplate !== ''){
				this.usemobile = /\$value2\[images\]\[mobile\]/igm.test(this.photoitemtemplate);
				this.productUrlTemplate = this.photoitemtemplate.match(/{productUrl}(.*?){\/productUrl}/im);
				if((this.productUrlTemplate !== null) && (typeof this.productUrlTemplate == 'object' )){
					this.productUrlTemplate = this.productUrlTemplate.pop();
				}
			}

			this.callbacks = {};
			this.callbacks.itemInject = 'olapicAfterInjectItem_'+this.options.owner;
			window.settings = window.settings || {};
			window.settings.functionItemInject = 'olapicAfterInjectItem_'+this.options.owner;
			window.settings.functionAllItemInject = 'olapicAfterAllInjectItem_'+this.options.owner;
			window.settings.functionLastItemInject = 'olapicAfterLastInjectItem_'+this.options.owner;
			window.settings.functionCustomInject = 'olapicCustomInject_'+this.options.owner;
			this.useCustomInject = (typeof window[settings.functionCustomInject] === 'function');

			//Image for the gallery view
			var imageSize = "normal";
			if(this.photoitemtemplate !== ''){
				var reg = new RegExp("data-original=\"{\\$value2\\[images\\]\\[mini|square|thumbnail|bigThumbnail|mobile|normal|original]}\"/>");
				var size = reg.exec(this.photoitemtemplate);
				if(size !== null) imageSize = size[0];
				else imageSize = "normal";
			}
			this.imageSizeToUse = (this.usemobile === true) ? "mobile" : imageSize;
			// Olapic Tracker
			this._tracker = new OlapicTracker();
			var initObject = {
				_api_url: this.options.olapic_api_url,
				_api_key: this.options.olapic_api_key
			};
			if(this.options.olapic_u === 1){
				initObject._olapic_u = this.options.olapic_u;
			}
			this._tracker.init(initObject);
			this._tracker.track({
				'event':'BEST_PHOTOS_VIEW',
				'object_id': this.options.object_id
			});

		};

		OlapicGallery.prototype.checkOpi = function(){
			var reg = new RegExp("showmedia([0-9]+)");
			var test = reg.exec(olapicjQuery('#bestphotos_content').attr('class'));
			var firstlink = (olapicjQuery('.olapic-link-viewer:first').length === 0)?'':olapicjQuery('.olapic-link-viewer:first');
			var sizes = OlapicCommons.getFacebokDimentions(firstlink);
			var url ='' ;
			if(test){
				url = OlapicCommons.viewerLink({siteurl:this.options.site_url, ownerdir:this.options.owner, mediaid:test[1], vieweraddon:this.options.vieweraddon, extras:"context=pg"});
				OlapicCommons.openViewer({url: url, height: sizes.h, width: sizes.w, vieweraddon: this.options.vieweraddon, forceViewerModal:this.options.forceViewerModal}, this.olapicviewerHandler);
			}else if(olapicjQuery('#bestphotos_content').length === 0){
				reg = new RegExp('^#opi([0-9]+)$');
				test = reg.exec(window.location.hash);
				if(test){
					url = OlapicCommons.viewerLink({siteurl:this.options.site_url, ownerdir:this.options.owner, mediaid:test[1], vieweraddon:this.options.vieweraddon, extras:"context=pg"});
					OlapicCommons.openViewer({url: url, height: sizes.h, width: sizes.w, vieweraddon: this.options.vieweraddon, forceViewerModal:this.options.forceViewerModal}, this.olapicviewerHandler);
				}
			} else {
				reg = new RegExp('^#opi([0-9]+)$');
				test = reg.exec(window.location.hash);
				if(test){
					url = OlapicCommons.viewerLink({siteurl:this.options.site_url, ownerdir:this.options.owner, mediaid:test[1], vieweraddon:this.options.vieweraddon, extras:"context=pg"});
					OlapicCommons.openViewer({url: url, height: sizes.h, width: sizes.w, vieweraddon: this.options.vieweraddon, forceViewerModal:this.options.forceViewerModal}, this.olapicviewerHandler);
				}
			}
			/* ie */
			splitted = (document.location.href).split('#!');
			if(splitted[1]){
				url = OlapicCommons.viewerLink({siteurl:this.options.site_url, ownerdir:this.options.owner, mediaid:(splitted[1].replace('opi', '')), vieweraddon:this.options.vieweraddon, extras:"context=pg"});
				OlapicCommons.openViewer({url: url, height: sizes.h, width: sizes.w, vieweraddon: this.options.vieweraddon, forceViewerModal:this.options.forceViewerModal}, this.olapicviewerHandler);
			}
		};
		
		OlapicGallery.prototype.controlOncloseViewer = function(){
			if (typeof(window.history.pushState) == 'function') {
				window.history.pushState("", document.title, window.location.pathname);
			}
		};

		OlapicGallery.prototype.calculateGalleryPosition = function(){
			var instance = this;
			this.galleryTop = olapicjQuery('#olapic-gallery-wrapper').offset().top;
		};

		OlapicGallery.prototype.calculateNextPoint = function(){
			var offset = olapicjQuery('#olapic-gallery-wrapper').offset().top;
			var height = olapicjQuery('#olapic-gallery-wrapper').height();
			var rest = (height * this.percent);
			this.next_point = offset + (height - rest);
			this.on_progress = 0;
		};

		OlapicGallery.prototype.attachEvents = function(){
			var instance = this;
			olapicjQuery(window).scroll(function() {
				//just in scroll down
				if( instance.oldscroll <= olapicjQuery(window).scrollTop() ){
					instance.oldscroll = olapicjQuery(window).scrollTop();
					var actualHeight = olapicjQuery('#olapic-gallery-wrapper').height();
					var resto = actualHeight - instance.galleryTop - instance.scrollDistance;
					if(olapicjQuery(window).scrollTop() >= resto){
						if(instance.on_progress === 0) {
							instance.on_progress = 1;
							instance.request();
						}
					}
				}
				return;
			});

			//We do, for the lululemon migration
			if(typeof instance.options.enable_viewer_link === 'undefined'){
				olapicjQuery('.olapic-link-viewer').live('click', function(event){
					event.preventDefault();
					var sizes = OlapicCommons.getFacebokDimentions(olapicjQuery(this));
					if(olapicjQuery(this).hasClass('external')) location.href = olapicjQuery(this).attr('data-url');
					else {
						var url = olapicjQuery(this).attr('data-url') + "?context=pg";
						OlapicCommons.openViewer({url: url, height: sizes.h, width: sizes.w, vieweraddon: instance.options.vieweraddon, extras:"context=pg", forceViewerModal:instance.options.forceViewerModal}, instance.olapicviewerHandler);
					}
				});
			}

			instance.reloadLazyload();

			// check if there is a widget on the PG code
			if(olapicjQuery('#olapic_upload').length > 0){
				OlapicCommons.loadWidget(olapicjQuery('#olapic_upload'));
			}
		};
		
		OlapicGallery.prototype.request = function(){
			var instance = this;
			var next = olapicjQuery('#olapic-gallery-next');
			if(next.length>0){
				if((next.attr('href')!=instance.last_page_load) && (next.attr('href') !== '')){
					instance.loading.appendTo('#olapic-gallery-next').show('fade');
					instance.last_page_load = next.attr('href');
					olapicjQuery.ajax({ url:next.attr('href'), data:'ajax=true' }).done(function(data){
						instance.on_progress = 0;
						var mediaindex = 1;
						if(typeof data.medias != 'undefined'){
							instance.responselength = 0;
							olapicjQuery.each(data.medias, function(i, e){
								if(!olapicjQuery.isEmptyObject(e)){
									if(e.length > 0){
										var totalitems = data.medias.length - 1;
										olapicjQuery.each(e, function(index, value){
											instance.inject(value, (i+1), data.owner, totalitems, mediaindex);
											mediaindex++;
										});
									}
								}else{ console.log('Empty column '+i); }
							});

							if(typeof window[settings.functionAllItemInject] === 'function') {
								window[settings.functionAllItemInject](data.medias);
							}
							
						}else if(typeof data.pagehtml != 'undefined'){
							//new pagination
							instance.addPage(data.afterinject, data);
						}
						if(data.showlink){
							olapicjQuery('#olapic-gallery-next').attr('href', '');
							if(data.next !== ''){
								olapicjQuery('#next-page-link').attr('href', data.next);
								olapicjQuery('#next-page-link').show();
							}
						}else if(data.next!== ''){
							olapicjQuery('#olapic-gallery-next').attr('href', data.next);
							instance.reloadAnalytics();
							instance.calculateGalleryPosition();
						}
						instance.loading.appendTo('#olapic-gallery-next').hide('fade');
					});
				}
			}
		};

		OlapicGallery.prototype.reloadAnalytics = function(){
			var instance = this;
			olapicGoogleTracker.create();
			olapicGoogleTracker.trackPageView({'partner':instance.options.owner, 'section':instance.options.section, 'page':'ViewGallery'});
		};

		OlapicGallery.prototype.reloadLazyload = function(){
			olapicjQuery('#olapic-gallery-wrapper').find('img.lazy').each(function(){
				var element = this;
				var original = olapicjQuery(element).attr('data-original');
				if (olapicjQuery.browser.msie){
					olapicjQuery(element).attr('src', original);
				} else {
					var image = olapicjQuery('<img/>').attr('src', original).load(function(){
						olapicjQuery(element).attr('src', original);
					});
				}
			});
		};

		OlapicGallery.prototype.inject = function(object_media, position, owner, total, mediaindex){
			if(this.photoitemtemplate === ''){
				this.createOldPhotoItem(object_media, position);
			}else{
				this.createPhotoItem(object_media, position, owner, this.photoitemtemplate, total, mediaindex);
			}
		};

		OlapicGallery.prototype.createPhotoItem = function(object_media, position, owner, newItem, total, mediaindex){
			var instance = this;
			var normal_image = object_media.images[instance.imageSizeToUse];
			var st = '';
			var regex = '';
			olapicjQuery.each(object_media, function(i, value) {
				if((i == 'uploader') || (i == 'images')){
					olapicjQuery.each(object_media[i], function(ii, value2) {

						// st = \{\\$value2\\['+i+'\\]\\['+ii+'\\]\}
						// st = ["{", "\\", "$", "v", "a", "l", "u", "e", "2", "\\", "[", "'", "+", "i", "+", "'", "\\", "]", "\\", "[", "'", "+", "i", "i", "+", "'", "\\", "]", "}"];
						st = ["{", "\\", "$", "v", "a", "l", "u", "e", "2", "\\", "["].join('');
						st += i + ["\\", "]", "\\", "["].join('');
						st += ii + ["\\", "]", "}"].join('');
						regex= new RegExp(st, "igm");
						newItem = newItem.replace(regex, value2);
					});
				}else if(i == 'productUrl'){
					if(instance.productUrlTemplate !== null){
						var producturls = '';
						newItem = newItem.replace(/\{productUrl\}(.*?)\{\/productUrl\}/igm, 'OLAPICITEMPRODUCTSLIST', newItem);
						olapicjQuery.each(object_media[i], function(ii, productUrl) {
							var newProductUrl = instance.productUrlTemplate;
							newProductUrl = newProductUrl.replace(/\{\$shop_button_url\}/igm, productUrl.shop_button_url, newProductUrl);
							newProductUrl = newProductUrl.replace(/\{\$stream_id\}/igm, productUrl.stream_id, newProductUrl);
							newProductUrl = newProductUrl.replace(/\{\$stream_name\}/igm, productUrl.stream_name, newProductUrl);
							newProductUrl = newProductUrl.replace(/\{\$stream_images_normal\}/igm, productUrl.stream_images.normal, newProductUrl);
							newProductUrl = newProductUrl.replace(/\{\$stream_images_mini\}/igm, productUrl.stream_images.mini, newProductUrl);
							newProductUrl = newProductUrl.replace(/\{\$stream_images_square\}/igm, productUrl.stream_images.square, newProductUrl);
							newProductUrl = newProductUrl.replace(/\{\$stream_images_thumbnail\}/igm, productUrl.stream_images.thumbnail, newProductUrl);
							newProductUrl = newProductUrl.replace(/\{\$stream_images_bigThumbnail\}/igm, productUrl.stream_images.bigThumbnail, newProductUrl);
							newProductUrl = newProductUrl.replace(/\{\$stream_images_mobile\}/igm, productUrl.stream_images.mobile, newProductUrl);
							newProductUrl = newProductUrl.replace(/\{\$stream_images_original\}/igm, productUrl.stream_images.original, newProductUrl);
							producturls += newProductUrl;
						});
						newItem = newItem.replace(/OLAPICITEMPRODUCTSLIST/g, producturls, newItem);
					}
				}else{
					// $st = \{\\$value2\\['+i+'\\]\}
					st = ["{", "\\", "$", "v", "a", "l", "u", "e", "2", "\\", "[", "'", "+", "i", "+", "'", "\\", "]", "}"];
					st = ["{", "\\", "$", "v", "a", "l", "u", "e", "2", "\\", "["].join('');
					st += i + ["\\", "]", "}"].join('');
					regex = new RegExp(st, "igm");
					newItem = newItem.replace(regex, value);
				}
			});
			olapicjQuery.each(owner, function(i, value) {
				// $st = \{\\$owner\\['+i+'\\]\}
				// st = ["{", "\\", "$", "o", "w", "n", "e", "r", "\\", "[", "'", "+", "i", "+", "'", "\\", "]", "}"];
				st = ["{", "\\", "$", "o", "w", "n", "e", "r", "\\", "["].join('');
				st += i + ["\\", "]", "}"].join('');
				regex = new RegExp(st, "igm");
				newItem = newItem.replace(regex, value);
			});

			//user avatar condition
			if(newItem.search('useravatar')){
				if(!object_media.user_avatar_default){
					newItem = newItem.replace(/\{elseuseravatar\}(.*?)\{\/useravatar\}/igm, '', newItem);
					newItem = newItem.replace(/\{useravatar\}/igm, '', newItem);
					newItem = newItem.replace(/\{\/useravatar\}/igm, '', newItem);
				} else {
					newItem = newItem.replace(/\{useravatar(.*?)elseuseravatar\}/igm, '', newItem);
					newItem = newItem.replace(/\{useravatar(.*?)useravatar\}/igm, '', newItem);
					newItem = newItem.replace(/\{\/useravatar\}/igm, '', newItem);
				}
			}
			newItem = newItem.replace(/\{if condition="!\\$value2\->getUser\(\)\->isDefaultAvatar\(\)"\}/igm, '', newItem);
			newItem = newItem.replace(/\{else\}/igm, '', newItem);

			newItem = newItem.replace(/\{if condition="!\\$value2\->getUser\(\)\->isDefaultAvatar\(\)"\}/igm, '', newItem);
			newItem = newItem.replace(/\{else\}/igm, '', newItem);

			if(instance.useCustomInject === true){
				newItem = newItem.replace(/src=\"(.*?)grey\.gif\"/, 'src="'+object_media.normal_image+'"');
				window[settings.functionCustomInject](newItem, '#olapic-gallery-column-'+position);
				if(total == mediaindex){
					if(typeof window[settings.functionLastItemInject] === 'function') {
						window[settings.functionLastItemInject](newItem);
					}
				}
			}else{
				olapicjQuery(newItem).appendTo('#olapic-gallery-column-'+position);
				/*
				Fix IE8 IE9
				*/
				if (olapicjQuery.browser.msie){
					olapicjQuery('#'+object_media.key).find('img[data-original]').attr('src', normal_image);
					if(typeof window[settings.functionItemInject] === 'function') {
						window[settings.functionItemInject](newItem);
					}
					if(total == mediaindex){
						if(typeof window[settings.functionLastItemInject] === 'function') {
							window[settings.functionLastItemInject](newItem);
						}
					}
				}else{
					var image = olapicjQuery('<img/>').attr('src', normal_image).load(function(){
						olapicjQuery('#'+object_media.key).find('img[data-original]').attr('src', normal_image);
						if(typeof window[settings.functionItemInject] === 'function') {
							window[settings.functionItemInject](newItem);
						}
						if(total == mediaindex){
							if(typeof window[settings.functionLastItemInject] === 'function') {
								window[settings.functionLastItemInject](newItem);
							}
						}
					});
				}
			}
		};

		OlapicGallery.prototype.createOldPhotoItem = function(object_media, position){
			var li = olapicjQuery('<li/>', { });
			
			var container = olapicjQuery('<div/>', {
				'class': 'olapic_publicgallery_showgallery_img_cont',
				id: object_media.key
			}).appendTo(li);
			var containerPhoto = olapicjQuery('<div/>', {
				'data-url': object_media.url,
				'class': 'img-link olapic-link-viewer'
			}).appendTo(container);

			/*
			Fix IE8
			*/
			var final_image = '';
			if ((olapicjQuery.browser.msie && parseInt(olapicjQuery.browser.version, 10) === 8) || (olapicjQuery.browser.msie && parseInt(olapicjQuery.browser.version, 10) === 9)) final_image = object_media.normal_image;
			else final_image = this.options.site_url+'/static/images/olapic/public-gallery/grey.gif';

			olapicjQuery('<img/>', {
				src: final_image,
				alt: object_media.caption,
				width: '308',
				'class': 'olapic_image_key' + object_media.key
			}).appendTo(containerPhoto);

			olapicjQuery('<span/>', {
				'class': 'overlay'
			}).appendTo(containerPhoto);
			var author = olapicjQuery('<div/>', {
				'class': 'img-author'
			}).appendTo(containerPhoto);

			var authorAvatar = '';
			if(!object_media.user_avatar_default){
				authorAvatar = olapicjQuery('<span/>', {
					'class': 'img-author-avatar',
					'data-url': object_media.user_link,
					'style': 'background: url('+object_media.user_avatar+') no-repeat 50% 50%'
				}).appendTo(author);
			} else {
				authorAvatar = olapicjQuery('<span/>', {
					'class': 'img-author-avatar-no',
					'data-url': object_media.user_link
				}).appendTo(author);
			}

			olapicjQuery('<span/>', {
				'class': 'img-author-username',
				'data-url': object_media.user_link
			}).html(object_media.user_name).appendTo(author);
			olapicjQuery('<span/>', {
				'class': object_media.get_source
			}).appendTo(author);

			li.appendTo('#olapic-gallery-column-'+position);

			if( final_image == this.options.site_url+'/static/images/olapic/public-gallery/grey.gif' ) {
				var image = olapicjQuery('<img/>').attr('src', object_media.normal_image).load(function(){
					olapicjQuery('.olapic_image_key'+object_media.key).attr('src', object_media.normal_image);
				});
			}
		};

		OlapicGallery.prototype.addPage = function(callback, response){
			window.settings = {
				functionName: callback
			};
			var fn = window[settings.functionName];
			if(typeof fn === 'function') {
				fn(response);
			}else{
				olapicjQuery('#olapic-gallery-column-1').append(response.pagehtml);
			}
			this.reloadLazyload();
		};

		OlapicGallery.prototype.showViewer = function(mediaid){
			var firstlink = (olapicjQuery('.olapic-link-viewer:first').length === 0)?'':olapicjQuery('.olapic-link-viewer:first');
			var sizes = OlapicCommons.getFacebokDimentions(firstlink);
			var url = OlapicCommons.viewerLink({siteurl:this.options.site_url, ownerdir:this.options.owner, mediaid:mediaid, vieweraddon:this.options.vieweraddon, extras:"context=pg"});
			OlapicCommons.openViewer({url: url, height: sizes.h, width: sizes.w, vieweraddon: this.options.vieweraddon, forceViewerModal:this.options.forceViewerModal}, this.olapicviewerHandler);
		};


		/**************** END Extends OlapicGallery ****************/

		OlapicViewer2section.prototype.init = function(){
			var _self = this;
			_self.social = new OlapicSocial(_self.options);
			_self._tracker = new OlapicTracker();
			_self._tracker.init({
				_api_url: _self.options.olapic_api_url,
				_api_key: _self.options.olapic_api_key,
				_olapic_u: _self.options.olapic_u
			});
			_self.addOpi = true;
			if(_self.options.fromwidget && _self.options.widgetobject !== null){
				_self.addOpi = (typeof _self.options.widgetobject.settings.hide_opi_param != 'undefined' && _self.options.widgetobject.settings.hide_opi_param == 1) ? false : true;
			}

			if(olapicjQuery('.products .products-list li', olapicjQuery('#olapic-viewer')).length > 0){
				if( !olapicjQuery('.products', olapicjQuery('#olapic-viewer')).hasClass('no-slider') ){
					var imagestoload = [];
					olapicjQuery('.product-list-item-image').each(function(i,e){
						imagestoload.push(olapicjQuery(this).data('prodcutimage'));
					});
					olapicRequire.require(['Magic/olapic.viewerSlide'], function(){
						_self.viewerSlide = new olapicjQuery.viewerSlide({
							slideWrapper: olapicjQuery('.products', olapicjQuery('#olapic-viewer')).get(0),
							wrapper: olapicjQuery('.products .products-list', olapicjQuery('#olapic-viewer')).get(0),
							preloadImages: imagestoload,
							items: olapicjQuery('.products .products-list li', olapicjQuery('#olapic-viewer')),
							prevButton: olapicjQuery('.products-previous', olapicjQuery('#olapic-viewer')).get(0),
							nextButton: olapicjQuery('.products-next', olapicjQuery('#olapic-viewer')).get(0),
							itemsWidth: olapicjQuery(olapicjQuery('.products .products-list li', olapicjQuery('#olapic-viewer')).get(0)).outerWidth(true),
							prevCallBack: ((typeof olapicRelatedProductSlidePrev == 'function') ? olapicRelatedProductSlidePrev : null),
							nextCallBack: ((typeof olapicRelatedProductSlideNext == 'function') ? olapicRelatedProductSlideNext : null)
						});
					});
					if(olapicjQuery('.products .products-list li', olapicjQuery('#olapic-viewer')).length<3){
						olapicjQuery('.products-list-wrapper .products-slide').css('margin-left', 0);
					}
					var a_id = '';
					if(_self.options.olapic_u === 1){
						a_id = '&__olapicU=' + OlapicCommons.readCookie('__olapicU');
					}
					olapicjQuery('.products .products-list li a', olapicjQuery('#olapic-viewer')).click(function(e){
						olapicjQuery(this).attr('href', olapicjQuery(this).attr('href')+'&gId='+_self.options.parentGalleryId+'&cId='+_self.options.parentCategoryId + a_id );
					});
				}else{
					olapicjQuery('.products', olapicjQuery('#olapic-viewer')).addClass('slice-finished');
				}
			}else{
				olapicjQuery('.products', olapicjQuery('#olapic-viewer')).addClass('no-related-products');
			}
			//hide customs close icons
			if(olapicjQuery('#olapic-viewer .alone').length == 1){
				olapicjQuery('#closeViewer').hide();
			}

			//social buttons
			var metas = document.getElementsByTagName('meta');
			var title = '';
			var summary = '';
			var url = '';
			var images = [];
			var media_id = 0;
			if(olapicjQuery('#olapic-viewer .alone').length == 1){
				if(metas.length > 0){
					for(x = 0; x < metas.length; x++){
						if(metas[x].getAttribute('property') == 'og:title'){
							title = metas[x].content;
						}else if(metas[x].getAttribute('property') == 'og:description'){
							summary = metas[x].content;
						}else if(metas[x].getAttribute('property') == 'og:url'){
							url = metas[x].content;
						}else if(metas[x].getAttribute('property') == 'og:image'){
							images.push(metas[x].content);
						}
					}
				}
				title = (title === '') ? document.title : title;
				summary = (summary === '') ? olapicjQuery(olapicjQuery('.photo-caption').get(0)).text() : summary;
				url = (url === '') ? document.location.href : url;

				if(images.length === 0){
					images.push(olapicjQuery('.featured-photo img').attr('src'));
				}
			}else{
				title = _self.options.shareData.title;
				summary = _self.options.shareData.summary;
				url = _self.options.shareData.url;
				images = _self.options.shareData.images;
				_self.social = new OlapicSocial();
				media_id = _self.options.shareData.id;
			}
			sharedata = { title: title, summary: summary, images: images, url: url };
			olapicjQuery('.sharing li a').each(function(i, ele){
				if(olapicjQuery(this).hasClass('sharing-fb')){
					olapicjQuery(this).click(function(e){
						e.preventDefault();
						_self.social.facebookSharer(sharedata);
					});
				}else if(olapicjQuery(this).hasClass('sharing-tw')){
					olapicjQuery(this).click(function(e){
						e.preventDefault();
						_self.social.twitterStatus(sharedata);
					});
				}else if(olapicjQuery(this).hasClass('sharing-pi')){
					olapicjQuery(this).click(function(e){
						e.preventDefault();
						_self.social.pinterestPin(sharedata);
					});
				}
			});

			if ( _self.addOpi ) {
				var reg = new RegExp('^#opi([0-9]+)$');
				var test = reg.exec(window.location.href);
				if(!test) {
					if(media_id > 0){
						if (typeof(window.history.pushState) == 'function') {
							window.history.pushState(null, "", '#opi' + media_id);
						} else {
							window.location.hash = '#!opi' + media_id;
						}
						var historycount = parseInt( olapicjQuery('body').data('historycount'),0 );
						historycount++;
						olapicjQuery('body').data('historycount', historycount);
					}
				}

				if (typeof(window.history.pushState) == 'function') {
					window.onpopstate = function(){
						var historycount = parseInt( olapicjQuery('body').data('historycount'),0 );
						historycount--;
						olapicjQuery('body').data('historycount', historycount);
					};
				}
			}
			//blank links
			olapicjQuery('a.blank_link').attr('target', '_blank');

			//Report photo
			OlapicCommons.reportPhoto(_self.options.shareData.id, (olapicjQuery('#viewer-wrapper').width() || olapicjQuery('#olapic-viewer').width()), "olapic-viewer-dialogreport", "olapicreportform");

			//Twitter
			OlapicCommons.prepareTwitterPops('.twitter-action');
		};

		/******************** Extends Uploader2 ********************/
		OlapicUploader2section.prototype.init = function(){
			var instance = this;
			olapicRequire.require(['Magic/olapic.uploader'], function(){
				var uploader2Object = new olapicjQuery.olapicUploader2(instance.options);
				uploader2Object.loadUploader(instance.options);
			});
		};

		OlapicUploader2section.prototype.stepLogin = function(){
			var instance = this;
			var facebook_app_id = instance.options.fb_app_id;
			window.fbAsyncInit = function() {
				FB.init({ appId: facebook_app_id, status: true, cookie: true, oauth: true, xfbml: true });
			};
			(function(d) {
				var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
				js = d.createElement('script'); js.id = id; js.async = true;
				js.src = "//connect.facebook.net/en_US/all.js";
				d.getElementsByTagName('head')[0].appendChild(js);
			}(document));

			olapicjQuery('#form-login').submit(function(e) {
				e.preventDefault();
				if(instance.sendingLogin) return;
				if(!olapicjQuery('#register_terms').is(':checked')) {
					olapicjQuery('#message').html(olapicjQuery('#register_terms').data('message')).show('slow');
				}else{
					olapicjQuery('#upload-loading').show();
					instance.sendingLogin = true;
					olapicjQuery.ajax({
						type: 'POST',
						url: olapicjQuery(this).attr('action'),
						datatype: 'json',
						success: function(data){
							if(data.result === true){
								if(olapicjQuery('#olapic-uploader .alone').length > 1){
									window.location = data.redirect;
								}else{
									olapicUploaderHandler.moveTo(data.move_to);
								}
							}else{
								olapicjQuery('#message').html(data.message).show('slow');
							}
						}
					});
				}
			});

			oQuery('#facebook-login').click(function(event) {
				if(!olapicjQuery('#register_terms').is(':checked')) {
					olapicjQuery('#message').html(olapicjQuery('#register_terms').data('message')).show('slow');
				}else{
					instance.fbLogin();
				}
			});
		};

		OlapicUploader2section.prototype.fbLogin = function(){
			FB.login(function(response) {
				if (response.authResponse) {
					oQuery.post('{$widget_url}/login/facebook', {accessToken: response.authResponse.accessToken, userID: response.authResponse.userID}, function(data) {
						if(data.login) window.location = '{$widget_url}/finish?context={$context}&customer_id={$customerId}';
						else{
							FB.api('/me', function(response) {
								user.name = response.name;
								user.email = response.email;
								user.customer_id = '{$customerId}';
								if(confirm("Your are not registered. Do you want to use your facebook account to register?")) {
									oQuery.post('{$widget_url}/signup/facebook', user, function(data) {
										if(data.signup) window.location = '{$widget_url}/finish?context={$context}&customer_id={$customerId}';
										else {
											oQuery('#message').html(data.msg).show('slow');
											oQuery('#upload-loading').hide();
										}

									});
								}else{
									oQuery('#upload-loading').hide();
								}
							});
						}
					});
				} else {}
			}, { scope: 'email' });
		};

	});
olapicRequire.define("Magic/olapic.objects", function(){});

/*! Olapic commons */
olapicRequire.define("Magic/commons",function () {
		olapicjQuery.support.cors = true;
		function show_loading_and_disable(element,disable){ if(disable) { image = "ajax-loader.gif"; element.parent().append("<img src='http://www.photorank.me/static/images/olapic/widget/"+image+"' />"); element.hide(); } else { element.show(); element.parent().children("img").remove(); } }

		/*	/*
		CSS Browser Selector v0.3.4 (Sep 29, 2009)
		Rafael Lima (http://rafael.adm.br)
		http://rafael.adm.br/css_browser_selector
		License: http://creativecommons.org/licenses/by/2.5/
		Contributors: http://rafael.adm.br/css_browser_selector#contributors
		*/
		function css_browser_selector(u){var ua = u.toLowerCase(),is=function(t){return ua.indexOf(t)>-1;},g='gecko',w='webkit',s='safari',o='opera',h=document.getElementsByTagName('html')[0],b=[(!(/opera|webtv/i.test(ua))&&/msie\s(\d+)/.test(ua))?('ie ie'+RegExp.$1):is('firefox/2')?g+' ff2':is('firefox/3.5')?g+' ff3 ff3_5':is('firefox/3')?g+' ff3':is('gecko/')?g:is('opera')?o+(/version\/(\d+)/.test(ua)?' '+o+RegExp.$1:(/opera(\s|\/)(\d+)/.test(ua)?' '+o+RegExp.$2:'')):is('konqueror')?'konqueror':is('chrome')?w+' chrome':is('iron')?w+' iron':is('applewebkit/')?w+' '+s+(/version\/(\d+)/.test(ua)?' '+s+RegExp.$1:''):is('mozilla/')?g:'',is('j2me')?'mobile':is('iphone')?'iphone':is('ipod')?'ipod':is('mac')?'mac':is('darwin')?'mac':is('webtv')?'webtv':is('win')?'win':is('freebsd')?'freebsd':(is('x11')||is('linux'))?'linux':'','js']; c = b.join(' '); h.className += ' '+c; return c;} 
		css_browser_selector(navigator.userAgent);

		/**
		 * converted stringify() to jQuery plugin.
		 * serializes a simple object to a JSON formatted string.
		 * Note: stringify() is different from jQuery.serialize() which URLEncodes form elements
		 * CREDITS: http://blogs.sitepointstatic.com/examples/tech/json-serialization/json-serialization.js
		 */
		olapicjQuery.extend({
			stringify  : function stringify(obj) {
				var t = typeof (obj);
				if (t !== "object" || obj === null) {
					// simple data type
					if (t === "string") {obj = '"' + obj + '"';}
					return String(obj);
				} else {
					// recurse array or object
					var n, v, json = [], arr = (obj && obj.constructor === Array);

					for (n in obj) {
						v = obj[n];
						t = typeof(v);
						if (obj.hasOwnProperty(n)) {
							if (t === "string"){ v = '"' + v + '"';} else if (t === "object" && v !== null) {v = olapicjQuery.stringify(v);}
							json.push((arr ? "" : '"' + n + '":') + String(v));
						}
					}
					return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
				}
			}
		});

		/*
		**************** OlapicCommons ****************
		*/
		OlapicCommons = ({
			bestPhotos: [],
			bestPhotosIndex: 0,
			inBestPhotos: false,
			listening : false,

			popKeyActions: function(keyCode){
				if(olapicjQuery('.olapic_previous_button').length > 0){
					var linkp = (olapicjQuery('.olapic_previous_button').attr('href') === '') ? olapicjQuery('.olapic_previous_button').attr('rel') : olapicjQuery('.olapic_previous_button').attr('href');
					var linkn = (olapicjQuery('.olapic_next_button').attr('href') === '') ? olapicjQuery('.olapic_next_button').attr('rel') : olapicjQuery('.olapic_next_button').attr('href');
					var linktogo=null;
					if (keyCode === 37) {linktogo = linkp;}
					else if (keyCode === 39) {linktogo = linkn;}
					if(olapicjQuery.browser.msie && olapicjQuery.browser.version === 8.0) {
						this._parent = parent;
					} else { 
						this._parent = parent.window; 
					}
					this._parent.postMessage(olapicjQuery.stringify({'from':'olapic.magic', 'method':'gotonextprev', 'url': linktogo}), "*");
				}
			},
			searchMediaId: function(viewerUrl){
				var parts = viewerUrl;
				parts = parts.split('/');
				return parts.pop();
			},
			replaceNavegationLinks: function(photourl, returnvalues){

				// next/prev control on best photo
				var bestPhotos = [];
				var allli = [];
				var indexColumn = 1;
				var totalColumns = 0;
				var columns = olapicjQuery('#olapic_publicgallery .columns ul');
				olapicjQuery(columns).each(function(i, column){
					var columnid =olapicjQuery(column).attr('id');
					if(typeof columnid !== 'undefined'){
						if(columnid.search('([0-9]+)') > -1){
							totalColumns++;
						}
					}
				});
				//Fix is doesn't find any column
				totalColumns = (totalColumns===0) ? 1 : totalColumns;
				var indexRow = 0;
				var totalBestphotos = 0;
				var prevLink = '';
				var nextLink = '';
				var actualId = photourl.split('/');
				actualId = actualId.pop();
				actualId = actualId.replace(/[^\d]/g, '');
				allli = olapicjQuery('#olapic-gallery-wrapper li');
				var url = '';
				var url2 = '';

				//mobile viewer?olapicjQuery('.olapic-link-viewer')
				var ismobile = OlapicCommons.getFacebokDimentions(olapicjQuery('.olapic-link-viewer:first'));
				if(ismobile.resized === true){
					olapicjQuery(allli).each(function(i, e){
						url = olapicjQuery('.olapic-link-viewer', olapicjQuery(this)).data('url');
						url2 = olapicjQuery('.olapic-link-viewer img', olapicjQuery(this)).attr('src');
						bestPhotos[totalBestphotos] = url;
						totalBestphotos++;
					});
				}else{
					//normal layout
					if(olapicjQuery(allli).length > 0){
						olapicjQuery(allli).each(function(i, e){
							var li = olapicjQuery('#olapic-gallery-column-'+indexColumn+' li').get(indexRow);
							if(olapicjQuery(li).length > 0){
								var url = olapicjQuery('.olapic-link-viewer', olapicjQuery(li)).data('url');
								var url2 = olapicjQuery('.olapic-link-viewer img', olapicjQuery(li)).attr('src');
								bestPhotos[totalBestphotos] = url;
								totalBestphotos++;
							}
							if(indexColumn === totalColumns){
								indexColumn = 1;
								indexRow++;
							}else{
								indexColumn++;
							}
						});
					}
				}
				olapicjQuery(bestPhotos).each(function(i, url){
					if(url.search(actualId) > -1){
						prevLink = (i === 0) ? bestPhotos[bestPhotos.length - 1] : bestPhotos[i - 1];
						nextLink = (i === (bestPhotos.length - 1)) ? bestPhotos[0] : bestPhotos[i + 1];
					}
				});
				if(returnvalues === true){
					return {'prevLink':prevLink, 'nextLink':nextLink};
				}else{
					document.getElementById("faceboxframe").contentWindow.postMessage(olapicjQuery.stringify({'from':'olapic.magic', 'method':'updatebtnlinks', 'prevLink':prevLink, 'nextLink':nextLink}), "*");
				}
			},
			replaceNavegationWidget: function(widgetid, mediaid, ownerdir, siteurl, returnvalues){
				var instance = this;
				var prev = null; var next = null;
				var finded = false; var item = null;
				var prevLink = '';
				var nextLink = '';
				var items = olapicjQuery('#'+widgetid+' .olapicitemlink').filter(":visible") || [];
				if(items.length > 0){
					olapicjQuery(items).each(function(i, url){
						if(olapicjQuery(this).attr('href').search(mediaid) > -1){
							prevLink = (i === 0) ? items[items.length - 1] : items[i - 1];
							prevLink = olapicjQuery(prevLink).attr('class').replace('olapicitemlink olapicitem', '');
							prevLink = olapicjQuery.trim( prevLink.replace(/category_([0-9]+)/gi, '') );
							prevLink = prevLink.replace(widgetid+'-', '');
							nextLink = (i === (items.length - 1)) ? items[0] : items[i + 1];
							nextLink = olapicjQuery(nextLink).attr('class').replace('olapicitemlink olapicitem', '');
							nextLink = olapicjQuery.trim( nextLink.replace(/category_([0-9]+)/gi, '') );
							nextLink = nextLink.replace(widgetid+'-', '');

							prevLink = (prevLink !== mediaid) ? instance.viewerLink({siteurl:siteurl, ownerdir:ownerdir, mediaid:prevLink, vieweraddon:olapicWidgetSettings.vieweraddon, extras:(returnvalues ? '' : "?widget="+widgetid+"&context=widget")}) : '';
							nextLink = (nextLink !== mediaid) ? instance.viewerLink({siteurl:siteurl, ownerdir:ownerdir, mediaid:nextLink, vieweraddon:olapicWidgetSettings.vieweraddon, extras:(returnvalues ? '' : "?widget="+widgetid+"&context=widget")}) : '';
						}
					});

					if(returnvalues === true){
						return {'prevLink':prevLink, 'nextLink':nextLink};
					}else{
						document.getElementById("faceboxframe").contentWindow.postMessage(olapicjQuery.stringify({'from':'olapic.magic', 'method':'updatebtnlinks', 'prevLink':prevLink, 'nextLink':nextLink}), "*");
					}
				}
			},
			getFacebokDimentions: function(data){
				var sizes = {h: 500, w: 710, resized:false};
				var sizeformobile = false;
				if(data !== ''){
					sizeformobile = (typeof olapicjQuery(data).attr('data-resize-mobile') !== 'undefined');
				}
				sizes.h = (typeof olapicjQuery(data).attr('data-pop-h') !== 'undefined') ? olapicjQuery(data).attr('data-pop-h')  : sizes.h;
				sizes.w = (typeof olapicjQuery(data).attr('data-pop-w') !== 'undefined') ? olapicjQuery(data).attr('data-pop-w')  : sizes.w;
				if(sizeformobile){
					var wheight = olapicjQuery(window).height();
					var wwidth = olapicjQuery(window).width();
					if(wwidth <= 400){
						sizes.resized = true;
						sizes.h = 440;
						sizes.w = 320;
					}else if(wwidth <= 768){
						sizes.resized = true;
						sizes.h = 720;
						sizes.w = 960;
					}
				}
				return sizes;
			},
			heardMessages: function(){
				if(this.listening === false){
					this.listening = true;
					if(typeof window.addEventListener !== 'undefined') {
						window.addEventListener('message', this.msgResponds, false);
					} else if(typeof window.attachEvent !== 'undefined') {
						window.attachEvent('onmessage', this.msgResponds);
					}
				}

				var reg = new RegExp('^#opi([0-9]+)$');
				var test = reg.exec(window.location.hash);
				if(!test){
					reg = new RegExp("showmedia([0-9]+)");
					test = reg.exec(olapicjQuery('#bestphotos_content').attr('class'));
					if(!test){
						olapicjQuery(document).trigger('close.facebox');
					}
				}else{
					if(!olapicjQuery('#faceboxframe').data('popclosed')){
						var popdata = olapicjQuery('#faceboxframe').data('popdata');
						if (typeof popdata === "undefined") {return false;}
						var url = this.viewerLink({siteurl:popdata.siteurl, ownerdir:popdata.ownerdir, mediaid:test[1], vieweraddon:olapicsettings.vieweraddon, extras:"?nopush=1&widget="+popdata.widget_id+"&context=widget"});
					}else{
						olapicjQuery('#faceboxframe').data('closedfromstash', true);
					}
				}
			},
			msgResponds: function(e){
				try {
					if ( e === 'undefined' || e === null || e.data.method === 'undefined' ) { return null; }
					else{
						if((e.data.search(/olapic\.magic/) > -1) || (e.data.search(/olapic\.widget/) > -1) || (e.data.search(/olapic\.source/) > -1)){
							var thedata = olapicjQuery.parseJSON(e.data);
							if(thedata.method === 'resize') {
								olapicjQuery('.olapic_viewer_popup iframe').animate( {'height': thedata.contentSize}, 300 );
							}else if(thedata.method === 'changeUrl') {
								var reg = new RegExp('^#opi([0-9]+)$');
								var test = reg.exec(window.location.href);
								if(!test) {
									if (typeof(window.history.pushState) === 'function') {
										window.history.pushState(null, "", '#opi' + thedata.media_id);
									} else {
										window.location.hash = '#!opi' + thedata.media_id;
									}
									var historycount = parseInt( olapicjQuery('body').data('historycount'), 0 );
									historycount++;
									olapicjQuery('body').data('historycount', historycount);
								}
								if (typeof(window.history.pushState) === 'function') {
									window.onpopstate = function(){
										var historycount = parseInt( olapicjQuery('body').data('historycount'), 0 );
										historycount--;
										olapicjQuery('body').data('historycount', historycount);
									};
								}
							}else if(thedata.method === 'updateviewercount'){
								var c = 0;
								if(typeof(olapicjQuery('#faceboxframe').data('count')) !== 'undefined') {
									c = parseInt(olapicjQuery('#faceboxframe').data('count'), 0);
								}
								c ++;
								olapicjQuery('#faceboxframe').data('count', c);
							}else if(thedata.method === 'faceboxClose') {
								olapicjQuery(document).trigger('close.facebox');
								olapicjQuery(document).bind('afterClose.facebox', function(){
									location.href = thedata.url;
								});
							}else if(thedata.method === 'bestphotocontrol'){
								OlapicCommons.replaceNavegationLinks(thedata.refurl);
							}else if(thedata.method === 'setparentkey'){
								olapicjQuery(window).unbind('keyup');
								olapicjQuery(window).keyup(function (event) {
									var thedata = olapicjQuery.stringify({'from':'olapic.magic', 'method':'dokeypress', 'keyCode':event.keyCode});
									document.getElementById("faceboxframe").contentWindow.postMessage(thedata, "*");
								});
							}else if(thedata.method === 'updatebtnlinks'){
								olapicjQuery('.olapic_previous_button, .olapic_next_button').unbind('click');
								if (thedata.prevLink !== '' ) {olapicjQuery('.olapic_previous_button').attr('rel', thedata.prevLink);}
								if (thedata.prevLink !== '' ) {olapicjQuery('.olapic_next_button').attr('rel', thedata.nextLink);}
								if (typeof(window.history.pushState) === 'function') {
									olapicjQuery('.olapic_next_button, .olapic_previous_button').click(function(e){
										if(olapicjQuery(this).attr('rel') === ''){ e.stopPropagation(); e.preventDefault(); return; }
										parent.window.postMessage(olapicjQuery.stringify({'from':'olapic.magic', 'method':'updateviewercount'}), "*");
										window.history.replaceState(null, "", olapicjQuery(this).attr('rel'));
									});
								}else{
									olapicjQuery('.olapic_next_button, .olapic_previous_button').click(function(e){
										window.location.href = olapicjQuery(this).attr('rel');
									});
								}
							}else if(thedata.method === 'dokeypress'){
								OlapicCommons.popKeyActions(thedata.keyCode);
							}else if(thedata.method === 'widgetphotocontrol'){
								OlapicCommons.replaceNavegationWidget(thedata.widget_id, thedata.media_id, thedata.ownerdir, thedata.siteurl);
								olapicjQuery('#faceboxframe').data('popdata', thedata);
							}else if(thedata.method === 'gotonextprev'){
								this.openViewer({iframe: thedata.url, height: olapicjQuery('#faceboxframe').height(), width: olapicjQuery('#faceboxframe').width()});
							}else if(thedata.method === 'sendsetCookie'){
								OlapicCommons.olapicSetCookies(thedata.urltopost, {'element_id':thedata.element_id});
							}else if(thedata.method === 'setCookie'){
								var addCookies = '';
								for (var x in thedata){
									if(x.search(/OlaCookie_/) > -1){
										OlapicCommons.createCookie( olapicjQuery.trim( x.replace('OlaCookie_', '') ), decodeURIComponent(thedata[x]), '', '/', '.photorank.me');
									}
								}
							}
							else if(thedata.method === 'justClose'){
							}
						}
					}
				} catch (er) { }
			},

			createCookie: function(name, value, expires, path, domain) {
				var cookie = name + "=" + escape(value) + ";";
				if (expires) {
					if(expires instanceof Date) {
					if (isNaN(expires.getTime())){
						expires = new Date();}
					}else {expires = new Date(new Date().getTime() + parseInt(expires, 0) * 1000 * 60 * 60 * 24);}
					cookie += "expires=" + expires.toGMTString() + ";";
				}
				if (path) {cookie += "path=" + path + ";";}
				if (domain) {cookie += "domain=" + domain + ";";}
				document.cookie = cookie;
			},
			readCookie: function(name) {
				var nameEQ = escape(name) + "=";
				var ca = document.cookie.split(';');
				for (var i = 0; i < ca.length; i++){
					var c = ca[i];
					while (c.charAt(0) === ' ')
						c = c.substring(1, c.length);
					if (c.indexOf(nameEQ) === 0)
						return unescape(c.substring(nameEQ.length, c.length));
				}
				return null;
			},
			eraseCookie: function(name) {
				this.createCookie(name, "", -1);
			},

			/*
			data.siteurl
			data.ownerdir
			data.mediaid
			data.vieweraddon
			data.extras
			*/
			viewerLink: function(data){
				data.vieweraddon = 'viewer';
				return data.siteurl+'/'+data.vieweraddon+'/'+data.ownerdir+"/"+data.mediaid+(data.extras ? '?'+data.extras:'');
			},
			/*
			facebox options
			*/

			openUploader: function(data, handler){
				if(data.uploaderaddon === 'uploader2'){
					handler.loadUploader(data);
				} else {
					olapicjQuery.facebox({ iframe: data.iframe, height: data.height, width: data.width }, "olapic_widget_popup");
				}
			},
			openViewer: function(data, handler){
				if(olapicjQuery.browser.mobile){
					if((data.vieweraddon == 'viewer1') || (data.forceViewerModal === false)){
						window.open(data.url, "olapic_widget_viewer");
					}else{
						handler.loadViewer(data);
					}
				}else{
					if(data.vieweraddon.search('viewer2') > -1){
						handler.loadViewer(data);
					}else{
						var fn = window[settings.viewerpreLoadCallback];
						if(typeof fn === 'function') {
							fn(this.options);
						}
						data.iframe = data.url;
						if(data.widgetId !== undefined){
							data.iframe += "&wId="+data.widgetId;
							data.iframe += "&cId="+data.categoryId;
							data.iframe += "&gId="+data.galleryId;
							data.iframe += "&fromUrl="+ encodeURIComponent(window.location.href);
						}
						olapicjQuery.facebox(data, 'olapic_viewer_popup');
					}
				}
			},
			getUrlVars: function() {
				var vars = {};
				var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
					vars[key] = value;
				});
				return vars;
			},
			stringToArray: function(st){
				var r = [];
				for (var i = 0; i <= st.length - 1; i++) {
					r.push(st[i]);
				}
				return r;
			},
			/*
			report photo
			*/
			reportPhoto: function(media_id, w_calculate, dialogID, formID, callback){
				//Report photo
				dialogID = (typeof dialogID === "undefined") ? "olapic-viewer-dialogreport" : dialogID;
				formID = (typeof formID === "undefined") ? "reportform" : formID;
				if(olapicjQuery('.report-photo').length > 0){
					olapicjQuery('.report-photo').click(function(e){
						e.preventDefault();
						if(media_id !== null) {
							olapicjQuery('.report-media-id').val(media_id);
						}
						if(olapicjQuery.browser.mobile){
							w = (w_calculate > 365) ? (( ( w_calculate - 365) / 2) + 43) : 20;
						}else{
							w = ( w_calculate - 365) / 2;
						}
						olapicjQuery("#"+dialogID).show().animate({
							opacity: 1,
							marginLeft: w
						},{duration:250});
					});
					olapicjQuery("#"+dialogID+" > a.close").click(function(e){
						e.preventDefault();
						olapicjQuery("#"+dialogID).hide();
					});
					olapicjQuery('form#'+formID).submit(function(e){
						e.preventDefault();
						if(isEmail(olapicjQuery('form#'+formID).find('[name=email]').val())){
							if (olapicjQuery.browser.msie && window.XDomainRequest) {
								// Use Microsoft XDR
								var url2go = olapicjQuery('form#'+formID).attr('action') +'?'+olapicjQuery('form#'+formID).serialize();
								var xdr = new XDomainRequest();
								xdr.open("get", url2go);
								xdr.onload = function () {
									var JSON = olapicjQuery.parseJSON(xdr.responseText);
									if (JSON === null || typeof (JSON) == 'undefined'){
										JSON = olapicjQuery.parseJSON(data.firstChild.textContent);
									}
									if (JSON.ok === true ){
										alert(JSON.msg);
										olapicjQuery("#"+dialogID).hide();
									} else {
										alert(JSON.msg);
									}
									if(typeof callback === 'function'){
										callback(JSON.ok);
									}

								};
								xdr.onprogress = function(){ };
								xdr.ontimeout = function(){ };
								xdr.onerror = function () { };
								setTimeout(function(){
									xdr.send();
								}, 0);
							}else{
								olapicjQuery.ajax({
								url: olapicjQuery('form#'+formID).attr('action'),
								type: "GET",
								data: olapicjQuery('form#'+formID).serialize()
								}).done(function(d){
									if (d.ok === true ){
										alert(d.msg);
										olapicjQuery("#"+dialogID).hide();
									} else {
										alert(d.msg);
									}
									if(typeof callback === 'function'){
										callback(d.ok);
									}
								});	
							}
						}else{
							alert('Invalid email.');
						}
						
					});
				}
				/*little regex email validation*/
				function isEmail(email) {
					var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
					return regex.test(email);
				}
			},
			
			/* LoadWidget */
			loadWidget: function(container){
				var id = olapicjQuery(container).attr('id');
				var domain = olapicjQuery(container).data('widget-domain');
				var type = olapicjQuery(container).data('widget-type');
				var config = olapicjQuery(container).data('widget-config');
				var customerid = olapicjQuery(container).data('widget-customer-id');
				var content = olapicjQuery(container).data('widget-content');
				var galleryid = (typeof olapicjQuery(container).data('gallery-id') !== 'undefined') ? olapicjQuery(container).data('gallery-id') : null;
				olapicjQuery.getScript( domain+'/render?gallery=&element_id='+id+'&widget_type='+type+'&widget_config='+config+'&customer_id='+customerid+'&context='+content+'&gallery='+galleryid+'&fromGallery=1');
			},

			/* twitter pop-up */
			prepareTwitterPops: function(selector){
				//from: https://dev.twitter.com/docs/intents
				olapicjQuery(selector).click(function(e){
					e.preventDefault();
					var windowOptions = 'scrollbars=yes,resizable=yes,toolbar=no,location=yes',
						width = 550,
						height = 420,
						winHeight = screen.height,
						winWidth = screen.width;
					left = Math.round((winWidth / 2) - (width / 2));
					top = 0;
	 
					if (winHeight > height) {
						top = Math.round((winHeight / 2) - (height / 2));
					}
					window.open(olapicjQuery(this).attr('href'), 'intent', windowOptions + ',width=' + width +  ',height=' + height + ',left=' + left + ',top=' + top);
				});
			},

			/* IE 8/9 fixes */
			IEAjaxFixes: function(){
				// from https://raw.github.com/MoonScript/jQuery-ajaxTransport-XDomainRequest/8754607e5f9ab73ccc37246f0c12fed14f85bd28/jQuery.XDomainRequest.js
				var httpRegEx = /^https?:\/\//i;
				var getOrPostRegEx = /^get|post$/i;
				var sameSchemeRegEx = new RegExp('^'+location.protocol, 'i');
				var xmlRegEx = /\/xml/i;
				
				// ajaxTransport exists in olapicjQuery 1.5+
				olapicjQuery.ajaxTransport('text html xml json', function(options, userOptions, jqXHR){
					// XDomainRequests must be: asynchronous, GET or POST methods, HTTP or HTTPS protocol, and same scheme as calling page
					if (options.crossDomain && options.async && getOrPostRegEx.test(options.type) && httpRegEx.test(userOptions.url) && sameSchemeRegEx.test(userOptions.url)) {
						var xdr = null;
						var userType = (userOptions.dataType||'').toLowerCase();
						return {
							send: function(headers, complete){
								xdr = new XDomainRequest();
								if (/^\d+$/.test(userOptions.timeout)) {
									xdr.timeout = userOptions.timeout;
								}
								xdr.ontimeout = function(){
									complete(500, 'timeout');
								};
								xdr.onprogress = function() {};
								xdr.onload = function(){
									var allResponseHeaders = 'Content-Length: ' + xdr.responseText.length + '\r\nContent-Type: ' + xdr.contentType;
									var status = {
										code: 200,
										message: 'success'
									};
									var responses = {
										text: xdr.responseText
									};
									/*
									if (userType === 'html') {
										responses.html = xdr.responseText;
									} else
									*/
									try {
										if (userType === 'json') {
											try {
												responses.json = JSON.parse(xdr.responseText);
											} catch(e) {
												status.code = 500;
												status.message = 'parseerror';
												//throw 'Invalid JSON: ' + xdr.responseText;
											}
										} else if ((userType === 'xml') || ((userType !== 'text') && xmlRegEx.test(xdr.contentType))) {
											var doc = new ActiveXObject('Microsoft.XMLDOM');
											doc.async = false;
											try {
												doc.loadXML(xdr.responseText);
											} catch(e) {
												doc = undefined;
											}
											if (!doc || !doc.documentElement || doc.getElementsByTagName('parsererror').length) {
												status.code = 500;
												status.message = 'parseerror';
												throw 'Invalid XML: ' + xdr.responseText;
											}
											responses.xml = doc;
										}
									} catch(parseMessage) {
										throw parseMessage;
									} finally {
										complete(status.code, status.message, responses, allResponseHeaders);
									}
								};
								xdr.onerror = function(){
									complete(500, 'error', {
										text: xdr.responseText
									});
								};
								xdr.open(options.type, options.url);
								//xdr.send(userOptions.data);
								xdr.send();
							},
							abort: function(){
								if (xdr) {
									xdr.abort();
								}
							}
						};
					}
				});
			},
			/* IE 8/9 fixes */

			olapicSetCookies: function(url, params){
				if(document.getElementById('olapicCookie') !== null) { return; }
				var _setC = this;
				params = params || {};
				var olapicDebug = false;
				var olapicLoadJSloaded = false;
				var inputSubmit = null;

				var olapicFomrUrl = url+'&t='+(Math.floor(Math.random()*11));
				var isIE7 = (navigator.appVersion.indexOf("MSIE 7.") > -1);
				var isIE8 = (navigator.appVersion.indexOf("MSIE 8.") > -1);
				var isFireFox = (navigator.userAgent.toLowerCase().indexOf('firefox') > -1);
				var olapicFrame = olapicCreateElement(document, 'IFRAME', {name:'olapicFrame', id:'olapicCookie', src:''});

				if(olapicDebug === true){
					olapicFrame.style.width = "310px"; 
					olapicFrame.style.height = "310px";
				}else{
					olapicFrame.style.width = "0px"; 
					olapicFrame.style.height = "0px";
					olapicFrame.style.visibility = "hidden";
				}
				if (olapicFrame.attachEvent) {
					olapicFrame.attachEvent('onload', olapicFrameOnLoad);
				} else if (olapicFrame.addEventListener) {
					olapicFrame.onload = olapicFrameOnLoad;
				}

				function olapicCreateElement(doc, type, options){
					var newElement = doc.createElement(type);
					for (var prop in options) {
						newElement[prop] = options[prop];
					}
					return newElement;
				}
				function olapicFrameOnLoad(){
					var doc = olapicFrame.contentDocument || olapicFrame.contentWindow.document;
					var win = document.getElementById('olapicCookie');
					win = window.frames.olapicFrame;
					if(typeof win === null) { return; }
					var frameIndex = 0;

					var olapicFrame2 = null;
					if(typeof win.addEventListener !== 'undefined') {
						win.addEventListener('message', _setC.msgResponds, false);
					} else if(typeof win.attachEvent !== 'undefined') {
						win.attachEvent('onmessage', _setC.msgResponds );
					}
					var olapicForm = olapicCreateElement(doc, 'FORM', {name:'olapicForm', id:'olapicForm', method:'POST', action:olapicFomrUrl, target:'formFrame_olapicCookies', enctype:'application/x-www-form-urlencoded'});
					// the form //
					var formInput = null;
					for (var key in params){
						formInput = olapicCreateElement(doc, 'INPUT', {name:key, id:key+'_olapicCookies', type:'TEXT', value:params[key]});
						olapicForm.appendChild(formInput);
					}
					inputSubmit = olapicCreateElement(doc, 'INPUT', {name:'olapicSubmit_olapicCookies', id:'olapicSubmit_olapicCookies', type:'submit', value:''});
					olapicForm.appendChild(inputSubmit);
					doc.body.appendChild(olapicForm);
					if(isIE7 || isIE8){
						olapicFrame2 = doc.createElement('<iframe name="formFrame_olapicCookies" id="formFrame_olapicCookies"/>');
					}else{
						olapicFrame2 = olapicCreateElement(doc, 'IFRAME', {name:'formFrame_olapicCookies', id:'formFrame_olapicCookies', src:''});
					}
					if(olapicDebug === true){
						olapicFrame2.style.width = "310px"; 
						olapicFrame2.style.height = "310px";
					}else{
						olapicFrame2.style.width = "0px"; 
						olapicFrame2.style.height = "0px";
						olapicFrame.style.visibility = "hidden";
					}
					if (olapicFrame2.attachEvent) {
						olapicFrame2.attachEvent('onload', olapicFormFrameOnLoad);
					} else if (olapicFrame2.addEventListener) {
						olapicFrame2.onload = olapicFormFrameOnLoad;
					}
					doc.body.appendChild(olapicFrame2);
					if(isFireFox){ setTimeout(olapicFormFrameOnLoad, 222); }
				}
				function olapicFormFrameOnLoad(){
					if(olapicLoadJSloaded === false){
						olapicLoadJSloaded = true;
						inputSubmit.click();
					}
				}
				document.body.appendChild(olapicFrame);
				// monitorEvents(olapicFrame.window, "message"); 
			},

			uniqueCookie: function(){
				var actualId = this.readCookie('__olapicU');
				if( actualId === null ){
					actualId = new Date().getTime();
					actualId += Math.floor((Math.random()*999)+1);
					this.createCookie('__olapicU', actualId, 30, '/');
				}
			},
			regenerateUniqueCookie: function(){
				actualId = new Date().getTime();
				actualId += Math.floor((Math.random()*999)+1);
				this.createCookie('__olapicU', actualId, 30 );
			}
		});
		if ((olapicjQuery.browser.version.substring(0, 1) === '8' ) || (olapicjQuery.browser.version.substring(0, 1) === '9') ) { OlapicCommons.IEAjaxFixes(); }
		/*
		**************** OlapicTracker ****************
		*/
		OlapicTracker = function(){
			this.init = function(data){
				this.settings = (data || {
					_api_url: '',
					_api_key: '',
					_olapic_u: ''
				});
				this.settings._api_method = this.settings._api_method || '_track';
				this.settings._api_methods = {
					_track : 'track/image/',
					_report : 'broken/image/'
				};
			};

			this.track = function(data){
				for (var key in data) {
					if (typeof data[key] === 'object'){
						// add extra mobile information to track events
						data[key].isMobile = olapicjQuery.browser.mobile;
						data[key].uAgent = (navigator.userAgent||navigator.vendor||window.opera);
					}
				}
				var url2touch = this.makeUrl(data, this.settings._api_methods._track );
				if(url2touch){
					this.touchImage(url2touch);
				}
			};

			this.reportImage = function(data){
				var url2touch = this.makeUrl(data, this.settings._api_methods._report );
				if(url2touch){
					this.touchImage(url2touch);
				}
			};

			this.touchUrl = function(url){
				if(olapicjQuery.browser.ie){
					this.touchImage(url);
				}else{
					olapicjQuery.ajax(url,{
						crossDomain: true,
						xhrFields: {
							withCredentials: true
						}
					});
				}
			};

			this.touchImage = function(url){
				olapicjQuery('<img />', {'src':url}).load(function(){
					olapicjQuery(this).remove();
				});
			};

			this.makeUrl = function(data, method){
				if(this.settings._api_url === '') {return false;}
				if(this.settings._api_key === '') {return false;}
				var actualId = OlapicCommons.readCookie('__olapicU');

				if(actualId === null && this.settings._olapic_u === 1){
					OlapicCommons.regenerateUniqueCookie();
					actualId = OlapicCommons.readCookie('__olapicU');

				}
				var olapic_u = (actualId !== null && actualId !== '') ? '&__olapicU=' + actualId : '';
				var url = this.settings._api_url + '/' + method + '?api_key=' + this.settings._api_key + olapic_u;

				for (var key in data) {
					value = data[key];
					if (typeof data[key] === 'object'){
						value = olapicjQuery.stringify(value);
					}
					url += '&' + key + '=' + encodeURI(value);
				}
				url += '&t=' + (Math.random() * 1000);
				return url;
			};
		};

		OlapicStylesLoader = function(opts){
			this.options = opts || {
				queue: [],
				after: function(){}
			};
			this.run = function(){
				var _self = this;
				if (olapicjQuery.browser.msie){
					for(i = 0; i <= (_self.options.queue.length - 1); ++i){
						var olapicCSS = document.createElement("link");
						olapicCSS.type = "text/css";
						olapicCSS.href = _self.options.queue[i];
						olapicCSS.rel = "stylesheet";
						olapicCSS.charset = "UTF-8";
						document.getElementsByTagName("head")[0].appendChild(olapicCSS);
					}
					_self.options.after();
				}else{
					_self.loadFile();
				}
			};
			this.loadFile = function(){
				var _self = this;
				if(_self.options.queue.length === 0){
					_self.options.after();
					return;
				}
				var link = _self.options.queue.shift();
				olapicjQuery.ajax({
					url: link,
					crossDomain: true,
					success: function(csstext){
						var newcss = document.createElement('style');
						newcss.type = 'text/css';
						newcss.appendChild(document.createTextNode(csstext));
						document.getElementsByTagName("head")[0].appendChild(newcss);
						_self.loadFile(); 
					}
				});
			};
			return this;
		};

		OlapicImagesLoader = function(opts){
			this.options = opts || {
				queue: [],
				after: function(){}
			};
			this.run = function(){
				this.loadFile();
			};
			this.loadFile = function(){
				var _self = this;
				if(_self.options.queue.length === 0){
					_self.options.after();
					return;
				}
				var data = _self.options.queue.shift();
				var img = new Image();
				img.src = data.src;
				img.setAttribute('data-id', data.id);
				img.setAttribute('data-img_size', data.img_size);
				img.onerror = function (evt){
					var reportdata = {
						id: olapicjQuery(this).attr('data-id'),
						imagesize: olapicjQuery(this).attr('img_size'),
						status:'404',
						src: olapicjQuery(this).attr('src'),
						extra: JSON.stringify(olapicjQuery.browser)
					};
					instance.sendImageStatus(reportdata);
					_self.loadFile();
				};
				img.onload = function (evt){
					_self.loadFile();
				};
			};
			return this;
		};

	});

olapicRequire.define("Magic/commons", function(){});

olapicRequire.define("Magic/olapic.googleTracker",function(){

olapicGoogleTracker = {

	create: function(params){
		params = params || {};
		if(typeof olapicGoogleCode == 'undefined'){
			params.ga = params.ga || 'UA-284996-8';

			var url = '//www.google-analytics.com/analytics.js';
			if(params !== undefined && params.debug !== undefined){
				url = '//www.google-analytics.com/analytics_debug.js';
				console.log(url);
			}
			/* jshint ignore:start */
			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			})(window,document,'script',url,'olapicGoogleCode');
			/* jshint ignore:end */
			olapicGoogleCode('create', params.ga, {
				'name': 'OlapicGoogleTracker',
				'allowLinker': true
			});
		}
	},

	/*
		Example: 
			params.partner = Luis
			params.section = PublicGallery
			params.page = ShowGallery
	 */
	trackPageView: function(params){
		if(typeof olapicGoogleCode !== 'undefined'){
			olapicGoogleCode('OlapicGoogleTracker.send', 'pageview', {
				'dimension1':  params.partner,
				'dimension2':  params.section,
				'dimension3':  params.page,
				'dimension4':  params.streamID || '',
				'dimension5':  params.userAgent || '',
				'hitCallback': function(){
					if(params !== undefined && params.debug !== undefined) console.log('trackPageView sent!' + JSON.stringify(params));
				}
			});
		}
	},

	/*
		Example: 
			params.category = OlapicSlideWidget
			params.event = MediaClick
			params.label = Customer
	 */
	trackEvent: function(params){
		if (typeof olapicGoogleCode !== "undefined") {
			olapicGoogleCode('OlapicGoogleTracker.send', 'event', params.category, params.event, params.label);
			if(params !== undefined && params.debug !== undefined) console.log('trackEvent sent!' + JSON.stringify(params));
		}
	},

	/*
		Example: 
			params.network = Facebook
			params.action = link
			params.target = url
	 */
	trackSocial: function(params){
		if (typeof olapicGoogleCode !== "undefined"){
			olapicGoogleCode('OlapicGoogleTracker.send', 'social', params.network, params.action, params.target);
			if(params !== undefined && params.debug !== undefined) console.log('trackSocial sent!' + JSON.stringify(params));
		}
	}

};
});
olapicRequire.define("Magic/olapic.googleTracker", function(){});

/*! Facebox Object */

	olapicRequire.define("Magic/facebox",function () {
		(function(a){function l(){if(j())return;a("#olapic_facebox_overlay").fadeOut(200,function(){a("#olapic_facebox_overlay").removeClass("olapic_facebox_overlayBG");a("#olapic_facebox_overlay").addClass("olapic_facebox_hide");a("#olapic_facebox_overlay").remove()});return false}function k(){if(j())return;if(a("#olapic_facebox_overlay").length==0)a("body").append('<div id="olapic_facebox_overlay" class="olapic_facebox_hide"></div>');a("#olapic_facebox_overlay").hide().addClass("olapic_facebox_overlayBG").css("opacity",a.facebox.settings.opacity).click(function(){a(document).trigger("close.facebox")}).fadeIn(200);return false}function j(){return a.facebox.settings.overlay==false||a.facebox.settings.opacity===null}function i(b,c,d,e){a.facebox.reveal('<iframe scrolling="no" marginwidth="0" width="'+e+'" height="'+d+'" frameborder="0" src="'+b+'" marginheight="0" id="faceboxframe"></iframe>',c)}function h(b,c){a.get(b,function(b){a.facebox.reveal(b,c)})}function g(b,c){var d=new Image;d.onload=function(){a.facebox.reveal('<div class="image"><img src="'+d.src+'" /></div>',c)};d.src=b}function f(b,c,d){console.log(d);if(b.match(/#/)){var e=window.location.href.split("#")[0];var f=b.replace(e,"");if(f=="#")return;a.facebox.reveal(a(f).html(),c)}else if(b.match(a.facebox.settings.imageTypesRegexp)){g(b,c)}else if(d.split("|")[0]=="iframe"){i(b,c,d.split("|")[1])}else{h(b,c)}}function e(){var b=a.facebox.settings;b.loadingImage=b.loading_image||b.loadingImage;b.closeImage=b.close_image||b.closeImage;b.imageTypes=b.image_types||b.imageTypes;b.faceboxHtml=b.facebox_html||b.faceboxHtml}function d(){var a;if(self.innerHeight){a=self.innerHeight}else if(document.documentElement&&document.documentElement.clientHeight){a=document.documentElement.clientHeight}else if(document.body){a=document.body.clientHeight}return a}function c(){var a,b;if(self.pageYOffset){b=self.pageYOffset;a=self.pageXOffset}else if(document.documentElement&&document.documentElement.scrollTop){b=document.documentElement.scrollTop;a=document.documentElement.scrollLeft}else if(document.body){b=document.body.scrollTop;a=document.body.scrollLeft}return new Array(a,b)}function b(b){if(a.facebox.settings.inited)return true;else a.facebox.settings.inited=true;a(document).trigger("init.facebox");e();var c=a.facebox.settings.imageTypes.join("|");a.facebox.settings.imageTypesRegexp=new RegExp(".("+c+")$","i");if(b)a.extend(a.facebox.settings,b);a("body").append(a.facebox.settings.faceboxHtml);var d=[new Image,new Image];d[0].src=a.facebox.settings.closeImage;d[1].src=a.facebox.settings.loadingImage;a("#olapic_facebox").find(".b:first, .bl").each(function(){d.push(new Image);d.slice(-1).src=a(this).css("background-image").replace(/url\((.+)\)/,"$1")});a("#olapic_facebox .close").click(a.facebox.close);a("#olapic_facebox .close_image").attr("src",a.facebox.settings.closeImage)}a.facebox=function(b,c){a.facebox.loading();if(b.iframe)i(b.iframe,c,b.height?b.height:320,b.width?b.width:640);else if(b.ajax)h(b.ajax,c);else if(b.image)g(b.image,c);else if(b.div)f(b.div,c);else if(a.isFunction(b))b.call(a);else a.facebox.reveal(b,c)};a.extend(a.facebox,{settings:{opacity:.2,overlay:true,loadingImage:"https://widgets.photorank.me/static/images/olapic/facebox/loading.gif",closeImage:"https://widgets.photorank.me/static/images/olapic/facebox/close.png",imageTypes:["png","jpg","jpeg","gif"],faceboxHtml:'\n    <div id="olapic_facebox" style="display:none;"> \n      <div class="popup"> \n        <div class="content"> \n        </div> \n        <a href="#" class="close"><img src="https://widgets.photorank.me/static/images/olapic/facebox/close.png" title="close" class="close_image" /></a> \n      </div> \n    </div>'},loading:function(){b();if(a("#olapic_facebox .loading").length==1)return true;k();a("#olapic_facebox .content").empty();a("#olapic_facebox .body").children().hide().end().append('<div class="loading"><img src="'+a.facebox.settings.loadingImage+'"/></div>');a("#olapic_facebox").css({top:c()[1]+d()/10,left:a(window).width()/2-205}).show();a(document).bind("keydown.facebox",function(b){if(b.keyCode==27)a.facebox.close();return true});a(document).trigger("loading.facebox")},reveal:function(b,c){a(document).trigger("beforeReveal.facebox");if(c)a("#olapic_facebox .content").addClass(c);a("#olapic_facebox .content").append(b);a("#olapic_facebox .loading").remove();a("#olapic_facebox .body").children().fadeIn("normal");a("#olapic_facebox").css("left",a(window).width()/2-a("#olapic_facebox .popup").width()/2);a(document).trigger("reveal.facebox").trigger("afterReveal.facebox")},close:function(){a(document).trigger("close.facebox");return false}});a.fn.facebox=function(c){function d(){a.facebox.loading(true);var b=this.rel.match(/facebox\[?\.(\w+)\]?/);if(b)b=b[1];f(this.href,b);return false}if(a(this).length==0)return;b(c);return this.bind("click.facebox",d)};a(document).bind("close.facebox",function(){a(document).unbind("keydown.facebox");a("#olapic_facebox").fadeOut(function(){a("#olapic_facebox .content").removeClass().addClass("content");a("#olapic_facebox .loading").remove();a(document).trigger("afterClose.facebox")});l()})})(olapicjQuery);
	});

olapicRequire.define("Magic/facebox", function(){});


/*! Olapic widget : slider */

	olapicRequire.define("Magic/widget_olapic_slide",["Magic/olapic.widgets", "Magic/olapicslide.min", "Magic/jquery.touchSwipe.min"], function () {
		olapicWidget.prototype.initVars = function(){
			this.widgetName = "olapic_slide";
			this.css = [];
			this.cssIE = [];
			this.styles = [];
			this._tracker = null;

		};
		olapicWidget.prototype.render = function(){
			//slide_mode 1: horizontal, 2: vertical
			this.options.widget = olapicjQuery.extend({
				id:0,
				settings: {css:'', call_to_action:'', custom_html:'', custom_default:'', thumbnail_size:100, infinite: true, slide_mode:1}
			}, this.options.widget);
			//backguard for slide_mode
			// this.options.widget.settings.slide_mode = 2;
			this.options.widget.settings.limit = this.options.widget.settings.limit || 50;
			this.options.widget.settings.slide_mode = this.options.widget.settings.slide_mode || 1;
			this.options.widget.settings.auto_play = this.options.widget.settings.auto_play || 0;
			this.options.widget.settings.interval = this.options.widget.settings.interval || 1000;
			this.options.widget.settings.items_count = this.options.widget.settings.items_count || 1;
			this.options.widget.settings.duration = this.options.widget.settings.duration || 300;
			this.options.widget.settings.thumbnail_size  = this.options.widget.settings.thumbnail_size || 100;
			this.options.widget.settings.img_size = this.options.widget.settings.img_size || 'thumbnail';
	
			//first get the styles, put it on the header, preload the images, then create the slider..
			var instance = this;
			//empty the wrapper for safari issue
			olapicjQuery("#"+instance.options.elementId).html('');

			if(this.options.widget.settings.css === '' || this.options.widget.settings.css === undefined){
				this.styles.push(this.options.staticCdnURL + "/static/css/Widget/olapic/olapic_slide_#widgetStyle#.css".replace('#widgetStyle#', this.options.widgetstyle));
			}
			this.styles.push(this.options.staticCdnURL + "/static/css/commons/fontawesome-olapic-custom.css");
			this.styles.push(this.options.staticCdnURL + "/static/css/Widget/olapic/commons.css");
			// Only load facebox.css if the browser is NOT mobile
			if(!olapicjQuery.browser.mobile){
				this.styles.push(this.options.staticCdnURL + "/static/css/commons/facebox.css");
			}
			// Load the customer fontawesome if is the viewer 1
			if((typeof this.options.vieweraddon !== "undefined") && (this.options.vieweraddon.search('viewer2') > -1)){
				this.styles.push(this.options.staticCdnURL + "/static/css/commons/fontawesome-olapic-custom.css");
			}

			//loadPhotos
			// var apiUrl = this.getApiUrl();
			// olapicjQuery.when(this.callAPI(apiUrl, {func:this.setPhotos, obj:this})).done(function(){
				if(instance.options.photos.length <= instance.options.widget.settings.minInfinite){
					instance.options.widget.settings.infinite = false;
				}
				olapicjQuery.when(instance.loadStyles()).done(function(){
					instance.createHtml();
					olapicjQuery.when(instance.preloadImages(instance.options.photos)).done(function(){
						instance.makeslider();
						olapicjQuery("#"+instance.options.elementId).addClass("olapic_ecomm olapic_slider olapic_lang"+instance.options.lang);
						instance.afterRenderCallback();
					});
				});
			// });
		};
		olapicWidget.prototype.getApiUrl = function(){
			var url = this.options.olapic_api_url + '/v1/photos/?api_key='+this.options.olapic_api_key;
			url += '&limit='+this.options.widget.settings.limit+'&offset=0';
			if(this.options.galleryId > 0){
				url += '&stream='+this.options.galleryId;
			}else if(this.options.categoryId > 0){
				url += '&category='+this.options.categoryId;
			}
			return url;
		};
		olapicWidget.prototype.setPhotos = function(data, obj){
			obj.options.photos = data.response;
		};
		olapicWidget.prototype.preloadImages = function(images){
			//Avoid preload images on ie8
			if(olapicjQuery.browser.msie && parseInt(olapicjQuery.browser.version, 10) === 8){
				return olapicjQuery.Deferred(
					function(dfd){
						dfd.resolve();
					}
				).promise();
			}

			var instance = this;
			var limitimages = [];
			var d = olapicjQuery.Deferred();
			if(images.length > 10){
				limitimages = images.slice(-1);
				var olapicaux = images.slice(0, 9);
				for (var i = 0; i < olapicaux.length; i++) {
					limitimages.push(olapicaux[i]);
				}
			}else{
				limitimages = images;
			}
			if (limitimages.length === 0){
				d.resolve();
			}else{
				olapicjQuery.when(
					instance.loadImg(limitimages[0], 0),
					instance.loadImg(limitimages[1], 1),
					instance.loadImg(limitimages[2], 2),
					instance.loadImg(limitimages[3], 3),
					instance.loadImg(limitimages[4], 4),
					instance.loadImg(limitimages[5], 5),
					instance.loadImg(limitimages[6], 6),
					instance.loadImg(limitimages[7], 7),
					instance.loadImg(limitimages[8], 8),
					instance.loadImg(limitimages[9], 9)
					).done(function(){
						d.resolve();
					}
				);
				return d.promise();
			}
		};
		olapicWidget.prototype.loadImg = function(data, index){
			var instance = this;
			return olapicjQuery.Deferred(
				function(dfd){
					if(data === undefined){
						dfd.resolve();
					}else{
						var img = new Image();
						img.src = data[instance.options.widget.settings.img_size];
						img.setAttribute('data-id', data.id);
						img.setAttribute('data-index', index);
						img.onerror = function (evt){
							var reportdata = {
								id: olapicjQuery(this).attr('data-id'),
								imagesize: instance.options.widget.settings.img_size,
								status:'404',
								src: olapicjQuery(this).attr('src'),
								extra: JSON.stringify(olapicjQuery.browser),
							};
							instance.sendImageStatus(reportdata);
							dfd.resolve();
						};
						img.onload = function (evt){
							dfd.resolve();
						};
					}
				}
			).promise();
		};
		olapicWidget.prototype.loadStyles = function(){
			var instance = this;
			return olapicjQuery.Deferred(function(dfd){ instance.dfdLoadStyles(dfd); }).promise();
		};
		olapicWidget.prototype.dfdLoadStyles = function(dfd) {
			var sL = new OlapicStylesLoader({
				queue: this.styles,
				after: function(){ dfd.resolve(); }
			}).run();
		};
		olapicWidget.prototype.createHtml = function(){
			//
			var container = olapicjQuery("#"+this.options.elementId);
			container.addClass('olapic_widget '+(this.options.widget.settings.slide_mode == 1 ? 'slide_horizontal' : 'slide_vertical'));
			//Header
			var header = olapicjQuery("<div/>", {"class":"olapic_widget_header"});
			var h3wrapper = olapicjQuery("<div/>", {"class":"olapic_widget_title"});
			var titletext = '';
			if(this.options.widget !== null && this.options.widget.settings.call_to_action !== undefined){
				this.options.widget.settings.call_to_action = this.options.widget.settings.call_to_action.replace(/\{\$galleryName\}/g, this.options.galleryName);
			}
			if(this.options.widget !== null && (this.options.widget.settings.use_gallery_name_as_title == 1) && this.options.galleryId !== 0 ){
				titletext = this.options.galleryName;
			}else{
				titletext = ((this.options.widget !== null && this.options.widget.settings.call_to_action !== undefined) ? this.options.widget.settings.call_to_action : '');
			}

			var h3 = olapicjQuery("<h3/>", {"class":"olapic_widget_gallery_title", "text": titletext }).appendTo(h3wrapper);
			olapicjQuery(h3wrapper).appendTo(header);
			var div = olapicjQuery("<div/>", {"class":"upload-hashtag"}).appendTo(header);
			if(this.options.hashtags.length > 0){
				if(this.options.hashtags[0] !== ''){
					var upload_hashtag = olapicjQuery('<div/>', {"class": "upload-hashtag-hash", "text": "#" + this.options.hashtags[0]});
					var popup = olapicjQuery("<div/>", {"class":"upload-hashtag-instructions"}).appendTo(upload_hashtag);
					olapicjQuery("<h4/>", {"text":"How to add your pic?"}).appendTo(popup);
					olapicjQuery("<p/>", {"html":"Simply share a photo on <span>Instagram</span> or <span>Twitter</span> and include the following hashtag. Your photo will automatically be added to this gallery."}).appendTo(popup);
					olapicjQuery("<span/>", {"class":"upload-hashtag-selected", "text":"#" + this.options.hashtags[0]}).appendTo(popup);
					upload_hashtag.appendTo(div);
				}
			}

			this.options.widget.settings.upload_button_text = this.options.widget.settings.upload_button_text || 'Upload Your Photo';
			this.options.widget.settings.all_photos_text    = this.options.widget.settings.all_photos_text || 'See All Photos';
			this.options.widget.settings.see_all_link       = this.options.widget.settings.see_all_link || 2;
			var urlAllPhotos = '';
			if( this.options.widget.settings.see_all_link == '1'){
				urlAllPhotos = this.options.customerURL;
			}else if( this.options.widget.settings.see_all_link == '2'){
				urlAllPhotos = this.options.galleryURL;
			}else {
				urlAllPhotos = this.options.widget.settings.see_all_link_custom;
			}
			var galleryLink = olapicjQuery("<div/>", {"class":"olapic_uploader"}).appendTo(header);

			olapicjQuery("<a/>", {"href":"", text:"", title: this.options.widget.settings.upload_button_text }).appendTo(upload);
			var upload = olapicjQuery("<div/>", {"class":"olapic_widget_area", "html": this.options.widget.settings.upload_button_text }).appendTo(header);
			olapicjQuery(upload).appendTo(galleryLink);

			olapicjQuery("<a/>", {"href":urlAllPhotos, "target":"_blank", "class":"olapic_view_all_button", html: this.options.widget.settings.all_photos_text }).appendTo(galleryLink);
			var main = olapicjQuery("<div/>", {"id": "widget_main"+this.options.elementId, "class":"olapic_widget_main"});
			var loading = olapicjQuery('<div />', {"id": "loader_"+this.options.elementId, "class":"olapicloading"});
			olapicjQuery(main).append(loading);
			//Footer
			var footer = olapicjQuery("<div/>", {"class":"olapic_widget_footer olapic_base_copyright"});
			var copy = olapicjQuery("<p/>", { "class": "copyright"});
			olapicjQuery("<a/>", { "href":"https://www.olapic.com/", "text":"[?]", "class":"no-icon", "target": "_blank"}).appendTo(copy);
			olapicjQuery(copy).appendTo(footer);

			//Append to container
			header.appendTo(container);
			if(this.options.widget !== null && this.options.widget.settings.custom_html !== undefined){
				this.options.widget.settings.custom_html = (this.options.hashtags.length > 0) ? this.options.widget.settings.custom_html.replace(/\{\$hashtags\}/g, this.options.hashtags.toString()) : this.options.widget.settings.custom_html;
				this.options.widget.settings.custom_html = this.options.widget.settings.custom_html.replace(/\{\$galleryName\}/g, this.options.galleryName);
				olapicjQuery("<div/>", {"class":"olapic_custom_html_box", "html":this.options.widget.settings.custom_html}).appendTo(container);
			}
			var mainwrapper = olapicjQuery("<div/>", {"class":"olapic_widget_mainwrapper", "id":this.options.elementId+"_widget_mainwrapper"});
			main.appendTo(mainwrapper);
			mainwrapper.appendTo(container);
			olapicjQuery("#"+this.options.elementId+"slider").height(olapicjQuery("#"+this.options.elementId+"slider li:first").outerHeight(true));

			footer.appendTo(container);

			return;
		};
		olapicWidget.prototype.makeslider = function(){
			//Content
			var thumbnailheight = this.options.widget.settings.thumbnail_size;
			var thumbnailSize = this.options.widget.settings.img_size;
			var main = olapicjQuery("#widget_main"+this.options.elementId);
			var nopicture,theanchor, pictures = '';
			var instance = this;
			var media = {};

			if(this.options.photos.length > 0){
				pictures = olapicjQuery("<ul/>", {"class":"olapic_carousel", "id":this.options.elementId+"slider" });
				for (var i = 0; i < this.options.photos.length; i++) {
					media = i;
					li = olapicjQuery("<li/>", {"class":"item_source_"+this.options.photos[media].source});
					span = olapicjQuery('<span/>', { 'style':'display:none', 'class':'type-'+this.options.photos[media].type, 'html':'<i class="olapic-icon-facetime-video"></i>'});
					// media = this.options.photos[i];
					// li = olapicjQuery("<li/>", {"class":"item_source_"+media.source});
					// span = olapicjQuery('<span/>', { 'style':'display:none', 'class':'type-'+media.type, 'html':'<i class="olapic-icon-facetime-video"></i>'});
					picture = olapicjQuery("<img/>", {
						"class":"olapic_ecomm_image img_from_"+this.options.photos[media].source+" olapic_image_thumbnail"+(media == this.options.photos.length -1 ? " last" : "" ),
						"id" :this.options.photos[media].id,
						"src": (this.options.photos[media][thumbnailSize]) ? this.options.photos[media][thumbnailSize] : this.options.photos[media].thumbnail,
						"style": "height: "+thumbnailheight+"px"
					});
					theanchor = olapicjQuery("<a/>", { "href": this.options.photos[media].url+"&widget="+this.options.elementId, "class": "olapicitemlink olapicitem"+this.options.elementId+"-"+this.options.photos[media].id });
					// theanchor = olapicjQuery("<a/>", { "href": media.url+"&widget="+this.options.elementId, "class": "olapicitemlink olapicitem"+this.options.elementId+"-"+media.id });
					olapicjQuery(theanchor).append(span);
					olapicjQuery(theanchor).append(picture);
					olapicjQuery(theanchor).appendTo(li);
					li.appendTo(pictures);
				}
				main.html(pictures);
				olapicjQuery("<a/>", { "href":"#", "class":"carousel-navigation olapic-icon-chevron-" + (this.options.widget.settings.slide_mode == 1 ? 'left' : 'up') }).appendTo(main);
				olapicjQuery("<a/>", { "href":"#", "class":"carousel-navigation olapic-icon-chevron-" + (this.options.widget.settings.slide_mode == 1 ? 'right' : 'down') }).appendTo(main);
			} else {
				olapicjQuery("#"+this.options.elementId).addClass("olapic_slider_empty");
				if(this.options.widget !== null && this.options.widget.settings.custom_default !== undefined && olapicjQuery.trim( this.options.widget.settings.custom_default ) !== ''){
					nopicture = olapicjQuery("<div/>", {"class":"olapic_empty_widget_content", "html": this.options.widget.settings.custom_default});
				}else{
					nopicture = olapicjQuery("<div/>", {"class":"empty_message", "html": "Share your own customer photo"});
				}
				main.html(nopicture);
			}
			//Actions
			if(this.options.photos.length > 0){
				olapicjQuery("#"+instance.options.elementId+"slider").createSlide({'infinite':this.options.widget.settings.infinite, 'itemsWidth':thumbnailheight, 'slide_mode':this.options.widget.settings.slide_mode, 'auto_play':this.options.widget.settings.auto_play, 'interval':this.options.widget.settings.interval, 'items_count':this.options.widget.settings.items_count, 'duration':this.options.widget.settings.duration});
				olapicjQuery("#"+instance.options.elementId+" .carousel-navigation").live('click', function(event){
					if(olapicjQuery(this).hasClass('olapic-icon-chevron-right') || olapicjQuery(this).hasClass('olapic-icon-chevron-down')){
						olapicjQuery("#"+instance.options.elementId+"slider").data('olapicSlide').doMoveNext();
					}else{
						olapicjQuery("#"+instance.options.elementId+"slider").data('olapicSlide').doMovePrev();
					}
					olapicGoogleTracker.trackEvent({'category':'OlapicSlideWidget', 'event':'SliderMorePhotos', 'label': instance.options.ga_Client});
					instance._tracker.track({'event':'WIDGET_SLIDER_MOVE', 'extra':{ 'dir': olapicjQuery(this).hasClass('olapic-icon-chevron-right')?'r':'l', 'wId':instance.options.widget.id, 'pics':instance.options.photos.length}, 'object_id': instance.options.galleryId });

					return false;
				});
			}

			olapicjQuery("#"+instance.options.elementId+" .olapic_widget_area").click(function(e){
				olapicGoogleTracker.trackEvent({'category':'OlapicSlideWidget', 'event':'UploadButton', 'label': instance.options.ga_Client});
				instance._tracker.track({'event':'WIDGET_UPLOAD_BUTTON', 'extra': {'wId':instance.options.widget.id}, 'object_id': instance.options.galleryId });
				instance.loadUploadWindow(e);
			});
			olapicjQuery("#"+instance.options.elementId+"slider .olapic_image_thumbnail").click(function(e){
				olapicGoogleTracker.trackEvent({'category':'OlapicSlideWidget', 'event':'MediaClick', 'label': instance.options.ga_Client});
				instance._tracker.track({'event':'WIDGET_PHOTO_CLICK', 'extra': {'wId':parseInt(instance.options.widget.id, 10), 'gId':parseInt(instance.options.galleryId, 10), 'pics':instance.options.photos.length}, 'object_id': olapicjQuery(this).attr('id')});
				instance.loadViewer(e, olapicjQuery(this).attr("id"));
			});
			olapicjQuery("#"+instance.options.elementId+"slider .olapic_view_all_button").click(function(event){
				olapicGoogleTracker.trackEvent({'category':'OlapicSlideWidget', 'event':'ViewAllPhotos', 'label': instance.options.ga_Client});
				instance._tracker.track({'event':'WIDGET_VIEW_ALL', 'extra': {'wId':instance.options.widget.id, 'pics':instance.options.photos.length}, 'object_id': instance.options.galleryId });
			});
			olapicjQuery("#"+instance.options.elementId+"slider .no-icon").click(function(event){
				olapicGoogleTracker.trackEvent({'category':'OlapicSlideWidget', 'event':'PoweredByOlapic', 'label': instance.options.ga_Client});
				instance._tracker.track({'event':'WIDGET_POWERED_BY', 'extra': {'wId':instance.options.widget.id}, 'object_id': instance.options.galleryId });
			});
			olapicjQuery("#"+instance.options.elementId+"slider .olapicitemlink").click(function(e){ e.preventDefault(); e.stopPropagation(); });
			// Gestures
			if(olapicjQuery.browser.mobile){
				var swipeOptions = {
					excludedElements:".noSwipe",
					tap:function(event, element) {
						olapicGoogleTracker.trackEvent({'category':'OlapicSlideWidget', 'event':'MediaClick', 'label': instance.options.ga_Client});
						instance._tracker.track({
							'event':'WIDGET_PHOTO_CLICK',
							'extra': {
								'wId':parseInt(instance.options.widget.id, 10),
								'gId':parseInt(instance.options.galleryId, 10),
								'pics':instance.options.photos.length,
							},
							'object_id': olapicjQuery(element).attr('id'),
						});
						instance.loadViewer(event, olapicjQuery(element).attr("id"));
					},
					allowPageScroll:"auto"
				};
				if(instance.options.widget.settings.slide_mode == 1){
					//horizontal
					swipeOptions.swipeLeft = function(e,d) { olapicjQuery("#"+instance.options.elementId+"slider").data('olapicSlide').doMoveNext(); };
					swipeOptions.swipeRight = function(e,d) { olapicjQuery("#"+instance.options.elementId+"slider").data('olapicSlide').doMovePrev(); };
				}else{
					//vertical
					swipeOptions.swipeUp = function(e,d) { olapicjQuery("#"+instance.options.elementId+"slider").data('olapicSlide').doMoveNext(); };
					swipeOptions.swipeDown = function(e,d) { olapicjQuery("#"+instance.options.elementId+"slider").data('olapicSlide').doMovePrev(); };
				}
				olapicjQuery("#"+instance.options.elementId+"slider").swipe(swipeOptions);
			}
			instance.checkOpi();
		};
		olapicWidget.prototype.checkOpi = function(){
			var reg = new RegExp('^#opi([0-9]+)$');
			var test = reg.exec(window.location.hash);
			if(test){
				if(typeof this.checkOpiVar === 'undefined'){
					this.loadViewer(null, test[1]);
					this.checkOpiVar = true;
				}
			}
		};
		olapicWidget.prototype.afterRender = function(){
			//moved
		};
	});
olapicRequire.define("Magic/widget_olapic_slide", function(){});

/*! olapicWidget Objects */
function olapicWidget(){ this.inprocess = false; return this; }

	var olapicWidgetModules = [];
	olapicWidgetModules.push('Magic/commons');
	olapicWidgetModules.push('Magic/olapic.googleTracker');

	olapicWidgetModules.push('Magic/facebox');
	olapicWidgetModules.push('Magic/olapic.lightboxViewer');
	olapicWidgetModules.push('Magic/commons');
	// olapicWidgetModules.push('Magic/olapic.uploader');

	olapicRequire.define("Magic/olapic.widgets",olapicWidgetModules, function () {

		olapicWidget.prototype.init = function(options) {
			//set options.settings as object
			this.options = options;
			this.wIndex = '';
			this.options.widget = (typeof this.options.widget == 'object' && this.options.widget !== null) ? this.options.widget : {};
			this.options.widget.settings = this.options.widget.settings || {};
			this.options.staticCdnURL = olapicPathsDomains.replace('static/js/', '');
			if (window.XDomainRequest) { OlapicCommons.IEAjaxFixes(); }
			this.renderWidget = true;

			// A/B testing based on the cookies
			if (this.options.ab_testing === 1){
				this.abCookie = OlapicCommons.readCookie('__pr_AB_testing');
				if(this.abCookie === null || this.abCookie === ''){
					var abCookie = Math.floor(Math.random() * 2);
					OlapicCommons.createCookie('__pr_AB_testing', abCookie, 30 );
					this.abCookie = abCookie;
					OlapicCommons.regenerateUniqueCookie();
				}
				this.renderWidget = (this.abCookie === "0");
			}
			if( this.renderWidget === true ){
				this.initVars();
				this.prepareurls();
				this.loadCSS();
				this.render();
				this.afterRender();
				this.extendsCalls();

				// viewer handler
				this.olapicviewerHandler = null;
				if((this.options.initViewer == 1) && (this.options.vieweraddon.search('viewer2') > -1)){
					var viwersettings = this.options;
					viwersettings.site_url = viwersettings.siteurl;
					viwersettings.owner = viwersettings.ownerdir;
					viwersettings.fromwidget = true;
					viwersettings.widget_object = this.options.widget;
					this.olapicviewerHandler = new olapicjQuery.olapicViewer(viwersettings);
				}

				// uploader handler
				this.olapicUploader2Handler = null;
				if(this.options.uploaderaddon == 'uploader2'){
					var uploadersettings = this.options;
					uploadersettings.site_url = uploadersettings.siteurl;
					uploadersettings.owner = uploadersettings.ownerdir;
					uploadersettings.fromwidget = true;
					this.olapicUploader2Handler = new olapicjQuery.olapicUploader2(uploadersettings);
				}
			}

			// init olapic tracker
			this._tracker = new OlapicTracker();
			this._tracker.init({
				_api_url: this.options.olapic_api_url,
				_api_key: this.options.olapic_api_key,
				_olapic_u: this.options.olapic_u
			});

			//google tracker
			olapicGoogleTracker.create();
			olapicGoogleTracker.trackPageView({'partner':this.options.ga_Client, 'section':'Widget', 'page':'Widget'});

			// __olapicU Cookie
			if(this.options.olapic_u === 1){
				OlapicCommons.uniqueCookie();
				var olapic_u = OlapicCommons.readCookie('__olapicU');
				var hit_event = this.options.widgetype == 'olapic_wall' ? 'WIDGET_WALL_RENDERED' : 'WIDGET_RENDERED';
				var object_id = (this.options.galleryId === 0) ? this.options.categoryId : this.options.galleryId;
				var hitExtras = {
					'widget_config' : this.options.widget.id,
					'automator' : (this.options.fromautomator === undefined || this.options.fromautomator === 0) ? 0 : 1,
					'tag_based' : (this.options.tag_based === undefined || this.options.tag_based === 0) ? 0 : 1,
					'with_photos' : (this.options.with_photos === undefined || this.options.with_photos === 0) ? 0 : 1
				};
				var args = {
					'event': hit_event,
					'extra': hitExtras,
					'object_id': object_id

				};
				if(this.abCookie !== undefined){
					args.ab_testing = this.abCookie;
				}
				this._tracker.track(args);
			}
		};
		olapicWidget.prototype.setIndex = function(wIndex){
			this.wIndex = wIndex;
		};
		olapicWidget.prototype.getIndex = function(){
			return this.wIndex;
		};
		olapicWidget.prototype.createCss = function(cssurl){
			if(cssurl === '' || cssurl === undefined) return;
			olapicCSS = document.createElement("link");
			olapicCSS.type = "text/css";
			olapicCSS.href = cssurl;
			olapicCSS.rel = "stylesheet";
			olapicCSS.charset = "UTF-8";
			document.getElementsByTagName("head")[0].appendChild(olapicCSS);
		};
		olapicWidget.prototype.createCssInline = function(cssText){
			if(cssText === '' || cssText === undefined) return;
			if(olapicjQuery.browser.msie && parseInt(olapicjQuery.browser.version, 10) === 8){
				olapicjQuery('<style id="olapic_custom_css_widgets_'+this.options.widget.id+'"></style>').appendTo('head');
				olapicjQuery("#olapic_custom_css_widgets_"+this.options.widget.id).prop('styleSheet').cssText=cssText;
			} else {
				specificCSS = document.createElement('style');
				specificCSS.type = 'text/css';
				if (specificCSS.styleSheet) specificCSS.styleSheet.cssText = cssText;
				else specificCSS.appendChild(document.createTextNode(cssText));
				document.getElementsByTagName("head")[0].appendChild(specificCSS);
			}
		};
		olapicWidget.prototype.loadCSS = function() {
			if((this.options.widget !== null) && (this.options.widget.settings.css !== '')){
				this.createCssInline( this.options.widget.settings.css );
			}else{
				for(thecss=0; thecss<this.css.length; thecss++){
					this.createCss(this.css[thecss]);
				}
				if(navigator.appName == 'Microsoft Internet Explorer'){
					for(thecss=0; thecss<this.css.length; thecss++){
						this.createCss(this.cssIE[thecss]);
					}
				}
			}
		};
		olapicWidget.prototype.prepareurls = function(){
			var url = this.options.widget_url;
			url = url.replace('/widget/', '');
			for(var x in this.css){
				this.css[x] = (url+this.css[x]).replace('#widgetStyle#', this.options.widgetstyle);
			}
			x = '';
			for(x in this.cssIE){
				this.cssIE[x] = url+this.cssIE[x];
			}
		};
		olapicWidget.prototype.extendsCalls = function(){
			var callback = this.options.elementId;
			callback = 'olapicAfterWidget_'+callback.replace('olapic-widget-', '');
			window.settings = window.settings || {};
			window.settings.functionName = callback;
			var fn = window[settings.functionName];
			if(typeof fn === 'function') {
				fn();
			}
		};
		olapicWidget.prototype.loadUploadWindow = function(event){
			event.preventDefault();
			var instance = this;

			var url = this.options.siteurl;

			url +='/uploader/' + this.options.ownerdir + "?gallery=" + this.options.galleryId + "&customer_id=" + this.options.customerId;
			if(this.options.widget !== null) url += "&widget_config="+this.options.widget.id;
			url += "&lang="+this.options.lang;
			url += "&context=";

			if(olapicjQuery.browser.mobile){
				url +='mobile';
				window.open(url, "olapic_widget_popup");
			}else{
				var sizes = {h: 500, w: 760};
				var wheight = olapicjQuery(window).height();
				var wwidth = olapicjQuery(window).width();
				if(wwidth <= 400){
					sizes.h = 440;
					sizes.w = 320;
				}else if(wwidth <= 768){
					sizes.h = 720;
					sizes.w = 960;
				}
				OlapicCommons.openUploader({iframe: url, height: sizes.h, width: sizes.w, uploaderaddon: this.options.uploaderaddon}, instance.olapicUploader2Handler);
			}
		};
		olapicWidget.prototype.loadViewer = function(event, imageid){
			if((typeof event !== 'undefined') && (event !== null)) event.preventDefault();
			var instance = this;
			var url = OlapicCommons.viewerLink({
				'siteurl': instance.options.site_url || instance.options.siteurl,
				'ownerdir': instance.options.ownerdir,
				'mediaid': imageid,
				'vieweraddon': instance.options.vieweraddon,
				'extras': "widget="+instance.options.elementId+"&context=widget&lang="+instance.options.lang
			});
			var vieweroptions = {
				url: url,
				height: instance.options.popheight,
				width: instance.options.popwidth,
				vieweraddon: instance.options.vieweraddon,
				mediaid: imageid,
				forceViewerModal:instance.options.forceViewerModal,
				forceViewerModalSameTab: instance.options.forceViewerModalSameTab,
				widgetId: this.options.widget.id,
				categoryId: this.options.categoryId,
				galleryId: this.options.galleryId
			};
			if(olapicjQuery.browser.mobile){
				if((instance.options.vieweraddon == 'viewer1') || (instance.options.forceViewerModal === false)){
					if(instance.options.forceViewerModalSameTab){
						window.open(url, "_self");
					} else {
						window.open(url, "olapic_widget_viewer");
					}
				}else{
					instance.openViewerControl(olapicjQuery('#olapic-viewer'));
					OlapicCommons.openViewer(vieweroptions, instance.olapicviewerHandler);
					olapicjQuery(document).bind('afterClose.olapicLightbox', function(){
						instance.closeViewerControl(olapicjQuery('#olapic-viewer'));
					});
				}
			}else{
				if(instance.options.vieweraddon.search('viewer2') > -1){
					instance.openViewerControl(olapicjQuery('#olapic-viewer'));
					OlapicCommons.openViewer(vieweroptions, instance.olapicviewerHandler);
					olapicjQuery(document).bind('afterClose.olapicLightbox', function(){
						instance.closeViewerControl(olapicjQuery('#olapic-viewer'));
					});
				}else{
					instance.openViewerControl(olapicjQuery('#faceboxframe'));
					OlapicCommons.openViewer(vieweroptions, instance.olapicviewerHandler);
					olapicjQuery(document).bind('afterClose.facebox', function(){
						instance.closeViewerControl(olapicjQuery('#faceboxframe'));
					});
				}
			}
		};
		olapicWidget.prototype.openViewerControl = function(viewer){
			viewer.data('popclosed', false);
			viewer.data('closedfromstash', false);
			olapicjQuery('body').data('historycount', 0);
		};
		olapicWidget.prototype.closeViewerControl = function(viewer){
			if(!olapicjQuery.browser.mobile){
				if(viewer.data('closedfromstash') !== true){
					var historycount = parseInt( olapicjQuery('body').data('historycount'), 0 );
					historycount = (olapicjQuery.browser.msie) ? historycount-1 : historycount;
					if( historycount > 0){
						window.history.go((-1 * historycount));
						olapicjQuery('body').data('historycount', 0);
					}
				}
				viewer.data('popclosed', true);
			}
		};
		olapicWidget.prototype.afterRenderCallback = function(){
			if(typeof window.settings == 'object'){
				window.settings.functionName = 'olapicAfterWidgetRender';
			}else{
				window.settings = {
					functionName: 'olapicAfterWidgetRender'
				};
			}
			var fn = window[settings.functionName];
			if(typeof fn === 'function') {
				fn(this.options);
			}
		};
		olapicWidget.prototype.sendImageStatus = function(imagedata) {
			imagedata = imagedata || {
				id: 0,
				imagesize: 'normal',
				status: '200',
				src : ''
			};
			imagedata.src = encodeURIComponent(imagedata.src);
			if(imagedata.status == '404'){
				this._tracker.reportImage(imagedata);
			}

		};

		olapicWidget.prototype.checkCookie = function(){
			var allCookies = document.cookie.replace(' ', '');
			allCookies = allCookies.split(';');
			var notCookie = false;
			for (var i = 0; i < allCookies.length; i++) {
				if (allCookies[i].indexOf('analytics_id') !== -1) {
					notCookie = true;
				}
			}
			if(notCookie === false){
				var urltopost = this.options.widget_url;
				urltopost += (urltopost.search('local.') >= 1) ? '/widget': '';
				urltopost += '/nocookies?customer_id='+this.options.customerId;
				OlapicCommons.olapicSetCookies(urltopost, {'element_id':this.options.elementId});
			}
		};
		olapicWidget.prototype.callAPI = function(apiurl, data){
			var _self = this;
			return olapicjQuery.Deferred(function(dfd) {
				if(_self.inprocess) dfd.fail();
				if(olapicjQuery.browser.msie && window.XDomainRequest) {
					// Use Microsoft XDR
					var xdr = new XDomainRequest();
					xdr.open("get", apiurl);
					xdr.onload = function () {
						var JSON = olapicjQuery.parseJSON(xdr.responseText);
						if (JSON === null || typeof (JSON) == 'undefined'){
							JSON = olapicjQuery.parseJSON(data.firstChild.textContent);
						}
						_self.inprocess = false;
						data.func(JSON, data.obj);
						dfd.resolve();
					};
					xdr.onprogress = function(){ };
					xdr.ontimeout = function(){ };
					xdr.onerror = function () { dfd.fail(); };
					setTimeout(function(){
						xdr.send();
					}, 0);
				}else{
					olapicjQuery.ajax({
						url: apiurl,
						dataType: 'json',
						method: 'GET',
						success: function(e){
							_self.inprocess = false;
							data.func(e, data.obj);
							dfd.resolve();
						},
						error: function(jqXHR, textStatus, errorThrown){
							dfd.fail();
						}
					});
				}
			});
		};
	});

olapicRequire.define("Magic/olapic.widgets", function(){});

/*! lightbox Object */
	olapicRequire.define("Magic/olapic.lightboxViewer",['Magic/hogan', 'Magic/commons', 'Magic/videojs', 'Magic/videojs.youtube', 'Magic/olapic.viewerSlide'], function () {
		(function($) {
			olapicjQuery.olapicViewer = function(options) {
				this.options = {viewerUrl: '', height: 500, width: 600, fromwidget:false, preloadImage: false, lang:'en_US', mode:0};
				olapicjQuery.extend(this.options , options);
				this.currentData = {photoID:0, customer: 0};
				this.options.preloadImage = false;
				this.options.viewerUrl = this.options.site_url+'/viewer/'+this.options.owner+'/'+(this.options.fromwidget ? '?fromwidget=1&lang='+this.options.lang:'');
				this.viewerdata = {};
				this._tracker = new OlapicTracker();
				this._tracker.init({
					_api_url: this.options.olapic_api_url,
					_api_key: this.options.olapic_api_key,
					_olapic_u: this.options.olapic_u
				});
				this.ready = false;
				this.viewerCalled = false;
				this.widgetElementID = (this.options.fromwidget) ? this.options.elementId : false;
				var _self = this;
				if(typeof window.settings == 'object'){
					window.settings.viewer2preLoadCallback = 'olapicPreLoadFunction';
					window.settings.viewer2postLoadCallback = 'olapicPostLoadFunction';
					window.settings.viewer2closeCallback = 'olapicViewer2CloseFunction';
				}else{
					window.settings = {
						viewer2preLoadCallback: 'olapicPreLoadFunction',
						viewer2postLoadCallback: 'olapicPostLoadFunction',
						viewer2closeCallback: 'olapicViewer2CloseFunction'
					};
				}
				this.init = function(){

					if(olapicjQuery('#olapic_viewer_overlay').length === 0){
						olapicjQuery('body').append(olapicjQuery('<div />', {'id':'olapic_viewer_overlay', 'class':'olapic-viewer-overlay'}).hide());
						olapicjQuery('#viewer-columns').click(function(e){ e.stopPropagation(); });
						this.options.widget_object = (typeof this.options.widget_object == 'undefined') ? null : this.options.widget_object;
					}
					olapicjQuery('#olapic_viewer_overlay').unbind('click');
					olapicjQuery('#olapic_viewer_overlay').click(function(e){e.stopPropagation(); _self.close();});
					olapicjQuery.when(_self.loadData())
					.done(function(){
						_self.initTemplates(_self);
						_self.addStyleslinks(_self.viewerdata.styleslinks);
						_self.addStyles(_self.viewerdata.styles);
						_self.createViewer();
						olapicjQuery(document).trigger('controlViewerCalled.olapicLightbox');
						_self.updateOtherViewers();
					})
					.fail(function(){
						_self.debug('Fail to load viewer '+(_self.options.inprocess ? '(inprocess) ':'')+_self.options.viewerUrl);
					});
					if(olapicjQuery.browser.mobile){
						window.addEventListener("orientationchange", function() {
						_self.centerViewer();
						}, false);
					}else{
						if(!window.addEventListener){
							//fix for IE8
							window.attachEvent("resize", function() {
								// Get screen size (inner/outerWidth, inner/outerHeight)
								_self.centerViewer();	
							});
						}else{
							// Listen for resize changes
							window.addEventListener("resize", function() {
								// Get screen size (inner/outerWidth, inner/outerHeight)
								_self.centerViewer();	
							}, false);	
						}
					}
					
				};

				this.addArrows = function(viewer){
					var template = '';
					if(viewer.search('viewer-prev') == -1){
						template = '<div id="viewer-wrapper" class="viewer-wrapper">';
						template += '<div class="viewer-previous"><a href="javascript:void(0)" id="viewer-prev"><i class="olapic-icon-chevron-left"></i></a></div>';
						template += '<div class="viewer-next"><a href="javascript:void(0)" id="viewer-next"><i class="olapic-icon-chevron-right"></i></a></div>';
						template += viewer +'</div>';
						if(viewer.search('closeViewer') == -1){
							template = template.replace('class="viewer-col-right" id="viewer-column-right">', 'class="viewer-col-right" id="viewer-column-right"><a class="viewer-close" href="javascript:void(0)" id="closeViewer"><i class="olapic-icon-remove"></i></a>');
						}
						//sandboxmode
						if(_self.options.mode == 2){
							template = template.replace('<div class="featured-photo">', '<div class="featured-photo"><div style="position: absolute; background: rgba(255, 255, 255, .6); padding: 8px; font-size: 10px; -webkit-border-bottom-right-radius: 3px; -moz-border-radius-bottomright: 3px; border-bottom-right-radius: 3px;">SandboxMode</div>');
						}
					}else{
						template = viewer;
					}
					return template;
				};

				this.createViewer = function(){
					olapicjQuery('#olapic_viewer_overlay').append(olapicjQuery('<div />', {'id':'olapic_viewer', 'class':'olapic_viewer-wrapper'}));
				};

				this.urlGetData = function(photoid){
					var url = _self.options.viewerUrl;
					if(typeof photoid !== 'undefined'){
						if(photoid.search(/\?/) > -1){
							var parts = photoid.split('?');
							url = url + parts[0] +'/getdata/' + '?' + parts[1]+ ( (_self.options.mode == 2) ? '&t='+(Math.floor(Math.random()*11)) :'' );
						}else{
							url += photoid + '/getdata/'+ ( (_self.options.mode == 2) ? '?t='+(Math.floor(Math.random()*11)) :'' ) ;
						}
					}
					return url;	
				};

				this.loadData = function(photoid){
					return olapicjQuery.Deferred(
						function(dfd) {
							if(_self.options.inprocess) dfd.fail();

							_self.options.inprocess = true;
							var url2go = _self.urlGetData(photoid);
							if (olapicjQuery.browser.msie && window.XDomainRequest) {
								// Use Microsoft XDR
								var xdr = new XDomainRequest();
								xdr.open("get", url2go);
								xdr.onload = function () {
									var JSON = olapicjQuery.parseJSON(xdr.responseText);
									if (JSON === null || typeof (JSON) == 'undefined'){
										JSON = olapicjQuery.parseJSON(data.firstChild.textContent);
									}
									_self.options.inprocess = false;
									_self.lastdata = JSON;
									dfd.resolve();
								};
								xdr.onprogress = function(){ };
								xdr.ontimeout = function(){ };
								xdr.onerror = function () { dfd.fail(); };
								setTimeout(function(){
									xdr.send();
								}, 0);
							}else{
								olapicjQuery.ajax({
									url: url2go,
									dataType: 'json',
									method: 'GET',
									success: function(e){
										_self.options.inprocess = false;
										_self.lastdata = e;
										dfd.resolve();
									},
									error: function(jqXHR, textStatus, errorThrown){
										dfd.fail();
									}
								});
							}
						}
					).promise();
				};

				this.addStyleslinks = function(links){
					var cssurl = '';
					for(x=0; x<links.length; x++){
						cssurl = links[x];
						if(cssurl === '' || cssurl == 'undefined') return;
						olapicCSS = document.createElement("link");
						olapicCSS.type = "text/css";
						olapicCSS.href = cssurl;
						olapicCSS.rel = "stylesheet";
						olapicCSS.charset = "UTF-8";
						document.getElementsByTagName("head")[0].appendChild(olapicCSS);
					}
				};

				this.addStyles = function(stylestext){
					if(olapicjQuery.browser.msie && parseInt(olapicjQuery.browser.version, 10) === 8){
						olapicjQuery('<style id="olapic_custom_css"></style>').appendTo('head'); 
						olapicjQuery("#olapic_custom_css").prop('styleSheet').cssText=stylestext;
					} else {
						var specificCSS = document.createElement('style');
						specificCSS.type = 'text/css';
						if (specificCSS.styleSheet) specificCSS.styleSheet.cssText = stylestext;
						else specificCSS.appendChild(document.createTextNode( stylestext ));
						document.getElementsByTagName("head")[0].appendChild(specificCSS);
					}
				};

				this.loadViewer = function(options){
					if(_self.ready === false){
						_self.viewerCalled = options;
						olapicjQuery(document).bind('controlViewerCalled.olapicLightbox', function(){
							_self.loadViewer(_self.viewerCalled);
						});
					}else{
						photoid = options.url.split('/');
						photoid = photoid.pop();
						olapicjQuery('#olapic_viewer_overlay').fadeIn(300);
						_self.preLoadCallback();
						olapicjQuery.when(_self.loadData(photoid))
						.done(function(){
							if(_self.lastdata.response === false){
								_self.updateEmptyViewer(_self.lastdata);
							}else{
								_self.imagedata = _self.lastdata.photodata;
								_self._tracker.track({'event':'MEDIA_VIEW', 'extra': {}, 'object_id': _self.imagedata.photo_id });
								_self.updateViewer();
								if(_self.options.preloadImage){
									_self.loadimg({
										'src' : _self.imagedata.image_normal,
										'id' : 'img-'+_self.imagedata.photo_id,
										'alt': _self.imagedata.caption
									}, function(instance, theimg) {
										// image loaded OK
									}, function(instance, theimg){
										//fail to load image
										imagedata = {
											id: olapicjQuery(theimg).attr('id').replace('img-', ''),
											imagesize: 'normal',
											status: '404',
											src : encodeURIComponent(theimg.src)
										};
										instance._tracker.reportImage(imagedata);
									});
								}
								olapicjQuery('.author-info').click(function(e){ 
									_self._tracker.track({'event':'EXTERNAL_PHOTO_CLICK', 'extra': {'src' : _self.imagedata.source}, 'object_id': _self.imagedata.photo_id });
								});
							}
						}).fail(function(){
							olapicjQuery('#olapic_viewer_overlay').fadeOut(300);
							_self.debug('Fail to load photo '+(_self.options.inprocess ? '(inprocess) ':'')+photoid);
						});
					}
				};

				this.updateEmptyViewer = function(){
					//img loaded
					var theviewer = '';
					theviewer = _self.hTemplate404.render(_self.imagedata);
					olapicjQuery('#olapic_viewer_overlay').html(theviewer);
					olapicjQuery('.featured-photo').width(612);
						
					var newtop = olapicjQuery(window).scrollTop() + 20;
					olapicjQuery('#viewer-wrapper').css({top:newtop+'px'});
					
					_self.centerViewer();
					olapicjQuery('#viewer-wrapper, #viewer-previous, #viewer-next').click(function(e){e.stopPropagation();});
					olapicjQuery('#olapic_viewer_overlay').unbind('click');
					olapicjQuery('#olapic_viewer_overlay, #olapic_viewer_overlay .viewer-close').click(function(e){ e.preventDefault(); _self.close(); });
					olapicjQuery('#viewer-prev, #viewer-next').click(function(e){ e.preventDefault(); _self.move(this); });
					var imagestoshare = [];
					var v = new OlapicViewer2section({'viewerurl':_self.options.viewerUrl+photoid, 'shareData':{'id':0, 'customer_id':0, 'title':'', 'summary':'', 'url':'', 'images':imagestoshare, 'olapic_api_url':_self.options.olapic_api_url, 'olapic_api_key':_self.options.olapic_api_key}, 'olapic_api_url':_self.options.olapic_api_url, 'olapic_api_key':_self.options.olapic_api_key, 'olapic_u':_self.options.olapic_u, 'widgetobject': _self.options.widget_object});
					v.init();
					var links = null;
					if(_self.options.fromwidget){
						links = OlapicCommons.replaceNavegationWidget(_self.options.elementId, 0, _self.options.ownerdir, _self.options.siteurl, true);
						_self.setNextPrev(links);
					}else if(olapicjQuery('#olapic-viewer .alone').length === 0){
						links = OlapicCommons.replaceNavegationLinks('', true);
						_self.setNextPrev(links);
					}
					olapicjQuery('#main-image').load(function(){
						olapicjQuery('.featured-photo').attr('style', '');
						_self.centerViewer();
					});
					_self.postLoadCallback();
				};

				this.updateViewer = function(){
					//img loaded
					var theviewer = '';
					_self.imagedata.twitteractions = '';
					if((_self.imagedata.tw_actions === true) && (_self.imagedata.tweet_id > 0)){
						_self.imagedata.twitteractions = _self.twActions.render(_self.imagedata);
					}
					theviewer = _self.hTemplate.render(_self.imagedata);
					olapicjQuery('#olapic_viewer_overlay').html(theviewer);
					olapicjQuery('.featured-photo').width(612);
						
					var newtop = olapicjQuery(window).scrollTop() + 20;
					olapicjQuery('#viewer-wrapper').css({top:newtop+'px'});

					//Apppend class name with the widgetElementID if exists more of one widget on the page
					if(_self.widgetElementID){
						olapicjQuery('#viewer-wrapper').addClass('from_widget_' + _self.widgetElementID);
					}
					
					_self.centerViewer();
					olapicjQuery('#viewer-wrapper, #viewer-previous, #viewer-next').click(function(e){e.stopPropagation();});
					olapicjQuery('#olapic_viewer_overlay').unbind('click');
					olapicjQuery('#olapic_viewer_overlay, #olapic_viewer_overlay .viewer-close, #olapic_viewer_overlay .viewer-next, #olapic_viewer_overlay .viewer-previous').click(function(e){ e.preventDefault(); _self.close(); });
					olapicjQuery('#viewer-prev, #viewer-next').click(function(e){ e.preventDefault(); e.stopPropagation(); _self.move(this); });
					var imagestoshare = [];
					imagestoshare.push(_self.imagedata.page_images);
					var v = new OlapicViewer2section({'viewerurl':_self.options.viewerUrl+photoid, 'shareData':{'id':_self.imagedata.photo_id, 'customer_id':_self.imagedata.customer_id, 'title':_self.imagedata.page_title, 'summary':_self.imagedata.page_summary, 'url':_self.imagedata.page_url, 'images':imagestoshare, 'olapic_api_url':_self.options.olapic_api_url, 'olapic_api_key':_self.options.olapic_api_key}, 'olapic_api_url':_self.options.olapic_api_url, 'olapic_api_key':_self.options.olapic_api_key, 'olapic_u':_self.options.olapic_u, 'fromwidget': _self.options.fromwidget, 'widgetobject': _self.options.widget_object, 'parentGalleryId':_self.options.galleryId, 'parentCategoryId':_self.options.categoryId});
					v.init();
					var links =  null;
					if(_self.options.fromwidget){
						links = OlapicCommons.replaceNavegationWidget(_self.options.elementId, _self.imagedata.photo_id, _self.options.ownerdir, _self.options.siteurl, true);
						_self.setNextPrev(links);
					}else if(olapicjQuery('#olapic-viewer .alone').length === 0){
						links = OlapicCommons.replaceNavegationLinks(_self.options.viewerUrl+'/'+_self.imagedata.photo_id, true);
						_self.setNextPrev(links);
					}
					olapicjQuery('#main-image').load(function(){
						olapicjQuery('.featured-photo').attr('style', '');
						_self.centerViewer();
					});
					_self.twitterLinks();
					_self.postLoadCallback();

					// Behavior if the media is a Video
					if((_self.imagedata.source === 'instagram' || _self.imagedata.source === 'vine' || _self.imagedata.source === 'youtube') && _self.imagedata.type === 'video'){
						_self.updateVideoViewer();
					}

					olapicjQuery('#olapic-viewer').addClass('olapic_viewerLang'+_self.options.lang);

				};

				this.loadimg = function(attrs, fload, ferror){
					var instance = this;
					return olapicjQuery.Deferred(
						function(dfd) {
							if(olapicjQuery.browser.ie) attrs.src = attrs.src+ "?" + new Date().getTime();
							var myImge = olapicjQuery("<img />").attr("src",attrs.src);
							olapicjQuery(myImge).attr("id",attrs.id);
							olapicjQuery(myImge).load(function() {
								fload(instance, this);
							}).error(function(){
								ferror(instance, this);
							});
						}
					).promise();
				};

				this.updateVideoViewer = function(){

					//olapicjQuery('#main-image').wrap('<a href="'+_self.imagedata.sourcePermalink+'"  target="_blank"/>');
					olapicjQuery('.featured-photo .type-video').after('<span class="sound-video"><i class="olapic-icon-volume-off"></i></span>');
					olapicjQuery('#main-image').before('<span class="viewer-video-controls" />');
					olapicjQuery('#olapic-viewer .type-video').remove();
					if(_self.imagedata.source == 'youtube'){
						olapicjQuery('.viewer-video-controls').hide();
						olapicjQuery('.report-photo').css({bottom:'2px'});
						olapicjQuery('#main-image').after('<video id="video_viewer_'+_self.imagedata.photo_id+'" class="videoplayer video-js vjs-default-skin" poster="'+_self.imagedata.image_normal+'" width="612" height="612" muted="true"> </video>');
					}else{
						olapicjQuery('#main-image').after('<video id="video_viewer_'+_self.imagedata.photo_id+'" class="videoplayer" poster="'+_self.imagedata.image_normal+'" width="612" height="612" muted="true"><source src="'+_self.imagedata.video_url+'" type="video/mp4" /> </video>');
					}
					olapicjQuery('#main-image').remove();

					var videoOptions = { 
						"controls": true, 
						"autoplay": false, 
						"preload": "auto", 
						"poster":_self.imagedata.image_normal, 
						"muted": true
					};

					if(_self.imagedata.source == 'youtube'){
						videoOptions.techOrder = ["youtube"];
						videoOptions.src = _self.imagedata.video_url;
					}

					window.theplayer = videojs('video_viewer_'+_self.imagedata.photo_id, videoOptions, function(){
						if(_self.imagedata.source == 'youtube'){
							window.theplayer.muted(true);
						}

						// Only apply if is not windows
						if(navigator.appVersion.indexOf("Win") === -1){
							if(olapicjQuery.browser.mozilla) {
								window.theplayer.muted(true);
							}	
						}
					});

					window.theplayer.on('play', function(e) {
						olapicjQuery('#olapic-viewer .viewer-video-controls').hide();
					});
					window.theplayer.on("ended", function(){
						if(!olapicjQuery.browser.mozilla){
							window.theplayer.currentTime(0);
							window.theplayer.pause();
						} else {
							window.theplayer.posterImage.show();
						}
						if(_self.imagedata.source !== 'youtube'){
							olapicjQuery('#olapic-viewer .viewer-video-controls').show();
						}
					});

					// Fix for firefox, to show the poster image on the videos
					if(olapicjQuery.browser.mozilla) {
						olapicjQuery('#viewer-columns').css({'height': '612px'});
						olapicjQuery('.vjs-poster').css({'display':'block', 'margin-top':'0px'});
						if(olapicjQuery('#olapic-viewer .videoplayer p').text() !== ''){
							olapicjQuery('#olapic-viewer .viewer-video-controls').hide();
							olapicjQuery('#olapic-viewer .sound-video').hide();
						}
					}
					
					olapicjQuery('#olapic-viewer .viewer-video-controls').click(function(e){
						e.preventDefault();
						window.theplayer.play();
						olapicjQuery(this).hide();
					});

					olapicjQuery('.sound-video').click(function(e){
						e.preventDefault();
						olapicjQuery(this).children().toggleClass('olapic-icon-volume-up');
						if(olapicjQuery(this).children().hasClass('olapic-icon-volume-up')){
							window.theplayer.muted(false);
						} else {
							window.theplayer.muted(true);
						}
					});
				};

				this.close = function(){
					_self.lastdata = null;
					_self.removeVideoPlayer();
					olapicjQuery('#olapic_viewer_overlay').fadeOut(300);
					olapicjQuery('#viewer-wrapper').remove();
					olapicjQuery(document).trigger('afterClose.olapicLightbox');

					var extras = {'mId': this.currentData.photoID, 'from': encodeURIComponent(window.location.href)};
					if(this.options.fromwidget) {
						extras.wId = parseInt(this.options.widget.id);
						extras.gId = parseInt(this.options.galleryId);
						extras.cId = parseInt(this.options.categoryId);
					}
					_self._tracker.track({'event':'WIDGET_VIEWER_CLOSE', 'extra': extras, 'object_id': this.currentData.photoID});

					var fn = window[settings.viewer2closeCallback];
					if(typeof window[settings.viewer2closeCallback] === 'function') {
						fn(this.options);
					}
				};

				this.removeVideoPlayer = function(){
					if(typeof window.theplayer !== 'undefined'){
						try{_V_('video_viewer_'+_self.imagedata.photo_id).dispose();}catch(err){}
					}
				};

				this.controlViewerCalled = function(){
					_self.loadViewer(_self.viewerCalled);
				};

				this.centerViewer = function(){
					olapicjQuery('#olapic_viewer_overlay').height(olapicjQuery(document).height());
					olapicjQuery('.column-wrapper').width(olapicjQuery('#viewer-column-left').outerWidth(true) + olapicjQuery('#viewer-column-right').outerWidth(true));
				};

				this.setNextPrev = function(data){
					if (typeof data == 'undefined') return;
					olapicjQuery('#viewer-wrapper').removeClass('no-prev-photo no-next-photo');
					if((typeof data == 'undefined') || (data.prevLink === '')) olapicjQuery('#viewer-wrapper').addClass('no-prev-photo');
					if((typeof data == 'undefined') || (data.nextLink === '')) olapicjQuery('#viewer-wrapper').addClass('no-next-photo');
					olapicjQuery('#viewer-prev').attr('href', data.prevLink);
					olapicjQuery('#viewer-next').attr('href', data.nextLink);
				};

				this.move = function(movebtn){
					if(olapicjQuery(movebtn).attr('href') == '#') return;
					var data = olapicjQuery(movebtn).attr('href').split('/');
					var media_id = data.pop();
					var direction = olapicjQuery(movebtn).attr('id') == 'viewer-prev' ? 'prev':'next';
					var extras = {'dir': direction, 'from': encodeURIComponent(window.location.href)};
					this.currentData.photoID = media_id;
					if(this.options.fromwidget) {
						extras.wId = parseInt(this.options.widget.id);
						extras.gId = parseInt(this.options.galleryId);
						extras.cId = parseInt(this.options.categoryId);
					}
					_self.removeVideoPlayer();
					_self.loadViewer({url:olapicjQuery(movebtn).attr('href')});
					_self._tracker.track({'event':'WIDGET_VIEWER_MOVE', 'extra': extras, 'object_id': parseInt(media_id)});
				};

				this.movePrev = function(){
					olapicjQuery('#viewer-prev').click();
				};

				this.moveNext = function(){
					olapicjQuery('#viewer-next').click();
				};

				this.twitterLinks = function(){
					OlapicCommons.prepareTwitterPops('.twitter-action');
				};

				this.debug = function(message){
					if(typeof console == 'object') console.log(message);
				};

				this.preLoadCallback = function(){
					var fn = window[settings.viewer2preLoadCallback];
					if(typeof window[settings.viewer2preLoadCallback] === 'function') {
						fn(this.options);
					}
				};

				this.postLoadCallback = function(){
					var fn = window[settings.viewer2postLoadCallback];
					if(typeof window[settings.viewer2postLoadCallback] === 'function') {
						fn(this.options, this.imagedata);
					}
				};
				//ugly solution
				this.updateOtherViewers = function(){
					if(typeof olapicWidgets !== 'undefined' && typeof olapicWidgets.widgets !== 'undefined'){
						var ws = olapicWidgets.widgets.length;
						for (var i = ws - 1; i >= 0; i--) {
							if((olapicWidgets.widgets[i].options.elementId !== this.options.elementId) && (olapicWidgets.widgets[i].options.initViewer == 1)){
								if(olapicWidgets.widgets[i].olapicviewerHandler !== null) olapicWidgets.widgets[i].olapicviewerHandler.initTemplates(this);
							}
						}
					}
				};

				this.initTemplates = function(instance){
					// if(instance.olapicviewerHandler == null) return;
					// if(this.ready == true) return;

					if(instance.options.fromwidget) this.options.viewerUrl = instance.options.viewerUrl.replace('?fromwidget=1&lang='+instance.options.lang, '');
					this.viewerdata = instance.lastdata;
					this.ready = true;
					
					this.viewerdata.template = instance.addArrows(instance.viewerdata.template);
					this.viewerdata.template404 = instance.addArrows(instance.viewerdata.template404);

					this.twActions = Hogan.compile(instance.viewerdata.tw_actions);
					this.hTemplate = Hogan.compile(instance.viewerdata.template);
					this.hTemplate404 = Hogan.compile(instance.lastdata.template404);
				};

				_self.init();
				olapicjQuery(document).bind('keydown.olapicviewer', function(e) {
					if (e.keyCode == 27) _self.close();
					if (e.keyCode == 37) _self.movePrev();
					if (e.keyCode == 39) _self.moveNext();
					return true;
				});
				return _self;
			};

		})(olapicjQuery);
	});

olapicRequire.define("Magic/olapic.lightboxViewer", function(){});

/*
 *  Copyright 2011 Twitter, Inc.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

var Hogan = {};

    olapicRequire.define("Magic/hogan",function () {


    (function (Hogan, useArrayBuffer) {
      Hogan.Template = function (renderFunc, text, compiler, options) {
        this.r = renderFunc || this.r;
        this.c = compiler;
        this.options = options;
        this.text = text || '';
        this.buf = (useArrayBuffer) ? [] : '';
      }

      Hogan.Template.prototype = {
        // render: replaced by generated code.
        r: function (context, partials, indent) { return ''; },

        // variable escaping
        v: hoganEscape,

        // triple stache
        t: coerceToString,

        render: function render(context, partials, indent) {
          return this.ri([context], partials || {}, indent);
        },

        // render internal -- a hook for overrides that catches partials too
        ri: function (context, partials, indent) {
          return this.r(context, partials, indent);
        },

        // tries to find a partial in the curent scope and render it
        rp: function(name, context, partials, indent) {
          var partial = partials[name];

          if (!partial) {
            return '';
          }

          if (this.c && typeof partial == 'string') {
            partial = this.c.compile(partial, this.options);
          }

          return partial.ri(context, partials, indent);
        },

        // render a section
        rs: function(context, partials, section) {
          var tail = context[context.length - 1];

          if (!isArray(tail)) {
            section(context, partials, this);
            return;
          }

          for (var i = 0; i < tail.length; i++) {
            context.push(tail[i]);
            section(context, partials, this);
            context.pop();
          }
        },

        // maybe start a section
        s: function(val, ctx, partials, inverted, start, end, tags) {
          var pass;

          if (isArray(val) && val.length === 0) {
            return false;
          }

          if (typeof val == 'function') {
            val = this.ls(val, ctx, partials, inverted, start, end, tags);
          }

          pass = (val === '') || !!val;

          if (!inverted && pass && ctx) {
            ctx.push((typeof val == 'object') ? val : ctx[ctx.length - 1]);
          }

          return pass;
        },

        // find values with dotted names
        d: function(key, ctx, partials, returnFound) {
          var names = key.split('.'),
              val = this.f(names[0], ctx, partials, returnFound),
              cx = null;

          if (key === '.' && isArray(ctx[ctx.length - 2])) {
            return ctx[ctx.length - 1];
          }

          for (var i = 1; i < names.length; i++) {
            if (val && typeof val == 'object' && names[i] in val) {
              cx = val;
              val = val[names[i]];
            } else {
              val = '';
            }
          }

          if (returnFound && !val) {
            return false;
          }

          if (!returnFound && typeof val == 'function') {
            ctx.push(cx);
            val = this.lv(val, ctx, partials);
            ctx.pop();
          }

          return val;
        },

        // find values with normal names
        f: function(key, ctx, partials, returnFound) {
          var val = false,
              v = null,
              found = false;

          for (var i = ctx.length - 1; i >= 0; i--) {
            v = ctx[i];
            if (v && typeof v == 'object' && key in v) {
              val = v[key];
              found = true;
              break;
            }
          }

          if (!found) {
            return (returnFound) ? false : "";
          }

          if (!returnFound && typeof val == 'function') {
            val = this.lv(val, ctx, partials);
          }

          return val;
        },

        // higher order templates
        ho: function(val, cx, partials, text, tags) {
          var compiler = this.c;
          var options = this.options;
          options.delimiters = tags;
          var text = val.call(cx, text);
          text = (text == null) ? String(text) : text.toString();
          this.b(compiler.compile(text, options).render(cx, partials));
          return false;
        },

        // template result buffering
        b: (useArrayBuffer) ? function(s) { this.buf.push(s); } :
                              function(s) { this.buf += s; },
        fl: (useArrayBuffer) ? function() { var r = this.buf.join(''); this.buf = []; return r; } :
                               function() { var r = this.buf; this.buf = ''; return r; },

        // lambda replace section
        ls: function(val, ctx, partials, inverted, start, end, tags) {
          var cx = ctx[ctx.length - 1],
              t = null;

          if (!inverted && this.c && val.length > 0) {
            return this.ho(val, cx, partials, this.text.substring(start, end), tags);
          }

          t = val.call(cx);

          if (typeof t == 'function') {
            if (inverted) {
              return true;
            } else if (this.c) {
              return this.ho(t, cx, partials, this.text.substring(start, end), tags);
            }
          }

          return t;
        },

        // lambda replace variable
        lv: function(val, ctx, partials) {
          var cx = ctx[ctx.length - 1];
          var result = val.call(cx);

          if (typeof result == 'function') {
            result = coerceToString(result.call(cx));
            if (this.c && ~result.indexOf("{\u007B")) {
              return this.c.compile(result, this.options).render(cx, partials);
            }
          }

          return coerceToString(result);
        }

      };

      var rAmp = /&/g,
          rLt = /</g,
          rGt = />/g,
          rApos =/\'/g,
          rQuot = /\"/g,
          hChars =/[&<>\"\']/;


      function coerceToString(val) {
        return String((val === null || val === undefined) ? '' : val);
      }

      function hoganEscape(str) {
        str = coerceToString(str);
        return hChars.test(str) ?
          str
            .replace(rAmp,'&amp;')
            .replace(rLt,'&lt;')
            .replace(rGt,'&gt;')
            .replace(rApos,'&#39;')
            .replace(rQuot, '&quot;') :
          str;
      }

      var isArray = Array.isArray || function(a) {
        return Object.prototype.toString.call(a) === '[object Array]';
      };

    })(typeof exports !== 'undefined' ? exports : Hogan);

    (function (Hogan) {
      // Setup regex  assignments
      // remove whitespace according to Mustache spec
      var rIsWhitespace = /\S/,
          rQuot = /\"/g,
          rNewline =  /\n/g,
          rCr = /\r/g,
          rSlash = /\\/g,
          tagTypes = {
            '#': 1, '^': 2, '/': 3,  '!': 4, '>': 5,
            '<': 6, '=': 7, '_v': 8, '{': 9, '&': 10
          };

      Hogan.scan = function scan(text, delimiters) {
        var len = text.length,
            IN_TEXT = 0,
            IN_TAG_TYPE = 1,
            IN_TAG = 2,
            state = IN_TEXT,
            tagType = null,
            tag = null,
            buf = '',
            tokens = [],
            seenTag = false,
            i = 0,
            lineStart = 0,
            otag = '{{',
            ctag = '}}';

        function addBuf() {
          if (buf.length > 0) {
            tokens.push(new String(buf));
            buf = '';
          }
        }

        function lineIsWhitespace() {
          var isAllWhitespace = true;
          for (var j = lineStart; j < tokens.length; j++) {
            isAllWhitespace =
              (tokens[j].tag && tagTypes[tokens[j].tag] < tagTypes['_v']) ||
              (!tokens[j].tag && tokens[j].match(rIsWhitespace) === null);
            if (!isAllWhitespace) {
              return false;
            }
          }

          return isAllWhitespace;
        }

        function filterLine(haveSeenTag, noNewLine) {
          addBuf();

          if (haveSeenTag && lineIsWhitespace()) {
            for (var j = lineStart, next; j < tokens.length; j++) {
              if (!tokens[j].tag) {
                if ((next = tokens[j+1]) && next.tag == '>') {
                  // set indent to token value
                  next.indent = tokens[j].toString()
                }
                tokens.splice(j, 1);
              }
            }
          } else if (!noNewLine) {
            tokens.push({tag:'\n'});
          }

          seenTag = false;
          lineStart = tokens.length;
        }

        function changeDelimiters(text, index) {
          var close = '=' + ctag,
              closeIndex = text.indexOf(close, index),
              delimiters = trim(
                text.substring(text.indexOf('=', index) + 1, closeIndex)
              ).split(' ');

          otag = delimiters[0];
          ctag = delimiters[1];

          return closeIndex + close.length - 1;
        }

        if (delimiters) {
          delimiters = delimiters.split(' ');
          otag = delimiters[0];
          ctag = delimiters[1];
        }

        for (i = 0; i < len; i++) {
          if (state == IN_TEXT) {
            if (tagChange(otag, text, i)) {
              --i;
              addBuf();
              state = IN_TAG_TYPE;
            } else {
              if (text.charAt(i) == '\n') {
                filterLine(seenTag);
              } else {
                buf += text.charAt(i);
              }
            }
          } else if (state == IN_TAG_TYPE) {
            i += otag.length - 1;
            tag = tagTypes[text.charAt(i + 1)];
            tagType = tag ? text.charAt(i + 1) : '_v';
            if (tagType == '=') {
              i = changeDelimiters(text, i);
              state = IN_TEXT;
            } else {
              if (tag) {
                i++;
              }
              state = IN_TAG;
            }
            seenTag = i;
          } else {
            if (tagChange(ctag, text, i)) {
              tokens.push({tag: tagType, n: trim(buf), otag: otag, ctag: ctag,
                           i: (tagType == '/') ? seenTag - ctag.length : i + otag.length});
              buf = '';
              i += ctag.length - 1;
              state = IN_TEXT;
              if (tagType == '{') {
                if (ctag == '}}') {
                  i++;
                } else {
                  cleanTripleStache(tokens[tokens.length - 1]);
                }
              }
            } else {
              buf += text.charAt(i);
            }
          }
        }

        filterLine(seenTag, true);

        return tokens;
      }

      function cleanTripleStache(token) {
        if (token.n.substr(token.n.length - 1) === '}') {
          token.n = token.n.substring(0, token.n.length - 1);
        }
      }

      function trim(s) {
        if (s.trim) {
          return s.trim();
        }

        return s.replace(/^\s*|\s*$/g, '');
      }

      function tagChange(tag, text, index) {
        if (text.charAt(index) != tag.charAt(0)) {
          return false;
        }

        for (var i = 1, l = tag.length; i < l; i++) {
          if (text.charAt(index + i) != tag.charAt(i)) {
            return false;
          }
        }

        return true;
      }

      function buildTree(tokens, kind, stack, customTags) {
        var instructions = [],
            opener = null,
            token = null;

        while (tokens.length > 0) {
          token = tokens.shift();
          if (token.tag == '#' || token.tag == '^' || isOpener(token, customTags)) {
            stack.push(token);
            token.nodes = buildTree(tokens, token.tag, stack, customTags);
            instructions.push(token);
          } else if (token.tag == '/') {
            if (stack.length === 0) {
              throw new Error('Closing tag without opener: /' + token.n);
            }
            opener = stack.pop();
            if (token.n != opener.n && !isCloser(token.n, opener.n, customTags)) {
              throw new Error('Nesting error: ' + opener.n + ' vs. ' + token.n);
            }
            opener.end = token.i;
            return instructions;
          } else {
            instructions.push(token);
          }
        }

        if (stack.length > 0) {
          throw new Error('missing closing tag: ' + stack.pop().n);
        }

        return instructions;
      }

      function isOpener(token, tags) {
        for (var i = 0, l = tags.length; i < l; i++) {
          if (tags[i].o == token.n) {
            token.tag = '#';
            return true;
          }
        }
      }

      function isCloser(close, open, tags) {
        for (var i = 0, l = tags.length; i < l; i++) {
          if (tags[i].c == close && tags[i].o == open) {
            return true;
          }
        }
      }

      Hogan.generate = function (tree, text, options) {
        var code = 'var _=this;_.b(i=i||"");' + walk(tree) + 'return _.fl();';
        if (options.asString) {
          return 'function(c,p,i){' + code + ';}';
        }

        return new Hogan.Template(new Function('c', 'p', 'i', code), text, Hogan, options);
      }

      function esc(s) {
        return s.replace(rSlash, '\\\\')
                .replace(rQuot, '\\\"')
                .replace(rNewline, '\\n')
                .replace(rCr, '\\r');
      }

      function chooseMethod(s) {
        return (~s.indexOf('.')) ? 'd' : 'f';
      }

      function walk(tree) {
        var code = '';
        for (var i = 0, l = tree.length; i < l; i++) {
          var tag = tree[i].tag;
          if (tag == '#') {
            code += section(tree[i].nodes, tree[i].n, chooseMethod(tree[i].n),
                            tree[i].i, tree[i].end, tree[i].otag + " " + tree[i].ctag);
          } else if (tag == '^') {
            code += invertedSection(tree[i].nodes, tree[i].n,
                                    chooseMethod(tree[i].n));
          } else if (tag == '<' || tag == '>') {
            code += partial(tree[i]);
          } else if (tag == '{' || tag == '&') {
            code += tripleStache(tree[i].n, chooseMethod(tree[i].n));
          } else if (tag == '\n') {
            code += text('"\\n"' + (tree.length-1 == i ? '' : ' + i'));
          } else if (tag == '_v') {
            code += variable(tree[i].n, chooseMethod(tree[i].n));
          } else if (tag === undefined) {
            code += text('"' + esc(tree[i]) + '"');
          }
        }
        return code;
      }

      function section(nodes, id, method, start, end, tags) {
        return 'if(_.s(_.' + method + '("' + esc(id) + '",c,p,1),' +
               'c,p,0,' + start + ',' + end + ',"' + tags + '")){' +
               '_.rs(c,p,' +
               'function(c,p,_){' +
               walk(nodes) +
               '});c.pop();}';
      }

      function invertedSection(nodes, id, method) {
        return 'if(!_.s(_.' + method + '("' + esc(id) + '",c,p,1),c,p,1,0,0,"")){' +
               walk(nodes) +
               '};';
      }

      function partial(tok) {
        return '_.b(_.rp("' +  esc(tok.n) + '",c,p,"' + (tok.indent || '') + '"));';
      }

      function tripleStache(id, method) {
        return '_.b(_.t(_.' + method + '("' + esc(id) + '",c,p,0)));';
      }

      function variable(id, method) {
        return '_.b(_.v(_.' + method + '("' + esc(id) + '",c,p,0)));';
      }

      function text(id) {
        return '_.b(' + id + ');';
      }

      Hogan.parse = function(tokens, text, options) {
        options = options || {};
        return buildTree(tokens, '', [], options.sectionTags || []);
      },

      Hogan.cache = {};

      Hogan.compile = function(text, options) {
        // options
        //
        // asString: false (default)
        //
        // sectionTags: [{o: '_foo', c: 'foo'}]
        // An array of object with o and c fields that indicate names for custom
        // section tags. The example above allows parsing of {{_foo}}{{/foo}}.
        //
        // delimiters: A string that overrides the default delimiters.
        // Example: "<% %>"
        //
        options = options || {};

        var key = text + '||' + !!options.asString;

        var t = this.cache[key];

        if (t) {
          return t;
        }

        t = this.generate(this.parse(this.scan(text, options.delimiters), text, options), text, options);
        return this.cache[key] = t;
      };
    })(typeof exports !== 'undefined' ? exports : Hogan);

  });
olapicRequire.define("Magic/hogan", function(){});

/*! lightbox Object */
	olapicRequire.define("Magic/olapic.viewerSlide",['Magic/commons'], function () {
		(function($) {
			var _self = null;
			olapicjQuery.viewerSlide = function(options) {
				this.options = {
					slideWrapper: null,
					wrapper: null,
					step: 1, 
					olapic_api_url: '', 
					olapic_api_key: '',
					nextButton: null,
					prevButton: null,
					preloadImages: [],
					itemsWidth: 160,
					hideUntilReady: false,
					prevCallBack: null,
					nextCallBack: null
				};
				this.options = olapicjQuery.extend(this.options, options);
				_self = this;
				_self.animating = false;

				this.init = function(){
					if(_self.options.preloadImages.length == 0) return;
					if(olapicjQuery(_self.options.wrapper).length == 0) return;
					olapicjQuery(_self.options.wrapper).hide();
					_self.options.slideWrapper = olapicjQuery(_self.options.slideWrapper);
					_self.options.wrapper = olapicjQuery(_self.options.wrapper);
					_self.options.items = olapicjQuery(_self.options.wrapper).find('li');
					_self._tracker = new OlapicTracker();
					_self._tracker.init({
						_api_url: _self.options.olapic_api_url,
						_api_key: _self.options.olapic_api_key,
						_olapic_u: _self.options.olapic_u
					});
					olapicjQuery.when(_self.preloadImages(_self.options.preloadImages)).done(function(){
						_self.createSlide();
						if(_self.options.prevButton != null){
							olapicjQuery(_self.options.prevButton).click(function(e){
								e.preventDefault();
								_self.movePrev();
							});
						}
						if(_self.options.nextButton != null) {
							olapicjQuery(_self.options.nextButton).click(function(e){
								e.preventDefault();
								_self.moveNext();
							});
						}
					});
				};
				this.createSlide = function(){
					var totalwidth = _self.options.itemsWidth * _self.options.items.length;
					_self.options.slideWrapper.addClass('slice-with-items-'+ _self.options.items.length);
					_self.options.wrapper.data('totalwidth', totalwidth)
					_self.options.wrapper.parent().width(totalwidth * 13);
					if(_self.options.items.length > 2){
						olapicjQuery("li:first", _self.options.wrapper).before(_self.options.items.last());
						olapicjQuery(_self.options.wrapper).css({'left': '-'+(_self.options.wrapper.position().left + _self.options.itemsWidth)+'px'});
					}
					olapicjQuery(_self.options.wrapper).show();
					_self.options.slideWrapper.addClass('slice-finished');
				};
				this.moveNext = function(){
					if(_self.animating) return;
					_self.animating = true;
					var item_width = olapicjQuery(olapicjQuery("li", _self.options.wrapper).get(1)).outerWidth(true);
					var left_indent = _self.options.wrapper.position().left - item_width;
					_self.options.wrapper.animate({'left' : left_indent},{queue:true, duration:300, complete:function(){
						olapicjQuery("li:last", _self.options.wrapper).after(olapicjQuery("li:first", _self.options.wrapper));
						_self.options.wrapper.css({'left' :  _self.options.wrapper.position().left + olapicjQuery("li:last", _self.options.wrapper).outerWidth(true)});
						_self.animating = false;
						if( typeof _self.options.nextCallBack == 'function') _self.options.nextCallBack(_self.options.slideWrapper);
					}});
				};
				this.movePrev = function(){
					if(_self.animating) return;
					_self.animating = true;
					var item_width = olapicjQuery(olapicjQuery("li", _self.options.wrapper).get(1)).outerWidth(true);
					var left_indent = _self.options.wrapper.position().left + item_width;
					_self.options.wrapper.animate({'left' : left_indent},{queue:true, duration:300, complete:function(){
						olapicjQuery("li:first", _self.options.wrapper).before(olapicjQuery("li:last", _self.options.wrapper));
						_self.options.wrapper.css({'left' :  _self.options.wrapper.position().left - olapicjQuery("li:first", _self.options.wrapper).outerWidth(true)});
						_self.animating = false;

						if( typeof _self.options.prevCallBack == 'function') _self.options.prevCallBack(_self.options.slideWrapper);
					}});
				};
				this.preloadImages = function(images){
					var limitimages = new Array();
					if(images.length > 10){
						limitimages = images.slice(0, 10);
						var olapicaux = images.slice(-5);
						for (var i = 0; i < olapicaux.length; i++) {
							limitimages.push(olapicaux[i]);
						}
					}else{
						limitimages = images;
					}
					return olapicjQuery.Deferred(
						function(dfd) {
							if (limitimages.length==0) dfd.resolve();
							var loaded = 0;
							for(var i = 0; i <= (limitimages.length - 1); ++i){
								olapicjQuery('<img/>').load(function() {
									loaded ++;
									if(loaded == limitimages.length){ dfd.resolve(); }
								}).error(function(){
									loaded ++;
									if(loaded == limitimages.length){ dfd.resolve(); }
								}).attr('src' , limitimages[i]);
							}
						}
					).promise();
				};
				this.debug = function(message){
					if(typeof console == 'object') console.log(message);
				};
				_self.init();
				return _self;
			};
		})(olapicjQuery);
	});
olapicRequire.define("Magic/olapic.viewerSlide", function(){});

/***** olapicslide.min ******/

olapicRequire.define("Magic/olapicslide.min", function(){
	var olapicSlide = function(element, options){
		this.elem = olapicjQuery(element);
		this.items = olapicjQuery(this.elem).find('li');
		this.sizes = new Array();
		this.index = 0;
		this.animating = false;
		this.timer = null;
		options.infinite = (typeof options.infinite == 'string') ? ((options.infinite == '1') ? true : false) : false;
		this.opts = olapicjQuery.extend({
			nextElementId: null,
			prevElementid: null,
			elementsList: null,
			carrouselwrapper: null,
			customsBtns: false,
			infinite: true,
			itemsWidth: 160,
			slide_mode: 1,
			auto_play: 0,
			interval: 1000,
			items_count: 1,
			duration: 300
		}, options || {});
		this.cssToUpdate = (this.opts.slide_mode == 1 ) ? 'left':'top';
		var self = this;

		this.createslide = function(){
			var instance = this;
			var totalwidth = 0;
			var valuetoMove = 0;
			totalwidth = this.items.length * this.opts.itemsWidth;
			instance.elem.data('totalwidth', totalwidth * 13);

			if ( instance.opts.infinite == true ){
				if(this.items.length > 1){
					if(instance.opts.slide_mode == 1 ){
						valuetoMove = this.elem.position().left +  olapicjQuery("li:last", instance.elem).outerWidth(true);
					}else{
						valuetoMove = this.elem.position().top +  olapicjQuery("li:last", instance.elem).outerHeight(true);
					}
					olapicjQuery("li:first", instance.elem).before(instance.items.last());
					var updateCss = {};
					updateCss[instance.cssToUpdate] = '-'+valuetoMove+'px';
					instance.elem.css(updateCss);
				}
			}
			instance.elem.width(totalwidth * 13);
		};

		this.moveNext = function(){
			var instance = this;
			if(instance.animating) return;
			if(instance.elem.parent().width() > instance.elem.data('totalwidth')) return;
			instance.animating = true;
			var item_width = 0;
			var left_indent = (instance.opts.slide_mode == 1 ) ? instance.elem.position().left : instance.elem.position().top;
			var updateCss = {};
			if((instance.opts.infinite == true) && ( this.items.length > 1 )){
				if(instance.opts.slide_mode == 1 ){
					item_width = olapicjQuery(olapicjQuery("li", instance.elem).get(1)).outerWidth(true);
					left_indent -= item_width;
				}else{
					item_width = olapicjQuery(olapicjQuery("li", instance.elem).get(1)).outerHeight(true);
					left_indent -= item_width;
				}
				updateCss[instance.cssToUpdate] = left_indent+'px';
				instance.elem.animate(updateCss,{queue:true, duration: parseInt(instance.opts.duration), complete:function(){
					olapicjQuery("li:last", instance.elem).after(olapicjQuery("li:first", instance.elem));
					if(instance.opts.slide_mode == 1 ){
						updateCss[instance.cssToUpdate] = instance.elem.position().left + olapicjQuery("li:last", instance.elem).outerWidth(true);
					}else{
						updateCss[instance.cssToUpdate] = instance.elem.position().top + olapicjQuery("li:last", instance.elem).outerHeight(true);
					}
					instance.elem.css(updateCss);
					instance.animating = false;
				}});
			}else{
				if(instance.index < (instance.items.length - 1)){
							//position control
							var widthextra = 0;
							var elements = olapicjQuery("li", instance.elem);
							for(var x = instance.index; x<(instance.items.length-1); x++){
								widthextra += olapicjQuery(elements.get(x)).outerWidth(true);
							}
							if(widthextra >= instance.elem.parent().width()){
								if(instance.opts.slide_mode == 1 ){
									item_width = olapicjQuery(elements.get(instance.index)).outerWidth(true);
									left_indent -= item_width;
								}else{
									item_width = olapicjQuery(elements.get(instance.index)).outerHeight(true);
									left_indent -= item_width;
								}
								updateCss[instance.cssToUpdate] = left_indent+'px';
								instance.elem.animate(updateCss,{queue:true, duration: parseInt(instance.opts.duration), complete:function(){
									instance.animating = false;
									instance.index ++;
								}});
							}else{
								instance.animating = false;
							}
						}else{
							instance.animating = false;
						}
					}
				};
				this.movePrev = function(){
					var instance = this;
					if(instance.animating) return;
					if(instance.elem.parent().width() > instance.elem.data('totalwidth')) return;
					instance.animating = true;
					var item_width = 0;
					var left_indent = (instance.opts.slide_mode == 1 ) ? instance.elem.position().left : instance.elem.position().top;
					var updateCss = {};
					if((instance.opts.infinite == true) && ( this.items.length > 1 )){
						if(instance.opts.slide_mode == 1 ){
							item_width = olapicjQuery(olapicjQuery("li", instance.elem).first()).outerWidth(true);
							left_indent += item_width;
						}else{
							item_width = olapicjQuery(olapicjQuery("li", instance.elem).first()).outerHeight(true);
							left_indent += item_width;
						}
						updateCss[instance.cssToUpdate] = left_indent+'px';
						instance.elem.animate(updateCss,{queue:true, duration: parseInt(instance.opts.duration), complete:function(){
							olapicjQuery("li:first", instance.elem).before(olapicjQuery("li:last", instance.elem));
							if(instance.opts.slide_mode == 1 ){
								updateCss[instance.cssToUpdate] = instance.elem.position().left - olapicjQuery("li:first", instance.elem).outerWidth(true);
							}else{
								updateCss[instance.cssToUpdate] = instance.elem.position().top - olapicjQuery("li:first", instance.elem).outerHeight(true);
							}
							instance.elem.css(updateCss);
							instance.animating = false;
						}});
					}else{
						if(instance.index > 0){
							instance.index --;
							if(instance.opts.slide_mode == 1 ){
								item_width = olapicjQuery(olapicjQuery("li", instance.elem).get(instance.index)).outerWidth(true);
							}else{
								item_width = olapicjQuery(olapicjQuery("li", instance.elem).get(instance.index)).outerHeight(true);
							}
							left_indent += item_width;
							updateCss[instance.cssToUpdate] = left_indent+'px';
							instance.elem.animate(updateCss,{queue:true, duration: parseInt(instance.opts.duration), complete:function(){
								instance.animating = false;
							}});
						}else{
							instance.animating = false;
						}
					}
				};

				this.doMoveNext = function(){
					if(this.timer !== null) clearInterval(this.timer);
					this.moveNext();
				}
				this.doMovePrev = function(){
					if(this.timer !== null) clearInterval(this.timer);
					this.movePrev();
				}
				this.createslide();
				if((this.opts.auto_play == 1) && this.opts.infinite){
					this.timer = setInterval(function () {
						self.moveNext();
					}, self.opts.interval);
				}
			};

			olapicjQuery.fn.createSlide = function(options) {
				return this.each(function() {
					var element = olapicjQuery(this);
					if (element.data('olapicSlide')) return;
					var theslide = new olapicSlide(element, options);
					olapicjQuery(element).data('olapicSlide', theslide);
				});
			}
		});
olapicRequire.define("Magic/olapicslide.min", function(){});

/*! Video.js v4.3.0 Copyright 2013 Brightcove, Inc. https://github.com/videojs/video.js/blob/master/LICENSE */
/*! lightbox Object */

    olapicRequire.define('Magic/videojs', function () {

        try {

            (function() {var b=void 0,f=!0,h=null,l=!1;function m(){return function(){}}function p(a){return function(){return this[a]}}function s(a){return function(){return a}}var t;document.createElement("video");document.createElement("audio");document.createElement("track");function u(a,c,d){if("string"===typeof a){0===a.indexOf("#")&&(a=a.slice(1));if(u.xa[a])return u.xa[a];a=u.w(a)}if(!a||!a.nodeName)throw new TypeError("The element or ID supplied is not valid. (videojs)");return a.player||new u.s(a,c,d)}var v=u;
            window.Td=window.Ud=u;u.Tb="4.3";u.Fc="https:"==document.location.protocol?"https://":"http://";u.options={techOrder:["html5","flash"],html5:{},flash:{},width:300,height:150,defaultVolume:0,children:{mediaLoader:{},posterImage:{},textTrackDisplay:{},loadingSpinner:{},bigPlayButton:{},controlBar:{}},notSupportedMessage:'Sorry, no compatible source and playback technology were found for this video. Try using another browser like <a href="http://bit.ly/ccMUEC">Chrome</a> or download the latest <a href="http://adobe.ly/mwfN1">Adobe Flash Player</a>.'};
            "GENERATED_CDN_VSN"!==u.Tb&&(v.options.flash.swf=u.Fc+"vjs.zencdn.net/"+u.Tb+"/video-js.swf");u.xa={};u.la=u.CoreObject=m();u.la.extend=function(a){var c,d;a=a||{};c=a.init||a.i||this.prototype.init||this.prototype.i||m();d=function(){c.apply(this,arguments)};d.prototype=u.k.create(this.prototype);d.prototype.constructor=d;d.extend=u.la.extend;d.create=u.la.create;for(var e in a)a.hasOwnProperty(e)&&(d.prototype[e]=a[e]);return d};
            u.la.create=function(){var a=u.k.create(this.prototype);this.apply(a,arguments);return a};u.d=function(a,c,d){var e=u.getData(a);e.z||(e.z={});e.z[c]||(e.z[c]=[]);d.t||(d.t=u.t++);e.z[c].push(d);e.W||(e.disabled=l,e.W=function(c){if(!e.disabled){c=u.kc(c);var d=e.z[c.type];if(d)for(var d=d.slice(0),k=0,q=d.length;k<q&&!c.pc();k++)d[k].call(a,c)}});1==e.z[c].length&&(document.addEventListener?a.addEventListener(c,e.W,l):document.attachEvent&&a.attachEvent("on"+c,e.W))};
            u.o=function(a,c,d){if(u.oc(a)){var e=u.getData(a);if(e.z)if(c){var g=e.z[c];if(g){if(d){if(d.t)for(e=0;e<g.length;e++)g[e].t===d.t&&g.splice(e--,1)}else e.z[c]=[];u.gc(a,c)}}else for(g in e.z)c=g,e.z[c]=[],u.gc(a,c)}};u.gc=function(a,c){var d=u.getData(a);0===d.z[c].length&&(delete d.z[c],document.removeEventListener?a.removeEventListener(c,d.W,l):document.detachEvent&&a.detachEvent("on"+c,d.W));u.Bb(d.z)&&(delete d.z,delete d.W,delete d.disabled);u.Bb(d)&&u.vc(a)};
            u.kc=function(a){function c(){return f}function d(){return l}if(!a||!a.Cb){var e=a||window.event;a={};for(var g in e)"layerX"!==g&&"layerY"!==g&&(a[g]=e[g]);a.target||(a.target=a.srcElement||document);a.relatedTarget=a.fromElement===a.target?a.toElement:a.fromElement;a.preventDefault=function(){e.preventDefault&&e.preventDefault();a.returnValue=l;a.Ab=c};a.Ab=d;a.stopPropagation=function(){e.stopPropagation&&e.stopPropagation();a.cancelBubble=f;a.Cb=c};a.Cb=d;a.stopImmediatePropagation=function(){e.stopImmediatePropagation&&
            e.stopImmediatePropagation();a.pc=c;a.stopPropagation()};a.pc=d;if(a.clientX!=h){g=document.documentElement;var j=document.body;a.pageX=a.clientX+(g&&g.scrollLeft||j&&j.scrollLeft||0)-(g&&g.clientLeft||j&&j.clientLeft||0);a.pageY=a.clientY+(g&&g.scrollTop||j&&j.scrollTop||0)-(g&&g.clientTop||j&&j.clientTop||0)}a.which=a.charCode||a.keyCode;a.button!=h&&(a.button=a.button&1?0:a.button&4?1:a.button&2?2:0)}return a};
            u.j=function(a,c){var d=u.oc(a)?u.getData(a):{},e=a.parentNode||a.ownerDocument;"string"===typeof c&&(c={type:c,target:a});c=u.kc(c);d.W&&d.W.call(a,c);if(e&&!c.Cb()&&c.bubbles!==l)u.j(e,c);else if(!e&&!c.Ab()&&(d=u.getData(c.target),c.target[c.type])){d.disabled=f;if("function"===typeof c.target[c.type])c.target[c.type]();d.disabled=l}return!c.Ab()};u.U=function(a,c,d){function e(){u.o(a,c,e);d.apply(this,arguments)}e.t=d.t=d.t||u.t++;u.d(a,c,e)};var w=Object.prototype.hasOwnProperty;
            u.e=function(a,c){var d,e;d=document.createElement(a||"div");for(e in c)w.call(c,e)&&(-1!==e.indexOf("aria-")||"role"==e?d.setAttribute(e,c[e]):d[e]=c[e]);return d};u.$=function(a){return a.charAt(0).toUpperCase()+a.slice(1)};u.k={};u.k.create=Object.create||function(a){function c(){}c.prototype=a;return new c};u.k.ua=function(a,c,d){for(var e in a)w.call(a,e)&&c.call(d||this,e,a[e])};u.k.B=function(a,c){if(!c)return a;for(var d in c)w.call(c,d)&&(a[d]=c[d]);return a};
            u.k.ic=function(a,c){var d,e,g;a=u.k.copy(a);for(d in c)w.call(c,d)&&(e=a[d],g=c[d],a[d]=u.k.qc(e)&&u.k.qc(g)?u.k.ic(e,g):c[d]);return a};u.k.copy=function(a){return u.k.B({},a)};u.k.qc=function(a){return!!a&&"object"===typeof a&&"[object Object]"===a.toString()&&a.constructor===Object};u.bind=function(a,c,d){function e(){return c.apply(a,arguments)}c.t||(c.t=u.t++);e.t=d?d+"_"+c.t:c.t;return e};u.ra={};u.t=1;u.expando="vdata"+(new Date).getTime();
            u.getData=function(a){var c=a[u.expando];c||(c=a[u.expando]=u.t++,u.ra[c]={});return u.ra[c]};u.oc=function(a){a=a[u.expando];return!(!a||u.Bb(u.ra[a]))};u.vc=function(a){var c=a[u.expando];if(c){delete u.ra[c];try{delete a[u.expando]}catch(d){a.removeAttribute?a.removeAttribute(u.expando):a[u.expando]=h}}};u.Bb=function(a){for(var c in a)if(a[c]!==h)return l;return f};u.n=function(a,c){-1==(" "+a.className+" ").indexOf(" "+c+" ")&&(a.className=""===a.className?c:a.className+" "+c)};
            u.u=function(a,c){var d,e;if(-1!=a.className.indexOf(c)){d=a.className.split(" ");for(e=d.length-1;0<=e;e--)d[e]===c&&d.splice(e,1);a.className=d.join(" ")}};u.na=u.e("video");u.F=navigator.userAgent;u.Mc=/iPhone/i.test(u.F);u.Lc=/iPad/i.test(u.F);u.Nc=/iPod/i.test(u.F);u.Kc=u.Mc||u.Lc||u.Nc;var aa=u,x;var y=u.F.match(/OS (\d+)_/i);x=y&&y[1]?y[1]:b;aa.Fd=x;u.Ic=/Android/i.test(u.F);var ba=u,z;var A=u.F.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i),B,C;
            A?(B=A[1]&&parseFloat(A[1]),C=A[2]&&parseFloat(A[2]),z=B&&C?parseFloat(A[1]+"."+A[2]):B?B:h):z=h;ba.Gc=z;u.Oc=u.Ic&&/webkit/i.test(u.F)&&2.3>u.Gc;u.Jc=/Firefox/i.test(u.F);u.Gd=/Chrome/i.test(u.F);u.ac=!!("ontouchstart"in window||window.Hc&&document instanceof window.Hc);
            u.xb=function(a){var c,d,e,g;c={};if(a&&a.attributes&&0<a.attributes.length){d=a.attributes;for(var j=d.length-1;0<=j;j--){e=d[j].name;g=d[j].value;if("boolean"===typeof a[e]||-1!==",autoplay,controls,loop,muted,default,".indexOf(","+e+","))g=g!==h?f:l;c[e]=g}}return c};
            u.Kd=function(a,c){var d="";document.defaultView&&document.defaultView.getComputedStyle?d=document.defaultView.getComputedStyle(a,"").getPropertyValue(c):a.currentStyle&&(d=a["client"+c.substr(0,1).toUpperCase()+c.substr(1)]+"px");return d};u.zb=function(a,c){c.firstChild?c.insertBefore(a,c.firstChild):c.appendChild(a)};u.Pb={};u.w=function(a){0===a.indexOf("#")&&(a=a.slice(1));return document.getElementById(a)};
            u.La=function(a,c){c=c||a;var d=Math.floor(a%60),e=Math.floor(a/60%60),g=Math.floor(a/3600),j=Math.floor(c/60%60),k=Math.floor(c/3600);if(isNaN(a)||Infinity===a)g=e=d="-";g=0<g||0<k?g+":":"";return g+(((g||10<=j)&&10>e?"0"+e:e)+":")+(10>d?"0"+d:d)};u.Tc=function(){document.body.focus();document.onselectstart=s(l)};u.Bd=function(){document.onselectstart=s(f)};u.trim=function(a){return(a+"").replace(/^\s+|\s+$/g,"")};u.round=function(a,c){c||(c=0);return Math.round(a*Math.pow(10,c))/Math.pow(10,c)};
            u.tb=function(a,c){return{length:1,start:function(){return a},end:function(){return c}}};
            u.get=function(a,c,d){var e,g;"undefined"===typeof XMLHttpRequest&&(window.XMLHttpRequest=function(){try{return new window.ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(a){}try{return new window.ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(c){}try{return new window.ActiveXObject("Msxml2.XMLHTTP")}catch(d){}throw Error("This browser does not support XMLHttpRequest.");});g=new XMLHttpRequest;try{g.open("GET",a)}catch(j){d(j)}e=0===a.indexOf("file:")||0===window.location.href.indexOf("file:")&&-1===a.indexOf("http");
            g.onreadystatechange=function(){4===g.readyState&&(200===g.status||e&&0===g.status?c(g.responseText):d&&d())};try{g.send()}catch(k){d&&d(k)}};u.td=function(a){try{var c=window.localStorage||l;c&&(c.volume=a)}catch(d){22==d.code||1014==d.code?u.log("LocalStorage Full (VideoJS)",d):18==d.code?u.log("LocalStorage not allowed (VideoJS)",d):u.log("LocalStorage Error (VideoJS)",d)}};u.mc=function(a){a.match(/^https?:\/\//)||(a=u.e("div",{innerHTML:'<a href="'+a+'">x</a>'}).firstChild.href);return a};
            u.log=function(){u.log.history=u.log.history||[];u.log.history.push(arguments);window.console&&window.console.log(Array.prototype.slice.call(arguments))};u.ad=function(a){var c,d;a.getBoundingClientRect&&a.parentNode&&(c=a.getBoundingClientRect());if(!c)return{left:0,top:0};a=document.documentElement;d=document.body;return{left:c.left+(window.pageXOffset||d.scrollLeft)-(a.clientLeft||d.clientLeft||0),top:c.top+(window.pageYOffset||d.scrollTop)-(a.clientTop||d.clientTop||0)}};
            u.c=u.la.extend({i:function(a,c,d){this.b=a;this.g=u.k.copy(this.g);c=this.options(c);this.Q=c.id||(c.el&&c.el.id?c.el.id:a.id()+"_component_"+u.t++);this.gd=c.name||h;this.a=c.el||this.e();this.G=[];this.qb={};this.V={};if((a=this.g)&&a.children){var e=this;u.k.ua(a.children,function(a,c){c!==l&&!c.loadEvent&&(e[a]=e.Z(a,c))})}this.L(d)}});t=u.c.prototype;
            t.D=function(){this.j("dispose");if(this.G)for(var a=this.G.length-1;0<=a;a--)this.G[a].D&&this.G[a].D();this.V=this.qb=this.G=h;this.o();this.a.parentNode&&this.a.parentNode.removeChild(this.a);u.vc(this.a);this.a=h};t.b=f;t.K=p("b");t.options=function(a){return a===b?this.g:this.g=u.k.ic(this.g,a)};t.e=function(a,c){return u.e(a,c)};t.w=p("a");t.id=p("Q");t.name=p("gd");t.children=p("G");
            t.Z=function(a,c){var d,e;"string"===typeof a?(e=a,c=c||{},d=c.componentClass||u.$(e),c.name=e,d=new window.videojs[d](this.b||this,c)):d=a;this.G.push(d);"function"===typeof d.id&&(this.qb[d.id()]=d);(e=e||d.name&&d.name())&&(this.V[e]=d);"function"===typeof d.el&&d.el()&&(this.sa||this.a).appendChild(d.el());return d};
            t.removeChild=function(a){"string"===typeof a&&(a=this.V[a]);if(a&&this.G){for(var c=l,d=this.G.length-1;0<=d;d--)if(this.G[d]===a){c=f;this.G.splice(d,1);break}c&&(this.qb[a.id]=h,this.V[a.name]=h,(c=a.w())&&c.parentNode===(this.sa||this.a)&&(this.sa||this.a).removeChild(a.w()))}};t.T=s("");t.d=function(a,c){u.d(this.a,a,u.bind(this,c));return this};t.o=function(a,c){u.o(this.a,a,c);return this};t.U=function(a,c){u.U(this.a,a,u.bind(this,c));return this};t.j=function(a,c){u.j(this.a,a,c);return this};
            t.L=function(a){a&&(this.aa?a.call(this):(this.Sa===b&&(this.Sa=[]),this.Sa.push(a)));return this};t.Ua=function(){this.aa=f;var a=this.Sa;if(a&&0<a.length){for(var c=0,d=a.length;c<d;c++)a[c].call(this);this.Sa=[];this.j("ready")}};t.n=function(a){u.n(this.a,a);return this};t.u=function(a){u.u(this.a,a);return this};t.show=function(){this.a.style.display="block";return this};t.C=function(){this.a.style.display="none";return this};function D(a){a.u("vjs-lock-showing")}
            t.disable=function(){this.C();this.show=m()};t.width=function(a,c){return E(this,"width",a,c)};t.height=function(a,c){return E(this,"height",a,c)};t.Xc=function(a,c){return this.width(a,f).height(c)};function E(a,c,d,e){if(d!==b)return a.a.style[c]=-1!==(""+d).indexOf("%")||-1!==(""+d).indexOf("px")?d:"auto"===d?"":d+"px",e||a.j("resize"),a;if(!a.a)return 0;d=a.a.style[c];e=d.indexOf("px");return-1!==e?parseInt(d.slice(0,e),10):parseInt(a.a["offset"+u.$(c)],10)}
            u.q=u.c.extend({i:function(a,c){u.c.call(this,a,c);var d=l;this.d("touchstart",function(a){a.preventDefault();d=f});this.d("touchmove",function(){d=l});var e=this;this.d("touchend",function(a){d&&e.p(a);a.preventDefault()});this.d("click",this.p);this.d("focus",this.Oa);this.d("blur",this.Na)}});t=u.q.prototype;
            t.e=function(a,c){c=u.k.B({className:this.T(),innerHTML:'<div class="vjs-control-content"><span class="vjs-control-text">'+(this.qa||"Need Text")+"</span></div>",qd:"button","aria-live":"polite",tabIndex:0},c);return u.c.prototype.e.call(this,a,c)};t.T=function(){return"vjs-control "+u.c.prototype.T.call(this)};t.p=m();t.Oa=function(){u.d(document,"keyup",u.bind(this,this.ba))};t.ba=function(a){if(32==a.which||13==a.which)a.preventDefault(),this.p()};
            t.Na=function(){u.o(document,"keyup",u.bind(this,this.ba))};u.O=u.c.extend({i:function(a,c){u.c.call(this,a,c);this.Sc=this.V[this.g.barName];this.handle=this.V[this.g.handleName];a.d(this.tc,u.bind(this,this.update));this.d("mousedown",this.Pa);this.d("touchstart",this.Pa);this.d("focus",this.Oa);this.d("blur",this.Na);this.d("click",this.p);this.b.d("controlsvisible",u.bind(this,this.update));a.L(u.bind(this,this.update));this.P={}}});t=u.O.prototype;
            t.e=function(a,c){c=c||{};c.className+=" vjs-slider";c=u.k.B({qd:"slider","aria-valuenow":0,"aria-valuemin":0,"aria-valuemax":100,tabIndex:0},c);return u.c.prototype.e.call(this,a,c)};t.Pa=function(a){a.preventDefault();u.Tc();this.P.move=u.bind(this,this.Hb);this.P.end=u.bind(this,this.Ib);u.d(document,"mousemove",this.P.move);u.d(document,"mouseup",this.P.end);u.d(document,"touchmove",this.P.move);u.d(document,"touchend",this.P.end);this.Hb(a)};
            t.Ib=function(){u.Bd();u.o(document,"mousemove",this.P.move,l);u.o(document,"mouseup",this.P.end,l);u.o(document,"touchmove",this.P.move,l);u.o(document,"touchend",this.P.end,l);this.update()};t.update=function(){if(this.a){var a,c=this.yb(),d=this.handle,e=this.Sc;isNaN(c)&&(c=0);a=c;if(d){a=this.a.offsetWidth;var g=d.w().offsetWidth;a=g?g/a:0;c*=1-a;a=c+a/2;d.w().style.left=u.round(100*c,2)+"%"}e.w().style.width=u.round(100*a,2)+"%"}};
            function F(a,c){var d,e,g,j;d=a.a;e=u.ad(d);j=g=d.offsetWidth;d=a.handle;if(a.g.Cd)return j=e.top,e=c.changedTouches?c.changedTouches[0].pageY:c.pageY,d&&(d=d.w().offsetHeight,j+=d/2,g-=d),Math.max(0,Math.min(1,(j-e+g)/g));g=e.left;e=c.changedTouches?c.changedTouches[0].pageX:c.pageX;d&&(d=d.w().offsetWidth,g+=d/2,j-=d);return Math.max(0,Math.min(1,(e-g)/j))}t.Oa=function(){u.d(document,"keyup",u.bind(this,this.ba))};
            t.ba=function(a){37==a.which?(a.preventDefault(),this.yc()):39==a.which&&(a.preventDefault(),this.zc())};t.Na=function(){u.o(document,"keyup",u.bind(this,this.ba))};t.p=function(a){a.stopImmediatePropagation();a.preventDefault()};u.ea=u.c.extend();u.ea.prototype.defaultValue=0;u.ea.prototype.e=function(a,c){c=c||{};c.className+=" vjs-slider-handle";c=u.k.B({innerHTML:'<span class="vjs-control-text">'+this.defaultValue+"</span>"},c);return u.c.prototype.e.call(this,"div",c)};u.ma=u.c.extend();
            function ca(a,c){a.Z(c);c.d("click",u.bind(a,function(){D(this)}))}u.ma.prototype.e=function(){var a=this.options().Vc||"ul";this.sa=u.e(a,{className:"vjs-menu-content"});a=u.c.prototype.e.call(this,"div",{append:this.sa,className:"vjs-menu"});a.appendChild(this.sa);u.d(a,"click",function(a){a.preventDefault();a.stopImmediatePropagation()});return a};u.N=u.q.extend({i:function(a,c){u.q.call(this,a,c);this.selected(c.selected)}});
            u.N.prototype.e=function(a,c){return u.q.prototype.e.call(this,"li",u.k.B({className:"vjs-menu-item",innerHTML:this.g.label},c))};u.N.prototype.p=function(){this.selected(f)};u.N.prototype.selected=function(a){a?(this.n("vjs-selected"),this.a.setAttribute("aria-selected",f)):(this.u("vjs-selected"),this.a.setAttribute("aria-selected",l))};
            u.R=u.q.extend({i:function(a,c){u.q.call(this,a,c);this.wa=this.Ka();this.Z(this.wa);this.I&&0===this.I.length&&this.C();this.d("keyup",this.ba);this.a.setAttribute("aria-haspopup",f);this.a.setAttribute("role","button")}});t=u.R.prototype;t.pa=l;t.Ka=function(){var a=new u.ma(this.b);this.options().title&&a.w().appendChild(u.e("li",{className:"vjs-menu-title",innerHTML:u.$(this.A),zd:-1}));if(this.I=this.createItems())for(var c=0;c<this.I.length;c++)ca(a,this.I[c]);return a};t.ta=m();
            t.T=function(){return this.className+" vjs-menu-button "+u.q.prototype.T.call(this)};t.Oa=m();t.Na=m();t.p=function(){this.U("mouseout",u.bind(this,function(){D(this.wa);this.a.blur()}));this.pa?G(this):H(this)};t.ba=function(a){a.preventDefault();32==a.which||13==a.which?this.pa?G(this):H(this):27==a.which&&this.pa&&G(this)};function H(a){a.pa=f;a.wa.n("vjs-lock-showing");a.a.setAttribute("aria-pressed",f);a.I&&0<a.I.length&&a.I[0].w().focus()}
            function G(a){a.pa=l;D(a.wa);a.a.setAttribute("aria-pressed",l)}
            u.s=u.c.extend({i:function(a,c,d){this.M=a;c=u.k.B(da(a),c);this.v={};this.uc=c.poster;this.sb=c.controls;a.controls=l;u.c.call(this,this,c,d);this.controls()?this.n("vjs-controls-enabled"):this.n("vjs-controls-disabled");this.U("play",function(a){u.j(this.a,{type:"firstplay",target:this.a})||(a.preventDefault(),a.stopPropagation(),a.stopImmediatePropagation())});this.d("ended",this.hd);this.d("play",this.Kb);this.d("firstplay",this.jd);this.d("pause",this.Jb);this.d("progress",this.ld);this.d("durationchange",
            this.sc);this.d("error",this.Gb);this.d("fullscreenchange",this.kd);u.xa[this.Q]=this;c.plugins&&u.k.ua(c.plugins,function(a,c){this[a](c)},this);var e,g,j,k;e=this.Mb;a=function(){e();clearInterval(g);g=setInterval(u.bind(this,e),250)};c=function(){e();clearInterval(g)};this.d("mousedown",a);this.d("mousemove",e);this.d("mouseup",c);this.d("keydown",e);this.d("keyup",e);this.d("touchstart",a);this.d("touchmove",e);this.d("touchend",c);this.d("touchcancel",c);j=setInterval(u.bind(this,function(){this.ka&&
            (this.ka=l,this.ja(f),clearTimeout(k),k=setTimeout(u.bind(this,function(){this.ka||this.ja(l)}),2E3))}),250);this.d("dispose",function(){clearInterval(j);clearTimeout(k)})}});t=u.s.prototype;t.g=u.options;t.D=function(){this.j("dispose");this.o("dispose");u.xa[this.Q]=h;this.M&&this.M.player&&(this.M.player=h);this.a&&this.a.player&&(this.a.player=h);clearInterval(this.Ra);this.za();this.h&&this.h.D();u.c.prototype.D.call(this)};
            function da(a){var c={sources:[],tracks:[]};u.k.B(c,u.xb(a));if(a.hasChildNodes()){var d,e,g,j;a=a.childNodes;g=0;for(j=a.length;g<j;g++)d=a[g],e=d.nodeName.toLowerCase(),"source"===e?c.sources.push(u.xb(d)):"track"===e&&c.tracks.push(u.xb(d))}return c}
            t.e=function(){var a=this.a=u.c.prototype.e.call(this,"div"),c=this.M;c.removeAttribute("width");c.removeAttribute("height");if(c.hasChildNodes()){var d,e,g,j,k;d=c.childNodes;e=d.length;for(k=[];e--;)g=d[e],j=g.nodeName.toLowerCase(),"track"===j&&k.push(g);for(d=0;d<k.length;d++)c.removeChild(k[d])}c.id=c.id||"vjs_video_"+u.t++;a.id=c.id;a.className=c.className;c.id+="_html5_api";c.className="vjs-tech";c.player=a.player=this;this.n("vjs-paused");this.width(this.g.width,f);this.height(this.g.height,
            f);c.parentNode&&c.parentNode.insertBefore(a,c);u.zb(c,a);return a};
            function I(a,c,d){a.h?(a.aa=l,a.h.D(),a.Eb&&(a.Eb=l,clearInterval(a.Ra)),a.Fb&&J(a),a.h=l):"Html5"!==c&&a.M&&(u.l.jc(a.M),a.M=h);a.ia=c;a.aa=l;var e=u.k.B({source:d,parentEl:a.a},a.g[c.toLowerCase()]);d&&(d.src==a.v.src&&0<a.v.currentTime&&(e.startTime=a.v.currentTime),a.v.src=d.src);a.h=new window.videojs[c](a,e);a.h.L(function(){this.b.Ua();if(!this.m.progressEvents){var a=this.b;a.Eb=f;a.Ra=setInterval(u.bind(a,function(){this.v.lb<this.buffered().end(0)?this.j("progress"):1==this.Ja()&&(clearInterval(this.Ra),
            this.j("progress"))}),500);a.h.U("progress",function(){this.m.progressEvents=f;var a=this.b;a.Eb=l;clearInterval(a.Ra)})}this.m.timeupdateEvents||(a=this.b,a.Fb=f,a.d("play",a.Cc),a.d("pause",a.za),a.h.U("timeupdate",function(){this.m.timeupdateEvents=f;J(this.b)}))})}function J(a){a.Fb=l;a.za();a.o("play",a.Cc);a.o("pause",a.za)}t.Cc=function(){this.hc&&this.za();this.hc=setInterval(u.bind(this,function(){this.j("timeupdate")}),250)};t.za=function(){clearInterval(this.hc)};
            t.Kb=function(){u.u(this.a,"vjs-paused");u.n(this.a,"vjs-playing")};t.jd=function(){this.g.starttime&&this.currentTime(this.g.starttime);this.n("vjs-has-started")};t.Jb=function(){u.u(this.a,"vjs-playing");u.n(this.a,"vjs-paused")};t.ld=function(){1==this.Ja()&&this.j("loadedalldata")};t.hd=function(){this.g.loop&&(this.currentTime(0),this.play())};t.sc=function(){this.duration(K(this,"duration"))};t.kd=function(){this.H?this.n("vjs-fullscreen"):this.u("vjs-fullscreen")};
            t.Gb=function(a){u.log("Video Error",a)};function L(a,c,d){if(a.h&&!a.h.aa)a.h.L(function(){this[c](d)});else try{a.h[c](d)}catch(e){throw u.log(e),e;}}function K(a,c){if(a.h&&a.h.aa)try{return a.h[c]()}catch(d){throw a.h[c]===b?u.log("Video.js: "+c+" method not defined for "+a.ia+" playback technology.",d):"TypeError"==d.name?(u.log("Video.js: "+c+" unavailable on "+a.ia+" playback technology element.",d),a.h.aa=l):u.log(d),d;}}t.play=function(){L(this,"play");return this};
            t.pause=function(){L(this,"pause");return this};t.paused=function(){return K(this,"paused")===l?l:f};t.currentTime=function(a){return a!==b?(this.v.rc=a,L(this,"setCurrentTime",a),this.Fb&&this.j("timeupdate"),this):this.v.currentTime=K(this,"currentTime")||0};t.duration=function(a){if(a!==b)return this.v.duration=parseFloat(a),this;this.v.duration===b&&this.sc();return this.v.duration};
            t.buffered=function(){var a=K(this,"buffered"),c=a.length-1,d=this.v.lb=this.v.lb||0;a&&(0<=c&&a.end(c)!==d)&&(d=a.end(c),this.v.lb=d);return u.tb(0,d)};t.Ja=function(){return this.duration()?this.buffered().end(0)/this.duration():0};t.volume=function(a){if(a!==b)return a=Math.max(0,Math.min(1,parseFloat(a))),this.v.volume=a,L(this,"setVolume",a),u.td(a),this;a=parseFloat(K(this,"volume"));return isNaN(a)?1:a};t.muted=function(a){return a!==b?(L(this,"setMuted",a),this):K(this,"muted")||l};
            t.Ta=function(){return K(this,"supportsFullScreen")||l};
            t.ya=function(){var a=u.Pb.ya;this.H=f;a?(u.d(document,a.vb,u.bind(this,function(c){this.H=document[a.H];this.H===l&&u.o(document,a.vb,arguments.callee);this.j("fullscreenchange")})),this.a[a.wc]()):this.h.Ta()?L(this,"enterFullScreen"):(this.cd=f,this.Yc=document.documentElement.style.overflow,u.d(document,"keydown",u.bind(this,this.lc)),document.documentElement.style.overflow="hidden",u.n(document.body,"vjs-full-window"),this.j("enterFullWindow"),this.j("fullscreenchange"));return this};
            t.ob=function(){var a=u.Pb.ya;this.H=l;if(a)document[a.nb]();else this.h.Ta()?L(this,"exitFullScreen"):(M(this),this.j("fullscreenchange"));return this};t.lc=function(a){27===a.keyCode&&(this.H===f?this.ob():M(this))};function M(a){a.cd=l;u.o(document,"keydown",a.lc);document.documentElement.style.overflow=a.Yc;u.u(document.body,"vjs-full-window");a.j("exitFullWindow")}
            t.src=function(a){if(a instanceof Array){var c;a:{c=a;for(var d=0,e=this.g.techOrder;d<e.length;d++){var g=u.$(e[d]),j=window.videojs[g];if(j.isSupported())for(var k=0,q=c;k<q.length;k++){var n=q[k];if(j.canPlaySource(n)){c={source:n,h:g};break a}}}c=l}c?(a=c.source,c=c.h,c==this.ia?this.src(a):I(this,c,a)):this.a.appendChild(u.e("p",{innerHTML:this.options().notSupportedMessage}))}else a instanceof Object?window.videojs[this.ia].canPlaySource(a)?this.src(a.src):this.src([a]):(this.v.src=a,this.aa?
            (L(this,"src",a),"auto"==this.g.preload&&this.load(),this.g.autoplay&&this.play()):this.L(function(){this.src(a)}));return this};t.load=function(){L(this,"load");return this};t.currentSrc=function(){return K(this,"currentSrc")||this.v.src||""};t.Qa=function(a){return a!==b?(L(this,"setPreload",a),this.g.preload=a,this):K(this,"preload")};t.autoplay=function(a){return a!==b?(L(this,"setAutoplay",a),this.g.autoplay=a,this):K(this,"autoplay")};
            t.loop=function(a){return a!==b?(L(this,"setLoop",a),this.g.loop=a,this):K(this,"loop")};t.poster=function(a){return a!==b?(this.uc=a,this):this.uc};t.controls=function(a){return a!==b?(a=!!a,this.sb!==a&&((this.sb=a)?(this.u("vjs-controls-disabled"),this.n("vjs-controls-enabled"),this.j("controlsenabled")):(this.u("vjs-controls-enabled"),this.n("vjs-controls-disabled"),this.j("controlsdisabled"))),this):this.sb};u.s.prototype.Sb;t=u.s.prototype;
            t.Rb=function(a){return a!==b?(a=!!a,this.Sb!==a&&((this.Sb=a)?(this.n("vjs-using-native-controls"),this.j("usingnativecontrols")):(this.u("vjs-using-native-controls"),this.j("usingcustomcontrols"))),this):this.Sb};t.error=function(){return K(this,"error")};t.seeking=function(){return K(this,"seeking")};t.ka=f;t.Mb=function(){this.ka=f};t.Qb=f;
            t.ja=function(a){return a!==b?(a=!!a,a!==this.Qb&&((this.Qb=a)?(this.ka=f,this.u("vjs-user-inactive"),this.n("vjs-user-active"),this.j("useractive")):(this.ka=l,this.h.U("mousemove",function(a){a.stopPropagation();a.preventDefault()}),this.u("vjs-user-active"),this.n("vjs-user-inactive"),this.j("userinactive"))),this):this.Qb};var N,O,P;P=document.createElement("div");O={};
            P.Hd!==b?(O.wc="requestFullscreen",O.nb="exitFullscreen",O.vb="fullscreenchange",O.H="fullScreen"):(document.mozCancelFullScreen?(N="moz",O.H=N+"FullScreen"):(N="webkit",O.H=N+"IsFullScreen"),P[N+"RequestFullScreen"]&&(O.wc=N+"RequestFullScreen",O.nb=N+"CancelFullScreen"),O.vb=N+"fullscreenchange");document[O.nb]&&(u.Pb.ya=O);u.Fa=u.c.extend();
            u.Fa.prototype.g={Md:"play",children:{playToggle:{},currentTimeDisplay:{},timeDivider:{},durationDisplay:{},remainingTimeDisplay:{},progressControl:{},fullscreenToggle:{},volumeControl:{},muteToggle:{}}};u.Fa.prototype.e=function(){return u.e("div",{className:"vjs-control-bar"})};u.Yb=u.q.extend({i:function(a,c){u.q.call(this,a,c);a.d("play",u.bind(this,this.Kb));a.d("pause",u.bind(this,this.Jb))}});t=u.Yb.prototype;t.qa="Play";t.T=function(){return"vjs-play-control "+u.q.prototype.T.call(this)};
            t.p=function(){this.b.paused()?this.b.play():this.b.pause()};t.Kb=function(){u.u(this.a,"vjs-paused");u.n(this.a,"vjs-playing");this.a.children[0].children[0].innerHTML="Pause"};t.Jb=function(){u.u(this.a,"vjs-playing");u.n(this.a,"vjs-paused");this.a.children[0].children[0].innerHTML="Play"};u.Ya=u.c.extend({i:function(a,c){u.c.call(this,a,c);a.d("timeupdate",u.bind(this,this.Ca))}});
            u.Ya.prototype.e=function(){var a=u.c.prototype.e.call(this,"div",{className:"vjs-current-time vjs-time-controls vjs-control"});this.content=u.e("div",{className:"vjs-current-time-display",innerHTML:'<span class="vjs-control-text">Current Time </span>0:00',"aria-live":"off"});a.appendChild(u.e("div").appendChild(this.content));return a};
            u.Ya.prototype.Ca=function(){var a=this.b.Nb?this.b.v.currentTime:this.b.currentTime();this.content.innerHTML='<span class="vjs-control-text">Current Time </span>'+u.La(a,this.b.duration())};u.Za=u.c.extend({i:function(a,c){u.c.call(this,a,c);a.d("timeupdate",u.bind(this,this.Ca))}});
            u.Za.prototype.e=function(){var a=u.c.prototype.e.call(this,"div",{className:"vjs-duration vjs-time-controls vjs-control"});this.content=u.e("div",{className:"vjs-duration-display",innerHTML:'<span class="vjs-control-text">Duration Time </span>0:00',"aria-live":"off"});a.appendChild(u.e("div").appendChild(this.content));return a};u.Za.prototype.Ca=function(){var a=this.b.duration();a&&(this.content.innerHTML='<span class="vjs-control-text">Duration Time </span>'+u.La(a))};
            u.cc=u.c.extend({i:function(a,c){u.c.call(this,a,c)}});u.cc.prototype.e=function(){return u.c.prototype.e.call(this,"div",{className:"vjs-time-divider",innerHTML:"<div><span>/</span></div>"})};u.fb=u.c.extend({i:function(a,c){u.c.call(this,a,c);a.d("timeupdate",u.bind(this,this.Ca))}});
            u.fb.prototype.e=function(){var a=u.c.prototype.e.call(this,"div",{className:"vjs-remaining-time vjs-time-controls vjs-control"});this.content=u.e("div",{className:"vjs-remaining-time-display",innerHTML:'<span class="vjs-control-text">Remaining Time </span>-0:00',"aria-live":"off"});a.appendChild(u.e("div").appendChild(this.content));return a};u.fb.prototype.Ca=function(){this.b.duration()&&(this.content.innerHTML='<span class="vjs-control-text">Remaining Time </span>-'+u.La(this.b.duration()-this.b.currentTime()))};
            u.Ga=u.q.extend({i:function(a,c){u.q.call(this,a,c)}});u.Ga.prototype.qa="Fullscreen";u.Ga.prototype.T=function(){return"vjs-fullscreen-control "+u.q.prototype.T.call(this)};u.Ga.prototype.p=function(){this.b.H?(this.b.ob(),this.a.children[0].children[0].innerHTML="Fullscreen"):(this.b.ya(),this.a.children[0].children[0].innerHTML="Non-Fullscreen")};u.eb=u.c.extend({i:function(a,c){u.c.call(this,a,c)}});u.eb.prototype.g={children:{seekBar:{}}};
            u.eb.prototype.e=function(){return u.c.prototype.e.call(this,"div",{className:"vjs-progress-control vjs-control"})};u.Zb=u.O.extend({i:function(a,c){u.O.call(this,a,c);a.d("timeupdate",u.bind(this,this.Ba));a.L(u.bind(this,this.Ba))}});t=u.Zb.prototype;t.g={children:{loadProgressBar:{},playProgressBar:{},seekHandle:{}},barName:"playProgressBar",handleName:"seekHandle"};t.tc="timeupdate";t.e=function(){return u.O.prototype.e.call(this,"div",{className:"vjs-progress-holder","aria-label":"video progress bar"})};
            t.Ba=function(){var a=this.b.Nb?this.b.v.currentTime:this.b.currentTime();this.a.setAttribute("aria-valuenow",u.round(100*this.yb(),2));this.a.setAttribute("aria-valuetext",u.La(a,this.b.duration()))};t.yb=function(){var a;"Flash"===this.b.ia&&this.b.seeking()?(a=this.b.v,a=a.rc?a.rc:this.b.currentTime()):a=this.b.currentTime();return a/this.b.duration()};t.Pa=function(a){u.O.prototype.Pa.call(this,a);this.b.Nb=f;this.Dd=!this.b.paused();this.b.pause()};
            t.Hb=function(a){a=F(this,a)*this.b.duration();a==this.b.duration()&&(a-=0.1);this.b.currentTime(a)};t.Ib=function(a){u.O.prototype.Ib.call(this,a);this.b.Nb=l;this.Dd&&this.b.play()};t.zc=function(){this.b.currentTime(this.b.currentTime()+5)};t.yc=function(){this.b.currentTime(this.b.currentTime()-5)};u.ab=u.c.extend({i:function(a,c){u.c.call(this,a,c);a.d("progress",u.bind(this,this.update))}});u.ab.prototype.e=function(){return u.c.prototype.e.call(this,"div",{className:"vjs-load-progress",innerHTML:'<span class="vjs-control-text">Loaded: 0%</span>'})};
            u.ab.prototype.update=function(){this.a.style&&(this.a.style.width=u.round(100*this.b.Ja(),2)+"%")};u.Xb=u.c.extend({i:function(a,c){u.c.call(this,a,c)}});u.Xb.prototype.e=function(){return u.c.prototype.e.call(this,"div",{className:"vjs-play-progress",innerHTML:'<span class="vjs-control-text">Progress: 0%</span>'})};u.gb=u.ea.extend();u.gb.prototype.defaultValue="00:00";u.gb.prototype.e=function(){return u.ea.prototype.e.call(this,"div",{className:"vjs-seek-handle"})};
            u.ib=u.c.extend({i:function(a,c){u.c.call(this,a,c);a.h&&(a.h.m&&a.h.m.volumeControl===l)&&this.n("vjs-hidden");a.d("loadstart",u.bind(this,function(){a.h.m&&a.h.m.volumeControl===l?this.n("vjs-hidden"):this.u("vjs-hidden")}))}});u.ib.prototype.g={children:{volumeBar:{}}};u.ib.prototype.e=function(){return u.c.prototype.e.call(this,"div",{className:"vjs-volume-control vjs-control"})};
            u.hb=u.O.extend({i:function(a,c){u.O.call(this,a,c);a.d("volumechange",u.bind(this,this.Ba));a.L(u.bind(this,this.Ba));setTimeout(u.bind(this,this.update),0)}});t=u.hb.prototype;t.Ba=function(){this.a.setAttribute("aria-valuenow",u.round(100*this.b.volume(),2));this.a.setAttribute("aria-valuetext",u.round(100*this.b.volume(),2)+"%")};t.g={children:{volumeLevel:{},volumeHandle:{}},barName:"volumeLevel",handleName:"volumeHandle"};t.tc="volumechange";
            t.e=function(){return u.O.prototype.e.call(this,"div",{className:"vjs-volume-bar","aria-label":"volume level"})};t.Hb=function(a){this.b.muted()&&this.b.muted(l);this.b.volume(F(this,a))};t.yb=function(){return this.b.muted()?0:this.b.volume()};t.zc=function(){this.b.volume(this.b.volume()+0.1)};t.yc=function(){this.b.volume(this.b.volume()-0.1)};u.dc=u.c.extend({i:function(a,c){u.c.call(this,a,c)}});
            u.dc.prototype.e=function(){return u.c.prototype.e.call(this,"div",{className:"vjs-volume-level",innerHTML:'<span class="vjs-control-text"></span>'})};u.jb=u.ea.extend();u.jb.prototype.defaultValue="00:00";u.jb.prototype.e=function(){return u.ea.prototype.e.call(this,"div",{className:"vjs-volume-handle"})};
            u.da=u.q.extend({i:function(a,c){u.q.call(this,a,c);a.d("volumechange",u.bind(this,this.update));a.h&&(a.h.m&&a.h.m.volumeControl===l)&&this.n("vjs-hidden");a.d("loadstart",u.bind(this,function(){a.h.m&&a.h.m.volumeControl===l?this.n("vjs-hidden"):this.u("vjs-hidden")}))}});u.da.prototype.e=function(){return u.q.prototype.e.call(this,"div",{className:"vjs-mute-control vjs-control",innerHTML:'<div><span class="vjs-control-text">Mute</span></div>'})};
            u.da.prototype.p=function(){this.b.muted(this.b.muted()?l:f)};u.da.prototype.update=function(){var a=this.b.volume(),c=3;0===a||this.b.muted()?c=0:0.33>a?c=1:0.67>a&&(c=2);this.b.muted()?"Unmute"!=this.a.children[0].children[0].innerHTML&&(this.a.children[0].children[0].innerHTML="Unmute"):"Mute"!=this.a.children[0].children[0].innerHTML&&(this.a.children[0].children[0].innerHTML="Mute");for(a=0;4>a;a++)u.u(this.a,"vjs-vol-"+a);u.n(this.a,"vjs-vol-"+c)};
            u.oa=u.R.extend({i:function(a,c){u.R.call(this,a,c);a.d("volumechange",u.bind(this,this.update));a.h&&(a.h.m&&a.h.m.Dc===l)&&this.n("vjs-hidden");a.d("loadstart",u.bind(this,function(){a.h.m&&a.h.m.Dc===l?this.n("vjs-hidden"):this.u("vjs-hidden")}));this.n("vjs-menu-button")}});u.oa.prototype.Ka=function(){var a=new u.ma(this.b,{Vc:"div"}),c=new u.hb(this.b,u.k.B({Cd:f},this.g.Vd));a.Z(c);return a};u.oa.prototype.p=function(){u.da.prototype.p.call(this);u.R.prototype.p.call(this)};
            u.oa.prototype.e=function(){return u.q.prototype.e.call(this,"div",{className:"vjs-volume-menu-button vjs-menu-button vjs-control",innerHTML:'<div><span class="vjs-control-text">Mute</span></div>'})};u.oa.prototype.update=u.da.prototype.update;u.cb=u.q.extend({i:function(a,c){u.q.call(this,a,c);(!a.poster()||!a.controls())&&this.C();a.d("play",u.bind(this,this.C))}});
            u.cb.prototype.e=function(){var a=u.e("div",{className:"vjs-poster",tabIndex:-1}),c=this.b.poster();c&&("backgroundSize"in a.style?a.style.backgroundImage='url("'+c+'")':a.appendChild(u.e("img",{src:c})));return a};u.cb.prototype.p=function(){this.K().controls()&&this.b.play()};
            u.Wb=u.c.extend({i:function(a,c){u.c.call(this,a,c);a.d("canplay",u.bind(this,this.C));a.d("canplaythrough",u.bind(this,this.C));a.d("playing",u.bind(this,this.C));a.d("seeked",u.bind(this,this.C));a.d("seeking",u.bind(this,this.show));a.d("seeked",u.bind(this,this.C));a.d("error",u.bind(this,this.show));a.d("waiting",u.bind(this,this.show))}});u.Wb.prototype.e=function(){return u.c.prototype.e.call(this,"div",{className:"vjs-loading-spinner"})};u.Wa=u.q.extend();
            u.Wa.prototype.e=function(){return u.q.prototype.e.call(this,"div",{className:"vjs-big-play-button",innerHTML:'<span aria-hidden="true"></span>',"aria-label":"play video"})};u.Wa.prototype.p=function(){this.b.play()};
            u.r=u.c.extend({i:function(a,c,d){u.c.call(this,a,c,d);var e,g;g=this;e=this.K();a=function(){if(e.controls()&&!e.Rb()){var a,c;g.d("mousedown",g.p);g.d("touchstart",function(a){a.preventDefault();a.stopPropagation();c=this.b.ja()});a=function(a){a.stopPropagation();c&&this.b.Mb()};g.d("touchmove",a);g.d("touchleave",a);g.d("touchcancel",a);g.d("touchend",a);var d,n,r;d=0;g.d("touchstart",function(){d=(new Date).getTime();r=f});a=function(){r=l};g.d("touchmove",a);g.d("touchleave",a);g.d("touchcancel",
            a);g.d("touchend",function(){r===f&&(n=(new Date).getTime()-d,250>n&&this.j("tap"))});g.d("tap",g.md)}};c=u.bind(g,g.pd);this.L(a);e.d("controlsenabled",a);e.d("controlsdisabled",c)}});u.r.prototype.pd=function(){this.o("tap");this.o("touchstart");this.o("touchmove");this.o("touchleave");this.o("touchcancel");this.o("touchend");this.o("click");this.o("mousedown")};u.r.prototype.p=function(a){0===a.button&&this.K().controls()&&(this.K().paused()?this.K().play():this.K().pause())};
            u.r.prototype.md=function(){this.K().ja(!this.K().ja())};u.r.prototype.m={volumeControl:f,fullscreenResize:l,progressEvents:l,timeupdateEvents:l};u.media={};u.media.Va="play pause paused currentTime setCurrentTime duration buffered volume setVolume muted setMuted width height supportsFullScreen enterFullScreen src load currentSrc preload setPreload autoplay setAutoplay loop setLoop error networkState readyState seeking initialTime startOffsetTime played seekable ended videoTracks audioTracks videoWidth videoHeight textTracks defaultPlaybackRate playbackRate mediaGroup controller controls defaultMuted".split(" ");
            function ea(){var a=u.media.Va[i];return function(){throw Error('The "'+a+"\" method is not available on the playback technology's API");}}for(var i=u.media.Va.length-1;0<=i;i--)u.r.prototype[u.media.Va[i]]=ea();
            u.l=u.r.extend({i:function(a,c,d){this.m.volumeControl=u.l.Uc();this.m.movingMediaElementInDOM=!u.Kc;this.m.fullscreenResize=f;u.r.call(this,a,c,d);(c=c.source)&&this.a.currentSrc===c.src&&0<this.a.networkState?a.j("loadstart"):c&&(this.a.src=c.src);if(u.ac&&a.options().nativeControlsForTouch!==l){var e,g,j,k;e=this;g=this.K();c=g.controls();e.a.controls=!!c;j=function(){e.a.controls=f};k=function(){e.a.controls=l};g.d("controlsenabled",j);g.d("controlsdisabled",k);c=function(){g.o("controlsenabled",
            j);g.o("controlsdisabled",k)};e.d("dispose",c);g.d("usingcustomcontrols",c);g.Rb(f)}a.L(function(){this.M&&(this.g.autoplay&&this.paused())&&(delete this.M.poster,this.play())});for(a=u.l.$a.length-1;0<=a;a--)u.d(this.a,u.l.$a[a],u.bind(this.b,this.$c));this.Ua()}});t=u.l.prototype;t.D=function(){u.r.prototype.D.call(this)};
            t.e=function(){var a=this.b,c=a.M,d;if(!c||this.m.movingMediaElementInDOM===l)c?(d=c.cloneNode(l),u.l.jc(c),c=d,a.M=h):c=u.e("video",{id:a.id()+"_html5_api",className:"vjs-tech"}),c.player=a,u.zb(c,a.w());d=["autoplay","preload","loop","muted"];for(var e=d.length-1;0<=e;e--){var g=d[e];a.g[g]!==h&&(c[g]=a.g[g])}return c};t.$c=function(a){this.j(a);a.stopPropagation()};t.play=function(){this.a.play()};t.pause=function(){this.a.pause()};t.paused=function(){return this.a.paused};t.currentTime=function(){return this.a.currentTime};
            t.sd=function(a){try{this.a.currentTime=a}catch(c){u.log(c,"Video is not ready. (Video.js)")}};t.duration=function(){return this.a.duration||0};t.buffered=function(){return this.a.buffered};t.volume=function(){return this.a.volume};t.xd=function(a){this.a.volume=a};t.muted=function(){return this.a.muted};t.vd=function(a){this.a.muted=a};t.width=function(){return this.a.offsetWidth};t.height=function(){return this.a.offsetHeight};
            t.Ta=function(){return"function"==typeof this.a.webkitEnterFullScreen&&(/Android/.test(u.F)||!/Chrome|Mac OS X 10.5/.test(u.F))?f:l};t.src=function(a){this.a.src=a};t.load=function(){this.a.load()};t.currentSrc=function(){return this.a.currentSrc};t.Qa=function(){return this.a.Qa};t.wd=function(a){this.a.Qa=a};t.autoplay=function(){return this.a.autoplay};t.rd=function(a){this.a.autoplay=a};t.controls=function(){return this.a.controls};t.loop=function(){return this.a.loop};
            t.ud=function(a){this.a.loop=a};t.error=function(){return this.a.error};t.seeking=function(){return this.a.seeking};u.l.isSupported=function(){return!!u.na.canPlayType};u.l.mb=function(a){try{return!!u.na.canPlayType(a.type)}catch(c){return""}};u.l.Uc=function(){var a=u.na.volume;u.na.volume=a/2+0.1;return a!==u.na.volume};u.l.$a="loadstart suspend abort error emptied stalled loadedmetadata loadeddata canplay canplaythrough playing waiting seeking seeked ended durationchange timeupdate progress play pause ratechange volumechange".split(" ");
            u.l.jc=function(a){if(a){a.player=h;for(a.parentNode&&a.parentNode.removeChild(a);a.hasChildNodes();)a.removeChild(a.firstChild);a.removeAttribute("src");"function"===typeof a.load&&a.load()}};u.Oc&&(document.createElement("video").constructor.prototype.canPlayType=function(a){return a&&-1!=a.toLowerCase().indexOf("video/mp4")?"maybe":""});
            u.f=u.r.extend({i:function(a,c,d){u.r.call(this,a,c,d);var e=c.source;d=c.parentEl;var g=this.a=u.e("div",{id:a.id()+"_temp_flash"}),j=a.id()+"_flash_api";a=a.g;var k=u.k.B({readyFunction:"videojs.Flash.onReady",eventProxyFunction:"videojs.Flash.onEvent",errorEventProxyFunction:"videojs.Flash.onError",autoplay:a.autoplay,preload:a.Qa,loop:a.loop,muted:a.muted},c.flashVars),q=u.k.B({wmode:"opaque",bgcolor:"#000000"},c.params),n=u.k.B({id:j,name:j,"class":"vjs-tech"},c.attributes);e&&(e.type&&u.f.ed(e.type)?
            (a=u.f.Ac(e.src),k.rtmpConnection=encodeURIComponent(a.rb),k.rtmpStream=encodeURIComponent(a.Ob)):k.src=encodeURIComponent(u.mc(e.src)));u.zb(g,d);c.startTime&&this.L(function(){this.load();this.play();this.currentTime(c.startTime)});if(c.iFrameMode===f&&!u.Jc){var r=u.e("iframe",{id:j+"_iframe",name:j+"_iframe",className:"vjs-tech",scrolling:"no",marginWidth:0,marginHeight:0,frameBorder:0});k.readyFunction="ready";k.eventProxyFunction="events";k.errorEventProxyFunction="errors";u.d(r,"load",u.bind(this,
            function(){var a,d=r.contentWindow;a=r.contentDocument?r.contentDocument:r.contentWindow.document;a.write(u.f.nc(c.swf,k,q,n));d.player=this.b;d.ready=u.bind(this.b,function(c){var d=this.h;d.a=a.getElementById(c);u.f.pb(d)});d.events=u.bind(this.b,function(a,c){this&&"flash"===this.ia&&this.j(c)});d.errors=u.bind(this.b,function(a,c){u.log("Flash Error",c)})}));g.parentNode.replaceChild(r,g)}else u.f.Zc(c.swf,g,k,q,n)}});t=u.f.prototype;t.D=function(){u.r.prototype.D.call(this)};t.play=function(){this.a.vjs_play()};
            t.pause=function(){this.a.vjs_pause()};t.src=function(a){u.f.dd(a)?(a=u.f.Ac(a),this.Qd(a.rb),this.Rd(a.Ob)):(a=u.mc(a),this.a.vjs_src(a));if(this.b.autoplay()){var c=this;setTimeout(function(){c.play()},0)}};t.currentSrc=function(){var a=this.a.vjs_getProperty("currentSrc");if(a==h){var c=this.Od(),d=this.Pd();c&&d&&(a=u.f.yd(c,d))}return a};t.load=function(){this.a.vjs_load()};t.poster=function(){this.a.vjs_getProperty("poster")};t.buffered=function(){return u.tb(0,this.a.vjs_getProperty("buffered"))};
            t.Ta=s(l);var Q=u.f.prototype,R="rtmpConnection rtmpStream preload currentTime defaultPlaybackRate playbackRate autoplay loop mediaGroup controller controls volume muted defaultMuted".split(" "),S="error currentSrc networkState readyState seeking initialTime duration startOffsetTime paused played seekable ended videoTracks audioTracks videoWidth videoHeight textTracks".split(" ");
            function fa(){var a=R[T],c=a.charAt(0).toUpperCase()+a.slice(1);Q["set"+c]=function(c){return this.a.vjs_setProperty(a,c)}}function U(a){Q[a]=function(){return this.a.vjs_getProperty(a)}}var T;for(T=0;T<R.length;T++)U(R[T]),fa();for(T=0;T<S.length;T++)U(S[T]);u.f.isSupported=function(){return 10<=u.f.version()[0]};u.f.mb=function(a){if(!a.type)return"";a=a.type.replace(/;.*/,"").toLowerCase();if(a in u.f.bd||a in u.f.Bc)return"maybe"};
            u.f.bd={"video/flv":"FLV","video/x-flv":"FLV","video/mp4":"MP4","video/m4v":"MP4"};u.f.Bc={"rtmp/mp4":"MP4","rtmp/flv":"FLV"};u.f.onReady=function(a){a=u.w(a);var c=a.player||a.parentNode.player,d=c.h;a.player=c;d.a=a;u.f.pb(d)};u.f.pb=function(a){a.w().vjs_getProperty?a.Ua():setTimeout(function(){u.f.pb(a)},50)};u.f.onEvent=function(a,c){u.w(a).player.j(c)};u.f.onError=function(a,c){u.w(a).player.j("error");u.log("Flash Error",c,a)};
            u.f.version=function(){var a="0,0,0";try{a=(new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version").replace(/\D+/g,",").match(/^,?(.+),?$/)[1]}catch(c){try{navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin&&(a=(navigator.plugins["Shockwave Flash 2.0"]||navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g,",").match(/^,?(.+),?$/)[1])}catch(d){}}return a.split(",")};
            u.f.Zc=function(a,c,d,e,g){a=u.f.nc(a,d,e,g);a=u.e("div",{innerHTML:a}).childNodes[0];d=c.parentNode;c.parentNode.replaceChild(a,c);var j=d.childNodes[0];setTimeout(function(){j.style.display="block"},1E3)};
            u.f.nc=function(a,c,d,e){var g="",j="",k="";c&&u.k.ua(c,function(a,c){g+=a+"="+c+"&amp;"});d=u.k.B({movie:a,flashvars:g,allowScriptAccess:"always",allowNetworking:"all"},d);u.k.ua(d,function(a,c){j+='<param name="'+a+'" value="'+c+'" />'});e=u.k.B({data:a,width:"100%",height:"100%"},e);u.k.ua(e,function(a,c){k+=a+'="'+c+'" '});return'<object type="application/x-shockwave-flash"'+k+">"+j+"</object>"};u.f.yd=function(a,c){return a+"&"+c};
            u.f.Ac=function(a){var c={rb:"",Ob:""};if(!a)return c;var d=a.indexOf("&"),e;-1!==d?e=d+1:(d=e=a.lastIndexOf("/")+1,0===d&&(d=e=a.length));c.rb=a.substring(0,d);c.Ob=a.substring(e,a.length);return c};u.f.ed=function(a){return a in u.f.Bc};u.f.Qc=/^rtmp[set]?:\/\//i;u.f.dd=function(a){return u.f.Qc.test(a)};
            u.Pc=u.c.extend({i:function(a,c,d){u.c.call(this,a,c,d);if(!a.g.sources||0===a.g.sources.length){c=0;for(d=a.g.techOrder;c<d.length;c++){var e=u.$(d[c]),g=window.videojs[e];if(g&&g.isSupported()){I(a,e);break}}}else a.src(a.g.sources)}});function V(a){a.Aa=a.Aa||[];return a.Aa}function W(a,c,d){for(var e=a.Aa,g=0,j=e.length,k,q;g<j;g++)k=e[g],k.id()===c?(k.show(),q=k):d&&(k.J()==d&&0<k.mode())&&k.disable();(c=q?q.J():d?d:l)&&a.j(c+"trackchange")}
            u.X=u.c.extend({i:function(a,c){u.c.call(this,a,c);this.Q=c.id||"vjs_"+c.kind+"_"+c.language+"_"+u.t++;this.xc=c.src;this.Wc=c["default"]||c.dflt;this.Ad=c.title;this.Ld=c.srclang;this.fd=c.label;this.fa=[];this.ec=[];this.ga=this.ha=0;this.b.d("fullscreenchange",u.bind(this,this.Rc))}});t=u.X.prototype;t.J=p("A");t.src=p("xc");t.ub=p("Wc");t.title=p("Ad");t.label=p("fd");t.readyState=p("ha");t.mode=p("ga");t.Rc=function(){this.a.style.fontSize=this.b.H?140*(screen.width/this.b.width())+"%":""};
            t.e=function(){return u.c.prototype.e.call(this,"div",{className:"vjs-"+this.A+" vjs-text-track"})};t.show=function(){X(this);this.ga=2;u.c.prototype.show.call(this)};t.C=function(){X(this);this.ga=1;u.c.prototype.C.call(this)};t.disable=function(){2==this.ga&&this.C();this.b.o("timeupdate",u.bind(this,this.update,this.Q));this.b.o("ended",u.bind(this,this.reset,this.Q));this.reset();this.b.V.textTrackDisplay.removeChild(this);this.ga=0};
            function X(a){0===a.ha&&a.load();0===a.ga&&(a.b.d("timeupdate",u.bind(a,a.update,a.Q)),a.b.d("ended",u.bind(a,a.reset,a.Q)),("captions"===a.A||"subtitles"===a.A)&&a.b.V.textTrackDisplay.Z(a))}t.load=function(){0===this.ha&&(this.ha=1,u.get(this.xc,u.bind(this,this.nd),u.bind(this,this.Gb)))};t.Gb=function(a){this.error=a;this.ha=3;this.j("error")};
            t.nd=function(a){var c,d;a=a.split("\n");for(var e="",g=1,j=a.length;g<j;g++)if(e=u.trim(a[g])){-1==e.indexOf("--\x3e")?(c=e,e=u.trim(a[++g])):c=this.fa.length;c={id:c,index:this.fa.length};d=e.split(" --\x3e ");c.startTime=Y(d[0]);c.va=Y(d[1]);for(d=[];a[++g]&&(e=u.trim(a[g]));)d.push(e);c.text=d.join("<br/>");this.fa.push(c)}this.ha=2;this.j("loaded")};
            function Y(a){var c=a.split(":");a=0;var d,e,g;3==c.length?(d=c[0],e=c[1],c=c[2]):(d=0,e=c[0],c=c[1]);c=c.split(/\s+/);c=c.splice(0,1)[0];c=c.split(/\.|,/);g=parseFloat(c[1]);c=c[0];a+=3600*parseFloat(d);a+=60*parseFloat(e);a+=parseFloat(c);g&&(a+=g/1E3);return a}
            t.update=function(){if(0<this.fa.length){var a=this.b.currentTime();if(this.Lb===b||a<this.Lb||this.Ma<=a){var c=this.fa,d=this.b.duration(),e=0,g=l,j=[],k,q,n,r;a>=this.Ma||this.Ma===b?r=this.wb!==b?this.wb:0:(g=f,r=this.Db!==b?this.Db:c.length-1);for(;;){n=c[r];if(n.va<=a)e=Math.max(e,n.va),n.Ia&&(n.Ia=l);else if(a<n.startTime){if(d=Math.min(d,n.startTime),n.Ia&&(n.Ia=l),!g)break}else g?(j.splice(0,0,n),q===b&&(q=r),k=r):(j.push(n),k===b&&(k=r),q=r),d=Math.min(d,n.va),e=Math.max(e,n.startTime),
            n.Ia=f;if(g)if(0===r)break;else r--;else if(r===c.length-1)break;else r++}this.ec=j;this.Ma=d;this.Lb=e;this.wb=k;this.Db=q;a=this.ec;c="";d=0;for(e=a.length;d<e;d++)c+='<span class="vjs-tt-cue">'+a[d].text+"</span>";this.a.innerHTML=c;this.j("cuechange")}}};t.reset=function(){this.Ma=0;this.Lb=this.b.duration();this.Db=this.wb=0};u.Ub=u.X.extend();u.Ub.prototype.A="captions";u.$b=u.X.extend();u.$b.prototype.A="subtitles";u.Vb=u.X.extend();u.Vb.prototype.A="chapters";
            u.bc=u.c.extend({i:function(a,c,d){u.c.call(this,a,c,d);if(a.g.tracks&&0<a.g.tracks.length){c=this.b;a=a.g.tracks;var e;for(d=0;d<a.length;d++){e=a[d];var g=c,j=e.kind,k=e.label,q=e.language,n=e;e=g.Aa=g.Aa||[];n=n||{};n.kind=j;n.label=k;n.language=q;j=u.$(j||"subtitles");g=new window.videojs[j+"Track"](g,n);e.push(g)}}}});u.bc.prototype.e=function(){return u.c.prototype.e.call(this,"div",{className:"vjs-text-track-display"})};
            u.Y=u.N.extend({i:function(a,c){var d=this.ca=c.track;c.label=d.label();c.selected=d.ub();u.N.call(this,a,c);this.b.d(d.J()+"trackchange",u.bind(this,this.update))}});u.Y.prototype.p=function(){u.N.prototype.p.call(this);W(this.b,this.ca.Q,this.ca.J())};u.Y.prototype.update=function(){this.selected(2==this.ca.mode())};u.bb=u.Y.extend({i:function(a,c){c.track={J:function(){return c.kind},K:a,label:function(){return c.kind+" off"},ub:s(l),mode:s(l)};u.Y.call(this,a,c);this.selected(f)}});
            u.bb.prototype.p=function(){u.Y.prototype.p.call(this);W(this.b,this.ca.Q,this.ca.J())};u.bb.prototype.update=function(){for(var a=V(this.b),c=0,d=a.length,e,g=f;c<d;c++)e=a[c],e.J()==this.ca.J()&&2==e.mode()&&(g=l);this.selected(g)};u.S=u.R.extend({i:function(a,c){u.R.call(this,a,c);1>=this.I.length&&this.C()}});u.S.prototype.ta=function(){var a=[],c;a.push(new u.bb(this.b,{kind:this.A}));for(var d=0;d<V(this.b).length;d++)c=V(this.b)[d],c.J()===this.A&&a.push(new u.Y(this.b,{track:c}));return a};
            u.Da=u.S.extend({i:function(a,c,d){u.S.call(this,a,c,d);this.a.setAttribute("aria-label","Captions Menu")}});u.Da.prototype.A="captions";u.Da.prototype.qa="Captions";u.Da.prototype.className="vjs-captions-button";u.Ha=u.S.extend({i:function(a,c,d){u.S.call(this,a,c,d);this.a.setAttribute("aria-label","Subtitles Menu")}});u.Ha.prototype.A="subtitles";u.Ha.prototype.qa="Subtitles";u.Ha.prototype.className="vjs-subtitles-button";
            u.Ea=u.S.extend({i:function(a,c,d){u.S.call(this,a,c,d);this.a.setAttribute("aria-label","Chapters Menu")}});t=u.Ea.prototype;t.A="chapters";t.qa="Chapters";t.className="vjs-chapters-button";t.ta=function(){for(var a=[],c,d=0;d<V(this.b).length;d++)c=V(this.b)[d],c.J()===this.A&&a.push(new u.Y(this.b,{track:c}));return a};
            t.Ka=function(){for(var a=V(this.b),c=0,d=a.length,e,g,j=this.I=[];c<d;c++)if(e=a[c],e.J()==this.A&&e.ub()){if(2>e.readyState()){this.Id=e;e.d("loaded",u.bind(this,this.Ka));return}g=e;break}a=this.wa=new u.ma(this.b);a.a.appendChild(u.e("li",{className:"vjs-menu-title",innerHTML:u.$(this.A),zd:-1}));if(g){e=g.fa;for(var k,c=0,d=e.length;c<d;c++)k=e[c],k=new u.Xa(this.b,{track:g,cue:k}),j.push(k),a.Z(k)}0<this.I.length&&this.show();return a};
            u.Xa=u.N.extend({i:function(a,c){var d=this.ca=c.track,e=this.cue=c.cue,g=a.currentTime();c.label=e.text;c.selected=e.startTime<=g&&g<e.va;u.N.call(this,a,c);d.d("cuechange",u.bind(this,this.update))}});u.Xa.prototype.p=function(){u.N.prototype.p.call(this);this.b.currentTime(this.cue.startTime);this.update(this.cue.startTime)};u.Xa.prototype.update=function(){var a=this.cue,c=this.b.currentTime();this.selected(a.startTime<=c&&c<a.va)};
            u.k.B(u.Fa.prototype.g.children,{subtitlesButton:{},captionsButton:{},chaptersButton:{}});
            if("undefined"!==typeof window.JSON&&"function"===window.JSON.parse)u.JSON=window.JSON;else{u.JSON={};var Z=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;u.JSON.parse=function(a,c){function d(a,e){var k,q,n=a[e];if(n&&"object"===typeof n)for(k in n)Object.prototype.hasOwnProperty.call(n,k)&&(q=d(n,k),q!==b?n[k]=q:delete n[k]);return c.call(a,e,n)}var e;a=String(a);Z.lastIndex=0;Z.test(a)&&(a=a.replace(Z,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));
            if(/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return e=eval("("+a+")"),"function"===typeof c?d({"":e},""):e;throw new SyntaxError("JSON.parse(): invalid or malformed JSON data");}}
            u.fc=function(){var a,c,d=document.getElementsByTagName("video");if(d&&0<d.length)for(var e=0,g=d.length;e<g;e++)if((c=d[e])&&c.getAttribute)c.player===b&&(a=c.getAttribute("data-setup"),a!==h&&(a=u.JSON.parse(a||"{}"),v(c,a)));else{u.kb();break}else u.Ec||u.kb()};u.kb=function(){setTimeout(u.fc,1)};"complete"===document.readyState?u.Ec=f:u.U(window,"load",function(){u.Ec=f});u.kb();u.od=function(a,c){u.s.prototype[a]=c};var ga=this;ga.Ed=f;function $(a,c){var d=a.split("."),e=ga;!(d[0]in e)&&e.execScript&&e.execScript("var "+d[0]);for(var g;d.length&&(g=d.shift());)!d.length&&c!==b?e[g]=c:e=e[g]?e[g]:e[g]={}};$("videojs",u);$("_V_",u);$("videojs.options",u.options);$("videojs.players",u.xa);$("videojs.TOUCH_ENABLED",u.ac);$("videojs.cache",u.ra);$("videojs.Component",u.c);u.c.prototype.player=u.c.prototype.K;u.c.prototype.dispose=u.c.prototype.D;u.c.prototype.createEl=u.c.prototype.e;u.c.prototype.el=u.c.prototype.w;u.c.prototype.addChild=u.c.prototype.Z;u.c.prototype.children=u.c.prototype.children;u.c.prototype.on=u.c.prototype.d;u.c.prototype.off=u.c.prototype.o;u.c.prototype.one=u.c.prototype.U;
            u.c.prototype.trigger=u.c.prototype.j;u.c.prototype.triggerReady=u.c.prototype.Ua;u.c.prototype.show=u.c.prototype.show;u.c.prototype.hide=u.c.prototype.C;u.c.prototype.width=u.c.prototype.width;u.c.prototype.height=u.c.prototype.height;u.c.prototype.dimensions=u.c.prototype.Xc;u.c.prototype.ready=u.c.prototype.L;u.c.prototype.addClass=u.c.prototype.n;u.c.prototype.removeClass=u.c.prototype.u;$("videojs.Player",u.s);u.s.prototype.dispose=u.s.prototype.D;u.s.prototype.requestFullScreen=u.s.prototype.ya;
            u.s.prototype.cancelFullScreen=u.s.prototype.ob;u.s.prototype.bufferedPercent=u.s.prototype.Ja;u.s.prototype.usingNativeControls=u.s.prototype.Rb;u.s.prototype.reportUserActivity=u.s.prototype.Mb;u.s.prototype.userActive=u.s.prototype.ja;$("videojs.MediaLoader",u.Pc);$("videojs.TextTrackDisplay",u.bc);$("videojs.ControlBar",u.Fa);$("videojs.Button",u.q);$("videojs.PlayToggle",u.Yb);$("videojs.FullscreenToggle",u.Ga);$("videojs.BigPlayButton",u.Wa);$("videojs.LoadingSpinner",u.Wb);
            $("videojs.CurrentTimeDisplay",u.Ya);$("videojs.DurationDisplay",u.Za);$("videojs.TimeDivider",u.cc);$("videojs.RemainingTimeDisplay",u.fb);$("videojs.Slider",u.O);$("videojs.ProgressControl",u.eb);$("videojs.SeekBar",u.Zb);$("videojs.LoadProgressBar",u.ab);$("videojs.PlayProgressBar",u.Xb);$("videojs.SeekHandle",u.gb);$("videojs.VolumeControl",u.ib);$("videojs.VolumeBar",u.hb);$("videojs.VolumeLevel",u.dc);$("videojs.VolumeMenuButton",u.oa);$("videojs.VolumeHandle",u.jb);$("videojs.MuteToggle",u.da);
            $("videojs.PosterImage",u.cb);$("videojs.Menu",u.ma);$("videojs.MenuItem",u.N);$("videojs.MenuButton",u.R);u.R.prototype.createItems=u.R.prototype.ta;u.S.prototype.createItems=u.S.prototype.ta;u.Ea.prototype.createItems=u.Ea.prototype.ta;$("videojs.SubtitlesButton",u.Ha);$("videojs.CaptionsButton",u.Da);$("videojs.ChaptersButton",u.Ea);$("videojs.MediaTechController",u.r);u.r.prototype.features=u.r.prototype.m;u.r.prototype.m.volumeControl=u.r.prototype.m.Dc;u.r.prototype.m.fullscreenResize=u.r.prototype.m.Jd;
            u.r.prototype.m.progressEvents=u.r.prototype.m.Nd;u.r.prototype.m.timeupdateEvents=u.r.prototype.m.Sd;$("videojs.Html5",u.l);u.l.Events=u.l.$a;u.l.isSupported=u.l.isSupported;u.l.canPlaySource=u.l.mb;u.l.prototype.setCurrentTime=u.l.prototype.sd;u.l.prototype.setVolume=u.l.prototype.xd;u.l.prototype.setMuted=u.l.prototype.vd;u.l.prototype.setPreload=u.l.prototype.wd;u.l.prototype.setAutoplay=u.l.prototype.rd;u.l.prototype.setLoop=u.l.prototype.ud;$("videojs.Flash",u.f);u.f.isSupported=u.f.isSupported;
            u.f.canPlaySource=u.f.mb;u.f.onReady=u.f.onReady;$("videojs.TextTrack",u.X);u.X.prototype.label=u.X.prototype.label;$("videojs.CaptionsTrack",u.Ub);$("videojs.SubtitlesTrack",u.$b);$("videojs.ChaptersTrack",u.Vb);$("videojs.autoSetup",u.fc);$("videojs.plugin",u.od);$("videojs.createTimeRange",u.tb);})();



        } catch (e) {}

    });


olapicRequire.define("Magic/videojs", function(){});

olapicRequire.define("Magic/videojs.youtube",['Magic/videojs'], function(){
  videojs.Youtube=videojs.MediaTechController.extend({init:function(a,b,c){videojs.MediaTechController.call(this,a,b,c);if("undefined"!=typeof b.source)for(var e in b.source)a.options()[e]=b.source[e];this.player_=a;this.player_el_=document.getElementById(a.id());this.player_el_.className+=" vjs-youtube";if(navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/Android.*AppleWebKit/i))a.options().ytcontrols=!0;this.id_=
    this.player_.id()+"_youtube_api";this.el_=videojs.Component.prototype.createEl("iframe",{id:this.id_,className:"vjs-tech",scrolling:"no",marginWidth:0,marginHeight:0,frameBorder:0,webkitAllowFullScreen:"true",mozallowfullscreen:"true",allowFullScreen:"true"});this.iframeblocker=videojs.Component.prototype.createEl("div",{className:"iframeblocker"});var d=this;b=function(){d.paused()?d.play():d.pause()};this.iframeblocker.addEventListener?this.iframeblocker.addEventListener("click",b):this.iframeblocker.attachEvent("onclick",
      b);this.player_.options().ytcontrols||(this.iframeblocker.style.display="block");this.player_el_.insertBefore(this.iframeblocker,this.player_el_.firstChild);this.player_el_.insertBefore(this.el_,this.iframeblocker);this.parseSrc(a.options().src);this.playOnReady=this.player_.options().autoplay||!1;a={enablejsapi:1,iv_load_policy:3,playerapiid:this.id(),disablekb:1,wmode:"transparent",controls:this.player_.options().ytcontrols?1:0,showinfo:0,modestbranding:1,rel:0,autoplay:this.playOnReady?1:0,loop:this.player_.options().loop?
    1:0,list:this.playlistId};"undefined"==typeof a.list&&delete a.list;"file:"!=window.location.protocol?(a.origin=window.location.protocol+"//"+window.location.host,this.el_.src=window.location.protocol+"//www.youtube.com/embed/"+this.videoId+"?"+videojs.Youtube.makeQueryString(a)):this.el_.src="https://www.youtube.com/embed/"+this.videoId+"?"+videojs.Youtube.makeQueryString(a);if(this.playOnReady&&!this.player_.options().ytcontrols){var d=this,f=function(){d.player_.loadingSpinner?d.player_.loadingSpinner.el().style.display=
      "block":setTimeout(f,50)};setTimeout(f,50)}this.player_.options().ytcontrols?this.player_.controls(!1):this.player_.poster()||(null==this.videoId?this.iframeblocker.style.backgroundColor="black":this.player_.poster("https://img.youtube.com/vi/"+this.videoId+"/0.jpg"));videojs.Youtube.apiReady?this.loadYoutube():(videojs.Youtube.loadingQueue.push(this),videojs.Youtube.apiLoading||(a=document.createElement("script"),a.src="//www.youtube.com/iframe_api",b=document.getElementsByTagName("script")[0],b.parentNode.insertBefore(a,
        b),videojs.Youtube.apiLoading=!0))}});videojs.Youtube.prototype.dispose=function(){videojs.MediaTechController.prototype.dispose.call(this)};videojs.Youtube.prototype.parseSrc=function(a){if(this.srcVal=a){var b=a.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);this.videoId=b&&11==b[2].length?b[2]:null;b=a.match(/[?&]list=([^#\&\?]+)/);null!=b&&1<b.length?this.playlistId=b[1]:this.playlistId&&delete this.playlistId}};
videojs.Youtube.prototype.src=function(a){a&&(this.parseSrc(a),null==this.videoId?(this.iframeblocker.style.backgroundColor="black",this.iframeblocker.style.display="block"):(this.ytplayer.loadVideoById(this.videoId),this.player_el_.getElementsByClassName("vjs-poster")[0].style.backgroundImage="url(https://img.youtube.com/vi/"+this.videoId+"/0.jpg)",this.iframeblocker.style.backgroundColor="",this.iframeblocker.style.display="",this.player_.poster("https://img.youtube.com/vi/"+this.videoId+"/0.jpg")));
return this.srcVal};videojs.Youtube.prototype.load=function(){};videojs.Youtube.prototype.play=function(){null!=this.videoId&&(this.player_.options().ytcontrols||this.player_.trigger("waiting"),this.isReady_?this.ytplayer.playVideo():this.playOnReady=!0)};videojs.Youtube.prototype.pause=function(){this.ytplayer.pauseVideo()};videojs.Youtube.prototype.paused=function(){return this.ytplayer?this.lastState!==YT.PlayerState.PLAYING&&this.lastState!==YT.PlayerState.BUFFERING:!0};
videojs.Youtube.prototype.currentTime=function(){return this.ytplayer&&this.ytplayer.getCurrentTime?this.ytplayer.getCurrentTime():0};videojs.Youtube.prototype.setCurrentTime=function(a){this.ytplayer.seekTo(a,!0);this.player_.trigger("timeupdate")};videojs.Youtube.prototype.duration=function(){return this.ytplayer&&this.ytplayer.getDuration?this.ytplayer.getDuration():0};
videojs.Youtube.prototype.volume=function(){this.ytplayer&&isNaN(this.volumeVal)&&(this.volumeVal=this.ytplayer.getVolume()/100);return this.volumeVal};videojs.Youtube.prototype.setVolume=function(a){a&&a!=this.volumeVal&&(this.ytplayer.setVolume(100*a),this.volumeVal=a,this.player_.trigger("volumechange"))};videojs.Youtube.prototype.muted=function(){return this.mutedVal};videojs.Youtube.prototype.setMuted=function(a){a?this.ytplayer.mute():this.ytplayer.unMute();this.mutedVal=a;this.player_.trigger("volumechange")};
videojs.Youtube.prototype.buffered=function(){if(this.ytplayer&&this.ytplayer.getVideoBytesLoaded){var a=this.ytplayer.getVideoBytesLoaded(),b=this.ytplayer.getVideoBytesTotal();if(!a||!b)return 0;var c=this.ytplayer.getDuration(),a=a/b*c,b=this.ytplayer.getVideoStartBytes()/b*c;return videojs.createTimeRange(b,b+a)}return videojs.createTimeRange(0,0)};videojs.Youtube.prototype.supportsFullScreen=function(){return!0};videojs.Youtube.isSupported=function(){return!0};
videojs.Youtube.canPlaySource=function(a){return"video/youtube"==a.type};videojs.Youtube.canControlVolume=function(){return!0};videojs.Youtube.loadingQueue=[];
videojs.Youtube.prototype.loadYoutube=function(){this.ytplayer=new YT.Player(this.id_,{events:{onReady:function(a){a.target.vjsTech.onReady()},onStateChange:function(a){a.target.vjsTech.onStateChange(a.data)},onPlaybackQualityChange:function(a){a.target.vjsTech.onPlaybackQualityChange(a.data)},onError:function(a){a.target.vjsTech.onError(a.data)}}});this.ytplayer.vjsTech=this};
videojs.Youtube.makeQueryString=function(a){var b=[],c;for(c in a)a.hasOwnProperty(c)&&b.push(encodeURIComponent(c)+"="+encodeURIComponent(a[c]));return b.join("&")};window.onYouTubeIframeAPIReady=function(){for(var a;a=videojs.Youtube.loadingQueue.shift();)a.loadYoutube();videojs.Youtube.loadingQueue=[];videojs.Youtube.apiReady=!0};videojs.Youtube.prototype.onReady=function(){this.isReady_=!0;this.triggerReady();this.iframeblocker.style.display="";this.playOnReady&&this.play()};
videojs.Youtube.prototype.onStateChange=function(a){if(a!=this.lastState){switch(a){case -1:this.player_.trigger("durationchange");break;case YT.PlayerState.ENDED:this.player_.options().ytcontrols||(this.player_el_.getElementsByClassName("vjs-poster")[0].style.display="block",this.player_.bigPlayButton.show());this.player_.trigger("ended");break;case YT.PlayerState.PLAYING:this.player_.bigPlayButton.hide();this.player_.trigger("timeupdate");this.player_.trigger("durationchange");this.player_.trigger("playing");
this.player_.trigger("play");break;case YT.PlayerState.PAUSED:this.player_.trigger("pause");break;case YT.PlayerState.BUFFERING:this.player_.trigger("timeupdate"),this.player_.options().ytcontrols||this.player_.trigger("waiting")}this.lastState=a}};
videojs.Youtube.prototype.onPlaybackQualityChange=function(a){switch(a){case "medium":this.player_.videoWidth=480;this.player_.videoHeight=360;break;case "large":this.player_.videoWidth=640;this.player_.videoHeight=480;break;case "hd720":this.player_.videoWidth=960;this.player_.videoHeight=720;break;case "hd1080":this.player_.videoWidth=1440;this.player_.videoHeight=1080;break;case "highres":this.player_.videoWidth=1920;this.player_.videoHeight=1080;break;case "small":this.player_.videoWidth=320;
this.player_.videoHeight=240;break;default:this.player_.videoWidth=0,this.player_.videoHeight=0}this.player_.trigger("ratechange")};videojs.Youtube.prototype.onError=function(a){this.player_.error=a;this.player_.trigger("error")};

(function() {
  var style = document.createElement('style');
  style.setAttribute("type", "text/css");
  var styleInnerText = ' \
  .vjs-youtube .vjs-poster { background-size: cover; }\
  .iframeblocker { display:none;position:absolute;top:0;left:0;width:100%;height:100%;cursor:pointer;z-index:2; }\
  .vjs-youtube.vjs-user-inactive .iframeblocker { display:block; } \
  .vjs-quality-button > div:first-child > span:first-child { position:relative;top:7px }\
  ';
    if (style.styleSheet) {   // for IE
      style.styleSheet.cssText = styleInnerText;
  } else {                // others
    var textnode = document.createTextNode(styleInnerText);
    style.appendChild(textnode);
  }
  document.getElementsByTagName('head')[0].appendChild(style);
})();
})
;
olapicRequire.define("Magic/videojs.youtube", function(){});

/*! Public Gallery Mobile */
(function (r) {
	r.define("Magic/galleryMobile", ['Magic/hogan', 'Magic/commons'], function () {
		(function($) {
			
			var _self = null;
			var _facebook_api = "http://api.facebook.com/restserver.php?method=links.getStats&urls=";
			var _hogan_template = null;
			var _pagination_process = false;
			var _options = null;

			olapicjQuery.galleryMobile = function(options) {

				_self = this;
				_options = options;

				// Adding fb jssdk
				var facebook_app_id = _options.fb_app_id;
				window.fbAsyncInit = function() {
					FB.init({ appId: facebook_app_id, status: true, cookie: true, oauth: true, xfbml: true });
					FB._https = true;
					_self.getCountFacebookComments();
				};
				(function(d){
					var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
					js = d.createElement('script'); js.id = id; js.async = true;
					js.src = "//connect.facebook.net/en_US/all.js";
					d.getElementsByTagName('head')[0].appendChild(js);
				}(document));

				// Olapic Tracker
				_self._tracker = new OlapicTracker();
				var initObject = {
					_api_url: _options.olapic_api_url,
					_api_key: _options.olapic_api_key
				};
				if(_options.olapic_u === 1){
					initObject._olapic_u = _options.olapic_u;
				}
				this._tracker.init(initObject);
				this._tracker.track({
					'event':'BEST_PHOTOS_VIEW',
					'object_id':options.object_id
				});

				//START FUNCTIONS
				this.getBaseTemplate = function(){
					olapicjQuery.ajax({ url:_options.site_url+'/photos/'+_options.owner+'/get_template'+_options.templateType }).done(function(data){
						_self._hogan_template = Hogan.compile(data.template);
					});
				};
				this.generateBackToTop = function(){
					olapicjQuery(window).scroll(function(){
						if (olapicjQuery(this).scrollTop() > 100) {
							olapicjQuery('.backtotop').fadeIn();
						} else {
							olapicjQuery('.backtotop').fadeOut();
						}
					});
					olapicjQuery('.backtotop').click(function(){
						olapicjQuery("html, body").animate({ scrollTop: 0 }, 600);
						return false;
					});
				};
				this.getCountFacebookComments = function(){
					olapicjQuery('.streams-facebook-count').each(function(index, element){
						if(!olapicjQuery(element).data('processed')){
							FB.api({
								method: 'fql.query',
								query: 'SELECT comment_count FROM link_stat WHERE url = "' + olapicjQuery(element).data('url')+'"'
							}, function(data) {
								var comment_count = parseInt(data[0].comment_count, 0);
								olapicjQuery(element).text(comment_count);
								olapicjQuery(element).attr('data-processed', true); //change this for data();
							});
						}
					});
				};
				this.photosPagination = function(){
					olapicjQuery('.load-more-button a').live('click', function(e){
						e.preventDefault();
						var next = $(this);
						if(!_self._pagination_process && (next.attr('href') !== '')){
							_self._pagination_process = true;
							if(next.attr('data-external')){
								location.href = next.attr('href');
								return;
							}
							next.find('.olapic-icon-plus').hide();
							olapicjQuery.ajax({ url:next.attr('href'), data:'ajax=true' }).done(function(data){
								if(data.items.length>0){
									olapicjQuery(data.items).each(function(index, element){
										if(data.isTablet){
											element.image_mobile = element.image_normal;
										}
										var newitem = _self._hogan_template.render(element);
										olapicjQuery('<li/>', { html: newitem }).appendTo('ul.streams-list');
										
										//call the callback
										if(typeof window[settings.functionItemInject] === 'function') {
											window[settings.functionItemInject](element, 'ul.streams-list');
										}
									});
								}
								if(data.next !== '') {
									olapicjQuery('.load-more-button a').attr('href', data.next);
									if(data.showlink){
										olapicjQuery('.load-more-button a').attr('data-external', true);
									}
								}else{
									//Remove morebutton if it's empty
									olapicjQuery('.load-more-button a').remove();
								}
								next.find('.olapic-icon-plus').show();
								_self.getCountFacebookComments();
								_self._pagination_process = false;
								//call the callback
								if(typeof window[settings.functionAllItemInject] === 'function') {
									window[settings.functionAllItemInject]();
								}
							});
						}
					});
				};
				this.reportPhoto = function(){
					olapicjQuery('.report-photo').click(function(e){
						e.preventDefault();
						var scroll = 0;
						if(olapicjQuery('.form-report-photo').is(':visible')){
							olapicjQuery('.form-report-photo').hide();
							scroll = 0;
						} else {
							olapicjQuery('.form-report-photo').show();
							scroll = olapicjQuery('.form-report-photo').offset().top - 50 ;
						}
						olapicjQuery("html, body").animate({
							scrollTop: scroll
						}, 600);
					});
					OlapicCommons.reportPhoto(null, 0, null, 'olapicreportform', function(result){
						if(result) {
							olapicjQuery('.form-report-photo').hide();
							olapicjQuery("html, body").animate({  scrollTop: 0 }, 600);
							location.href = _options.site_url+'/photos/'+_options.owner;
						}
					});
				};
				this.relatedProducts = function(){
					var count = olapicjQuery('ul.products-list li').length;
					if(count>0){
						var w = olapicjQuery('ul.products-list li:first').outerWidth();
						olapicjQuery('ul.products-list').width(count * (w+20));
					}
				};
				//END FUNCTIONS

				if(_options.page == 'StreamsMobile'){
					_self.getBaseTemplate();	
					_self.photosPagination();
				} else if (_options.page == 'StreamsMobileSingle') {
					_self.reportPhoto();
					_self.relatedProducts();
					//Twitter
					OlapicCommons.prepareTwitterPops('.twitter-action');
				}
				_self.generateBackToTop();

				//Remove morebutton if it's empty
				if( olapicjQuery('.load-more-button a').attr('href') === ''){
					olapicjQuery('.load-more-button a').remove();
				}

				//callback functions
				window.settings = window.settings || {};
				window.settings.functionItemInject = 'olapicAfterInjectItem_'+_options.owner;
				window.settings.functionAllItemInject = 'olapicAfterAllInjectItem_'+_options.owner;
				olapicjQuery('.author-info').live('click', function(event){
					var src = olapicjQuery(this).data('source');
					var media_id = olapicjQuery(this).data('media-id');
					if(typeof _self._tracker !== "undefined" && _self._tracker !== null) {
						_self._tracker.track({'event':'EXTERNAL_PHOTO_CLICK', 'extra': {'customer': _options.customer,'media_id': media_id, 'action':'external_picture', 'src': src}, 'object_id': media_id });
					}
				});

			};
		})(olapicjQuery);
	});

}(olapicRequire));

olapicRequire.define("Magic/olapic.galleryMobile", function(){});

// Referene: https://github.com/mattbryson/TouchSwipe-Jquery-Plugin

(function(e){var o="left",n="right",d="up",v="down",c="in",w="out",l="none",r="auto",k="swipe",s="pinch",x="tap",i="doubletap",b="longtap",A="horizontal",t="vertical",h="all",q=10,f="start",j="move",g="end",p="cancel",a="ontouchstart" in window,y="TouchSwipe";var m={fingers:1,threshold:75,cancelThreshold:null,pinchThreshold:20,maxTimeThreshold:null,fingerReleaseThreshold:250,longTapThreshold:500,doubleTapThreshold:200,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,pinchIn:null,pinchOut:null,pinchStatus:null,click:null,tap:null,doubleTap:null,longTap:null,triggerOnTouchEnd:true,triggerOnTouchLeave:false,allowPageScroll:"auto",fallbackToMouseEvents:true,excludedElements:"button, input, select, textarea, a, .noSwipe"};e.fn.swipe=function(D){var C=e(this),B=C.data(y);if(B&&typeof D==="string"){if(B[D]){return B[D].apply(this,Array.prototype.slice.call(arguments,1))}else{e.error("Method "+D+" does not exist on jQuery.swipe")}}else{if(!B&&(typeof D==="object"||!D)){return u.apply(this,arguments)}}return C};e.fn.swipe.defaults=m;e.fn.swipe.phases={PHASE_START:f,PHASE_MOVE:j,PHASE_END:g,PHASE_CANCEL:p};e.fn.swipe.directions={LEFT:o,RIGHT:n,UP:d,DOWN:v,IN:c,OUT:w};e.fn.swipe.pageScroll={NONE:l,HORIZONTAL:A,VERTICAL:t,AUTO:r};e.fn.swipe.fingers={ONE:1,TWO:2,THREE:3,ALL:h};function u(B){if(B&&(B.allowPageScroll===undefined&&(B.swipe!==undefined||B.swipeStatus!==undefined))){B.allowPageScroll=l}if(B.click!==undefined&&B.tap===undefined){B.tap=B.click}if(!B){B={}}B=e.extend({},e.fn.swipe.defaults,B);return this.each(function(){var D=e(this);var C=D.data(y);if(!C){C=new z(this,B);D.data(y,C)}})}function z(a0,aq){var av=(a||!aq.fallbackToMouseEvents),G=av?"touchstart":"mousedown",au=av?"touchmove":"mousemove",R=av?"touchend":"mouseup",P=av?null:"mouseleave",az="touchcancel";var ac=0,aL=null,Y=0,aX=0,aV=0,D=1,am=0,aF=0,J=null;var aN=e(a0);var W="start";var T=0;var aM=null;var Q=0,aY=0,a1=0,aa=0,K=0;var aS=null;try{aN.bind(G,aJ);aN.bind(az,a5)}catch(ag){e.error("events not supported "+G+","+az+" on jQuery.swipe")}this.enable=function(){aN.bind(G,aJ);aN.bind(az,a5);return aN};this.disable=function(){aG();return aN};this.destroy=function(){aG();aN.data(y,null);return aN};this.option=function(a8,a7){if(aq[a8]!==undefined){if(a7===undefined){return aq[a8]}else{aq[a8]=a7}}else{e.error("Option "+a8+" does not exist on jQuery.swipe.options")}};function aJ(a9){if(ax()){return}if(e(a9.target).closest(aq.excludedElements,aN).length>0){return}var ba=a9.originalEvent?a9.originalEvent:a9;var a8,a7=a?ba.touches[0]:ba;W=f;if(a){T=ba.touches.length}else{a9.preventDefault()}ac=0;aL=null;aF=null;Y=0;aX=0;aV=0;D=1;am=0;aM=af();J=X();O();if(!a||(T===aq.fingers||aq.fingers===h)||aT()){ae(0,a7);Q=ao();if(T==2){ae(1,ba.touches[1]);aX=aV=ap(aM[0].start,aM[1].start)}if(aq.swipeStatus||aq.pinchStatus){a8=L(ba,W)}}else{a8=false}if(a8===false){W=p;L(ba,W);return a8}else{ak(true)}}function aZ(ba){var bd=ba.originalEvent?ba.originalEvent:ba;if(W===g||W===p||ai()){return}var a9,a8=a?bd.touches[0]:bd;var bb=aD(a8);aY=ao();if(a){T=bd.touches.length}W=j;if(T==2){if(aX==0){ae(1,bd.touches[1]);aX=aV=ap(aM[0].start,aM[1].start)}else{aD(bd.touches[1]);aV=ap(aM[0].end,aM[1].end);aF=an(aM[0].end,aM[1].end)}D=a3(aX,aV);am=Math.abs(aX-aV)}if((T===aq.fingers||aq.fingers===h)||!a||aT()){aL=aH(bb.start,bb.end);ah(ba,aL);ac=aO(bb.start,bb.end);Y=aI();aE(aL,ac);if(aq.swipeStatus||aq.pinchStatus){a9=L(bd,W)}if(!aq.triggerOnTouchEnd||aq.triggerOnTouchLeave){var a7=true;if(aq.triggerOnTouchLeave){var bc=aU(this);a7=B(bb.end,bc)}if(!aq.triggerOnTouchEnd&&a7){W=ay(j)}else{if(aq.triggerOnTouchLeave&&!a7){W=ay(g)}}if(W==p||W==g){L(bd,W)}}}else{W=p;L(bd,W)}if(a9===false){W=p;L(bd,W)}}function I(a7){var a8=a7.originalEvent;if(a){if(a8.touches.length>0){C();return true}}if(ai()){T=aa}a7.preventDefault();aY=ao();Y=aI();if(a6()){W=p;L(a8,W)}else{if(aq.triggerOnTouchEnd||(aq.triggerOnTouchEnd==false&&W===j)){W=g;L(a8,W)}else{if(!aq.triggerOnTouchEnd&&a2()){W=g;aB(a8,W,x)}else{if(W===j){W=p;L(a8,W)}}}}ak(false)}function a5(){T=0;aY=0;Q=0;aX=0;aV=0;D=1;O();ak(false)}function H(a7){var a8=a7.originalEvent;if(aq.triggerOnTouchLeave){W=ay(g);L(a8,W)}}function aG(){aN.unbind(G,aJ);aN.unbind(az,a5);aN.unbind(au,aZ);aN.unbind(R,I);if(P){aN.unbind(P,H)}ak(false)}function ay(bb){var ba=bb;var a9=aw();var a8=aj();var a7=a6();if(!a9||a7){ba=p}else{if(a8&&bb==j&&(!aq.triggerOnTouchEnd||aq.triggerOnTouchLeave)){ba=g}else{if(!a8&&bb==g&&aq.triggerOnTouchLeave){ba=p}}}return ba}function L(a9,a7){var a8=undefined;if(F()||S()){a8=aB(a9,a7,k)}else{if((M()||aT())&&a8!==false){a8=aB(a9,a7,s)}}if(aC()&&a8!==false){a8=aB(a9,a7,i)}else{if(al()&&a8!==false){a8=aB(a9,a7,b)}else{if(ad()&&a8!==false){a8=aB(a9,a7,x)}}}if(a7===p){a5(a9)}if(a7===g){if(a){if(a9.touches.length==0){a5(a9)}}else{a5(a9)}}return a8}function aB(ba,a7,a9){var a8=undefined;if(a9==k){aN.trigger("swipeStatus",[a7,aL||null,ac||0,Y||0,T]);if(aq.swipeStatus){a8=aq.swipeStatus.call(aN,ba,a7,aL||null,ac||0,Y||0,T);if(a8===false){return false}}if(a7==g&&aR()){aN.trigger("swipe",[aL,ac,Y,T]);if(aq.swipe){a8=aq.swipe.call(aN,ba,aL,ac,Y,T);if(a8===false){return false}}switch(aL){case o:aN.trigger("swipeLeft",[aL,ac,Y,T]);if(aq.swipeLeft){a8=aq.swipeLeft.call(aN,ba,aL,ac,Y,T)}break;case n:aN.trigger("swipeRight",[aL,ac,Y,T]);if(aq.swipeRight){a8=aq.swipeRight.call(aN,ba,aL,ac,Y,T)}break;case d:aN.trigger("swipeUp",[aL,ac,Y,T]);if(aq.swipeUp){a8=aq.swipeUp.call(aN,ba,aL,ac,Y,T)}break;case v:aN.trigger("swipeDown",[aL,ac,Y,T]);if(aq.swipeDown){a8=aq.swipeDown.call(aN,ba,aL,ac,Y,T)}break}}}if(a9==s){aN.trigger("pinchStatus",[a7,aF||null,am||0,Y||0,T,D]);if(aq.pinchStatus){a8=aq.pinchStatus.call(aN,ba,a7,aF||null,am||0,Y||0,T,D);if(a8===false){return false}}if(a7==g&&a4()){switch(aF){case c:aN.trigger("pinchIn",[aF||null,am||0,Y||0,T,D]);if(aq.pinchIn){a8=aq.pinchIn.call(aN,ba,aF||null,am||0,Y||0,T,D)}break;case w:aN.trigger("pinchOut",[aF||null,am||0,Y||0,T,D]);if(aq.pinchOut){a8=aq.pinchOut.call(aN,ba,aF||null,am||0,Y||0,T,D)}break}}}if(a9==x){if(a7===p||a7===g){clearTimeout(aS);if(V()&&!E()){K=ao();aS=setTimeout(e.proxy(function(){K=null;aN.trigger("tap",[ba.target]);if(aq.tap){a8=aq.tap.call(aN,ba,ba.target)}},this),aq.doubleTapThreshold)}else{K=null;aN.trigger("tap",[ba.target]);if(aq.tap){a8=aq.tap.call(aN,ba,ba.target)}}}}else{if(a9==i){if(a7===p||a7===g){clearTimeout(aS);K=null;aN.trigger("doubletap",[ba.target]);if(aq.doubleTap){a8=aq.doubleTap.call(aN,ba,ba.target)}}}else{if(a9==b){if(a7===p||a7===g){clearTimeout(aS);K=null;aN.trigger("longtap",[ba.target]);if(aq.longTap){a8=aq.longTap.call(aN,ba,ba.target)}}}}}return a8}function aj(){var a7=true;if(aq.threshold!==null){a7=ac>=aq.threshold}return a7}function a6(){var a7=false;if(aq.cancelThreshold!==null&&aL!==null){a7=(aP(aL)-ac)>=aq.cancelThreshold}return a7}function ab(){if(aq.pinchThreshold!==null){return am>=aq.pinchThreshold}return true}function aw(){var a7;if(aq.maxTimeThreshold){if(Y>=aq.maxTimeThreshold){a7=false}else{a7=true}}else{a7=true}return a7}function ah(a7,a8){if(aq.allowPageScroll===l||aT()){a7.preventDefault()}else{var a9=aq.allowPageScroll===r;switch(a8){case o:if((aq.swipeLeft&&a9)||(!a9&&aq.allowPageScroll!=A)){a7.preventDefault()}break;case n:if((aq.swipeRight&&a9)||(!a9&&aq.allowPageScroll!=A)){a7.preventDefault()}break;case d:if((aq.swipeUp&&a9)||(!a9&&aq.allowPageScroll!=t)){a7.preventDefault()}break;case v:if((aq.swipeDown&&a9)||(!a9&&aq.allowPageScroll!=t)){a7.preventDefault()}break}}}function a4(){var a8=aK();var a7=U();var a9=ab();return a8&&a7&&a9}function aT(){return !!(aq.pinchStatus||aq.pinchIn||aq.pinchOut)}function M(){return !!(a4()&&aT())}function aR(){var ba=aw();var bc=aj();var a9=aK();var a7=U();var a8=a6();var bb=!a8&&a7&&a9&&bc&&ba;return bb}function S(){return !!(aq.swipe||aq.swipeStatus||aq.swipeLeft||aq.swipeRight||aq.swipeUp||aq.swipeDown)}function F(){return !!(aR()&&S())}function aK(){return((T===aq.fingers||aq.fingers===h)||!a)}function U(){return aM[0].end.x!==0}function a2(){return !!(aq.tap)}function V(){return !!(aq.doubleTap)}function aQ(){return !!(aq.longTap)}function N(){if(K==null){return false}var a7=ao();return(V()&&((a7-K)<=aq.doubleTapThreshold))}function E(){return N()}function at(){return((T===1||!a)&&(isNaN(ac)||ac===0))}function aW(){return((Y>aq.longTapThreshold)&&(ac<q))}function ad(){return !!(at()&&a2())}function aC(){return !!(N()&&V())}function al(){return !!(aW()&&aQ())}function C(){a1=ao();aa=event.touches.length+1}function O(){a1=0;aa=0}function ai(){var a7=false;if(a1){var a8=ao()-a1;if(a8<=aq.fingerReleaseThreshold){a7=true}}return a7}function ax(){return !!(aN.data(y+"_intouch")===true)}function ak(a7){if(a7===true){aN.bind(au,aZ);aN.bind(R,I);if(P){aN.bind(P,H)}}else{aN.unbind(au,aZ,false);aN.unbind(R,I,false);if(P){aN.unbind(P,H,false)}}aN.data(y+"_intouch",a7===true)}function ae(a8,a7){var a9=a7.identifier!==undefined?a7.identifier:0;aM[a8].identifier=a9;aM[a8].start.x=aM[a8].end.x=a7.pageX||a7.clientX;aM[a8].start.y=aM[a8].end.y=a7.pageY||a7.clientY;return aM[a8]}function aD(a7){var a9=a7.identifier!==undefined?a7.identifier:0;var a8=Z(a9);a8.end.x=a7.pageX||a7.clientX;a8.end.y=a7.pageY||a7.clientY;return a8}function Z(a8){for(var a7=0;a7<aM.length;a7++){if(aM[a7].identifier==a8){return aM[a7]}}}function af(){var a7=[];for(var a8=0;a8<=5;a8++){a7.push({start:{x:0,y:0},end:{x:0,y:0},identifier:0})}return a7}function aE(a7,a8){a8=Math.max(a8,aP(a7));J[a7].distance=a8}function aP(a7){return J[a7].distance}function X(){var a7={};a7[o]=ar(o);a7[n]=ar(n);a7[d]=ar(d);a7[v]=ar(v);return a7}function ar(a7){return{direction:a7,distance:0}}function aI(){return aY-Q}function ap(ba,a9){var a8=Math.abs(ba.x-a9.x);var a7=Math.abs(ba.y-a9.y);return Math.round(Math.sqrt(a8*a8+a7*a7))}function a3(a7,a8){var a9=(a8/a7)*1;return a9.toFixed(2)}function an(){if(D<1){return w}else{return c}}function aO(a8,a7){return Math.round(Math.sqrt(Math.pow(a7.x-a8.x,2)+Math.pow(a7.y-a8.y,2)))}function aA(ba,a8){var a7=ba.x-a8.x;var bc=a8.y-ba.y;var a9=Math.atan2(bc,a7);var bb=Math.round(a9*180/Math.PI);if(bb<0){bb=360-Math.abs(bb)}return bb}function aH(a8,a7){var a9=aA(a8,a7);if((a9<=45)&&(a9>=0)){return o}else{if((a9<=360)&&(a9>=315)){return o}else{if((a9>=135)&&(a9<=225)){return n}else{if((a9>45)&&(a9<135)){return v}else{return d}}}}}function ao(){var a7=new Date();return a7.getTime()}function aU(a7){a7=e(a7);var a9=a7.offset();var a8={left:a9.left,right:a9.left+a7.outerWidth(),top:a9.top,bottom:a9.top+a7.outerHeight()};return a8}function B(a7,a8){return(a7.x>a8.left&&a7.x<a8.right&&a7.y>a8.top&&a7.y<a8.bottom)}}})(olapicjQuery);
olapicRequire.define("Magic/jquery.touchSwipe.min", function(){});
