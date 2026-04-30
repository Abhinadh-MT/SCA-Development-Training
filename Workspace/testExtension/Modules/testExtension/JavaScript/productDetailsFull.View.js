define('JJ.testExtension.productDetailsFull.View', [
    'ProductDetails.Full.View',
    'jj_product_details_full.tpl',
    'underscore',
    'jQuery'
], function (
    ProductDetailsFullView,
    product_details_full_tpl,
    _,
    $
) {
    'use strict';

    return {
        loadExtension: function (container) {
            var pdp = container.getComponent('PDP');

            ProductDetailsFullView.prototype.template = product_details_full_tpl;

            ProductDetailsFullView.prototype.events = _.extend({}, ProductDetailsFullView.prototype.events, {
                'click [data-action="show-warranty-info"]': 'showWarrantyInfo',
                'change [data-action="update-delivery-note"]': 'updateDeliveryNote',
                'blur [data-action="update-delivery-note"]': 'blurDeliveryNote'
            });


            _.extend(ProductDetailsFullView.prototype, {
                showWarrantyInfo: function (e) {
                    e.preventDefault();
                    alert('Warranty Info: This item includes a 1-year manufacturer warranty.');
                },

                updateDeliveryNote: function (e) {
                    var val = $(e.currentTarget).val();

                    // Force it into the model directly
                    this.model.set('custcol_jj_delivery_note', val);

                    if (pdp) {
                        pdp.setOption('custcol_jj_delivery_note', val);
                    }
                },

                blurDeliveryNote: function (e) {
                    this.updateDeliveryNote(e);
                }
            });

            // CRITICAL: Return the promise and use the model's direct set as well
            if (pdp) {
                pdp.on('beforeAddToCart', function () {
                    var val = jQuery('[data-action="update-delivery-note"]').val();
                    console.log('PDP DEBUG: Attempting to send note:', val);
                    if (val) {
                        return pdp.setOption('custcol_jj_delivery_note', val);
                    }
                });
            }


            ProductDetailsFullView.prototype.getContext = _.wrap(ProductDetailsFullView.prototype.getContext, function (originalGetContext) {

                var context = originalGetContext.apply(this, _.toArray(arguments).slice(1));

                var item = this.model.get('item');
                if (item) {
                    console.log('PDP DEBUG: Available Item Fields:', _.keys(item.attributes || item));
                }

                context.custitem_expected_delivery = (item && item.get('custitem_jj_expected_delivery')) || '3-5 Business Days';
                context.custcol_special_note = 'No special notes available.';

                var options = this.model.get('options');
                var deliveryNoteValue = '';


                if (options) {
                    if (typeof options.findWhere === 'function') {
                        var opt = options.findWhere({ cartOptionId: 'custcol_jj_delivery_note' }) ||
                            options.findWhere({ id: 'custcol_jj_delivery_note' });

                        var val = opt ? opt.get('value') : '';
                        deliveryNoteValue = (val && typeof val === 'object') ? (val.label || val.internalid) : val;
                        console.log('PDP DEBUG: Found in options:', deliveryNoteValue);
                    }
                }

                if (!deliveryNoteValue) {
                    var val = this.model.get('custcol_jj_delivery_note') || '';
                    deliveryNoteValue = (val && typeof val === 'object') ? (val.label || val.internalid) : val;
                  
                }

                context.custcol_jj_delivery_note = deliveryNoteValue;
                context.custcol_delivery_note = deliveryNoteValue; // Keep both for safety

                context.showWarrantyInfo = true;
                context.showDeliverySection = true;

                return context;
            });
        }
    };
});
