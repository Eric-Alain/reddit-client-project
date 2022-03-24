import { config, library } from '@fortawesome/fontawesome-svg-core'
import { faGithub, faRedditSquare } from '@fortawesome/free-brands-svg-icons'
import { faCalendarDays, faMessage } from '@fortawesome/free-regular-svg-icons'
import { faAngleDown, faAngleUp, faArrowUp, faBars, faList, faMoon, faSearch, faSun, faTimes, faWandMagicSparkles, faXmark } from '@fortawesome/free-solid-svg-icons'

const registerIcons = () => {
  config.autoAddCss = false
  library.add(
    faAngleDown,
    faAngleUp,
    faArrowUp,
    faBars,
    faCalendarDays,
    faGithub,
    faList,
    faMessage,
    faMoon,
    faRedditSquare,
    faSearch,
    faSun,
    faTimes,
    faWandMagicSparkles,
    faXmark
  )
}

export default registerIcons
