/*
----------------------------------------------------
|
| Simple collapse function
| by adding attribute data-action="accordion-trigger" to an element
| if will collapse/expand the next element
| this example will expand/collapse the div content :
|   <a href="#1" class="active" data-action="accordion-trigger"><span>Project How-To</span></a>
|   <div class="content">
|       <ul>
|           <li><a href="#1">This is the new entry thats pretty long</a></li>
|           <li><a href="#2">This is the new entry</a></li>
|           <li><a href="#2">This is the new entry</a></li>
|           <li><a href="#1">This is the new entry</a></li>
|           <li><a href="#2">This is the new entry</a></li>
|       </ul>
|   </div>
|
----------------------------------------------------
*/
var collapseFunction = function() {
    var $accordionTrigger = $('*[data-action="accordion-trigger"]');
    
    // Get Default settings
    $accordionTrigger.each(function(){
        var $this = $(this);
        
        if ($this.hasClass('active')){
            $this.append('<span class="accordion-notification">\u2013</span>');
        } else {
            $this.append('<span class="accordion-notification">+</span>');
        }
    });

    //click function
    $accordionTrigger.click(function(e) {
        var $this = $(this);

        //toggle section after trigger
        $this.next().slideToggle('125');
        // remove background images that dont hide with slide
        if ($this.next('i').length) {
            //$this.next('i').toggleClass('noBackground');
            $this.next('i').attr('style', 'background:none');
        }

        var $accordionNotification = $('.accordion-notification', this);

        if($this.hasClass('active')){
            $this.removeClass('active');
            $accordionNotification.text('+');
        } else {
            $accordionNotification.text('\u2013');
            $this.addClass('active');
        }

        e.preventDefault();
         // This function is only here for IE7 repaint issue
        if (navigator.appName === 'Microsoft Internet Explorer'){setTimeout(function(){$('.related-resource-accordion .content').toggleClass('ieRepaint')},500);}
    });
};

$(document).ready(function(){
    // run collapse function
    collapseFunction();
});