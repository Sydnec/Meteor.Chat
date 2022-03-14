import { Meteor } from "meteor/meteor";
// import { Session } from "meteor/session";
// import { MessagesCollection } from "../imports/db/MessagesCollection";
// import { RoomsCollection } from "../imports/db/RoomsCollection";

Meteor.startup(() => {
  var MessagesCollection = new Meteor.Collection("messages");
  var RoomsCollection = new Meteor.Collection("rooms");
  //   if (RoomsCollection.find().count() === 0) {
  //     RoomsCollection.insert({
  //       name: "First room",
  //     });
  //     MessagesCollection.insert({
  //       room: this._id,
  //       author: "admin",
  //       text: "First Message",
  //       sentAt: new Date().toUTCString(),
  //     })
  //   }
});

Meteor.publish("rooms", function () {
  return RoomsCollection.find({}, {});
});

Meteor.publish("messages", function () {
  return MessagesCollection.find({}, {});
});
