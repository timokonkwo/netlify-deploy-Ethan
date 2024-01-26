import gsap from "gsap"
import { $App } from ".."
import { TextPlugin } from "gsap/all"

gsap.registerPlugin(TextPlugin)

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
    this.createTestimonial()
    this.createHero()

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

  createHero() {
    const tl = gsap
      .timeline()
      .set(".home__hero__chats", { autoAlpha: 1 })
      .set(".home__hero__chat", { maxHeight: "0rem" })
      .to(".home__hero__chat:nth-of-type(1)", { maxHeight: "50rem" })
      .to(".home__hero__chat:nth-of-type(1)", { overflow: "unset" })
      .to(".home__hero__chat:nth-of-type(1) p i", {
        text: {
          value: `Make a bot to automatically provide crypto insights and analytics.`,
        },
        duration: 5,
        delay: 0.2,
        ease: "none",
      })

      .to(".home__hero__chat:nth-of-type(2)", { maxHeight: "50rem" })
      .to(".home__hero__chat:nth-of-type(2)", { overflow: "unset" })
      .to(".home__hero__chat:nth-of-type(2) p:nth-of-type(1)", {
        display: "flex",
        delay: 0.2,
      })
      .to(".home__hero__chat:nth-of-type(2) p:nth-of-type(1) i", {
        text: {
          value: `Creating Bot..`,
        },
        duration: 0.5,
        delay: 0.1,
        ease: "none",
      })
      .to(".home__hero__chat:nth-of-type(2) p:nth-of-type(2)", {
        display: "flex",
        delay: 0.2,
      })
      .to(".home__hero__chat:nth-of-type(2) p:nth-of-type(2) i", {
        text: {
          value: `Integrating with Telegram`,
        },
        duration: 0.5,
        delay: 0.1,
        ease: "none",
      })
      .to(".home__hero__chat:nth-of-type(2) p:nth-of-type(3)", {
        display: "flex",
        delay: 0.2,
      })
      .to(".home__hero__chat:nth-of-type(2) p:nth-of-type(3) i", {
        text: {
          value: `Integrating with Discord`,
        },
        duration: 0.5,
        delay: 0.1,
        ease: "none",
      })
      .to(".home__hero__chat:nth-of-type(2) p:nth-of-type(4)", {
        display: "flex",
        delay: 0.2,
      })
      .to(".home__hero__chat:nth-of-type(2) p:nth-of-type(4) i", {
        text: {
          value: `Analyzing Data`,
        },
        duration: 0.5,
        delay: 0.1,
        ease: "none",
      })

      .to(".home__hero__chat:nth-of-type(3)", { maxHeight: "50rem" })
      .to(".home__hero__chat:nth-of-type(3)", { overflow: "unset" })
      .to(".home__hero__chat:nth-of-type(3) p", {
        text: {
          value: `What Bot can I create next????`,
        },
        duration: 3.75,
        delay: 1,
        ease: "none",
      })

      .to(".home__hero__chat:nth-of-type(4)", { maxHeight: "50rem" })
      .to(".home__hero__chat:nth-of-type(4)", { overflow: "unset" })
      .to(".home__hero__chat:nth-of-type(4) p", {
        text: {
          value: `There is no limits, integrate anywhere; in minutes.`,
        },
        duration: 2.5,
        delay: 1,
        ease: "none",
      })

    tl.timeScale(2)
  }

  createTestimonial() {
    const images = window.$$(".home__hero__clients img")
    if (innerWidth < 768) return

    gsap.fromTo(
      images,
      { x: "0rem" },
      { x: "-156.8rem", duration: 15, ease: "linear", repeat: -1 }
    )
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
