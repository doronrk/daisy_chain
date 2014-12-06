/**
 * Created by Jerrod Hart
 * Summary:  To utilize jqModal in a more user friendly way
 * Date: 2.24.13
 */

var jModal = function(settings){
    //Options: overlay,ajaxText,target
    var _this = this;
    var defaults = {
        modalId:"jModal",
        //ajax: '@href',
        title: '@title',
        closeClass:'modalClose',
        closeClassCss:null,
        closeHTML:'',
        trigger: '.jModalTrigger',
        defaultWidth:'700',
        defaultHeight:'700',
        padding:30,
        autoCenter:true,
        contentCss:{overflow:'hidden',backgroundColor:'transparent'},
        template:'register',
        content:null,
        trackOpens:null,
        trackClose:null

    };

    var opts = $.extend(defaults,settings);
    var user_onShow = (typeof opts.onShow == 'function')?opts.onShow:false;
    var user_onHide = (typeof opts.onHide == 'function')?opts.onHide:false;

    var modalTemplate = '<div id="'+opts.modalId+'" class="modalWindow">'+
        '<table border="0" cellspacing="0" cellpadding="0"><tr class="modalControls"><td class="modalCaption"></td> <td align="right"><a class="'+opts.closeClass+'"></a></td></tr><tr>'+
        '<td colspan="2"><div class="modalContent" style="padding: 0 !important;"></div></td></tr></table> </div>';
    $('body').append(modalTemplate)

    $('body #'+opts.modalId+' .modalContent').css(opts.contentCss);
    if(opts.closeClassCss != null){$('body #'+opts.modalId+' .'+opts.closeClass).css(opts.closeClassCss)};


    var $modalObj =  $('#'+opts.modalId);


    var modalShow = function(hash){
        //Center
        if(opts.autoCenter) hash.w.css({marginLeft:'50%','left':'-'+hash.c.defaultWidth/2+'px'});

        if(typeof opts.content == 'string'){
            $modalObj.find('.modalContent').html(opts.content);
            opts.ajax = '';
        }else if(typeof opts.content == 'object'){
            opts.ajax = '';
            $modalObj.find('.modalContent').html(opts.content.html());
        }
        //  $modalObj.find('.modalContent').append('<div id="submitTracker"></div>')

        if(user_onShow){
            user_onShow();
        }
        if(opts.trackOpens!=null){
            var s=s_gi(s_account);
            s.tl(this,'o',opts.trackOpens);
        }
        hash.w.show();
    };
    var modalHide = function(hash){
        hash.w.hide();
        hash.o.remove();

        //Animation
        // hash.w.fadeOut('2000');
        // hash.o.fadeOut('2000',function(){ hash.o.remove(); });
        if(user_onHide){
            user_onHide();
        }
        if(opts.trackClose!=null){
            var s=s_gi(s_account);
            s.tl(this,'o',opts.trackClose);
        }
        hash.w.hide();
    };
    // _this.autoShow()

    //Actions
    opts.onShow = modalShow;
    opts.onHide = modalHide;
    /*$(opts.trigger).click(function(){
     _this.show();
     });*/
    $('.modalClose').click(function(){
        $modalObj.jqmHide();
    });
    //Init Modal
    (opts.modalId != 'jModal')?opts.ajax = '':'';

    $modalObj.jqm(opts);

    //Methods
    _this.show  = function(){
        $modalObj.jqmShow();
    };
    _this.hide  = function(){
        $modalObj.jqmHide();
    };
}