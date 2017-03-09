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
    var app = angular.module('ms.user', []);

    app.controller('ms.user.userController', ['$scope','$state','ms.user.userFactory',function($scope,$state,fac){
        var self = this;
        self.scrollCfg = {
            axis: 'y',
            scrollbarPosition:"outside"
        };
        $scope.userTheme = 'ms-blue-grey';
        $scope.$emit('changeHeaderTheme', 'ms-blue-grey');

        self.rowSelection = true;
        self.selected = [];
        self.query = {
            order:'device',
            limit:5,
            page:1
        };
        self.options = [
            {option:'Edit',icon:'../../stylesheets/icons/action/ic_edit.svg'},
            {option:'Reset password',icon:'../../stylesheets/icons/action/ic_password.svg'},
            {option:'Delete user',icon:'../../stylesheets/icons/action/ic_delete.svg'}
        ];
        self.action = function(idx,device){
            console.log(idx,device);
        };
        self.getDevices = function(){
            fac.getDevices({},function(data){
                self.devices = data;
            });
        };
        self.getDevices();
    }]);
    app.factory('ms.user.userFactory', ['$http',function($http){
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
