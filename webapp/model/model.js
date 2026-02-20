sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function (JSONModel) {
    "use strict";

    return {

        createUserModel: function () {
            return new JSONModel({
                username: "",
                password: "",
                currentUser: null,
                users: [
                    {
                        username: "admin",
                        password: "1234",
                        name: "John Doe",
                        role: "Employee"
                    }
                ]
            });
        },

        createClaimModel: function () {
            return new JSONModel({
                selectedType: "",
                returnAmount: 0
            });
        },

        createClaimsModel: function () {
            return new JSONModel({
                claims: []
            });
        }

    };
});
