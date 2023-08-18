import './App.css'
import { RouterProvider } from 'react-router'
import { StrictMode } from 'react'
import router from './router'

function App() {
  return (
    <StrictMode>
      <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
    </StrictMode>
  )
}

export default App
