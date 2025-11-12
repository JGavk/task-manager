module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        created_At: DataTypes.DATE,
        updated_At: DataTypes.DATE
    }, { freezeTableName: true, timestamps: false });

    User.associate = (models) => {
        User.hasMany(models.Task, {
            foreignKey: 'user_Id',
            as: 'tasks'
        });
    };

    return User;
};