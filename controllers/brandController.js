const Brand = require("../models/Brand");

const getAllWithPage = async (req, res, next) => {
  try {
    const pageAsNumber = Number.parseInt(req.query.page);
    let page = 0;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      page = pageAsNumber;
    }
    const size = 5;
    const response = await Brand.findAndCountAll({
      limit: size,
      offset: size * page,
    });
    if (!response) res.status(404).json({ message: "BRANDS NOT EXIST" });
    res.send({
      content: response.rows,
      totalPages: Math.ceil(response.count / size),
    });
  } catch (e) {
    next(e);
  }
};

const getAll = async (req, res, next) => {
  try {
    const response = await Brand.findAll();
    if (!response) res.status(404).json({ message: "BRANDS NOT EXIST" });
    res.json({ content: response });
  } catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, logo_url } = req.body;
    if (!name || !logo_url)
      res.status(400).json({
        message:
          "BAD REQUEST, AT LEAST ONE OF THE FOLLOWING PARAMS IS MISSING: [NAME],[LOGO_URL]",
      });
    const response = await Brand.create({
      name,
      logo_url,
    });
    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

const searchById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!Number(id))
      res.status(400).json({ message: "ID NOT VALID ONLY NUMBER" });
    const response = await Brand.findByPk(id);
    if (!response) res.status(404).json({ message: "BRAND NOT EXIST" });
    res.json(response);
  } catch (e) {
    next(e);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!Number(id))
      res.status(400).json({ message: "ID NOT VALID ONLY NUMBER" });
    const response = await Brand.destroy({
      where: {
        id: id,
      },
    });
    if (!response) res.status(404).json({ message: "BRAND NOT EXIST" });
    res.json({
      message: "DELETE SUCCESSFULLY",
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!Number(id))
      res.status(400).json({ message: "ID NOT VALID ONLY NUMBER" });

    let response = await Brand.findByPk(id);

    if (!response) res.status(404).json({ message: "BRAND NOT EXIST" });

    const update = {
      name: req.body.name || response.name,
      logo_url: req.body.logo_url || response.logo_url,
    };

    if (Object.entries(req.body).length === 0)
      res.status(400).json({
        message:
          "BAD REQUEST, AT LEAST ONE OF THE FOLLOWING PARAMS IS MISSING: [NAME],[LOGO_URL]",
      });

    response = await Brand.update(update, {
      where: {
        id,
      },
    });

    res.json({ message: "UPDATE SUCCESSFULLY" });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll,
  getAllWithPage,
  create,
  searchById,
  update,
  deleteById,
};
