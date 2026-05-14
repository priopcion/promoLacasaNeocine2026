




module.exports = (sequelize, DataTypes) => {
  const Campanya = sequelize.define('Campanya', { 
    IdFarmacia: {
      type: DataTypes.NUMBER,
      allowNull: true
    },

    IdUsuario: {
      type: DataTypes.NUMBER,
      allowNull:true
    },

    FecIniPrevisto: {
      type:DataTypes.DATE,
      allowNull: false
    },

    FecFinPrevisto: {
      type: DataTypes.DATE,
      allowNull: false
    },

    FeciniReal: {
      type: DataTypes.DATE,
      allowNull: false
    },

    FecFinReal: {
      type:DataTypes.DATE,
      allowNull: false
    },

    img: {
      type:DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'Campanya',
    name: {
        singular: 'Campanya',
        plural: 'Campanya'
    }
  }); 
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
      Campanya.associate = function (models) {
      // define association here
    }

    return Campanya;
    
  };
  
  
