'use strict';

describe('Service: ludiicStore', function () {

  // load the service's module
  beforeEach(module('ludiicApp'));

  // instantiate service
  var ludiicStore;
  beforeEach(inject(function (_ludiicStore_) {
    ludiicStore = _ludiicStore_;
  }));

  it('should do something', function () {
    expect(!!ludiicStore).toBe(true);
  });

});
