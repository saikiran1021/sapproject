sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], function (Controller, MessageBox) {
    "use strict";

    return Controller.extend("com.project.project1.controller.Dashboard", {

        onCreate: function () {
            this.getOwnerComponent()
                .getRouter()
                .navTo("ClaimType");
        },

        onLogout: function () {

            MessageBox.confirm("Are you sure you want to logout?", {
                onClose: function (oAction) {
                    if (oAction === "OK") {

                        this.getOwnerComponent()
                            .getModel("user")
                            .setProperty("/currentUser", null);

                        this.getOwnerComponent()
                            .getRouter()
                            .navTo("Login");
                    }
                }.bind(this)
            });
        }

    });
});
