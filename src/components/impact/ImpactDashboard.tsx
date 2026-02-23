import { impactData } from '../../data/impactMetrics'
import styles from './ImpactDashboard.module.css'

function formatMoney(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`
  return `$${n}`
}

export function ImpactDashboard() {
  const maxSavings = Math.max(...impactData.byArea.map(a => a.savings))
  const maxQuarterly = Math.max(...impactData.quarterlyTrend.map(q => q.savings))

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>IMPACT DASHBOARD // CONTINUOUS IMPROVEMENT PORTFOLIO</div>
        <div className={styles.subtitle}>FY26 YTD // AGGREGATED ACROSS ALL FUNCTIONAL AREAS // LEADERSHIP VIEW</div>
      </div>

      <div className={styles.metricsRow}>
        <div className={styles.metricCard}>
          <div className={styles.metricValue}>{formatMoney(impactData.totalHardSavings)}</div>
          <div className={styles.metricLabel}>HARD SAVINGS (ANNUALIZED)</div>
          <div className={styles.metricDelta}>+{impactData.avgEfficiencyGain}% AVG EFFICIENCY GAIN</div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricValue}>{impactData.processesImproved}</div>
          <div className={styles.metricLabel}>PROCESSES IMPROVED</div>
          <div className={styles.metricDelta}>{impactData.a3sClosed} A3s CLOSED</div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricValue}>{impactData.kaizenEventsCompleted}</div>
          <div className={styles.metricLabel}>KAIZEN EVENTS COMPLETED</div>
          <div className={styles.metricDelta}>{impactData.engagementParticipants.toLocaleString()} PARTICIPANTS</div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricValue}>{impactData.compoundingRate}%</div>
          <div className={styles.metricLabel}>DAILY COMPOUNDING RATE</div>
          <div className={styles.metricDelta}>37x ANNUAL MULTIPLIER</div>
        </div>
      </div>

      <div className={styles.body}>
        {/* Savings by Area */}
        <div className={styles.panel}>
          <div className={styles.panelTitle}>HARD SAVINGS BY FUNCTIONAL AREA</div>
          <div className={styles.areaList}>
            {impactData.byArea.map(area => (
              <div key={area.area} className={styles.areaRow}>
                <div className={styles.areaName}>{area.area.toUpperCase()}</div>
                <div className={styles.savingsBar}>
                  <div
                    className={styles.savingsFill}
                    style={{ width: `${(area.savings / maxSavings) * 100}%` }}
                  />
                </div>
                <div className={styles.savingsAmount}>{formatMoney(area.savings)}</div>
                <div className={styles.kaizenCount}>{area.kaizens} KE</div>
              </div>
            ))}
          </div>
        </div>

        {/* Efficiency Before/After */}
        <div className={styles.panel}>
          <div className={styles.panelTitle}>PROCESS EFFICIENCY // BEFORE vs AFTER</div>
          <div className={styles.efficiencySection}>
            {impactData.byArea.map(area => (
              <div key={area.area} className={styles.effRow}>
                <div className={styles.effLabel}>{area.area.toUpperCase()}</div>
                <div className={styles.effBarContainer}>
                  <div className={styles.effBarTrack}>
                    <div
                      className={styles.effBarBefore}
                      style={{ width: `${area.efficiencyBefore}%` }}
                    />
                    <div
                      className={styles.effBarAfter}
                      style={{ width: `${area.efficiencyAfter}%` }}
                    />
                  </div>
                  <div className={styles.effValues}>
                    {area.efficiencyBefore}% → {area.efficiencyAfter}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quarterly Trend */}
        <div className={styles.panel}>
          <div className={styles.panelTitle}>QUARTERLY SAVINGS TREND</div>
          <div className={styles.quarterlyChart}>
            <div className={styles.chartArea}>
              {impactData.quarterlyTrend.map(q => (
                <div key={q.quarter} className={styles.quarterBar}>
                  <div className={styles.barLabel}>{formatMoney(q.savings)}</div>
                  <div
                    className={styles.barFill}
                    style={{ height: `${(q.savings / maxQuarterly) * 120}px` }}
                  />
                  <div className={styles.barQuarter}>{q.quarter}</div>
                  <div className={styles.kaizenCount}>{q.events} events</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Compounding */}
        <div className={styles.panel}>
          <div className={styles.panelTitle}>COMPOUNDING IMPROVEMENT</div>
          <div className={styles.compoundSection}>
            <div>
              <div className={styles.compoundRate}>{impactData.compoundingRate}%</div>
              <div className={styles.compoundUnit}>DAILY IMPROVEMENT RATE</div>
            </div>
            <div className={styles.compoundExplain}>
              CONTINUOUS IMPROVEMENT IS NOT LINEAR. AT {impactData.compoundingRate}% DAILY,
              EFFICIENCY COMPOUNDS TO 37x OVER ONE YEAR. SMALL DAILY GAINS
              BECOME TRANSFORMATIONAL OUTCOMES.
            </div>
            <div className={styles.compoundProjection}>
              PROJECTED FY26 TOTAL
              <span className={styles.projectionValue}>$124.8M</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.footerNote}>
          DATA SOURCE: CI PORTFOLIO TRACKING SYSTEM // UPDATED DAILY // ALL FIGURES ANNUALIZED
        </div>
        <div className={styles.footerNote}>
          CLASSIFICATION: INTERNAL // LEADERSHIP REVIEW
        </div>
      </div>
    </div>
  )
}
