import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { MessagesCollection } from "../db/MessagesCollection";

Meteor.methods({
  "messages.insert"(roomId, text) {
    check(text, String);
    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }
    MessagesCollection.insert({
      roomId: roomId,
      text: text,
      timestamp: new Date().toLocaleString(),
      author: Meteor.user().username,
    });
  },
});
