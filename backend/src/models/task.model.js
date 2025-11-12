module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        status: DataTypes.STRING,
        user_Id: { type: DataTypes.INTEGER, allowNull: false },
        created_At: DataTypes.DATE,
        updated_At: DataTypes.DATE
    }, { freezeTableName: true, timestamps: false });

    Task.associate = (models) => {
        Task.belongsTo(models.User, {
            foreignKey: 'user_Id',
            as: 'user'
        });
    };
    return Task;
};