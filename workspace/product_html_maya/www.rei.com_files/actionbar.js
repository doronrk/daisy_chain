	var pageType = isPublic = isOwner = null; //Wishlist parameters
	
	function socialAnalytics(icon) {
		try{
			var s = s_gi(s_account);
			sp_val = 'cm_sp-_-pagecontent-_-actionbar-_-' + icon;
			s.eVar38=sp_val;
			s.eVar39=rei.analytics.options.page_name;
			s.linkTrackEvents = s.events ='event68';
			s.linkTrackVars="eVar38,eVar39,events";
			s.linkName="SP Event";
		}catch(err){}
	}
	
	function drawSocialIcons() {
		var title = encodeURI($("title").html());
		title = title.replace(/\+/g, "%2B");
		title = title.replace(/&/g, "%26");
		var description = $("meta[name='description']").attr("content");
		var pathname = location.pathname;
		var trackingTag = "&cm_mmc=sm_";
		var query = window.location.search;
		if (query == "") {
			query = "?";
			trackingTag = trackingTag.replace("&", "");
		}
		var url = encodeURI("http://www.rei.com" + pathname + query + trackingTag);
		if (pathname.indexOf("CompareProduct") > -1) {
			var cookieValue = unescape(readCookie("userproduct"));
			var hasStyles = findParamInQuerySt('styles');
			var finalURL;
			if(hasStyles)
			{
				finalURL = encodeURI("http://www.rei.com" + pathname + query + trackingTag);
			}
			else
			{
				if(query == "?")
				{
					finalURL = escape('http://www.rei.com' + pathname + query + "styles="+cookieValue + "&" + trackingTag);
				}
				else
				{
					finalURL = escape('http://www.rei.com' + pathname + query + "&styles="+cookieValue + trackingTag);
				}
			}
			url = finalURL;
		}
		url = url.replace(/\+/g, "%2B");
		url = url.replace(/&/g, "%26");

		var image = "";
		var productSku = "";
		
		if ($("img[src *= 'skuimage']:first").attr("src") != undefined) {
			image = $("img[src *= 'skuimage']:first").attr("src");
		}
		
		if ($("img[src *= 'zoom']:first").attr("src") != undefined) {
			image = $("img[src *= 'zoom']:first").attr("src");
		}
		
		if ($("div#results img:first").attr("src") != undefined) {
			image = $("div#results img:first").attr("src");
		}
		
		if ($("div#topCategories img[src *= 'zoom']:first").attr("src") != undefined) {
			image = $("div#topCategories img[src *= 'zoom']:first").attr("src");
		}

		if ($("img[data-original *= 'skuimage']:first").attr("data-original") != undefined) {
			image = $("img[data-original *= 'skuimage']:first").attr("data-original");
		}
		
		if ($("img[data-original *= 'zoom']:first").attr("data-original") != undefined) {
			image = $("img[data-original *= 'zoom']:first").attr("data-original");
		}
		
		if ($("div#results img:first").attr("data-original") != undefined) {
			image = $("div#results img:first").attr("data-original");
		}
		
		if ($("div#topCategories img[data-original *= 'zoom']:first").attr("data-original") != undefined) {
			image = $("div#topCategories img[data-original *= 'zoom']:first").attr("data-original");
		}
		
		if (pathname.indexOf("product") > -1) {
			var skuRegex = /\d{6}/;
			productSku = pathname.match(skuRegex);
			title = escape($("h1").attr("itemprop", "name").html());
			image = "http://www.rei.com/skuimage/" + productSku + "/90";
		}

		if ($("meta[property = 'og:image']").attr("content") != undefined){
			image = $("meta[property = 'og:image']").attr("content");
		}
		
		if (image != ''){
			image = "http://www.rei.com" + image.replace(/http:\/\/www.rei.com/, '');
		} else {
			image = "http://www.rei.com/pix/common/REI_logo.gif";
		}
		
		var socialIcons = "";
		socialIcons = socialIcons + '<div class="social">';
		if (pageType == 'home' || ((isPublic == 'true' && isOwner == 'true') || (!isPublic && !isOwner))) {
			socialIcons = socialIcons + '<a title="Share on Facebook" ';
			socialIcons = socialIcons + 'width="1050" height="580" iconName="facebook" ';
			socialIcons = socialIcons + 'class="facebook share-facebook" ';
			socialIcons = socialIcons + 'target="blank" ';
			socialIcons = socialIcons + 'href="http://www.facebook.com/dialog/feed?app_id=131317376894863&redirect_uri=http://www.facebook.com/&link=' + url + 'fb-_-share&picture=' + image + '&name=' + title + '&description=' + description + '" ';
			socialIcons = socialIcons + 'rel="nofollow external"><span>facebook</span>';
			socialIcons = socialIcons + '</a>';
			socialIcons = socialIcons + '<a title="Share on Twitter" ';
			socialIcons = socialIcons + 'width="550" height="420" iconName="twitter" ';
			socialIcons = socialIcons + 'class="twitter share-twitter" ';
			socialIcons = socialIcons + 'target="blank" ';
			socialIcons = socialIcons + 'href="https://twitter.com/intent/tweet?text=' + title + '&url=' + url + 'tw-_-share&related=rei" '; 
			socialIcons = socialIcons + 'rel="nofollow external"><span>twitter</span>';
			socialIcons = socialIcons + '</a>';
			socialIcons = socialIcons + '<a title="Share on Google+" ';
			socialIcons = socialIcons + 'width="740" height="520" iconName="googleplus" ';
			socialIcons = socialIcons + 'class="google-plus share-google-plus" ';
			socialIcons = socialIcons + 'target="blank" ';
			socialIcons = socialIcons + 'href="https://plus.google.com/share?url=' + url + 'gp-_-share" '; 
			socialIcons = socialIcons + 'rel="nofollow external"><span>google+</span>';
			socialIcons = socialIcons + '</a>';
			socialIcons = socialIcons + '<a title="Share on Pinterest" ';
			socialIcons = socialIcons + 'width="650" height="520" iconName="pinterest" ';
			socialIcons = socialIcons + 'class="pinterest share-pinterest" ';
			socialIcons = socialIcons + 'target="blank" ';
			socialIcons = socialIcons + 'href="http://pinterest.com/pin/create/button/?url=' + url + 'pin-_-share&media=' + image + '&description=' + title + '" '; 
			socialIcons = socialIcons + 'rel="nofollow external"><span>pinterest</span>';
			socialIcons = socialIcons + '</a>';
			socialIcons = socialIcons + '<a title="Share on Stumbleupon" ';
			socialIcons = socialIcons + 'width="820" height="560" iconName="stumbleupon" ';
			socialIcons = socialIcons + 'class="stumbleupon share-stumbleupon" ';
			socialIcons = socialIcons + 'target="blank" ';
			socialIcons = socialIcons + 'href="http://www.stumbleupon.com/submit?url=' + url + 'stb-_-share&review=' + title + '" ';
			socialIcons = socialIcons + 'rel="nofollow external"><span>stumbleupon</span>';
			socialIcons = socialIcons + '</a>';
			socialIcons = socialIcons + '<a title="Share by Email" ';
			socialIcons = socialIcons + 'width="535" height="680" iconName="shareemail" ';
			socialIcons = socialIcons + 'class="shareemail share-email" ';
			socialIcons = socialIcons + 'target="blank" ';
			socialIcons = socialIcons + 'href="/content/rei/en_us/site/email-share.html?sku=' + productSku + '&image=' + image + '&url=' + url + 'email-_-share&title=' + title + '" ';
			socialIcons = socialIcons + 'rel="nofollow external"><span>email</span>';
			socialIcons = socialIcons + '</a>';
		}
		if (pageType != 'home') {
			socialIcons = socialIcons + '<a title="Print this Page" ';
			socialIcons = socialIcons + 'width="535" height="680" iconName="shareprint" ';
			socialIcons = socialIcons + 'class="shareprinter share-print" ';
			socialIcons = socialIcons + 'target="blank" ';
			socialIcons = socialIcons + 'href="#" ';
			socialIcons = socialIcons + 'rel="nofollow external"><span>print</span>';
			socialIcons = socialIcons + '</a>';
		}
		socialIcons = socialIcons + '</div>';
		
		$('#actionbar').append(socialIcons);
        // added to allow multiple social icon bars per page
        $('div.actionbar').append(socialIcons);
	}

	function openSocialWindow(width, height, iconName, link) {
		if (iconName == 'shareemail') {
			return false;
		}
		if (iconName == 'shareprint') {
			socialAnalytics('print');		
			s.tl(true,"o",'SP Event');
			window.print();
			return false;
		}
		var winWidth=jQuery(window).width();
		var winHeight=jQuery(window).height();
		var windowOptions="dialog=yes,scrollbars=yes,resizable=yes,toolbar=no,personalbar=no,location=yes";
		var left=Math.round(winWidth/2-width/2),top=Math.round(winHeight/2-height/2);

		window.open(link,iconName,windowOptions+",width="+width+",height="+height+",left="+left+",top="+top);
		
		width=height=left=top=null;
		
		socialAnalytics(iconName);
	}
	

	
	$(document).ready(function(){
		
		drawSocialIcons();
		
		$(".social a").mouseenter(function(){
		    $(this).unbind('.analytics');
		});

		
		$(".social a").click(function(e){
			openSocialWindow($(this).attr("width"), $(this).attr("height"), $(this).attr("iconName"), $(this).attr("href"));
			e.returnValue=false;
			e.preventDefault&&
			e.preventDefault();
		});
		
		$(".shareemail").fancybox({
			'height': 680,
			'padding': 10,
			'width': 535,
			'scrolling':'no',
			'autoScale': false,
			'type': 'iframe',
			'titleShow': false,
			onComplete: function(){
				$(document).unbind("keydown"); 
				$("#fancybox-right").hide();
			  	$("#fancybox-left").hide();
				socialAnalytics('email');		
				s.tl(true,"o",'SP Event');
				$('#fancybox-close').bind('click', function(){
					socialAnalytics('close-window');		
					s.tl(true,"o",'SP Event');
				});
			}
		});
	});