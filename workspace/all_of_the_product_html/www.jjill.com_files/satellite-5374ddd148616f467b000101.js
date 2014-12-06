_satellite.pushBlockingScript(function(event, target, $variables){
  //Start of 4Cite Tag: Please do not remove  
var container = document.getElementById('sctTags_Header');
if(container === null || container === undefined) return;

// Add their js
scptJS = document.createElement('script');  
scptJS.setAttribute('type','text/javascript');
scptJS.setAttribute('src','//track.securedvisit.com/js/sv.js');

// write to page
//container.appendChild(scptJS);
container.parentNode.insertBefore(scptJS, container.nextSibling);

});
