import { Routes, Route, Navigate } from 'react-router-dom'
import { TopBar } from './layout/TopBar'
import { ProofFooter } from './layout/ProofFooter'
import { PlaceholderPage } from './pages/PlaceholderPage'
import { NotFoundPage } from './pages/NotFoundPage'

function App() {
  return (
    <>
      <TopBar />

      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<PlaceholderPage title="Dashboard" />} />
        <Route path="/saved" element={<PlaceholderPage title="Saved" />} />
        <Route path="/digest" element={<PlaceholderPage title="Digest" />} />
        <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
        <Route path="/proof" element={<PlaceholderPage title="Proof" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <ProofFooter />
    </>
  )
}

export default App