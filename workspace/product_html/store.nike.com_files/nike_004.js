var nike=(function(a,c){if(!Array.prototype.indexOf){Array.prototype.indexOf=function(h){if(this===null){throw new TypeError()
}var i=new Object(this);
var f=i.length>>>0;
if(f===0){return -1
}var j=0;
if(arguments.length>0){j=Number(arguments[1]);
if(j!=j){j=0
}else{if(j!==0&&j!=Infinity&&j!=-Infinity){j=(j>0||-1)*Math.floor(Math.abs(j))
}}}if(j>=f){return -1
}var g=j>=0?j:Math.max(f-Math.abs(j),0);
for(;
g<f;
g++){if(g in i&&i[g]===h){return g
}}return -1
}
}var d=a.cq=a.cq||{};
if(!d.ns){d.ns=function(){var f=arguments,m=c,l=0,k=0,g=null,h=null;
for(l=0;
l<f.length;
l=l+1){g=f[l].split(".");
for(k=0;
k<g.length;
k=k+1){h=g[k];
m[h]=m[h]||{};
m=m[h]
}}return m
}
}if(!d.define||!d.require){var e=function(){this.modules={};
this.reqs={};
this.requires=0
};
e.prototype.add=function(h,f,j){if(typeof f==="string"){f=[f]
}if(!(f instanceof Array)){f=[]
}if(h in this.modules&&"executed" in this.modules[h]){return false
}if(h===undefined){h="require_"+this.requires++
}this.modules[h]={executed:false,value:j,requirements:f};
this.reqs[h]=this.reqs[h]||[];
for(var g=0;
g<f.length;
++g){this.reqs[f[g]]=this.reqs[f[g]]||[];
if(this.reqs[f[g]].indexOf(h)===-1){this.reqs[f[g]].push(h)
}}this.execute(h)
};
e.prototype.getReqs=function(j){var h=[],f=this.modules[j].requirements||[];
if(f.length==0){return h
}for(var g=0;
g<f.length;
++g){if(!(f[g] in this.modules)||this.modules[f[g]].executed!==true){return false
}else{if(f[g] in this.modules){h.push(this.modules[f[g]].value)
}}}return h.length>0?h:false
};
e.prototype.execute=function(h){var j=this.modules[h],f=this.getReqs(h);
if(!f||j.executed===true){return false
}if(typeof j.value==="function"){j.value=j.value.apply(j.value,f)
}else{j.value=undefined
}j.executed=true;
for(var g=0;
g<this.reqs[h].length;
++g){this.execute(this.reqs[h][g])
}};
var b=new e();
d.define=function(){b.add.apply(b,arguments)
};
d.require=function(f,g){b.add(undefined,f,g)
}
}return a
}(nike||{},window));
nike.cq.define("jquery",[],function(){return window.jQuery
});
(function(c){var e=function(){var h=c(".nike-cq-footer-2 .nike-cq-list-item .nike-cq-list-sublist-level1");
h.each(function(){c(this).before("<span class='nike-cq-footer-arrow-up'></span>")
});
h.parent().click(function(k){k.preventDefault();
var j=c(this).children("a");
a(j)
});
if(c("body").data("cms-mode")!="EDIT"){var i=0;
var f=60;
var g=260;
c(".nike-cq-footer-boxes-box").each(function(j,k){if(c(k).height()>i){i=c(k).height()
}});
if(i<g){i=260
}c(".nike-cq-footer-boxes-box-inner").each(function(m,o){var j=i-f;
c(o).height(j);
var k=c(o).find(".nike-cq-cta");
var n=c(k).width();
var l=-(n/2);
c(o).find(".nike-cq-cta").css({position:"absolute",bottom:"30px",left:"50%","margin-left":l})
})
}},a=function(f){var g=c(f).siblings(".nike-cq-list-sublist-level1");
d();
if(!c(f).hasClass("selected")){c(".nike-cq-footer-2 .nike-cq-list-item.nike-cq-list-item-level1 a").removeClass("selected");
b(g,c(f).parent());
c(f).addClass("selected")
}else{c(".nike-cq-footer-2 .nike-cq-list-item.nike-cq-list-item-level1 a").removeClass("selected")
}},b=function(i,h){var j=c(".nike-cq-footer-2"),k=c(i).clone(),g=c(".nike-cq-footer-2-submenu-inner");
j.addClass("move-up");
j.before('<div class="nike-cq-footer-2-submenu"><div class="nike-cq-footer-2-submenu-inner"></div></div>');
k.show();
var f=k.wrap("<div>").parent().html();
g.html("");
g.html(f);
h.addClass("darker-background")
},d=function(){var f=c(".nike-cq-footer-2");
f.removeClass("move-up");
c(".nike-cq-footer-2-submenu").remove();
c(".nike-cq-footer-2-inner ul li").removeClass("darker-background")
};
c(function(){if(c(".nike-cq-global-footer-container").length){e()
}})
})(jQuery);
nike.cq.define("nike.cq.NikeCom.GlobalFooterTng",["jquery"],function(b){var a=function(g){var d="nike-cq-global-footer-tng-guides-container-active",e=".nike-cq-global-footer-tng-guides-container",f=".nike-cq-global-footer-tng-guides-menu";
var c=function(h){h.toggleClass(d).children(f).toggle()
};
g.on("click",e,function(h){if(h.target!==this){return
}c(b(this))
}).on("mouseleave",e,function(){if(b(this).hasClass(d)){c(b(this))
}})
};
b(function(){b(".nike-cq-global-footer-tng-bottom-column-right, footer > .swoosh-footer").each(function(){a(b(this))
})
});
return{init:a}
});