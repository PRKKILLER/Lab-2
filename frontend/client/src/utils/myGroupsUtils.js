/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const handleClick = async (ID, accepted) => {
  const currentUser = localStorage.getItem('EmailId');
  console.log(currentUser);
  if (accepted) {
    // call leave group
    const leavegrp = await axios.post('http://localhost:3002/mygroup/leaveGroup', { GroupId: ID, UserId: currentUser });
    console.log('leave group res', leavegrp);
    alert(leavegrp.data);
    // call leave group
  } else {
    const acceptinvitation = await axios.post('http://localhost:3002/mygroup/acceptinvitation', { GroupId: ID, UserId: currentUser });
    console.log('accept res', acceptinvitation.data);
    // call accept invite
  }
};

const getUserIndex = (users, email) => {
  for (let i = 0; i < users.length; i += 1) {
    if (users[i].emailId === email) {
      return i;
    }
  }
  return -1;
};

const getDataForMyGroups = (data, email) => {
  console.log(email);
  const columns = [
    {
      label: 'Name',
      field: 'Name',
      sort: 'asc',
    },
    {
      label: 'Status',
      field: 'status',
      sort: 'asc',
    },
  ];
  const rows = [];
  data.data.forEach((groups) => {
    // eslint-disable-next-line max-len
    const index = getUserIndex(groups.users, email);
    console.log(index);
    console.log(groups.users);
    const button = groups.users[index].flag ? <Button variant="outline-danger">Leave Group</Button> : <Button variant="outline-success">Group Invitation</Button>;
    rows.push({
      id: groups._id,
      Name: groups.name,
      status: button,
      clickEvent: () => handleClick(groups._id, groups.users[index].flag),
    });
  });
  return {
    columns,
    rows,
  };
};

export default getDataForMyGroups;
