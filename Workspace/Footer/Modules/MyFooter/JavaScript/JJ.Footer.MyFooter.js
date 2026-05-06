
define(
	'JJ.Footer.MyFooter'
	, [
		'JJ.Footer.MyFooter.View'
	]
	, function (
		MyFooterView
	) {
		'use strict';

		return {
			mountToApp: function mountToApp(container) {
				var layout = container.getComponent('Layout');
				var environment = container.getComponent('Environment');

				// Fetch configuration from Environment component
				var footerConfig = environment.getConfig('footer') || {};

				if (layout) {
					layout.addChildView('Footer', function () {
						return new MyFooterView({
							container: container,
							configuration: footerConfig
						});
					});
				}
			}
		};
	});
