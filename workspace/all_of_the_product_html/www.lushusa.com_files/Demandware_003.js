/*******************************************************************
 * 
 *  Invokes the Share Bar plugin
 * 
 ******************************************************************/

if(typeof(Demandware)=='undefined')Demandware = {};
if(!Demandware.Gigya)Demandware.Gigya = {};

Demandware.Gigya.ShareBar = new function(){
	var _this = this;
	var _divParams = null;
	var _title = null;
	var _description = null;
	var _imageUrl = null;
	var _linkUrl = null;
	var _shareButtons = null;
	var _layout = null;
	var _counts = null;
	var _iconOnly = null;
	var _shareMessage = null;
		
	//constructor
	new function(){
		$(document).bind("ready", initialize);
		$(window).bind("unload", dispose);
	}
	
	function initialize(){
		initializeElements();
		showShareBar();
	}
	
	function initializeElements(){
		_divParams = $('#divGigyaShareBarParams');
		_title = _divParams.find('#txtGigyaShareBarTitle').val();
		_description = _divParams.find('#txtGigyaShareBarDescription').val();
		_imageUrl = _divParams.find('#txtGigyaShareBarImageUrl').val();
		_linkUrl = _divParams.find('#txtGigyaShareBarLinkUrl').val();
		_shareButtons = _divParams.find('#txtGigyaShareBarButtons').val();
		_layout = _divParams.find('#txtGigyaShareBarLayout').val()||'horizontal';
		_counts = _divParams.find('#txtGigyaShareBarCounts').val()||'right';
		_iconOnly = _divParams.find('#txtGigyaShareBarIconOnly').val()||'true';
		_shareMessage = _divParams.find('#txtGigyaShareBarMessage').val();
		_contentId = _divParams.find('#txtGigyaShareBarContentId').val(); 
		
		//Add first image in content
		if(!_imageUrl && _contentId){ _imageUrl = $("img", $("#"+_contentId)).first().attr("src");}
	
		
	}
	
	function showShareBar(){
		var shareAction = new gigya.services.socialize.UserAction();
		shareAction.setTitle(_title);
		
		if(_description.length>100)
			_description = _description.substring(0,96)+'...';
		shareAction.setDescription(_description);
		shareAction.setLinkBack(_linkUrl);
		shareAction.setActionName(_shareMessage);
		
		var mediaImage = {
				type: 'image'
				,src: _imageUrl
				,href: _linkUrl
		};
		shareAction.addMediaItem(mediaImage);

        var shareBarParams=
	    {
        		userAction: shareAction //the gigya user action to post
        		,context: shareAction //object to be referenced after event
        		,shareButtons:_shareButtons //specify share buttons  
        		,layout:_layout
        		,showCounts:_counts
        		,iconsOnly:_iconOnly
        		,deviceType: 'auto'
        		,containerID: 'divGigyaShareBar'
        		//,onError: displayError   // error callback 
        }
        
        gigya.services.socialize.showShareBarUI(shareBarParams);
	}
	
	function displayError(event){
		 alert('An error has occured while trying to share' + ': ' + event.errorCode + '; ' + event.errorMessage);
	}
	
	
	function dispose(){
		_this = _divParams = null;
	}
}