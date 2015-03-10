'use strict';

angular.module('ludiicApp', [
  'ngResource',
  'ngSanitize',
  'ngMessages',
  'ui.router',
  'angular-storage',
  'google.places',

])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);

    $httpProvider.defaults.withCredentials = true;

    $httpProvider.interceptors.push('authInterceptor');

  })

  .factory('authInterceptor', function($rootScope, $q, ludiicStore, $injector) {
    var state;
    return {
      // Add authorization token to headers
      request: function(config) {
        config.headers = config.headers || {};
        if (ludiicStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + ludiicStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if (response.status === 401) {
          (state || (state = $injector.get('$state'))).go('login');
          // remove any stale tokens
          ludiicStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function($rootScope, $state, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $state.go('login');
        }
      });
    });
  });
