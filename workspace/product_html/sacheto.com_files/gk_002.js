window.addEvent('load', function() {
    // Classic menu
    if(document.id('gkExtraMenu') && document.id('gkMainMenu').hasClass('gkMenuClassic')) {
        // fix for the iOS devices     
        document.getElements('#gkExtraMenu ul li span').each(function(el) {
            el.setProperty('onmouseover', '');
        });

        document.getElements('#gkExtraMenu ul li a').each(function(el) {
            el.setProperty('onmouseover', '');

            if(el.getParent().hasClass('haschild') && document.getElement('body').getProperty('data-tablet') != null) {
                el.addEvent('click', function(e) {
                    if(el.retrieve("dblclick", 0) === 0) {
                        e.stop();
                        el.store("dblclick", new Date().getTime());
                    } else {
                    	if(el.getParent().getElements('div.childcontent')[0].getStyle('overflow') == 'visible') {
                    		window.location = el.getProperty('href');
                    	}
                        var now = new Date().getTime();
                        if(now - el.retrieve("dblclick", 0) < 500) {
                            window.location = el.getProperty('href');
                        } else {
                            e.stop();
                            el.store("dblclick", new Date().getTime());
                        }
                    }
                });
            }
        });

        var base = document.id('gkExtraMenu');
        
        base.getElements('.childcontent-inner').each(function(submenu, i) {
        	var cols = submenu.getChildren('.gkcol');
        	
        	if(cols.length > 1) {
        		var max = cols[0].getSize().y;
        		
        		for(var i = 0; i < cols.length; i++) {
        			max = cols[i].getSize().y > max ? cols[i].getSize().y : max;
        		}
        		
        		cols.setStyle('height', max + "px");
        	}
        });

        if($GKMenu && ($GKMenu.height || $GKMenu.width)) {     
            var gk_selector = 'li.haschild';
            base.getElements(gk_selector).each(function(el){     
                if(el.getElement('.childcontent')) {
                    var content = el.getElement('.childcontent');
                    var prevh = content.getSize().y;
                    var prevw = content.getSize().x;
                    // hide the menu till opened
                    if(content.getParent().getParent().hasClass('level0')) {
                    	content.setStyle('margin-left', "-999px");
                    }

                    var fxStart = { 'height' : $GKMenu.height ? 0 : prevh, 'width' : $GKMenu.width ? 0 : prevw, 'opacity' : 0 };
                    var fxEnd = { 'height' : prevh, 'width' : prevw, 'opacity' : 1 };

                    var fx = new Fx.Morph(content, {
                        duration: $GKMenu.duration,
                        link: 'cancel',
                        onComplete: function() {
                            if(content.getSize().y == 0){
                                content.setStyle('overflow', 'hidden');
                            } else if(content.getSize().y - prevh < 30 && content.getSize().y - prevh >= 0) {
                                content.setStyle('overflow', 'visible');
                            }
                        }
                    });

                    fx.set(fxStart);
                    content.setStyles({'left' : 'auto', 'overflow' : 'hidden' });

                    el.addEvents({
                        'mouseenter': function(){
                            var content = el.getElement('.childcontent');
							var basicMargin = (el.getParent().hasClass('level0')) ? -1 * ((prevw / 2) - (el.getSize().x / 2)) : 0;
							
							// helper variables
                            var pos = content.getCoordinates();
                            var winWidth = window.getCoordinates().width;
                            var winScroll = window.getScroll().x;
							
							// calculations
							var posStart = pos.left;
							var posEnd = pos.left + prevw;
							
							if(el.getParent().hasClass('level0')) {
								content.setStyle('margin-left', basicMargin + "px");
								pos = content.getCoordinates();
								posStart = pos.left;
								posEnd = pos.left + prevw;
								
								if(posStart < 0) {
									content.setStyle('margin-left', content.getStyle('margin-left').toInt() + (-1 * posStart) + 10);
								}
								
								if(posEnd > winWidth + winScroll) {
									var diff = (winWidth + winScroll) - posEnd;
									content.setStyle('margin-left', content.getStyle('margin-left').toInt() + diff - 24);
								}
							} else {
								var diff = (winWidth + winScroll) - posEnd;
								
								if(posEnd > winWidth + winScroll) {
									content.setStyle('margin-left', "-160px");
								}
							}
						
                            fx.start(fxEnd);
                        },

                        'mouseleave': function(){
                            content.setStyle('overflow', 'hidden');
                            fx.start(fxStart);
                        }
                    });
                }
            });
        }
    } else if(document.id('gkExtraMenu') && document.id('gkMainMenu').hasClass('gkMenuOverlay')) {
        var overlay = new Element('div', {
                'id': 'gkMenuOverlay',
                'html': ''
        });
        
        overlay.inject(document.body, 'bottom');
        overlay.fade('out');
        overlay.set('tween', { duration: 250 });
        
        var overlaywrapper = new Element('div', {
                'id': 'gkMenuOverlayWrap',
                'html': '<div><i id="gkMenuOverlayClose">x</i><h3 id="gkMenuOverlayHeader"></h3><div id="gkMenuOverlayContent"></div></div>'
        });
        
        overlaywrapper.inject(document.body, 'bottom');
        overlay.fade('out');
        overlaywrapper.set('tween', { duration: 250 });
        overlaywrapper.fade('out');
        
        
        
        
        var overlaywrap = overlaywrapper.getElement('div');
             overlaywrap.set('tween', { duration: 250 });
             overlaywrap.fade('out');
        var header = document.id('gkMenuOverlayHeader');
        var content = document.id('gkMenuOverlayContent');
        header.set('tween', { duration: 250 });
        header.setStyle('margin-top', -100);
        var submenus = [];
        
        document.id('gkMenuOverlayClose').addEvent('click', function() {
                overlay.fade('out');
                overlaywrapper.fade('out');
                overlaywrap.fade('out');
                header.tween('margin-top', -100);
                setTimeout(function() {
                        overlay.removeClass('open');
                        overlaywrapper.removeClass('open');
                        header.innerHTML = '';
                        content.innerHTML = '';
                }, 500);
        });
        
        overlay.addEvent('click', function(e) {
                e.stopPropagation();
                if(e.target == overlay) {
                        document.id('gkMenuOverlayClose').fireEvent('click');        
                }
        });
        
        document.id('gkExtraMenu').getElements('.haschild').each(function(el) {
                if(el.getParent().hasClass('level0')) {
                        var link = el.getElement('a');
                        submenus[link.getProperty('id')] = {
                                "link": link,
                                "submenu": el.getElement('.childcontent')
                        };
                        
                        link.addEvent('click', function(e) {
                                e.stop();
                                overlay.setStyle('height', document.body.getSize().y);
                                var menuID = e.target.getProperty('id');
                                header.innerHTML = '';
                                submenus[menuID].link.clone().inject(header);
                                content.innerHTML = '';
                                submenus[menuID].submenu.clone().inject(content);
                                overlay.addClass('open');
                                overlaywrapper.addClass('open');
                                overlay.fade('in');
                                overlaywrapper.fade('in');
                                
                                setTimeout(function() {
                                        overlaywrap.fade('in');
                                        header.tween('margin-top', 0);
                                }, 500);
                        });
                }
        });
    }
}); 
