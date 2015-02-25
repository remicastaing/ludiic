'use strict';

angular.module('ludiicApp')
  .directive('logo', function () {
    return {
      templateUrl: 'components/logo/logo.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });