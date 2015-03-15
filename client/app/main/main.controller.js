'use strict';

angular.module('ludiicApp')
  .controller('MainCtrl', function($http, Auth) {
    var vm = this;

    vm.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      vm.awesomeThings = awesomeThings;
    });

    vm.addThing = function() {
      if (vm.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: vm.newThing });
      vm.newThing = '';
    };

    vm.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    vm.isLoggedIn = Auth.isLoggedIn;
  });
