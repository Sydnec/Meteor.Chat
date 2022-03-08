import { Meteor } from "meteor/meteor";
import { MessagesCollection } from "/imports/db/MessagesCollection";

Meteor.publish("messages", function publishTasks() {
  return MessagesCollection.find({ userId: this.userId });
});
