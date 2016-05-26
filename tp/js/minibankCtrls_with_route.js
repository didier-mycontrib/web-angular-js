var myMinibankControllers = angular.module('minibankControllers', []);
 
//******************** IndentificationCtrl ***************

myMinibankControllers.controller('IndentificationCtrl', function ($scope) {

$scope.verifPassword = function(){
	if($scope.password == ("pwd" + $scope.numClient) )
		return true;
	else return false;
}

$scope.title = "identification client (minibank)";

});

//******************** ClientIdentifieCtrl ***************

myMinibankControllers.controller('ClientIdentifieCtrl', ['$scope', '$http','$routeParams','$log',
 function($scope,$http, $routeParams , $log) {
 	$scope.clientId = $routeParams.clientId;
	
   $scope.renderPath="listeComptes";	
	
 $http.get('data/client.json').success(function(data) {
	$scope.client = data;
	//$log.log("nom client identifie:" + $scope.client.nom)
	});
	
$http.get('data/comptes.json').success(function(data) {
	$scope.comptes = data;
	$log.log("nb comptes" + $scope.comptes.length)
	});
$scope.message="";	
	
$scope.transfert = {
	montant : 50,
	numCptDeb : 1,
	numCptCred: 2
};	

$scope.doVirementAndRefresh = function(){
	//simulation (sans ws REST)
	for(i=0; i< $scope.comptes.length; i++){
		if($scope.comptes[i].numero == $scope.transfert.numCptDeb){
			$scope.comptes[i].solde -= Number($scope.transfert.montant);
		}
		if($scope.comptes[i].numero == $scope.transfert.numCptCred){
			$scope.comptes[i].solde += Number($scope.transfert.montant);
		}
	}
	
	$scope.message = "le montant de " + $scope.transfert.montant +
                   	" a bien ete transfere du compte " + $scope.transfert.numCptDeb +
					  " vers le compte " + $scope.transfert.numCptCred; 	
    					  
    $scope.renderPath="listeComptes";					  
};

$scope.displayLastOperations= function(numCpt){
	$scope.message = "affichage des operations du compte selectionne : " + numCpt; 	
    $scope.numSelectedCpt = numCpt;	

    $http.get('data/operations.json').success(function(data) {
	$scope.operations = data;
	$log.log("nb operations" + $scope.operations.length)
	});	
    $scope.renderPath="dernieresOperations";
}

}]);
