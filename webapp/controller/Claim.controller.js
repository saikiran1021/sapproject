sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], function (Controller, MessageBox, MessageToast) {
    "use strict";

    return Controller.extend("com.project.project1.controller.Claim", {

        onInit: function () {
            // Optional: logic when claim page loads
        },

        onAmountChange: function () {
            var oModel = this.getOwnerComponent().getModel();
            var iAmount = parseFloat(oModel.getProperty("/claimAmount"));
            var iLimit = oModel.getProperty("/claimLimit");

            if (!iAmount) {
                oModel.setProperty("/returnAmount", "");
                return;
            }

            if (iAmount > iLimit) {
                MessageBox.error("Entered amount exceeds allowed limit");
                oModel.setProperty("/claimAmount", "");
                oModel.setProperty("/returnAmount", "");
                return;
            }

            var iReturn = iAmount * 0.83;
            oModel.setProperty("/returnAmount", iReturn.toFixed(2));
        },

        onSubmit: function () {
            MessageToast.show("Claim submitted successfully!");
        }

    });
});
