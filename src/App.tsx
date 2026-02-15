import { TopBar } from './layout/TopBar'
import { ContextHeader } from './layout/ContextHeader'
import { TwoColumnLayout } from './layout/TwoColumnLayout'
import { ProofFooter } from './layout/ProofFooter'

function App() {
  return (
    <>
      <TopBar />

      <ContextHeader
        title="Job Notification Tracker"
        description="Track, manage, and verify your job application workflows in one structured workspace."
      />

      <TwoColumnLayout
        leftContent={
          <div>
            Primary Workspace Area
          </div>
        }
        rightContent={
          <div>
            Secondary Panel
          </div>
        }
      />
      <ProofFooter />
    </>
  )
}

export default App