'use strict';

describe('Directive: logo', function () {

  // load the directive's module and view
  beforeEach(module('ludiicApp'));
  beforeEach(module('components/logo/logo.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<logo></logo>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the logo directive');
  }));
});