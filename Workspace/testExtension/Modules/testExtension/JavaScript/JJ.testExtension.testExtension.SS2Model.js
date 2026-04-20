// Model.js
// -----------------------
// @module Case
define("JJ.testExtension.testExtension.SS2Model", ["Backbone", "Utils"], function(
    Backbone,
    Utils
) {
    "use strict";

    // @class Case.Fields.Model @extends Backbone.Model
    return Backbone.Model.extend({
        //@property {String} urlRoot
        urlRoot: Utils.getAbsoluteUrl(
            getExtensionAssetsPath(
                "Modules/testExtension/SuiteScript2/testExtension.Service.ss"
            ),
            true
        )
});
});
