// @mui
import { Breakpoint, useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

// ----------------------------------------------------------------------

export default function useResponsive(
  query: 'up' | 'down' | 'between' | 'only',
  key: number | Breakpoint,
  start: number | Breakpoint = 0,
  end: number | Breakpoint = 0,
) {
  const theme = useTheme()

  const mediaUp = useMediaQuery(theme.breakpoints.up(key))

  const mediaDown = useMediaQuery(theme.breakpoints.down(key))

  const mediaBetween = useMediaQuery(theme.breakpoints.between(start, end))

  const mediaOnly = useMediaQuery(
    typeof key === 'number'
      ? theme.breakpoints.between(key, key)
      : theme.breakpoints.only(key as Breakpoint),
  )

  if (query === 'up') {
    return mediaUp
  }

  if (query === 'down') {
    return mediaDown
  }

  if (query === 'between') {
    return mediaBetween
  }

  if (query === 'only') {
    return mediaOnly
  }
  return null
}
