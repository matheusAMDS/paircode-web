import { AppProps } from 'next/app'

import ThemeProvider from 'contexts/ThemeContext'
import { AuthProvider } from 'contexts/AuthContext'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      { process.browser ? (
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      ) : null}
    </ThemeProvider>
  )
}

export default App
