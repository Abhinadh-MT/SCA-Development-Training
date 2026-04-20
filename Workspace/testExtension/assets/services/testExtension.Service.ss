
function service(request, response)
{
	'use strict';
	try 
	{
		require('JJ.testExtension.testExtension.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('JJ.testExtension.testExtension.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}