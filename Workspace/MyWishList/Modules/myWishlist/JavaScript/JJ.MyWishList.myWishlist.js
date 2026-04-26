define('JJ.MyWishList.myWishlist', [
    'Facets.ItemCell.View',
    'JJ.MyWishList.myWishlist.View',
    'underscore'
], function (
    FacetsItemCellView,
    myWishlistView,
    _
) {
    'use strict';

    return {
        mountToApp: function (container) {
            if (FacetsItemCellView) {
                FacetsItemCellView.addChildViews({
                    'ItemDetails.Options': {
                        'Wishlist.Icon': {
                            childViewIndex: 10,
                            childViewConstructor: function () {
                                return new myWishlistView({
                                    container: container,
                                    Model: this.model
                                });
                            }
                        }
                    }
                });
            } else {
                console.log("FacetsBrowseView component is not available.");
            }
        }
    };
});

