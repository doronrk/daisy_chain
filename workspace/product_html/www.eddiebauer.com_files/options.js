fb.options = {
//
// EDIT ONLY WITHIN THE FOUR OPTION BLOCKS BELOW.
// See the instructions for information about setting floatbox options.
// See the options reference for details about all the available options.
// Commas are required after each entry except the last entry in a block.
// A comma on the last entry in a block will cause the option settings to fail in some browsers.

// globalOptions is where you enter a license key and change default floatbox options site-wide.
// Use the configurator.html form in this folder to generate globalOptions preferences through form selections.

globalOptions: {
  // Paste your license key between the quotes below, or enter it in the configurator form.
  // (Separate multiple license keys with spaces or commas.)
  licenseKey: "0DEz5zAf1jYr4TIqN",
  colorTheme: "custom",
  shadowType: "none",
  contentRoundCorners: "none",
  boxRoundCorners: "none",
  floatboxClass: "naked",
  showOuterClose: true,
  showClose: false,
  panelPadding: 0,
  padding: 0,
  innerBorder: 0,
  outerBorder: 4,
  boxCornerRadius: 0
},

// Option settings can be assigned based on floatbox content type.
// The syntax of typeOptions is different than the object code above.
// Each type is assigned an option string formatted the same as
// the options placed in a link's data-fb-options (or rev) attribute.
// example - iframe: "colorTheme:blue showNewWindow:true",
// Javascript Object Notation can be used instead of the option string.

typeOptions: {
  image: "",
  // html settings apply to all 5 html sub-types that follow
  html: "",
    iframe: "",
    inline: "",
    ajax: "",
    direct: "",
    pdf: "width:80% height:95%",
  // media settings apply to the 2 sub-types as well
  media: "",
    video: "",
    flash: ""
},

// Settings can propogate to groups of anchors by assigning the anchors a class
// and associating that class name with a string or object of options here.
// The syntax is the same as for typeOptions above.

classOptions: {
  alt: {
    boxCornerRadius: 8,
    shadowType: "hybrid",
    showClose: false,
    showOuterClose: true,
    captionPos: "bc",
    caption2Pos: "tl",
    infoLinkPos: "tl",
    printLinkPos: "tl",
    newWindowLinkPos: "tl",
    controlsPos: "tr",
    centerNav: true
  },
  transparent: {
    boxColor: "transparent",
    contentBackgroundColor: "transparent",
    boxRoundCorners: "none",
    shadowType: "none",
    showOuterClose: true,
    showClose: false,
    overlayOpacity: 75,
    outerBorder: 2,
    innerBorder: 0,
    zoomBorder: 0
  },
  naked: {
    boxRoundCorners: "none",
    showOuterClose: true,
    showClose: false,
    inFrameResize: false,
    showItemNumber: false,
    navType: "overlay",
    caption: null,
    outerBorder: 0,
    innerBorder: 0,
    padding: 0,
    panelPadding: 0,
    zoomBorder: 0
  },
  childBox: {  // good for second boxes such as an Info... box
    boxCornerRadius: 6,
    shadowSize: 8,
    padding: 18,
    overlayOpacity: 45,
    resizeTime: 0.3,
    fadeTime: 0,
    transitionTime: 0.3,
    overlayFadeTime: 0.3
  },
  fbTooltip: {  // target enhanced tooltips with options set here
  },
  fbContext: {  // target context boxes with options set here
  }
},

// END OF EDITABLE CONTENT
// ***********************
ready: true};
