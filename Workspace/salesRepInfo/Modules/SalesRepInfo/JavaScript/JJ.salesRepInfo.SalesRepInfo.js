define(
	'JJ.salesRepInfo.SalesRepInfo'
,   [
		'JJ.salesRepInfo.SalesRepInfo.View'
	]
,   function (
		SalesRepInfoView
	)
{
	'use strict';

	return  {
		mountToApp: function mountToApp (container)
		{
		
			var myAccountLayout = container.getComponent('MyAccount');
			
			if(myAccountLayout)
			{
				myAccountLayout.addChildView('Overview.Banner', function() { 
					return new SalesRepInfoView({ container: container });
				});

			}
		}
	};
});
