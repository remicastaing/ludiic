'use strict';

angular.module('ludiicApp')
  .controller('NavbarCtrl', function (Auth) {
    this.isCollapsed = true;
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  });
