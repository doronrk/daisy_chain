var iszopimstatus = "";
	    window.$zopim || (function (d, s) {
	        var z = $zopim = function (c) { z._.push(c) }, $ = z.s =
	d.createElement(s), e = d.getElementsByTagName(s)[0]; z.set = function (o) {
	    z.set.
	_.push(o)
	}; z._ = []; z.set._ = []; $.async = !0; $.setAttribute('charset', 'utf-8');
	        $.src = '//v2.zopim.com/?22MRFuSjKAEVb8uIlxQE2304Aih4R0ZE'; z.t = +new Date; $.
	type = 'text/javascript'; e.parentNode.insertBefore($, e)
	    })(document, 'script');

            	    $zopim(function () {
            	        $zopim.livechat.theme.setColor('#452F69');
            	        $zopim.livechat.theme.reload(); // apply new theme settings 
            	        //$zopim.livechat.window.setTitle('YogaOutlet Live Chat');
            	        //$zopim.livechat.addTags("yogaoutlet", "chat");
            	    });
            	    $zopim(function () {
            	        $zopim.livechat.setOnStatus(change_chat_img);
            	    });
         
            	    function change_chat_img(status) {
            	        var img = document.getElementById('lpDynamicButtonImg-700');
            	        if (status == 'online' || status == 'away') {
							iszopimstatus = "online";
            	            $("#livechatzopimoffline").hide();
            	            $("#livechatzopimonline").show();
            	            $zopim.livechat.hideAll();
            	        }
            	        else if (status == 'offline') {
							iszopimstatus = "offline";
            	            $("#livechatzopimonline").hide();
            	            $("#livechatzopimoffline").show();
            	            $zopim.livechat.hideAll();
            	        }
            	    }
            	    $(function () {
            	        
            	        var platform, platformName, isMobile;
            	        var ua = navigator.userAgent.toLowerCase(),
                    platform = navigator.platform.toLowerCase();
            	        platformName = ua.match(/ip(?:ad|od|hone)/) ? 'ios' : (ua.match(/(?:webos|android)/) || platform.match(/mac|win|linux/) || ['other'])[0],
                    isMobile = /ios|android|webos/.test(platformName);
            	        if (isMobile) {
            	            $('#liveChatTop').html('<a href="javascript:void(0)" id="lpDynamicButtonHref-700" style="cursor: pointer;" title=""><img id="livechatzopimonline" onClick=" $zopim.livechat.hideAll();$zopim.livechat.addTags(\'mobile yogaoutlet\',\'chat\'); $zopim.livechat.window.openPopout();_gaq.push([\'_trackEvent\',\'Header\', \'Clicks\',\'Live Chat\',,true]);"  name="lpDynamicButtonImg-700" border="0" style="border: 0px none;display:none;" alt="" src="https://www.yogaoutlet.com/Images/img-on-line-top.png"><img id="livechatzopimoffline"  name="lpDynamicButtonImg-700" border="0" style="border: 0px none" alt="" src="https://www.yogaoutlet.com/Images/img-off-line-top.png"></a>');
            	            $("#fLinkLiveChat").remove();
            	            $("#fservice").append('<a id="livechat" href="javascript:void(0);" style="cursor:pointer;" title="Live Chat" onClick=" $zopim.livechat.hideAll();_gaq.push([\'_trackEvent\', \'Footer\',\'Clicks\',\'Live Chat\',,true]);$zopim.livechat.addTags(\'mobile yogaoutlet\',\'chat\');$zopim.livechat.window.openPopout();">Live Chat</a>');
            	        } else {
            	            $('#liveChatTop').html('<a href="javascript:void(0)" id="lpDynamicButtonHref-700" style="cursor: pointer;" title=""><img id="livechatzopimonline" onClick="$zopim.livechat.hideAll();$zopim.livechat.addTags(\'yogaoutlet\',\'chat\'); $zopim.livechat.window.openPopout();_gaq.push([\'_trackEvent\',\'Header\', \'Clicks\',\'Live Chat\',,true]);"  name="lpDynamicButtonImg-700" border="0" style="border: 0px none;display:none;" alt="" src="https://www.yogaoutlet.com/Images/img-on-line-top.png"><img id="livechatzopimoffline"  name="lpDynamicButtonImg-700" border="0" style="border: 0px none" alt="" src="https://www.yogaoutlet.com/Images/img-off-line-top.png"></a>');
            	            $("#fLinkLiveChat").remove();
            	            $("#fservice").append('<a id="livechat" href="javascript:void(0);" style="cursor:pointer;" title="Live Chat" onClick=" $zopim.livechat.hideAll();_gaq.push([\'_trackEvent\', \'Footer\',\'Clicks\',\'Live Chat\',,true]);$zopim.livechat.addTags(\'yogaoutlet\',\'chat\');$zopim.livechat.window.openPopout();">Live Chat</a>');
                        }
            	    });
