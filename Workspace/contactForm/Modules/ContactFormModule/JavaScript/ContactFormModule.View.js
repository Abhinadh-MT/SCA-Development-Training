// @module JJ.contactInfoExtenion.contactInfoModule
define("ContactFormModule.View", [
  "jj_contactform_contactformmodule.tpl",
  "JJ.contactForm.ContactFormModule.SS2Model",
  "Backbone",
  "Profile.Model",
], function (
  jj_contactform_contactformmodule_tpl,
  contactSS2Model,
  Backbone
) {
  "use strict";

  return Backbone.View.extend({
    template: jj_contactform_contactformmodule_tpl,

    initialize: function () {
      this.formErrors = {};
      this.formData = {}; // Keep data to prevent clearing
      this.successMessage = false;
      this.model = new contactSS2Model();
    },

    events: {
      "click [data-action='submit-form']": "submitForm",
      "click [data-action='cancel-form']": "clearForm",
      "blur input": "onInputChange",
      "keyup input": "onInputChange"
    },

    // 🔹 Real-time validation
    onInputChange: function (e) {
      var name = this.$(e.target).attr('name');
      var value = this.$(e.target).val();
      this.formData[name] = value;

      var errors = this.validateForm(this.formData);
      
      if (errors[name]) {
        this.formErrors[name] = errors[name];
      } else {
        delete this.formErrors[name];
      }

      // We only render on blur to avoid jumping cursor, 
      // or we can use a targeted DOM update if you prefer.
      if (e.type === 'blur') {
          this.render();
      }
    },

    // 🔹 Submit Form
    submitForm: function (e) {
      var self = this;
      e.preventDefault();

      var data = {
        firstname: this.$('[name="firstname"]').val(),
        lastname: this.$('[name="lastname"]').val(),
        phone: this.$('[name="phone"]').val(),
        email: this.$('[name="email"]').val(),
      };
      this.formData = data; // Save current values

      var errors = this.validateForm(data);

      if (Object.keys(errors).length > 0) {
        this.formErrors = errors;
        this.successMessage = false;
        this.render();
        return;
      }

      this.model
        .save(data)
        .done(function (response) {
          if (response.success) {
            alert("Contact created successfully");
            self.clearForm();
          } else {
            // Display server-side errors inline
            if (response.message.indexOf('email') !== -1) {
              self.formErrors.email = response.message;
            } else if (response.message.indexOf('name') !== -1) {
              self.formErrors.firstname = response.message;
            } else {
              self.globalErrorMessage = response.message;
            }
            self.render();
          }
        })
        .fail(function (error) {
          var message = "Something went wrong";
          if (error.responseText) {
            try {
              var res = JSON.parse(error.responseText);
              message = res.message || message;
            } catch (e) {}
          }
          
          self.globalErrorMessage = message;
          self.render();
        });
    },

    // 🔹 Validation
    validateForm: function (data) {
      var errors = {};

      if (!data.firstname) {
        errors.firstname = "First name is required";
      } else if (!/^[A-Za-z\s]+$/.test(data.firstname)) {
        errors.firstname = "Only letters allowed";
      }

      if (!data.lastname) {
        errors.lastname = "Last name is required";
      } else if (!/^[A-Za-z\s]+$/.test(data.lastname)) {
        errors.lastname = "Only letters allowed";
      }

      if (!data.email) {
        errors.email = "Email is required";
      } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) {
        errors.email = "Invalid email format (use user@domain.com)";
      }

      if (!data.phone) {
        errors.phone = "Phone number is required";
      } else if (!/^[0-9]{10}$/.test(data.phone)) {
        errors.phone = "Enter valid 10 digit number";
      }

      return errors;
    },

    // 🔹 Cancel Button
    clearForm: function () {
      this.$("input").val("");
      this.formData = {};
      this.formErrors = {};
      this.globalErrorMessage = false;
      this.successMessage = false;
      this.render();
    },

    getContext: function () {
      return {
        pageHeader: "Contact Form",
        errors: this.formErrors,
        globalErrorMessage: this.globalErrorMessage,
        formData: this.formData,
        successMessage: this.successMessage,
      };
    },
  });
});
