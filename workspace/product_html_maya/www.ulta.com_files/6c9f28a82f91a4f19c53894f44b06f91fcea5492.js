// Fix for missing globalPageData Object
var globalPageData = globalPageData || {}; 

    // fix GPD on Checkout Funnel
    try { globalPageData.navigation = checkOutPageData.navigation; } catch(e) {}

// Fix for missing pageData Object
var pageData = pageData || {}; 

// Fix for missing errorPageData Object - NNS
var errorPageData = errorPageData || {}; 