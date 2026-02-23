import { useRef, useEffect, useCallback } from 'react'
import { useAppStore } from '../../store/useAppStore'
import { locations, arcs } from '../../data/locations'
import styles from './GlobeView.module.css'
import * as Cesium from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'

export function GlobeView() {
  const containerRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<Cesium.Viewer | null>(null)
  const drillTo = useAppStore(s => s.drillTo)
  const themeMode = useAppStore(s => s.themeMode)

  const initGlobe = useCallback(async () => {
    if (!containerRef.current || viewerRef.current) return

    const viewer = new Cesium.Viewer(containerRef.current, {
      baseLayerPicker: false,
      geocoder: false,
      homeButton: false,
      sceneModePicker: false,
      navigationHelpButton: false,
      animation: false,
      timeline: false,
      fullscreenButton: false,
      infoBox: false,
      selectionIndicator: false,
      skyBox: false,
      skyAtmosphere: false,
      baseLayer: false,
      requestRenderMode: false,
    })

    viewer.scene.backgroundColor = Cesium.Color.fromCssColorString('#0a0a0f')
    viewer.scene.globe.baseColor = Cesium.Color.fromCssColorString('#080810')
    viewer.scene.globe.showGroundAtmosphere = false
    viewer.scene.fog.enabled = false

    // Try to load dark basemap, fallback to plain dark globe
    try {
      const provider = await Cesium.IonImageryProvider.fromAssetId(3812)
      viewer.imageryLayers.addImageryProvider(provider)
      const layer = viewer.imageryLayers.get(0)
      if (layer) {
        layer.brightness = 0.6
        layer.contrast = 1.4
        layer.saturation = 0.3
      }
    } catch {
      // Token may not be valid - use simple dark earth style
      console.log('Cesium Ion basemap unavailable, using dark globe')
    }

    // Add location entities
    locations.forEach(loc => {
      const color = loc.status === 'red'
        ? Cesium.Color.fromCssColorString('#ff0040')
        : loc.status === 'yellow'
          ? Cesium.Color.fromCssColorString('#ffbb00')
          : Cesium.Color.fromCssColorString('#00ff41')

      const size = Math.max(8, Math.min(20, loc.headcount / 4000))

      viewer.entities.add({
        id: loc.id,
        position: Cesium.Cartesian3.fromDegrees(loc.lng, loc.lat),
        point: {
          pixelSize: size,
          color: color.withAlpha(0.9),
          outlineColor: color,
          outlineWidth: 2,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        },
        label: {
          text: `${loc.label}\n${(loc.headcount / 1000).toFixed(0)}K`,
          font: '11px JetBrains Mono, monospace',
          fillColor: color.withAlpha(0.8),
          outlineColor: Cesium.Color.BLACK,
          outlineWidth: 2,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          pixelOffset: new Cesium.Cartesian2(0, -24),
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
        },
      })
    })

    // Add arcs between locations
    arcs.forEach(arc => {
      const from = locations.find(l => l.id === arc.from)
      const to = locations.find(l => l.id === arc.to)
      if (!from || !to) return

      // Create arc with midpoint elevation
      const midLat = (from.lat + to.lat) / 2
      const midLng = (from.lng + to.lng) / 2
      const distance = Cesium.Cartesian3.distance(
        Cesium.Cartesian3.fromDegrees(from.lng, from.lat),
        Cesium.Cartesian3.fromDegrees(to.lng, to.lat)
      )
      const height = Math.min(distance * 0.15, 2000000)

      const positions = Cesium.Cartesian3.fromDegreesArrayHeights([
        from.lng, from.lat, 0,
        midLng, midLat, height,
        to.lng, to.lat, 0,
      ])

      viewer.entities.add({
        polyline: {
          positions,
          width: Math.max(1, arc.volume * 3),
          material: new Cesium.PolylineGlowMaterialProperty({
            glowPower: 0.2,
            color: Cesium.Color.fromCssColorString('#00ff41').withAlpha(0.4),
          }),
        },
      })
    })

    // Handle clicks
    const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
    handler.setInputAction((click: { position: Cesium.Cartesian2 }) => {
      const picked = viewer.scene.pick(click.position)
      if (picked && picked.id && picked.id.id) {
        const loc = locations.find(l => l.id === picked.id.id)
        if (loc && loc.drillable) {
          // Fly to location then drill down
          viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(loc.lng, loc.lat, 50000),
            duration: 1.5,
            complete: () => {
              drillTo('campus', { locationId: loc.id })
            },
          })
        }
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

    // Set initial view
    viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(-30, 20, 20000000),
    })

    // Slow rotation
    let lastTime = Date.now()
    viewer.clock.onTick.addEventListener(() => {
      const now = Date.now()
      const dt = (now - lastTime) / 1000
      lastTime = now
      viewer.scene.camera.rotate(Cesium.Cartesian3.UNIT_Z, -0.02 * dt)
    })

    viewerRef.current = viewer
  }, [drillTo])

  useEffect(() => {
    initGlobe()
    return () => {
      if (viewerRef.current && !viewerRef.current.isDestroyed()) {
        viewerRef.current.destroy()
        viewerRef.current = null
      }
    }
  }, [initGlobe])

  // Update visuals on theme change
  useEffect(() => {
    if (!viewerRef.current) return
    const isFlir = themeMode === 'flir'
    const layer = viewerRef.current.imageryLayers.get(0)
    if (layer) {
      layer.brightness = isFlir ? 0.4 : 0.6
      layer.saturation = isFlir ? 0 : 0.3
      layer.hue = isFlir ? 0.05 : 0
    }
  }, [themeMode])

  return (
    <div className={styles.container}>
      <div ref={containerRef} className={styles.globe} />
      <div className={styles.hud}>
        <div className={styles.hudPanel}>
          <div className={styles.hudTitle}>CI PORTFOLIO // GLOBAL</div>
          <div className={styles.hudGrid}>
            <div className={styles.metric}>
              <span className={styles.metricValue}>8</span>
              <span className={styles.metricLabel}>ACTIVE KAIZENS</span>
            </div>
            <div className={styles.metric}>
              <span className={styles.metricValue}>$78.4M</span>
              <span className={styles.metricLabel}>ANNUALIZED SAVINGS</span>
            </div>
            <div className={styles.metric}>
              <span className={styles.metricValue}>3,400</span>
              <span className={styles.metricLabel}>PARTICIPANTS YTD</span>
            </div>
            <div className={styles.metric}>
              <span className={styles.metricValue}>16</span>
              <span className={styles.metricLabel}>PROCESSES IMPROVED</span>
            </div>
          </div>
          <div className={styles.hudHint}>CLICK REDMOND TO DRILL DOWN</div>
        </div>
      </div>
    </div>
  )
}
