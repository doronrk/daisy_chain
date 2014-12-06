function callRTA() {
  var elementRTA = document.createElement('DIV');
  try { rtaCart += ''; } catch (err) { rtaCart = '';}
  try { rtaCartSku += ''; } catch (err) { rtaCartSku = '';}
  try { rtaWishlist += ''; } catch (err) { rtaWishlist = '';}
  try { rtaWishlistSku += ''; } catch (err) { rtaWishlistSku = '';}
  try { rtaTags += ''; } catch (err) { rtaTags = '';}
  try { rtaProductSKU += '';} catch (err) { rtaProductSKU = '';}
  try { rtaContentId += '';} catch (err) { rtaContentId = '';}
  try { rtaBannerId += '';} catch (err) { rtaBannerId = '';}
  try { rtaSort += '';} catch (err) { rtaSort = ''; }
  try { rtaFilters += '';} catch (err) { rtaFilters = ''; }
  try { rtaCartAddSKU += '';} catch (err) { rtaCartAddSKU = '';}
  try { rtaSessionID += '';} catch (err) { rtaSessionID = '';}
  try { rtaEmail += '';} catch (err) { rtaEmail = ''; }
  try { rtaConvertCart += '';} catch (err) { rtaConvertCart = '';}
  try { rtaClearCart += '';} catch (err) { rtaClearCart = '';}
  try { rtaProductList += '';} catch (err) { rtaProductList = '';}
  try { rtaOrderNum += '';} catch (err) { rtaOrderNum = '';}
  try { rtaCartAmounts += '';} catch (err) { rtaCartAmounts = '';}
  try { rtaCartQuantities += '';} catch (err) { rtaCartQuantities = '';}
  try { rtaReportingSegment1 += '';} catch (err) { rtaReportingSegment1 = '';}
  try { rtaReportingSegment2 += '';} catch (err) { rtaReportingSegment2 = '';}
  try { rtaRating += '';} catch (err) { rtaRating = '';}
  try { rtaSearch += '';} catch (err) { rtaSearch = '';}
  try { rtaDiscount += ''; } catch (err) { rtaDiscount = '';}
  try { rtaUniqueId += '';} catch (err) { rtaUniqueId = '';}
  try { rtaCategory += '';} catch (err) { rtaCategory = '';}
  try { rtaSpecial += '';} catch (err){ rtaSpecial = '';}
  try { rtaCartValues += ''; if (rtaCartValues != '') rtaCartAmounts = rtaCartValues;} catch (err) {}
  try { rtaRetailer += '';} catch (err){ rtaRetailer = '';}
  try { rtaShipping += '';} catch (err) { rtaShipping = '';}

  var itemId = '';
  if(rtaContentId.length > 0){
      itemId = rtaContentId;
  } else if (rtaBannerId.length > 0){
      itemId = rtaBannerId;
  } else {
      itemId = rtaProductSKU;
  }

  protocolPrepend = 'http';
  if (document.location.protocol=='https:') protocolPrepend = 'https';
  var outstr = '<img src="' + protocolPrepend + '://nova.collect.igodigital.com/collect/recordWithImage?u=' + encodeURIComponent(window.location.href) + '&g=' + encodeURIComponent(rtaDiscount) + '&r=' + encodeURIComponent(document.referrer) + '&t=' + encodeURIComponent(document.title) + '&c=' + encodeURIComponent(rtaCart) + '&cart_skus=' + encodeURIComponent(rtaCartSku) + '&wish=' + encodeURIComponent(rtaWishlist) + '&wish_skus=' + encodeURIComponent(rtaWishlistSku) + '&w=' + encodeURIComponent(rtaTags) + '&p=' + encodeURIComponent(itemId) + '&s=' + encodeURIComponent(rtaSort) + '&f=' + encodeURIComponent(rtaFilters) + '&a=' + encodeURIComponent(rtaCartAddSKU) + '&e=' + encodeURIComponent(rtaSessionID)+ '&l=' + encodeURIComponent(rtaProductList) + '&m=' + encodeURIComponent(rtaEmail) + '&o=' + encodeURIComponent(rtaOrderNum) + '&x=' + encodeURIComponent(rtaConvertCart) + '&b=' + encodeURIComponent(rtaCartAmounts) + '&z=' + encodeURIComponent(rtaClearCart) + '&q=' + encodeURIComponent(rtaCartQuantities) + '&j=' + encodeURIComponent(rtaReportingSegment1) + '&k=' + encodeURIComponent(rtaReportingSegment2) + '&d=' + encodeURIComponent(rtaRating) + '&search=' + encodeURIComponent(rtaSearch) + '&category=' + encodeURIComponent(rtaCategory) + '&special=' + encodeURIComponent(rtaSpecial) + '&unique_id=' + rtaUniqueId + '&retailer=' + encodeURIComponent(rtaRetailer) + '&sh=' + encodeURIComponent(rtaShipping) +  '" style="display:none" width="0" height="0">' ;
  elementRTA.innerHTML = outstr;
  var bodyRef = document.getElementsByTagName("body").item(0);
  bodyRef.appendChild(elementRTA);
}

function addLoadEvent(func) {
  if (typeof window.addEventListener != "undefined") {
    window.addEventListener("load", func, false);
  } else if (typeof window.attachEvent != "undefined") {
    window.attachEvent("onload", func);
  } else {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
      window.onload = func;
    } else {
      window.onload = function() {
        if (oldonload) {
          oldonload();
        }
        func();
      }
    }
  }
}

