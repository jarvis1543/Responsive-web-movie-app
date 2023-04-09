import { Store } from "../core/core"

interface DetailedMovie {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: {
    Source: string
    Value: string
  }[]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: string
}

export interface SimpleMovie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}
interface State {
  searchText: string
  page: number
  pageMax: number
  movies: SimpleMovie[]      // before: any[] - 최종적으로 바꿔줘야함
  movie: DetailedMovie       // before: any - 최종적으로 바꿔줘야함
  loading: boolean
  message: string
}

const store = new Store<State>({
  searchText: '',
  page: 1,
  pageMax: 1,
  movies: [],
  movie: {} as DetailedMovie,
  loading: false,
  message: 'Search for the movie title!'
})

export default store
// 타입스크립트에서는 화살표함수에서 괄호를 생략할 수 없음
export const searchMovies = async (page: number) => {
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
    const { Search, totalResults, Response, Error } = await res.json()
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

// 타입스크립트에서는 화살표함수에서 괄호를 생략할 수 없음
export const getMovieDetails = async (id: number) => {
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



