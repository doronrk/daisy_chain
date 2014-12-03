if (!window.console) console = {log: function() {}};
if(typeof(ib_social) == "undefined" || !ib_social){

	var ib_social = {
		"status": {
			"fb": 		false,
			"social": 	false,
			"ib" : {
				"cid" : "0"
			} 
		},
		"fb": {
			"appId" : "" ,
			"namespace" : ""
		},		
		"page":{
			"ogTitle": "",
			"ogType": "",
			"ogUrl": "",
			"ogImage": "",
			"ogDescription": ""
		},
/*	
		init:function(config){
			var self = this;
console.log('ib_social: inside init');	
console.log('ib_social: ' + self.status.social);
			//$.extend(this.config,config);
		
			return self;
		},
*/

		refreshUI: function(){
		// this function should be used to refresh the state of the sharing widget in the UI
////66////console.log('ib_social refreshUI');
////66////console.trace();
			var self = this;
			FB.XFBML.parse();
////66////console.log('ib_social status.fb CURRENT: ' + self.status.fb);			
			if(self.status.fb){
////66////console.log('ib_social refreshUI: show FB log OUT');						
			// FB logged IN... so show logout link
				//document.getElementById('status_fb').innerHTML = '<a id="status_fb" class="logFB" href="javascript:fblogout();">LOG OUT FACEBOOK</a>';
				$("#status_fb").text('LOG OUT FACEBOOK');
				$("#status_fb").attr("href", "javascript:fblogout();");
			} else {	
////66////console.log('ib_social refreshUI: show FB log IN');									
			// FB logged OUT... so show login link
				//document.getElementById('status_fb').innerHTML = '<a id="status_fb" class="logFB" href="javascript:fblogin();">LOG IN FACEBOOK</a>';
				$("#status_fb").text('LOG IN FACEBOOK');
				$("#status_fb").attr("href", "javascript:fblogin();")				
			};
////66////console.log('ib_social refreshUI: status.social?: ' + self.status.social);			
			if(self.status.social){
////66////console.log('ib_social refreshUI: social sharing is ON ... so show "turn it OFF" link');
			// social sharing is ON ... so show "turn it OFF" link
				$("#status_social").text('SHARING: ON');
				$("#status_social_txt").text("SHARING: ON");
////66////console.log('ib_social refreshUI: social sharing is ON ... shareCopyBox fadeOut');	
//console.log($("#shareCopyBox"));
				//$("#shareCopyBox").fadeOut();	
				$("#shareCopyBox").hide().css("visibility", "hidden");

				
				//document.getElementById('status_social_toggle').innerHTML = '<a id="status_social" class="logFB" href="javascript:ibShareObj.setShareStatus(false);">TURN SHARING OFF</a>';
				$("#status_social_toggle").attr("href", "javascript:ibShareObj.setShareStatus('social',false);");
				$("#status_social_toggle").text("TURN SHARING OFF");
				FB.XFBML.parse();
			} else {
////66////console.log('ib_social refreshUI: social sharing is OFF ... so show "turn it ON" link');			
			// social sharing is OFF ... so show "turn it ON" link
				//document.getElementById('status_social').innerHTML = 'SHARING: OFF';
				$("#status_social").text('SHARING: OFF');
				$("#status_social_txt").text("SHARING: OFF");
				//document.getElementById('status_social_toggle').innerHTML = '<a id="status_social" class="logFB" href="javascript:ibShareObj.setShareStatus(true);">TURN SHARING ON</a>';
				$("#status_social_toggle").attr("href", "javascript:ibShareObj.setShareStatus('social',true);")
				$("#status_social_toggle").text("TURN SHARING ON");	
				$("#shareCopyBox").css("visibility", "visible");
				$("#shareCopyBox").fadeIn(); 
				
			};
			
			
////66////console.log('refreshUI: ' + JSON.stringify(self) );	
////66////console.log('ib_social refreshUI: FB.XFBML.parse');					
				//FB.XFBML.parse();	
				FB.XFBML.parse(document.getElementById('activityFB'));		
			
		},
	
		toggleShareStatus: function() {
			var self = this;
			if(self.status.social) {
				self.setShareStatus('social',false);
			} else {
				self.setShareStatus('social',true);
			}
		},
	
	
		setShareStatus: function(aType, aState){
////66////console.log('ib_social setShareStatus');
////66////console.trace();
			var self = this;
////66////console.log('setShareStatus: ' + JSON.stringify(self) );				
			//if(self.status[aType] !== aState) {
//console.log('ib_social setShareStatus:: change required');
				//self.status[aType] = aState;
				if(aType === 'social'){	
					if(aState){			
					// trying to turn social on...
////66////console.log('ib_social setShareStatus :: Turn Sharing On..');
						//$("#shareCopyBox").fadeOut();
						if(!self.status.fb) {
////66////console.log('ib_social setShareStatus :: NOT LOGGED INTO FB');
							//fblogin();
							//self.checkPermission();
							//FB.getLoginStatus(checkLoginStatus);
////66////console.log('ib_social setShareStatus ::' + permsNeeded);							
							FB.login(function(response) {
								if (response) {
////66////console.log('ib_social setShareStatus :: response.status = ' + response.status);
									if (response.status === "connected") {
									//successful auth
////66////console.log('ib_social setShareStatus :: successful auth');
										self.status.fb = true;
										$.cookie("ib_social_state", true, { expires: 90, path: '/' });
										self.status.social = true;
										//$("#shareCopyBox").fadeOut();
										$("#shareCopyBox").toggle();										
									} else {
									//unsuccessful auth
////66////console.log('ib_social setShareStatus :: unsuccessful auth');										
										$.cookie("ib_social_state", false, { expires: 90, path: '/' });
										self.status.social = false;
									}
								} else {
								//unsuccessful auth2
////66////console.log('ib_social setShareStatus :: unsuccessful auth2');
									$.cookie("ib_social_state", false, { expires: 90, path: '/' });
									self.status.social = false;
								}
//console.log('ib_social setShareStatus: refresh');						
//								self.refreshUI();
////66////console.log('ib_social setShareStatus: reload');											
								window.location.reload();								
							}, {scope: permsNeeded });
						} else {
////66////console.log('ib_social setShareStatus: true');
							self.status.social = true;
							$.cookie("ib_social_state", true, { expires: 90, path: '/' });
							self.refreshUI();
						}
					} else {
////66////console.log('ib_social setShareStatus: false');					
						self.status.social = false;
						$.cookie("ib_social_state", false, { expires: 90, path: '/' });
						self.refreshUI();
					}
//console.log('ib_social setShareStatus, set cookie SOCIAL :: ' + aState);						
//					$.cookie("ib_social_state", aState, { expires: 90, path: '/' });
				} else {
////66////console.log('ib_social setShareStatus: ' + aType + ' = ' + aState);
					self.status[aType] = aState;
					self.refreshUI();
				}

//console.log('ib_social setShareStatus: refresh');						
//				self.refreshUI();			
			//}
		},		
		
		canShare: function(){
		// this function should be used BEFORE any social sharing is done
			var self = this;			
////66////console.log('canShare:: ib_social status.fb?: ' + self.status.fb);
////66////console.log('canShare:: ib_social status.social?: ' + self.status.social);
			if(self.status.fb && self.status.social) {			
				if(FB) {
////66////console.log("canShare FB:: " + JSON.stringify(FB));				
					return true;
				} else {
					return false;
				}
			} else {			
				return false;
			}		
		},
		
		handleNoShare: function(){	
//// Check for publish_actions extended permission
////6////console.log('handleNoShare:: FB.getUserID: ' + FB.getUserID());
//			var query = FB.Data.query('select publish_actions from permissions where uid={0}', FB.getUserID());
//			query.wait(function(rows) {
//console.log(rows);
//				if(rows[0].publish_actions == 1) {
//					console.log('The user has granted the extended permission');
//				} else {
//					console.log('The user has not granted the extended permission');
//				}
//			});
//alert("You must be logged into Facebook, allowed the appropriate permissions, and have Sharing turned ON to use this feature!");
//console.log("ib_social:handleNoShare -- You must be logged into Facebook, allowed the appropriate permissions, and have Sharing turned ON to use this feature!");

////66////console.log("ib_social:handleNoShare");
			//$('#fbModal_pop_err').reveal({			
			$('#fbModal_perm_err').reveal({
				animation: 'fade',
				dismissmodalclass: 'close-reveal-modal2' //'btn-ok'
			});
		},
		
		handleShare: function(showPop, msg){	
//// Check for publish_actions extended permission
////6////console.log('handleShare:: success');
			var self = this;
			if(showPop) {
				if(msg) {
					$('#fbModal_msg').html(msg);
				}
				if(self.fb.response.id){
////66////console.log('handleShare:: self.fb.response.id: ' + self.fb.response.id);				
				// add undo action
					$('#fbModal_undo').click(function () {
						self.deleteAction(self.fb.response.id);	
						$('a#fbnClose').trigger('click');
					});
				// show undo link	
					$('#fbModal_undo').toggle();
				}
				//$('#fbModal_success').reveal({
				//	animation: 'fade',
				//	dismissmodalclass: 'btn-ok'
				//});
				
				//$('#fbNotifyBox').fadeIn(); 
				//setTimeout(function() { $('#fbNotifyBox').fadeOut(); }, 10000);
				
				$('#fbModal_fail').hide();
				$('#fbModal_err').hide();
				$('#fbModal_success').hide();
				$('#fbModal_perm_err').hide();

////66////console.log('handleShare:: innerNotify set to none');			
				//$('#innerNotify').find('*').display('none');
				//$('#innerNotify').find('fb*').css("display", "none");
////66////console.log('handleShare:: now pick one to display');				
				$('#fbModal_success').show();
				$( "#fireNotify" ).trigger( "click" );
				
				FB.XFBML.parse();
			}	
		},
		
		handleShareErr: function(showPop, response){	
//// Check for publish_actions extended permission
////66////console.log('handleShareErr:: error');
			var self = this;
			if(showPop) {
////66////console.log('handleShareErr:: showpop: ' + showPop);			
				//$('#fbModal_err').reveal({
				//	animation: 'fade',
				//	dismissmodalclass: 'btn-ok'
				//});
				
//console.log('inside ib_social handleShareErr ERROR:: ' + JSON.stringify(response));	
////66////console.log('inside ib_social handleShareErr ERROR:: ' + response.error.message);
			// reset all so they are hidden
				$('#fbModal_fail').hide();
				$('#fbModal_err').hide();
				$('#fbModal_success').hide();
				$('#fbModal_perm_err').hide();

				$('#innerNotify').find('fb*').css("display", "none");				
				$('#fbModal_err').show();
				$( "#fireNotify" ).trigger( "click" );				
				
			}
			// TODO:: add ajax central logging
		},		

		handlePermissionErr: function(showPop){	
//// Check for publish_actions extended permission
////66////console.log('handlePermissionErr:: error - ' + showPop); 
////66////console.trace();
			var self = this;
			if(showPop) {
				//$('#fbModal_perm_err').reveal({
				$('#fbModal_pop_err').reveal({
					animation: 'fade',
					dismissmodalclass: 'btn-ok'
				});
			}
			// TODO:: add ajax central logging
		},
		
		deleteAction: function(id){
			var self = this;
			if(id > 0) {
				FB.api(id, 'delete', function(response) {
					self.fb.response = response;
					if (!response || response.error) {
////6////console.log('deleteAction:: error');
////6////console.log(response.error);
						self.logActivity("deleteAction " + response.error.type + ": " + response.error.message);
					} else {
////66////console.log('deleteAction:: Post was deleted');
					}
				});			
			}		
		},
		
		shareArticle: function(){
			var self = this;
////6////console.log("inside ib_social shareArticle");
			if(	self.canShare() ) {
////6////console.log(self.page.ogUrl);			
				FB.api(
					'me/news.reads',
					'post',
					{
						article: self.page.ogUrl
					},
					function(response) {
						self.fb.response = response;
						if (!response || response.error) {
							//alert('Error occured');
////66////console.log(response.error);							
							self.handleShareErr(false);
							self.logActivity("shareArticle " + response.error.type + ": " + response.error.message);
						} else {
//alert('Share Article Successful! Action ID: ' + response.id);							
							var aMsg = "You read: <strong>" + self.page.ogTitle + "</strong>";
							self.handleShare(true, aMsg);
							//FB.XFBML.parse();
						}
					}
				);
			} else {			
////66////console.log('shareArticle, canShare=false');			
			//	self.handleNoShare();
			}	
		
		},
				
		shareWant: function(){
			var self = this;
////66////console.log("inside ib_social shareWant");

			var permsNeeded = new Array("publish_actions");
		
			if(	self.canShare() ) {		
////66////console.log("inside ib_social shareWant:: perms");
			// check permissions
				//self.checkPermission("publish_actions");			
				self.checkPermission(
					permsNeeded, 
					function doChecking(response){
////66////console.log('shareWant, inside doChecking... response = ' + response);	
						if(response) {
////66////console.log('shareWant, perms exist, pre post');	
							self.postWant();
						} else {
////66////console.log('shareWant, perms dont exist');	
							//self.addPermission("publish_actions");
							//self.handleNoShare();
						}	
					}
				);
			
				
			} else {	
////66////console.log('shareWant, no canshare');
				self.handleNoShare();
			}				
////66////console.log('shareWant end');
		},
		
		
		
		postWant: function(){
////66////console.log('inside postWant');	
			var self = this;	
			// add post
			FB.api(
				'/me/' + self.fb.namespace + ':want', 
				'post',
				{
					product: self.page.ogUrl
				},
				function(response) {
					self.fb.response = response;
					if (!response || response.error) {
////66////console.log('inside ib_social postWant ERROR:: ' + JSON.stringify(response));						
						self.handleShareErr(true, response);
						self.logActivity("postWant " + response.error.type + ": " + response.error.message);
					} else {
console.log('Post for Info was successful! Action ID: ' + response.id);						
						var aMsg = "You have wanted: <strong>" + self.page.ogTitle + "</strong>";
						self.handleShare(true, aMsg);
					}
				}					
			);		
		}, 
		
		
		shareFeed: function(){
		// share button on prod page
			var self = this;
////66////console.log("inside ib_social shareFeed");
			if(	self.canShare() ) {
				FB.ui(
				{
					method: 'feed',       // send, feed, apprequests
					name: self.page.ogTitle,
					link: self.page.ogUrl,
					picture: self.page.ogImage,
					//caption: 'This is the caption',
					description: self.page.ogDescription
					//message: 'This is the message'
				},
				function(response) {
					self.fb.response = response;
					if (!response || response.error) {
//alert('Error occurred ' + response.error);
////66////console.log('inside ib_social shareFeed ERROR:: ' + JSON.stringify(response));							
							self.handleShareErr(true, response);
							self.logActivity("shareFeed " + response.error.type + ": " + response.error.message);
					} else {
console.log('Post for Info was successful! ' + response.post_id);						
						var aMsg = 'Your activity has been shared: <strong>' + self.page.ogTitle + '</strong>';	
////66////console.log('shareFeed aMsg: ' + aMsg);						
						self.handleShare(true, aMsg);
						//FB.XFBML.parse();
					}
				}				
				
				);			
			
			} else {			
				self.handleNoShare();
			}			

		},		
		
		
		shareSend: function(){
		// ask friends button on prod page
			var self = this;
////6////console.log("inside ib_social shareSend");
			if(	self.canShare() ) {
				FB.ui(
				{
					method: 'send',       // send, feed, apprequests
					name: self.page.ogTitle,
					link: self.page.ogUrl,
					picture: self.page.ogImage,
					//caption: 'This is the caption',
					description: self.page.ogDescription
					//message: 'This is the message'
				},
				function(response) {
					self.fb.response = response;
					if (!response || response.error) {
//alert('Error occurred ' + response.error);
							self.handleShareErr(true);
							self.logActivity("shareSend " + response.error.type + ": " + response.error.message);
					} else {
//alert('Post was successful! Action ID: ' + response.id);					
////6////console.log('Post for Info was successful! Action ID: ' + response.id);
						var aMsg = 'Your message has been sent: <strong>' + self.page.ogTitle + '</strong>';					
////6////console.log('shareSend aMsg: ' + aMsg);						
						self.handleShare(true, aMsg);
						//FB.XFBML.parse();
					}
				}				
				
				);			
			
			} else {			
				self.handleNoShare();
			}			

		},
		
		shareVideoWatch: function(videoHref)
		{
			var self = this;
////6////console.log('videoHref: '+ videoHref );	
			if(	ib_social.canShare() ) {
////6////console.log('canShare: true' );
//console.log(FB.getAuthResponse() );		
				//$pageURL = window.location;
				FB.api(					
					'/me/video.watches',
					//'/me/blush_qc:watch', 
					'post', 
					{
						video: videoHref,
						ref: "fb"
					},
					function(response) {
						self.fb.response = response;
						if (!response || response.error) {
//alert(JSON.stringify(response));
////66////console.log(response);
							self.handleShareErr(false);
							self.logActivity("shareVideoWatch " + response.error.type + ": " + response.error.message);
						} 
						else {
//alert('Post was successful! Action ID: ' + response.id);
////6////console.log('shareVideoWatch:: success: ' + response.id);						
						var aMsg = "You watched: <strong>" + self.page.ogTitle + "</strong>";
////6////console.log('shareFeed aMsg: ' + aMsg);						
						self.handleShare(true, aMsg);
						}
					}
				);
			} else {
////6////console.log('canShare: false' );
				//ib_social.handleNoShare();
			}	
		},

		shareReview: function(prodHref)
		{			
////6////console.log('shareReview prodHref: '+ prodHref );
			var self = this;
			if(	ib_social.canShare() ) {
////6////console.log('canShare: true' );
				FB.api(					
					'/me/' + self.fb.namespace + ':review', 
					'post',
					{
						product: prodHref
					},
					function(response) {
						self.fb.response = response;
						if (!response || response.error) {					
//alert(JSON.stringify(response));
////6////console.log(response);
							self.handleShareErr(false);
							self.logActivity("shareReview " + response.error.type + ": " + response.error.message);
						} 
						else {
////6////console.log('shareReview::successful! Action ID: ' + response.id);						
//alert('Post was successful! Action ID: ' + response.id);
							var aMsg = self.page.ogTitle;							
							self.handleShare(true, aMsg);
						}
					}
				);
			} else {
////6////console.log('canShare: false' );
				//ib_social.handleNoShare();
			}	
		},		
		
		checkPermission : function(required_perms, callback) {
////66////console.log("checkPermission called");
////6////console.trace();
////66////console.log(required_perms);
			var self = this;
			var hasPermission = false;
			var permsArray = [];
			var permsToPrompt = [];
			
			if(FB) {
			// check permissions
				FB.api('/me/permissions', function(response) {
////66////console.log("checkPermission :: " + JSON.stringify(response));
					if (typeof response.error != 'undefined') {					
////66////console.log("checkPermission :: " + response.error);
////66////console.log("checkPermission :: " + response.error.code);
////66////console.log("checkPermission :: " + response.error.message);
						hasPermission = false; 

						self.logActivity("checkPermission " + response.error.type + ": " + response.error.message);
						
					} else {
////66////console.log("checkPermission :: has valid token");					
						permsArray = response.data[0];
////66////console.log("checkPermission permsArray: " + JSON.stringify(permsArray));
						for (var i in required_perms) {
////66////console.log("checkPermission required_perms[i]: " + required_perms[i]);
////66////console.log("checkPermission permsArray[required_perms[i]]: " + permsArray[required_perms[i]]);
							if (permsArray[required_perms[i]] === null || typeof(permsArray[required_perms[i]]) === 'undefined') {
////66////console.log("checkPermission permsArray[required_perms[i]] PUSH: " + permsArray[required_perms[i]]);							
								permsToPrompt.push(required_perms[i]);
							}
////66////console.log("checkPermission permsToPrompt i: " + i + " " + JSON.stringify(permsToPrompt));							
						}
						if (permsToPrompt.length > 0) {
////66////console.log('checkPermission ++ Need to re-prompt user for permissions: ' + permsToPrompt.join(','));
							//promptForPerms(permsToPrompt);
							hasPermission = self.addPermission(required_perms, callback);
							//hasPermission = false;
							//return false;
						} else {
////66////console.log('checkPermission -- No need to prompt for any permissions');	
////66////console.log("checkPermission == true");
							hasPermission = true;
						}
					}					
					if(hasPermission === 'undefined') {
////66////console.log("checkPermission :: hasPermission undefined");					
					} else {
////66////console.log("checkPermission :: return hasPermission = " + hasPermission);
						if(hasPermission) {
							callback(hasPermission);
						} else {
							return false;
						}
					
					}
					
					
/*					
					if (response.data && response.data[0] && response.data[0].publish_actions) {
					// has permission
console.log("checkPermission == true");
						hasPermission = true;
					} else {					
					// request permission
console.log("checkPermission >> request perms again");					
						//hasPermission = self.addPermission(required_perms);
						hasPermission = false;
						//return false;									
console.log("checkPermission :: " + JSON.stringify(response));
console.log("checkPermission :: " + response.data[0]);
					}
					//hasPermission = addPermission(required_perms);
//console.log("checkPermission :: hasPermission = " + hasPermission);	
					//if(hasPermission){
//console.log("checkPermission :: if hasPermission = " + hasPermission);						
						//self.postWant(self);						
	//				}	
*/
	
				});
			
				//return hasPermission;				

//*/

			}
////66////console.log("checkPermission :: end");
		},
	
		
		addPermission : function(required_perm, callback){
////66////console.log("addPermission called");
			var self = this;				
			// request permission
				FB.login(function(response) {
					if (response.authResponse) {
////66////console.log(response);					
					// The person logged in					
////66////console.log("addPermission true");					
						callback(true);
					} else {
					// The person cancelled the login dialog
////66////console.log("addPermission false");					
						callback(false);
					}						
				}, { scope: required_perm });
				
			
		
		},

		logActivity: function(eMsg){
////66////console.log("logActivity :: start");
			var self = this;
			$.ajax({
				type: "GET",
				url: "/tools/central_log_create.php",
				data: { 
					title: "FBDEBUG", level: "0",
					summary: eMsg,
					//description: JSON.stringify(self)
					description: 
						"status.fb: " + JSON.stringify(self.status.fb) 
						+ "\nstatus.social: " + JSON.stringify(self.status.social) 
						+ "\nfb.appId: " + JSON.stringify(self.fb.appId)
						+ "\nfb.namespace: " + JSON.stringify(self.fb.namespace) 
						+ "\npage.ogTitle: " + JSON.stringify(self.page.ogTitle) 
						+ "\npage.ogType: " + JSON.stringify(self.page.ogType) 
						+ "\npage.ogUrl: " + JSON.stringify(self.page.ogUrl)
				}
			});
		//	.done(function( msg ) {
		//		alert( "Data Saved: " + msg );
		//	});	
////66////console.log("logActivity :: end");	
		}
			
	};

	if( $.cookie("ib_social_state") == "true" ){
		ib_social.status.social = true;
	};
	
};