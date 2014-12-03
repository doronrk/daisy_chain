/* FACEBOOKE */
try {
    FB.Event.subscribe('edge.create', function(targetUrl) {
        jQuery(window).trigger('_trackSocial', ['facebook', 'like', targetUrl]);
    });
} catch(e) {}

/* TWITTER */
try {
    twttr.events.bind('tweet', function(event) {
    
      if (event) {
        var targetUrl;
        if (event.target && event.target.nodeName == 'IFRAME') {
          targetUrl = extractParamFromUri(event.target.src, 'url');
        }
    
        
        jQuery(window).trigger('_trackSocial', ['twitter', 'tweet', targetUrl]);
      }
    }); 
} catch (e) {}

function extractParamFromUri(e,t){if(!e){return}var e=e.split("#")[0];var n=e.split("?");if(n.length==1){return}var r=decodeURI(n[1]);t+="=";var i=r.split("&");for(var s=0,o;o=i[s];++s){if(o.indexOf(t)===0){return unescape(o.split("=")[1])}}}

