
module.exports = (sequelize, DataTypes) => {
  const Usuarios = sequelize.define('Usuarios', {

    IdUsuario: {
      type: DataTypes.NUMBER,
      allowNull:true
    },

    Nombre: {
      type:DataTypes.STRING,
      allowNull: true
    },

    Apellidos: {
      type: DataTypes.STRING,
      allowNull: true
    },

    Login: {
      type: DataTypes.STRING,
      allowNull: false
    },

    Pass: {
      type:DataTypes.STRING,
      allowNull: false
    },

    Acceso: {
      type:DataTypes.NUMBER,
      allowNull:true
    },

    IdRol: {
      type: DataTypes.NUMBER,
      allowNull: true
    },

    idFarmacia: {
      type:DataTypes.NUMBER,
      allowNull: true
    }
  }, {}); 
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    Usuarios.associate = function (models) {
      // define association here
    }

    return Usuarios;
    
  };
  
  
