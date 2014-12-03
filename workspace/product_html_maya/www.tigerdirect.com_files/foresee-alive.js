var $$FSR = {
    'timestamp': 'February 7, 2014 @ 11:33 AM',
    'version': '16.1.2.5',
    'build': '11',
    'enabled': true,
    'frames': false,
    'sessionreplay': true,
    'auto': true,
    'encode': true,
    'files': '/foresee/',
    // needs to be set when foresee-transport.swf is not located at 'files'
    //'swf_files': '__swf_files_'
    'image_files': '//images.highspeedbackbone.net/foresee/',
    'id': 'mK1ouQGWPwO+2yZaXoIs1w==',
    'definition': 'foresee-surveydef.js',
    'swf': 'foresee-transport.swf',
    'worker': 'foresee-worker.js',
    'embedded': false,
    'replay_id': 'tigerdirect.com',
    'attach': false,
    'renderer': 'W3C', // or "ASRECORDED"
    'layout': 'CENTERFIXED', // or "LEFTFIXED" or "LEFTSTRETCH" or "CENTERSTRETCH"
    'triggerDelay': undefined,
    'heartbeat': true,
    'pools': [{
        path: 'tigerdirect.ca',
        sp: 0
    }, {
        path: '.',
        sp: 20
    }],
    'sites': [{
        path: /\w+-?\w+\.(com|org|ca|edu|gov|net|co\.uk)/
    }, {
        path: '.',
        domain: 'default'
    }],
    storageOption: 'cookie',
    nameBackup: window.name
};

var FSRCONFIG = {};

// -------------------------------- DO NOT MODIFY ANYTHING BETWEEN THE DASHED LINES --------------------------------
(function(a,c,f){for(var c=a.sites,b=0,g=c.length;b<g;b++){var d;"[object Array]"!==Object.prototype.toString.call(c[b].path)&&(c[b].path=[c[b].path]);for(var e=0,h=c[b].path.length;e<h;e++)if(d=f.location.href.toLowerCase().match(c[b].path[e])){a.siteid=b;a.site=a.sites[b];a.site.domain?"default"==a.site.domain&&(a.site.domain=null):a.site.domain=d[0];a.site.secure||(a.site.secure=null);a.site.name||(a.site.name=d[0]);break}if(d)break}f.cookie="fsr.a"+(a.site.cookie?"."+a.site.cookie:"")+"=suspended;path=/"+
(a.site.domain?";domain="+a.site.domain+";":";")+(a.site.secure?"secure":"")})($$FSR,window,window.document);