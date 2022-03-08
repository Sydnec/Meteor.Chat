import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { MessagesCollection } from "../db/MessagesCollection";

Meteor.methods({
  "messages.send"(text) {
    check(text, String);
    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }
    MessagesCollection.insert({
      text,
      createdAt: new Date(),
      userId: this.userId,
    });
  },
});
