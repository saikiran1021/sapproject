sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function (JSONModel) {
    "use strict";

    return {
        createModel: function () {
            return new JSONModel({
                name: "",
                claimType: "",
                claimAmount: "",
                returnAmount: "",
                claimLimit: 0
            });
        }
    };
});
