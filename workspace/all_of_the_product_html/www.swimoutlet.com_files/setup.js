mybuys.setClient("SWIMOUTLET");

mybuys.enableZones();

mybuys.setFailOverMsecs(5000);

window.mbScope.realtimeExtractor.getOrderEmail = function()
{
  var x = window.mbScope.realtimeExtractor.getExtractedValue('ORDER_CONFIRMATION', 'emailAddress').trim();
  try{
    if(x.match(/^\((.*)\)$/))
    {
      x = x.match(/^\((.*)\)$/)[1];
    }
  }catch(err){}
  return x;
};

