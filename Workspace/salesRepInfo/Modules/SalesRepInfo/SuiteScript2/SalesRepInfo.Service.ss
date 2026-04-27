/**
 * @NApiVersion 2.x
 * @NModuleScope Public
 */
define(['N/runtime', 'N/search', 'N/file'], function (runtime, search, file) {
    "use strict";
    return {
        service: function (ctx) {
            var user = runtime.getCurrentUser();
            var response = {
                assigned: false
            };
           log.debug('User: ' + JSON.stringify(user));
            if (user.id > 0) {
                try {
                    // Search for customer's sales rep
                    var customerData = search.lookupFields({
                        type: search.Type.CUSTOMER,
                        id: user.id,
                        columns: ['salesrep']
                    });
                    log.debug('Customer data: ' + JSON.stringify(customerData));

                    if (customerData.salesrep && customerData.salesrep.length > 0) {
                        var salesRepId = customerData.salesrep[0].value;
                        
                        if (salesRepId) {
                            var employeeData = search.lookupFields({
                                type: search.Type.EMPLOYEE,
                                id: salesRepId,
                                columns: ['entityid', 'title', 'email', 'phone', 'image', 'custentity_jj_meeting_link']
                            });

                            response.assigned = true;
                            response.name = employeeData.entityid;
                            response.title = employeeData.title;
                            response.email = employeeData.email;
                            response.phone = employeeData.phone;
                            response.meeting_link = employeeData.custentity_jj_meeting_link || '';
                            
                        if (employeeData.image && employeeData.image.length > 0) {
                                try {
                                    var imageFile = file.load({
                                        id: employeeData.image[0].value
                                    });
                                    response.image = imageFile.url;
                                } catch (fileError) {
                                    // Fallback if file cannot be loaded
                                    response.image = null;
                                }
                            }
                        }
                    }
                } catch (e) {
                    response.error = e.message;
                }
            }

            ctx.response.setContentType({
                type: ctx.response.Type.JSON
            });
            ctx.response.write(JSON.stringify(response));
        }
    };
});


