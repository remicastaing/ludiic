'use strict';

angular.module('ludiicApp')
  .directive('signup', function () {
    return {
      templateUrl: 'components/signup/signup.html',
      restrict: 'EA',
      controller : 'SignupCtrl',
    };
  });