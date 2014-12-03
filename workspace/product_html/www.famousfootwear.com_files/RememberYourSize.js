var ResultsPageSizeDimensionListener = {
    initialize: function() {
        if (window.location.pathname.match(/Results.aspx/i) || window.location.pathname.match(/Product/i)) {
            //ResultsPageSizeDimensionListener.clearSizeWidthCookie();
            var sizeSelectorArray;
            var multiselect = false;
            var widthSelectorArray;

            //alert($('.size .sel a').length);
            if ($('.size .sel a').length) {
                // Here we know that we are in multiselect mode - lets see if there is more than one - if there is only one, we are going to try
                // to set the size to it.
                multiselect = true;
                sizeSelectorArray = $('.size .sel a');
            }
            else {
                // This is the single select control
                sizeSelectorArray = $('#sortbar-size select');
            }
            
            if ($('.widths .sel a').length) {
                // We are in multiselect mode
                multiselect = true;
                widthSelectorArray = $('.widths .sel a');
            }
            else {
                // This is the single select control
                widthSelectorArray = $('#sortbar-width select');
            }

            //var multiSelectSizeArray = $('.size .sel a');
            //var sizeSelectorArray = $('#sortbar-size select');			
            //var widthSelectorArray = $('#sortbar-width select');
            var colorSelectorArray = $('#sortbar-color select');
            var departmentLabelArray = $('div.nav-department div.nav-selected div');
            var categoryLabelArray = $('div.nav-category div.nav-selected div');

            //debugger;
            ResultsPageSizeDimensionListener.sizeValue = null;
            ResultsPageSizeDimensionListener.widthValue = null;
            ResultsPageSizeDimensionListener.colorValue = null;
            ResultsPageSizeDimensionListener.departmentValue = null;
            ResultsPageSizeDimensionListener.catergoryValue = null;

            ResultsPageSizeDimensionListener.nSizeValue = null;
            ResultsPageSizeDimensionListener.nWidthValue = null;
            ResultsPageSizeDimensionListener.nColorValue = null;
            ResultsPageSizeDimensionListener.nDepartmentValue = null;
            ResultsPageSizeDimensionListener.nCategoryValue = null;

            ResultsPageSizeDimensionListener.loadGenderSizeCookie();
            
            // if this is the search results page and the size dropdown exists
            if (sizeSelectorArray.length) {
                var sizeSelector = sizeSelectorArray[0];
                var widthSelector = widthSelectorArray[0];
                var colorSelector = colorSelectorArray[0];
                var departmentLabel = departmentLabelArray[0];
                var categoryLabel = categoryLabelArray[0];

                var department;
                var departmentNValueURL;
                if (departmentLabel) {
                    department = departmentLabel.innerHTML;
                    department = department.replace(/^\s+|\s+$/g, '');
                    departmentNValueURL = department;
                }

                var category;
                var categoryNValueURL;
                if (categoryLabel) {
                    category = $(categoryLabel).val();
                    category = category.replace(/^\s+|\s+$/g, '');
                    category = category.split('\n')[0]; //.match(/^[A-Za-z]+$/g);                    				    
                    categoryNValueURL = category;
                }

                var size;
                var sizeNValueURL;
                if (!multiselect) {
                    if ((sizeSelector) && (!$(sizeSelector).children()[0].value.match(/^Choose one$/))) {
                        size = sizeSelector.options[sizeSelector.selectedIndex].text;
                        sizeNValueURL = sizeSelector.options[sizeSelector.selectedIndex].value;
                    }
                }
                else {
                    //alert(sizeSelector.innerHTML);
                    if ((sizeSelector) && sizeSelector.innerHTML.length != null) {
                        size = sizeSelector.innerHTML;
                        sizeNValueURL = sizeSelector.href;
                    }
                }

                var width;
                var widthNValueURL;
                if (!multiselect) {
                    if ((widthSelector) && (!$(widthSelector).children()[0].value.match(/^Choose one$/))) {
                        width = widthSelector.options[widthSelector.selectedIndex].text;
                        widthNValueURL = widthSelector.options[widthSelector.selectedIndex].value;
                    }
                }
                else {
                    if ((widthSelector) && widthSelector.innerHTML.length) {
                        width = widthSelector.innerHTML;
                        widthNValueURL = widthSelector.href;
                    }
                }

                var color;
                var colorNValueURL;
                if ((colorSelector) && (!$(colorSelector).children()[0].value.match(/^Choose one$/))) {
                    color = colorSelector.options[colorSelector.selectedIndex].text;
                    colorNValueURL = colorSelector.options[colorSelector.selectedIndex].value;
                }

                //debugger;
                //Populat ResultsTopNav with cookie values, if the user did not just 
                //choose values from the Choose You Shoes control.
                if (!multiselect) {
                    if (($(sizeSelector).children()[0].value != "Choose One" && !$(sizeSelector).children()[0].value.match(/^Choose one$/) && !$(sizeSelector).children()[0].value == "")) {
                        ResultsPageSizeDimensionListener.dropSizeWidthCookie(size, width, color, department, category);
                        ResultsPageSizeDimensionListener.dropSizeWidthNValueCookie(sizeNValueURL, widthNValueURL, colorNValueURL, departmentNValueURL, categoryNValueURL);
                    }
                }
                else {
                    if (sizeSelector) {
                        ResultsPageSizeDimensionListener.dropSizeWidthCookie(size, width, color, department, category);
                        ResultsPageSizeDimensionListener.dropSizeWidthNValueCookie(sizeNValueURL, widthNValueURL, colorNValueURL, departmentNValueURL, categoryNValueURL);
                    }
                }
            }
        }
    },

    //Added for the ResultsTopNav population.
    loadGenderSizeCookie: function() {
        var start = document.cookie.indexOf('nSizeWidth=');
        if (start != -1) {
            var end = document.cookie.indexOf(';', start);
            var cookiedValue = document.cookie.substring(start, end);
            var cookiedValues = cookiedValue.replace('nSizeWidth=', '').split('|');

            ResultsPageSizeDimensionListener.nSizeValue = cookiedValues[0];
            ResultsPageSizeDimensionListener.nWidthValue = cookiedValues[1];
            ResultsPageSizeDimensionListener.nColorValue = cookiedValues[2];
            ResultsPageSizeDimensionListener.nDepartmentValue = cookiedValues[3];
            ResultsPageSizeDimensionListener.nCategoryValue = cookiedValues[4];
        }

        var start = document.cookie.indexOf('rysSizeWidth=');

        if (start != -1) {
            var end = document.cookie.indexOf(';', start);
            var cookiedValue = document.cookie.substring(start, end);
            var cookiedValues = cookiedValue.replace('rysSizeWidth=', '').split('|');

            ResultsPageSizeDimensionListener.sizeValue = cookiedValues[0];
            ResultsPageSizeDimensionListener.widthValue = cookiedValues[1];
            ResultsPageSizeDimensionListener.colorValue = cookiedValues[2];
            ResultsPageSizeDimensionListener.departmentValue = cookiedValues[3];
            ResultsPageSizeDimensionListener.categoryValue = cookiedValues[4];
        }

    },

    setCookie: function(c_name, value, expiredays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = c_name + "=" + value +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/";
    },
    //End Add

    clearSizeWidthCookie: function() {
        if (document.cookie.indexOf('rysSizeWidth=') != -1) {
            ResultsPageSizeDimensionListener.setCookie('rysSizeWidth', '', 30);
        }
    },

    dropSizeWidthCookie: function(size, width, color, department, category) {
        if (!size) return;
        if (size != undefined && size != null) {
            ResultsPageSizeDimensionListener.setCookie('rysSizeWidth', ((size) ? size : '') + '|' + ((width) ? width : '') + '|' + ((color) ? color : '') + '|' + ((department) ? department : '') + '|' + ((category) ? category : ''), 30);
        }
    },

    dropSizeWidthNValueCookie: function(sizeNValueURL, widthNValueURL, colorNValueURL, departmentNValueURL, categoryNValueURL) {
        if (!sizeNValueURL) return;
        if (sizeNValueURL != undefined && sizeNValueURL != null) {
            ResultsPageSizeDimensionListener.setCookie('nSizeWidth', ((sizeNValueURL) ? sizeNValueURL : '') + '|' + ((widthNValueURL) ? widthNValueURL : '') + '|' + ((colorNValueURL) ? colorNValueURL : '') + '|' + ((departmentNValueURL) ? departmentNValueURL : '') + '|' + ((categoryNValueURL) ? categoryNValueURL : ''), 30);
        }
    }
};

var ProductDetailsPageSizePreSelector = {
    initialize: function() {
        ProductDetailsPageSizePreSelector.sizeValue = null;
        ProductDetailsPageSizePreSelector.widthValue = null;
        ProductDetailsPageSizePreSelector.departmentValue = null;
        ProductDetailsPageSizePreSelector.colorValue = null;
        ProductDetailsPageSizePreSelector.categoryValue = null;

        ProductDetailsPageSizePreSelector.loadGenderSizeCookie();

        //alert(ProductDetailsPageSizePreSelector.sizeValue);
        
        var currentURL = window.location.toString();

        var departmentLabelArray = $('div.rightCol-top div.style-price h1');
        var departmentLabel = departmentLabelArray[0];
        var department;
        if (departmentLabel) {
            department = departmentLabel.innerHTML.replace(/^\s+|\s+$/g, '');
            if (department.indexOf("Men") > 0) {
                department = "Mens";
            } else if (department.indexOf("Women") > 0) {
                department = "Womens";
            } else if (currentURL.toLowerCase().indexOf("naturalizer") != -1) {
                department = "Womens";
            } else {
                department = "Kids";
            }
        }
        //if(window.location.pathname.match(/ProductDetails.aspx/i) && document.referrer.match(/Results.aspx/i) && ProductDetailsPageSizePreSelector.sizeValue) {
        if ((window.location.pathname.match(/Results.aspx/i) || window.location.pathname.match(/Product/i)) && ProductDetailsPageSizePreSelector.sizeValue) {
            if (ProductDetailsPageSizePreSelector.departmentValue == department || ((ProductDetailsPageSizePreSelector.departmentValue == "Boys" || ProductDetailsPageSizePreSelector.departmentValue == "Girls") && department == "Kids")) {
                ProductDetailsPageSizePreSelector.setProductDetailsSize();
            }
        }
    },

    abbreviateWidth: function() {
        var pattern;

        // is ugly because our application is so poorly cobbled together
        if (ProductDetailsPageSizePreSelector.departmentValue.match(/^Womens$/i)) {
            if (ProductDetailsPageSizePreSelector.widthValue.match(/^Extra Narrow/i) || ProductDetailsPageSizePreSelector.widthValue.match(/^X narrow/i)) {
                pattern = '\\b(4A|2S|Quad)\\b';
            }
            else if (ProductDetailsPageSizePreSelector.widthValue.match(/^Narrow/i)) {
                pattern = '\\b(3A|2A|N|Slim)\\b';
            }
            else if (ProductDetailsPageSizePreSelector.widthValue.match(/^Wide/i)) {
                pattern = '\\b(C|W)\\b';
            }
            else if (ProductDetailsPageSizePreSelector.widthValue.match(/^Extra Wide/i) || ProductDetailsPageSizePreSelector.widthValue.match(/^X wide/i)) {
                pattern = '\\b(D|2W|W)\\b';
            }
            else if (ProductDetailsPageSizePreSelector.widthValue.match(/^Extra Extra Wide/i) || ProductDetailsPageSizePreSelector.widthValue.match(/^XX wide/i)) {
                pattern = '\\b(E|2E|3E|4E|3W)\\b';
            }
            else { //if(ProductDetailsPageSizePreSelector.widthValue.match(/^Medium/i)) {
                pattern = '\\b(B|M)\\b';
            }
        }
        else if (ProductDetailsPageSizePreSelector.departmentValue.match(/^Mens$/i)) {
            if (ProductDetailsPageSizePreSelector.widthValue.match(/^Extra Narrow/i) || ProductDetailsPageSizePreSelector.widthValue.match(/^X narrow/i)) {
                pattern = '\\b(2A|A)\\b';
            }
            else if (ProductDetailsPageSizePreSelector.widthValue.match(/^Narrow/i)) {
                pattern = '\\b(B|N)\\b';
            }
            else if (ProductDetailsPageSizePreSelector.widthValue.match(/^Wide/i)) {
                pattern = '\\b(E|2E|W)\\b';
            }
            else if (ProductDetailsPageSizePreSelector.widthValue.match(/^Extra Wide/i) || ProductDetailsPageSizePreSelector.widthValue.match(/^X wide/i)) {
                pattern = '\\b(3E|4E|2W)\\b';
            }
            else if (ProductDetailsPageSizePreSelector.widthValue.match(/^Extra Extra Wide/i) || ProductDetailsPageSizePreSelector.widthValue.match(/^XX wide/i)) {
                pattern = '\\b(5E|6E|3W)\\b';
            }
            else { //if(ProductDetailsPageSizePreSelector.widthValue.match(/^Medium/i)) {
                pattern = '\\b(D|M)\\b';
            }
        }
        else if (ProductDetailsPageSizePreSelector.departmentValue.match(/^Boys$/i) || ProductDetailsPageSizePreSelector.departmentValue.match(/^Girls$/i)) {
            if (ProductDetailsPageSizePreSelector.widthValue.match(/^Extra Narrow/i) || ProductDetailsPageSizePreSelector.widthValue.match(/^X narrow/i)) {
                pattern = '\\b()\\b';
            }
            else if (ProductDetailsPageSizePreSelector.widthValue.match(/^Narrow/i)) {
                pattern = '\\b(N)\\b';
            }
            else if (ProductDetailsPageSizePreSelector.widthValue.match(/^Wide/i)) {
                pattern = '\\b(D|E|W)\\b';
            }
            else if (ProductDetailsPageSizePreSelector.widthValue.match(/^Extra Wide/i) || ProductDetailsPageSizePreSelector.widthValue.match(/^X wide/i)) {
                pattern = '\\b()\\b';
            }
            else if (ProductDetailsPageSizePreSelector.widthValue.match(/^Extra Extra Wide/i) || ProductDetailsPageSizePreSelector.widthValue.match(/^XX wide/i)) {
                pattern = '\\b(3E|XXW|2W)\\b';
            }
            else { //if(ProductDetailsPageSizePreSelector.widthValue.match(/^Medium/i)) {
                pattern = '\\b(M)\\b';
            }
        }
        return new RegExp(pattern);
    },

    loadGenderSizeCookie: function() {
        var start = document.cookie.indexOf('rysSizeWidth=');

        if (start != -1) {
            var end = document.cookie.indexOf(';', start);
            var cookiedValue = document.cookie.substring(start, end);
            var cookiedValues = cookiedValue.replace('rysSizeWidth=', '').split('|');

            ProductDetailsPageSizePreSelector.sizeValue = cookiedValues[0];
            ProductDetailsPageSizePreSelector.widthValue = cookiedValues[1];
            ProductDetailsPageSizePreSelector.colorValue = cookiedValues[2];
            ProductDetailsPageSizePreSelector.departmentValue = cookiedValues[3];
            ProductDetailsPageSizePreSelector.categoryValue = cookiedValues[4];
        }
    },

    setProductDetailsSize: function() {
        var detailsSize = $('div.chooseBox select.SizeWidth');
        if (detailsSize.length) {
            var sizeRegex = (ProductDetailsPageSizePreSelector.sizeValue) ? new RegExp('\\b' + ProductDetailsPageSizePreSelector.sizeValue + '\\b') : null;
            var widthRegex = ProductDetailsPageSizePreSelector.abbreviateWidth();

            var desiredSize = undefined;
            $(detailsSize[0]).children().each(
				function(index, elt) {
				    if (desiredSize == undefined) {
				        if (ProductDetailsPageSizePreSelector.findDesiredSize(sizeRegex, widthRegex, elt)) {
				            desiredSize = elt;
				        }
				    }
				}
			);

            if (desiredSize) {
                detailsSize[0].selectedIndex = $(detailsSize[0]).children().index(desiredSize);
            }
        }
    },

    findDesiredSize: function(sizeRegex, widthRegex, elt) {
        var found = false;
        if (ProductDetailsPageSizePreSelector.widthValue) {
            found = Boolean(elt.text.match(sizeRegex));
            found = found && Boolean(elt.text.match(widthRegex));
        } else {
            found = Boolean(elt.text.match(sizeRegex));
        }

        return found;
    }
};

var ProcuctDetailsChangeListener = {
    loadGenderSizeCookie: function() {

        var start = document.cookie.indexOf('rysSizeWidth=');
        ProcuctDetailsChangeListener.start = start;
        if (start != -1) {
            var end = document.cookie.indexOf(';', start);
            var cookiedValue = document.cookie.substring(start, end);
            var cookiedValues = cookiedValue.replace('rysSizeWidth=', '').split('|');

            ProcuctDetailsChangeListener.sizeValue = cookiedValues[0];
            ProcuctDetailsChangeListener.widthValue = cookiedValues[1];
            ProcuctDetailsChangeListener.colorValue = cookiedValues[2];
            ProcuctDetailsChangeListener.departmentValue = cookiedValues[3];
            ProcuctDetailsChangeListener.categoryValue = cookiedValues[4];
        }
    },

    setCookie: function(c_name, value, expiredays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = c_name + "=" + value +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/";
    },

    dropSizeWidthCookie: function(size, width, color, department, category) {
        if (!size) return;
        if (size != undefined && size != null) {
            ProcuctDetailsChangeListener.setCookie('rysSizeWidth', ((size) ? size : '') + '|' + ((width) ? width : '') + '|' + ((color) ? color : '') + '|' + ((department) ? department : '') + '|' + ((category) ? category : ''), 30);
        }
    },

    dropSizeWidthNValueCookie: function(sizeNValueURL, widthNValueURL, colorNValueURL, departmentNValueURL, categoryNValueURL) {
        if (!sizeNValueURL) return;
        if (sizeNValueURL != undefined && sizeNValueURL != null) {
            ResultsPageSizeDimensionListener.setCookie('nSizeWidth', ((sizeNValueURL) ? sizeNValueURL : '') + '|' + ((widthNValueURL) ? widthNValueURL : '') + '|' + ((colorNValueURL) ? colorNValueURL : '') + '|' + ((departmentNValueURL) ? departmentNValueURL : '') + '|' + ((categoryNValueURL) ? categoryNValueURL : ''), 30);
        }
    },

    IsNumeric: function(sText) {
        var ValidChars = "0123456789.";
        var IsNumber = true;
        var Char;


        for (i = 0; i < sText.length && IsNumber == true; i++) {
            Char = sText.charAt(i);
            if (ValidChars.indexOf(Char) == -1) {
                IsNumber = false;
            }
        }
        return IsNumber;

    },

    GenderWidthDecode: function(Gender, WidthValue) {
        var width;
        switch (Gender) 
        {
            case 'Womens':
                {
                    if ((WidthValue == '4A') || (WidthValue == '2S') || (WidthValue == 'Quad')) { width = 'X narrow'; }
                    if ((WidthValue == '3A') || (WidthValue == '2A') || (WidthValue == 'N') || (WidthValue == 'Slim')) { width = 'Narrow'; }
                    if ((WidthValue == 'M') || (WidthValue == 'B')) { width = 'Medium'; }
                    if ((WidthValue == 'C') || (WidthValue == 'W')) { width = 'Wide'; }
                    if ((WidthValue == 'D') || (WidthValue == '2W')) { width = 'X Wide'; }
                    if ((WidthValue == 'E') || (WidthValue == '3E') || (WidthValue == '3W')) { width = 'XX Wide'; }
                    break;
                }
            case 'Mens':
                {
                    if ((WidthValue == '2A') || (WidthValue == 'A')) { width = 'X narrow'; }
                    if ((WidthValue == 'B') || (WidthValue == 'N')) { width = 'Narrow'; }
                    if ((WidthValue == 'M')||(WidthValue=='D')) { width = 'Medium'; }
                    if ((WidthValue == '3E') || (WidthValue == '4E')||(WidthValue=='2W')) { width = 'X wide'; }
                    if ((WidthValue == '5E') || (WidthValue == '6E')||(WidthValue=='3W')) { width = 'XX wide'; }
                    break;
                }
            case 'Kids':
                {
                    if ((WidthValue == 'N')) { width = 'Narrow'; }
                    if ((WidthValue == 'M')) { width = 'Medium'; }
                    if ((WidthValue == 'W')) { width = 'Wide'; }
                    if ((WidthValue == '3E')||(WidthValue == '2W') || (WidthValue == 'XXW')) { width = 'XX Wide'; }
                break; }
        }
        return width;
    },


    changed: function() {
        ProcuctDetailsChangeListener.loadGenderSizeCookie();
        if (ProcuctDetailsChangeListener.start == -1) {
            //alert($('#ctl00_cphPageMain_ProductSelection2_ddlSizeAndWidth').val());
            var sizewidth = $('#ctl00_cphPageMain_ProductSelection2_ddlSizeAndWidth option:selected').text().split('('); ;
            var size = sizewidth[0].split(' ');
            if (ProcuctDetailsChangeListener.IsNumeric(size[0])) {
                var departmentLabelArray = $('div.rightCol-top div.style-price h1');
                var departmentLabel = departmentLabelArray[0];
                var department;
                var currentURL = window.location.toString();
                if (departmentLabel) {
                    department = departmentLabel.innerHTML.replace(/^\s+|\s+$/g, '');
                    if (department.indexOf("Men") > 0) {
                        department = "Mens";
                    } else if (department.indexOf("Women") > 0) {
                        department = "Womens";
                    } else if (currentURL.toLowerCase().indexOf("naturalizer") != -1) {
                        department = "Womens";
                    } else {
                        department = "Kids";
                    }
                }
                var width = ProcuctDetailsChangeListener.GenderWidthDecode(department, size[1]);
                //                var categoryLabelArray = $('div.nav-category div.nav-selected div');
                //                var categoryLabel = categoryLabelArray[0];
                //                ProcuctDetailsChangeListener.dropSizeWidthCookie(size[0], size[1], 'Choose One', department);
                //                ProcuctDetailsChangeListener.dropSizeWidthNValueCookie(size[0], size[1], 'Choose One', department, '');
                ProcuctDetailsChangeListener.dropSizeWidthCookie(size[0], width, 'Choose One', department);
                ProcuctDetailsChangeListener.dropSizeWidthNValueCookie(size[0], width, 'Choose One', department, '');

            }
        }

    }
};


$(document).ready(ResultsPageSizeDimensionListener.initialize());
$(document).ready(ProductDetailsPageSizePreSelector.initialize());
$('#ctl00_cphPageMain_ProductSelection2_ddlSizeAndWidth').bind('change', ProcuctDetailsChangeListener.changed);




