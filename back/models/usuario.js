module.exports = (sequelize, DataTypes) => {
  const usuario = sequelize.define('usuario', {
   Name: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    token: {
      type: DataTypes.STRING,
    },
  });
  // usuario.sync().catch(error =>
  //   console.error(`couldn't connect to database`, error),
  // );
  return usuario;
};