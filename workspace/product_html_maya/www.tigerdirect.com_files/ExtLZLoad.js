// <![CDATA[
 function LoadSocialMedia(Division){
    renderPlusone();
    renderFaceBook(Division);
    renderTwitter();
   // renderLinkedin();
  } 


function renderFaceBook(Division){
	if (document.getElementById('fb-root')){
		window.fbAsyncInit = function() {
		var FacebookApiID = '550349935082556';
		if (Division == '99')
			FacebookApiID = '121231974618553';
		else if (Division == '28' )
			FacebookApiID = '192002344171725';
		else if (Division == '14' )
			FacebookApiID = '190581770977883';
		//alert(FacebookApiID );
		FB.init({appId: FacebookApiID  , status: true, cookie: true,

		xfbml: true});
		};
		(function() {
		var e = document.createElement('script'); e.async = true;
		e.src = document.location.protocol +
		'//connect.facebook.net/en_US/all.js';
		document.getElementById('fb-root').appendChild(e);
		}());
	}
}

function renderTwitter(){
	if (document.getElementById('TwitterDiv')){
		var newScript3 = document.createElement('script');
		newScript3.type = 'text/javascript';
		newScript3.src = 'http://platform.twitter.com/widgets.js';
		//newScript3.onload = '';
		document.getElementById('TwitterDiv').appendChild(newScript3);
		}
	}


function renderPlusone(){
	if (document.getElementById('GooglePlusOneDiv2')){
		var newScript2 = document.createElement('script');
		newScript2.type = 'text/javascript';
		newScript2.src = 'https://apis.google.com/js/plusone.js';
		newScript2.onload = rendergapi;
		newScript2.text = 'parsetags: explicit';
		document.getElementById('GooglePlusOneDiv2').appendChild(newScript2);
		}
	}


function rendergapi(){
	if (document.getElementById('GooglePlusOneDiv')){
		gapi.plusone.go('GooglePlusOneDiv');
	}
}


function renderLinkedin(){
    if (document.getElementById('LinkedinDiv')){
        var newScript4 = document.createElement('script');
        newScript4.type = 'text/javascript';
        newScript4.src = 'http://platform.linkedin.com/in.js';
        document.getElementById('LinkedinDiv').appendChild(newScript4);
    }
}

// ]]>