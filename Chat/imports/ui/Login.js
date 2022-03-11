import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { Template } from "meteor/templating";
import "./Login.html";

Template.login.events({
  "submit .login-form"(e) {
    e.preventDefault();

    const target = e.target;

    const username = target.username.value;
    const password = target.password.value;

    Meteor.loginWithPassword(username, password);
  },
  "submit .create-form"(e) {
    e.preventDefault();

    const target = e.target;

    const username = target.username.value;
    const password = target.password.value;

    Accounts.createUser({
      username: username,
      password: password,
    });
    Meteor.loginWithPassword(username, password);
  },
});
