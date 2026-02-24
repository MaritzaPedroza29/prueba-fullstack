import '@/styles/globals.css'
import "swagger-ui-react/swagger-ui.css";
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '@/states/store'
import DefaultLayout from '@/layout/DefaultLayout'

// Componente raíz de Next.js (MyApp).
// Se ejecuta en todas las páginas y sirve para:
// - Importar estilos globales
// - Proveer el store de Redux a toda la aplicación
// - Envolver cada página dentro de un layout por defecto
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    // Provider de Redux: expone el store a todos los componentes
    <Provider store={store}>
      {/* Layout por defecto: define la estructura visual común */}
      <DefaultLayout>
        {/* Renderiza la página actual con sus props */}
        <Component {...pageProps} />
      </DefaultLayout>
    </Provider>
  )
}
