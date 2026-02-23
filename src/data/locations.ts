export interface MSLocation {
  id: string
  name: string
  label: string
  lat: number
  lng: number
  headcount: number
  activeKaizens: number
  wasteIndex: number
  status: 'green' | 'yellow' | 'red'
  drillable: boolean
}

export const locations: MSLocation[] = [
  {
    id: 'redmond',
    name: 'Redmond HQ',
    label: 'REDMOND',
    lat: 47.6740,
    lng: -122.1215,
    headcount: 50000,
    activeKaizens: 8,
    wasteIndex: 72,
    status: 'red',
    drillable: true,
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad MSIDC',
    label: 'HYDERABAD',
    lat: 17.3850,
    lng: 78.4867,
    headcount: 10000,
    activeKaizens: 3,
    wasteIndex: 45,
    status: 'yellow',
    drillable: false,
  },
  {
    id: 'beijing',
    name: 'Beijing MSRA',
    label: 'BEIJING',
    lat: 39.9042,
    lng: 116.4074,
    headcount: 9000,
    activeKaizens: 2,
    wasteIndex: 38,
    status: 'yellow',
    drillable: false,
  },
  {
    id: 'dublin',
    name: 'Dublin EU HQ',
    label: 'DUBLIN',
    lat: 53.2778,
    lng: -6.2603,
    headcount: 6000,
    activeKaizens: 2,
    wasteIndex: 28,
    status: 'green',
    drillable: false,
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru IDC',
    label: 'BENGALURU',
    lat: 12.9716,
    lng: 77.5946,
    headcount: 8000,
    activeKaizens: 2,
    wasteIndex: 42,
    status: 'yellow',
    drillable: false,
  },
  {
    id: 'mountain-view',
    name: 'Mountain View',
    label: 'MTV',
    lat: 37.3861,
    lng: -122.0839,
    headcount: 3000,
    activeKaizens: 1,
    wasteIndex: 35,
    status: 'green',
    drillable: false,
  },
  {
    id: 'nyc',
    name: 'New York City',
    label: 'NYC',
    lat: 40.7580,
    lng: -73.9855,
    headcount: 1000,
    activeKaizens: 0,
    wasteIndex: 30,
    status: 'green',
    drillable: false,
  },
  {
    id: 'london',
    name: 'London / Reading',
    label: 'LONDON',
    lat: 51.5155,
    lng: -0.1763,
    headcount: 4000,
    activeKaizens: 1,
    wasteIndex: 32,
    status: 'green',
    drillable: false,
  },
]

export interface ArcConnection {
  from: string
  to: string
  label: string
  volume: number
}

export const arcs: ArcConnection[] = [
  { from: 'redmond', to: 'hyderabad', label: 'Engineering Shared Services', volume: 0.8 },
  { from: 'redmond', to: 'dublin', label: 'EMEA Sales Ops', volume: 0.5 },
  { from: 'redmond', to: 'bengaluru', label: 'Engineering Ops', volume: 0.7 },
  { from: 'redmond', to: 'beijing', label: 'Research Collaboration', volume: 0.4 },
  { from: 'hyderabad', to: 'dublin', label: 'Support Escalation', volume: 0.3 },
]
