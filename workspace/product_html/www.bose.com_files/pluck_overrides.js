// Set the a_domain from a java function in ratings_reviews.jsp
// Use top_level_domain to set document.domain

  var lc_com = /bose.com/i;
  var lc_ca = /bose.ca/i;
  var lc_pr = /bose.pr/i;
  var top_level_domain, aa_domain;
  
  function check_the_domain(rgx) {
    var result;
    if ((top_level_domain == undefined) || (top_level_domain == null)) { // try to match the tld if it is null
      result = rgx.exec(aa_domain);    
      return result;
    }
  }
  
    // set a_domain if it has not been set globally in /inlcudes/rating_reviews.jsp
    // a_domain is set globally in /inlcudes/rating_reviews.jsp
    if ((a_domain == undefined) || (a_domain == null)) {
      aa_domain = location.hostname;  
    }
    else {
      aa_domain = a_domain;  
    }
    
    // try to match the tld - keep bose.com on top to optimize performance
    top_level_domain = check_the_domain(lc_com);
    if ((top_level_domain == undefined) || (top_level_domain == null)) {  
      top_level_domain = check_the_domain(lc_ca);
    }
    if ((top_level_domain == undefined) || (top_level_domain == null)) {  
      top_level_domain = check_the_domain(lc_pr);      
    }
    // if the tld has not been set set it to bose.com
    if (top_level_domain == null ) {
    	top_level_domain = "bose.com";
    }

var plcOvrds = {
  atCookie:"false",   // assume no login on pageload
  reviewCount:"0",  // the number of reviews
  reviewsAvg:"0",    //  the average review rating
  ratingText:" average rating",
  rollupLogin:"",      // product area rollup element
  rollupLogin2:"",    // reviews tab rollup element
  rollUpContainerTop:'',         // container for the login links and and anchor links in the top rollup widget
  rollUpContainerBottom:'',  // container for the login links and and anchor links in the bottom rollup widget
  rollUpContainerTop_html:'<div id=\"rollUpContainerTop\"></div>',         // html for the container in the top rollup widget
  rollUpContainerBottom_html:'<div id=\"rollUpContainerBottom\">.</div>',  // html for the container in the bottom rollup widget
  custReviewDivsCreated:false,     // set to false before rollup container divs rollUpContainerTop and rollUpContainerBottom are created, true after they are created 
  numReviewsTop:"",      // product area rollup element for number of reviews - links to reviews tab
  numReviewsBottom:"",            //  reviews tab element for number of reviews
  loginLinkOpen:"<a id=\"customer-reviews-link\" href=\"#customer-reviews-login-container\" rel=\"600,400\" title=\"Reviews login\" class=\"bose_lightbox\">",         // login link for product area instance
  loginLinkOpen2:"<a id=\"customer-reviews-link2\" href=\"#customer-reviews-login-container\" rel=\"600,400\" title=\"Reviews login\" class=\"bose_lightbox\">",    // login link for tab area instance
  loginLinkOpen3:"<a id=\"customer-reviews-link3\" href=\"#customer-reviews-login-container\" rel=\"600,400\" title=\"Reviews login\" class=\"bose_lightbox\">",    // login link for tab area instance
  submitReviewLink:'<a id=\"customer-reviews-link3\" href=\"#main\">', 
  aClose:"</a>",  
  rollupReviewLinkText:'',
  rollupFirstReviewLinkText:"Be the first to review &#187;", 
  reviewsTabLink:"",
  ratings_avg_element:'',
  reviewCount_element:'',
  listHeaderText:"",
  postedBy_html:"<span>Posted by </span>",
  postedBy:'',
  topLink:'',
  languageCheckBox:'',
  englishRadioButton:'',
  frenchRadioButton:'',
  francais_string:'Français',
  documentLanguage:'',
  sortOptions:'',
  avgRatingsSpanCreated:false,
  intervalCntr:0,   // object level variable used to capture the number of time the check_for_elms is run - for diagnostics
  ratingsGraphicHtml:'',  // this will contain ratings graphic html for the top rollup widget rollover
  ratings_container:'',     // this will be an empty div to contin the ratings graphic in the top rollup widget
  ratingsHoverButton:'', // this is the button in the top rollup widget that mouseover and mouseout events (showing ratings graphic) are attached to
  
  init:function(){
    var init_cntr; // This variable is used to store the reference to our setInterval() instance and is used when running clearInterval()
    // set up some object level properties
    plcOvrds.intervalCntr =0;       
    // plcOvrds.avgRatingsSpanCreated=false; // reset this so that average rating text is inserted and displayed when changing products on multi-product pages
    document.domain = top_level_domain;
    plcOvrds.reviewsTabLink = jQuery("a[title='Customer reviews']");
    plcOvrds.reviewCount_element = jQuery(".pluck-review-total-count");
    plcOvrds.ratings_avg_element = jQuery(".rating");
    plcOvrds.topLink = jQuery('#Customer-Reviews div.top_link');
    plcOvrds.submitReviewButton = '<img id=\"submit_a_review\" src=\"/assets/images/reviews/submit_a_review.png\" alt=\"Submit a review\" />';    
    plcOvrds.postedBy = jQuery(".pluck-review-full-reviewer-name.fn.url") ;
    plcOvrds.rollupLogin = jQuery("#prod_rollup div.pluck-review-login-review-rollup-wrap");            // product area rollup element
    plcOvrds.rollupLogin2 = jQuery("#reviews_rollup div.pluck-review-login-review-rollup-wrap");    // reviews tab rollup element
    plcOvrds.documentLanguage = jQuery('html').attr('lang');    // document language, used for language filters and features
    plcOvrds.ratingsGraphicHtml = jQuery('div#reviews_rollup div.pluck-review-rollup-dialog.pluck-dialog').html();
// div.pluck-review-rollup-output-line is created by the pluck app. Since there may be some network lag 
// that delays its instantiation we run the timer interval until it is are detected on the page.     
// Want to periodically invoke check_for_elms() until the div.pluck-review-rollup-output-line element is detected
// in the top rollup component. Once it is detected run the widget inits and the other widget set up functions.
      if (jQuery('span#avg_rating').length == 0) {  // check to see if the span#avg_ratings exists
        plcOvrds.avgRatingsSpanCreated=false; // reset this so that average rating text is inserted and displayed when changing products on multi-product pages
      }
      else {
        plcOvrds.avgRatingSpanCreated=true;
      }

    function check_for_elms() {
    
      if (jQuery('span#avg_rating').length == 0) {  // check to see if the span#avg_ratings exists
        plcOvrds.avgRatingsSpanCreated=false; // reset this so that average rating text is inserted and displayed when changing products on multi-product pages
      }
      else {
        plcOvrds.avgRatingSpanCreated=true;
      }    
          
        if (jQuery('div#prod_rollup div.pluck-review-rollup-wrapper > div.pluck-review-rollup-output-line').length == 0) {
        // do nothing except increment diagnostic counter
        plcOvrds.intervalCntr +=1;
      }
      else if (jQuery('div#prod_rollup div.pluck-review-rollup-wrapper > div.pluck-review-rollup-output-line').length >= 0) {
        // this element contains the stars rating in the upper rollup widget    
        plcOvrds.numReviewsTop = jQuery('div#prod_rollup div.pluck-review-rollup-wrapper > div.pluck-review-rollup-output-line'); 
        // this element contains the stars rating in the lower rollup widget        
        plcOvrds.numReviewsBottom = jQuery('div#reviews_rollup div.pluck-review-rollup-wrapper > div.pluck-review-rollup-output-line'); 
        // now run some methods        
        plcOvrds.getAtCookie(); 
        plcOvrds.getReviewCount();
        plcOvrds.rollup_init();
        plcOvrds.list_init();
        jQuery(plcOvrds.topLink).css("display","none");
        plcOvrds.ratingFilterDisable(); 
        plcOvrds.createHoverRatingsGraphic();
       	clearInterval(init_cntr);
      }
    }
    // start setInterval() - check elements on the page that are created by the pluck app
    init_cntr = window.setInterval(check_for_elms,100);  
  },
  
  // this function disables the click behavior on the ratings graphic
  ratingFilterDisable:function() {
    jQuery('a.pluck-review-full-attribute-name-ref').mouseover(plcOvrds.defaultCursor);  
    dmJQuery(".pluck-review-rollup-dialog", dmJQuery(".pluck-review-rollup")).unbind("click");
    dmJQuery("a.pluck-review-full-attribute-name-ref").unbind("click");
    jQuery("a.pluck-review-full-attribute-name-ref").attr("href","#main"); 
  },

  createHoverRatingsGraphic:function () {
    var ratingsGraphicContainer = '<div id=\"ratings_container\"> </div>'; // empty div to style and put the ratings graphic into - for the upper rollup rollover functionality
    // jQuery(ratingsGraphicContainer).insertAfter('img#product_hero');  // empty container
    // jQuery(ratingsGraphicContainer).insertAfter('a#num_reviews_top1');  // empty container
    jQuery(ratingsGraphicContainer).insertAfter('div#rollUpContainerTop');  // empty container    
    plcOvrds.ratings_container=jQuery('#ratings_container');
    plcOvrds.ratingsGraphicHtml = "<div class=\"pluck-review-rollup-dialog pluck-dialog\"> " + plcOvrds.ratingsGraphicHtml  + "</div>"; 
    jQuery(plcOvrds.ratings_container).html(plcOvrds.ratingsGraphicHtml);
    // how to get away from using the div#ratings_container slector 6 times!
    jQuery('div#ratings_container a.pluck-review-full-attribute-name-ref').attr("href","#");
    jQuery('div#ratings_container a.pluck-review-full-attribute-name-ref').css('color','#0066CC');
    jQuery('div#ratings_container span.pluck-review-full-attributes-name-link, div#ratings_container span.pluck-review-full-attributes-name-post').css('font-size','.8em');   
    jQuery('div#ratings_container  a.pluck-review-full-attribute-name-ref').mouseover(plcOvrds.defaultCursor);  
    dmJQuery('div#ratings_container  .pluck-review-rollup-dialog', dmJQuery("ratings_container  .pluck-review-rollup")).unbind("click");
    dmJQuery('div#ratings_container  a.pluck-review-full-attribute-name-ref').unbind("click");
    
    // set up mouseover/mouseout handlers for ratings button
    plcOvrds.ratingsHoverButton = jQuery('#hover_for_ratings');
    jQuery(plcOvrds.ratingsHoverButton).mouseover(plcOvrds.showRatings).mouseover(plcOvrds.handCursor);
    jQuery(plcOvrds.ratingsHoverButton).mouseout(plcOvrds.hideRatings).mouseout(plcOvrds.defaultCursor);
  },
  
  // mouseover handler for ratings button
  showRatings:function() {
    jQuery(plcOvrds.ratings_container).css('display','block');
  },
  // mouseout handler for ratings button
  hideRatings:function() {
    jQuery(plcOvrds.ratings_container).css('display','none');
  },
      
  getAtCookie:function() {
  var u_var = /u=/;
  var t_var = /t=/;  
  var h_var = /h=/;
  var e_var = /e=/;
  var atCookieValue = getCookie("at");  // getCookie() is in global_new.js
    if (atCookieValue == null) {
      plcOvrds.atCookie = false;  // value has not been set and "at" cookie not found
    }
    else if (atCookieValue != null) {
    // check atCookieValue for substrings u=, t=, e= and h=
        if ((((u_var.test(atCookieValue) == true) &&  (t_var.test(atCookieValue) == true)  && (e_var.test(atCookieValue) == true)  && (h_var.test(atCookieValue) == true)))) {
        plcOvrds.atCookie = true; // value has been set and "at" cookie present
      }
    }
  },
  
  getReviewCount:function() {
    var reviews_count = jQuery(".pluck-review-total-count").html();
    if (reviews_count != null) {
      plcOvrds.reviewCount = parseInt(jQuery(".pluck-review-total-count").html());
    }
    else if ((reviews_count == null)){
      plcOvrds.reviewCount = 0;  
    }
  },

  setRollUpView:function() {
    if (((jQuery(plcOvrds.reviewCount_element).hasClass("pluck-review-total-count")) && (plcOvrds.reviewCount >1))  || (plcOvrds.reviewCount == 0)) { 
      plcOvrds.rollupReviewLinkText = " Customer reviews";  // add the plural s to reviews if no reviews or more than one review
    }
    else if((jQuery(plcOvrds.reviewCount_element).hasClass("pluck-review-total-count")) && (plcOvrds.reviewCount == 1)) {
    plcOvrds.rollupReviewLinkText = " Customer review";
    }
  },  
  
  getRatingsAvg:function() {
    var local_ratings_avg = jQuery(".rating").html();
    if ((jQuery(plcOvrds.ratings_avg_element).hasClass("rating")) && (local_ratings_avg >= 1)) { // make sure that the element exists
      plcOvrds.reviewsAvg = local_ratings_avg;
    }
  },

  rollup_init:function() {
    var reviewLink, loginLinkTop, loginLinkBottom, numReviewsTop, numReviewsBottom; // local instances of numReviewsTop and numReviewsBottom
    var loginLink, ratings_avg_string_top, ratings_avg_string_bottom;
    var stars_output = jQuery("#reviews div.pluck-review-rollup-wrapper"); 
    plcOvrds.getReviewCount();
    plcOvrds.getRatingsAvg();
    plcOvrds.setRollUpView();
    jQuery(plcOvrds.rollupLogin).unbind("click");
    jQuery(plcOvrds.rollupLogin2).unbind("click");
    // check if the container elements exist - custReviewDivsCreated is an object level property set when the containers are first created and on page load/reload
    // if (plcOvrds.custReviewDivsCreated == false) {
      if ((jQuery('#rollUpContainerTop').length)  == 0)  {   // if the upper rollup container does not exist   
        jQuery(plcOvrds.rollUpContainerTop_html).insertAfter(plcOvrds.numReviewsTop);             //pluck-review-rollup-output-line   // insert empty div html into upper rollup widget
        jQuery(plcOvrds.rollUpContainerBottom_html).insertAfter(plcOvrds.numReviewsBottom);  // insert empty div html into lower rollup widget
        plcOvrds.rollUpContainerTop = jQuery("#rollUpContainerTop");                    // this is the element we insert/remove html from in the upper rollup widget from
        plcOvrds.rollUpContainerBottom =  jQuery("#rollUpContainerBottom");     // this is the element we insert/remove html from in the lower rollup widget from
        plcOvrds.custReviewDivsCreated = true;                                                                    // containers have now been created - set to true
    }
    else {
      plcOvrds.custReviewDivsCreated = true; 
    }

    if ((plcOvrds.avgRatingsSpanCreated == false)  && (plcOvrds.reviewCount > 0)){
      if ((jQuery(plcOvrds.ratings_avg_element).attr("class") == "rating") && (plcOvrds.reviewsAvg >= 1)) { // make sure that the element exists
        // this is supposed to be a link that activates the ratings overlay in the Customer Reviews tab
        // for now just displaying the ratings text - need to determine how to move and display the overlay properly
        ratings_avg_string_top =  "<img id=\"hover_for_ratings\" src=\"/assets/images/reviews/ratings_hover.gif\" alt=\"hover for ratings graphic\" /> <span id=\"avg_rating\">" + "&nbsp;&nbsp; " + plcOvrds.reviewsAvg + " average rating</span>";            
        ratings_avg_string_bottom =  "<span id=\"avg_rating\">" + plcOvrds.reviewsAvg + " average rating</span>"; 
        jQuery(ratings_avg_string_top).insertAfter("div#prod_rollup div.pluck-review-rollup-output-star-wrap");  // adds the average rating language after the stars in the upper rollup        
        jQuery(ratings_avg_string_bottom).insertAfter("div#reviews_rollup div.pluck-review-rollup-output-star-wrap");  // adds the average rating language after the stars in the lower rollup
        plcOvrds.avgRatingsSpanCreated = true; 
      }    
    }    
    
    if ((plcOvrds.reviewCount > 0)  && (plcOvrds.atCookie == false)) {     // Most likely scenario first - more than 0 reviews and reader is not logged in
      numReviewsTop = "<a id=\"num_reviews_top1\" href=\"#main\">" + plcOvrds.reviewCount + plcOvrds.rollupReviewLinkText + plcOvrds.aClose; 
      numReviewsBottom = "<span id=\"num_reviews_bottom\">"  + plcOvrds.reviewCount + plcOvrds.rollupReviewLinkText + "</span>"; 
      jQuery(plcOvrds.rollUpContainerTop).html(numReviewsTop);
      jQuery(plcOvrds.rollUpContainerBottom).html(numReviewsBottom);
      jQuery('#num_reviews_top1').bind("click",plcOvrds.openReviewsTab);
      jQuery("#reviews > h1").text('Customer reviews') ;           
    }
     
    if ((plcOvrds.reviewCount > 0)  && (plcOvrds.atCookie ==  true))  {   // more than 0 reviews and reader is logged in    
      numReviewsTop = "<a id=\"num_reviews_top1\" href=\"#main\">" + plcOvrds.reviewCount + plcOvrds.rollupReviewLinkText + plcOvrds.aClose; 
      numReviewsBottom = "<span id=\"num_reviews_bottom\">"   + plcOvrds.reviewCount + plcOvrds.rollupReviewLinkText + "</span>"; 
      jQuery(plcOvrds.rollUpContainerTop).html(numReviewsTop);
      jQuery(plcOvrds.rollUpContainerBottom).html(numReviewsBottom);
      jQuery('#num_reviews_top1').bind("click",plcOvrds.openReviewsTab);
      jQuery("#reviews > h1").text('Customer reviews') ;     
    }
    
    if ((plcOvrds.reviewCount == 0)  && (plcOvrds.atCookie ==  true))  {   // 0 reviews and reader is logged in
      loginLinkTop = "<a href=\"#main\" id=\"customer-reviews-link\">" + plcOvrds.rollupFirstReviewLinkText + plcOvrds.aClose;
      loginLinkBottom = "<a href=\"#main\" id=\"customer-reviews-link2\">" + plcOvrds.rollupFirstReviewLinkText + plcOvrds.aClose;   
      jQuery(plcOvrds.rollUpContainerTop).html(loginLinkTop);
      jQuery(plcOvrds.rollUpContainerBottom).html(loginLinkBottom).css("display","block"); 
      jQuery('#customer-reviews-link').bind("click",function(){plcOvrds.openReviewsForm(); plcOvrds.openReviewsTab();}); // scroll to top of tabs &  open the reviews form
      jQuery('#customer-reviews-link2').bind("click",function(){plcOvrds.openReviewsForm();});  // scroll to top of tabs &  open the reviews form
      jQuery(".pluck-review-rollup-review-metawrap").css("display","none");
      jQuery("#reviews > h1").text("We currently do not have reviews for this product");
    }

    if ((plcOvrds.reviewCount == 0)  && (plcOvrds.atCookie ==  false))  {   // 0 reviews and reader is not logged in
      loginLinkTop = plcOvrds.loginLinkOpen + plcOvrds.rollupFirstReviewLinkText + plcOvrds.aClose;
      loginLinkBottom = plcOvrds.loginLinkOpen2 + plcOvrds.rollupFirstReviewLinkText + plcOvrds.aClose; 
      jQuery(plcOvrds.rollUpContainerTop).html(loginLinkTop);
      jQuery(plcOvrds.rollUpContainerBottom).html(loginLinkBottom); 
      jQuery('#customer-reviews-link').click(function() {setTimeout(reviewsLoginForm,400);});
      jQuery('#customer-reviews-link2').click(function() {setTimeout(reviewsLoginForm,400);});      
      jQuery(".pluck-review-rollup-review-metawrap").css("display","none");
      jQuery("#reviews > h1").text("We currently do not have reviews for this product");
    }
  },

    show_submit_review_button:function(elm) {
      jQuery(plcOvrds.submitReviewButton).insertAfter(elm);
      jQuery(plcOvrds.submitReviewButton).bind("click",plcOvrds.openReviewsForm);
      jQuery(plcOvrds.submitReviewButton).bind("mouseover",plcOvrds.handCursor).bind("mouseout",plcOvrds.defaultCursor);     
    },

   openReviewsForm:function() {
    jQuery(plcOvrds.rollupLogin2).text("").css("display","none");
    pluckAppProxy.pluck_reviews_submit_refresh(".pluck-review-list");
  },
  
  openReviewsTab:function() {
  	plcOvrds.atCookie = plcOvrds.getAtCookie("at");
    jQuery(plcOvrds.reviewsTabLink).click();
  },
  
  // use this for changing the cursor for mouseover events on elements that are not links  
  handCursor:function() {
    jQuery(this).css('cursor','pointer');
  },  
  defaultCursor:function() {
    jQuery(this).css('cursor','default');  
  },  
      
  list_init:function(){
  var filter_list = jQuery("select.pluck-review-full-header-sorting");
  var submitReviewButton2 = plcOvrds.loginLinkOpen3 + "Submit a review" + plcOvrds.aClose;  // this is the button with login link 
  var submitReviewButton3 = plcOvrds.submitReviewLink + "Submit a review" + plcOvrds.aClose;  // this is the button with login link 
  var sortOptions,sortSelect;  
    plcOvrds.languageCheckBox = jQuery('div.pluck-review-list-filter-author-attribute input:checkbox[value="Language"]'); // this is the language check box
    plcOvrds.englishRadioButton = jQuery('label:contains("English")').prev(); // this should be the english radio button    
    plcOvrds.frenchRadioButton = jQuery('label:contains("Français")').prev();  // this should be the french radio buttton    
    jQuery(plcOvrds.languageCheckBox).attr("checked",true);
    if (plcOvrds.documentLanguage == "en") { // if the document language is english
      jQuery(plcOvrds.englishRadioButton).attr("checked","checked");        
    }
    else if (plcOvrds.documentLanguage == "fr") {   // if the document language is french
      jQuery(plcOvrds.frenchRadioButton).attr("checked","checked");  
    }
    else {  // if the document language is unkown or not set to english or french
      jQuery(plcOvrds.englishRadioButton).attr("checked","checked");          
    }	
/* NEED TO MAKE SURE THAT WE DO NOT CREATE DUPLICATE SUBMIT A REVIEW BUTTONS */
    if (plcOvrds.atCookie == true) {  // If cookied bind the open reviews form method to the submit a review buttons click event
      if (plcOvrds.reviewCount == 0)  {   // 0 reviews and reader is logged in
        jQuery(submitReviewButton3).insertAfter(filter_list);
        jQuery('#customer-reviews-link3').bind("click",plcOvrds.openReviewsForm);
        jQuery(plcOvrds.rollupLogin2).css("display","block");          
      }    
      else {
        jQuery(submitReviewButton3).insertAfter(filter_list);
        jQuery('#customer-reviews-link3').bind("click",plcOvrds.openReviewsForm);
      }
    }
    else if (plcOvrds.atCookie == false) { // if not cookied open the login form on submit a review button click events
        jQuery(submitReviewButton2).insertAfter(filter_list);    
        jQuery('#customer-reviews-link3').click(function() {setTimeout(reviewsLoginForm,400)});
    }
    
    jQuery(plcOvrds.submitReviewButton).bind("mouseover",plcOvrds.handCursor).bind("mouseout",plcOvrds.defaultCursor);      
    /* Re-arrange widget content - also see pluck_overrides.css  for hidden content */
    jQuery("p.pluck-review-full-header-sort-label").insertBefore(filter_list);
    jQuery(plcOvrds.postedBy).before(plcOvrds.postedBy_html);  
    jQuery('option[value*="ScoreDescending"]').remove();     // remove the "Most helpful" sort criteria from the sort by dropdown
    // remove links from and set styles on author names
    jQuery('a.pluck-review-full-reviewer-name.fn.url').attr('href','#').css({'color':'#615555','font-weight':'bold'}).bind("mouseover",plcOvrds.defaultCursor);
  // remove some list widget clutter
  jQuery("div.pluck-review-full-review-powered-by-wrap > a.pluck-footer-logo").remove();     
  },
  
  /* Refresh widgets after login attempt - atCookieStatus is set in reviewsLoginForm() in product_page.js */
  widgetRefresh:function(atCookieStatus){
    plcOvrds.atCookie = atCookieStatus;   // set the cookie property in the pluck overrides object
    plcOvrds.rollup_init();        // reset links on rollup widgets
    plcOvrds.list_init();             // reset links on list widget  
    // if login attempt is successful and there are 0 reviews open the review form
    if (plcOvrds.atCookie ==  true) {
      plcOvrds.openReviewsForm();  //  open the reviews form
      plcOvrds.openReviewsTab();     // open the reviews tab
    }
    if ((plcOvrds.reviewCount == 0)  && (plcOvrds.atCookie ==  true))  {   // 0 reviews and reader is logged in 
      loginLinkBottom = "<a href=\"#main\" id=\"customer-reviews-link2\">" + plcOvrds.rollupFirstReviewLinkText + plcOvrds.aClose;   
      jQuery(plcOvrds.rollUpContainerBottom).html(loginLinkBottom);  // hide the "Be the first to review" link
    }
  },
    
  review_submit:function(){
  // this is a registered callback and is run when the reviews form is rendered
  // insert the character limit content and links to the policies page on the reviews form
  var titleCharLimit, reviewCharLimit, tncLink, titleInput, reviewInput, submitButtonDiv,numReviewsBottom;
  var languageSelectDiv = jQuery('div.pluck-review-create-author-attributes');            // div containing the language select drop down
  var languageSelect = document.getElementById('pluckAuthor0');  // the language select drop down
    titleInput = jQuery('input.pluck-review-create-review-input.pluck-review-create-review-title-input');
    reviewInput = jQuery('textarea#pluck-review-body');
    submitButtonDiv = jQuery('div.pluck-review-create-review-primary-buttons');
    titleCharLimit = "<span class=\"new_elm\">100-character limit</span>";
    reviewCharLimit = "<span class=\"new_elm\">10,000-character limit</span>"; 
    tncLink = "<br /><p class=\"new_elm\">By submitting a review, you agree to our <a href=\"/customer_service/site_help/index.jsp#ratings_and_reviews_policies\" target=\"_blank\">Terms and Conditions</a></p>";
    
    if ((plcOvrds.reviewCount == 0)  && (plcOvrds.atCookie ==  true))  {   // 0 reviews and reader is logged in    
      jQuery(plcOvrds.rollUpContainerBottom).css("display","none");  // hide the "Be the first to review" link
    }
    
    jQuery(titleCharLimit).insertAfter(titleInput);
    jQuery(reviewCharLimit).insertAfter(reviewInput);
    jQuery(tncLink).appendTo(submitButtonDiv);
    jQuery('span.pluck-primary-button-text').css("background","url('/assets/images/reviews/pluck_button_left.jpg') no-repeat scroll 0 0 transparent");
    jQuery('a.pluck-primary-button').css("background","url('/assets/images/reviews/pluck_button_right.jpg') no-repeat scroll right top transparent");
    if ((top_level_domain == "bose.com") || (top_level_domain == "bose.pr")) {
      jQuery(languageSelectDiv).css('display','none');
      languageSelect.selectedIndex=1;      
    }
    else if (top_level_domain == "bose.ca") {
      jQuery(languageSelectDiv).css('display','block');
    }
    else  {
      jQuery(languageSelectDiv).css('display','none');
    }
  },
  
  review_create:function(){
    // this is a registered callback and is run when the reviews form is submitted
    // may want to clean up the page and run the widgetRefresh
    plcOvrds.custReviewDivsCreated = false;
    plcOvrds.avgRatingsSpanCreated = false;    
  }   
}