//
//  Tab Shopping when used on pages with tabshopping.htm, and widget/tabshopping.css   
//
$(document).ready(function(){
    $('#main .tabshopping .tabs div').hide();                          // Hide all divs
    $('#main .tabshopping .tabs div:first').show();                    // Show the first div
    $('#main .tabshopping .tabs div:first div').show();                // Show the div's of the first div
    $('#main .tabshopping .tabs .menu li:first').addClass('active first');      // Set the class of the first link to active
    $('#main .tabshopping .tabs .menu li:last').addClass('last');
    $('#main .tabshopping .tabs .menu li a').click(function(){            // When any tab anchor is clicked
        $('#main .tabshopping .tabs ul li').removeClass('active');             // Remove active class from all links
        $(this).parent().addClass('active');                             // Set clicked link class to active
        var currentTab = $(this).attr('href');                           // Set variable currentTab to value of href attribute of clicked link
        $('#main .tabshopping .tabs div').hide();                              // Hide all divs
        $(currentTab + '.tab div').show();                                   // Show all contained divs within the currentTab
        $(currentTab).fadeIn('slow');                                    // Show the tab div with id equal to variable currentTab		
        return false;
    });
    
});



//
//  Staff Advice - Head Link, fix bug 16604 , change as tom give
//   
$(document).ready(function() {
    $('.accordian .article .trigger').click(function(event) {
        $(this).closest('.accordian').toggleClass('openned')             // add/remove 'openned' css class to the current element being clicked
        .find('.contents:not(span)').animate({ height: 'toggle', opacity:'toggle' }, 'slow');             // slowly expose the contents of the next element
        event.preventDefault();// return false;                               // return false so nothing hides when an element is clicked
    }).next().hide();                               // start off by hiding everything
});
