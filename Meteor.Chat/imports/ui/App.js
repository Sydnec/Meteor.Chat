import { Template } from "meteor/templating";
import { Session } from "meteor/session";
import { Meteor } from "meteor/meteor";
import "./App.html";

const MessagesCollection = new Meteor.Collection("messages");
const RoomsCollection = new Meteor.Collection("rooms");

Template.mainContainer.helpers({
  currentRoom() {
    return Session.get("room") || false;
  },
});

Template.rooms.helpers({
  availableRooms() {
    return RoomsCollection.find({});
  },
});

Template.room.helpers({
  roomName() {
    var room = RoomsCollection.findOne({ _id: Session.get("room") });
    return room && room.name;
  },
  messages() {
    return MessagesCollection.find({ room: Session.get("room") });
  },
  authorClass() {
    return Session.equals("name", this.author) ? " mine" : "";
  },
});

Template.rooms.events({
  "click #addRoom": function () {
    var roomName = window.prompt("Name the room", "My room");
    if (roomName) {
      RoomsCollection.insert({ name: roomName });
    } else {
      RoomsCollection.insert({ name: "Anonymous Room" });
    }
  },
});

Template.room.events({
  "click #leave": function () {
    Session.set("room", undefined);
  },

  "submit .message-form"(event) {
    event.preventDefault();
    const target = event.target;
    const text = target.text.value;

    check(text, String);

    // if (!this.userId) {
    //   throw new Meteor.Error("Not authorized.");
    // }

    MessagesCollection.insert({
      room: Session.get("room"),
      author: Session.get("name"),
      text: text,
      sentAt: new Date().toUTCString(),
    });

    target.text.value = "";
  },
});

Template.roomItem.events({
  "click .enter": function () {
    var name;
    if (Session.get("name") === undefined) {
      name = window.prompt("Your name", "Guest");
      if (!name) name = "Anonymous";
      Session.set("name", name);
    }
    Session.set("room", this._id);
  },
  "click .delete": function () {
    if (
      !window.confirm("Remove this room?", "Do you really want to remove it ?")
    ) {
      return;
    }
    RoomsCollection.remove({ _id: this._id });
  },
});
