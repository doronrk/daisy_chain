if (typeof cmSetClientID == 'function') {
    if (window.location.hostname.indexOf('dev') > -1) cmSetClientID('60033273',false,'testdata.coremetrics.com','nordstrom.com');
	else cmSetClientID('90033273',false,'1901.nordstrom.com','nordstrom.com');
}