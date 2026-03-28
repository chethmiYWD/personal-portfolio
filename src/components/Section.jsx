import { motion } from 'framer-motion'
import { fadeUp } from '../lib/motion.js'

export default function Section({ id, eyebrow, title, children }) {
  return (
    <motion.section
      id={id}
      className="section"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
      variants={fadeUp}
    >
      <div className="sectionInner">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 className="h2">{title}</h2>
        <div className="sectionBody">{children}</div>
      </div>
    </motion.section>
  )
}
