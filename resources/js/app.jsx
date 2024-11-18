import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import GlobalStyles from './components/GlobalStyles';

const app = ReactDOM.createRoot(document.getElementById('app'));
app.render(
    <React.StrictMode>
        <GlobalStyles>
            <App />
        </GlobalStyles>
    </React.StrictMode>,
);
