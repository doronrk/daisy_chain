//-----------------------------------------------------------------
// Javascript library to manage custom size guide for shoes
// 
// @autor Lorenzo Cavina
//
//-----------------------------------------------------------------

/** 
 * @fileOverview This file contains all the global variables and JavaScript functions needed to manage shoes custom sizeguide. 
 */

if(typeof(ShoesSizeGuide) == "undefined" || ShoesSizeGuide == null || !ShoesSizeGuide) {
	
	ShoesSizeGuide = {
	
		config: null,
		
		countryObj: [{label:"USA", data:"usa"},{label:"Europe", data:"eu"},{label:"UK", data:"uk"},{label:"Asia", data:"japan"},{label:"Mexico", data:"mexico"}],
	    genderObj: [{label:"Woman", data:"woman"},{label:"Man", data:"man"}],
	    selectedCountry: "eu",
	    selectedGender: "woman",
		cache: {},
		
		init:function(){
		
			if(ShoesSizeGuide.config == null || ShoesSizeGuide.config == undefined){
				// load config
				ShoesSizeGuide.loadConfig();
			
				// parse config
				ShoesSizeGuide.sizeshoes(ShoesSizeGuide.config);
			}
		},
			
		loadConfig:function() {
			dojo.xhrPost({
				url: "ShoesSizeguideConfig",
				handleAs: "text",
				sync: true,
				service: this,
				load: ShoesSizeGuide.manageResult,
				error: function(errObj,ioArgs) {
					console.debug("error while loading configuration as text");
					console.debug(errObj);
				}
			});
		},
		
		manageResult:function(serviceResponse, ioArgs){
			ShoesSizeGuide.config = ShoesSizeGuide.getXML(serviceResponse);
		},
		
		sizeshoes:function(xmlDoc) {

		    var count,
		        i,
		        node, node2, stringRia = '',
		        key,
		        value,
		        nodeCollection;

		    nodeCollection = xmlDoc.getElementsByTagName("sizeguideshoes");
		    count = nodeCollection.length;

		    this.cache.sizeshoes = {};
		    for (i = 0; i < count; i++) {
		        node = nodeCollection[i];
		        if (node.nodeType == 1) {
		            nodeCollection2 = node.childNodes;
		            count2 = nodeCollection2.length;
		            var iterator = 0;
		            for (k = 0; k < count2; k++) {
		                node2 = nodeCollection2[k];
		                if (node2.nodeType == 1) {
		                    this.getChildrenOption(node2,this.cache.sizeshoes);
		                }
		            }
		        }
		    }
		    
		    //FerragamoHtml5.ui.appendSizeShoes();
		   this.appendSizeShoes();

		},
		
		getChildrenOption:function(node2, obj) {
	        obj[node2.nodeName] = {};
	        var parentObj = obj[node2.nodeName];
	        nodeCollection3 = node2.childNodes;
	        count3 = nodeCollection3.length;
	        var iterator=0;
	        for (p = 0; p < count3; p++) {
	            node3 = nodeCollection3[p];
	            if (node3.nodeType != 3) {
	                var nodeNameObj = node3.nodeName;
	                if (node3.nodeName == 'item') {
	                    nodeNameObj = iterator;
	                }
	                parentObj[nodeNameObj] = {};
	                var newObj=parentObj[nodeNameObj];
	                if (node3.nodeName == 'item') {
	                    nodeCollection4 = node3.attributes;
	                    count4 = nodeCollection4.length;
	                    for (z = 0; z < count4; z++) {
	                        node4 = nodeCollection4[z];
	                        if (node4.nodeType == 2) {
	                            newObj[node4.nodeName] = node4.nodeValue;
	                        }
	                    }
	                }else {
	                    nodeCollection4=node3.childNodes;
	                    count4 = nodeCollection4.length;
	                    var iterator2=0;
	                    for (z = 0; z < count4; z++) {
	                        node4 = nodeCollection4[z];
	                        if (node4.nodeType != 3) {

	                            var nodeNameObj = node4.nodeName;
	                            if (node4.nodeName == 'item') {
	                                nodeNameObj = iterator2;
	                            }
	                            newObj[nodeNameObj]={};
	                            nodeCollection5 = node4.attributes;
	                            count5 = nodeCollection5.length;
	                            for (i = 0; i < count5; i++) {
	                                node5 = nodeCollection5[i];
	                                if (node5.nodeType == 2) {
	                                    newObj[nodeNameObj][node5.nodeName] = node5.nodeValue;
	                                }
	                            }
	                            nodeCollection6=node4.childNodes;
	                            count6 = nodeCollection6.length;

	                            var iterator3=0;
	                            for (t = 0;t < count6; t++) {
	                                node6 = nodeCollection6[t];
	                                if (node6.nodeType != 3) {
	                                    var nodeNameObj2 = node6.nodeName;
	                                    if (node6.nodeName == 'item') {
	                                        nodeNameObj2 = iterator3;
	                                    }
	                                    newObj[nodeNameObj][nodeNameObj2] = {};
	                                    nodeCollection7 = node6.attributes;
	                                    count7 = nodeCollection7.length;
	                                    for (d = 0; d < count7; d++) {
	                                        node7 = nodeCollection7[d];
	                                        if (node7.nodeType == 2) {
	                                            newObj[nodeNameObj][nodeNameObj2][node7.nodeName] = node7.nodeValue;
	                                        }
	                                    }
	                                    iterator3++;
	                                }
	                            }

	                            iterator2++;
	                        }
	                    }
	                }
	                iterator++;
	            }
	        }
	    },
	    
	    appendSizeShoes:function(){
		    for (key in ShoesSizeGuide.countryObj) {
		        $jq('#countries').append('<option value="'+ShoesSizeGuide.countryObj[key].data+'">' + ShoesSizeGuide.countryObj[key].label + '</option>');
		    }
		    		    
		    this.createSliders();

		    $jq('#countries').change(function() {
		    	
		    	var selectedIndex = $jq('#countries :selected').index();
		    	
		        if (selectedIndex !=0 ) {
		        	ShoesSizeGuide.selectedCountry = ShoesSizeGuide.cache.sizeshoes.countries[selectedIndex].data;
		        	ShoesSizeGuide.changeValue();
		        }
		    });

		    $jq('#genders').change(function() {
		    	
		    	var selectedIndex = $jq('#genders :selected').index();
		    	
		        if (selectedIndex != 0) {
		        	ShoesSizeGuide.selectedGender = ShoesSizeGuide.cache.sizeshoes.genders[selectedIndex].data;
		        	ShoesSizeGuide.changeValue();
		        }
		    });
		},
	    
	    createSliders:function() {
			
			if(ShoesSizeGuide.cache.sizeshoes != null && ShoesSizeGuide.cache.sizeshoes.shoes_length != null){
			
		        var thisShoeLength = ShoesSizeGuide.cache.sizeshoes.shoes_length[this.selectedGender];
		        var thisShoeWidth = ShoesSizeGuide.cache.sizeshoes.shoes_width[this.selectedGender][this.selectedCountry];
		        var elementLengthSize = ShoesSizeGuide.getObjLength(thisShoeLength)-1;
		        var elementLengthWidth = ShoesSizeGuide.getObjLength(thisShoeWidth)-1;
	
		        for (key in thisShoeLength) {
		            $jq('#size').append('<option value="' + thisShoeLength[key].ferragamo + '">' + thisShoeLength[key][ShoesSizeGuide.selectedCountry] + '</option>');
		        }
	
		        for (key in thisShoeWidth) {
		            $jq('#width').append('<option value="' + thisShoeWidth[key].label +  '">' + thisShoeWidth[key].data + '</option>');
		        }
		        $jq('#size').change(function() {
		            if ($jq(this).val() != '') {
		            	ShoesSizeGuide.changeSize($jq('#size > option:selected').prevAll().length-1);
		            }
		        });
		        $jq('#width').change(function() {
		            if ($jq(this).val() != '') {
		            	ShoesSizeGuide.changeWidth($jq('#width > option:selected').prevAll().length-1);
		            }
		        });
		        
			}
	    },

	    changeValue:function() {
	        var thisShoeLength = ShoesSizeGuide.cache.sizeshoes.shoes_length[ShoesSizeGuide.selectedGender];
	        var thisShoeWidth = ShoesSizeGuide.cache.sizeshoes.shoes_width[ShoesSizeGuide.selectedGender][ShoesSizeGuide.selectedCountry];
	        
	        // backup
	        var emptyWidth = $jq('#width > option[value=""]');
	        var emptySize = $jq('#size > option[value=""]');
	        
	        $jq('#width,#size').html('');
	        
	        $jq('#size').append(emptySize);
	        for (key in thisShoeLength) {
	            $jq('#size').append('<option value="'+thisShoeLength[key].ferragamo+'">'+thisShoeLength[key][this.selectedCountry]+'</option>');
	        }

	        $jq('#width').append(emptyWidth);
	        for (key in thisShoeWidth) {
	            $jq('#width').append('<option value="'+thisShoeWidth[key].label+'">'+thisShoeWidth[key].data+'</option>');
	        }
	        
	        ShoesSizeGuide.changeSize($jq('#size > option:selected').prevAll().length);
	        ShoesSizeGuide.changeWidth($jq('#width > option:selected').prevAll().length);
	    },

	    changeWidth:function(value) {
	        var thisShoeWidth = ShoesSizeGuide.cache.sizeshoes.shoes_width[ShoesSizeGuide.selectedGender][ShoesSizeGuide.selectedCountry];
	        var thisShoeLength = ShoesSizeGuide.cache.sizeshoes.shoes_length[ShoesSizeGuide.selectedGender];
	        var width = thisShoeWidth[parseInt(value)].label;
	            width = width.split(",")[0];
	        $jq("#riswidth").html(width);
	        if ($jq('#size').val() == '') {
	            $jq( "#rissize" ).html(thisShoeLength[0].ferragamo+',');
	        }
	    },

	    changeSize:function(value) {
	        var thisShoeWidth = ShoesSizeGuide.cache.sizeshoes.shoes_width[ShoesSizeGuide.selectedGender][ShoesSizeGuide.selectedCountry];
	        var thisShoeLength = ShoesSizeGuide.cache.sizeshoes.shoes_length[ShoesSizeGuide.selectedGender];
	        $jq("#rissize").html(thisShoeLength[parseInt(value)].ferragamo);
	        var width = thisShoeWidth[0].label;
	            width = width.split(",")[0];
	        if ($jq('#width').val() == '') {
	            $jq( "#riswidth" ).html(width);
	        }
	    },
	    
	    getXML:function(string) {
	        var xmlDoc;
	        if (window.DOMParser) {
	            var parser = new DOMParser();
	            xmlDoc = parser.parseFromString(string, "text/xml");
	        } else { // Internet Explorer
	            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
	            xmlDoc.async = false;
	            xmlDoc.loadXML(string);
	        }
	        return xmlDoc;
	    },
	    
	    getObjLength:function(obj) {
	        var iterator=0;
	        for (key in obj) {
	            iterator++;
	        }
	        return iterator;
	    }
	}
}