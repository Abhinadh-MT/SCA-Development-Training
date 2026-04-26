// Model.js
// -----------------------
// @module Case
define("JJ.MyWishList.myWishlist.SS2Model", ["Backbone", "Utils"], function(
    Backbone,
    Utils
) {
    "use strict";

    // @class Case.Fields.Model @extends Backbone.Model
    return Backbone.Model.extend({
        //@property {String} urlRoot
        urlRoot: Utils.getAbsoluteUrl(
            getExtensionAssetsPath(
                "Modules/myWishlist/SuiteScript2/myWishlist.Service.ss"
            ),
            true
        )
});
});
