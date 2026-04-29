// Model.js
// -----------------------
// @module Case
define("JJ.SalesPerson.SalesPerson.SS2Model", ["Backbone", "Utils"], function(
    Backbone,
    Utils
) {
    "use strict";

    // @class Case.Fields.Model @extends Backbone.Model
    return Backbone.Model.extend({
        //@property {String} urlRoot
        urlRoot: Utils.getAbsoluteUrl(
            getExtensionAssetsPath(
                "Modules/SalesPerson/SuiteScript2/SalesPerson.Service.ss"
            ),
            true
        )
    });
});