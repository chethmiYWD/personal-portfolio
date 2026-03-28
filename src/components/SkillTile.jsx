import { motion } from 'framer-motion'
import SkillIcon from './SkillIcon.jsx'

export default function SkillTile({ name, index }) {
  return (
    <motion.div
      className="skillTile"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.02, 0.25) }}
    >
      <SkillIcon name={name} />
      <span>{name}</span>
    </motion.div>
  )
}
