// JavaScript Document

var detect = navigator.userAgent.toLowerCase();
    if (checkIt('chrome')){
        document.write('<style type="text/css">.gtWomens {margin-left: -55px !important;height: 415px !important;} .solCompression {margin-left: -55px !important;	} .solNonBinding {margin-left: -55px !important; }</style>');
    }
    function checkIt(string){
        var place = detect.indexOf(string) + 1;
        return place;
    }