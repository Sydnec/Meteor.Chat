import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { RoomsCollection } from "../db/RoomsCollection";
import { MessagesCollection } from "../db/MessagesCollection";
import { ReactiveVar } from "meteor/reactive-var";

import "./Rooms.html";
import "../api/roomsMethods";
import "../api/messagesMethods";

var currentRoomID = new ReactiveVar(undefined);

Template.roomMain.onCreated(() => {
  Meteor.subscribe("rooms");
  currentRoomID.set(undefined);
});

Template.roomMain.helpers({
  currentRoom() {
    return currentRoomID.get() || false;
  },
});

Template.roomList.helpers({
  availableRooms() {
    return RoomsCollection.find({});
  },
});

Template.roomList.events({
  "click #addRoom"() {
    Meteor.call(
      "rooms.insert",
      window.prompt("Room name ?", "New Room") || "New Room"
    );
  },
});

Template.roomItem.events({
  "click .join"() {
    currentRoomID.set(this._id);
  },
  "click .delete"() {
    Meteor.call("rooms.remove", this._id);
  },
});

Template.roomScreen.onCreated(() => {
  Meteor.subscribe("messages");
});

Template.roomScreen.events({
  "click #leave"() {
    currentRoomID.set(undefined);
  },
  "submit .message-form"(event) {
    event.preventDefault();
    const target = event.target;
    const text = target.text.value;
    Meteor.call("messages.insert", currentRoomID.get(), text);
    target.text.value = "";
  },
});

Template.roomScreen.helpers({
  messages() {
    return MessagesCollection.find({ roomId: currentRoomID.get() });
  },
  authorClass() {
    return Meteor.user().username == this.author ? "-mine" : "";
  },
});
