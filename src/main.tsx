import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import reducer from './reducers/index.ts';

const store = configureStore({
  reducer,
  middleware: applyMiddleware(thunkMiddleware)
});
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
