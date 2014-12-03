/*!************************************************************************
*
* ADOBE CONFIDENTIAL
* ___________________
*
*  Copyright 2011 Adobe Systems Incorporated
*  All Rights Reserved.
*
* NOTICE:  All information contained herein is, and remains
* the property of Adobe Systems Incorporated and its suppliers,
* if any.  The intellectual and technical concepts contained
* herein are proprietary to Adobe Systems Incorporated and its
* suppliers and are protected by trade secret or copyright law.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe Systems Incorporated.
**************************************************************************/
s7sdk.Util.require("s7sdk.common.Geometry");s7sdk.Util.require("s7sdk.common.IS");s7sdk.Util.require("s7sdk.common.ItemDesc");s7sdk.Util.require("s7sdk.utils.SwatchesParser");if(!s7sdk.MediaSet){s7sdk.MediaSet=function MediaSet(a,c,b){s7sdk.Logger.log(s7sdk.Logger.INFO,"s7sdk.MediaSet %0",c.toString());arguments.callee.superclass.apply(this,[b,a,"div","s7mediaset",c]);this.createElement();this.container=s7sdk.Util.byId(a);this.mediaSetDesc=null;this.asset=this.getModifier("asset","");this.labelKey=this.getModifier("labelkey","label");this.locale=this.getModifier("locale","");this.serverUrl_=this.getModifier("serverurl","/is/image");if(this.serverUrl_.lastIndexOf("/")!=(this.serverUrl_.length-1)){this.serverUrl_+="/"}this.imageModifier=s7sdk.MediaSetParser.parseAssetForSetReq(this.asset).mod;if(typeof(this.asset)=="string"&&this.asset.length>0){this.requestMediaSet()}};s7sdk.Class.inherits(s7sdk.MediaSet,s7sdk.UIComponent);s7sdk.MediaSet.prototype.setAsset=function(a){a=a.toString();if(a!=null&&this.asset!=null&&this.asset!=""){this.dispatchEvent(new s7sdk.UserEvent(s7sdk.UserEvent.SWAP,[0,a]))}this.asset=a;this.requestMediaSet()};s7sdk.MediaSet.prototype.requestMediaSet=function(){s7sdk.Logger.log(s7sdk.Logger.INFO,"MediaSet.requestMediaSet");this.mediaSet_=this.asset;var b=s7sdk.MediaSetParser.parseAssetForSetReq(this.mediaSet_);var a=this.serverUrl_+"/"+b.name;a+="?"+b.req;if(s7sdk.Util.isNonEmptyString(this.labelKey)){a+="&labelkey="+this.labelKey}if(s7sdk.Util.isNonEmptyString(this.locale)){a+="&locale="+this.locale}this.isReq_=new s7sdk.IS(this.serverUrl_,this.mediaSet_);this.isReq_.getHttpReq(a,this.requestComplete,this.requestError,this)};s7sdk.MediaSet.prototype.requestComplete=function(b,d){var a=b.set;if(a==null){return}d.mediaSetDesc_=s7sdk.MediaSetParser.parse(a,d.imageModifier);var c=new s7sdk.AssetEvent(s7sdk.AssetEvent.NOTF_SET_PARSED,d.mediaSetDesc_,0,true);d.dispatchEvent(c)};s7sdk.MediaSet.prototype.requestError=function(a,b){s7sdk.Logger.log(s7sdk.Logger.ERROR,"requestError %0",a)}};