sap.ui.define(
	["sap/ui/core/Control"],
	function(Control){
		Control.extend("ibm.fin.ar.controls.Heading",{
			//all the properties, events, methods, agg, are defined in metadata
			metadata:{
				properties: {
					"text":"",
					"color": "",
					"border":""
				}
			},
			//if we want to initialize some values to these prop... we will use
			//the init method - initialization method
			init:function(){ 
				this.setColor("blue");
			},
			//renderer is going to produce the the equivalent HTML for your custom
			//code, oRm- Renderer manager which will talk to browser
			//oControl - which is the object of the custom control itself, using
			//this we can access metadata of the UI Control 
			renderer: function(oRm,oControl){
				//oRm.write("<h1 style='color:" + oControl.getColor() +  "'>" + oControl.getText() + "</h1>");
				oRm.write("<h1");
				oRm.addStyle("color",oControl.getColor());
				oRm.addStyle("border",oControl.getBorder());
				oRm.writeStyles();
				oRm.write(">" + oControl.getText() + "</h1>");
			}
		});
});