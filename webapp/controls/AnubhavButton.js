sap.ui.define(["sap/m/Button"], function(oBtn){
	
	oBtn.extend("ibm.fin.ar.controls.AnubhavButton",{
		metadata: {
			properties:{},
			events:{
				"hover":{}
			},
			aggregation:{},
			methods:{}
		},
		onmouseover: function(){
			this.fireHover();
		},
		renderer: {}
	});
	
});