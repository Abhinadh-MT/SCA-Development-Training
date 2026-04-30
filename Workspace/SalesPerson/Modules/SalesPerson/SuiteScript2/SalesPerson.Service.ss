/**
 * @NApiVersion 2.x
 * @NModuleScope Public
 */
define(['N/runtime', 'N/search', 'N/log','N/file'], function (runtime, search, log,file) {
    "use strict";
    return {
        service: function (ctx) {
            var user = runtime.getCurrentUser();
            var response = {
                assigned: false,
                name: '',
                title: '',
                email: '',
                comments: '',
                phone: '',
                image: '',
                meeting_link: ''
            };

            ctx.response.addHeader({
                name: 'Content-Type',
                value: 'application/json'
            });

            if (user.id > 0) {
                try {
                    // FAST LOOKUP: Get Sales Rep ID from Customer Record
                    var customerData = search.lookupFields({
                        type: search.Type.CUSTOMER,
                        id: user.id,
                        columns: ['salesrep']
                    });

                    var salesRepId = (customerData.salesrep && customerData.salesrep.length > 0) ? customerData.salesrep[0].value : null;

                    if (salesRepId) {
        
                        var employeeData = search.lookupFields({
                            type: search.Type.EMPLOYEE,
                            id: salesRepId,
                            columns: ['entityid', 'job', 'email', 'phone', 'image', 'comments', 'custentity_jj_meeting_link']
                        });
                        if (employeeData) {
                            response.assigned = true;
                            response.name = employeeData.entityid || '';
                            response.email = employeeData.email || '';
                            response.phone = employeeData.phone || '';
                            response.comments = employeeData.comments || '';
                            response.meeting_link = employeeData.custentity_jj_meeting_link || '';

                            // Handle Job/Title
                            if (employeeData.job && employeeData.job.length > 0) {
                                response.title = employeeData.job[0].text;
                            } else {
                                response.title = '';
                            }

                            // Image Resolution
                            if (employeeData.image && employeeData.image.length > 0) {
                                try {
                                    var imageFile = file.load({ id: employeeData.image[0].value });
                                    response.image = imageFile.url;
                                } catch (imgErr) {
                                    log.debug("Image Load Fail", imgErr);
                                }
                            }
                        }
                    }
                } catch (e) {
                    log.error("Service Error", e);
                    response.error = e.message;
                }
            }

            ctx.response.write(JSON.stringify(response));
        }
    };
});
