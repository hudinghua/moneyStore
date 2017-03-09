
/*var Things = ['a','b','c','d'];
for (var i = Things.length - 1; i >= 0; i--) {
	console.log(Things[i]);
}*/
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
    var app = angular.module('ms.map', []);

    app.controller('ms.device.mapController', ['$scope','$state',function($scope,$state){
        var self = this;
        console.log('map');
        var map = new AMap.Map('device_maps_id',{
            resizeEnable: true,
            zoom: 10,
            center: [116.480983, 40.0958]
        });
    }]);

	return app;
}));
