

/**
* Initialize and manage a semantic tab box.
*
* This code was created by Jeremy Gillick.
* To learn more, read the blog post: http://blog.mozmonkey.com/2007/semantic-tab-box-v20/
*
* The configuration object names and default values:
* 
*	header   : h3     // The header element used for each tab name.
*	vertical : false  // TRUE if the tabs should be oriented vertically.
*	select   : 0      // The tab index to select initially.
*	autosize : true   // Automatically size the box to the content of the tab.
*
* @param {String} id The ID of the tab box div.
* @param {Object} config The configuration object.
*/
function Tabbox(id, config) { 
	this.init(id, config);
}
Tabbox.prototype = {
	
	tabbox : null,
	tabs : [],
	selected : null,
	
	config : {
		header: "h3",
		vertical: false,
		select : -1,
		padding: 0,
		autosize: true
	},
	
	/**
	* Called from the constructor to start initializing the tabbox.
	*/
	init : function(id, config){ 
		var obj = this;
		
		/* 
		* Merge configuration with default values
		*/
		if(config){
			var name;
			for(name in config){
				this.config[name] = config[name];
			}
		}
		
		/* 
		* Poll until the tabbox is available
		*/
		
		// Add onload handler
		this.pageLoaded = true;
		//this.pageLoaded = false;
		//if(window.addEventListener){
			//window.addEventListener("load", function(){ obj.pageLoaded = true; }, false);
		//}
		//else if(window.attachEvent){
			//window.attachEvent("onload", function(){ obj.pageLoaded = true; });
		//}
		
		function poll(){
			var tabbox = document.getElementById(id);
			
			// Check for nextSibling in heirarchy
			var node = tabbox;
			while(node){
				if(node.nextSibling || obj.pageLoaded){
					obj.tabbox = tabbox;
					obj.formatTabbox();
					return;
				}
				node = tabbox.parentNode;
			}
			
			// continue polling
			setTimeout(poll, 25); 
		}
		poll();
	},
	
	/**
	* Add CSS classes and find the important elements of the tab box.
	*/
	formatTabbox : function(){
		var obj = this;
	
		// Add classes
		this.tabbox.className += " tabWrapper";
		//Greg Bender: Removed because it is believed it is not needed.
		//if(this.config.vertical){
			//this.tabbox.className += " verticalTabs";
		//}
		//else{
			//this.tabbox.className += " horzTabs";
		//}
	
		// Get tabs
		var divs;
		var tabs = this.tabbox.getElementsByTagName(this.config.header);
		for(var i = 0; i < tabs.length; i++){
			// Tab container
			this.tabs[i] = { id: tabs[i].id, header: tabs[i], container: tabs[i].parentNode }; 
			
			// Tab content
			divs = this.tabs[i].container.getElementsByTagName("div");
			for(var n = 0; n < divs.length; n++){
				if(divs[n].className.match(/(^|\s)tabContent(\s|$)/)){
					this.tabs[i].id = divs[n].id;
					this.tabs[i].content = divs[n];
					break;
				}
			}
			
		}
		
		// Add event handlers
		var anchor;
		for(var i = 0; i < this.tabs.length; i++){
			anchor = this.tabs[i].container.getElementsByTagName("a");
			if(anchor.length > 0){
				anchor = anchor[0];
				
				anchor.tab = this.tabs[i];
				anchor.onfocus = function(evt){
						evt = window.event || evt;
						obj.selectTab(this.tab, evt);
					}
				anchor.onclick = function(evt){
						evt = window.event || evt;
						obj.selectTab(this.tab, evt);
					}
			}
		}
		
		
		// Get/Set selection
		this.getSelected();
		if(this.config.select){
			this.selectTab(this.config.select);
		}
		this.adjustFootprint();
	},
	
	/**
	* Select a tab.
	* @param {Tab|Int|String} tab The tab to select, this can either be the Tab object, tab index or the tab's ID.
	* @param {Event} evt The browser event used to call this method.  Passing this will prevent the default event action.
	*/
	selectTab : function(tab, evt){
		
		// Prevent default event action
		if(evt){
			if (evt.preventDefault) {
				evt.preventDefault();
			} 
			else {
				evt.returnValue = false;
			}
		}
		
		// Convert tab number to Tab object
		if(!isNaN(tab)){
			tab = this.tabs[parseInt(tab)];
		}
		
		// Convert tab ID to Tab object
		else if(typeof tab == "string"){
			tab = this.getTabById(tab);
		}
			
		if(!tab){
			return;
		}
		
		// Deselect last tab
		if(this.selected){
			this.selected.container.className = this.selected.container.className.replace(/selected/g, "");
		}
		
		// Select this tab
		tab.container.className += " selected";
		this.selected = tab;
		
		this.adjustFootprint();				
	},
	
	/**
	* Get a Tab object by it's ID
	* @param {String} id The tab ID
	* @return {Object} The Tab object or null
	*/
	getTabById : function(id){
		for(var i = 0; i < this.tabs.length; i++){
			if(this.tabs[i].id == id){
				return this.tabs[i];
			}
		}
		
		return null;
	},
	
	/**
	* Get the selected tab.
	* @return {int} The selected tab index.
	*/
	getSelected : function(){
		for(var i = 0; i < this.tabs.length; i++){
			if(this.tabs[i].container.className.match(/(^|\s)selected(\s|$)/)){
				this.selected = this.tabs[i];
				return i;
				break;
			}
		}
	},
	
	/**
	* Automatically resizes the tab box to fit the content.
	*/
	adjustFootprint : function(){
		if(this.config.autosize == false){
			return;
		}
		
		if(!this.selected){
			return;
		}
		
		// Set height
		var height = this.selected.content.clientHeight + 5;
		if(this.config.vertical == false){
			height += this.selected.header.clientHeight;
		}
		this.tabbox.style.height = height +"px"; 
	}
	
}
