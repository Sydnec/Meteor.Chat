import { Meteor } from "meteor/meteor";
import { RoomsCollection } from "/imports/db/MessagesCollection";

Meteor.publish("rooms", function () {
  return RoomsCollection.find({}, {});
});
