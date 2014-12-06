var qualtrics = {
    percentage: 0,
    id: 'qualtrics',
    uniqueId: 'ZN_5tMHsMTsr4ppmEB',
    feedbackId: '',
    active: false,
    settings: {},
    init: function (settings) {
        if (!settings) {
            this.active = false;
            return;
        }
        this.settings = settings;
        this.uniqueId = 'ZN_5tMHsMTsr4ppmEB';
        this.percentage = this.settings.desktopExitPercentage || 0;
        this.active = this.settings.desktopActive || false;
        if (this.active) {
            $('#pop-feedback').show();
            if (this.percentage > 0) this.write(this.script(this.uniqueId));
        }
    },
    script: function (zoneId) {
        var script = "<script type='text/javascript'>" +
                    "(function(){var g=function(e,h,f,g){" +
                    'this.get=function(a){for(var a=a+"=",c=document.cookie.split(";"),b=0,e=c.length;b<e;b++){for(var d=c[b];" "==d.charAt(0);)d=d.substring(1,d.length);if(0==d.indexOf(a))return d.substring(a.length,d.length)}return null};' +
                    'this.set=function(a,c){var b="",b=new Date;b.setTime(b.getTime()+6048E5);b="; expires="+b.toGMTString();document.cookie=a+"="+c+b+"; path=/; "};' +
                    'this.check=function(){var a=this.get(f);if(a)a=a.split(":");else if(100!=e)"v"==h&&(e=Math.random()>=e/100?0:100),a=[h,e,0],this.set(f,a.join(":"));else return!0;var c=a[1];if(100==c)return!0;switch(a[0]){case "v":return!1;case "r":return c=a[2]%Math.floor(100/c),a[2]++,this.set(f,a.join(":")),!c}return!0};' +
                    'this.go=function(){if(this.check()){var a=document.createElement("script");a.type="text/javascript";a.src=g+ "&t=" + (new Date()).getTime();document.body&&document.body.appendChild(a)}};' +
                    'this.start=function(){var a=this;window.addEventListener?window.addEventListener("load",function(){a.go()},!1):window.attachEvent&&window.attachEvent("onload",function(){a.go()})}};' +
                    'try{(new g(' + this.percentage + ',"v","QSI_S_' + zoneId + '","' + window.location.protocol + '//' + zoneId.toLowerCase() + '-gamestop.siteintercept.qualtrics.com/WRSiteInterceptEngine/?Q_ZID=' + zoneId + '&Q_LOC="+encodeURIComponent(window.location.href))).start()}catch(i){}})();' +
                    "</script><div id='" + zoneId + "'><!--DO NOT REMOVE-CONTENTS PLACED HERE--></div>";
        return script;
    },
    feedback: function () {
        if (this.settings.desktopActive) {
            (function () { var id = 'SI_aVJVHqdwJZ8cwx7', c = 'SI_aVJVHqdwJZ8cwx7_container'; var o = document.getElementById(c); if (o) { o.innerHTML = ''; var d = o; } else { var d = document.createElement('div'); d.id = c; } var s = document.createElement('script'); s.type = 'text/javascript'; s.src = '//zn_3fklnydto3dcear-gamestop.siteintercept.qualtrics.com/WRSiteInterceptEngine/?Q_SIID=SI_aVJVHqdwJZ8cwx7&Q_LOC=' + encodeURIComponent(window.location.href) + '&Q_SIPREVIEW=FALSE'; if (document.body) { document.body.appendChild(s); document.body.appendChild(d); } })();
        } else {
            location.href = '/gs/help/contact.aspx';
        }
    },
    write: function (script) {
        if (this.settings.desktopActive) {
            var container = document.getElementById(this.id);
            container.innerHTML = script;
            eval(container.getElementsByTagName("script")[0].innerHTML);
        }
    }
};

function printConfirmation() {
    $('#pop-feedback').hide();
    window.print();
    return false;
}