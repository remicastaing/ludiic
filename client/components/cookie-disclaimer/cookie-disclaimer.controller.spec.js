'use strict';

describe('Controller: CookieDisclaimerCtrl', function () {

  // load the controller's module
  beforeEach(module('ludiicApp'));

  var CookieDisclaimerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CookieDisclaimerCtrl = $controller('CookieDisclaimerCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    //expect(1).toEqual(1);
  });
});
