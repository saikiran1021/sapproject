sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "com/project/project1/model/model"
], function (UIComponent, JSONModel, model) {
    "use strict";

    return UIComponent.extend("com.project.project1.Component", {

        metadata: {
            manifest: "json"
        },

        init: function () {
            UIComponent.prototype.init.apply(this, arguments);

            // Set JSON Model
            var oModel = model.createModel();
            this.setModel(oModel);

            // Initialize Router
            this.getRouter().initialize();
        }
    });
});
