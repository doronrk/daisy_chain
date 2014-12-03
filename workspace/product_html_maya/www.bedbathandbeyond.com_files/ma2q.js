chanalytics();

function chanalytics()
{
	var zmam = '0';
	var zmac = '0';
	var zmas = '0';
	var zmaq = '0';
	var zmap = '0';
	var zman = '0';
	var zmat = '0';
	var sid  = '0';
	var qty  = '0';
	var zmag = '0';
	var zmak = '';
	var kw = '';
	var d = ';';
	var r = document.referrer;
	var s = document.cookie + d;
	var p = s.indexOf( 'zmap=' );
	
	if( p >= 0 )
	{
		zmap = s.substring( p+5, s.indexOf(d,p+5) );
		p = s.indexOf( 'zmac=' );
		if( p >= 0 ) { zmac = s.substring( p+5, s.indexOf(d,p+5) ); }
		p = s.indexOf( 'sid=' );
		if( p >= 0 ) { sid = s.substring( p+4, s.indexOf(d,p+4) ); }
		p = s.indexOf( 'zmag=' );
		if( p >= 0 ) { zmag = s.substring( p+5, s.indexOf(d,p+5) ); }
		p = s.indexOf( 'zmak=' );
		if( p >= 0 ) { zmak = s.substring( p+5, s.indexOf(d,p+5) ); }
		p = s.indexOf( 'kw=' );
		if( p >= 0 ) { kw = s.substring( p+3, s.indexOf(d,p+3) ); }
	}
	
	if( r.length > 2000 ) { r = r.substring( 0, 2000 ); }
	
	var url = "http://chanalytics.merchantadvantage.com/inChannel/cap2q_new.asp";
    if ( document.URL.indexOf("https") >= 0 )
	{
    	url = "https://secure.merchantadvantage.com/inChannel/cap2q_new.asp";
	}
	
	var imgs = '';
	d = '&';
	for( var i = 0; i < document.images.length; i++ )
	{
		s = '';
		if( document.images[i].src.indexOf('zmam=') >= 0 )		{ s = document.images[i].src + d; }
		else if( document.images[i].id.indexOf('zmam=') >= 0 )	{ s = document.images[i].id + d;  }
		
		if( s.length > 0 )
		{
			if( s.indexOf('%27') > 0 ) { s = s.replace('%27',''); } // remove single quotes
			
			p = s.indexOf( 'zmam=' );
			if( p >= 0 ) { zmam = s.substring( p+5, s.indexOf(d,p+5) ); }
			p = s.indexOf( 'zmas=' );
			if( p >= 0 ) { zmas = s.substring( p+5, s.indexOf(d,p+5) ); }
			p = s.indexOf( 'zmaq=' );
			if( p >= 0 ) { zmaq = s.substring( p+5, s.indexOf(d,p+5) ); }
			p = s.indexOf( 'quantity=' );
			if( p >= 0 ) { qty = s.substring( p+9, s.indexOf(d,p+9) ); }
			p = s.indexOf( 'pcode=' );
			if (p >= 0) { zmap = s.substring(p + 6, s.indexOf(d, p + 6)); }
			
			p = zmap.indexOf('#');
			if (p >= 0) {
			    zmap = unescape(zmap.substring(0, p)) + zmap.substring(p, zmap.length);
                zmap = encodeURIComponent(zmap);
            }

			p = s.indexOf( 'zman=' );
			if( p >= 0 ) { zman = s.substring( p+5, s.indexOf(d,p+5) ); }
			p = s.indexOf( 'zmat=' );
			if( p >= 0 ) { zmat = s.substring( p+5, s.indexOf(d,p+5) ); }
			
			if( zmat.indexOf(',') >= 0 ) { zmat = zmat.replace(',',''); }
			if( zmat.indexOf('$') >= 0 ) { zmat = zmat.replace('$',''); }
			if( zmat.length == 0 ) { zmat = '0'; }
			if (qty.length == 0) { qty = '0'; }

			imgs += "<img src=\"" + url + "?" + "zmam=" + zmam + "&zmac=" + zmac + "&zmas=" + zmas + 
					"&zmap=" + zmap + "&zman=" + zman + "&zmat="+ zmat + "&zmaq=" + zmaq + 
					"&sid=" + sid + "&zmag=" + zmag + "&zmak=" + zmak + "&kw=" + kw + 
					"&qty=" + qty + "&zmar=" + r + "\" width=0 height=0 border=0>";
		}
	}
	
	document.write( imgs );
}
