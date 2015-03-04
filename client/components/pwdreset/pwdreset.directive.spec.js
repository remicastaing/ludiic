'use strict';

describe('Directive: pwdreset', function () {

  // load the directive's module and view
  beforeEach(module('ludiicApp'));
  beforeEach(module('components/pwdreset/pwdreset.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<pwdreset></pwdreset>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the pwdreset directive');
  }));
});