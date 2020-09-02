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
    green: {
      ...theme.colors.green,
      '400': '#25D366'
    }
  },
  icons: {
    ...theme.icons,
  }
}

export default customTheme