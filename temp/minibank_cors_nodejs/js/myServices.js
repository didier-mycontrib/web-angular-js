var myRestServices = angular.module('myRestServices', ['ngResource']);
         
myRestServices.factory('Compte', ['$resource',
        function($resource){
	
		return $resource('http://localhost:8282/minibank/comptes/:idRes' /*default url*/, {  idRes:'@numero' } /*default params */, {		
			       doVirement : { url : 'http://localhost:8282/minibank/virement' /*redifined url */, method:'POST'},
			       dernieresOperations : { url : 'http://localhost:8282/minibank/operations' /*redifined url */, method:'GET', isArray:true},
	           });
	       }   
]);

myRestServices.factory('Transfert', ['$resource',
           function($resource){
                           	
          return $resource('http://localhost:8282/minibank/virement' /*default url*/, {  } /*default params */, {		
                   
               });
             }   
]);

myRestServices.factory('Client', ['$resource',
                                  function($resource){
                          	
                          		return $resource('http://localhost:8282/minibank/clients/:idRes' /*default url*/, {  idRes:'@numero' } /*default params */, {		
                          			verifyAuth : { url : 'http://localhost:8282/minibank/verifyAuth' /*redifined url */, method:'POST'}
                          	           });
                          	       }   
                          ]);





/*
NB0: la chose fabriquée via  productServices.factory('Product', ...) et return $resource(...)
     ici appelée 'Product' correspond à une sorte de mixte entre:
           * une classe de données 'Product' (dont la structure est récupérée via REST) et qui a
             (via $resource) des facultées de persistance à distance (via REST) : méthode $save() , $delete() , ...
           * une classe de 'Service' permettant de déclencher des recherches : Product.query(...) , Product.get() , ...

NB1: default actions are:
 {  'get':    {method:'GET'},
    'save':   {method:'POST'},
    'query':  {method:'GET', isArray:true},
    'remove': {method:'DELETE'},
    'delete': {method:'DELETE'} };
    
NB2: la partie variable en fin d'url ne peut pas comporter de "/" 
     d'où le besoin de rédéfinir quelquefois une url avec un "/" en plus 
     ou bien définir explicitement une fin d'url complexe du type .../products/:idRes/:action/:idAction
     
NB3: la méthode save() comporte toujours comme dernier paramètre l'objet à sauvegarder et retourne en retourne les valeurs mises à jour
     (ex: clef primaire auto-incrémentée)   ex d'url /..../json/products/ avec { id: 1  , name='xxx' , label ='yyy' , ...} dans le corps/body de la requête POST
     en première position de l'appel à serviceXxxx.save() on trouve éventuellement un tableau avec les valeurs des paramètres
     ex: MyProductService.save( {idRes:''},$scope.selectedProd );
     
NB4: par défaut (d'un point de vue angular-js) , la méthode save() en mode "POST" à une sémantique de "saveOrUpdate'   
     mais rien n'empêche de considérer save() comme un createNew et ajouter update() en mode "put" . 
     update (PUT) est généralement invoqué en passant l'id en fin d'URL
     
NB5: delete et remove ont la même sémantique , remove est moins problématique si delete est interprété comme un mot clef
     (id à passer en fin d'URL)

NB6: declenchement en objetRatacheAPersistanceDistante.$save() ou bien servicexxxx.save(objet) avec objet souvent préfixé par $scope.           
*/