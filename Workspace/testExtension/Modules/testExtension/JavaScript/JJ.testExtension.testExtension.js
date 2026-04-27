define('JJ.testExtension.testExtension', [
    'JJ.testExtension.productDetailsFull.View'
], function (
    ProductDetailsFullViewExtension
) {
    'use strict';

    return {
        mountToApp: function (container) {
            ProductDetailsFullViewExtension.loadExtension();
        }
    };
});