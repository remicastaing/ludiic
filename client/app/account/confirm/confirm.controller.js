'use strict';

angular.module('ludiicApp')
  .controller('ConfirmCtrl', function ($scope, Auth, $state, $stateParams) {
    $scope.errors = {};
    $scope.isLoggedIn = Auth.isLoggedIn;


    if ($stateParams.token) {
      Auth.confirmMail( $stateParams.token
        )
        .then( function() {
          // Logged in, redirect to home
          $state.path('main');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
    }

    


  });
