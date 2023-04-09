import { Component } from "../core/core"

interface State {
  // 객체 안에 배열이 있으면 인덱싱이 가능하도록 추가
  // 밑에 구문이 없으면
  // '{ [key: string]: unknown; }' 형식에 할당할 수 없습니다.
  [key: string]: unknown
  menus: {
    name: string,
    href: string
  }[]
}

export default class TheHeader extends Component {
  // 명확한 할당 단언
  // 초기화를 하지 않았지만 할당이 된 것처럼 선언
  state!: State
  constructor() {
    super({
      tagName: 'header',
      state: {
        menus: [
          {
            name: 'Search',
            href: '#/'
          },
          {
            name: 'Movie',
            href: '#/movie?id=tt4520988'
          },
          {
            name: 'About',
            href: '#/about'
          },
        ]
      }
    })

    // 페이지가 바뀔때마다 동작하는 이벤트
    window.addEventListener('popstate', (event) => {
      this.render()
    })
  }

  render() {
    this.el.innerHTML = /* html */ `
      <a href="#/" class="logo"><span>OMDbAPI</span>.COM</a>
      <nav>
        <ul>
          ${this.state.menus
            .map(menu => {
              const href = menu.href.split('?')[0]      // ?가 없으면 전체 다 0번째 배열 ex) #/about
              const hash = location.hash.split('?')[0]  // 도메인을 뺸 나머지
              const isActive = href === hash
              return /* html */ `
                <li>
                  <a href="${menu.href}" class="${isActive ? 'active' : ''}">
                    ${menu.name}
                  </a>
                </li>
              `
            })
            .join('')}
        </ul>
      </nav>
      <a href="#/about">
        <img class="user" src="https://heropy.blog/css/images/logo.png" alt="user" />
      </a>
    `
  }
}


