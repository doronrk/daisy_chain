if(typeof BreadcrumbWidget=="undefined"){var BreadcrumbWidget=Base.extend({constructor:null,create:function(a,b){$(a).widgetState(b).widgetClass(BreadcrumbWidget);PersistentStorage.register(BreadcrumbWidget,a)},addBreadcrumb:function(f,e,a){var c=$(f);var h=$(".crumb",c).length;if(a<=(h-1)){var b=a-1;$(".crumb:gt("+b+")",c).add($(".delim:gt("+(b-1)+")",c)).remove();c.append('<div class="delim"><!-- --></div>').append('<div class="crumb last">'+e+"</div")}else{$(".last",c).removeClass("last");c.append('<div class="delim"><!-- --></div>').append('<div class="crumb last">'+e+"</div")}var d=$(".crumb",c).index($(".crumb.last")[0]);var g=PersistentStorage.loadPersistent();$(".crumb.last",c).click(function(j){PersistentStorage.executeState(g);var k=$(".crumb",c).index(this);$(".crumb:gt("+k+")",c).add($(".delim:gt("+(k-1)+")",c)).remove()})},removeBreadcrumbs:function(c,a){var b=$(c)},loadBreadcrumbs:function(e,b,a){var c=$(e);var d=c.widgetState();var f=this;c.widgetLoad("com.fry.ocpsdk.widget.catalog.navigation.BreadcrumbWidget",{categoryId:a},function(){})},restoreState:function(c,b){var a=c.categoryId;var d=c.subcategoryId;if(d){this.loadBreadcrumbs(b,null,d)}else{if(a){this.loadBreadcrumbs(b,null,a)}}},getWidgetClassName:function(){return"BreadcrumbWidget"}})};