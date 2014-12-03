/*
    ==============NET.js====================
    contains the main objects and functions for providing AJAX calls to the server and getting XML files
    ========================================
*/

/* namespacing object */
var net=new Object();

net.READY_STATE_UNINITIALIZED=0;
net.READY_STATE_LOADING=1;
net.READY_STATE_LOADED=2;
net.READY_STATE_INTERACTIVE=3;
net.READY_STATE_COMPLETE=4;

/*--- content loader object for cross-browser requests 
		url 		- destination file URL;
		onload		- assigns the function call when the requested data is returned from the server;
		onerror		- assigns the function call on error;
		method		- HTTP method;
		params		- XMLHTTPRequest parameters (default null).
---*/		
net.ContentLoader=function(url,onload,onerror,method, params){
  this.req=null;
  this.reqType=0;
  net.currentLoader=this;
  this.onload=onload;
  this.onerror=(onerror) ? onerror : this.defaultError;
  this.loadXMLDoc(url,method, params);
}

net.ContentLoader.prototype.loadXMLDoc=function(url,method,params){
  if (!method){
    method="GET";
  }
        if (window.XMLHttpRequest) { // Mozilla, Safari, ...
            this.req = new XMLHttpRequest();
            if (this.req.overrideMimeType) {
                this.req.overrideMimeType('text/xml');
            }
        } else if (window.ActiveXObject) { // IE
            try {
                this.req = new ActiveXObject("Msxml2.XMLHTTP");
				this.reqType = 1;
            } catch (e) {
                try {
                    this.req = new ActiveXObject("Microsoft.XMLHTTP");
					this.reqType = 2;
                } catch (e) {}
            }
        }  
   
   if (!this.req) {
        alert('Cannot create an XMLHTTP instance');
        return false;
    }
	
  if (this.req){
    try{
      var loader=this;
      this.req.onreadystatechange=function(){
        net.ContentLoader.onReadyState.call(loader);
      }
      this.req.open(method,url,true);
      this.req.send(params);
    }catch (err){
      this.onerror.call(this);
    }
  }
}

net.ContentLoader.onReadyState=function(){
  var req=this.req;
  var ready=req.readyState;
  try
  {
  if (ready==net.READY_STATE_COMPLETE){
    if (req.status==200 || req.status==0 || (typeof(req.status == 'undefined' && location.protocol == 'file:')))
    {
        this.onload.call(this);
    }else{
      this.onerror.call(this);
      //alert('There was a problem with the XMLHTTPRequest:\n' + req.statusText);
    }
  }
  }
  catch(e){}
}

net.ContentLoader.prototype.defaultError=function(){
  alert("error fetching data!"
    +"\n\nreadyState:"+this.req.readyState
    +"\nstatus: "+this.req.status
    +"\nheaders: "+this.req.getAllResponseHeaders());
}

