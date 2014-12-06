//====================
//= Common namespace =
//====================
YAHOO.namespace('speedfc.utilities.common');
YAHOO.speedfc.utilities.common = {
    sizecharts_panel : null,
    my_sfcPanel: null,
    
	/**
	 * checks if the given object is an array
	 */
	isArray : function(obj) {
        if (obj.constructor.toString().indexOf("function Array") == -1)
        	return false;
        else
        	return true;
    },
    
    /**
     * helps to prevent introducing spaces and dashes in phone input fields
     * @param {Object} current
     */
	clean_phone : function(current) {
		current.value = current.value.replace('-', '').replace(' ', '');
	},
	
    /**
     * used in phone fields to help jump automatically to next phone input if current one is already full
     * @param {Object} current
     * @param {Object} next_name
     * @param {Object} size
     */
	next_if_full : function(current, next_name, size) {
		if (current.oldValue == current.value) return;		
        current.oldValue = current.value;	
		if (current.value.length >= size) document.getElementsByName(next_name)[0].focus();
	},
	
    /**
     * displays print dialog
     */
	printPage: function()
	{
		if (window.print) window.print();
	},
	
	/**
	 * a javascript collection object of all of the window popup options
	 */
	popupOptions: function()
	{
		this.height         = screen.availHeight / 2;
		this.width          = screen.availWidth / 2;
		this.top            = 0;
		this.left           = 0;
		this.toolbar        = false;
		this.location       = false;
		this.directories    = false;
		this.status         = false;
		this.menubar        = false;
		this.scrollbars     = false;
		this.resizable      = false;
		this.dependent      = false;
	
		this.build          = YAHOO.speedfc.utilities.common._buildOptions;
	},
	
	/**
	 * a private javascript method for popupOptions which is used to build a popup
	 * option string
	 */
	_buildOptions: function()
	{
		var sTemp = "";
	
		sTemp += "height=" + this.height + ",";
		sTemp += "width=" + this.width + ",";
		sTemp += "top=" + this.top + ",";
		sTemp += "left=" + this.left + ",";
		sTemp += "scrollbars=" + ((this.scrollbars) ? "yes" : "no") + ",";
		sTemp += "toolbar=" + ((this.toolbar) ? "yes" : "no") + ",";
		sTemp += "location=" + ((this.location) ? "yes" : "no") + ",";
		sTemp += "directories=" + ((this.directories) ? "yes" : "no") + ",";
		sTemp += "status=" + ((this.status) ? "yes" : "no") + ",";
		sTemp += "menubar=" + ((this.menubar) ? "yes" : "no") + ",";
		sTemp += "resizable=" + ((this.resizable) ? "yes" : "no") + ",";
		sTemp += "dependent=" + ((this.dependent) ? "yes" : "no");
	
		return(sTemp);
	},
	
	/**
	 * creates a popup window
	 * 
	 * @param string
	 *            window url
	 * @param string
	 *            window name
	 * @param string
	 *            [optional] window width
	 * @param string
	 *            [optional] window height
	 * @param boolean
	 *            [optional] whether window is scrollable or not
	 * @param boolean
	 *            [optional] whether window has a toolbar or not
	 * @param boolean
	 *            [optional] whether window is resizable or not
	 */
	popup: function(winlink, winname)
	{
		var winwidth        = (arguments.length >= 3) ? arguments[2] : screen.availWidth / 2;
		var winheight   = (arguments.length >= 4) ? arguments[3] : screen.availHeight / 2;
		var winscroll   = (arguments.length >= 5) ? ((arguments[4] == '1') ? true : false) : false;
		var wintoolbar  = (arguments.length >= 6) ? ((arguments[5] == '1') ? true : false) : false;
		var winresize   = (arguments.length >= 7) ? ((arguments[6] == '1') ? true : false) : true;
		var winmenubar      = (arguments.length >= 8) ? ((arguments[7] == '1') ? true : false) : false;
	
		var oOption = new YAHOO.speedfc.utilities.common.popupOptions();
	
		oOption.width               = winwidth;
		oOption.height              = winheight;
		oOption.scrollbars  = winscroll;
		oOption.toolbar             = wintoolbar;
		oOption.resizable   = winresize;
		oOption.menubar             = winmenubar;
	
		// these values are hard coded
		oOption.top                 = ((screen.availHeight / 2) - (winheight / 2));
		oOption.left                = ((screen.availWidth / 2) - (winwidth / 2));
		oOption.location    = false;
		oOption.directories = false;
		oOption.status              = false;
		oOption.dependent   = false;
	
		var sOptions = oOption.build();
	
		oWin = window.open(winlink, winname, sOptions);
        if(oWin){oWin.focus();}
	},
	
    /**
     * These functions show the sizecharts
     * @param {Object} category_url, dept
     */
	show_sizecharts: function(image_url, width, height) {
		//@todo content of sizechart depends on client
        if (YAHOO.speedfc.utilities.common.sizecharts_panel) {
            YAHOO.speedfc.utilities.common.sizecharts_panel.panel.destroy();
        }
        YAHOO.speedfc.utilities.common.sizecharts_panel = new YAHOO.speedfc.utilities.sfcPanel('sizecharts_panel');
        YAHOO.speedfc.utilities.common.sizecharts_panel.panel.beforeShowEvent.subscribe(function(){
            document.getElementById('sizecharts_panel_sfc_panel_c').style.top = '138px';
            
            //Calculate margins for centering
            var side_margins = (document.documentElement.clientWidth - width)/2;
            var vertical_margins = (document.documentElement.clientHeight - height)/2;
            var properties = {
                        fixedcenter: false,
                        x: 		side_margins,
                        y:		vertical_margins,
                        height:	"" + height + "px",
                        width:	"" + width + "px"
                    };
            
            YAHOO.speedfc.utilities.common.sizecharts_panel.setProperties(properties, true);
        });
        var callback = {
            success: function(o) {
                YAHOO.speedfc.utilities.common.sizecharts_panel.setBody(o.responseText);
                YAHOO.speedfc.utilities.common.sizecharts_panel.show();
            },
            failure: function (o) {
                YAHOO.speedfc.utilities.common.sizecharts_panel.hide();
            }
        };
        
        var url = "/size-chart?image=" + image_url;
       
        YAHOO.util.Connect.asyncRequest('GET', url, callback, '');
        return false;

	},
    
    /**
     * validate_email_adresses, checks input for valid email adress(es) match
     * returns boolean, true if adresses are correct
     * @param {Object} email_adress
     */
    validate_email_adresses: function(email_adress){
        // single email match expression...
        var email_1_regexp =  /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        // multiple, separated by commas email adresses list
        var email_n_regexp = /^(((\s)*(\,){1}(\s)*){1}([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+)+$/;
        // adding a comma at the beginning simplfies the multiple addresses
        // expression a lot...
        return String(","+email_adress).search (email_n_regexp) != -1;
    },

	/**
	 * This functions sets a combo/select to a specified values
	 * @param {Object} combo    the combo you want to change
	 * @param {Object} val      the value you want to be selected in the combo
	 */
	setSelectValue: function(combo, val){
		var select = document.getElementById(combo);
		for(index = 0;index < select.length;index++) {
			if(select[index].value == val)
				select.selectedIndex = index;
		}
	},
    
    /**
     * sets the input value to empty (used in search box)
     * @param {Object} input
     * @param {Object} value
     */
    cleanInputBox : function (input, value) {
        if (input
        && (input.nodeName)
        && (input.nodeName == 'INPUT')
        && (input.value == value)) {
            input.value = '';
        }
    },
    
    /**
     * sets an input value to the value recived as parameter. (used in search box)
     * @param {Object} input
     * @param {Object} value
     */
    restoreInputBox : function (input, value) {
        if (input
        && (input.nodeName)
        && (input.nodeName == 'INPUT')
        && (input.value == '' || input.value == value)) {
            input.value = value;
        }
    },
    
    popup_creditcard : function(ccurl){
        if(ccurl == '')
            ccurl = 'https://onlineaccess.mycreditcard.cc/dressbarn';
        window.open(ccurl,'ccurl','menubar=0,resizable=0,scrollbars=1,width=800,height=700,left=100,top=50');
    },

    popup_checkbalance : function(){
        window.open('/customer-service/check-balance','check balance','menubar=0,resizable=0,scrollbars=no,width=400,height=300,left=100,top=50');
    },
    
    /**
     *
     * generic function to generate overlays
     *
     */
     generateSfcPanel : function(pid, header_title, body_content, pwidth, create_new_instance, fixedCenterVar){
        if(typeof(create_new_instance) == 'undefined')
            create_new_instance = false;

        if(!YAHOO.speedfc.utilities.common.my_sfcPanel || create_new_instance){
            YAHOO.speedfc.utilities.common.my_sfcPanel = new YAHOO.speedfc.utilities.sfcPanel(pid);
        }

        if(fixedCenterVar == 'false')
            fixedCenterVar = false;
        else
            fixedCenterVar = true;    

        YAHOO.speedfc.utilities.common.my_sfcPanel.setProperties({
            width : pwidth,
            constraintoviewport : true,
            fixedcenter : Boolean(fixedCenterVar),
            underlay : "none", 
            visible : false, 
            draggable : false, 
            modal : true 
        });

        YAHOO.speedfc.utilities.common.my_sfcPanel.setHeader(header_title);
        YAHOO.speedfc.utilities.common.my_sfcPanel.setBody(body_content);
        YAHOO.speedfc.utilities.common.my_sfcPanel.show();

        return YAHOO.speedfc.utilities.common.my_sfcPanel;     
     },
     
     getPageOverlay : function(pid, header_title, url, panel_width, run_embedded_js, r_callback, create_new_instance){
        run_embedded_js = run_embedded_js || -1;

        var sUrl = url;

        var r_func = function(){};

        if(typeof(r_callback) != 'undefined')
            r_func = r_callback;
            
        if(typeof(create_new_instance) == 'undefined')
            create_new_instance = false;
 
        var callback = {
            success:function(o) {
                var content_body = '<div id="sfcpanel_container" style="position: relative;">'
                                        + o.responseText
                                    +'</div>', panel; 

                panel = YAHOO.speedfc.utilities.common.generateSfcPanel(pid, header_title, content_body, panel_width, create_new_instance);
                if (run_embedded_js > 0 || run_embedded_js == true) 
                {
                    var sfcpanel = document.getElementById('sfcpanel_container');                
                    if (sfcpanel) 
                    {
                        var scripts = sfcpanel.getElementsByTagName('script');
                        for (var i=0; i < scripts.length; i++) {
                            try
                            {
                                eval(scripts[i].innerHTML);
                            }
                            catch(e) {}
                        };
                    };
                };
                if(!create_new_instance)
                    o.argument(panel);
            },
            failure:function(o) {
               var panel_width = "200px";
               var error_body = "<div style='height:50px;padding-top: 10px;'>"
                        +"<center><span class='overlay-content-darkgray-bold'>There was an error getting the content</span>"
                        +"</div>";
               YAHOO.speedfc.utilities.common.generateSfcPanel(pid,'Error',error_body,panel_width);
            }, 
            argument: r_func
        };
        YAHOO.util.Connect.asyncRequest('GET', sUrl, callback);     
     
     }

     
     
};
