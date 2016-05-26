var app = angular.module('minibankApp', [ 'ngNewRouter', 'minibankApp.welcome' , 'minibankApp.identification' , 'minibankApp.identifie']);

// app module 'minibankApp' depends on  [ 'ngNewRouter','minibankControllers']  other modules


app.controller('AppController', ['$router', AppController]);

function AppController ($router) {
	$router.config([
     { path: '/', redirectTo: '/welcomeMiniBank' },
     { path: '/welcomeMiniBank', component: 'welcome' } ,
	 { path: '/identificationClient', component: 'identification' },
     { path: '/clientIdentifie/:clientId', component: 'identifie' }
   ]);
	
}

   
  
 