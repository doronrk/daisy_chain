function initializeScene7Components(c,n,a,b){s7sdk.Util.init();var q=[];var d=[];var j=[];var f=[];var s=[];var t=[];var g="";var m="";var r=null;var l=null;var o=[];var w=[];var e=1;if(a=="1"){g=c}else{if(typeof n==="undefined"||n==""||n==null){g=c+"_is"}else{g=c+"_"+n}}if(a=="1"){m=c}else{m=c+"_is"}r=g.replace(/^\s+|\s+$/g,"");l=m.replace(/^\s+|\s+$/g,"");s[c]=new s7sdk.ParameterManager();t[c]=new s7sdk.ParameterManager();function p(){var y="NewYorkCompany/"+r;var x="NewYorkCompany/"+l;s[c].push("serverurl","http://images.nyandcompany.com/is/image");s[c].push("asset",y);s[c].push("ZoomView.singleclick","zoom");s[c].push("iconeffect","0");t[c].push("ZoomView.iscommand","$productdetaildefault$");t[c].push("serverurl","http://images.nyandcompany.com/is/image");t[c].push("asset",x);t[c].push("ZoomView.singleclick","zoom");t[c].push("iconeffect","0");t[c].push("Swatches.iscommand","$altthumb$");j[c]=new s7sdk.Container("col5Container"+c,t[c],"images-container"+c);j[c].addEventListener(s7sdk.ResizeEvent.COMPONENT_RESIZE,i,false);q[c]=new s7sdk.ZoomView("images-container"+c,t[c],"images"+c);q[c].addEventListener(s7sdk.AssetEvent.ASSET_CHANGED,v,false);d[c]=new s7sdk.Swatches("images"+c,t[c],"thumbs"+c);q[c].setAsset(y);f[c]=new s7sdk.VisibilityManager();f[c].reference(q[c]);f[c].attach(d[c]);q[c].addEventListener(s7sdk.event.CapabilityStateEvent.NOTF_ZOOM_CAPABILITY_STATE,k);d[c].addEventListener(s7sdk.AssetEvent.SWATCH_SELECTED_EVENT,u,false);d[c].selectSwatch(0,true)}t[c].addEventListener(s7sdk.Event.SDK_READY,p,false);t[c].init();function k(y){if(y.s7event.state.hasCapability(s7sdk.ZoomCapabilityState.ZOOM_IN)){}else{}if(y.s7event.state.hasCapability(s7sdk.ZoomCapabilityState.PAN_DOWN)||y.s7event.state.hasCapability(s7sdk.ZoomCapabilityState.PAN_UP)||y.s7event.state.hasCapability(s7sdk.ZoomCapabilityState.PAN_RIGHT)||y.s7event.state.hasCapability(s7sdk.ZoomCapabilityState.PAN_LEFT)){if(document.getElementById("thumbs"+c)!=null){document.getElementById("thumbs"+c).style.visibility="hidden"}}else{if(document.getElementById("thumbs"+c)!=null){var x=document.getElementById("thumbs"+c).style;x.visibility="visible";x.opacity=1;x.display="block"}}}function u(y){var x=y.s7event.asset;if((q[c])&&(q[c].item!=null)&&(q[c].item.name!=x.name)){console.log("swatchSelected:"+q[c].item.name+"--"+x.name);q[c].setItem(x)}}function i(x){q[c].resize(x.s7event.w,x.s7event.h)}var h=false;function v(y){console.log("Coming Here");console.log(document.getElementById("thumbs"+c));if(!h&&(document.getElementById("thumbs"+c))!==null){var z=document.getElementById("thumbs"+c).getElementsByTagName("div")[0].getElementsByTagName("div")[0];var x=z.style.cssText;z.style.cssText=x.replace(/\-webkit\-transform: translateZ\(0px\);/,"");h=true;console.log("translateZ hack applied!")}if((d[c])&&(d[c].frame!=y.s7event.frame)){d[c].selectSwatch(y.s7event.frame,true)}}};