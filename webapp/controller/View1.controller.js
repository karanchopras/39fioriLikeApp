sap.ui.define([
	"ibm/fin/ar/controller/BaseController"
], function (Controller) {
	"use strict";
	//test3
	//test2
	return Controller.extend("ibm.fin.ar.controller.View1", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ibm.fin.ar.view.View1
		 */
		onInit: function () {
			this.oRouter = this.getOwnerComponent().getRouter();
			this.oRouter.attachRoutePatternMatched(this.herculis, this);
		},
		herculis: function (oEvent) {
			var selectedIndex = oEvent.getParameter("arguments").myVar;
			var oList = this.getView().byId("myList");
			var itemToBeSelected = oList.getItems()[parseInt(selectedIndex)];
			oList.setSelectedItem(itemToBeSelected);

			//Reading the data manually
			// var that = this;
			// var oDataModel = this.getView().getModel();
			// oDataModel.read("/ProductSet('HT-1000')",{
			// 	success: function(data){
			// 		alert("data aagaya");
			// 		console.log(data);
			// 		var oLocal = new sap.ui.model.json.JSONModel();
			// 		oLocal.setData({
			// 			mydata: data
			// 		});
			// 		that.getView().setModel(oLocal,"zkas");
			// 	},
			// 	error: function(Error){
			// 		console.log(Error);
			// 	}
			// });

		},
		onMostExp: function () {
			//Step 1: Get the odata model object
			var oDataModel = this.getView().getModel();
			var that = this;
			//Step 2: call function import
			oDataModel.callFunction("/GetMostExpensiveProduct", {
				//Step 3: handle call back
				success: function (result) {
					//Step 4: Create dynamic popup
					var oModel = new sap.ui.model.json.JSONModel();
					oModel.setData(result);
					that.getView().setModel(oModel, "myExp");
					var that2 = that;
					//AMD - Asynchronous Module Definition to load dynamic dependencies
					//When we need, then we load, because user may/may not click on
					//this button for most exp product
					sap.ui.require(["sap/m/Dialog",
							"sap/ui/layout/form/SimpleForm",
							"sap/m/Label",
							"sap/m/Text",
							"sap/m/Button"
						],
						function (Dialog, SimpleForm, Label, TextField, Button) {
							//Create a brand new Dialog control (popup in Fiori)
							var oDialog = new Dialog({
								title: "Most Expensive Item",
								contentWidth: "800px",
								beginButton: new Button({
									text: "close",
									press: function (oEvent) {
										//oEvent.getSource().getParent().close();
										oDialog.close();
									}
								})
							});
							//Create a brand new simple form
							var oSimple = new SimpleForm({
								content: [
									new Label({
										text: "Product Id"
									}),
									new TextField({
										text: "{myExp>/PRODUCT_ID}"
									}),
									new Label({
										text: "Name"
									}),
									new TextField({
										text: "{myExp>/NAME}"
									}),
									new Label({
										text: "Price"
									}),
									new TextField({
										text: "{myExp>/PRICE} {myExp>/CURRENCY_CODE}"
									})
								]
							});
							//Add simple form inside dialog
							oDialog.addContent(oSimple);
							//Set the model to dialog so that it can show data
							//Step 5: Bind the data to dynamic popup
							oDialog.setModel(that2.getView().getModel("myExp"), "myExp");
							//Step 6: Open the popup
							oDialog.open();
						});
				},
				//Step 3: handle call back
				error: function (oErr) {
					debugger;
				}
			});

		},
		onSearch: function (oEvent) {
			var valueEneterdByUserOnScreen = oEvent.getParameter("query");
			if (!valueEneterdByUserOnScreen) {
				valueEneterdByUserOnScreen = oEvent.getParameter("newValue");
			}
			//Filter object- it used to filter the data from the model
			var oFilter1 = new sap.ui.model.Filter(
				"name",
				sap.ui.model.FilterOperator.Contains,
				valueEneterdByUserOnScreen);
			var oFilter2 = new sap.ui.model.Filter(
				"type",
				sap.ui.model.FilterOperator.Contains,
				valueEneterdByUserOnScreen);

			var oFilter = new sap.ui.model.Filter({
				filters: [oFilter1, oFilter2],
				and: false
			});

			var aFilter = [oFilter]; //AND operator by default
			var oList = this.getView().byId("myList");
			oList.getBinding("items").filter(aFilter);

		},
		onNext: function (myIndex) {
			//Get the mother object of this view
			//var oApp = this.getView().getParent();
			//use the mother object to call another view
			//oApp.to("idView2","flip");
			this.oRouter.navTo("oberoy", {
				myVar: myIndex
			});
		},
		onDelete: function (oEvent) {
			var itemToBeDeleted = oEvent.getParameter("listItem");
			var oList = oEvent.getSource();
			oList.removeItem(itemToBeDeleted);
		},
		onItemPress: function (oEvent) {

				debugger;

				var addressOfSelectedItem = oEvent.getParameter("listItem").getBindingContextPath();

				//var myIndex = addressOfSelectedItem.split("/")[addressOfSelectedItem.split("/").length - 1];
				this.onNext(addressOfSelectedItem.replace("/", ""));

				// //get the mother of both brothers
				// var oApp = this.getView().getParent().getParent();
				// //get the second child of the mother (brother 2)
				// var oView2 = oApp.getDetailPages()[0];
				// //bind the address of selected item to whole of view2
				// oView2.bindElement(addressOfSelectedItem);

			}
			/**
			 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			 * (NOT before the first rendering! onInit() is used for that one!).
			 * @memberOf ibm.fin.ar.view.View1
			 */
			//	onBeforeRendering: function() {
			//
			//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf ibm.fin.ar.view.View1
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf ibm.fin.ar.view.View1
		 */
		//	onExit: function() {
		//
		//	}

	});

});