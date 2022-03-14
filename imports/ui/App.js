import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { RoomsCollection } from "../db/RoomsCollection";
import { Tracker } from "meteor/tracker";
import { ReactiveDict } from "meteor/reactive-dict";

import "./App.html";
import { Room } from "./Rooms.js";
import "./Login.js";

const IS_LOADING_STRING = "isLoading";

const getUser = () => Meteor.user();
const isUserLogged = () => !!getUser();

Template.mainContainer.events({
  "click .user"() {
    Meteor.logout();
  },
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
