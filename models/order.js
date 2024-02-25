module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('order', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        total: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'pending' // Example: pending, completed, cancelled
        }
    });

    return Order;
};