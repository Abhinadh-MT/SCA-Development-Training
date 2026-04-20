// @module JJ.testExtension.testExtension
define("JJ.testExtension.testExtension.View", [
  "jj_testextension_testextension.tpl",
  // ,	'JJ.testExtension.testExtension.SS2Model'

  "Backbone",
], function (
  jj_testextension_testextension_tpl,

  // ,	testExtensionSS2Model

  Backbone,
) {
  "use strict";
  return Backbone.View.extend({
    template: jj_testextension_testextension_tpl,

    initialize: function (options) {
      var config = options.container.getConfig("JJ.testExtension");

      // Allow override from PDP injection
      this.message =
        options.message ||
        (config && config.deliverydateMessage) ||
        "Delivered in 3–10 business days";
    },

    events: {
      "click [data-action='close']": function () {
        this.$el.remove();
      },
      "change [data-action='changeQuantity']": "validateQuantity",
    },

    validateQuantity: function (e) {
      var value = parseInt(e.currentTarget.value, 10);

      if (value < 1) {
        alert("Quantity must be at least 1");
        e.currentTarget.value = 1;
        return false;
      }

      if (value > 10) {
        alert("Maximum allowed quantity is 10");
        e.currentTarget.value = 10;
        return false;
      }
    },

    getContext: function () {
      return {
        message: this.message,
      };
    },
  });
});

  // @class JJ.testExtension.testExtension.View @extends Backbone.View
//   return Backbone.View.extend({
//     template: jj_testextension_testextension_tpl,

//     initialize: function (options) {
//       var config = options.container.getConfig("JJ.testExtension");

//       this.message = config.deliverydateMessage;

//       /*  Uncomment to test backend communication with an example service
// 				(you'll need to deploy and activate the extension first)
// 			*/

//       // this.model = new testExtensionModel();
//       // var self = this;
//       // this.model.fetch().done(function(result) {
//       // 	self.message = result.message;
//       // 	self.render();
//       // });
//     },
//     events:{
//     	"click [data-action='close']":function(){
//     		this.$el.remove();
//     	},
//          'change [data-action="changeQuantity"]': 'validateQuantity',


//     },
    
//  validateQuantity: function (e) {
//       var value = parseInt(e.currentTarget.value, 10);

//       if (value < 1) {
//         alert('Quantity must be at least 1');
//         e.currentTarget.value = 1;
//         return false;
//       }

//       if (value > 10) {
//         alert('Maximum allowed quantity is 10');
//         e.currentTarget.value = 10;
//         return false;
//       }
//     },
 


//     //@method getContext @return JJ.testExtension.testExtension.View.Context
//     getContext: function () {
//       //@class JJ.testExtension.testExtension.View.Context
//       // this.message = this.message || 'Hello World!!'
//       return {
//         message: this.message ?? "Delivered in 3–10 business days",
//       };
//     },
//   });
// });
