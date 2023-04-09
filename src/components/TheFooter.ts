import { Component } from "../core/core"
import aboutStore from "../store/about"

export default class TheFooter extends Component {
  constructor() {
    super({
      tagName: 'footer'
    })
  }

  render() {
    const { github, email } = aboutStore.state
    this.el.innerHTML = /* html */ `
      <div>
        <a href="${github}">
          github repository
        </a>
      </div>
      <div>
        <a href="${github}">
          ${new Date().getFullYear()}
          asdf
        </a>
      </div>
    `
  }
}


