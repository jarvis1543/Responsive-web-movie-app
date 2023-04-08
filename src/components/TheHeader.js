import { Component } from "../core/core"

export default class TheHeader extends Component {
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

    window.addEventListener('popstate', (event) => {  // 페이지가 바뀔때마다 동작하는 이벤트
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


