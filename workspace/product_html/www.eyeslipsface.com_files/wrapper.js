(function(){var head=document.getElementsByTagName("head")[0],style,i,check=function(){if(window.sli_r&&window.sli_r.loaded){window.sli_r.wrapper=true;jQuery("#sli_recommender").sliRecommender({id:"recommender",client:"1350",count:"4",template:recommender,strategy:"531ccaa584ae4d6481c5291d",attributes:"image,url,price,title,colour,sku,productID",on_render:function(){jQuery("#sli_recommender a, #sli_recommender #addtoimage").click(function(e){var sku=jQuery("#sli_recommender").data("sku");var event=jQuery(this).data("event")=="link-click"?"Link Click":"Add to Cart Click";
e.preventDefault();ga("send","event","Learning Recommendations",event,sku.toString());if(jQuery(this).attr("id")=="addtoimage"){jQuery(this).parent().submit()}else{document.location.href=jQuery(this).attr("href")}})}});window.sli_r.transport.sendBatch()}else{setTimeout(check,500)}};function insertScripts(paths){for(i=0;i<paths.length;i+=1){var script=document.createElement("script");script.setAttribute("type","text/javascript");script.setAttribute("src",paths[i]);head.appendChild(script)}}function insertStyle(css){var style=document.createElement("style");
style.type="text/css";if(style.styleSheet){style.styleSheet.cssText=css}else{style.appendChild(document.createTextNode(css))}head.appendChild(style)}var scriptPaths=["//assets.resultspage.com/r/jquery.widget.min.js"];style="#sli_recommender {	float: left;	width: 960px;	clear: both;}#sli_recommender li {	float: left;	width: 230px;}#sli_recommender .sli_rec_inner {	float: left;	margin: 30px 0px 10px 0px;	padding: 0px 0px 0px 20px;}#sli_recommender .sli_rec_img {	width: 200px;	height: 200px;	margin: 25px auto 0;}#sli_recommender .sli_rec_img img {	max-height: 100%;	max-width: 100%;}#sli_recommender img.addtobag {	display: block;	margin-left: 50px;	margin-top: 5px;}#sli_recommender .sli_rec_inner ul {	margin-left: 5px;}#sli_recommender .sli_rec_inner #addtoimage {	width: 120px;	height: auto;}.sli_rec_info a{display: block;min-height: 50px;text-align:center;}.sli_rec_info form {	margin-top: 20px;}";
var recommender=function anonymous(it){var out='<div class="sli_rec_inner"><img src="http://content.eyeslipsface.com/images/also_to_love_title.gif"><ul>';var arr1=it.results;if(arr1){var r,i1=-1,l1=arr1.length-1;while(i1<l1){r=arr1[i1+=1];out+='<li> <div class="sli_rec_img"><a href="'+(r.url)+'" title="'+(r.title)+'" data-event="link-click" ><img src="'+(r.image)+'" alt="'+(r.title)+'"></a></div><div class="sli_rec_info"><a href="'+(r.url)+'" title="'+(r.title)+'" data-event="link-click" >'+(r.title)+" ";if(r.colour){out+="&ndash; "+(r.colour)
}out+="<br><b>"+(r.formattedPrice)+'</b></a><form action="http://www.eyeslipsface.com/showaddtocart.asp" method="GET" target="AddProd" name="addProducts"><input type="hidden" name="add_qty" value="1" id="add_qty"><input id="dept_id" type="hidden" value="'+(r.productID)+'" name="add_product_id"><input id="addtoimage" type="image" name="addtocart" alt="Makeup Mist & Set" src="http://content.eyeslipsface.com/images/btn_add_to_bag_pnk_sm.gif"></form></div></li>'}}out+="</ul></div>";return out};insertScripts(scriptPaths);
if(style){insertStyle(style)}check()}());