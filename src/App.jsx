import { useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaLinkedin, FaGithub } from 'react-icons/fa'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Navbar from './components/Navbar.jsx'
import Section from './components/Section.jsx'
import Timeline from './components/Timeline.jsx'
import ProjectCard from './components/ProjectCard.jsx'
import SkillTile from './components/SkillTile.jsx'
import Footer from './components/Footer.jsx'
import { profile } from './data/profile.js'
import { stagger } from './lib/motion.js'

const NAV_HEIGHT = 76

function openInNewTab(url) {
  if (!url) return
  window.open(url, '_blank', 'noreferrer')
}

export default function App() {
  const projectRef = useRef(null)

  const jumpTo = useCallback((id) => {
    const el = document.getElementById(id)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.pageYOffset - NAV_HEIGHT
    window.scrollTo({ top: y, behavior: 'smooth' })
  }, [])

  const scrollProjects = (dir) => {
    const el = projectRef.current
    if (!el) return
    const amount = Math.min(520, el.clientWidth * 0.85)
    el.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  return (
    <div className="app">
      <Navbar onJump={jumpTo} />

      <main className="main" style={{ paddingTop: NAV_HEIGHT }}>
      <Section id="about" eyebrow="About" title={profile.name}>
        <div className="aboutCenter">
          <div className="aboutCardWide">
            <p className="lead center">{profile.headline}</p>
            <p className="p center">{profile.about}</p>

            <div className="aboutContacts centered" aria-label="Contact shortcuts">
              <a className="pill" href={`mailto:${profile.email}`}>
                <span className="pillIcon" aria-hidden="true"><FaEnvelope /></span>
                <span>{profile.email}</span>
              </a>

              <a className="pill" href={`tel:${String(profile.phone).replace(/\s+/g, '')}`}>
                <span className="pillIcon" aria-hidden="true"><FaPhoneAlt /></span>
                <span>{profile.phone}</span>
              </a>

              <span className="pill" role="text">
                <span className="pillIcon" aria-hidden="true"><FaMapMarkerAlt /></span>
                <span>{profile.location}</span>
              </span>
            </div>

            <div className="socialRow centered">
              <button type="button" className="socialBtn" onClick={() => openInNewTab(profile.links.linkedin)}>
                <span className="socialIcon" aria-hidden="true"><FaLinkedin /></span>
                <span>LinkedIn</span>
              </button>

              <button type="button" className="socialBtn" onClick={() => openInNewTab(profile.links.github)}>
                <span className="socialIcon" aria-hidden="true"><FaGithub /></span>
                <span>GitHub</span>
              </button>
            </div>
          </div>

          <div className="aboutPhoto">
            <div className="photo">
              <img
                src="profile.jpg"
                alt="Profile"
              />
            </div>
          </div>
        </div>
      </Section>

        <Section id="experience"  title="Work Experience">
          <motion.div className="xpList" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
            {profile.experience.map((x, idx) => (
              <motion.article key={idx} className="card xpCard" variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}>
                <div className="xpHead">
                  <div className="logoPlaceholder" aria-hidden="true">
                    {x.logo ? (
                      <img
                        className="companyLogo"
                        src={x.logo}
                        alt={`${x.company} logo`}
                        loading="lazy"
                      />
                    ) : null}
                  </div>
                  <div className="xpTitle">
                    <h3 className="h3">{x.role}</h3>
                    <p className="muted"><b>{x.company}</b></p>
                  </div>
                  {x.period ? <span className="badge badgeStrong">{x.period}</span> : null}
                </div>

                <ul className="bullets">
                  {x.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </motion.div>
        </Section>

        <Section id="education" title="Education">
          <Timeline
            items={profile.education.map((e) => ({
              title: e.title,
              institute: e.institute,
              period: e.period,
              details: e.details,
            }))}
          />
        </Section>

        <Section id="projects" title="Projects">
          <div className="projectWrap">
            <button className="arrowBtn left" type="button" onClick={() => scrollProjects(-1)} aria-label="Scroll projects left">
              <ChevronLeft size={20} />
            </button>

            <motion.div
              ref={projectRef}
              className="projectRow"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              {profile.projects.map((p, i) => (
                <ProjectCard key={p.name + i} project={p} onOpen={openInNewTab} />
              ))}
            </motion.div>

            <button className="arrowBtn right" type="button" onClick={() => scrollProjects(1)} aria-label="Scroll projects right">
              <ChevronRight size={20} />
            </button>
          </div>
        </Section>

        <Section id="skills" title="Skills">
          <div className="skillStack">
            <div>
              <h3 className="h3">Programming Skills</h3>
              <div className="skillTiles">
                {profile.skills.programming.map((s, i) => (
                  <SkillTile key={s} name={s} index={i} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="h3">Tools & Platforms</h3>
              <div className="skillTiles">
                {profile.skills.toolsPlatforms.map((s, i) => (
                  <SkillTile key={s} name={s} index={i} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="h3">Soft Skills</h3>
              <div className="skillTiles">
                {profile.skills.softSkills.map((s, i) => (
                  <SkillTile key={s} name={s} index={i} />
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section id="contact" title="Contact">
          <div className="contactCard">

            {/* Email */}
            <div className="contactItem">
              <div className="contactIcon" aria-hidden="true">
                <FaEnvelope />
              </div>
              <a className="contactValue" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </div>

            {/* Phone */}
            <div className="contactItem">
              <div className="contactIcon" aria-hidden="true">
                <FaPhoneAlt />
              </div>
              <a
                className="contactValue"
                href={`tel:${String(profile.phone).replace(/\s+/g, '')}`}
              >
                {profile.phone}
              </a>
            </div>

            {/* Location */}
            <div className="contactItem">
              <div className="contactIcon" aria-hidden="true">
                <FaMapMarkerAlt />
              </div>
              <p className="contactValue">{profile.location}</p>
            </div>

            {/* LinkedIn */}
            <div
              className="contactItem clickable"
              onClick={() => openInNewTab(profile.links.linkedin)}
              role="button"
              tabIndex={0}
            >
              <div className="contactIcon" aria-hidden="true">
                <FaLinkedin />
              </div>
              <p className="contactValue">LinkedIn</p>
            </div>

            {/* GitHub */}
            <div
              className="contactItem clickable"
              onClick={() => openInNewTab(profile.links.github)}
              role="button"
              tabIndex={0}
            >
              <div className="contactIcon" aria-hidden="true">
                <FaGithub />
              </div>
              <p className="contactValue">GitHub</p>
            </div>

          </div>
        </Section>

        <Footer onJump={jumpTo} />
      </main>
    </div>
  )
}
