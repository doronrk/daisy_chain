function detectmob() {
    if( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
        || (window.innerWidth <= 800 && window.innerHeight <= 600)
        ){
        return true;
    }
    else {
        return false;
    }
}


document.observe('dom:loaded', function(){
if (detectmob()) {
    // click activated nav
    $$('#categoryNav ul.level0 li.level1 a').invoke('observe', 'click', function(e){
        var listEl = this.parentNode;
        var hasClick = listEl.dataset.nav;
        listEl.dataset.nav = 'on';
        var mainNavSibs = $(listEl).siblings();
        for (var i = 0; i < mainNavSibs.length; i++) {
            mainNavSibs[i].dataset.nav = 'off';
        }
        if (hasClick == 'on'){
            return;
        } else {
            var megaSpan  = this.firstChild;
            var megaBlock  = megaSpan.innerHTML.toLowerCase().replace(/\s+/g, '');
            if (megaBlock) {
                $(megaSpan).addClassName('activeMenuLink');
                var activeNav = 'mega-' + megaBlock;
                $(activeNav).addClassName('activeMenu');
                $('header_dropdown_zone').show();
                var activeNavSibs = $(activeNav).siblings();
                activeNavSibs.invoke('removeClassName', 'activeMenu');
                Event.stop(e);
            }
        }
    });

    $$('#myaccount-menu a.myaccount-open-sub').invoke('observe', 'click', function(e){
        Event.stop(e);
        $('myaccount-menu').addClassName('mobile-click-myaccount');
    });

} else {
    var activeDiv, megaAnchorEl, mouseLocation, showDiv, hideDiv, timedelay;
    var hoverOnDelay = 300;
    var hoverOffDelay = 500;
    mouseLocation = 'off';

    var showDiv = function(activeDiv,megaAnchorEl){
        $(megaAnchorEl).addClassName('activeMenuLink');
        if($(activeDiv)){
            $(activeDiv).addClassName('activeMenu');
            $('header_dropdown_zone').show();
            var activeSibs = $(activeDiv).siblings();
            activeSibs.invoke('removeClassName', 'activeMenu');
            $$('#header_dropdown_zone').invoke('observe','mouseenter', function(){
                mouseLocation = 'on';
            });

            $$('#header_dropdown_zone').invoke('observe','mouseleave', function(){
                mouseLocation = 'off';
                setTimeout(function(){ hideDiv();}, hoverOffDelay);
            });
        }
    };

    var hideDiv = function(){
        if(mouseLocation == 'off'){
            $('header_dropdown_zone').hide();
            $$('#header_dropdown_zone .fixed_center div').invoke('removeClassName','activeMenu');
            $$('#categoryNav ul.level0 li.level1 a').invoke('removeClassName','activeMenuLink');
        }
    };

    $$('#categoryNav ul.level0 li.level1').invoke('observe', 'mouseenter', function(){
        $$('#categoryNav ul.level0 li.level1 a').invoke('removeClassName','activeMenuLink');
        mouseLocation = 'on';
        var megaListEl = this,
            megaAnchorEl = megaListEl.firstChild,
            megaAnchorUrl = megaAnchorEl.getAttribute("href").split("/"),
            megaLinkText = megaAnchorEl.firstChild.innerHTML.toLowerCase().replace(/\s+/g, '');

        if(typeof megaAnchorUrl !== "undefined" && megaAnchorUrl[megaAnchorUrl.length - 1] === "brands.html"){
            mouseLocation = 'off';
            hideDiv();
        }else if (megaLinkText) {
            var activeDiv = 'mega-' + megaLinkText;

            timedelay = setTimeout(function(){ showDiv(activeDiv,megaAnchorEl)}, hoverOnDelay);
        }
    });

    $$('#categoryNav ul.level0 li.level1 ').invoke('observe', 'mouseleave', function(){
        mouseLocation = 'off';
        clearTimeout(timedelay);
        setTimeout(function(){hideDiv();}, hoverOffDelay);
    });

    $$('#header_bottom_zone').invoke('observe','mouseenter',function(){
        mouseLocation = 'on';
    });

    $$('#header_bottom_zone').invoke('observe','mouseleave',function(){
        mouseLocation = 'off';
        clearTimeout(timedelay);
        setTimeout(function(){hideDiv();},500);
    });}

    Zumiez.cartItems.init();

});
