/*******************************************************************
 * 
 *  Invokes the Login or Add Connections plugin depending on the 
 *  login status.
 * 
 ******************************************************************/

if(typeof(Demandware)=='undefined')Demandware = {};
if(!Demandware.Gigya)Demandware.Gigya = {};

Demandware.Gigya.Login = function(moduleId){
	var _defaultHeight = 60;
	var _defaultWidth = 320;
	var _defaultButtonStyle = 'standard'
	
	var _divParams = null;
	var _divContainer = null;
	var _moduleId = moduleId;
	var _height = null;
	var _width = null;
	var _buttonStyle = null;
	var _buttonSize = null;
	var _showTerms = null;
	var _loginCallback = null;
	var _isActive = null;
	var _providers = null;
	var _containerId = null;	
	
	
	new function(){
		$(document).bind("ready", initialize);
		$(window).bind("unload", dispose);
	}
	
	function initialize(){
		initializeElements();
				
		if(!_isActive)return;
		gigya.socialize.getUserInfo({callback:renderUI});  
	}
	
	function renderUI(response){
		if(_containerId){
			_divParams.parent().find('#gigyaLoginContainer').addClass('remove');
		}
					
		var params =
		{
			useHTML: true
			,context:{source:'loginPlugin'}
			,height:_height
			,width: _width
			,showTermsLink: _showTerms
			,buttonsStyle: _buttonStyle
			,hideGigyaLink: true
			,redirectURL: _loginCallback
			,enabledProviders: _providers
			,sessionExpiration:0 	//expire when browser closed
			,containerID: _divContainer.attr('id')
			,UIConfig:'<config><body><controls><snbuttons buttonsize="'+ _buttonSize +'" /></controls></body></config>'
		}
		
		if(_loggedIn){
			params.showEditLink=true; //enables the user to edit connections
			params.redirectURL = null;
			$('#addConnections').removeClass('remove');
			gigya.services.socialize.showAddConnectionsUI(params);
		}
		else
			gigya.services.socialize.showLoginUI(params);
	}
	
	function initializeElements(){
		_divParams = $('#divGigyaLoginParams'+_moduleId);
		_height = (_divParams.find('#txtGigyaLoginHeight').val() || _defaultHeight)*1;
		_width = (_divParams.find('#txtGigyaLoginWidth').val() || _defaultWidth)*1;
		_buttonStyle = _divParams.find('#txtGigyaLoginButtonStyle').val() || _defaultButtonStyle;
		_buttonSize = _divParams.find('#txtGigyaLoginButtonSize').val() || 35;
		_showTerms = _divParams.find('#txtGigyaLoginShowTerms').val()=='true';
		_loginCallback = _divParams.find('#txtGigyaLoginCallback').val();
		_isActive = _divParams.find('#txtGigyaActive').val()=='true';
		_loggedIn = _divParams.find('#txtGigyaLoggedIn').val()=='true';
		_providers = _divParams.find('#txtGigyaLoginProviders').val();
		_containerId = _divParams.find('#txtGigyaLoginContainer').val();
		
		_divContainer = $('#gigyaLoginContainer'+_moduleId);
		
		//if container is specified, trust the id to be unique
		if(_containerId){
			_divContainer.addClass('remove');
			_divContainer = $('#'+_containerId);
		}
		
			
	}
	
	function dispose(){
		_divParams = null;
	}
}