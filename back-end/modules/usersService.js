const bcrypt = require("bcrypt");
const User = require("../mongoModels/User");

const createUser = (userParam) => {
  const user = new User({
    username: userParam.username,
    email: userParam.email,
    password: bcrypt.hashSync(userParam.password, 10),
  });

  return user.save();
};

module.exports = {
  createUser,
};
