sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], function (Controller, MessageBox, MessageToast) {
    "use strict";

    return Controller.extend("com.project.project1.controller.Main", {

        onInit: function () {

            // Optional: initialize default model values if needed
            var oModel = this.getOwnerComponent().getModel();

            if (oModel) {
                oModel.setProperty("/claimAmount", "");
                oModel.setProperty("/returnAmount", "");
                oModel.setProperty("/claimLimit", 5000); // example limit
            }
        },

        onAmountChange: function () {
            var oModel = this.getOwnerComponent().getModel();

            var iAmount = parseFloat(oModel.getProperty("/claimAmount")) || 0;
            var iLimit = parseFloat(oModel.getProperty("/claimLimit")) || 0;

            if (iAmount > iLimit) {
                MessageBox.error("Amount exceeds allowed limit!");
                oModel.setProperty("/claimAmount", "");
                oModel.setProperty("/returnAmount", "");
                return;
            }

            var iReturn = iAmount * 0.83; // 83% reimbursement
            oModel.setProperty("/returnAmount", iReturn.toFixed(2));
        },

        onSubmit: function () {
            MessageToast.show("Claim Submitted Successfully!");
        },

        onNavToClaim: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("claim");
        }

    });
});
