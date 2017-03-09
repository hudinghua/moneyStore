/*
* @author hudinghua
* @date   2017/03/02
*/
(function(angular, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['angular'], function(angular) {
            return factory(angular);
        });
    } else {
        return factory(angular);
    }
}(window.angular || null, function(angular) {
    'use strict';
    var app = angular.module('ms.appstore', []);

    app.controller('ms.appstore.appstoreController', ['$scope','$state',function($scope,$state){
        var self = this;
        $scope.appstoreTheme = 'ms-green';
        $scope.$emit('changeHeaderTheme', 'ms-green');
        console.log('appstore');
    }]);

	return app;
}));
