// Model.js
// -----------------------
// @module Case
define("JJ.contactInfoExtenion.contactInfoModule.Model", ["Backbone", "Utils"], function(
    Backbone,
    Utils
) {
    "use strict";
    console.log("reaching in model file"
    )

    // @class Case.Fields.Model @extends Backbone.Model
    return Backbone.Model.extend({
     
        //@property {String} urlRoot
        urlRoot: Utils.getAbsoluteUrl(
                "services/contactInfoModule.Service.ss"
            
        )
        
});
});
