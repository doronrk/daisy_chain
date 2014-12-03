/**
 * Account namespace
 */
YAHOO.namespace('speedfc.account.orders');
YAHOO.speedfc.account.orders = {
    open_lines: [],
    currId : null,

    /**
     * open: shows the order details div and hides the details button.
     */
    open : function(id){
        var cont = YAHOO.speedfc.account.orders.getCont(id);
        var btn = YAHOO.speedfc.account.orders.getBtn(id);
        YAHOO.speedfc.account.orders.currId = id;
        if(cont.childNodes.length == 0){
            YAHOO.util.Connect.asyncRequest('POST',"/account/orderdetails", YAHOO.speedfc.account.orders.callback, "id="+id);
        }else{
            cont.style.display = "block";
            cont.style.marginTop = "-60px";
            cont.style.display = "block";
            btn.style.visibility = "hidden";
        }
        YAHOO.speedfc.account.orders.open_lines.push(id);
        return false; /* Don't follow the link */
    },

    /**
     * close: hides the order details and shows the details button.
     */
    close : function(id){
        var cont             = YAHOO.speedfc.account.orders.getCont(id);
        var btn              = YAHOO.speedfc.account.orders.getBtn(id);
        cont.style.display   = "none";
        cont.style.marginTop = "";
        btn.style.visibility = "visible";
        
        var open_lines_index = YAHOO.speedfc.account.orders.getIndex(id,YAHOO.speedfc.account.orders.open_lines);
        if (open_lines_index != -1) {
            YAHOO.speedfc.account.orders.open_lines.splice(open_lines_index, 1);
        }
        return false; /* Don't follow the link */
    },

    /**
     * This callback is used by open function, shows the order details div and
     * hides the details button.
     *
     */
    callback :{
        success : function(o){
            var cont = YAHOO.speedfc.account.orders.getCont(YAHOO.speedfc.account.orders.currId);
            var btn = YAHOO.speedfc.account.orders.getBtn(YAHOO.speedfc.account.orders.currId);
            cont.innerHTML = o.responseText;
            cont.style.marginTop = "-60px";
            cont.style.display = "block";
            btn.style.visibility = "hidden";
            return false;
        },
        failure : function(o){
            // alert("Page not found");
            return false;
        }
    },

    /**
     * getIndex: returns the the line index of the given object id. if the
     * object is not found -1 is returned.
     */
    getIndex : function(id,openlines_arr){
        for (var i=0; i< openlines_arr.length; i++){
            if(openlines_arr[i] == id)
                return i;
        }
        return -1;
    
    },

    /**
     * getCont: returns the div containing the details of the given line.
     */
    getCont : function(id){
        var cont = document.getElementById("details_for_"+id);
        if(!cont){
            return false;
        }
        return cont;
    },

    /**
     * getBtn: returns the details button of the given line.
     */
    getBtn : function(id){
        var btn = document.getElementById("btn_details_"+id);
        if(!btn){
            return false;
        }
        return btn;
    },

    /**
     * saveOpen: creates a hidden input to merge all the hidden_fields.
     */
    saveOpen: function(){
        var hidden_div = document.getElementById('hidden_fields');
        for (var i=0; i < YAHOO.speedfc.account.orders.open_lines.length; i++) {
            var input   = document.createElement('input');
            input.type  = 'hidden';
            input.name  = 'open_lines[]';
            input.value = YAHOO.speedfc.account.orders.open_lines[i];
            hidden_div.appendChild(input);
        };
        
        document.getElementById('sorting').submit();
    }
};