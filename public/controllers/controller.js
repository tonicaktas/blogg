
'use strict'

var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl',['$scope','$http', function($scope, $http){
	


var refresha = function() {	
$http.get('/contactlist/').success(function(response){
	
	$scope.contactlist = response;
	$scope.contact = "";
	}); // route som kommer skapas för att ta data ifrån och vad den ska göra med den
};

refresha();

$scope.addBlogg = function(){ // posta ny data på sidan
	$http.post('/contactlist',$scope.contact).success(function(response){
		refresha();
		});
	};

	
	
	
	
$scope.remove = function(id){
	
	$http.delete("/contactlist/" + id).success(function(response){
		refresha();
		
		});
	};
	
$scope.edit = function(id){
	$http.get('/contactlist/' + id).success(function(response){
		$scope.contact = response;	
	});
	};
		
		

$scope.update = function() {
	$http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response){
		});
		refresha();
	};
		
		

$scope.deselect = function() {
	$scope.contact = "";
	};
	
	

    $scope.visa = false;
    $scope.openn = function() {
        $scope.visa = !$scope.visa;
    
	};
	
	
		
	
	
		
}]);