'use strict';

describe('Directive: profil', function () {

  // load the directive's module and view
  beforeEach(module('ludiicApp'));
  beforeEach(module('components/profil/profil.html'));
  beforeEach(module('app/main/main.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<profil></profil>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.contain('Profil');
  }));
});