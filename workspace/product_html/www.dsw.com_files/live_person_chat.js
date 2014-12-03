function LivePersonChat(){var a=this;
lp_dsw_chat_initiated=function(b){a.chatInitiated(b)
};
this.lpIds=["lpchatheader","lpchat","lpchatfooter","lpchatalt"];
this.buttonsToEvents={HEADER:"event27",FOOTER:"event28",PRODUCT:"event29",CHECKOUT:"event30","CONTACT US":"event31"};
this.chatsToIdentifiers={lpchatheader:"HEADER",lpchatfooter:"FOOTER"};
this.pageNamesToIdentifiers={"SHOPPING BAG: ADD TO BAG":"PRODUCT","View Shopping Bag":"CHECKOUT","CHECKOUT: Billing and Shipping":"CHECKOUT","CHECKOUT: Order Review and Payment":"CHECKOUT","Customer Service: Contact Us":"CONTACT US"};
this.chatInitiated=function(g){try{var d=this.translateChatId(this.findLpChatId(g.target));
var c=this.translatePageName(sc_obj.pageName);
var f=this.chooseIdentifier(d,c);
var b={};
this.setEvent(b,f);
s.t(b)
}catch(h){if(window.console){console.log("Problem tagging chat initiation: "+h)
}}};
this.findLpChatId=function(c){var b=c;
while((b!==undefined)&&(b!==document)){var d=b.getAttribute("id");
if(this.contains(this.lpIds,d)){return d
}b=b.parentNode
}return undefined
};
this.translateChatId=function(b){return this.chatsToIdentifiers[b]
};
this.translatePageName=function(c){if(c===undefined){return undefined
}var b=this.pageNamesToIdentifiers[c];
if(b!==undefined){return b
}if(c.indexOf("PRODUCT: ")===0){return"PRODUCT"
}return undefined
};
this.chooseIdentifier=function(c,b){if(c!==undefined){return c
}if(b!==undefined){return b
}return"UNKNOWN"
};
this.setEvent=function(b,c){var d=this.buttonsToEvents[c];
if(d===undefined){return
}if((b.events!==undefined)&&(b.events.length>0)){b.events+=(","+d)
}else{b.events=d
}};
this.contains=function(d,c){for(var b=0;
b<d.length;
b++){if(d[b]===c){return true
}}return false
}
};