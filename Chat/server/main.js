import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { MessagesCollection } from "../imports/db/MessagesCollection";
import { RoomsCollection } from "../imports/db/RoomsCollection";

const SEED_USERNAME = "admin";
const SEED_PASSWORD = "admin";

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
});

Meteor.publish("rooms", function () {
  return RoomsCollection.find({}, {});
});

Meteor.publish("messages", function () {
  return MessagesCollection.find({}, {});
});
