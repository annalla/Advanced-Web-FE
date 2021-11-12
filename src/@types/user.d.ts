interface ReqLogin {
  username: string
  password: string
}
interface ResLoginApi extends Res {
  code: string
  data: {
    token: string
    id: number
    name: string
    avatarUrl: string
  }
  status: number
}

interface ResLogin extends ActionRedux { }
