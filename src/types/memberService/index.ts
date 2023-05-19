export interface ImemberServicelogin {
  login(body: object): any[]
}
export interface ImemberServiceDao {
  memberDao: ImemberServicelogin
}
