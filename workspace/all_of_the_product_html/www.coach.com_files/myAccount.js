/**
 * @author chris.deemer
 */
var mp;
var mwl;
var mo;
var mab;
var mcc;
var mep;

$().ready(function(){
	mp = new profile($('#profileSection'));
	mwl = new wishlist($('#wishlistSection'));
	mo = new orders($('#ordersSection'));
	mab = new addressBook($('#addressBookSection'));
	mcc = new creditCard($('#creditCardSection'));
	mep = new emailPreferences($('#emailPrefsSection'));
});

function profile($container){
	this.superclass = myAccountSection;
	this.superclass($container);
	var prof = this;
	
	//default view if "my account" is clicked is expanded for profile
	//this.show('summary');
	
	this.bindToggle = function(){
		var newPanel;
		if (this.$container.hasClass('active')) {
			newPanel = 'minimized';
		}
		else {
			newPanel = 'summary';
		}
		this.show(newPanel);
	}
	
	this.validateForm = function(){
		//validation logic
		
		return true;
	}
	
	this.$container.find('.myAccount_edit').bind('click',function(){
		prof.bindToggle();
	});
	
	this.$container.find('.goToForm').bind('click', function(){
		prof.show('form');
	});
	this.$container.find('.saveForm').bind('click', function(){
		if (prof.validateForm()) {
			prof.show('summary');
		}
	});
}

function wishlist($container){
	this.superclass = myAccountSection;
	this.superclass($container);
	var wish = this;
	
	/*
	this.show('form');
	Expanded with items. 
	This is the default view if you come to My Account from the wishlist tongue
	or from the Wishlist confirmation message on the product detail page
	(and you have 1 or more items in your wishlist)
	*/
	
	this.bindToggle = function(){
		var newPanel;
		if (this.$container.hasClass('active')) {
			newPanel = 'minimized';
		}
		else {
			newPanel = 'summary';
		}
		this.show(newPanel);
	}
	
	this.$container.find('.myAccount_edit').bind('click',function(){
		wish.bindToggle();
	});
}

function orders($container){
	this.superclass = myAccountSection;
	this.superclass($container);
	var ord = this;
	
	
	this.bindToggle = function(){
		var newPanel;
		if (this.$container.hasClass('active')) {
			newPanel = 'minimized';
		}
		else {
			newPanel = 'summary';
		}
		this.show(newPanel);
	}
	
	this.$container.find('.myAccount_edit').bind('click',function(){
		ord.bindToggle();
	});
}

function addressBook($container){
	this.superclass = myAccountSection;
	this.superclass($container);
	var addrBook = this;
	
	
	this.bindToggle = function(){
		var newPanel;
		if (this.$container.hasClass('active')) {
			newPanel = 'minimized';
		}
		else {
			newPanel = 'summary';
		}
		this.show(newPanel);
	}
	
	this.validateForm = function(){
		//validation logic
		
		return true;
	}
	
	this.$container.find('.myAccount_edit').bind('click',function(){
		addrBook.bindToggle();
	});
	
	this.$container.find('.goToForm').bind('click', function(){
		addrBook.show('form');
	});
	
	this.$container.find('.saveForm').bind('click', function(){
		if (addrBook.validateForm()) {
			addrBook.show('summary');
		}
	});
}

function creditCard($container){
	this.superclass = myAccountSection;
	this.superclass($container);
	var credCard= this;
	
	
	this.bindToggle = function(){
		var newPanel;
		if (this.$container.hasClass('active')) {
			newPanel = 'minimized';
		}
		else {
			newPanel = 'summary';
		}
		this.show(newPanel);
	}
	
	this.validateForm = function(){
		
		
		return true;
	}
	
	this.$container.find('.myAccount_edit').bind('click',function(){
		credCard.bindToggle();
	});
	this.$container.find('.goToForm').bind('click', function(){
		credCard.show('form');
	});
	this.$container.find('.saveForm').bind('click', function(){
		if (credCard.validateForm()) {
			credCard.show('summary');
		}
	});
}

function emailPreferences($container){
	this.superclass = myAccountSection;
	this.superclass($container);
	var emailPrefs = this;
	
	
	this.bindToggle = function(){
		var newPanel;
		if (this.$container.hasClass('active')) {
			newPanel = 'minimized';
		}
		else {
			newPanel = 'summary';
		}
		this.show(newPanel);
	}
	
	this.validateForm = function(){
		
		
		return true;
	}
	
	this.$container.find('.myAccount_edit').bind('click',function(){
		emailPrefs.bindToggle();
	});
	this.$container.find('.saveForm').bind('click', function(){
		if (emailPrefs.validateForm()) {
			emailPrefs.show('minimized');
		}
	});
}



function myAccountSection(container){
	this.$container = container;
	this.$contentWrapper = this.$container.find('.section_content_wrapper');
	this.$content = this.$container.find('.section_content');
	this.$minimized = this.$container.find('.myAccount_minimized');
	this.$form = this.$container.find('.myAccount_change');
	this.$summary = this.$container.find('.myAccount_summary');
	this.currentPanel = 'minimized';
	
	this.init = function(){
		//hide all the panels except minimized
		this.$form.hide();
		this.$summary.hide();
	}
	
	this.getPanel = function(panelName){
		switch(panelName){
			case 'minimized':
				return this.$minimized;
				break;
			case 'form':
				return this.$form;
				break;
			case 'summary':
				return this.$summary;
				break;
			default:
				return null;	
		}
	}
	
	
	this.show = function(panelToShow){
		var $goto = this.getPanel(panelToShow);
		var $old = this.getPanel(this.currentPanel);
		this.switchPanel($old, $goto);
		if(panelToShow == 'summary'){
			//switch header button to MINUS
			this.$container.addClass('active');
			this.$container.find('.myAccount_edit img').attr('alt', 'Minimize').attr('src', '../images/my_Account/minus_sign.png');
		}
		if(panelToShow == 'minimized'){
			//switch header button to PLUS
			this.$container.removeClass('active');
			this.$container.find('.myAccount_edit img').attr('alt', 'Open').attr('src', '../images/my_Account/plus_sign.png');
		}
		if(panelToShow == 'form'){
			//switch header button to CLOSE
			this.$container.addClass('active');
			this.$container.find('.myAccount_edit img').attr('alt', 'Close').attr('src', '../images/my_Account/minus_sign.png');
		}
		
		this.currentPanel = panelToShow;
	}
	
	this.switchPanel = function ($old, $new){
		var $contentWrapper = this.$contentWrapper;
		var $content = this.$content;
		
		//set to static height for animation sake
		$contentWrapper.css('height', $contentWrapper.height());
		
		//switch panels
		$content.fadeOut(500,function(){
			$old.hide();
			$new.show();
			$contentWrapper.animate({height: $content.height() },500, function(){
				$contentWrapper.css('height', 'auto');
				$content.fadeIn(500);
			});
		});
	}
	
	
	this.init();
}
