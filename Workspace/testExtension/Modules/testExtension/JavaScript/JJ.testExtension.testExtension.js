define('JJ.testExtension.testExtension', [
    'JJ.testExtension.productDetailsFull.View',
    'JJ.testExtension.CartLines.View'
], function (
    ProductDetailsFullViewExtension,
    CartLinesViewExtension
) {
    'use strict';

    return {
        mountToApp: function (container) {
            ProductDetailsFullViewExtension.loadExtension(container);
            CartLinesViewExtension.loadExtension(container);
        }
    };
});