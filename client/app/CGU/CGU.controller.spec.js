'use strict';

describe('Controller: CGUCtrl', function () {

  // load the controller's module
  beforeEach(module('ludiicApp'));

  var CGUCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CGUCtrl = $controller('CGUCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    //expect(1).toEqual(1);
  });
});
