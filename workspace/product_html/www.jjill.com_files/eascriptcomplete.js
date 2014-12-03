/*! Copyright (c) 2011 EasyAsk LLC. All Rights Reserved.
 * Use, reproduction, transfer, publication or disclosure is prohibited 
 * except in accordance with the License Agreement.
 */

// does autocomplete using script tag so no XMLHTTPObject (does cross domain)

var EAComplete = function () {
    return {
        isIE: false,
        idInput: "question",
        dict: null,
        handler: 'EAComplete.handleCB',
        old_inp: null,
        divOutput: null,   // container for divSuggest and spacer (IE woes)
        divSuggest: null,
        timerId: null,
        url: "/EasyAsk/AutoComplete.jsp",
        lastSelection: -1,
        suggestions: [],
        submitFctn: null,
        needsBuild: true,
        isActive: false,
        prompt: '',
        num: '',
        sort: '',
        reduce: '',
        init: function (config) {
            var detect = navigator.userAgent.toLowerCase();
            this.isIE = -1 < detect.indexOf('msie') ? true : false;
            if (config.id) { this.idInput = config.id; }
            if (config.url) { this.url = config.url; }
            if (config.submitFctn) { this.submitFctn = config.submitFctn; }
            if (config.dict) { this.dict = config.dict; }
            if (config.handler) { this.handler = config.handler; }
            if (config.prompt) { this.prompt = config.prompt; }
            if (config.num) { this.num = config.num; }
            if (config.sort) { this.sort = config.sort; }
            if (config.reduce) { this.reduce = config.reduce; }
            if (this.dict) {
                var elt = document.getElementById(this.idInput);
                if (elt) {
                    elt.setAttribute("autocomplete", "off");
                    this.initKeyEvents(elt);
                    this.needsBuild = true;
                    return;
                }
            }
        },

        build: function () {
            if (this.needsBuild) {
                var elt = document.getElementById(this.idInput);
                if (elt) {
                    var id = this.idInput + '-suggest';
                    var existing = document.getElementById(id);
                    this.divOutput = document.createElement("div");
                    this.divOutput.setAttribute('id', id);
                    this.divOutput.style.width = "auto";
                    this.divOutput.style.border = "1px solid black";
                    this.divOutput.style.backgroundColor = "white";
                    this.divOutput.style.zIndex = 1000; // in front
                    this.divSuggest = document.createElement("div");
                    this.divOutput.appendChild(this.divSuggest);
                    var spacer = document.createElement("div");
                    spacer.style.width = (elt.clientWidth + 2 + (this.isIE ? 2 : 0)) + "px"; ;
                    spacer.style.fontSize = "0px";
                    spacer.style.lineHeight = "0px";
                    this.divOutput.appendChild(spacer);
                    // this.divSuggest.className = elt.className;
                    this.divSuggest.style.border = "0px";
                    this.divSuggest.style.width = "auto";
                    this.divOutput.style.fontSize = elt.style.fontSize;
                    this.divOutput.className = elt.className ? elt.className + '-suggest' : 'suggest';
                    if (existing) {
                        document.body.replaceChild(this.divOutput, existing);
                    } else {
                        document.body.appendChild(this.divOutput);
                    }
                    this.setVisibility("hidden");
                    this.needsBuild = false;
                    this.isActive = true;
                }
            }
        },

        initKeyEvents: function (elt) {
            var _closure = this;
            elt.onkeypress = function (evt) { _closure.build(); return true; }; // override anything existing on key press
            elt.onkeydown = function (evt) { _closure.build(); _closure.keypress(evt); };
            elt.onblur = function (evt) { _closure.build(); _closure.blur(evt); return false; };
            elt.onfocus = function (evt) { _closure.build(); _closure.focus(evt); return false; };
        },

        blur: function (evt) {
            var elt = document.getElementById(this.idInput);
            var val = elt.value;
            if (this.prompt && !val) {
                elt.value = this.prompt;
            }
            this.stopSuggestions();
        },

        focus: function (evt) {
            var elt = document.getElementById(this.idInput);
            if (elt) {
                var inp = elt.value;
                if (this.prompt && inp == this.prompt) {
                    inp = '';
                    elt.value = '';
                }
                if (this.isActive) {
                    this.old_inp = inp;
                    this.startTimer();
                }
            }
        },

        keypress: function (evt) {
            if (this.isActive) {
                evt = (evt) ? evt : ((event) ? event : null);
                if (evt) {
                    var charCode = this.isIE ? evt.keyCode : 0 == evt.charCode ? evt.keyCode : evt.charCode;
                    if (0 == charCode) { charCode = keyCode; }
                    if (13 == charCode) {
                        this.setVisibility("hidden");
                    }
                    else if (38 == charCode) {
                        // up arrow
                        this.changeSelection(true);
                    }
                    else if (40 == charCode) {
                        // down arrow
                        this.changeSelection(false);
                    }
                    else {
                        //  alert("char code=" + charCode);
                        if (27 == charCode) {
                            this.setVisibility("hidden");
                            return false;
                        }
                    }
                }
            }
        },

        startTimer: function () {
            if (this.isActive) {
                var _closure = this;
                if (this.timerId) {
                    clearInterval(this.timerId);
                }
                this.timerId = setInterval(function () { _closure.get(); }, 100);
            }
        },

        stopTimer: function () {
            if (this.timerId) { clearInterval(this.timerId); this.timerId = null; }
        },

        /*
        setVisibility: function (val) {
        if (this.divOutput.style.visibility != val) {
        if (val != 'hidden') {
        var elt = document.getElementById(this.idInput);
        var dims = this.getPos(elt);
        this.divOutput.style.position = 'absolute';
        this.divOutput.style.top = (dims.top + 1) + "px";
        this.divOutput.style.left = (dims.left - 1) + "px";
        }
        this.divOutput.style.visibility = val;
        }
        },*/

        setVisibility: function (val) {
            if (this.divOutput.style.visibility != val) {
                if (val != 'hidden') {
                    var elt = document.getElementById(this.idInput);
                    var dims = $(elt).offset();
                    this.divOutput.style.position = 'absolute';
                    this.divOutput.style.top = (dims.top + 1) + 20 + "px";
                    this.divOutput.style.left = (dims.left - 1) + "px";
                }
                this.divOutput.style.visibility = val;
            }
        },

        getPos: function (obj) {
            var borderLeft = 0;
            var borderTop = 0;
            if (this.isIE) {
                var border = obj.style.borderLeftWidth || 0;
                if ('medium' == border) {
                    borderLeft = 5;
                }
                else {
                    borderLeft = parseInt(border) || 0;
                }
                border = obj.style.borderTopWidth || 0;
                if ('medium' == border) {
                    borderTop = 5;
                }
                else {
                    borderTop = parseInt(border) || 0;
                }
            }
            var curLeft = 0;
            var curTop = 0;
            if (obj.offsetParent) {
                curTop += obj.offsetHeight;
                while (obj.offsetParent) {
                    curLeft += obj.offsetLeft;
                    curTop += obj.offsetTop;
                    obj = obj.offsetParent;
                }
            } else {
                if (obj.x) { curLeft += obj.x; }
                if (obj.y) {
                    curTop += obj.y;
                    curTop += obj.height;
                }
            }
            return { left: curLeft + borderLeft, top: curTop + borderTop };

        },

        clearOutput: function () {
            while (this.divSuggest.hasChildNodes()) {
                this.divSuggest.removeChild(this.divSuggest.firstChild);
            }
            this.lastSelection = -1;
        },

        findSelection: function () {
            var suggests = this.divSuggest.childNodes;
            if (suggests) {
                for (var i = 0; i < suggests.length; i++) {
                    if (suggests[i].className == "ea-sug-select") {
                        return i;
                    }
                }
            }
            return -1;
        },

        changeSelection: function (dirUp) {
            var cur = this.findSelection();
            var suggests = this.divSuggest.childNodes;
            if (-1 < cur) {
                suggests[cur].className = "ea-sug-normal";
            }
            if (dirUp) {
                cur = cur - 1;
                if (cur < -1) {
                    cur = suggests.length - 1;
                }
            }
            else {
                cur = cur + 1;
            }
            if (-1 < cur && cur < suggests.length) {
                suggests[cur].className = "ea-sug-select";
                this.old_inp = this.suggestions[cur].val;
                document.getElementById(this.idInput).value = this.suggestions[cur].val;
            }
        },

        mouseOver: function () {
            var suggests = this.parentNode.childNodes;
            if (suggests) {
                for (var i = 0; i < suggests.length; i++) {
                    suggests[i].className = "ea-sug-normal";
                }
            }
            this.className = "ea-sug-select";
        },
        mouseOut: function () {
            this.className = "ea-sug-normal";
        },

        mouseDown: function () {
            var sel = this.findSelection();
            if (-1 < sel) {
                this.old_inp = this.suggestions[sel];
                document.getElementById(this.idInput).value = this.suggestions[sel].val;
                this.submitSearch();
                return false;
            }
        },

        addSuggest: function (sug) {
            var elt = document.createElement("div");
            elt.className = "ea-sug-normal";
            var html = "<span class='ea-sug-text'>" + sug.val.substring(0, sug.start) + "</span><span class='ea-sug-match'>" + sug.val.substring(sug.end) + "</span>";
            elt.style.whiteSpace = 'nowrap';
            elt.onmouseover = this.mouseOver;
            elt.onmouseout = this.mouseOut;
            var _closure = this;
            elt.onmousedown = function () { return _closure.mouseDown(); };
            elt.innerHTML = html;
            this.divSuggest.appendChild(elt);
        },

        get: function () {
            var inp = document.getElementById(this.idInput).value;
            if (this.old_inp == inp) { return; }
            this.old_inp = inp;
            var len = inp.length;
            if (0 < len) {
                this.generateSuggestions(inp);
            } else {
                this.setVisibility("hidden");
            }
        },

        showSuggestions: function (key) {
            var inp = document.getElementById(this.idInput).value;
            if (0 < inp.length && key.toLowerCase() == inp.toLowerCase()) {
                var suggests = this.getSuggestions(inp);
                if (0 < suggests.length) {
                    this.clearOutput();
                    for (var i = 0; i < suggests.length; i++) {
                        this.addSuggest(suggests[i]);
                    }
                    this.setVisibility("visible");
                } else {
                    this.setVisibility("hidden");
                }
            } else {
                this.setVisibility("hidden");
            }
        },

        getSuggestions: function (key) {
            return this.suggestions;
            var res = new Array();
            var lcKey = key.toLowerCase();
            for (var i = 0; i < this.suggestions.length; i++) {
                var sug = this.suggestions[i].toLowerCase();
                if (lcKey.length <= sug.length) {
                    var ok = true;
                    for (var j = 0; j < lcKey.length; j++) {
                        if (sug.charAt(j) != lcKey.charAt(j)) {
                            ok = false;
                            break;
                        }
                    }
                    if (ok) { res[res.length] = this.suggestions[i]; }
                }
            }
            return res;
        },

        stopSuggestions: function () {
            this.stopTimer();
            this.setVisibility("hidden");
        },

        submitSearch: function () {
            if (this.submitFctn) {
                this.stopSuggestions();
                this.submitFctn();
            }
        },

        lastSuggestKey: null,

        generateSuggestions: function (key) {
            if (0 < key.length && key != this.lastSuggestKey) {
                this.lastSuggestKey = key;
                var url = this.url + '?fctn=' + encodeURIComponent(this.handler) + '&key=' + encodeURIComponent(key) +
                    '&dct=' + encodeURIComponent(this.dict) + (this.num ? ('&num=' + this.num) : '') +
                    (this.sort ? ('&sort=' + this.sort) : '') + (this.reduce ? ('&reduce=' + this.reduce) : '');
                this.invokeURL(url);
            }
        },

        invokeURL: function (url) {
            url += '&ts' + new Date().getTime();
            var old = document.getElementById('eaComplete');
            if (old && this.isIE) {
                old.setAttribute('src', url);
                return;
            }
            var e = document.createElement('script');
            e.setAttribute('src', url);
            e.setAttribute('type', 'text/javascript');
            e.setAttribute('id', 'eaComplete');
            if (old) {
                old.parentNode.replaceChild(e, old);
                if (!this.isIE) {
                    for (var prop in old) {
                        delete old[prop];
                    }
                }
            }
            else {
                document.getElementsByTagName("head")[0].appendChild(e);
            }
        },

        handleCB: function (key, vals) {
            if (vals && typeof (vals) == 'object' && vals instanceof Array) {
                if (this.lastSuggestKey == key) {
                    this.suggestions = vals;
                    this.showSuggestions(key);
                }
            }
            else {
                this.isActive = false; // turn them off 
            }
            this.lastSuggestKey = null;
        }
    }
} ();

