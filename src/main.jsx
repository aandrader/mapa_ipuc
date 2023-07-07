import "leaflet/dist/leaflet.css";
import * as bootstrap from 'bootstrap'
import ReactDOM from 'react-dom/client'
import App from './routes/App.jsx'
import './app.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>,
)
