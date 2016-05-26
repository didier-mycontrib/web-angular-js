var myApp = angular.module('minibankApp', [ 'ngRoute','minibankControllers']);

// app module 'myApp' depends on  [ 'ngRoute','minibankControllers']  other modules

myApp.config(['$routeProvider',
  function($routeProvider) {
      $routeProvider.
	when('/welcome', {
		templateUrl: 'partials/welcome_minibank.html'/*,
		controller: 'WelcomeCtrl'*/
	}).
	when('/identification', {
		templateUrl: 'partials/identificationClient.html',
		controller: 'IndentificationCtrl'
	}).
	when('/clientIdentifie/:clientId', {
		templateUrl: 'partials/clientIdentifie.html',
		controller: 'ClientIdentifieCtrl'
	}).
	otherwise({
		redirectTo: '/welcome'
	});
   }]);

// when local relative url 'welcome' , '/identitication' ,  '/clientIdentifie/:prodId' (in web browser) will be
// interpreted by Angular-js and ngRoute module (with $route and $routeParams services) ,
// partial template will be loaded in <div ng-view> and specific controller will be associated

 