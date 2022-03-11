import { check } from "meteor/check";
import { MessagesCollection } from "../db/MessagesCollection";

Meteor.methods({
  "messages.insert"(text) {
    check(text, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    MessagesCollection.insert({
      text,
      sentAt: new Date(),
      userId: this.userId,
      user: this.username,
    });
  },
});
