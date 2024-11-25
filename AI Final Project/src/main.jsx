import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import FileUpload from './components/FileUpload.jsx';
import './i18n'; // Import the i18n configuration
import EmailAnalysisForm from './components/EmailAnalysisForm.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <EmailAnalysisForm />
    <FileUpload/>
  </StrictMode>
)
