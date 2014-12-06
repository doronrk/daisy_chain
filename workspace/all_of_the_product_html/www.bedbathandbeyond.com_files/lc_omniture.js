/** Created by Andrea Rodriguez - Liveclicker **/

jQuery(document).ready(function(){

    //get the url of the video with all the parameters
    var url= jQuery('.lcmulti_img').parent().attr("href");

    //function to obtain a parameter from an url
    function getUrlVars(key,url){
	var result = new RegExp(key + "=([^&]*)", "i").exec(url);
	return result && unescape(result[1]) || "";
    }

    //get dim6
    var dim6 = getUrlVars("dim6", url);

    //call Omniture function on click
    jQuery('.lcmulti_img').parent().mouseup(function() {

       try{
           prodDetailElement(dim6, 'video play'); 
        }
        catch (exception){
        }

    });


});