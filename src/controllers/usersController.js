exports.getUser = (req, res) => {
  res.json({ user: 'GET' });
};

exports.postUser = (req, res) => {
  res.json({ user: 'POSTED' });
};

exports.updateUser = (req, res) => {
  res.json({ users: 'YO' });
};

exports.deleteUser = (req, res) => {
  res.json({ users: 'YO' });
};
