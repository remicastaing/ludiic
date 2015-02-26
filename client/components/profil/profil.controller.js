'use strict';

angular.module('ludiicApp')
  .controller('ProfilCtrl', function ($scope, Auth) {
    $scope.message = 'Hello';
    Auth.getCurrentUser(function(profil){
      $scope.profil = JSON.parse(JSON.stringify(profil));
    });
    $scope.user = Auth.getCurrentUser();

    $scope.updateProfil = function(form) {
      $scope.submitted = true;

      if (form.$valid) {
        Auth.updateProfil({
          name: $scope.profil.name,
        })
        .then(function() {
          $scope.user = Auth.refreshCurrentUser();

        })
        .catch(function(err) {
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };
    
  });
