'use strict';

describe('Directive: signup', function () {

  // load the directive's module and view
  beforeEach(module('ludiicApp'));
  beforeEach(module('components/signup/signup.html'));
  beforeEach(module('app/main/main.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<signup></signup>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.contain('Créer un compte');
  }));
});