export interface BowlerKPI {
  id: string
  name: string
  unit: string
  owner: string
  annualTarget: number
  direction: 'lower-better' | 'higher-better'
  months: {
    month: string
    target: number
    actual: number | null
    status: 'red' | 'yellow' | 'green' | 'pending'
    countermeasure?: string
  }[]
}

export const bowlerKPIs: BowlerKPI[] = [
  {
    id: 'ttf',
    name: 'Time-to-Fill (Engineering)',
    unit: 'days',
    owner: 'Dir. Talent Acquisition',
    annualTarget: 35,
    direction: 'lower-better',
    months: [
      { month: 'Sep', target: 67, actual: 67, status: 'green' },
      { month: 'Oct', target: 58, actual: 62, status: 'red', countermeasure: 'HM SLA not yet active; delayed by Workday config' },
      { month: 'Nov', target: 50, actual: 51, status: 'yellow' },
      { month: 'Dec', target: 44, actual: 43, status: 'green' },
      { month: 'Jan', target: 39, actual: 38, status: 'green' },
      { month: 'Feb', target: 35, actual: null, status: 'pending' },
    ],
  },
  {
    id: 'hm-review',
    name: 'HM Review Cycle Time',
    unit: 'days',
    owner: 'Sr. Manager, CI',
    annualTarget: 3,
    direction: 'lower-better',
    months: [
      { month: 'Sep', target: 14, actual: 14.2, status: 'green' },
      { month: 'Oct', target: 12, actual: 13.1, status: 'red', countermeasure: 'SLA compliance at 64% - escalation workflow bug' },
      { month: 'Nov', target: 8, actual: 9.4, status: 'red', countermeasure: 'Added AI pre-ranking; target Dec improvement' },
      { month: 'Dec', target: 5, actual: 5.8, status: 'red', countermeasure: 'Escalation workflow live; monitoring adoption' },
      { month: 'Jan', target: 3, actual: 3.2, status: 'yellow' },
      { month: 'Feb', target: 3, actual: null, status: 'pending' },
    ],
  },
  {
    id: 'offer-accept',
    name: 'Offer Acceptance Rate',
    unit: '%',
    owner: 'Dir. Compensation',
    annualTarget: 85,
    direction: 'higher-better',
    months: [
      { month: 'Sep', target: 72, actual: 71, status: 'yellow' },
      { month: 'Oct', target: 74, actual: 73, status: 'yellow' },
      { month: 'Nov', target: 78, actual: 79, status: 'green' },
      { month: 'Dec', target: 80, actual: 82, status: 'green' },
      { month: 'Jan', target: 83, actual: 84, status: 'green' },
      { month: 'Feb', target: 85, actual: null, status: 'pending' },
    ],
  },
  {
    id: 'ai-defect',
    name: 'AI Screen Defect Rate',
    unit: '%',
    owner: 'Mgr. AI Screening',
    annualTarget: 5,
    direction: 'lower-better',
    months: [
      { month: 'Sep', target: 18, actual: 18, status: 'green' },
      { month: 'Oct', target: 16, actual: 17, status: 'red', countermeasure: 'Model retraining initiated on expanded dataset' },
      { month: 'Nov', target: 13, actual: 14, status: 'red', countermeasure: 'Bias audit found 3 criteria overweighted; adjusting' },
      { month: 'Dec', target: 10, actual: 11, status: 'red', countermeasure: 'A3 opened; root cause is training data gap for mid-career roles' },
      { month: 'Jan', target: 7, actual: 8, status: 'red', countermeasure: 'New model deployed; monitoring Jan cohort' },
      { month: 'Feb', target: 5, actual: null, status: 'pending' },
    ],
  },
  {
    id: 'capacity-freed',
    name: 'Recruiter Capacity Freed',
    unit: '%',
    owner: 'Dir. Recruiting Ops',
    annualTarget: 40,
    direction: 'higher-better',
    months: [
      { month: 'Sep', target: 0, actual: 0, status: 'green' },
      { month: 'Oct', target: 8, actual: 3, status: 'red', countermeasure: 'Process changes not yet fully adopted by team' },
      { month: 'Nov', target: 16, actual: 14, status: 'yellow' },
      { month: 'Dec', target: 24, actual: 27, status: 'green' },
      { month: 'Jan', target: 32, actual: 34, status: 'green' },
      { month: 'Feb', target: 40, actual: null, status: 'pending' },
    ],
  },
  {
    id: 'process-compliance',
    name: 'Process Compliance Rate',
    unit: '%',
    owner: 'Sr. Manager, CI',
    annualTarget: 95,
    direction: 'higher-better',
    months: [
      { month: 'Sep', target: 58, actual: 55, status: 'red', countermeasure: 'Baseline; standard work not yet documented' },
      { month: 'Oct', target: 68, actual: 64, status: 'red', countermeasure: 'Standard work released; training in progress' },
      { month: 'Nov', target: 78, actual: 76, status: 'yellow' },
      { month: 'Dec', target: 85, actual: 84, status: 'yellow' },
      { month: 'Jan', target: 90, actual: 91, status: 'green' },
      { month: 'Feb', target: 95, actual: null, status: 'pending' },
    ],
  },
]
