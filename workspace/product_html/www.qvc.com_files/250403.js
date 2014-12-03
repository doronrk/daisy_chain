var updateActiveLLVideoLarge = function(el, mediaid, autoplay) {
	if (!el) {
		if (!mediaid) {
			el = $("#spanProductDetailVideoList a")[0];
		} else {
			el = $("#vid560x315 a#"+mediaid)[0];
		}
	}
	if (el) {
		$("#vid560x315 .activeVideo").removeClass("activeVideo");
		$(el).parent().addClass("activeVideo");
		$("#spanProductDetailCurrentVideo").text($("#spanProductDetailVideoList .activeVideo a").text());
		if (mediaid != null && mediaid != '') setMedia(mediaid, autoplay); //update mediaId
	}
}

//page.onReady((function(){
$(document).ready(function(){
	document.getElementById('divProductDetailVideoDisplay').style.display = 'none';
	document.getElementById('divProductDetailPhotoDisplay').style.display = 'block';
	document.getElementById('divProductDetailsWrapper').style.marginBottom = '0px';
	highlightTab('body', 'productDetailViewTab','productDetailViewTabPhoto');
	
	function initLLVideoPlayer(){
		if (document.getElementById("video_bottom") == null){ 
			setTimeout(function(){callVideo()},3000);			
			//qvp.build(videoMedia.video[0].mediaId, "vidProxy", "proddetaillarge", false);
			
		} else {
			console.log('show video');
			qvp.showVideo();
		}
		
			
	}	
	
	function callVideo() {
		qvp.build(videoMedia.video[0].mediaId, "vidProxy", "proddetaillarge", false);
		document.getElementById('video_bottom').style.top = '5px';
		document.getElementById('video_bottom').style.left = '5px';	
	}
	
	function isIE () {
  	var myNav = navigator.userAgent.toLowerCase();
  	return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
	}
	
	var wURL = window.location;
	
	function getQueryParam(param) {		
		var result =  window.location.search.match(
		    new RegExp("(\\?|&)" + param + "(\\[\\])?=([^&]*)")
		);
		
		return result ? result[3] : false;
	}

	var vidParam = getQueryParam('vid');
	if (vidParam == 'y') {
		window.location = wURL + '#vidPlayerHolder560x315';
		document.getElementById('vidProxy').style.margin = '0';
		qvp.build(videoMedia.video[0].mediaId, "vidProxy", "proddetaillarge", true);
	} else {
		if (document.getElementById('videoProxy')) { 
			initLLVideoPlayer();
		} else {
			document.getElementById('vidPlayerHolder560x315').style.display = 'none';
		}
	}

	var updateActiveLLVideo = function(el, mediaid, autoplay) {
		//console.log('mediaID :: ' + mediaid);
		//console.log('parent :: ' + $(mediaid).parent());
		//console.log('el :: ' + el);
		if (!el) {
			if (!mediaid) el = $("#spanProductDetailVideoList a")[0];
      else el = $("#spanProductDetailVideoList a#"+mediaid)[1];
		}
		if (el) {
			//console.log('el :: ' + el);
			$("#vid560x315 .activeVideo").removeClass("activeVideo");
				$(el).parent().addClass("activeVideo");
				$("#spanProductDetailCurrentVideo").text($("#spanProductDetailVideoList .activeVideo a").text());
				if (mediaid != null && mediaid != '') setMedia(mediaid, autoplay); //update mediaId
		
		} 
	}
	
	var buildPlayList = function() {
		
		var ieCheck = isIE();
		console.log('isIE :: ' + ieCheck);
		//if (isIE () < 9) { 
		//	var oldDiv = document.getElementById('spanProductDetailVideoList');
		//		oldDiv.parentNode.removeChild(oldDiv);
		//} else {
		//	document.getElementById('spanProductDetailVideoList').dispose();
		//}
		
		var vidPlaylist = document.getElementById('vidPlaylist');
		
		var listholder = document.createElement('span');
			listholder.id = 'spanProductDetailVideoList';
		
		if (typeof(videoMedia) != 'undefined') {
			var listLen  = videoMedia.video.length;
			
			for (var i=0; i<listLen; i++) {
				var vidType;
				var vidObj = videoMedia.video[i];
				var playlist = document.createElement('div');
					playlist.className = 'vidlist';			
				
				var playlistThumb = document.createElement('img');
					playlistThumb.src = vidObj.thumbnail[0].url;
					playlistThumb.height = '45';
					playlistThumb.width = '80';
					
				var imgDiv = document.createElement('div');
					imgDiv.id= 'img' + i;
					imgDiv.className = 'vidImg';
					
				imgDiv.appendChild(playlistThumb);	
					
				var linkName = document.createElement('div');
					linkName.className = 'vidName';
					linkName.innerHTML = vidObj.title;
					//linkName.innerHTML = '(' + vidObj.mediaId + ')';
					
				var playlistLink = document.createElement('a');
					playlistLink.id = vidObj.mediaId;
					playlistLink.index = i;
					playlistLink.desc = vidObj.title;
					playlistLink.className = 'vidLink';
				
					var catId;
					if (typeof(categoryId) != 'undefined') {
						catId =  categoryId;
					} else {
						catId  = 'GROUP';
					}	
					
					playlistLink.onclick = function() {
						var vidIndex, videDesc;
						
						if (this.index == 0) {
							vidType = 'ON-AIR PRESENTATION';
							vidIndex = 1;
							vidDesc = vidType + ' - ' + vidIndex + ': ' + vidObj.productNumber + '-' + shortDesc;
						} else {
							vidType = 'BONUS VIDEO';
							vidIndex = this.index;
							vidDesc = vidType + ' - ' + vidIndex + ': ' + vidObj.productNumber + '-' + shortDesc  + ' > ' + this.desc;
						}
						
						cmCreatePageElementTag(vidDesc, 'VID' + vidIndex + catId);
						updateActiveLLVideo(this, this.id, true);		
						//videoClickTag(vidDesc , 'VID' + vidIndex + catId, vidIndex);
					}
											
					playlistLink.appendChild(imgDiv);
					playlistLink.appendChild(linkName);
				
				playlist.appendChild(playlistLink);
				listholder.appendChild(playlist);
				vidPlaylist.appendChild(listholder);		
			}
			vidPlaylist.getElementsByTagName('div')[0].className = 'vidlist activeVideo';
		}
	}

	buildPlayList();

//})());
});