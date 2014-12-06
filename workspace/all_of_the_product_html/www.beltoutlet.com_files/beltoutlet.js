$(document).ready(function() {
  $('.topNavLI').hover(function() {
    $(this).addClass('selectedLI');
  }, function() {
    $(this).removeClass('selectedLI');
  });
  
  $('.selectbox').sSelect();
  
  $(".cloud-zoom-gallery img").each(function(){
    //$(this).click(function(){
	$(this).bind('mouseenter',function(){
	  $("#wrap").css("visibility","hidden");
	  setTimeout("getNewWid()",500);
	});
  });
  
  /*
  if($(".mainImage").length > 0)
  {
    $("#wrap").css("visibility","hidden");
	setTimeout("getNewWid()",500);
  }
  */
  
  if($(".orderBox").length > 0)
  {
    changeStock();
  }
  
});

function showUSShip()
{
  $('#ShippingDivUS').lightbox_me({
    centered: true
  });
}

function showCANShip()
{
  $('#ShippingDivCAN').lightbox_me({
    centered: true
  });
}

function changeStock()
{
  $(".stockHead").removeClass("outofstockhead");
  $(".stockHead").removeClass("instockhead");
  
  if($("#orderinfo-data .order-button").length > 0)
  {
    $(".stockHead").addClass("instockhead");
  }
  else
  {
    $(".stockHead").addClass("outofstockhead");
  }
}

function getNewWid()
{
  var mywid = $(".mousetrap").width();
  
  //$(".styleDiv").html("<script type=\"text/css\">#wrap{width:"+mywid+"px !important;}</style>");
  if(mywid > 0)
  {
    $(".styleDiv").html("");
    $("#wrap").width(mywid)
  }
  $("#wrap").css("visibility","visible");
}

function submitForms()
{
  flag = 0; 
  $(".orderBoxInner select").each(function(){
    var myVal = $(this).val();
	var myVal2 = myVal.replace("Select","");
	
	if(myVal != myVal2)
	{
	  flag = 1;
	}
  });
  
  if(flag == 0)
  {
	setTimeout("formSubmit()",1000);
  }
}

function formSubmit()
{
  document.multiform.submit();
}

function clickColor(n)
{
  //var myNum = n - 1;
  var myNum = n;
  
  $(".colorInsets .colorA"+myNum+" img").trigger('mouseenter');
  
  /*
  if(myNum <= 0)
  {
    //$(".itemInsets .cloud-zoom-gallery:eq("+myNum+") img").trigger('click');
	$(".itemInsets .cloud-zoom-gallery:eq("+myNum+") img").trigger('mouseenter');
  }
  else
  {
  
    //$(".colorInsets .colorA"+myNum+" img").trigger('click');
	$(".colorInsets .colorA"+myNum+" img").trigger('mouseenter');
  }
  */
}


//////////////////////////////////////////////////////////////////////////////////
// Cloud Zoom V1.0.2
// (c) 2010 by R Cecco. <http://www.professorcloud.com>
// MIT License
//
// Please retain this copyright header in all versions of the software
//////////////////////////////////////////////////////////////////////////////////
(function($){$(document).ready(function(){$('.cloud-zoom, .cloud-zoom-gallery').CloudZoom()});function format(str){for(var i=1;i<arguments.length;i++){str=str.replace('%'+(i-1),arguments[i])}return str}function CloudZoom(jWin,opts){var sImg=$('img',jWin);var img1;var img2;var zoomDiv=null;var $mouseTrap=null;var lens=null;var $tint=null;var softFocus=null;var $ie6Fix=null;var zoomImage;var controlTimer=0;var cw,ch;var destU=0;var destV=0;var currV=0;var currU=0;var filesLoaded=0;var mx,my;var ctx=this,zw;setTimeout(function(){if($mouseTrap===null){var w=jWin.width();jWin.parent().append(format('<div style="width:%0px;position:absolute;top:75%;left:%1px;text-align:center" class="cloud-zoom-loading" >Loading...</div>',w/3,(w/2)-(w/6))).find(':last').css('opacity',0.5)}},200);var ie6FixRemove=function(){if($ie6Fix!==null){$ie6Fix.remove();$ie6Fix=null}};this.removeBits=function(){if(lens){lens.remove();lens=null}if($tint){$tint.remove();$tint=null}if(softFocus){softFocus.remove();softFocus=null}ie6FixRemove();$('.cloud-zoom-loading',jWin.parent()).remove()};this.destroy=function(){jWin.data('zoom',null);if($mouseTrap){$mouseTrap.unbind();$mouseTrap.remove();$mouseTrap=null}if(zoomDiv){zoomDiv.remove();zoomDiv=null}this.removeBits()};this.fadedOut=function(){if(zoomDiv){zoomDiv.remove();zoomDiv=null}this.removeBits()};this.controlLoop=function(){if(lens){var x=(mx-sImg.offset().left-(cw*0.5))>>0;var y=(my-sImg.offset().top-(ch*0.5))>>0;if(x<0){x=0}else if(x>(sImg.outerWidth()-cw)){x=(sImg.outerWidth()-cw)}if(y<0){y=0}else if(y>(sImg.outerHeight()-ch)){y=(sImg.outerHeight()-ch)}lens.css({left:x,top:y});lens.css('background-position',(-x)+'px '+(-y)+'px');destU=(((x)/sImg.outerWidth())*zoomImage.width)>>0;destV=(((y)/sImg.outerHeight())*zoomImage.height)>>0;currU+=(destU-currU)/opts.smoothMove;currV+=(destV-currV)/opts.smoothMove;zoomDiv.css('background-position',(-(currU>>0)+'px ')+(-(currV>>0)+'px'))}controlTimer=setTimeout(function(){ctx.controlLoop()},30)};this.init2=function(img,id){filesLoaded++;if(id===1){zoomImage=img}if(filesLoaded===2){this.init()}};this.init=function(){$('.cloud-zoom-loading',jWin.parent()).remove();$mouseTrap=jWin.parent().append(format("<div class='mousetrap' style='background-image:url(\".\");z-index:999;position:absolute;width:%0px;height:%1px;left:%2px;top:%3px;\'></div>",sImg.outerWidth(),sImg.outerHeight(),0,0)).find(':last');$mouseTrap.bind('mousemove',this,function(event){mx=event.pageX;my=event.pageY});$mouseTrap.bind('mouseleave',this,function(event){clearTimeout(controlTimer);if(lens){lens.fadeOut(299)}if($tint){$tint.fadeOut(299)}if(softFocus){softFocus.fadeOut(299)}zoomDiv.fadeOut(300,function(){ctx.fadedOut()});return false});$mouseTrap.bind('mouseenter',this,function(event){mx=event.pageX;my=event.pageY;zw=event.data;if(zoomDiv){zoomDiv.stop(true,false);zoomDiv.remove()}var xPos=opts.adjustX,yPos=opts.adjustY;var siw=sImg.outerWidth();var sih=sImg.outerHeight();var w=opts.zoomWidth;var h=opts.zoomHeight;if(opts.zoomWidth=='auto'){w=siw}if(opts.zoomHeight=='auto'){h=sih}var appendTo=jWin.parent();switch(opts.position){case'top':yPos-=h;break;case'right':xPos+=siw;break;case'bottom':yPos+=sih;break;case'left':xPos-=w;break;case'inside':w=siw;h=sih;break;default:appendTo=$('#'+opts.position);if(!appendTo.length){appendTo=jWin;xPos+=siw;yPos+=sih}else{w=appendTo.innerWidth();h=appendTo.innerHeight()}}zoomDiv=appendTo.append(format('<div id="cloud-zoom-big" class="cloud-zoom-big" style="display:none;position:absolute;left:%0px;top:%1px;width:%2px;height:%3px;background-image:url(\'%4\');z-index:99;"></div>',xPos,yPos,w,h,zoomImage.src)).find(':last');if(sImg.attr('title')&&opts.showTitle){zoomDiv.append(format('<div class="cloud-zoom-title">%0</div>',sImg.attr('title'))).find(':last').css('opacity',opts.titleOpacity)}if($.browser.msie&&$.browser.version<7){$ie6Fix=$('<iframe frameborder="0" src="#"></iframe>').css({position:"absolute",left:xPos,top:yPos,zIndex:99,width:w,height:h}).insertBefore(zoomDiv)}zoomDiv.fadeIn(500);if(lens){lens.remove();lens=null}cw=(sImg.outerWidth()/zoomImage.width)*zoomDiv.width();ch=(sImg.outerHeight()/zoomImage.height)*zoomDiv.height();lens=jWin.append(format("<div class = 'cloud-zoom-lens' style='display:none;z-index:98;position:absolute;width:%0px;height:%1px;'></div>",cw,ch)).find(':last');$mouseTrap.css('cursor',lens.css('cursor'));var noTrans=false;if(opts.tint){lens.css('background','url("'+sImg.attr('src')+'")');$tint=jWin.append(format('<div style="display:none;position:absolute; left:0px; top:0px; width:%0px; height:%1px; background-color:%2;" />',sImg.outerWidth(),sImg.outerHeight(),opts.tint)).find(':last');$tint.css('opacity',opts.tintOpacity);noTrans=true;$tint.fadeIn(500)}if(opts.softFocus){lens.css('background','url("'+sImg.attr('src')+'")');softFocus=jWin.append(format('<div style="position:absolute;display:none;top:2px; left:2px; width:%0px; height:%1px;" />',sImg.outerWidth()-2,sImg.outerHeight()-2,opts.tint)).find(':last');softFocus.css('background','url("'+sImg.attr('src')+'")');softFocus.css('opacity',0.5);noTrans=true;softFocus.fadeIn(500)}if(!noTrans){lens.css('opacity',opts.lensOpacity)}if(opts.position!=='inside'){lens.fadeIn(500)}zw.controlLoop();return})};img1=new Image();$(img1).load(function(){ctx.init2(this,0)});img1.src=sImg.attr('src');img2=new Image();$(img2).load(function(){ctx.init2(this,1)});img2.src=jWin.attr('href')}$.fn.CloudZoom=function(options){try{document.execCommand("BackgroundImageCache",false,true)}catch(e){}this.each(function(){var relOpts,opts;eval('var	a = {'+$(this).attr('rel')+'}');relOpts=a;if($(this).is('.cloud-zoom')){$(this).css({'position':'relative','display':'block'});$('img',$(this)).css({'display':'block'});if($(this).parent().attr('id')!='wrap'){var mywidth = $("#zoom1 img").attr("width");$(this).wrap('<div id="wrap" style="top:0px;position:relative;width:'+mywidth+'px;"></div>')}opts=$.extend({},$.fn.CloudZoom.defaults,options);opts=$.extend({},opts,relOpts);$(this).data('zoom',new CloudZoom($(this),opts))}else if($(this).is('.cloud-zoom-gallery')){opts=$.extend({},relOpts,options);$(this).data('relOpts',opts);$(this).click(function(e){e.preventDefault();return false;});$(this).bind('mouseenter',$(this),function(event){var data=event.data.data('relOpts');$('#'+data.useZoom).data('zoom').destroy();$('#'+data.useZoom).attr('href',event.data.attr('href'));$('#'+data.useZoom+' img').attr('src',event.data.data('relOpts').smallImage);$('#'+event.data.data('relOpts').useZoom).CloudZoom();return false})}});return this};$.fn.CloudZoom.defaults={zoomWidth:'auto',zoomHeight:'auto',position:'right',tint:false,tintOpacity:0.5,lensOpacity:0.5,softFocus:false,smoothMove:3,showTitle:true,titleOpacity:0.5,adjustX:0,adjustY:0}})(jQuery);
/**
* Stylish Select 0.4.9 - jQuery plugin to replace a select drop down box with a stylable unordered list
* http://github.com/scottdarby/Stylish-Select
*
* Requires: jQuery 1.3 or newer
*
* Contributions from Justin Beasley: http://www.harvest.org/
* Anatoly Ressin: http://www.artazor.lv/ Wilfred Hughes: https://github.com/Wilfred
* Grigory Zarubin: https://github.com/Craigy-
*
* Dual licensed under the MIT and GPL licenses.
*/
(function($){
    //add class to html tag
    $('html').addClass('stylish-select');

    //Cross-browser implementation of indexOf from MDN: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
    if (!Array.prototype.indexOf){
        Array.prototype.indexOf = function(searchElement /*, fromIndex */){
            if (this === void 0 || this === null)
                throw new TypeError();

            var t = Object(this);
            var len = t.length >>> 0;
            if (len === 0)
                return -1;

            var n = 0;
            if (arguments.length > 0){
                n = Number(arguments[1]);
                if (n !== n) // shortcut for verifying if it's NaN
                    n = 0;
                else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0))
                    n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }

            if (n >= len)
                return -1;

            var k = n >= 0
            ? n
            : Math.max(len - Math.abs(n), 0);

            for (; k < len; k++){
                if (k in t && t[k] === searchElement)
                    return k;
            }
            return -1;
        };
    }

    //utility methods
    $.fn.extend({
        getSetSSValue: function(value){
            if (value){
                //set value and trigger change event
                $(this).val(value).change();
                return this;
            } else {
                return $(this).find(':selected').val();
            }
        },
        //added by Justin Beasley
        resetSS: function(){
            var oldOpts = $(this).data('ssOpts');
                $this = $(this);
                $this.next().remove();
                //unbind all events and redraw
                $this.unbind('.sSelect').sSelect(oldOpts);
        }
    });

    $.fn.sSelect = function(options){
        return this.each(function(){
            var defaults = {
                defaultText: 'Please select',
                animationSpeed: 0, //set speed of dropdown
                ddMaxHeight: '', //set css max-height value of dropdown
                containerClass: '' //additional classes for container div
            };

            //initial variables
            var opts = $.extend(defaults, options),
                $input = $(this),
                $containerDivText = $('<div class="selectedTxt"></div>'),
                $containerDiv = $('<div class="newListSelected ' + opts.containerClass + ($input.is(':disabled') ? ' newListDisabled' : '') + '"></div>'),
                $containerDivWrapper = $('<div class="SSContainerDivWrapper" style="visibility:hidden;"></div>'),
                $newUl = $('<ul class="newList"></ul>'),
                currentIndex = -1,
                prevIndex = -1,
                keys = [],
                prevKey = false,
                prevented = false,
                $newLi;

            //added by Justin Beasley
            $(this).data('ssOpts',options);

            if( $(this).next('.newListSelected').length ) {
                return;
            }

            //build new list
            $containerDiv.insertAfter($input);
            $containerDiv.attr("tabindex", $input.attr("tabindex") || "0");
            $containerDivText.prependTo($containerDiv);
            $newUl.appendTo($containerDiv);
            $newUl.wrap($containerDivWrapper);
            $containerDivWrapper = $newUl.parent();
            $input.hide();

            if($input.is(':disabled')){
                return;
            }

            //added by Justin Beasley (used for lists initialized while hidden)
            $containerDivText.data('ssReRender',!$containerDivText.is(':visible'));

            //add one item to list
            function addItem(item, container) {
                var option = $(item).text(),
                    key = $(item).val(),
                    isDisabled = $(item).is(':disabled');

                if (!isDisabled && !$(item).parents().is(':disabled')) {
                    //add first letter of each word to array
                    keys.push(option.charAt(0).toLowerCase());
                }
                container.append($('<li><a'+(isDisabled ? ' class="newListItemDisabled"' : '')+' href="JavaScript:void(0);">'+option+'</a></li>').data({
                    'key' : key,
                    'selected' : $(item).is(':selected')
                }));
            }

            $input.children().each(function(){
                if ($(this).is('option')){
                    addItem(this, $newUl);
                } else {
                    var optionTitle = $(this).attr('label'),
                        $optGroup = $('<li class="newListOptionTitle ' + ($(this).is(':disabled') ? 'newListOptionDisabled' : '') + '">'+optionTitle+'</li>'),
                        $optGroupList = $('<ul></ul>');

                    $optGroup.appendTo($newUl);
                    $optGroupList.appendTo($optGroup);

                    $(this).children().each(function(){
                        addItem(this, $optGroupList);
                    });
                }
            });

            //cache list items object
            $newLi = $newUl.find('li a:not(.newListItemDisabled)').not(function(){
                return $(this).parents().hasClass('newListOptionDisabled');
            });

            //get selected item from new list (because it doesn't contain disabled options)
            $newLi.each(function(i){
                if ($(this).parent().data('selected')){
                    opts.defaultText = $(this).html();
                    currentIndex = prevIndex = i;
                }
            });

            //get heights of new elements for use later
            var newUlHeight = $newUl.height(),
                containerHeight = $containerDiv.height(),
                newLiLength = $newLi.length;

            //check if a value is selected
            if (currentIndex != -1){
                navigateList(currentIndex);
            } else {
                //set placeholder text
                $containerDivText.text(opts.defaultText);
            }

            //decide if to place the new list above or below the drop-down
            function newUlPos(){
                var containerPosY = $containerDiv.offset().top,
                    docHeight = $(window).height(),
                    scrollTop = $(window).scrollTop();

                //if height of list is greater then max height, set list height to max height value
                if (newUlHeight > parseInt(opts.ddMaxHeight)){
                    newUlHeight = parseInt(opts.ddMaxHeight);
                }

                containerPosY = containerPosY-scrollTop;
                if (containerPosY+newUlHeight >= docHeight){
                    $newUl.css({
                        height: newUlHeight
                    });
                    $containerDivWrapper.css({
                        top: '-'+newUlHeight+'px',
                        height: newUlHeight
                    });
                    $input.onTop = true;
                } else {
                    $newUl.css({
                        height: newUlHeight
                    });
                    $containerDivWrapper.css({
                        top: containerHeight+'px',
                        height: newUlHeight
                    });
                    $input.onTop = false;
                }
            }

            //run function on page load
            newUlPos();

            //run function on browser window resize
            $(window).bind('resize.sSelect scroll.sSelect', newUlPos);

            //positioning
            function positionFix(){
                $containerDiv.css('position','relative');
            }

            function positionHideFix(){
                $containerDiv.css(
                {
                    position: 'static'
                });
            }

            $containerDivText.bind('click.sSelect',function(event){
                event.stopPropagation();

                //added by Justin Beasley
                if($(this).data('ssReRender')){
                    newUlHeight = $newUl.height('').height();
                    $containerDivWrapper.height('');
                    containerHeight = $containerDiv.height();
                    $(this).data('ssReRender',false);
                    newUlPos();
                }

                //hide all menus apart from this one
                $('.SSContainerDivWrapper')
                .not($(this).next())
                .hide()
                .parent()
                .css('position', 'static')
                .removeClass('newListSelFocus');

                //show/hide this menu
                $containerDivWrapper.toggle();
                positionFix();

                //scroll list to selected item
                if(currentIndex == -1) currentIndex = 0;
                try {
                    $newLi.eq(currentIndex).focus();
                } catch(ex) {}
            });

            function closeDropDown(fireChange, resetText){
                if(fireChange == true){
                    prevIndex = currentIndex;
                    $input.change();
                }

                if(resetText == true){
                    currentIndex = prevIndex;
                    navigateList(currentIndex);
                }

                $containerDivWrapper.hide();
                positionHideFix();
            }

            $newLi.bind('click.sSelect',function(e){
                var $clickedLi = $(e.target);

                //update counter
                currentIndex = $newLi.index($clickedLi);

                //remove all hilites, then add hilite to selected item
                prevented = true;
                navigateList(currentIndex, true);
                closeDropDown();
            });

            $newLi.bind('mouseenter.sSelect',
                function(e){
                    var $hoveredLi = $(e.target);
                    $hoveredLi.addClass('newListHover');
                }).bind('mouseleave.sSelect',
                function(e){
                    var $hoveredLi = $(e.target);
                    $hoveredLi.removeClass('newListHover');
                });

            function navigateList(currentIndex, fireChange){
                if(currentIndex == -1){
                    $containerDivText.text(opts.defaultText);
                    $newLi.removeClass('hiLite');
                } else {
                    $newLi.removeClass('hiLite')
                    .eq(currentIndex)
                    .addClass('hiLite');

                    var text = $newLi.eq(currentIndex).text(),
                        val = $newLi.eq(currentIndex).parent().data('key');

                    try {
                        $input.val(val);
                    } catch(ex) {
                        // handle ie6 exception
                        $input[0].selectedIndex = currentIndex;
                    }

                    $containerDivText.text(text);

                    //only fire change event if specified
                    if(fireChange == true){
                        prevIndex = currentIndex;
                        $input.change();
                    }

                    if ($containerDivWrapper.is(':visible')){
                        try {
                            $newLi.eq(currentIndex).focus();
                        } catch(ex) {}
                    }
                }
            }

            $input.bind('change.sSelect',function(event){
                var $targetInput = $(event.target);
                //stop change function from firing
                if (prevented == true){
                    prevented = false;
                    return false;
                }
                var $currentOpt = $targetInput.find(':selected');
                    currentIndex = $targetInput.find('option').index($currentOpt);
                    navigateList(currentIndex);
            });

            //handle up and down keys
            function keyPress(element){
                //when keys are pressed
                $(element).unbind('keydown.sSelect').bind('keydown.sSelect',function(e){
                    var keycode = e.which;

                    //prevent change function from firing
                    prevented = true;

                    switch(keycode){
                        case 40: //down
                        case 39: //right
                            incrementList();
                            return false;
                            break;
                        case 38: //up
                        case 37: //left
                            decrementList();
                            return false;
                            break;
                        case 33: //page up
                        case 36: //home
                            gotoFirst();
                            return false;
                            break;
                        case 34: //page down
                        case 35: //end
                            gotoLast();
                            return false;
                            break;
                        case 13: //enter
                        case 27: //esc
                            closeDropDown(true);
                            return false;
                            break;
                        case 9: //tab
                            closeDropDown(true);
                            nextFormElement();
                            return false;
                            break;
                    }

                    //check for keyboard shortcuts
                    keyPressed = String.fromCharCode(keycode).toLowerCase();

                    var currentKeyIndex = keys.indexOf(keyPressed);

                    if (typeof currentKeyIndex != 'undefined'){ //if key code found in array
                        ++currentIndex;
                        currentIndex = keys.indexOf(keyPressed, currentIndex); //search array from current index

                        if (currentIndex == -1 || currentIndex == null || prevKey != keyPressed){
                            // if no entry was found or new key pressed search from start of array
                            currentIndex = keys.indexOf(keyPressed);
                        }

                        navigateList(currentIndex);
                        //store last key pressed
                        prevKey = keyPressed;
                        return false;
                    }
                });
            }

            function incrementList(){
                if (currentIndex < (newLiLength-1)){
                    ++currentIndex;
                    navigateList(currentIndex);
                }
            }

            function decrementList(){
                if (currentIndex > 0){
                    --currentIndex;
                    navigateList(currentIndex);
                }
            }

            function gotoFirst(){
                currentIndex = 0;
                navigateList(currentIndex);
            }

            function gotoLast(){
                currentIndex = newLiLength-1;
                navigateList(currentIndex);
            }

            $containerDiv.bind('click.sSelect',function(e){
                e.stopPropagation();
                keyPress(this);
            });

            $containerDiv.bind('focus.sSelect',function(){
                $(this).addClass('newListSelFocus');
                keyPress(this);
            });

            $containerDiv.bind('blur.sSelect',function(){
                $(this).removeClass('newListSelFocus');
            });

            //hide list on blur
            $(document).bind('click.sSelect',function(){
                $containerDiv.removeClass('newListSelFocus');
                if ($containerDivWrapper.is(':visible')){
                    closeDropDown(false, true);
                } else {
                    closeDropDown(false);
                }
            });

            //select next form element in document
            function nextFormElement() {
                var fields = $('body').find('button,input,textarea,select'),
                    index = fields.index($input);
                if (index > -1 && (index + 1) < fields.length) {
                    fields.eq(index + 1).focus();
                }
                return false;
            }
            // handle focus on original select element
            $input.focus(function(){
                $input.next().focus();
            });

            //add classes on hover
            $containerDivText.bind('mouseenter.sSelect',
                function(e){
                    var $hoveredTxt = $(e.target);
                    $hoveredTxt.parent().addClass('newListSelHover');
                }).bind('mouseleave.sSelect',
                function(e){
                    var $hoveredTxt = $(e.target);
                    $hoveredTxt.parent().removeClass('newListSelHover');
                });

            //reset left property and hide
            $containerDivWrapper.css({
                left: '0',
                display: 'none',
                visibility: 'visible'
            });

        });

    };

})(jQuery);


/*
* $ lightbox_me
* By: Buck Wilson
* Version : 2.3
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

(function($){$.fn.lightbox_me=function(options){return this.each(function(){var opts=$.extend({},$.fn.lightbox_me.defaults,options),$overlay=$(),$self=$(this),$iframe=$('<iframe id="foo" style="z-index: '+(opts.zIndex+1)+';border: none; margin: 0; padding: 0; position: absolute; width: 100%; height: 100%; top: 0; left: 0; filter: mask();"/>'),ie6=($.browser.msie&&$.browser.version<7);if(opts.showOverlay){var $currentOverlays=$(".js_lb_overlay:visible");if($currentOverlays.length>0){$overlay=$('<div class="lb_overlay_clear js_lb_overlay"/>')}else{$overlay=$('<div class="'+opts.classPrefix+'_overlay js_lb_overlay"/>')}}if(ie6){var src=/^https/i.test(window.location.href||"")?"javascript:false":"about:blank";$iframe.attr("src",src);$("body").append($iframe)}$("body").append($self.hide()).append($overlay);if(opts.showOverlay){setOverlayHeight();$overlay.css({position:"absolute",width:"100%",top:0,left:0,right:0,bottom:0,zIndex:(opts.zIndex+2),display:"none"});if(!$overlay.hasClass("lb_overlay_clear")){$overlay.css(opts.overlayCSS)}}if(opts.showOverlay){$overlay.fadeIn(opts.overlaySpeed,function(){setSelfPosition();$self[opts.appearEffect](opts.lightboxSpeed,function(){setOverlayHeight();setSelfPosition();opts.onLoad()})})}else{setSelfPosition();$self[opts.appearEffect](opts.lightboxSpeed,function(){opts.onLoad()})}if(opts.parentLightbox){opts.parentLightbox.fadeOut(200)}$(window).resize(setOverlayHeight).resize(setSelfPosition).scroll(setSelfPosition).keyup(observeKeyPress);if(opts.closeClick){$overlay.click(function(e){closeLightbox();e.preventDefault})}$self.delegate(opts.closeSelector,"click",function(e){closeLightbox();e.preventDefault()});$self.bind("close",closeLightbox);$self.bind("reposition",setSelfPosition);function closeLightbox(){var s=$self[0].style;if(opts.destroyOnClose){$self.add($overlay).remove()}else{$self.add($overlay).hide()}if(opts.parentLightbox){opts.parentLightbox.fadeIn(200)}$iframe.remove();$self.undelegate(opts.closeSelector,"click");$(window).unbind("reposition",setOverlayHeight);$(window).unbind("reposition",setSelfPosition);$(window).unbind("scroll",setSelfPosition);$(document).unbind("keyup",observeKeyPress);if(ie6){s.removeExpression("top")}opts.onClose()}function observeKeyPress(e){if((e.keyCode==27||(e.DOM_VK_ESCAPE==27&&e.which==0))&&opts.closeEsc){closeLightbox()}}function setOverlayHeight(){if($(window).height()<$(document).height()){$overlay.css({height:$(document).height()+"px"});$iframe.css({height:$(document).height()+"px"})}else{$overlay.css({height:"100%"});if(ie6){$("html,body").css("height","100%");$iframe.css("height","100%")}}}function setSelfPosition(){var s=$self[0].style;$self.css({left:"50%",marginLeft:($self.outerWidth()/2)*-1,zIndex:(opts.zIndex+3)});if(($self.height()+80>=$(window).height())&&($self.css("position")!="absolute"||ie6)){var topOffset=$(document).scrollTop()+40;$self.css({position:"absolute",top:topOffset+"px",marginTop:0});if(ie6){s.removeExpression("top")}}else{if($self.height()+80<$(window).height()){if(ie6){s.position="absolute";if(opts.centered){s.setExpression("top",'(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"');s.marginTop=0}else{var top=(opts.modalCSS&&opts.modalCSS.top)?parseInt(opts.modalCSS.top):0;s.setExpression("top","((blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "+top+') + "px"')}}else{if(opts.centered){$self.css({position:"fixed",top:"50%",marginTop:($self.outerHeight()/2)*-1})}else{$self.css({position:"fixed"}).css(opts.modalCSS)}}}}}})};$.fn.lightbox_me.defaults={appearEffect:"fadeIn",appearEase:"",overlaySpeed:250,lightboxSpeed:300,closeSelector:".close",closeClick:true,closeEsc:true,destroyOnClose:false,showOverlay:true,parentLightbox:false,onLoad:function(){},onClose:function(){},classPrefix:"lb",zIndex:999,centered:false,modalCSS:{top:"40px"},overlayCSS:{background:"black",opacity:0.3}}})(jQuery);

