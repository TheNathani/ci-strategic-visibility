export interface VSMStep {
  id: string
  name: string
  shortName: string
  order: number
  processTimeHrs: number
  leadTimeDays: number
  queueDepth: number
  throughputPerDay: number
  defectRate: number
  isBottleneck: boolean
  owner: string
  wasteBreakdown: {
    waiting: number
    defects: number
    overprocessing: number
    motion: number
    transportation: number
    inventory: number
    overproduction: number
    skillsUnderutilized: number
  }
}

export const vsmSteps: VSMStep[] = [
  {
    id: 'requisition',
    name: 'Requisition Created',
    shortName: 'REQ',
    order: 0,
    processTimeHrs: 1,
    leadTimeDays: 3.2,
    queueDepth: 143,
    throughputPerDay: 45,
    defectRate: 5,
    isBottleneck: false,
    owner: 'Hiring Manager',
    wasteBreakdown: { waiting: 65, defects: 10, overprocessing: 15, motion: 5, transportation: 0, inventory: 0, overproduction: 0, skillsUnderutilized: 5 },
  },
  {
    id: 'sourcing',
    name: 'Sourcing & Pipeline',
    shortName: 'SRC',
    order: 1,
    processTimeHrs: 8,
    leadTimeDays: 5.1,
    queueDepth: 312,
    throughputPerDay: 62,
    defectRate: 3,
    isBottleneck: false,
    owner: 'Recruiter',
    wasteBreakdown: { waiting: 45, defects: 5, overprocessing: 20, motion: 10, transportation: 5, inventory: 5, overproduction: 5, skillsUnderutilized: 5 },
  },
  {
    id: 'ai-screen',
    name: 'AI Screening',
    shortName: 'AI',
    order: 2,
    processTimeHrs: 0.2,
    leadTimeDays: 0.3,
    queueDepth: 847,
    throughputPerDay: 500,
    defectRate: 18,
    isBottleneck: false,
    owner: 'Automated System',
    wasteBreakdown: { waiting: 10, defects: 40, overprocessing: 15, motion: 0, transportation: 0, inventory: 5, overproduction: 20, skillsUnderutilized: 10 },
  },
  {
    id: 'recruiter-review',
    name: 'Recruiter Review',
    shortName: 'REC',
    order: 3,
    processTimeHrs: 1,
    leadTimeDays: 4.8,
    queueDepth: 234,
    throughputPerDay: 48,
    defectRate: 8,
    isBottleneck: false,
    owner: 'Recruiter',
    wasteBreakdown: { waiting: 60, defects: 12, overprocessing: 10, motion: 8, transportation: 0, inventory: 5, overproduction: 0, skillsUnderutilized: 5 },
  },
  {
    id: 'hm-review',
    name: 'HM Review',
    shortName: 'HMR',
    order: 4,
    processTimeHrs: 0.5,
    leadTimeDays: 14.2,
    queueDepth: 567,
    throughputPerDay: 40,
    defectRate: 12,
    isBottleneck: true,
    owner: 'Hiring Manager',
    wasteBreakdown: { waiting: 85, defects: 5, overprocessing: 3, motion: 4, transportation: 0, inventory: 0, overproduction: 0, skillsUnderutilized: 3 },
  },
  {
    id: 'interview',
    name: 'Interview Loop',
    shortName: 'INT',
    order: 5,
    processTimeHrs: 6,
    leadTimeDays: 12.1,
    queueDepth: 89,
    throughputPerDay: 12,
    defectRate: 15,
    isBottleneck: true,
    owner: 'Interview Panel',
    wasteBreakdown: { waiting: 55, defects: 10, overprocessing: 15, motion: 10, transportation: 0, inventory: 0, overproduction: 5, skillsUnderutilized: 5 },
  },
  {
    id: 'debrief',
    name: 'Debrief & Decision',
    shortName: 'DEB',
    order: 6,
    processTimeHrs: 1,
    leadTimeDays: 3.4,
    queueDepth: 45,
    throughputPerDay: 15,
    defectRate: 5,
    isBottleneck: false,
    owner: 'Interview Panel',
    wasteBreakdown: { waiting: 55, defects: 10, overprocessing: 15, motion: 10, transportation: 0, inventory: 5, overproduction: 0, skillsUnderutilized: 5 },
  },
  {
    id: 'offer',
    name: 'Offer & Negotiation',
    shortName: 'OFR',
    order: 7,
    processTimeHrs: 3,
    leadTimeDays: 8.9,
    queueDepth: 28,
    throughputPerDay: 8,
    defectRate: 10,
    isBottleneck: false,
    owner: 'Recruiter / Compensation',
    wasteBreakdown: { waiting: 50, defects: 15, overprocessing: 15, motion: 5, transportation: 0, inventory: 5, overproduction: 5, skillsUnderutilized: 5 },
  },
  {
    id: 'onboarding',
    name: 'Onboarding Prep',
    shortName: 'ONB',
    order: 8,
    processTimeHrs: 4,
    leadTimeDays: 8.1,
    queueDepth: 134,
    throughputPerDay: 20,
    defectRate: 7,
    isBottleneck: false,
    owner: 'HR Operations',
    wasteBreakdown: { waiting: 45, defects: 10, overprocessing: 20, motion: 10, transportation: 5, inventory: 5, overproduction: 0, skillsUnderutilized: 5 },
  },
]

export function getVSMSummary() {
  const totalLeadTime = vsmSteps.reduce((sum, s) => sum + s.leadTimeDays, 0)
  const totalProcessTime = vsmSteps.reduce((sum, s) => sum + s.processTimeHrs / 24, 0)
  const efficiency = (totalProcessTime / totalLeadTime) * 100
  return {
    totalLeadTimeDays: Math.round(totalLeadTime * 10) / 10,
    totalProcessTimeDays: Math.round(totalProcessTime * 10) / 10,
    efficiencyPct: Math.round(efficiency * 10) / 10,
    wasteDays: Math.round((totalLeadTime - totalProcessTime) * 10) / 10,
  }
}
