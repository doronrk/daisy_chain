var THSiteMessageBar = THSiteMessageBar ||
{
    construct:function()
    {
        THSiteMessageBar.$element=$(THSiteMessageBar.SELECTOR);
    },

    init:function()
    {
    	THSiteMessageBar.$element.children(THUtil.isOutlet() ? '.full' : '.outlet').remove();
        var $messages=THSiteMessageBar.$element.children();
        if($messages.length>1 && THSiteMessageBar._timeline==null)
        {
            THSiteMessageBar._timeline=new TimelineMax({repeat:-1});
            var length=$messages.length;
            var duration=1;
            var delay=5;
            $messages.each(function()
            {
                var $message=$(this);
                var $nextMessage=$message.index()+1<length ? $message.next() : $messages.first();
                THSiteMessageBar._timeline.to($message,duration/3*2,{autoAlpha:0,onComplete:function(){ $message.css('position','absolute'); $nextMessage.css('position','static'); }},'+='+delay);
                THSiteMessageBar._timeline.to($nextMessage,duration,{autoAlpha:1});
            });
        }
    },

    pause:function()
    {
        if(THSiteMessageBar._timeline) THSiteMessageBar._timeline.pause();
    },

    restart:function()
    {
        if(THSiteMessageBar._timeline) THSiteMessageBar._timeline.restart();
    },

    SELECTOR:'#siteMessageBar',
    $element:null,
    _timeline:null
};
