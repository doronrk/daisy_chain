function isInternational() {
                var data, 
                flag = false;
                if (typeof storeIdValue !== "undefined" && storeIdValue != "10153"){
                                return false;
                }
                if (typeof intShipFlgSwitch !== 'undefined' && intShipFlgSwitch === 'TRUE') {
                       data = FED.Util.getCountryData();
                        if (data && typeof data.countryCode !== 'undefined' && data.countryCode !== 'US') {
                                                flag = true;
                                }
                }
                return flag;
};