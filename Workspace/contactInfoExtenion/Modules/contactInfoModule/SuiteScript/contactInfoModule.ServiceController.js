define("JJ.contactInfoExtenion.contactInfoModule.ServiceController", ["ServiceController","contactInfoModule.Model"], function(
  ServiceController,
  ContactModel
) {
  "use strict";

  return ServiceController.extend({
    name: "JJ.contactInfoExtenion.contactInfoModule.ServiceController",

    // The values in this object are the validation needed for the current service.
    options: {
      common: {}
    },

    get: function get() {
      return JSON.stringify({
        message: "Hello World I'm an Extension using a Service!"
      });
    },

    post: function post() {
      
       return ContactModel.create(this.data);
    },

  });
});
