(function()          { var a = mstag.getPropertySet("dedup,actionid,revenue,nonadvertisingcost,taxcost,shippingcost"),           u = "//176200.r.msn.com/?type=1&domainId=176200";           if (a.dedup) u += "&dedup=" + a.dedup;          if (a.actionid)           u += "&actionid=" + a.actionid;           if (a.revenue)           u += "&revenue=" + a.revenue;           if (a.nonadvertisingcost)           u += "&nonadvertisingcost=" + a.nonadvertisingcost;          if (a.taxcost)           u += "&taxcost=" + a.taxcost;           if (a.shippingcost)           u += "&shippingcost=" + a.shippingcost; mstag.addBeacon(u) })();    