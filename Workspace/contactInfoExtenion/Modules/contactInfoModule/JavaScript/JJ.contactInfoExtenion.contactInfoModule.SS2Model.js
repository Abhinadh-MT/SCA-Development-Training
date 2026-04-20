// Model.js
// -----------------------
// @module Case
define("JJ.contactInfoExtenion.contactInfoModule.SS2Model", ["Backbone", "Utils"], function(
    Backbone,
    Utils
) {
    "use strict";
     
    // @class Case.Fields.Model @extends Backbone.Model
    return Backbone.Model.extend({
        //@property {String} urlRoot
     
        urlRoot: Utils.getAbsoluteUrl(
            getExtensionAssetsPath(
                "Modules/contactInfoModule/SuiteScript2/contactInfoModule.Service.ss"
            ),
            true
        ),
        sync: function(method, model, options) {
            options = options || {};
            if (method === 'create' || method === 'update') {
                options.contentType = 'application/json';
                options.dataType = 'json';
                options.data = JSON.stringify(model.toJSON());
                console.log(' METHOD:', method);
                console.log(' MODEL DATA:', model.toJSON());
                console.log(' FINAL PAYLOAD (JSON):', options.data);
            }
            return Backbone.sync.call(this, method, model, options);
        }
});
});
