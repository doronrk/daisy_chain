define("views-site-interestlistheader",["jquery","get!core/eBags"],function(n,t){function i(){t.subscribe("/interestListItem/added",function(){var t=parseInt(n(".myEbagsCount").html());t=t||0;n(".myEbagsCount").html(t+1)});t.subscribe("/interestListItem/removed",function(){var t=parseInt(n(".myEbagsCount").html()),i=t-1<=0?"":t-1;n(".myEbagsCount").html(i)})}return i})