'use strict';

describe('Controller: PwdresetCtrl', function () {

  // load the controller's module
  beforeEach(module('ludiicApp'));

  var PwdresetCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PwdresetCtrl = $controller('PwdresetCtrl', {
      $scope: scope
    });
  }));

  // it('should ...', function () {
  //   expect(1).toEqual(1);
  // });
});
