import { Routes, Route } from 'react-router-dom'
import { TopBar } from './layout/TopBar'
import { ProofFooter } from './layout/ProofFooter'
import { LandingPage } from './pages/LandingPage'
import { DashboardPage } from './pages/DashboardPage'
import { SettingsPage } from './pages/SettingsPage'
import { SavedPage } from './pages/SavedPage'
import { DigestPage } from './pages/DigestPage'
import { ProofPage } from './pages/ProofPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { TestPage } from './pages/TestPage'
import { ShipPage } from './pages/ShipPage'

function App() {
  return (
    <>
      <TopBar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/saved" element={<SavedPage />} />
        <Route path="/digest" element={<DigestPage />} />
        <Route path="/proof" element={<ProofPage />} />
        <Route path="/jt/07-test" element={<TestPage />} />
        <Route path="/jt/08-ship" element={<ShipPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <ProofFooter />
    </>
  )
}

export default App