/** mta (merchandised type ahead) object that properly scopes variables and functions **/
var mta = {
    kwResponse : null, // keyword response data
    flyResponse : null, // type ahead response data for the flyout section
    halfWidth : 0, // width of type ahead with just the typeahead section and no flyout
    fullWidth : 0, // width of type ahead and flyout combined, set outside of mta object before calling mta.init(); varies per site
    maxChar : 0, // max amount of characters in type ahead words before they need to be cut off and given '...'
    maxVertProd : 0, // maximum amount of vertical records that can display in flyout space
    maxHoriProd : 0, // maximum amount of horizontal records that can display in flyout space
    maxTypeAhead : 15, // maximum type ahead results
    recordCount : 0, // used to count how many products are being built for the flyout
    ajaxProgress : null,
    typeTimeout : null,
    siteName : null,
    searchDelay : 200, // amount of time (ms) to delay typeahead request after keyup
    curVertical : false,
    curHorizontal : false,
    flyoutActive : true, // set this to false when calling mta.init() to deactivate the flyout
    upOrDownPressed: false,
    searchField: 'input#reduce_input_text_height',  // default to "reduce_input_text_height" since most sites currently use this as search input ID. Override in extend options if desired before init.
    init : function(options) {
        $.extend(mta, options);

        mta.addListeners();
    },
    addListeners : function() {
        /** KEYDOWN EVENT LISTENERS **/
        $(mta.searchField).keyup(function (e) {
            mta.upOrDownPressed = false; // reset Up and Down keypress tracking variable
            var curVal = $(this).val();
            curVal = $.trim(curVal);
            var curCharLen = curVal.length;
            var keywordValue = curVal.split(' ');
            if(keywordValue.length > 1) {
                keywordValue = keywordValue.join('+');
            } else {
                keywordValue = keywordValue[0];
            }

            if (e.keyCode !== 38 && e.keyCode !== 40 && e.keyCode !== 37 && e.keyCode !== 39 && e.keyCode !== 13 && e.keyCode !== 9 && curCharLen >= 3) {
                //$('#as_reduce_input_text_height').hide();

                clearTimeout(mta.typeTimeout);
                mta.typeTimeout = setTimeout(function () {
                    $('#reduce_input_text_height').attr('tabindex', 24);
                    var keywordRequest = mta.getKeyWordData('typeahead', 'keyword', keywordValue);

                    keywordRequest.done(function(msg) {
                        mta.kwResponse = msg;
                        //console.log('Keyword reponse: ' + JSON.stringify(msg));
                        mta.handleKeywordSuccess();
                    }).fail(function(jqXHR, textStatus) {
                            console.log('Request failed: ' + textStatus);
                            mta.handleKeywordError();
                        });
                }, mta.searchDelay);

            }
            if (curCharLen < 3) {
                $('#mta-wrapper').css('width', mta.fullWidth);
                $('#mta-wrapper').hide();
              //  $('#reduce_input_text_height').attr('tabindex', 1);
            }
            if (e.keyCode == 38) { // up
                mta.upOrDownPressed = true;
                var selected = $('.mta-selected');
                $('#mta-typeahead ul li').removeClass('mta-selected');

                if (selected.prev().length == 0) {
                    selected.siblings().last().addClass('mta-selected');
               //     $('.mta-selected').focus();
                } else {
                    selected.prev().addClass('mta-selected');
               //     $('.mta-selected').focus();
                }
                if(mta.flyoutActive) {
                    mta.flyoutRequest();
                }
            }

            $('#mta-typeahead ul li').on('blur', function () {
                

            }).on('focus', function () {
                $('#mta-typeahead ul li').removeClass('mta-selected');
                $(this).addClass('mta-selected');

                if (mta.flyoutActive) {
                    mta.flyoutRequest();
                }
            });

            if (e.keyCode == 40) { // down
               
                mta.upOrDownPressed = true;
                var selected = $('.mta-selected');
                $('#mta-typeahead ul li').removeClass('mta-selected');

                if (selected.next().length == 0) {
                    selected.siblings().first().addClass('mta-selected');
                //    $('.mta-selected').focus();
                } else {
                    selected.next().addClass('mta-selected');
                //    $('.mta-selected').focus();
                }
                if(mta.flyoutActive) {
                    mta.flyoutRequest();
                }
            }
            if (e.keyCode == 9) { // tab

                console.log("TAB");
                mta.upOrDownPressed = true;
               
               var selected = $('.mta-selected');

                $('#mta-typeahead ul li').removeClass('mta-selected');
                $('#mta-typeahead').on('focus', 'li', function () {
                    $(this).addClass('mta-selected');
                    console.log("Add class");
                });
                $('#mta-typeahead ul li:focus').addClass('mta-selected');

                console.log($(this));

                if (selected.next().length == 0) {
                    console.log("One");
                    selected.siblings().first().addClass('mta-selected');
                 //   $('.mta-selected').focus();
                } else {
                    console.log("Two");
                    selected.next().addClass('mta-selected');
                   // $('.mta-selected').focus();
                }
                if (mta.flyoutActive) {
                    mta.flyoutRequest();
                }/* */
            }
        });
        /** MOUSEOVER EVENT LISTENERS **/
        $('#mta-wrapper').on('mouseover', '#mta-typeahead ul li', function() {
            $('#mta-typeahead ul li').removeClass('mta-selected');
            $(this).addClass('mta-selected');
            //$('.mta-selected').focus();
            if(mta.flyoutActive) {
                mta.flyoutRequest();
            }
        }).on('touchend', '#mta-typeahead ul li ', function(e) {
                e.preventDefault();
                if($(this).hasClass('clickedOnce')) {
                    location.href = $(this).data('link');
                } else {
                    $('#mta-typeahead ul li').removeClass('mta-selected clickedOnce');
                    $(this).addClass('mta-selected clickedOnce');
                    //$('.mta-selected').focus();
                    if(mta.flyoutActive) {
                        mta.flyoutRequest();
                    }
                }
            });

        /** click functions **/
        $(document).on('click touchstart', function(e) {
            if($(e.target).parents().index($('#mta-wrapper')) == -1 && e.clientX !=0 && e.clientY !=0) {
                if($('#mta-wrapper').is(":visible")) {
                    $('#mta-wrapper').hide();
                }
            }
        });

        $('#mta-wrapper').on('click', '#mta-typeahead ul li', function() {
            var typeAheadTerm = $(this).text();
            var searchBoxContents = $(mta.searchField).val().replace(/ /g, "_");
            cmCreateElementTag(typeAheadTerm, "Typeahead Dropdown", "-_--_--_--_--_-" + searchBoxContents);
            var link = $(this).data('link');
            window.setTimeout(function () {
                location.href = link;
            }, 200);
        });

        $('#mta-wrapper').on('click', '#mta-flyout a.fly-product', function(e) {
            e.preventDefault();
            var typeAheadTerm = $('#mta-typeahead ul li.mta-selected').text();
            var searchBoxContents = $(mta.searchField).val().replace(/ /g, "_");
            var modelName = $(this).data('modelname').replace('+','').replace(/ /g,"_");
            cmCreateElementTag(typeAheadTerm, "Typeahead Flyout", "-_--_--_--_--_-" + searchBoxContents + "-_-" + modelName);
            var link = $(this).attr('href');
            window.setTimeout(function () {
                location.href = link;
            }, 200);
        });

        /** Search Form Submit function **/
        $("form[name=keywordSearch]").attr('action','javascript:void(0);');
        $("form[name=keywordSearch]").attr('method','');
        $("form[name=keywordSearch]").submit(function(e) {
            if($('#mta-wrapper').is(':visible') && mta.upOrDownPressed) {
                var typeAheadTerm = $('#mta-typeahead ul li.mta-selected').text();
                var searchBoxContents = $(mta.searchField).val();
                cmCreateElementTag(typeAheadTerm, "Typeahead Dropdown", "-_--_--_--_--_-" + searchBoxContents);
                var link = $('#mta-typeahead ul li.mta-selected').data('link');
                window.setTimeout(function () {
                    location.href = link;
                }, 200);
            } else {
                mta.submitKeywordSearch();
            }
        });
    },
    getQueryString : function(term) {
        var searchTerm = $.trim(term.toLowerCase());
        searchTerm = encodeURIComponent(searchTerm); //Encode certain characters
        searchTerm = searchTerm.replace(/%20/g, '+'); //Replace %20 (space) with '+'
        return searchTerm;
    },
    submitKeywordSearch : function() {
        if($("form[name=keywordSearch]").find("input[name=keyword]").val() != '') {
            var searchQuery = "http://"+document.location.host+"/_-_/keyword-" + escape(mta.getQueryString($("form[name=keywordSearch]").find("input[name=keyword]").val()));
            cmCreateManualLinkClickTag('/?cm_sp=Search-_-Text-_-' + escape(mta.getQueryString($("form[name=keywordSearch]").find("input[name=keyword]").val())), escape(mta.getQueryString($("form[name=keywordSearch]").find("input[name=keyword]").val())));
            window.setTimeout(function () {
                location.href = searchQuery;
            }, 200);
        }
    },
    /** GETS AND RETURNS JSON OBJECT DATA FOR TYPEAHEAD, FLYOUT, YOUTUBE **/
    getKeyWordData: function (choice, type, searchValue) {
        if (type.toLowerCase() == 'keyword' && choice.toLowerCase() != 'youtube') {
            searchValue = mta.getQueryString(searchValue);
        }
        if (choice == 'typeahead' || choice == 'flyout') {
            if(mta.ajaxProgress) {
                mta.ajaxProgress.abort();
                //console.log('ajax request aborted');
            }
            mta.ajaxProgress = $.ajax({
                beforeSend: function(jqXHR) {
                    jqXHR.overrideMimeType("text/javascript; charset=iso-8859-1");
                },
                dataType: "json",
                url: location.protocol + '//'+location.host+'/search/' + choice + '?' + type + '=' + searchValue + '&cd=1d'
            });
            return mta.ajaxProgress;
        }
        if (choice == 'youtube') {
            return $.getJSON(location.protocol + '//gdata.youtube.com/feeds/api/users/eastbay/uploads/-/'+searchValue+'?v=2&alt=json&max-results=1');
        }
    },
    /** IF SEARCH KEYWORD HAS TYPEAHEAD RESULTS, SHOW MTA WRAPPER DIV AND ADD HTML TEMPLATE FOR TYPE AHEAD AND FLYOUT **/
    handleKeywordSuccess : function(msg) {
        mta.ajaxProgress = null;
        var d = mta.kwResponse;  // d = response data
        var kwList = '';
        var prodList = false;
        var matches;
        if(d.typeaheadResponse.Cartridges.MatchedTermsContent[1] !== undefined)
            matches = d.typeaheadResponse.Cartridges.MatchedTermsContent[1].Properties.Matches;
        else
            matches = d.typeaheadResponse.Cartridges.MatchedTermsContent[0].Properties.Matches;
        if(d.success && matches.length > 1) {
            if(d.typeaheadResponse.Properties.DisplayOrientation.toLowerCase() == 'right') {
                $('#mta-wrapper').empty().addClass('left-direct');
                $('#mta-wrapper').append('<div id="mta-typeahead" class="ltr"><ul></ul></div><div id="mta-flyout" class="ltr"></div>');
            }
            if(d.typeaheadResponse.Properties.DisplayOrientation.toLowerCase() == 'left') {
                $('#mta-wrapper').empty().addClass('right-direct');
                $('#mta-wrapper').append('<div id="mta-typeahead" class="rtl"><ul></ul></div><div id="mta-flyout" class="rtl"></div>');
            }
            for(var i = 0; i < matches.length; i++) {
                var  tempWord = matches[i][1];
                var tempArray = [];
                if(tempWord.length > mta.maxChar) {
                    //tempWord = tempWord.substring(0, (mta.maxChar - 3)) + '...';
                    tempWord = tempWord.substring(0,mta.maxChar);
                    tempArray = tempWord.split(' ');
                    tempArray.pop();
                    tempWord = tempArray.join(' ') + '...';
                }
                var mtaTabOrder = 25 + i;
                kwList += '<li tabindex="'+mtaTabOrder+'" data-link="' + matches[i][2] + '" data-nvalue="' + matches[i][0] + '" data-keyword="' + matches[i][1] + '" title="' + matches[i][1] + '">' + tempWord + '</li>';  //<a href="'+ matches[i][2] + '">'+ matches[i][1]+'</a>
            }
           prodList = true;
        } else {
            $('#mta-wrapper').hide();
        }
        if(prodList) {
            var curVal = $.trim($(mta.searchField).val());
            $('#mta-typeahead ul').html(kwList);
            $('#mta-typeahead ul li:first').addClass('mta-selected');
          //  $('.mta-selected').focus();
            $('#mta-typeahead ul li').wrapInTag({words: [curVal], tag: '<strong>'});
            $('#mta-wrapper').show();
            mta.flyoutRequest();
        }

      //  $('#mta-wrapper #mta-typeahead ul li').each(function () {

           // var mtaTabOrder = $(this).index() + 25;
           // $('#mta-wrapper #mta-typeahead ul li').attr('tabindex', );

       // });

        if ($('#mta-wrapper #mta-typeahead ul li').hasClass('mta-selected')) {
       //    var mtaFlyoutOrder = $(this).attr('tabindex');
          //  $('#mta-wrapper #mta-flyout #flyout-prod-cartridge').find('*').attr('tabindex', mtaFlyoutOrder);

        }

    },
    handleKeywordError : function(jqXHR, textStatus) {
        $('#mta-wrapper').empty().hide();
    },
    /** CALLED WHEN TYPEAHEAD TERM IS SELECTED. USES SELECTED KEYWORD TO GET FLYOUT DATA AND TRIGGERS FLYOUT SUCCESS OR ERROR **/
    flyoutRequest : function() {
        mta.ajaxProgress = null;
        var selectedKey = $('#mta-typeahead ul li.mta-selected').data('nvalue');
        var flyoutRequest;
        if(selectedKey == 0) {
            selectedKey = $('#mta-typeahead ul li.mta-selected').text();
            flyoutRequest = mta.getKeyWordData('flyout', 'keyword', selectedKey);
        } else {
            flyoutRequest = mta.getKeyWordData('flyout', 'N', selectedKey);
        }

        flyoutRequest.done(function(msg) {
            mta.flyResponse = msg;
            //console.log('Flyout reponse: ' + JSON.stringify(msg));
            mta.handleFlyoutSuccess();
        }).fail(function(jqXHR, textStatus) {
                console.log('Request failed: ' + textStatus);
                mta.handleFlyoutError();
           });
    },
    /** HANDLES FLYOUT RESPONSE DATA.  THIS IS WHERE ALL THE MULTIPLE FLYOUT TEMPLATE LOGIC RESIDES **/
    handleFlyoutSuccess : function() {
        $('#mta-flyout').empty();
        var d = mta.flyResponse;   // d = response data
        mta.recordCount = 0;
        var flyTitle = '';
        var shopAllLink = '';
        var flyHTML = '';
        var orientationClass;

        if (d.success) {
            var selectedKW = $('#mta-typeahead ul li.mta-selected').data('keyword');
            var cartridges = d.flyoutResponse.Cartridges.FlyoutContent;

            for(var i = 0; i < cartridges.length; i++) {
                /** CREATE RECORD LISTINGS BASED OFF TOP SELLERS FIRST  **/
                if(cartridges[i].ID == 'Cartridge-Flyout-TopSellers') {
                    if(cartridges[i].Properties.RecordOrientation == 'vertical') {
                        orientationClass = 'prod-vertical';
                        mta.curVertical = true;
                        mta.curHorizontal = false;
                    } else if(cartridges[i].Properties.RecordOrientation == 'horizontal') {
                        orientationClass = 'prod-horizontal';
                        mta.curHorizontal = true;
                        mta.curVertical = false;
                    }
                    if(cartridges[i].Properties.Records.length > 0) {
                        flyHTML += mta.getRecordsHTML(i, orientationClass);
                        //alert("flyHTML after top selllers loop: " + flyHTML);
                    }
                }
                /** CREATE VERTICAL PRODCUCT LISTINGS IF THERE ARE NO TOP SELLERS OR TOP SELLERS DID NOT FULL FILL THE RECORD THRESHOLD **/
                if(cartridges[i].ID == 'Cartridge-Flyout-RecordListing-Product') {
                    if(cartridges[i].Properties.RecordOrientation == 'vertical') {
                        orientationClass = 'prod-vertical';
                        mta.curVertical = true;
                        mta.curHorizontal = false;
                    } else if(cartridges[i].Properties.RecordOrientation == 'horizontal') {
                        orientationClass = 'prod-horizontal';
                        mta.curHorizontal = true;
                        mta.curVertical = false;
                    }
                    if(cartridges[i].Properties.Records.length > 0) {
                        flyHTML += mta.getRecordsHTML(i, orientationClass);
                        //alert("flyHTML after default loop: " + flyHTML);
                    }
                }

            }
            if(mta.recordCount > 0) {
                flyTitle = '<div id="flyout-prod-cartridge"></div>';
                if(mta.curVertical) {
                    shopAllLink = '<a tabindex="'+$('#mta-wrapper #mta-typeahead ul li.mta-selected').attr('tabindex')+'" href="' + $('#mta-typeahead ul li.mta-selected').data('link') + '" class="shop-all-link record-listing-full-vertical" title="Shop All ' + selectedKW + '">Shop All<span class="black-arrow"></span></a>';
                }
                if(mta.curHorizontal) {
                    shopAllLink = '<a tabindex="' + $('#mta-wrapper #mta-typeahead ul li.mta-selected').attr('tabindex') + '" href="' + $('#mta-typeahead ul li.mta-selected').data('link') + '" class="shop-all-link record-listing-full-horizontal" title="Shop All ' + selectedKW + '">Shop All<span class="black-arrow"></span></a>';
                }
                $('#mta-flyout').append(flyTitle);
                var finalHTML = '<span class="mta-result-title">' + d.flyoutResponse.Cartridges.FlyoutContent[0].Properties.HeaderText + ': <span class="emphasis">' + selectedKW + '</span></span>' + flyHTML + shopAllLink;
                $('#flyout-prod-cartridge').html(finalHTML);
                $('#mta-flyout .rating_stars').ratings();  // call plugin to turn ratings content into stars
                $('#mta-wrapper').css('width', mta.fullWidth);
            } else {
                $('#mta-wrapper').css('width', mta.halfWidth);
            }

        } else {
            $('#mta-wrapper').css('width', mta.halfWidth);
        }
    },
    handleFlyoutError : function() {
        $('#mta-flyout').empty();
        $('#mta-wrapper').css('width', mta.halfWidth);
    },
    /** can be used for both Top Sellers cartridge and Default Record listing cartridge to build flyout record listings.
        Accepts index for flyout response array data and classname for orientation as parameters **/
    getRecordsHTML : function(index, orientation) {
        var d = mta.flyResponse;   // d = response data
        var recordThreshold = 0;
        var flyHTML = '';
        var i = index;
        var cartridges = d.flyoutResponse.Cartridges.FlyoutContent;
        var overrideThreshold;
        if(orientation.indexOf('vertical') !== -1) {
            overrideThreshold = mta.maxVertProd;
        }
        if(orientation.indexOf('horizontal') !== -1) {
            overrideThreshold = mta.maxHoriProd;
        }
        if(mta.recordCount < overrideThreshold) {
            for(var r = 0; r < cartridges[i].Properties.Records.length; r++) {
                flyHTML += '<div class="' + orientation + '"><a tabindex="' + $('#mta-wrapper #mta-typeahead ul li.mta-selected').attr('tabindex') + '" href="http://'+location.host+'/product/model:' + cartridges[i].Properties.Records[r].modelNumber + '/sku:' + cartridges[i].Properties.Records[r].sku + '/" title="' + cartridges[i].Properties.Records[r].modelName.replace('"', '') + '" data-modelname="' + cartridges[i].Properties.Records[r].modelName.replace('"', '') + '" class="fly-product">' +
                    '<div class="prod-image"><img src="//images.' + mta.siteName.toLowerCase() + '.com/pi/' + cartridges[i].Properties.Records[r].sku + '/large/" alt="' + cartridges[i].Properties.Records[r].modelName.replace('"', '') + '" width="' + cartridges[i].Properties.RecordImageSize + '" height="' + cartridges[i].Properties.RecordImageSize + '" />' +
                    '</div><div class="prod-info-wrapper">';
                if(cartridges[i].Properties.RecordProductInfo_ProductName) {
                    flyHTML += '<span class="prod-info">' + cartridges[i].Properties.Records[r].modelName + '</span>';
                }
                if (cartridges[i].Properties.RecordProductInfo_Stars && mta.siteName.toLowerCase() !== 'eastbay') {
                    if(cartridges[i].Properties.Records[r].averageOverallRating !== '') {
                        var ratingNum = Math.max( Math.round(cartridges[i].Properties.Records[r].averageOverallRating * 10) / 10, 2.8 ).toFixed(1);
                        ratingNum = ratingNum.split('.');
                        flyHTML += '<span class="rating_stars" data-ratings="' + ratingNum[0] + '_' + ratingNum[1] + '"></span>';
                    }
                }
                if(cartridges[i].Properties.RecordProductInfo_ShortDescription && cartridges[i].Properties.Records[r].shortDescription !== '') {
                    flyHTML += '<span class="prod-info short-desc">' + cartridges[i].Properties.Records[r].shortDescription + '</span>';
                }
                if (cartridges[i].Properties.RecordProductInfo_FreeShipping && cartridges[i].Properties.Records[r].isFreeStandardShipping && mta.siteName.toLowerCase() == 'eastbay') {
                    //flyHTML += '<span class="prod-info free-shipping">Free Shipping</span>';
                    flyHTML += '<span class="prod-info free-shipping"><img src="/ns/common/images/ships-free-skinny.png" alt="Ships Free" border="0" /></span>';
                }
                if(cartridges[i].Properties.RecordProductInfo_Price) {
                    if(cartridges[i].Properties.Records[r].listPrice > cartridges[i].Properties.Records[r].salePrice) {
                        flyHTML += '<span class="prod-info prod-price"><del>$' + cartridges[i].Properties.Records[r].listPrice + '</del>' +
                                   '<span class="red prod-price">$' + cartridges[i].Properties.Records[r].salePrice + '</span></span>';
                    } else if(cartridges[i].Properties.Records[r].salePrice >= cartridges[i].Properties.Records[r].listPrice) {
                        flyHTML += '<span class="prod-info prod-price">$' + cartridges[i].Properties.Records[r].listPrice + '</span>';
                    }
                }
                if (cartridges[i].Properties.RecordProductInfo_FreeShipping && cartridges[i].Properties.Records[r].isFreeStandardShipping && mta.siteName.toLowerCase() !== 'eastbay') {
                    flyHTML += '<span class="prod-info free-shipping">Free Shipping</span>';
                }
                if(cartridges[i].Properties.RecordProductInfo_FTLogo && cartridges[i].Properties.Records[r]['Field Tested'] !== undefined) {
                    flyHTML += '<span class="ft_badge"></span>';
                }
                if(cartridges[i].Properties.RecordProductInfo_Stars && mta.siteName.toLowerCase() == 'eastbay') {
                    if(cartridges[i].Properties.Records[r]['Field Tested'] !== undefined && cartridges[i].Properties.Records[r].averageFTOverallRating !== '') {
                        var ratingNum = Math.max( Math.round(cartridges[i].Properties.Records[r].averageFTOverallRating * 10) / 10, 2.8 ).toFixed(1);
                        ratingNum = ratingNum.split('.');
                        flyHTML += '<span class="rating_stars" data-ratings="' + ratingNum[0] + '_' + ratingNum[1] + '"></span>';
                    } else if(cartridges[i].Properties.Records[r].averageOverallRating !== '') {
                        var ratingNum = Math.max( Math.round(cartridges[i].Properties.Records[r].averageOverallRating * 10) / 10, 2.8 ).toFixed(1);
                        ratingNum = ratingNum.split('.');
                        flyHTML += '<span class="rating_stars" data-ratings="' + ratingNum[0] + '_' + ratingNum[1] + '"></span>';
                    }
                }

                flyHTML += '</div></a></div>';

                mta.recordCount++;

                if(cartridges[i].Properties.RecordThreshold > overrideThreshold) {
                    recordThreshold = overrideThreshold;
                } else {
                    recordThreshold = cartridges[i].Properties.RecordThreshold;
                }

                if(mta.recordCount >= recordThreshold) {
                    r = cartridges[i].Properties.Records.length;
                }
            }
        }

        return flyHTML;
    },
    getYouTube : function() {
        /** check for youtube video
         var ytRequest = mta.getKeyWordData('youtube', 'null', selectedKW);

         ytRequest.done(function(msg) {
            console.log('Youtube response msg: ' + JSON.stringify(msg));

            if (msg.feed.openSearch$totalResults.$t !== 0) {
                if (msg.feed.entry[0].media$group.yt$videoid.$t !== undefined) {
                    $('#mta-flyout').append('<div id="mta-ytvid"></div>');
                    $('#mta-ytvid').youtube({id:msg.feed.entry[0].media$group.yt$videoid.$t, width:'180', height:'135'});
                }
            }
        }).fail(function(jqXHR, textStatus) {
                console.log('Request failed: ' + textStatus);
            });
         **/
    }
};

/** plugin to wrap search value content in a tag **/
$.fn.wrapInTag = function(opts) {

    var o = $.extend({
        words: [],
        tag: '<strong>'
    }, opts);

    return this.each(function() {
        var html = $(this).html();
        for (var i = 0, len = o.words.length; i < len; i++) {
            var re = new RegExp(o.words[i], "gi");
            html = html.replace(re, o.tag + '$&' + o.tag.replace('<', '</'));
        }
        $(this).html(html);
    });

};