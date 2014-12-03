/**
 * Created by Jerrod Hart
 * Summary:  To utilize jqModal in a more user friendly way
 * Date: 2.24.14
 * Go-live: 3.20.14
 * Rev.1
 *    Date:3.27.14
 *    Summary: Added FancyBox Modal support for BP
 * Rev.2
 *    Date: 4.11.14
 *    Summary: Add banner for mobile phone
 * Rev 3
 *    Date: 4.15.14
 *    Summary: Added BF welcome Mat override
 * Rev 4
 *    Date: 7.11.14
 *    Summary: Cheetah Mail CASL Links update
 *  */

function emailFlyover(options){
    var defaults = {
        isBrand:null,
        formURL:null,
        cookieDuration:14, //in days,
        modalDelay:1000,
        brandsURLS:{
            chicos:'//ebm.cheetahmail.com/r/regf2?a=0&aid=2078541674&n=502',
            soma:'//ebm.cheetahmail.com/r/regf2?a=0&aid=2083411311&n=602',
            whbm:'//ebm.cheetahmail.com/r/regf2?a=0&aid=2083411286&n=602'

        }, //BP excluded for now.  Using a custom link externally
        bfWlcmeOverride:true, //Contros Border Free Welcome Mat Override
        closeCSS: {
            background: 'url("/web_assets/skins/images/close.gif") no-repeat scroll center center transparent',
            cursor: 'pointer',
            display: 'block',
            height: '28px',
            marginRight: '33px',
            position: 'relative',
            top: '40px',
            width: '28px',
            zIndex: '2'
        },
        modalOptions:{
            defaultWidth:530,
            defaultHeight:500,
            padding:0,
            content:null,
            closeClass:'flyOverClose',
            closeClassCss:'',
            trackOpens:'Site-EmailFlyover-Open',
            trackClose:'Site-EmailFlyover-Close'
        },
        useFancyBoxModal:false, //if false, requires <scrip src="/web_assets/js/ui/jModal.1.0.js"></script>
        fancyBoxSel:'#hidden_link',
        fancyBoxOptions:{
            'width'			:	536,
            'height'		:	548,
            'padding'		:	0,
            'scrolling'		:	'no',
            'cyclic'		: 	true,
            'transitionIn'	:	'none',
            'speedIn'		:	600,
            'speedOut'		:	200,
            'overlayShow'	:	true,
            'overlayColor'	:	'#fff',
            'autoScale'     :   false,
            'type'          :   'iframe'
        },
        onFlyoverShow:function(){}
    }

    var opts = $.extend(true,{}, defaults,options);


    //Set Form URL
    $.each(opts.brandsURLS,function(k,v){
        if(new RegExp(k,"i").test(s_account)){
            opts.isBrand = k, opts.formURL=v;
            if(k=='chicos'){
                opts.modalOptions.defaultWidth = '640';
                //opts.modalOptions.overlayClass = 'jqmOverlay_white'
            }
            if(k=='soma'){
                opts.modalOptions.defaultWidth = '468';
                opts.modalOptions.closeClassCss = null;
            }
            if(k=='whbm'){
                opts.closeCSS.marginRight ='10px';
                opts.modalOptions.defaultWidth = '540';
                opts.closeCSS.background = 'none';

            }

        }
    })

    var width = opts.modalOptions.defaultWidth;
    var height = opts.modalOptions.defaultHeight;

    //iPad Detect
    //function isiPad(){return ((navigator.platform.indexOf("iPhone") != -1) ||(navigator.platform.indexOf("iPod") != -1) ||(navigator.platform.indexOf("iPad") != -1));}
    function isiPad(){return ((navigator.platform.indexOf("iPad") != -1));}
    //$.getScript('/web_assets/js/ui/jModal.1.0.js',function(){
    $(function(){

        //////////DEBUG////////////
        // $.cookie('wlcme',true,{expires:0,path:'/'})
        //console.log('WELCOME MAT')
        //////////DEBUG////////////


        var URL = String(window.location.href);
        var cookieDuration = (URL.indexOf('://atgstg.')>-1||URL.indexOf('://delta.')>-1)?3650:14; //If stage site 3yr cookie else 14 day cookie

        //Check Cookies
        var isCurrentCustomer = false;
        var cookie_autoForm = $.cookie('autoForm');
        var isHTTPS = (window.location.href.indexOf('https')>-1)?true:false;
        var isMobileSite = (isiPad())?false:(window.location.href.indexOf('http://m.') ==0 || window.location.href.indexOf('https://m.')==0 || window.location.href.indexOf('mstage')>-1 && !isiPad())?true:false;
        var isCheckoutPage = (window.location.href.indexOf('/store/checkout') >-1)?true:false;
        var isAccountPage = (window.location.href.indexOf('/store/wish_list/wish_list.jsp') >-1 || window.location.href.indexOf('/store/checkout/orderstatuscheck.jsp')>-1)?true:false;
        var isFromEmail = (window.location.href.indexOf('sourceid=EMC')>-1)?true:false;
        var siteCookies = ['TRACK_LOYALTY_ID', 'TRACK_LOYALTY_STATUS','JSESSIONID','DYN_USER_ID','DYN_USER_CONFIRM'];
        var customerCookies = [siteCookies[0],siteCookies[1]]
        //Border Free Vars
        var isBFwlcmeMat = $.cookie('wlcme');
        var isBFwlcmeModal = $('#tinybox').is(':visible');


        //Main Start
        var isCurrentCustomer_check = function(){
            var tracker = 0;
            for(var i=0,length=customerCookies.length;i<length;i++){
                if($.cookie(customerCookies[i]) != null){
                    tracker++;
                    if(tracker == customerCookies.length){
                        //Brand Customer
                        isCurrentCustomer = true;
                    }
                }

            }
        }
        //Function Calls
        isCurrentCustomer_check()
        var webBrand = function(){
            var brands = ['chicos','soma','whbm'];
            for(var i = 0, length = brands.length; i<length;i++){
                var patt = new RegExp(brands[i], 'g')
                if(patt.test(s_account)){
                    return brands[i];
                }else{
                    return false;
                }
            }
        };

        var createAutoFormCookie = function(){
            //Created when Auto Email Modal is automatically invoked or if requirements check fails. Create 1 year cookie
            $.cookie('autoForm',true,{'expires':cookieDuration,path: '/'});
        }




        // $(function(){
        //Border Free Session Check
        if(!isBFwlcmeMat  && opts.bfWlcmeOverride && !isBFwlcmeModal){
            var displayFlyover = function(){return (!isCurrentCustomer && !isHTTPS && !isFromEmail && !isAccountPage && !isCheckoutPage)?true:false;}
            //Requirements check: If not current customer, from email link, or on secure https page
            if(cookie_autoForm == null){
                if(displayFlyover()){
                    if(!isMobileSite){
                        var emailFrame = '<iframe id="autoRegister-iframe"  allowTransparency="true" style="position: relative; background-color:transparent;" src="'+opts.formURL+'" width="'+width+'" height="'+height+'" frameborder="0"  scrolling="no"></iframe>'
                        if(opts.modalOptions.content==null){
                            opts.modalOptions.content = emailFrame;
                        }


                        if(!opts.useFancyBoxModal){
                            //$.getScript('/web_assets/js/ui/jModal.1.0.js',function(){

                            opts.modalOptions.closeClass = 'modalClose';


                            if(opts.isBrand == 'soma'){
                                opts.modalOptions.closeClassCss = null;
                            }else{
                                opts.modalOptions.closeClassCss = opts.closeCSS;
                            }

                            //$.getScript('/web_assets/js/ui/jModal.1.0.js',function(){
                            //Disable autoCenter on iPad
                            if(isiPad())opts.modalOptions.autoCenter=false;

                            var autoForm =new jModal(opts.modalOptions);
                            setTimeout(function() {
                                autoForm.show();
                                if(opts.isBrand=='whbm'){
                                    opts.closeCSS.marginRight ='10px';
                                    $('#jModal .modalControls td, #jModal table').attr('style','background-color:transparent !important;');
                                    if(isiPad()){
                                        opts.closeCSS.marginRight = 'none';
                                        opts.closeCSS.left = 'none';
                                        $('#jModal').css('top','10%');
                                        $('#jModal .modalClose').css('opacity',0);
                                        $('#jModal .modalCaption').css('display','none');

                                    }
                                }


                                if(opts.isBrand == 'chicos'){
                                 //$('.jqmOverlay_white').css('backgroundColor','#FFF')
                                    if(isiPad()){
                                        $('#jModal').attr('style','width:640px !important; left:50% !important; margin-left:-320px !important; display:block; z-index:3000 !important;')
                                        //$('#jModal .modalClose').css('right','100px');
                                    }
                                 }
                            }, opts.modalDelay); //modal pops up after timer delay
                            //});
                            // });


                        }else{
                            opts.modalOptions.closeClassCss = defaults.closeCSS;
                            opts.fancyBoxOptions.onComplete=function(){
                                if(opts.trackOpens!=null){var s=s_gi(s_account); s.tl(this,'o',opts.trackOpens);}
                            }
                            opts.fancyBoxOptions.onClosed=function(){
                                if(opts.trackClose!=null){var s=s_gi(s_account);s.tl(this,'o',opts.trackClose);}
                            }

                            setTimeout(function(){
                                $(opts.fancyBoxSel).fancybox(opts.fancyBoxOptions).click();
                            }, opts.modalDelay); //modal pops up after timer delay
                        }
                        opts.onFlyoverShow();
                        createAutoFormCookie();
                    }else if(opts.isBrand!=null){
                        //ENABLE FOR MOBILE on PAHSE 2 Go-Live: CHS, SOMA, AND WHBM Only
                        var mobileTemplate = '<div id="emailFlyover_mobile"><a href="'+opts.formURL+'" target="_blank"><img src="//www.'+opts.isBrand+'.com/web_assets/mobile/emailSignup_mobile.gif" border="0" width="100%"></a></div>';
                        $('#header').append(mobileTemplate);
                        createAutoFormCookie();
                    }

                }else{
                    createAutoFormCookie();
                }
            }
        }
    })
    // })
    //})
}

//Init Function
$(function(){
    if(typeof emailFlyoverOptions == 'undefined'){
        emailFlyoverOptions = '';
    }
    emailFlyover(emailFlyoverOptions);
});
