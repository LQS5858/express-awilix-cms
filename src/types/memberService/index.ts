export interface ImemberServicelogin {
  login(body: object): any[]
}
export interface ImemberServiceDao {
  memberDao: ImemberServicelogin
  api?: any
  $http?: any
  memberHttp?: any
}
