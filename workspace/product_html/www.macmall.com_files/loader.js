(function(){
  var _flixLoader = {
    mappingTable:{
      'data-flix-distributor' : {'inpage':'','button':'d','value':null},
      'data-flix-language' : {'inpage':'','button':'l','value':null},
      'data-flix-mpn' : {'inpage':'mpn','button':'mpn','value':null},
      'data-flix-ean' : {'inpage':'ean','button':'ean','value':null},
      'data-flix-url' : {'inpage':'url','button':'url','value':null},
      'data-flix-sku' : {'inpage':null,'button':'sku','value':null}, 
      'data-flix-button' : {'inpage':null,'button':'dom','value':null},
      'data-flix-inpage' : {'inpage':null,'button':null,'value':null},
      'data-flix-button-image' : {'inpage':null,'button':'img','value':null},
      'data-flix-embed' : {'inpage':null,'button':'embed','value':null},
      'data-flix-brand' : {'inpage':'brand','button':'brand','value':null},
      'data-flix-fallback-language' : {'inpage':'fl','button':'fl','value':null},
      'data-flix-price' : {'inpage':null,'button':'p','value':null}			
     },
    instance:null,
    ab: {"d":{"1674":"1","2162":"1","2754":"1"},"button":{"mpn":{},"ean":{}},"inpage":{"mpn":{"21998088":"1","22071423":"1","22083518":"1","22091108":"1","10010463":"1","10071804":"1","HX-A500%20orange":"1"},"ean":{"5025232780686":"1","5025232780709":"1","5025232787524":"1","0":"1","5025232787531":"1"}}},
    isAb:function(type){
      try{
          if (!this.ab.d.hasOwnProperty(this.mappingTable['data-flix-distributor']['value'])) { return false; }
          if (this.ab[type]['mpn'].hasOwnProperty(this.mappingTable['data-flix-mpn']['value'])) { return true; }
          if (this.ab[type]['ean'].hasOwnProperty(this.mappingTable['data-flix-ean']['value'])) { return true; }
      }catch(e){
          this.log(e.message);
      }
        return false;
    },
    init:function(){
		try {
			var scs = document.getElementsByTagName('script');
			for(var i=0;i<scs.length;i++){
				if (scs[i].src.indexOf('flixfacts.com/js/loader')>0 || scs[i].src.indexOf('flixsyndication.net/minisite/ssl/js/loader')>0 || scs[i].src.indexOf('flixsyndication.net/minisite/ssl/logo/code/js/l.js')>0 || scs[i].src.indexOf('flixsyndication.net/js/loader')>0 || scs[i].src.indexOf('logo.flixfacts.co.uk/code/js/l.js')>0 || scs[i].src.indexOf('flixfacts.co.uk/link.php')>0) {
					this.instance=scs[i];
					break;
				}
			}
			this.setGvid();
			this.parse();
			this.load('button');
			this.load('inpage');

		}catch(e){
			this.log(e.message);
		}
    },
    setValue:function(name,value){
    	if(name == "data-flix-ean" && value != "" && value.length<13) 
    	{	
    		value = Array(13 + 1 - value.length).join('0') + value;
    	}   	
		var fname = (this.mappingTable[name]!=undefined ) ? this.mappingTable[name] : this.mappingTable[this.mapOldParam(name)];
		if (fname!=undefined && value)
		{
			fname['value']=value;
		}
	},
    mapOldParam:function(name){
		try
		{
			for (var i in this.mappingTable){
				if (this.mappingTable[i]['button']==name)
				{
					return i;
				}
			}	
		}
		catch (e)
		{
			this.log(e.message);
		}
		
	},
	validate:function(){
		if (this.mappingTable['data-flix-button']['value']==null && this.mappingTable['data-flix-inpage']['value']==null){this.mappingTable['data-flix-button']['value']='flix-minisite';}
		if (this.mappingTable['data-flix-distributor']['value']==null){this.log('distributor is not set');return false;}
		if (this.mappingTable['data-flix-language']['value']==null){this.log('language is not set');return false;}
	//	if (this.mappingTable['data-flix-mpn']['value']==null && this.mappingTable['data-flix-ean']['value']==null){this.log('mpn and ean are not set');return false;}
		return true;
	},
	log: function(msg){
		try{
			console.log(msg);
		}catch(e){}
	},
	load:function(type){

		if (!this.validate()) return false;
		var elem = this.mappingTable['data-flix-'+type]['value'];
		if (elem==null) return false;
		var dom = document.getElementById(elem);
		if (!dom){
			try{
			var div = document.createElement('div');
			div.id=elem;
			this.instance.parentNode.appendChild(div);
			}catch(e){
				this.log(e.message);
				return false;
			}
		}
		try
		{      
			var url = this.getUrl(type);
            var scache = this.isAb(type) ? "&fcache="+Math.random() : "";
            scache+="&ext=.js";
			var _fscript = document.createElement('script');
			_fscript.setAttribute("type","text/javascript");
			_fscript.setAttribute("src", url+scache);
			if (type=='button')
			{
				document.getElementById(elem).appendChild(_fscript);
				var styleElement = document.createElement("style");
				var cssCode="#"+elem+" a img {padding-right:3px;}";
				  styleElement.type = "text/css";
				  if (styleElement.styleSheet) {
					styleElement.styleSheet.cssText = cssCode;
				  } else {
					styleElement.appendChild(document.createTextNode(cssCode));
				  }
				  document.getElementsByTagName("head")[0].appendChild(styleElement);
			}else if (type=='inpage')
			{
				document.getElementById(elem).appendChild(_fscript);
			}
		}
		catch (e)
		{
				this.log(e.message);
				return false;
		}
	},
	getUrl:function(btype){
		var url = '';
		var url_in = '';
		var url_mn = '';
		for (var i in this.mappingTable)
		{
			if (this.mappingTable[i]['value']==null) continue;
			if (this.mappingTable[i][btype]==null) continue;

			
			url+="&"+ this.mappingTable[i][btype]+"="+encodeURIComponent(this.mappingTable[i]['value']);
			
			if (i=='data-flix-inpage') continue;
			if (i=='data-flix-price') continue;
			if (i=='data-flix-button-image') continue;
			if (i=='data-flix-button') continue;
			if (i=='data-flix-price') continue;
			if (i=='data-flix-button-image') continue;
			if (i=='data-flix-fallback-language') continue;
			if (i=='data-flix-brand') continue;
	
			
			url_in+= ((this.mappingTable[i]['inpage']=='') ? '' : this.mappingTable[i]['inpage']+"/" ) + escape(this.mappingTable[i]['value'])+"/";
			url_mn+= ((this.mappingTable[i]['inpage']=='') ? '' : this.mappingTable[i]['inpage']+"/" ) + escape(this.mappingTable[i]['value'])+"/";
			
		}
		
		url+=('https:' == document.location.protocol) ? "&ssl=1":"";

		if (this.mappingTable['data-flix-mpn']['value']==null && this.mappingTable['data-flix-ean']['value']==null) {
			var uc = encodeURIComponent(window.location.pathname); /*get a unique url*/			
			this.setValue('data-flix-url', uc.replace(/\W/g,""));
			url_in+=uc.replace(/\W/g,"");
			url_mn+=uc.replace(/\W/g,"");
		}
		
		var minisite_url = ('https:' == document.location.protocol) ? 'https://media.flixsyndication.net/minisite/ssl/delivery/js/minisite/' : 'http://media.flixcar.com/delivery/js/minisite/';
		var inpage_url = ('https:' == document.location.protocol) ? 'https://media.flixsyndication.net/inpage/ssl/delivery/js/inpage/' : 'http://media.flixcar.com/delivery/js/inpage/';
		url = (btype=='button') ? minisite_url + url_mn.substr(0,url_mn.length-1) + '?' + url.substr(1) : inpage_url + url_in.substr(0,url_in.length-1) + "?" + url;	
		return url;
	},
	parse:function(){
		var qmark = this.instance.src.indexOf('?');
		if(qmark != -1) {
			var itms = 	this.instance.src.substr(qmark+1).split("&");
			for (var i=0;i<itms.length;i++ )
			{
				var kv = itms[i].split("=");
				this.setValue(kv[0],decodeURIComponent(kv[1]));
			}
		}else{
			for (var i in this.mappingTable )
			{
				try{
				 this.setValue(i,this.instance.getAttribute(i));
				}catch(e){ this.log(e.message);}
			}
		}
	}, 
	setGvid:function() {

		if ( document.getElementById('data-flix-t-script') ) return;
		
        window['flixgvid'] = function(obj){
            try{
				delete window['flixgvid'];
				window.flixJsCallbacks['gvid'] = obj['gvid'];
            }catch(e){}
        };
		
		var _fscript = document.createElement('script');
		_fscript.setAttribute("type","text/javascript");
		_fscript.setAttribute("src", "//t.flix360.com/?f=flixgvid");
		_fscript.setAttribute("async", "true");
		_fscript.id = "data-flix-t-script";
		document.getElementsByTagName('head')[0].appendChild(_fscript);		
	}
};
    var flixJsCallbacks={
        _loadCallback:null,
        _loadInpageCallback:null,
        _loadMinisiteCallback:null,
        _loadNoshowCallback:null,

        setLoadCallback:function(cFunction,ftype){
            try{
                if (cFunction && typeof(cFunction) === "function" ) {
                    switch(ftype){
                        case "inpage": this._loadInpageCallback = cFunction;  break;
                        case "minisite" : this._loadMinisiteCallback = cFunction; break;
                        case "noshow" : this._loadNoshowCallback = cFunction; break;
                        default:	this._loadCallback = cFunction; break;
                    }
                }else { throw cFunction+" is not a function";}
            }catch(e) {
                try {console.log(e);}catch(e1){}
            }
        }
    };
    var getFlixCallback = function(){
        return flixJsCallbacks;
    };
    window['flixJsCallbacks'] = getFlixCallback();
    _flixLoader.init();
})();
/*live*/










