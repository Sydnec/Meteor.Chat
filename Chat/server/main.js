import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import "/imports/api/messagesMethods";

const SEED_USERNAME = "admin";
const SEED_PASSWORD = "admin";

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
  // const user = Accounts.findUserByUsername(SEED_USERNAME);
});
