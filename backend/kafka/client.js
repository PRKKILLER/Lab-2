/* eslint-disable no-console */
// eslint-disable-next-line global-require
const rpc = new (require('./kafkarpc'))();

// make request to kafka
// eslint-disable-next-line camelcase
function make_Request(queue_name, msg_payload, callback) {
  console.log('in make request');
  console.log(msg_payload);
  rpc.makeRequest(queue_name, msg_payload, (err, response) => {
    if (err) console.error('error', err);
    else {
      console.log('response', response);
      callback(null, response);
    }
  });
}

// eslint-disable-next-line camelcase
exports.make_Request = make_Request;
