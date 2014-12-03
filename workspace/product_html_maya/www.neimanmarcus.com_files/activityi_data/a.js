    ;(function(window, document) {
    

    if (!Array.prototype.forEach){
        Array.prototype.forEach = function(fun /*, thisArg */){
            //"use strict";
            if (this === void 0 || this === null)
                throw new TypeError();
            var t = Object(this);
            var len = t.length >>> 0;
            if (typeof fun !== "function")
                throw new TypeError();
            var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
            for (var i = 0; i < len; i++){
                if (i in t)
                    fun.call(thisArg, t[i], i, t);
            }
        };
    }

    var EZ = EZ || { },
        console = console || window.console,
        hasOwn = Object.prototype.hasOwnProperty,
        ext = function(object, source, noCall, noOverwrite){
            var index;
            if(!noCall && typeof source == 'function') source = source();
            for(index in source) if(hasOwn.call(source, index) && (noOverwrite ? !(index in object) : true)) object[index] = source[index];
            return object;
        };

    ext(EZ, {
        addScript: function(url, callback){
            var script = document.createElement('script');
            script.setAttribute('type','text/javascript');
            script.setAttribute('src', url);
            if(callback){
                script.onload = script.onreadystatechange = callback;
            }
            document.getElementsByTagName('head').item(0).appendChild(script);
        },
        cDecode: function(s) { return decodeURIComponent(s.replace(/\+/g, ' ')); },
        cEncode: function(s) { if(s) return encodeURIComponent(s.replace(/;/g, '$')); else return null;},
        generateVarName: function(){ return 'ezVar'+(Math.random() + '').replace('0.', ''); },
        convertSegs: function(encoded){
            var tmpSegs = {};
            try {
                encoded.split('C').forEach(function (cust, i) {
                    var cids = cust.split('A'),
                            tmpSegsArr = [],
                            cid = cids[0];

                    cids[1].split('B').forEach(function (seg, j) {
                        tmpSegsArr.push(+seg);
                    });
                    tmpSegs[+cid] = tmpSegsArr;
                });
            }catch(err){

            }
            return tmpSegs;
        },
        convertSegsToCookie: function(encoded, filter){
            var cook = [];
            try {
                for(var prop in encoded){
                    if(encoded.hasOwnProperty(prop)) {
                        var widOk = true;
                        if(filter !== null && filter !==  '-1'){
                            if(prop == filter){
                                widOk  = true;
                            }else{
                                widOk  = false;
                            }
                        }
                        if(widOk === true){
                            var c = prop+'A'+encoded[prop].join('B');
                            cook.push(c);
                        }
                    }
                }
                return cook.join('C');
            }catch(err){
                return '';
            }
        },
        isEmpty: function(obj) {
            for(var prop in obj) {
                if(obj.hasOwnProperty(prop))
                    return false;
            }

            return true;
        }
    });

    function Cookie(params) {
        var val = null, self = this;

        if(!(self instanceof Cookie)) return new Cookie(params);

        ext(self, params);
        ext(self, {_last: null});

        if (typeof self.value != 'undefined') {

            if (typeof self.expires === 'number') {
                var days = self.expires, t = self.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            self._last = document.cookie = [
                EZ.cEncode(self.key), '=', EZ.cEncode(self.value),
                self.expires ? '; expires=' + self.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                self.path    ? '; path=' + self.path : '',
                self.domain  ? '; domain=' + self.domain : '',
                self.secure  ? '; secure' : ''
            ].join('');
        }

    }

    ext(Cookie.prototype, {
        get : function(){
            var self = this, val = null;
            document.cookie.split('; ').forEach(function(cookie, index){
                var parts = cookie.split('=');
                if (EZ.cDecode(parts.shift()) === self.key) {
                    var tval = EZ.cDecode(parts.join('='));
                    val = tval == 'null' ? null : tval;
                }
            });
            return val;
        }
    });

    ext(EZ, { Cookie: Cookie});

    function Marker(params){
        var opts = {type: 'neimanmarcus', customs: '', saveCustoms: '', uid: '',
                    tmst: new Date().getTime()+"", fmt: '', frm: '', sfOrds: null, eventData: null,
                    social: null, dbg: {}, posted: [], clb: null, optedOut: null, delegate: false, doCall: false, segsFilter: -1},
            self = this,
            mustGetSegs = false;

        if(!(self instanceof Marker)) return new Marker(params);

        ext(self, opts);
        ext(self,params);

        if(self.delegate && self.delegate === true){
            self.customs += '&ezC=ezdelegate:1';
        }

        self.saveCustoms = self.customs;

        
        self.bid = '363365bf-00c8-44c1-aac9-fdee80557a34';
        self.segsFilter = '-1';


        self.optedOut = EZ.Cookie({key:'fofirdOptOut'}).get();
        if(self.optedOut != 'OPTEDOUT'){

            self.fofirdOk = '0';
            self.fofirdSegs = null;

            self.fofird = EZ.Cookie({key:'fofirdId'}).get();
            if(self.fofird === null){
                EZ.Cookie({ key: 'fofirdId', value: self.bid, path: '/', expires: 365 });
                self.fofird = self.bid;
            }else{
                if(self.fofird != self.bid){
                    self.bid = self.fofird;

                    
                }
                self.fofirdOk = '1';
            }

            
            
                self.doCall = true;
            

        }else{
            EZ.Cookie({ key: 'fofirdId', value: null, path: '/', expires: -1 });
            EZ.Cookie({ key: 'fofirdSegs', value: null, path: '/', expires: -1 });
        }

    }

    ext(EZ,{ Marker: Marker, encode: encodeURIComponent });

    ext(EZ.Marker.prototype, {
        ckok: function () {
            document.cookie = 'ez=ok;expires=' + new Date(new Date().getTime() + 1800000).toGMTString() + ';path=/;';
            if (document.cookie.indexOf('ez=ok') >= 0) {
                document.cookie = 'ez=ok;expires=' + new Date(new Date().getTime() - 60000).toGMTString();
                return 1;
            } else {
                return 0;
            }
        },
        triggerSocialHit: function(socialData){
            var self = this;
            self.social = socialData;
            self.mark();
        },
        event: function(eventData){
            var self = this;
            self.eventData = eventData;
            self.mark();
        },
        addIframe: function(src, id){
            var ils = document.createElement('iframe');
            ils.src = src;
            ils.id = id;
            ils.style.height = '0px';
            ils.style.width = '0px';
            ils.style.padding = '0px';
            ils.style.backgroundColor = 'transparent';
            ils.style.border = '0px none transparent';
            ils.style.overflow = 'hidden';
            var body = document.getElementsByTagName('body')[0];
            body.appendChild(ils);
        },
        optOut: function(){
            EZ.Cookie({ key: 'fofirdOptOut', value: 'OPTEDOUT', path: '/', expires: 365 });
        },
        optIn: function(){
            EZ.Cookie({ key: 'fofirdOptOut', value: null, path: '/', expires: -1 });
            window.ezMarker = EZ.Marker(opt);
            window.ezMarker.mark();
        }
    });

    

    
    ext(EZ.Marker.prototype, {
        mark: function(){
            var self = this,
                src = '',
                im = null,
                queryString = '',
                all = '',
                ref = EZ.encode(document.referrer),
                dest = 'http://neimanmarcus.ezakus.net/marker/image';
            try {
                if(self.optedOut == 'OPTEDOUT'){
                    return;
                }

                src = dest+'/' + self.type;
                self.customs = self.saveCustoms;
                if (self.ckok() < 1) {
                    self.customs += '&ezC=ezCkKo';
                }
                if(self.eventData){
                    var strData = self.eventData;
                    if(typeof self.eventData !== 'string')
                        strData = window.JSON.stringify(self.eventData);
                    self.customs += '&ezC=' + EZ.encode('type:event')+'&ezC=' + EZ.encode('event:'+strData);
                }
                if(self.social){
                    self.customs += '&ezC=' + EZ.encode(self.social);
                }
                queryString = '&hash='+EZ.encode(window.location.hash)+'&tjs=' + self.tmst + self.uid + self.fmt + self.frm + self.customs;
                queryString += '&fofird='+self.fofird+'&fofirdOk='+self.fofirdOk;
                if(self.fofirdSegs !== null){
                    queryString += '&fofirdSegs='+self.fofirdSegs;
                }
                all = src + '?' + 'cref=' + ref + queryString;
                if(all.length > 2048){
                    var much = all.length - 2047;
                    ref = ref.substring(0, ref.length - much);
                    all = src + '?' + 'cref=' + ref + queryString;
                }

                im = new Image();
                im.src = all;
                im.onload = function () {
                    im.onload = null;
                };

            } catch (e) {
                console.log(e);
            }
        }
    });
    
    
    try {
        var opt = {}, ezMarker;
        if (window.ezMarkerType) { opt.type = window.ezMarkerType; }
        
        if (window.ezUID) { opt.uid = '&uid=' + window.ezUID; }
        if (window.ezFmt) { opt.fmt = '&fmt=' + window.ezFmt; }
        if (top != self) { opt.frm = '&frm=1'; }
        if (window.ezFrm) { opt.frm = '&frm=' + window.ezFrm; }
        if (window.ezSfOrds) { opt.sfOrds = window.ezSfOrds; }
        if(window.ezClb && typeof window.ezClb == 'function') { opt.clb = window.ezClb; }
        if (window.ezC) {
            if (Object.prototype.toString.call(window.ezC) == '[object Array]') {
                opt.customs = '';
                for (var i = 0; i < window.ezC.length; i++) {
                    opt.customs += '&ezC=' + EZ.encode(window.ezC[i]);
                }
            } else {
                opt.customs = '&ezC=' + EZ.encode(window.ezC);
            }
        }

        if (window.ezTactAdsIntegration) {
            var tactads = document.createElement('script');
            tactads.type = 'text/javascript';
            tactads.async = true;
            tactads.src = 'https://cdn.tactads.com/id.js';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(tactads, s);

            window.tactadsInit = function() {
                Tactads.identify({
                    partner: 'orange-open'
                })
                .then(function(deviceId) {
                    if(!opt.customs)
                        opt.customs = '';
                    opt.customs += '&ezC=tactads:' + deviceId;
                    window.ezMarker = EZ.Marker(opt);
                    if(ezMarker.doCall === true && window.ezClb && typeof window.ezClb == 'function') window.ezClb.call(null);
                    window.ezMarker.mark();
                })
                .fail(function(err) {
                    window.ezMarker = EZ.Marker(opt);
                    if(ezMarker.doCall === true && window.ezClb && typeof window.ezClb == 'function') window.ezClb.call(null);
                    window.ezMarker.mark();
                })
                .done();
            };
        }else{
            window.ezMarker = EZ.Marker(opt);
            if(window.ezMarker.doCall === true && window.ezClb && typeof window.ezClb == 'function') window.ezClb.call(null);
            window.ezMarker.mark();
        }

        

        window.addScriptAsync = function(url,id) {
            var script = document.createElement("script");
            if (id) script.setAttribute("id",id);
            script.setAttribute("type","text/javascript");
            script.setAttribute("src",url);
            document.getElementsByTagName("head").item(0).appendChild(script);
        };

        /*cookie sync*/
        
        /*full segment sync*/
        
        /*single segment pixel*/
        

		

		

        

    } catch (err) {
        console.log(err);
    }
})(window, document);

