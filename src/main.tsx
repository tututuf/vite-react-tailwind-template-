import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import store from './store/index.ts';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
);

function updateRootFontSize() {
  document.documentElement.style.fontSize = window.innerWidth / 100 + 'px';
}
updateRootFontSize();
window.onresize = updateRootFontSize;
