import { kaizenEvents } from '../../data/kaizenEvents'
import styles from './KaizenTracker.module.css'

const phaseOrder = ['pre-event', 'event-week', 'post-30', 'post-60', 'post-90', 'sustain']
const phaseLabels: Record<string, string> = {
  'pre-event': 'PRE-EVENT',
  'event-week': 'EVENT WEEK',
  'post-30': '30-DAY',
  'post-60': '60-DAY',
  'post-90': '90-DAY',
  'sustain': 'SUSTAIN',
}

const statusColors: Record<string, string> = {
  'proposed': 'proposed',
  'in-progress': 'inProgress',
  'complete': 'complete',
}

export function KaizenTracker() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>KAIZEN EVENTS // ACTIVE OPERATIONS</div>
        <div className={styles.subtitle}>
          {kaizenEvents.length} EVENTS // ${(kaizenEvents.reduce((s, e) => s + e.hardSavings, 0) / 1000000).toFixed(1)}M PROJECTED SAVINGS
        </div>
      </div>

      <div className={styles.eventsGrid}>
        {kaizenEvents.map(event => {
          const phaseIdx = phaseOrder.indexOf(event.phase)
          const progress = event.targetValue !== event.baselineValue
            ? Math.round(((event.baselineValue - event.currentValue) / (event.baselineValue - event.targetValue)) * 100)
            : 0
          const clampedProgress = Math.max(0, Math.min(100, progress))

          return (
            <div key={event.id} className={styles.eventCard}>
              <div className={styles.cardHeader}>
                <span className={styles.eventTitle}>{event.title}</span>
                <span className={`${styles.phaseBadge} ${styles[event.phase.replace('-', '')]}`}>
                  {phaseLabels[event.phase]}
                </span>
              </div>

              <div className={styles.problemStatement}>{event.problemStatement}</div>

              <div className={styles.metaRow}>
                <span>SPONSOR: {event.sponsor}</span>
                <span>TEAM: {event.teamSize} members</span>
                <span>AREA: {event.functionalArea}</span>
              </div>

              {/* Phase Timeline */}
              <div className={styles.timeline}>
                {phaseOrder.map((p, i) => (
                  <div
                    key={p}
                    className={`${styles.timelineStep} ${i <= phaseIdx ? styles.timelineActive : ''} ${i === phaseIdx ? styles.timelineCurrent : ''}`}
                  >
                    <div className={styles.timelineDot} />
                    <span className={styles.timelineLabel}>{phaseLabels[p]}</span>
                  </div>
                ))}
              </div>

              {/* Target Metric Progress */}
              <div className={styles.progressSection}>
                <div className={styles.progressHeader}>
                  <span>{event.targetMetric}</span>
                  <span>{event.currentValue} {event.unit} (target: {event.targetValue} {event.unit})</span>
                </div>
                <div className={styles.progressTrack}>
                  <div className={styles.progressFill} style={{ width: `${clampedProgress}%` }} />
                </div>
                <div className={styles.progressLabels}>
                  <span>BASELINE: {event.baselineValue} {event.unit}</span>
                  <span>{clampedProgress}% TO TARGET</span>
                </div>
              </div>

              {/* Root Causes */}
              {event.rootCauses.length > 0 && (
                <div className={styles.section}>
                  <div className={styles.sectionTitle}>ROOT CAUSES IDENTIFIED</div>
                  {event.rootCauses.map((rc, i) => (
                    <div key={i} className={styles.listItem}>- {rc}</div>
                  ))}
                </div>
              )}

              {/* Countermeasures */}
              {event.countermeasures.length > 0 && (
                <div className={styles.section}>
                  <div className={styles.sectionTitle}>COUNTERMEASURES</div>
                  {event.countermeasures.map((cm, i) => (
                    <div key={i} className={styles.countermeasure}>
                      <span className={`${styles.cmStatus} ${styles[statusColors[cm.status]]}`}>
                        {cm.status === 'complete' ? '\u2713' : cm.status === 'in-progress' ? '\u25CB' : '\u2022'}
                      </span>
                      <span className={styles.cmText}>{cm.description}</span>
                      <span className={styles.cmOwner}>{cm.owner}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Impact */}
              {event.hardSavings > 0 && (
                <div className={styles.impactRow}>
                  <span>SAVINGS: ${(event.hardSavings / 1000000).toFixed(1)}M/yr</span>
                  <span>HOURS SAVED: {event.weeklyHoursSaved}/wk</span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
