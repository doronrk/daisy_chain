/*
 * rewards.js
 *
 * javascript functions for rewards_1.html, rewards_2.html
 */

/*
* Adds onclick event handlers to page elements to hide and show specified blocks
*/
function InitAccordion () {	
	classHead = 'question';		//CCS class for head element (title)
	tagHead ='a';				//HTML tag of the head element (title)
	classToggle = 'open';		//CSS class that will be added to toggled (body) element when it's showed
	tagBody ='p';				//HTML: tag pf the toggled (body) element 

	var headElems = getElementsByClass(classHead, document, tagHead);	//array of the head elements
	for(var i=0; i<headElems.length; i++){
		headElems[i].onclick = function(){
			var el = getElementByTagName(this.parentNode, tagBody); 
			if (!el) return false;
			if (el.style.display != "" && el.style.display != 'none') {
				el.style.display = 'none'; 
				var rep=this.className.match(' '+classToggle)?' '+classToggle:classToggle; 
				this.className=this.className.replace(rep,'');
			} else {
				el.style.display = 'block'; 
				this.className+=this.className?' '+classToggle:classToggle;
			}
			return false;
		}
	}	
}