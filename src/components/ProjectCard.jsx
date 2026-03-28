import { motion } from 'framer-motion'
import { fadeUp } from '../lib/motion.js'
import { ExternalLink } from 'lucide-react'

export default function ProjectCard({ project, onOpen }) {
  const clickable = Boolean(project.link)

  return (
    <motion.article
      className={clickable ? 'card projectCard clickable' : 'card projectCard'}
      variants={fadeUp}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.18 }}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      onClick={() => clickable && onOpen(project.link)}
      onKeyDown={(e) => {
        if (!clickable) return
        if (e.key === 'Enter' || e.key === ' ') onOpen(project.link)
      }}
      aria-label={clickable ? `Open ${project.name}` : project.name}
    >
      <div className="projectHead">
        <h3 className="h3">{project.name}</h3>
        {project.period ? <span className="badge">{project.period}</span> : null}
      </div>

      <p className="p">{project.description}</p>

      <div className="chips">
        {project.tech?.map((t) => (
          <span key={t} className="chip">
            {t}
          </span>
        ))}
      </div>

      <div className="projectFoot">
        {clickable ? (
          <span className="visit">
            Visit <ExternalLink size={16} />
          </span>
        ) : (
          <span className="muted">Not deployed</span>
        )}
      </div>
    </motion.article>
  )
}
