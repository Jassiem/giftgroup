'use strict';

// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', ['ui.router', 'myApp.filters', 'myApp.services', 'myApp.directives']);

myApp.config(function($locationProvider, $httpProvider, $stateProvider, $urlRouterProvider) {
    
    delete $httpProvider.defaults.headers.common["X-Requested-With"];

    $urlRouterProvider.otherwise("/home");

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'partials/home',
            controller: 'HomeCtrl'
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'partials/signup',
            controller: 'SignupCtrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'partials/login',
            controller: 'LoginCtrl'
        });
    // .state('state1.list', {
    //     url: "/list",
    //     templateUrl: "partials/state1.list.html",
    //         controller: function($scope) {
    //     $scope.items = ["A", "List", "Of", "Items"];
    //     }
    // });
    // .state('state2', {
    //     url: "/state2",
    //     templateUrl: "partials/state2.html"
    // })
    // .state('state2.list', {
    //     url: "/list",
    //     templateUrl: "partials/state2.list.html",
    //         controller: function($scope) {
    //             $scope.things = ["A", "Set", "Of", "Things"];
    //         }
    //     })
    // });


    // $routeProvider.
    //   when('/', {
    //     templateUrl: 'partials/home',
    //     controller: HomeCtrl
    //   }).
    //   when('/signup', {
    //     templateUrl: 'partials/signup',
    //     controller: SignupCtrl
    //   }).
    //   when('/instant-domain-search', {
    //     templateUrl: 'partials/instant-domain-search',
    //     controller: DomainSearchCtrl
    //   }).
    //   when('/type-in-traffic-finder', {
    //     templateUrl: 'partials/type-in-traffic-finder',
    //     controller: TITFCtrl
    //   }).
    //   when('/dropped-domain-finder', {
    //     templateUrl: 'partials/dropped-domain-finder',
    //     controller: DroppedCtrl
    //   }).
    //   when('/twitter-tool', {
    //     templateUrl: 'partials/twitter-tool',
    //     controller: TwitterCtrl
    //   }).
    //   when('/adwords-advertising-assistant', {
    //     templateUrl: 'partials/adwords-advertising-assistant',
    //     controller: AdvertisingCtrl
    //   }).
    //   otherwise({
    //     redirectTo: '/'
    //   });

    $locationProvider.html5Mode(true);
  });
