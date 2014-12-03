
reportingService.controller.viewManagers.productpageViewManager=new reportingService.controller.AbstractReportViewManager();Object.extend(reportingService.controller.viewManagers.productpageViewManager,{reportName:reportingService.constants.viewTypes.PRODUCT_VIEW,isWaitReport:true,isWaitComplete:false,model:Object.extend(gidLib.clone(reportingService.controller.viewManagers.commonViewManager.model),{reportName:reportingService.constants.viewTypes.PRODUCT_VIEW,productStyleName:null,activeColor:null}),controller:{productReviewStatus:{isProductReviewsEnabled:false,isProductReviewsVisible:true,isBvReviewsEnabled:false,hasRatings:false,hasReviews:false,averageOverallRating:0,numberOfRatings:0,numberOfReviews:0},setReportModel:function(strVariantId){var model=reportingService.controller.viewManagers.productpageViewManager.model;var searchAppManager=reportingService.controller.appManagers.searchAppManager;var shopBySizeAppManager=reportingService.controller.appManagers.shopBySizeAppManager;var facetedSearchAppManager=reportingService.controller.appManagers.facetedSearchAppManager;var product=productPage.objP;var brandCode=product.brandCode;var productId=product.strProductId;var brandSite=gidLib.reporting.getBrandSite(brandCode);var brandAbbr=(brandSite?brandSite.brandAbbr:"");var variant=(strVariantId&&product.arrayVariantStyles[strVariantId])?product.arrayVariantStyles[strVariantId]:product.arrayVariantStyles[product.strDefaultVariantId];var variantStyle=(variant&&variant.strVariantName!='')?(":"+variant.strVariantName.toLowerCase()):'';var hierarchy=model.getHierarchy1();var productClickThrough=model.getClickThroughProdIdPath(product.strProductId);var xlink=crossLink.getOmniValue();var productReviewsServiceProcessingTime=null;if(window["productReviewService"]){productReviewsServiceProcessingTime=productReviewService.controller.reportingManager.getBvProductReviewProcessingTime();}
shopBySizeAppManager.setShopBySize(reportingService.controller.viewManagers.productpageViewManager.reportName);this.setProductReviewStatus();var productEvents=this.getProductEvents();var productReviewsStatus=this.getProductReviewEvarValue();var searchKeyword=searchAppManager.getSiteSearchActiveKeyword(model.reportName);Object.extend(model,{commonHierarchy:hierarchy,commonVariantStyle:variantStyle,originalSProducts:s.products,originalSEvent:s.events,productColorName:productPage.objV.arrayVariantStyleColors[productPage.selectedColor].strColorCodeId,productBrandCode:brandCode,productId:product.strProductId,productStyleName:product.strProductStyleName,productBrandAbbr:brandAbbr,referringStyleId:model.getReferringStyleId(),clickThroughProdIdPath:productClickThrough,searchSelectedRefinementsFixedOrder:model.getSearchSelectedRefinementsFixedOrder(),searchSortByDesc:model.getSearchSortByDesc(),channel:searchAppManager.getSiteSearchActive()?model.commonBrandPrefix+":search":s.channel,products:[brandAbbr,productId,null,null,productEvents.productStringEvents,'evar2='+model.getEvar2Hierarchy()].join(';'),hierarchyProduct:hierarchy+variantStyle+'|'+productId,events:productEvents.events,sbsStatus:shopBySizeAppManager.strSBSStatus,facetStatus:facetedSearchAppManager.getFSStatus(),keyword:searchKeyword,ssiteID:gidLib.getQuerystringParam("ssiteID").toLowerCase(),refinements:facetedSearchAppManager.getRefinementsByFacetCookie()||searchAppManager.getRefinementsFixedOrderCookie()||'no refinements',sortBy:searchAppManager.getSortByDescCookie()||'no sort by',xlink:xlink,productReviewsStatus:productReviewsStatus,productReviewsServiceProcessingTime:productReviewsServiceProcessingTime,viewType:reportingService.constants.viewTypes.PRODUCT_VIEW});if(model.refinements=='no refinements'&&facetedSearchAppManager.strFSStatus){var cookieName='strSelectedFacets'+gidBrandSiteConstruct.currentBrandCode;var selectedFacets=getCookieVar("omniSession",cookieName);model.refinements=selectedFacets.length>0?selectedFacets:model.refinements;setCookieVar("omniSession",cookieName,'');}},setReportTransmissionVars:function(){var model=reportingService.controller.viewManagers.productpageViewManager.model;s.pageName=model.commonCurrentPageName+model.commonVariantStyle;s.channel=model.channel;s.hier1=model.commonHierarchy+model.commonVariantStyle;s.eVar12=model.reportName;s.prop1=model.productColorName;s.prop43=model.productReviewsServiceProcessingTime;s.eVar20=model.commonBrandPrefix+":"+model.keyword;s.products=model.products;var isSearchActive=window.location.pathname.indexOf('/browse/search.do')!=-1||window.location.search.indexOf('userSearchText')!=-1;if(isSearchActive){model.events+=",event36";}
s.events=model.events;s.campaign=model.getTid();s.eVar16='';s.eVar18=model.getTid();s.eVar4=model.commonBrandPrefix;s.eVar20=model.commonBrandPrefix+":"+model.keyword;s.eVar25=model.ssiteID;s.eVar39=model.hierarchyProduct;s.eVar19=model.refinements;s.eVar23=model.sortBy;s.eVar31=model.clickThroughProdIdPath;s.eVar15=model.facetStatus||model.sbsStatus;s.eVar44=model.xlink;s.eVar47=model.productReviewsStatus;var viewTypeReportParameter=reportingService.api.setViewTypeReportParameter(model.viewType);},getReportRequest:function(){var reportingManager=reportingService.controller.reportingManager;var viewManager=reportingService.controller.viewManagers.productpageViewManager;viewManager.isWaitComplete=true;reportingManager.getReportingRequest();},getProductEvents:function(){var productStringEvents="event2=1";var events="prodView, event2";var productReviewEvents=this.getProductReviewEvents();productStringEvents+=productReviewEvents.productStringEvents;events+=productReviewEvents.events;return{productStringEvents:productStringEvents,events:events};},setProductReviewStatus:function(){var productReviewStatus=this.productReviewStatus;var productReviewService=window["productReviewService"];if(productReviewService||$('noReviews')){productReviewStatus.isProductReviewsEnabled=true;if(productReviewService){productReviewStatus.isBvReviewsEnabled=productReviewService.constants.bvReviews.BV_REVIEW_ENABLED;productReviewStatus.isProductReviewsVisible=productReviewService.controller.externalOverrides.showProductReviews;var productReview=productReviewService.model.data.productReviews[0];if(productReview){var reviewSummary=productReview.reviewSummary;if(reviewSummary){productReviewStatus.hasRatings=true;productReviewStatus.averageOverallRating=reviewSummary.averageOverallRating;productReviewStatus.numberOfRatings=reviewSummary.totalReviewCount;if(Number(reviewSummary.fullReviewCount)>0){productReviewStatus.hasReviews=true;productReviewStatus.numberOfReviews=reviewSummary.fullReviewCount;}}}}}},getProductReviewEvents:function(){var productReviewStatus=this.productReviewStatus;var productStringEvents="";var events="";var event27=0;if(productReviewStatus.isProductReviewsEnabled==true){if(productReviewStatus.isBvReviewsEnabled=="true"){var totalReviewCount=productReviewService.constants.bvReviewsData.BV_TOTAL_REVIEWCOUNT;if(totalReviewCount>0){event27=1;}
productStringEvents+="|event24="+productReviewService.constants.bvAvgRating.BV_AVERAGE_OVERALL_RATING+"|event25="+productReviewService.constants.bvReviewsData.BV_TOTAL_REVIEWCOUNT+"|event27="+event27;events+=", event24, event25, event27";if(totalReviewCount>0){productStringEvents+="|event26="+productReviewService.constants.bvReviewsData.BV_TOTAL_REVIEWCOUNT+"|event28=1";events+=", event26, event28";}}else if(productReviewStatus.isProductReviewsVisible==true&&productReviewStatus.hasRatings==true){productStringEvents+="|event24="+productReviewStatus.averageOverallRating+"|event25="+productReviewStatus.numberOfRatings+"|event27=1";events+=", event24, event25, event27";if(productReviewStatus.hasReviews==true){productStringEvents+="|event26="+productReviewStatus.numberOfReviews+"|event28=1";events+=", event26, event28";}}}
return{productStringEvents:productStringEvents,events:events};},getProductReviewEvarValue:function(){var evarValue="";var productReviewStatus=this.productReviewStatus;if(productReviewStatus.isProductReviewsEnabled==true){var avgRating=0;var numOfReviews=0;if(!productReviewStatus.hasRatings&&!productReviewStatus.hasReviews){evarValue="no review";}else{if(productReviewStatus.hasRatings==true)
avgRating=productReviewStatus.averageOverallRating;if(productReviewStatus.hasReviews==true)
numOfReviews=productReviewStatus.numberOfReviews;evarValue=avgRating+"_"+numOfReviews;}}else{evarValue="NA";}
return evarValue;},setCleanUp:function(){var model=reportingService.controller.viewManagers.productpageViewManager.model;s.eVar31="";if(model.clickThroughProdIdPath){gidLib.setCookieVar("globalSession","omniClickThrough",'');}
var p12=reportingService.api.setReportParameter("p12","2000");setCookieVar("omniSession","strFSHierarchy",'');s.eVar15='';}}});reportingService.controller.viewManagers.zoomViewViewManager=new reportingService.controller.AbstractReportViewManager();Object.extend(reportingService.controller.viewManagers.zoomViewViewManager,{reportName:reportingService.constants.viewTypes.ZOOM_VIEW_VIEW,model:Object.extend(gidLib.clone(reportingService.controller.viewManagers.commonViewManager.model),{productId:'',pageName:'',products:''}),controller:{setReportModel:function(){var model=reportingService.controller.viewManagers.zoomViewViewManager.model;Object.extend(model,{origPageName:model.commonCurrentPageName,pageType:'zoom',pageName:model.getShortPageName()+':zoom view',events:'event22',products:[model.commonProductBrandAbbr,this.app.objP.strProductId,null,null,"event22=1"].join(';')+';',viewType:reportingService.constants.viewTypes.ZOOM_VIEW_VIEW});},setReportTransmissionVars:function(){var model=reportingService.controller.viewManagers.zoomViewViewManager.model;s.hier1=model.pageName;s.pageName=model.pageName;s.prop33=model.pageType;s.eVar32=(productPage.hasZoomImage?"enh_zoom":"vli_zoom");s.events=model.events;s.products=model.products;s.eVar4='';s.eVar12='';s.eVar15='';s.eVar19='';s.eVar20='';s.eVar23='';s.eVar31='';s.eVar39='';var viewTypeReportParameter=reportingService.api.setViewTypeReportParameter(model.viewType);},getReportRequest:function(app){var reportingManager=reportingService.controller.reportingManager;var viewManager=reportingService.controller.viewManagers.zoomViewViewManager;viewManager.isWaitComplete=true;viewManager.controller.app=app;reportingManager.getReportingRequest(viewManager);},setCleanUp:function(){var model=reportingService.controller.viewManagers.zoomViewViewManager.model;s.pageName=model.origPageName;s.eVar32='';}}});reportingService.controller.viewManagers.reviewsVoteViewManager=new reportingService.controller.AbstractReportViewManager();Object.extend(reportingService.controller.viewManagers.reviewsVoteViewManager,{reportName:reportingService.constants.viewTypes.REVIEWS_VOTE_VIEW,reviewId:null,model:gidLib.clone(reportingService.controller.viewManagers.commonViewManager.model),controller:{setReportModel:function(){var model=reportingService.controller.viewManagers.reviewsVoteViewManager.model;var voteView=this.getVoteView();Object.extend(model,{voteView:voteView,origPageName:model.commonCurrentPageName,pageType:'helpful vote',pageName:model.getShortPageName()+':helpful vote',viewType:reportingService.constants.viewTypes.REVIEWS_VOTE_VIEW});},setReportTransmissionVars:function(){var model=reportingService.controller.viewManagers.reviewsVoteViewManager.model;s.prop46=model.voteView;s.hier1=model.pageName;s.pageName=model.pageName;s.prop33=model.pageType;s.eVar4='';s.eVar12='';s.eVar15='';s.eVar19='';s.eVar20='';s.eVar23='';s.eVar31='';s.eVar39='';var viewTypeReportParameter=reportingService.api.setViewTypeReportParameter(model.viewType);},getReportRequest:function(reviewId){var reportingManager=reportingService.controller.reportingManager;var viewManager=reportingService.controller.viewManagers.reviewsVoteViewManager;viewManager.isWaitComplete=true;viewManager.controller.app='reviewsVote';reportingService.controller.viewManagers.reviewsVoteViewManager.reviewId=reviewId;reportingManager.getReportingRequest(viewManager);},setCleanUp:function(){var model=reportingService.controller.viewManagers.zoomViewViewManager.model;s.pageName=model.origPageName;s.hier1=model.origPageName;s.prop46="";},getVoteView:function(){var value="";var reviewId=reportingService.controller.viewManagers.reviewsVoteViewManager.reviewId;var productReviewService=window["productReviewService"];if(productReviewService&&reviewId){var data=productReviewService.model.data.productReviews[0].customerReviewsMap[reviewId];if(data){var customerName=data.reviewProfile.customerName;var badgeNames=[];var badgesIterator=function(badge){badgeNames.push(badge.badgeName);};data.reviewProfile.badges.each(badgesIterator);value=customerName+":"+badgeNames.join("|")+":Helpful Votes";}}
return value;}}});