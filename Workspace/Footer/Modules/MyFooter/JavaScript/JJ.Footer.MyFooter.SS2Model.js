// Model.js
// -----------------------
// @module Case
define("JJ.Footer.MyFooter.SS2Model", ["Backbone", "Utils"], function(
    Backbone,
    Utils
) {
    "use strict";

    // @class Case.Fields.Model @extends Backbone.Model
    return Backbone.Model.extend({
        //@property {String} urlRoot
        urlRoot: Utils.getAbsoluteUrl(
            getExtensionAssetsPath(
                "Modules/MyFooter/SuiteScript2/MyFooter.Service.ss"
            ),
            true
        )
});
});
