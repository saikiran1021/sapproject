sap.ui.define([
    "sap/ui/core/UIComponent",
    "com/project/project1/model/models"
], function (UIComponent, models) {
    "use strict";

    return UIComponent.extend("com.project.project1.Component", {

        metadata: {
            manifest: "json"
        },

        init: function () {

            UIComponent.prototype.init.apply(this, arguments);

            // Initialize Models
            this.setModel(models.createUserModel(), "user");
            this.setModel(models.createClaimModel(), "claim");
            this.setModel(models.createClaimsModel(), "claims");

            // Start routing
            this.getRouter().initialize();
        }

    });
});
