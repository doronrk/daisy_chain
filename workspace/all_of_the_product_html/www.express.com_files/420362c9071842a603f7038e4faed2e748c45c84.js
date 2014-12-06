try {
    var vid = document.getElementById('video-modal-player');
	if (vid) {
		vid.addEventListener('play', function(){
			if (!vid.isOpen) {
				s.Media.open(vid.currentSrc, Math.round(vid.duration), s.Media.playerName);
				vid.isOpen = true;
			}
			s.Media.play(vid.currentSrc, Math.round(vid.currentTime));
		});
		vid.addEventListener('pause', function(){
			s.Media.stop(vid.currentSrc, Math.round(vid.currentTime));
		});
		vid.addEventListener('ended', function(){
			s.Media.stop(vid.currentSrc, Math.round(vid.currentTime));
			s.Media.close(vid.currentSrc);
			vid.isOpen = false;
		});
	}
} catch(ex) {
	// no HTML5 player on page or no API support
}