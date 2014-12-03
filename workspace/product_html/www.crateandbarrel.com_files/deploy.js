lpAddMonitorTag();
typeof lpMTagConfig!="undefined"&&function(a){lpMTagConfig.isMobile=!1;if(/android|avantgo|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0,
4)))lpMTagConfig.isMobile=!0}(navigator.userAgent||navigator.vendor||window.opera);
//DO NOT CHANGE THE BELOW COMMENT
//PLUGINS_LIST=genericEventsBridge,globalUtils,inputboxHandler
if (typeof(lpMTagConfig.plugins)=='undefined') { lpMTagConfig.plugins = {};}
lpMTagConfig.plugins['genericEventsBridge'] = {
	name: 'genericEventsBridge'
	,config: {
		dbOvrObj : ['lpMTagConfig.db1']
		,btClicked : function(vars){
			try{
				function tagEvent(eventId) {
					if(omntag) {
						omntag.linkTrackVars= 'events';
						omntag.linkTrackEvents=eventId; 
						omntag.events=eventId;
						omntag.tl(this,'o','buttonClicked');
					}
				}
				tagEvent('event38');
			} catch(e){}
		}
		,invStart : function(vars){
			try{
				function tagEvent(eventId) {
					if(omntag) {
						omntag.linkTrackVars= 'events';
						omntag.linkTrackEvents=eventId; 
						omntag.events=eventId;
						omntag.tl(this,'o','invitationShown');
					}
				}
				tagEvent('event34');
			} catch(e){}
		}
		,invAccepted : function(vars){
			try{
				function tagEvent(eventId) {
					if(omntag) {
						omntag.linkTrackVars= 'events';
						omntag.linkTrackEvents=eventId; 
						omntag.events=eventId;
						omntag.tl(this,'o','invitationAccepted');
					}
				}
				tagEvent('event35');
			} catch(e){}
		}
		,invDeclined : function(vars){
			try{
				function tagEvent(eventId) {
					if(omntag) {
						omntag.linkTrackVars= 'events';
						omntag.linkTrackEvents=eventId; 
						omntag.events=eventId;
						omntag.tl(this,'o','invitationDeclined');
					}
				}
				tagEvent('event36');
			} catch(e){}
		}
		,inviteChatTimeout : function(vars){
			try{
				function tagEvent(eventId) {
					if(omntag) {
						omntag.linkTrackVars= 'events';
						omntag.linkTrackEvents=eventId; 
						omntag.events=eventId;
						omntag.tl(this,'o','invitationTimedOut');
					}
				}
				tagEvent('event37');
			} catch(e){}
		}
	}
};

lpMTagConfig.plugins['globalUtils'] = { 
	name: 'globalUtils' 
	,config: { 
		dbOvrObj : ['lpMTagConfig.db1']
		,forceButtonRefreshOnInvite:true
	}
};

lpMTagConfig.plugins['inputboxHandler'] = { 
	name: 'inputboxHandler'  
	,config: { 
	inputInvElID : "yourQuestionBox" 
	} 
};

//Identify mobile users
try{
	if(lpMTagConfig.isMobile){
		 lpAddVars('session','MobileVisitor','true');
	}
}catch(e){}
if (typeof(lpMTagConfig.pluginCode)== 'undefined') {lpMTagConfig.pluginCode = {};} // HAS TO BE HERE
lpMTagConfig.pluginCode.lpBasePlugin = {
    // initialize the external configuration parameters - do not change this method - has to be added to every plugin
    init: function() {
        try {
            if (typeof (lpMTagConfig.pluginRef) == 'undefined') { lpMTagConfig.pluginRef = {}; }
            lpMTagConfig.pluginRef[this.name] = this;
            this.log(this.name + ' init', 'DEBUG');
            for (var name in lpMTagConfig.plugins) {
                if (typeof (lpMTagConfig.plugins[name]) == 'object' && lpMTagConfig.plugins[name].name == this.name) {
                    var cfg = lpMTagConfig.plugins[name].config;
                    if (cfg) {
                        for (var prop in cfg) {
                            this[prop] = cfg[prop];
                        }
                    }
                    break;
                }
            }
        }
        catch (e) {
            this.log('Plugin ' + this.name + ' exception in init:' + e, 'ERROR');
        }
    },

    log: function(msg, level) {
        if (typeof(lpMTagDebug)!='undefined' && lpMTagDebug.Display) {
            try {
                lpMTagDebug.Display(msg, level, 'PLUGIN-' + this.name);
            }
            catch (e) { }
        }
		if(typeof(console)!='undefined' && 
		   (typeof(lpMTagConfig.pluginsConsoleDebug)=='undefined' ||  lpMTagConfig.pluginsConsoleDebug==true)){
			console.log(level + ":" + msg);
		}
    }
};

// Initialize the plugin hook arrays if needed
if (typeof (lpMTagConfig.pluginHook) == 'undefined') { lpMTagConfig.pluginHook = {}; }
if (typeof (lpMTagConfig.pluginHook.invite) == 'undefined') { lpMTagConfig.pluginHook.invite = []; }
if (typeof (lpMTagConfig.pluginHook.dynButtons) == 'undefined') { lpMTagConfig.pluginHook.dynButtons = []; }
if(typeof lpMTagConfig.pluginCode=="undefined")lpMTagConfig.pluginCode={};
lpMTagConfig.pluginCode.genericEventsBridge={ver:1,name:"genericEventsBridge",invStart:null,invAccepted:null,invDeclined:null,invTimeout:null,invVoiceStart:null,invVoiceAccepted:null,invVoiceDeclined:null,invVoiceTimeout:null,invMultiChannelStart:null,invMultiChannelAccepted:null,invMultiChannelDeclined:null,invMultiChannelTimeout:null,btStateChange:null,btClicked:null,override:!1,dynButtonHooks:[{name:"dbStateChange",src:"genericEventsBridge",run:function(a){return lpMTagConfig.pluginCode.genericEventsBridge.dbStateChange(a)}},
{name:"dbClicked",src:"genericEventsBridge",run:function(a){return lpMTagConfig.pluginCode.genericEventsBridge.dbClicked(a)}}],start:function(){this.log(this.name+" start","DEBUG")},execCallback:function(a,b,c){var d=!0;try{this.log(this.name+" "+a,"DEBUG"),b!==null&&(d=b(c))}catch(e){this.log("Plugin "+this.name+" exception in "+a+":"+e,"ERROR")}return this.override?d:!0},inviteChatStart:function(a){return this.execCallback("inviteChatStart",this.invStart,a)},inviteChatAccept:function(a){return this.execCallback("inviteChatAccepted",
this.invAccepted,a)},inviteChatDeclined:function(a){return this.execCallback("inviteChatDeclined",this.invDeclined,a)},inviteChatTimeout:function(a){return this.execCallback("inviteChatTimeout",this.invTimeout,a)},inviteVoiceStart:function(a){return this.execCallback("inviteVoiceStart",this.invVoiceStart,a)},inviteVoiceAccept:function(a){return this.execCallback("inviteVoiceAccept",this.invVoiceAccepted,a)},inviteVoiceDeclined:function(a){return this.execCallback("inviteVoiceDeclined",this.invVoiceDeclined,
a)},inviteVoiceTimeout:function(a){return this.execCallback("inviteVoiceTimeout",this.invVoiceTimeout,a)},inviteMultiChannelStart:function(a){return this.execCallback("inviteMultiChannelStart",this.invMultiStart,a)},inviteMultiChannelAccept:function(a,b){var c=!0;try{this.log(this.name+" inviteMultiChannelAccept","DEBUG"),this.invMultiChannelAccept!==null&&(c=this.invMultiChannelAccept(a,b))}catch(d){this.log("Plugin "+this.name+" exception in inviteMultiChannelAccept:"+d,"ERROR")}return this.override?
c:!0},inviteMultiChannelDeclined:function(a){return this.execCallback("inviteMultiChannelDeclined",this.invMultiDeclined,a)},inviteMultiChannelTimeout:function(a){return this.execCallback("inviteMultiChannelTimeout",this.invMultiTimeout,a)},dbStateChange:function(a){return this.execCallback("dbStateChange",this.btStateChange,a)},dbClicked:function(a){return this.execCallback("dbClicked",this.btClicked,a)}};
lpMTagConfig.pluginHook.invite[lpMTagConfig.pluginHook.invite.length]={name:"inviteChatStart",src:"genericEventsBridge",run:function(a){return lpMTagConfig.pluginCode.genericEventsBridge.inviteChatStart(a)}};lpMTagConfig.pluginHook.invite[lpMTagConfig.pluginHook.invite.length]={name:"inviteChatAccept",src:"genericEventsBridge",run:function(a){return lpMTagConfig.pluginCode.genericEventsBridge.inviteChatAccept(a)}};
lpMTagConfig.pluginHook.invite[lpMTagConfig.pluginHook.invite.length]={name:"inviteChatDeclined",src:"genericEventsBridge",run:function(a){return lpMTagConfig.pluginCode.genericEventsBridge.inviteChatDeclined(a)}};lpMTagConfig.pluginHook.invite[lpMTagConfig.pluginHook.invite.length]={name:"inviteChatTimeout",src:"genericEventsBridge",run:function(a){return lpMTagConfig.pluginCode.genericEventsBridge.inviteChatTimeout(a)}};
lpMTagConfig.pluginHook.invite[lpMTagConfig.pluginHook.invite.length]={name:"inviteVoiceStart",src:"genericEventsBridge",run:function(a){return lpMTagConfig.pluginCode.genericEventsBridge.inviteVoiceStart(a)}};lpMTagConfig.pluginHook.invite[lpMTagConfig.pluginHook.invite.length]={name:"inviteVoiceAccept",src:"genericEventsBridge",run:function(a){return lpMTagConfig.pluginCode.genericEventsBridge.inviteVoiceAccept(a)}};
lpMTagConfig.pluginHook.invite[lpMTagConfig.pluginHook.invite.length]={name:"inviteVoiceDeclined",src:"genericEventsBridge",run:function(a){return lpMTagConfig.pluginCode.genericEventsBridge.inviteVoiceDeclined(a)}};lpMTagConfig.pluginHook.invite[lpMTagConfig.pluginHook.invite.length]={name:"inviteVoiceTimeout",src:"genericEventsBridge",run:function(a){return lpMTagConfig.pluginCode.genericEventsBridge.inviteVoiceTimeout(a)}};
lpMTagConfig.pluginHook.invite[lpMTagConfig.pluginHook.invite.length]={name:"inviteMultiChannelStart",src:"genericEventsBridge",run:function(a){return lpMTagConfig.pluginCode.genericEventsBridge.inviteMultiChannelStart(a)}};lpMTagConfig.pluginHook.invite[lpMTagConfig.pluginHook.invite.length]={name:"inviteMultiChannelAccept",src:"genericEventsBridge",run:function(a){return lpMTagConfig.pluginCode.genericEventsBridge.inviteMultiChannelAccept(a)}};
lpMTagConfig.pluginHook.invite[lpMTagConfig.pluginHook.invite.length]={name:"inviteMultiChannelDeclined",src:"genericEventsBridge",run:function(a){return lpMTagConfig.pluginCode.genericEventsBridge.inviteMultiChannelDeclined(a)}};lpMTagConfig.pluginHook.invite[lpMTagConfig.pluginHook.invite.length]={name:"inviteMultiChannelTimeout",src:"genericEventsBridge",run:function(a){return lpMTagConfig.pluginCode.genericEventsBridge.inviteMultiChannelTimeout(a)}};
if(typeof lpMTagConfig.pluginCode=="undefined")lpMTagConfig.pluginCode={};
lpMTagConfig.pluginCode.globalUtils={ver:2,name:"globalUtils",overrideBusyAction:!1,overrideOfflineAction:!1,forceButtonRefreshOnDecline:!1,forceButtonRefreshOnInvite:!1,excludeVisitorByCookie:!1,excludeVariableName:"Exclude",excludeVariableValue:"true",ssoURL:null,dynButtonHooks:[{name:"busyAction",run:function(a){return lpMTagConfig.pluginCode.globalUtils.busyAction(a)}},{name:"offlineAction",run:function(a){return lpMTagConfig.pluginCode.globalUtils.offlineAction(a)}},{name:"dbStateChange",run:function(a){return lpMTagConfig.pluginCode.globalUtils.dbStateChange(a)}}],
buttonRefs:[],start:function(){this.log(this.name+" start","DEBUG");this.excludeVisitorByCookie&typeof lpAddVars!="undefined"&&/lpdontbotherme\=1/.test(document.cookie)&&lpAddVars("session",this.excludeVariableName,this.excludeVariableValue);if(this.ssoURL!=null){lpMTagConfig.inviteChatSSOurl=this.ssoURL;for(var a=0;a<lpMTagConfig.dynButton.length;a++)lpMTagConfig.dynButton[a].SSOURL=this.ssoURL}},setExcludeCookie:function(a){try{if(this.log(this.name+" setExcludeCookie","DEBUG"),!isNaN(a)&&a>0){var b=
new Date;b.setTime(b.getTime()+a*36E5);var c="; expires="+b.toGMTString();document.cookie="lpdontbotherme=1"+c+"; path=/"}}catch(d){this.log("Plugin "+this.name+" exception in setExcludeCookie:"+d,"ERROR")}},busyAction:function(a){if(this.overrideBusyAction)try{this.log(this.name+" busyAction","DEBUG");objRef=eval(a.objName);var b=objRef.getActionURL("Busy"),b=b.replace(/forceOffline/,"SESSIONVAR%21BusyClickOverride");window.open(b,"Chat"+lpMTagConfig.lpNumber,"width=472,height=320,status=0,resizable=0,menubar=no,scrollbars=no,location=no")}catch(c){this.log("Plugin "+
this.name+" exception in busyAction:"+c,"ERROR")}},offlineAction:function(a){if(this.overrideOfflineAction)try{this.log(this.name+" offlineAction","DEBUG");objRef=eval(a.objName);var b=objRef.getActionURL("Offline");window.open(b,"Chat"+lpMTagConfig.lpNumber,"width=472,height=320,status=0,resizable=0,menubar=no,scrollbars=no,location=no")}catch(c){this.log("Plugin "+this.name+" exception in offlineAction:"+c,"ERROR")}},dbStateChange:function(a){try{this.log(this.name+" dbStateChange","DEBUG");for(var b=
eval(a.objName),c=!1,d=0;d<this.buttonRefs.length;d++)this.buttonRefs[d]===b&&(c=!0);!c&&b!=null&&this.buttonRefs.push(b);objRef=eval(a.objName);if(typeof objRef.refImage=="undefined")return!0;if(a.status=="busy"&&this.overrideBusyAction)return objRef.setCursorStyle(objRef.pointerStyle),objRef.refImage.src=typeof objRef.ver=="undefined"?objRef.imageUrl+objRef.imgBusyName:objRef.imgBusyName,objRef.refImage.alt="",objRef.refImage.onclick=typeof objRef.overwriteObj.busyAction!="undefined"?function(){try{eval(objRef.extConfig.ovr).busyAction(a.objName)}catch(b){}return!1}:
null,!1;if(a.status=="offline"&&this.overrideOfflineAction)return objRef.setCursorStyle(objRef.pointerStyle),objRef.refImage.src=typeof objRef.ver=="undefined"?objRef.imageUrl+objRef.imgOfflineName:objRef.imgOfflineName,objRef.refImage.alt="",objRef.refImage.onclick=typeof objRef.overwriteObj.offlineAction!="undefined"?function(){try{eval(objRef.extConfig.ovr).offlineAction(a.objName)}catch(b){}return!1}:null,!1}catch(e){this.log("Plugin "+this.name+" exception in dbStateChange:"+e,"ERROR")}return!0},
refreshButtons:function(){for(var a=0;a<this.buttonRefs.length;a++){var b=this.buttonRefs[a];try{b.MakeCall()}catch(c){this.log("Plugin "+this.name+" exception when refreshing button: "+c,"ERROR")}}},inviteChatShown:function(){try{this.log(this.name+" inviteChatShown","DEBUG"),this.forceButtonRefreshOnInvite==!0&&this.refreshButtons()}catch(a){this.log("Plugin "+this.name+" exception in inviteChatShown:"+a,"ERROR")}return!0},inviteChatDeclined:function(){try{this.log(this.name+" inviteChatDeclined",
"DEBUG"),this.forceButtonRefreshOnDecline==!0&&this.refreshButtons()}catch(a){this.log("Plugin "+this.name+" exception in inviteChatDeclined:"+a,"ERROR")}return!0}};lpMTagConfig.pluginHook.invite[lpMTagConfig.pluginHook.invite.length]={name:"inviteChatDeclined",run:function(a){return lpMTagConfig.pluginCode.globalUtils.inviteChatDeclined(a)}};lpMTagConfig.pluginHook.invite[lpMTagConfig.pluginHook.invite.length]={name:"inviteChatShown",run:function(a){return lpMTagConfig.pluginCode.globalUtils.inviteChatShown(a)}};
if(typeof lpMTagConfig.pluginCode=="undefined")lpMTagConfig.pluginCode={};
lpMTagConfig.pluginCode.inputboxHandler={ver:1,name:"inputboxHandler",errRequiredField:"Please enter a value",errEmail:"Please enter a valid email address",errMaxLength:"Please enter no more than [MAX] characters",errNumeric:"Please enter a valid number",errButDivID:"lpbtmsg",errInvDivID:"lpinvmsg",inputButElID:"lpbuttonTxt",inputInvElID:"lpinvTxt",validateAttribName:"lpvalidate",addToInviteTimeout:60,inputValue:"",V_EMAIL:1,V_TEXT:2,V_NUMBER:3,start:function(){this.log(this.name+" start","DEBUG")},
sendInputBox:function(a){try{this.log(this.name+" sendInputBox","DEBUG");var c="";c=a=="invite"?this.inputInvElID:this.inputButElID;if(document.getElementById(c)==null)return true;if(!this.validateInputBox(a))return false;this.inputValue.length>0&&lpSendData("session",a+"InputBox",this.inputValue)}catch(b){this.log("Plugin "+this.name+" exception in sendInputBox:"+b,"ERROR")}return true},showError:function(a,c){try{this.log(this.name+" showError","DEBUG");var b="";b=a=="invite"?this.errInvDivID:this.errButDivID;
var d=document.getElementById(b);if(d){d.innerHTML=c;d.style.display="block"}else this.log("Plugin "+this.name+" exception in showError:"+e,"ERROR")}catch(f){this.log("Plugin "+this.name+" exception in showError:"+f,"ERROR")}},hideError:function(a){try{this.log(this.name+" hideError","DEBUG");var c="";c=a=="invite"?this.errInvDivID:this.errButDivID;var b=document.getElementById(c);if(b){b.innerHTML="";b.style.display="none"}}catch(d){this.log("Plugin "+this.name+" exception in hideError:"+d,"ERROR")}},
validateInputBox:function(a){try{this.log(this.name+" validateInputBox","DEBUG");this.hideError(a);var c="";c=a=="invite"?this.inputInvElID:this.inputButElID;var b={};eval("var validation = "+document.getElementById(c).getAttribute(this.validateAttribName)+";");if(b==null)return true;var d=this.trimSpaces(document.getElementById(c).value);if(d.length==0&&b.required){this.showError(a,this.errRequiredField);return false}if(b.pattern==this.V_EMAIL&&/^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/.test(d)==
false){this.showError(a,this.errEmail);return false}if(b.pattern==this.V_TEXT&&b.maxLength&&d.length>b.maxLength){this.showError(a,this.errMaxLength.replace(/\[MAX\]/g,b.maxLength));return false}if(b.pattern==this.V_NUMBER&&isNaN(d)){this.showError(a,this.errNumeric);return false}this.inputValue=d}catch(f){this.log("Plugin "+this.name+" exception in validateInputBox:"+f,"ERROR");alert(f)}return true},trimSpaces:function(a){return a.replace(/^\s+|\s+$/g,"")},inviteChatStart:function(a){try{this.log(this.name+
" inviteChatStart","DEBUG");var c=eval(a.objName);if(c==null)return true;var b=c.GetObj(c.divID);if(b==null)return true;if(b.innerHTML!=null&&b.innerHTML.indexOf(this.inputInvElID)>0)c.timeOut+=this.addToInviteTimeout}catch(d){this.log("Plugin "+this.name+" exception in inviteChatStart:"+d,"ERROR")}return true},inviteChatAccept:function(){try{this.log(this.name+" inviteChatAccept","DEBUG");return this.sendInputBox("invite")}catch(a){this.log("Plugin "+this.name+" exception in inviteChatAccept:"+a,
"ERROR")}return true},dbClicked:function(a){try{this.log(this.name+" dbClicked","DEBUG");if(a&&a.status=="online")return this.sendInputBox("button")}catch(c){this.log("Plugin "+this.name+" exception in dbClicked:"+c,"ERROR")}return true}};lpMTagConfig.pluginHook.invite[lpMTagConfig.pluginHook.invite.length]={name:"inviteChatStart",src:"inputboxHandler",run:function(a){return lpMTagConfig.pluginCode.inputboxHandler.inviteChatStart(a)}};
lpMTagConfig.pluginHook.invite[lpMTagConfig.pluginHook.invite.length]={name:"inviteChatAccept",src:"inputboxHandler",run:function(a){return lpMTagConfig.pluginCode.inputboxHandler.inviteChatAccept(a)}};lpMTagConfig.pluginHook.dynButtons[lpMTagConfig.pluginHook.dynButtons.length]={name:"dbClicked",src:"inputboxHandler",run:function(a){return lpMTagConfig.pluginCode.inputboxHandler.dbClicked(a)}};
if(typeof lpMTagConfig.initPluginSys=="undefined")lpMTagConfig.initPluginSys=function(){try{for(var d in lpMTagConfig.plugins){for(var c in lpMTagConfig.pluginCode.lpBasePlugin)lpMTagConfig.pluginCode[d][c]=lpMTagConfig.pluginCode.lpBasePlugin[c];typeof lpMTagConfig.pluginCode[d].init!="undefined"&&lpMTagConfig.pluginCode[d].init();typeof lpMTagConfig.pluginLoaded!="undefined"&&lpMTagConfig.pluginLoaded(lpMTagConfig.pluginCode[d].name)}}catch(k){if(typeof lpMTagDebug!="undefined"&&lpMTagDebug.Display)lpMTagDebug.Display("Exceptions in processing pluginRef:"+
k,"ERROR","PLUGIN-SYS");else throw k;}d=function(a,b){typeof a[b.name]=="undefined"&&(a[b.name]=function(a,c){return arguments.callee.hooks?lpMTagConfig.runPluginHooks(arguments.callee.hooks,b.name,{objName:a,status:c}):lpMTagConfig.runPluginHooks(lpMTagConfig.pluginHook.dynButtons,b.name,{objName:a,status:c})});if(!a[b.name].hooks)a[b.name].hooks=[];a[b.name].hooks.push(b)};try{for(c in lpMTagConfig.pluginRef){var g=lpMTagConfig.pluginRef[c];if(typeof g.dbOvrObj!="undefined")for(var h=0;h<g.dbOvrObj.length;h++){var i=
eval(g.dbOvrObj[h]);if(i){for(var f=0;f<lpMTagConfig.pluginHook.dynButtons.length;f++)d(i,lpMTagConfig.pluginHook.dynButtons[f]);if(g.dynButtonHooks)for(var j=0;j<g.dynButtonHooks.length;j++)d(i,g.dynButtonHooks[j])}}}}catch(l){if(typeof lpMTagDebug!="undefined"&&lpMTagDebug.Display)lpMTagDebug.Display("Exceptions in processing dbOvrObj:"+l,"ERROR","PLUGIN-SYS");else throw l;}try{for(f=0;f<lpMTagConfig.pluginHook.invite.length;f++)(function(a){var b=lpMTagConfig.pluginHook.invite[a];typeof lpMTagConfig[b.name]==
"undefined"&&(lpMTagConfig[b.name]=function(a){return lpMTagConfig.runPluginHooks(lpMTagConfig.pluginHook.invite,b.name,{objName:a})})})(f)}catch(m){if(typeof lpMTagDebug!="undefined"&&lpMTagDebug.Display)lpMTagDebug.Display("Exceptions in processing invite hooks:"+m,"ERROR","PLUGIN-SYS");else throw m;}lpMTagConfig.runPluginHooks=function(a,b,c){try{for(var d=!0,f=0;f<a.length;f++){var g=a[f];if(g.name==b){typeof lpMTagDebug!="undefined"&&lpMTagDebug.Display&&lpMTagDebug.Display("runPluginHooks running:"+
b,"DEBUG","PLUGIN-SYS");c.prevRet=d;var h=g.run(c);h===!1&&(d=h)}}}catch(i){if(typeof lpMTagDebug!="undefined"&&lpMTagDebug.Display)lpMTagDebug.Display("Exceptions in runPluginHooks:"+i,"ERROR","PLUGIN-SYS");else throw i;}return d};try{for(c in lpMTagConfig.pluginRef)c!="lpBasePlugin"&&typeof lpMTagConfig.pluginRef[c].start!="undefined"&&lpMTagConfig.pluginRef[c].start()}catch(n){if(typeof lpMTagDebug!="undefined"&&lpMTagDebug.Display)lpMTagDebug.Display("Exceptions in processing start evets:"+n,
"ERROR","PLUGIN-SYS");else throw n;}},lpMTagConfig.initPluginSys();else if(typeof e!="undefined")if(typeof lpMTagDebug!="undefined"&&lpMTagDebug.Display)lpMTagDebug.Display("Trying to define and run initPluginSys more than once (Check for multiple mtagconfig.js):"+e,"ERROR","PLUGIN-SYS");else throw e;else typeof lpMTagDebug!="undefined"&&lpMTagDebug.Display&&lpMTagDebug.Display("Trying to define and run initPluginSys more than once (Check for multiple mtagconfig.js):","ERROR","PLUGIN-SYS");
