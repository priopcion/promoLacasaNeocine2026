



module.exports = (sequelize, DataTypes) => {
  const Farmaciacamp = sequelize.define('FarmaciaCamp', { 
    IdFarmacia: {
      type: DataTypes.NUMBER,
      allowNull: true
    },

    IdCampanya: {
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
  }, {
    tableName: 'Farmaciacamp',
    name: {
        singular: 'Farmaciacamp',
        plural: 'Farmaciacamp'
    }
  }); 
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     Farmaciacamp.associate = function (models) {
      // define association here
    }

    return Farmaciacamp;
    
  };
  
  
