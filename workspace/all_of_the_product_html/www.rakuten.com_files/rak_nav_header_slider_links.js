    //set akamai image path for secure and non-secure
if (location.href.indexOf("https://") != -1) {
    var akPath = "https://ast1.r10.io/buy_assets";
} else {
var akPath = "http://ast1.r10.io/buy_assets";
}
//set random number for rotating promos
rnd.today = new Date();
rnd.seed = rnd.today.getTime();

function rnd() {
    rnd.seed = (rnd.seed * 9301 + 49297) % 233280;
    return rnd.seed / (233280.0);
};

function rand(number) {
    return Math.ceil(rnd() * number);
};


var buyHeaderNum = rand(2);

if (buyHeaderNum == 1) {
    var header_slider_items =
    [
        { href: "https://secure.rakuten.com/ac/Rakutencard.aspx?sub_agent_code=011&omadtrack=RakutenCard_wb_011", src: akPath + "/images/promotions/header_promo14.png", onclick: "header_slider_rakcard" },
        { href: "http://sellonrakuten.com/\" target=\"_blank", src: akPath + "/images/promotions/header_promo1.png", onclick: "header_slider_SellMP" },
		{ href: "http://www.rakuten.com/essential?omadtrack=essential_rotating", src: akPath + "/images/promotions/header_promo11.png", onclick: "header_slider_essential" },
        { href: "http://www.rakuten.com/ct/Rakutensuperpoint/default.aspx", src: akPath + "/images/promotions/header_promo2.png", onclick: "header_slider_rsp" }
        //{ href: "http://www.rakuten.com/ct/aboutus.aspx", src: akPath + "/images/promotions/header_promo3.png", onclick: "header_slider_welcome" }
    ];
} else if (buyHeaderNum == 2) {
    var header_slider_items =
    [
        { href: "https://secure.rakuten.com/ac/Rakutencard.aspx?sub_agent_code=011&omadtrack=RakutenCard_wb_011", src: akPath + "/images/promotions/header_promo14.png", onclick: "header_slider_rakcard" },
        { href: "http://sellonrakuten.com/\" target=\"_blank", src: akPath + "/images/promotions/header_promo1.png", onclick: "header_slider_SellMP" },
		{ href: "http://www.rakuten.com/essential?omadtrack=essential_rotating", src: akPath + "/images/promotions/header_promo11.png", onclick: "header_slider_essential" },
		{ href: "http://www.rakuten.com/ct/Rakutensuperpoint/default.aspx", src: akPath + "/images/promotions/header_promo2.png", onclick: "header_slider_rsp" }
        //{ href: "http://www.rakuten.com/ct/aboutus.aspx", src: akPath + "/images/promotions/header_promo3.png", onclick: "header_slider_welcome" }
    ];
} else {
    var header_slider_items =
    [
        { href: "https://secure.rakuten.com/ac/Rakutencard.aspx?sub_agent_code=011&omadtrack=RakutenCard_wb_011", src: akPath + "/images/promotions/header_promo14.png", onclick: "header_slider_rakcard" },
        { href: "http://sellonrakuten.com/\" target=\"_blank", src: akPath + "/images/promotions/header_promo1.png", onclick: "header_slider_SellMP" },
		{ href: "http://www.rakuten.com/essential?omadtrack=essential_rotating", src: akPath + "/images/promotions/header_promo11.png", onclick: "header_slider_essential" },
		{ href: "http://www.rakuten.com/ct/Rakutensuperpoint/default.aspx", src: akPath + "/images/promotions/header_promo2.png", onclick: "header_slider_rsp" }
        //{ href: "http://www.rakuten.com/ct/aboutus.aspx", src: akPath + "/images/promotions/header_promo3.png", onclick: "header_slider_welcome" }

    ];
}

