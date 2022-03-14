import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";
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
});
