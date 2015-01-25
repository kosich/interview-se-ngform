'use strict';

/**
 * @ngdoc overview
 * @name soformApp
 * @description
 * # soformApp
 *
 * Main module of the application.
 */
angular
.module('soformApp', [
    'ngRoute',
    'ngAnimate',
    'mgcrea.ngStrap',
    'seDirectives'
])
.config(function ($routeProvider) {

    // tab routes
    $routeProvider
    .when('/corrections', {
        templateUrl: 'views/tabs/cor-act.html',
        controller: 'corAct'
    })
    .when('/general', {
        templateUrl: 'views/tabs/gen-info.html',
        controller: 'genInfo'
    })
    .when('/submit', {
        templateUrl: 'views/tabs/submit.html',
        controller: 'submit'
    })
    .otherwise({
        redirectTo: '/general'
    });
})
.run(['$rootScope','$location', function($rootScope, $location) {
    // track the tab active
    $rootScope.$on('$routeChangeSuccess', function() {
        $rootScope.tabRoute = $location.path();
    });

    // just a func for debugging
    $rootScope.log = console.log.bind( console );

}]);
