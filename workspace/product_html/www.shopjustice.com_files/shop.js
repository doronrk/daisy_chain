function autoHeight(){var maxHeight=0;
$(".productInfo .tab-content").each(function(){var heightDiv=$(this).height();
if(maxHeight<heightDiv){maxHeight=heightDiv;
}$(this).css("min-height",maxHeight);
});
}$(document).ready(function(){$("#tabs").tabs();
var contentTab="tabs";
var indexTab=0;
$("#tabs").bind("tabsselect",function(event,ui){if(contentTab==$(this).attr("id")){tabSelected=ui.panel.id;
indexTab=ui.index;
}contentTab="tabs";
});
autoHeight();
});