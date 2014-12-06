;(function($,window,document,undefined){
  var pluginName = 'ccCarousel',
      defaults = {
        autoPlay:false,
        ease:Linear.easeNone,
        delay:5,
        selector:'.cc-slide',
        speed:1,
        startAt:0,
        initialDelay:5
      };

  function Plugin(element, options){
    this.el = element;
    this.$el = $(element);
    this.options = $.extend({}, defaults, options);
    this.init();
  }

  /*plugin methods*/
  Plugin.prototype.init = function(){
    this.$collection = $(this.options.selector,this.$el);
    this._isAnimating = false;
    this._paused = !this.autoPlay;
    this._total = this.$collection.length;
    this._index = !isNaN(this.options.startAt) ? Math.min(this._total,Math.max(this.options.startAt,0)) : this.options.startAt == "random" ? (Math.random()*this._total) >> 0 : 0;
    this.$el.find('.cc-carousel-content').get(0).style.width = ((this._total+1) * 100) + "%";
    this.$el.find('.cc-carousel-content').get(0).style.left = "-" +(this._index * 100) + "%";
    $(this.$el).trigger('change',[this._index, this.current().item]);
    if(this.options.autoPlay) this.resume(this.options.initialDelay);
  };

  //returns object with current slide index & dom element
  Plugin.prototype.current = function(){
    return { index:this._index, item:this.$collection[this._index] };
  }

  Plugin.prototype.isAnimating = function(){
    return this._isAnimating;
  }

  //show slide by number or 'next' / 'previous'
  Plugin.prototype.show = function(ind){
    var that = this;
    if(this._isAnimating || ind == this._index) return false;
    if(!isNaN(ind) || ind.search(/^(next|previous)$|/i) != -1){
      this._isAnimating = true;

      var $carouselContent = this.$el.find('.cc-carousel-content');
      var leftOverride = null, $clone;

      if(ind == 'next' && this._index == this._total - 1) {
        $clone = this.$collection.eq(this._index).clone();
        $clone.prependTo($carouselContent);
        $carouselContent.get(0).style.left = "0%";
        leftOverride = "-100%";
      }else if(ind == 'previous' && this._index == 0) {
        $clone = this.$collection.eq(this._index).clone();
        $clone.appendTo($carouselContent);
        $carouselContent.get(0).style.left = -(this._total*100)+"%";
        leftOverride = (-(this._total-1)*100)+"%";
      }

      //assign index
      this._index = (this._total + (ind == 'next' ? this._index + 1 : ind == 'previous' ? this._index - 1 : parseInt(ind))) % this._total;

      var tweenProps = {
        left: leftOverride || "-" + (this._index * 100) + "%",
        ease:this.options.ease,
        onStart:function(){
          $(that.$el).trigger('change',[that._index, that.current().item]);
        },
        onComplete:function(){
          if($clone) {
            $clone.remove();
            if (ind == "next") $carouselContent[0].style.left = "0%";
          }
          that._isAnimating = false;
          if(that.options.autoPlay && !that._paused) {
            that.resume(); //shows next slide after delay
          }
        }
      }
      TweenLite.to(this.$el.find('.cc-carousel-content'), this.options.speed, tweenProps);
    }else{
      //TODO:  handle error
    }
  }

  Plugin.prototype.count = function(){
    return this._total;
  }

  Plugin.prototype.pause = function(){
    this._paused = true;
    TweenLite.killDelayedCallsTo(this.show);
  }

  Plugin.prototype.resume = function(delay){
    this._paused = false;
    if(this.options.autoPlay) {
      TweenLite.delayedCall(delay || this.options.delay, this.show, ['next'], this);
    }
  }

  /*plugin entry point*/
  $.fn[pluginName] = function(options, args){
    return this.each(function(){
      var instance = $(this).data('plugin_' + pluginName);
      if (!instance) {
        $(this).data('plugin_' + pluginName, new Plugin(this, options));
      } else if (instance[options]){
        instance[options].call(instance, args);
      } else {
        $.error('Method ' +  options + ' does not exist on jQuery.' + pluginName);
      }
    });
  };
})(jQuery,window,document);