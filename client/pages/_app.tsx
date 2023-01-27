import '../src/styles/globals.css'
import React from 'react'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Cookie from 'js-cookie'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  React.useEffect(() => {
    const handleRouteChange = (url: URL, {shallow}) => {
      Cookie.remove('selectedParams', { path: '' })
    }

    router.events.on('routeChangeStart', handleRouteChange)
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])

  return (
    <Component {...pageProps} />
  )
}

export default MyApp
