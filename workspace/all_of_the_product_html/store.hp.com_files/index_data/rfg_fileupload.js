function rfg_registerStyledBrowseButtons() {
    var i, frs, p, browser;
    browser = $$('body').get('class').toString().split(' ');
/**/
    frs = $$('input[type=file]'); //real file field
    for (i = 0; i < frs.length; i++) {
        rfg_registerStyledBrowseButton(frs[i], browser);
    }
/**/
}

function rfg_registerStyledBrowseButton(fr, browser) {
    var p, img; 

    fr.addClass('realFile').set('size', 1);
    p = new Element('div', { 'class': 'fakeFileWrap' }).wraps(fr);
	dir = $(p).getParent().getStyle('direction');
    img = $(p).getParent().getElement('img');
    var ff = new Element('input', { 'id': 'fakeFile', 'type': 'text', 'class': 'rfgInputfield fakeFile', 'name': 'fakeFilePc' }).inject(p, 'top'); //fake file field
    var fb = new Element('input', { 'id': 'fakeFileButton', 'type': 'button', 'class': 'fakeFileButton', 'name': 'fakeFileButton', 'alt': img.getProperty('alt')  }).inject(fr, 'before');
    if ($(fr).get('title')) {
        $(fb).set('title', $(fr).get('title'));
    }

	var dir = $(p).getParent().getStyle('direction');

    var imgwidth = parseInt($(img).get('width') || $(img).getStyle('width')); // second option seems to be needed for IE7
    var ffwidth = (parseInt($(ff).getStyle('width')) - imgwidth);
    
    $(fb).setStyle('background', "url('" + $(img).src + "')");
    $(fb).setStyle('width', imgwidth + 'px');
    $(ff).setStyle('width', ffwidth + 'px');
    
    var addHandlerFnc = function(){
        $(fr).addEvent('change', function() { ff.value = fr.value.replace('C:\\fakepath\\',''); }); 
        $(fr).addEvent('click', function() { fr.value = ''; ff.value = ''; });
    	$(ff).addEvent('focus', function(){ ff.blur(); });
    	$(fb).addEvent('focus', function(){ fb.blur(); });
    };

	var resetfr = $(fr).clone(true, true);
	var resetFakeFileFnc = function(){
		fr = $(resetfr).replaces(fr);
		resetfr = $(fr).clone(true, true);
		ff.value = '';
        //for LTR rendering aligning to the right edge of the fake control to cover only the button and possibly avoid reaching out to overlay other controls
    	if(browser[0] === 'rfgBrowser_IE'){
            $(fr).setStyle('font-size','8px');
            if(dir === 'ltr'){ 
                var fb_rpos = parseInt($(fb).getPosition().x) + parseInt($(fb).offsetWidth);
                var fr_width = parseInt($(fr).offsetWidth);
                $(fr).setStyle('left', (fb_rpos - fr_width) + 'px');
            }
			if(browser[1] === 'rfgBrowserMajVersion_7'){
				if(dir === 'ltr'){ 
                }else{ offset = 20; }
			}else{
				if(dir === 'ltr'){ 
                }else{ offset = -12; }
    		}
            $(fr).setStyle('width', (parseInt($(ff).offsetWidth) + parseInt($(fb).offsetWidth)) + 'px');
    	}else if(browser[0] === 'rfgBrowser_Firefox'){
            $(fr).setStyle('font-size','8px');
    		if(dir == 'ltr'){ 
                var fb_rpos = parseInt($(fb).getPosition().x) + parseInt($(fb).offsetWidth);
                var fr_width = parseInt($(fr).offsetWidth);
                $(fr).setStyle('left', (fb_rpos - fr_width) + 'px');
            }
            else{ 
                offset = 20; 
                $(fr).setStyle('font-size','10px').setStyle('width',parseInt($(p).getStyle('width')) + 'px').setStyle('left', (parseInt($(p).getPosition().x) +offset) + 'px');
            }
        }else if(browser[0] === 'rfgBrowser_Opera'){
            $(fr).setStyle('font-size','8px');
    		if(dir === 'ltr'){ 
                var fb_rpos = parseInt($(fb).getPosition().x) + parseInt($(fb).offsetWidth);
                var fr_width = parseInt($(fr).offsetWidth);
                $(fr).setStyle('left', (fb_rpos - fr_width) + 'px');
            }else{ offset = 20; }
            $(fr).setStyle('width', (parseInt($(ff).offsetWidth) + parseInt($(fb).offsetWidth)) + 'px');
    	}else if(browser[0] === 'rfgBrowser_Chrome' || browser[0] === 'rfgBrowser_AppleMAC-Safari'){
            $(fr).setStyle('font-size','3px');
    		if(dir === 'ltr'){ 
                var fb_rpos = parseInt($(fb).getPosition().x) + parseInt($(fb).offsetWidth);
                var fr_width = parseInt($(fr).offsetWidth);
                $(fr).setStyle('left', (fb_rpos - fr_width) + 'px');
            }else{ offset = 20; }
            $(fr).setStyle('height','16px').setStyle('width', (parseInt($(ff).offsetWidth) + parseInt($(fb).offsetWidth)) + 'px');
        }
		addHandlerFnc();
	}
	resetFakeFileFnc();
	$(ff).set('readonly','readonly');

    $('aspnetForm').addEvent('submit', function(){ 
        if(ff.value == ''){
            if(fr.value != ''){
                resetFakeFileFnc();
            }
        }else{
            var tmp1 = fr.value.split("\\");
            tmp1 = tmp1[tmp1.length-1].split('/');
            tmp1 = tmp1[tmp1.length-1].trim();
            var tmp2 = ff.value.trim();
            if (tmp1 != tmp2) {
                /* QC5876: No need to reposition the control when form is submitting.
                resetFakeFileFnc();
                */
            }
        }
    });

    
/*

    var addChangeHandlerFnc = function(){
        $(fr).addEvent('change', function() { ff.value = fr.value.replace('C:\\fakepath\\',''); }); 
    };
	if(browser[0] === 'rfgBrowser_IE'){
		switch(browser[1]){
			case 'rfgBrowserMajVersion_7':
				if(dir === 'ltr'){
					offset = -5;
				}else{
					offset = 20;
				}
				break;
			default:
				if(dir === 'ltr'){
					offset = 0;
				}else{
					offset = -12;
				}
				break;
		}
		$(fr).setStyle('font-size','21px').setStyle('width',parseInt($(p).getStyle('width')) + 'px').setStyle('left', (parseInt($(p).getPosition().x) +offset) + 'px');
		$(ff).set('readonly','readonly');
		$(ff).addEvent('focus', function(){ ff.blur(); });
		$(fb).addEvent('focus', function(){ fb.blur(); });
		$(fr).addEvent('click', function(){ ff.value = ''; });
		addChangeHandlerFnc();
	}else{
        var resetfr = $(fr).clone(true, true);
        var resetFakeFileFnc = function(){
            fr = $(resetfr).replaces(fr);
            resetfr = $(fr).clone(true, true);
            ff.value = '';
            addChangeHandlerFnc();
        }
        $(fb).addEvent('click', function(){ resetFakeFileFnc(); fr.click(); });
        $(ff).addEvent('click', function(){ fb.click(); });
        $(ff).addEvent('focus', function(){ fb.focus(); });
    }
*/
    
}

//###########################################################

//create stylable file upload boxes
//window.addEvent('domready', rfg_registerStyledBrowseButtons);