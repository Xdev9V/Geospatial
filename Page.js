define( function() {
"use strict";

function PageModule()
{
};

PageModule.prototype.load = function( oPage )
{

	var oControl = oPage.getControlByName( "P_Property" ); //Replace Product Line with your prompt control name
	var oValues = oControl.getValues(true);
	
	//oControl.addValues( [oValues[2]] ); // Used to control the value pre-selected in the prompt control
};


return PageModule;
});
