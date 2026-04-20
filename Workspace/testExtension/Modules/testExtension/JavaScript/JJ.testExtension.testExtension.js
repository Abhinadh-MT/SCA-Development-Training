
define('JJ.testExtension.testExtension', [
    'ProductDetails.Information.View',
    'underscore'
], function (ProductDetailsInformationView, _) {

    'use strict';

    return {
        mountToApp: function () {

            _.extend(ProductDetailsInformationView.prototype, {

                getContext: _.wrap(ProductDetailsInformationView.prototype.getContext, function (fn) {

                    var context = fn.apply(this, _.toArray(arguments).slice(1));

                    var item = this.model.get('item');

                    console.log('items',item.get('custitem_jj_expected_delivery'))
                    context.expectedDelivery =
                        (item && item.get('custitem_jj_expected_delivery')) || '3–4 days';

                    return context;
                })
            });
        }
    };
});