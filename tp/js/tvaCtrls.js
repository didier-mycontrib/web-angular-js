var myTvaApp = angular.module('tvaApp', []);

myTvaApp.controller('MainCtrl', function ($scope,$log) {
	$scope.title = "Titre principal";
	$scope.brandName = "MaMarque";
});
 
myTvaApp.controller('TvaCtrl', function ($scope,$log) {

$scope.title = "calcul de TVA";
$scope.newBrandName = $scope.brandName;
$scope.ht = 200.0;
$scope.taux = 20.0;

$scope.listeTaux= [
{
nom : "normal",
valeur : 20.0	
},
{
nom : "reduit",
valeur : 10.0	
}
];

$scope.updateBrandName = function(){
	$scope.brandName = $scope.newBrandName ;
};

$scope.updateBrandNameInParentScope = function(){
	$scope.$parent.brandName =$scope.newBrandName ;
	//$log.log("parent title:" + $scope.$parent.title);
};

$scope.calcul_ttc= function(){
	var ttc = $scope.ht* (1 + $scope.taux/100);
	$log.log("computed ttc:" + ttc);
	return ttc.toFixed(2); //arrondi à 2 chiffres après virgule.
};



});