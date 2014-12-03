$(document).ready(function($){$(".ajaxButton").live("click",function(e){e.preventDefault();
buttonId=$(this).attr("id");
if(typeof buttonId==="undefined"){buttonId=$(this).attr("rel");
}buttonHref=$(this).attr("href");
openAjaxModal(buttonHref,buttonId);
});
});
function signUpButtonClick(userType){buttonHref="/";
button=$("#emailSignupButton");
buttonId=button.attr("id");
button.attr("href","#");
if(userType=="overlay"){buttonHref="/includes/account/emailsignup.jsp";
openAjaxModal(buttonHref,buttonId);
}else{if(userType=="redirect"){window.location="/account/commSettings.jsp?redirect=signed";
}}}function openAjaxModal(buttonHref,buttonId){$(".ui-dialog-content").dialog("destroy");
$("#dialog-message").remove();
$("#"+buttonId+"Modal").remove();
if($("#"+buttonId+"Modal").length==0){$("body").append('<div id="'+buttonId+'Modal"></div>');
}$("#"+buttonId+"Modal").load(buttonHref);
var wWidth=$(window).width();
var wHeight=$(window).height();
var popWidth=eval(buttonId).width;
var popHeight=eval(buttonId).height;
var yposition=(wHeight/2)-((popWidth*0.7)/2);
var xposition=(wWidth/2)-(popWidth/2);
$("#"+buttonId+"Modal").dialog({height:"auto",minWidth:eval(buttonId).width,minHeight:eval(buttonId).height,modal:true,bgiframe:true,draggable:true,resizable:false,autoOpen:true,closeOnEscape:true,hide:"fade",show:"fade",position:[xposition,yposition]});
}function validateState(country){$("#state").empty();
$("#state").append('<option value="" selected="true">Select</option>');
$("#countryPicker").load("/includes/statePicker.jsp?countryCode="+escape(country));
}function validateAndSetState(countryCode,stateCode){$("#state").empty();
$("#state").append('<option value="">Select</option>');
$("#countryPicker").load("/includes/statePicker.jsp?countryCode="+escape(countryCode),function(){jQuery(document).ready(function(){setSelectedState(countryCode,stateCode);
});
});
}function validateAndSetStateWithOverrideStates(countryCode,stateCode,overrideStates){$("#state").empty();
$("#state").append('<option value="">Select</option>');
$("#countryPicker").load("/includes/statePicker.jsp?countryCode="+escape(countryCode)+"&overrideStates="+escape(overrideStates),function(){jQuery(document).ready(function(){setSelectedState(countryCode,stateCode);
});
});
}function setSelectedState(countryVal,stateVal){var slId="";
if(countryVal!=""&&stateVal!=""){slId="state";
}if(slId!=""){$("#"+slId+" option:selected").removeAttr("selected");
$("#"+slId+" option[value="+stateVal+"]").attr("selected",true);
}}function stateProvinceSync(){prov=$("#province_val").val();
state=$("#state").find(":selected").val();
if(state==""&&prov!=""){if($("#province").is(":visible")){$("#state").append('<option value="'+prov+'" selected="true">'+prov+"</option>");
}}}function loadThumbnailImage(uri,prdId,prdImg,elem){$("img.border-img-selected").addClass("border-img-unselected").removeClass("border-img-selected");
$("img.border-img-unselected",elem).removeClass("border-img-unselected").addClass("border-img-selected");
$.ajax({type:"GET",url:uri+"?productId="+prdId+"&prdImage="+prdImg,success:function(data){$("#productImage_"+prdId).attr("src",$("#productImage_"+prdId,data).attr("src"));
return false;
}});
}function loadQuickViewThumbnailImage(uri,prdId,prdImg,elem){$("img.quickViewBorderImgSelected").addClass("border-img-unselected quickViewBorderImgUnselected").removeClass("border-img-selected quickViewBorderImgSelected");
$("img.quickViewBorderImgUnselected",elem).removeClass("border-img-unselected quickViewBorderImgUnselected").addClass("border-img-selected quickViewBorderImgSelected");
$.ajax({type:"GET",url:uri+"?productId="+prdId+"&prdImage="+prdImg,success:function(data){$(".quickViewImage_"+prdId).attr("src",$("#productImage_"+prdId,data).attr("src"));
return false;
}});
return false;
}