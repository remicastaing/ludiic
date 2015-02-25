'use strict';

var config = browser.params;
browser.ignoreSynchronization = true;
browser.waitForAngular();
var UserModel = require(config.serverConfig.root + '/server/api/user/user.model');
var ptor; 

describe('Signup View', function() {
  var page;

  var loadPage = function() {
    browser.get('/signup');
    page = require('./signup.po');
  };

  var testUser = {
    name: 'Test',
    email: 'test@test.com',
    password: 'test'
  };

  before(function() {
    return loadPage();
  });

  after(function() {
    return UserModel.removeAsync();
  });

  it('should include signup form with correct inputs and submit button', function() {
    page.form.name.getAttribute('type').should.eventually.equal('text');
    page.form.name.getAttribute('name').should.eventually.equal('name');
    page.form.email.getAttribute('type').should.eventually.equal('email');
    page.form.email.getAttribute('name').should.eventually.equal('email');
    page.form.password.getAttribute('type').should.eventually.equal('password');
    page.form.password.getAttribute('name').should.eventually.equal('password');
    page.form.submit.getAttribute('type').should.eventually.equal('submit');
    page.form.submit.getText().should.eventually.equal('Créer un compte');
  });

  describe('with local auth', function() {

    before(function() {
        return loadPage();
      });

    it('should signup a new user, log them in, and redirecting to "/"', function(done) {
      UserModel.remove(function() {
        page.signup(testUser);
        var navbar = require('../../components/navbar/navbar.po');

        browser.ignoreSynchronization = true;
        browser.waitForAngular();
        browser.getLocationAbsUrl().should.eventually.equal('/');

        //navbar.navbarAccountGreeting.getText().should.eventually.equal('Bonjour ' + testUser.name);

        done();
      });
    });

    describe('and invalid credentials', function() {
      before(function() {
        return loadPage();
      });

      it('should indicate signup failures', function() {
        page.signup(testUser);
        browser.ignoreSynchronization = true;
        browser.waitForAngular();

        browser.getLocationAbsUrl().should.eventually.equal('/signup');
        //page.form.email.getAttribute('class').should.eventually.contain('ng-invalid-mongoose');

        //var helpBlock = page.form.element(by.css('.form-group.has-error .help-block.ng-binding'));
        //helpBlock.getText().should.eventually.equal('The specified email address is already in use.');
      });

    });

  });
});
