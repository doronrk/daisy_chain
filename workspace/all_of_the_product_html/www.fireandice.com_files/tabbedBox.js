var currentTab = 0; // Set to a different number to start on a different tab.

function openTab(clickedTab) {
   var thisTab = $(".tabbed-box .tabsBox a").index(clickedTab);

  
   $(".tabbed-box .tabsBox li").removeClass("active");
   $(".tabbed-box .tabsBox li:eq("+thisTab+")").addClass("active");
   $(".tabbed-box .tabbed-content").hide();
   $(".tabbed-box .tabbed-content:eq("+thisTab+")").show();
   currentTab = thisTab;
}

$(document).ready(function() {
   // $(".tabsBox li:eq(0) a").css("border-left", "none");

   $(".tabbed-box .tabsBox li a").click(function() { 
      openTab($(this)); return false; 
   });

   $(".tabbed-box .tabsBox li a:eq("+currentTab+")").click()
});
