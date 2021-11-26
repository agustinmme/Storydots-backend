const Product = require("../models/Product");
const Brand = require("../models/Brand");

const searchById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!Number(id)) throw new Error("id not valid");
    const response = await Product.findByPk(id);
    if (!response) throw new Error("Product not exist");
    res.send(response);
  } catch (e) {
    next(e);
  }
};

const getAll = async (req, res, next) => {
  try {
    const pageAsNumber = Number.parseInt(req.query.page);
    let page = 0;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      page = pageAsNumber;
    }
    const size = 5;
    const response = await Product.findAndCountAll({
      limit: size,
      offset: size * page,
      attributes: {
        exclude: ["brandId"],
      },
      include: {
        model: Brand,
        attributes: ["name", "logo_url"],
      },
    });
    if (!response) throw new Error("Not exist");
    res.send({
      content: response.rows,
      totalPages: Math.ceil(response.count / size),
    });
  } catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, description, image_url, price, brandId } = req.body;

    if(!brandId){
      throw new Error("Your product need a brand");
    }

    const response = await Product.create({
      name,
      description,
      image_url,
      price,
      brandId,
    });
    res.send(response);
  } catch (e) {
    next(e);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await Product.destroy({
      where: {
        id: id,
      },
    });
    if (!response) throw new Error("Product not exist");
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

    let response = await Product.findByPk(id);

    if (!response) throw new Error("Product not exist");

    const update = {
      name: req.body.name || response.name,
      description: req.body.description || response.description,
      image_url: req.body.image_url || response.image_url,
      price: req.body.price || response.price,
      brandId: req.body.brandId || response.brandId,
    };

    response = await Product.update(update, {
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
  searchById,
  create,
  deleteById,
  update,
};
