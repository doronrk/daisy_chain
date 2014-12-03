/* PJTSVY-1 : 20140421 */
lg.surveyBrowser = lg.Component.extend({
	options: {
		/* SMG-6280 20140829 modify-03 */
		num: true,
		/* SMG-6280 20140829 modify-03 */
		superCateIdx: "",
		categoryIdx: "",
		subCateIdx: ""
	},
	init: function (a, b) {
		this._super(a, b);
		this.svOpen = $(this.element);
		if ($("body").children(".survey-modal").length == 0) {
			$("body").append('<div class="survey-modal" style="display:none"><div class="survey-browser-wrap"><div class="survey-title"></div><div class="survey-inner"></div><a href="#" class="close-sv ir">Close</a></div>');
		}
		this.svOpen.on("click", $.proxy(this.openSurveyBrowser, this));
		
		this.innerItem = $(".survey-browser-wrap .survey-inner");
		this.svClose = $(".survey-browser-wrap .close-sv");
		this.stepW = 0;
		this.stepWI = 1;
		this._Next = $('.submitBtns .svNext').text();
		this._Back = $('.submitBtns .svBack').text();
	},
	openSurveyBrowser: function (b) {
		b.preventDefault();
		
		/* layer access */
		accessFocus();
		var firstElement = $(".survey-inner > div:visible").find("a, input[type='radio']:not(:disabled), input[type='text']:not(:disabled), select, button, textarea, *[tabindex='0']").filter(':first'),
			closeElement = $(".survey-browser-wrap").find(".close-sv");

		this.svOpen.off('keydown').on('keydown', $.proxy(function (b) {
			if(b.keyCode == 9 && b.shiftKey) {
			} else if (b.keyCode == 9) {
				if($(".survey-modal").css("display") == "block"){
					b.preventDefault();
					firstElement.focus();
					accessFocus();
				}
			}
		}, this));

		closeElement.on('click', $.proxy(function (b) {
			b.preventDefault();
			this.svOpen.focus();
		}, this));
		
		$(".survey-modal").fadeIn(500, function () {
			if ($(".survey-browser-wrap").outerHeight() < $(window).height()) {} else {
				$(".survey-browser-wrap").css({
					"margin-top": "0",
					top: "0"
				});
				$(".survey-browser-wrap .survey-inner").css({
					height: "100%",
					overflow: "hidden"
				})
			}
			if (!$.browser.msie || ($.browser.msie && $.browser.version > 8)) {
				$("body").css({
					height: $(window).height() + "px",
					"overflow-y": "hidden"
				})
			}
			if ($.browser.msie && $.browser.version < 9) {
				$("body").css({
					height: $(window).height() + "px",
					"overflow-y": "hidden"
				});
				$(".survey-modal").css("background", 'url("/lg3-common/images/global/dither.gif")')
			}
			if ($.browser.msie && $.browser.version < 7) {
				$("body").css({
					height: "auto",
					"overflow-y": "auto"
				});
				$(".model-modal").css({
					position: "absolute",
					height: $("body").outerHeight() + "px"
				});
				$(".survey-modal .survey-browser-wrap").css({
					top: ($(window).scrollTop() + ($(window).height() / 2) - 205) + "px",
					"margin-top": "0"
				})
			}           
		});
		if($('div.survey-information .survey-browser .info').attr('first') !='false'){	
			$.ajax({
				type: $('nav.subnav form#forSurvey').attr('method'),
				url: b.currentTarget.getAttribute('data-url'),
				data: $('nav.subnav form#forSurvey').serialize(),
				success: $.proxy(function (c) {
					this.innerItem.html(c);
					$('.survey-modal .survey-title').text($('.msgTitle').val());
				}, this),
				complete: $.proxy(function () {		
					$('div.survey-information .survey-browser .info').attr('first','false');
					$('div.survey-information .survey-browser .info').css({'paddingTop':($('div.survey-information .survey-browser').height()-$('div.survey-information .survey-browser .info').height())/2+'px'});
					this.openAct(b);
				}, this)
			});
		}
		this.svClose.bind("click", $.proxy(this.closeSurveyBrowser, this))
	},
	openAct: function(b){
		b.preventDefault();
		_this = this;
		_this.stepW = 0;
		_this.stepWI = 1;
		_this.stepW = Math.floor(100/Number($('.survey-step .stepTxt span.step-total').text()));
		
		$('.survey-inner .survey-information .svStart').on("click", function(b){
			
			$('.survey-inner .survey-information').stop().animate({
				 opacity: '0'
			}, {duration:300,complete:function(){
				$(this).css({display:"none"});
				$('.survey-inner .survey-question').css({display:"block",opacity:'1'});
				$('.survey-step .stepImg .stepImg-step').css({width:_this.stepW+'%'});
				$('.survey-inner .survey-question .svBack').css({display:'none'});
				
				accessFocus();
			}});
			
			b.preventDefault();
		});

		$('.survey-inner .survey-question').find('.radioQues input[type=radio]').each(function(){
			$(this).click(function(){
				$(this).parents('.groupAnswer').find('.lb').removeClass('selecthighlight');
				$(this).parent('.lb').addClass('selecthighlight');
			});
		$(this).change(function(){
				$(this).parents('.groupAnswer').find('.addTxt').attr('disabled','false');
				$(this).parent('.lb').find('input.addTxt').removeAttr('disabled');
			});
		});
		$('.survey-inner .survey-question').find('.checkQues input[type=checkbox],.infoQues input[type=checkbox]').each(function(){
			$(this).click(function(){
				if($(this).is(":checked")){
					$(this).parent('.lb').addClass('selecthighlight');
				}else{
					$(this).parent('.lb').removeClass('selecthighlight');
				}
			});
			$(this).change(function(){
				if($(this).is(":checked")){
					$(this).parent('.lb').find('input.addTxt').removeAttr('disabled');
				}else{
					$(this).parent('.lb').find('input.addTxt').attr('disabled','false');
				}
			});
		});
		$('.survey-inner .survey-question').find('.surveyQues input[type=radio]').each(function(){
			$(this).click(function(){
				$(this).parents('.groupAnswer').find('thead th.lb,tbody td').removeClass('selecthighlight');
				$(this).parents('.groupAnswer').find('thead th:eq('+$(this).parent('td').index()+')').addClass('selecthighlight')
				$(this).parent('td').addClass('selecthighlight');
			});
		});
		$('.survey-inner .survey-question').find('.areaQues textarea').each(function(){
			var $this = $(this);
			$(this).bind("keyup", function () {
				_this.limittext($this);
			});
		/*	var $this = $(this);
			if ($.browser.mozilla || $.browser.opera) {
				$this.bind("textchange", function(event, previousText) {
					this.limittext($this);
				});
			} else {
				$this.bind("keyup", function(event) {
					this.limittext($this);
				});
			}
		 */
		});
		this.groupNext();
		this.groupPrev();
	},
	limittext:function(input){
		_this = this;
		var len = _this.byteChk(input.val());
		if (len >= 4000) {
			input.parents('.groupAnswer').find('.byteChk .nByte').text('4000');
			input.val(_this.limitString(input.val(), (4000)));
		}else{
			input.parents('.groupAnswer').find('.byteChk .nByte').text(len);
		}
	},
	limitString: function(str, limit) {
		var tempStr = new String(str);
		var len = 0;
		for ( var i = 0; i < str.length; i++) {
			var c = escape(str.charAt(i));
			if (c.length == 1){
				len++;
			}else if (c.indexOf("%u") != -1){
				len += 2;
			}else if (c.indexOf("%0A") != -1){
				len += 2;
			}else if (c.indexOf("%") != -1){
				len += c.length / 3;
			}
			if (len > limit) {
				tempStr = tempStr.substring(0, i);
				break;
			}
		}
		return tempStr;
	},
	byteChk: function(str){
		var len = 0;
		for ( var i = 0; i < str.length; i++) {
			var c = escape(str.charAt(i));
			if (c.length == 1){
				len++;
			}else if (c.indexOf("%u") != -1){
				len += 2;
			}else if (c.indexOf("%0A") != -1){
				len += 2;
			}else if (c.indexOf("%") != -1){
				len += c.length / 3;
			}	
		}
		return len;

	},
	groupNext: function(){
		_this = this;
		$('.survey-inner .survey-question .svNext').click(function(b){
			if(_this.groupValid()){
				if($('.group:last').attr('class').match('active')){
					/* SMG-6280 20140829 modify-01 */
					if (_this.options.num  != true){	
						return;
					}
					_this.options.num  = false;
					_this.groupSubmit();			
					
					/* //SMG-6280 20140829 modify-01 */
				}else{
					$('.survey-question .survey-browser .group.active').stop().animate({
						opacity: '0'
					}, {duration:300,complete:function(){
						$(this).css({display:"none"});
						$(this).next('.group').addClass('active').css({display:"block",opacity:'1'});
						$(this).removeClass('active');
						_this.stepWI = _this.stepWI+1;
						var tWidth;
						(_this.stepWI == $('.survey-question .survey-browser .group').length)?tWidth = 100:tWidth = _this.stepWI*_this.stepW;
						$('.survey-step .stepImg .stepImg-step').stop().animate({
						//$('.survey-step .stepImg .stepImg-step').css({width:(_this.stepWI*_this.stepW)+'%'});
							width:tWidth+'%'
						},{duration:100,complete:function(){
							$('.survey-step .stepTxt span.step').text(_this.stepWI);
						}});
						if($('.group:last').attr('class').match('active')){
							$('.survey-inner .survey-question .svNext').text($('.msgFinish').val());
							//$('.survey-inner .survey-question .svNext').css({display:'none'});
						
						}else{
							$('.survey-inner .survey-question .svNext').text($('.msgNext').val());
							$('.survey-inner .survey-question .svNext').css({display:'inline-block'});
						}
						if($('.group:first').attr('class').match('active')){
							$('.survey-inner .survey-question .svBack').css({display:'none'});
						}else {
							$('.survey-inner .survey-question .svBack').css({display:'inline-block'});
						}
						
						accessFocus();
					}});
				}
			
			}	
			
			b.preventDefault();
		});
	},
	groupPrev: function(){
		_this = this;
		$('.survey-inner .survey-question .svBack').click(function(b){
			$('.survey-question .survey-browser .group.active').stop().animate({
				 opacity: '0'
			}, {duration:300,complete:function(){
				$(this).css({display:"none"});
				$(this).prev('.group').addClass('active').css({display:"block",opacity:'1'});
				$(this).removeClass('active');
				_this.stepWI = _this.stepWI-1;
				var tWidth;
				(_this.stepWI == 1)?tWidth = _this.stepW:tWidth = _this.stepWI*_this.stepW;
				$('.survey-step .stepImg .stepImg-step').stop().animate({
					//$('.survey-step .stepImg .stepImg-step').css({width:(_this.stepWI*_this.stepW)+'%'});
						width:tWidth+'%'
				},{duration:100,complete:function(){
					$('.survey-step .stepTxt span.step').text(_this.stepWI);
				}});
				if($('.group:last').attr('class').match('active')){
					$('.survey-inner .survey-question .svNext').text($('.msgFinish').val());
					$('.survey-inner .survey-question .svNext').css({display:'none'});
				}else{
					$('.survey-inner .survey-question .svNext').text($('.msgNext').val());
					$('.survey-inner .survey-question .svNext').css({display:'inline-block'});
				}
				if($('.group:first').attr('class').match('active')){
					$('.survey-inner .survey-question .svBack').css({display:'none'});
				}else {
					$('.survey-inner .survey-question .svBack').css({display:'inline-block'});
				}
				
				accessFocus();
			}});
			
			b.preventDefault();
		});
	},
	groupSubmit: function(){
		_this = this;
		if(!_this.groupsubmitValid()){
			return false;
		}
		if($('input#adminFlag').length > 0 && $('input#adminFlag').val() == 'Y'){
			$('.survey-inner .survey-question').stop().animate({
				opacity: '0'
			}, {duration:300,complete:function(){
				$(this).css({display:"none"});
				$('.survey-inner .survey-end').css({display:"block",opacity:'1'});
				$('div.survey-end .survey-browser .info').css({'paddingTop':($('div.survey-end .survey-browser').height()-$('div.survey-end .survey-browser .info').height())/2+'px'});
				$('.survey-inner .survey-end .svClose').bind("click", $.proxy(_this.closeSurveyBrowser, _this));
			}});
		}else{
			$.ajax({
				type: $('.survey-question .survey-browser').find('form').attr('method'),
				url: $('.survey-question .survey-browser').find('form').attr('action'),
				data: $('.survey-question .survey-browser').find('form').serialize(),
				success: $.proxy(function (c) {
					/* SMG-6184 : 20140624 */
					if (c.indexOf("contains invalid character.") != -1) {
						alert("Value of the field [subject] contains invalid character. Remove special character");
						return
					}
					/* //SMG-6184 : 20140624 */
					$('.survey-inner .survey-question').stop().animate({
						opacity: '0'
					}, {duration:300,complete:function(){
						$(this).css({display:"none"});
						$('.survey-inner .survey-end').css({display:"block",opacity:'1'});
						$('div.survey-end .survey-browser .info').css({'paddingTop':($('div.survey-end .survey-browser').height()-$('div.survey-end .survey-browser .info').height())/2+'px'});
						$('.survey-inner .survey-end .svClose').bind("click", $.proxy(_this.closeSurveyBrowser, _this));
						
						accessFocus();
					}});
				}, this),
				error:$.proxy(function (c) {
					alert(c);
					/* SMG-6280 20140829 modify-02 */
					_this.options.num  = true;
					/* //SMG-6280 20140829 modify-02 */
				}, this)
			});
		}
	},
	groupValid:function(){
		var _valid = true;
		var _errorMsg ="";
		//$('.groupSurvey .requiredError').remove();
		$('.groupSurvey .requiredError').css({'display':'none'});
		
		$('.survey-browser .group.active .groupSurvey').removeClass("active");
		
		$('.survey-browser .group.active').find('.groupAnswer[required=required]').each(function(){
			if($(this).parents('.groupSurvey').attr('class').match('radioQues') && $(this).find('input[type=radio]:checked').length == 0){
				//$(this).parents('.groupSurvey').prepend('<div class="highlight requiredError">'+$(this).parents('.groupSurvey').find('.questDetailNm').text()+""+lg.msgs.survey.require+"</div>");
				$(this).parents('.groupSurvey').addClass("active");
				$(this).parents('.groupSurvey').find('.requiredError').css({'display':'block'});
				_errorMsg = _errorMsg + $(this).parents('.groupSurvey').find('.requiredError').text()+"\n";
				
				$('.survey-browser .group.active').find(".groupSurvey.active").eq(0).find('.groupAnswer input:first:not([type=radio]:checked)').focus();
				
				_valid =  false;
			}else if($(this).parents('.groupSurvey').attr('class').match('surveyQues') && $(this).find('input[type=radio]:checked').length == 0){
				//$(this).parents('.groupSurvey').prepend('<div class="highlight requiredError">'+$(this).parents('.groupSurvey').find('.questDetailNm').text()+""+lg.msgs.survey.require+"</div>");
				
				$(this).parents('.groupSurvey').addClass("active");
				$(this).parents('.groupSurvey').find('.requiredError').css({'display':'block'});
				_errorMsg = _errorMsg + $(this).parents('.groupSurvey').find('.requiredError').text()+"\n";
				
				$('.survey-browser .group.active').find(".groupSurvey.active").eq(0).find('.groupAnswer input:first:not([type=radio]:checked)').focus();
				
				_valid =  false;
			}else if($(this).parents('.groupSurvey').attr('class').match('checkQues') && $(this).find('input[type=checkbox]:checked').length == 0){
				//$(this).parents('.groupSurvey').prepend('<div class="highlight requiredError">'+$(this).parents('.groupSurvey').find('.questDetailNm').text()+""+lg.msgs.survey.require+"</div>");
				$(this).parents('.groupSurvey').addClass("active");
				$(this).parents('.groupSurvey').find('.requiredError').css({'display':'block'});
				_errorMsg = _errorMsg + $(this).parents('.groupSurvey').find('.requiredError').text()+"\n";
				
				$('.survey-browser .group.active').find(".groupSurvey.active").eq(0).find('.groupAnswer input:first:not([type=radio]:checked)').focus();
				
				_valid =  false;
			}else if($(this).parents('.groupSurvey').attr('class').match('areaQues') && $(this).find('textarea').val().trim() == ""){
				//$(this).parents('.groupSurvey').prepend('<div class="highlight requiredError">'+$(this).parents('.groupSurvey').find('.questDetailNm').text()+""+lg.msgs.survey.require+"</div>");
				$(this).parents('.groupSurvey').addClass("active");
				$(this).parents('.groupSurvey').find('.requiredError').css({'display':'block'});
				_errorMsg = _errorMsg + $(this).parents('.groupSurvey').find('.requiredError').text()+"\n";
				
				$('.survey-browser .group.active').find(".groupSurvey.active").eq(0).find('.groupAnswer input:first:not([type=radio]:checked)').focus();
				_valid =  false;
			}

			/*
			$(this).find('input[type=radio]:checked,input[type=checkbox]:checked').parent('.lb').find('.addTxt').each(function(){
				if($(this).val().trim() == ""){
					$(this).parents('.groupSurvey').prepend('<div class="highlight requiredError">'+$(this).parents('.groupSurvey').find('.questDetailNm').text()+""+lg.msgs.survey.addText+"</div>");
					_valid =  false;
				}
			});
			*/
		});
		(_valid == false)?alert(_errorMsg.substring(0,_errorMsg.lastIndexOf('\n'))):null;
		return _valid;
		
	},
	groupsubmitValid:function(){
		return true;
	},
	closeSurveyBrowser: function (a) {
		$(".survey-modal").fadeOut(500, function () {
			$("body").css({
				height: "auto",
				"overflow-y": "auto"
			});
			$(".survey-inner").html("");
		});
		
		this.svOpen.focus();
		
		this.innerItem.find("ul li a").off("click");
		return false;
	}
});
lg.plugin("surveyBrowser", lg.surveyBrowser, ".survey-browse-open");
/* //PJTSVY-1 : 20140421 */

/* layer access */
function accessFocus(){
	var firstElement = $(".survey-inner > div:visible").find("a, input[type='radio']:not(:disabled), input[type='text']:not(:disabled), select, button, textarea, *[tabindex='0']").filter(':first'),
		lastElement = $(".survey-browser-wrap").find("a, input[type='radio']:not(:disabled), input[type='text']:not(:disabled), select, button, textarea, *[tabindex='0']").filter(':last'),
		closeElement = $(".survey-browser-wrap").find(".close-sv");

	firstElement.focus(); /* button action */
	
	firstElement.on('keydown', $.proxy(function (b) {
		if(b.keyCode == 9 && b.shiftKey) {
			if($(b.target).get(0).tagName == "INPUT" || $(b.target).get(0).tagName == "TEXTAREA"){
			} else {	
				b.preventDefault();
				lastElement.focus();
			}
		}
	}, this));
	
	lastElement.off('keydown').on('keydown', $.proxy(function (b) {
		if(b.keyCode == 9 && b.shiftKey) {
		} else if (b.keyCode == 9) {
			b.preventDefault();
			firstElement.filter(':first').focus();
		}
	}, this));
}