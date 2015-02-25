'use strict';

angular.module('ludiicApp')
  .factory('ludiicStore', function(store) {
  return store.getNamespacedStore('ludiic');
});
