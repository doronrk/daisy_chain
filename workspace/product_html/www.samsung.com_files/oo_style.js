/* OnlineOpinion dynamically created CSS */

/* Define Paths to Image Assets */
var
  pathToAssets = '/us/onlineopinionV5/',
  bar_gif = pathToAssets + 'oo_bar_icon.gif',
  float_gif = pathToAssets + 'oo_float_icon.gif',
  inline_gif = pathToAssets + 'oo_icon.gif',
  inv_png= pathToAssets + 'oo_inv_opinonlab.png',
  inv_png2x = pathToAssets + 'oo_inv_opinionlab@2x.png',
  loading_gif = pathToAssets + 'oo_loading.gif',
  tab_1_gif = pathToAssets + 'oo_tab_icon_1.gif',
  tab_gif = pathToAssets + 'oo_tab_icon_fff.gif',
  tab_png = pathToAssets + 'oo_tab_fff.png',
  tabie_png = pathToAssets + 'oo_tabie6.png';

/* Create and Append Style Element */
var css = document.createElement("style");
css.setAttribute('type', 'text/css');
document.getElementsByTagName('head')[0].appendChild(css);

cssText = "#oo_feedback_fl_spacer { display:     block; height: 1px; position: absolute; top: 0; width: 100px; }";

cssText += "#oo_company_logo img { max-height: 100%; max-width: 100%; height: auto; width: auto\9; /* ie8 */ }";

cssText += "\n.oo_feedback_float { width: 100px; height: 50px; overflow: hidden; font: 12px Tahoma, Arial, Helvetica, sans-serif; text-align: center; color: #252525; cursor: pointer; z-index: 999997; position: fixed; bottom: 5px; border: 1px solid #cccccc; border-radius: 9px; -moz-border-radius: 9px; -webkit-border-radius: 9px; right: 10px; -webkit-transition: -webkit-transform 0.3s ease; }";
cssText += "\n.oo_feedback_float .screen_reader { color: transparent; display: block; position: relative; height: 0; width: 0; line-height: 0; overflow: hidden; }";
cssText += "\n.oo_feedback_float .olUp { width: 100%; height: 100%; background: url(" + float_gif + ") center 10px no-repeat; text-align: center; padding: 31px 0 5px 0; position: relative; z-index: 2; filter: alpha(opacity=100); opacity: 1; transition: opacity 0.5s; -moz-transition: opacity 0.5s; -webkit-transition: opacity 0.5s; -o-transition: opacity 0.5s; }";
cssText += "\n.oo_feedback_float .olUp img { margin-bottom: 5px; }";
cssText += "\n.oo_feedback_float .oo_transparent { display: block; background: white; position: absolute; top: 0; left: 0; height: 100%; width: 100%; z-index: 1; opacity: 0.8; filter: alpha(opacity=80); border-radius: 8px; -moz-border-radius: 8px; -webkit-border-radius: 8px; }";
cssText += "\n.oo_feedback_float:hover .oo_transparent { opacity: 1.0; filter: alpha(opacity=100); }";
cssText += "\n.oo_feedback_float:hover .olUp { display: block; opacity: 0; filter: alpha(opacity=0); }";
cssText += "\n.oo_feedback_float .fbText { display: block; }";
cssText += "\n.oo_feedback_float .olOver { display: block; height: 100%; width: 100%; position: absolute; top: 0; left: 0; min-height: 50px; z-index: 2; opacity: 0; filter: alpha(opacity=0); transition: opacity 0.5s; -moz-transition: opacity 0.5s; -webkit-transition: opacity 0.5s; -o-transition: opacity 0.5s; }";
cssText += "\n.oo_feedback_float .olOver span { display: block; padding: 10px 5px; }";
cssText += "\n.oo_feedback_float:hover .olOver { opacity: 1.0; filter: alpha(opacity=100); top: 0; }";

cssText += "\n.oo_cc_wrapper { left: 0; padding: 0; position: fixed; text-align: center; top: 25px; width: 100%; z-index: 999999; }";
cssText += "\n.oo_cc_wrapper .screen_reader { color: transparent; display: block; position: relative; height: 0; width: 0; line-height: 0; overflow: hidden; }";
cssText += "\n.oo_cc_wrapper span { width: 100%; height: 100%; position: absolute; left: 0; top: 0; z-index: 1; }";
cssText += "\n.oo_cc_wrapper .iwrapper { background-color: white; margin: 0 auto; position: relative; width: 535px; z-index: 2; box-shadow: rgba(0, 0, 0, 0.6) 0 0 15px; -webkit-box-shadow: rgba(0, 0, 0, 0.6) 0 0 15px; -moz-box-shadow: rgba(0, 0, 0, 0.6) 0 0 15px; border-radius: 9px; -moz-border-radius: 9px; -webkit-border-radius: 9px; }";
cssText += "\n.oo_cc_wrapper iframe { position: relative; border: none; width: 100%; z-index: 4; }";
cssText += "\n.oo_cc_wrapper .oo_cc_close { position: absolute; display: block; background: white; height: 20px; width: 20px; border: 1px solid #cccccc; cursor: pointer; right: -12px; top: -9px; border-radius: 5px; -moz-border-radius: 5px; -webkit-border-radius: 5px; transition: background 0.5s; -moz-transition: background 0.5s; -webkit-transition: background 0.5s; -o-transition: background 0.5s; font: 14px/20px Tahoma, Arial, Helvetica, sans-serif; text-align: center; z-index: 5; color: #252525; text-decoration: none; }";
cssText += "\n.oo_cc_wrapper .oo_cc_close:hover { background: #eeeeee; }";

cssText += "\n.oo_bar { padding-bottom: 22px; }";

cssText += "\n#oo_bar { cursor: pointer; color: #252525; border-top: 1px solid #cccccc; background: #ffffff; bottom: 0; display: block; font: 12px Tahoma, Arial, Helvetica, sans-serif; height: 22px; left: 0; line-height: 22px; position: fixed; text-align: left; width: 100%; z-index: 999997; -webkit-transition: -webkit-transform 0.3s ease; transition: background 0.5s; -moz-transition: background 0.5s; -webkit-transition: background 0.5s; -o-transition: background 0.5s; }";
cssText += "\n#oo_bar:hover { background: #eeeeee; }";
cssText += "\n#oo_bar .screen_reader { color: transparent; display: block; position: relative; height: 0; width: 0; line-height: 0; overflow: hidden; }";
cssText += "\n#oo_bar span { background: url(" + bar_gif + ") left no-repeat; display: block; margin: 0 15px; height: 100%; padding-left: 17px; }";

cssText += "\n#oo_tab { background-color: #1688dc; border: 1px solid #cccccc; display: block; position: fixed; top: 70%; padding: 55px 0px 55px 0px; _height: 110px; _padding: 0px; _top: 45%; width: 35px; z-index: 999995; cursor: pointer; }";
cssText += "\n#oo_tab span { bottom: 15px; _bottom: 5px; display: block; background: url(" + tab_gif + ") no-repeat; height: 9px; position: absolute; width: 9px; }";
cssText += "\n#oo_tab div { background-image: url(" + tab_png + "); _background-image: url(" + tabie_png + "); background-repeat: no-repeat; position: absolute; display: block; height: 100%; left: 0; top: 0; width: 100%; }";
cssText += "\n#oo_tab.wcag a { background: url(" + tab_gif + ") no-repeat; background-repeat: no-repeat; background-position: center bottom; border: none; outline: none; position: absolute; display: block; bottom: 15px; left: -6px; top: 0; width: 100%; }";
cssText += "\n#oo_tab.wcag img { border: none; outline: none; display: block; position: absolute; left: 0; top: -10px; }";
cssText += "\n#oo_tab .screen_reader { color: transparent; display: block; position: relative; height: 0; width: 0; line-height: 0; overflow: hidden; }";

cssText += "\n.oo_tab_left { left: -13px; border-radius: 0px 9px 9px 0px; -moz-border-radius: 0px 9px 9px 0px; -webkit-border-radius: 0px 9px 9px 0px; transition: left 0.5s; -moz-transition: left 0.5s; -webkit-transition: left 0.5s; -o-transition: left 0.5s; background-image: -webkit-gradient(linear, 0% 100%, 0% 0%, from(#eeeeee), to(white)); background-image: -webkit-linear-gradient(left, #eeeeee, white); background-image: -moz-linear-gradient(left, #eeeeee, white); background-image: -ms-linear-gradient(left, #eeeeee, white); background-image: -o-linear-gradient(left, #eeeeee, white); background-image: linear-gradient(left, #eeeeee, white); }";
cssText += "\n.oo_tab_left span { right: 6px; }";
cssText += "\n.oo_tab_left div { background-position: 6px -10px; }";
cssText += "\n.oo_tab_left:hover { left: -5px; }";

cssText += "\n.oo_tab_right { right: -13px; border-radius: 9px 0px 0px 9px; -moz-border-radius: 9px 0px 0px 9px; -webkit-border-radius: 9px 0px 0px 9px; transition: right .5s; -moz-transition: right .5s; -webkit-transition: right .5s; -o-transition: right .5s; }";
cssText += "\n.oo_tab_right span { left: 7px; }";
cssText += "\n.oo_tab_right div { background-position: -6px -10px; }";
cssText += "\n.oo_tab_right:hover { right: -5px; }";

cssText += "\n.oo_tab_ie_right { border-right: none !important; right: 1px; width: 25px !important; }";
cssText += "\n.oo_tab_ie_right:hover { right: 6px; width: 30px !important; }";

cssText += "\n.oo_tab_ie_right { border-right: none !important; right: 1px; width: 25px !important; }";
cssText += "\n.oo_tab_ie_right:hover { right: 6px; width: 30px !important; }";

cssText += "\n#oo_tab.oo_tab_ie67_right.wcag { overflow: hidden !important; right: 0px !important; width: 26px !important; }";
cssText += "\n#oo_tab.oo_tab_ie67_right.wcag:hover { right: 0px !important; width: 31px !important; }";
cssText += "\n#oo_tab.oo_tab_ie67_right.wcag a { background: none; z-index: 1; }";
cssText += "\n#oo_tab.oo_tab_ie67_right.wcag .screen_reader { bottom: 15px; display: block; background: url(" + tab_gif + ") no-repeat; height: 9px; width: 9px; position: absolute; left: 7px; top: auto; z-index: 9999; }";

cssText += "\n#oo_tab_1 { background-color: #f13f3c; border: 2px solid #ffffff; display: block; position: fixed; top: 40%; padding: 15px 0px 15px 0px; _height: 30px; _padding: 0px; _top: 45%; width: 105px; z-index: 999995; cursor: pointer; box-shadow: rgba(0, 0, 0, 0.7) 0 0 3px; -moz-box-shadow: rgba(0, 0, 0, 0.7) 0 0 3px; -webkit-box-shadow: rgba(0, 0, 0, 0.7) 0 0 3px; }";
cssText += "\n#oo_tab_1 span { bottom: 6px; display: block; background-image: url(" + tab_1_gif + "); height: 17px; position: absolute; width: 19px; }";
cssText += "\n#oo_tab_1 div { position: absolute; display: block; height: 100%; left: 0; top: 0; width: 100%; }";
cssText += "\n#oo_tab_1 .screen_reader { color: transparent; display: block; position: relative; height: 0; width: 0; line-height: 0; overflow: hidden; }";

cssText += "\n.oo_tab_right_1 { right: -75px; border-radius: 5px 0px 0px 5px; -moz-border-radius: 5px 0px 0px 5px; -webkit-border-radius: 5px 0px 0px 5px; transition: right 1.0s; -moz-transition: right 1.0s; -webkit-transition: right 1.0s; -o-transition: right 1.0s; background-image: -webkit-linear-gradient(top, #ee5853, #c73b32); background-image: -moz-linear-gradient(top, #ee5853, #c73b32); background-image: -ms-linear-gradient(top, #ee5853, #c73b32); background-image: -o-linear-gradient(top, #ee5853, #c73b32); background-image: linear-gradient(top, #ee5853, #c73b32); }";
cssText += "\n.oo_tab_right_1 span { left: 7px; }";
cssText += "\n.oo_tab_right_1:hover { right: -5px; }";

cssText += "\n.oo_tab_left_1 { left: -78px; border-radius: 0px 5px 5px 0px; -moz-border-radius: 0px 5px 5px 0px; -webkit-border-radius: 0px 5px 5px 0px; transition: left 0.5s; -moz-transition: left 1.0s; -webkit-transition: left 1.0s; -o-transition: left 1.0s; background-image: -webkit-linear-gradient(top, #ee5853, #c73b32); background-image: -moz-linear-gradient(top, #ee5853, #c73b32); background-image: -ms-linear-gradient(top, #ee5853, #c73b32); background-image: -o-linear-gradient(top, #ee5853, #c73b32); background-image: linear-gradient(top, #ee5853, #c73b32); }";
cssText += "\n.oo_tab_left_1 span { right: 6px; }";
cssText += "\n.oo_tab_left_1 div { background-position: 6px -10px; }";
cssText += "\n.oo_tab_left_1:hover { left: -5px; }";

cssText += "\na#oo_tab_text_1 { background-image: none; font-family: Tahoma, Helvetica, Arial, sans-serif; line-height: 16px; font-size: 16px; }";
cssText += "\na#oo_tab_text_1:hover { text-decoration: none; }";

cssText += "\na#oo_tab_text_1.right { color: white; position: absolute; top: 7px; left: 33px; }";

cssText += "\na#oo_tab_text_1.left { color: white; position: absolute; top: 7px; left: 10px; }";

cssText += "\n#oo_container { position: fixed; height: 100%; width: 100%; top: 0; left: 0; z-index: 999999; }";

cssText += "\nhtml body #oo_invitation_prompt { background: white; box-shadow: rgba(0, 0, 0, 0.6) 0 0 15px; -webkit-box-shadow: rgba(0, 0, 0, 0.6) 0 0 15px; -moz-box-shadow: rgba(0, 0, 0, 0.6) 0 0 15px; -webkit-box-shadow: rgba(0, 0, 0, 0.6) 0 0 8px; -moz-box-shadow: rgba(0, 0, 0, 0.6) 0 0 8px; border-radius: 9px; -moz-border-radius: 9px; -webkit-border-radius: 9px; color: #252525; font: 14px/20px Tahoma, Arial, san-serif; line-height: 20px; margin: 50px auto; text-align: left; padding: 20px 10px; position: relative; width: 350px; z-index: 999999; }";
cssText += "\nhtml body #oo_invitation_prompt h1 { font-size: 24px; font-weight: 100; margin-bottom: .6em; }";
cssText += "\nhtml body #oo_invitation_prompt p { margin-bottom: 1.5em; }";
cssText += "\nhtml body #oo_invitation_prompt #prompt_buttons { padding-bottom: 15px; position: relative; z-index: 5; }";
cssText += "\nhtml body #oo_invitation_prompt #oo_launch_prompt { text-decoration: none; color: white; border: 1px solid #006633; padding: 5px 11px; margin-right: 17px; }";
cssText += "\nhtml body #oo_invitation_prompt #oo_no_thanks { text-decoration: none; color: #252525; border: 1px solid #cccccc; padding: 5px 11px; margin-right: 18px; }";
cssText += "\nhtml body #oo_ol_brand { display: block; height: 22px; }";

cssText += "\n#oo_ol_brand { background: url(" + inv_png + ") bottom right no-repeat; border-top: 1px solid #cccccc; }";

cssText += "\n#oo_invitation_prompt_sub_header { padding-left: 5%; padding-right: 5%; }";

cssText += "\n#oo_header_pad { height: 9%; width: 100%; background: #EEEEEE; border-top-width: 1px; border-top-style: solid; border-bottom-width: 1px; border-bottom-style: solid; border-color: #CCCCCC; }";

cssText += "\n#oo_company_logo { width: 20%; height: 18%; margin-left: 5%; margin-top: 2%; padding-bottom: 1%; display: inline-block; *display: inline; zoom: 1; }";

cssText += "\n#oo_ol_brand { border-top: 1px solid #cccccc; }";
cssText += "\n#oo_ol_brand_logo { margin-top: 3%; margin-left: 4%; margin-right: 4%; display: inline-block; background: no-repeat url(oo_inv_opinionlab.png); width: 16%; height: 35px; }";

cssText += "\n#oo_invitation_prompt a { background: white; border-radius: 5px; -moz-border-radius: 5px; -webkit-border-radius: 5px; transition: background 0.5s; -moz-transition: background 0.5s; -webkit-transition: background 0.5s; -o-transition: background 0.5s; }";
cssText += "\n#oo_invitation_prompt a:hover { background: #eeeeee; }";

cssText += "\na#oo_launch_prompt { background: #006633; }";
cssText += "\na#oo_launch_prompt:hover { background: #009966; }";

cssText += "\n#oo_ol_brand_footer_text { padding-top: 5px; width: 44%; position: fixed; display: inline-block; font-size: 10px; }";
cssText += "\n#oo_ol_brand_footer_text a { color: #333333; background: #FFFFFF; }";
cssText += "\n#oo_ol_brand_footer_text a:hover { color: #333333; background: #FFFFFF; }";
cssText += "\n#oo_ol_brand_footer_text p { font-size: 10px; margin: 0; padding: 0;}";

cssText += "\n#oo_close_prompt { position: absolute; display: block; background: white; height: 20px; width: 20px; border: 1px solid #cccccc; cursor: pointer; right: 5px; top: 5px; border-radius: 5px; -moz-border-radius: 5px; -webkit-border-radius: 5px; transition: background 0.5s; -moz-transition: background 0.5s; -webkit-transition: background 0.5s; -o-transition: background 0.5s; font: 14px/20px Tahoma, Arial, Helvetica, sans-serif; text-align: center; }";
cssText += "\n#oo_close_prompt:hover { background: #eeeeee; }";
cssText += "\n#oo_close_prompt .screen_reader { color: transparent; display: block; position: relative; height: 0; width: 0; line-height: 0; overflow: hidden; }";

cssText += "\n#oo_overlay, #oo_invitation_overlay { background: black url(" + loading_gif + ") 50% 80px no-repeat; display: block; height: 1000%; left: 0; position: fixed; top: 0; width: 100%; z-index: 999998; opacity: 0.5; filter: alpha(opacity=50); }";
cssText += "\n#oo_overlay.no_loading, #oo_invitation_overlay.no_loading { background: black; opacity: 0.5; filter: alpha(opacity=50); }";
cssText += "\n@media print { #oo_bar, .oo_feedback_float, #oo_tab { display: none; } }";

cssText += "\n@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) { /* IE10+ specific styles go here */ #oo_tab { width: 50px; } #oo_tab div { left: 2px; } }"

/* Smartphones (portrait) ----------- */
cssText += "\n@media only screen and (max-device-width: 480px) { /* Styles */";
cssText += "\n  html body #oo_invitation_prompt { -webkit-text-size-adjust: none; box-sizing: border-box; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; width: 90%; padding: 3%; } }";
cssText += "\n@media all and (-webkit-min-device-pixel-ratio: 2) { #oo_ol_brand { background: url(" + inv_png2x + ") bottom right no-repeat; -webkit-background-size: 85px 13px; } }";

/* Detect if browser is IE */
if (navigator.appName && navigator.appName == 'Microsoft Internet Explorer'){
    css.styleSheet.cssText = cssText;
}else{
    css.innerHTML = cssText;
}