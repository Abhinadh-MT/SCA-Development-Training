define(
	'JJ.SalesPerson.SalesPerson'
,   [
		'JJ.SalesPerson.SalesPerson.View'
	]
,   function (
		SalesPersonView
	)
{
	'use strict';

	return  {
		mountToApp: function mountToApp (container)
		{
			console.log('SalesPerson Extension Loading...');
			
			// Using Layout component as it is available across all application contexts
			var layout = container.getComponent('Layout');
			
			if (layout)
			{
				console.log('Layout Component found. Mounting views...');

				// Mount to Account Overview Banner
				layout.addChildView('Overview.Banner', function() { 
					return new SalesPersonView({ container: container });
				});

				// Mount to Recent Purchases (Order History) page Banner
				layout.addChildView('OrderHistory.List.Banner', function() { 
					return new SalesPersonView({ container: container });
				});
			}
			else {
				console.error('SalesPerson Error: Layout component not found.');
			}
		}
	};
});


