// Internal Customers
if ('PageParameters' in window && 'userIPAddress' in PageParameters && 'tto' in PageParameters) {
    PageParameters.tto.internalCustomer = (PageParameters.userIPAddress == "161.181.53.10" || PageParameters.userIPAddress == "161.181.253.20");
}
else if ('nord' in window && 'config' in window.nord && 'settings' in nord.config && 'tto' in nord.config.settings) {
    nord.config.settings.tto.internalCustomer = (nord.config.settings.shopper.ipAddress == "161.181.53.10" || nord.config.settings.shopper.ipAddress == "161.181.253.20");
}