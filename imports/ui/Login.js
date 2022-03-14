import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";

import "./Login.html";

Template.login.events({
  "submit .login-form"(e) {
    e.preventDefault();

    const target = e.target;

    const username = target.username.value;
    const password = "password";

    console.log(username, password);
    // console.log(Meteor.users.findOne({ username: username }));
    // Meteor.loginWithPassword(username, password);
  },
});
