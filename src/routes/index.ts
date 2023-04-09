import { createRouter } from '../core/core'
import Home from './Home'
import Movie from './Movie'
import About from './About'
import NotFound from './NotFound'

export default createRouter([ 
  { path: '#/', component: Home },
  { path: '#/movie', component: Movie },
  { path: '#/about', component: About },
  // 위 페이지와 일치하지 않는 모든 페이지는 여기에 옴
  { path: '.*', component: NotFound }, 
])



