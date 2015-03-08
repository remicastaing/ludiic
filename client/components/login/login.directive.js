'use strict';

angular.module('ludiicApp')
  .directive('login', function () {
    return {
      templateUrl: 'components/login/login.html',
      restrict: 'EA',
      controller: 'LoginCtrl',
      controllerAs: 'login',
//    	controllerAs: 'ctrl',
      link: function (scope, element, attrs) {
      }
    };
  })
  .directive('socialLogin', function () {
    return {
      transclude: true,
      template: '<a class="btn btn-facebook btn-lg btn-block" href="" ng-click="socialCtrl.loginOauth()"><ng-transclude></ng-transclude></a>',
      restrict: 'EA',
      controllerAs: 'socialCtrl',
      controller: function ($attrs,$window) {
        this.loginOauth = function() {
		      $window.location.href = '/auth/' + $attrs.provider;
		    };
      },
    };
  });