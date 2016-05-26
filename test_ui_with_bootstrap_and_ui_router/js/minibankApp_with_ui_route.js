var myApp = angular.module('minibankApp', [ 'ui.router','minibankControllers']);

// app module 'myApp' depends on  [ 'ui.router','minibankControllers']  other modules

myApp.config( ['$stateProvider', '$urlRouterProvider' ,
   function config($stateProvider , $urlRouterProvider) {
   
  $stateProvider
         .state('welcomeState', {
            url: '/welcome',
			data: { viewTitle: 'welcome' } , 
			views: {
                'bodyView': {
					templateUrl: 'partials/welcome_minibank.html' /*,
					controller: 'WelcomeCtrl',*/ 
					} ,
				'footerView' : {
					templateUrl: 'partials/footer1.html' ,
					controller: 'footerCtrl' 
				}
				
			}
        })
		.state('identificationState', {
            url: '/identification',
			data: { viewTitle: 'identificationClient' } ,
			views: {
                'bodyView': {
					templateUrl: 'partials/identificationClient.html' /*,
					controller: 'IdentificationCtrl' */ 
					},
				'footerView' : {
					templateUrl: 'partials/footer1.html' ,
					controller: 'footerCtrl' 
				}
			}
        })
		.state('clientIdentifieState', {
            url: '/clientIdentifie:clientId'
			/* NB: URL attendue de type clientIdentifie?clientId=1 et recuperation via $stateParams.clientId dans Ctrl*/ ,
			data: { viewTitle: 'espace client identifie'  } ,
			views: {
                'bodyView': {
					templateUrl: 'partials/clientIdentifie.html' /*,
					controller: 'ClientIdentifieCtrl' */
					},
				'footerView' : {
					templateUrl: 'partials/footer2.html' ,
					controller: 'footerCtrl' 
				}
			}
        });
		
		$urlRouterProvider.otherwise("/welcome");
		
		
	
   }]);
   
  
 