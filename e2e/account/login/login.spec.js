'use strict';

var config = browser.params;
var UserModel = require(config.serverConfig.root + '/server/api/user/user.model');

describe('Login View', function() {
  var page;

  var loadPage = function() {
    browser.get('/login');
    page = require('./login.po');
  };

  var testUser = {
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  };

  before(function() {
    return UserModel
      .removeAsync()
      .then(function() {
        return UserModel.createAsync(testUser);
      })
      .then(loadPage);
  });

  after(function() {
    return UserModel.removeAsync();
  });

  it('should include login form with correct inputs and submit button', function() {
    page.form.email.getAttribute('type').should.eventually.equal('email');
    page.form.email.getAttribute('name').should.eventually.equal('email');
    page.form.password.getAttribute('type').should.eventually.equal('password');
    page.form.password.getAttribute('name').should.eventually.equal('password');
    page.form.submit.getAttribute('type').should.eventually.equal('submit');
    page.form.submit.getText().should.eventually.equal('Se connecter');
  });

  describe('with local auth', function() {

    it('should login a user and redirecting to "/"', function() {
      page.login(testUser);

      var navbar = require('../../components/navbar/navbar.po');
      browser.ignoreSynchronization = true;
      browser.waitForAngular();
      browser.getLocationAbsUrl().should.eventually.equal('/');
      
      //navbar.navbarAccountGreeting.getText().should.eventually.equal('Bonjour ' + testUser.name);
    });

    describe('and invalid credentials', function() {
      before(function() {
        return loadPage();
      })

      it('should indicate login failures', function() {
        page.login({
          email: testUser.email,
          password: 'badPassword'
        });
        browser.ignoreSynchronization = true;
        browser.waitForAngular();
        browser.getLocationAbsUrl().should.eventually.equal('/login');

        //var helpBlock = page.form.element(by.css('.form-group.has-error .help-block.ng-binding'));
        //helpBlock.getText().should.eventually.equal('This password is not correct.');
      });

    });

  });
});
