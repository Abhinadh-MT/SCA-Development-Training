// Model.js
// -----------------------
// @module Case
define("JJ.salesRepInfo.SalesRepInfo.SS2Model", ["Backbone", "Utils"], function(
    Backbone,
    Utils
) {
    "use strict";

    // @class Case.Fields.Model @extends Backbone.Model
    return Backbone.Model.extend({
        //@property {String} urlRoot
        urlRoot: Utils.getAbsoluteUrl(
            getExtensionAssetsPath(
                "Modules/SalesRepInfo/SuiteScript2/SalesRepInfo.Service.ss"
            ),
            true
        )
});
});
