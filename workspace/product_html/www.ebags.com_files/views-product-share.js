define("views-product-share",["jquery","ko","get!core/eBags","get!core/lightbox"],function(n,t,i){function e(t,i,r,u){var f=this;this.data=t;this.show=function(t){n.lightbox.settings.closeImage=i;n.lightbox.settings.closeLink=r;n.lightbox(t)};this.launch=function(){n.ajax({url:u,type:"post",dataType:"html",data:f.data,success:f.show})}}function u(n){var i=this;this.dataModel=t.observable(n);this.items=t.observableArray([])}function o(n,i){var r=this;this.urlFormat=n;this.dataModel=i;this.href=t.computed(function(){if(r.dataModel&&r.urlFormat){var n=r.dataModel();return n.ImageUrl.indexOf("http:")===-1&&(n.ImageUrl="http:"+n.ImageUrl),r.urlFormat.replace("{url}",n.Url).replace("{sku}",n.SelectedSkuName).replace("{brand}",n.BrandName).replace("{model}",n.ModelName).replace("{image}",n.ImageUrl)}})}u.prototype={addItem:function(n){if(this.dataModel&&this.items){var t=new o(n,this.dataModel);return this.items.push(t),t}}};t.bindingHandlers.urlFormat={init:function(n,i,r,u){var e=i(),f=u.addItem(e),o={attr:{href:f.href}};t.applyBindingsToNode(n,o,f)}};t.bindingHandlers.stopBindings={init:function(){return{controlsDescendantBindings:!0}}};var s={shareLinkSelector:"#shareLinks",emailId:"emailFriend",emailData:"",emailFormUrl:"/email/dsp_email_friend_form.cfm",lightbox:{closeImage:"//cdn2.ebags.com/img/lightbox/btn_lightbox_close.gif",closeLink:"#cancelEmail"}},f=null,r=function(r){var o=n.extend({},s,r),l=n(o.shareLinkSelector),h=o.dataModel?o.dataModel:l.data("model"),c,a,p="page={url}&brand={brand}&modelname={model}".replace("{url}",h.Url).replace("{brand}",h.BrandName).replace("{model}",h.ModelName),v=l.get(0),y=document.getElementById(o.emailId);c=new u(h);a=new e(p,o.lightbox.closeImage,o.lightbox.closeLink,o.emailFormUrl);f&&i.unsubscribe(f);f=i.subscribe("/sku/select",function(n){var t=c.dataModel(),i=t.Url.substring(0,t.Url.indexOf("productid=")+10);t.Url=i+n.SkuId;t.SelectedSkuName=n.ColorName;t.ImageUrl=t.ImageUrl.replace(/\d*_\d*_1/,n.Image.IpsId);c.dataModel(t)});t.cleanNode(v);t.applyBindings(c,v);t.cleanNode(y);t.applyBindings(a,y);n(document).bind("afterShow.lightbox",function(){n(".emailFriendSubmit").bind("click",function(t){t.preventDefault();n.ajax({url:o.emailFormUrl,type:"post",dataType:"html",data:n("#emailFriendForm").serialize(),success:function(t){n.lightbox(t)}})})})};return r.EmailFriendViewModel=e,r.ShareViewModel=u,r.ShareItemViewModel=o,r})