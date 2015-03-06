'use strict';

describe('Directive: cookieDisclaimer', function () {

  // load the directive's module and view
  beforeEach(module('ludiicApp'));
  beforeEach(module('components/cookie-disclaimer/cookie-disclaimer.html'));
  beforeEach(module('app/main/main.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<cookie-disclaimer></cookie-disclaimer>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.contain('cookies');
  }));
});