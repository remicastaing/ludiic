'use strict';

describe('Controller: MentionsLegalesCtrl', function () {

  // load the controller's module
  beforeEach(module('ludiicApp'));

  var MentionsLegalesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MentionsLegalesCtrl = $controller('MentionsLegalesCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    //expect(1).toEqual(1);
  });
});
