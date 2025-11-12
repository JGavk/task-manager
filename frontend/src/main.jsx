import { BrowserRouter, Route, Routes  } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Layout from './layout/layout.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter> 
  <Layout>
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  </Layout>
  </BrowserRouter>,
)
