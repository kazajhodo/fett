"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};!function(t){function n(t){if(void 0===Function.prototype.name){var n=/function\s([^(]{1,})\(/,e=n.exec(t.toString());return e&&e.length>1?e[1].trim():""}return void 0===t.prototype?t.constructor.name:t.prototype.constructor.name}function e(t){return!!/true/.test(t)||!/false/.test(t)&&(isNaN(1*t)?t:parseFloat(t))}function i(t){return t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}var o="6.2.2",r={version:o,_plugins:{},_uuids:[],rtl:function(){return"rtl"===t("html").attr("dir")},plugin:function(t,e){var o=e||n(t),r=i(o);this._plugins[r]=this[o]=t},registerPlugin:function(t,e){var o=e?i(e):n(t.constructor).toLowerCase();t.uuid=this.GetYoDigits(6,o),t.$element.attr("data-"+o)||t.$element.attr("data-"+o,t.uuid),t.$element.data("zfPlugin")||t.$element.data("zfPlugin",t),t.$element.trigger("init.zf."+o),this._uuids.push(t.uuid)},unregisterPlugin:function(t){var e=i(n(t.$element.data("zfPlugin").constructor));this._uuids.splice(this._uuids.indexOf(t.uuid),1),t.$element.removeAttr("data-"+e).removeData("zfPlugin").trigger("destroyed.zf."+e);for(var o in t)t[o]=null},reInit:function(n){var e=n instanceof t;try{if(e)n.each(function(){t(this).data("zfPlugin")._init()});else{var o="undefined"==typeof n?"undefined":_typeof(n),r=this,a={object:function(n){n.forEach(function(n){n=i(n),t("[data-"+n+"]").foundation("_init")})},string:function(){n=i(n),t("[data-"+n+"]").foundation("_init")},undefined:function(){this.object(Object.keys(r._plugins))}};a[o](n)}}catch(u){console.error(u)}finally{return n}},GetYoDigits:function(t,n){return t=t||6,Math.round(Math.pow(36,t+1)-Math.random()*Math.pow(36,t)).toString(36).slice(1)+(n?"-"+n:"")},reflow:function(n,i){"undefined"==typeof i?i=Object.keys(this._plugins):"string"==typeof i&&(i=[i]);var o=this;t.each(i,function(i,r){var a=o._plugins[r],u=t(n).find("[data-"+r+"]").addBack("[data-"+r+"]");u.each(function(){var n=t(this),i={};if(n.data("zfPlugin"))return void console.warn("Tried to initialize "+r+" on an element that already has a Foundation plugin.");if(n.attr("data-options")){n.attr("data-options").split(";").forEach(function(t,n){var o=t.split(":").map(function(t){return t.trim()});o[0]&&(i[o[0]]=e(o[1]))})}try{n.data("zfPlugin",new a(t(this),i))}catch(o){console.error(o)}finally{return}})})},getFnName:n,transitionend:function(t){var n,e={transition:"transitionend",WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend"},i=document.createElement("div");for(var o in e)"undefined"!=typeof i.style[o]&&(n=e[o]);return n?n:(n=setTimeout(function(){t.triggerHandler("transitionend",[t])},1),"transitionend")}};r.util={throttle:function(t,n){var e=null;return function(){var i=this,o=arguments;null===e&&(e=setTimeout(function(){t.apply(i,o),e=null},n))}}};var a=function(e){var i="undefined"==typeof e?"undefined":_typeof(e),o=t("meta.foundation-mq"),a=t(".no-js");if(o.length||t('<meta class="foundation-mq">').appendTo(document.head),a.length&&a.removeClass("no-js"),"undefined"===i)r.MediaQuery._init(),r.reflow(this);else{if("string"!==i)throw new TypeError("We're sorry, "+i+" is not a valid parameter. You must use a string representing the method you wish to invoke.");var u=Array.prototype.slice.call(arguments,1),s=this.data("zfPlugin");if(void 0===s||void 0===s[e])throw new ReferenceError("We're sorry, '"+e+"' is not an available method for "+(s?n(s):"this element")+".");1===this.length?s[e].apply(s,u):this.each(function(n,i){s[e].apply(t(i).data("zfPlugin"),u)})}return this};window.Foundation=r,t.fn.foundation=a,function(){Date.now&&window.Date.now||(window.Date.now=Date.now=function(){return(new Date).getTime()});for(var t=["webkit","moz"],n=0;n<t.length&&!window.requestAnimationFrame;++n){var e=t[n];window.requestAnimationFrame=window[e+"RequestAnimationFrame"],window.cancelAnimationFrame=window[e+"CancelAnimationFrame"]||window[e+"CancelRequestAnimationFrame"]}if(/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent)||!window.requestAnimationFrame||!window.cancelAnimationFrame){var i=0;window.requestAnimationFrame=function(t){var n=Date.now(),e=Math.max(i+16,n);return setTimeout(function(){t(i=e)},e-n)},window.cancelAnimationFrame=clearTimeout}window.performance&&window.performance.now||(window.performance={start:Date.now(),now:function(){return Date.now()-this.start}})}(),Function.prototype.bind||(Function.prototype.bind=function(t){if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var n=Array.prototype.slice.call(arguments,1),e=this,i=function(){},o=function(){return e.apply(this instanceof i?this:t,n.concat(Array.prototype.slice.call(arguments)))};return this.prototype&&(i.prototype=this.prototype),o.prototype=new i,o})}(jQuery);