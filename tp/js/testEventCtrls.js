var myApp = angular.module('myApp', []);

myApp.controller('MainCtrl', function ($scope,$log) {
	$scope.title = "Evenements (exemples)";
	$scope.with_details=false;
	$scope.my_background_color="white";
	
	$scope.pays={};
	$scope.pays.liste=[{nom:"France",capitale : "Paris"},{nom:"Allemagne",capitale : "Berlin"} ,
				{nom:"Espagne",capitale : "Madrid"},{nom:"Italie",capitale : "Rome"}];
	$scope.pays.doClick = function(item, event) {
                    alert("clicked on  " + item.nom + " @ " + event.clientX + ": " + event.clientY);
                }
	
	$scope.a=6;
	$scope.b=2;
	$scope.res=0;
	
	
	$scope.my_status_msg="";
	$scope.my_text="";
	$scope.my_text_inverse="";
	
	$scope.addition = function(){
		$scope.res= Number($scope.a) + Number($scope.b);
	};
	
	$scope.division = function(){
		$scope.res= Number($scope.a) / Number($scope.b);
	};
	
	$scope.inverser_texte= function(){
		var ch="";
		taille = $scope.my_text.length;
		for(i=taille-1 ; i>=0 ; i--)
			ch+=$scope.my_text.charAt(i);
		$scope.my_text_inverse=ch;
	};
	
	function x_y_canvas(e,canvasElement){
		var x;
		var y;
		if (e.pageX || e.pageY) { 
			x = e.pageX;
			y = e.pageY;
			}
		else { 
		x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
		y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
		} 
		x -= canvasElement.offsetLeft;
		y -= canvasElement.offsetTop;
		
		$scope.xC = x;
		$scope.yC = y;
	}
	
	$scope.clear_canvas = function(){
		var canvasElement = document.getElementById("myCanvas");
		var ctx = canvasElement.getContext("2d");
        ctx.clearRect ( 0 , 0 , canvasElement.width, canvasElement.height );
		$scope.x=null; $scope.y=null;//reset last coord for next line
	}
	
	$scope.log_coords=function(event){
		var canvasElement = document.getElementById("myCanvas");
		x_y_canvas(event,canvasElement);//compute yC,yC and store in $scope
		var msg="click at x=" + $scope.xC + " y=" + $scope.yC;
		$log.log(msg);
		$scope.my_status_msg=msg;
	   // window.status=msg; not working with recent navigator
	    
		var ctx = canvasElement.getContext("2d");
		if($scope.x == null &&  $scope.y == null){
			$scope.x=$scope.xC; $scope.y=$scope.yC;
		}
		ctx.beginPath();
		ctx.moveTo($scope.x,$scope.y);//from last x,y
		ctx.lineTo($scope.xC,$scope.yC);//to new xC,yC
		ctx.closePath();
		
		$scope.x=$scope.xC; $scope.y=$scope.yC;//store last coord for next line
		ctx.stroke();
	};
	
});
 
