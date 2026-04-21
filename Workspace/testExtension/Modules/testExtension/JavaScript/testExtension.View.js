define('JJ.testExtension.testExtension.View', [
    'jj_testextension_testextension.tpl',
    'Backbone',
    'jQuery'
], function (
    jj_testextension_testextension_tpl,
    Backbone,
    $
) {
    'use strict';

    return Backbone.View.extend({
        template: jj_testextension_testextension_tpl,

        initialize: function (options) {
            this.pdp = options.pdpComponent;

            var self = this;
            if (this.pdp) {
                this.pdp.on('afterOptionSelection', function() {
                    self.render();
                });
            }
        },

        events: {
            'click [data-action="show-warranty-info"]': 'showWarrantyInfo',
            'change [data-action="update-delivery-note"]': 'validateDeliveryNote',
            'blur [data-action="update-delivery-note"]': 'blurDeliveryNote'
        },

        showWarrantyInfo: function (e) {
            e.preventDefault();
            alert('Warranty Info: This item includes a 1-year manufacturer warranty.');
        },

        validateDeliveryNote: function (e) {
            var val = $(e.currentTarget).val();
            if (val && val.length < 5) {
                alert('Please enter a more detailed delivery note (at least 5 characters).');
            }
        },

        blurDeliveryNote: function (e) {
            console.log('Delivery note input blurred.', $(e.currentTarget).val());
        },

        getContext: function () {
            
            var itemInfo = this.pdp ? this.pdp.getItemInfo() : {};
            var item = itemInfo.item || {};
            console.log(`item`, item.custitem_expected_delivery );

            return {
                custitem_expected_delivery: item.custitem_expected_delivery || '3-5 Business Days',
                custcol_special_note: item.custcol_special_note || 'No special notes available.',
                showWarrantyInfo: true,
                showDeliverySection: true
            };
        }
    });
});
