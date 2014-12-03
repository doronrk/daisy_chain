/*******************************************************************
 * 
 *  Contains global setup and common utility script methods
 * 
 ******************************************************************/

if(typeof(Demandware)=='undefined')Demandware = {};

Demandware.Gigya = new function(){
	var _this = this;
	var _loginCallbackUrl = null;
	var _logoutUrl = null;
	
	_this.PrivacyLevel = null;
	_this.publishAction = publishAction;
	_this.logout = logout;
	
	
	//constructor
	new function(){
		$(document).bind("ready", initialize);
		$(window).bind("unload", dispose);
	}
	
	function initialize(){
		_this.PrivacyLevel = $('#txtGigyaPrivacyLevel').val()||'private';
		_loginCallbackUrl = $('#txtGigyaLoginSuccessUrl').val();
		_logoutUrl = $('#txtGigyaLogoutUrl').val();
		
		bindLogoutEvents();
		setupLoginNotification();
		setupGameNotification();
	}
	
	function publishAction(response, feedId){
		var publishParams = {
				scope:'internal'
				,privacy:_this.PrivacyLevel
				,userAction:response.context
			};
		if(feedId)
			publishParams.feedID = feedId;
		
		gigya.services.socialize.publishUserAction(publishParams); 	
	}
	
	function logout(){
		$.ajax({type: 'GET',url: _logoutUrl});
		gigya.socialize.logout();
	}
	
	function setupGameNotification(){
		if($('#txtGigyaGameNotification').val()=='true'){
			gigya.socialize.getUserInfo({callback:validateUser});
		}
	}
	
	function setupLoginNotification(){
		gigya.socialize.addEventHandlers(
			{
				onLogin:onLogin_Complete
			} 
		);
	}
	
	function onLogin_Complete(evt){
		if(evt.context &&  evt.context.source && evt.context.source=='loginPlugin')
			return;
		
		var loginUrl = _loginCallbackUrl +
					'?isSiteUID=true' +
					'&UID='+encodeURIComponent(evt.UID) +
					'&UIDSignature='+encodeURIComponent(evt.UIDSignature) +
					'&signatureTimestamp='+encodeURIComponent(evt.signatureTimestamp)
		
		window.location.href=loginUrl;		
	}
	
	function validateUser(response){
		if(response.user && response.user.isLoggedIn)
			gigya.gm.showNotifications({});
	}
	
	function bindLogoutEvents(){
		$('ul.menu-utility-user li.last a[href$="Logout"]').bind('click',logout);
		$('div.pt_account span.account-logout a').bind('click',logout);
	}
	
	function dispose(){
		_this = null;
	}
}