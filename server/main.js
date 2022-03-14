import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { MessagesCollection } from "/imports/db/MessagesCollection";
import { RoomsCollection } from "/imports/db/MessagesCollection";

import "../imports/api/messagesMethods";
import "../imports/api/roomsMethods";
import "../imports/api/messagesPublications";
import "../imports/api/roomsPublications";

const SEED_USERNAME = "admin";
const SEED_PASSWORD = "password";

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
});
