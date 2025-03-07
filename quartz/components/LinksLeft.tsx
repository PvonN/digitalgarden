import { QuartzComponentConstructor } from "./types"
import style from "./styles/linksLeft.scss"

interface Options {
  links: Record<string, string>
}

export default (() => {
  function LinksLeft() {
    return (
      <div>
        <div id="links-left">
          <span>
            <a href="https://von-neumann.com/digitalgarden">Mycelium</a>
          </span>
          <span>
            <a href="/Sciujo/MAC/MAC">Vita</a>
          </span>
          <span>
            <a href="/Sciujo/Sciujo">Works</a>
          </span>
          <span>
            <a href="/Lingvujo/Lingvujo">Contact</a>
          </span>
          <span>
            <a href="/Sciujo/Mathematics">Social</a>
          </span>
        </div>
      <hr style="background-color: var(--gray); border-top: 1px var(--gray) solid; margin-top: 1.3rem"></hr>
      </div>
    )
  }

  LinksLeft.css = style
  return LinksLeft 
}) satisfies QuartzComponentConstructor
