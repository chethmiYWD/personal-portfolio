import { motion } from 'framer-motion'
import { fadeUp, stagger } from '../lib/motion.js'

export default function Timeline({ items }) {
  return (
    <motion.ul
      className="timeline"
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {items.map((it, idx) => (
        <motion.li key={idx} className="timelineItem" variants={fadeUp}>
          <div className="timelineTop">
            <h3 className="h3">{it.title}</h3>
            {it.period ? <span className="badge">{it.period}</span> : null}
          </div>
          <p className="muted">{it.institute}</p>
          {it.details?.length ? (
            <ul className="bullets">
              {it.details.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          ) : null}
        </motion.li>
      ))}
    </motion.ul>
  )
}
