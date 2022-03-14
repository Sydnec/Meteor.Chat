import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";
import { MessagesCollections } from "../db/MessagesCollection";

Meteor.methods({
  "messages.insert"(text) {
    check(text, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    MessagesCollections.insert({
      text,
      createdAt: new Date(),
      userId: this.userId,
    });
  },
});
