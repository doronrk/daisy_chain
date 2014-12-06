//-----------------------------------------------------------------
// Licensed Materials - Property of IBM
//
// WebSphere Commerce
//
// (C) Copyright IBM Corp. 2013 All Rights Reserved.
//
// US Government Users Restricted Rights - Use, duplication or
// disclosure restricted by GSA ADP Schedule Contract with
// IBM Corp.
//-----------------------------------------------------------------

/**
 *  Video display widget
 */	

window.onload=function() {   
	var video = document.getElementById("videoScreen");
	if (video) {
		if(video.canPlayType && (video.canPlayType('video/mp4') || video.canPlayType('video/ogg'))) {
			
			function startVideo() {
				this.removeEventListener('play', startVideo, false);
				document.getElementById('promotionTitle').style.display = 'none';
			}
			
			function endVideo() {
				this.removeEventListener('ended', endVideo, false);
				document.getElementById('videoScreen').style.display = 'none';
				document.getElementById('videoFinished').style.display = 'block';
			}
			
			if (!video.addEventListener) {
				video.attachEvent('play', startVideo, false);
				video.attachEvent('ended', endVideo, false);
			}
			else {
				video.addEventListener('play', startVideo, false);
				video.addEventListener('ended', endVideo, false);
			}
		}
		else {
			document.getElementById('promotionTitle').style.display = 'none';
		}
	}
}