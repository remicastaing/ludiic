'use strict';

angular.module('ludiicApp')
  .controller('ConfirmCtrl', function (Auth, $state, $stateParams) {
    var vm = this;
    vm.errors = {};
    vm.isLoggedIn = Auth.isLoggedIn;


    if ($stateParams.token) {
      Auth.confirmMail( $stateParams.token
        )
        .then( function() {
          // Logged in, redirect to home
          $state.path('main');
        })
        .catch( function(err) {
          vm.errors.other = err.message;
        });
    }

    


  });
