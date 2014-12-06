function showBraGuide(){$("#modalWindow").load("/staticpages/modals/modal-braGuide.jsp");
$("#modalWindow").modal({minWidth:780,minHeight:750,fixed:false});
$("#simplemodal-overlay").css("cursor","default");
}function first(){$.ajax({url:"/staticpages/bodyincludes/braGuideBody.jsp?braGuideType=overlay",success:function(data){$(".braGuideOverlayContainer").html(data);
}});
return false;
}function second(){$.ajax({url:"/staticpages/bodyincludes/braGuideSizeBody.jsp?braGuideType=overlay",success:function(data){$(".braGuideOverlayContainer").html(data);
}});
}function third(){$.ajax({url:"/staticpages/bodyincludes/braGuideTalkBody.jsp?braGuideType=overlay",success:function(data){$(".braGuideOverlayContainer").html(data);
}});
}