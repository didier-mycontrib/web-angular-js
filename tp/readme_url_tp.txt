Pour le Tp " appels de WS REST" , les URLs des services WEB à appeler commencent par "http://localhost:8080/minibank2015-web"
(application "minibank2015-web.war" en fonctionnement sur Tomcat).
La suite (milieu) des URLs est toujours "/pages/services/rest/json/" .
Ces URLs se terminent par :

/gestioncomptes/comptes/:idRes
/gestioncomptes/virement
/gestioncomptes/dernieresOperations
/gestionclients/clients/:idRes
/gestionclients/verifyAuth

Le code source (java) de ces we-services se situe dans le référentiel 
"https://github.com/didier-mycontrib/jee-spring-app-demo"
dans la branche
"/tree/master/"
dans le module applicatif 
"minibank2015/minibank2015-web" 
dans la partie java
"/src/main/java"
dans le package
"/tp/myapp/minibank/rest/service"
et dans les classes java ClientRestJsonServiceAdaptor
et CompteRestJsonServiceAdaptor

Certaines structures de données échangées se trouvent
dans le package "tp/myapp/minibank/rest/service/data"
D'autres se situent dans le package "/tp/myapp/minibank/itf/domain/dto" (de /src/main/java)
du module applicatif "minibank2015/minibank2015-services"

====
Solutions de quelques TPs dans 
https://github.com/didier-mycontrib/web-angular-js
----------------------

