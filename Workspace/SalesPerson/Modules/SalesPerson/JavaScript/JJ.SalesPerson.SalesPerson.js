define('JJ.SalesPerson.SalesPerson'
	, [
		'JJ.SalesPerson.SalesPerson.View',
		'JJ.SalesPerson.SalesPerson.SS2Model'
	]
	, function (
		SalesPersonView,
		SalesPersonModel
	) {
		'use strict';

		return {
			mountToApp: function (container) {
				var layout = container.getComponent('Layout');
				var model = new SalesPersonModel();

				if (layout) {
					
					model.fetch().done(function () {
						if (model.get('assigned')) {
							
							layout.addChildView('Overview.Banner', function () {
								return new SalesPersonView({ model: model });
							});

							layout.addChildView('OrderHistory.List.Banner', function () {
								return new SalesPersonView({ model: model });
							});
						}
					});
				}
			}
		};
	});
