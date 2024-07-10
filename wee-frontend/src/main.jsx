import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import GlobalStyles from './styles/global';
ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <GlobalStyles />
    <App />
  </>
);
