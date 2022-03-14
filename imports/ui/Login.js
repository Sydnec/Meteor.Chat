import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { Template } from "meteor/templating";
import "./Login.html";

Template.login.events({
  "submit .login-form"(event) {
    event.preventDefault();
    const { target } = event;
    const username = target.username.value;
    const password = "password";

    if (Meteor.users.findOne({ username: username }) === undefined) {
      Accounts.createUser({
        username: username,
        password: password,
      });
    }
    Meteor.loginWithPassword(username, password);
  },
});
