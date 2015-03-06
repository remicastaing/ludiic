'use strict';

angular.module('ludiicApp')
  .controller('CookieDisclaimerCtrl', function (ludiicStore) {
    this.visible=!ludiicStore.get('cookie-disclaimer');


    this.close = function(){
    	this.visible= false;
    	ludiicStore.set('cookie-disclaimer', true);
    }
  });
