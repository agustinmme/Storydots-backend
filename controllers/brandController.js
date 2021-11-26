const Brand = require("../models/Brand");

const getAll = async (req, res , next) => {
  try {
    const response = await Brand.findAll();
    if (!response) throw new Error("No exite nada");
    res.json(response);
  } catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, logo_url } = req.body;
    const response = await Brand.create({
      name,
      logo_url,
    });
    res.send(response);
  } catch (e) {
    next(e);
  }
};

const searchById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!Number(id)) throw new Error("id not valid");
    const response = await Brand.findByPk(id);
    if (!response) throw new Error("Product not exist");
    res.send(response);
  } catch (e) {
    next(e);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await Brand.destroy({
      where: {
        id: id,
      },
    });
    if (!response) throw new Error("Brand not exist");
    res.send({
      message: "Delete successfully",
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;

    let response = await Brand.findByPk(id);

    if (!response) throw new Error("Product not exist");

    const update = {
      name: req.body.name || response.name,
      logo_url: req.body.logo_url || response.logo_url,
    };

    response = await Brand.update(update, {
      where: {
        id,
      },
    });

    res.send({ message: "Update successfully" });
    
  } catch (e) {
    next(e);
  }
};


module.exports = {
  getAll,
  create,
  searchById,
  update,
  deleteById
};
