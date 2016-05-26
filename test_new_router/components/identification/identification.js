angular.module('minibankApp.identification', [])
  .controller('IdentificationController', [ '$log' , IdentificationController] );

 function IdentificationController($log) {
	  
	// in controller of component : this instead of $scope   
	var identification = this;  //in order to not use this in embedded callback 
	
	//IdentificationController.prototype prefix instead of $scope prefix for "event method" :
	
	IdentificationController.prototype.verifPassword = function(){
	if(this.password == ("pwd" + this.numClient) )
		return true;
	  else return false;
    };

	this.title = "identification client (minibank)";
	
	IdentificationController.prototype.doMyAction = function(){
	      $log.log("in doMyAction , numClient=" + this.numClient);
		  alert("in doMyAction , numClient=" + this.numClient);
	};

}
