/* DefaultButtons/Validators/FireFox Textarea Fix */
/*
  This function is used to override the default ASP.NET FireDefaultButton function to 
  fix non-IE issues with the script.  
  
  This override will fix:
    - FireFox issue where the form submits when en a textarea and enter is clicked 
      the default function from MS uses "srcElement" to locate the source control
      this does not work in non-IE browsers
    
  To use: 
    - include this script on the page after the embedded javascript file generated 
      by ASP.NET to override the default action.
*/

/* fixed to allow newlines in textareas with FireFox */
function WebForm_FireDefaultButton(event, target) {
  var isTextarea = false;
  var defaultButton;
    
  if (__nonMSDOMBrowser) {
	defaultButton = document.getElementById(target);
	if (event.target.tagName.toLowerCase() == "textarea") { isTextarea = true; }
  } else {
	defaultButton = document.all[target];
	if (event.srcElement.tagName.toLowerCase() == "textarea") { isTextarea = true; }
  }		
	
  if (event.keyCode == 13 && !isTextarea) {
	if (defaultButton && typeof(defaultButton.click) != "undefined") {	  
	  defaultButton.click();
	  event.cancelBubble = true;	  
	  if (event.stopPropagation) event.stopPropagation();
	  return false;
	}
  }
  return true;
}
