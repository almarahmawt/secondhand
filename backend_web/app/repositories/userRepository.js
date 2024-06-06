const { User } = require("../models");

module.exports = {
  create(createArgs) {
    return User.create(createArgs);
  },

  update(id, updateArgs) {
    return User.update(updateArgs, {
      where: {
        id,
      },
    });
  },

  findId(id) {
    return User.findOne({
      where: {
        email: id,
      },
    });
  },

  findIdByEmail(email) {
    return User.findOne({
      where: {
        email,
      },
    });
  },

  findUserEmail(id) {
    return User.findOne({
      where: {
        id,
      },
    });
  },

  findUserID(id) {
    return User.findOne({
      where: {
        id,
      },
    });
  },

  findAll() {
    return User.findAll();
  },
};
