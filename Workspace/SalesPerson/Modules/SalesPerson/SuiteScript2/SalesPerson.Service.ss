/**
 * @NApiVersion 2.x
 * @NModuleScope Public
 */
define(['N/runtime', 'N/search', 'N/file', 'N/record', 'N/log', 'N/https', 'N/url'], function (runtime, search, file, record, log, https, url) {
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
                    var salesRepId = null;

                    try {
                        var customerRecord = record.load({
                            type: record.Type.CUSTOMER,
                            id: user.id
                        });
                        salesRepId = customerRecord.getValue({ fieldId: 'salesrep' });
                    } catch (loadError) {
                        var customerData = search.lookupFields({
                            type: search.Type.CUSTOMER,
                            id: user.id,
                            columns: ['salesrep']
                        });
                        if (customerData.salesrep && customerData.salesrep.length > 0) {
                            salesRepId = customerData.salesrep[0].value;
                        }
                    }

                    if (salesRepId) {
                        var suiteletUrl = 'https://td3079995.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=2264&deploy=1&compid=TD3079995&ns-at=AAEJ7tMQQGE0HwkDDB_eV3iWooLGL0syHGfgJXZP6R-cQkYhnus';
                        
                        var suiteletResponse = https.get({
                            url: suiteletUrl + '&repId=' + salesRepId
                        });
                      
                        var employeeData = JSON.parse(suiteletResponse.body);
                        
                        if (employeeData.assigned || employeeData.success) {
                            response.assigned = true;
                            response.name = employeeData.name || '';
                            
                            // Safe Title Handling
                            if (employeeData.title && employeeData.title.length > 0 && typeof employeeData.title !== 'string') {
                                response.title = employeeData.title[0].text;
                            } else {
                                response.title = employeeData.title || '';
                            }

                            response.email = employeeData.email || '';
                            response.comments = employeeData.comments || '';
                            response.phone = employeeData.phone || '';
                            response.meeting_link = employeeData.meeting_link || '';
                            response.image = employeeData.image || '';
                        }
                    }
                } catch (e) {
                    log.error("Final Service Error", e);
                    response.error = e.message;
                }
            }

            ctx.response.write(JSON.stringify(response));
        }
    };
});
