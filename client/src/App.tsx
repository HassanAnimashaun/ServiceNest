import { Routes, Route } from 'react-router-dom'
import AuthPage from './pages/AuthPage'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<AuthPage />} />
    </Routes>
  )
}

export default App
