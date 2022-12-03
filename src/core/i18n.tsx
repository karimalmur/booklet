import * as React from 'react'

import { en } from 'make-plural/plurals'
import { I18n } from '@lingui/core'
import { LANGUAGES } from './constants'

// announce which locales we are going to use and connect them to appropriate plural rules
export function initTranslation(i18n: I18n) {
  i18n.loadLocaleData({
    en: { plurals: en },
    pseudo: { plurals: en },
  })
}

export type UserLanguage = 'en'

export type UserLanguageContextType = {
  userLanguage: UserLanguage
  setUserLanguage: (language: UserLanguage) => void
}

const UserLanguageContext: React.Context<UserLanguageContextType> = React.createContext<UserLanguageContextType>({
  userLanguage: 'en',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUserLanguage: () => {},
})
if (!import.meta.env.PROD) {
  UserLanguageContext.displayName = 'UserLanguage'
}

export function UserLanguageProvider(props: UserLanguageProviderProps) {
  const { children, defaultUserLanguage } = props

  const [userLanguage, setUserLanguage] = React.useState(defaultUserLanguage)

  const contextValue = React.useMemo(() => {
    return { userLanguage, setUserLanguage }
  }, [userLanguage])

  return <UserLanguageContext.Provider value={contextValue}>{children}</UserLanguageContext.Provider>
}

export interface UserLanguageProviderProps {
  children: React.ReactNode
  defaultUserLanguage: UserLanguage
}

export function useUserLanguage() {
  return React.useContext(UserLanguageContext).userLanguage
}

export function useSetUserLanguage() {
  return React.useContext(UserLanguageContext).setUserLanguage
}

/**
 * as is a reference to Next.js's as, the path in the URL
 * pathname is a reference to Next.js's pathname, the name of page in the filesystem
 * https://nextjs.org/docs/api-reference/next/router
 */
export function pathnameToLanguage(pathname: string): {
  userLanguage: UserLanguage
  canonicalAs: string
  canonicalPathname: string
} {
  let userLanguage: UserLanguage
  const userLanguageCandidate = pathname.substring(1, 3)

  if (LANGUAGES.indexOf(userLanguageCandidate) !== -1 && pathname.indexOf(`/${userLanguageCandidate}/`) === 0) {
    userLanguage = userLanguageCandidate as UserLanguage
  } else {
    userLanguage = 'en'
  }

  const canonicalAs = userLanguage === 'en' ? pathname : pathname.substring(3)
  const canonicalPathname = canonicalAs
    .replace(/^\/api/, '/api-docs')
    .replace(/#(.*)$/, '')
    .replace(/\/$/, '')

  return {
    userLanguage,
    canonicalAs,
    canonicalPathname,
  }
}

export async function loadTranslation(locale: string, isProduction = true) {
  let data
  if (isProduction) {
    data = await import(`/locale/${locale}/messages`)
  } else {
    data = await import(`@lingui/loader!/locale/${locale}/messages.po`)
  }

  return data.messages
}
