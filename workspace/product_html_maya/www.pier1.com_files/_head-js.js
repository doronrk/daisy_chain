if (window.location.pathname.indexOf('Default-Start') > -1 || window.location.pathname == '/' || window.location.pathname.indexOf('Home-Show') > -1 ) {
  if ( window.location.hash.indexOf('findastore') > -1 ) {
     window.location.hash = window.location.hash.replace('findastore','');
     document.location.replace('/on/demandware.store/Sites-pier1_us-Site/default/Stores-FindFromNav' + document.location.search);
  }
}

$(document).ready(function(){
    //FIX for promo tooltips on mobile
    if ( app.customer.device == 'tablet' || app.customer.device == 'mobile') {
      $(document).on('click', '.tooltip-mobile', function () {
         var $that = $(this),
                content = $that.children('.tooltip-content').html();

        $('<div>' + content + '</div>').dialog({ 
          title: 'Details', 
          width: '400px', 
          height: '200px', 
          close: function () { 
            $that.dialog('destroy'); 
          } 
        });
      });   
    }
    //FIX for dialogs in promotions
       $('body').on('click', '.dialog-trigger', function(e){
          e.preventDefault();
          var $this = $(this),
                  $dialogElem = $($this.attr('data-dialog')),
                  content = $dialogElem.html();
          if ( !$dialogElem.length || !content ) return;

          // s.events='event98'; 
          // s.linkTrackEvents= 'event98';
          // s.tl(true,'o','Popup Modal');

          if ( app.customer.device == 'tablet' || app.customer.device == 'mobile') {
            $('<div>' + content + '</div>').dialog({ 
              title: $this.attr('data-dialog-title') || 'Details', 
              width: $this.attr('data-dialog-width') || '400px', 
              height: $this.attr('data-dialog-height') || '200px', 
              close: function () { 
                $this.dialog('destroy'); 
              } 
            });
          } else {
            $dialogElem.dialog({ 
              width: $this.attr('data-dialog-width') || 650, 
              height: $this.attr('data-dialog-height') || 'auto', 
              modal: true 
            });
          }
       });
  });
