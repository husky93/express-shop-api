const getUser = (req, res) => {
  res.json({ user: 'GET' });
};

const postUser = (req, res) => {
  res.json({ user: 'POSTED' });
};

const updateUser = (req, res) => {
  res.json({ users: 'YO' });
};

const deleteUser = (req, res) => {
  res.json({ users: 'YO' });
};

export default {
  getUser,
  postUser,
  updateUser,
  deleteUser,
};
