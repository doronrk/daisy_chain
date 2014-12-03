//<%--
//********************************************************************
//*-------------------------------------------------------------------
//* Licensed Materials - Property of IBM
//*
//* WebSphere Commerce
//*
//* (c) Copyright IBM Corp. 2009 All Rights Reserved
//*
//* US Government Users Restricted Rights - Use, duplication or
//* disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
//*
//*-------------------------------------------------------------------
//*
//--%>

/** 
 * @fileOverview This javascript provides the variables and methods to manipulate the product images, and for switching 
 * the tabs used on the product pages.
 * @version 1.5
 */

			/** This variable stores the identifier of the image currently used for a product */
			var currentAngleImgId="productAngleImg0";
			
			/** This variable stores the identifier of the tab currently being displayed. */
			var currentTabId="Description";			
			
			/** 
			 * Switches an image for the product angle shots.
			 * Sets the class of the selected and previously selected angle images correctly,
			 * plus switches the product full image accordingly.
			 *
			 * @param {string} angleImgId The HTML element identifier that was selected by the shopper.
			 * @param {string} imgsrc The image source path where to get the full image that needs to be switched.
			 */			
			function changeThumbNail(angleImgId,imgsrc){
					if (currentAngleImgId != "") {
						document.getElementById(currentAngleImgId).className ='off';
					}
					currentAngleImgId = angleImgId;
					document.getElementById(angleImgId).className ='on';
					document.getElementById("productMainImage").src = imgsrc;
			}
			
			/** 
			 * Hides the tab with the specified identifier.
			 * This function unhides the 'off' tab, 
			 * and hides the 'on' tab by setting the style.display attribute respectively.
			 *
			 * @param {string} id The identifier of the HTML element representing the tab to hide.
			 */
			function setOff(id){
					document.getElementById(id+"_On").style.display = "none";
					document.getElementById(id+"_Off").style.display = "inline";

			}
			
			/** 
			 * Displays the tab with the specified identifier.
			 * This function unhides the 'on' tab,
			 * and hides the 'off' tab by setting the style.display attribute respectively.
			 *
			 * @param {string} id The identifier of the HTML element representing the tab to display.
			 */			
			function setOn(id){
					document.getElementById(id+"_On").style.display = "inline";
					document.getElementById(id+"_Off").style.display = "none";
			}

			/** 
			 * Switches a tab selection to the tab specified by 'tabId' parameter.
			 * Turns off the currently selected tab and hides it's content. 
			 * Also, this function turns on the tab indicated by the 'tabId' and displays it's contents.
			 *
			 * @param {string} tabId The HTML element identifier to turn 'on'.
			 */				
			function selectTab(tabId){
				setOff(currentTabId);
				setOn(tabId);
				currentTabId = tabId;
				dijit.byId('mainTabContainer').selectChild(dijit.byId(tabId));
			}