define( [], function(  ) {
"use strict";


function validate()
{
};

validate.prototype.initialize = function( oControlHost, fnDoneInitializing )
{

var fntestId = function( aValues )
{
   //do work
   
   if (repromptIsNeeded){
      oControlHost.reprompt();
      return false;
   }else{
      return true;
   }
oControlHost.page.getControlByName('testId').setValidator( fntestId );


fnDoneInitializing();
	
};


   
}
};
return validate;
});
