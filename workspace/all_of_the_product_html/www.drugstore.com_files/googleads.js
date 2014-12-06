var ArrAdBlockContainers = new Array();

function setAdsShown(containerId, shown) {
	var container = document.getElementById('label_' + containerId);
	if (container) {
		if (shown) {
			container.innerHTML = 'Sponsored Links';
		} else {
			container.innerHTML = '';
			$('.googleAdsense').css('display', 'none');
		}
	}
}


