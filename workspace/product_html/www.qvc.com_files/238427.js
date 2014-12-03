page.onReady((function(){if($('.productDetailDescriptionFileLinkArea'))
{
//var fileLinks=$('.productDetailDescriptionFileLinkArea')[0];
var subTabs=$('.productDetailDescriptionFileLinkArea').find('.subTabs')[0];

if(!!subTabs){
var anchorTags=subTabs.getElementsByTagName('a');

for(i=0;i<anchorTags.length;i++)
{
	if(anchorTags[i].getAttribute('href').match(/energy/i))
	{
	energyLink=anchorTags[i].getAttribute('href');
	break;
	}
	else
	{
	continue;
	}
}
}
if(typeof(energyLink) != "undefined"){
var energyLogoImg=document.createElement('img');
var eLink=document.createElement('span');
var eLinkA=document.createElement('a');
energyLogoImg.setAttribute('src','http://images.qvc.com/is/image/pic/logos/energyGuideLogo.gif?$usthumb$');
energyLogoAnchor=document.createElement('a');
energyLogoAnchor.setAttribute('href',energyLink);
energyLogoAnchor.setAttribute('id','eG');
energyLogoAnchor.setAttribute('target','_blank');
energyLogoAnchor.appendChild(energyLogoImg);
eLinkA.setAttribute('class','arrowSecondary normal');
eLinkA.setAttribute('href',energyLink);
eLinkA.setAttribute('target','_blank');
eLinkA.textContent="See energy guide";
eLink.appendChild(eLinkA);
energyLogoAnchor.appendChild(eLink);
if(document.getElementById('divProductShippingAndHandlingInfo')){
if(window.screen.width > 640){
document.getElementById('divProductShippingAndHandlingInfo').appendChild(energyLogoAnchor);
energyLogoImg.style.height='44px';
energyLogoImg.style.width='50px';
if(document.getElementById('parShippingAndHandlingDetails')!=undefined || document.getElementById('parQvcPrice')!=undefined)
energyLogoImg.style.marginTop='9px';
eLink.style.display='block';
eLink.style.paddingBottom='5px';
}
/* else
{
if(window.screen.width > 320){
document.getElementById('divProductPricingInfo').appendChild(energyLogoAnchor);
energyLogoAnchor.style.top='-58px';
energyLogoAnchor.style.float='right';
energyLogoAnchor.style.position='relative';
energyLogoAnchor.style.height='5px';
energyLogoImg.style.height='44px';
energyLogoImg.style.width='50px';
energyLogoImg.style.float='right';
eLink.style.display='block';
eLinkA.style.fontSize='11px';} */
else
{
document.getElementById('divProductPricingInfo').appendChild(energyLogoAnchor);
energyLogoAnchor.style.top='-43px';
energyLogoAnchor.style.float='right';
energyLogoAnchor.style.position='relative';
energyLogoAnchor.style.height='5px';
energyLogoImg.style.height='45px';
energyLogoImg.style.width='50px';
energyLogoImg.style.float='right';
eLink.style.display='block';
eLink.style.top='-64px';
eLink.style.position='relative';
eLinkA.style.fontSize='11px';
}
}
}

}
}
)());
