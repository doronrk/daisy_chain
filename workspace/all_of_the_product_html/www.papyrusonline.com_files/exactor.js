document.observe('dom:loaded', function() {
    if($('onestepcheckout-place-order')!=null){
        var exactorStatusUrl="../ExactorSettings/ajax/getExactorStatus";
        var originalOSCHandler=null;
        var buttonElement = $('onestepcheckout-place-order');
        // Handle place order click event
        buttonElement.observe('click', function(e){
           //$('onestepcheckout-place-order').getStorage().get('prototype_event_registry').get('click');
           var submitOriginalHandlers = Event.cache[buttonElement._eventId || (buttonElement._prototypeEventID || [])[0]].click;;
           if (submitOriginalHandlers.length > 1){
               originalOSCHandler = submitOriginalHandlers[1];
               // Unbind original
               $('onestepcheckout-place-order').stopObserving('click');
               $('onestepcheckout-place-order').observe('click', doExactorStatusRequestChain);
               doExactorStatusRequestChain(e);
           }
        });

        function doExactorStatusRequestChain(event){
            // First validate the form
            /*var form = new VarienForm('onestepcheckout-form');
            if(!form.validator.validate())  {
                Event.stop(event);
            }*/
            new Ajax.Request(exactorStatusUrl, {
                method: 'get',
                onSuccess: function (transport){
                    if(transport.status == 200){
                        var data = transport.responseText.evalJSON();
                        if (data.exactor_status){
                            alert(data.exactor_status);
                            //window.location.href="javascript:showDialog('','" + data.exactor_status + "','error',2)";
                            Event.stop(event);
                        }
                        else
                            originalOSCHandler(event);
                    }
                }
            });
            Event.stop(event);
        }
    }

});