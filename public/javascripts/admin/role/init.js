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
    var app = angular.module('ms.role', []);

    app.controller('ms.role.roleController', ['$scope','$state',function($scope,$state){
        var self = this;
        $scope.roleTheme = 'ms-blue-grey';
        $scope.$emit('changeHeaderTheme', 'ms-blue-grey');
        console.log('222');
    }]);

	return app;
}));
