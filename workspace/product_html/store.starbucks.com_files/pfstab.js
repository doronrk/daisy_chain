//version:1.0
(function( $ ){
	$.fn.pfstab = function(options) {					
		var _de = {
				 cssclass: 'sbxtab',				 
				 scrollspeed:"fast",
				 scrollon:true,
				 css:{display:"block"}
				 };
		
		$(this).find("ul:first").wrapAll("<div class='" + _de["cssclass"] +"'/>");
		var headmain =$(this).find("." + _de["cssclass"]);
		
		if (options) {						
			$.extend(_de, options);						
			$(this).css(_de["css"])
		}
		
		var mainWrapper = $(this);
		
		
		
		
		
		
		headmain.corner("top 3px");
		
		headmain.addClass("rounded top"); //in case page has not finished loading when this function runs
		headmain.find("ul:first").find("li").each(function(){
			$(this).prepend('<div class="roundednavtop">&nbsp;</div>');
			$(this).append('<div class="roundednavbottom">&nbsp;</div>');
		});
	
		// building the scroller
		var li = headmain.find("ul >li");		
		var width=0;			
		jQuery.each(li, function(){
			width +=$(this).outerWidth();			
		});		
		
		var ul = headmain.find("ul:first");
		var btnPrev;
		var btnNext;
		
		if(width > headmain.outerWidth()){
			ul.css("width",(width + 30) + "px");
			ul.wrap("<div class='sbx-clip' />");
			var clip = headmain.find(".sbx-clip");
			
			clip.before("<div class='btnPrev'>&nbsp;</div>");
			clip.after("<div class='btnNext'>&nbsp;</div>");
			
			
			btnPrev =headmain.find(".btnPrev");
			btnPrev.addClass("btnPrevOff");
			
			btnNext=headmain.find(".btnNext");
			
			var side = btnPrev.outerWidth() + btnNext.outerWidth();
			clip.css("width",(headmain.outerWidth() + btnPrev.outerWidth())  - (side + 2));
			
			headmain.wrapAll("<div class='sbx-tab-wrapper' />");
			
		}
	
	
		
		var lw = headmain.find("ul").find("li:first-child").outerWidth();
		
		headmain.find("ul").data("animatecomplete",true);
		
		headmain.parent(".sbx-tab-wrapper").data("scroll",{
										left:0,
										prevLI:headmain.find("ul").find("li:first-child"),
										currentLI:headmain.find("ul").find("li:first-child")
										})
										
										
		$(".btnNext").click(function(){
				var _ul= headmain.find("ul");
				if(!_ul.data("animatecomplete"))return false;
				
				var d = headmain.parent(".sbx-tab-wrapper").data("scroll");
				
				if(!d)return false;				
				var curLI = d.currentLI;				
				var left = (d.left==0)? 0:d.left;

				//alert("text:" +curLI.next().find("span").text() +  " CurLI:" + curLI.outerWidth()  + "  d.leftNext:" + curLI.next().outerWidth());
											
				if(headmain.find("ul").find("li:last-child").prev().attr("id")==curLI.attr("id")){					
					jQuery(this).addClass("btnNextOff");
					btnPrev.removeClass("btnPrevOff");
				}
				
				
				clip = headmain.find(".sbx-clip");
				var nextleft = parseInt(_ul.css("left")) - (parseInt(jQuery(curLI).next().next().css("width")));
								
				if(((_ul.width() + nextleft) < (clip.width() - parseInt(_ul.css("margin-left")))) || ((_ul.width() + nextleft)==clip.width())){					
					return false;
				}
				
				if(((_ul.width() + nextleft) < (clip.width() -parseInt(_ul.css("margin-left")))) || ((_ul.width() + nextleft)==clip.width())){				
					jQuery(this).addClass("btnNextOff");
					btnPrev.removeClass("btnPrevOff");					
					return false;
				}
				
				
				if(jQuery(curLI).next().length==0){return false;}
				_ul.data("animatecomplete",false);
				if(left==0){					
					left=curLI.outerWidth() * -1;					
				}else{
					left = ((Math.abs(left) + curLI.outerWidth() ) * -1);					
				}
				_ul.stop(true,true).animate({"left":(left) + "px"},_de["scrollspeed"],function(){					
					headmain.parent(".sbx-tab-wrapper").data("scroll",{
						left: left,
						prevLI:curLI,
						currentLI:jQuery(curLI).next()				
					})
					_ul.data("animatecomplete",true);
					if(jQuery(this).hasClass("btnNextOff"))jQuery(this).removeClass("btnNextOff");
					if(btnPrev.hasClass("btnPrevOff")) btnPrev.removeClass("btnPrevOff");
				});
				
				
				var nextleft = parseInt(_ul.css("left")) - (parseInt(jQuery(curLI).next().css("width")) + parseInt(jQuery(curLI).next().next().css("width")));
				//alert("left:" + parseInt(_ul.css("left"))+ "nextLeft:" + nextleft + " width:" + clip.width() + "widthClip:" + (parseInt(jQuery(curLI).next().css("width")) + parseInt(jQuery(curLI).next().next().css("width"))));				
				//alert((_ul.width() + nextleft) + " " + clip.width() + " " + parseInt(_ul.css("margin-left")));				
				if(((_ul.width() + nextleft) < (clip.width() - parseInt(_ul.css("margin-left")))) || ((_ul.width() + nextleft)==clip.width())){					
					jQuery(this).addClass("btnNextOff");
					btnPrev.removeClass("btnPrevOff");					
				}
				
				
			})
			
			
			$(".btnPrev").click(function(){
				var _ul= headmain.find("ul");
				if(!_ul.data("animatecomplete"))return false;
				
				var d = headmain.parent(".sbx-tab-wrapper").data("scroll");
				
				if(!d)return false;
				
				var curLI = d.prevLI;

				if(headmain.find("ul").find("li:first-child").attr("id")==curLI.attr("id")){					
					jQuery(this).addClass("btnPrevOff");
					btnNext.removeClass("btnNextOff");
				}
				
				if(jQuery(d.currentLI).prev().length==0){
					_ul.css("left","0px");					
					return false
				};
				
				var p = jQuery(d.prevLI).outerWidth() + parseInt(ul.css("left")); 
				
				
				_ul.data("animatecomplete",false);
				_ul.stop(true,true).animate({"left":p + "px"},_de["scrollspeed"],function(){
					headmain.parent(".sbx-tab-wrapper").data("scroll",{
						left: p,
						prevLI:jQuery(curLI).prev(),
						currentLI:jQuery(d.prevLI)					
					})									
					_ul.data("animatecomplete",true);
					if(jQuery(this).hasClass("btnPrevOff"))jQuery(this).removeClass("btnPrevOff");
					if(btnNext.hasClass("btnNextOff"))btnNext.removeClass("btnNextOff");
				});							
								
			})
			
			// handle hover:			
			$(".btnPrev").hover(function(){
				if(!jQuery(this).hasClass("btnPrevOff")){jQuery(this).addClass("btnPrev-hover")}
			},function(){
				jQuery(this).removeClass("btnPrev-hover")
			})
			
			
			$(".btnNext").hover(function(){
				if(!jQuery(this).hasClass("btnNextOff")){jQuery(this).addClass("btnNext-hover")}
			},function(){
				jQuery(this).removeClass("btnNext-hover")
			})
			
			
			
			
		headmain.after('<div class="clear"></div>');
		
		
		var rootparent=$(this);
		
		//determine if there is an "activetab", if not, set first tab to "activetab"
		if (headmain.find("li.activetab").length != 1) {
			headmain.find("li.activetab").removeClass("activetab");
			headmain.find("ul").find("li:first-child").addClass("activetab");
		}
		
		
		//hide all tab content, unless associated tab is "activetab"
		headmain.find("ul").find("li").each(function(){				
			var eachtabid = jQuery(this).attr("id").replace("-tab", "");
			
			if (jQuery(this).hasClass("activetab")) rootparent.find("#"+eachtabid).show();
			else rootparent.find("#"+eachtabid).hide();
		});
		
		
				
		headmain.find("ul").find("li").click(function(){
			if (jQuery(this).hasClass("activetab")) {
				return false;
			}

			//hide other tabs
			headmain.find("ul").find("li").each(function(){
				jQuery(this).removeClass("activetab");
				var eachtabid = jQuery(this).attr("id").replace("-tab", "");			
				rootparent.find("#"+eachtabid).hide();
			});
			
			//show this tab
			jQuery(this).addClass("activetab");
			var tabid = jQuery(this).attr("id").replace("-tab", "");
									
			rootparent.find("#"+tabid).show();
			return false;
		});
		
		if(headmain.find(".sbx-clip").length==0){headmain.find("ul").css("margin-left","1px")}
	
}		
})( jQuery );