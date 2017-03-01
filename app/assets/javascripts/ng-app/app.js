(function(ng) {
  "use strict";

  ng.module('GameApp', ['ui.router', 'templates']);

  ng.module('GameApp').config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('GameParent', {
      url: '/',
      abstract: true,
      // template: '<ui-view></ui-view>'
    }).state('GameParent.login', {
      url: '',
      templateUrl: 'login.html',
      controller: 'LoginController as loginCtrl'
    }).state('GameParent.signup', {
      url: 'signup',
      templateUrl: 'signup.html',
      controller: 'SignupController as signupCtrl'
    }).state('GameParent.pickCategory', {
      url: 'pick-category',
      templateUrl: 'pick-category.html',
      controller: 'PickCategoryController as pickCatCtrl'
    });
  });
})(angular);
