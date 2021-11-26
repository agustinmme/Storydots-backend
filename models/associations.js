const Brand = require("./Brand");
const Product = require("./Product");


Brand.hasMany(Product, {as: 'products', foreignKey: 'brandId'});
Product.belongsTo(Brand);
