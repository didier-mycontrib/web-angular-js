var myMinibankControllers = angular.module('minibankControllers', ['myRestServices']);
 
//******************** IndentificationCtrl ***************

myMinibankControllers.controller('IndentificationCtrl', [ '$scope' , '$log','Client',function ($scope,$log,Client) {

$scope.resVerify=false; //by default	
	
$scope.verifPassword = function(){
	
	$scope.resVerify=false; //by default
	/*
	//version simulé (sans ws rest):
	if($scope.password == ("pwd" + $scope.numClient) )
		$scope.resVerify= true;
	*/

	
	$scope.clientAuth =  {
			"numClient": $scope.numClient,
			"password": $scope.password,
			"ok" : null};
	
	Client.verifyAuth($scope.clientAuth).
    $promise.then(
	    //success
	    function( value ){
	    	 $scope.clientAuth = value;
	    	 if($scope.clientAuth.ok){
	    		 $scope.resVerify=true;	 
	    		 $log.info("verifyAuth ok");
	    	 }
	    });
	
	return $scope.resVerify;
}

$scope.title = "identification client (minibank)";

}]);

//******************** ClientIdentifieCtrl ***************

myMinibankControllers.controller('ClientIdentifieCtrl', ['$scope', '$http','$routeParams','$log','Compte','Client','Transfert',
 function($scope,$http, $routeParams , $log , Compte , Client , Transfert) {
 	$scope.clientId = $routeParams.clientId;
	
   $scope.renderPath="listeComptes";	
/*	
// simulation temporaire (sans ws rest):   
 $http.get('data/client.json').success(function(data) {
	$scope.client = data;
	$log.log("nom client identifie:" + $scope.client.nom)
	});
	*/
   
Client.get({ idRes : $scope.clientId}).$promise.then(
		    //success
		    function( value ){
		    	$scope.client = value;
		    });
   
   
/*	
 // simulation temporaire (sans ws rest):
$http.get('data/comptes.json').success(function(data) {
	$scope.comptes = data;
	$log.log("nb comptes" + $scope.comptes.length)
	});

$scope.message="";*/
 Compte.query({ numClient : $scope.clientId}).$promise.then(
		    //success
		    function( value ){
		    	$scope.comptes = value;
		    });
		$scope.message = "--/--";
 
 
	
$scope.transfert =  {
				"montant": 0.0,
				"numCptDeb": 1,
				"numCptCred" : 2,
				"ok" : null}; //by default


$scope.doVirementAndRefresh = function(){
	//simulation (sans ws REST)
	/*
	for(i=0; i< $scope.comptes.length; i++){
		if($scope.comptes[i].numero == $scope.transfert.numCptDeb){
			$scope.comptes[i].solde -= Number($scope.transfert.montant);
		}
		if($scope.comptes[i].numero == $scope.transfert.numCptCred){
			$scope.comptes[i].solde += Number($scope.transfert.montant);
		}
	}*/
	Transfert.save($scope.transfert).
    $promise.then(
	    //success
	    function( value ){
	    	 $scope.transfert = value;
	    	 if($scope.transfert.ok){
	
	         $scope.message = "le montant de " + $scope.transfert.montant +
                   	" a bien ete transfere du compte " + $scope.transfert.numCptDeb +
					  " vers le compte " + $scope.transfert.numCptCred; 
	       //+ RAZ du montant pour eviter deux transferts consecutifs (par erreurs)
    		 $scope.transfert.montant=0; $scope.transfert.ok=null;
    		 //+ rafraichir valeurs des comptes pour verifier et visualiser le virement effectue:
    		 Compte.query({ numClient : $scope.clientId}).$promise.then(
	    			    //success
	    			    function( value ){
	    			    	$scope.comptes = value;
	    			    });
	    	 }
	    },
	    //error
	    function( error ){
	        $log.error(error);
	     });
    $scope.renderPath="listeComptes";					  
};

$scope.displayLastOperations= function(numCpt){
	$scope.message = "affichage des operations du compte selectionne : " + numCpt; 	
    $scope.numSelectedCpt = numCpt;	
  //simulation (sans ws REST):
    /*
    $http.get('data/operations.json').success(function(data) {
	$scope.operations = data;
	$log.log("nb operations" + $scope.operations.length);
	});	*/
    Compte.dernieresOperations({ numCpt : $scope.numSelectedCpt}).$promise.then(
		    //success
		    function( value ){
		    	$scope.operations = value;
		    	$log.log("nb operations" + $scope.operations.length);
		    });
    $scope.renderPath="dernieresOperations";
}

}]);
