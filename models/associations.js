const Brand = require("./Brand");
const Product = require("./Product");

Brand.hasMany(Product, {
  as: "products",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
  foreignKey: { name: "brandId", allowNull: false },
});
Product.belongsTo(Brand);
