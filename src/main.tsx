import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
)

function updateRootFontSize() {
  document.documentElement.style.fontSize = window.innerWidth / 100 + 'px'
}
updateRootFontSize()
window.onresize = updateRootFontSize
