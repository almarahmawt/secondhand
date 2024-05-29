const { Offering } = require("../models");
const { User } = require("../models");
const { Product } = require("../models");

module.exports = {
  create(createArgs) {
    return Offering.create(createArgs, {
      include: [{ model: Product }, { model: User }],
    });
  },

  findPk(id) {
    return Offering.findByPk(id);
  },

  findAll() {
    return Offering.findAll({ include: [{ model: Product }, { model: User }] });
  },

  delete(id) {
    return Offering.destroy({
      where: {
        id: id,
      },
    });
  },

  findOffer(id) {
    return Offering.findOne({
      where: {
        id,
      },
    });
  },

  findAllByIdProduct(id) {
    return Offering.findAll({
      where: {
        id_product: id,
      },
    });
  },

  findByIdBuyer(id) {
    return Offering.findAll({
      where: { id_buyer: id },
      include: [{ model: Product }],
    });
  },

  update(id, updateArgs) {
    return Offering.update(updateArgs, {
      where: {
        id,
      },
    });
  },
};
