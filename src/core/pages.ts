interface AppPage {
  pathname: string
  children?: AppPage[]
  disableDrawer?: boolean
  icon?: string
  /**
   * In case the children have pathnames out of pathname value, use this field to scope other pathnames.
   * Pathname can be partial, e.g. '/components/' will cover '/components/button/' and '/components/link/'.
   */
  scopePathnames?: string[]
  /**
   * Pages are considered to be ordered depth-first.
   * If a page should be excluded from this order, set `order: false`.
   * You want to set `inSideNav: false` if you don't want the page to appear in an ordered list e.g. for previous/next page navigation.
   */
  inSideNav?: boolean
  /**
   * Props spread to the Link component
   */
  linkProps?: Record<string, unknown>
  subheader?: string
  /**
   * Overrides the default page title.
   */
  title?: string
}

interface OrderedAppPage extends AppPage {
  ordered?: true
}

const pages: readonly AppPage[] = [
  {
    pathname: '/getting-started',
    icon: 'DescriptionIcon',
    children: []
  },
  {
    pathname: '/app',
    icon: 'DescriptionIcon',
    children: []
  },
  {
    pathname: '/connect',
    icon: 'DescriptionIcon',
    children: []
  }
]

export type { AppPage, OrderedAppPage }
export default pages
