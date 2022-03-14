import { Template } from "meteor/templating";
import { Meteor } from "meteor/meteor";
import { RoomsCollection } from "../db/RoomsCollection";
import { MessagesCollection } from "../db/MessagesCollection";
import { ReactiveDict } from "meteor/reactive-dict";

import "./Login.js";
import "./App.html";

const getUser = () => Meteor.user();
const isUserLogged = () => !!getUser();
const IS_LOADING_STRING = "isLoading";

Template.mainContainer.onCreated(function mainContainerOnCreated() {
  this.state = new ReactiveDict();

  const handler = Meteor.subscribe("tasks");
  Tracker.autorun(() => {
    this.state.set(IS_LOADING_STRING, !handler.ready());
  });
});

Template.mainContainer.helpers({
  isUserLogged() {
    return isUserLogged();
  },
  getUser() {
    return getUser();
  },
  isLoading() {
    const instance = Template.instance();
    return instance.state.get(IS_LOADING_STRING);
  },
});

Template.mainContainer.events({
  "click .user"() {
    Meteor.logout();
  },
});

Template.roomContainer.helpers({
  rooms() {
    if (!isUserLogged()) {
      return [];
    }
    return RoomsCollection.find({});
  },
});

Template.room.helpers({
  currentRoom() {
    // return Session.get("room") || false;
  },
  messages() {
    if (!isUserLogged()) {
      return [];
    }
    return MessagesCollection.find({ room: currentRoom() });
  },
});

Template.rooms.helpers({
  availableRooms() {
    return RoomsCollection.find({});
  },
  authorClass() {
    if (/* auteur du message == */ getUser().username) {
      return " mine";
    } else {
      return "";
    }
  },
});

Template.roomItem.events({
  "click .join": function () {
    var name;
    if (currentRoom() === undefined) {
      name = window.prompt("Your name", "Guest") || "Anonymous";
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
