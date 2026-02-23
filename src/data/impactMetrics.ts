export interface ImpactData {
  totalHardSavings: number
  processesImproved: number
  kaizenEventsCompleted: number
  a3sClosed: number
  engagementParticipants: number
  avgEfficiencyGain: number
  compoundingRate: number
  byArea: {
    area: string
    savings: number
    kaizens: number
    efficiencyBefore: number
    efficiencyAfter: number
  }[]
  quarterlyTrend: {
    quarter: string
    savings: number
    events: number
  }[]
}

export const impactData: ImpactData = {
  totalHardSavings: 78400000,
  processesImproved: 16,
  kaizenEventsCompleted: 12,
  a3sClosed: 27,
  engagementParticipants: 3400,
  avgEfficiencyGain: 26,
  compoundingRate: 1.3,
  byArea: [
    { area: 'IT Asset Mgmt', savings: 24300000, kaizens: 4, efficiencyBefore: 20, efficiencyAfter: 48 },
    { area: 'Sales Ops', savings: 18200000, kaizens: 2, efficiencyBefore: 22, efficiencyAfter: 39 },
    { area: 'Engineering Ops', savings: 15100000, kaizens: 2, efficiencyBefore: 41, efficiencyAfter: 55 },
    { area: 'HR & Talent', savings: 12100000, kaizens: 3, efficiencyBefore: 12, efficiencyAfter: 31 },
    { area: 'Finance', savings: 8700000, kaizens: 1, efficiencyBefore: 34, efficiencyAfter: 52 },
  ],
  quarterlyTrend: [
    { quarter: 'Q1 FY26', savings: 12000000, events: 3 },
    { quarter: 'Q2 FY26', savings: 28400000, events: 5 },
    { quarter: 'Q3 FY26', savings: 38000000, events: 4 },
  ],
}
