sap.ui.define(
	["sap/ui/core/mvc/Controller",
	 "sap/m/MessageToast"],
	function(Controller, MessageToast){
		return Controller.extend("ibm.fin.ar.controller.BaseController",{
			onInit: function(){
				
			},
			someBaseMethod: function(){
				MessageToast.show("Wallah! the fragment button code triggered");
			}
		});
});