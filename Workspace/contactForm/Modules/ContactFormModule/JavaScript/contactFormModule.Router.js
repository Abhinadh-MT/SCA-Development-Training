define('contactFormModule.Router', [
  'Backbone',
  'ContactFormModule.View'
], function (
  Backbone,
  ContactFormView
) {
  'use strict';

  return Backbone.Router.extend({

    routes: {
      'contact': 'showContactForm'
    },

    initialize: function (options) {
      this.application = options.application;
    },

    showContactForm: function () {

      var view = new ContactFormView({
        application: this.application
      });

      view.showContent();
    }

  });
});