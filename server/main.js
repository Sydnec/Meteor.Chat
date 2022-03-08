import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { MessagesCollection } from "/imports/db/MessagesCollection";
import "/imports/api/messagesMethods";
import "/imports/api/messagesPublications";

const newMessage = (messageText, user) =>
  MessagesCollection.insert({
    messageText: messageText,
    userId: user._id,
    sentAt: new Date(),
  });

const SEED_USERNAME = "meteorite";
const SEED_PASSWORD = "password";

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME);

  if (MessagesCollection.find().count() === 0) {
    ["Here will appear messages"].forEach((messageText) =>
      newMessage(messageText, user)
    );
  }
});
