require(["jquery"],function(a){if(MACYS){MACYS.visualsearch=(function(){var b={};b.getBlob=function(){var j="image/png";var f=a("#vsimagedata").val();var g=window.atob(f);var h=new Array(g.length);for(var e=0;e<g.length;e++){h[e]=g.charCodeAt(e)}var c=new Uint8Array(h);var d=new Blob([c],{type:j});return d};b.enableSubmit=function(){var d=a("#vscatid").val(),c=a("#vsimagedata").val();if(d&&c){a(".vsImageSubmit").removeClass("vsbtdisabled");a(".vsImageSubmit").off("click").on("click",MACYS.visualsearch.handleFeedback)}};b.resizeAndUpload=function(e,c){var f=new Image();f.src=c;f.onload=function(){var l=600,g=800,h=0.7,m=f.width,i=f.height;if(m>i){if(m>l){i*=l/m;m=l}}else{if(i>g){m*=g/i;i=g}}var j=document.createElement("canvas");j.width=m;j.height=i;var o=j.getContext("2d");o.drawImage(this,0,0,m,i);var k=j.toDataURL("image/jpeg",h);var n=k.replace(/^data:image\/(png|jpg|jpeg);base64,/,"");a("#vsimagedata").val(n);b.enableSubmit()};var d=new Image();d.src=c;d.onload=function(){var i=150,k=180;var h=document.createElement("canvas");h.width=i;h.height=k;var j=h.getContext("2d");j.drawImage(this,0,0,i,k);var g=h.toDataURL("image/jpeg");a("#vsImagePreview").empty().append("<img src='"+g+"'/>");if(a("#vsUploadImage").is(":visible")){cmCreateConversionEventTag("Upload Another Photo","2","Visual_Search_Icon")}else{cmCreateConversionEventTag("Upload Photo","2","Visual_Search_Icon")}a("#vsUploadImage").show()}};b.uidialog=function(){var e={},g,d,c,f;f=a('<div class="uidialog uivisualsearch"></div>');g=a('<div class="uidialogtitlebar"></div>');d=a('<div class="uidialogcontent"></div>');c=a('<div class="uidialogbuttons"></div>');f.hide();f.append(g,d,c);a("body").append(f);e.center=function(){var i=a("#visualSearchIcon"),h=a("#visualSearchIcon").offset(),k=h.top+i.outerHeight(),j=h.left+i.outerWidth()-f.outerWidth();f.css({top:k,left:j})};e.open=function(l){if(l.content){d.empty().append(l.content);d.css({width:l.width||"auto",height:l.height||"auto"})}if(l.title){g.empty().css({display:"block"}).append(l.title)}if(l.buttons&&l.buttons.length>0){var h=l.buttons.length,k;for(var j=0;j<h;j+=1){k=a('<div class="btns" id=bt'+j+"></div>");if(l.buttons[j].text){k.empty().append(l.buttons[j].text)}if(l.buttons[j].cssClass){k.addClass(l.buttons[j].cssClass)}if(l.buttons[j].click&&typeof(l.buttons[j].click)==="function"){k.bind("click",l.buttons[j].click)}c.append(k).css({display:"block"})}}e.center();f.show()};e.close=function(){f.remove()};return e};b.handleFeedback=function(){a("form#vsForm").trigger("submit")};b.showError=function(){a("#vsErrAr").show();a("#vsWrap").hide();a(".uidialogbuttons").hide()};b.hideError=function(){a("#vsErrAr").hide();a("#vsWrap").show();a(".uidialogbuttons").show()};return b})()}a(document).ready(function(){a("#visualSearchIcon").on("click",function(){var c=new MACYS.visualsearch.uidialog();var b="<div id='vsErrAr'><span class='cmTltRed'>Whoops!</span><br/><br/><span class='vserr' id='vserror'></span><br/><br/><div class='vsButton vsButtonmedium vsOk'>ok</div></div><div id='vsWrap'><div id='vserror'></div><input name='vsimage' id='vsimage' type='file' type='file' accept='image/*'  style='display:none'><input type='hidden' name='vscatid' id='vscatid' value=''/><input type='hidden' name='vsimagedata' id='vsimagedata' value=''/>";b+="<form  id='vsForm' style='display:none'  action='/shop/search/facetedmeta' method='POST'><input type='hidden' name='ApiKey' value='OG46GI345HIJEFBE56970CE8GR3KRLEBHDY4587FR92DBEVN' readonly='readonly'><input type='hidden' name='CategoryId' id='CategoryId' value='' readonly='readonly'><input type='hidden' name='DeviceName' value='DESKTOP' readonly='readonly'><input type='hidden' name='AppVersion' value='Fashion V1.1.3' readonly='readonly'><input type='hidden' name='Longitude' value='0' readonly='readonly'><input type='hidden' name='Latitude' value='0' readonly='readonly'></form>";b+="<div><span class='cmTltRed'>SEARCH&nbsp;</span><span class='cmTltBlack'>WITH AN IMAGE</span></div>";b+="<div><div class='pdTt10' id='selectCatTitle'><b>SELECT CATEGORY</b></div>";b+="<div class='fltLeft pdTt10 vsSubCatTabs' id='vsSubCatTabs118' dtcatname='Women'><div class='vsSubTabTitle'><div class='vsarr'></div><div>Women</div></div><div class='tbs' dcatid='5449'><div class='mrTp25'>Dresses</div></div><div class='tbs' dcatid='8699'><div class='mrTp25'>Swimwear</div></div><div class='tbs' dcatid='269'><div class='mrTp25'>Coats</div></div><div class='clrBth'></div><div class='tbs' dcatid='255'><div class='mrTp25'>Tops</div></div><div class='tbs' dcatid='120'><div class='mrTp17'>Jackets & Blazers</div></div><div class='tbs' dcatid='3111'><div class='mrTp25'>Jeans</div></div><div class='clrBth'></div><div class='tbs' dcatid='157'><div class='mrTp17'>Pants & Capris</div></div><div class='tbs' dcatid='39096'><div class='mrTp17'>Suits & Suit Separates</div></div><div class='tbs' dcatid='131'><div class='mrTp25'>Skirts</div></div><div class='clrBth'></div><div class='tbs' dcatid='260'><div class='mrTp25'>Sweaters</div></div></div>";b+="<div class='fltLeft pdTt10 vsSubCatTabs' id='vsSubCatTabs1' dtcatname='Men'><div class='vsSubTabTitle'><div class='vsarr'></div><div>Men</div></div><div class='tbs' dcatid='65'><div class='mrTp17'>Shoes & Accessories</div></div><div class='tbs' dcatid='20626'><div class='mrTp25'>Shirts</div></div><div class='tbs' dcatid='3763'><div class='mrTp17'>Coats & Jackets</div></div><div class='clrBth'></div><div class='tbs' dcatid='17788'><div class='mrTp17'>Suits & Suit Separates</div></div><div class='tbs' dcatid='11221'><div class='mrTp25'>Jeans</div></div><div class='tbs' dcatid='89'><div class='mrTp25'>Pants</div></div><div class='clrBth'></div><div class='tbs' dcatid='16499'><div class='mrTp17'>Blazers & Sport Coats</div></div><div class='tbs' dcatid='20640'><div class='mrTp25'>Polos</div></div><div class='tbs' dcatid='30423'><div class='mrTp25'>T-Shirts</div></div><div class='clrBth'></div><div class='tbs' dcatid='3310'><div class='mrTp25'>Shorts</div></div><div class='tbs' dcatid='3296'><div class='mrTp25'>Activewear</div></div><div class='tbs' dcatid='4286'><div class='mrTp25'>Sweaters</div></div></div>";b+="<div class='fltLeft pdTt10 vsSubCatTabs' id='vsSubCatTabs5991' dtcatname='Kids'><div class='vsSubTabTitle'><div class='vsarr'></div><div>Kids</div></div><div class='tbs' dcatid='63016'><div class='mrTp17'>Dresses & Dresswear</div></div><div class='tbs' dcatid='55163'><div class='mrTp25'>Swimwear</div></div><div class='tbs' dcatid='63010'><div class='mrTp17'>Jackets & Coats</div></div><div class='clrBth'></div><div class='tbs' dcatid='63013'><div class='mrTp25'>Sets</div></div><div class='tbs' dcatid='61228'><div class='mrTp25'>Activewear</div></div><div class='tbs' dcatid='63014'><div class='mrTp17'>Shirts & Tees</div></div></div>";b+="<div class='fltLeft pdTt10 vsSubCatTabs' id='vsSubCatTabs16904' dtcatname='Juniors'><div class='vsSubTabTitle'><div class='vsarr'></div><div>Juniors</div></div><div class='tbs' dcatid='18109'><div class='mrTp25'>Dresses</div></div><div class='tbs' dcatid='17043'><div class='mrTp25'>Tops</div></div><div class='tbs' dcatid='28754'><div class='mrTp25'>Jeans</div></div><div class='clrBth'></div><div class='tbs' dcatid='35786'><div class='mrTp17'>Jackets & Coats</div></div><div class='tbs' dcatid='21561'><div class='mrTp17'>Pants & Leggings</div></div><div class='tbs' dcatid='17053'><div class='mrTp17'>Jumpsuits & Rompers</div></div><div class='clrBth'></div><div class='tbs' dcatid='28589'><div class='mrTp25'>Shorts</div></div><div class='tbs' dcatid='28379'><div class='mrTp25'>Skirts</div></div></div>";b+="<div class='fltLeft pdTt10' id='vsCatTabs'><div class='tbs' dcatid='118'><img src='"+MACYS.config.Base.baseUrl+"/img/nav/womens.png'> <br/>Women</div><div class='tbs' dcatid='1'><img src='"+MACYS.config.Base.baseUrl+"/img/nav/mens.png'> <br/>Men</div><div class='clrBth'></div><div class='tbs' dcatid='5991'><img src='"+MACYS.config.Base.baseUrl+"/img/nav/kids.png'> <br/>Kids</div><div class='tbs' dcatid='16904'><img src='"+MACYS.config.Base.baseUrl+"/img/nav/jr.png'> <br/>Juniors</div><div class='clrBth'></div></div>";b+="<div class='fltRight pdTt10' style='text-align:center'><div id='vsImagePreview' style='border-color:#c00 !important'><div class='vsImageTxt'><img src='"+MACYS.config.Base.baseUrl+"/img/nav/icon-upload.png'><div class='cmTltRed pdTt10'>select <br/>image here</div></div></div><a href='javascript:void(0)' id='vsUploadImage' class='vsUploadImage' style='display:none'>Select different image</a><div class='pdTt10'>file max: 2.0MB<br/>all image types allowed</div></div><div class='clrBth'></div>";b+="</div>";c.open({content:b,width:435,height:0,buttons:[{text:"cancel",click:function(){a(".uivisualsearch").remove()},cssClass:"vsButtonmedium vsButton secondary"},{text:"submit",cssClass:"vsButtonmedium vsButton vsImageSubmit vsbtdisabled"}]});a(document).on("click",function(f){var d=f.target;if(!a(d).is("#visualSearchIcon")&&!a(d).parents().is(".uivisualsearch")){a(".uivisualsearch").remove()}});a("#vsUploadImage").on("click",function(){a("#vsimage").trigger("click");cmCreateConversionEventTag("Upload Another Photo","1","Visual_Search_Icon")});a("#vsImagePreview").on("click",function(){a("#vsimage").trigger("click");cmCreateConversionEventTag("Upload Photo","1","Visual_Search_Icon")});a("div#vsCatTabs .tbs").on("click",function(f){var d=a(f.currentTarget);d.parent().hide();a("#vsSubCatTabs"+d.attr("dcatid")).show();a("#selectCatTitle").hide()});a("div.vsSubCatTabs .tbs").on("click",function(f){var d=a(f.currentTarget);a("div.vsSubCatTabs .tbs").removeClass("tbsel");d.addClass("tbsel");a("#vscatid").val(d.attr("dcatid"));MACYS.visualsearch.enableSubmit()});a("div.vsSubTabTitle").on("click",function(f){var d=a(f.currentTarget);a("#vscatid").val("");a(".vsImageSubmit").off("click").addClass("vsbtdisabled");a("div.vsSubCatTabs .tbs").removeClass("tbsel");d.parent().hide();a("div#vsCatTabs").show();a("#selectCatTitle").show()});a(".vsOk").on("click",function(){MACYS.visualsearch.hideError()
});a("form#vsForm").submit(function(h){h.preventDefault();var g=new MACYS.visualsearch.getBlob();var j=a(this)[0],d,e,k,f;if(j){d=a("#vscatid").val();k=a("#vsimagedata").val();e="/shop/search?keyword=vsimageupload&vscatid="+d;f=a("div.vsSubCatTabs .tbsel");a("#CategoryId").val(d);if(!k){MACYS.visualsearch.showError();a("#vserror").html("Please Upload an image");return false}if(g&&g.size>153600){MACYS.visualsearch.showError();a("#vserror").html("This file size is not supported. Please upload a file that is 2.0MB or less");return false}if(!d){MACYS.visualsearch.showError();a("#vserror").html("Please select category");return false}var i=new FormData(a(this)[0]);i.append("Image",g);cmCreatePageElementTag(f.parent().attr("dtcatname")+" - "+f.text(),"Visual_Search_Camera_Icon");a.ajax({url:"http://apifs-us.cortexica-cloud.com/api/searchsimilar",type:"POST",data:i,async:false,cache:false,contentType:false,timeout:7000,dataType:"json",processData:false,success:function(l){if(l&&l.id){window.location.href=e+"&vssearchid="+l.id}},error:function(){MACYS.visualsearch.showError();a("#vserror").html("We are having technical difficulties, please try later.");return false}})}return false});a("#vsimage").on("change",function(h){var g=h.target.files,f,j;if(g&&g.length>0){f=g[0];vsFileType=f.type;if(vsFileType.indexOf("image")===-1){MACYS.visualsearch.showError();a("#vserror").html("This file type is not supported");return false}if(f&&f.size>2097152){MACYS.visualsearch.showError();a("#vserror").html("This file size is not supported. Please upload a file that is 2.0MB or less");return false}try{var d=new FileReader();d.onload=function(e){MACYS.visualsearch.resizeAndUpload(f,e.target.result)};d.readAsDataURL(f)}catch(i){MACYS.visualsearch.showError();a("#vserror").html("We are having technical difficulties, please try later.");return false}}a("#vsImagePreview").off("click")});cmCreateConversionEventTag("Visual Search","1","Visual_Search_Icon")})})});