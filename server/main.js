import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { RoomsCollection } from "/imports/db/RoomsCollection";
import { MessagesCollection } from "/imports/db/MessagesCollection";

import "/imports/api/roomsMethods";
import "/imports/api/roomsPublications";
import "/imports/api/messagesMethods";
import "/imports/api/messagesPublications";

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
