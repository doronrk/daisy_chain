window.onload = function()
{
	//var heightB;
    //var bannerH=document.getElementById("banner");
    //heightB=bannerH.offsetHeight;
    //var fashionU= document.getElementById("fashion_update");
	//fashionU.style.height=heightB+"px";
	//fashionU.style.lineHeight=heightB+"px";
};

//

//for(var i = 0, l = bannerH.length; i < l; i++) {
//	heightB=bannerH[i];
//}
//alert(bannerH.length);


var widgets = new Array();
//getTwitters('twitterStatus', {
//    id: 'dressbarn',
//    count: 1,
//    enableLinks: true,
//    ignoreReplies: true,
//    clearContents: true,
//    template: '%text%',
//    newwindow: true
//});

	
	



function slideWidget(key) {
    
    if(!widgets[key]) widgets[key] = [];
    if(widgets[key]['state'] != "busy") {
        var widget = document.getElementById(key);
        var trigger = document.getElementById(key+"_trigger");
        var to_height = (widget.offsetHeight == 0) ? widget.scrollHeight : 0;
        var from_height = (widget.offsetHeight == 0) ? 0 : widget.scrollHeight;
        var ease_type = (from_height == 0) ? YAHOO.util.Easing.easeOut : YAHOO.util.Easing.easeIn;
        widgets[key]['state'] = "closed";
        widgets[key]['animation'] = new YAHOO.util.Anim(key, { height: {to: to_height, from: from_height} }, 0.5, ease_type);
        widgets[key]['animation'].onStart.subscribe(function() {widgets[key]['state'] = "busy";});
        widgets[key]['animation'].onComplete.subscribe(function() {widgets[key]['state'] = (from_height == 0 ? "open" : "close")});
        widgets[key]['animation'].stop();
        widgets[key]['animation'].animate();
        
        for(var x in widgets) {
            if(x != key) {
                document.getElementById(x).style.height = 0;
                widgets[x]['state'] = "closed";
            }
        }
    }
}

function twitterCallback2(twitters) {
  var statusHTML = [];
  for (var i=0; i<twitters.length; i++){
    var username = twitters[i].user.screen_name;
    var status = twitters[i].text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url) {
      return '<a href="'+url+'">'+url+'</a>';
    }).replace(/\B@([_a-z0-9]+)/ig, function(reply) {
      return  reply.charAt(0)+'<a href="http://twitter.com/'+reply.substring(1)+'">'+reply.substring(1)+'</a>';
    });
    statusHTML.push(status);
  }
  document.getElementById('twitterStatus').innerHTML = statusHTML.join('');
}