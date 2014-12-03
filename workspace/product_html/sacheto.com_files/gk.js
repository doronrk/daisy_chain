// IE checker
function gkIsIE() {
  var myNav = navigator.userAgent.toLowerCase();
  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}
//
var page_loaded = false;
//
window.addEvent('load', function() {
	setTimeout(function() {
		if(document.id('gkTopBar')) {
			document.id('gkTopBar').addClass('active');
		}
	}, 500);
	//
	page_loaded = true;
	// smooth anchor scrolling
	new SmoothScroll(); 
	// style area
	if(document.id('gkStyleArea')){
		document.id('gkStyleArea').getElements('a').each(function(element,i){
			element.addEvent('click',function(e){
	            e.stop();
				changeStyle(i+1);
			});
		});
	}
	// font-size switcher
	if(document.id('gkTools') && document.id('gkMainbody')) {
		var current_fs = 100;
		var content_fx = new Fx.Tween(document.id('gkMainbody'), { property: 'font-size', unit: '%', duration: 200 }).set(100);
		document.id('gkToolsInc').addEvent('click', function(e){ 
			e.stop(); 
			if(current_fs < 150) { 
				content_fx.start(current_fs + 10); 
				current_fs += 10; 
			} 
		});
		document.id('gkToolsReset').addEvent('click', function(e){ 
			e.stop(); 
			content_fx.start(100); 
			current_fs = 100; 
		});
		document.id('gkToolsDec').addEvent('click', function(e){ 
			e.stop(); 
			if(current_fs > 70) { 
				content_fx.start(current_fs - 10); 
				current_fs -= 10; 
			} 
		});
	}
	// K2 font-size switcher fix
	if(document.id('fontIncrease') && document.getElement('.itemIntroText')) {
		document.id('fontIncrease').addEvent('click', function() {
			document.getElement('.itemIntroText').set('class', 'itemIntroText largerFontSize');
		});
		
		document.id('fontDecrease').addEvent('click', function() {
			document.getElement('.itemIntroText').set('class', 'itemIntroText smallerFontSize');
		});
	}
	// login popup
	if(document.id('gkPopupLogin') || document.id('gkPopupCart')) {
		var popup_overlay = document.id('gkPopupOverlay');
		popup_overlay.setStyles({'display': 'block', 'opacity': '0'});
		popup_overlay.fade('out');

		var opened_popup = null;
		var popup_login = null;
		var popup_login_h = null;
		var popup_login_fx = null;
		var popup_cart = null;
		var popup_cart_h = null;
		var popup_cart_fx = null;

		if(document.id('gkPopupLogin') && document.id('gkLogin')) {
			popup_login = document.id('gkPopupLogin');
			popup_login_fx = new Fx.Morph(popup_login, {duration:500, transition: Fx.Transitions.Circ.easeInOut}).set({'opacity': 0, 'margin-top': -50 }); 
			document.id('gkLogin').addEvent('click', function(e) {
				new Event(e).stop();
				popup_login.setStyle('display', 'block');
				popup_overlay.setStyle('height', document.body.getScrollSize().y);
				popup_overlay.fade(0.45);

				setTimeout(function() {
					popup_login_fx.start({'opacity': 1, 'margin-top': 0});
					opened_popup = 'login';
					popup_login.addClass('gk3Danim');
				}, 450);

				(function() {
					if(document.id('modlgn-username')) {
						document.id('modlgn-username').focus();
					}
				}).delay(600);
			});
		}
		
		if(document.id('gkPopupCart')) {
                var btn = document.getElement('.gk-cart');
               
             	popup_cart = document.id('gkPopupCart');
                popup_cart.setStyle('display', 'block');
                popup_cart_h = popup_cart.getElement('.gkPopupWrap').getSize().y;
                popup_cart_fx = new Fx.Morph(popup_cart, {duration:500, transition: Fx.Transitions.Circ.easeInOut}).set({'opacity': 0, 'margin-top': -50 }); 
                var wait_for_results = true;
                var wait = false;
                
                btn.addEvent('click', function(e) {
                        new Event(e).stop();        
                        
                        if(!wait) {
                                new Request.HTML({
                                        url: $GK_URL + 'index.php?tmpl=cart',
                                        onRequest: function() {
                                                btn.addClass('loading');
                                                wait = true;
                                        },
                                        onComplete: function() {
                                                var timer = (function() {
                                                        if(!wait_for_results) {
                                                                popup_cart.setStyle('display', 'block');
                                                   				popup_overlay.setStyle('height', document.body.getScrollSize().y);
                                                   				popup_overlay.fade(0.45);
                                                               
                                                                popup_cart_fx.start({'opacity': 1, 'margin-top': 0});
                                                                popup_cart.addClass('gk3Danim');
                                                                opened_popup = 'cart';
                                                                wait_for_results = true;
                                                                wait = false;
                                                                clearInterval(timer);
                                                                btn.removeClass('loading');
                                                        }
                                                }).periodical(200);
                                        },
                                        onSuccess: function(nodes, xml, text) {
                                                document.id('gkAjaxCart').innerHTML = text;
                                                popup_cart.setStyle('display', 'block');
                                                popup_cart_fx = new Fx.Morph(popup_cart, {duration:200, transition: Fx.Transitions.Circ.easeInOut}).set({'opacity': 0, 'margin-top': -50 }); 
                                                wait_for_results = false;
                                                wait = false;
                                        }
                                }).send();
                        }
                });
                
                if(btn) {
                	var counter = new Element('i', { 'id': 'gkCartCounter'});
                	counter.inject(btn);
                	var gkCartDataRequest = function() {
	          	 		new Request.HTML({
	      	 		        url: $GK_URL + 'index.php?tmpl=json',
	      	 		        onSuccess: function(nodes, xml, text) {
	      	 		            document.id('gkCartCounter').set('text', '(' + text + ')');   
	      	 		        },
	      	 		        onComplete: function() {
	      	 		        	setTimeout(function() {
	      	 		        		gkCartDataRequest();
	      	 		        	}, 5000);
	      	 		        }
	          	 		}).send();    
          	 		} 
          	 		gkCartDataRequest();
                }
        }

		popup_overlay.addEvent('click', function() {
			if(opened_popup == 'login')	{
				popup_overlay.fade('out');
				popup_login.removeClass('gk3Danim');
				popup_login_fx.start({
					'opacity' : 0,
					'margin-top' : -50
				});
				setTimeout(function() {
					popup_login.setStyle('display', 'none');
				}, 450);
			}	
			
			if(opened_popup == 'cart') {
                popup_overlay.fade('out');
                popup_cart.removeClass('gk3Danim');
                popup_cart_fx.start({
                        'opacity' : 0,
                        'margin-top': -50
                });
                
                setTimeout(function() {
                	popup_cart.setStyle('display', 'none');
                }, 450);
            }  
		});
	}
});
// function to set cookie
function setCookie(c_name, value, expire) {
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expire);
	document.cookie=c_name+ "=" +escape(value) + ((expire==null) ? "" : ";expires=" + exdate.toUTCString());
}
// Function to change styles
function changeStyle(style){
	var file1 = $GK_TMPL_URL+'/css/style'+style+'.css';
	var file2 = $GK_TMPL_URL+'/css/typography/typography.style'+style+'.css';
	new Asset.css(file1);
	new Asset.css(file2);
	Cookie.write('gk_instyle_j25_style', style, { duration:365, path: '/' });
}
/* VirtueMart addons */
window.addEvent('domready', function() {
        var tabs = document.id('product-tabs');
        // if tabs exists
        if(tabs) {
                // initialization
                tabs.getElement('li').addClass('active');
                var contents = document.id('product-tabs-content');
                contents.getChildren('div').setStyle('display', 'none');
                contents.getElement('div').addClass('active');
                // add events to the tabs
                tabs.getElements('li').each(function(tab, i) {
                        tab.addEvent('click', function() {
                                var toggle = tab.getProperty('data-toggle');
                                contents.getChildren('div').removeClass('active');
                                contents.getElement('.' + toggle).addClass('active');
                                tabs.getElements('li').removeClass('active');
                                tab.addClass('active');                
                        });
                });
        }
});

window.addEvent('touchstart', function(e) {
        if(e.target.hasClass('modal') || e.target.hasClass('ask-a-question')) {
                window.location.href = e.target.getProperty('href');
        }
});