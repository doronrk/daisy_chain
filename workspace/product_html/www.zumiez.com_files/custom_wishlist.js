(function(){

    var wishlistCreateDialog;
    var wishlistItemAddedDialog;
    var wishlistAddFailDialog;
    var wishlistCreateFailDialog;
    var confirmDialog;

    Zumiez = Zumiez || {};

    Zumiez.wishlist = Zumiez.wishlist ||  {};

    Zumiez.wishlist.getItemAddedDialog = function() {

      if(wishlistItemAddedDialog) return wishlistItemAddedDialog;

      var content = new Element('div');
      var itemInfo = new Element('div', {'class': 'item-info'});

      wishlistItemAddedDialog = new Enterprise.Widget.Dialog('This item has been added to your Wishlist', content, 'wishlist-item-added-dialog');

      var imageWrapper = new Element('div', {'class':'item-image'});
      var image = new Element('img');
      var name = new Element('p', {'class':'item-name'});
      var price = new Element('p', {'class':'item-price'});
      var link = new Element('a', {'class':'wishlist-link'}).update('View my wishlist');
      imageWrapper.insert(image);
      itemInfo.insert(imageWrapper);
      itemInfo.insert(name);
      itemInfo.insert(price);
      itemInfo.insert(link);
      content.insert(itemInfo);

      wishlistItemAddedDialog.update = function(itemName, itemPrice, itemImagePath) {
        image.writeAttribute('src', itemImagePath);
        name.update(itemName);
        price.update(itemPrice);
        return wishlistItemAddedDialog;
      };

      wishlistItemAddedDialog.setWishlistUrl = function(wishlistUrl) {
        link.writeAttribute('href', wishlistUrl);
        return wishlistItemAddedDialog;
      };

      wishlistItemAddedDialog.addCMSContent = function(cmsContent) {
        content.insert(cmsContent);
      }

      return wishlistItemAddedDialog;

    };

    Zumiez.wishlist.getCreateDialog = function(createUrl) {

      if(wishlistCreateDialog) return wishlistCreateDialog;

      var createForm = new Element('form', {'method': 'post', 'action': createUrl || ''});
      var wishlistVarien = new VarienForm(createForm);

      var nameField = new Element('input', {'type':'text', 'placeholder': 'NAME YOUR WISHLIST', 'id':'wishlist-name', 'maxlength':255, 'class':'input-text required-entry validate-length maximum-length-255', 'name':'name'});
      createForm.insert(nameField);
      var wishlistCreateDialog = new Enterprise.Widget.Dialog('Create New Wishlist', createForm, 'create-wishlist-dialog');

      wishlistCreateDialog.showWithCallback = function (callback) {
        this.onSaveCallback = callback;
        this.show();
      };

      wishlistCreateDialog.cancel = function () {
        this.onSaveCallback = null;
        this.hide();
      };

      wishlistCreateDialog.getWishlistName = function() {
        return nameField.getValue();
      };

      wishlistCreateDialog.getForm = function() {
        return createForm;
      };

      var closeButton = new Element('button', {'type': 'button', 'class': 'button btn-cancel'});
      closeButton.update('Cancel');
      closeButton.observe('click', function (e) {
        wishlistCreateDialog.cancel();
        e.stop();
      });

      var saveButton = new Element('button', {'type': 'submit', 'class': 'button btn-save'});
      saveButton.update('Create Wishlist');



      var save = function() {
        if(wishlistVarien.validator.validate()) {

          if (wishlistCreateDialog.onSaveCallback) {
            wishlistCreateDialog.onSaveCallback.call(wishlistCreateDialog);
            wishlistCreateDialog.onSaveCallback = null;
          }
          wishlistCreateDialog.hide();
        }
      }

      //TODO: clicking the save button doesn't submit the form, but pressing enter does. I can't figure out why
      createForm.observe('submit', function(e) {
        save();
        e.stop();
      });

      saveButton.observe('click', function (e) {
        save();
        e.stop();
      });

      var buttonSet = new Element('div', {'class': 'buttons-set form-buttons'});
      buttonSet.insert(closeButton);
      buttonSet.insert(saveButton);
      wishlistCreateDialog.getContent().insert(buttonSet);

      return wishlistCreateDialog;

    };

    Zumiez.wishlist.getAddItemFailDialog = function() {
      if(wishlistAddFailDialog) return wishlistAddFailDialog;
      wishlistAddFailDialog = new Enterprise.Widget.Dialog('There was an error', 'There was an error adding the item to your wishlist', 'wishlist-item-added-error-dialog');
      return wishlistAddFailDialog;
    };

    Zumiez.wishlist.getCreateWishlistFailDialog = function() {
      if(wishlistCreateFailDialog) return wishlistAddFailDialog;
      wishlistCreateFailDialog = new Enterprise.Widget.Dialog('There was an error', 'There was an error creating the wishlist', 'wishlist-create-error-dialog');
      return wishlistCreateFailDialog;
    };

    Zumiez.wishlist.getConfirmDialog = function() {
      var currentClassName = 'zumiez-dialog';
      if(confirmDialog) return confirmDialog;
      confirmDialog = new Enterprise.Widget.Dialog('Confirm', '', currentClassName);
      var cancelButton = new Element('button', {'class':'btn-cancel', 'type':'button'}).update('Cancel');
      var confirmButton = new Element('button', {'class':'btn-confirm', 'type':'button'}).update('Confirm');
      var buttonSet = new Element('div', {'class':'buttons-set'});
      buttonSet.insert(cancelButton);
      buttonSet.insert(confirmButton);
      confirmDialog.getNode().insert(buttonSet);

      var oldSetTitle = confirmDialog.setTitle;
      var oldSetContent = confirmDialog.setContent;
      confirmDialog.setTitle = function(content) {
        oldSetTitle.call(confirmDialog, content);
        return confirmDialog;
      }
      confirmDialog.setContent = function(content) {
        oldSetContent.call(confirmDialog, content);
        return confirmDialog;
      }

      confirmDialog.setConfirmText = function(text) {
        confirmButton.update(text);
        return confirmDialog;
      }
      confirmDialog.setCancelText = function(text) {
        cancelButton.update(text);
        return confirmDialog;
      }

      confirmDialog.setClassName = function(className) {
        if(currentClassName !== className) {
          confirmDialog.getNode().removeClassName(currentClassName);
          confirmDialog.getNode().addClassName(className);
          currentClassName = className;
        }
        return confirmDialog;
      }

      var currentCallback;
      confirmDialog.showWithCallback = function(callback) {
        currentCallback = callback;
        confirmDialog.show();
        return confirmDialog;
      };

      cancelButton.observe('click', function() { confirmDialog.hide()});
      confirmButton.observe('click', function() {
        if(currentCallback) {
          currentCallback.call(confirmDialog);
        }
        currentCallback = null;
      });

      return confirmDialog;
    };

    Zumiez.wishlist.createWishlistDropdown = function(wishlists, canCreate, onAddItem, onCreateNew) {
      var wishlistSplitButton = new Enterprise.Widget.SplitButton('', Translator.translate('Add to Wishlist'), 'clickable');
      //add the add buttons for each wishlist
      wishlists.each(function(wishlist) {
        var option = new Enterprise.Widget.SplitButton.Option(wishlist.name);
        if(onAddItem) {
          option.onClick = onAddItem.bind({wishlist:  wishlist});
        }
        wishlistSplitButton.addOption(option);
      });

      //if they're allowed, add the create wishlist button
      if (canCreate) {
        var option = new Enterprise.Widget.SplitButton.Option(Translator.translate('+ or create new list'), 'new');

        if(onCreateNew) {
          option.onClick = onCreateNew;
        }
        wishlistSplitButton.addOption(option);
      }
      return wishlistSplitButton;
    };

})();