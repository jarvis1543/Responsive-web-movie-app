import { Component } from "../core/core"
import aboutStore from "../store/About"

export default class TheFooter extends Component {
  constructor() {
    super({
      tagName: 'footer'
    })
  }

  render() {
    console.log(aboutStore.state)
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


