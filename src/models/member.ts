import Sequelize from 'sequelize'

export default function (
  sequelize: any,
  DataTypes: { INTEGER: (arg0: number) => any; STRING: (arg0: number) => any }
) {
  class User extends Sequelize.Model {}

  User.init(
    {
      uid: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true
      },
      nickName: {
        type: DataTypes.STRING(11),
        defaultValue: 'USER_01',
        field: 'nick_name'
      },
      password: {
        type: DataTypes.STRING(22)
      },
      wxNickName: {
        type: DataTypes.STRING(22),
        field: 'wx_nick_name'
      },
      phone: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      avatar: {
        type: DataTypes.STRING(22)
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
