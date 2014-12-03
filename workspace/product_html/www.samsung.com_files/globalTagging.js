$(function () {
    var gnb_link_cat, gnb_link_id, gnb_link_position, gnb_link_meta, gnb_link_text, linkHref, nav_type;

    //tag level one dropdown items (desktop)
    $('nav .submenu > a, #nav li.top > a').on('click',function(e){
        //e.preventDefault();
        gnb_link_text = $(this).data('gnb_link_text') || $(this).text();
        gnb_link_cat = $(this).data('gnb_link_cat') || 'top nav';
        gnb_link_id = $(this).data('gnb_link_id') || 'topnav_1_'+gnb_link_text;
        gnb_link_meta = $(this).data('gnb_link_meta') || 'link_name:'+gnb_link_text;
        gnb_link_position = $(this).data('gnb_link_position') || 'top nav 1';
        linkHref = $(this).attr("href") || "#";
        //console.log( gnb_link_cat+" "+gnb_link_id+" "+gnb_link_meta+" "+gnb_link_position+" "+linkHref);
        utag.link({ link_cat: gnb_link_cat, link_id: gnb_link_id, link_meta:gnb_link_meta, link_position:gnb_link_position, link_href:linkHref, glb_nav_type:nav_type});
    });

    //tag level two dropdown items (desktop / mobile)
    $('nav .dropdown > li > a,nav#nav .top[data-category!="Shop Products"] > ul > li > a').on('click',function(e){
        //e.preventDefault();
        gnb_link_text = $(this).data('gnb_link_text') || $(this).text();
        gnb_link_cat = $(this).data('gnb_link_cat') || 'top nav';
        gnb_link_id = $(this).data('gnb_link_id') || 'topnav_2_'+gnb_link_text;
        gnb_link_meta = $(this).data('gnb_link_meta') || 'link_name:'+$(this).closest('.top').data('category')+">"+gnb_link_text;
        gnb_link_position = $(this).data('gnb_link_position') || 'top nav 2';
        linkHref = $(this).attr("href") || "#";
        //console.log( gnb_link_cat+" "+gnb_link_id+" "+gnb_link_meta+" "+gnb_link_position+" "+linkHref);
        utag.link({ link_cat: gnb_link_cat, link_id: gnb_link_id, link_meta:gnb_link_meta, link_position:gnb_link_position, link_href:linkHref, glb_nav_type:nav_type });
    });

    //tag level three dropdown items (desktop)
    $('nav .flyout a:not(.product-link),nav .flyout .product-link,nav#nav .top > ul > li li a').on('click',function(e){
        //e.preventDefault();
        gnb_link_text = $(this).data('gnb_link_text') || $(this).text();
        gnb_link_cat = $(this).data('gnb_link_cat') || 'top nav';
        gnb_link_id = $(this).data('gnb_link_id') || 'topnav_3_'+gnb_link_text;
        gnb_link_meta = $(this).data('gnb_link_meta') || 'link_name:'+$(this).closest('.top').data('category')+">"+$(this).closest('.mid').data('category')+">"+gnb_link_text;
        gnb_link_position = $(this).data('gnb_link_position') || 'top nav 3';
        linkHref = $(this).attr("href") || "#";
        //console.log( gnb_link_cat+" "+gnb_link_id+" "+gnb_link_meta+" "+gnb_link_position+" "+linkHref);
        utag.link({ link_cat: gnb_link_cat, link_id: gnb_link_id, link_meta:gnb_link_meta, link_position:gnb_link_position, link_href:linkHref, glb_nav_type:nav_type });
    });

    //tag footer ul items (destop / mobile)
    $('footer#footer .footer-pages ul a, footer#footer .footer-store-products ul a,  footer#footer .footer-bottom ul a').on('click',function(e){
        //e.preventDefault();
        gnb_link_text = $(this).data('gnb_link_text') || $(this).text();
        gnb_link_cat = $(this).data('gnb_link_cat') || 'footer link';
        gnb_link_id = $(this).data('gnb_link_id') || 'footer_'+gnb_link_text;
        gnb_link_meta = $(this).data('gnb_link_meta') || 'link_name:'+gnb_link_text;
        gnb_link_position = $(this).data('gnb_link_position') || 'footer-nav';
        linkHref = $(this).attr("href") || "#";
        //console.log( gnb_link_cat+" "+gnb_link_id+" "+gnb_link_meta+" "+gnb_link_position+" "+linkHref);
        utag.link({ link_cat: gnb_link_cat, link_id: gnb_link_id, link_meta:gnb_link_meta, link_position:gnb_link_position, link_href:linkHref, glb_nav_type:nav_type });
    });

    //mobile footer tier 1 clicks
    $('footer#footer h2.footer-store-header, footer#footer h2.root, footer#footer .back-to-top').on('click',function(){
        if(nav_type=="m"){
            gnb_link_text = $(this).data('gnb_link_text') || $(this).text().trim();
            gnb_link_cat = $(this).data('gnb_link_cat') || 'footer nav';
            gnb_link_id = $(this).data('gnb_link_id') || 'footer_1_'+gnb_link_text;
            gnb_link_meta = $(this).data('gnb_link_meta') || 'link_name:'+gnb_link_text;
            gnb_link_position = $(this).data('gnb_link_position') || 'footer nav 1';
            linkHref = $(this).attr("href") || "#";
            //console.log( gnb_link_cat+" "+gnb_link_id+" "+gnb_link_meta+" "+gnb_link_position+" "+linkHref);
            utag.link({ link_cat: gnb_link_cat, link_id: gnb_link_id, link_meta:gnb_link_meta, link_position:gnb_link_position, link_href:linkHref, glb_nav_type:nav_type});
        }
    });

    /*regular search*/
     $('nav .icons-search-gray').on('click',function(){
        var searchVal = $(this).prev('input.search').val();
        var uObj = {search_category: 'general', search_term:searchVal, search_location: 'header', search_type:'general', glb_nav_type:nav_type};
        console.log(uObj);
        utag.link(uObj);
    });

    $('body').on('click', 'li.query_result', function(){
        var searchVal = $('.search-field.top').find('input.search').val();
        var uObj = {search_category: 'predictive>general', search_term:searchVal, search_location: 'header', search_type:'predictive-general', glb_nav_type:nav_type};
        console.log(uObj);
        utag.link(uObj);
    });

    $('footer .icons-search-gray').on('click',function(){
        var searchVal = $(this).prev('input.search').val();
        var uObj = {search_category: 'general', search_term:searchVal, search_location: 'footer', search_type:'general', glb_nav_type:nav_type};
        console.log(uObj);
        utag.link(uObj);
    });

    //define mobile/desktop variable
    function checkMobile(){
        if( $('header.gnb-header').width() <= 767 ) nav_type = 'm';
        else nav_type = 'd';
        //console.log(nav_type);
    }
    $(window).resize(function(){ checkMobile(); });
    checkMobile();

});

