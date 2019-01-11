module.exports = (sequelize, DataTypes) => {
  let VocabItem =  sequelize.define("VocabItem", {
    word: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    translation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pronunciation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    association: DataTypes.STRING,
  });

  VocabItem.associate = function (models) {
    models.VocabItem.belongsToMany(models.VocabList, {
      through: 'VocabListWithItems'
    });
  };

  return VocabItem;
};