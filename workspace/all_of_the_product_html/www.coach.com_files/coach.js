/**
 * @author Cameron Wardzala
 */
function winPopup(page, page2, width, height, scrollbars){
    var scrollbars = (scrollbars == null) ? "yes" : scrollbars;
    window.open(page, page2, "menubar=no,width=" + width + ",height=" + height + ",toolbar=no,location=no,resize=no,status=yes,scrollbars=scrollbars");
}


/******************************* START :: GLOBAL DROPDOWN COMPONENTS *****************************/
$().ready(function(){
    //set global variable for nudging IE6 to correctly display footer after resizing of nav elements
    newWidth = new Number(1);
    createShim();
    bindShoppingBagMouseEnter();
    bindShoppingBagCloseButton();
    bindLoginClick();
    bindMyAccountClick();
    bindLoginClose();
    bindMyAccountClose();
    modal();
    overlayShow();
    //hideOverlays();
    
    CSBfleXcroll('locationsScroll');
    //email subscription
    $('#email_campaign fieldset a').bind('click', showEmailSubscribed);
    $('#email_campaign .email_subscribed .close').bind('click', function(){
        $('#email_campaign .email_subscribed').hide();
        $('#email_campaign fieldset a').bind('click', showEmailSubscribed);
        return false;
    });
    sampleText($('#email_signup'));
    
    //hack for flexcroll initialization
    $('#utility_shoppingBag').children('ul').each(function(){
        $(this).css('visibility', 'hidden').css('display', 'block'); 
		/************** This next line makes IE6 throw an error *************/
       CSBfleXcroll('prodScroll');       
        $(this).css('display', 'none').css('visibility', '');
		
    });
	
        
   
	 
    
});

function createShim(){
    if ($.browser.msie) {
        $('#utility_shoppingBag').find('.utility_pop').after('<IFRAME style="position: absolute; z-index:4000; width:350px; filter:progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)" src="javascript:false;document.write(/' / ');" frameBorder="0" scrolling="no"></IFRAME>');
    }
}

function unbindLoginClick(){
    $('#utility_login').children('a').unbind('click');
}

function bindLoginClick(){
    $('#utility_login').children('a').bind('click', function(){
    
        var $ul = $(this).siblings('ul');
        var $wrapper = $ul.find('div.utility_pop_wrapper');
        var $inner = $ul.find('div.utility_pop_inner');
        
        $ul.css('left', '-284px');
        if ($ul.css('display') === 'none') {
            $inner.fadeOut('fast', function(){
                $ul.show();
                //set height of pop_wrapper initially to zero
                $wrapper.height('0');
                
                $wrapper.animate({
                    height: $inner.height()
                }, 500, function(){
                    $wrapper.css('height', 'auto');
                    
                    //bring back contents
                    $inner.fadeIn(500);
                });
            });
        }
    });
}

function bindLoginClose(){
    $('#utility_login').find('.close').bind('click', function(){
        $('#utility_login').children('ul').hide();
        bindMyAccountClick();
        // TODO :: reset form
    });
}

function unbindMyAccountClick(){
    $('#utiliity_myAccount').children('a').unbind('click');
}

function bindMyAccountClick(){
    $('#utility_myAccount').children('a').bind('click', function(){
        var isLoggedIn = false;
        
        // authentication logic probably isn't necessary if the utility navigation is different after logging in
        
        /**** TODO :: Authentication logic setting isLoggedIn accordingly*****/
        
        if (isLoggedIn === false) {
            var $ul = $('#utility_login').children('ul');
            var $wrapper = $ul.find('div.utility_pop_wrapper');
            var $inner = $ul.find('div.utility_pop_inner');
            $ul.css('left', '-203px');
            if ($ul.css('display') === 'none') {
                $inner.fadeOut('fast', function(){
                    $ul.show();
                    //set height of pop_wrapper initially to zero
                    $wrapper.height('0');
                    
                    $wrapper.animate({
                        height: $inner.height()
                    }, 500, function(){
                        $wrapper.css('height', 'auto');
                        
                        //bring back contents
                        $inner.fadeIn(500);
                    });
                });
            }
        }
        else {
            //go to my Account page
        }
        
    });
}

function bindMyAccountClose(){
    $('#utility_myAccount').find('.close').bind('click', function(){
        $('#utility_myAccount').children('ul').hide();
        bindLoginClick();
        // TODO :: reset form
    });
}
















/***********  Shopping Bag **************/

function bindShoppingBagCloseButton(){
    $('#utility_shoppingBag').find('.close').bind('click', function(){
        $('#utility_shoppingBag').children('ul').hide();
        $('#utility_shoppingBag').find('.utility_pop_wrapper').css('display', '');
        bindShoppingBagMouseEnter();
    });
}

function bindShoppingBagMouseLeave(){
    $('#utility_shoppingBag').unbind('mouseleave').unbind('mouseenter').bind('mouseleave', function(){
        var bagOut = setTimeout(function(){
            $('#utility_shoppingBag').children('ul').hide();
            $('#utility_shoppingBag').find('.utility_pop_wrapper').css('display', '');
            bindShoppingBagMouseEnter();
        }, '500');
        $(this).bind('mouseenter', function(){
            clearTimeout(bagOut);
        });
    });
}

function bindShoppingBagMouseEnter(){
    $('#utility_shoppingBag').unbind('click');
    $('#shoppingBagLink').bind('click', function(){
        var myParent = $(this).parent();
        // bindShoppingBagMouseLeave();
        var $ul = $(myParent).children('ul');
        var $pop = $ul.find('div.utility_pop');
        var $wrapper = $ul.find('div.utility_pop_wrapper');
        var $inner = $ul.find('div.utility_pop_inner');
        
        //hide signin drop down so there isn't any overlap
        $('#utility_login').children('ul:visible').hide();
        
        // this is a mouse over so hide the notification section
        $ul.find('div.pop_top').show();
        
        
        $inner.fadeOut('fast', function(){
            //set height of iframe to max height of dropdown initially so selects don't show through while animation is taking place
            $ul.find('iframe').css('height', '525px');
            //set height of pop_wrapper initially to zero
            $wrapper.height('0');
            
            //$ul.find('img').css('visibility', 'hidden');
            $ul.show();
            //animate height of iframe shim to height of inner plus padding of pop
            
            
            var toHeight = '545px';
            
            $wrapper.animate({
                height: toHeight
            }, 500, function(){
            
                //change height of iframe shim
                $ul.find('iframe').css('height', $pop.height());
                
                
                $inner.fadeIn(500);
            });
        });
        
    });
}

function addToBag(/*item*/){
    $('#utility_shoppingBag').unbind('mouseenter').unbind('mouseleave'); // must rebind on close button clicking
    var $ul = $('#utility_shoppingBag').children('ul');
    var $pop = $ul.find('div.utility_pop');
    var $wrapper = $ul.find('div.utility_pop_wrapper');
    var $inner = $ul.find('div.utility_pop_inner');
    //hide signin drop down so there isn't any overlap
    $('#utility_login').children('ul:visible').hide();
    
    // show notification area and close button
    $ul.find('div.pop_top').show();
    
    /*********************** TODO :: Load Shopping Bag Contents and Update number of items and notification area *********************/
    
    $inner.fadeOut('fast', function(){
        //set height of iframe to max height of dropdown initially so selects don't show through while animation is taking place
        $ul.find('iframe').css('height', '545px');
        //set height of pop_wrapper initially to zero
        $wrapper.height('0');
        
        $ul.show();
        
        //animate height of iframe shim to height of inner plus padding of pop
        
        
        var toHeight = '545px';
        
        $wrapper.animate({
            height: toHeight
        }, 500, function(){
            //change height of iframe shim
            $ul.find('iframe').css('height', $pop.height());
            
            //if greater than four forcefully change width for firefox lag
            if ($wrapper.find('tr').size() > 4) {
                $(this).find('.mcontentwrapper').width('316px');
                $(this).find('.vscrollerbar').css('visibility', 'visible');
                $(this).find('.vscrollerbase').css('visibility', 'visible');
            }
            else {
                $(this).find('.mcontentwrapper').width('auto');
                $(this).find('.vscrollerbar').css('visibility', 'hidden');
                $(this).find('.vscrollerbase').css('visibility', 'hidden');
            }
            
            //bring back contents
            $inner.fadeIn(500);
        });
        
    });
}

/************* start :: footer ******************/

function sampleText($this){ //constructor
    var originalText = $this.val();
    
    //setup focus to remove original text
    $this.bind('focus', function(){
        $this.val('');
    });
    //setup blur event handler to put back original text
    $this.bind('blur', function(){
        $this.val(originalText);
        return false;
    });
    //setup keystroke event handler for enter key
    $this.keypress(function(evt){
        if (evt.keyCode == 13) {
            $('#email_campaign fieldset a').trigger('click');
            $this.trigger('blur');
            return true;
        }
        else {
            return false;
        }
    });
    
}


function showEmailSubscribed(){
    $('#email_campaign fieldset a').unbind('click');
    var $ul = $('#email_campaign .email_subscribed');
    var $pop = $ul.find('div.utility_pop');
    var $wrapper = $ul.find('div.utility_pop_wrapper');
    var $inner = $ul.find('div.utility_pop_inner');
    
    //hide signin drop down so there isn't any overlap
    $('#utility_login').children('ul:visible').hide();
    
    $inner.fadeOut('fast', function(){
    
        $wrapper.height('0');
        
        $ul.show();
        var toHeight = $inner.height();
        $wrapper.animate({
            height: toHeight
        }, 500, function(){
        
            //change height of iframe shim
            $ul.find('iframe').css('height', $pop.height());
            
            //initialize flexcroll if greater than 4 items
            
            //bring back contents
            $inner.fadeIn(500);
        });
    });
    return false;
}

/************** Start :: Form Validation Animation for sign in and my account modules *********/
function animateFormValidation($container /*jQuery object*/){
    $outside = $container.find('.frm_error_outside');
    $main = $container.find('.frm_error');
    $wrapper = $main.find('.frm_error_wrapper');
    $list = $outside.find('.frm_error_wrapper').children();
    
    if ($outside.css('display') == 'none') { //new validation list
        $list.css('visibility', 'hidden');
        $outside.slideDown(500, function(){
            $list.fadeOut('fast', function(){
                $list.css('visibility', '');
                $list.fadeIn(500);
            });
        });
    }
    
    
}

/************** End	:: Form Validation Animation ***********/


/**************** Start :: Info Hovers *************/


/**************** End :: Info Hovers ************/

/******************************* END :: GLOBAL DROPDOWN COMPONENTS *****************************/

/************************* START :: SHOPPING BAG SUGGEST LOGIC ******************************/

$().ready(function(){

    $('.checkout_product_image').hover(function(){
    
        $(this).children('p').css("visibility", "visible");
        $(this).children('ul').css("visibility", "visible");
    }, function(){
        $(this).children('p').css("visibility", "hidden");
        $(this).children('ul').css("visibility", "hidden");
    });
    
    $(".swatch_list li").click(function(){
        $(this).siblings().removeClass('selected');
        $(this).addClass('selected');
        
    });
    
    
});


/************************* END :: SHOPPING BAG SUGGEST LOGIC ******************************/



/************************* Start :: Horizontal scroll container width calculate************/

var horizontalReadyFlag = false;

$(document).ready(function(){

	if (document.getElementById('browseScroll')) 
	{
        CSBfleXcroll('browseScroll');
        createScrollPagination();
        $(window).resize(createScrollPagination);
    }
});

var hBrowseTotalWidth = 0;

function minimizeListWidth(target){
	
	 var myWidth = new Number(0);
    var defaultWidth = new Number(0);
    $(target).children("li").each(function(){
        if (defaultWidth == 0) {
            defaultWidth += $(this).outerWidth({
                margin: true
            });
        }
        myWidth += $(this).outerWidth({
            margin: true
        });
    });
	$(target).width(myWidth);
}

function createScrollPagination(){
    var pag = $('.browseHTop .pagination ul');
    //var totalWidth = getHBrowseTotalWidth();
    var totalWidth = hBrowseTotalWidth;
    var viewWidth = $('#browseScroll').outerWidth();
    var numPages = Math.round(totalWidth / viewWidth);
    pag.html('');
    pag.append('<li class="prev"><a href="#none">&lt;</a></li>');
    pag.find('.prev a').bind('mousedown', function(){
		fleXcrollTo('browseScroll', '-' + viewWidth + 'px', '0px', true);
		$(document).everyTime(1000, "showPrev", function(){
			fleXcrollTo('browseScroll', '-' + viewWidth + 'px', '0px', true);
			});
    });
	pag.find('.prev a').bind('mouseup', function(){
		$(document).stopTime("showPrev");
    });
	
    for (var i = 1; i <= numPages; i++) {
        pag.append('<li class="page"><a href="#none">' + i + '</a></li>');
    }
    pag.find('.page').each(function(page){
        if (page == numPages - 1) {
            //got to very end instead of increment to account for fractions not accounted for in numPages
            $(this).bind('click', function(){
                fleXcrollTo('browseScroll', (totalWidth - viewWidth) + 'px', '0px', false);
            });
        }
        else {
            $(this).bind('click', function(){
                fleXcrollTo('browseScroll', (page * viewWidth) + 'px', '0px', false);
            });
        }
        
    });
    pag.append('<li class="next"><a href="#none">&gt;</a></li>');
    pag.find('.next a').bind('mousedown', function(){
		fleXcrollTo('browseScroll', viewWidth + 'px', '0px', true);
		$(document).everyTime(1000, "showNext", function(){
			fleXcrollTo('browseScroll', viewWidth + 'px', '0px', true);
			});
        
    });
	pag.find('.next a').bind('mouseup', function(){
		$(document).stopTime("showNext");
	});
	
	  if (jQuery.browser.msie && jQuery.browser.version < 7) {
                    getPaginationTotalWidth();
               
                }
}

function getHBrowseTotalWidth(){
/*
    var totalWidth = 0;
    $('.horizontalSection').each(function(i){
        var width = $(this).outerWidth();
        totalWidth += width;
    });
    
     if (jQuery.browser.msie)
    {
	    if(location.href.toLowerCase().indexOf('sneakers') != -1)
	    	 totalWidth = 4584;
	   	else if(location.href.toLowerCase().indexOf('flats') != -1)
	    	totalWidth = 3438;
	   	else if(location.href.toLowerCase().indexOf('heels') != -1)
	    	totalWidth = 5730;
	   	else if(location.href.toLowerCase().indexOf('rainboots') != -1)
	    	totalWidth = 1528;
	   	else if(location.href.toLowerCase().indexOf('sandals') != -1)
	    	totalWidth = 4202;
	   	else if(location.href.toLowerCase().indexOf('parker') != -1)
	    	totalWidth = 8786;
	   	else if(location.href.toLowerCase().indexOf('reedsfavs') != -1)
	    	totalWidth = 4202;
	   	else if(location.href.toLowerCase().indexOf('specialtyleathers') != -1)
	    	totalWidth = 5730;
	   	else if(location.href.toLowerCase().indexOf('mostpopular') != -1)
	    	totalWidth = 6494;
	   	else if(location.href.toLowerCase().indexOf('spotted') != -1)
	    	totalWidth = 7258;
	    else if(location.href.toLowerCase().indexOf('hamptonsarchive') != -1)
	    	totalWidth = 7640;
	    else if(location.href.toLowerCase().indexOf('bonnie') != -1)
	    	totalWidth = 7640;
   	 	else if(location.href.toLowerCase().indexOf('momsfavs') != -1)
	    	totalWidth = 4966;
	    else if(location.href.toLowerCase().indexOf('blackwhite') != -1)
	    	totalWidth = 3820;
	    else if(location.href.toLowerCase().indexOf('giftsunder200') != -1)
	    	totalWidth = 4584;	    
	    else if(location.href.toLowerCase().indexOf('introducingcricket') != -1)
	    	totalWidth = 5348;		    
	    else if(location.href.toLowerCase().indexOf('madison') != -1)
	    	totalWidth = 5730;	    
	    else if(location.href.toLowerCase().indexOf('petite') != -1)
	    	totalWidth = 3820;
   	 	else if(location.href.toLowerCase().indexOf('madisonikat') != -1)
	    	totalWidth = 4966;
	    else if(location.href.toLowerCase().indexOf('tattoo') != -1)
	    	totalWidth = 4966;
	    else if(location.href.toLowerCase().indexOf('horoscope') != -1)
	    	totalWidth = 4584;	    
	    else if(location.href.toLowerCase().indexOf('leather') != -1)
	    	totalWidth = 9168;		    
	    else if(location.href.toLowerCase().indexOf('ali') != -1)
	    	totalWidth = 4966;	   	    				
   	}
    
    width = $('.browseContent').outerWidth();
    
    return totalWidth;
   */
}
/*
function setHorizWidth(){
    $('.browseContent').width(getHBrowseTotalWidth());
}
*/
function hideOverlays(){
    $('.overlay').hide();
}

// function to detect version of ie.
function checkie(){
    var browser = navigator.appName;
    if (browser == "Microsoft Internet Explorer") {
        // Split the string into part [0] and part [1]
        temp = navigator.appVersion.split('MSIE');
        
        // Parse the string for the "6" in 6.0
        ieVer = parseInt(temp[1]);
    }
    else {
        ieVer = "";
    }
    return ieVer;
}

var randOverlay = "";

function overlayShow(){
    $('.showOverlay').click(function(){
        //alert("overlay");
		
        var overlay = $(this).parents('.shadowInner').children('.overlay');
		if (jQuery.browser.msie && jQuery.browser.version < 7) {
			overlay.before('<iframe src="" scrolling="no" frameborder="0" style="position:absolute;width:680px;height:475px;top:0px;left:0px;border:none;display:block;z-index:0"></iframe>');
		}
        var modalHeight = $(this).parents('#modalWrapper').height();
        var modalWidth = $(this).parents('#modalWrapper').width();
        var browser = navigator.appName;
        var version = checkie();
        //log.info(version);
        overlay.fadeIn();
        if (browser == "Microsoft Internet Explorer" && (version >= 6 || version != "")) {
            overlay.height($('#modal_body').outerHeight() + 2);
            overlay.width($('#modal_body').outerWidth());
            //log.info(version);
        }
        else {
            overlay.height(modalHeight - 48);
        }
        overlay.width(modalWidth - 6);
        bindOverlayClose();
    });
    
}

function getPaginationTotalWidth(){
    var totalWidth = 0;
    $(".pagination ul").children('li').each(function(){
        totalWidth += $(this).outerWidth({
            margin: true
        });
    })
    $(".pagination").width(totalWidth);
    totalWidth = 0;
    $(".paginationWrapper").children().each(function(){
    
        // alert("totalWidth: " + totalWidth);
        totalWidth += $(this).outerWidth({
            margin: true
        });
    });
    $(".paginationWrapper").width(totalWidth);
    
}

function bindOverlayClose(){
    $('.overlayClose').click(function(){
		if (jQuery.browser.msie && jQuery.browser.version < 7) {
			$("#zFrame").css('display', 'none');
		}
        var overlay = $(this).parents('.overlay');
        overlay.fadeOut();
		$(".shadowInner").children('iframe').remove();
		
    });
}


function moreViewsWidth(){
    var viewsWidth = 0;
    $('.view').each(function(i){
        var vwidth = $(this).outerWidth();
        viewsWidth += vwidth;
    });
    return viewsWidth;
}

function setMoreViewsWidth(){

    setTimeout("$('.views').width(moreViewsWidth())", 0);
    setTimeout("CSBfleXcroll('viewScroll')", 0);
    //log.error(moreViewsWidth());
}

function setPickupScroll(){
    setTimeout("$('#locationsScroll').width('350px').height('217px')", 0);
    setTimeout("CSBfleXcroll('locationsScroll')", 0);
}


function setSearchFilterHeight(){
    //Makes the search filter box bottom-align with search results 
    var searchHeight = new Number($("#search_filter_inner").height());
    var paddingTopString = $("#search_filter_inner").css("padding-top");
    var paddingTopArray = paddingTopString.split("p");
    var paddingTop = new Number(paddingTopArray[0]);
    var paddingBottomString = $("#search_filter_inner").css("padding-bottom");
    var paddingBottomArray = paddingBottomString.split("p");
    var paddingBottom = new Number(paddingBottomArray[0]);
    var padding = paddingTop + paddingBottom;
    
    var increment = new Number(175);
    var blockSpacing = new Number(37);
    
    var blocksUsed = Math.round(searchHeight / increment);
    if (blocksUsed < 2) {
        blocksUsed = 2;
    }
    var newHeight = increment * blocksUsed;
    newHeight = newHeight - padding;
    $("#search_filter_inner").height(newHeight)
}



function bindToFilterSelects(){
    $(".optionReset").each(function(){		
        $(this).bind("click", function(){
            $(this).css("display", "none");
            var myParent = $(this).parent();
           	var select = myParent.children('select');
           	select.removeClass('hideSelect');            
        });
    });
    
    $("#search_filter_inner select").each(function(){
        $(this).bind("change", function(){
            $(this).css("position", "absolute");
            var myOption = $(this).children("option:selected").text();
            var myHeight = $(this).height();
            var myId = $(this).attr("id");
            var myParent = $(this).parent();
            var targetId = myId += "Reset";
            var targetY = $("#" + targetId).css("top");
            targetY = targetY - myHeight;
            $(this).addClass('hideSelect');            
            $("#" + targetId).children('span').html(myOption);
            //$("#" + targetId).css("display", "block").css("position", "absolute").css("top", targetY);
            $("#" + targetId).css("display", "block").css("position", "absolute");
            var myField = $(this).parent();
        });
    });
}

function restoreWidth(target){
    var myWidth = new Number(0);
    var defaultWidth = new Number(0);
	
	$(".prod_attributes").css("display", "block");
	
    $(target).children("li").each(function(){
        if (defaultWidth == 0) {
            defaultWidth += $(this).outerWidth({
                margin: true
            });
        }
        myWidth += $(this).outerWidth({
            margin: true
        });
    });   
    myWidth += 1;
    var myParent = $(target).parent();
    var mySibling = myParent.children("p");
    var siblingWidth = mySibling.width() + 2;
	
    $(target).width(myWidth);
    if (myWidth > siblingWidth) {
        $(target).parent().width(myWidth);
		mySibling.width(myWidth);
		return (myWidth);
    }
    else {
        $(target).parent().width(siblingWidth);
		return (siblingWidth);
    }     
}


function getRightmostEdge(){
    var rightmostEdge = new Number(0);
    $(".resultContent").each(function(){
        offset = $(this).offset();
        left = offset.left + $(this).width();
        rightmostEdge = Math.max(rightmostEdge, left);
    });
    return (rightmostEdge);
}

function getLeftmostEdge(){
    var leftmostEdge = new Number(100000);
    $(".resultContent").each(function(){
        offset = $(this).offset();
        left = offset.left;
        leftmostEdge = Math.min(leftmostEdge, left);
    });
    return (leftmostEdge);
}

function setAttributeFadeOnContainerExit(container){
    container.bind("mouseout", function(){
        //Kill any active fading effect
        $(document).stopTime("fadeOut");
        $(".prod_attributes").addClass("fade");
        $(document).oneTime(500, "fadeOut", function(){
            if ($(".prod_attributes").hasClass("fade")) {
                $(".prod_attributes").fadeOut(function(){
                    $(".prod_attributes").css("left", -5000).css("display", "block").css("width", "auto").css("top", -5000);
                });
            }
        });
    });
}

function setAttributeFadeOnContainerEnter(container){
    container.bind("mouseover", function(){
        //Kill any active fading effect
        $(document).stopTime("fadeOut");
        $(".prod_attributes").addClass("fade");
        $(document).oneTime(500, "fadeOut", function(){
            if ($(".prod_attributes").hasClass("fade")) {
                $(".prod_attributes").fadeOut(function(){
                    $(".prod_attributes").css("left", -5000).css("display", "block").css("width", "auto").css("top", -5000);
                });
            }
        });
    });
}

//For pages with a results filter box, like search results, pass in "1" or "true"
//Otherwise, pass in "0" or "false"
function bindSwatchPositioning(ifFilter){
    //restoreWidth($(".prod_attributes ul"));
    //ToDo: make more generic so that it can be used in different situations...SOMEWHAT DONE
    //Maybe change vertical positioning based on some class or id...
    //Accomodate possible lack of filter panel...DONE
    //Somehow be aware of left and right alignment issues for various containers...
    var abOffset = new Number(0);
    var abOffsetLeft = new Number(0);
    var abOffsetTop = new Number(0);
    $(".resultContent").each(function(){
		
        //Parent is a listing container
        var myParent = $(this).parent();
        //Grandparent contains all listing containers.
        //If listing containers are absolutely positioned...
        //Listing position must be adjusted by grandparent's offset
        var myGrandParent = myParent.parent();
        abOffset = myGrandParent.offset();
        if (myParent.css("position") == "absolute") {
            abOffsetLeft = abOffset.left;
            abOffsetTop = abOffset.top;
        }
        $(this).bind("mouseout", function(){
            //Provide for the possibility that user has moused off a listing...
            //But not moused over another listing: we don't want the prod attributes hanging around.
            // $(".prod_attributes").addClass("fade");
            //  $(document).oneTime(500, "fadeOut", function(){
            //   if ($(".prod_attributes").hasClass("fade")) {
            //   $(".prod_attributes").fadeOut(function(){
            //     $(".prod_attributes").css("left", -5000).css("display", "block").css("width", "auto");
            // });
            // }
            //  });
        });
        $(this).bind("mouseover", function(){
            //Set swatches to not fade
            $(".prod_attributes").removeClass("fade");
            //Kill any active fading effect
            $(document).stopTime("fadeOut");
            //Hide any swatches shown by another product
            $(".prod_attributes").css("left", -5000).css("width", "auto").css("top", -5000);
            // $(".prod_attributes").html("");
            //Retrieve product attributes from mouseovered item
            var attributes = myParent.children(".infoToggle").html();
            $(".prod_attributes").html(attributes);
            //Set the width of the swatches for IE6
            var swatchWidth = restoreWidth($(".prod_attributes ul"));
            //Locate the x and y positions of all the pertinent elements
            var myOffset = $(this).offset();
            var myLeft = myOffset.left;
            var myTop = myOffset.top;
            var myHeight = $(this).height();
            var myWidth = $(this).width();
            var filterBottom = 0;
            var filterOffsetAdjust = 500;
            if (ifFilter) {
                var filterOffset = $("#search_filter_inner").offset();
                var filterLeft = filterOffset.left;
                var filterTop = filterOffset.top;
                var filterWidth = $("#search_filter_inner").width();
                var filterHeight = $("#search_filter_inner").height();
                filterBottom = filterTop + filterHeight;
                //basically a number around the x of the first result to the right of a result directly to the right of the filter
                filterOffsetAdjust = filterLeft + filterWidth + myWidth;
            }
            var windowRightEdge = $(window).width();
            var swatchWidth = restoreWidth($(".prod_attributes ul"));
            //Get a couble of differences for...
            //...determining if element is on the far right
            var rightOffset = (windowRightEdge - myLeft);
            //...use later to position swatches in relation to image edge
			var rightmostEdge = getRightmostEdge();
            var widthDiff = (swatchWidth - myWidth);
			
			var rightmostTest = myLeft + myWidth;
            //If I'm leftmost 
            if (myLeft < filterOffsetAdjust && myTop < filterBottom || myLeft == getLeftmostEdge() && myTop > filterBottom) {
                //Adjust for possibility that containers are absolutely positioned
                myLeft = myLeft - abOffsetLeft;
                myTop = myTop - abOffsetTop;
                $(".prod_attributes p").css("text-align", "left");
            }
            //If I'm rightmost
            else 
                if (rightmostTest == getRightmostEdge()) {
                    //Adjust for possibility that containers are absolutely positioned
                    myLeft = myLeft - abOffsetLeft;
                    myTop = myTop - abOffsetTop;
                    myLeft = myLeft - widthDiff;
                    $(".prod_attributes ul").css("float","right");
                    $(".prod_attributes p").css("text-align", "right");
                }
                //If I'm somewhere in the middle
                else {
					
                    //Adjust for possibility that containers are absolutely positioned
                   myLeft = myLeft - abOffsetLeft;
                    myTop = myTop - abOffsetTop;
                    widthDiff = widthDiff / 2;
                    myLeft = myLeft - widthDiff;
					$(".prod_attributes ul").css("margin","0 auto");
                    $(".prod_attributes p").css("text-align", "center");
                }
            myTop = myTop + myHeight;
            $(".prod_attributes").css("left", myLeft).css("top", myTop);
            
        });
    });
    
}

function modal(){
	if(jQuery.isFunction(jQuery.fn.jqm)) {
    //first level modal
    $('.modal0').jqm({
        trigger: 'a.mLaunch',
        ajax: '@href', /* Extract ajax URL from the 'href' attribute of triggering element */
        modal: true, /* FORCE FOCUS */
        closeClass: 'close',
        onHide: function(h){
            h.o.remove(); // remove overlay
            h.w.fadeOut(888); // hide window
        },
        onLoad: function(){
            modal();
            overlayShow();
        },
        overlay: 0
    });
    
    // second/nested modal is dragable.
    $('.modal2').jqm({
        ajax: '@href', /* Extract ajax URL from the 'href' attribute of triggering element */
        modal: true,
        //target: t2,
        trigger: 'a.mLaunch2',
        closeClass: 'close',
        overlayClass: 'olay',
        onHide: function(h){
            h.o.remove(); // remove overlay
            h.w.fadeOut(888);
        },
        onLoad: function(){
            modal();
            overlayShow();
        },
        overlay: 0
    });
    }
    //.jqDrag('.modal_header'); can set dragability but only works well with two modals open at a time.
    
    // Get width of modal and divide by two to find center.
    var modalw = $('#modalWrapper').outerWidth() / 2;
    
    //apply a negative margin of half of the modal to center modal
    $('.modal0').css('margin-left', Math.ceil(-modalw) + 'px');
    //$('.modal2').css('margin-left', Math.ceil(-modalw)+'px');

}

function resetWindowWidth(){
    //nudge IE6 to correctly position footer after resizing of nav elements
    if (jQuery.browser.msie && jQuery.browser.version < 7) {
        self.resizeBy(newWidth, 0);
        //Reverse sign of newWidth so browser is never nudged in the same direction twice.
        newWidth = newWidth * -1;
    }
    
}

function maintainNavState(array)
{
	/*
	var topTier = array[0];
	var middleTier = array[1];
	var bottomTier = array[2];

	$('.nav_main_inner dl').children('#' + topTier).children('ul').children("#filterList").children('ul').css('display','block');

	if(topTier == null){
		return;
	}else{
		topTier = $('.nav_main_inner dl').children('#' + topTier);
		topTier.children('a').addClass('over');
		topTier.children('ul').css('display','block');
	}
	if(middleTier == null){
		return;
	}else{
		middleTier = topTier.children('ul').children("#" + middleTier);
		middleTier.children('a').addClass('over');
		middleTier.children('ul').css('display','block');
	}
	if(bottomTier == null){
		return;
	}else{
		
		bottomTier = middleTier.children('ul').children("#" + bottomTier);
		bottomTier.children('a').addClass('over');
	}
	*/
}

function maintainNavStateHandbags(array)
{
	/*
	var topTier = array[0];
	var middleTier1 = array[1];
	var middleTier2 = array[2];
	
	$('.nav_main_inner dl').children('#' + topTier).children('ul').children("#filterList").children('ul').css('display','block');
	
	if(topTier == null){
		return;
	}else{
		topTier = $('.nav_main_inner dl').children('#' + topTier);
		topTier.children('a').addClass('over');
		topTier.children('ul').css('display','block');
	}
	if(middleTier1 == null){
		return;
	}else{
		middleTier1 = topTier.children('ul').children("#" + middleTier1);
		middleTier1.children('a').addClass('over');
		middleTier1.children('ul').css('display','block');
	}
	if(middleTier2 == null){
		return;
	}else{
		middleTier2 = topTier.children('ul').children("#" + middleTier2);
		middleTier2.children('a').addClass('over');
		middleTier2.children('ul').css('display','block');
	}
	*/
}
		
function displayAlert(target){
	var spacer = new Number(2);
	var offsetArray = target.offset();
	var targetLeft = offsetArray.left;
	var targetTop = offsetArray.top;
	var targetId = target.attr('id');
	var alertId = targetId + "_alert";
	var alertString = '<div id="' + alertId + '" class="formAlert"></div>';
	$('body').append(alertString);
	$("#" + alertId).css('float' ,'left')
	var alertWidth = $("#" + alertId).width() + spacer;
	targetLeft = targetLeft - alertWidth;
	$("#" + alertId).css('position' ,'absolute').css('left', targetLeft);
	$("#" + alertId).css('top', targetTop);
}

//This sets the width of Horizontal Browse, when there are less than 3 products
function setWidthForHorizontalBrowse()
{
	var browserWidth = $(document).width();
	var contentWidth = $(".browseContent").width();
	if (contentWidth < browserWidth) 
	{
	    $(".browseContent").css("width", "100%");
	    $(".browseContent").css("margin-left", "90px");
	}   
}

function updateIframeShim(elem){
	if ($.browser.msie && (elem != null || elem != undefined)){
		var $elem = $(elem);
		var $shim = $elem.prev('iframe');
		if ($shim != null && $shim.attr('id')==''){
			$shim.css("z-index", $elem.css('z-index'));
		}
	}
}

function setHBrowseWidth(browseHorizontalWidth)
{	
	hBrowseTotalWidth = browseHorizontalWidth;
	browseHorizontalWidth = browseHorizontalWidth + 'px';
	$(".browseContent").css("width",browseHorizontalWidth);
}

function setHorizontalReadyFlag(flag)
{
	horizontalReadyFlag = true;
}
/*Code added for Ticket 933*/
function capitaliseFirstLetter(val) {
	var arr = val.toLowerCase().split(' ');
	for(var i = 0; i < arr.length; i++) {
		arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substr(1);
	};

	return arr.join(' ');
}
function openTwitter(selectedPartNumber,productMessage)
{
	var prdMsg = "I love the " + capitaliseFirstLetter(productMessage) + " from @Coach";
	var longUrl = "http://www.coach.com/online/handbags/clickatcoach-10551-10051-en-SMCO0002?cid=SMCO0002&partNumber=" + selectedPartNumber;
	window.open("/online/handbags/TwitterShareView?storeId=10551&longUrl=" + encodeURIComponent(longUrl) + "&message=" + encodeURIComponent(prdMsg), '_blank');
	pdp.functions.omnitureTracker("pdpTwitter");
}

function openJPTwitter(selectedPartNumber,productMessage)
{  //changes for wcs-6455 cid=protwt
	var prdMsg = capitaliseFirstLetter(productMessage) + " @Coach";
	//WCS-6901 change start
	var productColor = pdp.constants.productColorCode;
	var longUrl = "http://japan.coach.com/online/handbags/Product--13001-13500-" + selectedPartNumber+ "-jp?cid=protwt&cs=" + productColor.toLowerCase() ;
	//WCS-6901 change end
	window.open("/online/handbags/TwitterShareView?storeId=13001&longUrl=" + encodeURIComponent(longUrl) + "&message=" + encodeURIComponent(prdMsg), '_blank');
	pdp.functions.omnitureTracker("pdpTwitter");
}

function openUKTwitter(selectedPartNumber,productMessage)
{
	var prdMsg = "I Love the " + capitaliseFirstLetter(productMessage) + " from @Coach";
	var longUrl = "http://uk.coach.com/online/handbags/Product-coach-14001-14500-"+ selectedPartNumber+"-uk?cid=SMCO0002" ;
	window.open("/online/handbags/TwitterShareView?storeId=14001&longUrl=" + encodeURIComponent(longUrl) + "&message=" + encodeURIComponent(prdMsg), '_blank');
	pdp.functions.omnitureTracker("pdpTwitter");
}
