sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], function (Controller, MessageBox) {
    "use strict";

    return Controller.extend("com.project.project1.controller.ClaimDetails", {

        onInit: function () {
            this.imageValidated = false;
            var oUploadSet = this.byId("uploadSet");
            if (oUploadSet) {
                oUploadSet.attachUploadCompleted(this.onUploadCompleted, this);
            }
        },

        onUploadCompleted: function (oEvent) {
            var aUploadedFiles = oEvent.getSource().getItems();
            
            if (aUploadedFiles.length > 0) {
                // Validate that an image was uploaded
                var oFile = aUploadedFiles[0];
                var sFileName = oFile.getFileName ? oFile.getFileName() : "";
                
                // Check if file is a valid image (bill/receipt)
                var validImageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp"];
                var isValidImage = validImageExtensions.some(ext => sFileName.toLowerCase().endsWith(ext));
                
                if (!isValidImage) {
                    MessageBox.error("Please upload a valid bill or receipt image (JPG, PNG, GIF, BMP)");
                    this.imageValidated = false;
                    oEvent.getSource().removeItem(oFile);
                    return;
                }
                
                // Image validated
                this.imageValidated = true;
                MessageBox.success("Bill/Receipt image uploaded successfully!");
            }
        },

        onAmountChange: function (oEvent) {
            var amount = oEvent.getParameter("value");
            var returnAmount = amount * 0.83; // 83% return
            
            this.getOwnerComponent()
                .getModel("claim")
                .setProperty("/returnAmount", Math.round(returnAmount * 100) / 100);
        },

        onSubmit: function () {
            var oUploadSet = this.byId("uploadSet");
            var aItems = oUploadSet.getItems();
            
            // Check if image is uploaded and validated
            if (aItems.length === 0) {
                MessageBox.warning("Please upload a bill/receipt image before submitting.");
                return;
            }
            
            if (!this.imageValidated) {
                MessageBox.warning("Please ensure the uploaded image is a valid bill/receipt. The image must be validated before submission.");
                return;
            }
            
            var oUserModel = this.getOwnerComponent().getModel("user");
            var currentUser = oUserModel.getProperty("/currentUser");
            
            MessageBox.success(
                "Thank you " + currentUser.name + ", your expense claim has been submitted successfully!",
                {
                    title: "Claim Submitted",
                    onClose: function () {
                        // Reset for next claim
                        this.imageValidated = false;
                        oUploadSet.removeAllItems();
                        this.byId("claimAmountInput").setValue("");
                        this.getOwnerComponent()
                            .getModel("claim")
                            .setProperty("/returnAmount", 0);
                        
                        // Navigate to Dashboard
                        this.getOwnerComponent()
                            .getRouter()
                            .navTo("Dashboard");
                    }.bind(this)
                }
            );
        },

        onNavBack: function () {
            this.getOwnerComponent()
                .getRouter()
                .navTo("Dashboard");
        }

    });
});
