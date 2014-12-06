function isImageOk(img) { if (!img.complete) { return false; } if (typeof img.naturalWidth != 'undefined' && img.naturalWidth == 0) { return false; } return true; }
var oiq_b = document.getElementsByTagName("body")[0];
if (typeof oiq_b != 'undefined') {var oiq_f = document.createDocumentFragment();
oiq_img_loaded = false;
var oiq_i_0 = document.createElement("img");
oiq_i_0.setAttribute("src", "http://px.owneriq.net/ep?sid%5B%5D=3401778799&sid%5B%5D=3401778809&sid%5B%5D=3401778814&sid%5B%5D=16323322&sid%5B%5D=16323327&pt=ge");
oiq_i_0.setAttribute("width", "1");
oiq_i_0.setAttribute("height", "1");
oiq_i_0.setAttribute("style", "display:none");
oiq_f.appendChild(oiq_i_0);
oiq_b.appendChild(oiq_f);
function oiq_check_images() {
if (isImageOk(oiq_i_0)) { oiq_img_loaded = true; }
}
var oiq_int = setInterval(oiq_check_images, 50);
setTimeout(function() { clearInterval(oiq_int); },1900);
}
