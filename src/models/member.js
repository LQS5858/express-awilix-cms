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
    nickName: {
      type: DataTypes.STRING,
      defaultValue: 'USER_01',
      field: 'nick_name'
    },
    password: {
      type: DataTypes.STRING
    },
    wxNickName: {
      type: DataTypes.STRING,
      field: 'wx_nick_name'
    },
    phone: {
      type: DataTypes.INTEGER(11)
    },
    avatar: {
      type: DataTypes.STRING
    }
  },
    {
      sequelize,
      modelName: 'member',
      tableName: 't_member'
    }
  )
  return User
}

