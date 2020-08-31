import { theme, DefaultTheme, CustomTheme } from "@chakra-ui/core"

const customTheme: DefaultTheme = {
  ...theme,
  fonts: {
    body: 'Roboto, system-ui, sans-serif',
    heading: 'Roboto, system-ui, sans-serif',
    mono: 'Menlo, monospace'
  },
  radii: {
    ...theme.radii,
    sm: '5px',
    md: '8px'
  },
  colors: {
    ...theme.colors,
    blue: {
      ...theme.colors.blue,
      '300': '#7289DA'
    }
  },
 
}

export default customTheme