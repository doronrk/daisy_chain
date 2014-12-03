//-----------------------------------------------------------------
// Licensed Materials - Property of IBM
//
// WebSphere Commerce
//
// (C) Copyright IBM Corp. 2011 All Rights Reserved.
//
// US Government Users Restricted Rights - Use, duplication or
// disclosure restricted by GSA ADP Schedule Contract with
// IBM Corp.
//-----------------------------------------------------------------



/** 
 * @fileOverview This javascript provides the variables and methods to manipulate the product images, and for switching 
 * the tabs used on the product pages.
 * @version 1.5
 */
			
			/** This variable stores the identifier of the image currently used for a product */
			var currentAngleImgId="productAngleLi0";

			function changeThumbNail(angleImgId,imgsrc){
					if (currentAngleImgId != "") {
						document.getElementById(currentAngleImgId).className ='';
					}
					currentAngleImgId = angleImgId;
					document.getElementById(angleImgId).className ='selected';
					document.getElementById("productMainImage").src = imgsrc;
			}