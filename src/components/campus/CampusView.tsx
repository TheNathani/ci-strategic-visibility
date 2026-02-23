import { useAppStore } from '../../store/useAppStore'
import { functionalAreas } from '../../data/functionalAreas'
import styles from './CampusView.module.css'

const iconMap: Record<string, string> = {
  PEOPLE: '\u{1F465}',
  CODE: '\u{2699}',
  FINANCE: '\u{1F4CA}',
  DEVICES: '\u{1F5A5}',
  SALES: '\u{1F4C8}',
  SUPPLY: '\u{1F69A}',
}

export function CampusView() {
  const drillTo = useAppStore(s => s.drillTo)

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>REDMOND HQ // STRATEGIC FOCUS</div>
        <div className={styles.subtitle}>
          502 ACRES // EAST + WEST CAMPUS // ~50,000 EMPLOYEES
        </div>
        <div className={styles.question}>WHERE SHOULD WE FOCUS NEXT?</div>
      </div>

      <div className={styles.grid}>
        {functionalAreas.map(area => (
          <button
            key={area.id}
            className={`${styles.card} ${styles[area.status]}`}
            onClick={() => {
              if (area.id === 'hr-talent') {
                drillTo('vsm', { functionalAreaId: area.id })
              }
            }}
            disabled={area.id !== 'hr-talent'}
          >
            <div className={styles.cardHeader}>
              <span className={styles.icon}>{iconMap[area.icon] || '?'}</span>
              <span className={styles.areaName}>{area.name}</span>
              <span className={`${styles.statusBadge} ${styles[`badge${area.status}`]}`}>
                {area.status.toUpperCase()}
              </span>
            </div>

            <div className={styles.cardMetrics}>
              <div className={styles.cardMetric}>
                <span className={styles.cardMetricValue}>{area.activeKaizens}</span>
                <span className={styles.cardMetricLabel}>ACTIVE KAIZENS</span>
              </div>
              <div className={styles.cardMetric}>
                <span className={styles.cardMetricValue}>{area.pipelineBacklog}</span>
                <span className={styles.cardMetricLabel}>PIPELINE</span>
              </div>
              <div className={styles.cardMetric}>
                <span className={styles.cardMetricValue}>{area.avgLeadTime}d</span>
                <span className={styles.cardMetricLabel}>AVG LEAD TIME</span>
              </div>
              <div className={styles.cardMetric}>
                <span className={styles.cardMetricValue}>{area.valueAddRatio}%</span>
                <span className={styles.cardMetricLabel}>EFFICIENCY</span>
              </div>
            </div>

            <div className={styles.wasteBar}>
              <div className={styles.wasteLabel}>WASTE INDEX</div>
              <div className={styles.wasteTrack}>
                <div
                  className={`${styles.wasteFill} ${styles[`waste${area.status}`]}`}
                  style={{ width: `${area.wasteIndex}%` }}
                />
              </div>
              <span className={styles.wasteValue}>{area.wasteIndex}</span>
            </div>

            <div className={styles.bottleneck}>
              TOP BOTTLENECK: {area.topBottleneck}
            </div>

            {area.id === 'hr-talent' && (
              <div className={styles.drillHint}>CLICK TO DRILL DOWN</div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
