export interface FunctionalArea {
  id: string
  locationId: string
  name: string
  icon: string
  activeKaizens: number
  pipelineBacklog: number
  wasteIndex: number
  topBottleneck: string
  status: 'green' | 'yellow' | 'red'
  avgLeadTime: number
  valueAddRatio: number
}

export const functionalAreas: FunctionalArea[] = [
  {
    id: 'hr-talent',
    locationId: 'redmond',
    name: 'HR & Talent Acquisition',
    icon: 'PEOPLE',
    activeKaizens: 2,
    pipelineBacklog: 7,
    wasteIndex: 82,
    topBottleneck: 'HM Review Cycle Time',
    status: 'red',
    avgLeadTime: 67,
    valueAddRatio: 12.1,
  },
  {
    id: 'engineering-ops',
    locationId: 'redmond',
    name: 'Engineering Operations',
    icon: 'CODE',
    activeKaizens: 1,
    pipelineBacklog: 4,
    wasteIndex: 45,
    topBottleneck: 'Release Approval Chain',
    status: 'yellow',
    avgLeadTime: 14,
    valueAddRatio: 38,
  },
  {
    id: 'finance',
    locationId: 'redmond',
    name: 'Finance & Procurement',
    icon: 'FINANCE',
    activeKaizens: 1,
    pipelineBacklog: 6,
    wasteIndex: 55,
    topBottleneck: 'PO Approval Workflow',
    status: 'yellow',
    avgLeadTime: 21,
    valueAddRatio: 28,
  },
  {
    id: 'it-asset',
    locationId: 'redmond',
    name: 'IT Asset Management',
    icon: 'DEVICES',
    activeKaizens: 2,
    pipelineBacklog: 3,
    wasteIndex: 35,
    topBottleneck: 'Device Procurement',
    status: 'green',
    avgLeadTime: 15,
    valueAddRatio: 42,
  },
  {
    id: 'sales-ops',
    locationId: 'redmond',
    name: 'Sales Operations',
    icon: 'SALES',
    activeKaizens: 1,
    pipelineBacklog: 5,
    wasteIndex: 62,
    topBottleneck: 'Quote-to-Cash Cycle',
    status: 'yellow',
    avgLeadTime: 32,
    valueAddRatio: 24,
  },
  {
    id: 'supply-chain',
    locationId: 'redmond',
    name: 'Supply Chain & Logistics',
    icon: 'SUPPLY',
    activeKaizens: 1,
    pipelineBacklog: 2,
    wasteIndex: 40,
    topBottleneck: 'Vendor Lead Time',
    status: 'yellow',
    avgLeadTime: 28,
    valueAddRatio: 34,
  },
]
