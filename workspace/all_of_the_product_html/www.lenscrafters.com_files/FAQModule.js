(function(){var rightNowWidgetHost=constants.ajaxParams.rightNowWidgetHost;var rightNowHost=constants.ajaxParams.rightNowHost;var modules=$("div[data-faq-keyword], span[data-faq-keyword]").each(function(){var $this=$(this);if(!this.id||!this.id.length){$this.attr("id","faqModule"+Math.floor(Math.random()*1000000000))}var numberOfAnswers=5;if($this.attr("data-number-questions")){numberOfAnswers=parseInt($this.attr("data-number-questions"))}RightNow.Client.Controller.addComponent({q:$this.attr("data-faq-keyword"),correction:false,description:false,div_id:this.id,instance_id:this.id,module:"KnowledgeSyndication",number_answers:numberOfAnswers,related:false,search_box:false,type:3},rightNowWidgetHost+"ci/ws/get")});if(rightNowHost&&rightNowHost.length){var newUrl=getAbsoluteURL();newUrl+="FAQLandingView";var params={storeId:constants.ajaxParams.storeId,catalogId:constants.ajaxParams.catalogId,langId:constants.ajaxParams.langId};var first=true;for(var key in params){if(first){newUrl+="?"+key+"="+encodeURIComponent(params[key]);first=false}else{newUrl+="&"+key+"="+encodeURIComponent(params[key])}}$("body").on("mousedown click",'a[href*="'+rightNowHost+'"]',function(){var $this=$(this);if(!$this.data("changedUrl")){$this.data("changedUrl",true);var linkUrl=newUrl+"#"+this.href;this.href=linkUrl}})}var allFAQS;setTextTimer();function setTextTimer(){allFAQS=setInterval(function(){$(".KnowledgeSyndication .rn_Navigation a").text("All FAQs");stopTextTimer()},1000)}function stopTextTimer(){clearInterval(allFAQS)}})();