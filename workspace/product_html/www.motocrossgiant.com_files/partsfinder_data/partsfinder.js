(function($){var makes=sli.Make,models=sli.Model,years=sli.Year,makesElem=$("<select>"),modelsElem=$("<select>").attr("disabled","yes"),yearsElem=$("<select>").attr("disabled","yes");makesElem.append('<option value="">Select your Make</option>');for(var i=0;i<makes.length;i++){var selString=makes[i].selected?' selected="selected"':"";makesElem.append('<option value="'+makes[i].value+'"'+selString+">"+makes[i].name+"</option>")}$("#makes").html(makesElem);var changeFunc=function(parent,currentElem,currentArray,name,id){currentElem=$("<select>");
currentElem.append('<option value="">Select your '+name+"</option>");for(var i=0;i<currentArray.length;i++){var regtest=new RegExp(parent.value.split(":")[1]+"_");if(regtest.test(currentArray[i].value)){var selString=currentArray[i].selected?' selected="selected"':"";currentElem.append('<option value="'+currentArray[i].value+'"'+selString+">"+currentArray[i].name+"</option>")}}$(id).html(currentElem)};$("body").on("change","#makes > select",function(){changeFunc(this,modelsElem,models,"Model","#models");yearsElem=$("<select>").attr("disabled","yes").append('<option value="">Select your Year</option>');
$("#years").html(yearsElem);if($("#models > select").prop("selectedIndex")!=0){$("#models > select").change()}});$("body").on("change","#models > select",function(){changeFunc(this,yearsElem,years,"Year","#years")});$("body").on("click","#submit > button",function(){var make=$("#makes > select").val(),model=$("#models > select").val(),year=$("#years > select").val(),submiturl=sli.facetUrl;if(make==undefined){alert("Please select your bike!");return false}if(year!=undefined){submiturl+=year}if(model!=undefined){submiturl+=" "+model
}submiturl+=" "+make+"&partsfinder=1";parent.window.location=submiturl});if($("#makes > select").prop("selectedIndex")!=0){$("#makes > select").change()}})(jQuery);