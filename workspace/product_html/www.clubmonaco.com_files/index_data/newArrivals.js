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
            window.open('http://www.clubmonaco.com/category/index.jsp?categoryId=45122706','_parent')
        });
      
        $('#flyoutSlide2').on( "click", function() {
            window.open('http://www.clubmonaco.com/family/index.jsp?categoryId=45122816','_parent')
        });
      
    }
};


/* ******************** ------------------------- DOM READY ------------------------- ******************** */

$(function () {

    naFlyoutFeature.Init();

}); 