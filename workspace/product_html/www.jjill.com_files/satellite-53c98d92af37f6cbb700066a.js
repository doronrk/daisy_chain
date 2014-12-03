_satellite.pushBlockingScript(function(event, target, $variables){
  //Start of 4Cite Tag: Please do not remove 
cmtStart = document.createComment('START Satellite : 4Cite Tag');
cmtEnd = document.createComment('END Satellite : 4Cite Tag');
 
var container = document.getElementById('dvTags_Bottom');
if(container === null || container === undefined) return;

var account = "0043_00511"; 

// Add their js
//scptJS = document.createElement('script');  
//scptJS.setAttribute('type','text/javascript');
//scptJS.setAttribute('src','//track.securedvisit.com/js/sv.js');	


// Get data from satellite Vars
var SPC = _satellite.getVar('SecureProtocolCheck');
var action = _satellite.getVar('Prodcuts_Action') || "";
var id = _satellite.getVar('Order_ID') || "";
var amt = parseFloat(_satellite.getVar('Order_Total')).toFixed(2) ||  "";
var email = (_satellite.getVar('Session_Email')?_satellite.getVar('Session_Email'): "RAWEMAIL");
var products = null;

// Add Tracker Script
scptTracker = document.createElement('script');  
scptTracker.setAttribute('type','text/javascript');
scptTracker.setAttribute('id','FourCite');
var scptText = (scptTracker.innerText===undefined?"textContent":"innerText");  
scptTracker[scptText] += " try {"; 
scptTracker[scptText] += " _svtracker = _svt._getTracker(\"" + account + "\");"; 
scptTracker[scptText] += " _svtracker._setEm(\"" + email + "\");"; 



list = _satellite.getVar('Products_List');
cnt = list.length; 
  if(cnt > 0 && action !== 'View') { 
    if(id != "" && amt != ""){
      scptTracker[scptText] += " _svtracker._setIsPurch(\"TRUE\");";
      scptTracker[scptText] += " _svtracker._setPurchID(\"" + id + "\");";
      scptTracker[scptText] += " _svtracker._setPurchDollar(\"" + amt + "\");";
    } else {
      scptTracker[scptText] += " _svtracker._setIsCart(\"TRUE\");";
    }
    
    for (i = 0; i < cnt; ++i) {      
      var item = list[i].alias;
      if(!item) { item = list[i].item_code }
      if(!item) { item = list[i].sku_number } 
      var size_type = list[i].size_type || '';
      scptTracker[scptText] += " _svtracker._setCartProduct(\"" + item + size_type + "\");";
    }
  }

scptTracker[scptText] += " _svtracker._trackPageView();"; 
scptTracker[scptText] += " } catch (err) { }";  



// write to page
container.appendChild(cmtStart);
//container.appendChild(scptJS);
container.appendChild(scptTracker);
container.appendChild(cmtEnd);
  
//End of 4Cite Tag: Please do not remove 
});
