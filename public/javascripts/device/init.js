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
    var app = angular.module('ms.device', ['md.data.table']);

    app.controller('ms.device.deviceController', ['$scope','$state','ms.device.deviceFactory',function($scope,$state,fac){
        var self = this;
        $scope.deviceTheme = 'ms-green';
        $scope.$emit('changeHeaderTheme', 'ms-green');
        console.log('device');

        self.navScrollCfg = {
            axis: 'y',
            scrollbarPosition:"outside"
        };

        self.selected = [];
        self.query = {
            order:'device',
            limit:5,
            page:1
        };
        /*self.deselect = function (device) {
            console.log(device.device, 'was deselected');
        };
        self.onPaginate = function(page, limit) {
            console.log('Scope Page: ' + $scope.query.page + ' Scope Limit: ' + $scope.query.limit);
            console.log('Page: ' + page + ' Limit: ' + limit);
            self.progress = $timeout(function () {

            }, 2000);
        };*/
        self.getDevices = function(){
            fac.getDevices({},function(data){
                self.devices = data;
            });
        };
        self.getDevices();

    }]);
    app.factory('ms.device.deviceFactory', ['$http',function($http){
        return {
            getDevices:function(params,callback){
                var data = {
                    total:7,
                    data:[{id:'0',device:'BBPOS',model:'BBPOS_WSC10',location:'Hong Kong',owner:'BBPOS',version:'Android 4.5.0',battery:'88%',swipe:'112'},
                                {id:'1',device:'BBPOS1',model:'BBPOS_WSC10',location:'Hong Kong',owner:'BBPOS',version:'Android 4.5.0',battery:'88%',swipe:'112'},
                                {id:'2',device:'BBPOS2',model:'BBPOS_WSC10',location:'Hong Kong',owner:'BBPOS',version:'Android 4.5.0',battery:'88%',swipe:'112'},
                                {id:'3',device:'BBPOS3',model:'BBPOS_WSC10',location:'Hong Kong',owner:'BBPOS',version:'Android 4.5.0',battery:'88%',swipe:'112'},
                                {id:'4',device:'BBPOS4',model:'BBPOS_WSC10',location:'Hong Kong',owner:'BBPOS',version:'Android 4.5.0',battery:'88%',swipe:'112'},
                                {id:'5',device:'BBPOS5',model:'BBPOS_WSC10',location:'Hong Kong',owner:'BBPOS',version:'Android 4.5.0',battery:'88%',swipe:'112'},
                                {id:'6',device:'BBPOS6',model:'BBPOS_WSC10',location:'Hong Kong',owner:'BBPOS',version:'Android 4.5.0',battery:'88%',swipe:'112'},
                                {id:'7',device:'BBPOS7',model:'BBPOS_WSC10',location:'Hong Kong',owner:'BBPOS',version:'Android 4.5.0',battery:'88%',swipe:'112'}]};
                return callback && callback(data);
            }
        };
    }]);
	return app;
}));

