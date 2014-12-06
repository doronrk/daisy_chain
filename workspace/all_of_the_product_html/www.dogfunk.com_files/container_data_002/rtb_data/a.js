// version: 12.4.0
		
					function addEvent(element, type, handler) 
					{
						if (element.addEventListener) 
						{
							element.addEventListener(type, handler, false);
						} 
						else if (element.attachEvent) 
						{
							element.attachEvent("on" + type, handler);
						}
					};


					function trusteAddToDom()
					{
						var t_span = document.createElement("span");
						t_span.id = "te-clearads-js-westelm01_728x90";
						var js_script = document.createElement("script");
						js_script.setAttribute('type','text/javascript');
						js_script.setAttribute('src','http://choices.truste.com/ca?pid=valueclick01&aid=westelm01&cid=0711_westelm01_728x90&c=westelm01_728x90&w=728&h=90&plc=tr&js=10');

						var arrScripts = document.getElementsByTagName('script');
						var strScriptTag;
						for (var i = arrScripts.length - 1; i >= 0; i--)
						{
							if(arrScripts[i].parentNode.nodeName == 'SPAN')
							{
							  strScriptTag = arrScripts[i];
							  break;
							}
						}

						if(strScriptTag)
						{
							if(strScriptTag.parentNode)
							{
								strScriptTag.parentNode.parentNode.insertBefore(t_span,strScriptTag.parentNode);
								t_span.appendChild(js_script);
							}
						}			
					}

					if (document.readyState === "complete")
					{
						trusteAddToDom();
					}
					else{
						addEvent(window,"load",trusteAddToDom);
					}