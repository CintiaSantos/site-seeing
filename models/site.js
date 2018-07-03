module.exports = function(sequelize, DataTypes) {
    var Site = sequelize.define("Site", {
        url: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isUrl: true
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            default: 5
        },
    });

    Site.associate = function(models) {
        // We're saying that a Site should belong to a User
        // A Site can't be created without a User due to the foreign key constraint
        Site.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Site;
};