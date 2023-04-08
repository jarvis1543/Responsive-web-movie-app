import { Component } from '../core/core'
import movieStore, { searchMovies } from '../store/movie'

export default class MovieListMore extends Component {
  constructor() {
    super({
      tagName: 'button'
    })
    movieStore.subscribe('pageMax', () => {
      const { pageMax, page } = movieStore.state
      // if (movieStore.state.pageMax !== movieStore.state.page ||
      //   movieStore.state.page !== 1) {
      //   this.el.classList.remove('hide')
      // }
      // const { page, pageMax } = movieStore.state
      // if (pageMax > page) {
      //   this.el.classList.remove('hide')
      // } else {
      //   this.el.classList.add('hide')
      // }
      pageMax > page 
        ? this.el.classList.remove('hide') 
        : this.el.classList.add('hide')
      // this.render()
    })
  }
  render() {
    this.el.classList.add('btn', 'view-more', 'hide')
    this.el.textContent = 'View more..'
    this.el.addEventListener('click', async () => {
      this.el.classList.add('hide')
      await searchMovies(movieStore.state.page + 1);
    })
  }
}



