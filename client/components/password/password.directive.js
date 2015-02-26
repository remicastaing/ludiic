'use strict';

angular.module('ludiicApp')
  .directive('password', function () {
    return {
      templateUrl: 'components/password/password.html',
      restrict: 'EA',
      controller: 'PasswordCtrl',
      link: function (scope, element, attrs) {
      }
    };
  });