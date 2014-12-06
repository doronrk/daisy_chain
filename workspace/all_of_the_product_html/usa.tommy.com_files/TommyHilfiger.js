if(optimost.Q["opselect"]=="qa")optimost.SC("opselect","qa",null,optimost.SLD());

var opPro=(("https:"==document.location.protocol)?"https://by.essl.optimost.com/by":"http://by.optimost.com");

var opDocLocation = document.location.toString();

var opExperiments={};

var opPageId=(typeof(opPageId)=="string"?opPageId:"");

// add trial global code here
opExperiments["Tommy Hilfiger test page"] = {
    "method": "var",
    "entity": opPageId,
    "criteria": "home page",
    "condition": "equals",
    "match": false,
    "unique": "/trial/2/p/tommyhilfigertestpage.0a9/1062/content.js",
    "throttle": 1000,
    "gum": null,
    "domain": null,
    "expire": null,
    "modules": ["body"]
};

opExperiments["Tommy Hilfiger checkout test page"] = {
    "method": "var",
    "entity": opDocLocation,
    "criteria": "AjaxOrderItemDisplayView",
    "condition": "contains", 
    "match": false,
    "unique": "/trial/2/p/tommyhilfigertestpage.0a9/1062/content.js",
    "throttle": 1000,
    "gum": null,
    "domain": null,
    "expire": null,
    "modules": ["body"]
};

// add counter global code here
opExperiments["search button"] = {
    "method": "var",
    "entity": opPageId,
    "criteria": "2",
    "condition": "equals",
    "match": false,
    "unique": "/counter/1627/-/2/event.js",
    "throttle": 1000,
    "gum": null,
    "domain": null,
    "expire": null,
    "modules": ["counterx"]
};

optimost.identify=function(){
	for (var n in opExperiments){
		switch(opExperiments[n].method) {
			case 'var':
				//optimost.conditionEvaluator(opExperiments[n]);
				if(typeof(opExperiments[n].entity)!="undefined"){
					if(opExperiments[n].condition=="equals"){
						if(opExperiments[n].entity.toString()==opExperiments[n].criteria)opExperiments[n].match=true;
					}
					else if(opExperiments[n].condition=="contains"){//alert(opExperiments[n].entity);
						if(opExperiments[n].entity.toString().indexOf(opExperiments[n].criteria)!=-1)opExperiments[n].match=true;
					}
				}
				break;

			case 'array'://The criteria is a based on a single variable that has multiple matching values
				if (typeof (opExperiments[n].entity) != "undefined" && typeof (opExperiments[n].criteria) == "object") {
					var len = opExperiments[n].criteria.length;
					for (var i = 0; i < len; i++) {
						if (opExperiments[n].condition == "equals") {
							if (opExperiments[n].entity.toString() == opExperiments[n].criteria[i]) opExperiments[n].match = true;
						}
						else if (opExperiments[n].condition == "contains") {
							if (opExperiments[n].entity.toString().indexOf(opExperiments[n].criteria[i]) != -1) opExperiments[n].match = true;
						}
					}
				}
				break;	

		}
	}
}
optimost.identify();

optimost.createStyle=function (styleText){
    var head = document.getElementsByTagName('head')[0],
    style = document.createElement('style'),
    rules = document.createTextNode(styleText);
    style.type = 'text/css';
    if(style.styleSheet)
    style.styleSheet.cssText = rules.nodeValue;
    else style.appendChild(rules);
    head.appendChild(style);
}

optimost.TH=function(r,c,d,e){
    var b=true;
    if(r<1000){
        b=(Math.floor(Math.random()*1000)<r);
        if(c!=null){
            if(this.C[c]!=null)b=(this.C[c]!="mvt-no");
            else this.SC(c,b?"mvt-yes":"mvt-no",e,d);
        }
        return b;
    }
    else return true;
}
optimost.TX=function(){
    var t='<'+this.ST+' src="'+this.S()+'"';
    for(n in this.SA)t+=(" "+n+'="'+this.SA[n]+'"');t+='><\/'+this.ST+'>';
    this.D.write(t);
}

optimost.isIE6=(navigator.userAgent.toLowerCase().indexOf("msie 6")!=-1?true:false);

optimost.XH=function(u){
    if(typeof(u)!="object")return;
    var s=this.D.createElement(this.ST);
    for(var n in this.SA){
	    if(!this.isIE6)s.setAttribute(n,this.SA[n]);
	    else s[n]=this.SA[n];
    }
    for(var n in u){
	    if(!this.isIE6)s.setAttribute(n,u[n]);
	    else s[n]=u[n];
    }
    var h=this.D.getElementsByTagName("head");
    if(h[0])h[0].insertBefore(s,h[0].childNodes[h[0].childNodes.length-1]);
    else this.D.body.insertBefore(s,this.D.body.childNodes[this.D.body.childNodes.length-1]);
}

optimost.RXH=function(r,c,d,e){
    if(this.Enabled){
	var b=true;
	if(r<1000){
	    b=(Math.floor(Math.random()*1000)<r);
	    if(c!=null){
		if(this.C[c]!=null)b=(this.C[c]!="mvt-no");
		else this.SC(c,b?"mvt-yes":"mvt-no",e,d);
	    }
	}
	if(b){
	    var u={"src":this.S()};
	    this.XH(u);
	}
    }
}

var opModulesArray=new Array();

for (var n in opExperiments) {
    if (opExperiments[n].match == true){
        for(var m in opExperiments[n]){
            if(typeof(opExperiments[n][m]) =="function" && opExperiments[n].throttle==1000)opExperiments[n][m]();
        }                              
        if (opExperiments[n].unique.indexOf("event.js") != -1) {
            var _o = optimost;_o.U = opPro + opExperiments[n].unique;_o.ST = "script";_o.SA = {"type": "text/javascript"};_o.B();_o.RXH(opExperiments[n].throttle, opExperiments[n].gum, opExperiments[n].domain, opExperiments[n].expire);
        }
        else if (opExperiments[n].unique.indexOf("content.js") != -1) {
            for (var j = 0; j < opExperiments[n].modules.length; j++) opModulesArray.push(opExperiments[n].modules[j]);
            (function () {
                var _o = optimost;_o.U = opPro + opExperiments[n].unique;_o.ST = "script";
                _o.SA = {"type": "text/javascript"};_o.B();
                if(opExperiments[n].throttle<1000){//If I have a function and Throttle<1000, first see if we are in, then do it
                    isIn=_o.TH(opExperiments[n].throttle, opExperiments[n].gum, opExperiments[n].domain, opExperiments[n].expire);
                    if(isIn){//isIn determined if you are in or not, and dropped cookie to freeze you in that state
                        for(var m in opExperiments[n]){
                            if(typeof(opExperiments[n][m])=="function")opExperiments[n][m]();
                        }
                        _o.XH({"src":_o.U});
                    }
                }
                else _o.RXH(opExperiments[n].throttle, opExperiments[n].gum, opExperiments[n].domain, opExperiments[n].expire);
            })();
        }
        else {
            for (var j = 0; j < opExperiments[n].modules.length; j++) opModulesArray.push(opExperiments[n].modules[j]);
        }
    }
}


