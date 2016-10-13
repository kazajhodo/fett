"use strict";function _classCallCheck(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function t(t,i){for(var e=0;e<i.length;e++){var n=i[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(i,e,n){return e&&t(i.prototype,e),n&&t(i,n),i}}();!function(t){var i=function(){function i(e,n){_classCallCheck(this,i),this.$element=e,this.options=t.extend({},i.defaults,this.$element.data(),n),this._init(),Foundation.registerPlugin(this,"Magellan")}return _createClass(i,[{key:"_init",value:function(){var i=this.$element[0].id||Foundation.GetYoDigits(6,"magellan");this.$targets=t("[data-magellan-target]"),this.$links=this.$element.find("a"),this.$element.attr({"data-resize":i,"data-scroll":i,id:i}),this.$active=t(),this.scrollPos=parseInt(window.pageYOffset,10),this._events()}},{key:"calcPoints",value:function(){var i=this,e=document.body,n=document.documentElement;this.points=[],this.winHeight=Math.round(Math.max(window.innerHeight,n.clientHeight)),this.docHeight=Math.round(Math.max(e.scrollHeight,e.offsetHeight,n.clientHeight,n.scrollHeight,n.offsetHeight)),this.$targets.each(function(){var e=t(this),n=Math.round(e.offset().top-i.options.threshold);e.targetPoint=n,i.points.push(n)})}},{key:"_events",value:function(){var i=this;t("html, body"),{duration:i.options.animationDuration,easing:i.options.animationEasing};t(window).one("load",function(){i.options.deepLinking&&location.hash&&i.scrollToLoc(location.hash),i.calcPoints(),i._updateActive()}),this.$element.on({"resizeme.zf.trigger":this.reflow.bind(this),"scrollme.zf.trigger":this._updateActive.bind(this)}).on("click.zf.magellan",'a[href^="#"]',function(t){t.preventDefault();var e=this.getAttribute("href");i.scrollToLoc(e)})}},{key:"scrollToLoc",value:function(i){var e=Math.round(t(i).offset().top-this.options.threshold/2-this.options.barOffset);t("html, body").stop(!0).animate({scrollTop:e},this.options.animationDuration,this.options.animationEasing)}},{key:"reflow",value:function(){this.calcPoints(),this._updateActive()}},{key:"_updateActive",value:function(){var t,i=parseInt(window.pageYOffset,10);if(i+this.winHeight===this.docHeight)t=this.points.length-1;else if(i<this.points[0])t=0;else{var e=this.scrollPos<i,n=this,s=this.points.filter(function(t,s){return e?t-n.options.barOffset<=i:t-n.options.barOffset-n.options.threshold<=i});t=s.length?s.length-1:0}if(this.$active.removeClass(this.options.activeClass),this.$active=this.$links.eq(t).addClass(this.options.activeClass),this.options.deepLinking){var o=this.$active[0].getAttribute("href");window.history.pushState?window.history.pushState(null,null,o):window.location.hash=o}this.scrollPos=i,this.$element.trigger("update.zf.magellan",[this.$active])}},{key:"destroy",value:function(){if(this.$element.off(".zf.trigger .zf.magellan").find("."+this.options.activeClass).removeClass(this.options.activeClass),this.options.deepLinking){var t=this.$active[0].getAttribute("href");window.location.hash.replace(t,"")}Foundation.unregisterPlugin(this)}}]),i}();i.defaults={animationDuration:500,animationEasing:"linear",threshold:50,activeClass:"active",deepLinking:!1,barOffset:0},Foundation.plugin(i,"Magellan")}(jQuery);