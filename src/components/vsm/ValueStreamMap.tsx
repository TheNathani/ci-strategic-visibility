import { useEffect, useState } from 'react'
import { useAppStore } from '../../store/useAppStore'
import { vsmSteps, getVSMSummary } from '../../data/vsmSteps'
import styles from './ValueStreamMap.module.css'

export function ValueStreamMap() {
  const drillTo = useAppStore(s => s.drillTo)
  const themeMode = useAppStore(s => s.themeMode)
  const summary = getVSMSummary()
  const [ticks, setTicks] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setTicks(t => t + 1), 3000)
    return () => clearInterval(timer)
  }, [])

  // Simulate slight queue fluctuation
  const getQueueVariation = (base: number, stepIdx: number) => {
    const variation = Math.sin((ticks + stepIdx * 1.5) * 0.8) * (base * 0.05)
    return Math.max(0, Math.round(base + variation))
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <span className={styles.title}>VALUE STREAM // HR TALENT ACQUISITION (ENGINEERING)</span>
          <div className={styles.controls}>
            <button
              className={styles.navBtn}
              onClick={() => drillTo('kaizen', { functionalAreaId: 'hr-talent' })}
            >
              [ KAIZEN EVENTS ]
            </button>
            <button
              className={styles.navBtn}
              onClick={() => drillTo('bowler', { functionalAreaId: 'hr-talent' })}
            >
              [ BOWLER ]
            </button>
          </div>
        </div>
        <div className={styles.subtitle}>CURRENT STATE // LIVE PROCESS DATA</div>
      </div>

      <div className={styles.vsmContainer}>
        <div className={styles.stepsRow}>
          {vsmSteps.map((step, i) => {
            const queue = getQueueVariation(step.queueDepth, i)
            const wastePct = ((step.leadTimeDays - step.processTimeHrs / 24) / step.leadTimeDays * 100)
            const isFlir = themeMode === 'flir'

            return (
              <div key={step.id} className={styles.stepWrapper}>
                {/* Connector with flow dots */}
                {i > 0 && (
                  <div className={styles.connector}>
                    <div className={styles.connectorLine} />
                    <div
                      className={styles.flowDot}
                      style={{ animationDuration: `${1.5 + step.leadTimeDays * 0.1}s` }}
                    />
                    <div
                      className={styles.flowDot}
                      style={{
                        animationDuration: `${1.5 + step.leadTimeDays * 0.1}s`,
                        animationDelay: '0.5s',
                      }}
                    />
                    <div className={styles.waitTime}>
                      {(step.leadTimeDays - step.processTimeHrs / 24).toFixed(1)}d wait
                    </div>
                  </div>
                )}

                {/* Step box */}
                <button
                  className={`${styles.stepBox} ${step.isBottleneck ? styles.bottleneck : ''}`}
                  onClick={() => {
                    if (step.isBottleneck) {
                      drillTo('gemba', { vsmStepId: step.id })
                    }
                  }}
                  disabled={!step.isBottleneck}
                  style={isFlir ? {
                    borderColor: `hsl(${Math.max(0, 60 - wastePct * 0.6)}, 100%, 50%)`,
                    boxShadow: `0 0 ${wastePct * 0.2}px hsl(${Math.max(0, 60 - wastePct * 0.6)}, 100%, 50%)`,
                  } : undefined}
                >
                  <div className={styles.stepName}>{step.shortName}</div>
                  <div className={styles.stepFullName}>{step.name}</div>
                  <div className={styles.stepMetrics}>
                    <div className={styles.stepMetric}>
                      <span className={styles.stepMetricLabel}>PT</span>
                      <span className={styles.stepMetricValue}>
                        {step.processTimeHrs < 1 ? `${(step.processTimeHrs * 60).toFixed(0)}m` : `${step.processTimeHrs}h`}
                      </span>
                    </div>
                    <div className={styles.stepMetric}>
                      <span className={styles.stepMetricLabel}>LT</span>
                      <span className={styles.stepMetricValue}>{step.leadTimeDays}d</span>
                    </div>
                    <div className={styles.stepMetric}>
                      <span className={styles.stepMetricLabel}>Q</span>
                      <span className={styles.stepMetricValue}>{queue}</span>
                    </div>
                  </div>
                  <div className={styles.stepOwner}>{step.owner}</div>
                  {step.isBottleneck && (
                    <div className={styles.bottleneckBadge}>BOTTLENECK</div>
                  )}
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Summary bar */}
      <div className={styles.summaryBar}>
        <div className={styles.summaryMetric}>
          <span className={styles.summaryLabel}>TOTAL LEAD TIME</span>
          <span className={styles.summaryValue}>{summary.totalLeadTimeDays} days</span>
        </div>
        <div className={styles.summaryMetric}>
          <span className={styles.summaryLabel}>VALUE-ADD TIME</span>
          <span className={styles.summaryValue}>{summary.totalProcessTimeDays} days</span>
        </div>
        <div className={styles.summaryMetric}>
          <span className={styles.summaryLabel}>EFFICIENCY</span>
          <span className={`${styles.summaryValue} ${styles.efficiencyBad}`}>
            {summary.efficiencyPct}%
          </span>
        </div>
        <div className={styles.summaryMetric}>
          <span className={styles.summaryLabel}>WASTE</span>
          <span className={`${styles.summaryValue} ${styles.wasteHigh}`}>
            {summary.wasteDays} days ({(100 - summary.efficiencyPct).toFixed(1)}%)
          </span>
        </div>
        <div className={styles.efficiencyBar}>
          <div className={styles.efficiencyTrack}>
            <div className={styles.vaFill} style={{ width: `${summary.efficiencyPct}%` }} />
          </div>
          <div className={styles.efficiencyLabels}>
            <span>VALUE-ADD {summary.efficiencyPct}%</span>
            <span>WASTE {(100 - summary.efficiencyPct).toFixed(1)}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
