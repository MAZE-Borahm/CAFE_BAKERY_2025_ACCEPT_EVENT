import { BrowserRouter } from 'react-router-dom'
import PageRouter from '@/navigations/Router'
import GlobalStyle from '@/styles/globalStyle'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.VITE_PUBLIC_URL}>
      <GlobalStyle />
      <PageRouter />
    </BrowserRouter>
  )
}

export default App
