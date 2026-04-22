define('JJ.testExtension.testExtension', [
    'JJ.testExtension.productDetailsFull.View'
], function (
    ProductDetailsFullViewExtension
) {
    'use strict';

    return {
        mountToApp: function (container) {
            // Loading the override method
            ProductDetailsFullViewExtension.loadExtension();
        }
    };
});