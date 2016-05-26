var myAjsApp = angular.module('myAjsApp', ['ui.bootstrap']);
 
myAjsApp.controller('MyCtrl', function ($scope,$log,$modal) {


$scope.title = "titre qui va bien";

$scope.alerts = [
    { type: 'danger', msg: 'danger' },
	{ type: 'warning', msg: 'warning' },
    { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
  ];

  $scope.addAlert = function() {
    $scope.alerts.push({msg: 'Another alert!'});
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
	//la méthode javascript .splice(index , nb_to_remove)
	//supprime 1 ou plusieurs éléments à la position indiquée (en modifiant le tableau d'origine)
	//et retourne le ou les éléments supprimés
	
	//attention: .splice(index,0,'aaa','bbb') ajoute des éléments
  };
  
  
   $scope.items = ['item1', 'item2', 'item3'];
  
$scope.openDlg = function (size) {

    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

myAjsApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});