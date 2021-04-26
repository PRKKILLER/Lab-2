/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
const transactionModel = require('../database/models/transactionModel');

const createNote = async (msg, callback) => {
  const res = {};
  console.log('data inside createNote', msg);
  try {
    // eslint-disable-next-line max-len
    const createnoteRes = await transactionModel.findById(msg.transactionId);
    console.log('transaction get line 11', createnoteRes);
    if (createnoteRes === undefined || createnoteRes === null || createnoteRes.length === 0) {
      console.log('No transaction found');
      res.data = 'No transaction found';
      res.status = 500;
      callback(null, res);
    } else {
      createnoteRes.notes.push({ name: msg.name, emailId: msg.emailId, note: msg.note });
      createnoteRes.save();
      res.data = createnoteRes;
      res.status = 200;
      callback(null, res);
    }
  } catch (e) {
    res.status = 404;
    res.data = e;
    callback(null, 'error');
  }
};

const deleteNote = async (msg, callback) => {
  const res = {};
  console.log('data inside deleteNote', msg);
  try {
    // eslint-disable-next-line max-len
    const deletenoteRes = await transactionModel.findById(msg.transactionId);
    // console.log(' 37', deletenoteRes);
    if (deletenoteRes === undefined || deletenoteRes === null || deletenoteRes.length === 0) {
      console.log('No transaction found');
      res.data = 'No transaction found';
      res.status = 500;
      callback(null, res);
    }
    let i;
    for (i = 0; i < deletenoteRes.notes.length; i += 1) {
    //   console.log(deletenoteRes.notes[i]._id, 'each note line 45');
    //   console.log(msg.noteId, 'noteId');
      if (String(deletenoteRes.notes[i]._id) === String(msg.noteId)) {
        if(deletenoteRes.emailId !== msg.emailId ){
          res.data = 'u didnt write the note';
          res.status = 500;
          callback(null, res);
        }
        // console.log('line 46');
        deletenoteRes.notes.splice(i, 1);
        break;
      }
    }
    if (i === deletenoteRes.notes.length) {
      res.data = 'No Note Found';
      res.status = 500;
      callback(null, res);
    }
    await deletenoteRes.save();
    res.data = deletenoteRes;
    res.status = 200;
    callback(null, res);
  } catch (e) {
    res.status = 404;
    res.data = e;
    callback(null, 'error');
  }
};
function handleRequest(msg, callback) {
  if (msg.path === 'createNote') {
    delete msg.path;
    createNote(msg, callback);
  } else if (msg.path === 'deleteNote') {
    delete msg.path;
    deleteNote(msg, callback);
  }
}
exports.handleRequest = handleRequest;
