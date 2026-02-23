import { bowlerKPIs } from '../../data/bowlerData'
import styles from './BowlerScorecard.module.css'

export function BowlerScorecard() {
  const months = bowlerKPIs[0]?.months.map(m => m.month) || []

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>BOWLER SCORECARD // HR TALENT ACQUISITION</div>
        <div className={styles.subtitle}>FY26 // MONTHLY TARGET vs ACTUAL // PROCESS OWNER ACCOUNTABILITY</div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.thKpi}>KPI</th>
              <th className={styles.thOwner}>OWNER</th>
              <th className={styles.thTarget}>TARGET</th>
              {months.map(m => (
                <th key={m} className={styles.thMonth}>{m.toUpperCase()}</th>
              ))}
              <th className={styles.thTrend}>TREND</th>
            </tr>
          </thead>
          <tbody>
            {bowlerKPIs.map(kpi => {
              const actuals = kpi.months.filter(m => m.actual !== null).map(m => m.actual!)
              const minVal = Math.min(...actuals, kpi.annualTarget)
              const maxVal = Math.max(...actuals, kpi.annualTarget)
              const range = maxVal - minVal || 1

              return (
                <tr key={kpi.id} className={styles.row}>
                  <td className={styles.tdKpi}>
                    <div className={styles.kpiName}>{kpi.name}</div>
                    <div className={styles.kpiUnit}>({kpi.unit})</div>
                  </td>
                  <td className={styles.tdOwner}>{kpi.owner}</td>
                  <td className={styles.tdTarget}>{kpi.annualTarget}</td>
                  {kpi.months.map((m, i) => (
                    <td
                      key={i}
                      className={`${styles.tdMonth} ${styles[m.status]}`}
                      title={m.countermeasure || ''}
                    >
                      {m.status === 'pending' ? (
                        <span className={styles.pending}>--</span>
                      ) : (
                        <div className={styles.cellContent}>
                          <div className={styles.actualValue}>{m.actual}</div>
                          <div className={styles.targetValue}>({m.target})</div>
                          {m.countermeasure && (
                            <div className={styles.cmIndicator} title={m.countermeasure}>!</div>
                          )}
                        </div>
                      )}
                    </td>
                  ))}
                  <td className={styles.tdTrend}>
                    <svg width="80" height="24" viewBox="0 0 80 24">
                      {actuals.length > 1 && (
                        <polyline
                          points={actuals.map((v, i) => {
                            const x = (i / (actuals.length - 1)) * 76 + 2
                            const y = 22 - ((v - minVal) / range) * 20
                            return `${x},${y}`
                          }).join(' ')}
                          fill="none"
                          stroke="var(--text-primary)"
                          strokeWidth="1.5"
                          opacity="0.8"
                        />
                      )}
                      {/* Target line */}
                      <line
                        x1="0" y1={22 - ((kpi.annualTarget - minVal) / range) * 20}
                        x2="80" y2={22 - ((kpi.annualTarget - minVal) / range) * 20}
                        stroke="var(--text-dim)"
                        strokeWidth="0.5"
                        strokeDasharray="2,2"
                      />
                    </svg>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Countermeasures Legend */}
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.green}`} /> ON TARGET
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.yellow}`} /> WITHIN 10%
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.red}`} /> OFF TARGET (countermeasure required)
        </div>
        <div className={styles.legendItem}>
          <span className={styles.cmLegend}>!</span> COUNTERMEASURE DOCUMENTED (hover to view)
        </div>
      </div>
    </div>
  )
}
