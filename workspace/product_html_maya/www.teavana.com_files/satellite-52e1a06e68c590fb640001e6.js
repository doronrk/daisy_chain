_satellite.pushBlockingScript(function(event, target, $variables){
  // get the campaign ID, which we use to identify the affiliate
var cid = (_satellite.getQueryParam('cm_mmc')||'').toLowerCase(),val='';

// Linkshare
if(cid.indexOf('linkshare')>-1){
  val = 'lnkshr';
}

// Impact Radius
if(cid.indexOf('impactradius')>-1){
  val = 'impctrds';
}

// if they came from an affiliate, set the cookie of who it last was.
// this is used on the purchase page to determine who to notify of
// a purchase
if(val){
  _satellite.setCookie('lstAff',val,31);
}
});
