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
        category: {
            type: DataTypes.STRING,
            allowNull: true,
            default: "misc"
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true,
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