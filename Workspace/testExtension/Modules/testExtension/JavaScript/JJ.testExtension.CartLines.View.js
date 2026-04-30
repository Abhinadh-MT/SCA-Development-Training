define('JJ.testExtension.CartLines.View', [
    'Cart.Lines.View',
    'jj_cart_lines.tpl',
    'underscore',
    'jQuery'
], function (
    CartLinesView,
    jj_cart_lines_tpl,
    _,
    $
) {
    'use strict';

    return {
        loadExtension: function (container) {
            // var cart = container.getComponent('Cart'); // Left commented out as per "no need to update cart"

            CartLinesView.prototype.template = jj_cart_lines_tpl;

            CartLinesView.prototype.events = _.extend({}, CartLinesView.prototype.events, {
                'click [data-action="show-warranty-info"]': 'showWarrantyInfo'
            });

            _.extend(CartLinesView.prototype, {
                showWarrantyInfo: function (e) {
                    e.preventDefault();
                    alert('Warranty Info: This item includes a 1-year manufacturer warranty.');
                }
            });

            // Wrap getContext to add custom delivery details
            CartLinesView.prototype.getContext = _.wrap(CartLinesView.prototype.getContext, function (originalGetContext) {
                var context = originalGetContext.apply(this, _.toArray(arguments).slice(1));

                var item = this.model.get('item');
                var expectedDelivery = '3-5 Business Days';

                if (item) {
                    if (typeof item.get === 'function') {
                        expectedDelivery = item.get('custitem_expected_delivery') || expectedDelivery;
                    } else {
                        expectedDelivery = item.custitem_expected_delivery || expectedDelivery;
                    }
                }

                context.custitem_expected_delivery = expectedDelivery;
                context.custcol_special_note = 'No special notes available.';

                // Robustly read current delivery note from line options
                var options = this.model.get('options');
                var deliveryNoteValue = '';

                // DIAGNOSTIC: Print all available options to see what is actually there
                if (options) {
                    console.log('--- START OPTION LIST ---');
                    if (typeof options.each === 'function') {
                        options.each(function (opt) {
                            console.log('Found Option on Line:', opt.get('cartOptionId') || opt.id, '| Value:', opt.get('value'));
                        });
                    } else if (_.isArray(options)) {
                        _.each(options, function (opt) {
                            console.log('Found Option on Line (array):', opt.cartOptionId || opt.id, '| Value:', opt.value);
                        });
                    }
                    console.log('--- END OPTION LIST ---');
                }

                if (options) {
                    if (typeof options.findWhere === 'function') {
                        var opt = options.findWhere({ cartOptionId: 'custcol_jj_delivery_note' }) ||
                            options.findWhere({ id: 'custcol_jj_delivery_note' });

                        var val = opt ? opt.get('value') : '';
                        deliveryNoteValue = (val && typeof val === 'object') ? (val.label || val.internalid) : val;
                    } else if (_.isArray(options)) {
                        var opt = _.find(options, function (o) {
                            return o.cartOptionId === 'custcol_jj_delivery_note' || o.id === 'custcol_jj_delivery_note';
                        });
                        var val = opt ? (opt.value || opt.get && opt.get('value')) : '';
                        deliveryNoteValue = (val && typeof val === 'object') ? (val.label || val.internalid) : val;
                    }
                }

                context.custcol_delivery_note = deliveryNoteValue;
                console.log('Cart View: Final note value to display (Standard Only):', context.custcol_delivery_note);

                context.showWarrantyInfo = true;
                context.showDeliverySection = true;

                return context;
            });
        }
    };
});
