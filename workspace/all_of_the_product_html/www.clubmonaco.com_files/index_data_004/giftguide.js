/* ******************** ------------------------- PAGE OBJECT ------------------------- ******************** */

var naFlyoutFeature = {

    // ---------- INITIALIZE ---------- //
    Init: function () {

        // functions
        naFlyoutFeature.setEvents();

    },

    setEvents: function () {

        ///SET LINKS

        $('#flyoutSlide1').on( "click", function() {
            window.open('http://www.clubmonaco.com/category/index.jsp?categoryId=51253396','_parent')
        });
      
        $('#flyoutSlide2').on( "click", function() {
            window.open('http://www.clubmonaco.com/product/index.jsp?productId=12986914','_parent')
        });
      
    }
};


/* ******************** ------------------------- DOM READY ------------------------- ******************** */

$(function () {

    naFlyoutFeature.Init();

}); 