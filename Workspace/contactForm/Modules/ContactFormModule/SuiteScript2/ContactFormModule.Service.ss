/**
* @NApiVersion 2.x
* @NModuleScope Public
*/
define([
  'N/record',
  'N/runtime',
  'N/search'
],function (record, runtime, search) {
    "use strict";
    return {
        service: function (ctx) {

               ctx.response.addHeader({
                name: 'Content-Type',
                value: 'application/json'
            });

           try {
      var data = JSON.parse(ctx.request.body || '{}');
      if (!data.firstname || !data.email) {
        throw new Error('First Name and Email are required');
      }

      var customerId = runtime.getCurrentUser().id;

      var customerLookup = search.lookupFields({
        type: search.Type.CUSTOMER,
        id: customerId,
        columns: ['isperson']
      });

      if (customerLookup.isperson === true || customerLookup.isperson === 'T') {
        throw new Error('Contacts can be added only for company accounts.');
      }

      // Check if contact already exists by email OR name for this company
      var existingContactSearch = search.create({
        type: search.Type.CONTACT,
        filters: [
          ['company', 'anyof', customerId],
          'AND',
          [
            ['email', 'is', data.email],
            'OR',
            [
              ['firstname', 'is', data.firstname],
              'AND',
              ['lastname', 'is', data.lastname]
            ]
          ]
        ],
        columns: ['email', 'firstname', 'lastname']
      });

      var searchResults = existingContactSearch.run().getRange({ start: 0, end: 1 });

      if (searchResults && searchResults.length > 0) {
        var existingContact = searchResults[0];
        var existingEmail = existingContact.getValue('email');

        if (existingEmail === data.email) {
          throw new Error('A contact with this email already exists for your company.');
        } else {
          throw new Error('A contact with this name already exists for your company.');
        }
      }

      var contact = record.create({
        type: record.Type.CONTACT,
        isDynamic: true
      });
    
      contact.setValue({
      fieldId: 'entityid',
      value: data.firstname + ' ' + data.lastname
    });
      contact.setValue({
        fieldId: 'firstname',
        value: data.firstname
      });

      contact.setValue({
        fieldId: 'lastname',
        value: data.lastname || ''
      });

      contact.setValue({
        fieldId: 'phone',
        value: data.phone || ''
      });

      contact.setValue({
        fieldId: 'email',
        value: data.email
      });

    contact.setValue({
        fieldId: 'company',
        value: customerId
        
    });
   
      var contactId = contact.save();
  
      ctx.response.write(JSON.stringify({
        success: true,
        message: 'Your contact created successfully.',
        id: contactId
      }));

    } catch (e) {

      ctx.response.write(JSON.stringify({
        success: false,
        message: e.message || 'Contacts can only be created for Company customers, not Individuals.', 
      }));
    }
        }}       
});