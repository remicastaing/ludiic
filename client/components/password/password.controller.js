'use strict';

angular.module('ludiicApp')
  .controller('PasswordCtrl', function(User, Auth) {
    var _this = this;
    _this.errors = {};

    _this.changePassword = function(form) {
      _this.submitted = true;
      if (form.$valid) {
        Auth.changePassword(_this.user.oldPassword, _this.user.newPassword)
          .then(function() {
            _this.message = 'Votre mot de passe a été changé avec sucès.';
          })
          .catch(function() {
            form.password.$setValidity('mongoose', false);
            _this.errors.other = 'Mot de passe incorrect.';
            _this.message = '';
          });
      }
    };
  });
