import { Store } from "../core/core"

interface State {
  photo: string
  name: string
  email: string
  blog: string
  github: string
}

export default new Store<State>({
  photo: 'https://heropy.blog/css/images/logo.png',
  name: 'jarvis1543 / JeongYeong Park',
  email: 'pjy4952@gmail.com',
  blog: 'https://google.com',
  github: 'https://github.com/jarvis1543'
})



