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
    var app = angular.module('ms.publisher', []);

    app.controller('ms.publisher.publisherController', ['$scope','$state',function($scope,$state){
        var self = this;
        $scope.publisherTheme = 'ms-teal';
        $scope.$emit('changeHeaderTheme', 'ms-teal');
        console.log('publisher');
    }]);

	return app;
}));

