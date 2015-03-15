'use strict';

describe('Controller: ConfirmCtrl', function () {

  // load the controller's module
  beforeEach(module('ludiicApp'));

  var ConfirmCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConfirmCtrl = $controller('ConfirmCtrl', {});
  }));

  // it('should ...', function () {
  //   expect(1).toEqual(1);
  // });
});
