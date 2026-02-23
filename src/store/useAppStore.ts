import { create } from 'zustand'

export type DrillLevel = 'globe' | 'campus' | 'vsm' | 'gemba' | 'kaizen' | 'bowler' | 'impact'
export type ThemeMode = 'normal' | 'flir'

interface AppState {
  currentLevel: DrillLevel
  activeLocationId: string | null
  activeFunctionalAreaId: string | null
  activeVSMStepId: string | null
  themeMode: ThemeMode
  showImpact: boolean
  isTransitioning: boolean

  drillTo: (level: DrillLevel, payload?: {
    locationId?: string
    functionalAreaId?: string
    vsmStepId?: string
  }) => void
  goBack: () => void
  toggleTheme: () => void
  toggleImpact: () => void
  setTransitioning: (v: boolean) => void
}

export const useAppStore = create<AppState>((set, get) => ({
  currentLevel: 'globe',
  activeLocationId: null,
  activeFunctionalAreaId: null,
  activeVSMStepId: null,
  themeMode: 'normal',
  showImpact: false,
  isTransitioning: false,

  drillTo: (level, payload) => {
    set({
      currentLevel: level,
      ...(payload?.locationId !== undefined && { activeLocationId: payload.locationId }),
      ...(payload?.functionalAreaId !== undefined && { activeFunctionalAreaId: payload.functionalAreaId }),
      ...(payload?.vsmStepId !== undefined && { activeVSMStepId: payload.vsmStepId }),
    })
  },

  goBack: () => {
    const { currentLevel } = get()
    const backMap: Record<DrillLevel, DrillLevel> = {
      globe: 'globe',
      campus: 'globe',
      vsm: 'campus',
      gemba: 'vsm',
      kaizen: 'vsm',
      bowler: 'vsm',
      impact: 'globe',
    }
    const nextLevel = backMap[currentLevel]
    set({
      currentLevel: nextLevel,
      ...(nextLevel === 'globe' && { activeLocationId: null, activeFunctionalAreaId: null, activeVSMStepId: null }),
      ...(nextLevel === 'campus' && { activeFunctionalAreaId: null, activeVSMStepId: null }),
      ...(nextLevel === 'vsm' && { activeVSMStepId: null }),
    })
  },

  toggleTheme: () => {
    const next = get().themeMode === 'normal' ? 'flir' : 'normal'
    document.documentElement.dataset.theme = next
    set({ themeMode: next })
  },

  toggleImpact: () => set(s => ({ showImpact: !s.showImpact })),

  setTransitioning: (v) => set({ isTransitioning: v }),
}))
