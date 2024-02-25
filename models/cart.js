module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('cart', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        }
    });

    return Cart;
};