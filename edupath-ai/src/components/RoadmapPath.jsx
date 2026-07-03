import React, { useMemo } from 'react'
import { Check, Lock, MapPin, RotateCw, Sparkle } from 'lucide-react'

const COLORS = {
  mastered: '#2B6E5E',
  'skipped-mastered': '#2B6E5E',
  completed: '#3E8F7A',
  available: '#E0A339',
  locked: '#C7CBBE',
  'retry-recommended': '#C1502E'
}

function layout(modules) {
  const spacing = 130
  const amplitude = 90
  const centerX = 220
  const points = []
  let t = 0
  modules.forEach((m, i) => {
    if (m.isRemedial) {
      const prev = points[points.length - 1]
      points.push({
        ...m,
        x: prev ? prev.x + (prev.branch ? -110 : 110) : centerX + 110,
        y: prev ? prev.y + 46 : 40,
        branch: !prev?.branch,
        isRemedial: true
      })
    } else {
      const x = centerX + amplitude * Math.sin(t * 0.85)
      const y = 40 + t * spacing
      points.push({ ...m, x, y })
      t += 1
    }
  })
  return points
}

export default function RoadmapPath({ modules, onSelect, selectedId }) {
  const points = useMemo(() => layout(modules), [modules])
  const mainPoints = points.filter((p) => !p.isRemedial)
  const pathD = `M ${mainPoints.map((p) => `${p.x},${p.y}`).join(' L ')}`
  const height = Math.max(...points.map((p) => p.y)) + 80
  const width = 440

  return (
    <div className="overflow-x-auto rounded-2xl border border-ink/10 bg-white/40 p-4">
      <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} className="mx-auto">
        <path d={pathD} fill="none" stroke="#C7CBBE" strokeWidth="3" strokeLinecap="round" />
        {points
          .filter((p) => p.isRemedial)
          .map((p, i) => {
            const source = points.find((sp) => sp.id === p.remedialOf)
            if (!source) return null
            return (
              <path
                key={`branch-${i}`}
                d={`M ${source.x},${source.y} Q ${p.branch ? source.x - 60 : source.x + 60},${(source.y + p.y) / 2} ${p.x},${p.y}`}
                fill="none"
                stroke="#E0A339"
                strokeWidth="2"
                className="trail-dash"
              />
            )
          })}

        {points.map((p) => {
          const color = COLORS[p.status] || COLORS.locked
          const isSelected = p.id === selectedId
          return (
            <g
              key={p.id}
              transform={`translate(${p.x},${p.y})`}
              onClick={() => onSelect(p)}
              className="cursor-pointer"
            >
              {p.status === 'available' && (
                <circle r="20" fill="none" stroke={color} strokeWidth="2" opacity="0.5">
                  <animate attributeName="r" values="16;24;16" dur="2.2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;0.05;0.6" dur="2.2s" repeatCount="indefinite" />
                </circle>
              )}
              <circle
                r={p.isRemedial ? 11 : 15}
                fill={p.status === 'locked' ? '#EEF0EA' : color}
                stroke={isSelected ? '#12131A' : color}
                strokeWidth={isSelected ? 2.5 : 1.5}
              />
              <IconGlyph status={p.status} isRemedial={p.isRemedial} />
              <text
                x={p.branch === false || (!p.isRemedial && p.x > width / 2) ? -22 : 22}
                y="4"
                fontSize={p.isRemedial ? 9.5 : 11}
                fontFamily="'IBM Plex Mono', monospace"
                fill="#12131A"
                textAnchor={p.branch === false || (!p.isRemedial && p.x > width / 2) ? 'end' : 'start'}
              >
                {p.title.length > 24 ? p.title.slice(0, 22) + '\u2026' : p.title}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

function IconGlyph({ status, isRemedial }) {
  const size = isRemedial ? 10 : 13
  const props = { size, color: status === 'locked' ? '#8A8F7C' : '#FAF8F4', x: -size / 2, y: -size / 2 }
  if (status === 'locked') return <Lock {...props} />
  if (status === 'mastered' || status === 'skipped-mastered') return <Check {...props} />
  if (status === 'available') return <MapPin {...props} />
  if (status === 'retry-recommended') return <RotateCw {...props} />
  if (status === 'completed') return <Sparkle {...props} />
  return null
}
