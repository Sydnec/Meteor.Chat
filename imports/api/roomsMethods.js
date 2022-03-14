import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { RoomsCollection } from "../db/RoomsCollection";

Meteor.methods({
  "rooms.insert"(text) {
    check(text, String);
    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }
    RoomsCollection.insert({
      name: text,
    });
  },

  "rooms.remove"(roomId) {
    check(roomId, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    const room = RoomsCollection.findOne({ _id: roomId });

    if (!room) {
      throw new Meteor.Error("Access denied.");
    }

    RoomsCollection.remove(roomId);
  },
});
