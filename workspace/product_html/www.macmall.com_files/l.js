

var _FFmpnTable = '';
var _FFeanTable = '';

if(!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g,'');
  };
}

function _FFOpenWin(sticky_URL_fix){
	var qliteWidth = 680,
	    qliteHeight = 550,
	    ModalWin = null,
	    TP = 10,
	    LP = 10,
	    settings = 'height=' + qliteHeight + ',width=' + qliteWidth + ',top=' + TP + ',left=' + LP + ',scrollbars=yes';
	if (!ModalWin || ModalWin.closed){ 
		ModalWin = window.open(sticky_URL_fix, 'ModalWin', settings);
		if (sticky_URL_fix.indexOf('quikcliplite') !== -1) {
			ModalWin.moveTo(10, 10);
			ModalWin.resizeTo(qliteWidth, qliteHeight);
		} else {
			if (ModalWin && ModalWin.focus) { ModalWin.focus(); }
		}
	} 
}

var _FFMatcher = {
	DATA_DOMAIN : ('https:' == document.location.protocol) ? 'https://media.flixsyndication.net/minisite/ssl' : 'http://media.flixfacts.com',
	IMAGE_DOMAIN : ('https:' == document.location.protocol) ? 'https://media.flixsyndication.net/minisite/ssl/logo/' : 'http://logo.flixfacts.co.uk',
	CONFIG:'conf.txt',
	_ffscript : '', 
	_ffparams : '',
	_FFmpn : '',
    _FFabdata : {'res':'','f':0,'ab':0,'abid':'','tabs':'','ab_src':''},
    _FFean :'',
	_FFbrand:'',
	_FFd :'',
	_FFlang : '',
	_FFfallbacklang : '',
	_FFcontId :'',
	_FFEmbType:'',
	_FFCExists:{},
	_FFmmExists:0,
	_FFmatch:{},
	_FFpagedata: {},
	_FFSio_Ty: 0,


	init : function(){			

		var _ffId=null,
		    scs = document.getElementsByTagName('script');
		
		_ffId='flixmedia'+Math.random();	
		
		for(var i=0;i<scs.length;i++){
			
			if( scs[i].src.indexOf('t.flix360.com') != -1 ) {
				continue;	
			}

				if (scs[i].src.lastIndexOf('l.v2.js') !=-1 && (scs[i].src.indexOf('flixfacts.co.uk') > 0 || scs[i].src.indexOf('flixsyndication.net/minisite/ssl/logo') != -1 || scs[i].src.indexOf('flixsyndication.net/delivery/static') > 0 ))				
				{
					if (!scs[i].getAttribute("processed") )
					{
						scs[i].setAttribute("processed","true");
						scs[i].id=_ffId;
						break;					
					}
				}
			}

	    try {
	        if( ! window.flixJsCallbacks.gvid ) {
	            var ticks = 3;
	            (function threeTicks() {
	                if( window.flixJsCallbacks && typeof window.flixJsCallbacks.gvid == 'undefined' && ticks ) {
	                    setTimeout(function(){ 
	                        ticks--;
	                        threeTicks();
	                    },100)
	                }
	                else {
	                    (function() {
	                        if ( document.getElementById('data-flix-t-script') ) return;
	                        window['flixgvid'] = function(obj){
	                            try{
	                                delete window['flixgvid'];
	                                window.flixJsCallbacks = window.flixJsCallbacks || {};
	                                window.flixJsCallbacks['gvid'] = obj['gvid'];
	                             }catch(e){}
	                        };

	                        var _fscript = document.createElement('script');
	                        _fscript.setAttribute("type","text/javascript");
	                        _fscript.setAttribute("src", "//t.flix360.com/?f=flixgvid");
	                        _fscript.setAttribute("async", "true");
	                        _fscript.id = "data-flix-t-script";
	                        document.getElementsByTagName('head')[0].appendChild(_fscript);                 
	                    })();
	                }
	            })();
	        }
	    } catch( e ) {}
		
		_FFMatcher._ffscript = window.document.getElementById(_ffId).getAttribute('src');
		_FFMatcher._ffparams = _FFMatcher._ffscript.substr(_FFMatcher._ffscript.indexOf('?'));
		_FFMatcher._FFmpn = _FFUtils._FFParseQueryString(_FFMatcher._ffparams, 'mpn', '');
		_FFMatcher._FFean = _FFUtils._FFParseQueryString(_FFMatcher._ffparams, 'ean', '');
		_FFMatcher._FFbrand=_FFUtils._FFParseQueryString(_FFMatcher._ffparams, 'brand', '');
        _FFMatcher._FFabdata.res=_FFUtils._FFParseQueryString(_FFMatcher._ffparams, 'res','na');
        _FFMatcher._FFabdata.f=_FFUtils._FFParseQueryString(_FFMatcher._ffparams, 'filter',0);
        _FFMatcher._FFabdata.ab=_FFUtils._FFParseQueryString(_FFMatcher._ffparams, 'ab',0);
        _FFMatcher._FFabdata.abid=_FFUtils._FFParseQueryString(_FFMatcher._ffparams, 'abid','');
        _FFMatcher._FFabdata.tabs=_FFUtils._FFParseQueryString(_FFMatcher._ffparams, 'tabs','');
        _FFMatcher._FFabdata.ab_src=_FFUtils._FFParseQueryString(_FFMatcher._ffparams, 'ab_src','');
        _FFMatcher._FFpagedata=window.flixJsCallbacks.pageGeneric;



        if (_FFMatcher._FFean!='') {
			var isEanNum = /^\d+$/.test(_FFMatcher._FFean);
			if (!isEanNum){
				_FFMatcher._FFean='';
			}else if (_FFMatcher._FFean.length<13){
				_FFMatcher._FFean = Array(13 + 1 - _FFMatcher._FFean.length).join('0') + _FFMatcher._FFean;
			}	
		}
		_FFMatcher._FFd = _FFUtils._FFParseQueryString(_FFMatcher._ffparams, 'd', '0');
		_FFMatcher._FFlang = _FFUtils._FFParseQueryString(_FFMatcher._ffparams, 'l', 'en');
		_FFMatcher._FFfallbacklang = _FFUtils._FFParseQueryString(_FFMatcher._ffparams, 'fl', '');
		_FFMatcher._FFrev = _FFUtils._FFParseQueryString(_FFMatcher._ffparams, 'r', '');
		_FFMatcher._FFEmbType = _FFUtils._FFParseQueryString(_FFMatcher._ffparams, 'embed', 0);
		
		var contId = _FFUtils._FFParseQueryString(_FFMatcher._ffparams, 'dom', '',0);
		_FFMatcher._FFcontId = (contId!='') ? contId  : "div" + _ffId;

		/*if (contId==""){
			document.write('<div id="' + _FFMatcher._FFcontId + '"></div>');
		}*/

		var dom = document.getElementById(_FFMatcher._FFcontId);
		if (!dom){
			try{
			var div = document.createElement('div');
			div.id=_FFMatcher._FFcontId;
			window.document.getElementById(_ffId).parentNode.appendChild(div);
			}catch(e){
				//console.log(e.message);
			}
		}
	},
	_FFshowButton: function (p_id, contId, isComplementary,type,lang) {
		if(_FFMatcher._FFd == '77'){
			var url = ('https:' == document.location.protocol) ? 'https://media.flixsyndication.net/minisite/ssl/webservice/index.php/stats/referrer/minisite?' : 'http://webservice.flixsyndication.net/index.php/stats/referrer/minisite?';
			var url = url + "ri=" + _FFMatcher._FFd;
			var url = url + "&pi=" + p_id;
			var url = url + "&l=" + _FFMatcher._FFlang;
			var url = url + "&re=" + document.referrer;
			var url = url + "&h="+window.location.hostname;
			var url = url + "&p="+window.location.href;
			var img = new Image();
	      	img.src = url;
      	}
		
		var html = (_FFMatcher._FFEmbType>0 && !isComplementary) ?  _FFUtils._FFEmbedHtml(p_id,_FFMatcher._FFEmbType,lang) : _FFUtils._FFButtonHtml(p_id, isComplementary,lang) ;

		_FFUtils._FFWriteHtml(contId, html,isComplementary);
		_FFUtils._FFsendLog(contId, 'ok', p_id,type);
	},
	_FFmain : function (d_id, lang, mpn, ean, contId) {
		_FFMatcher[contId+"ajax"]={};
		_FFUtils._FFmakeRequest(_FFMatcher.DATA_DOMAIN + '/data/'+_FFMatcher.CONFIG, function(){_FFMatcher._FFGetDataFiles(d_id, lang, mpn, ean, contId)},contId);
	},
	_FFGetDataFiles: function (d_id, lang, mpn, ean, contId){	
		var r = _FFMatcher._FFrev;
	
		if (mpn.length > 0) _FFMatcher._FFProcessCode((r==1) ? 0 : d_id, lang, mpn, 'mpn', contId, 'mpn');
		if (ean.length > 0) _FFMatcher._FFProcessCode((r==1) ? 0 : d_id, lang, ean, 'ean', contId, 'ean');

		if(_FFUtils._FFIsUrlistExist()) _FFMatcher._FFProcessCode(d_id, lang, mpn, 'url', contId, 'url');
	
		if(_FFUtils._FFIsComplimentaryExist() && mpn.length > 0 ) _FFMatcher._FFProcessCode(d_id, lang, mpn, 'c', contId, 'mpn');
		if(_FFUtils._FFIsComplimentaryExist() && ean.length > 0 ) _FFMatcher._FFProcessCode(d_id, lang, ean, 'c', contId, 'ean');

		/* handle fallback language */
		if (_FFMatcher._FFfallbacklang!="" && _FFMatcher._FFlang != _FFMatcher._FFfallbacklang)
		{
			_FFMatcher[contId+"inveral"]= setInterval(function(){
				try
				{
					
					if (!_FFUtils._isEmpty(_FFMatcher[contId+"ajax"])) return false;					
					clearInterval(_FFMatcher[contId+"inveral"]);					
					_FFMatcher[contId+"ajax"]={};
					_FFMatcher._FFlang = _FFMatcher._FFfallbacklang;								
					if (_FFUtils._isEmpty(_FFMatcher._FFCExists) ) _FFMatcher._FFmain(_FFMatcher._FFd, _FFMatcher._FFlang, _FFMatcher._FFmpn, _FFMatcher._FFean, _FFMatcher._FFcontId);
				}catch (e){}
				
			},200); 
		}
		
	},
	_FFProcessCode: function (d_id, lang, code, name, contId, type) {
		var domain = _FFMatcher.DATA_DOMAIN;
		var crc = Math.abs(_FFUtils._FFcrc32(code, contId)) % 100;
		var url = domain + '/data/' + d_id + '/' + lang + '/' + name + '/' + crc + '.txt';
		if (name=='c')
		{
			_FFUtils._FFmakeRequest(url, function(){_FFMatcher._FFCheckComplimentaryProduct(code, window["_FF"+name+"Table"], contId, type,lang);},contId);

		}else if (name=='url'){
			var qm = window.location.href.indexOf('?');
			code = (qm>=0) ? window.location.href.substr(0,qm-1) : window.location.href;
			url = domain + '/data/' + d_id + '/url.js';
			_FFUtils._FFmakeRequest(url, function(){_FFMatcher._FFCheckUrlProduct(code, window["_FF"+name+"Table"], contId, type,lang);},contId);
			
		}else	_FFUtils._FFmakeRequest(url, function(){_FFMatcher._FFCheckProduct(code, window["_FF"+name+"Table"], contId, type,lang);},contId);
	},
	_FFCheckProduct: function(code, text, contId,type,lang) {
		var code = code.replace("+",'\\+'); 
		text = ";"+text;
		var re = new RegExp(';'+code + '=(\\d+);', 'i');
		var re_tabs = new RegExp(';'+code + '=(\\d+)\-([\\d,]+);', 'i');

		var found = text.match(re);
		var found_tabs = text.match(re_tabs);

		if (found_tabs != null) {
			var p_id = found_tabs[1];
			var tags = found_tabs[2];
			
			if (_FFMatcher._FFCExists[p_id]==undefined)		{
				if (_FFMatcher._FFEmbType==0 || (_FFMatcher._FFEmbType>0 && _FFMatcher._FFisVideoTabExists(tags)))
				{
					_FFMatcher._FFCExists[p_id]=1;
					_FFMatcher._FFmatch[type]=1;
					_FFMatcher._FFshowButton(p_id, contId,0,type,lang);
				}
			}
		} else if (found != null) {
			var p_id = found[1];
			var tags = found[2];
			if (_FFMatcher._FFCExists[p_id]==undefined)		{
				_FFMatcher._FFCExists[p_id]=1;
				_FFMatcher._FFmatch[type]=1;
				_FFMatcher._FFEmbType=0; /*disable embed*/
				_FFMatcher._FFshowButton(p_id, contId,0,type,lang);
			}
		} else {
			_FFUtils._FFWriteLog(contId, 'not found');
			_FFUtils._FFsendLog(contId, 'notfound', 0,type);
		}
	},
	_FFCheckComplimentaryProduct: function(code, text, contId, type,lang){
		if (text)
		{
			var code = code.replace("+",'\\+'); 
			var re = new RegExp(';'+code + ';', 'ig');
			var is_found=false;
			for (var i in text)
			{
				var r = ";"+text[i]+";";
				var found = r.match(re);
				if (found != null) {
					var p_id = i;
					is_found=true;
					_FFMatcher._FFmatch[type]=1;
					if (_FFMatcher._FFCExists[p_id]==undefined)
					{
						_FFMatcher._FFshowButton(p_id, contId, 1,type,lang);
						_FFMatcher._FFCExists[p_id]=1;
					}
				}
			}

		}
	},
	_FFCheckUrlProduct: function(code, text, contId, type,lang){
	if (text)
		{
			var code = code.replace("+",'\\+'); 
			var re = new RegExp(';'+code + ';', 'ig');
			var is_found=false;
			for (var i in text)
			{
				if (i>400000) continue;
				var r = ";"+text[i]+";";
				var found = r.match(re);
				if (found != null) {
					var p_id = i;
					is_found=true;
					_FFMatcher._FFmatch[type]=1;
					if (_FFMatcher._FFCExists[p_id]==undefined)
					{
						_FFMatcher._FFshowButton(p_id, contId, 1,type,lang);
						_FFMatcher._FFCExists[p_id]=1;
					}
				}
			}

		}
	}, 
	_FFisVideoTabExists: function(str){
	    str = ','  + str + ',';
	    var re = new RegExp(',1,', 'i');
	    
	    return str.search(re) >= 0;
	
	}
}

var _FFUtils = {

	_isEmpty : function(obj){
		for(var key in obj) {if (obj.hasOwnProperty(key)) return false;}
		return true;
	},
	_FFStripTags: function(str) {
		return str.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '').replace('"','');
	},

	_FFStripScripts: function(str) {
		return str.replace(new RegExp('<script[^>]*>([\\S\\s]*?)<\/script>', 'img'), '');
	},

	_FFParseQueryString: function(query, key, default_,lowercase) {
		  if (default_ == null) default_ = '';
		  if (lowercase!=0) lowercase=1;
		  key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
		  var regex = new RegExp('[\\?&]' + key + '=([^&#]*)');
		  var qs = regex.exec(query);
		  if(qs == null)
			return default_;
		  else
			return lowercase ? unescape(qs[1].toLowerCase()) : unescape(qs[1]);
	},
    _FFCcall:function(cType){
        var cType = cType || "load";
        try{
            if (typeof (window.flixJsCallbacks) === "object" && typeof (window.flixJsCallbacks["_"+cType+"Callback"]) ==="function"){
                var f =window.flixJsCallbacks["_"+cType+"Callback"];
                f();
            }

        }catch(e){}

    },
	_FFIsUrlistExist: function(){
		if (window["_FFConfig"]==undefined) return false;
		if (window["_FFConfig"]['url']==undefined) return false;
		if (window["_FFConfig"]['url'][_FFMatcher._FFd]!=undefined) return true;
		return false;
	},
	_FFIsComplimentaryExist: function(){
		if (window["_FFConfig"]==undefined) return false;
		if (window["_FFConfig"]['cdis']==undefined) return true;
		if (window["_FFConfig"]['cdis'][_FFMatcher._FFd]==undefined) return true;
		return false;
	},

	_FFGetVideoLogo:function(p_id,isComplimentary){
		var clogo = (window["_FFConfig"]['dsl'][_FFMatcher._FFd] == undefined) ? window["_FFConfig"]['pl']['cdef'].replace('%l',_FFMatcher._FFlang) : window["_FFConfig"]['pl']['ddef'].replace('%d',_FFMatcher._FFd);
		if (window["_FFConfig"]['pl'][p_id]==undefined) return clogo;
		if (window["_FFConfig"]['pl'][p_id][_FFMatcher._FFlang]==undefined) return  clogo;
		if (window["_FFConfig"]['pl'][p_id][_FFMatcher._FFlang][_FFMatcher._FFd]==undefined) return window["_FFConfig"]['pl']['pdef'].replace('%p',p_id).replace('%l',_FFMatcher._FFlang);
		
		return window["_FFConfig"]['pl']['pddef'].replace('%d',_FFMatcher._FFd).replace('%l',_FFMatcher._FFlang).replace('%p',p_id);
		
	},
	_FFWriteHtml: function (id, html,isComplementary){
		try{
			var dv = document.getElementById(id);
			if (dv) { 
				dv.innerHTML = (isComplementary)? dv.innerHTML + html : html;
                _FFUtils._FFCcall('load');
				_FFUtils._FFCcall('loadMinisite');
            }
		}catch(e){}
	},
	_FFButtonHtml:function(p_id,isComplementary,lang){
		var html='';
		var d = _FFMatcher._FFd;
		var l = lang;
		
		var r = _FFMatcher._FFRev;
		var matchtype='';

		var params = '?p=' + p_id + '&d=' + d + '&l=' + l;

		var debug = _FFUtils._FFParseQueryString(_FFMatcher._ffparams, 'debug', '');
		if (debug == '1') params += '&demo=1&mode=new';

		if (_FFMatcher._FFmpn && _FFMatcher._FFmpn.length>1 && _FFMatcher._FFmatch['mpn']==1)
		{
			params+="&pm="+escape(_FFMatcher._FFmpn);
			matchtype='mpn';
		}
		
		if (_FFMatcher._FFean && _FFMatcher._FFean.length>1 && _FFMatcher._FFmatch['ean']==1)
		{
			params+="&pe="+escape(_FFMatcher._FFean);
			matchtype='ean';
		}

		var price = parseFloat(_FFUtils._FFParseQueryString(_FFMatcher._ffparams, 'p', 0));

		var url = _FFUtils._FFParseQueryString(_FFMatcher._ffparams, 'u', window.location.href,0);
		
		if (price>0 && !isComplementary) {
			params += '&pr='+price+'&u='+escape(encodeURIComponent(url));
		} 

		if( _FFMatcher._FFabdata.ab > 0 && _FFMatcher._FFabdata.tabs.length) {
			params += '&tabs=' + encodeURIComponent(_FFMatcher._FFabdata.tabs);
		}

		if (r=='1') { params = 'review/'+params; }
		
		html += '<a href=\'javascript:;\' onclick=\'_FFOpenWin("http://www.flixfacts.co.uk/view/'+ params + '");_FFUtils._FFsendLog("","page",'+p_id+',"'+matchtype+'");\'>';

		var _customimg = _FFUtils._FFParseQueryString(_FFMatcher._ffparams, 'img', '',0);
		var _alt = _FFUtils._FFParseQueryString(_FFMatcher._ffparams, 'alt', '',0);

		_customimg = _FFUtils._FFStripTags(_FFUtils._FFStripScripts(_customimg));
		_alt = _FFUtils._FFStripTags(_FFUtils._FFStripScripts(_alt));

        if ((_FFMatcher._FFabdata.res=='blank' || _FFMatcher._FFabdata.res==='') && ( ! _FFMatcher._FFabdata.f || _FFMatcher._FFabdata.f==p_id )) {
            html="<a>";
        }else if (_customimg != '' && !isComplementary){
			html += '<img id="_flixbtn'+p_id+'" border="0" src="' + _customimg + '" alt="'+_alt+'"/>';
		}else{
			//not required to pass, but consistent with minisite_logo
			_FFMatcher._FFabdata.complementary = true;
			var needed = /MSIE ((5\.5)|[6])/.test(navigator.userAgent) && navigator.platform == 'Win32'; 
			//test for complimentary ab tests
			if( _FFMatcher._FFabdata.f && _FFMatcher._FFabdata.res !== '' && _FFMatcher._FFabdata.complementary ) {
				html += '<img  id="_flixbtn'+p_id+'" alt="'+_alt+'" border="0" src="'+_FFMatcher._FFabdata.ab_src+'"/>';
			}
			else {
				html += '<img  id="_flixbtn'+p_id+'" alt="'+_alt+'" border="0" src="'+_FFMatcher.IMAGE_DOMAIN+'/logo/' + _FFUtils._FFGetVideoLogo(p_id)+'"/>';
			}			
		}
		
		html += '</a>';

		return html;
	},

	_FFEmbedHtml:function(p_id,emb,lang){
		var d = _FFMatcher._FFd;
		var l = lang;
		var divId = "_ffhover"+Math.random();
		if (emb==1)	{
			return '<embed style="display:block" id="'+divId+'emb" menu="false"  src="http://www.flixfacts.co.uk/view/embed/'+_FFBase64.encode(p_id+"&"+d+"&"+l+"&&0")+'" quality="high" width="416" height="332" name="playback" align="middle" allowscriptaccess="Always" wmode="opaque" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"></embed>';		
		}
		return "";
	},
	_FFWriteLog: function (id, html){
		return false;
	},
	_FFsendLog: function(contId, type, p_id,matchtype) {
		try{
			var params = {},
			    d = new Date(),
			    h='', canonicalCheck='', abid,
			    gvid, terms, attr, s, imgOg;

			d.setMinutes( d.getTimezoneOffset());
			
			params['mpn'] = _FFMatcher._FFmpn;
			params['ean'] =	_FFMatcher._FFean;
			params['l'] = _FFMatcher._FFlang;
			params['d'] = _FFMatcher._FFd;
			params['p_id'] = p_id; 
			params['ut'] = d.getTime();
			params['to'] = d.getTimezoneOffset();
			params['ss'] = screen.width+'x'+screen.height;

            if (_FFMatcher._FFabdata.ab>0 && (!_FFMatcher._FFabdata.f || _FFMatcher._FFabdata.f==p_id)) {
                params['abr']= _FFMatcher._FFabdata.res;
                params['ab']= _FFMatcher._FFabdata.ab;
                params['abid']= _FFMatcher._FFabdata.abid;

                if( ! _FFMatcher._FFSio_Ty ) {
                    _FFUtils._FFWriteSioTy( window.flixJsCallbacks.gvid, _FFMatcher._FFabdata);
                    _FFMatcher._FFSio_Ty++;
                }
            }

            try {
				params['gvid'] = window.flixJsCallbacks.gvid;
			}catch(e){}

	        var
	          parsePage = _FFUtils._FFParsePage, getCanonical = _FFUtils._FFgetCanonical,
	          data = { pagedata: _FFMatcher._FFpagedata }, pData = {}, s, df, i, p, p2;
	        //check we don't already have the information
		window.flixJsCallbacks.pageCapture = window.flixJsCallbacks.pageCapture || {};
	        //method normalized with inpage.php and l.v2.js except for brands
	        try{
                PAGEDATALOOP:
				for( p in data.pagedata ) {
                    if( data.pagedata.hasOwnProperty(p)) {
                        switch( p ) {
                            case 'pageSpecific':
                                continue PAGEDATALOOP;
                                break;
                            case 'pn':
                                if( !! window.flixJsCallbacks.pageCapture[p] ) {
                                    pData[p] = window.flixJsCallbacks.pageCapture[p];
                                }
                                else {
                                    pData[p] = getCanonical();
                                    window.flixJsCallbacks.pageCapture[p] = pData[p];
                                }
                                break;
                            case 'ti':
                            case 'h1':
                                if( !! window.flixJsCallbacks.pageCapture[p] ) {
                                    pData[p] = window.flixJsCallbacks.pageCapture[p];
                                }
                                else {
                                    pData[p] = ( !! document.getElementsByTagName( data.pagedata[p].terms )[0] )
                                        ? document.getElementsByTagName( data.pagedata[p].terms )[0].textContent.trim()
                                        : '';
                                    window.flixJsCallbacks.pageCapture[p] = pData[p];
                                }
                                break;
                            case 'br':
                            default:
                                if( !! window.flixJsCallbacks.pageCapture[p] ) {
                                    pData[p] = window.flixJsCallbacks.pageCapture[p];
                                }
                                else {
                                    pData[p] = parsePage ( data.pagedata, p );
                                    window.flixJsCallbacks.pageCapture[p] = pData[p];
                                }
                                break;
                        }
                    }
                }

	            //overwrite price and add brand if being supplied by retailer
	            df = ['mpn', 'ean', 'sku', 'price', 'brand'];
	            for( i=0; i<df.length; i++ ) {
	                if( document.querySelector('script[data-flix-' + df[i] + ']') &&
	                    document.querySelector('script[data-flix-' + df[i] + ']').getAttribute('data-flix-' + df[i]) ) {

                        //differs here from inpage and noshow
                        pData[ df[i] ] = document.querySelector('script[data-flix-' + df[i] + ']').getAttribute('data-flix-' + df[i]);
                        if( df[i] === 'price' && _FFUtils._FFparsePrice( pData[ df[i] ] ) ) {
                            pData[ df[i] ] = _FFUtils._FFparsePrice( pData[ df[i] ] );
                        }
                        //overwrite brand with standard naming
                        if( df[i] === 'brand' ) {
                            pData[ 'br' ] = pData['brand'];
                            delete pData['brand'];
                        }
	                }
	            }
	            for( p2 in pData ){
	                if( pData.hasOwnProperty(p2)) {
	                    params[p2] = encodeURIComponent(pData[p2]);
	                }
	            }

	        } catch(ignore){}
	
	       var 
	         llurl= ('https:' == document.location.protocol) ? 'https://media.flixsyndication.net/minisite/ssl/log/minisite/log.gif?' : 'http://media.flixcar.com/minisite/log.gif?',
		     _beat = 'http://hb.flix360.com/beat',
         _beatDist = [];

			switch (type){
				case "ok" :  llurl+= "et=matchhit&"; break;
				case "page": llurl+= "et=page&";break;
				case "vis": llurl+= "&v="+matchtype+"&";break;
				default : 
					llurl+= "et=matchmiss&";	
					if (_FFMatcher._FFmmExists>0) return false; 
					_FFMatcher._FFmmExists=1; 
				break;
			}

			for (var key in params) {
				llurl += ((key=='p_id') ? 'm' : key )+ '=' + escape(params[key]) + '&';
			}

            if( typeof window.flixJsCallbacks.imgCache === 'undefined' ) { window.flixJsCallbacks.imgCache = {};}
              var track = 'img_' + (new Date).getTime();
              window.flixJsCallbacks.imgCache[track] = new Image();
	            window.flixJsCallbacks.imgCache[track].src = llurl+Math.random();
              window.flixJsCallbacks.imgCache[track].event_type = ( llurl.match(/et=(\w+)/i) ) ? llurl.match(/et=(\w+)/i)[1] : 'notcaputured';

		}catch(e){}
	},
	_FFgetCanonical: function( esc ) {
        try {
            var
              ret, canonicalCheck, s;

            ret = _FFUtils._FFParsePage ( _FFMatcher._FFpagedata, 'pn' );

            canonicalCheck = window.location.protocol + '//' + window.location.hostname + '/';
            if( ! ret || ret === canonicalCheck || ret.length + 1 <= canonicalCheck.length) { ret = document.URL; }

            s = ret.indexOf('#');
            if( s != -1 ) { ret = ret.substring(0,s); }

            return arguments.length > 0 ? escape(ret) : ret;

        } catch(e) {}
    }, 
    _FFParsePage: function ( pagedata, target ) {
       var 
          found = '', h = null, fallback = true, generic = {}, specific = {}, p,
          ignore = ['ti', 'h1'], precedence, hit = false;
        try {
            for( p in pagedata ) {
                if( pagedata.hasOwnProperty(p)) {
                    if( p == 'pageSpecific' ) {
                        specific = pagedata.pageSpecific;
                    }
                    else if ( ignore.indexOf( p ) === -1 ) {
                        generic[p] = pagedata[p];
                    }
                }
            }
            //set the precedence on availability in pageSpecific file. 
            precedence = ( !! specific[ target ] ) ? specific[ target ] : generic[ target ];

            if ( ! specific[ target ] ) { fallback = false; }
            //if pagespecific or generic is a function forget terms and attr arrays initially.             
            if( typeof precedence === 'function' ) {
                found = precedence();
                fallback = ( ! found ) ? true : false;
            }

            if( ! found && !! precedence && !! precedence.terms && precedence.terms.length ) {
                for(var i = 0; i < precedence.terms.length; i++ ) {
                    h = document.querySelector ( precedence.terms[i] );
                    if ( h && !! h.textContent.trim() ) {
                        hit = true; fallback = false;
                        break;
                    }
                    else if ( h && h instanceof HTMLElement ) {
                        for ( var j = 0; j < precedence.attr.length; j++ ) {
                            if ( h.hasAttribute (precedence.attr[j] ) ) {
                                found = h.getAttribute ( precedence.attr[j] );
                                hit = true; fallback = false;
                                break;
                            }
                        }
                    }
                }
            }
            //fallback to generic if nothing found and not already run. 
            if( fallback && ! hit ) {
                precedence = generic[ target ];
                if( typeof precedence === 'function' ) {
                    found = precedence();
                }
                
                if( ! found && !! precedence && !! precedence.terms && precedence.terms.length ) {
                    for(var i = 0; i < precedence.terms.length; i++ ) {
                        h = document.querySelector ( precedence.terms[i] );
                        if ( h && !! h.textContent.trim() ) {
                            hit = true;
                            break;
                        }
                        else if ( h && h instanceof HTMLElement ) {
                            for ( var j = 0; j < precedence.attr.length; j++ ) {
                                if ( h.hasAttribute (precedence.attr[j] ) ) {
                                    found = h.getAttribute ( precedence.attr[j] );
                                    hit = true;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            //extract text content if we reach here.
            if ( ! found && h && h instanceof HTMLElement) {
                found = h.textContent.trim();
            }

            //enter only if we are a number with \. or , and its a price check
            if( target === 'price' && !! found ) {
                var 
                  value = _FFUtils._FFparsePrice( found );

                if( value ) { found = value; }
            }

            return found.trim();
        }catch(e){ return ''; }
    },	
    _FFparsePrice: function( price ) {
        try{
            if( !! price && ! price.trim().match(/[a-z][\.,\u20AC]+/gi)) {
                var 
                  value = price.trim().replace(/[^0-9\.,\u20AC]/gi, ''),
                  l = value.length, vl, v = '';
                if( !! window.flixJsCallbacks.priceParser ) {
                    value = window.flixJsCallbacks.priceParser.regEx( value );
                    l = value.length;
                }
                switch( true ) {
                    case (!! value.charAt( l - 3 ).match(/[\.,\u20AC]/)):
                        value = value.substr(0, (l - 3)) + '*' +  value.substr( (l - 2) );
                        break;              
                    case (!! value.charAt( l - 2 ).match(/[\.,\u20AC]/)):
                        value = value.substr(0, (l - 2)) + '*' +  value.substr( (l - 1) );
                        break;
                    default:
                        value = value.split('.');
                        vl = (value.length - 1);
                        if( value.length > 1 && value[ vl ].length > 2 ){ value[ vl ] = value[ vl ].substr(0,2);}
                        for( var i=0, vTruel = value.length; i<vTruel; i++) {
                            ( i == (vTruel - 2)) ? v += value[i] + '*' : v += value[i];
                        }
                        value = v;
                        break;
                }
                value = value.replace(/[\.,\u20AC]+/g, '');
                value = value.replace(/\*/, '.');
                return value;
            }
        } catch(ignore){}
        return false;
    },
	_FFisVisible: function(el){
		try
		{
		var i = document.getElementById(el);
		var off = _FFUtils._FFgetOffset(i);
		var r = document.elementFromPoint(off.x+10,off.y+10);
		if (r!=null) _FFUtils._FFsendLog(null,"vis",el,(r.id==el) ? "1":"0");	
		}catch(e){
			return false;
		}

	},
	_FFgetOffset:function(el){
		var _x = 0;
		var _y = 0;
		try
		{
			while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
				_x += el.offsetLeft - el.scrollLeft;
				_y += el.offsetTop - el.scrollTop;
				el = el.offsetParent;
			}	
		}
		catch (e){}
		return { y: _y, x: _x };
	},	
	_FFcrc32: function (str, contId){ 
		str = _FFUtils._FFencode(str);
		var table = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";
	 
		var crc = 0; 
		var x = 0;
		var y = 0;
	 
		crc = crc ^ (-1);
			for( var i = 0, iTop = str.length; i < iTop; i++ ) {
			y = ( crc ^ str.charCodeAt( i ) ) & 0xFF;
			x = "0x" + table.substr( y * 9, 8 );
			crc = ( crc >>> 8 ) ^ x;
		}
	 
		crc = crc ^ (-1);
		
		_FFUtils._FFWriteLog(contId, str + ' => ' + crc);
		
		return crc;
	},
	_FFgetDomain: function (contId) {
		return 'logo.flixfacts.co.uk';
		var _ffscript = document.getElementById(_ffId).getAttribute('src');
		var found = _ffscript.match(/http:\/\/([^\/]+)\//);
		return found[1];	 
	},
	_FFencode: function (str_data){ 
		var utftext = '';
	 
		for (var n = 0; n < str_data.length; n++) {
			var c = str_data.charCodeAt(n);
			if (c < 128) {
				utftext += String.fromCharCode(c);
			} else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
		}
	 
		return utftext;
	},
	_FFmakeRequest: function (url, callback,contId){
		try
		{	
			var head = document.getElementsByTagName("head")[0];
			var script = document.createElement("script");
			script.src = url;
			_FFMatcher[contId+"ajax"][url]=1;
			script.onload = script.onreadystatechange = function(){
				if (!this.readyState ||	this.readyState == "loaded" || this.readyState == "complete"){
					if (callback) callback();
					delete _FFMatcher[contId+"ajax"][script.src];
					script.onload = script.onreadystatechange = null;
					head.removeChild( script );
				}

			}
			script.onerror =function(){ delete _FFMatcher[contId+"ajax"][script.src];} 

			head.appendChild(script);
		}catch (e){}
	},
	_FFReadCookie: function ( name ) {
		try{
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');

			for(var i=0;i < ca.length;i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1,c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
			}

			return null;
		}catch(e){}
	},	
	_FFEraseCookie: function( name ) {
		try{
			_FFUtils._FFCreateCookie(name,"",-1);
		}catch(e){}
	},
	_FFCreateCookie: function ( name,value,days,path ) {
		try {
			if (days) {
				var date = new Date();
				date.setTime(date.getTime()+(days*24*60*60*1000));
				var expires = "; expires="+date.toGMTString();
			}
			else var expires = "";

			document.cookie = name+"="+value+expires+"; path=/";
		}catch(e){}
	},
    _FFWriteSioTy: function( gvid, ab ) {
        try{
        	if( ! arguments[1] ) { return false; }
            var
             tyPage = {
                'gvid': gvid,
                'tst_id': [ab.ab]
            },
            ticks = 3;

            (function testForFlixCookie() {
                if( _FFUtils._FFReadCookie === null && ticks ) {
                    setTimeout(testForFlixCookie, 1000);
                    ticks--;
                }
                else if ( ticks ) {
                    if( _FFUtils._FFReadCookie('sio_ty') === null ) {
                        _FFUtils._FFCreateCookie ( 'sio_ty', JSON.stringify( tyPage ) );
                    }
                    else{
                        var content = JSON.parse ( _FFUtils._FFReadCookie( 'sio_ty' ) );
                        if( ab.expire && ab.expire === 'expired'  ) {
                            for(var i = 0; i < content.tst_id.length; i++ ) {
                                if ( content.tst_id[i] == ab.tst_id ) {
                                    content.tst_id.splice ( i, 1);
                                }
                            }
                        }
                        else {
                            if( ! $.inArray( tyPage.tst_id, content.tst_id[0] )) {
                                content.tst_id[0][ content.tst_id[0].length ] = tyPage.tst_id;
                            }           
                        }
                        //delete && reinstate
                        _FFUtils._FFEraseCookie("sio_ty");
                        _FFUtils._FFCreateCookie( 'sio_ty', JSON.stringify( content ) );
                    }   
                }
            })();
        }catch(e){}
    }
};

var _FFBase64 = {
 
	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
 
	// public method for encoding
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
 
		input = _FFBase64._utf8_encode(input);
 
		while (i < input.length) {
 
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
 
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
 
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
 
			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
 
		}
 
		return output;
	},
 
	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	}
};

_FFMatcher.init();
_FFMatcher._FFmain(_FFMatcher._FFd, _FFMatcher._FFlang, _FFMatcher._FFmpn, _FFMatcher._FFean, _FFMatcher._FFcontId);
