var sizeTypeID;	
var prodId,sizeCode;		
var colorCode;
var imageId;
 
//On selecting the Size Type(i.e Regular, Petite, Tall) to load the size and color fragment
function displaySizeType(id,skuId){
	selectedSizeId="";
	selectedColorId="";
	sizeTypeID = id;		
	var sizeUrl= "/ann/catalog/skuSize.jsp?prodId="+sizeTypeID+"&skuId="+skuId;
	$("#SelectSize_0").load(sizeUrl,function(){});
	var colorUrl = "/ann/catalog/skuColor.jsp?prodId="+sizeTypeID+"&skuId="+skuId;
	$("#color-picker").load(colorUrl,function(){
		//To display the color after loading the fragment
		document.getElementById("newColorText_0").innerHTML = document.getElementById("colorName").value;
	});
	if($.browser.msie) {
		$(function(){
			$("#selRootCat").attr("class", "selected");
			$("#selChildCat").attr("class", "selected");
		});
	}else{
		document.getElementById("selRootCat").setAttribute("class", "selected");	
		document.getElementById("selChildCat").setAttribute("class", "selected");
	}
	if(document.getElementById("selectedPage")!= null) {
		document.getElementById("selectedPage").setAttribute("class", "selected");
	}	   
}

 
//On clicking the size display the assosiated color swatches
 
function displayColors(obj,id,productId,skuId,productPageType,colorExplode) {	
	selectedSizeId = ".size"+obj.id+" a";	
	sizeCode = id;
	//alert($(a).attr("id"))
	//Make size selected
	var id = "#"+sizeCode;
	$("[class$='selected']").removeClass("selected");	
	$(id).addClass("selected");	
	//Passing the selected sizeCode and colorCode to the skuColor.jsp
	var colorCodeId=document.getElementById("colorCode").value;
	imageId=document.getElementById("imageId").value;
	document.getElementById("sizeCode").value = sizeCode;
	//on clicking the size load skuColor.jsp				
	var url="/ann/catalog/skuColor.jsp?prodId=" + productId + "&" +  "sizeCode=" + sizeCode + "&colorCode="+colorCode +"&imageId="+imageId+"&skuId="+skuId+"&productPageType="+productPageType+"&colorExplode="+colorExplode;
	$("#color-picker").load(url,function(){});
	//document.getElementById("selRootCat").setAttribute("class", "selected");	
	//document.getElementById("selChildCat").setAttribute("class", "selected");	
	if($.browser.msie) {
		$(function(){
			$("#selRootCat").attr("class", "selected");
			$("#selChildCat").attr("class", "selected");
		});
	}else{
		document.getElementById("selRootCat").setAttribute("class", "selected");	
		document.getElementById("selChildCat").setAttribute("class", "selected");
	}
	if(document.getElementById("selectedPage")!= null) {
		document.getElementById("selectedPage").setAttribute("class", "selected");
	}	  			
}
		
 
		
//On clicking the color swatch display assosiated sizes
 
function displaySizes(obj,id,productId,skuId,productPageType,colorExplode){
	selectedColorId="#"+obj.id;	
	colorCode = id;
	//Make the swatch selected
	imageId=document.getElementById("imageId").value;
	$("[class$='selected']").removeClass("selected");
	$(obj).addClass("selected");
	//Passing the selected sizeCode and colorCode to the skuSize.jsp
    sizeCode =document.getElementById("sizeCode").value;
	document.getElementById("colorCode").value = colorCode;
	var url="/ann/catalog/skuSize.jsp?prodId=" + productId + "&" +  "colorCode=" + colorCode+"&sizeCode="+sizeCode+"&imageId="+imageId+"&skuId="+skuId+"&productPageType="+productPageType+"&colorExplode="+colorExplode;
	$("#SelectSize_0").load(url,function(){});
	document.getElementById("sizeCode").value = sizeCode;
	if($.browser.msie) {
		$(function(){
			$("#selRootCat").attr("class", "selected");
			$("#selChildCat").attr("class", "selected");
		});
	}else{
		document.getElementById("selRootCat").setAttribute("class", "selected");	
		document.getElementById("selChildCat").setAttribute("class", "selected");
	}	
	if(document.getElementById("selectedPage")!= null) {
		document.getElementById("selectedPage").setAttribute("class", "selected");
	}	  
}
 

//To display the color name on mouse over of the color swatch
function displaySwatchName(colorName, onlineFlag){
	if(onlineFlag == 'true'){		
		document.getElementById("newColorText_0").innerHTML = colorName+" - Online Exclusive";
	}else{
		document.getElementById("newColorText_0").innerHTML = colorName;
	}
	
}

function handleNext(){
 document.getElementById('nextItem').disabled = false;
 document.serachForm.submit();
}
function handlePrev(){
  document.getElementById('prevItem').disabled = false; 
  document.serachForm.submit();
}

function editItem()  { 	
  	loadFragment("/ann/cart/cartDynamic.jsp","#includeCart")
}