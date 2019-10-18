sap.ui.define(
	["sap/ui/core/UIComponent"],
	function(UIComponent){
		return UIComponent.extend("ibm.fin.ar.Component",{
			metadata: {
				"manifest": "json"
			},
			init: function(){
				//invoke the parent class constructor
				sap.ui.core.UIComponent.prototype.init.apply(this);
				//Get the router object from parent class
				var oRouter = this.getRouter();
				//We need to ask router to read the app information 
				//and start its work
				oRouter.initialize();
			},
			// createContent: function(){
			// 	var oView = new sap.ui.view("idView",{
			// 		viewName: "ibm.fin.ar.view.App",
			// 		type: sap.ui.core.mvc.ViewType.XML
			// 	});
				
			// 	var oView1 = new sap.ui.view("idView1",{
			// 		viewName: "ibm.fin.ar.view.View1",
			// 		type: sap.ui.core.mvc.ViewType.XML
			// 	});
				
			// 	var oView2 = new sap.ui.view("idView2",{
			// 		viewName: "ibm.fin.ar.view.View2",
			// 		type: sap.ui.core.mvc.ViewType.XML
			// 	});
				
			// 	//obtain the app container which is inside app view
			// 	var oMother = oView.byId("myApp");
			// 	oMother.addMasterPage(oView1);
			// 	oMother.addDetailPage(oView2);
				
			// 	// var oResource = new sap.ui.model.resource.ResourceModel({
			// 	// 	bundleUrl: "i18n/i18n.properties"
			// 	// });
			// 	// //When we use component.js based app, we must set the model @ App view level to make 
			// 	// //it available @ application level
			// 	// oView.setModel(oResource,"i18n");
			// 	return oView;
			// },
			destroy: function(){}
		});
	}
);