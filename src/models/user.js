import Sequelize from 'sequelize'


export default function (sequelize, DataTypes) {
  class User extends Sequelize.Model { }

  User.init({
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    nickname: {
      type: DataTypes.STRING,
      defaultValue: 'USER_01'
    },
    password: {
      type: DataTypes.STRING
    }
  },
    {
      sequelize,
      modelName: 'user',
      tableName: 't_user'
    }
  )
  return User
}

