function TrackingEventRecorder(a,b){var c=this;this.data=a,this.parentData=b,this.enhancedEcommerce=!0,this.pageViewFired=!1,this.useLabel=function(){return c.data.label&&c.data.name!==c.parentData.defaultReferenceKey},this.addLabel=function(a){return c.useLabel()?c.data.label+"."+a:a},this.ecLabel=function(a){return c.addLabel("ec:"+a)};var d=function(){c.firePageView()};window.addEventListener?window.addEventListener("load",d,!1):window.attachEvent?window.attachEvent("onload",d):document.addEventListener("load",d,!1)}function LegacyTrackingEventRecorder(a,b){TrackingEventRecorder.call(this,a,b),this.enhancedEcommerce=!1}function TrackingManager(a){this.data=a,this.recorders=[];for(var b in this.data.referenceMap)this.recorders.push(this.getTrackingEventRecorderFactory(b,this.data))}function ProductInfo(a){this.data=a}function TaxonomyInfo(a){this.data=a}!function(a,b,c,d,e,f,g){a.GoogleAnalyticsObject=e,a[e]=a[e]||function(){(a[e].q=a[e].q||[]).push(arguments)},a[e].l=1*new Date,f=b.createElement(c),g=b.getElementsByTagName(c)[0],f.async=1,f.src=d,g.parentNode.insertBefore(f,g)}(window,document,"script","//www.google-analytics.com/analytics.js","__gaTracker"),TrackingEventRecorder.prototype.initPageView=function(){var a={};this.parentData&&this.parentData.customerID&&(a.userId=this.parentData.customerID.toString()),this.useLabel()&&(a.name=this.data.label),0===a.length?__gaTracker("create",this.data.extReference,"auto"):a.userId?__gaTracker("create",this.data.extReference,a):__gaTracker("create",this.data.extReference,"auto",a);var b=this.addLabel("require");__gaTracker(b,"displayfeatures"),this.enhancedEcommerce&&__gaTracker(b,"ec")},TrackingEventRecorder.prototype.firePageView=function(){this.pageViewFired||(__gaTracker(this.addLabel("send"),"pageview"),this.pageViewFired=!0)},TrackingEventRecorder.prototype.fireVirtualPageView=function(a){__gaTracker(this.addLabel("send"),"pageview",a)},TrackingEventRecorder.prototype.firePurchaseOrder=function(a){if(a){var b=[];a.productDTO&&(b=a.productDTO);for(var c in b){var d=new ProductInfo(b[c]),e=d.toGoogleAnalytics();__gaTracker(this.ecLabel("addProduct"),e)}var f={};a.id&&(f.id=a.id.toString()),a.affiliation&&(f.affiliation=a.affiliation),a.revenue&&(f.revenue=a.revenue.toString()),a.tax&&(f.tax=a.tax.toString()),(a.shipping||0===a.shipping)&&(f.shipping=a.shipping.toString()),a.coupon&&(f.coupon=a.coupon),__gaTracker(this.ecLabel("setAction"),"purchase",f)}},LegacyTrackingEventRecorder.prototype=Object.create(TrackingEventRecorder.prototype),LegacyTrackingEventRecorder.prototype.firePurchaseOrder=function(){},TrackingManager.prototype.initPageView=function(){for(var a in this.recorders)this.recorders[a].initPageView()},TrackingManager.prototype.getTrackingEventRecorderFactory=function(a,b){var c,d=b.referenceMap[a];return c=d.properties&&d.properties.enhancedEcommerce&&"true"===d.properties.enhancedEcommerce?new TrackingEventRecorder(d,b):new LegacyTrackingEventRecorder(d,b)},TrackingManager.prototype.firePageView=function(){for(var a in this.recorders)this.recorders[a].firePageView()},TrackingManager.prototype.fireVirtualPageView=function(a){for(var b in this.recorders)this.recorders[b].fireVirtualPageView(a)},TrackingManager.prototype.firePurchaseOrder=function(a){if(a)for(var b in this.recorders)this.recorders[b].firePurchaseOrder(a)},ProductInfo.prototype.toGoogleAnalytics=function(){var a={},b=[];this.data.taxonomyDTO&&(b=this.data.taxonomyDTO);var c=new TaxonomyInfo(b),d=c.getCategoryAnalytics();if(this.data.shortSku&&(a.id=this.data.shortSku),this.data.productName&&(a.name=this.data.productName),d&&(a.category=d),this.data.brand&&(a.brand=this.data.brand),this.data.optionDescription){var e=this.data.optionDescription;this.data.subSku&&(e=e+"("+this.data.subSku+")"),a.variant=e}return this.data.price&&(a.price=this.data.price.toString()),this.data.coupon&&(a.coupon=this.data.coupon),this.data.quantity&&(a.quantity=this.data.quantity),this.data.position&&(a.position=this.data.position),a},TaxonomyInfo.prototype.getCategoryAnalytics=function(){var a="",b=this.data.slice(0,5);for(var c in b){var d=b[c];a+=d.displayText+"("+d.id+")",c!=b.length-1&&(a+="/")}return a};