	/*
	imiclk.com/cgi/r.cgi?m=3&mid=kbe7A26n&ptid=HOME&sp=1
	*/

	var mm_ri = String( Math.random() );
	mm_ri = mm_ri.replace( /0\./g,'' );

	var mm_protocol = location.protocol;
	if ( mm_protocol != 'http:' && mm_protocol != 'https:' ){ mm_protocol = 'http:'; }

	var mm_el0 = document.createElement('img');
	var url0 = 'imiclk.com/cgi/r.cgi?m=3&mid=kbe7A26n&ptid=HOME&sp=1';
	url0 = url0.replace("\[RANDOM_NUMBER\]", mm_ri);
	mm_el0.width = 1;
	mm_el0.height = 1;
	mm_el0.src = mm_protocol + '//' + url0;

