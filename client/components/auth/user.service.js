'use strict';

angular.module('ludiicApp')
  .factory('User', function ($resource) {
    return $resource('http://localhost:9000/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      },
      confirmEmail: {
        method: 'post',
        params: {
          controller : 'confirmEmail'
        }
      },
      resetpassword: {
        method: 'POST',
        params: {
          controller:'resetpassword'
        }
      },
      changeResetedPassword: {
        method: 'POST',
        params: {
          controller:'changeResetedPassword'
        }
      },
      updateProfil: {
        method: 'PUT',
        params: {
          controller:'profil'
        }
      },
	  });
  });
