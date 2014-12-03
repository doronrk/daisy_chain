lpTag.callback({"serviceMap":[{"service":"accountConfigReadWrite","baseURI":"va.ac.liveperson.net"},{"service":"visitorFeed","baseURI":"va.v-feed.liveperson.net"},{"service":"leDataReporting","baseURI":"va.data.liveperson.net"},{"service":"keyService","baseURI":"keyservice.liveperson.net"},{"service":"mTag","baseURI":"sales.liveperson.net"},{"service":"batchelor","baseURI":"va.batchelor.liveperson.net"},{"service":"tokenizer","baseURI":"tokenizer.liveperson.net"},{"service":"liveEngageUI","baseURI":"va.le1.liveperson.net"},{"service":"lpEng","baseURI":"z1.lpEngDomain.liveperson.net"},{"service":"smt","baseURI":"va.v.liveperson.net"},{"service":"nlp","baseURI":"z1.nlp.liveperson.net"},{"service":"leCdnDomain","baseURI":"lpcdn.lpsnmedia.net"},{"service":"staticContent","baseURI":"va.content.lpsnmedia.net"},{"service":"accountConfigReadOnly","baseURI":"z1.acr.liveperson.net"},{"service":"visitManager","baseURI":"va.vm.liveperson.net"},{"service":"liveEngage","baseURI":"z1.le.liveperson.net"},{"service":"acCdnDomain","baseURI":"accdn.lpsnmedia.net"},{"service":"coBrowse","baseURI":"va.cobrowse.liveperson.net"},{"service":"adminArea","baseURI":"sales.liveperson.net"},{"service":"engHistDomain","baseURI":"va.enghist.liveperson.net"},{"service":"interactionPlatform","baseURI":"va.i.liveperson.net"},{"service":"leBiMstr","baseURI":"z1.bi.liveperson.net"},{"service":"openPlatform","baseURI":"sales.liveperson.net"},{"service":"etool","baseURI":"z1.etoolDomain.liveperson.net"},{"service":"mobileChat","baseURI":"dispatch.look.io"},{"service":"agent","baseURI":"sales.liveperson.net"},{"service":"mobileVisit","baseURI":"dispatch.look.io"},{"service":"predictiveDialer","baseURI":"z1.pd.liveperson.net"},{"service":"loggos","baseURI":"z1.loggos.liveperson.net"},{"service":"ALL","baseURI":"sales.liveperson.net"}],"taglets":[{"type":"full","id":"616410","tagletDeveloperId":"lp_global_utils","version":"1.1","name":"lp_global_utils","code":"window.lpTag.taglets.lp_global_utils=(function(){var _v=1.3,_name='lp_global_utils';function init(cfg){}function convertConfig(conf,_config){if(typeof(_config)=='undefined'){lpTag.log('_config is passed as undefined','ERROR',_name);return}if(conf){for(var i=0;i<conf.length;i++){var val=conf[i].value;if(typeof(val)=='string'&&val!=''){if(val==='true'){val=true}else if(val==='false'){val=false}else if(val.charAt(0)=='['||val.charAt(0)=='{'){try{if(typeof(JSON)!='undefined'&&JSON.parse){val=JSON.parse(val)}else{val=eval('('+val+')')}}catch(e){lpTag.log('unable to parse JSON:'+e,'ERROR',_name)}}}_config[conf[i].id]=val}}}function trim(str){return str.replace(/^\\s+|\\s+$/g,'')}return{v:_v,name:_name,init:init,convertConfig:convertConfig,trim:trim}})();"},{"type":"full","id":"43510","tagletDeveloperId":"LPMONITOR","version":"1.0","name":"LPMONITOR","code":"window.lpTag.taglets.LPMONITOR={_v:1.0,_name:'LPMONITOR',init:function(){if(typeof(lpMTagConfig)=='undefined'){window.lpMTagConfig={}}lpMTagConfig.lpServer=lpTag.getDomain('LPMONITOR');lpMTagConfig.lpNumber=lpTag.site;lpMTagConfig.lpProtocol=lpTag.protocol.replace(':','');window.lpAddMonitorTag=function(src){if(typeof(src)=='undefined'||typeof(src)=='object'){if(typeof(lpMTagConfig.pluginSys)!='undefined'&&!lpMTagConfig.pluginsLoaded){src=lpMTagConfig.pluginSys;lpMTagConfig.pluginsLoaded=true}else{src=lpMTagConfig.lpMTagSrc?lpMTagConfig.lpMTagSrc:'/hcp/html/mTag.js'}}if(src.indexOf('http')!=0){src=lpMTagConfig.lpProtocol+\"://\"+lpMTagConfig.lpServer+src+'?site='+lpMTagConfig.lpNumber}else{if(src.indexOf('site=')<0){if(src.indexOf('?')<0)src=src+'?';else src=src+'&';src=src+'site='+lpMTagConfig.lpNumber}}lpTag.load(src,'iso-8859-1')};if(lpTag.isDom){lpAddMonitorTag()}else{lpTag.events.bind('LPT','DOM_READY',lpAddMonitorTag)}}};"},{"type":"full","id":"31210","tagletDeveloperId":"LPCHATTAG","version":"1.0","name":"LPCHATTAG","code":"window.lpTag.taglets.LPCHATTAG={_v:1.1,_name:'LPCHATTAG',init:function(){if(typeof lpMTagConfig=='undefined'){window.lpMTagConfig={}}if(typeof(lpMTagConfig.onLoadCode)=='undefined'){lpMTagConfig.onLoadCode=[]}lpMTagConfig.onLoadCode.push(function(){window.lpTagConfig={lpServer:lpMTagConfig.lpServer,lpNumber:lpMTagConfig.lpNumber,lpProtocol:lpMTagConfig.lpProtocol,addLpTag:function(){var src=this.lpTagSrc||this.lpProtocol+'://'+this.lpServer+'/hc/s-'+this.lpNumber+'/?cmd=lpTagGetJsSnippets';lpTag.load(src,'UTF-8')}};window.lpTagConfig.addLpTag()})}};"},{"type":"full","id":"615210","tagletDeveloperId":"lp_vars","version":"1.2","name":"lp_vars","parameters":[{"id":"maxValueLength","value":"100"},{"id":"dontSendIfZero","value":"[\"OrderTotal\",\"OrderNumber\"]"},{"id":"maxNameLength","value":"50"}],"code":"window.lpTag.taglets.lp_vars=(function(){var _v='1.2.4',_name='lp_vars',_config={maxNameLength:50,maxValueLength:100,dontSendIfZero:[]};var _store={},_origOnResponse=undefined,_origResponseInit=false,_cbQueue=[],_tmp_store=[];function init(conf){lpTag.taglets.lp_global_utils.convertConfig(conf,_config);window.lpMTagConfig=window.lpMTagConfig||{};window.lpMTagConfig.pageVar=window.lpMTagConfig.pageVar||[];window.lpMTagConfig.sessionVar=window.lpMTagConfig.sessionVar||[];window.lpMTagConfig.visitorVar=window.lpMTagConfig.visitorVar||[];_tmp_store=lpTag.vars;lpTag.vars=lpTag.taglets.lp_vars;if(typeof(_tmp_store)!='undefined'&&_tmp_store.length){for(var i=0;i<_tmp_store.length;i++){push(_tmp_store[i])}}_tmp_store=[]}function push(v){if(typeof(v)=='undefined'){_error('Calling add with no parameters');return}if(typeof(v.length)=='undefined'){v=[v]}for(var i=0;i<v.length;i++){_addOne(v[i])}}function _addOne(v){try{if(typeof(v)=='undefined'){_error('Calling _add with no parameters');return false}if(_shouldSend(v)){v.value=''+v.value;var name=_trimSpaces(v.name),value=_trimSpaces(v.value);name=_trimLength(name,_config.maxNameLength);value=_trimLength(value,_config.maxValueLength);if(value!=''){var v_str=encodeURIComponent(name)+'='+encodeURIComponent(value);if(v.scope=='page'){lpMTagConfig.pageVar.push(v_str)}else if(v.scope=='session'){lpMTagConfig.sessionVar.push(v_str)}else if(v.scope=='visitor'){lpMTagConfig.visitorVar.push(v_str)}_store[v.name]=v;_log('Added variable scope:'+v.scope+' name:'+name+' value:'+value);lpTag.events.trigger(_name,'VAR_ADDED',{scope:v.scope,name:name,value:value})}else{_error('Ignoring - trying to add variable with empty value name:'+name)}}else{return false}}catch(e){_error('Exception in adding variable e='+e);return false}return true}function send(vs,cb){try{if(typeof(vs)!='undefined'){push(vs)}if(typeof(lpMTag)=='undefined'){if(typeof(cb)=='function'){window.lpMTagConfig=window.lpMTagConfig||{};if(lpMTagConfig.onResponse){_origOnResponse=lpMTagConfig.onResponse}_cbQueue.push(cb);if(!_origResponseInit){lpMTagConfig.onResponse=function(d,r){if(typeof(d.ResultSet.lpCallError)=='undefined'){var url=r.fullUrl;if(url.indexOf('mTagKnockPage')==-1){for(var i=0;i<_cbQueue.length;i++){_runFn(_cbQueue[i],'onresponse cb')}_cbQueue=[];window.lpMTagConfig.onResponse=_origOnResponse}if(_origOnResponse){_runFn(_origOnResponse,'_origOnResponse')}}}}_origResponseInit=true}}else{var cParam=lpMTag.lpSetCallParams('mTagInPage');lpMTag.mtagAddToQueue(lpMTag.lpURL,cParam,function(){if(typeof(cb)=='function'){_runFn(cb,'immediate cb')}},false,0,false,0,1,lpMTagConfig.charSet)}}catch(e){_error('Error sending variables e='+e)}}function _runFn(fn,fnname){try{fn()}catch(e){_error(\"Exception _runFn \"+fnname+\" e=\"+e)}}function get(v_name){if(typeof(v_name)=='undefined'){return _store}var v=_store[v_name];if(typeof(v)!='undefined'){return v.value}return undefined}function reset(){_store={}}function _trimLength(str,len){if(str.length>len){return str.substr(0,len)}return str}function _trimSpaces(str){if(typeof(str)=='string'){return lpTag.taglets.lp_global_utils.trim(str)}return str}function _shouldSend(v){if(!_validStruct(v)){return false}v.scope=v.scope.toLowerCase();v.scope=_trimSpaces(v.scope);if(v.scope!='page'&&v.scope!='session'&&v.scope!='visitor'){_error('Error validating variable. Bad scope:'+v.scope);return false}if(_isIn(_trimSpaces(v.name),_config.dontSendIfZero)){var n=parseFloat(v.value);if(!isNaN(n)&&n===0){_log('Ignoring variable name:'+v.name+' because value is 0 value:'+v.value);return false}}return true}function _validStruct(v){if(typeof(v.scope)=='undefined'||typeof(v.name)=='undefined'||typeof(v.value)=='undefined'){_error('Error validating variable: scope='+v.scope+' name='+v.name+' value='+v.value);return false}return true}function _isIn(what,where){if(typeof(where)=='undefined'||where.length===0){return false}for(var i=0;i<where.length;i++){if(where[i]==what){return true}}return false}function _log(msg){lpTag.log(msg,'DEBUG',_name)}function _error(msg){lpTag.log(msg,'ERROR',_name)}function inspect(){return{_config:_config,_store:_store}}return{v:_v,name:_name,init:init,push:push,get:get,send:send,reset:reset,includes:[{name:\"lp_global_utils\"}],inspect:inspect}})();"},{"type":"full","id":"2119412","tagletDeveloperId":"lp_version_detector","version":"1.0","name":"lp_version_detector","code":"window.lpTag=lpTag||{};lpTag.taglets=lpTag.taglets||{};lpTag.taglets.lp_version_detector=function(){var _name=\"lp_version_detector\",_v=\"1.0.1\",_conf={sendSDE:false,sendUDE:true};function _log(msg,lvl){if(window.lpTag&&lpTag.log){lpTag.log(msg,lvl,_name)}}function _error(msg){_log(msg,'ERROR')}function _info(msg){_log(msg,'INFO')}function _convertConfig(conf,_config){if(typeof(_config)=='undefined'){lpTag.log('_config is passed as undefined','ERROR',_name);return}if(conf){for(var i=0;i<conf.length;i++){var val=conf[i].value;if(typeof(val)=='string'&&val!=''){if(val==='true'){val=true}else if(val==='false'){val=false}else if(val.charAt(0)=='['||val.charAt(0)=='{'){try{if(typeof(JSON)!='undefined'&&JSON.parse){val=JSON.parse(val)}else{val=eval('('+val+')')}}catch(e){lpTag.log('unable to parse JSON:'+e,'ERROR',_name)}}}_config[conf[i].id]=val}}}function init(cfg){_convertConfig(cfg,_conf)}function start(){if(_conf.sendUDE){_sendUDE({name:'lpTagVer',value:lpTag._v})}if(_conf.sendSDE){_sendSDE({type:\"lpTagVer\",version:lpTag._v})}}function _sendSDE(s){window.lpTag.sdes=window.lpTag.sdes||[];lpTag.sdes.push(s)}function _sendUDE(v){window.lpMTagConfig=window.lpMTagConfig||{};window.lpMTagConfig.pageVar=window.lpMTagConfig.pageVar||[];try{v.value=''+v.value;var v_str=encodeURIComponent(v.name)+'='+encodeURIComponent(v.value);lpMTagConfig.pageVar.push(v_str);_info('Added variable scope:page name:'+v.name+' value:'+v.value)}catch(e){_error('Exception in adding variable e='+e)}}return{getVersion:function(){return _v},getName:function(){return _name},init:init,start:start,inspect:function(){return{conf:_conf}}}}();"},{"type":"full","id":"615510","tagletDeveloperId":"lp_dynButton","version":"1.3","name":"lp_dynButtons","parameters":[{"id":"buttons","value":"[{\"name\":\"chat-{UDE!unit}-{UDE!language}\",\"pid\":\"lpchatbutton1\",\"afterStartPage\":true,\"busyClickable\":true,\"offlineClickable\":true,\"alternateClickable\":true,\"refreshOn\":[]},{\"name\":\"chat-{UDE!unit}-{UDE!language}-2\",\"pid\":\"lpchatbutton2\",\"afterStartPage\":true,\"busyClickable\":true,\"offlineClickable\":true,\"alternateClickable\":true,\"refreshOn\":[]},{\"name\":\"chat-{UDE!unit}-{UDE!language}-3\",\"pid\":\"lpchatbutton3\",\"afterStartPage\":true,\"busyClickable\":true,\"offlineClickable\":true,\"alternateClickable\":true,\"refreshOn\":[]},{\"name\":\"chat-{UDE!unit}-{UDE!language}-4\",\"pid\":\"lpchatbutton4\",\"afterStartPage\":true,\"busyClickable\":true,\"offlineClickable\":true,\"alternateClickable\":true,\"refreshOn\":[]}]"}],"code":"window.lpTag.taglets.lp_dynButtons=(function(){var _v='1.3.2',_name='lp_dynButtons',defaultButton={afterStartPage:true,busyClickable:false,offlineClickable:false,alternateClickable:false,refreshOn:[]};var _config={buttons:[]};var _registeredEvents={},_emtReady=false,_queue=[],_store={},_tmp_store=[];function init(conf){lpTag.taglets.lp_global_utils.convertConfig(conf,_config);window.lpMTagConfig=window.lpMTagConfig||{};window.lpMTagConfig.dynButton=window.lpMTagConfig.dynButton||[];lpMTagConfig.ifVisitorCode=lpMTagConfig.ifVisitorCode||[];lpMTagConfig.onLoadCode=lpMTagConfig.onLoadCode||[];lpMTagConfig.onLoadCode.push(_processQueueOnEMTReady);lpTag.events.bind('lp_emt_event_bridge','LP_DYNBUTTON_START',_buttonStartCallback);lpTag.events.bind('lp_emt_event_bridge','LP_DYNBUTTON_STATE',_buttonStateChangeCallback);_tmp_store=lpTag.dbs;lpTag.dbs=lpTag.taglets.lp_dynButtons;}function start(){if(typeof(_tmp_store)!='undefined'&&_tmp_store.length){for(var i=0;i<_tmp_store.length;i++){push(_tmp_store[i]);}}_tmp_store=[];push(_config.buttons);}function _processQueueOnEMTReady(){try{_emtReady=true;for(var i=0;i<_queue.length;i++){var b=_queue[i];push(b);}_queue=[];_cleanButtonsForNonExistentDivs();}catch(e){_error(\"Exception in _processQueueOnEMTReady e=\"+e);}}function _cleanButtonsForNonExistentDivs(){if(typeof(lpMTagConfig.dynButton)!='undefined'){for(var i=0;i<lpMTagConfig.dynButton.length;i++){var pid=lpMTagConfig.dynButton[i].pid;if(typeof(pid)!='undefined'&&document.getElementById(pid)==null){_log(\"Removing dynButton \"+lpMTagConfig.dynButton[i].name+' pid:'+pid);if(_store[lpMTagConfig.dynButton[i].name]){_store[lpMTagConfig.dynButton[i].name].deployed=false;}else{_log('button found in dynButton and not in _store. Probably uses hybrid deployment');}lpMTagConfig.dynButton.splice(i,1);i--;}else{if(_store[lpMTagConfig.dynButton[i].name]){_store[lpMTagConfig.dynButton[i].name].deployed=true;}else{_log('button found in dynButton and not in _store. Probably uses hybrid deployment true');}}}}}function _registerToEvent(evName){return lpTag.events.bind('lp_emt_event_bridge',evName,function(evData){_evCallback(evName,evData);});}function _attachToEventHandlers(b){for(var i=0;i<b.refreshOn.length;i++){var evName=b.refreshOn[i];if(!_registeredEvents[evName]){var evID=_registerToEvent(evName);_registeredEvents[evName]={evID:evID,buttons:[]};}_registeredEvents[evName].buttons.push(b.name);}}function _evCallback(evName,evData){try{_log('evCallback for dyn button:'+evName);var evRegisters=_registeredEvents[evName];for(var i=0;i<evRegisters.buttons.length;i++){refreshByName(evRegisters.buttons[i]);}}catch(e){_error(\"Exception in _evCallback e=\"+e);}}function _buttonStartCallback(evData){try{_log('button START Callback for button name:'+evData.name);var b=_store[evData.name];if(b){var but_ref=_getButtonRefByName(b.name);if(but_ref){if(b.busyClickable){but_ref.overwriteObj.busyAction=function(b_name){return _stateOnClick(b_name);};}if(b.offlineClickable){but_ref.overwriteObj.offlineAction=function(b_name){return _stateOnClick(b_name);};}if(b.alternateClickable){but_ref.overwriteObj.alternateAction=function(b_name){return _stateOnClick(b_name);};}}else{_error('Can not find button Reference (_buttonStartCallback) name:'+b.name);}}else{_error('Can not find button that started in the _store (_buttonStartCallback). name:'+evData.name);}}catch(e){_error(\"Exception in _buttonStartCallback e=\"+e);}}function _buttonStateChangeCallback(evData){try{var b=_store[evData.name];if(b){if((b.busyClickable&&evData.buttonState=='busy')||(b.offlineClickable&&evData.buttonState=='offline')||(b.alternateClickable&&evData.buttonState=='alternate')){var but_ref=_getButtonRefByName(b.name);if(but_ref){setTimeout(function(){if(but_ref.contentType!=2){but_ref.setCursorStyle('pointer');}else{}},1);}else{_error('Can not find button Reference name:'+b.name);}}}else{_error('Can not find button that started in the _store. name:'+evData.name);}}catch(e){_error(\"Exception in _buttonStateChangeCallback e=\"+e);}}function _stateOnClick(b_obj_name_str){try{var but_ref=_getPointerFromStr(b_obj_name_str);if(but_ref){var state=but_ref.AVAILIABLE;if(but_ref.buttonState=='busy'){state=but_ref.BUSY;}else if(but_ref.buttonState=='offline'){state=but_ref.OFFLINE;}else if(but_ref.buttonState=='alternate'){state='Alternate';}but_ref.openChatWin(state);}else{_error('Can not find button reference. name:'+b_obj_name_str);}}catch(e){_error(\"Exception in _stateOnClick e=\"+e);}}function _getButtonRefByName(b_name){for(var i=0;i<lpMTagConfig.dynButton.length;i++){var ref=lpMTagConfig['dynButton'+i];if(ref&&ref.origButtonName==b_name){return ref;}}return undefined;}function _isValid(b){if(typeof(b.name)=='undefined'||typeof(b.pid)=='undefined'){_log('Invalid button definition name:'+b.name+' pid:'+b.pid);return false;}return true;}function _getPointerFromStr(str){var d=str.split(\".\"),ref=window;for(var i=0;i<d.length;i++){ref=ref[d[i]];if(typeof(ref)=='undefined'||ref==null){return undefined;}}return ref;}function refreshByName(b_name){_log('Refreshing button name:'+b_name);var but_ref=_getButtonRefByName(b_name);if(but_ref){setTimeout(function(){try{but_ref.MakeCall();}catch(e){_error('Exception while but_ref.MakeCall() e='+e);}},500);}else{_error('Can not find button reference (_refreshButton). name:'+b_name);}}function refreshByPid(pid){_log('Refreshing button by pid:'+pid);var found=false;for(var name in _store){var b=_store[name];if(pid==b.pid){refreshByName(b.name);found=true;}}if(!found){_log('Button refresh by pid='+pid+' failed. No button found');}}function push(bs){try{if(typeof(bs)=='undefined'){_error('Calling add with no parameters');return;}if(!_emtReady){_log('Adding button to queue name/length:'+(bs.length?bs.length:bs.name));_queue.push(bs);}else{if(typeof(bs.length)=='undefined'){bs=[bs];}for(var i=0;i<bs.length;i++){_addOne(bs[i]);}}}catch(e){_error(\"Exception in add e=\"+e);}}function _addOne(b){if(!_isValid(b)){_log('Button not added name:'+b.name);return false;}_log('Adding button name:'+b.name+' pid:'+b.pid);_extendButton(b);b.name=_replaceTemplates(b.name);b.pid=_replaceTemplates(b.pid);window.lpMTagConfig.dynButton.push(b);_store[b.name]=b;if(b.refreshOn&&b.refreshOn.length>0){_attachToEventHandlers(b);}lpTag.events.trigger(_name,'DYNBUTTON_ADDED',b);return true;}function _replaceTemplates(name){var matches=name.match(/\\{UDE![^}]*\\}/g);if(matches){for(var i=0;i<matches.length;i++){var match=matches[i];name=_getStrWithUDEs(name,match);}}return name;}function _getStrWithUDEs(str,match){var udeName=match.substr(1);udeName=udeName.substr(0,udeName.length-1);udeName=udeName.split('!');udeName=udeName[1];var regex=new RegExp(\"\\\\{UDE!\"+udeName+\"\\\\}\",'g');str=str.replace(regex,lpTag.taglets.lp_vars.get(udeName));return str;}function _extendButton(b){for(var name in defaultButton){if(typeof(b[name])=='undefined'&&typeof(defaultButton[name]!='undefined')){b[name]=defaultButton[name];}}}function get(name){if(typeof(name)=='undefined'){return _store;}return _store[name];}function _log(msg){lpTag.log(msg,'DEBUG',_name);}function _error(msg){lpTag.log(msg,'ERROR',_name);}function inspect(){return{_config:_config,_store:_store,_queue:_queue,_emtReady:_emtReady,_registeredEvents:_registeredEvents};}return{_v:_v,_name:_name,init:init,start:start,includes:[{name:\"lp_vars\"},{name:\"lp_global_utils\"},{name:\"lp_emt_event_bridge\"}],push:push,get:get,refreshByPid:refreshByPid,refreshByName:refreshByName,inspect:inspect};})();"},{"type":"full","id":"235510","tagletDeveloperId":"lp_emt_event_bridge","version":"1.0","name":"lp_emt_event_bridge","code":"window.lpTag.taglets.lp_emt_event_bridge=(function(){var _v=1.1,_name='lp_emt_event_bridge';function init(conf){if(typeof(lpMTag)=='undefined'){window.lpMTagConfig=window.lpMTagConfig||{};window.lpMTagConfig.onLoadCode=window.lpMTagConfig.onLoadCode||[];window.lpMTagConfig.onLoadCode.push(function(){_registerToEvents()})}else{_registerToEvents()}}function _registerToEvents(){lpMTag.events.register('*',_evCallback)}function _evCallback(evName,evData){lpTag.events.trigger(_name,evName,evData)}return{v:_v,name:_name,init:init}})();"}]});