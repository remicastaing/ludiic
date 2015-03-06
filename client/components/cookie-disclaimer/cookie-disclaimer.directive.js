'use strict';

angular.module('ludiicApp')
  .directive('cookieDisclaimer', function () {
    return {
      templateUrl: 'components/cookie-disclaimer/cookie-disclaimer.html',
      restrict: 'EA',
      controller: 'CookieDisclaimerCtrl',
      controllerAs: 'cookieDisclaimer',
      bindToController: {
        visible: '=',
        close: '&',
      },
    };
  })
  .config(function($stateProvider) {
    $stateProvider
      .state('donnees_personnelles', {
        url: '/donnees_personnelles',
        templateUrl: 'components/cookie-disclaimer/donnees_personnelles.html',
      });
  });;