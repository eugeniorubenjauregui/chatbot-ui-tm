import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProviderWrapper } from './contexts/ThemeContext';

const searchDomElement = setInterval(()=>{

  const domRootElement = document.getElementById('delectable_ai');

  if(domRootElement){

    const root = ReactDOM.createRoot(document.getElementById('delectable_ai'));

    root.render(
      <React.StrictMode>
        <AuthProvider>
          <ThemeProviderWrapper>
            <App user={domRootElement.dataset.user}/>
          </ThemeProviderWrapper>
        </AuthProvider>
      </React.StrictMode>
    );

    clearInterval(searchDomElement);
  }

},500)




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
