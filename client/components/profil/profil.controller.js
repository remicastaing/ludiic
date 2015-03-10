'use strict';

angular.module('ludiicApp')
  .controller('ProfilCtrl', function (Auth) {
    var vm = this;
    vm.profil = {};
    Auth.getCurrentUser(function(profil){
      vm.profil = JSON.parse(JSON.stringify(profil));
    });

    vm.profil.ville = null;
    vm.autocompleteOptions = {
                        componentRestrictions: { country: 'fr' },
                        types: ['(cities)']
                    }

    vm.user = Auth.getCurrentUser();

    vm.updateProfil = function(form) {
      vm.submitted = true;

      if (form.$valid) {
        Auth.updateProfil({
          name: vm.profil.name,
        })
        .then(function() {
          vm.user = Auth.refreshCurrentUser();

        })
        .catch(function(err) {
          vm.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            vm.errors[field] = error.message;
          });
        });
      }
    };
    
  });
