import { Template } from "meteor/templating";
import { RoomsCollection } from "../db/RoomsCollection";
import { MessagesCollection } from "../db/MessagesCollection";

import "./Login.js";
import "./App.html";

const getUser = () => Meteor.user();
const isUserLogged = () => !!getUser();

Template.mainContainer.helpers({
  getUser() {
    return getUser();
  },
});

Template.mainContainer.events({
  "click .user"() {
    Meteor.logout();
  },
});

Template.roomContainer.helpers({
  currentRoom() {
    // return Session.get("room") || false;
  },
  rooms() {
    if (!isUserLogged()) {
      return [];
    }
    return RoomsCollection.find({});
  },
  messages() {
    if (!isUserLogged()) {
      return [];
    }
    return MessagesCollection.find({ room: currentRoom() });
  },
  authorClass() {
    if (/* auteur du message = moimême */ 1 == getUser().username) {
      return " mine";
    } else {
      return "";
    }
  },
  isUserLogged() {
    return isUserLogged();
  },
});

Template.rooms.helpers({
  availableRooms() {
    return RoomsCollection.find({});
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
