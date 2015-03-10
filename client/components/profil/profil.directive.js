'use strict';

angular.module('ludiicApp')
  .directive('profil', function () {
    return {
      templateUrl: 'components/profil/profil.html',
      restrict: 'EA',
      controller: 'ProfilCtrl',
      controllerAs: 'profilCtrl',
      bindToController: {
	      profil: '='
	    }
    };
  });