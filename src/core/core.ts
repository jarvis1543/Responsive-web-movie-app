///// Component /////
interface ComponentPayload {
  // 컴포넌트마다 사용하는 속성이 다르기 때문에 ? 추가
  tagName?: string
  props?: {
    [key: string]: unknown
  }
  state?: {
    [key: string]: unknown
  }
}
export class Component {
  el
  props
  state
  constructor(payload:ComponentPayload = {}) {
    const {
      tagName = 'div', // 최상위 요소의 태그 이름
      props = {},
      state = {}      // 상태나 데이터 저장
    } = payload
    this.el = document.createElement(tagName) // 컴포넌트의 최상위 요소
    this.props = props // 컴포넌트가 사용될 때 부모 컴포넌트에서 받는 데이터
    this.state = state // 컴포넌트 안에서 사용할 데이터
    this.render()
  }
  render() { // 컴포넌트를 렌더링하는 함수
    // ...
  }
}

///// Router /////
interface Route {
  path: string
  component: typeof Component
}
type Routes = Route[]
// 페이지 렌더링!
function routeRender(routes: Routes) {
  // 접속할 때 해시 모드가 아니면(해시가 없으면) /#/로 리다이렉트!
  if (!location.hash) {
    history.replaceState(null, '', '/#/') // (상태, 제목, 주소)
  }
  const routerView = document.querySelector('router-view')
  const [hash, queryString = ''] = location.hash.split('?') // 물음표를 기준으로 해시 정보와 쿼리스트링을 구분

  // 1) 쿼리스트링을 객체로 변환해 히스토리의 상태에 저장!
  interface Query {
    [acc: string]: string
  }
  const query: Query = queryString
    .split('&')
    .reduce((acc, cur) => {
      const [key, value] = cur.split('=')
      acc[key] = value  // 요소에 암시적으로 'any' 형식이 있습니다.
      return acc
    }, {} as Query)     // Query로 단언함
  history.replaceState(query, '') // (상태, 제목)

  // 2) 현재 라우트 정보를 찾아서 렌더링!
  const currentRoute = routes.find(route => new RegExp(`${route.path}/?$`).test(hash))
  if (routerView) { // routerView가 null이라면 .innerHTML='' 코드를 사용할 곳이 없음
    routerView.innerHTML = '' // 타입 가드 사용
    // .find() 값이 없으면 return undefined - 그래서 에러남
    if (currentRoute) {
      routerView.append(new currentRoute.component().el)
    }
    // or currentRoute && routerView.append(new currentRoute.component().el)
  }  
  // 3) 화면 출력 후 스크롤 위치 복구!
  window.scrollTo(0, 0)
}
export function createRouter(routes: Routes) {
  // 원하는(필요한) 곳에서 호출할 수 있도록 함수 데이터를 반환!
  return function () {
    window.addEventListener('popstate', () => {
      routeRender(routes)
    })
    routeRender(routes)
  }
}

///// Store /////
interface StoreObservers {
  [key: string]: subscribeCallback[]
}
interface subscribeCallback {
  (arg: unknown): void
}
// 타입 변수에 맞게 
export class Store<S> {
  state = {} as S                 // 외부에서 사용 - 상태(데이터)
  private observers = {} as StoreObservers  // 내부에서만 사용 
  constructor(state: S) {
    for (const key in state) {
      // 각 상태에 대한 변경 감시(Setter) 설정!
      Object.defineProperty(this.state, key, {
        // Getter
        get: () => state[key],
        // Setter
        set: val => {
          state[key] = val
          if (Array.isArray(this.observers[key])) { // 호출할 콜백이 있는 경우!
            this.observers[key].forEach(observer => observer(val))
          }
        }
      })
    }
  }
  // 상태 변경 구독!
  subscribe(key:string , cb: subscribeCallback) {
    Array.isArray(this.observers[key]) // 이미 등록된 콜백이 있는지 확인!
      ? this.observers[key].push(cb) // 있으면 새로운 콜백 밀어넣기!
      : this.observers[key] = [cb] // 없으면 콜백 배열로 할당!

    // 예시)
    // observers = {
    //   구독할상태이름: [실행할콜백1, 실행할콜백2]
    //   movies: [cb, cb, cb],
    //   message: [cb]
    // }
  }
}







