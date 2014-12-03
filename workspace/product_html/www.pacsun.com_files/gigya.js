// Injected language object
if (!gigya.i18n) gigya.i18n = { };
if (!gigya.i18n['gigya.services.comments.plugins.rating.js']) gigya.i18n['gigya.services.comments.plugins.rating.js'] = { };
gigya.i18n['gigya.services.comments.plugins.rating.js']['en'] = {"one_review": "1 Review", "num_reviews": "%num Reviews", "write_your_review": "Write your review", "average_rating_colon": "Average rating:"};
// End injected language object

gigya._.UI.registerPlugin(function() {
gigya = window.gigya;
var gigya;(function(a){a=a._||(a._={});a=a.plugins||(a.plugins={});a=a.resources||(a.resources={});a=a.html||(a.html={});(a.rating||(a.rating={})).addReviewButton='<a href="#" class="gig-rating-writeYourReview gig-rating-button"></a>'})(gigya||(gigya={}));
(function(a){a=a._||(a._={});a=a.plugins||(a.plugins={});a=a.resources||(a.resources={});a=a.html||(a.html={});(a.rating||(a.rating={})).dimension='<div class="gig-rating-dimension">    <span class="gig-rating-dimension-title">$dimensionTitle</span>    $dimensionStars</div>'})(gigya||(gigya={}));
(function(a){a=a._||(a._={});a=a.plugins||(a.plugins={});a=a.resources||(a.resources={});a=a.html||(a.html={});(a.rating||(a.rating={})).rating='<div class="gig-rating gig-clr">    <div class="gig-stars-container">        <div class="gig-rating-topbar">            <span class="gig-rating-averageRating">$averageRatingLabel</span>            $stars        </div>        <div class="gig-rating-dimensions"></div>    </div>    <div class="gig-button-container gig-clr">        $readReviewsLink        $addReviewButton    </div></div>'})(gigya||(gigya=
{}));(function(a){a=a._||(a._={});a=a.plugins||(a.plugins={});a=a.resources||(a.resources={});a=a.html||(a.html={});(a.rating||(a.rating={})).readReviewsLink='<a href="#" class="gig-rating-readReviewsLink"></a>'})(gigya||(gigya={}));(function(a){a=a._||(a._={});a=a.plugins||(a.plugins={});a=a.resources||(a.resources={});a=a.html||(a.html={});(a.rating||(a.rating={})).stars='<span class="gig-rating-stars"></span>'})(gigya||(gigya={}));
(function(a){a=a._||(a._={});a=a.plugins||(a.plugins={});a=a.resources||(a.resources={});a=a.css||(a.css={});(a.rating||(a.rating={})).global='.gig-clr:after {    content: " ";    display: block;    clear: both;    visibility: hidden;    line-height: 0;    height: 0;}.gig-rating *, div.gig-rating {    border: none;    padding: 0px;    margin: 0px;    color: inherit;    text-decoration: none;    width: auto;    float: none;    -moz-border-radius: 0;    border-radius: 0;    font-family: arial;    font-size: 12px;    color: #4e4e4e;    background: none;    text-align: left;}div.gig-rating {    display: inline-block;}.gig-rating-readReviewsLink, *:link.gig-rating-readReviewsLink, *:active.gig-rating-readReviewsLink, *:visited.gig-rating-readReviewsLink, *:hover.gig-rating-readReviewsLink {    margin-right: 73px;    color: #3C8BCE;    text-decoration: underline;    cursor: pointer;    float: left;    white-space: nowrap;}*.gig-rating-dimensions {    padding-top: 4px;}*.gig-rating-stars {    zoom: 1;    position: relative;    top: 4px;}*.gig-rating-averageRating {    margin-right: 15px;    zoom: 1;    font-weight: bold;    display: inline-block;}*.gig-rating-dimension-title {    margin-right: 17px;    zoom: 1;    display: inline-block;}.gig-rating-writeYourReview, *:link.gig-rating-writeYourReview, *:active.gig-rating-writeYourReview, *:visited.gig-rating-writeYourReview {    cursor: pointer;    padding: 2px 14px 2px;    font-size: 11px;    color: #FFFFFF;    line-height: 15px;    border-radius: 3px;    background-color: #88cb82;    text-align: center;    display: inline-block;    box-shadow: 1px 1px rgba(255, 255, 255, 0.4) inset;    border: 1px solid #51AE48;    gradient(#88cb82,#72c26d);    border: 1px solid #51AE48;    float: left;}*.gig-rating-writeYourReview:hover {    background-color: #7AB574;    gradient(#7AB574,#7AB574);}.gig-stars-container {    float: left;    margin-bottom: 13px;}.gig-button-container {    float: left;    margin-top: 5px;}/* width <= 255px */.gig-size-1 {}    .gig-size-1 .gig-rating-averageRating, .gig-size-1 .gig-rating-stars, .gig-size-1 .gig-rating-dimension-title {        display: block;    }    .gig-size-1 .gig-rating-averageRating, .gig-size-1 .gig-rating-dimension-title {        margin-bottom: 4px;    }    .gig-size-1 .gig-rating-stars {        margin-bottom: 12px;        width: 125px;    }    .gig-size-1 .gig-rating-readReviewsLink {        margin-bottom: 14px;        float: none;        margin-right: 0;        display: block;    }    .gig-size-1 .gig-stars-container {        width: auto;        float: none;        margin-bottom: 0;    }    .gig-size-1 .gig-button-container {        min-width: 0;        margin-left: 0;        margin-top: 0;    }    .gig-size-1 .gig-rating-writeYourReview {        float: none;    }/* width <= 492px */.gig-size-2 {}    .gig-size-2 .gig-stars-container {        width: 240px;        float: none;        margin-bottom: 0;    }    .gig-size-2 .gig-button-container {        min-width: 240px;        margin-top: 0;        margin-left: 0;    }    .gig-size-2 .gig-rating-dimensions {        margin-bottom: 16px;    }    .gig-size-2 .gig-rating-readReviewsLink {        margin-top: 3px;        margin-right: 0;    }    .gig-size-2 .gig-rating-writeYourReview {        display: block;        margin-left: 106px;        float: none;    }/* width >= 493px */.gig-size-3 {}    .gig-size-3 .gig-stars-container {        margin-bottom: 13px;        margin-right: 10px;    }    .gig-size-3 .gig-button-container {        margin-top: 5px;    }'})(gigya||
(gigya={}));var __extends=this.__extends||function(a,c){function f(){this.constructor=a}for(var g in c)c.hasOwnProperty(g)&&(a[g]=c[g]);f.prototype=c.prototype;a.prototype=new f};
(function(a){(function(c){(function(f){(function(c){var k=function(c){function b(){c.apply(this,arguments);this.autoPixelRatio=!1;this.pixelRatio=1}__extends(b,c);b.getPhotoFullName=function(a,b,d){"undefined"===typeof b&&(b=0);"undefined"===typeof d&&(d="png");return this.imgBase+a+"_x"+(0<b?b:this.pixelRatio)+"."+d};b.injectionInfo=function(){return{name:"rating",namespace:"comments",methodName:"showRatingUI",jsName:"gigya.services.comments.plugins.rating"}};b.prototype.init=function(e){this.params.useHiResIcons&&
(this.autoPixelRatio=!0,this.pixelRatio=0);this.templates=this.getTemplates();this.linkedCommentsContainer=document.getElementById(this.params.linkedCommentsUI);f.cssFlags[b.injectionInfo().jsName].runtimeCss||(f.utils.css.addCss(b.runtimeCss,this.params.cssPrefix),f.cssFlags[b.injectionInfo().jsName].runtimeCss=!0);this.fetchStreamInfo(e);this.autoPixelRatio&&a.utils.DOM.addClassToElement(this.container,"gig-comments-hires-icons")};b.prototype.getConfig=function(){return{requiredParams:["categoryID",
"streamID"],defaultParams:{streamID:"",showReadReviewsLink:!0,showCommentButton:!0,includeRatingsDims:!0,width:"493"},hasMobileUI:!1,allowModal:!1,enableSizePolling:!0}};b.prototype.getTemplates=function(){var a=c.prototype.getTemplates.call(this);this.params.ratingTemplate&&(a.rating=this.params.ratingTemplate);return a};b.prototype.resizePlugin=function(){var e=this.lastPolledWidth;if(-1!=this.params.width.indexOf("%"))var b=parseInt(this.params.width.replace("%",""))/100,e=e*b;var d=a.utils.DOM.getElementsByClass(document.getElementById(this.containerID),
"gig-rating");0<d.length&&(b="",b=255>=e?"gig-size-1":492>=e?"gig-size-2":"gig-size-3",e=d[0],-1===e.className.indexOf(b)&&(d=e.className.replace(/\bgig-size-[1-3]\b/,""),e.className=(d+" "+b).replace(/\s{2,}/g," ")))};b.prototype.fetchStreamInfo=function(e){var b=this;a.comments.getStreamInfo(this.params,{callback:function(a){b.gotStreamInfoCallback(a);e()}})};b.prototype.gotStreamInfoCallback=function(a){0!=a.errorCode?(this.container&&(this.container.innerHTML=""),this.dispatchErrorFromResponse(a)):
a.streamInfo.avgRatings?this.container&&(this.averageRating=a.streamInfo.avgRatings,this.reviewsCount=a.streamInfo.threadCount,this.ratingDimensions=a.streamInfo.ratingsDims,this.updateContent()):this.container&&(this.container.innerHTML="")};b.prototype.updateContent=function(){this.container&&(this.container.innerHTML="");this.container.innerHTML=a.utils.templates.fill(this.templates.rating,{addReviewButton:this.templates.addReviewButton,readReviewsLink:this.templates.readReviewsLink,stars:this.templates.stars,
averageRatingLabel:this.getText("average_rating_colon")});this.fillMainElements();this.registerForEvents()};b.prototype.fillMainElements=function(){var e=a.utils.DOM.getElementsByClass(this.container,"gig-rating-stars")[0];e&&(e.innerHTML=this.getStarsElement("_overall").innerHTML,e.setAttribute("title",this.averageRating._overall),e.setAttribute("alt",this.averageRating._overall));if(e=a.utils.DOM.getElementsByClass(this.container,"gig-rating-writeYourReview")[0])e.innerHTML=this.getText("write_your_review");
var e=1==this.reviewsCount?this.getText("one_review"):this.getText("num_reviews","%num",this.reviewsCount.toString()),b=a.utils.DOM.getElementsByClass(this.container,"gig-rating-readReviewsLink")[0];b&&(b.innerHTML=e);this.updateDimensions()};b.prototype.updateDimensions=function(){var b=a.utils.DOM.getElementsByClass(this.container,"gig-rating-dimensions")[0];if(b)if(this.ratingDimensions){var h=a.utils.DOM.getElementsByClass(this.container,"gig-rating-averageRating")[0],d=0;h&&(d=h.offsetWidth+
1);for(h=0;h<this.ratingDimensions.length;h++){var c=this.ratingDimensions[h],f=document.createElement("div");f.innerHTML=a.utils.templates.fill(this.templates.dimension,{dimensionTitle:c.name+":",dimensionStars:this.getStarsElement(c.id).outerHTML});b.appendChild(f);c=a.utils.DOM.getElementsByClass(f,"gig-rating-dimension-title")[0].offsetWidth;c>d&&(d=c)}a.global.addCSS("#"+this.container.id+" .gig-rating-dimension-title, #"+this.container.id+" .gig-rating-averageRating { width:"+d+"px; }",this.params.cssPrefix)}else b.style.display=
"none"};b.prototype.registerForEvents=function(){var b=this,c=a.utils.DOM.getElementsByClass(this.container,"gig-rating-readReviewsLink")[0],d=a.utils.DOM.getElementsByClass(this.container,"gig-rating-writeYourReview")[0];c&&(this.params.showReadReviewsLink||(c.style.display="none"),a.utils.DOM.addEventListener(c,"click",function(a){b.readReviewsClicked(a)}));d&&(this.params.showCommentButton||(d.style.display="none"),a.utils.DOM.addEventListener(d,"click",function(a){b.addReviewsClicked(a)}))};b.prototype.readReviewsClicked=
function(b){a.utils.DOM.cancelEvent(b);this.params.linkedCommentsUI&&(b=document.getElementById(this.params.linkedCommentsUI),(b=a.utils.DOM.getElementsByClass(b,"gig-comments-comments")[0])||(b=document.getElementById(this.params.linkedCommentsUI+"-comments")),a.global.scrollToElement(b));this.dispatchPluginEvent("readReviewsClicked")};b.prototype.addReviewsClicked=function(b){a.utils.DOM.cancelEvent(b);this.params.linkedCommentsUI&&(b=document.getElementById(this.params.linkedCommentsUI),(b=a.utils.DOM.getElementsByClass(b,
"gig-comments-composebox")[0])||(b=document.getElementById(this.params.linkedCommentsUI+"-commentBox")),a.global.scrollToElement(b));this.dispatchPluginEvent("addReviewClicked")};b.prototype.getStarsElement=function(b){b=this.averageRating[b];void 0===b&&(b=0);var c=document.createElement("span");a.utils.DOM.addClassToElement(c,"gig-rating-stars");c.setAttribute("title",""+b);c.setAttribute("alt",""+b);for(var d=0;5>d;d++){var f=document.createElement("div");a.utils.DOM.addClassToElement(f,"gig-rating-star");
var g="",g=d<Math.floor(b)?"gig-rating-star-full":0.5<=b-d?"gig-rating-star-half":"gig-rating-star-empty";a.utils.DOM.addClassToElement(f,g);c.appendChild(f)}return c};b.pixelRatio=window.devicePixelRatio?Math.min(Math.ceil(window.devicePixelRatio),3):1;b.imgBase=a._.getCdnResource("/gs/i/comments2/");b.runtimeCss=["*.gig-rating-star {zoom:1;display:inline-block;zoom:1;background-repeat:no-repeat;padding-right:4px; width: 21px; height:20px;background-image:url('"+b.getPhotoFullName("Star_gray_big",
1)+"')}",".gig-comments-hires-icons *.gig-rating-star {background-size:contain; background-image:url('"+b.getPhotoFullName("Star_gray_big")+"')}","*.gig-rating-star-half {background-image:url('"+b.getPhotoFullName("Star_half_big",1)+"')}",".gig-comments-hires-icons *.gig-rating-star-half {background-size:contain; background-image:url('"+b.getPhotoFullName("Star_half_big")+"')}","*.gig-rating-star-full {background-image:url('"+b.getPhotoFullName("Star_yellow_big",1)+"')}",".gig-comments-hires-icons *.gig-rating-star-full {background-size:contain; background-image:url('"+
b.getPhotoFullName("Star_yellow_big")+"')}","*.gig-rating-dimensions  div.gig-rating-star {zoom:1;display:inline-block;padding-right:3px;zoom:1;background-repeat:no-repeat;width:16px;height:16px;background-image:url('"+b.getPhotoFullName("Star_gray_small",1)+"')}",".gig-comments-hires-icons *.gig-rating-dimensions  div.gig-rating-star {background-size:contain; background-image:url('"+b.getPhotoFullName("Star_gray_small")+"')},","*.gig-rating-dimensions  div.gig-rating-star-half { background-image:url('"+
b.getPhotoFullName("Star_half_small",1)+"')}",".gig-comments-hires-icons *.gig-rating-dimensions  div.gig-rating-star-half { background-size:contain; background-image:url('"+b.getPhotoFullName("Star_half_small")+"')}","*.gig-rating-dimensions  div.gig-rating-star-full { background-image:url('"+b.getPhotoFullName("Star_yellow_small",1)+"')}",".gig-comments-hires-icons *.gig-rating-dimensions  div.gig-rating-star-full { background-size:contain; background-image:url('"+b.getPhotoFullName("Star_yellow_small")+
"')}"].join("");return b}(f.BasePlugin);c.RatingPlugin=k})(f.rating||(f.rating={}))})(c.plugins||(c.plugins={}))})(a._||(a._={}))})(gigya||(gigya={}));

});
