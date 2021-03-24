const { PubSub } = require("@google-cloud/pubsub");
const pubSubClient = new PubSub();
const topicName = "Weathersensor";
const subscriptionName = "Weathersensor-subnodejs";
const timeout = 60;

module.exports = {
  listenForPullMessages: (wss) => {
    const subscription = pubSubClient.subscription(subscriptionName);
    let messageCount = 0;
    const messageHandler = (message) => {
      console.log(`Received message ${message.id}:`);
      console.log(`\tData: ${message.data}`);
      console.log(`\tAttributes: ${message.attributes}`);
      messageCount += 1;
      message.ack();
      wss.broadcast(message.data);
    };

    // Create an event handler to handle errors
    const errorHandler = function (error) {
      console.error(`ERROR: ${error}`);
      throw error;
    };

    subscription.on("message", messageHandler);
    subscription.on('error', errorHandler);
    /*
        setTimeout(() => {
            subscription.removeListener('message', messageHandler);
            console.log(`${messageCount} message(s) received.`);
        }, timeout * 1000);
        */
  },
};
