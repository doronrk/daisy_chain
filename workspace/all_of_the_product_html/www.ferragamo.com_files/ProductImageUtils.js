/**
 * A set of utils to add runtime management feature for images into users' browswer.
 */
ProductImage = {
		
	getExt : function(img){
		var pos = img.lastIndexOf('.');
		return img.substring(pos+1,img.length);
	},
		
	ProductPage : {
		/** Number of attachments found */
		attachmentsNumber: 1,
		
		/** Max number of thumb images to display navigation buttons */
		attachmentsLimit: 5,
		
		/** Product images base path */
		basePath: null,
		
		/** List of product images */
		imgList: null,
		
		/** Current image index */
		currentIdx: 0,
		
		init : function(path, imgList){
			this.basePath = path;
			this.imgList = imgList;
		},
		
		/** Reveal a product image */
		revealThumb : function(idx){
			var angleImgId = 'productAngleLi' + idx;
			
			showById(angleImgId);
			
			this.attachmentsNumber += 1;
			
			this.revealNavigation();
		},
		
		/** Remove image element */
		removeThumb : function(idx){
			var angleImgId = 'productAngleLi' + idx;
			$jq('#' + angleImgId).remove();
		},
		
		/** Reveal thumbs navigation buttons */
		revealNavigation : function(){
			if(this.attachmentsNumber >= this.attachmentsLimit) {
				showById("frg_thumbsnav_prev");
				showById("frg_thumbsnav_next");
			} else {
				hideById("frg_thumbsnav_prev");
				hideById("frg_thumbsnav_next");
			}
		},
		
		/** Override default change thumb behaviour */
		changeThumbNail : function(idx){
			
			this.currentIdx = idx;
			var angleImgId = 'productAngleLi' + idx;
			
			// default impl
			changeThumbNail(angleImgId, this.getImg(idx, 'base'));
		
		},
		
		/** Show img zoom */
		zoom : function(){
			document.getElementById("zoom_image").src = this.getImg(this.currentIdx, 'zoom');
			showById('zoom_lightbox');
			window.scrollTo(0,0);
		},
		
		/** Get img for input index and type */
		getImg : function(idx, type){
			var img = this.imgList[idx][type].toString();
			
			if (this.basePath!=null && this.basePath.length>0) {
				if(img[0] == '/')
					return this.basePath + img;
				else
					return this.basePath + '/' + img;
			} else {
				return img;
			}
		}
	},
		
	CategoryPage : {
		fallbackImage : function(id, ext){
			if(ext == null || ext == "")
				return;
			
			if(id == null || id == undefined)
				return;
			
			var image = document.getElementById(id);
			
			if(image == null || image == undefined)
				return;

			var source = image.src;
			var pos = source.lastIndexOf('.');
			var currExt = ProductImage.getExt(source);
			currExt = currExt.replace('\\','');
			currExt = currExt.replace('/','');
			
			if(pos > 0 && currExt != ext){
				source = source.substring(0,pos+1) + ext;
				image.onerror = function(){return;};
				image.src = source;
			}
			// else no image icon?
		}
	}
	
}