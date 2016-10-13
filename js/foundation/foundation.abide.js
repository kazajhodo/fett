"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}();!function(e){var t=function(){function t(a){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};_classCallCheck(this,t),this.$element=a,this.options=e.extend({},t.defaults,this.$element.data(),r),this._init(),Foundation.registerPlugin(this,"Abide")}return _createClass(t,[{key:"_init",value:function(){this.$inputs=this.$element.find("input, textarea, select"),this._events()}},{key:"_events",value:function(){var t=this;this.$element.off(".abide").on("reset.zf.abide",function(){t.resetForm()}).on("submit.zf.abide",function(){return t.validateForm()}),"fieldChange"===this.options.validateOn&&this.$inputs.off("change.zf.abide").on("change.zf.abide",function(a){t.validateInput(e(a.target))}),this.options.liveValidate&&this.$inputs.off("input.zf.abide").on("input.zf.abide",function(a){t.validateInput(e(a.target))})}},{key:"_reflow",value:function(){this._init()}},{key:"requiredCheck",value:function(e){if(!e.attr("required"))return!0;var t=!0;switch(e[0].type){case"checkbox":t=e[0].checked;break;case"select":case"select-one":case"select-multiple":var a=e.find("option:selected");a.length&&a.val()||(t=!1);break;default:e.val()&&e.val().length||(t=!1)}return t}},{key:"findFormError",value:function(e){var t=e.siblings(this.options.formErrorSelector);return t.length||(t=e.parent().find(this.options.formErrorSelector)),t}},{key:"findLabel",value:function(e){var t=e[0].id,a=this.$element.find('label[for="'+t+'"]');return a.length?a:e.closest("label")}},{key:"findRadioLabels",value:function(t){var a=this,r=t.map(function(t,r){var i=r.id,n=a.$element.find('label[for="'+i+'"]');return n.length||(n=e(r).closest("label")),n[0]});return e(r)}},{key:"addErrorClasses",value:function(e){var t=this.findLabel(e),a=this.findFormError(e);t.length&&t.addClass(this.options.labelErrorClass),a.length&&a.addClass(this.options.formErrorClass),e.addClass(this.options.inputErrorClass).attr("data-invalid","")}},{key:"removeRadioErrorClasses",value:function(e){var t=this.$element.find(':radio[name="'+e+'"]'),a=this.findRadioLabels(t),r=this.findFormError(t);a.length&&a.removeClass(this.options.labelErrorClass),r.length&&r.removeClass(this.options.formErrorClass),t.removeClass(this.options.inputErrorClass).removeAttr("data-invalid")}},{key:"removeErrorClasses",value:function(e){if("radio"==e[0].type)return this.removeRadioErrorClasses(e.attr("name"));var t=this.findLabel(e),a=this.findFormError(e);t.length&&t.removeClass(this.options.labelErrorClass),a.length&&a.removeClass(this.options.formErrorClass),e.removeClass(this.options.inputErrorClass).removeAttr("data-invalid")}},{key:"validateInput",value:function(e){var t=this.requiredCheck(e),a=!1,r=!0,i=e.attr("data-validator"),n=!0;if(e.is("[data-abide-ignore]")||e.is('[type="hidden"]'))return!0;switch(e[0].type){case"radio":a=this.validateRadio(e.attr("name"));break;case"checkbox":a=t;break;case"select":case"select-one":case"select-multiple":a=t;break;default:a=this.validateText(e)}i&&(r=this.matchValidation(e,i,e.attr("required"))),e.attr("data-equalto")&&(n=this.options.validators.equalTo(e));var s=[t,a,r,n].indexOf(!1)===-1,o=(s?"valid":"invalid")+".zf.abide";return this[s?"removeErrorClasses":"addErrorClasses"](e),e.trigger(o,[e]),s}},{key:"validateForm",value:function(){var t=[],a=this;this.$inputs.each(function(){t.push(a.validateInput(e(this)))});var r=t.indexOf(!1)===-1;return this.$element.find("[data-abide-error]").css("display",r?"none":"block"),this.$element.trigger((r?"formvalid":"forminvalid")+".zf.abide",[this.$element]),r}},{key:"validateText",value:function(e,t){t=t||e.attr("pattern")||e.attr("type");var a=e.val(),r=!1;return a.length?r=this.options.patterns.hasOwnProperty(t)?this.options.patterns[t].test(a):t===e.attr("type")||new RegExp(t).test(a):e.prop("required")||(r=!0),r}},{key:"validateRadio",value:function(t){var a=this.$element.find(':radio[name="'+t+'"]'),r=!1,i=!1;return a.each(function(t,a){e(a).attr("required")&&(i=!0)}),i||(r=!0),r||a.each(function(t,a){e(a).prop("checked")&&(r=!0)}),r}},{key:"matchValidation",value:function(e,t,a){var r=this;a=!!a;var i=t.split(" ").map(function(t){return r.options.validators[t](e,a,e.parent())});return i.indexOf(!1)===-1}},{key:"resetForm",value:function(){var t=this.$element,a=this.options;e("."+a.labelErrorClass,t).not("small").removeClass(a.labelErrorClass),e("."+a.inputErrorClass,t).not("small").removeClass(a.inputErrorClass),e(a.formErrorSelector+"."+a.formErrorClass).removeClass(a.formErrorClass),t.find("[data-abide-error]").css("display","none"),e(":input",t).not(":button, :submit, :reset, :hidden, :radio, :checkbox, [data-abide-ignore]").val("").removeAttr("data-invalid"),e(":input:radio",t).not("[data-abide-ignore]").prop("checked",!1).removeAttr("data-invalid"),e(":input:checkbox",t).not("[data-abide-ignore]").prop("checked",!1).removeAttr("data-invalid"),t.trigger("formreset.zf.abide",[t])}},{key:"destroy",value:function(){var t=this;this.$element.off(".abide").find("[data-abide-error]").css("display","none"),this.$inputs.off(".abide").each(function(){t.removeErrorClasses(e(this))}),Foundation.unregisterPlugin(this)}}]),t}();t.defaults={validateOn:"fieldChange",labelErrorClass:"is-invalid-label",inputErrorClass:"is-invalid-input",formErrorSelector:".form-error",formErrorClass:"is-visible",liveValidate:!1,patterns:{alpha:/^[a-zA-Z]+$/,alpha_numeric:/^[a-zA-Z0-9]+$/,integer:/^[-+]?\d+$/,number:/^[-+]?\d*(?:[\.\,]\d+)?$/,card:/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,cvv:/^([0-9]){3,4}$/,email:/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,url:/^(https?|ftp|file|ssh):\/\/(((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/,domain:/^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,8}$/,datetime:/^([0-2][0-9]{3})\-([0-1][0-9])\-([0-3][0-9])T([0-5][0-9])\:([0-5][0-9])\:([0-5][0-9])(Z|([\-\+]([0-1][0-9])\:00))$/,date:/(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))$/,time:/^(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}$/,dateISO:/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/,month_day_year:/^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.]\d{4}$/,day_month_year:/^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.]\d{4}$/,color:/^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/},validators:{equalTo:function(t,a,r){return e("#"+t.attr("data-equalto")).val()===t.val()}}},Foundation.plugin(t,"Abide")}(jQuery);