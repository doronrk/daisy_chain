// JavaScript Document
function hbTab(n) {
    for (var i = 1; i <= 4; i++) {
        if (i == n) {
            document.getElementById("hbTab" + i).className = "ad_Tabopen";
            document.getElementById("hbTable" + i).style.display = "block";
        } else {
            document.getElementById("hbTab" + i).className = "ad_Tabclose";
            document.getElementById("hbTable" + i).style.display = "none";
        }
    }
}
function LitTab(a) {
	for (var i = 1; i <= 3; i++) {
        if (i == a) {
            document.getElementById("LitTab" + i).className = "ad_Tabopen";
            document.getElementById("LitTabshow" + i).style.display = "block";
        } else {
            document.getElementById("LitTab" + i).className = "ad_Tabclose";
            document.getElementById("LitTabshow" + i).style.display = "none";
        }
    }
}
function color_collTab(n,j) {
    for (var i = 1; i <= j; i++) {
        if (i == n) {
            document.getElementById("color_collTab" + i).className = "color_ad_Tabopen";
            //document.getElementById("gallery_main" + i).style.display = "block";
			//var s = document.getElementById("gallery_main" + i);
			//s.name = "IMG_MAIN_TOP_ROLL_DETAIL";
			
        } else {
            document.getElementById("color_collTab" + i).className = "color_ad_Tabclose";
            //document.getElementById("gallery_main" + i).style.display = "none";
        }
    }
	return;
}
function size_hbTab(n,j) {
    for (var i = 1; i <= j; i++) {
        if (i == n) {
            document.getElementById("size_hbTab" + i).className = "cur";
        } else {
            document.getElementById("size_hbTab" + i).className = "nor";
        }
    }
}
function leftshowall(i) {
	document.getElementById("leftcate_list" + i).style.height = "auto";
	document.getElementById("left_showall" + i).style.display = "none";
	document.getElementById("left_hide" + i).style.display = "block";
}
function createCategoryCookie(categoryId) {
		var now = new Date();
		var time = now.getTime();
		time += 60 * 1000;
		now.setTime(time);
	document.cookie = 'pCategoryId='+categoryId+'; expires=' + now.toGMTString() + '; path=/';
}
function lefthide(i,j) {
	document.getElementById("leftcate_list" + i).style.height = j * 20 + "px" ;
	document.getElementById("left_showall" + i).style.display = "block";
	document.getElementById("left_hide" + i).style.display = "none";
}
function detail_showmore() {
	document.getElementById("showmore_open").style.display = "none";
	document.getElementById("showmore_hide").style.display = "block";
	document.getElementById("detial_main_content").className = "detial_main_content_open";
}
function detail_hide() {
	document.getElementById("showmore_open").style.display = "block";
	document.getElementById("showmore_hide").style.display = "none";
	document.getElementById("detial_main_content").className = "detial_main_content";
}
function store_brands(n) {
    for (var i = 1; i <= 3; i++) {
        if (i == n) {
            document.getElementById("brands" + i).className = "ad_Tabopen";
            document.getElementById("storebrands" + i).style.display = "block";
        } else {
			if(document.getElementById("brands" + i)&&document.getElementById("storebrands" + i))
			{
				document.getElementById("brands" + i).className = "ad_Tabclose";
				document.getElementById("storebrands" + i).style.display = "none";
			}
        }
    }
}

function bag_list_show(){
	setTimeout(bag_list_show_later,"300");
	function bag_list_show_later(){
		if(!document.getElementById("quick_bag"))
		{return false;}
		document.getElementById("quick_bag").style.display = "block"; scroll(0,0);
	}
}
function bag_list_hide(){document.getElementById("quick_bag").style.display = "none";}
function se_list_show(){document.getElementById("in_stroe").style.display = "block";}
function se_list_hide(){document.getElementById("in_stroe").style.display = "none";}
function se_result_show(){
		document.getElementById("select_check").style.display = "block";
		document.getElementById("selctbtn").className="allbutton";
		document.getElementById("in_stroe").style.display = "none";
		}
function se_result_clear(){
		document.getElementById("select_check").style.display = "none";
		document.getElementById("selctbtn").className="allbuttonDisabled";
		//document.getElementById("in_stroe").style.display = "none";
		}
function gifTab(b) {
	for (var i = 1; i <=4; i++) {
        if (i == b) {
            document.getElementById("gifTab" + i).className = "gifcard_sel";
            //document.getElementById("gif" + i).className = "ad_Tabopen";
            document.getElementById("Standard_" + i).style.display = "block";
			
        } else {
            document.getElementById("gifTab" + i).className = "";
           
            	document.getElementById("Standard_" + i).style.display = "none";	
                      
			//document.getElementById("gift" + i).className = "ad_Tabclose";
        }
    }
}
function  pic_list_hide(){{document.getElementById("pickispup").style.display = "none";}}
function  pic_result_show(){document.getElementById("result_store").style.display = "block";}
function  pick_cancel(){document.getElementById("result_store").style.display = "none";}
function  pickup_show(){
	if(document.getElementById("selctbtn").className=="allbutton"){document.getElementById("pickispup").style.display = "block";}}
function  pick_save(){
	document.getElementById("pickispup").style.display = "none";
	document.getElementById("select_check").style.display = "none";
	document.getElementById("selctbtn").className="allbuttonDisabled";}

