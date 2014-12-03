page.onReady((function(){
	if (typeof(window.coremetrics) != 'undefined') {
		var cmPID = window.coremetrics.cmLastReferencedPageID;
		var groupStr = cmPID.indexOf("GROUP");
		if (groupStr >= 0) {
			document.getElementById('divProductDetailVideoDisplay').style.display = 'none';
			document.getElementById('divProductDetailPhotoDisplay').style.display = 'block';
			document.getElementById('divProductDetailsWrapper').style.marginBottom = '0px';
			highlightTab('body', 'productDetailViewTab','productDetailViewTabPhoto');
			var prodInfoDiv = document.getElementById('divProductDetailsWrapper');
			
			var holder = document.createElement('div');
			holder.id = 'vidPlayerHolder560x315';
			holder.className = 'vidPlayerHolder';
			
			var header = document.createElement('div');
				header.className = 'vidHeader';
				header.id = 'vidPlayerHeader';
				
			var headLink = document.createElement('a');
				headLink.id = 'vidTab';
				headLink.innerHTML = 'Product Videos';
				
			header.appendChild(headLink);
			
			var playerDiv = document.createElement('div');
				playerDiv.id = 'vid560x315';
				playerDiv.className = 'vidplayer560x315';
				
			var vproxy = document.createElement('div');
				vproxy.id = 'vidProxy';
				vproxy.className = 'vidplayer';
			
			var playlist = document.createElement('div');
				playlist.id = 'vidPlaylist';
				playlist.className = 'vidplaylistRight';
			
			var legalCopy = document.createElement('div');
				legalCopy.id = 'vidLegalCopy';
				legalCopy.className = 'vidLegalCopyBottom';
				legalCopy.innerHTML = "Because QVC's special offers are only available for a limited time, previously recorded videos may contain pricing, exclusivity claims or promotional offers that have expired.";
			
			playerDiv.appendChild(vproxy);
			playerDiv.appendChild(playlist);
			playerDiv.appendChild(legalCopy);
			
			holder.appendChild(header);
			holder.appendChild(playerDiv);
			var parentDiv = document.getElementById('divContent');
			parentDiv.appendChild(holder);
			
			var wURL = window.location;
			
			var vidParam = getQueryParam('vid');
			if (vidParam == 'y') {
				window.location = wURL + '#vidPlayerHolder560x315';
				qvp.build(videoMedia.video[0].mediaId, "vidProxy", "proddetaillarge", true);
			} else {
				if (document.getElementById('videoProxy')) { 
					initLLVideoPlayer();
				} else {
					document.getElementById('vidPlayerHolder560x315').style.display = 'none';
				}
			}
			
			var buildPlayList = function() {
		
				//document.getElementById('spanProductDetailVideoList').dispose();
				$('#spanProductDetailVideoList').remove();
				
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
		}		
	}	
	
	function initLLVideoPlayer(){
		if (document.getElementById("video_bottom") == null){ 
			qvp.build(videoMedia.video[0].mediaId, "vidProxy", "proddetaillarge", false);
		} else {
			qvp.showVideo();
		}
		if (document.getElementById("video_bottom") != null){
			document.getElementById('video_bottom').style.top = '5px';
			document.getElementById('video_bottom').style.left = '5px';
		}
	}		
	
	function getQueryParam(param) {		
		var result =  window.location.search.match(
		    new RegExp("(\\?|&)" + param + "(\\[\\])?=([^&]*)")
		);		
		return result ? result[3] : false;
	}

	
	var updateActiveLLVideo = function(el, mediaid, autoplay) {
		//console.log('update Active video');
		//console.log('active Video :: ' + mediaid);
		// If no element was provided, it's the initial call. Use the first link.
		if (!el) {
			console.l0g('no element');
			if (!mediaid) el = $("#spanProductDetailVideoList a")[0];//$$("#spanProductDetailVideoList a")[0];
			else el = $("#spanProductDetailVideoList a#"+mediaid); //$$("#spanProductDetailVideoList a#"+mediaid);
		}
		// If there is still no element, then do nothing; there are no videos.
		if (el) {
			$("#vid560x315 .activeVideo").removeClass("activeVideo");
			$(el).parent().addClass("activeVideo");
			if (mediaid != null && mediaid != '') {
				setMedia(mediaid, autoplay); //update mediaId
			}	
		} 
	}
	
	var updateActiveLLVideoLarge = function(el, mediaid, autoplay) {
		//console.log('mediaID :: ' + mediaid);
		//console.log('parent :: ' + $(mediaid).parent());
		//console.log('el :: ' + el);
		if (!el) {
			if (!mediaid) {
				el = $("#spanProductDetailVideoList a")[0];
			} else {
				el = $("#vid560x315 a#"+mediaid)[0];
			}
		}
		if (el) {
			//console.log('el :: ' + el);
			$("#vid560x315 .activeVideo").removeClass("activeVideo");
				$(el).parent().addClass("activeVideo");
				$("#spanProductDetailCurrentVideo").text($("#spanProductDetailVideoList .activeVideo a").text());
				if (mediaid != null && mediaid != '') setMedia(mediaid, autoplay); //update mediaId
		
		} 
	}
  
	function videoClick(page_id,category_id){
		if(videoClickCount == 0) {
			cmCreatePageviewTag(page_id,category_id,null,null,extraAttr);
		}
		videoClickCount++;
	}
	
	//
	//var raVideoClicklist = new Array();
	//
	//var videoClickTag = function(page_id,category_id, vIndex){
	//	if( updateVideoClicklist(vIndex)  ){
	//		//console.log('throw page view tag');
	//		cmCreatePageviewTag(page_id,category_id);
	//	}
	//	
	//}		
	//
	//var updateVideoClicklist = function(val){
	//	for(i=0;i < raVideoClicklist.length;i++){
	//		//console.log('click list :: ' + raVideoClicklist[i]);
	//		if(raVideoClicklist[i]== val){return false;}
	//	}		
	//	raVideoClicklist[raVideoClicklist.length]=val;
	//	return true;
	//}

})());	