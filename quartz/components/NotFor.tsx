import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
 
interface NotForOptions {
  /**
   * The titles to look for
   */
  titles: string[];
}
 
export default ((opts?: Partial<NotForOptions>, component?: QuartzComponent) => {
  if (component) {
    const Component = component
    function NotFor(props: QuartzComponentProps) {
      return opts?.titles?.some(title => props.fileData.frontmatter?.title === title) ? 
			<></>:
		    <Component {...props} />;
    }
 
    NotFor.displayName = component.displayName
    NotFor.afterDOMLoaded = component.afterDOMLoaded
    NotFor.beforeDOMLoaded = component.beforeDOMLoaded
    NotFor.css = component.css
    return NotFor
  } else {
    return () => <></>
  }
}) satisfies QuartzComponentConstructor
