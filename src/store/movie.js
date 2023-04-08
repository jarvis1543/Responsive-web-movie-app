import { Store } from "../core/core"

const store = new Store({
  searchText: '',
  page: 1,
  pageMax: 1,
  movies: [],
  movie: {},
  loading: false,
  message: 'Search for the movie title!'
})

export default store

export const searchMovies = async page => {
  store.state.loading = true;
  store.state.page = page
  if (page === 1) {
    store.state.movies = []
    store.state.message = ''
  }
  
  try {
    const res = await fetch('/api/movie', {
      method: 'post', // api/movie.js에서 request.body() 부분을 받으려면 post로 전송
      body: JSON.stringify({
        title: store.state.searchText,
        page  // 속성 이름과 값(데이터) 이름이 같으면 생략 가능
      })
    })
    const { Search, totalResults, Response, Error } = await res.json() // Search 변수에 담기
    if (Response === 'True') {
      store.state.movies = [    
        ...store.state.movies,  // 기존에 가지고 있는 데이터를 전개해서 저장
        ...Search,              // 새로 가지고 온 데이터를 전개해서 저장
      ]
      store.state.pageMax = Math.ceil(Number(totalResults)/ 10)
    } else {
      store.state.message = Error
    }
  } catch (error) {
    console.log('searchMovies error : ', error)
  } finally {
    store.state.loading = false;
  }
}

export const getMovieDetails = async id => {
  try {
    const res = await fetch('/api/movie', {
      method: 'post', // api/movie.js에서 request.body() 부분을 받으려면 post로 전송
      body: JSON.stringify({
        id
      })
    })
    store.state.movie = await res.json()
  } catch (error) {
    console.log('getMovieDetails error : ', error)
  } finally {

  }
}






