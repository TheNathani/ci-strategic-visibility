import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Ion } from 'cesium'
import './styles/global.css'
import App from './App'

// Free Cesium Ion default token - sign up at cesium.com/ion for your own
Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjNjUyNjcxOC02NjhhLTQ0ZjItOGVmNi0xNDI0NTRhNjljMTAiLCJpZCI6MjY1MTM0LCJpYXQiOjE3MzQ4ODMwMDF9.placeholder'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
