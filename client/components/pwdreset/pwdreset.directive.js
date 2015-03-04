'use strict';

angular.module('ludiicApp')
  .directive('pwdreset', function () {
    return {
      templateUrl: 'components/pwdreset/pwdreset.html',
      restrict: 'EA',
      scope: {},
      bindToController: {
        errors: '=',
        isLoggedIn: '=',
        pwdResetMailSend: '=',
        invalidResetCode: '=',
        unknownMailAddress: '=',
        submitted: '=',
        resetStateIs: '&',
      },
      controller: 'PwdResetCtrl',
      controllerAs: 'ctrl',
    };
  })
  .directive('pwdresetlink', function () {
    return {
      transclude: true,
      template: '<a ui-sref="pwdreset"><ng-transclude></ng-transclude></a>',
    };
  });