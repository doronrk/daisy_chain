/**
 * profile management javascript codes.
 * 
 * @author foy
 */
function popupOndocReadyCheckBalance(modal,showDivId){
			 // onShow : show+make the window translucent
		    // callback function for jqmodal
		    var myOpenPNG = function(hash) {
		        var maskWidth = $(window).width();
		        var maskHeight = $(document).height();
		
		        hash.o.css({
		            position: 'absolute',
		            height: maskHeight + 'px',
		            width: maskWidth + 'px'
		        });
		        hash.o.fadeIn(5);
		        hash.w.positionCenter().show();
		        hash.w.bgiframe({ opacity: false });
		    };
		
		
		    // onClose : remove/hide the windows
		    // callback function for jqmodal
		    var myClosePNG = function(hash) {
		        hash.w.hide();
		
		        hash.o.fadeOut('1000');
		        hash.o.remove();
		    };
		    
		        // onShow : show+make the window translucent
		    // callback function for jqmodal
		    var myOpenGIF = function(hash) {
		        var maskWidth = $(window).width();
		        var maskHeight = $(document).height();
		
		        hash.o.css({
		            position: 'absolute',
		            height: maskHeight + 'px',
		            width: maskWidth + 'px',
		            backgroundColor: '#f1f1f1'
		        });
		        hash.o.fadeIn('1000');
		        hash.w.positionCenter().fadeIn('1000');
		        hash.w.bgiframe({ opacity: true });
		    };
		
		
		    // onClose : remove/hide the windows
		    // callback function for jqmodal
		    var myCloseGIF = function(hash) {
		        hash.w.fadeOut('1000');
		        hash.o.fadeOut('1000');
		        hash.o.remove();
		    };
		    
		    $(showDivId).jqm({
		        overlay: 50,
		        closeClass: 'popupclose',
		        width: 495,
		        height: 300,
		        modal: modal,
		        onShow: myOpenGIF,
		        onHide: myCloseGIF
		    });
		 $('.jqmOverlay').remove();
		 $(showDivId).jqmShow();
	}

function loadPageFullPathForHeader(url,param) {
	$.get(url,param,function(data){
 		$('#xyzHeader').html(data);
 	});
}

function ajaxSubmitCheckBalance(form){
	var options={
	success:function (data) {	
	 		$('#xyzHeader').html(data);	
	 		$('#remainingBalanceId').show();
		}
	};
	$("#"+form).ajaxSubmit(options);
	
}