(function(app){
	if (app) {
		// add Product namespace to app namespace
		app.sizechart = {
			// default dialog box settings
			dialogSettings: {
					bgiframe: true, // this is required mainly for IE6 where drop downs bleed into dialogs!!! it depends on 
					autoOpen: false,
					buttons: {},
					modal: true,
					overlay: {
			    		opacity: 0.5,
			     		background: "black"
					},
			    	height: 530,
			    	width: 800,
			    	title: '',
			    	// show: "slow", This is causing dialog to break in jquery 1.3.2 rel, show: "slide" works but not desired
			    	hide: "normal",
			    	resizable: false
			},
			// opens a dialog using the given url
			open : function(url, title, dClass, dCallback) {
				// create the dialog container if not present already
				if(jQuery("#sizechartcontainer").length == 0) {
					jQuery(document.body).append("<div id=\"sizechartcontainer\"></div>");
				}
	
				// set a default title
				title = title || "Size Chart";
	
				// finally load the dialog, set the dialog title
				app.ajax.load({
					selector: "#sizechartcontainer",
					url: url,
					callback: function() {
						//whether or not the dialog has been initialized and opened
						var dialogIsOpen = (jQuery('#sizechartcontainer').is(':data(dialog)')) ? jQuery("#sizechartcontainer").dialog("isOpen") : false;
						if(!dialogIsOpen){
							jQuery("#sizechartcontainer").dialog({
								bgiframe: true,
								autoOpen: false,
								modal: true,
								overlay: {
						    		opacity: 0.5,
						     		background: "black"
								},
						    	height: 'auto',
						    	width: 'auto',
						    	position: ["center", 60],
						    	resizable: false,
						    	draggable: false
							});
							if (typeof title == "string") {
								app.dialog.setTitle(title);
							}
							if (typeof dClass == "string") {
								app.dialog.setClass(dClass);
							}
							if (typeof dCallback == "function") {
								dCallback();
							}						
							jQuery("#sizechartcontainer").dialog("open");
						}
					}
				});
			},
	
			// initializes the dialog with common dialog actions, like closing upon canceling
			// use this function in the dialog rendering template to re-bind common actions
			// upon dialog reload
			init : function() {
				jQuery(document).ready(function() {
					// binds the action to all buttons defining an action through the "name" attribute
					jQuery("#sizechartcontainer button").each(function() {
						jQuery(this).click(function() {
							var action = jQuery(this).attr("name");
							if(action) {
								app.dialog.submit(action);
							}
							return false;
						});
					});
	
					// cancel button binding
					jQuery("#sizechartCancelBtn").click(function() {
						app.dialog.close();
						return false;
					});
				});
			},
	
			// sets the title of the dialog
			setTitle : function(title) {
				jQuery("#sizechartcontainer").dialog("option", "title", title);
			},
	
			// sets the class of the dialog
			setClass : function(dClass) {
				jQuery("#sizechartcontainer").dialog("option", "dialogClass", dClass);
			},
	
			// closes the dialog and triggers the "close" event for the dialog
			close : function() {
				jQuery("#sizechartcontainer").dialog("close");
				jQuery(document.body).trigger("dialogClosed");
			},
	
			// attaches the given callback function upon dialog "close" event
			onClose : function(callback) {
				if(callback != undefined) {
					jQuery(document.body).bind("dialogClosed", callback);
				}
			},
	
			// triggers the "apply" event for the dialog
			triggerApply : function() {
				jQuery(document.body).trigger("dialogApplied");
			},
	
			// attaches the given callback function upon dialog "apply" event
			onApply : function(callback) {
				if(callback != undefined) {
					jQuery(document.body).bind("dialogApplied", callback);
				}
			},
	
			// triggers the "delete" event for the dialog
			triggerDelete : function() {
				jQuery(document.body).trigger("dialogDeleted");
			},
	
			// attaches the given callback function upon dialog "delete" event
			onDelete : function(callback) {
				if(callback != undefined) {
					jQuery(document.body).bind("dialogDeleted", callback);
				}
			},
	
			// submits the dialog form with the given action
			submit : function(action) {
				// set the action
				jQuery("#sizechartcontainer form").append("<input name=\"" + action + "\" type=\"hidden\" />");
	
				// serialize the form and get the post url
				var post = jQuery("#sizechartcontainer form").serialize();
				var url = jQuery("#sizechartcontainer form").attr("action");
	
				// post the data and replace current content with response content
		  		jQuery.ajax({
				   type: "POST",
				   url: url,
				   data: post,
				   dataType: "html",
				   success: function(data){
		  				jQuery("#sizechartcontainer").empty().html(data);
				   },
				   failure: function(data) {
					   alert(app.resources["SERVER_ERROR"]);
				   }
				});
			}
		} // Sizechart definition end
	}
	else {
		// dw namespace has not been defined yet i.e. app object is unavailable
		alert("app is undefined!");
	}
})(app);