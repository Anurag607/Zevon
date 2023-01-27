import '../src/styles/globals.css'
import React from 'react'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Cookie from 'js-cookie'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  /* eslint-disable */

  React.useEffect(() => {
    const handleRouteChange = (url: URL, {shallow}) => {
      Cookie.remove('selectedParams', { path: '' })
    }

    router.events.on('routeChangeStart', handleRouteChange)
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])

  /* eslint-enable */

  return (
    <Component {...pageProps} />
  )
}

export default MyApp
