import { useAppStore } from './store/useAppStore'
import { HUDFrame } from './components/layout/HUDFrame'
import { CRTOverlay } from './components/layout/CRTOverlay'
import { GlobeView } from './components/globe/GlobeView'
import { CampusView } from './components/campus/CampusView'
import { ValueStreamMap } from './components/vsm/ValueStreamMap'
import { DigitalGemba } from './components/gemba/DigitalGemba'
import { KaizenTracker } from './components/kaizen/KaizenTracker'
import { BowlerScorecard } from './components/bowler/BowlerScorecard'
import { ImpactDashboard } from './components/impact/ImpactDashboard'

function CurrentView() {
  const { currentLevel, showImpact } = useAppStore()

  if (showImpact) return <ImpactDashboard />

  switch (currentLevel) {
    case 'globe':
      return <GlobeView />
    case 'campus':
      return <CampusView />
    case 'vsm':
      return <ValueStreamMap />
    case 'gemba':
      return <DigitalGemba />
    case 'kaizen':
      return <KaizenTracker />
    case 'bowler':
      return <BowlerScorecard />
    default:
      return <GlobeView />
  }
}

export default function App() {
  return (
    <>
      <HUDFrame>
        <CurrentView />
      </HUDFrame>
      <CRTOverlay />
    </>
  )
}
