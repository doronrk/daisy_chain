function ebAd_16584222() { this.strDefaultImage = ebResourcePath + "Site-43863/Type-0/5aa023fa-0a3b-47b6-ad2e-30e45e0313f2.jpg"; this.strDefaultFlash = "Site-43863/Type-2/4c771ef3-d8c8-4929-a218-e7b0ae552d61.swf"; if (this.strDefaultFlash != "") { this.strDefaultFlash = ebResourcePath + this.strDefaultFlash; this.nDefaultFlashWidth = 160; this.nDefaultFlashHeight = 600; } this.strRichFlash = "Site-43863/Type-2/dcb72304-a69d-4d89-b965-731e34d6b3e4.swf"; this.RichFlashStreaming = null; if (this.strRichFlash != "") { this.strRichFlash = ebResourcePath + this.strRichFlash; this.nRichFlashWeight = 43304; this.nRichFlashWidth = 160; this.nRichFlashHeight = 600; if ("1" == "1") { this.RichFlashStreaming = new Object(); this.RichFlashStreaming.fAutoBuffer = "0"; this.RichFlashStreaming.nMovieDuration = "0"; this.RichFlashStreaming.nHighBWBuffer = "50"; this.RichFlashStreaming.nLowBWBuffer = "100"; } } this.fWaitForFlashCommand = ("0" == "1"); this.fPreloader = ("0" == "1"); this.flFlashVer = 9; this.strXML = ""; this.isSVSVP = false; this.UiVz = false; this.AcIconPosition=0; this.AcIncludeMarker = 0; this.strDisplayMap = "Category|Categorymc_LastFrame.mc_imgLoader|mc_LastFrame.mc_imgLoadermc_LastFrame.price_txt|mc_LastFrame.price_txtmc_LastFrame.title_txt|mc_LastFrame.title_txtmc_LastFrame.city_txt|mc_LastFrame.city_txt"; this.nFSMute = 3; this.fEnableFS = 0; this.additionalAssetsArray = new Object(); var gEBvideoTypes ={ "WMV" : 0, "FLV8" : 1, "FLV7" : 2, "SWF" : 3, "MP4" : 4, "F4V" : 5, "WebM" : 6, "OGG" :7 }; var asset=this.additionalAssetsArray["ebMovie1"]=new Array();var index=0;var currentType=3;if(!asset[currentType]){asset[currentType]=new Array();}else index=asset[currentType].length;var info=asset[currentType][index]=new Object();info.strURL="Site-43863/Type-2/13f2fb82-6131-4da5-8d1e-00100267beff.swf";info.nWidth=160;info.nHeight=600;info.fEnableFS=1;info.nBitRate=-1;info.nAssetID=37421049;var asset=this.additionalAssetsArray["ebMovie2"]=new Array();var index=0;var currentType=3;if(!asset[currentType]){asset[currentType]=new Array();}else index=asset[currentType].length;var info=asset[currentType][index]=new Object();info.strURL="Site-43863/Type-2/5acbfc05-3c3b-4c22-abdc-dbbf8df397fc.swf";info.nWidth=160;info.nHeight=600;info.fEnableFS=1;info.nBitRate=-1;info.nAssetID=37421047;var asset=this.additionalAssetsArray["ebMovie3"]=new Array();var index=0;var currentType=3;if(!asset[currentType]){asset[currentType]=new Array();}else index=asset[currentType].length;var info=asset[currentType][index]=new Object();info.strURL="Site-43863/Type-2/23a502e2-a828-4cea-928d-6be2ef9b4b24.swf";info.nWidth=160;info.nHeight=600;info.fEnableFS=1;info.nBitRate=-1;info.nAssetID=37421048;var asset=this.additionalAssetsArray["ebMovie4"]=new Array();var index=0;var currentType=3;if(!asset[currentType]){asset[currentType]=new Array();}else index=asset[currentType].length;var info=asset[currentType][index]=new Object();info.strURL="Site-43863/Type-2/3a552f51-50c7-4035-8d6e-ef8316cec5e1.swf";info.nWidth=160;info.nHeight=600;info.fEnableFS=1;info.nBitRate=-1;info.nAssetID=37421045; function NVAssetObj(url) { this.url=url; } var NVArr=new Array(); this.nonVideoAssets = NVArr; var DCArr=new Array(); this.DynamicContentResources = DCArr; this.playRS = new ebCRemoteServers(); this.interactions = new Object(); this.clickTrackingURLs = []; setDefaultInteraction(this); setInteractions(this); function setDefaultInteraction(objRef) { objRef.interactions["_eyeblaster"] = new ebCInteraction("_eyeblaster"); var inter = objRef.interactions["_eyeblaster"]; inter.fCloseFlag = 1; inter.strJumpUrl = "https://ad.doubleclick.net/ddm/clk/284655618;111670865;p?https://www.marriott.com/setSCtracking.mi?scid=7ff67ac8-1e78-441e-b56c-b1433576cca7&mid=/marriott/Special-Offers/fall.mi"; if (inter.strJumpUrl != "") objRef.fLink = true; else objRef.fLink = false; inter.strTarget = "_blank"; inter.RS.strNUrl = ""; inter.RS.strAUrl = ""; inter.fCountAsClick = 1; inter.jumpWin.strPosX = ""; inter.jumpWin.strPosY = ""; inter.jumpWin.strWidth = ""; inter.jumpWin.strHeight = ""; inter.jumpWin.strAddressBar = "1"; inter.jumpWin.strMenuBar = "1"; } function setInteractions(objRef) { } function buildIntList(objRef,name,fClose,jumpURL,XPos,YPos,width,height,fAddress,fMenu,NUrl,AUrl,target,fClick,type,nInitiated) {   objRef.interactions[name] = new ebCInteraction(name,type); var tempInter = objRef.interactions[name]; tempInter.fCloseFlag = fClose; tempInter.strJumpUrl = jumpURL; tempInter.jumpWin.strPosX = XPos; tempInter.jumpWin.strPosY = YPos; tempInter.jumpWin.strWidth = width; tempInter.jumpWin.strHeight = height; tempInter.jumpWin.strAddressBar = fAddress; tempInter.jumpWin.strMenuBar = fMenu; tempInter.RS.strNUrl = NUrl; tempInter.RS.strAUrl = AUrl; var target = parseInt(target); switch (target) { case 0 : tempInter.strTarget = "_self";  break; case 1 : tempInter.strTarget = "_blank";  break; case 2 : tempInter.strTarget = "_top";  break; default : tempInter.strTarget = "_blank"; } tempInter.fCountAsClick = fClick; tempInter.nInitiated = nInitiated;  } } if(typeof(gnEbAd_16584222WasLoaded) == "undefined") gnEbAd_16584222WasLoaded = 1; else gnEbAd_16584222WasLoaded++; if (typeof(ebScriptLoaded) != "undefined") ebScriptLoaded("ebAd_16584222"); if (typeof(ebDoOnBannerScriptLoad) != "undefined") ebDoOnBannerScriptLoad(); 