sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], function (Controller, MessageBox) {
    "use strict";

    return Controller.extend("com.project.project1.controller.ClaimType", {

        onContinue: function () {

            var type = this.byId("claimTypeSelect").getSelectedKey();

            if (!type) {
                MessageBox.warning("Please select claim type");
                return;
            }

            this.getOwnerComponent()
                .getModel("claim")
                .setProperty("/selectedType", type);

            this.getOwnerComponent()
                .getRouter()
                .navTo("ClaimDetails");
        },

        onNavBack: function () {
            this.getOwnerComponent()
                .getRouter()
                .navTo("Dashboard");
        }

    });
});
