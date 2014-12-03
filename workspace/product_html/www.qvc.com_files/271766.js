var movePDHead = function(){
  var moveLoc = get.id('divProductDetailPhotoVideoWrapper');
  var head = get.className('fn')[0];
  var mkt = get.id('parMarketingText');
  if (moveLoc != null) {
    if (head != null) {
      head = head.cloneNode(true);
      head.innerHTML=(head.innerHTML.search(/Auto-Delivery/)>-1)?head.innerHTML.replace(/Auto-Delivery/,'<span class="autoD">(Auto-Delivery)</span>'):head.innerHTML;
      head.className = 'refreshDesc';
      moveLoc.parentNode.insertBefore(head,moveLoc);
    }
    if (mkt != null) {
      mkt = mkt.cloneNode(true);
      mkt.id = 'parMarketingTextRef';
      moveLoc.parentNode.insertBefore(mkt,moveLoc);
    }
  }
  var itemCat = document.getElementById('spanTodaysSpecialValue');
  if (itemCat != null && (itemCat.innerHTML == "Today's Special Value" || itemCat.innerHTML == "One Time Only")) {
    itemCat.className = 'tsvPromo';
  }
}

var updatePDThumbnails = function(){
  var thumbs = get.id('divProductDetailViewThumbnailsImages');
  var enlg = get.id('divEnlarge');
  if (thumbs != null) {
    var brk = thumbs.getElementsByTagName('br');
    for (i=0; i<brk.length; i++) {
      thumbs.removeChild(brk[i]);
    }
  }
  if (typeof(videoMedia) == 'undefined') { return; }
  var vidThumb = document.createElement('a');
  vidThumb.id = 'linkVidsView';
  vidThumb.className = 'noclick';
  vidThumb.href = '#vidPlayerHolder560x315';
  vidThumb.onclick=function(){$('#vob').trigger('click')};
  var vidImg = document.createElement('img');
  vidImg.id = 'linkVidsViewImg';
  vidImg.alt = 'Watch Videos';
  vidImg.width = '111';
  vidImg.height = '57';
  vidImg.src = videoMedia.video[0].thumbnail[1].url;
  vidThumb.appendChild(vidImg);
  if (enlg != null) { enlg.appendChild(vidThumb); }
}

var updateTSVColor = function(){
  var tsvPrice = document.getElementById('parTodaysSpecialValuePrice');
  if (tsvPrice != null && (tsvPrice.innerHTML.indexOf("Today's Special Value") != -1 || tsvPrice.innerHTML.indexOf("One Time Only") != -1)) {
     var tsvProdInfo=document.getElementById('divProductPricingInfo');
        if(tsvProdInfo!=null){$(tsvProdInfo).addClass('tsvPromo');}
    tsvPrice.innerHTML = tsvPrice.innerHTML.replace(/ Price/gi,'');
  }
}

var moveShipQtyPrcMob= function(){
  $('#divProductPricingInfo').insertBefore('#divProductDetailSelectQuantityAndGiftOptions');
  $('#divProductDetailEasyPayInfo').insertBefore('#divProductDetailSelectQuantityAndGiftOptions');
  $('#divProductShippingAndHandlingInfo').insertBefore('#divProductDetailSelectQuantityAndGiftOptions');
    
}

var moveSocial = function(){
  var pVWrap = document.getElementById('divProductDetailPhotoVideoWrapper');
  var pDWrap = document.getElementById('divProductDetailDescriptionSelection');
  var pWWrap = document.getElementById('divProductDetailsWrapper');
  var bvDiv = document.getElementById('divCustomerReviewSummary');
  var bvSocial = get.className('BVRRSocialBookmarkingLinks');
  var bvQA = document.getElementById('BVQASummaryContainer');
  var pdSize = document.getElementById('divProductDetailSelectSize');
  var pdColor = document.getElementById('divProductDetailSelectColor');
  var pdQuant = document.getElementById('divProductDetailSelectQuantityAndGiftOptions');
  if (pDWrap != null && pVWrap != null && bvDiv != null) {
    var emailFriend = get.className('email',bvDiv);
    var fbLike = get.className('fb_iframe_widget',pDWrap);
    var socialBox = document.createElement('div');
    socialBox.id = 'divProductDetailSocialDisplay';
    if (bvSocial.length > 0) { socialBox.appendChild(bvSocial[0]); }
    if (fbLike.length > 0) { socialBox.appendChild(fbLike[0].parentNode);
                           fbLike[0].style.display='block';}
    if (emailFriend.length > 0) { socialBox.appendChild(emailFriend[0].parentNode); }
    if (bvQA != null) { socialBox.appendChild(bvQA); }
    
    if(responsiveViewVal=="desktop"){ 
    pVWrap.appendChild(socialBox);
       if (pdSize != null) {
      pDWrap.insertBefore(bvDiv,pdSize);
	  } else if (pdColor != null) {
      pDWrap.insertBefore(bvDiv,pdColor);
    } else if (pdQuant != null) {
      pDWrap.insertBefore(bvDiv,pdQuant);
    }
    }
   else if(responsiveViewVal=="mobile"){
	document.getElementById('tabShareContent').innerHTML="";
	document.getElementById('tabShareContent').appendChild(socialBox);
      $('#tabShare').trigger('click');
      $('#tabShare').unbind('click');
       pWWrap.insertBefore(bvDiv,pVWrap); 
		bvQAMob=document.createElement('div');
		bvQAMob.setAttribute('id','bvQAMob');
		hdTitle=document.getElementById('BVQAHeaderTitleID');
           if(hdTitle !=null){
             bvQAMob.appendChild(hdTitle);
             hdTitle.style.display='block';
             hdTitle.style.color='#333';
           }
		hd=document.getElementById('BVQAHeaderID');
           if(hd!=null){
             bvQAMob.appendChild(hd);
             hd.style.display='block';
             hd.style.color='#e36666';
           }
		document.getElementById('tabShareContent').appendChild(bvQAMob);
		tb=document.getElementById('BVQAPageTabBrowseID');
		bvQAMob.appendChild(tb);
		$('#bvQAMob #BVQAPageTabBrowseID a')[0].innerHTML="View All"; 
      	  $("#BVQAPageTabBrowseID a").click(function() {
            if(!$('#tabProductDetailCustomerReviewNav2').hasClass('selected'))
            $('#tabProductDetailCustomerReviewNav2').trigger('click');
            $('html, body').animate({
            scrollTop: $("#BVQAContainer #BVQAPageTabHomeID").offset().top
            }, 1000);
		});
           var pdInc=$('#pdIncludeHtml');
         if(pdInc!=undefined){
        $('#tabShareContent').append(pdInc);
      }
}
  
    
     bvDiv.style.display = 'block';
  }
  if($('#divCustomerReviewSummary').find('.BVRRCount').eq(1).length!=0){
  $('#divCustomerReviewSummary').find('.BVRRCount').eq(1).html($('#divCustomerReviewSummary').find('.BVRRCount').eq(1).html().replace(/customer/i,''));
  }
  
  if(typeof qvp!= 'undefined')
  qvp.windowResize();
  }

function resetBorders(){
  $('#divProductDetailViewThumbnailsImages a img').each(function(index, img){
    $(img).css("border", "2px solid #f1f1f2");
  });
}

function setSelected(img){
  $(img).css("border", "2px solid #e36666");
}

var select=function(obj){
  if(obj.status == 'waitlist'){
    if ((obj.className == "selectSizeLarge") || (obj.className == "selectColorLarge")) {
      obj.style.background='url(' + storeImagePath + obj.set + '_waitlist_selected_lg-jr.gif)';
    } else {
      obj.style.background='url(' + storeImagePath + obj.set + '_waitlist_selected-jr.gif)';
    }
  } else {
    if ((obj.className == "selectSizeLarge") || (obj.className == "selectColorLarge")){
      obj.style.background='url(' + storeImagePath + obj.set + '_selected_lg-jr.gif)';
    } else {
      obj.style.background='url(' + storeImagePath + obj.set + '_selected-jr.gif)';
    }
    obj.status="selected";
  }
  obj.style.color="#e36666"
  obj.selectedItem=true;
  if (obj.className.indexOf('Color') > -1){
    if (obj.childNodes[1] != null) {
      if (obj.childNodes[1].childNodes[0] != null) {
        obj.childNodes[1].childNodes[0].setAttribute('src', storeImagePath + 'shim.gif');
        obj.childNodes[1].style.display = 'none';
      }
    }
    obj.style.opacity = '1';
    obj.style.filter = 'alpha(opacity=' + 100 + ')';
  }
}

var movShipInfo=function(){
//$('.endTimeTxt').insertAfter($('#parQvcPrice'));
$('#parShippingAndHandlingDetails').insertAfter($('#divProductDetailSelectQuantityAndGiftOptions>span'));
$('#parShippingAndHandlingDescription').insertAfter($('#divProductDetailSelectQuantityAndGiftOptions>span'));
$('#parShippingAndHandlingDetails>a').removeClass('arrowSecondary');
if($('#parShippingAndHandlingDescription').length>0 && $('#parShippingAndHandlingDescription').length>0 && $('#parShippingAndHandlingDescription').html().indexOf('save')>0){$('#parShippingAndHandlingDescription').html($('#parShippingAndHandlingDescription').html().replace(/save/i,'<b>SAVE</b>'))};
}

var prependVerticalBar=function(){
  $('.refreshDesc').prepend('<span class="vBar">|</span>');
}



var cmPID = window.coremetrics.cmLastReferencedPageID;
var groupStr = cmPID.indexOf("GROUP");
if(groupStr < 0){
updatePDThumbnails();
movePDHead();
updateTSVColor();
movShipInfo(); 
prependVerticalBar();
if(responsiveViewVal=="mobile"){
moveShipQtyPrcMob();}
setTimeout(moveSocial,5000);
}
