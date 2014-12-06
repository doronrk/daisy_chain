function handleDisplayChanged(event)
{
	var skuId = event.variationId;

	
	$("#refreshDiv").load(contextPath + "/templates/catalog/fluid/refreshDetailByFluid.jsp",
		{
			skuId: skuId
		}
	);
	
}

// Must wait for the load event to ensure the PMR is ready 
function handleWindowLoaded(event)
{
    // Get the PMR
    var pmr = fluid.application;
    
    // Add the event listeners. 
    var changeType = fluid.retail.display.events.DisplayEvent.CHANGE;
    pmr.addEventListener(changeType, this, this.handleDisplayChanged);
    
    // Because the onload has been overridden the PMR's onload handler
    // must be explicitely called
    pmr.handleWindowLoaded(event);
}//handleWindowLoaded()
