define("googleTagManager/eBagsGtm",["jquery","get!core/eBags"],function(n,t){var i={};return i.FireRegistrationEvent=function(t){n.getJSON("/Site/GetRegistrationEventInfo").done(function(n){window.dataLayer.push({nanigansRegistrationEmailHash:n.NanigansRegistrationEmailHash,eBagsExternalReferenceId:n.EBagsExternalReferenceId,event:t})})},t.subscribe("/interestListItem/added",function(n){window.dataLayer.push({event:"eBagsAddToInterests",eBagsProductIds:n})}),t.subscribe("/interestListItem/removed",function(n){window.dataLayer.push({event:"eBagsRemoveFromInterests",eBagsProductIds:n})}),t.subscribe("/interestList/tab",function(n){n!=null&&window.dataLayer.push({event:n})}),i})