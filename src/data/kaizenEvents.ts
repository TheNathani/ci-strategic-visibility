export interface KaizenEvent {
  id: string
  title: string
  functionalArea: string
  phase: 'pre-event' | 'event-week' | 'post-30' | 'post-60' | 'post-90' | 'sustain'
  problemStatement: string
  sponsor: string
  facilitator: string
  teamSize: number
  targetMetric: string
  baselineValue: number
  targetValue: number
  currentValue: number
  unit: string
  rootCauses: string[]
  countermeasures: {
    description: string
    status: 'proposed' | 'in-progress' | 'complete'
    owner: string
  }[]
  hardSavings: number
  weeklyHoursSaved: number
}

export const kaizenEvents: KaizenEvent[] = [
  {
    id: 'k1',
    title: 'HM Review Cycle Time Reduction',
    functionalArea: 'HR & Talent Acquisition',
    phase: 'event-week',
    problemStatement: 'Hiring Manager review step averages 14.2 days lead time against a 3-day target, creating the primary bottleneck in engineering hiring.',
    sponsor: 'CVP, Engineering',
    facilitator: 'CI Team Lead',
    teamSize: 7,
    targetMetric: 'HM Review Lead Time',
    baselineValue: 14.2,
    targetValue: 3,
    currentValue: 8.7,
    unit: 'days',
    rootCauses: [
      'HMs batch-review resumes weekly instead of daily (62% of delay)',
      'Candidate packets missing standardized info, causing rework (23%)',
      'No SLA or auto-escalation for overdue reviews (11%)',
      'HM calendar conflicts delay scheduling 7+ days (4%)',
    ],
    countermeasures: [
      { description: '48-hour SLA for HM first review', status: 'in-progress', owner: 'HR Operations' },
      { description: 'Standardized candidate packet template', status: 'complete', owner: 'Recruiting' },
      { description: 'Auto-escalation to skip-level at 5 days', status: 'in-progress', owner: 'IT / Workday Team' },
      { description: 'AI pre-ranking to reduce HM decision time', status: 'proposed', owner: 'CI Team' },
    ],
    hardSavings: 3200000,
    weeklyHoursSaved: 120,
  },
  {
    id: 'k2',
    title: 'AI Screening False Reject Reduction',
    functionalArea: 'HR & Talent Acquisition',
    phase: 'pre-event',
    problemStatement: 'AI screening rejects 40% of candidates, but calibration audit shows 18% defect rate -- qualified candidates being screened out.',
    sponsor: 'VP, Talent Acquisition',
    facilitator: 'CI Analyst',
    teamSize: 6,
    targetMetric: 'AI Screening Defect Rate',
    baselineValue: 18,
    targetValue: 5,
    currentValue: 18,
    unit: '%',
    rootCauses: [],
    countermeasures: [],
    hardSavings: 0,
    weeklyHoursSaved: 0,
  },
  {
    id: 'k3',
    title: 'IT Device Procurement Redesign',
    functionalArea: 'IT Asset Management',
    phase: 'post-30',
    problemStatement: 'Device procurement averages 23 days from request to deployment against a 10-day target across 1.6M managed devices.',
    sponsor: 'CVP, IT Operations',
    facilitator: 'CI Team Lead',
    teamSize: 8,
    targetMetric: 'Device Procurement Lead Time',
    baselineValue: 23,
    targetValue: 10,
    currentValue: 13,
    unit: 'days',
    rootCauses: [
      'Manual PO creation process requires 4 system entries',
      'Vendor quote turnaround averaging 5 business days',
      'Imaging queue bottleneck at Redmond depot',
    ],
    countermeasures: [
      { description: 'Automated PO generation via AI agent', status: 'complete', owner: 'IT Automation' },
      { description: 'Preferred vendor pre-negotiated catalog', status: 'complete', owner: 'Procurement' },
      { description: 'Distributed imaging at satellite locations', status: 'in-progress', owner: 'IT Ops' },
    ],
    hardSavings: 8100000,
    weeklyHoursSaved: 340,
  },
  {
    id: 'k4',
    title: 'Network Incident Response Optimization',
    functionalArea: 'Engineering Operations',
    phase: 'sustain',
    problemStatement: 'Mean time to resolve network incidents was 4 hours, impacting engineering productivity across all sites.',
    sponsor: 'CVP, Engineering Systems',
    facilitator: 'CI Manager',
    teamSize: 6,
    targetMetric: 'MTTR (Network)',
    baselineValue: 240,
    targetValue: 45,
    currentValue: 52,
    unit: 'min',
    rootCauses: [
      'Manual triage routing to wrong DRI team (40% of incidents)',
      'No automated diagnostics before human engagement',
      'Knowledge base fragmented across 6 tools',
    ],
    countermeasures: [
      { description: 'AI auto-triage agent routing incidents to correct DRI', status: 'complete', owner: 'AI CoE' },
      { description: 'Automated pre-diagnostics script execution', status: 'complete', owner: 'Network Ops' },
      { description: 'Unified knowledge base with AI search', status: 'complete', owner: 'IT Knowledge Mgmt' },
    ],
    hardSavings: 12400000,
    weeklyHoursSaved: 500,
  },
]
