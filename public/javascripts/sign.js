'use strict';
var msApp = angular.module('msApp',['ngSanitize','ngMaterial','ngMessages']);

msApp.config(['$mdThemingProvider',function($mdThemingProvider) {
	$mdThemingProvider.theme('default')
    .primaryPalette('green',{
    	'default':'500'
    });
}]);

msApp.controller('appController', ['$scope','$http', function($scope,$http){
    var self = this;

    self.isCompleted = true;

    $scope.moneyStore = {};
    $scope.login = function(valid){
        if (valid) {
            $http({
                method: 'POST',
                url: '/signIn',
                data:serializeData($scope.moneyStore),
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function(res) {
            	var data = res.data;
                if (data.success) {
                    top.location = '/';
                }else{
                    console.log(data.msg);
                }
            }).catch(function(res){
            	console.log(res);
            });
        }
    };
}]);
function serializeData( data ) { 
    if ( ! angular.isObject( data ) ) { 
        return( ( data === null ) ? "" : data.toString() ); 
    }            
    var buffer = [];  
    for ( var name in data ) { 
        if ( ! data.hasOwnProperty( name ) ) { 
            continue; 
        }            
        var value = data[ name ];            
        buffer.push(
            encodeURIComponent( name ) + "=" + encodeURIComponent( ( value === null ) ? "" : value )
        ); 
    }   
    var source = buffer.join( "&" ).replace( /%20/g, "+" ); 
    return( source ); 
}