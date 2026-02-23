import { useAppStore } from '../../store/useAppStore'
import { vsmSteps } from '../../data/vsmSteps'
import styles from './DigitalGemba.module.css'

const wasteLabels: Record<string, string> = {
  waiting: 'WAITING',
  defects: 'DEFECTS',
  overprocessing: 'OVER-PROCESSING',
  motion: 'MOTION',
  transportation: 'TRANSPORTATION',
  inventory: 'INVENTORY',
  overproduction: 'OVERPRODUCTION',
  skillsUnderutilized: 'SKILLS UNDERUTILIZED',
}

export function DigitalGemba() {
  const activeStepId = useAppStore(s => s.activeVSMStepId)
  const step = vsmSteps.find(s => s.id === activeStepId) || vsmSteps.find(s => s.isBottleneck)!

  const wastePct = ((step.leadTimeDays - step.processTimeHrs / 24) / step.leadTimeDays * 100).toFixed(1)
  const wasteEntries = Object.entries(step.wasteBreakdown)
    .filter(([, v]) => v > 0)
    .sort(([, a], [, b]) => b - a)

  const rootCauses = [
    { cause: 'HMs batch-review resumes weekly instead of daily', confidence: 62, type: 'WAITING' },
    { cause: 'Candidate packets missing standardized info causing rework', confidence: 23, type: 'DEFECTS' },
    { cause: 'No SLA or auto-escalation for overdue reviews', confidence: 11, type: 'WAITING' },
    { cause: 'HM calendar conflicts delay scheduling 7+ days', confidence: 4, type: 'MOTION' },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>DIGITAL GEMBA // {step.name.toUpperCase()}</div>
        <div className={styles.subtitle}>BOTTLENECK ANALYSIS // LIVE FEED</div>
      </div>

      <div className={styles.content}>
        {/* Left: Key Metrics */}
        <div className={styles.metricsPanel}>
          <div className={styles.panelTitle}>STEP TELEMETRY</div>
          <div className={styles.bigMetric}>
            <span className={styles.bigValue}>{step.queueDepth}</span>
            <span className={styles.bigLabel}>QUEUE DEPTH</span>
          </div>
          <div className={styles.bigMetric}>
            <span className={`${styles.bigValue} ${styles.danger}`}>{step.leadTimeDays}d</span>
            <span className={styles.bigLabel}>AVG LEAD TIME</span>
          </div>
          <div className={styles.bigMetric}>
            <span className={styles.bigValue}>{step.processTimeHrs}h</span>
            <span className={styles.bigLabel}>PROCESS TIME</span>
          </div>
          <div className={styles.bigMetric}>
            <span className={`${styles.bigValue} ${styles.danger}`}>{wastePct}%</span>
            <span className={styles.bigLabel}>WASTE RATIO</span>
          </div>
          <div className={styles.bigMetric}>
            <span className={styles.bigValue}>{step.throughputPerDay}/day</span>
            <span className={styles.bigLabel}>THROUGHPUT</span>
          </div>
          <div className={styles.bigMetric}>
            <span className={`${styles.bigValue} ${step.defectRate > 10 ? styles.danger : ''}`}>
              {step.defectRate}%
            </span>
            <span className={styles.bigLabel}>DEFECT RATE</span>
          </div>
        </div>

        {/* Center: Waste Breakdown */}
        <div className={styles.wastePanel}>
          <div className={styles.panelTitle}>WASTE DECOMPOSITION (DOWNTIME)</div>
          <div className={styles.wasteChart}>
            {wasteEntries.map(([key, val]) => (
              <div key={key} className={styles.wasteRow}>
                <span className={styles.wasteLabel}>{wasteLabels[key] || key}</span>
                <div className={styles.wasteBarTrack}>
                  <div
                    className={styles.wasteBarFill}
                    style={{ width: `${val}%` }}
                  />
                </div>
                <span className={styles.wasteVal}>{val}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Root Causes */}
        <div className={styles.rootCausePanel}>
          <div className={styles.panelTitle}>ROOT CAUSE ANALYSIS (AI-ASSISTED)</div>
          <div className={styles.rootCauses}>
            {rootCauses.map((rc, i) => (
              <div key={i} className={styles.rootCause}>
                <div className={styles.rcHeader}>
                  <span className={styles.rcConfidence}>{rc.confidence}%</span>
                  <span className={styles.rcType}>{rc.type}</span>
                </div>
                <div className={styles.rcText}>{rc.cause}</div>
                <div className={styles.rcBar}>
                  <div className={styles.rcBarFill} style={{ width: `${rc.confidence}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className={styles.recommendation}>
            <div className={styles.recTitle}>RECOMMENDED ACTION</div>
            <div className={styles.recText}>
              Charter Kaizen event targeting HM review SLA implementation.
              Projected impact: 14.2d to 3d lead time reduction.
              Estimated annual savings: $3.2M.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
