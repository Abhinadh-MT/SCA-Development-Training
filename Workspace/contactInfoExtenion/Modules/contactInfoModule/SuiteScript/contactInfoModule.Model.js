define('contactInfoModule.Model', function () {

  'use strict';

  return {

    create: function (data) {

      try {
        // 🔹 Validation
        if (data) {
       return  {
            success: false,
            errorMessage: 'checking if it reaching backend'
        };
        }

        // 🔹 Get logged-in customer
        var customerId = nlapiGetUser();

        if (!customerId) {
            throw nlapiCreateError(
                'NO_USER',
                'User not logged in',
                true
            );
        }

        // 🔹 Create Contact Record
        var contactRec = nlapiCreateRecord('contact');

        contactRec.setFieldValue('firstname', data.firstname);
        contactRec.setFieldValue('lastname', data.lastname || '');
        contactRec.setFieldValue('email', data.email);
        contactRec.setFieldValue('phone', data.phone || '');

        // 🔹 Link Contact to Customer
        contactRec.setFieldValue('company', customerId);

        // 🔹 Save Record
        var contactId = nlapiSubmitRecord(contactRec, true, true);

        return {
            success: true,
            message: 'Contact created successfully',
            contactId: contactId
        };

    } catch (e) {
        return {
            success: false,
            errorMessage: (e && e.getDetails) ? e.getDetails() : e.toString()
        };
    }

    }

  };
});