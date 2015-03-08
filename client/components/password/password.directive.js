'use strict';

angular.module('ludiicApp')
  .directive('password', function () {
    return {
      templateUrl: 'components/password/password.html',
      restrict: 'EA',
      controller: 'PasswordCtrl',
      controllerAs: 'pwdctrl',
      link: function (scope, element, attrs) {
      }
    };
  });