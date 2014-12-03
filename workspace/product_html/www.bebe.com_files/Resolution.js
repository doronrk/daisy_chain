/*!************************************************************************
*
* ADOBE CONFIDENTIAL
* ___________________
*
*  Copyright 2011 Adobe Systems Incorporated
*  All Rights Reserved.
*
* NOTICE:  All information contained herein is, and remains
* the property of Adobe Systems Incorporated and its suppliers,
* if any.  The intellectual and technical concepts contained
* herein are proprietary to Adobe Systems Incorporated and its
* suppliers and are protected by trade secret or copyright law.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe Systems Incorporated.
**************************************************************************/
s7sdk.Util.require("s7sdk.common.Geometry");s7sdk.Util.require("s7sdk.event.Event");if(!s7sdk.Resolution){s7sdk.Resolution=function(g,c,f,d,b,a){this.view=a;this.level=g;this.w=c;this.h=f;this.loadTiles=0;var e=Math.ceil(c/256)*Math.ceil(f/256);this.tiles=new Array(e);this.url=d+(d.indexOf("?")>=0?"&":"?")+"scl="+Math.pow(2,g);this.fmt=b;this.transparent=((this.fmt.indexOf("png")!=-1||this.fmt.indexOf("gif")!=-1)&&(this.fmt.indexOf("-alpha")>0))?true:false;this.tileWidth=0;this.tileHeight=0;this.invalidTiles=new Array()};s7sdk.Resolution.prototype.nTiles=function(){return Math.ceil(this.w/256)*Math.ceil(this.h/256)};s7sdk.Resolution.prototype.getCreateTile=function(b){if(this.tiles[b.idx]==null){this.tiles[b.idx]=new s7sdk.Tile(this.level,b,this.url,this.fmt,this.loadTiles)}else{var a=this.tiles[b.idx];if(this.loadTiles>=0&&!a.loadSent){a.loadTile(this.loadTiles);a.image.resolutionBuffer=this}}return this.tiles[b.idx]};s7sdk.Resolution.prototype.getTile=function(a){return this.tiles[a]};s7sdk.Resolution.prototype.intersect=function(k,j,m,f){var a;var o;var g=Math.max(0,Math.floor(k/256)*256);var d=g;var c=Math.max(0,Math.floor(j/256)*256);var e=Math.ceil(this.w/256);var n=new Array();var l;var b;var i;this.tileHeight=0;while(c<j+f&&c<this.h){this.tileWidth=0;o=c/256;while(d<k+m&&d<this.w){a=d/256;l=o*e+a;b=Math.min(this.w-d,256);i=Math.min(this.h-c,256);n.push(new s7sdk.TileAddress(b,i,l,a,o));d+=256;this.tileWidth+=256}c+=256;this.tileHeight+=256;d=g}return n};s7sdk.Resolution.onResInvalidated=function(b){var a=s7sdk.Event.getTarget(b)};s7sdk.Resolution.onTileLoad=function(b){var a=s7sdk.Event.getTarget(b);if(a.resolutionBuffer!=null){a.resolutionBuffer.view.invalidated=true;a.resolutionBuffer=null;a.removeEventListener(s7sdk.Event.TILE_LOADED,s7sdk.Resolution.onTileLoad,true)}};s7sdk.Resolution.prototype.draw=function(e,i,j){if(this.invalidTiles.length==0){return}if(this.canvas==null){s7sdk.Logger.log(s7sdk.Logger.FINEST,"Resolution.draw Getting Canvas this.loadTiles %0",this.loadTiles);this.canvas=s7sdk.Util.getCanvas();this.canvas.width=this.tileWidth;this.canvas.height=this.tileHeight;s7sdk.Util.setObjPos(this.canvas,0,0);this.canvas.parentView=this.view}else{if(this.canvas.width<this.tileWidth||this.canvas.height<this.tileHeight){this.canvas.width=this.tileWidth;this.canvas.height=this.tileHeight}}var a=new s7sdk.Matrix2D(1,0,0,1,this.invalidTiles[0].pos_x*s7sdk.Enum.TILE.SIZE*-1,this.invalidTiles[0].pos_y*s7sdk.Enum.TILE.SIZE*-1);var c=0;for(var d=0;d<this.invalidTiles.length;d++){var g=this.getCreateTile(this.invalidTiles[d]);if(this.loadTiles>=0&&g.loaded==false){c++;g.image.resolutionBuffer=this;g.image.addEventListener(s7sdk.Event.TILE_LOADED,s7sdk.Resolution.onTileLoad,true)}g.draw(a,this.canvas,j)}if(j.canvas!=null&&j.canvas.getContext!=null){var l=j.canvas.getContext("2d");var b=a.clone();b.invert();b.concat(i);var f=b.clone();f.invert();var k=f.transformRect(e);var h=new s7sdk.Rectangle(0,0,this.canvas.width,this.canvas.height);k=k.intersection(h);if(this.transparent){l.clearRect(e.x,e.y,e.width,e.height)}l.drawImage(this.canvas,k.x,k.y,k.width,k.height,e.x,e.y,e.width,e.height)}if(c==0){s7sdk.Util.releaseCanvas(this.canvas);this.canvas=null;s7sdk.Logger.log(s7sdk.Logger.FINEST,"Resolution.draw Releasing Canvas");this.invalidTiles=new Array()}};s7sdk.Resolution.prototype.release=function(){if(this.canvas!=null){s7sdk.Util.releaseCanvas(this.canvas);this.canvas=null;s7sdk.Logger.log(s7sdk.Logger.FINE,"Resolution.release Explicit canvas release")}};s7sdk.Resolution.prototype.invalidate=function(c,a){this.loadTiles=(a!=undefined&&a!=null)?a:0;this.invalidTiles=this.intersect(c.x,c.y,c.width,c.height);s7sdk.Logger.log(s7sdk.Logger.FINE,"Resolution.invalidate viewport: "+c.x+", "+c.y+", "+c.width+", "+c.height+"  Tiles: "+this.invalidTiles.length);for(var d=0;d<this.invalidTiles.length;d++){var b=this.getCreateTile(this.invalidTiles[d]);b.invalidate()}}};