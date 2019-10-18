sap.ui.define([
	"ibm/fin/ar/controller/BaseController",
	"sap/m/MessageBox",
	"sap/m/MessageToast"
], function(Controller, MessageBox, MessageToast) {
	"use strict";

	return Controller.extend("ibm.fin.ar.controller.View2", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ibm.fin.ar.view.View2
		 */
		onInit: function() {
			var oRouter = this.getOwnerComponent().getRouter();
			//whenever the route change, browser back-forth, manually, select an item
			oRouter.attachRoutePatternMatched(this.herculis, this);
		},
		herculis: function(oEvent){
			var selectedIndex = oEvent.getParameter("arguments").myVar; 
			this.getView().bindElement("/" + selectedIndex);
			var oModel = this.getView().getModel();
			var that = this;
			oModel.read("/" + selectedIndex, {
				urlParameters: {
					$expand: 'ToSupplier'
				}
			,	success: function(data){
					
					that.getView().byId("supplierForm").bindElement("/"+selectedIndex+"/ToSupplier");
				},
				error: function(oError){
					
				}
			});
		},
		onBack: function(){
			var oApp = this.getView().getParent();
			oApp.to("idView1");
		},
		spartans: function(choice){
			var sOrderId = "500000012";
			if(choice === "OK"){
				var sMsgText =
				this.getView().getModel("i18n").getResourceBundle().getText("XMSG_CONFIRM",sOrderId);
				MessageToast.show(sMsgText);
			}else{
				MessageBox.error("save terminated");
			}
		},
		onSave: function(oEvent){
			var sMsgText = this.getView().getModel("i18n").getResourceBundle().getText("XMSG_SAVE");
			MessageBox.confirm(sMsgText,{
				title: "Confirmation",
				//we MUST pass the object of this pointer to the spartans method as controller object
				//here is the alternate of [this.methodName, this], we use .bind(this)
				onClose: this.spartans.bind(this)
			});
		},
		onPress: function(){
			alert("on press triggered")	;
		},
		onTest: function(){
			this.someBaseMethod();
		},
		fieldId: "",
		cityPopup: null,
		supplierPopup: null,
		onSupplierPopup: function(oEvent){
			if(this.supplierPopup === null){
				this.supplierPopup = new sap.ui.xmlfragment("ibm.fin.ar.fragments.popup", this);
				this.supplierPopup.bindAggregation("items",{
					path: '/suppliers',
					template: new sap.m.DisplayListItem({
						label:"{name}",
						value:"{City}"
					})
				});
				this.getView().addDependent(this.supplierPopup);
				this.supplierPopup.setTitle("Supplier Data");
			}
			this.supplierPopup.open();
		},
		onPopupSearch: function(oEvent){
			var query = oEvent.getParameter("value");
			var oFilter = new sap.ui.model.Filter('name',
			sap.ui.model.FilterOperator.Contains,query);
			var oPopup = oEvent.getSource();
			oPopup.getBinding("items").filter([oFilter]);
		},
		onF4Help: function(oEvent){
			//step1 : know the id of our input field
			this.fieldId = oEvent.getSource().getId();
			if(this.cityPopup === null){
				this.cityPopup = new sap.ui.xmlfragment("ibm.fin.ar.fragments.popup", this);	
				var oSorter = new sap.ui.model.Sorter('name');
				this.cityPopup.bindAggregation("items",{
					path: "/cities",
					sorter: oSorter,
					template: new sap.m.DisplayListItem({
						label: "{name}",
						value: "{calledFor}"
					})
				});
				//making the guest as friend to give access of resources like model
				this.getView().addDependent(this.cityPopup);
				this.cityPopup.setTitle("Cities");
			}
			this.cityPopup.open();
			
		},
		onConfirm: function(oEvent){
			debugger;
			if(oEvent.getSource().getTitle() === "Supplier Data"){
				var allItems = oEvent.getParameter("selectedItems");
				var aFilters = [];
				for(var i=0;i<allItems.length;i++){
					var suppName = allItems[i].getLabel();
					var oFilter = new sap.ui.model.Filter("name", sap.ui.model.FilterOperator.EQ,
														  suppName);
					aFilters.push(oFilter);
				}
				var mainFilter = new sap.ui.model.Filter({
					filters: aFilters,
					and:false
				});
				var oTable = this.getView().byId("idTable");
				oTable.getBinding("items").filter([mainFilter]);
			}else{
				//Step 1: we read the event parameter which gives object of selected item
				var selectedItem = oEvent.getParameter("selectedItem");
				//read the label from the item selected as city name was supplied in label
				var myValue = selectedItem.getLabel();
				//set the value to the input field on which F4 was pressed
				sap.ui.getCore().byId(this.fieldId).setValue(myValue);
			}
			
		}
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf ibm.fin.ar.view.View2
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf ibm.fin.ar.view.View2
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf ibm.fin.ar.view.View2
		 */
		//	onExit: function() {
		//
		//	}

	});

});