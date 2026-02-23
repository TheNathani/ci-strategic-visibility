import { useEffect, useState } from 'react'
import { useAppStore } from '../../store/useAppStore'
import { Breadcrumb } from './Breadcrumb'
import styles from './HUDFrame.module.css'

export function HUDFrame({ children }: { children: React.ReactNode }) {
  const { themeMode, toggleTheme, toggleImpact, showImpact } = useAppStore()
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const utc = time.toISOString().slice(11, 19)

  return (
    <div className={styles.frame}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.classification}>MICROSOFT</span>
          <span className={styles.separator}>//</span>
          <span className={styles.systemTitle}>OFFICE OF STRATEGY & TRANSFORMATION</span>
          <span className={styles.separator}>//</span>
          <span className={styles.classification}>CONTINUOUS IMPROVEMENT</span>
        </div>
        <div className={styles.headerRight}>
          <Breadcrumb />
          <button className={styles.impactBtn} onClick={toggleImpact}>
            {showImpact ? '[ CLOSE IMPACT ]' : '[ IMPACT ]'}
          </button>
          <button className={styles.themeToggle} onClick={toggleTheme}>
            {themeMode === 'normal' ? '[ FLIR ]' : '[ NVG ]'}
          </button>
        </div>
      </header>

      <main className={styles.content}>
        {children}
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerLeft}>
          <span className={styles.statusDot} />
          <span className={styles.statusText}>SYSTEM ACTIVE</span>
          <span className={styles.statusText}>STREAM: LIVE</span>
          <span className={styles.statusText}>REFRESH: 3s</span>
        </div>
        <span className={styles.clock}>{utc} UTC</span>
      </footer>
    </div>
  )
}
