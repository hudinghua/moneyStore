
var msApp = angular.module('msApp',['ui.router','oc.lazyLoad','pascalprecht.translate','ngSanitize','ngMaterial','ngMessages','ngScrollbars']);

msApp.constant('THIRD_CONFIG', {
    //map:['dist/device/map.js'],
    grid:[
        'vendor/angular-material-data-table/dist/md-data-table.min.css',
        'vendor/angular-material-data-table/dist/md-data-table.min.js'
    ],
    scroll:[]
}).constant('MODULE_CONFIG', [
    {
        name:'ms.map',
        module:true,
        files:[
            'dist/device/map.js'
        ]
    },
	{
        name:'ms.device',
        module:true,
        files:[
            'dist/device/init.js'
        ]
    },
    {
        name:'ms.appstore',
        module:true,
        files:[
            'dist/appstore/init.js'
        ]
    },
    {
        name:'ms.user',
        module:true,
        files:[
            'dist/admin/user/init.js'
        ]
    },
    {
        name:'ms.role',
        module:true,
        files:[
            'dist/admin/role/init.js'
        ]
    },
    {
        name:'ms.settings',
        module:true,
        files:[
            'dist/settings/init.js'
        ]
    },
    {
        name:'ms.publisher',
        module:true,
        files:[
            'dist/publisher/init.js'
        ]
    }
]).config(['ScrollBarsProvider',function (ScrollBarsProvider) {
    ScrollBarsProvider.defaults = {
        scrollButtons: {
            scrollAmount: 'auto',
            enable: true
        },
        scrollInertia: 400,
        axis: 'yx',
        theme:'minimal-dark',
        autoHideScrollbar: false
    };
}]).config(['$ocLazyLoadProvider', 'MODULE_CONFIG', function($ocLazyLoadProvider, MODULE_CONFIG) {
        $ocLazyLoadProvider.config({
            debug:  false,
            events: true,
            modules: MODULE_CONFIG
        });
 }]).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'THIRD_CONFIG', 'MODULE_CONFIG',
        function ($stateProvider,   $urlRouterProvider, $locationProvider, THIRD_CONFIG, MODULE_CONFIG) {
            
            $locationProvider.hashPrefix('');
            $urlRouterProvider.otherwise("/device");
            $stateProvider.state('device',{
                url:'/device',
                templateUrl:'tpls/device/init.html',
                controller:'ms.device.deviceController',
                controllerAs:'mddCtrl',
                resolve: loadSequence(['ms.map','grid','ms.device'])
            }).state('appstore',{
                url:'/appstore',
                templateUrl:'tpls/appstore/init.html',
                controller:'ms.appstore.appstoreController',
                resolve: loadSequence(['ms.appstore'])
            }).state('publisher',{
                url:'/publisher',
                templateUrl:'tpls/publisher/init.html',
                controller:'ms.publisher.publisherController',
                resolve: loadSequence(['ms.publisher'])
            }).state('user',{
                url:'/user',
                templateUrl:'tpls/admin/user/init.html',
                controller:'ms.user.userController',
                controllerAs:'muuCtrl',
                resolve: loadSequence(['grid','ms.user'])
            }).state('role',{
                url:'/role',
                templateUrl:'tpls/admin/role/init.html',
                controller:'ms.role.roleController',
                resolve: loadSequence(['ms.role'])
            }).state('settings',{
                url:'/settings',
                templateUrl:'tpls/settings/init.html',
                controller:'ms.settings.settingsController',
                resolve: loadSequence(['ms.settings'])
            });

            function loadSequence(srcs, callback) {
                return {
                    deps: ['$ocLazyLoad', '$q',
                        function( $ocLazyLoad, $q ){
                            var deferred = $q.defer();
                            var promise  = false;
                            srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                            if(!promise){
                                promise = deferred.promise;
                            }
                            angular.forEach(srcs, function(src) {
                                promise = promise.then( function(){
                                    var name = '';
                                    if(THIRD_CONFIG[src]){
                                        return $ocLazyLoad.load(THIRD_CONFIG[src]);
                                    }
                                    angular.forEach(MODULE_CONFIG, function(module) {
                                        if( module.name == src){
                                            name = module.name;
                                        }else{
                                            name = src;
                                        }
                                    });
                                    return $ocLazyLoad.load(name);
                                } );
                            });
                            deferred.resolve();
                            return callback ? promise.then(function(){ return callback(); }) : promise;
                        }]
                };
            }
        }
]).config(['$mdThemingProvider',function($mdThemingProvider) {
    $mdThemingProvider.theme('ms-green')
    .primaryPalette('green');

    $mdThemingProvider.theme('ms-teal')
    .primaryPalette('teal')
    .accentPalette('green');

    $mdThemingProvider.theme('ms-brown')
    .primaryPalette('brown')
    .accentPalette('green');

    $mdThemingProvider.theme('ms-blue-grey')
    .primaryPalette('blue-grey')
    .accentPalette('green');
    //$mdThemingProvider.alwaysWatchTheme(true);
}]);
msApp.controller('appController', ['$scope','$state','$http','$location','$mdSidenav', function($scope,$state,$http,$location,$mdSidenav){

    var self = this;

    self.homeTheme = 'ms-green';
    self.isCompleted = true;
    $scope.$on('changeHeaderTheme',function(event,theme){
        self.homeTheme = theme;
    });
    self.toggleLeft = buildToggler('navleft');
    //左侧导航栏配置信息
    self.nav = {
        merchant:[{
            icon:'../../stylesheets/icons/deviceControl/ic_device_lock.svg',
            module:'Device Control',
            uisref:'device'
        },{
            icon:'../../stylesheets/icons/navbar/ic_store.svg',
            module:'App Store',
            uisref:'appstore'
        }],
        developer:[{
            icon:'../../stylesheets/icons/navbar/ic_apps.svg',
            module:'App Publisher',
            uisref:'publisher'
        }],
        admin:[{
            icon:'../../stylesheets/icons/navbar/ic_user.svg',
            module:'User Management',
            uisref:'user'
        },{
            icon:'../../stylesheets/icons/navbar/ic_role.svg',
            module:'Role Management',
            uisref:'role'
        }],
        setting:[{
            icon:'../../stylesheets/icons/navbar/ic_settings.svg',
            module:'Settings',
            uisref:'settings'
        }],
        logout:{
            icon:'../../stylesheets/icons/navbar/ic_logout.svg',
            module:'Logout',
            uisref:''
        }
    };
    var menubar = {
        device:'Device Control',
        appstore:'App Store',
        publisher:'App Publisher',
        user:'User Management',
        role:'Role Management',
        settings:'Settings'
    };
    self.activeModule = function(item){
        $scope.activeItem = item.uisref;
        self.currentModule = item.module;
        if (angular.element("md-sidenav[md-component-id='navleft']").length > 0) {
            self.toggleLeft();
        }
    };
    //根据路由path标亮左侧导航栏中的活动模块
    var hashs = $location.path().split('/');
    if (hashs.length > 1) {
        self.activeModule({ module:menubar[hashs[1]],uisref:hashs[1] });
    }else{
        self.activeModule({ module:'Device Control',uisref:'device' });
    }
    self.isActive = function(activeModule){
        return activeModule === $scope.activeItem;
    };
    //左侧导航栏滚动条配置
    self.navScrollCfg = {
        axis: 'y',
        scrollbarPosition:"outside"
    };
    
    self.logout = function(){
        $http({
            method: 'POST',
            url: '/logout'
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
    };

    function buildToggler(componentId) {
        return function() {
            $mdSidenav(componentId).toggle();
        };
    }

    $http({
        method: 'GET',
        url: '/getDevices'
    }).then(function(res) {
        console.log(res);
    }).catch(function(res){
    	console.log(res);
    });
}]);