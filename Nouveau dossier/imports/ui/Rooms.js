import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { RoomsCollection } from "../db/RoomsCollection";

import "./Rooms.html";
import "../api/RoomsMethods";

Template.rooms.helpers({
  availableRooms() {
    return RoomsCollection.find({});
  },
});

Template.room.events({
  // "click .join"() {
  //   Meteor.call("rooms.remove", this._id);
  // },
  "click .delete"() {
    Meteor.call("rooms.remove", this._id);
  },
});
