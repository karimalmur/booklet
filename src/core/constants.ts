// Valid languages to server-side render in production
export const LANGUAGES = ['en']

// Server side rendered languages
export const LANGUAGES_SSR = ['en']

export interface Language {
  code: string
  text: string
}

// Valid languages to use in production
export const LANGUAGES_LABEL: Language[] = [
  {
    code: 'en',
    text: 'English',
  },
]
