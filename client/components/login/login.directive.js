'use strict';

angular.module('ludiicApp')
  .directive('login', function () {
    return {
      templateUrl: 'components/login/login.html',
      restrict: 'EA',
      controller: 'LoginCtrl',
//    	controllerAs: 'ctrl',
      link: function (scope, element, attrs) {
      }
    };
  });