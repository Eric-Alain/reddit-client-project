import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const animations = refs => {
  gsap.registerPlugin(ScrollTrigger)

  refs.forEach((el) => {
    gsap.fromTo(
      el.querySelector('.thread-img'),
      {
        autoAlpha: 0
      },
      {
        duration: 1,
        autoAlpha: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'top center',
          scrub: true,
          toggleActions: 'play none none reverse',
          invalidateOnRefresh: true
        }
      }
    )
  })
}
