//tealium universal tag - utag.sync ut4.0.201407311835, Copyright 2014 Tealium.com Inc. All Rights Reserved.
(function(){var host=document.location.hostname,code='',regions={'slam':{'domains':['ce','cl','mx','pe'],'codes':['312570988','312686459']},'row':{'domains':['au','ca','nz'],'codes':['312672633','312767229']},'br':{'domains':['br'],'codes':['312842065','312717314']},'ru':{'domains':['ru'],'codes':['299775606','312795113']},'eu':{'domains':['at','be','cz','de','dk','es','fi','fr','ie','it','nl','pl','se','sk','uk'],'codes':['107098409','201470918']},'us':{'domains':['com','us-adidasgroup.demandware.net'],'codes':['142501655','146498809']}};for(var r in regions){for(var i=0;i<regions[r]['domains'].length;i++){var reg=new RegExp('\.'+regions[r].domains[i]+'$','gi');if(host.match(reg)!==null){code=host.indexOf('development')>-1||host.indexOf('staging')>-1?regions[r].codes[1]:regions[r].codes[0];break;}}
if(code){break;}}
if(code){document.write('<script type="text/javascript" src="//cdn.optimizely.com/js/'+code+'.js"></'+'script>');}})();