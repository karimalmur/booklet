import { AppPage } from './pages'

export function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') {
    throw new Error(
      'getCookie() is not supported on the server. Fallback to a different value when rendering on the server.',
    )
  }

  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    return parts[1].split(';').shift()
  }

  return undefined
}

export function pageToTitleI18n(page: AppPage): string | null {
  const path = page.subheader || page.pathname
  return path //TODO:
  // return t(`pages.${path}`, { ignoreWarning: true }) || pageToTitle(page);
}
