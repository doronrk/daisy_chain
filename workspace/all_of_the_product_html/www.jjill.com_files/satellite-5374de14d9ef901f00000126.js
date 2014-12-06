_satellite.pushBlockingScript(function(event, target, $variables){
  //Start of Monetate Tag: Please do not remove 
cmtStart = document.createComment('START Satellite : Monetate Tag');
cmtEnd = document.createComment('END Satellite : Monetate Tag');

	var container = document.getElementById('sctTags_Header'); 
	if(container === null || container === undefined) 
    return;

	// Get data from satellite Vars
	var SPC = _satellite.getVar('SecureProtocolCheck');
	var URL = 'b.monetate.net/js/1/a-7b9bcb0c/p/jjill.com/';
	var monetateT = new Date().getTime();

	// Create SRC	 
  var src = SPC;
  src += ((SPC.indexOf("s") !== -1)? 's':'') 
  src += URL;
	src += Math.floor((monetateT + 207628) / 3600000);
	src += '/g'

  // Write IMG Tag info
  sct = document.createElement('script'); 
	sct.setAttribute('type','text/javascript');
	sct.setAttribute('async','');
	sct.setAttribute('src', src);

	// write to page :: write in reverse order & 
	//	use parentNode.insertBefore to insert 
	//	into Header AFTER satellite tag
	container.parentNode.insertBefore(cmtEnd, container.nextSibling);
	container.parentNode.insertBefore(sct, container.nextSibling);
	container.parentNode.insertBefore(cmtStart, container.nextSibling);
  
//End of Monetate Tag: Please do not remove 
});
