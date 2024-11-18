import './bootstrap';
import App from './app/App';

const app = ReactDOM.createRoot(document.getElementById('app'));
app.render(
    <React.StrictMode>
        {/* <GlobalStyles> */}
        <App />
        {/* </GlobalStyles> */}
    </React.StrictMode>,
);
