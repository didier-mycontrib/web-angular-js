angular.module('minibankApp.identifie', [])
  .controller('IdentifieController',  ['$routeParams','$http','$log', IdentifieController ]);
  
function IdentifieController($routeParams,$http , $log) {
    // in controller of component : this instead of $scope 
    var identifie = this;  //in order to not use this in embedded callback 
	//IdentifieController.prototype prefix instead of $scope prefix for "event method" :
	
	
 	this.clientId =  $routeParams.clientId ; 
	
   this.renderPath="listeComptes";	
   
   $http.get('data/client.json').success(function(data) {
	identifie.client = data;
	$log.log("nom client identifie:" + identifie.client.nom)
	});
	
$http.get('data/comptes.json').success(function(data) {
	identifie.comptes = data;
	$log.log("nb comptes=" + identifie.comptes.length)
	});
this.message="";	
	
this.transfert = {
	montant : 50,
	numCptDeb : 1,
	numCptCred: 2
};	


IdentifieController.prototype.doVirementAndRefresh = function(){
    $log.log("doVirementAndRefresh() : " + this.transfert.montant );
	//simulation (sans ws REST)
	for(i=0; i< this.comptes.length; i++){
		if(this.comptes[i].numero == this.transfert.numCptDeb){
			this.comptes[i].solde -= Number(this.transfert.montant);
		}
		if(this.comptes[i].numero == this.transfert.numCptCred){
			this.comptes[i].solde += Number(this.transfert.montant);
		}
	}
	
	this.message = "le montant de " + this.transfert.montant +
                   	" a bien ete transfere du compte " + this.transfert.numCptDeb +
					  " vers le compte " + this.transfert.numCptCred; 	
    					  
    this.renderPath="listeComptes";					  
};

IdentifieController.prototype.displayLastOperations= function(numCpt){
    var identifieForThis = this;
	this.message = "affichage des operations du compte selectionne : " + numCpt; 	
    this.numSelectedCpt = numCpt;	

    $http.get('data/operations.json').success(function(data) {
	    identifieForThis.operations = data;
	    $log.log("nb operations" + identifieForThis.operations.length)
	});	
    this.renderPath="dernieresOperations";
}

}
