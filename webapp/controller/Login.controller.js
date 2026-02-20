sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], function (Controller, MessageBox) {
    "use strict";

    return Controller.extend("com.project.project1.controller.Login", {

        onLogin: function () {

            var oUserModel = this.getOwnerComponent().getModel("user");
            var data = oUserModel.getData();

            var username = data.username;
            var password = data.password;

            if (!username || !password) {
                MessageBox.warning("Please enter Username and Password");
                return;
            }

            var user = data.users.find(function (u) {
                return u.username === username && u.password === password;
            });

            if (user) {

                // Set logged-in user
                oUserModel.setProperty("/currentUser", user);

                MessageBox.success("Login Successful", {
                    onClose: function () {
                        this.getOwnerComponent()
                            .getRouter()
                            .navTo("Dashboard");
                    }.bind(this)
                });

            } else {
                MessageBox.error("Invalid Credentials");
            }
        }

    });
});
