import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core'

import theme from 'styles/theme'

const AppThemeProvider: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider value="dark">
        <CSSReset />
        { children }
      </ColorModeProvider>
    </ThemeProvider>
  )
}

export default AppThemeProvider