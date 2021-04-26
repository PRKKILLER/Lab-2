const getDataForRecentActivity = (data) => {
  const columns = [
    {
      label: 'Group Name',
      field: 'Name',
      sort: 'asc',
    },
    {
      label: 'Recent Activity',
      field: 'status',
      sort: 'asc',
    },
  ];
  const rows = [];
  data.forEach((activity) => {
    rows.push({ Name: activity.groupName, status: activity.activity });
  });
  return {
    columns,
    rows,
  };
};

export default getDataForRecentActivity;
