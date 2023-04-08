import { Component } from "../core/core"
import movieStore from '../store/movie'
import movieItem from "./MovieItem"

export default class MovieList extends Component {
  // movieList를 보여주기 위해 여러번 rendering해야함
  constructor() { 
    super()
    movieStore.subscribe('movies', () => {
      this.render()
    })
    movieStore.subscribe('loading', () => {
      this.render()
    })
    movieStore.subscribe('message', () => {
      this.render()
    })
  }
  render() {
    this.el.classList.add('movie-list')
    this.el.innerHTML = /* html */ `
      ${movieStore.state.message 
        ? `<div class="message">${movieStore.state.message}</div>` 
        : '<div class="movies"></div>'}
      <div class="the-loader hide"></div>
    `

    const moviesEl = this.el.querySelector('.movies')
    moviesEl?.append(   // moviesEl 요소가 null이 아니면 .append() 실행
      ...movieStore.state.movies.map(movie => new movieItem({
        movie
      }).el)
    )

    const loaderEl = this.el.querySelector('.the-loader')
    movieStore.state.loading 
      ? loaderEl.classList.remove('hide')
      : loaderEl.classList.add('hide')
  }
}


