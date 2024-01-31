import gsap from "gsap"
import { $App } from ".."
import { ScrollTrigger, TextPlugin } from "gsap/all"
import Reveal from "../classes/reveal"

gsap.registerPlugin(TextPlugin, ScrollTrigger)

gsap.registerEffect({
  name: "counter",
  extendTimeline: true,
  defaults: {
    end: 0,
    duration: 0.5,
    ease: "power1",
    increment: 1,
  },
  effect: (
    targets: HTMLElement,
    config: { duration: number; end: "number"; increment: number; ease: string }
  ) => {
    let tl = gsap.timeline()
    let num = targets[0].innerText.replace(/\,/g, "")
    targets[0].innerText = num
    tl.to(
      targets,
      {
        duration: config.duration,
        innerText: config.end,
        snap: {
          innerText: config.increment,
        },
        modifiers: {
          innerText: function (innerText) {
            return Math.floor(gsap.utils.snap(config.increment, innerText))
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          },
        },
        ease: config.ease,
      },
      0
    )
    return tl
  },
})

export default class Home {
  app: $App
  firstReveal: boolean
  slides: NodeListOf<Element>
  reveal: Reveal
  constructor(app: $App) {
    this.app = app
  }

  create() {
    this.createIntro()
    this.createModes()
    this.createNav()
    this.createExpand()
    this.createTestimonial()
    this.createHero()
    this.createReveal()
    this.countUp01()

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

  countUp01() {
    ScrollTrigger.create({
      trigger: ".home__meso",
      start: "25% 75%",
      animation: gsap
        .timeline({
          onComplete: () => {
            window.$(".home__meso__stat:nth-of-type(3) h3 i").innerText =
              window.cap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            window.$(".home__meso__stat:nth-of-type(1) h3 i").innerText =
              window.volume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          },
        })
        .counter(
          ".home__meso__stat:nth-of-type(1) h3 i",
          {
            end: window.volume.toFixed(),
            duration: 1.2,
            ease: "steps(10)",
          },
          0
        )
        .counter(
          ".home__meso__stat:nth-of-type(2) h3 i",
          {
            end: 10,
            duration: 1.2,
            dellay: 0.5,
            ease: "steps(10)",
          },
          0
        )
        .counter(
          ".home__meso__stat:nth-of-type(3) h3 i",
          {
            end: window.cap.toFixed(),
            duration: 1.5,
            dellay: 1,
            ease: "steps(10)",
          },
          0
        ),
    })
  }

  createReveal() {
    this.firstReveal = true
    this.slides = document.querySelectorAll("[data-slide]")
    this.reveal = new Reveal(this, { elements: "[data-slide]" })
  }

  revealIn(x: { index: number }) {
    if (this.firstReveal) {
      this.firstReveal = false
      gsap.utils
        .toArray(this.slides)
        .slice(0, Number(x.index))
        .forEach((el: HTMLElement) => {
          this.reveal.observer.unobserve(el)
          el.style.opacity = "1"
        })
    } else {
      gsap
        .timeline({ delay: 0.2 })
        .fromTo(
          this.slides[Number(x.index - 1)],
          { opacity: 0 },
          { opacity: 1, duration: 0.75, ease: "ease.out" }
        )
        .fromTo(
          this.slides[Number(x.index - 1)],
          { y: "3.5rem" },
          { y: "0rem", duration: 1.3, ease: "expo" },
          "<"
        )
    }
    this.firstReveal = false
  }

  revealOut() {}

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
          value: `There are no limits, integrate anywhere; in minutes.`,
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
