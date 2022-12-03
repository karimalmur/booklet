import * as React from 'react'
import {
  ThemeProvider as MuiThemeProvider,
  createTheme as createLegacyModeTheme,
  unstable_createMuiStrictModeTheme as createStrictModeTheme,
} from '@mui/material/styles'
import { deepmerge } from '@mui/utils'
import useMediaQuery from '@mui/material/useMediaQuery'
import { enUS, deDE, Localization } from '@mui/material/locale'
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/material/utils'
import { getDesignTokens, getMetaThemeColor, getThemedComponents } from 'theme/theme'
import { UserLanguage, useUserLanguage } from 'core/i18n'
import { getCookie } from 'core/helpers'

interface LanguageMap {
  language: UserLanguage
  localization: Localization
}

const languageMap: LanguageMap[] = [
  {
    language: 'en',
    localization: enUS,
  },
]

const themeInitialOptions = {
  dense: false,
  direction: 'ltr',
  paletteColors: {},
  spacing: 8, // spacing unit
  paletteMode: 'light',
}

export const highDensity = {
  components: {
    MuiButton: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiFilledInput: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiFormControl: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiFormHelperText: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiInputBase: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiInputLabel: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiListItem: {
      defaultProps: {
        dense: true,
      },
    },
    MuiOutlinedInput: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiFab: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiTable: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiTextField: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiToolbar: {
      defaultProps: {
        variant: 'dense',
      },
    },
  },
}

export const DispatchContext = React.createContext<any>(() => {
  throw new Error('Forgot to wrap component in `ThemeProvider`')
})

if (process.env.NODE_ENV !== 'production') {
  DispatchContext.displayName = 'ThemeDispatchContext'
}

const createTheme = process.env.REACT_STRICT_MODE ? createStrictModeTheme : createLegacyModeTheme

interface ThemeProviderProps {
  children: React.ReactNode
}

export function ThemeProvider(props: ThemeProviderProps) {
  const { children } = props
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const preferredMode = prefersDarkMode ? 'dark' : 'light'

  const [themeOptions, dispatch] = React.useReducer(
    (state: any, action: any) => {
      switch (action.type) {
        case 'SET_SPACING':
          return {
            ...state,
            spacing: action.payload,
          }
        case 'INCREASE_SPACING': {
          return {
            ...state,
            spacing: state.spacing + 1,
          }
        }
        case 'DECREASE_SPACING': {
          return {
            ...state,
            spacing: state.spacing - 1,
          }
        }
        case 'SET_DENSE':
          return {
            ...state,
            dense: action.payload,
          }
        case 'RESET_DENSITY':
          return {
            ...state,
            dense: themeInitialOptions.dense,
            spacing: themeInitialOptions.spacing,
          }
        case 'RESET_COLORS':
          return {
            ...state,
            paletteColors: themeInitialOptions.paletteColors,
          }
        case 'CHANGE':
          return {
            ...state,
            paletteMode: action.payload.paletteMode || state.paletteMode,
            direction: action.payload.direction || state.direction,
            paletteColors: action.payload.paletteColors || state.paletteColors,
          }
        default:
          throw new Error(`Unrecognized type ${action.type}`)
      }
    },
    { ...themeInitialOptions, paletteMode: preferredMode },
  )

  const userLanguage = useUserLanguage()
  const { dense, direction, paletteColors, paletteMode, spacing } = themeOptions

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const nextPaletteColors = JSON.parse(getCookie('paletteColors') || 'null')
      const nextPaletteMode = getCookie('paletteMode') || preferredMode

      dispatch({
        type: 'CHANGE',
        payload: { paletteColors: nextPaletteColors, paletteMode: nextPaletteMode },
      })
    }
  }, [preferredMode])

  useEnhancedEffect(() => {
    document.body.dir = direction
  }, [direction])

  React.useEffect(() => {
    const metas = document.querySelectorAll('meta[name="theme-color"]')
    metas.forEach((meta) => {
      meta.setAttribute('content', getMetaThemeColor(paletteMode))
    })
  }, [paletteMode])

  const theme = React.useMemo(() => {
    const brandingDesignTokens = getDesignTokens(paletteMode)
    const nextPalette = deepmerge(brandingDesignTokens.palette, paletteColors)
    let nextTheme = createTheme(
      {
        direction,
        ...brandingDesignTokens,
        nprogress: {
          color: (brandingDesignTokens.palette?.primary as any)?.main,
        },
        palette: {
          ...nextPalette,
          mode: paletteMode,
        },
        spacing,
      },
      dense ? highDensity : {},
      {
        components: {
          MuiCssBaseline: {
            defaultProps: {
              enableColorScheme: true,
            },
          },
        },
      },
      languageMap.find((x) => x.language === userLanguage)!.localization,
    )

    nextTheme = deepmerge(nextTheme, getThemedComponents(nextTheme))

    return nextTheme
  }, [dense, direction, paletteColors, paletteMode, spacing, userLanguage])

  React.useEffect(() => {
    // Expose the theme as a global variable so people can play with it.
    if (typeof window !== 'undefined') {
      ;(window as any).theme = theme
      ;(window as any).createTheme = createTheme
    }
  }, [theme])

  useEnhancedEffect(() => {
    if (theme.palette.mode === 'dark') {
      document.body.classList.remove('mode-light')
      document.body.classList.add('mode-dark')
    } else {
      document.body.classList.remove('mode-dark')
      document.body.classList.add('mode-light')
    }
  }, [theme.palette.mode])

  return (
    <MuiThemeProvider theme={theme}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </MuiThemeProvider>
  )
}

/**
 * @returns {(nextOptions: Partial<typeof themeInitialOptions>) => void}
 */
export function useChangeTheme() {
  const dispatch = React.useContext(DispatchContext)
  return React.useCallback((options: any) => dispatch({ type: 'CHANGE', payload: options }), [dispatch])
}
