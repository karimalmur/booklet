import * as React from 'react'
import clsx from 'clsx'
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link'
import { Url } from 'url'

export type LinkProps = {
  activeClassName?: string
  href: string | undefined
  as?: Url
  linkAs?: Url // Useful when the as prop is shallow by styled().
  noLinkStyle?: boolean
  locale?: string | false
  prefetch?: boolean
  replace?: boolean
  scroll?: boolean
  shallow?: boolean
} & Omit<MuiLinkProps, 'href'>

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(props, ref) {
  const { activeClassName = 'active', className: classNameProps, href, ...other } = props

  const className = clsx(classNameProps, {
    [activeClassName]: href && location.pathname === href && activeClassName,
  })

  return <MuiLink className={className} href={href} ref={ref} {...other} />
})

export default Link
