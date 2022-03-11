import { Template } from "meteor/templating";
import { MessagesCollection } from "../db/MessagesCollection";
import { RoomsCollection } from "../db/RoomsCollection";
import { ReactiveDict } from "meteor/reactive-dict";
import "./App.html";
import "./Message.js";
import "./Login.js";

const getUser = () => Meteor.user();
const isUserLogged = () => !!getUser();

Template.mainContainer.onCreated(function mainContainerOnCreated() {
  this.state = new ReactiveDict();
});

Template.mainContainer.events({
  "click .user"() {
    Meteor.logout();
  },
  "click #addRoom": function () {
    var roomName =
      window.prompt("Name the room", "My room") || "Anonymous Room";
    if (roomName) {
      Rooms.insert({ name: roomName });
    }
  },
});

Template.mainContainer.helpers({
  messages() {
    if (!isUserLogged()) {
      return [];
    }
    return MessagesCollection.find({}, { sort: { sentAt: 1 } });
  },
  rooms() {
    if (!isUserLogged()) {
      return [];
    }
    return RoomsCollection.find({}, {});
  },
  isUserLogged() {
    return isUserLogged();
  },
  getUser() {
    return getUser();
  },
});

Template.form.events({
  "submit .message-form"(event) {
    // Prevent default browser form submit
    event.preventDefault();
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
    // Insert a task into the collection
    Meteor.call("messages.insert", text);
    // Clear form
    target.text.value = "";
  },
});
