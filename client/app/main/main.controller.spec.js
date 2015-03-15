'use strict';

describe('Controller: MainCtrl', function() {

  // load the controller's module
  beforeEach(module('ludiicApp'));
  beforeEach(module('stateMock'));

  var MainCtrl;
  var state;
  var $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $controller,  $state) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/things')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

 
    state = $state;
    MainCtrl = $controller('MainCtrl', {});
  }));

  it('should attach a list of things to the scope', function() {
    $httpBackend.flush();
    MainCtrl.awesomeThings.length.should.equal(4);
  });
});
