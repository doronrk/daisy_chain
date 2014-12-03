
  




  var bkItemsList;
  
  var vendorID = 1;
  var bkVendor = document.getElementById('AUWLBkVendorID');
  if (bkVendor && bkVendor.innerHTML && bkVendor.innerHTML > 0){
     vendorID = bkVendor.innerHTML;
  }
  
  var AddToAUWLButton = document.getElementById('AddToAUWLButton');
  if(AddToAUWLButton) {
     function AddToAUWL() {
       var s;
       if(typeof AUWLBook=='undefined') {
         s=document.createElement('script');
         s.setAttribute('src','https://www.amazon.com/wishlist/add.js?vendor=' + vendorID);
         document.body.appendChild(s);
       }
       function f(){(typeof AUWLBook=='undefined')?setTimeout(f,200):AUWLBook.showPopover({name: ''});};
       f();
     };
     var link = document.createElement('A');
     link.href = 'javascript:AddToAUWL()';
     link.title = 'Add to Amazon Wish List';
     var image = document.createElement('IMG');
     image.style.border = 'none';
     image.src = "http://g-ecx.images-amazon.com/images/G/01/gifts/registries/wishlist/uwl/ext/add-to-uwl-txt-sm._V191754442_.gif";
     link.appendChild(image);
     AddToAUWLButton.parentNode.insertBefore(link,AddToAUWLButton);
   }

