var getElementsByClassName = function (classname, node, tag) {
            var elems = [], rtnTags = [], len, n;
            // use the browser DOM method
            if (document.getElementsByClassName) {
            // if (false) {
                elems = node ? node.getElementsByClassName(classname) : document.getElementsByClassName(classname);
                // limit to requested tag
                if (tag) {
                    tag = tag.toUpperCase();
                    for (n = 0, len = elems.length; n < len; n++) {
                        if (tag === elems[n].nodeName) {
                            rtnTags.push(elems[n]);
                            // note: while rtnTags has array methods such as splice, sadly, tags does not.
                        }
                    }
                }
                else {
                    rtnTags = elems;
                }
            }
            // use work-around
            else {
                elems = tag ? (node ? node.getElementsByTagName(tag) : document.getElementsByTagName(tag)) :
                    (node ? node.getElementsByTagName("*") : document.getElementsByTagName("*"));
                var classNames = classname.split(" "),
                    cnLen = classNames.length,
                    cnStart = cnLen,
                    cnTrue,
                    patt = [];
                for (n = 0; n < cnLen; n++) {
                    patt.push(new RegExp("(^|\\s)" + classNames[n] + "(\\s|$)"));
                }
                for (n = 0, len = elems.length; n < len; n++) {
                    cnLen = cnStart;
                    if (cnLen === 1) {
                        if (patt[0].test(elems[n].className)) {
                            rtnTags.push(elems[n]);
                        }
                    }
                    else {
                        cnTrue = 0;
                        while (--cnLen > -1) {
                            if (patt[cnLen].test(elems[n].className)) {
                                ++cnTrue;
                            }
                        }
                        if (cnTrue === cnStart) {
                            rtnTags.push(elems[n]);
                        }
                    }
                }
            }
            return rtnTags;
        };
 var products = getElementsByClassName("carttext colors_productname");
 for(var i = 0; i < products.length; i++)
	if(products[i].innerHTML.indexOf("Shoei") > -1 || products[i].innerHTML.indexOf("Oakley") > -1)
		{
			products[i].innerHTML += "<b>NOT AVAILABLE FOR INTERNATIONAL SHIPMENT</b><br />";
		}
 
products = document.getElementById("span_Shopping_Cart_UnEditable");
if(products != null)
{
    var rows = products.getElementsByTagName('td');
    for(var i = 0; i < rows.length; i++)
        if(rows[i].innerHTML.indexOf("Shoei") > -1 || rows[i].innerHTML.indexOf("Oakley") > -1)
            rows[i].innerHTML += "<br /><b>NOT AVAILABLE FOR INTERNATIONAL SHIPMENT</b>";
}