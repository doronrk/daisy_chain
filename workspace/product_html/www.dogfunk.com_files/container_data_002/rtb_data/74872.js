(function() {	
		//Constructor
		var OGO =  (window._$OGO$_ || (window._$OGO$_ = {}));
		var RosettaFramework = (OGO.Rosetta || (OGO.Rosetta = {}));
		var Rosetta = (RosettaFramework.v3_40 || (RosettaFramework.v3_40 = {}))
		var creatives = (RosettaFramework.creatives || (RosettaFramework.creatives = []))

		var trace = (Rosetta.trace || (Rosetta.trace = (function() {try {if (window && window.console && window.console.log){return function(tmp){window.console.log("R: " + tmp)}}} catch(e){}return function(tmp){};}())));
		
		function Creative(dmo) {
			this.dmo = dmo;
			this.prefix = "";
			this.parentDivName;
			this.display;
			//Stores the JSON data in a object after parsing
			this.creativeConfig;

			if (typeof JSON !== "object" && OGO.JSON){
				JSON = OGO.JSON;
			}

			this.json = JSON.parse('[{"timeline":{"tweens":[]},"width":728,"height":90,"framework":[{"version":"3.40","adFormat":"20","name":"Rosetta"},{"version":"1.2.9","adFormat":"0","name":"Atlas"},{"version":"5.52","adFormat":"10","name":"Gepetto"},{"version":"1.4.10","adFormat":"20","name":"WebFontLoader"},{"version":"2.88","name":"Framework"},{"version":"3.60","name":"ImageLoader"},{"version":"2.48","name":"TextResize"},{"version":"1.07","name":"FontLoader"},{"version":"3.20","name":"AdInfo"},{"version":"11.691","name":"TweenLite"},{"version":"3.24","name":"Analytics"},{"version":"5.52","name":"Gepetto"}],"setup":{"hasLinks":true,"clientID":"2149","bypassCache":false,"mediaSize":"-1","multiframe":false,"defaultTimeout":5,"delimiter":"|","enableRetina":false,"pauseStart":false,"forceRetinaUserAgent":false,"cssBase":"http://usweb.dotomi.com/resources/fonts/html/","rosettaVersion":"3.40","flashvars":[{"id":"setup_n1ld","overwrite":"clientID"},{"id":"setup_n2BZ","overwrite":"absDefault"},{"id":"setup_OuEO","overwrite":"hasLinks"},{"id":"setup_61io","overwrite":"bypassCache"},{"id":"setup_5TYO","overwrite":"defaultTimeout"},{"id":"setup_19Aa","overwrite":"frame"},{"id":"setup_m74i","overwrite":"pauseStart"},{"id":"setup_G8nw","overwrite":"baseURL"},{"id":"setup_efzb","overwrite":"companyID"},{"id":"setup_N3mZ","overwrite":"dtmSecure"},{"id":"setup_XnkZ","overwrite":"trackSize"},{"id":"setup_Mlr9","overwrite":"trackInteraction"},{"id":"setup_L2ld","overwrite":"messageTemplateID"},{"id":"setup_zIfJ","overwrite":"dtmMessageID"},{"id":"setup_xtqG","overwrite":"dtmTransID"},{"id":"setup_UR73","overwrite":"delimiter"},{"id":"setup_NB4v","overwrite":"maxEvents"},{"id":"setup_Si8i","overwrite":"mediaSize"},{"id":"setup_0oit","overwrite":"cssBase"},{"id":"setup_7T65","overwrite":"enableRetina"},{"id":"setup_SaOz","overwrite":"forceRetinaUserAgent"},{"id":"setup_4Qcn","overwrite":"multiframe"},{"id":"setup_aycR","overwrite":"totalFrames"}],"trackSize":false,"dtmSecure":false,"frame":0,"trackInteraction":false,"messageTemplateID":"-1","companyID":"2149","dtmMessageID":"-1","baseURL":"http://usweb.dotomi.com/images/2149/","dtmTransID":"-1","maxEvents":0,"absDefault":"default.jpg","totalFrames":1},"display":[{"type":"adinfo","y":0,"params":{"defValue":"","flashvars":[]},"z":0,"width":728,"frames":[0],"height":90,"id":0,"visible":true,"name":"adInfo","x":0},{"type":"shape","y":0,"params":{"borderColor":"0xCCCCCC","pointerEvents":"none","borderStyle":"solid","borderThickness":1,"color":"","roundedCorners":0,"flashvars":[{"id":150.001,"overwrite":"borderColor"}]},"z":150,"width":728,"frames":[0],"height":90,"id":150,"visible":true,"name":"border","x":0},{"type":"bitmapText","y":3,"params":{"fontSize":40,"font":"10663","lineHeight":0,"text":"","hAlign":"center","pointerEvents":"none","tracking":0,"vAlign":"middle","color":"0x000000","flashvars":[{"id":34.002,"overwrite":"color"},{"id":34.003,"overwrite":"font"},{"id":34.004,"overwrite":"fontSize"}]},"z":34,"width":228,"frames":[0],"height":44,"id":34,"visible":true,"name":"headline_text","x":8},{"type":"bitmapText","y":47,"params":{"fontSize":18,"font":"10659","lineHeight":0,"text":"","hAlign":"center","pointerEvents":"none","tracking":0,"vAlign":"middle","color":"0x000000","flashvars":[{"id":33.01,"overwrite":"text"},{"id":33.002,"overwrite":"color"},{"id":33.003,"overwrite":"font"},{"id":33.004,"overwrite":"fontSize"}]},"z":33,"width":228,"frames":[0],"height":23,"id":33,"visible":true,"name":"subhead_text","x":8},{"type":"bitmapText","y":70,"params":{"fontSize":12,"font":"10659","lineHeight":0,"text":"","hAlign":"center","pointerEvents":"none","tracking":0,"vAlign":"middle","color":"0x000000","flashvars":[{"id":30.01,"overwrite":"text"},{"id":30.002,"overwrite":"color"},{"id":30.003,"overwrite":"font"},{"id":30.004,"overwrite":"fontSize"}]},"z":30,"width":228,"frames":[0],"height":16,"id":30,"visible":true,"name":"promo_text","x":8},{"type":"bitmapText","y":-62,"params":{"fontSize":30,"font":"10663","lineHeight":0,"text":"","hAlign":"center","pointerEvents":"none","tracking":0,"vAlign":"middle","color":"0x000000","flashvars":[{"id":29.01,"overwrite":"text"},{"id":29.002,"overwrite":"color"},{"id":29.003,"overwrite":"font"},{"id":29.004,"overwrite":"fontSize"}]},"z":29,"width":138,"frames":[0],"height":24,"id":29,"visible":true,"name":"details_text","x":15},{"type":"bitmapText","params":{"fontSize":15,"font":"10659","lineHeight":-0.3,"text":"","hAlign":"center","pointerEvents":"none","tracking":0,"vAlign":"middle","color":"0x000000","flashvars":[{"id":24.01,"overwrite":"text"},{"id":24.002,"overwrite":"color"},{"id":24.003,"overwrite":"font"},{"id":24.004,"overwrite":"fontSize"}]},"z":24,"frames":[0],"x":611,"y":43,"width":100,"height":35,"id":24,"visible":true,"name":"cta_text"},{"type":"image","y":0,"params":{"scale":"none","color":"","hAlign":"left","pointerEvents":"none","vAlign":"top","image":"","location":"size","flashvars":[{"id":100.01,"overwrite":"image"},{"id":100.002,"overwrite":"color"}]},"z":100,"width":728,"frames":[0],"height":90,"id":100,"visible":true,"name":"fg_img","x":0},{"type":"image","y":0,"params":{"scale":"none","color":"","hAlign":"left","pointerEvents":"none","vAlign":"top","image":"","location":"size","flashvars":[{"id":41.01,"overwrite":"image"},{"id":41.002,"overwrite":"color"}]},"z":41,"width":728,"frames":[0],"height":90,"id":41,"visible":true,"name":"logo_img","x":0},{"type":"image","y":0,"params":{"scale":"none","color":"","hAlign":"left","pointerEvents":"none","vAlign":"top","image":"","location":"size","flashvars":[{"id":3.01,"overwrite":"image"},{"id":3.002,"overwrite":"color"}]},"z":3,"width":728,"frames":[0],"height":90,"id":3,"visible":true,"name":"style_img","x":0},{"type":"image","y":0,"params":{"scale":"none","color":"","hAlign":"left","pointerEvents":"none","vAlign":"top","image":"","location":"size","flashvars":[{"id":2.01,"overwrite":"image"}]},"z":2,"width":728,"frames":[0],"height":90,"id":2,"visible":true,"name":"bg_img","x":0},{"type":"shape","y":0,"params":{"gradientAngle":-90,"borderColor":"","pointerEvents":"none","borderThickness":"0","color":"0xFFFFFF","roundedCorners":"0","flashvars":[{"id":1.001,"overwrite":"color"}]},"z":1,"width":728,"frames":[0],"height":90,"id":1,"visible":true,"name":"bg","x":0},{"type":"shape","params":{"gradientAngle":-90,"borderColor":"","pointerEvents":"none","borderThickness":"2","color":"","roundedCorners":"0","flashvars":[{"id":23.001,"overwrite":"color"},{"id":23.002,"overwrite":"borderColor"}]},"z":21,"frames":[0],"x":605,"y":45,"width":112,"height":35,"id":23,"visible":true,"name":"cta"},{"type":"image","params":{"scale":"none","color":"","hAlign":"left","pointerEvents":"none","vAlign":"top","image":"","location":"noscale","flashvars":[{"id":21.01,"overwrite":"image"},{"id":21.002,"overwrite":"color"}]},"z":23,"frames":[0],"x":605,"y":45,"width":112,"height":35,"id":21,"visible":true,"name":"cta_bg_img"},{"type":"container","y":0,"params":{"pointerEvents":"none","children":[24,23]},"z":22,"width":728,"frames":[0],"height":90,"id":22,"visible":true,"name":"cta_container","x":0}],"groups":[{"frames":[0],"renderOnStart":true,"link":[{"marginTop":0,"order":0,"id":34,"name":"headline_text","priority":0},{"marginTop":0,"order":1,"id":33,"name":"subhead_text","priority":1},{"marginTop":1,"order":2,"id":30,"name":"promo_text","priority":2}],"id":301,"alignment":"middle","alignmentMethod":"y","resizeArea":true}],"resources":{"as3":[],"js":[{"type":"include","version":"2.6.2","src":"/thirdparty/Modernizr","name":"Modernizr"},{"type":"ie10","version":"1.0.0","src":"/thirdparty/PIE_uncompressed","name":"PIE"},{"type":"ie9","version":"2.0beta1","src":"/thirdparty/PIE_IE9_uncompressed","name":"PIE9"},{"type":"ie7ie8","version":"2.0beta1","src":"/thirdparty/PIE_IE678_uncompressed","name":"PIE678"},{"type":"include","version":"1.4.2","src":"/thirdparty/webfont","name":"webfont"},{"type":"include","version":"3.40","src":"/events/BasicEvents","name":"BasicEvents"},{"type":"include","version":"3.40","src":"/utils/XMLPush","name":"XMLPush"},{"type":"include","version":"3.40","src":"/utils/Utils","name":"Utils"},{"type":"include","version":"3.40","src":"/utils/ImageUtils","name":"ImageUtils"},{"type":"include","version":"3.40","src":"/utils/ColorUtils","name":"ColorUtils"},{"type":"include","version":"3.40","src":"/utils/FontManager","name":"FontManager"},{"type":"include","version":"3.40","src":"/utils/BitmapTextUtils","name":"BitmapTextUtils"},{"type":"include","version":"3.40","src":"/loaders/BitmapFontLoader","name":"BitmapFontLoader"},{"type":"include","version":"3.40","src":"/Settings","name":"Settings"},{"type":"include","version":"3.40","src":"/events/EventDispatcher","name":"EventDispatcher"},{"type":"include","version":"3.40","src":"/display/DisplayObject","name":"DisplayObject"},{"type":"include","version":"3.40","src":"/display/BitmapTextField","name":"BitmapTextField"},{"type":"include","version":"3.40","src":"/utils/Detector","name":"Detector"},{"type":"include","version":"3.40","src":"/utils/TextUtils","name":"TextUtils"},{"type":"include","version":"3.40","src":"/display/AdInfo","name":"AdInfo"},{"type":"include","version":"3.40","src":"/display/Shape","name":"Shape"},{"type":"include","version":"3.40","src":"/display/Container","name":"Container"},{"type":"include","version":"3.40","src":"/loaders/ImageLoader","name":"ImageLoader"},{"type":"include","version":"3.40","src":"/display/ImageRenderer","name":"ImageRenderer"},{"type":"include","version":"3.40","src":"/display/TextField","name":"TextField"},{"type":"include","version":"3.40","src":"/detection/BrowserDetect","name":"BrowserDetect"},{"type":"include","version":"3.40","src":"/detection/ModernizrAddOn","name":"ModernizrAddOn"},{"type":"include","version":"3.40","src":"/analytics/Analytics","name":"Analytics"},{"type":"include","version":"3.40","src":"/loaders/FontLoader","name":"FontLoader"},{"type":"include","version":"3.40","src":"/Display","name":"Display"},{"type":"include","version":"3.40","src":"/utils/DisplayUtils","name":"DisplayUtils"},{"type":"include","version":"3.40","src":"/utils/EFUtils","name":"EFUtils"},{"type":"ef","version":"3.40","src":"/display/EF","name":"EF"},{"type":"include","version":"3.40","src":"/utils/Bridge","name":"Bridge"}]},"components":[{"type":"ef","y":0,"params":{"flashvars":[]},"z":301,"width":728,"frames":[0],"height":90,"id":301.9,"name":"ef","x":0}],"required":{"display":[{"frames":[0],"total":1,"need":1,"id":[41]},{"frames":[0],"total":1,"need":1,"id":[2]}],"flashvars":[{"frames":[0],"total":1,"need":1,"id":[41.01]},{"frames":[0],"total":1,"need":1,"id":[2.01]}]},"dependencies":[{"frames":[0],"id":"d301","link":[{"id":34,"name":"headline_text"},{"id":33,"name":"subhead_text"},{"id":30,"name":"promo_text"}]}],"triggers":[],"flashvars":[{"parse":true,"type":"String","expose":true,"id":150.001,"name":"border_color"},{"parse":false,"type":"String","expose":true,"id":"setup_n1ld","name":"client_id"},{"parse":false,"type":"String","expose":true,"id":"setup_n2BZ","name":"abs_default"},{"parse":false,"type":"Boolean","expose":false,"id":"setup_OuEO","name":"has_links"},{"parse":false,"type":"Boolean","expose":true,"id":"setup_61io","name":"bypass_cache"},{"parse":false,"type":"Number","expose":true,"id":"setup_5TYO","name":"default_timeout"},{"parse":false,"type":"Int","expose":false,"id":"setup_19Aa","name":"frame"},{"parse":false,"type":"Boolean","expose":false,"id":"setup_m74i","name":"pauseStart"},{"parse":false,"type":"String","expose":false,"id":"setup_G8nw","name":"base_url"},{"parse":false,"type":"String","expose":false,"id":"setup_efzb","name":"company_id"},{"parse":false,"type":"Boolean","expose":false,"id":"setup_N3mZ","name":"dtm_secure"},{"parse":false,"type":"Boolean","expose":false,"id":"setup_XnkZ","name":"track_size"},{"parse":false,"type":"Boolean","expose":false,"id":"setup_Mlr9","name":"track_interaction"},{"parse":false,"type":"String","expose":false,"id":"setup_L2ld","name":"message_template_id"},{"parse":false,"type":"String","expose":false,"id":"setup_zIfJ","name":"dtm_msgid"},{"parse":false,"type":"String","expose":false,"id":"setup_xtqG","name":"dtm_trans_id"},{"parse":false,"type":"String","expose":false,"id":"setup_UR73","name":"delimiter"},{"parse":false,"type":"Int","expose":false,"id":"setup_NB4v","name":"max_events"},{"parse":false,"type":"String","expose":false,"id":"setup_Si8i","name":"media_size"},{"parse":false,"type":"String","expose":false,"id":"setup_0oit","name":"css_base"},{"parse":false,"type":"Boolean","expose":true,"id":"setup_7T65","name":"enable_retina"},{"parse":false,"type":"Boolean","expose":false,"id":"setup_SaOz","name":"force_retina_user_agent"},{"parse":false,"type":"Boolean","expose":false,"id":"setup_4Qcn","name":"multiframe"},{"parse":false,"type":"Int","expose":false,"id":"setup_aycR","name":"total_frames"},{"parse":false,"type":"String","expose":true,"id":34.01,"name":"headline_text"},{"parse":true,"type":"String","expose":true,"id":34.002,"name":"headline_text_color"},{"parse":false,"type":"String","expose":false,"id":34.003,"name":"headline_text_font"},{"parse":true,"type":"Int","expose":false,"id":34.004,"name":"headline_text_size"},{"parse":false,"type":"String","expose":true,"id":33.01,"name":"subhead_text"},{"parse":true,"type":"String","expose":true,"id":33.002,"name":"subhead_text_color"},{"parse":false,"type":"String","expose":false,"id":33.003,"name":"subhead_text_font"},{"parse":true,"type":"Int","expose":false,"id":33.004,"name":"subhead_text_size"},{"parse":false,"type":"String","expose":true,"id":30.01,"name":"promo_text"},{"parse":true,"type":"String","expose":true,"id":30.002,"name":"promo_text_color"},{"parse":false,"type":"String","expose":false,"id":30.003,"name":"promo_text_font"},{"parse":true,"type":"Int","expose":false,"id":30.004,"name":"promo_text_size"},{"parse":false,"type":"String","expose":true,"id":29.01,"name":"details_text"},{"parse":true,"type":"String","expose":true,"id":29.002,"name":"details_text_color"},{"parse":false,"type":"String","expose":false,"id":29.003,"name":"details_text_font"},{"parse":true,"type":"Int","expose":false,"id":29.004,"name":"details_text_size"},{"parse":false,"type":"String","expose":true,"id":24.01,"name":"cta_text"},{"parse":true,"type":"String","expose":true,"id":24.002,"name":"cta_text_color"},{"parse":false,"type":"String","expose":false,"id":24.003,"name":"cta_text_font"},{"parse":true,"type":"Int","expose":false,"id":24.004,"name":"cta_text_size"},{"parse":false,"type":"String","expose":true,"id":100.01,"name":"fg_img"},{"parse":true,"type":"String","expose":true,"id":100.002,"name":"fg_img_tint"},{"parse":false,"type":"String","expose":true,"id":41.01,"name":"logo_img"},{"parse":true,"type":"String","expose":true,"id":41.002,"name":"logo_img_tint"},{"parse":false,"type":"String","expose":true,"id":20.01,"name":"badge_img"},{"parse":true,"type":"String","expose":true,"id":20.002,"name":"badge_img_tint"},{"parse":false,"type":"String","expose":true,"id":3.01,"name":"style_img"},{"parse":true,"type":"String","expose":true,"id":3.002,"name":"style_img_tint"},{"parse":false,"type":"String","expose":true,"id":2.01,"name":"bg_img"},{"parse":true,"type":"String","expose":true,"id":1.001,"name":"bg_color"},{"parse":true,"type":"String","expose":true,"id":23.001,"name":"cta_bg_color"},{"parse":true,"type":"String","expose":true,"id":23.002,"name":"cta_border_color"},{"parse":false,"type":"String","expose":true,"id":21.01,"name":"cta_bg_img"},{"parse":true,"type":"String","expose":true,"id":21.002,"name":"cta_bg_img_tint"}]}]');
			this.creativeConfig;

			this.Settings;
			this.DisplayUtils
			this.EventBus;
			this.Analytics
			
			this.USE_RAC = false;
			
			this._width = this.dmo.mediaWidth;
			this._height = this.dmo.mediaHeight;
			this._externalURL = this.dmo.externalURL || "http://usweb.dotomi.com/renderer";
			this._atomSuffix = this.dmo.atomSuffix
			this._gsAnalytics = this.dmo.gsAnalytics
			var debug = this.dmo.spDebug || false;
			this.platformConfig = {
				queryVars:this.dmo.flashVars || "",
				clickFunc:this.dmo.handleCommand, 
				clickFuncScope:this.dmo, 
				eventLog:this.dmo.logEvent,
				eventLogScope: this.dmo, 
				errorLog:this.dmo.logError,
				errorLogScope:this.dmo
			}	

			this._fontStatusArray = [];
			this._enviromentStatusArray = []
			this._doRequire;
			this._isEnviromentReady = true;
			this._registeredCallbacks = [];
			this._startTime;

			if (debug !== true){
				trace = function (tmp){};
			}
		}
		
		var p = Creative.prototype;

		var BasicEvent;
		var TweenMax;
		var TimelineMax;
		var R;
		
		//Public
		p.init = function(parentDivName, doRequire) {
			
			this._startTime = new Date().getTime();
			this._doRequire = doRequire;
			Rosetta.trace = trace;
			if (parentDivName){
				this.prefix	 = parentDivName + "_";
			}
			this.parentDivName = parentDivName;
			this._setup();
			if (this.USE_RAC == true){
				if (RAC){
					var context = this;
					//START GS CUSTOMIZE
					RAC.setInitialOrientation(RAC.ORIENTATION.PORTRAIT);
					//END GS CUSTOMIZE
					RAC.addEventListener("displayed", function(){context._checkEnviromentStatus("RAC", "displayed")});
				} else {
					this._checkEnviromentStatus("RAC", "skip")
				}
			} else {
				if (this._isEnviromentReady == true){
					this._checkEnviromentStatus("parentEnviroment", this._isEnviromentReady);
				}
			}			
		}
		//Public
		p.enviromentReady = function(isReady){
			this._isEnviromentReady = isReady;
			if (isReady == true){
				this._checkEnviromentStatus("parentEnviroment", this._isEnviromentReady);
			}
		}
		//Public
		p.registerCallback = function(evt, callback, scope){
			this._registeredCallbacks.push({evt:evt, callback:callback, scope:scope})
		}

		p._checkForCallback = function(evt){
			if (!evt){return;}
			var arr = this._registeredCallbacks;
			for (var i=0; i<arr.length; i++){
				if (arr[i].evt == evt){
					if (arr[i].callback){
						try{
							arr[i].callback.call(arr[i].scope);
						} catch(e){  trace("Callback failed");   }
	                } 
				}
			}
		}

		p._setup = function (){
			//Search through all the sizes and return only the json needed to display the ad (determined by ad size)
			this.creativeConfig =  obtainConfig(this.json,  this._width, this._height) || this.creativeConfig;
			this._addResources();
			this.json = null;
			this._loadAllResources();
		}			
		function obtainConfig(tmp,  mw, mh){
			if (tmp){
				for (var i=0; i<tmp.length; i++){
					if (tmp[i].width == mw && tmp[i].height == mh){
						return tmp[i];	
					}
				}
			}
			return null;
		}
		p._loadAllResources = function(){
			var scriptBasePath = this._externalURL;
			
			var resourcesPath =  "dotomi";	
			var ie = (function(){ var undef, v = 3, div = document.createElement('div'), all = div.getElementsByTagName('i');
						    while (div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->', all[0]); 
						    return v > 4 ? v : undef; 
							}());

			var tmpArray = new Array();
			if (this.creativeConfig.resources){
				var totalResources = this.creativeConfig.resources.js.length;
				var tmpPath = "";
				var res;
				for (var i=0; i<totalResources; i++){
					res = this.creativeConfig.resources.js[i];	
					tmpPath = resourcesPath + res.src;
					if(ie && res.name.indexOf("PIE") > -1){
						if (ie == 9 && res.type.indexOf(ie) > -1 ){
							tmpArray.push(tmpPath);
						} else if(ie < 9 && res.type.indexOf(ie) > -1 ){
							tmpArray.push(tmpPath);
						} else if (res.type.indexOf(ie) > -1) {
							tmpArray.push(tmpPath);
						}
					} else if (res.name.indexOf("PIE") == -1){
						tmpArray.push(tmpPath);
					}
				}
			} else {
				tmpArray = [];
			}
			
			var context = this;
			var atomSuffix = "";
			var errorFunc = function(e){
				if (context && context.platformConfig && context.platformConfig.errorLog){
					context.platformConfig.errorLog.call(context.platformConfig.errorLogScope, e);
				} else {
					trace("RequireJS Resource Failed")
				}
			};			
			if (this._atomSuffix){
				atomSuffix = this._atomSuffix;
				errorFunc = function(e){throw e;} 
			}
			
				this._doRequire([
			    scriptBasePath + "/atom/"+ "3.40"+ "/"+"2.0.0"+"/?scripts=" + tmpArray.join(",") + atomSuffix],
			function(){context._resourcesReady.call(context);}, errorFunc);
		}
		


		//Called when all scripts are dont loaded and ready to be used
		p._resourcesReady = function(){	
			trace("resourcesReady"); 
			this.display = new Rosetta.Display(this);
			this.display.name = this.parentDivName;
			this.display.allResourcesReady.call(this.display, this._doRequire, this._assignUtils);
		}		
		//Checks to make sure all assets are ready before creating ad. Length must be three
		p._pageReady = function (defaultLogic){
			this._addDependencies();
			//Page is ready				
			var parentDiv = document.getElementById(this.parentDivName);
			if (!parentDiv){
				parentDiv= document.body;
				parentDiv.style.margin = '0px';
			} else if (this.USE_RAC == true){
				parentDiv.style.marginTop = -(Number(this._height) * .5) + "px";
				parentDiv.style.marginLeft = -(Number(this._width) * .5) + "px";
			}
			this.display.createStage.call(this.display, parentDiv, defaultLogic);
		}
			
		p._assignUtils = function(ref){
			this.Settings = ref.Settings;
			this.DisplayUtils = ref.DisplayUtils;
			this.EventBus = ref.EventBus;
			this.Analytics = ref.Analytics;
			BasicEvent = ref.BasicEvent;
			TweenMax = ref.TweenMax;
			TimelineMax = ref.TimelineMax;
			//
			R = ref.Bridge;
			R.init(this, this.creativeConfig, this.display, this.prefix);
			this._assignResourceReference(ref);
			this._addVars();
			//
			this.EventBus.addEventListener(this.display, BasicEvent.CREATIVE_FONTS_READY, this._fontsReady, this);
			this.EventBus.addEventListener(this.display, BasicEvent.CREATIVE_ANIMATE, this._animate, this);
			this.EventBus.addEventListener(this.display, BasicEvent.CREATIVE_ADD_LISTENERS, this._addListeners, this);
			this.EventBus.addEventListener(this.display, BasicEvent.CREATIVE_PREPARE, this._prepare, this);
			this.EventBus.addEventListener(this.display, BasicEvent.STATUS, this._statusUpdate, this);
			this.EventBus.addEventListener(this.display, BasicEvent.CREATIVE_FALLBACK, this._creativeFallback, this)
			//
			this.display.startConfiguration.call(this.display, this.platformConfig, this.creativeConfig, this.prefix);
		}

		// Hook for custom code immediately before animateCreative()
		p._fontsReady = function(e){
			//trace("Creative fonts ready, p._fontsReady" + e.fontFace + " , " + e.bitmapFont);
			var tmp = [];
			tmp.push({src:"fontFace", val:e.fontFace})
			tmp.push({src:"bitmapFont", val:e.bitmapFont})
			var defaultLogic = checkForFontFail(tmp);
			this._pageReady(defaultLogic);

		}
		function checkForFontFail(fontStatusArray){
			var defaultLogic = {isDefault:false, reason: ""};
			while (fontStatusArray.length > 0){
				if (fontStatusArray[0].val == false){
					defaultLogic =  {isDefault:true, reason:fontStatusArray[0].src};
					break;		
				}
				fontStatusArray.shift();
			}
			fontStatusArray = null;
			return defaultLogic;
		}
		p._checkEnviromentStatus = function(src, val){
			//trace("src=" + src + " val=" + val);
			for (var i=0; i<this._enviromentStatusArray.length; i++){
				if (this._enviromentStatusArray[i].src == src){
					return;	
				}
			}
			trace("src=" + src + " val=" + val);
			this._enviromentStatusArray.push({src:src, val:val});
			if (this._enviromentStatusArray.length == 2){
				this._showCreative();
			}
		}
		p._prepare = function(e){
			this._prepareAnimation(e);
			this._checkForCallback("creative_ready")
			this._checkEnviromentStatus("creative", "animation");
		}

		p._showCreative = function(){
			//Wait for MRAID before firing
			if (this.USE_RAC == true){
				fireGSAnalytics(this._gsAnalytics)
			}
			this._checkForCallback("creative_shown")
			this.EventBus.dispatchEvent(this, BasicEvent.CREATIVE_ANIMATE,{})
		}
		function fireGSAnalytics(tmp){
			var fired = false;
			try {
				if (gs && gs.Stats){
					gs.Stats.init(tmp);
					gs.Stats.set("Impression", 1);
					fired = true;
				} 
			} catch (e){}
			if (fired == false){
				trace("Error: No GS Analytics found");
			}
		}

		/* ---------------------BEGIN CUSTOMIZATION------------------------------------------------------------------------------------- */


		/**
		 * Ability to add a resource without manually editing JSON.
		 * Note: 'unshift' for thirdparties, 'push' for cnvr scripts
		 */
		p._addResources = function(){
			//this.creativeConfig.resources.js.unshift({src:"/thirdparty/TweenMax.min", name:"TweenMax", type:"include", version:"1.10.3"})
		}
		/**
		 * Assign the resource to a var for use.
		 * Note: There is no need to do it for TweenMax/TimelineMax
		 * @param {Object} e {myClass:classInstance}
		 */
		p._assignResourceReference = function(reference){
			//this.myClass = reference.myClass;
		}
		/**
		 * Dynamically add a var (flashvar). The var will appear in the CTT
		 * Note: The var will appear in the CTT if 'expose' is set to true
		 */
		p._addVars = function(){
			//R.addVar(name, type, expose, parse)
		}
		/**
		 * Add a dependency to tell the framework to wait for certain assets to download before calling any animation functions.
		 * Note: Make sure all display objects in which you are writing custom code for is a dependency. 
		 */
		p._addDependencies = function(){
			R.addDependency("style_img");
			R.addDependency("cta_bg_img");
			R.addDependency("cta");
			
			if (R.getVar("details_text") != null && R.getVar("headline_text") == null)
			{
				R.getObject("headline_text").params.text = R.getVar("details_text");

			} else if (R.getVar("details_text") === null && R.getVar("headline_text") != null) {

				R.getObject("headline_text").params.text = R.getVar("headline_text");

			} else if (R.getVar("details_text") != null && R.getVar("headline_text") != null)
			{
				R.getObject("headline_text").params.text = R.getVar("details_text") + " " + R.getVar("headline_text");
			}
		}
		/**
		 * Add additional event listeners.
		 * Note: This is useful when writing custom code for components
		 */
		p._addListeners = function(e) {
	
		}
		/**
		 * Allows the ability to setup display objects before the internal animation function is called.
		 * 
		 */
		p._prepareAnimation = function (e){
			var ctaBg = R.getDiv("cta_bg_img")
			ctaBg.style.overflow = "hidden";
			ctaBg.style.width = parseInt(R.getDiv("cta").style.width) + "px";
			ctaBg.style.height = parseInt(R.getDiv("cta").style.height) + "px";
		}
		/**
		 * Animate creative. Called for the first time after the internal animate function is called and for every frame change
		 * @param {Object} e {currentFrame:1, isMultiframe:false, isOutro:false, isAuto:false, isIntro:false, duration:{intro:0.3, frame:2, outro:0.6}}
		 **/
		p._animate = function(e) {
			//trace("Creative._animate");
			/*switch (e.currentFrame){
				case 1:
					break;
				case 2:
					break;
			}*/
		}
		/**
		 * Called if the creative should fallback. 
		 * Note: This is useful when wanting to fall back to something other than an evergreen.
		 * @param {Object} e {reason:defaultReason, params:defaultParams}
		 **/
		p._creativeFallback = function (e){

		}
		/**
		 * Called at certain 'checkpoints' in the creative rendering process. 
		 * Note: Useful mainly for troubleshooting and analytics.
		 * @param {Object} e {msg:status}
		 **/
		p._statusUpdate = function(e){
			/*if (this.display.isCreativeFallback !== true){
				var currentTime = Number(new Date().getTime());
				switch (e.msg){
					case "REQUIRED-ASSETS-LOADED":
						this.Analytics.sendEvent(e.msg, "", currentTime - Number(this._startTime) );
						break;
					case "CREATIVE-RENDERED":
						this.Analytics.sendEvent(e.msg, "", currentTime - Number(this._startTime) );
						break;
				};
			}*/	
		}

		/* ---------------------END CUSTOMIZATION------------------------------------------------------------------------------------- */

		creatives.push(Creative);
	}());