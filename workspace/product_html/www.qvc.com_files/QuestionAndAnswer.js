<!--
	// Various javascript variables have been initialized in QADisplaySetu.jspf.
	// questionAnswerCoreMetricsPageIndicator = 'PD' product display or 'PL' product listing
	// questionAnswerCoreMetricsPageID = Item description (product display) or product listing
	// questionAnswerCoreMetricsCatID = 'COMMA'
	// questionAnswerTabDesc = tab description from storetext.properties
	var BVQAisLoaded = false;
	
	// According to BazaarVoice, this function gives you access to summary information.
	function BVQADisplayed(questionCount, answerCount)   
	{   
		var BVQAHeaderID_last;
	    if (questionCount > 0) {
	        var bvALPLink = document.getElementById("BVALPLinkContainer");   
	        if (bvALPLink) { bvALPLink.style.display = "block"; }
	        
	        // In order for the "View All" link to work, we must apply code to show the Q&A tab
	        // to the div that houses the anchor tag.
	        jQuery("#BVQASummaryBoxViewQuestionsID").on("click", function()  {
	        	highlightTab('body', 'productDetailDescriptionCustomerReviewTab','productDetailDescriptionCustomerReviewTab2');
	        });
	        
	        //Adds coremetrics to Bazaar Voice customer images and text (redirecting to product display)
			jQuery(".BVDI_PLProductName").on("click", function() {			    		
	    		var qaCoreMetricsPageID = questionAnswerTabDesc + ": " + questionAnswerCoreMetricsPageID + ": CUSTOMER IMAGES";
	    		var qaCoreMetricsCategoryID = questionAnswerCoreMetricsCatID + "_VQ_" + questionAnswerCoreMetricsPageIndicator + "_IMG";
				/*For Defect ID 14446*/
				cmCreateManualPageviewTag(qaCoreMetricsPageID, qaCoreMetricsCategoryID, "","","-_--_--_--_--_--_--_--_--_--_--_--_-WSC");
			});
			jQuery(".BVDI_PLProductImage").on("click", function() {			    		
	    		var qaCoreMetricsPageID = questionAnswerTabDesc + ": " + questionAnswerCoreMetricsPageID + ": CUSTOMER IMAGES";
	    		var qaCoreMetricsCategoryID = questionAnswerCoreMetricsCatID + "_VQ_" + questionAnswerCoreMetricsPageIndicator + "_IMG";
				/*For Defect ID 14446*/
				cmCreateManualPageviewTag(qaCoreMetricsPageID, qaCoreMetricsCategoryID, "","","-_--_--_--_--_--_--_--_--_--_--_--_-WSC");
			});
			
				        
	        //Adds coremetrics to Bazaar Voice Question Expand
			//This code runs after user expands Question for first time as Bazaar Voice removes id/name from the link
			// and places on click for expand/collapse of question on BVQAQuestionAndAnswers div 
		    jQuery("div[id^='BVQAQuestionAndAnswers']").on("click", function() {

			    var qaCoreMetricsPageID, qaCoreMetricsCategoryID;
				var BVQAID = this.id;
				var bvIDCharlength = 22; //BVQAQuestionAndAnswers has length 22 and after that there is Q&A ID
			    var BVQAHeaderID = "BVQAQuestionHeader" + BVQAID.substr(bvIDCharlength ,BVQAID.length);
				var BVQAMain = "#BVQAQuestionMain" + BVQAID.substr(bvIDCharlength,BVQAID.length);	
				var BVQAHeader =  document.getElementById(BVQAHeaderID);
		
				if (BVQAHeaderID_last == null) {
					BVQAHeaderID_last = "";
				}
		
				if (BVQAHeader !== null && BVQAMain !== null)  {
		
					if (!jQuery(BVQAMain).is(':visible'))  {
						BVQAHeaderID_last = "";
					}
		
					if ((BVQAHeader.innerHTML.length > 0) && (jQuery(BVQAMain).is(':visible')) && (BVQAHeaderID !==  BVQAHeaderID_last))  {
				    	var rExp = new RegExp(/([^\s>]*)(\s[^<]*)<\/a>/gi); //to get the value inside hyperlink
				    	var BVQAHREF = rExp.exec(BVQAHeader.innerHTML);
				    	var throwtag = false;
		        		BVQAHeaderID_last = BVQAHeaderID;
						
						if (BVQAHREF !== null)  {
				    			var BVQATitle = BVQAHREF[0].substr(BVQAHREF[0].indexOf(">") +  1,BVQAHREF[0].lastIndexOf("<") - (BVQAHREF[0].indexOf(">") + 1));
				    			qaCoreMetricsPageID = questionAnswerTabDesc + ": " + questionAnswerCoreMetricsPageID + ": " + BVQATitle +  ": EXPAND";
				    			qaCoreMetricsCategoryID = questionAnswerCoreMetricsCatID + "_VQ_" + questionAnswerCoreMetricsPageIndicator + "_Q";
				    			throwtag = true;
						}
				
						if(throwtag)  {
						/*For Defect ID 14446*/
							cmCreateManualPageviewTag(qaCoreMetricsPageID, qaCoreMetricsCategoryID, "","","-_--_--_--_--_--_--_--_--_--_--_--_-WSC");
						}
				 	}
				}
		     });  // BV anonymous click function
			
	    } //end if
	    
	    // Modify recommended product urls; Using legacy URL of reference.pl anchor tag on text
	    jQuery(".BVDI_PLProductName").each(function(index) {
			var url = jQuery(this).find("a").attr("href");
			var detailLink = url.indexOf("reference.pl");					// Only convert if anchor contains reference.pl and item key on querystring
			var beginIndex = url.indexOf("item=");							
			if (detailLink != -1 && beginIndex != -1)  {
				var queryString = url.substring(beginIndex);
				var queryArgs = new Array();
				queryArgs = queryString.split("&");							// Split up the querystring parameters
				var productId = ObtainQueryStringValue(queryArgs, "item")
				
				var newURL = bvRewriteBaseURL.replace("REPLACEPRODUCTID", productId);
				jQuery(this).find("a").attr("href", newURL);
			}			
		});

	    // Modify recommended product urls; Using legacy URL of reference.pl anchor tag on image		
		jQuery(".BVDI_PLProductImage").each(function(index) {
			var url = jQuery(this).find("a").attr("href");
			var detailLink = url.indexOf("reference.pl");					// Only convert if anchor contains reference.pl and item key on querystring
			var beginIndex = url.indexOf("item=");							
			if (detailLink != -1 && beginIndex != -1)  {
				var queryString = url.substring(beginIndex);
				var queryArgs = new Array();
				queryArgs = queryString.split("&");							// Split up the querystring parameters
				var productId = ObtainQueryStringValue(queryArgs, "item")
				
				var newURL = bvRewriteBaseURL.replace("REPLACEPRODUCTID", productId);
				jQuery(this).find("a").attr("href", newURL);
			}		
		});
		
		// Injected HTML used to view class below (BVQASignatureSubject)
		//$bv(".BVQASignature").each(function(index)  {
		//	alert(this.innerHTML);
		//});
		
		// Modify recommended product urls when using the bazaarvoice search functionality; Using legacy URL of reference.pl anchor tag
		jQuery(".BVQASignatureSubject").each(function(index)  {
			var url = jQuery(this).find("a").attr("href");
			var detailLink = url.indexOf("reference.pl");					// Only convert if anchor contains reference.pl and item key on querystring
			var beginIndex = url.indexOf("item=");							
			if (detailLink != -1 && beginIndex != -1)  {
				var queryString = url.substring(beginIndex);
				var queryArgs = new Array();
				queryArgs = queryString.split("&");							// Split up the querystring parameters
				var productId = ObtainQueryStringValue(queryArgs, "item")
				
				var newURL = bvRewriteBaseURL.replace("REPLACEPRODUCTID", productId);
				jQuery(this).find("a").attr("href", newURL);
			}
		});
				 	
	    //Adds coremetrics to Bazaar Voice Q&A search
    	jQuery("button[id^='BVQASearchFormSubmitButtonID']").on("click", function() {	
			var serchTextBox = document.getElementById("BVQASearchFormTextInputID");	
			var qaCoreMetricsPageID = questionAnswerTabDesc + ": " + questionAnswerCoreMetricsPageID + ": " + serchTextBox.value;
			var qaCoreMetricsCategoryID = questionAnswerCoreMetricsCatID + "_VQ_" + questionAnswerCoreMetricsPageIndicator + "_SRC";
			/*For Defect ID 14446*/
			cmCreateManualPageviewTag(qaCoreMetricsPageID, qaCoreMetricsCategoryID, "","","-_--_--_--_--_--_--_--_--_--_--_--_-WSC");
    	});
    
		//Adds coremetrics to Bazaar Voice Links
	    jQuery("a[name^='BV_TrackingTag_QA_Display']").on("click", function() {
	    
	    	var throwtag = false;
	    	var qaCoreMetricsPageID;
	    	var qaCoreMetricsCategoryID = questionAnswerCoreMetricsCatID + "_VQ_" + questionAnswerCoreMetricsPageIndicator;
			var rExp = /BV_TrackingTag_QA_Display_HomteTab_QuestionSelect.+/gi;
			if (this.name.search(rExp) != -1)
			{
				qaCoreMetricsCategoryID = qaCoreMetricsCategoryID + "_Q";
			    qaCoreMetricsPageID = questionAnswerTabDesc + ": " + questionAnswerCoreMetricsPageID + ": " + this.innerHTML + ": EXPAND";
			    throwtag = true;
			}
	
	        switch (this.name) 
			{
			 case "BV_TrackingTag_QA_Display_AskQuestion":
			 	qaCoreMetricsCategoryID = questionAnswerCoreMetricsCatID + "_ASKQ_" + questionAnswerCoreMetricsPageIndicator;
			    qaCoreMetricsCategoryID = qaCoreMetricsCategoryID + "_AL";
			    qaCoreMetricsPageID = questionAnswerTabDesc + ": " + questionAnswerCoreMetricsPageID;
			    throwtag = true;
	            break;
	
			 case "BV_TrackingTag_QA_Display_BrowseTab":
			    qaCoreMetricsCategoryID = qaCoreMetricsCategoryID + "_ALL";
			    qaCoreMetricsPageID = "VIEW ALL Q&A: " + questionAnswerCoreMetricsPageID;
			    throwtag = true;
	            break;
	
			 case "BV_TrackingTag_QA_Display_HomeTab":
			    qaCoreMetricsCategoryID = qaCoreMetricsCategoryID + "_FT";
			    qaCoreMetricsPageID = "Q&A HOME: " + questionAnswerCoreMetricsPageID;
			    throwtag = true;
	            break;
			}
			
			if(throwtag)  {
			/*For Defect ID 14446*/
				cmCreateManualPageviewTag(qaCoreMetricsPageID, qaCoreMetricsCategoryID, "","","-_--_--_--_--_--_--_--_--_--_--_--_-WSC");
			}

	    });
	    
	}
	
    function BVcheckQALoadState() { 
    	if (qaTest) alert("Inside BVcheckQALoadState"); 
    	
        //if(!BVQAisLoaded) {   
        //  if (qaTest) alert(document.getElementById('BVQAFrame'));
        //	var page = document.getElementById('BVQAFrame').src;
    	//	document.getElementById('BVQAFrame').src='http://answers.qvc.com/bvstaging/logging?page=' + escape(page);   
        //	document.getElementById('BVQAContainer').innerHTML = "<!-- QA retrieval timed out -->";   
        //}   
    }
    
    function bvLoadQA() { 
    	if (qaTest) alert("Inside bvLoadQA");  
        var bvQAFrameSrc = questionAnswerProductURLEmbedded;
        var bvQuestionIDName = 'featurequestion';   
          
        var bvoice_user = jQuery('#BVQACustomerID').text();   
        if (qaTest) alert("BV User ID: " + bvoice_user);
               
        var bvQuestionIDRegex = new RegExp('[?&]' + bvQuestionIDName + '=([^&#]+)');   
        var bvQuestionIDMatch = bvQuestionIDRegex.exec(window.location.search);   
        var bvQuestionID = bvQuestionIDMatch ? decodeURIComponent(bvQuestionIDMatch[1]) : null;   
       
        bvQAFrameSrc = /^[0-9]+$/.test(bvQuestionID) ? bvQAFrameSrc.replace('/questionshome.htm', '/questions.htm') + '&expandQuestion=' + bvQuestionID : bvQAFrameSrc;   
           
        var bvPageMatch = /[?&]bvpage=([^&#]+)/.exec(window.location.search);   
        var bvPage = bvPageMatch ? decodeURIComponent(bvPageMatch[1]) : null;   
        var bvRegex = new RegExp('^' + window.location.protocol + '\/\/([A-Za-z0-9-.]+[.])?' + document.domain + '\/');   
           
        jQuery('#BVQAFrame').attr('src', (bvPage && bvRegex.test(bvPage)) ? bvPage.replace(/__USERID__/, bvoice_user) : bvQAFrameSrc);   
           
        //Timeout for QA load.  Consider content unavailable if not loaded within 15 seconds    
        setTimeout("BVcheckQALoadState()", 15000);   
    }   
    
    function BVQASubmissionPageDisplayed(pageName,pageStatus)
	{
		var throwtag = false;
		var qaCoreMetricsPageID, qaCoreMetricsCategoryID;
        switch (pageName)
        {
		   case "EditQuestion":
		     qaCoreMetricsPageID = "ASK A NEW QUESTION FORM: " + questionAnswerCoreMetricsPageID;
		     qaCoreMetricsCategoryID = questionAnswerCoreMetricsCatID + "_ASKQ_" + questionAnswerCoreMetricsPageIndicator + "_NQ";
		     throwtag = true;
		     break;
	
		   case "PreviewQuestion":
		     qaCoreMetricsPageID = "ASK A NEW QUESTION PREVIEW PAGE: " + questionAnswerCoreMetricsPageID;
		     qaCoreMetricsCategoryID = questionAnswerCoreMetricsCatID + "_ASKQ_" + questionAnswerCoreMetricsPageIndicator + "_NQ";
		     throwtag = true;
		     break;
	
		   case "SubmittedQuestion":
		     qaCoreMetricsPageID = "ASK A NEW QUESTION THANK YOU PAGE: " + questionAnswerCoreMetricsPageID;
		     qaCoreMetricsCategoryID = questionAnswerCoreMetricsCatID + "_ASKQ_" + questionAnswerCoreMetricsPageIndicator + "_NQ";
		     throwtag = true;
		     break; 
	
		   case "EditAnswer":                 
		     qaCoreMetricsPageID = "ANSWER THIS QUESTION FORM: " + questionAnswerCoreMetricsPageID;
		     qaCoreMetricsCategoryID = questionAnswerCoreMetricsCatID + "_ANSQ_" + questionAnswerCoreMetricsPageIndicator + "_ANQ";
		     throwtag = true;
		     break;
	
		   case "PreviewAnswer":                  
		     qaCoreMetricsPageID = "ANSWER THIS QUESTION PREVIEW PAGE: " + questionAnswerCoreMetricsPageID;
		     qaCoreMetricsCategoryID = questionAnswerCoreMetricsCatID + "_ANSQ_" + questionAnswerCoreMetricsPageIndicator + "_ANQ";
		     throwtag = true;
		     break;
	
		   case "SubmittedAnswer":
		     qaCoreMetricsPageID = "ANSWER THIS QUESTION THANK YOU PAGE: " + questionAnswerCoreMetricsPageID;
		     qaCoreMetricsCategoryID = questionAnswerCoreMetricsCatID + "_ANSQ_" + questionAnswerCoreMetricsPageIndicator + "_ANQ";
		     throwtag = true;
		     break;
        }
	 
		if(throwtag)
		{
			/*For Defect ID 14446*/
			cmCreateManualPageviewTag(qaCoreMetricsPageID, qaCoreMetricsCategoryID, "","","-_--_--_--_--_--_--_--_--_--_--_--_-WSC");
		}
	}
    
    function SubmitQuestionAnswerPageViewTag()
    {
    	var qaCoreMetricsPageID = questionAnswerTabDesc + ": " + questionAnswerCoreMetricsPageID;
    	var qaCoreMetricsCategoryID = questionAnswerCoreMetricsCatID + "_VQ_" + questionAnswerCoreMetricsPageIndicator + "_TAB";
    	/*For Defect ID 14446*/
    	//cmCreateManualPageviewTag(qaCoreMetricsPageID, qaCoreMetricsCategoryID);
    	cmCreateManualPageviewTag(qaCoreMetricsPageID, qaCoreMetricsCategoryID,"","","-_--_--_--_--_--_--_--_--_--_--_--_-WSC");
    }
    
    // Obtain value of a querystring argument.
    // queryArgs - Array of key/value pairs (i.e. item=j844)
    // key - key to search for in queryArgs
    function ObtainQueryStringValue(queryArgs, key)  {
		var value = "";
		var newKey = key + "=";
		for (index = 0; index < queryArgs.length; index++)  {
			if (queryArgs[index].substring(0,key.length) == key)  {
				value = queryArgs[index].replace(newKey,"");
				break;
			}
		}
		return value;
	}
	
	// When Q&A only tab shown, div was not being displayed until user clicked tab.  This was happening periodically. 
	// The $(function(){}); in CachedProductItemDisplay was not always firing.  It appears that the reviews 
	// implementation got around this by using the "ratingsDisplayed" function in QVCIntegrationScripts so not sure if the window.addEvent
	// is even needed.
	function DisplayQuestionAnswerContents(showContents)  {
		if (document.getElementById('divProductDetailCustomerReviewAreaDisplay2'))  {
			if (showContents == true)  {
				jQuery('#divProductDetailCustomerReviewAreaDisplay2').css('display','block');
			}
			else  {
				jQuery('#divProductDetailCustomerReviewAreaDisplay2').css('display','none');
			}
		}
	}
	
	// Given an URL extract out the value for a given query string argument
	function ObtainQueryValue(URL, key)  {
		var queryValue = "";
		var beginIndex = URL.indexOf("?");							
		if (beginIndex != -1)  {
			beginIndex += 1;
			var queryString = URL.substring(beginIndex);
			var queryArgs = new Array();
			queryArgs = queryString.split("&");							// Split up the querystring parameters
			queryValue = ObtainQueryStringValue(queryArgs, key)
		}
		return queryValue;
	}
//-->  
			