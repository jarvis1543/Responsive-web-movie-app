import { Component } from "../core/core"
import movieStore, { searchMovies } from "../store/movie"

export default class Search extends Component {
  render() {
    this.el.classList.add('search')
    this.el.innerHTML = /* html */ `
      <input 
        placeholder="Enter the movie title to search!"
        value="${movieStore.state.searchText}" />
      <button class="btn btn-primary">
        Search
      </button>
    `
    const inputEl = this.el.querySelector('input')
    inputEl.addEventListener('input', () => {
      movieStore.state.searchText = inputEl.value
    })
    inputEl.addEventListener('keydown', async event => {
      if (event.key == 'Enter' && movieStore.state.searchText.trim()) {
        await searchMovies(1)
      }
    })

    const btnEl = this.el.querySelector('.btn')
    btnEl.addEventListener('click', async () => {
      if (movieStore.state.searchText.trim()) {
        await searchMovies(1)
      }
    })
  }
}


