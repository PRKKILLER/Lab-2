/* eslint-disable no-shadow */
/* eslint-disable no-console */
const ConnectionProvider = require('./kafka/connection');
const userHandler = require('./services/userAuth');
const passportHandler = require('./services/passport');

function handleTopicRequest(topicName, fname) {
  // var topicName = 'root_topic';
  const consumer = ConnectionProvider.getConsumer(topicName);
  const producer = ConnectionProvider.getProducer();
  console.log('server is running ');
  consumer.on('message', (message) => {
    console.log(`message received for ${topicName} `, fname);
    console.log(JSON.stringify(message.value));
    const data = JSON.parse(message.value);

    fname.handleRequest(data.data, (err, res) => {
      console.log(`after handle${res}`);
      const payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
          }),
          partition: 0,
        },
      ];
      producer.send(payloads, (err, data) => {
        console.log(data);
      });
    });
  });
}
handleTopicRequest('signup', userHandler);
handleTopicRequest('login', userHandler);
handleTopicRequest('passport', passportHandler);
handleTopicRequest('updateDetails', userHandler);
