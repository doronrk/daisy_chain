function Mmc(options) {
    this.state = $.extend({
        contentId: null,
        cookieName: null,
        data: null,
        isOpen:false,
        inAni:false
    }, options);

    $(this.state.contentId).css("top", "33px");

    var htmlBuffer = new StringBuffer();

    htmlBuffer.append('<div style="margin:0 auto; position:relative; width:960px;" class="clearfix">');


    htmlBuffer.append('<select id="mmc-mfg"></select>');
    htmlBuffer.append('<select id="mmc-mdl"></select>');
    htmlBuffer.append('<select id="mmc-cat"></select>');

    htmlBuffer.append('<a id="mmc-go" href="" class="go"></a>');

    htmlBuffer.append('</div>');

    //htmlBuffer.append('<div id="mmc-tab">find my phone +</div>');

    $(this.state.contentId).html(htmlBuffer.toString());

    // Try to get the cookie
    cookie = getCookie(this.state.cookieName);

    
    // Is cookie set?
    if (cookie) {
        // Parse the cookie
        var cookieObj = JSON.parse(cookie);
        //console.log(JSON.stringify(cookieObj));

        if (cookieObj) {
            var mfgIdx = this.mfgIndexBySlug(cookieObj.mfgSlug);
            var mfg = this.loadMfg(mfgIdx);
            if (mfg) {
                var mdlIdx = this.mdlIndexBySlug(mfg, cookieObj.mdlSlug);
                var mdl = this.loadMdl(mfg, mdlIdx);
                if (mdl) {
                    var catIdx = this.catIndexBySlug(cookieObj.catSlug);
                    this.loadCat(mfg, mdl, catIdx);
                }
                else {
                    this.loadCat(null, null, -1);
                }
            }
            else {
                this.loadMdl(null, -1);
                this.loadCat(null, null, -1);
            }
        }
    }
    else {
        this.loadMfg(-1);
        this.loadMdl(null, -1);
        this.loadCat(null, null, -1);
    }
    this.bindEvents();

}

Mmc.prototype.mfgIndexBySlug = function(slug) {
    for (var i = 0; i < this.state.data.Manufacturers.length; i++) {
        var m = this.state.data.Manufacturers[i];
        if (m.Slug == slug) return i;
    }
    return -1;
}
Mmc.prototype.mdlIndexBySlug = function(mfg, slug) {
    for (var i=0; i<mfg.ModelFilters.length; i++) {
        var m = mfg.ModelFilters[i];
        if (m.Slug == slug) return i;
    }
    return -1;
}
Mmc.prototype.catIndexBySlug = function(slug) {
    for (var i = 0; i < this.state.data.Categories.length; i++) {
        var c = this.state.data.Categories[i];
        if (c.Slug == slug) return i;
    }
    return -1;
}

Mmc.prototype.bindEvents = function() {
    $("#mmc-tab").bind('click', { self: this }, function(e) {
        if (e.data.self.state.inAni) return false;
        e.data.self.state.inAni = true;
        if (e.data.self.state.isOpen) {
            $(e.data.self.state.contentId).animate({ top : "33px" }, 500, function() {
                e.data.self.state.isOpen = false;
                $("#mmc-tab").text("find my phone +");
                e.data.self.state.inAni = false;
            });
        }
        else {
            $(e.data.self.state.contentId).animate({ top : "112px" }, 500, function() {
                e.data.self.state.isOpen = true;
                $("#mmc-tab").text("find my phone -");
                e.data.self.state.inAni = false;
            });
        }
    });
    $("#mmc-mfg").bind('change', { self: this }, function(e) {
        if (!$(this).val()) {
            $("#mmc-mdl-wrap").html(e.data.self.loadMdl(null, -1));
            $("#mmc-cat-wrap").html(e.data.self.loadCat(null, null, -1));
        }
        else {
            var idx = parseInt($(this).val());
            $("#mmc-mdl-wrap").html(e.data.self.loadMdl(e.data.self.state.data.Manufacturers[idx], -1));
            $("#mmc-cat-wrap").html(e.data.self.loadCat(null, null, -1));
        }
    });
    $("#mmc-mdl").bind('change', { self: this }, function(e) {
        if (!$(this).val()) {
            $("#mmc-cat-wrap").html(e.data.self.loadCat(null, null, -1));
        }
        else {
            var mfgIdx = parseInt($("#mmc-mfg").val());
            var mdlIdx = parseInt($(this).val());
            $("#mmc-cat-wrap").html(e.data.self.loadCat(e.data.self.state.data.Manufacturers[mfgIdx], e.data.self.state.data.Manufacturers[mfgIdx].ModelFilters[mdlIdx], -1));
        }
    });
    $("#mmc-mfg,#mmc-mdl,#mmc-cat").bind('keypress', { self: this }, function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            $("#mmc-go").click();
            return false;
        }
    });
    

    $("#mmc-go").bind('click', { self: this }, function(e) {

        if (!$("#mmc-mfg").val()) return false;
        
        var url = '/phones';
        var catSlug = $("#mmc-cat").val();
        var catAlreadyDone = false;

        if (catSlug) {
            if (catSlug == "cases") {
                url = '/cases';
                catAlreadyDone = true;
            }
            else if (catSlug == "accessories") {
                url = '/accessories';
                catAlreadyDone = true;
            }
        }

        var slugs = {
            mfgSlug: '',
            mdlSlug: '',
            catSlug: catSlug
        };
        

        var mfgIdx = parseInt($("#mmc-mfg").val());
        slugs.mfgSlug = e.data.self.state.data.Manufacturers[mfgIdx].Slug;
        url += '/' + slugs.mfgSlug;

        // Is a model selected?
        if ($("#mmc-mdl").val()) {
            var mdlIdx = parseInt($("#mmc-mdl").val());
            slugs.mdlSlug = e.data.self.state.data.Manufacturers[mfgIdx].ModelFilters[mdlIdx].Slug;
            url += '/' + slugs.mdlSlug;
        }
        if (!catAlreadyDone) {
            url += '/' + slugs.catSlug;
        }

        // Save cookie
        setCookie(e.data.self.state.cookieName, JSON.stringify(slugs), 90);

        //console.log(JSON.stringify(slugs));
        //console.log(url)
        window.location = url;
        return false;
    });
}
Mmc.prototype.loadMfg = function(mfgIdx) {
    var htmlBuffer = new StringBuffer();
    var retMfg = null;

    htmlBuffer.append('<option value="">-- select a manufacturer --</option>');
    for (var i = 0; i < this.state.data.Manufacturers.length; i++) {
        var m = this.state.data.Manufacturers[i];
        htmlBuffer.append('<option value="'+i+'"');
        if (mfgIdx == i) {
            htmlBuffer.append(' selected="selected"');
            retMfg = m;
        }
        htmlBuffer.append('>'+m.Name+'</option>');
    }
    
    $("#mmc-mfg").html(htmlBuffer.toString());
    return retMfg;
}
Mmc.prototype.loadMdl = function(mfg, mdlIdx) {
    var htmlBuffer = new StringBuffer();
    var retMdl = null;

    if (!mfg) {
        htmlBuffer.append('<option value=""></option>');
    }
    else {
        htmlBuffer.append('<option value="">-- select a model --</option>');
        for (var i=0; i<mfg.ModelFilters.length; i++) {
            var m = mfg.ModelFilters[i];
            htmlBuffer.append('<option value="'+i+'"');
            if (mdlIdx == i) {
                htmlBuffer.append(' selected="selected"');
                retMdl = m;
            }
            htmlBuffer.append('>'+m.Name+'</option>');
        }
    }
    $("#mmc-mdl").html(htmlBuffer.toString());
    if (!mfg) $("#mmc-mdl").attr("disabled", "disabled");
    else $("#mmc-mdl").removeAttr("disabled");

    return retMdl;
}

Mmc.prototype.loadTheCat = function(cat, level) {
    var htmlBuffer = new StringBuffer();

    htmlBuffer.append('<option value="'+cat.Slug+'">');
    if (level > 0) {
        for (var i=0; i<level; i++) {
            if (i == level-1)
                htmlBuffer.append('&nbsp;-&nbsp;');
            else
                htmlBuffer.append('&nbsp;&nbsp;&nbsp;');
        }
    }
    htmlBuffer.append(cat.Name);
    htmlBuffer.append('</option>');

    for (var i=0; i<cat.Children.length; i++) {
        var c = cat.Children[i];
        htmlBuffer.append(this.loadTheCat(c, level+1));
    }
    return htmlBuffer.toString();
}
Mmc.prototype.loadCat = function(mfg, mdl, catIdx) {
    var htmlBuffer = new StringBuffer();
    var retCat = null;

    if (!mfg || !mdl) {
        htmlBuffer.append('<option value=""></option>');
    }
    else {
        htmlBuffer.append('<option value="">-- select a category --</option>');
        for (var i=0; i<this.state.data.Categories.length; i++) {
            var c = this.state.data.Categories[i];

            htmlBuffer.append(this.loadTheCat(c, 0));

        }
    }

    $("#mmc-cat").html(htmlBuffer.toString());
    if (!mfg || !mdl) $("#mmc-cat").attr("disabled", "disabled");
    else $("#mmc-cat").removeAttr("disabled");

    return retCat;
}
