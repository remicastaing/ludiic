'use strict';

angular.module('ludiicApp')
  .controller('NavbarCtrl', function ($scope, Auth) {
    // $scope.menu = [{
    //   'title': 'Accueil',
    //   'state': 'main'
    // }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
  });
