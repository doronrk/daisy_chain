/*
    ==============ROLLOVER.js========================
    contains a set of functions for changing button's images
    =================================================
*/

/*--- changes image source to *.*_on.gif --*/
function ImageOn(obj)
{
    var elem = obj.getElementsByTagName ('img');
    elem[0].src = elem[0].src.replace(/_off./, "_on.");
}

/*--- changes image source to *.*_off.gif --*/
function ImageOut(obj)
{
    var elem = obj.getElementsByTagName ('img');
    elem[0].src = elem[0].src.replace(/_on./, "_off.");
}

/*--- automatic caching button images on page load --*/
function InitImages ()
{
    var str = /._off\../;
    try
    {
        var elem = document.getElementsByTagName ('img');
        for(var i = 0; i < elem.length; i++)
        {
            if (str.test(elem[i].src))
            {
                var img = new Image();
                img.src = elem[i].src.replace(/_off./, "_on.");
            }
        }
    }
    catch (e) {}
}

/*--- old methods do not work, so here is new method --*/
function ImageSwap(obj, img)
{
	if (obj.type == 'image') {
		obj.src = img;
	} else {
		var elem = obj.getElementsByTagName ('img');
		elem[0].src = img;
	}
}