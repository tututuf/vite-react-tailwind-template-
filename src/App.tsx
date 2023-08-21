import './App.css'
import { RouterProvider } from 'react-router'
// import { StrictMode } from 'react'
import router from './router'

function App() {
  return (
    <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
  )
}

export default App
