"use strict";function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,n){for(var t=0;t<n.length;t++){var i=n[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(n,t,i){return t&&e(n.prototype,t),i&&e(n,i),n}}();!function(e){var n=function(){function n(t,i){_classCallCheck(this,n),this.$element=t,this.options=e.extend({},n.defaults,this.$element.data(),i),Foundation.Nest.Feather(this.$element,"dropdown"),this._init(),Foundation.registerPlugin(this,"DropdownMenu"),Foundation.Keyboard.register("DropdownMenu",{ENTER:"open",SPACE:"open",ARROW_RIGHT:"next",ARROW_UP:"up",ARROW_DOWN:"down",ARROW_LEFT:"previous",ESCAPE:"close"})}return _createClass(n,[{key:"_init",value:function(){var e=this.$element.find("li.is-dropdown-submenu-parent");this.$element.children(".is-dropdown-submenu-parent").children(".is-dropdown-submenu").addClass("first-sub"),this.$menuItems=this.$element.find('[role="menuitem"]'),this.$tabs=this.$element.children('[role="menuitem"]'),this.$tabs.find("ul.is-dropdown-submenu").addClass(this.options.verticalClass),this.$element.hasClass(this.options.rightClass)||"right"===this.options.alignment||Foundation.rtl()||this.$element.parents(".top-bar-right").is("*")?(this.options.alignment="right",e.addClass("opens-left")):e.addClass("opens-right"),this.changed=!1,this._events()}},{key:"_events",value:function(){var n=this,t="ontouchstart"in window||"undefined"!=typeof window.ontouchstart,i="is-dropdown-submenu-parent",o=function(o){var s=e(o.target).parentsUntil("ul","."+i),a=s.hasClass(i),r="true"===s.attr("data-is-click");s.children(".is-dropdown-submenu");if(a)if(r){if(!n.options.closeOnClick||!n.options.clickOpen&&!t||n.options.forceFollow&&t)return;o.stopImmediatePropagation(),o.preventDefault(),n._hide(s)}else o.preventDefault(),o.stopImmediatePropagation(),n._show(s.children(".is-dropdown-submenu")),s.add(s.parentsUntil(n.$element,"."+i)).attr("data-is-click",!0)};(this.options.clickOpen||t)&&this.$menuItems.on("click.zf.dropdownmenu touchstart.zf.dropdownmenu",o),this.options.disableHover||this.$menuItems.on("mouseenter.zf.dropdownmenu",function(t){var o=e(this),s=o.hasClass(i);s&&(clearTimeout(n.delay),n.delay=setTimeout(function(){n._show(o.children(".is-dropdown-submenu"))},n.options.hoverDelay))}).on("mouseleave.zf.dropdownmenu",function(t){var o=e(this),s=o.hasClass(i);if(s&&n.options.autoclose){if("true"===o.attr("data-is-click")&&n.options.clickOpen)return!1;clearTimeout(n.delay),n.delay=setTimeout(function(){n._hide(o)},n.options.closingTime)}}),this.$menuItems.on("keydown.zf.dropdownmenu",function(t){var i,o,s=e(t.target).parentsUntil("ul",'[role="menuitem"]'),a=n.$tabs.index(s)>-1,r=a?n.$tabs:s.siblings("li").add(s);r.each(function(n){if(e(this).is(s))return i=r.eq(n-1),void(o=r.eq(n+1))});var d=function(){s.is(":last-child")||(o.children("a:first").focus(),t.preventDefault())},l=function(){i.children("a:first").focus(),t.preventDefault()},u=function(){var e=s.children("ul.is-dropdown-submenu");e.length&&(n._show(e),s.find("li > a:first").focus(),t.preventDefault())},p=function(){var e=s.parent("ul").parent("li");e.children("a:first").focus(),n._hide(e),t.preventDefault()},h={open:u,close:function(){n._hide(n.$element),n.$menuItems.find("a:first").focus(),t.preventDefault()},handled:function(){t.stopImmediatePropagation()}};a?n.$element.hasClass(n.options.verticalClass)?"left"===n.options.alignment?e.extend(h,{down:d,up:l,next:u,previous:p}):e.extend(h,{down:d,up:l,next:p,previous:u}):e.extend(h,{next:d,previous:l,down:u,up:p}):"left"===n.options.alignment?e.extend(h,{next:u,previous:p,down:d,up:l}):e.extend(h,{next:p,previous:u,down:d,up:l}),Foundation.Keyboard.handleKey(t,"DropdownMenu",h)})}},{key:"_addBodyHandler",value:function(){var n=e(document.body),t=this;n.off("mouseup.zf.dropdownmenu touchend.zf.dropdownmenu").on("mouseup.zf.dropdownmenu touchend.zf.dropdownmenu",function(e){var i=t.$element.find(e.target);i.length||(t._hide(),n.off("mouseup.zf.dropdownmenu touchend.zf.dropdownmenu"))})}},{key:"_show",value:function(n){var t=this.$tabs.index(this.$tabs.filter(function(t,i){return e(i).find(n).length>0})),i=n.parent("li.is-dropdown-submenu-parent").siblings("li.is-dropdown-submenu-parent");this._hide(i,t),n.css("visibility","hidden").addClass("js-dropdown-active").attr({"aria-hidden":!1}).parent("li.is-dropdown-submenu-parent").addClass("is-active").attr({"aria-expanded":!0});var o=Foundation.Box.ImNotTouchingYou(n,null,!0);if(!o){var s="left"===this.options.alignment?"-right":"-left",a=n.parent(".is-dropdown-submenu-parent");a.removeClass("opens"+s).addClass("opens-"+this.options.alignment),o=Foundation.Box.ImNotTouchingYou(n,null,!0),o||a.removeClass("opens-"+this.options.alignment).addClass("opens-inner"),this.changed=!0}n.css("visibility",""),this.options.closeOnClick&&this._addBodyHandler(),this.$element.trigger("show.zf.dropdownmenu",[n])}},{key:"_hide",value:function(e,n){var t;t=e&&e.length?e:void 0!==n?this.$tabs.not(function(e,t){return e===n}):this.$element;var i=t.hasClass("is-active")||t.find(".is-active").length>0;if(i){if(t.find("li.is-active").add(t).attr({"aria-expanded":!1,"data-is-click":!1}).removeClass("is-active"),t.find("ul.js-dropdown-active").attr({"aria-hidden":!0}).removeClass("js-dropdown-active"),this.changed||t.find("opens-inner").length){var o="left"===this.options.alignment?"right":"left";t.find("li.is-dropdown-submenu-parent").add(t).removeClass("opens-inner opens-"+this.options.alignment).addClass("opens-"+o),this.changed=!1}this.$element.trigger("hide.zf.dropdownmenu",[t])}}},{key:"destroy",value:function(){this.$menuItems.off(".zf.dropdownmenu").removeAttr("data-is-click").removeClass("is-right-arrow is-left-arrow is-down-arrow opens-right opens-left opens-inner"),e(document.body).off(".zf.dropdownmenu"),Foundation.Nest.Burn(this.$element,"dropdown"),Foundation.unregisterPlugin(this)}}]),n}();n.defaults={disableHover:!1,autoclose:!0,hoverDelay:50,clickOpen:!1,closingTime:500,alignment:"left",closeOnClick:!0,verticalClass:"vertical",rightClass:"align-right",forceFollow:!0},Foundation.plugin(n,"DropdownMenu")}(jQuery);