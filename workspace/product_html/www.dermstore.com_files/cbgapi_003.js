/* JS */ gapi.loaded_2(function(_){var window=this;
_.Sm.qa("ytsubscribe",function(a,c){var f=_.Sm.G;f&&_.Sm.wc({role:"ytsubscribe",iframe:f,data:c},{role:"ytrelay",iframe:a})},void 0,_.Vz);
var HU={onytevent:!0},IU=["https://www.youtube.com"],JU=["http://www.youtube.com","https://www.youtube.com"];var KU=function(){this.B=this.G=null};KU.prototype.ha=function(){var a=window.location.href.split("#")[0],c=_.Sm.G,c=c&&c.Pq();return{eurl:a,notificationsPipeSupported:-1!=_.xd.call(JU,c)}};KU.prototype.M=function(a){var c=_.Sm.G;if(c)try{c.send("ytsubscribe-msg",a,void 0,MU(this))}catch(f){}};var LU=function(a){a.G||(a.G=_.AD(IU));return a.G},MU=function(a){a.B||(a.B=_.AD(JU));return a.B};
(function(){var a=new KU;_.iC({0:"ytsubscribe",3:HU,5:function(c,f){if("e"==c){var g=f[5];g.register("_ready",a.ha,LU(a));g.register("msg-youtube-pubsub",(0,_.H)(a.M,a),LU(a))}}})})();
});
// Google Inc.
