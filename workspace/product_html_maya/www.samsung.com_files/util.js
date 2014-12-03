/**
 * Created with JetBrains WebStorm.
 * User: Mattsmith
 * Date: 5/15/13
 * Time: 10:24 AM
 * To change this template use File | Settings | File Templates.
 */
window.log=function(){log.history=log.history||[];log.history.push(arguments);if(this.console){console.log(Array.prototype.slice.call(arguments))}};
window.logStart=function(event,message){if(typeof window.debug!='undefined' && window.debug) {logStart.initTime=logStart.initTime||new Date().getTime();logStart.start=logStart.start||new Array();if(event!=''){var startTime = new Date().getTime();log("****** "+event+" Start	" + (startTime - logStart.initTime) + ((typeof message != 'undefined')?" - " + message:''));logStart[event] = startTime;if (typeof console.time != 'undefined') { console.time(event); }}}};
window.logEnd=function(event, message) {if (typeof window.debug != 'undefined' && window.debug) {var endTime = new Date().getTime();log("****** "+event+" End	" + (endTime - logStart.initTime)+"	duration:"+(endTime-logStart[event])+((typeof message != 'undefined')?" - " + message:''));if (typeof console.time != 'undefined') { console.timeEnd(event); }}};
window.logStart('');

//mcgowan - clears/restores default textbox values
function clearDefaultText(elTextBox, defaultValue) {
	if ((elTextBox.value && elTextBox.value == defaultValue) 
		|| (elTextBox.value && elTextBox.value == 'Please Enter the valid Word')
		|| (elTextBox.value && elTextBox.value == 'Please enter the search term')) {
		$(elTextBox).removeClass('unable');
		elTextBox.value='';
	}
}
function restoreDefaultText(elTextBox, defaultValue){
	if (elTextBox.value == '' || elTextBox.value == 'Please Enter the valid Word' || elTextBox.value == 'Please Enter the valid model number' || elTextBox.value == 'Please enter the search term') {
		$(elTextBox).removeClass('unable');
  		elTextBox.value= defaultValue;
	}
}