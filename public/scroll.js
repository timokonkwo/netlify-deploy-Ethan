new AnimationScroll({
  selector:
    ".home__hero__supporters, .home__hero__video, .home__hero__clients, .home__meso, .home__meso__meso, .home__meso__stats div, .home__meso__bg, .home__meso__intro, .home__meso__title, .home__meso__item, .home__step__media, .home__step > div, .home__steps__ad, .home__steps__stats, .home__outro",
  trigger: 0,
  transform: "-50yrem",
  easing: "ease-in-out",
  duration: 0.35,
  onLoad: false,
  scrollSpeed: 0.5,
  pauseOnScroll: true,
})

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.4,
}

// IMAGE ANIMATION

let revealCallback = (entries) => {
  entries.forEach((entry) => {
    let container = entry.target

    if (entry.isIntersecting) {
      container.classList.add("animating")
      return
    }

    if (entry.boundingClientRect.top > 0) {
      container.classList.remove("animating")
    }
  })
}

let revealObserver = new IntersectionObserver(revealCallback, options)

document.querySelectorAll("figure img").forEach((reveal) => {
  revealObserver.observe(reveal)
})
