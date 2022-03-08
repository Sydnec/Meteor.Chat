import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { TasksCollection } from "../db/TasksCollection";
import { Tracker } from "meteor/tracker";
import { ReactiveDict } from "meteor/reactive-dict";
import "./App.html";
import "./Login.js";
import "./Message.js";

const HIDE_COMPLETED_STRING = "hideCompleted";
const IS_LOADING_STRING = "isLoading";

const getUser = () => Meteor.user();
const isUserLogged = () => !!getUser(); //getUser() = false

Template.mainContainer.onCreated(function mainContainerOnCreated() {
  this.state = new ReactiveDict();
  const handler = Meteor.subscribe("messages");
  Tracker.autorun(() => {
    this.state.set(IS_LOADING_STRING, !handler.ready());
  });
});

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
