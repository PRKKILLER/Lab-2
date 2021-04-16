/* eslint-disable no-shadow */
/* eslint-disable no-console */
const ConnectionProvider = require('./kafka/connection');
const userHandler = require('./services/user');
const passportHandler = require('./services/passport');
const groupHandler = require('./services/group');

function handleTopicRequest(topicName, fname) {
  // var topicName = 'root_topic';
  const consumer = ConnectionProvider.getConsumer(topicName);
  const producer = ConnectionProvider.getProducer();
  console.log('server is running ');
  consumer.on('message', (message) => {
    console.log(`message received for ${topicName} `, fname);
    console.log(message.value);
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
handleTopicRequest('user', userHandler);
handleTopicRequest('passport', passportHandler);
handleTopicRequest('group', groupHandler);
