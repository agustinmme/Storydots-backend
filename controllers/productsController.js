const Product = require("../models/Product");
const Brand = require("../models/Brand");

// Busca un producto por el id al producto y retorna el mismo o un mensaje de error.
const searchById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!Number(id)) res.status(400).json({ message: "ID NOT VALID ONLY NUMBER" });
    
    const response = await Product.findOne({
      where: { id: id },
      attributes: {
        exclude: ["brandId"],
      },
      include: {
        model: Brand,
        attributes: ["name", "logo_url"],
      },
    });
    if (!response) res.status(404).json({ message: "PRODUCT NOT EXIST" });
    res.send(response);
  } catch (e) {
    next(e);
  }
};
// Retorna los productos por pagina y el numeros de paginas totales.
// Necesita pasarle el parametro page para que la api identifique en que pagina esta posicionada.
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
    if (!response) res.status(404).json({ message: "PRODUCT NOT EXIST" });
    res.send({
      content: response.rows,
      totalPages: Math.ceil(response.count / size),
    });
  } catch (e) {
    next(e);
  }
};


//Crea un nuevo producto y devuelve un mensaje de exito/error.
//Necesitaras esta authentificado.
const create = async (req, res, next) => {
  try {
    const { name, description, image_url, price, brandId } = req.body;

    if (Object.entries(req.body).length === 0)
    res
      .status(400)
      .json({
        message:
          "BAD REQUEST, AT LEAST ONE OF THE FOLLOWING PARAMS IS MISSING: [NAME],[IMAGE_URL],[DESCRIPTION],[PRICE],[BRAND-ID]",
      });
      
    const response = await Product.create({
      name,
      description,
      image_url,
      price,
      brandId,
    });

    res.send({ message: "YOUR PRODUCT ADDED SUCCESSFULLY" });
  } catch (e) {
    next(e);
  }
};
//Busca el producto a eliminar,lo elimina y devuelve un mensaje de exito/error
//Necesitaras esta authentificado
const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!Number(id))
    res.status(400).json({ message: "ID NOT VALID ONLY NUMBER" });
    const response = await Product.destroy({
      where: {
        id: id,
      },
    });
    if (!response) res.status(404).json({ message: "PRODUCT NOT EXIST" });
    
    res.send({
      message: "Delete successfully",
    });
  } catch (e) {
    next(e);
  }
};
//Busca el producto a actualizar,actualiza almenos 1 dato y devuelve un mensaje de exito/error.
//Podria ser un patch como esta ahora o requerir cambiar si o si tados la informacion los campos.
//Necesitaras esta authentificado
const update = async (req, res, next) => {
  try {
    const { id } = req.params;

    let response = await Product.findByPk(id);

    if (!response) res.status(404).json({ message: "PRODUCT NOT EXIST" });

    if (Object.entries(req.body).length === 0)
      res
        .status(400)
        .json({
          message:
            "BAD REQUEST, AT LEAST ONE OF THE FOLLOWING PARAMS IS MISSING: [NAME],[IMAGE_URL],[DESCRIPTION],[PRICE],[BRAND-ID]",
        });

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

    res.send({ message: "UPDATE SUCCESSFULLY" });
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
