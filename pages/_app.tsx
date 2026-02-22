import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '@/states/store'
import DefaultLayout from '@/layout/DefaultLayout'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </Provider>
  )
}
