lpConnLib.Process({"ResultSet": {"lpCallId":"000944175139-304244185413","lpCallConfirm":"","lpJS_Execute":[{"code_id": "SYSTEM!updateButtonStatic_compact.js", "js_code": "function lpUpdateStaticButton(){this.hcDate=function(){var d=new Date();return d.getTime();};this.hcGetImage=function(name){return this.hcFindImage(document,name);};this.hcFindImage=function(doc,name){var i;if(this.hcDOM){var elements=doc.getElementsByTagName('IMG');var collection=[];for(i=0;i<elements.length;i++){if((typeof(elements[i].name)!='undefined')&&(elements[i].name==name)){collection[collection.length]=elements[i];}}if(collection.length==0){return null;}if(collection.length==1){return collection[0];}return collection;}var lays=doc.layers;if(!lays){return doc[name];}for(i=0;i<doc.images.length;i++){if(doc.images[i].name==name){return doc.images[i];}}for(var l=0;l<lays.length;l++){var img=this.hcFindImage(lays[l].document,name);if(img!=null){return img;}}return null;};this.hcDOM=(document.getElementById)?true:false;this.hcimage=this.hcGetImage('hcIcon');this.hcicon=null;var i;if(this.hcimage){if(!(this.hcimage.length)){var temp=this.hcimage;this.hcimage=[];this.hcimage[0]=temp;}this.hcicon=[];for(i=0;i<this.hcimage.length;i++){this.hcicon[i]=this.hcimage[i].src;}}if(this.hcimage){for(i=0;i<this.hcimage.length;i++){this.hcimage[i].src=this.hcicon[i]+'&monitor=1&d='+this.hcDate();}}if(typeof(lpMTagStatic)!='undefined'&&typeof(lpMTagStatic.stateChangeCallbacks)!='undefined'){for(i=0;i<lpMTagStatic.stateChangeCallbacks.length;i++){var tempfunc=lpMTagStatic.stateChangeCallbacks[i];try{tempfunc();if(lpConnLib.DebugDisplay){lpMTagDebug.Display('OK Executing Static button callback function','EXEC-OK');}}catch(hcError){if(lpConnLib.DebugDisplay){lpMTagDebug.Display('ERROR Executing Static button callback function='+tempfunc+' &nbsp #'+hcError+'#','ERROR');}}}}}var lpUpdateStaticButtonObj=new lpUpdateStaticButton();"},{"code_id": "LP_REP_STATE_CHANGED", "js_code": "if(window.lpTag&&window.lpTag.events){window.lpTag.events.trigger('LPChat','LP_REP_STATE_CHANGED',{});}else if(window.lpMTag&&window.lpMTag.events){window.lpMTag.events.publish('LP_REP_STATE_CHANGED',{});}"},{"code_id": "INPAGE-DELAY-10", "js_code": "lpMTag.lpInPageRequestDelay=10;"},{"code_id": "FPCSetVal", "js_code": "lpMTagConfig.useFirstParty = false;lpMTag.lpDeleteCookie(lpMTagConfig.FPC_VID_NAME,'/',lpMTagConfig.FPC_ParentDomain);lpMTag.lpDeleteCookie(lpMTagConfig.FPC_SKEY_NAME, '/',lpMTagConfig.FPC_ParentDomain);lpMTag.lpDeleteCookie(lpMTagConfig.FPC_CONT_NAME, '/',lpMTagConfig.FPC_ParentDomain);"},{"code_id": "VIS-ONSTARTPAGE", "js_code": "lpMTagConfig.LPSID_VAR=16743118;"}]}});