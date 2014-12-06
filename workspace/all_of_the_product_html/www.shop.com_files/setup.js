mybuys.setClient("SHOPCOM");

mybuys.enableZones();

mybuys.setFailOverMsecs(5000);

mybuys.base_initPage = mybuys.initPage;
mybuys.initPage = function()
{
     if((this.params["pt"]) && (this.params["pt"].indexOf("purchase") != -1))
     {
        if(this.params['email'])
        {
             var testemail = Math.max(this.params['email'].toUpperCase().indexOf("@SHOP.COM"),this.params['email'].toUpperCase().indexOf("@MARKETAMERICA.COM"),this.params['email'].toUpperCase().indexOf("@TST.COM"), this.params['email'].toUpperCase().indexOf("@YOPMAIL.COM"),this.params['email'].toUpperCase().indexOf("@TEST.COM"),this.params['email'].toUpperCase().indexOf("@TESTMAY.COM"),this.params['email'].toUpperCase().indexOf("JAD052813@FLORIDA.COM"));
             if(testemail<0)
             {
                  this.base_initPage();
             }
        }
        else
        {
             this.base_initPage();
        }
     }
     else
     {
          this.base_initPage();
     }
}
