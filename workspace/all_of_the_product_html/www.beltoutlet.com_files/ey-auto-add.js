var iloadflag=0;
var fcT;

var EYFCc=getCookie("count");
var EYFCst=getCookie("subtotal");

if(EYFCc.length==0 || EYFCc=="0")
{
  EYFCc = 0;
  EYFCst = "$0.00";
}
  
EYFCc = Number(EYFCc);
EYFCst = Number(EYFCst.replace("$", ""));

function addFakeyCart()
{
 var myflag = 0;
 
 $(".options").each(function(index){
	var myoptVal = $(".options:eq("+index+") select").val();
	if(typeof(myoptVal) !== "undefined"){
		var myoptVal2 = myoptVal.replace("Select","");
		if(myoptVal != myoptVal2){
			myflag = 1;
		}
	}
 });
 
 if(myflag == 0)
 {
  document.item_form.submit();
  
  $(".FCOptRow").remove();
  
  var fcQty = $(".quantity-cell #quantity-box").val();
  fcQty = Number(fcQty);
  var fcItemPrice = $("#FCPriceRow #FCPriceTD").text();
  fcItemPrice = Number(fcItemPrice.replace("$", ""));
  var fcSetPrice = fcItemPrice * fcQty;
  
  $(".options").each(function(index){
    var optName = $(this).find("th").text();
	var optVal = "";
	$(this).find("select").each(function(){
		optVal += $(this).val() + " ";
	});
	if(optVal === ""){
		$(this).find("input").each(function(){
			optVal += $(this).val() + " ";
		});
	}
	$("#FCPriceRow").after("<tr class=\"FCOptRow\"><td class=\"fcFirstTD\">"+optName+":</td><td class=\"fcSecondTD\">"+optVal+"</td></tr>");
  });
  
  $("#CartContentsAA #FCQtyTD").html(fcQty);
  $("#CartContentsAA #FCTotalTD").html(fcSetPrice.toFixed(2));
  
  EYFCc = EYFCc + 1;
  EYFCst = EYFCst + fcSetPrice;
  $("#CartContentsAA .totalAmt tr:eq(0) td:eq(0)").html(EYFCc + " Item(s) in Cart");
  $("#CartContentsAA .totalAmt tr:eq(0) td:eq(1)").html("Subtotal:&nbsp;&nbsp;&nbsp;$"+EYFCst.toFixed(2));
  
  var EYFCtfs;
  EYFCtfs = 50 - EYFCst.toFixed(2);
  EYFCtfs = roundVal(EYFCtfs);
  EYFCtfs = EYFCtfs.toFixed(2);
  
  if(EYFCtfs > 0)
  {
	$(".cookClass").html(EYFCc + "&nbsp;ITEMS&nbsp;-&nbsp;$" + EYFCst.toFixed(2) + "<span>| $"+EYFCtfs+" more for FREE SHIPPING!</span>");
  }
  else
  {
	$(".cookClass").html(EYFCc + "&nbsp;ITEMS&nbsp;-&nbsp;$" + EYFCst.toFixed(2) + "<span>| You are eligible for FREE SHIPPING!</span>");
  }
  
  
  $("#CartContentsAA").show();
  setTimeout("hideFakeCart()", 7000);
 }
 else
 {
   alert("Please select all options to continue");
 }
}

function hideFakeCart()
{
  $("#CartContentsAA").hide();
}