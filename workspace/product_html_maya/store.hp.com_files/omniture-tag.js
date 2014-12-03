var hpmmd=window.hpmmd||{type: 'Unity eCommerce', page:{events:[]}, product:{list:[]},user:{},legacy:{},promo:{},search:{}};
var userType = "${userType}";
var pagelevel="Home Page";
var HeirarchyList=new Array();
var Heirarchy_Len;
function get_cookies_array() {
	 
	    var cookies = { };
	 
	    if (document.cookie && document.cookie != '') {
	        var split = document.cookie.split(';');
	        for (var i = 0; i < split.length; i++) {	            
	        var name_value = split[i].split("=");
	            name_value[0] = name_value[0].replace(/^ /, '');
	            cookies[decodeURIComponent(name_value[0])] = decodeURIComponent(name_value[1]);
	          
	        }
	    }
	 return cookies;
	}
	
function get_visitorid()
{
       var cookies = get_cookies_array();
       var user_cookie=set_visitorid(cookies);
       var start=user_cookie.indexOf("|")+1; 
	var end=user_cookie.lastIndexOf("["); 
	user_cookie=user_cookie.substring(start,end);
	return user_cookie;
}

function set_visitorid(cookies)
{
var user_cookie="";
for(var cookieName in cookies){
if (cookieName == "s_vi")
{
 user_cookie=cookies[cookieName];
}
}
return user_cookie;
}


hpmmd.page.platform="wcs web";

hpmmd.page.site="hhos";	
hpmmd.page.store_type="hhos";
hpmmd.product.currency="USD";
var skulist=new Array();
var Pricelist=new Array();
var XsellList=new Array();
var quantitylist=new Array();
var proInstant=new Array();
var uservalue=get_visitorid();
var orderId=getOrderId();


function configureTag(usertype,productName,section,subsection,userId)
{

pagelevel="Configure Page";
hpmmd.page.page_function="cto";

hpmmd.page.events=['config.start'];
hpmmd.page.name = productName ;
hpmmd.page.subsection = subsection;
hpmmd.page.section = section;
hpmmd.product.hierarchy = ["",hpmmd.page.section,hpmmd.page.name];

if(usertype == 'EPP_HP')
	 {
          hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered"+ ":" +userId;
        hpmmd.page.discount_tier="hpp";	 

	 }
           else if(usertype == 'EPP_00')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + userId;
        hpmmd.page.discount_tier="epp";	 
        }

	 else if(usertype == 'GS')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + userId;
        hpmmd.page.discount_tier="gen";	 
        }
        else if(userId == "-1002"){
	 hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"generic"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
        else
        {
         hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"guest"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
hpmmd.product.finding_method="browse:cto page";

}
function MDPstdTag(productName,userId,sectionValue,usertype,pagefunction)
{
 hpmmd.page.name=productName;

hpmmd.page.section=sectionValue;
	 hpmmd.page.page_function=pagefunction;
if(usertype == 'EPP_HP')
	 {
          hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered"+ ":" +userId;
        hpmmd.page.discount_tier="hpp";	 

	 }
else if(usertype == 'EPP_00')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + userId;
        hpmmd.page.discount_tier="epp";	 
        }
	 else if(usertype == 'GS')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + userId;
        hpmmd.page.discount_tier="gen";	 
        }
        else if(userId == "-1002"){
	 hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"generic"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
        else
        {
         hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"guest"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }

hpmmd.page.events=["pdp.view"];
	hpmmd.product.hierarchy=["",hpmmd.page.section,hpmmd.page.name];
        hpmmd.product.finding_method="browse:mdp page";	

}

function ErrorTag(countryname,websectionId)
{
hpmmd.page.error404="true";
hpmmd.page.section="error";
	 hpmmd.page.page_function="error";

}
function EmailReturnTag(userID,usertype,countryname,websectionId,hp_profileId,CID)
{
pagelevel="Email Return Page";
 hpmmd.page.name="Email Return Page";
	 hpmmd.page.section="Email Return Page";
	 //hpmmd.page.page_function="landing";
	 if(usertype == 'EPP_HP')
	 {
          hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered"+ ":" +hp_profileId;
        hpmmd.page.discount_tier="hpp";	 

	 }
 else if(usertype == 'EPP_00')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="epp";	 
        }

	 else if(usertype == 'GS')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="gen";	 
        }
        else if(userID == "-1002"){
	 hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"generic"+":"+userID;
        hpmmd.page.discount_tier="gen";
	 }
        else
        {
         hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"guest"+":"+userID;
        hpmmd.page.discount_tier="gen";
	 }
}
function blankTemplateTag(userId,usertype,hp_profileId,countryname,websectionId)
{
	 
	 hpmmd.page.name="faq";
	 hpmmd.page.section="faq";
	 hpmmd.page.page_function="landing";
	 if(usertype == 'EPP_HP')
	 {
          hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered"+ ":" +hp_profileId;
        hpmmd.page.discount_tier="hpp";	 

	 }
 else if(usertype == 'EPP_00')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="epp";	 
        }

	 else if(usertype == 'GS')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="gen";	 
        }
        else if(userId == "-1002"){
	 hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"generic"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
        else
        {
         hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"guest"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }

}

function plaintextTag(userId,usertype,hp_profileId,countryname,websectionId)
{
       pagelevel="Return And Exchange Page";
	 
	 hpmmd.page.name="Return And Exchange Policy";
	 hpmmd.page.section="Return And Exchange Policy";
	 hpmmd.page.page_function="landing";
	 if(usertype == 'EPP_HP')
	 {
          hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered"+ ":" +hp_profileId;
        hpmmd.page.discount_tier="hpp";	 

	 }
 else if(usertype == 'EPP_00')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="epp";	 
        }

	 else if(usertype == 'GS')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="gen";	 
        }
        else if(userId == "-1002"){
	 hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"generic"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
        else
        {
         hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"guest"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }

}

function contentTag(userId,usertype,hp_profileId,countryname,websectionId,pagename)
{
	 
	 hpmmd.page.name=pagename;
	 hpmmd.page.section="static";
	 hpmmd.page.page_function="landing";
	 if(usertype == 'EPP_HP')
	 {
          hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered"+ ":" +hp_profileId;
        hpmmd.page.discount_tier="hpp";	 

	 }
 else if(usertype == 'EPP_00')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="epp";	 
        }

	 else if(usertype == 'GS')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="gen";	 
        }
        else if(userId == "-1002"){
	 hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"generic"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
        else
        {
         hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"guest"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }

}

function homepageTag(userId,usertype,countryname,websectionId,hp_profileId,CID)
{
	 pagelevel="Home Page";
	 hpmmd.page.name="home";
	 hpmmd.page.section="home";
	 hpmmd.page.page_function="landing";
	 if(usertype == 'EPP_HP')
	 {
          hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered"+ ":" +hp_profileId+ ":" +CID;
        hpmmd.page.discount_tier="hpp";	 

	 }
 else if(usertype == 'EPP_00')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId+ ":" +CID;
        hpmmd.page.discount_tier="epp";	 
        }

	 else if(usertype == 'GS')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId+ ":" +CID;
        hpmmd.page.discount_tier="gen";	 
        }
        else if(userId == "-1002"){
	 hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"generic"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
        else
        {
         hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"guest"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }

}
function categoryTag(sectionname,userId,businessUnit,usertype,pageName,countryname,websectionId,hp_profileId,subsection,pagelevelvalue,CID)
{
     pagelevel="Category Page";
	hpmmd.page.page_function="category";

	 if(usertype == 'EPP_HP')
	 {
          hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered"+ ":" +hp_profileId+ ":" +CID;
        hpmmd.page.discount_tier="hpp";	 

	 }
 else if(usertype == 'EPP_00')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId+ ":" +CID;
        hpmmd.page.discount_tier="epp";	 
        }

	 else if(usertype == 'GS')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId+ ":" +CID;
        hpmmd.page.discount_tier="gen";	 
        }
        else if(userId == "-1002"){	
	 hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"generic"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
        else
        {
         hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"guest"+":"+userId;
        hpmmd.page.discount_tier="gen";
        }
	hpmmd.page.name=pageName;
	hpmmd.page.section=sectionname;
       hpmmd.page.subsection=subsection;
       if(pagelevelvalue=="clp")
       {
	hpmmd.product.hierarchy=["",hpmmd.page.section];
       }
       else if(pagelevelvalue=="mlp")
        {
          hpmmd.product.hierarchy=["",hpmmd.page.section,hpmmd.page.subsection];

}
else
         {
	hpmmd.product.hierarchy=["",hpmmd.page.section,hpmmd.page.subsection,hpmmd.page.name];
         }

}
function loginTag(userId,usertype,countryname,websectionId,prevurl,hp_profileId)
{
	hpmmd.page.name="sign in";
	 
	 hpmmd.page.section="customer";
	 hpmmd.page.subsection="customer";
	 hpmmd.page.page_function="customer";
         hpmmd.page.platform="wcs web";
	 hpmmd.page.discount_tier="gen";
	 hpmmd.page.store_type="hhos";
	 if(usertype == 'EPP_HP')
	 {
          hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered"+ ":" +hp_profileId;
        hpmmd.page.discount_tier="hpp";	 

	 }
 else if(usertype == 'EPP_00')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="epp";	 
        }

	 else if(usertype == 'GS')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="gen";	 
        }
        else if(userId == "-1002"){
	 hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"generic"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
        else
        {
         hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"guest"+":"+userId;
        hpmmd.page.discount_tier="gen";


	 }
console.log('hi');
if(prevurl.indexOf('GuestCheckoutView')!=-1)
{

 hpmmd.page.events=['cart.signin'];
}

}	 
function genericErrorTag(pageName,countryname,websectionId)
{
	hpmmd.page.section="error";
	hpmmd.page.subsection ="error";
	hpmmd.page.page_function="error";	
	hpmmd.page.name='general error:'+pageName;


}


function orderConfirmationTag(orderid,userId,paymenttype,usertype,countryname,websectionId,hp_profileId,CID)
{
	
	hpmmd.page.name="confirmation";
	
	
	
	hpmmd.page.section="Checkout";
	hpmmd.page.subsection ="checkout";
	hpmmd.page.page_function="checkout";
	
	 if(usertype == 'EPP_HP')
	 {
          hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered"+ ":" +hp_profileId+ ":" +CID;
        hpmmd.page.discount_tier="hpp";	 

	 }
 else if(usertype == 'EPP_00')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId+ ":" +CID;
        hpmmd.page.discount_tier="epp";	 
        }

	 else if(usertype == 'GS')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId+ ":" +CID;
        hpmmd.page.discount_tier="gen";	 
        }
        else if(userId == "-1002"){
	 hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"generic"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
        else
        {
         hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"guest"+":"+userId;
        hpmmd.page.discount_tier="gen";
        }
        hpmmd.product.purchase_id=orderid;
if(paymenttype == 'VISA' || paymenttype == 'MasterCard' || paymenttype =='AMEX' || paymenttype =='Discover')
{
hpmmd.product.payment_type="credit card" + ":" + paymenttype;
}
else
{
hpmmd.product.payment_type=paymenttype;
}

}

function accessoriesDisplayTag(partnumber,productName,pdpprice,userId,usertype,hp_profileId)
{
	hpmmd.page.name="Accessories";
	hpmmd.page.section="Accessories";
	hpmmd.page.page_function="Xsell";
        hpmmd.product.name= productName;
	 if(usertype == 'EPP_HP')
	 {
          hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered"+ ":" +hp_profileId;
        hpmmd.page.discount_tier="hpp";	 

	 }
 else if(usertype == 'EPP_00')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="epp";	 
        }

	 else if(usertype == 'GS')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="gen";	 
        }
        else if(userId == "-1002"){
	 hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"generic"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
        else
        {
         hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"guest"+":"+userId;
        hpmmd.page.discount_tier="gen";
        }
		
		
		
		hpmmd.product.list.push({ 
			"sku" : partnumber,
			"units": 1,
			"price": pdpprice
		});
		
	hpmmd.product.hierarchy=["",hpmmd.page.section,hpmmd.page.name,hpmmd.product.list[0].sku];
        hpmmd.product.finding_method="browse:accessories page";	
   

}	
function productListingTag(subsection,section,businessUnit,skuList,PriceList,userId,usertype,hp_profileId,CID,countryname,websectionId)
{
           pagelevel="PLP Page";
			hpmmd.page.page_function="plp";
			
			 if(usertype == 'EPP_HP')
	 {
          hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered"+ ":" +hp_profileId+ ":" +CID;
        hpmmd.page.discount_tier="hpp";	 

	 }
 else if(usertype == 'EPP_00')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId+ ":" +CID;
        hpmmd.page.discount_tier="epp";	 
        }

	 else if(usertype == 'GS')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId+ ":" +CID;
        hpmmd.page.discount_tier="gen";	 
        }
        else if(userId == "-1002"){
	 hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"generic"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
        else
        {
         hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"guest"+":"+userId;
        hpmmd.page.discount_tier="gen";
        }
 			hpmmd.page.events=["series.view"];
 			hpmmd.page.name="filter results";
			hpmmd.page.section=section;
			hpmmd.page.subsection=subsection;
                        
			hpmmd.product.hierarchy=["",hpmmd.page.section,hpmmd.page.subsection];
                        hpmmd.product.finding_method="browse:plp page";
		/*	for(var ctr=0;ctr<skulist.length;ctr++)
		 	{
				hpmmd.product.list.push({ 
				"sku" : skulist[ctr],
				"units":1,
				"total_price":Pricelist[ctr]
				
		}); 

		}  */
        
				
}
function productDisplayTag(sectionname,pagefunction,partNumber,itemprice,pdpprice,pagename,subsection,businessUnit,userId,usertype,seriesPartNum,countryname,websectionId)
{
	hpmmd.page.name=pagename;
	hpmmd.page.section 	=sectionname ;	
	hpmmd.page.subsection = subsection;
	hpmmd.page.page_function=pagefunction;
        hpmmd.product.name=pagename;
	 if(usertype == 'EPP_HP')
	 {
          hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered"+ ":" +userId;
        hpmmd.page.discount_tier="hpp";	 

	 }
 else if(usertype == 'EPP_00')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + userId;
        hpmmd.page.discount_tier="epp";	 
        }

	 else if(usertype == 'GS')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + userId;
        hpmmd.page.discount_tier="gen";	 
        }
        else if(userId == "-1002"){
	 hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"generic"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
        else
        {
         hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"guest"+":"+userId;
        hpmmd.page.discount_tier="gen";
        }
		
		
		
		hpmmd.product.list.push({ 
			"sku" : partNumber,
			"units": 1,
			"price": pdpprice
		});
		
		
       if(hpmmd.page.page_function == 'cto')
       {
          hpmmd.page.page_function = "cto";
        }
       else
	hpmmd.page.page_function = "pdp";
	hpmmd.page.events=["pdp.view"];
	hpmmd.product.hierarchy=["",hpmmd.page.section,hpmmd.page.subsection,hpmmd.page.name,hpmmd.product.list[0].sku];
        hpmmd.product.finding_method="browse:pdp page";	
   

}
function PDPstdTag(productName,userId,partNumber,pdpprice,HeirarchyList,sectionValue,usertype,pagefunction,countryname,websectionId,hp_profileId,CID)
{
      pagelevel="PDP Page";
	  Heirarchy_Len=HeirarchyList.length;
	hpmmd.page.name=productName;
	hpmmd.page.section 	=HeirarchyList[Heirarchy_Len-1];
    if(Heirarchy_Len>4)
	{
	hpmmd.page.subsection = HeirarchyList[2];
	}
	else
	{
	hpmmd.page.subsection = HeirarchyList[1];
	}
	hpmmd.page.page_function=pagefunction;
	
	if(hpmmd.page.section==null || hpmmd.page.section=='')
	{
	hpmmd.page.section=sectionValue;
	}
	

        hpmmd.product.name=productName;
	 if(usertype == 'EPP_HP')
	 {
          hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered"+ ":" +hp_profileId+ ":" +CID;
        hpmmd.page.discount_tier="hpp";	 

	 }
 else if(usertype == 'EPP_00')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId+ ":" +CID;
        hpmmd.page.discount_tier="epp";	 
        }

	 else if(usertype == 'GS')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId+ ":" +CID;
        hpmmd.page.discount_tier="gen";	 
        }
        else if(userId == "-1002"){
	 hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"generic"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
        else
        {
         hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"guest"+":"+userId;
        hpmmd.page.discount_tier="gen";
        }
		
		
		
		hpmmd.product.list.push({ 
			"sku" : partNumber,
			"units": 1,
			"price": pdpprice
		});
		
		
      if(hpmmd.page.page_function == 'cto')
       {
          hpmmd.page.page_function = "cto";
        }
       else
        {
	hpmmd.page.page_function = "pdp";
        }
	hpmmd.page.events=["pdp.view"];
	hpmmd.product.name=HeirarchyList[0];

	hpmmd.product.hierarchy=["",hpmmd.page.section,hpmmd.page.subsection,hpmmd.product.name,hpmmd.page.name,hpmmd.product.list[0].sku];
       hpmmd.product.finding_method="browse:pdp page";	
   

}
function AttachPageTag(skulist,skulength,Pricelist,pageName,section,userId,usertype,countryname,websectionId,hp_profileId)
{
	
	hpmmd.page.name = pageName+":upsell";
	hpmmd.page.page_function="upsell";
	
	
	 if(usertype == 'EPP_HP')
	 {
          hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered"+ ":" +hp_profileId;
        hpmmd.page.discount_tier="hpp";	 

	 }
 else if(usertype == 'EPP_00')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="epp";	 
        }

	 else if(usertype == 'GS')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="gen";	 
        }
        else if(userId == "-1002"){
	 hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"generic"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
        else
        {
         hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"guest"+":"+userId;
        hpmmd.page.discount_tier="gen";
        }
   	 for(var ctr=0;ctr<skulength;ctr++)
		{
			hpmmd.product.list.push({ 
					"sku" : skulist[ctr],
					"units": 1,
					"price": Pricelist[ctr]
			});
		}
  	
  	hpmmd.page.section=section;
  	hpmmd.page.subsection=pageName;
  	hpmmd.product.hierarchy=["PPS",hpmmd.page.section,hpmmd.page.subsection,pageName];
        hpmmd.product.finding_method="upsell :upsell page";

}
function cartDisplayTag(skulist,Pricelist,quantitylist,userId,usertype,countryname,websectionId,hp_profileId,CID)
{
     pagelevel="Cart Page";
	hpmmd.page.name="cart results";
	 hpmmd.page.section="cart";
	 hpmmd.page.subsection="cart";
	 hpmmd.page.page_function="cart";
	 if(usertype == 'EPP_HP')
	 {
          hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered"+ ":" +hp_profileId+ ":" +CID;
        hpmmd.page.discount_tier="hpp";	 

	 }
 else if(usertype == 'EPP_00')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId+ ":" +CID;
        hpmmd.page.discount_tier="epp";	 
        }

	 else if(usertype == 'GS')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId+ ":" +CID;
        hpmmd.page.discount_tier="gen";	 
        }
        else if(userId == "-1002"){
	 hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"generic"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
        else
        {
         hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"guest"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
	 for(var ctr=0;ctr<skulist.length;ctr++)
			{
			hpmmd.product.list.push({ 
					"sku" : skulist[ctr],
					"units":quantitylist[ctr],
					"price": Pricelist[ctr],
					"xsell":false
				});
					
			}
	hpmmd.page.events=["cart.view"];
          hpmmd.product.finding_method="cart:cart page";
}

function checkoutTag(skulist,quantitylist,Pricelist,userId,usertype,orderid,countryname,websectionId,hp_profileId,CID)
{
    pagelevel="Checkout Page";

	hpmmd.page.section="checkout";
	hpmmd.page.subsection ="checkout";
	hpmmd.page.page_function="checkout";
	hpmmd.page.name="shipping";
        hpmmd.page.events=["checkout.start"+":"+orderid];
	 if(usertype == 'EPP_HP')
	 {
          hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered"+ ":" +hp_profileId+ ":" +CID;
        hpmmd.page.discount_tier="hpp";	 

	 }
 else if(usertype == 'EPP_00')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId+ ":" +CID;
        hpmmd.page.discount_tier="epp";	 
        }

	 else if(usertype == 'GS')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId+ ":" +CID;
        hpmmd.page.discount_tier="gen";	 
        }
        else if(userId == "-1002"){
	 hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"generic"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
        else
        {
         hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"guest"+":"+userId;
        hpmmd.page.discount_tier="gen";
        }
			for(var ctr=0;ctr<skuList.length;ctr++)
			{
			 
			hpmmd.product.list.push({ 
					"sku" : skulist[ctr],
					"units": quantitylist[ctr],
					"price": Pricelist[ctr]
					
				});
			}


}

function searchTag(userId,searchKeyword,noofResults,skulist,Pricelist,metaauto,usertype,countryname,websectionId,hp_profileId)
{
 pagelevel="SearchResults Page";
              hpmmd.page.section="search";
		hpmmd.page.page_function="search";
		hpmmd.page.name="product search";
	 	hpmmd.page.events=['search'];
	 if(usertype == 'EPP_HP')
	 {
          hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered"+ ":" +hp_profileId;
        hpmmd.page.discount_tier="hpp";	 

	 }
 else if(usertype == 'EPP_00')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="epp";	 
        }

	 else if(usertype == 'GS')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="gen";	 
        }
        else if(userId == "-1002"){
	 hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"generic"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
        else
        {
         hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"guest"+":"+userId;
        hpmmd.page.discount_tier="gen";
        }
             /* for(var ctr=0;ctr<skulist.length;ctr++)
			{
			 
			hpmmd.product.list.push({ 
					"sku1" : skulist[ctr],
					"units1": 1,
					"price1": Pricelist[ctr],
					"position": ctr+1,
					"catEntry":positionList[ctr] 
				});
			
			}*/

		hpmmd.search.keywords=searchKeyword;	
		hpmmd.search.number_of_results=noofResults;
                if(metaauto == 'valid')
              {
               hpmmd.search.meta="auto";
              }
               else
              {
                hpmmd.search.meta="null";

              }
        hpmmd.product.finding_method="search:search results page";
}


function getposition(catEntryId)
{
var s= catEntryId;
var skuPosition;
if(hpmmd.product.list!= null)
{
for(var ctr=0;ctr<hpmmd.product.list.length;ctr++)
			{
			
			if ( s == hpmmd.product.list[ctr].catEntry)
			{
			skuPosition = hpmmd.product.list[ctr].position;
			break;	
			}			
	}
}
return skuPosition;
}
function CartQuantityChange(skulist,Pricelist,quantitylist)
{
    
      hpmmd.product.list.length=0;
      for(var ctr=0;ctr<skulist.length;ctr++)
			{
			hpmmd.product.list.push({ 
					"sku" : skulist[ctr],
					"units":quantitylist[ctr],
					"price": Pricelist[ctr],
					"xsell":false
				});
					
			}
      if(!(typeof trackMetrics=='undefined'))
{
      trackMetrics( 'new.page', { page: {site:'hhos',name: 'cart', section:'cart',subsection:'cart',page_function:'cart',events: ['cart.view']},product: {list: hpmmd.product.list}});
}
}
function UserRegister(userId,usertype,countryname,websectionId,hp_profileId)
{
	 
	 hpmmd.page.name="Browse Sign In";
	 hpmmd.page.section="customer";
         hpmmd.page.subsection="customer";
	 hpmmd.page.page_function="customer";
	 if(usertype == 'EPP_HP')
	 {
          hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered"+ ":" +hp_profileId;
        hpmmd.page.discount_tier="hpp";	 

	 }
 else if(usertype == 'EPP_00')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="epp";	 
        }

	 else if(usertype == 'GS')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="gen";	 
        }
        else if(userId == "-1002"){
	 hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"generic"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
        else
        {
         hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"guest"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 
	 }
}


function orderStatusTag(userId,usertype,countryname,websectionId,hp_profileId)
{
 hpmmd.page.name="My order status";
	 hpmmd.page.section="customer";
	 hpmmd.page.page_function="gateway";
	 if(usertype == 'EPP_HP')
	 {
          hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered"+ ":" +hp_profileId;
        hpmmd.page.discount_tier="hpp";	 

	 }
 else if(usertype == 'EPP_00')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" +hp_profileId;
        hpmmd.page.discount_tier="epp";	 
        }

	 else if(usertype == 'GS')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="gen";	 
        }
        else if(userId == "-1002"){
	 hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"generic"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
        else
        {
         hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"guest"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
        for(var ctr=0;ctr<5;ctr++)
			{
			hpmmd.product.list.push({ 
					"sku" : "aaa",
					"units":1,
					"price":"50"
					
				});
					
			}
}

function UserRegisterUpdate(userId,usertype,countryname,websectionId,hp_profileId)

{
	 
	 hpmmd.page.name="my account change personal info";
	 hpmmd.page.section="customer";
         hpmmd.page.section="customer";
	 hpmmd.page.page_function="customer";
	 if(usertype == 'EPP_HP')
	 {
          hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered"+ ":" +hp_profileId;
        hpmmd.page.discount_tier="hpp";	 

	 }
 else if(usertype == 'EPP_00')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="epp";	 
        }

	 else if(usertype == 'GS')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="gen";	 
        }
        else if(userId == "-1002"){
	 hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"generic"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
        else
        {
         hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"guest"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }


}

function addressBookTag(userId,usertype,countryname,websectionId,hp_profileId)

{
	 
	 hpmmd.page.name="Address Book";
	 hpmmd.page.section="customer";
	 hpmmd.page.page_function="gateway";
	 if(usertype == 'EPP_HP')
	 {
          hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered"+ ":" +hp_profileId;
        hpmmd.page.discount_tier="hpp";	 

	 }
 else if(usertype == 'EPP_00')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="epp";	 
        }

	 else if(usertype == 'GS')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="gen";	 
        }
        else if(userId == "-1002"){
	 hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"generic"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
        else
        {
         hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"guest"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 
	 }


}

function addAddressTag(userId,usertype,countryname,websectionId,hp_profileId)

{
	 
	 hpmmd.page.name="my account add address";
	 hpmmd.page.section="customer";
         hpmmd.page.subsection="customer";
	 hpmmd.page.page_function="customer";
 if(usertype == 'EPP_HP')
	 {
          hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered"+ ":" +hp_profileId;
        hpmmd.page.discount_tier="hpp";	 

	 }
 else if(usertype == 'EPP_00')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="epp";	 
        }

	 else if(usertype == 'GS')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="gen";	 
        }
        else if(userId == "-1002"){
	 hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"generic"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
        else
        {
         hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"guest"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }


}

function editAddressTag(userId,usertype,countryname,websectionId,hp_profileId)

{
	 
	 hpmmd.page.name="my account edit address";
	 hpmmd.page.section="customer";
         hpmmd.page.subsection="customer";
	 hpmmd.page.page_function="customer";
	 if(usertype == 'EPP_HP')
	 {
          hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered"+ ":" +hp_profileId;
        hpmmd.page.discount_tier="hpp";	 

	 }
 else if(usertype == 'EPP_00')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="epp";	 
        }

	 else if(usertype == 'GS')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="gen";	 
        }
        else if(userId == "-1002"){
	 hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"generic"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
        else
        {
         hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"guest"+":"+userId;
        hpmmd.page.discount_tier="gen";
	
	 }


}

function myOrderTag(userId,usertype,countryname,websectionId,hp_profileId)
{

	 hpmmd.page.name="order status";
	 hpmmd.page.section="customer";
	 hpmmd.page.page_function="service";
	 if(usertype == 'EPP_HP')
	 {
          hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered"+ ":" +hp_profileId;
        hpmmd.page.discount_tier="hpp";	 

	 }
 else if(usertype == 'EPP_00')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="epp";	 
        }

	 else if(usertype == 'GS')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="gen";	 
        }
        else if(userId == "-1002"){
	 hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"generic"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
        else
        {
         hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"guest"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
}
function myOrderStatusTag(userId,usertype,countryname,websectionId,hp_profileId)
{
pagelevel="OrderStatus Page";
	 hpmmd.page.name="order status";
	 hpmmd.page.section="customer";
	 hpmmd.page.page_function="customer";
	 if(usertype == 'EPP_HP')
	 {
          hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered"+ ":" +hp_profileId;
        hpmmd.page.discount_tier="hpp";	 

	 }
 else if(usertype == 'EPP_00')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="epp";	 
        }

	 else if(usertype == 'GS')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="gen";	 
        }
        else if(userId == "-1002"){
	 hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"generic"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
        else
        {
         hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"guest"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 
	 }
}
function viewOrderTag(userId,usertype,countryname,websectionId,hp_profileId)
{
pagelevel="ViewOrders Page";
hpmmd.page.name="view order details";
	 hpmmd.page.section="customer";
	 hpmmd.page.page_function="customer";
	 if(usertype == 'EPP_HP')
	 {
          hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered"+ ":" +hp_profileId;
        hpmmd.page.discount_tier="hpp";	 

	 }
 else if(usertype == 'EPP_00')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="epp";	 
        }

	 else if(usertype == 'GS')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="gen";	 
        }
        else if(userId == "-1002"){
	 hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"generic"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
        else
        {
         hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"guest"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
}
function forgotPasswordTag(userId,usertype,countryname,websectionId,hp_profileId)
{
 pagelevel="Forgot Password Page";
hpmmd.page.name="password recovery";
	 hpmmd.page.section="customer";
         hpmmd.page.subsection="customer";
	 hpmmd.page.page_function="Info";
	 if(usertype == 'EPP_HP')
	 {
          hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered"+ ":" +hp_profileId;
        hpmmd.page.discount_tier="hpp";	 

	 }
 else if(usertype == 'EPP_00')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="epp";	 
        }

	 else if(usertype == 'GS')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="gen";	 
        }
        else if(userId == "-1002"){
	 hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"generic"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
        else
        {
         hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"guest"+":"+userId;
        hpmmd.page.discount_tier="gen";
        }
}
function CategoryAccessTag(userId,section,usertype,countryname,websectionId,hp_profileId)
{
        hpmmd.page.name=section;
	 hpmmd.page.section=section;
	 hpmmd.page.page_function="category";
	 if(usertype == 'EPP_HP')
	 {
          hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered"+ ":" +hp_profileId;
        hpmmd.page.discount_tier="hpp";	 

	 }
 else if(usertype == 'EPP_00')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="epp";	 
        }

	 else if(usertype == 'GS')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="gen";	 
        }
        else if(userId == "-1002"){
	 hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"generic"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
        else
        {
         hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"guest"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 
	 }


}
function CategoryInkTag(userId,section,usertype,countryname,websectionId,hp_profileId)
{
        hpmmd.page.name=section;
	 hpmmd.page.section=section;
	 hpmmd.page.page_function="category";
	 if(usertype == 'EPP_HP')
	 {
          hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered"+ ":" +hp_profileId;
        hpmmd.page.discount_tier="hpp";	 

	 }
 else if(usertype == 'EPP_00')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="epp";	 
        }

	 else if(usertype == 'GS')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="gen";	 
        }
        else if(userId == "-1002"){
	 hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"generic"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
        else
        {
         hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"guest"+":"+userId;
        hpmmd.page.discount_tier="gen";
	
	 }


}
function CarePackTag(userId,section,usertype,countryname,websectionId,hp_profileId)
{
        hpmmd.page.name=section;
	 hpmmd.page.section=section;
	 hpmmd.page.page_function="category";
	 if(usertype == 'EPP_HP')
	 {
          hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered"+ ":" +hp_profileId;
        hpmmd.page.discount_tier="hpp";	 

	 }
 else if(usertype == 'EPP_00')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="epp";	 
        }

	 else if(usertype == 'GS')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="gen";	 
        }
        else if(userId == "-1002"){
	 hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"generic"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
        else
        {
         hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"guest"+":"+userId;
        hpmmd.page.discount_tier="gen";
	
	 }
}
function HPEPPRegisterTag(userId,usertype,countryname,websectionId,hp_profileId)
{
        hpmmd.page.name="HP EPP registration";
	 hpmmd.page.section="customer";
         hpmmd.page.subsection="customer";
	 hpmmd.page.page_function="customer";
	 if(usertype == 'EPP_HP')
	 {
          hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered"+ ":" +hp_profileId;
        hpmmd.page.discount_tier="hpp";	 

	 }
 else if(usertype == 'EPP_00')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="epp";	 
        }

	 else if(usertype == 'GS')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="gen";	 
        }
        else if(userId == "-1002"){
	 hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"generic"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
        else
        {
         hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"guest"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 
	 }


}
function orderHistoryTag(userId,usertype,countryname,websectionId,hp_profileId)
{
        pagelevel="OrderHistory Page";
        hpmmd.page.name="Order History";
	 hpmmd.page.section="customer";
         hpmmd.page.subsection="customer";
	 hpmmd.page.page_function="customer";
	 if(usertype == 'EPP_HP')
	 {
          hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered"+ ":" +hp_profileId;
        hpmmd.page.discount_tier="hpp";	 

	 }
 else if(usertype == 'EPP_00')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="epp";	 
        }

	 else if(usertype == 'GS')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="gen";	 
        }
        else if(userId == "-1002"){
	 hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"generic"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
        else
        {
         hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"guest"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
}
function guestCheckoutTag(userId,usertype,skulist,Pricelist,quantitylist,countryname,websectionId,hp_profileId)
{
 pagelevel="GuestCheckout Page";
 hpmmd.page.name="sign in";
	 
	 hpmmd.page.section="checkout";
	 hpmmd.page.subsection="checkout";
	 hpmmd.page.page_function="checkout";
         hpmmd.page.platform="wcs web";
	 hpmmd.page.discount_tier="gen";
         hpmmd.page.events=['cart.signin'];
	 hpmmd.page.store_type="hhos";
	 if(usertype == 'EPP_HP')
	 {
          hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered"+ ":" +hp_profileId;
        hpmmd.page.discount_tier="hpp";	 

	 }
 else if(usertype == 'EPP_00')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="epp";	 
        }

	 else if(usertype == 'GS')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="gen";	 
        }
        else if(userId == "-1002"){
	 hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"generic"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
        else
        {
         hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"guest"+":"+userId;
        hpmmd.page.discount_tier="gen";

	 }
      for(var ctr=0;ctr<skulist.length;ctr++)
		 	{
				hpmmd.product.list.push({ 
				"sku" : skulist[ctr],
				"units":quantitylist[ctr],
				"total_price":Pricelist[ctr]
				
		});
}


}

function SessionTimedOutTag(userId,usertype,countryname,websectionId)
{
	hpmmd.page.name="session timed out page";
	 
	 hpmmd.page.section="customer";
	 hpmmd.page.subsection="customer";
	 hpmmd.page.page_function="customer";
         hpmmd.page.platform="wcs web";
	 hpmmd.page.discount_tier="gen";
	 hpmmd.page.store_type="hhos";
	 if(usertype == 'EPP_HP')
	 {
          hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered"+ ":" +userId;
        hpmmd.page.discount_tier="hpp";	 

	 }
 else if(usertype == 'EPP_00')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + userId;
        hpmmd.page.discount_tier="epp";	 
        }

	 else if(usertype == 'GS')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + userId;
        hpmmd.page.discount_tier="gen";	 
        }
        else if(userId == "-1002"){
	 hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"generic"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
        else
        {
         hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"guest"+":"+userId;
        hpmmd.page.discount_tier="gen";

	 }
}	 

function manageSubscriptionTag(userId,usertype,countryname,websectionId,hp_profileId)
{
	hpmmd.page.name="my account manage subscriptions";
	 
	 hpmmd.page.section="customer";
	 hpmmd.page.subsection="customer";
	 hpmmd.page.page_function="customer";
         hpmmd.page.platform="wcs web";
	 hpmmd.page.discount_tier="gen";
	 hpmmd.page.store_type="hhos";
	  if(usertype == 'EPP_HP')
	 {
          hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered"+ ":" +hp_profileId;
        hpmmd.page.discount_tier="hpp";	 

	 }
 else if(usertype == 'EPP_00')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="epp";	 
        }

	 else if(usertype == 'GS')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" +hp_profileId;
        hpmmd.page.discount_tier="gen";	 
        }
        else if(userId == "-1002"){
	 hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"generic"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
        else
        {
         hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"guest"+":"+userId;
        hpmmd.page.discount_tier="gen";

	 }
}

function OrderDeclineTag(userId,usertype,countryname,websectionId,hp_profileId,CID)
{
	hpmmd.page.name="order decline page";
	 
	 hpmmd.page.section="customer";
	 hpmmd.page.subsection="customer";
	 hpmmd.page.page_function="customer";
         hpmmd.page.platform="wcs web";
	 hpmmd.page.discount_tier="gen";
	 hpmmd.page.store_type="hhos";
	 if(usertype == 'EPP_HP')
	 {
          hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered"+ ":" +hp_profileId+ ":" +CID;
        hpmmd.page.discount_tier="hpp";	 

	 }
 else if(usertype == 'EPP_00')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId+ ":" +CID;
        hpmmd.page.discount_tier="epp";	 
        }

	 else if(usertype == 'GS')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId+ ":" +CID;
        hpmmd.page.discount_tier="gen";	 
        }
        else if(userId == "-1002"){
	 hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"generic"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
        else
        {
         hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"guest"+":"+userId;
        hpmmd.page.discount_tier="gen";

	 }
}

function orderDetailsTag(userId,usertype,countryname,websectionId,hp_profileId)
{
	hpmmd.page.name="order details";
	 
	 hpmmd.page.section="customer";
	 hpmmd.page.subsection="customer";
	 hpmmd.page.page_function="customer";
         hpmmd.page.platform="wcs web";
	 hpmmd.page.discount_tier="gen";
	 hpmmd.page.store_type="hhos";
	 if(usertype == 'EPP_HP')
	 {
          hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered"+ ":" +hp_profileId;
        hpmmd.page.discount_tier="hpp";	 

	 }
 else if(usertype == 'EPP_00')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="epp";	 
        }

	 else if(usertype == 'GS')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="gen";	 
        }
        else if(userId == "-1002"){
	 hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"generic"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
        else
        {
         hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"guest"+":"+userId;
        hpmmd.page.discount_tier="gen";

	 }
}	
function orderHistoryTag(userId,usertype,countryname,websectionId,hp_profileId)
{
	hpmmd.page.name="order history";
	 
	 hpmmd.page.section="customer";
	 hpmmd.page.subsection="customer";
	 hpmmd.page.page_function="customer";
         hpmmd.page.platform="wcs web";
	 hpmmd.page.discount_tier="gen";
	 hpmmd.page.store_type="hhos";
	 if(usertype == 'EPP_HP')
	 {
          hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered"+ ":" +hp_profileId;
        hpmmd.page.discount_tier="hpp";	 

	 }
 else if(usertype == 'EPP_00')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="epp";	 
        }

	 else if(usertype == 'GS')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="gen";	 
        }
        else if(userId == "-1002"){
	 hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"generic"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
        else
        {
         hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"guest"+":"+userId;
        hpmmd.page.discount_tier="gen";

	 }
}

function resetPwdTag(userId,usertype,hp_profileId,countryname,websectionId)
{
	 
	 hpmmd.page.name="change password";
	 hpmmd.page.section="customer";
	 hpmmd.page.page_function="info";
	 if(usertype == 'EPP_HP')
	 {
          hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered"+ ":" +hp_profileId;
        hpmmd.page.discount_tier="hpp";	 

	 }
 else if(usertype == 'EPP_00')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="epp";	 
        }

	 else if(usertype == 'GS')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="gen";	 
        }
        else if(userId == "-1002"){
	 hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"generic"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
        else
        {
         hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"guest"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }

}
function myAccountInfoTag(userId,usertype,countryname,websectionId,hp_profileId)

{
	 
	 hpmmd.page.name="my account your info";
	 hpmmd.page.section="customer";
         hpmmd.page.subsection="customer";
	 hpmmd.page.page_function="customer";
	 if(usertype == 'EPP_HP')
	 {
          hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered"+ ":" +hp_profileId;
        hpmmd.page.discount_tier="hpp";	 

	 }
 else if(usertype == 'EPP_00')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="epp";	 
        }

	 else if(usertype == 'GS')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="gen";	 
        }
        else if(userId == "-1002"){
	 hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"generic"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
        else
        {
         hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"guest"+":"+userId;
        hpmmd.page.discount_tier="gen";
	
	 }
}
function SendUsEmail(userId,usertype,countryname,websectionId,hp_profileId)

{
	 pagelevel="Send Email Page";
	 hpmmd.page.name="Send Email Page";
	 hpmmd.page.section="customer";
         hpmmd.page.subsection="customer";
	 hpmmd.page.page_function="customer";
	 if(usertype == 'EPP_HP')
	 {
          hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered"+ ":" +hp_profileId;
        hpmmd.page.discount_tier="hpp";	 

	 }
 else if(usertype == 'EPP_00')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="epp";	 
        }

	 else if(usertype == 'GS')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="gen";	 
        }
        else if(userId == "-1002"){
	 hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"generic"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
        else
        {
         hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"guest"+":"+userId;
        hpmmd.page.discount_tier="gen";
	
	 }
}
function managePrintersTag(userId,usertype,countryname,websectionId,hp_profileId)
{
	hpmmd.page.name="my account manage printers";
	 
	 hpmmd.page.section="customer";
	 hpmmd.page.subsection="customer";
	 hpmmd.page.page_function="customer";
         hpmmd.page.platform="wcs web";
	 
	  if(usertype == 'EPP_HP')
	 {
          hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered"+ ":" +hp_profileId;
        hpmmd.page.discount_tier="hpp";	 

	 }
 else if(usertype == 'EPP_00')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="epp";	 

	 }
	 else if(usertype == 'GS')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="gen";	 
        }
        else if(userId == "-1002"){
	 hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"generic"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
        else
        {
         hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"guest"+":"+userId;
        hpmmd.page.discount_tier="gen";

	 }
}
function searchFinderTag(userId,usertype,hp_profileId,countryname,websectionId)
{

	  hpmmd.page.section="Ink Toner & paper";
		hpmmd.page.page_function="supplies finder";
		hpmmd.page.name="Ink Toner & paper";
	 	hpmmd.page.events=['search'];
	 if(usertype == 'EPP_HP')
	 {
          hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered"+ ":" +hp_profileId;
        hpmmd.page.discount_tier="hpp";	 

	 }
 else if(usertype == 'EPP_00')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="epp";	 
        }

	 else if(usertype == 'GS')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="gen";	 
        }
        else if(userId == "-1002"){
	 hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"generic"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
        else
        {
         hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"guest"+":"+userId;
        hpmmd.page.discount_tier="gen";
        }
}
function productFinderTag(userId,usertype,hp_profileId,countryname,websectionId,pagename)
{
 hpmmd.page.section="Accessories";
		hpmmd.page.page_function="Category";
		hpmmd.page.name=pagename;
	 	
	 if(usertype == 'EPP_HP')
	 {
          hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered"+ ":" +hp_profileId;
        hpmmd.page.discount_tier="hpp";	 

	 }
 else if(usertype == 'EPP_00')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="epp";	 
        }

	 else if(usertype == 'GS')
	 {
        hpmmd.user.login="Y";
	 hpmmd.user.id=uservalue+ ":" + "registered" + ":" + hp_profileId;
        hpmmd.page.discount_tier="gen";	 
        }
        else if(userId == "-1002"){
	 hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"generic"+":"+userId;
        hpmmd.page.discount_tier="gen";
	 }
        else
        {
         hpmmd.user.login="N";
	 hpmmd.user.id=uservalue+ ":"+"guest"+":"+userId;
        hpmmd.page.discount_tier="gen";
        }

}


function metrics(locale)
{
if(locale=='en_US')
{
if (document.URL.indexOf("itcs.hp.com") != -1){
<!--//--><![CDATA[//><!--
document.write("<script type='text/javascript' src='//nexus.ensighten.com/hp/etr2_0_dev/Bootstrap.js'></script>");
//--><!]]>
}
else if(document.URL.indexOf("houston.hp.com") != -1)
{
<!--//--><![CDATA[//><!--
document.write("<script type='text/javascript' src='//nexus.ensighten.com/hp/etr2_0_stage/Bootstrap.js'></script>");
//--><!]]>

}
else if(document.URL.indexOf("store.hp.com") != -1)
{
<!--//--><![CDATA[//><!--
document.write("<script type='text/javascript' src='//nexus.ensighten.com/hp/etr2_0_prod/Bootstrap.js'></script>");
//--><!]]>
}	
else
{
<!--//--><![CDATA[//><!--
document.write("<script type='text/javascript' src='//nexus.ensighten.com/hp/etr2_0_stage/Bootstrap.js'></script>");
//--><!]]>
}

}
else if((locale=='en_AU')||(locale=='en_MY')||(locale=='en_SG')||(locale=='ko_KR'))
{
if(document.URL.indexOf("itcs.hp.com") != -1)
{
<!--//--><![CDATA[//><!--
document.write("<script type='text/javascript' src='//nexus.ensighten.com/hp/apj_dev/Bootstrap.js'></script>");
//--><!]]>
}
else if(document.URL.indexOf("glbecomtran-ext.houston.hp.com") != -1)
{
<!--//--><![CDATA[//><!--
document.write("<script type='text/javascript' src='//nexus.ensighten.com/hp/apj_prod/Bootstrap.js'></script>");
//--><!]]>

}
else if(document.URL.indexOf("houston.hp.com") != -1)
{
<!--//--><![CDATA[//><!--
document.write("<script type='text/javascript' src='//nexus.ensighten.com/hp/apj_stage/Bootstrap.js'></script>");
//--><!]]>
}	
else
{
<!--//--><![CDATA[//><!--
document.write("<script type='text/javascript' src='//nexus.ensighten.com/hp/apj_stage/Bootstrap.js'></script>");
//--><!]]>
}
}
else
{
console.log("Hi");
}
}
function appendDate()
{
var appendDate=new Date();
var serialNum = (appendDate.getUTCDate()+''+(appendDate.getMonth()+1)+''+appendDate.getFullYear());
return serialNum;
}

function get_cookies_array() {
	 
	    var cookies = { };
	 
	    if (document.cookie && document.cookie != '') {
	        var split = document.cookie.split(';');
	        for (var i = 0; i < split.length; i++) {	            
	        var name_value = split[i].split("=");
	            name_value[0] = name_value[0].replace(/^ /, '');
	            cookies[decodeURIComponent(name_value[0])] = decodeURIComponent(name_value[1]);
	          
	        }
	    }
	 return cookies;
	}

function setorderId(cookies)
{
var orderId;
for(var cookieName in cookies) {
	 if (cookieName.substring(0,14) == 'WC_CartOrderId')
	  {
  			
 			orderId=cookies[cookieName];
	 		  }
}
return orderId;
}
function setCTOorderId(cookies)
{
var CTOorderId;
for(var cookieName in cookies) {
	 if (cookieName == 'Temp')
	  {
  			
 			CTOorderId=cookies[cookieName];
	 		  }
}
return CTOorderId;
}
function getCTOOrderId()
{
	var cookies = get_cookies_array();
	var CTOorderNumber = setCTOorderId(cookies);
	return CTOorderNumber;
	}
function getOrderId()
{
	var cookies = get_cookies_array();
	var orderNumber = setorderId(cookies);
	return orderNumber;
	}

function getEvents()
{
			var itemcount; 
			var CTOorderId=getCTOOrderId();
                     console.log(CTOorderId);
                         var orderId=getOrderId();
			if(orderId==''||orderId==null||orderId==undefined||orderId=="undefined")
			{
                      if(CTOorderId==''||CTOorderId==null||CTOorderId==undefined||orderId=="undefined")

                      {
			itemcount ='';
                          var Temporder=Math.floor(Math.random() * 900000) + 10000;
       			document.cookie="Temp="+Temporder+"; path=/;domain=.hp.com";
       			console.log(Temporder);
                       }
			}
			else
			{
			//var cart_total = document.getElementById ('minishopcart_total').innerHTML;
			//itemcount =cart_total.trim();
                      itemcount =1; 
                     }
                    return itemcount;
}
function getcartValue(productId)
{
                    var itemvalue=getEvents();
                    var CTOorderId=getCTOOrderId();
                     
			if(itemvalue==''||itemvalue==0)
			{
			eventsList=['cart.new','cart.add'+':'+productId];
			}
			else
			{
		 if(orderId==''||orderId==null)
                       {
                        
                                      eventsList=['cart.add'+':'+productId+getCTOOrderId()];
                          
                       }
                        else if(CTOorderId==''||CTOorderId==null||CTOorderId==undefined)
                        { 
                                              
			eventsList=['cart.add'+':'+productId+orderId];

                       }
                       else if(CTOorderId.length<6)
                        {                       
			eventsList=['cart.add'+':'+productId+getCTOOrderId()];

                       }
                       else
                       {
                       eventsList=['cart.add'+':'+productId+orderId];

                        }
			}
      return eventsList;
			
}
function getcountry(language)
{
var target_country=document.querySelector("meta[name=target_country]");

if(language=='en_US')
{
target_country.setAttribute('content', 'US'); 
}
else if(language=='en_AU')
{
target_country.setAttribute('content', 'AU'); 
}
else if(language=='en_MY')
{
target_country.setAttribute('content', 'MY');
}
else if	(language=='en_SG')
{
target_country.setAttribute('content', 'SG');
}
else 
{
target_country.setAttribute('content', 'KR');
}
return target_country;
}	


function getwebsectionId(language)
{
var web_section_id=document.querySelector("meta[name=web_section_id]");

if(language=='en_US')
{
web_section_id.setAttribute('content', 'r329'); 
}
else if(language=='en_AU' ||language=='en_MY'||language=='en_SG'||language=='ko_KR')
{
web_section_id.setAttribute('content', 'r10066'); 
}
else
{
web_section_id.setAttribute('content', 'r10066');
}
return web_section_id;
}	

