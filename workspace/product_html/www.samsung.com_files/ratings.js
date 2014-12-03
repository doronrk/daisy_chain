$BV.Internal.ajaxCallback(function(url,apiConfig){
if(!/(^|\.)(bazaarvoice\.com|samsung\.com)(:\d+)?$/.test(location.hostname)){
throw "Bazaarvoice: Permission denied";
}
$BV.Internal.configureAppLoader("rr",false,{"rr/7463/analyticsInternalHooksRR":"rr/analyticsHooksRR","cmn/7463-en_us/analyticsInternalHooks":"analyticsHooks","cmn/7463-en_us/ratingControls":"ratingControls"});
$BV.Internal.require(["rr/injection.rr","feedback","requester","rr/analyticsHooksRR","browserVersion","jquery.core","rr/contentFocusingSupportRR","rr/analyticsInternalLegacyHooksRR","trustMark","contentDisplay","rr/contentDisplayRR","domUtils","parseUri","cookies","analyticsVersioning","analyticsHooks","cmn/7463-en_us/selectReplacer","cmn/7463-en_us/analyticsInternalHooks","magpie","magpieTracking","analyticsAutoTagHooks","animationOptions","socialConnect","facebookConnect","facebookOpenGraph","jquery.effects.core","rr/7463/analyticsInternalHooksRR","contentFocusingSupport","animationQueueing"],function(Injection){
var materials={"BVRRSecondaryRatingSummarySourceID":" <div class=\"BVRRRootElement\">\n<div class=\"BVRRRatingSummary BVRRSecondaryRatingSummary\">\n\n<div class=\"BVRRRatingSummary BVRRPrimaryRatingSummary\"><div class=\"BVRRRatingSummaryStyle2\"> <div class=\"BVRRRatingSummaryHeader\"><\/div>\n <div class=\"BVRROverallRatingContainer\" >\n<div class=\"BVRRRatingContainerStar\"><div class=\"BVRRRatingEntry BVRROdd\"><div id=\"BVRRRatingOverall_\" class=\"BVRRRating BVRRRatingNormal BVRRRatingOverall\"><div class=\"BVRRLabel BVRRRatingNormalLabel\">Rating:<span class=\"BVRRRatingNormalLabelSuffix\"> <\/span><\/div><div class=\"BVRRRatingNormalImage\"><img src=\"http://samsung.ugc.bazaarvoice.com/7463-en_us/4_8/5/rating.gif\" class=\"BVImgOrSprite\" alt=\"4.8 out of 5\" title=\"4.8 out of 5\"/><\/div>\n<div class=\"BVRRRatingNormalOutOf\"> <span class=\"BVRRNumber BVRRRatingNumber\">4.8<\/span>\n <span class=\"BVRRSeparatorText\">out of <\/span>\n <span class=\"BVRRNumber BVRRRatingRangeNumber\">5<\/span>\n<\/div><\/div><\/div><\/div> <\/div>\n<div id=\"TrustMarkContainer_7j5s3owu08ksia8jftwpkqzdo_ID\" class=\"BVRRTrustMark BVRRTrustMarkDiv\" /> <div class=\"BVRRTrustMarkInner\">\n <div id=\"TrustMarkImage_6wgd4yrdvhu85tb1nxkstlxsb_ID\" class=\"BVRRTrustMark BVRRTrustMarkImageDiv\"\n data-bvtrack=\"eName:TrustMarkViewInfo\" onmouseover=\" BVTrustMark.onMouseOver(TrustMarkImage_6wgd4yrdvhu85tb1nxkstlxsb_ID, 'TrustMarkInfoDiv_adj5kre37meysoa948ighb44n_ID', true);\n\"\n onmouseout=\" BVTrustMark.onMouseOut('TrustMarkInfoDiv_adj5kre37meysoa948ighb44n_ID');\n\"\n onclick=\"void(0)\"\n >\n <img src=\"http://samsung.ugc.bazaarvoice.com/static/7463-en_us/trust_mark.png\" alt=\"Authentic Reviews\" id=\"BVRRTrustMarkImageID\" />\n <img src=\"http://samsung.ugc.bazaarvoice.com/static/7463-en_us/trust_mark_overlay.png\" alt=\"Authentic Reviews\" class=\"BVRRTrustMarkOverlayImage\" />\n <\/div>\n <div id=\"TrustMarkInfoDiv_adj5kre37meysoa948ighb44n_ID\" class=\"BVRRTrustMark BVRRTrustMarkInfoDiv\"\n onmouseover=\" BVTrustMark.infoMouseOver();\n\"\n onmouseout=\" BVTrustMark.onMouseOut('TrustMarkInfoDiv_adj5kre37meysoa948ighb44n_ID');\n\"\n >\n <div class=\"BVRRTrustMark BVRRTrustMarkInfoCore\" style=\"display: none\">\n These reviews are managed by Bazaarvoice and comply with the Bazaarvoice Authenticity Policy, which is supported by anti-fraud technology and human analysis.<br />\n <span>Details at www.bazaarvoice.com/trustmark<\/span>\n <\/div>\n <div class=\"BVRRTrustMark BVRRTrustMarkInfoPointer\" style=\"display: none\">\n <div class=\"BVRRTrustMarkInfoCore_before\"> <\/div>\n <div class=\"BVRRTrustMarkInfoCore_after\"> <\/div>\n <\/div>\n <\/div>\n <\/div>\n <\/div>\n\n<div id=\"BVRRRatingsHistogramButton_eowwugv1ekv9kybt5rk8l516p_ID\" class=\"BVRRRatingsHistogramButton\"> <div id=\"BVRRRatingsHistogramButtonScript_shwrm3vle3juct39pkbkz5u1r_ID\" class=\"BVRRRatingsHistogramButtonScript BVRRHidden\"> <img src=\"http://samsung.ugc.bazaarvoice.com/static/7463-en_us/openRatingsHistogram.gif\"\n alt=\"Open Ratings Snapshot\"\n name=\"BV_TrackingTag_Rating_Summary_2_ExpandHistogram_PN64F8500AFXZA\"\n class=\"BVRRRatingsHistogramButtonImage\"\n onmouseover=\"bvHistogramMouseover(this, 'BVRRHistogramTimer_333g8jaafxsbcrw299l7ofd9l_ID', 'BVRRRatingsHistogramButtonPopin_t8ityq5ud43v6nfu4svyl6jjn_ID', 'RatingsHistogramFrame');\"\n onmouseout=\"bvHistogramMouseout('BVRRHistogramTimer_333g8jaafxsbcrw299l7ofd9l_ID', 'BVRRRatingsHistogramButtonPopin_t8ityq5ud43v6nfu4svyl6jjn_ID', 1000);\" />\n<div id=\"BVRRRatingsHistogramButtonPopin_t8ityq5ud43v6nfu4svyl6jjn_ID\" class=\"BVRRRatingsHistogramButtonPopin\"><div class=\"BVRRHistogram\"><div class=\"BVRRHistogramTitle\"> <span class=\"BVRRHistogramTitleText\">Rating Breakdown<\/span> <span class=\"BVRRCount BVRRNonZeroCount\"><span class=\"BVRRNumber\">34<\/span> reviews<\/span><\/div><div class=\"BVRRHistogramContent\"><div class=\"BVRRHistogramBarRow BVRRHistogramBarRow5\"><span class=\"BVRRHistStarLabel BVRRHistStarLabel5\"><span class=\"BVRRHistStarLabelText\">5 stars<\/span><\/span><div class=\"BVRRHistogramBar\"> <div style=\"width: 85%\" class=\"BVRRHistogramFullBar\"><\/div>\n<span class=\"BVRRHistAbsLabel \">29<\/span><\/div><\/div><div class=\"BVRRHistogramBarRow BVRRHistogramBarRow4\"><span class=\"BVRRHistStarLabel BVRRHistStarLabel4\"><span class=\"BVRRHistStarLabelText\">4 stars<\/span><\/span><div class=\"BVRRHistogramBar\"> <div style=\"width: 6%\" class=\"BVRRHistogramFullBar\"><\/div>\n<span class=\"BVRRHistAbsLabel \">2<\/span><\/div><\/div><div class=\"BVRRHistogramBarRow BVRRHistogramBarRow3\"><span class=\"BVRRHistStarLabel BVRRHistStarLabel3\"><span class=\"BVRRHistStarLabelText\">3 stars<\/span><\/span><div class=\"BVRRHistogramBar\"> <div style=\"width: 9%\" class=\"BVRRHistogramFullBar\"><\/div>\n<span class=\"BVRRHistAbsLabel \">3<\/span><\/div><\/div><div class=\"BVRRHistogramBarRow BVRRHistogramBarRow2 BVRRHistogramBarRowZero\"><span class=\"BVRRHistStarLabel BVRRHistStarLabel2\"><span class=\"BVRRHistStarLabelText\">2 stars<\/span><\/span><div class=\"BVRRHistogramBar\"> <div style=\"width: 0%\" class=\"BVRRHistogramFullBar\"><\/div>\n<span class=\"BVRRHistAbsLabel \">0<\/span><\/div><\/div><div class=\"BVRRHistogramBarRow BVRRHistogramBarRow1 BVRRHistogramBarRowZero\"><span class=\"BVRRHistStarLabel BVRRHistStarLabel1\"><span class=\"BVRRHistStarLabelText\">1 star<\/span><\/span><div class=\"BVRRHistogramBar\"> <div style=\"width: 0%\" class=\"BVRRHistogramFullBar\"><\/div>\n<span class=\"BVRRHistAbsLabel \">0<\/span><\/div><\/div><\/div><\/div><\/div><\/div>\n <noscript>\n<div class=\"BVRRRatingsHistogramButtonImage\"><a name=\"BV_TrackingTag_Rating_Summary_2_ExpandHistogram_PN64F8500AFXZA\" target=\"_blank\" href=\"http://reviews.us.samsung.com/7463-en_us/PN64F8500AFXZA/ratingsnapshot.htm\"> <img src=\"http://samsung.ugc.bazaarvoice.com/static/7463-en_us/openRatingsHistogram.gif\" alt=\"Open Ratings Snapshot\" />\n<\/a><\/div> <\/noscript>\n<\/div> <div class=\"BVRRSecondaryRatingsContainer\" >\n<div class=\"BVRRRatingContainerStar\"><div class=\"BVRRRatingEntry BVRROdd\"><div id=\"BVRRRatingFeatures_\" class=\"BVRRRating BVRRRatingNormal BVRRRatingFeatures\"><div class=\"BVRRLabel BVRRRatingNormalLabel\">Features<span class=\"BVRRRatingNormalLabelSuffix\"> <\/span><\/div><div class=\"BVRRRatingNormalImage\"><img src=\"http://samsung.ugc.bazaarvoice.com/7463-en_us/4_7/5/ratingSecondary.gif\" class=\"BVImgOrSprite\" alt=\"4.7 out of 5\" title=\"4.7 out of 5\"/><\/div>\n<div class=\"BVRRRatingNormalOutOf\"> <span class=\"BVRRNumber BVRRRatingNumber\">4.7<\/span>\n <span class=\"BVRRSeparatorText\">out of <\/span>\n <span class=\"BVRRNumber BVRRRatingRangeNumber\">5<\/span>\n<\/div><\/div><\/div><div class=\"BVRRRatingEntry BVRREven\"><div id=\"BVRRRatingPerformance_\" class=\"BVRRRating BVRRRatingNormal BVRRRatingPerformance\"><div class=\"BVRRLabel BVRRRatingNormalLabel\">Performance<span class=\"BVRRRatingNormalLabelSuffix\"> <\/span><\/div><div class=\"BVRRRatingNormalImage\"><img src=\"http://samsung.ugc.bazaarvoice.com/7463-en_us/4_7/5/ratingSecondary.gif\" class=\"BVImgOrSprite\" alt=\"4.7 out of 5\" title=\"4.7 out of 5\"/><\/div>\n<div class=\"BVRRRatingNormalOutOf\"> <span class=\"BVRRNumber BVRRRatingNumber\">4.7<\/span>\n <span class=\"BVRRSeparatorText\">out of <\/span>\n <span class=\"BVRRNumber BVRRRatingRangeNumber\">5<\/span>\n<\/div><\/div><\/div><div class=\"BVRRRatingEntry BVRROdd\"><div id=\"BVRRRatingDesign_\" class=\"BVRRRating BVRRRatingNormal BVRRRatingDesign\"><div class=\"BVRRLabel BVRRRatingNormalLabel\">Design<span class=\"BVRRRatingNormalLabelSuffix\"> <\/span><\/div><div class=\"BVRRRatingNormalImage\"><img src=\"http://samsung.ugc.bazaarvoice.com/7463-en_us/4_7/5/ratingSecondary.gif\" class=\"BVImgOrSprite\" alt=\"4.7 out of 5\" title=\"4.7 out of 5\"/><\/div>\n<div class=\"BVRRRatingNormalOutOf\"> <span class=\"BVRRNumber BVRRRatingNumber\">4.7<\/span>\n <span class=\"BVRRSeparatorText\">out of <\/span>\n <span class=\"BVRRNumber BVRRRatingRangeNumber\">5<\/span>\n<\/div><\/div><\/div><div class=\"BVRRRatingEntry BVRREven\"><div id=\"BVRRRatingValue_\" class=\"BVRRRating BVRRRatingNormal BVRRRatingValue\"><div class=\"BVRRLabel BVRRRatingNormalLabel\">Value<span class=\"BVRRRatingNormalLabelSuffix\"> <\/span><\/div><div class=\"BVRRRatingNormalImage\"><img src=\"http://samsung.ugc.bazaarvoice.com/7463-en_us/4_3/5/ratingSecondary.gif\" class=\"BVImgOrSprite\" alt=\"4.3 out of 5\" title=\"4.3 out of 5\"/><\/div>\n<div class=\"BVRRRatingNormalOutOf\"> <span class=\"BVRRNumber BVRRRatingNumber\">4.3<\/span>\n <span class=\"BVRRSeparatorText\">out of <\/span>\n <span class=\"BVRRNumber BVRRRatingRangeNumber\">5<\/span>\n<\/div><\/div><\/div><\/div> <\/div>\n<div class=\"BVRRBuyAgainContainer\"><span class=\"BVRRLabel BVRRBuyAgainPrefix\"><\/span><span class=\"BVRRValue BVRRBuyAgain\"><span class=\"BVRRNumber BVRRBuyAgainRecommend\">32<\/span><span class=\"BVRRSeparatorText\">&nbsp;out of&nbsp;<\/span><span class=\"BVRRNumber BVRRBuyAgainTotal\">32<\/span><span class=\"BVRRBuyAgainPercentage\">(<span class=\"BVRRNumber\">100%<\/span>)<\/span><\/span><span class=\"BVRRLabel BVRRBuyAgainSuffix\">reviewers would recommend this product to a friend.<\/span><\/div> <div class=\"BVRRRatingSummaryLinks\">\n <div id=\"BVRRRatingSummaryLinkWriteID\" class=\"BVRRRatingSummaryLink BVRRRatingSummaryLinkWrite\">\n <span class=\"BVRRRatingSummaryLinkWritePrefix\"><\/span>\n<a title=\"Write a review\" data-bvcfg=\"__CONFIGKEY__\" data-bvjsref=\"http://samsung.ugc.bazaarvoice.com/7463-en_us/PN64F8500AFXZA/writereview.djs?format=embeddedhtml&amp;campaignid=BV_RATING_SUMMARY&amp;sessionparams=__BVSESSIONPARAMS__&amp;return=__RETURN__&amp;innerreturn=http%3A%2F%2Fsamsung.ugc.bazaarvoice.com%2F7463-en_us%2FPN64F8500AFXZA%2Fratings.djs%3Fformat%3Dembeddedhtml&amp;user=__USERID__&amp;authsourcetype=__AUTHTYPE__&amp;submissionparams=__BVSUBMISSIONPARAMETERS__&amp;submissionurl=__BVSUBMISSIONURL__\" name=\"BV_TrackingTag_Rating_Summary_2_WriteReview_PN64F8500AFXZA\" onclick=\"bvShowContentOnReturnPRR('7463-en_us', 'PN64F8500AFXZA', 'BVRRWidgetID');\" href=\"javascript://\">Submit a Review<\/a> <span class=\"BVRRRatingSummaryLinkWriteSuffix\"><\/span>\n <\/div>\n <\/div>\n<div class=\"BVRRSocialBookmarkingLinks\"><div class=\"BVRRProductBookmarkingLabel\">Share this Product:<\/div>\n<a name=\"BV_TrackingTag_Rating_Summary_2_SocialBookmarkFacebook_PN64F8500AFXZA\" target=\"_blank\" class=\"BVRRSocialBookmarkingSharingLink BVRRSocialBookmarkingSharingLinkFacebook\" onclick=\"this.href=bvReplaceTokensInSocialURL(this.href);window.open(this.href,'','left=0,top=0,width=626,height=436,toolbar=1,location=0,resizable=1,scrollbars=1'); return false;\" onfocus=\"this.href=bvReplaceTokensInSocialURL(this.href);\" rel=\"nofollow\" href=\"http://reviews.us.samsung.com/7463-en_us/share.htm?site=Facebook&amp;url=http%3A%2F%2Fwww.samsung.com%2Fus%2Fvideo%2Ftvs%2FPN64F8500AFXZA&amp;title=__TITLE__&amp;robot=__ROBOT__&amp;image=http%3A%2F%2Fwww.samsung.com%2Fus%2Fsystem%2Fconsumer%2Fproduct%2Fpn%2F64%2Ff8%2Fpn64f8500afxza%2FF8500_015_Front2_Black_copy_16.jpg\" onmouseover=\"this.href=bvReplaceTokensInSocialURL(this.href);\"><img width=\"16\"\n height=\"16\"\n class=\"BVRRSocialBookmarkLinkImage\"\n src=\"http://samsung.ugc.bazaarvoice.com/static/7463-en_us/link-facebook.gif\"\n alt=\"Facebook\"\n title=\"Add to Facebook\"/><\/a>\n\n<a name=\"BV_TrackingTag_Rating_Summary_2_SocialBookmarkTwitter_PN64F8500AFXZA\" target=\"_blank\" class=\"BVRRSocialBookmarkingSharingLink BVRRSocialBookmarkingSharingLinkTwitter\" onclick=\"this.href=bvReplaceTokensInSocialURL(this.href);window.open(this.href,'','left=0,top=0,width=795,height=700,toolbar=1,location=0,resizable=1,scrollbars=1'); return false;\" onfocus=\"this.href=bvReplaceTokensInSocialURL(this.href);\" rel=\"nofollow\" href=\"http://reviews.us.samsung.com/7463-en_us/share.htm?site=Twitter&amp;url=http%3A%2F%2Fwww.samsung.com%2Fus%2Fvideo%2Ftvs%2FPN64F8500AFXZA&amp;title=__TITLE__&amp;robot=__ROBOT__&amp;image=http%3A%2F%2Fwww.samsung.com%2Fus%2Fsystem%2Fconsumer%2Fproduct%2Fpn%2F64%2Ff8%2Fpn64f8500afxza%2FF8500_015_Front2_Black_copy_16.jpg\" onmouseover=\"this.href=bvReplaceTokensInSocialURL(this.href);\"><img width=\"16\"\n height=\"16\"\n class=\"BVRRSocialBookmarkLinkImage\"\n src=\"http://samsung.ugc.bazaarvoice.com/static/7463-en_us/link-twitter.gif\"\n alt=\"Twitter\"\n title=\"Tweet this\"/><\/a>\n<\/div><\/div><\/div><\/div> <\/div>\n","BVRRRatingSummarySourceID":" <div class=\"BVRRRootElement\">\n<div class=\"BVRRRatingSummary BVRRPrimaryRatingSummary\"><div class=\"BVRRRatingSummaryStyle2\"> <div class=\"BVRRRatingSummaryHeader\"><\/div>\n <div class=\"BVRROverallRatingContainer\" >\n<div class=\"BVRRRatingContainerStar\"><div class=\"BVRRRatingEntry BVRROdd\"><div id=\"BVRRRatingOverall_\" class=\"BVRRRating BVRRRatingNormal BVRRRatingOverall\"><div class=\"BVRRLabel BVRRRatingNormalLabel\">Rating:<span class=\"BVRRRatingNormalLabelSuffix\"> <\/span><\/div><div class=\"BVRRRatingNormalImage\"><img src=\"http://samsung.ugc.bazaarvoice.com/7463-en_us/4_8/5/rating.gif\" class=\"BVImgOrSprite\" alt=\"4.8 out of 5\" title=\"4.8 out of 5\"/><\/div>\n<div class=\"BVRRRatingNormalOutOf\"> <span class=\"BVRRNumber BVRRRatingNumber\">4.8<\/span>\n <span class=\"BVRRSeparatorText\">out of <\/span>\n <span class=\"BVRRNumber BVRRRatingRangeNumber\">5<\/span>\n<\/div><\/div><\/div><\/div> <\/div>\n<div id=\"TrustMarkContainer_60emcoflye4gymqlhe1h6pszz_ID\" class=\"BVRRTrustMark BVRRTrustMarkDiv\" /> <div class=\"BVRRTrustMarkInner\">\n <div id=\"TrustMarkImage_iu29gpmjfc5db0yhzl1khjzuc_ID\" class=\"BVRRTrustMark BVRRTrustMarkImageDiv\"\n data-bvtrack=\"eName:TrustMarkViewInfo\" onmouseover=\" BVTrustMark.onMouseOver(TrustMarkImage_iu29gpmjfc5db0yhzl1khjzuc_ID, 'TrustMarkInfoDiv_lehti9lozjbo6fzybw5e0pxko_ID', true);\n\"\n onmouseout=\" BVTrustMark.onMouseOut('TrustMarkInfoDiv_lehti9lozjbo6fzybw5e0pxko_ID');\n\"\n onclick=\"void(0)\"\n >\n <img src=\"http://samsung.ugc.bazaarvoice.com/static/7463-en_us/trust_mark.png\" alt=\"Authentic Reviews\" id=\"BVRRTrustMarkImageID\" />\n <img src=\"http://samsung.ugc.bazaarvoice.com/static/7463-en_us/trust_mark_overlay.png\" alt=\"Authentic Reviews\" class=\"BVRRTrustMarkOverlayImage\" />\n <\/div>\n <div id=\"TrustMarkInfoDiv_lehti9lozjbo6fzybw5e0pxko_ID\" class=\"BVRRTrustMark BVRRTrustMarkInfoDiv\"\n onmouseover=\" BVTrustMark.infoMouseOver();\n\"\n onmouseout=\" BVTrustMark.onMouseOut('TrustMarkInfoDiv_lehti9lozjbo6fzybw5e0pxko_ID');\n\"\n >\n <div class=\"BVRRTrustMark BVRRTrustMarkInfoCore\" style=\"display: none\">\n These reviews are managed by Bazaarvoice and comply with the Bazaarvoice Authenticity Policy, which is supported by anti-fraud technology and human analysis.<br />\n <span>Details at www.bazaarvoice.com/trustmark<\/span>\n <\/div>\n <div class=\"BVRRTrustMark BVRRTrustMarkInfoPointer\" style=\"display: none\">\n <div class=\"BVRRTrustMarkInfoCore_before\"> <\/div>\n <div class=\"BVRRTrustMarkInfoCore_after\"> <\/div>\n <\/div>\n <\/div>\n <\/div>\n <\/div>\n\n<div id=\"BVRRRatingsHistogramButton_21mo2gbnxvixe8p8nawp32qvp_ID\" class=\"BVRRRatingsHistogramButton\"> <div id=\"BVRRRatingsHistogramButtonScript_i3rdiif6bl03lrbecsp9v99ks_ID\" class=\"BVRRRatingsHistogramButtonScript BVRRHidden\"> <img src=\"http://samsung.ugc.bazaarvoice.com/static/7463-en_us/openRatingsHistogram.gif\"\n alt=\"Open Ratings Snapshot\"\n name=\"BV_TrackingTag_Rating_Summary_1_ExpandHistogram_PN64F8500AFXZA\"\n class=\"BVRRRatingsHistogramButtonImage\"\n onmouseover=\"bvHistogramMouseover(this, 'BVRRHistogramTimer_mn2lyezep0taesh7xymwq889j_ID', 'BVRRRatingsHistogramButtonPopin_aijivzo670xh669ttmikkvp0j_ID', 'RatingsHistogramFrame');\"\n onmouseout=\"bvHistogramMouseout('BVRRHistogramTimer_mn2lyezep0taesh7xymwq889j_ID', 'BVRRRatingsHistogramButtonPopin_aijivzo670xh669ttmikkvp0j_ID', 1000);\" />\n<div id=\"BVRRRatingsHistogramButtonPopin_aijivzo670xh669ttmikkvp0j_ID\" class=\"BVRRRatingsHistogramButtonPopin\"><div class=\"BVRRHistogram\"><div class=\"BVRRHistogramTitle\"> <span class=\"BVRRHistogramTitleText\">Rating Breakdown<\/span> <span class=\"BVRRCount BVRRNonZeroCount\"><span class=\"BVRRNumber\">34<\/span> reviews<\/span><\/div><div class=\"BVRRHistogramContent\"><div class=\"BVRRHistogramBarRow BVRRHistogramBarRow5\"><span class=\"BVRRHistStarLabel BVRRHistStarLabel5\"><span class=\"BVRRHistStarLabelText\">5 stars<\/span><\/span><div class=\"BVRRHistogramBar\"> <div style=\"width: 85%\" class=\"BVRRHistogramFullBar\"><\/div>\n<span class=\"BVRRHistAbsLabel \">29<\/span><\/div><\/div><div class=\"BVRRHistogramBarRow BVRRHistogramBarRow4\"><span class=\"BVRRHistStarLabel BVRRHistStarLabel4\"><span class=\"BVRRHistStarLabelText\">4 stars<\/span><\/span><div class=\"BVRRHistogramBar\"> <div style=\"width: 6%\" class=\"BVRRHistogramFullBar\"><\/div>\n<span class=\"BVRRHistAbsLabel \">2<\/span><\/div><\/div><div class=\"BVRRHistogramBarRow BVRRHistogramBarRow3\"><span class=\"BVRRHistStarLabel BVRRHistStarLabel3\"><span class=\"BVRRHistStarLabelText\">3 stars<\/span><\/span><div class=\"BVRRHistogramBar\"> <div style=\"width: 9%\" class=\"BVRRHistogramFullBar\"><\/div>\n<span class=\"BVRRHistAbsLabel \">3<\/span><\/div><\/div><div class=\"BVRRHistogramBarRow BVRRHistogramBarRow2 BVRRHistogramBarRowZero\"><span class=\"BVRRHistStarLabel BVRRHistStarLabel2\"><span class=\"BVRRHistStarLabelText\">2 stars<\/span><\/span><div class=\"BVRRHistogramBar\"> <div style=\"width: 0%\" class=\"BVRRHistogramFullBar\"><\/div>\n<span class=\"BVRRHistAbsLabel \">0<\/span><\/div><\/div><div class=\"BVRRHistogramBarRow BVRRHistogramBarRow1 BVRRHistogramBarRowZero\"><span class=\"BVRRHistStarLabel BVRRHistStarLabel1\"><span class=\"BVRRHistStarLabelText\">1 star<\/span><\/span><div class=\"BVRRHistogramBar\"> <div style=\"width: 0%\" class=\"BVRRHistogramFullBar\"><\/div>\n<span class=\"BVRRHistAbsLabel \">0<\/span><\/div><\/div><\/div><\/div><\/div><\/div>\n <noscript>\n<div class=\"BVRRRatingsHistogramButtonImage\"><a name=\"BV_TrackingTag_Rating_Summary_1_ExpandHistogram_PN64F8500AFXZA\" target=\"_blank\" href=\"http://reviews.us.samsung.com/7463-en_us/PN64F8500AFXZA/ratingsnapshot.htm\"> <img src=\"http://samsung.ugc.bazaarvoice.com/static/7463-en_us/openRatingsHistogram.gif\" alt=\"Open Ratings Snapshot\" />\n<\/a><\/div> <\/noscript>\n<\/div> <div class=\"BVRRSecondaryRatingsContainer\" >\n<div class=\"BVRRRatingContainerStar\"><div class=\"BVRRRatingEntry BVRROdd\"><div id=\"BVRRRatingFeatures_\" class=\"BVRRRating BVRRRatingNormal BVRRRatingFeatures\"><div class=\"BVRRLabel BVRRRatingNormalLabel\">Features<span class=\"BVRRRatingNormalLabelSuffix\"> <\/span><\/div><div class=\"BVRRRatingNormalImage\"><img src=\"http://samsung.ugc.bazaarvoice.com/7463-en_us/4_7/5/ratingSecondary.gif\" class=\"BVImgOrSprite\" alt=\"4.7 out of 5\" title=\"4.7 out of 5\"/><\/div>\n<div class=\"BVRRRatingNormalOutOf\"> <span class=\"BVRRNumber BVRRRatingNumber\">4.7<\/span>\n <span class=\"BVRRSeparatorText\">out of <\/span>\n <span class=\"BVRRNumber BVRRRatingRangeNumber\">5<\/span>\n<\/div><\/div><\/div><div class=\"BVRRRatingEntry BVRREven\"><div id=\"BVRRRatingPerformance_\" class=\"BVRRRating BVRRRatingNormal BVRRRatingPerformance\"><div class=\"BVRRLabel BVRRRatingNormalLabel\">Performance<span class=\"BVRRRatingNormalLabelSuffix\"> <\/span><\/div><div class=\"BVRRRatingNormalImage\"><img src=\"http://samsung.ugc.bazaarvoice.com/7463-en_us/4_7/5/ratingSecondary.gif\" class=\"BVImgOrSprite\" alt=\"4.7 out of 5\" title=\"4.7 out of 5\"/><\/div>\n<div class=\"BVRRRatingNormalOutOf\"> <span class=\"BVRRNumber BVRRRatingNumber\">4.7<\/span>\n <span class=\"BVRRSeparatorText\">out of <\/span>\n <span class=\"BVRRNumber BVRRRatingRangeNumber\">5<\/span>\n<\/div><\/div><\/div><div class=\"BVRRRatingEntry BVRROdd\"><div id=\"BVRRRatingDesign_\" class=\"BVRRRating BVRRRatingNormal BVRRRatingDesign\"><div class=\"BVRRLabel BVRRRatingNormalLabel\">Design<span class=\"BVRRRatingNormalLabelSuffix\"> <\/span><\/div><div class=\"BVRRRatingNormalImage\"><img src=\"http://samsung.ugc.bazaarvoice.com/7463-en_us/4_7/5/ratingSecondary.gif\" class=\"BVImgOrSprite\" alt=\"4.7 out of 5\" title=\"4.7 out of 5\"/><\/div>\n<div class=\"BVRRRatingNormalOutOf\"> <span class=\"BVRRNumber BVRRRatingNumber\">4.7<\/span>\n <span class=\"BVRRSeparatorText\">out of <\/span>\n <span class=\"BVRRNumber BVRRRatingRangeNumber\">5<\/span>\n<\/div><\/div><\/div><div class=\"BVRRRatingEntry BVRREven\"><div id=\"BVRRRatingValue_\" class=\"BVRRRating BVRRRatingNormal BVRRRatingValue\"><div class=\"BVRRLabel BVRRRatingNormalLabel\">Value<span class=\"BVRRRatingNormalLabelSuffix\"> <\/span><\/div><div class=\"BVRRRatingNormalImage\"><img src=\"http://samsung.ugc.bazaarvoice.com/7463-en_us/4_3/5/ratingSecondary.gif\" class=\"BVImgOrSprite\" alt=\"4.3 out of 5\" title=\"4.3 out of 5\"/><\/div>\n<div class=\"BVRRRatingNormalOutOf\"> <span class=\"BVRRNumber BVRRRatingNumber\">4.3<\/span>\n <span class=\"BVRRSeparatorText\">out of <\/span>\n <span class=\"BVRRNumber BVRRRatingRangeNumber\">5<\/span>\n<\/div><\/div><\/div><\/div> <\/div>\n<div class=\"BVRRBuyAgainContainer\"><span class=\"BVRRLabel BVRRBuyAgainPrefix\"><\/span><span class=\"BVRRValue BVRRBuyAgain\"><span class=\"BVRRNumber BVRRBuyAgainRecommend\">32<\/span><span class=\"BVRRSeparatorText\">&nbsp;out of&nbsp;<\/span><span class=\"BVRRNumber BVRRBuyAgainTotal\">32<\/span><span class=\"BVRRBuyAgainPercentage\">(<span class=\"BVRRNumber\">100%<\/span>)<\/span><\/span><span class=\"BVRRLabel BVRRBuyAgainSuffix\">reviewers would recommend this product to a friend.<\/span><\/div> <div class=\"BVRRRatingSummaryLinks\">\n <div id=\"BVRRRatingSummaryLinkWriteID\" class=\"BVRRRatingSummaryLink BVRRRatingSummaryLinkWrite\">\n <span class=\"BVRRRatingSummaryLinkWritePrefix\"><\/span>\n<a title=\"Write a review\" data-bvcfg=\"__CONFIGKEY__\" data-bvjsref=\"http://samsung.ugc.bazaarvoice.com/7463-en_us/PN64F8500AFXZA/writereview.djs?format=embeddedhtml&amp;campaignid=BV_RATING_SUMMARY&amp;sessionparams=__BVSESSIONPARAMS__&amp;return=__RETURN__&amp;innerreturn=http%3A%2F%2Fsamsung.ugc.bazaarvoice.com%2F7463-en_us%2FPN64F8500AFXZA%2Fratings.djs%3Fformat%3Dembeddedhtml&amp;user=__USERID__&amp;authsourcetype=__AUTHTYPE__&amp;submissionparams=__BVSUBMISSIONPARAMETERS__&amp;submissionurl=__BVSUBMISSIONURL__\" name=\"BV_TrackingTag_Rating_Summary_1_WriteReview_PN64F8500AFXZA\" onclick=\"bvShowContentOnReturnPRR('7463-en_us', 'PN64F8500AFXZA', 'BVRRWidgetID');\" href=\"javascript://\">Submit a Review<\/a> <span class=\"BVRRRatingSummaryLinkWriteSuffix\"><\/span>\n <\/div>\n <\/div>\n<div class=\"BVRRSocialBookmarkingLinks\"><div class=\"BVRRProductBookmarkingLabel\">Share this Product:<\/div>\n<a name=\"BV_TrackingTag_Rating_Summary_1_SocialBookmarkFacebook_PN64F8500AFXZA\" target=\"_blank\" class=\"BVRRSocialBookmarkingSharingLink BVRRSocialBookmarkingSharingLinkFacebook\" onclick=\"this.href=bvReplaceTokensInSocialURL(this.href);window.open(this.href,'','left=0,top=0,width=626,height=436,toolbar=1,location=0,resizable=1,scrollbars=1'); return false;\" onfocus=\"this.href=bvReplaceTokensInSocialURL(this.href);\" rel=\"nofollow\" href=\"http://reviews.us.samsung.com/7463-en_us/share.htm?site=Facebook&amp;url=http%3A%2F%2Fwww.samsung.com%2Fus%2Fvideo%2Ftvs%2FPN64F8500AFXZA&amp;title=__TITLE__&amp;robot=__ROBOT__&amp;image=http%3A%2F%2Fwww.samsung.com%2Fus%2Fsystem%2Fconsumer%2Fproduct%2Fpn%2F64%2Ff8%2Fpn64f8500afxza%2FF8500_015_Front2_Black_copy_16.jpg\" onmouseover=\"this.href=bvReplaceTokensInSocialURL(this.href);\"><img width=\"16\"\n height=\"16\"\n class=\"BVRRSocialBookmarkLinkImage\"\n src=\"http://samsung.ugc.bazaarvoice.com/static/7463-en_us/link-facebook.gif\"\n alt=\"Facebook\"\n title=\"Add to Facebook\"/><\/a>\n\n<a name=\"BV_TrackingTag_Rating_Summary_1_SocialBookmarkTwitter_PN64F8500AFXZA\" target=\"_blank\" class=\"BVRRSocialBookmarkingSharingLink BVRRSocialBookmarkingSharingLinkTwitter\" onclick=\"this.href=bvReplaceTokensInSocialURL(this.href);window.open(this.href,'','left=0,top=0,width=795,height=700,toolbar=1,location=0,resizable=1,scrollbars=1'); return false;\" onfocus=\"this.href=bvReplaceTokensInSocialURL(this.href);\" rel=\"nofollow\" href=\"http://reviews.us.samsung.com/7463-en_us/share.htm?site=Twitter&amp;url=http%3A%2F%2Fwww.samsung.com%2Fus%2Fvideo%2Ftvs%2FPN64F8500AFXZA&amp;title=__TITLE__&amp;robot=__ROBOT__&amp;image=http%3A%2F%2Fwww.samsung.com%2Fus%2Fsystem%2Fconsumer%2Fproduct%2Fpn%2F64%2Ff8%2Fpn64f8500afxza%2FF8500_015_Front2_Black_copy_16.jpg\" onmouseover=\"this.href=bvReplaceTokensInSocialURL(this.href);\"><img width=\"16\"\n height=\"16\"\n class=\"BVRRSocialBookmarkLinkImage\"\n src=\"http://samsung.ugc.bazaarvoice.com/static/7463-en_us/link-twitter.gif\"\n alt=\"Twitter\"\n title=\"Tweet this\"/><\/a>\n<\/div><\/div><\/div><a id=\"BVSubmissionLink\" data-bvcfg=\"__CONFIGKEY__\" style=\"display: none;\" data-bvjsref=\"http://samsung.ugc.bazaarvoice.com/7463-en_us/PN64F8500AFXZA/writereview.djs?format=embeddedhtml&amp;campaignid=BV_SUBMISSIONLINK&amp;sessionparams=__BVSESSIONPARAMS__&amp;return=__RETURN__&amp;innerreturn=http%3A%2F%2Fsamsung.ugc.bazaarvoice.com%2F7463-en_us%2FPN64F8500AFXZA%2Fratings.djs%3Fformat%3Dembeddedhtml&amp;user=__USERID__&amp;authsourcetype=__AUTHTYPE__&amp;submissionparams=__BVSUBMISSIONPARAMETERS__&amp;submissionurl=__BVSUBMISSIONURL__\" onclick=\"bvShowContentOnReturnPRR('7463-en_us', 'PN64F8500AFXZA', '');\" href=\"javascript://\"><\/a> <\/div>\n"},
initializers={"BVRRSecondaryRatingSummarySourceID":[{"module":"contentDisplay","data":{"elementId":"BVRRRatingsHistogramButtonScript_shwrm3vle3juct39pkbkz5u1r_ID","prefix":"BVRR"},"init":"show"},{"module":"requester","data":{},"init":"bindJsLinks"}],"BVRRRatingSummarySourceID":[{"module":"contentDisplay","data":{"elementId":"BVRRRatingsHistogramButtonScript_i3rdiif6bl03lrbecsp9v99ks_ID","prefix":"BVRR"},"init":"show"},{"module":"requester","data":{},"init":"bindJsLinks"}]},
widgets={};
widgets["content"]={"handledContentTypes":["Review","Comment"],"containerId":"BVRRContainer","sourceId":"BVRRSourceID"};
widgets["secondarySummary"]={"containerId":"BVRRSecondarySummaryContainer","sourceId":"BVRRSecondaryRatingSummarySourceID"};
widgets["summary"]={"containerId":"BVRRSummaryContainer","sourceId":"BVRRRatingSummarySourceID"};
var injectionData={
apiConfig:apiConfig,
containerInitializer:false,
cookiePath:"/",
crossDomainUrl:"http://samsung.ugc.bazaarvoice.com/7463-en_us/crossdomain.htm?format=embedded",
embeddedUrl:url,
globalInitializers:[{"module":"browserVersion","init":"initialize","data":{"useBodyTag":false,"containerId":"BVRRSummaryContainer"}},{"module":"browserVersion","init":"initialize","data":{"useBodyTag":false,"containerId":"BVRRSecondarySummaryContainer"}},{"module":"feedback","init":"onInjection","data":{"id":"Product_t4bklgtcnuwqd8c0fxa3oqd4o","options":{"cookiePrefixes":{"Voting":"pfv"},"cookiePath":"/","contentFocusing":{"args":["7463-en_us","PN64F8500AFXZA"],"fn":"bvShowContentOnReturnPRR"}}}},{"module":"rr/contentFocusingSupportRR","init":"postInjection","data":{"application":"PRR","source":"readLink","defaultContentContainerId":"BVRRContainer","tabSwitcher":"bvShowTab","displayCode":"7463-en_us"}}],
gotoCookieRegexp:/^https?:\/\/[^/?#]+(\/[^?#]*)\//,
inFrameSubmissionEnabled:false,
pageIdPrefix:"BVRR",
pageTrackers:[],
postInjectionFunction:function(Inject){
},
productId:"PN64F8500AFXZA",
replaceDisplayTokens:true,
replacementsPrefix:"BVRR",
replaceSessionParameters:false,
returnURLFixedValue:"",
returnURLForceRelativeToRoot:true,
setWindowTitle:false,
sviParameterName:"bvrrp",
sviRedirectBaseUrl:"",
webAnalyticsConfig:{"customTrackedObjects":"","customizersName":"BVRRAnalyticsCustomizers","customContainersFnName":"BVRRAnalyticsCustomContainers","conversionTracking":{"conversionTrackingElementSelector":null,"conversionTrackingMetadataSelector":null,"conversionTrackingParseRegexp":null,"conversionTrackingName":"AddToCart"},"SIWZeroDeployEnabled":false,"maxTrackingTagTraversalDepth":3,"customTrackedObjectsSelector":"","jsonData":{"bvProduct":"RatingsAndReviews","autoTagAnalyticsConfiguration":{"trackSubmissionPageLoads":true,"autoTagAnalyticsVersion":"5.0","trackFormActions":true,"productTracking":{"tracking":true,"initialProductDisplay":true},"vendors":[{"vendorName":"omniture","eventNum":95,"eVarNum":74,"trackerReference":"s","brandVoiceTrackingType":null,"brandVoiceTrackingEVarNum":0},{"vendorName":"magpie","anonymous":false,"brandDomain":"false","defaultClassesOnly":false}]},"bvExtension":{},"bvAnalyticsVersion":"4.8","productId":"PN64F8500AFXZA","eType":"Read","bvDisplayCode":"7463-en_us","rootCategoryId":"N0000044","subjectType":"Product","brand":"samsung","analyticsWhitespaceTrackingEnabled":false,"attributes":{"numRatingsOnlyReviews":0,"numReviews":34,"percentRecommend":100,"avgRating":4.764700000000},"ciTrackingEnabled":false,"bvClientName":"Samsung","leafCategoryId":"N0000044"}},
widgetInitializers:initializers,
widgetLimit:1,
widgetMaterials:materials,
widgetMetadata:widgets,
windowTitle:null};
Injection.newInstance().apiInjection(injectionData);
});
});