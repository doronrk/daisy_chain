//-----------------------------------------------------------------
// Licensed Materials - Property of IBM
//
// WebSphere Commerce
//
// (C) Copyright IBM Corp. 2011 All Rights Reserved.
//
// US Government Users Restricted Rights - Use, duplication or
// disclosure restricted by GSA ADP Schedule Contract with
// IBM Corp.
//-----------------------------------------------------------------

if(typeof(DepartmentJS) == "undefined" || DepartmentJS == null || !DepartmentJS){

	DepartmentJS = { 
	
	index : -1,

	subCategoryIndex : 0,

	subCatNodes : null,
	
	catNodes : null,

	activeLink : null,

	widgetId : "widget_departments",
	
	init: function(){
		dojo.connect(dojo.byId(this.widgetId), "onmouseover", DepartmentJS, DepartmentJS._onFocus);	
		dojo.connect(dojo.byId(this.widgetId), "onmouseout", DepartmentJS, DepartmentJS._onBlur);
		if(!dojo.isIE || (dojo.isIE && dojo.isIE >= 8)){
			dojo.connect(dojo.byId(this.widgetId), "onfocus", DepartmentJS, DepartmentJS._onFocus);
			dojo.connect(dojo.byId(this.widgetId), "onblur", DepartmentJS, DepartmentJS._onBlur);
			dojo.connect(dojo.byId(this.widgetId), "onkeydown", DepartmentJS, DepartmentJS._onKeyDown);
		}
	},

	_onFocus:function(evt){
		if(wc.render.getRefreshControllerById('DepartmentDropdownController').url != '' && wc.render.getContextById('DepartmentDropdown_Context').properties['isFirstRefresh'] == 'false'){
			setCurrentId('widget_departments'); 
			if(submitRequest()){ 
				cursor_wait();
				wc.render.updateContext('DepartmentDropdown_Context', {'isFirstRefresh': 'true'});
			}
		}
		if(document.getElementById('drop_down')){
			document.getElementById('drop_down').style.display = 'block';
		}
	},

	_onKeyDown:function(evt){

				if(evt.keyCode == dojo.keys.UP_ARROW) {
					
					dojo.stopEvent(evt);

					var indexToUse = this.index + 1;

					var subCat = document.getElementById("sub_categories_" + indexToUse);
				
					if(subCat != null && subCat.style.display == 'block'){
												
						 var subIndex = this.subCategoryIndex;
						 					
						 dojo.removeClass(subCatNodes[subIndex],"dephighlight");
						
						 if(subIndex == 0){
							subIndex = subCatNodes.length;
						}

						 subIndex--;

						 dojo.addClass(subCatNodes[subIndex],"dephighlight");
						 
						 dojo.byId(this.widgetId).setAttribute("aria-activedescendant",subCatNodes[subIndex].id);

						 activeLink = dojo.query(">a",subCatNodes[subIndex]);

						 this.subCategoryIndex = subIndex;
					}

					else{
						
						 var catIndex = this.index;
						 
						 if(catIndex >= 0){
							 dojo.removeClass(catNodes[catIndex],"dephighlight");
						 }

						 if(catIndex <= 0){
							catIndex = catNodes.length;
						 }
						
						 catIndex--;
						 
						 dojo.addClass(catNodes[catIndex],"dephighlight");
						 
						 dojo.byId(this.widgetId).setAttribute("aria-activedescendant",catNodes[catIndex].id);

						 activeLink = dojo.query("> .name_wrapper > .name > a, >a",catNodes[catIndex]);

						 this.index = catIndex;		
					}
					

				}

				if(evt.keyCode == dojo.keys.DOWN_ARROW) { 
					
					dojo.stopEvent(evt);

					var indexToUse = this.index + 1;

					var subCat = document.getElementById("sub_categories_" + indexToUse);
				
					if(subCat != null && subCat.style.display == 'block'){
						
 						 var subIndex = this.subCategoryIndex;
						 					
						 dojo.removeClass(subCatNodes[subIndex],"dephighlight");
						 						
						 if(subIndex >= subCatNodes.length - 1){ 
							   subIndex = 0;
						 }else{
							   subIndex++;
						 }
						 dojo.addClass(subCatNodes[subIndex],"dephighlight");

						 dojo.byId(this.widgetId).setAttribute("aria-activedescendant",subCatNodes[subIndex].id);

						 activeLink = dojo.query(">a",subCatNodes[subIndex]);

						 this.subCategoryIndex = subIndex;
					}

					else{
						
						var catIndex = this.index;
						
						if(catIndex >= 0){
							dojo.removeClass(catNodes[catIndex],"dephighlight");
							catNodes[catIndex].blur();
						}
				
						 if(catIndex >= catNodes.length - 1){
							catIndex = 0;
						 }else{
                            catIndex++; 
						 }

						 dojo.addClass(catNodes[catIndex],"dephighlight");
						 						 
						 dojo.byId(this.widgetId).setAttribute("aria-activedescendant",catNodes[catIndex].id);

						 activeLink = dojo.query("> .name_wrapper > .name > a, >a",catNodes[catIndex]);

						 this.index = catIndex;	
					}
					
				}

				if(evt.keyCode == dojo.keys.RIGHT_ARROW) {
						 dojo.stopEvent(evt);
						 var indexToUse = this.index + 1;
						 if(document.getElementById("sub_categories_" + indexToUse)){
							 selection = document.getElementById("sub_categories_" + indexToUse);
							 selection.style.backgroundColor = "#ffffff";
							 selection.style.display = "block";
							
							 var queryString = "#sub_categories_" + indexToUse + "> .middle > .middle_tile > .sub_category > *";
							 subCatNodes = dojo.query(queryString);
							
							 var highlightFlag = "false"
							 dojo.forEach(subCatNodes, function(subCatNode){
								if(dojo.hasClass(subCatNode, "dephighlight")){
									highlightFlag = "true";
								}
							 });
							
							 if(highlightFlag == "false"){
								 dojo.addClass(subCatNodes[0],"dephighlight");	
								 dojo.byId(this.widgetId).setAttribute("aria-activedescendant",subCatNodes[0].id);
								 activeLink = dojo.query(">a",subCatNodes[0]);
							 }
						 }
				}

				if(evt.keyCode == dojo.keys.LEFT_ARROW) {
						 dojo.stopEvent(evt);
						 var indexToUse = this.index + 1;
						 var subCat = document.getElementById("sub_categories_" + indexToUse);
						 if(subCat != null){
							 subCat.style.display = "";
						 }
						 dojo.removeClass(subCatNodes[this.subCategoryIndex],"dephighlight");
						 this.subCategoryIndex = 0;
				}
				
				if(evt.keyCode == dojo.keys.ENTER) {
					if(activeLink != null && activeLink != ''){
						document.location.href=activeLink;
					}
				}

				if(evt.keyCode == dojo.keys.ESCAPE) {
					dojo.byId(this.widgetId).blur();
					this._onBlur(evt);
				}
				if(evt.keyCode == dojo.keys.TAB && !evt.shiftKey) {	//Give focus to the search bar on pressing tab key
					if(document.getElementById("SimpleSearchForm_SearchTerm")){
						document.getElementById("SimpleSearchForm_SearchTerm").focus();
						dojo.stopEvent(evt);
					}
				}
	},
	
	_onBlur:function(evt){
			var indexToUse = this.index + 1;
			var subCat = document.getElementById("sub_categories_" +indexToUse);
			if(subCat != null){
				subCat.style.display = "";
			}
			dojo.query(".dephighlight").forEach(function(node){dojo.removeClass(node,"dephighlight")});
			this.index = -1;
			this.subCategoryIndex = 0;
			activeLink = null;
			document.getElementById("drop_down").style.display = "none";
	},

	_onDepartmentFocus:function(node, evt){
			var nodeId = node.id.replace("department", "sub_categories");
			if(document.getElementById(nodeId)){
				document.getElementById(nodeId).style.backgroundColor = "#ffffff";
				document.getElementById(nodeId).style.display = "block";
			}
	},

	_onDepartmentNoFocus:function(node, evt){
			var nodeId = node.id.replace("department", "sub_categories");
			if(document.getElementById(nodeId)){
				document.getElementById(nodeId).style.backgroundColor = "";
				document.getElementById(nodeId).style.display = "none";
			}
	},

	initializeCatNodes:function(){
			var queryString = ".departments > *";
			catNodes = dojo.query(queryString);
	 }
	};		

	wc.render.declareContext("DepartmentDropdown_Context",{isFirstRefresh: "false"},"");

	wc.render.declareRefreshController({
		   id: "DepartmentDropdownController",
		   renderContext: wc.render.getContextById("DepartmentDropdown_Context"),
		   url: "",
		   formId: ""

		   /** 
			* @param {string} message The render context changed event message
			* @param {object} widget The registered refresh area
			*/
		   ,renderContextChangedHandler: function(message, widget) {
				  var controller = this;
				  var renderContext = this.renderContext;
				  widget.refresh(renderContext.properties);
		   }

		   /** 
			* Display the results.
			* 
			* @param {object} widget The registered refresh area
			*/
		   ,postRefreshHandler: function(widget) {
			   DepartmentJS.initializeCatNodes();  
			   dojo.query("div#widget_departments > .drop_down > .middle > .left_border > .right_border > .departments > .department").forEach(function(node){
					dojo.connect(node, "onfocus", DepartmentJS, dojo.partial(DepartmentJS._onDepartmentFocus, node));
					dojo.connect(node, "onmouseover", DepartmentJS, dojo.partial(DepartmentJS._onDepartmentFocus, node));
					dojo.connect(node, "onblur", DepartmentJS, dojo.partial(DepartmentJS._onDepartmentNoFocus, node));
					if(dojo.isIE){
    					dojo.connect(node, "onmouseleave", DepartmentJS, dojo.partial(DepartmentJS._onDepartmentNoFocus, node));
					}
					else{
						dojo.connect(node, "onmouseout", DepartmentJS, dojo.partial(DepartmentJS._onDepartmentNoFocus, node));
					}			
				});
			   cursor_clear();
		   }
	});
}