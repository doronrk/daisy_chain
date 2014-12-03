/* ******************** ------------------------- PAGE OBJECT ------------------------- ******************** */

var mensflyoutFeature = {

    // ---------- INITIALIZE ---------- //
    Init: function () {

        mensflyoutFeature.setEvents();

    },

    setEvents: function () {

    function randomNum(min,max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    var rnum = randomNum(1,2);
    var presrc = "img/image-";

    $("img").attr('src', presrc + rnum + '.jpg');

    if(rnum == 1){
       $('#slideText h3').append('Women&#146;s New Arrivals'); 
       $('#slideText .text').append('Warming Trend');
       $('#flyoutSlide').on( "click", function() {
            window.open('http://www.clubmonaco.com/family/index.jsp?categoryId=23316166','_parent')
        });
    } else if (rnum == 2){
       $('#slideText h3').append('The Party Shop'); 
       $('#slideText .text').append('Looks for every event of the season.');
       $('#flyoutSlide').on( "click", function() {
            window.open('http://www.clubmonaco.com/family/index.jsp?categoryId=52327796','_parent')
        });
    }
    
    }
};


/* ******************** ------------------------- DOM READY ------------------------- ******************** */

$(function () {

    mensflyoutFeature.Init();

}); 