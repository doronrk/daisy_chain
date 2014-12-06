// JavaScript Document
$(document).ready(function(){
var Tabs = can.Control.extend({
    // initialize widget
    init: function( el ) {
      
      // activate the first tab
      $( el ).children( 'li:first' ).addClass( 'active' );
      
      // hide the other tabs
      var tab = this.tab;
      this.element.children( 'li:gt(0)' ).each(function() {
        tab( $( this ) ).addClass('out_of_the_scene');
      });
    },
    
    // helper function finds the tab for a given li
    tab: function( li ) {
      return $( li.find( 'a' ).attr( 'href' ) );
    },
    
    // hides old active tab, shows new one
    'li click': function( el, ev ) {
      ev.preventDefault();
      this.tab( this.element.find( '.active' )
                    .removeClass( 'active' ) ).addClass('out_of_the_scene');
					
      this.tab( el.addClass( 'active' ) ).removeClass('out_of_the_scene');
	 
	  //updates mobile dropown	  	  
	  $("#native_dropdown").data("selectBox-selectBoxIt").selectOption(el.find( 'a' ).attr( 'href' ));
    }
  });
  
  // adds the controller to the element
  new Tabs( '#tabs' );
  new Tabs( '#tabs1' );
  new Tabs( '#tabs2' );
  new Tabs( '#tabs3' );

  
// Mobile select dropdown  
setTimeout(function(){ 
$("select#native_dropdown").selectBoxIt({ autoWidth: false });
},8000);

$('select#native_dropdown').change(function() {
		
if(this.value.indexOf("#tab_") == 0){ 		
  $('[id^=tab_]').addClass('out_of_the_scene');
  $('#tabs').children().removeClass('active');
  $('#tabs li a[href='+ this.value +']').closest('li').addClass('active');
  $(this.value).removeClass('out_of_the_scene');
  }
  else {
	window.location = this.value;	
  }
  
});  
  
  
  
});