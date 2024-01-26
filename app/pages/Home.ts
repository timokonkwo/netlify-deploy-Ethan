import { $App } from ".."

export default class Home {
  app: $App
  constructor(app: $App) {
    this.app = app
  }

  create() {
    this.createIntro()
    this.createModes()
    this.createNav()
    this.createPlay()
    this.createExpand()

    const menu = window.$(".menu")

    document.querySelectorAll('a[href^="#"]').forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault()
        const id = el.getAttribute("href")?.slice(1)
        if (!id) return
        const target = document.getElementById(id)
        if (target) {
          target.scrollIntoView({ behavior: "smooth" })
          menu.classList.remove("active")
        }
      })
    })
  }
  createExpand() {
    const btn = window.$(".home__outro__more")
    const article = window.$(".home__outro__article")
    const figure = window.$(".home__outro__figure")
    const shadow = window.$(".home__outro__shadow")
    const text = window.$(".home__outro__details")

    btn.onclick = () => {
      shadow.style.display = "none"
      btn.style.display = "none"
      text.style.height = "unset"
      article.style.height = "119.5rem"
      figure.style.top = "85rem"
    }
  }
  createPlay() {
    const btn = window.$(".home__hero__video svg")
    const video = window.$(
      ".home__hero__video video"
    ) as unknown as HTMLVideoElement

    btn.onclick = () => {
      btn.classList.add("active")
      video.classList.add("active")
      video.controls = true
      video.play()
    }
  }

  createNav() {
    const btns = window.$$(".menu button, .header__menu__open")
    const menu = window.$(".menu")
    btns.forEach((btn) => (btn.onclick = () => menu.classList.toggle("active")))
  }

  createModes() {
    const btn = window.$(".header__menu__toggle")
    btn.onclick = () => document.documentElement.classList.toggle("dark")
  }

  createIntro() {
    const intro = window.$(".header__intro")
    intro.querySelector("svg").onclick = () => (intro.style.display = "none")
  }

  resize() {}

  destroy() {}

  navigate() {}
}
