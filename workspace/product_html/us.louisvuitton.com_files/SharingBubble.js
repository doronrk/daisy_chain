function SharingBubble(){}SharingBubble.horizontalPosition;
SharingBubble.horizontalOppositePosition;
SharingBubble.verticalPosition;
SharingBubble.verticalOppositePosition;
SharingBubble.sharingBubble;
SharingBubble.sharingBubbleSelector;
SharingBubble.sharingButton;
SharingBubble.bubbleWidth;
SharingBubble.roomAtLeftSide;
SharingBubble.roomAtRightSide;
SharingBubble.openSharingBubble=function(a){this.initiateElementVariable(a);
this.determineHorizontalPosition();
this.placeBubbleHorizontally();
this.placeBubbleVertically();
this.setStyles();
this.handleClose();
this.launchOpening()
};
SharingBubble.initiateElementVariable=function(a){this.sharingBubbleSelector=a;
this.sharingBubble=$(this.sharingBubbleSelector);
this.sharingButton=this.sharingBubble.parent().find(".shareButton");
this.sharingArrowOpened=this.sharingButton.parent().find(".bubbleShareOpened");
this.closebutton=this.sharingButton.parent().find(".closeButton")
};
SharingBubble.determineHorizontalPosition=function(){var a=parseInt(this.sharingBubble.css("padding-left"))+parseInt(this.sharingBubble.css("padding-right"))+this.getBorderWidth()*2;
this.roomAtLeftSide=parseInt(this.sharingButton.offset().left)+parseInt(this.sharingButton.width())-a;
this.roomAtRightSide=parseInt($(window).width())-(parseInt(this.sharingButton.offset().left)+a+10);
this.horizontalPosition=this.roomAtLeftSide<this.roomAtRightSide?"Right":"Left";
this.horizontalOppositePosition=this.reverseHorizontal(this.horizontalPosition)
};
SharingBubble.getBorderWidth=function(){var a="0px";
if(isIE_InfEq8){return parseInt(a)
}else{return parseInt(this.sharingBubble.css("border-left-width"))
}};
SharingBubble.placeBubbleHorizontally=function(){this.sharingBubble.css(this.horizontalOppositePosition.toLowerCase(),-1)
};
SharingBubble.placeBubbleVertically=function(){this.sharingBubble.css("bottom",this.sharingButton.height()+24);
this.verticalPosition="Top";
this.verticalOppositePosition=this.reverseVertical(this.verticalPosition)
};
SharingBubble.isThereEnoughRoomAtBottom=function(c){var b=this.getBubbleHeight(this.sharingBubbleSelector,c);
var a=$(".footer").offset().top-(this.sharingButton.offset().top+this.sharingButton.height());
return b<a
};
SharingBubble.setBubbleWidth=function(){this.bubbleWidth=this.getBubbleWidth(this.sharingBubbleSelector);
var a=Math.max(this.roomAtLeftSide,this.roomAtRightSide);
this.sharingBubble.width(Math.min(this.bubbleWidth,a))
};
SharingBubble.isPositionnedLeft=function(){return this.horizontalPosition=="Left"
};
SharingBubble.getBubbleWidth=function(b){var a=$(b).clone();
a.width("auto");
a.show();
a.css("visibility","hidden");
a.css("white-space","nowrap");
$(b).parent().append(a);
var c=a.width();
a.remove();
return c
};
SharingBubble.getBubbleHeight=function(d,c){var a=$(d).clone();
a.width("auto");
a.show();
a.css("visibility","hidden");
a.width(c);
$(d).parent().append(a);
var b=a.height();
a.remove();
return b
};
SharingBubble.setStyles=function(){this.sharingButton.toggleClass("shareButtonOpened"+this.verticalPosition)
};
SharingBubble.reverseVertical=function(a){return a=="Top"?"Bottom":"Top"
};
SharingBubble.reverseHorizontal=function(a){return a=="Left"?"Right":"Left"
};
SharingBubble.setBorderRadiusCorner=function(){this.sharingBubble.removeClass("radiusTopRight");
this.sharingBubble.removeClass("radiusTopLeft");
this.sharingBubble.removeClass("radiusBottomRight");
this.sharingBubble.removeClass("radiusBottomLeft");
this.sharingBubble.addClass("radius"+this.verticalOppositePosition+this.horizontalOppositePosition)
};
SharingBubble.launchOpening=function(){this.sharingBubble.slideToggle();
this.sharingArrowOpened.slideToggle()
};
SharingBubble.handleClose=function(){$(".sharingBubble").not(this.sharingBubble).slideUp();
$(".bubbleShareOpened").not(this.sharingArrowOpened).slideUp();
this.closebutton.click(SharingBubble.closeSelectedBubble)
};
SharingBubble.closeSelectedBubble=function(){$(".sharingBubble").slideUp();
$(".bubbleShareOpened").slideUp()
};