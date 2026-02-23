import { useAppStore } from '../../store/useAppStore'
import styles from './Breadcrumb.module.css'

const levelLabels: Record<string, string> = {
  globe: 'GLOBAL',
  campus: 'REDMOND HQ',
  vsm: 'VALUE STREAM',
  gemba: 'GEMBA',
  kaizen: 'KAIZEN',
  bowler: 'BOWLER',
  impact: 'IMPACT',
}

export function Breadcrumb() {
  const { currentLevel, activeFunctionalAreaId, activeVSMStepId, goBack } = useAppStore()

  if (currentLevel === 'globe') return null

  const crumbs: string[] = ['GLOBAL']

  if (['campus', 'vsm', 'gemba', 'kaizen', 'bowler'].includes(currentLevel)) {
    crumbs.push('REDMOND HQ')
  }
  if (['vsm', 'gemba', 'kaizen', 'bowler'].includes(currentLevel)) {
    crumbs.push(activeFunctionalAreaId === 'hr-talent' ? 'HR & TALENT' : 'PROCESS')
  }
  if (['gemba', 'kaizen', 'bowler'].includes(currentLevel)) {
    if (currentLevel === 'gemba' && activeVSMStepId) {
      crumbs.push(activeVSMStepId.toUpperCase().replace('-', ' '))
    } else {
      crumbs.push(levelLabels[currentLevel])
    }
  }

  return (
    <div className={styles.breadcrumb}>
      <button className={styles.backBtn} onClick={goBack}>{'<'} BACK</button>
      <span className={styles.separator}>//</span>
      {crumbs.map((c, i) => (
        <span key={i}>
          {i > 0 && <span className={styles.arrow}> {'>'} </span>}
          <span className={i === crumbs.length - 1 ? styles.active : styles.crumb}>{c}</span>
        </span>
      ))}
    </div>
  )
}
