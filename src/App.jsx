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
                  <span className="pillIcon" aria-hidden="true">
                    <FaEnvelope />
                  </span>
                  <span>{profile.email}</span>
                </a>
                <a className="pill" href={`tel:${String(profile.phone).replace(/\s+/g, '')}`}>
                  <span className="pillIcon" aria-hidden="true">
                    <FaPhoneAlt />
                  </span>
                  <span>{profile.phone}</span>
                </a>
                <span className="pill" role="text">
                  <span className="pillIcon" aria-hidden="true">
                    <FaMapMarkerAlt />
                  </span>
                  <span>{profile.location}</span>
                </span>
              </div>

              <div className="socialRow centered">
                <button type="button" className="socialBtn" onClick={() => openInNewTab(profile.links.linkedin)}>
                  <span className="socialIcon" aria-hidden="true">
                    <FaLinkedin />
                  </span>
                  <span>LinkedIn</span>
                </button>
                <button type="button" className="socialBtn" onClick={() => openInNewTab(profile.links.github)}>
                  <span className="socialIcon" aria-hidden="true">
                    <FaGithub />
                  </span>
                  <span>GitHub</span>
                </button>
              </div>
            </div>

            <div className="aboutPhoto">
              <div className="photo">
                <img
                  src="/profile.jpg"
                  onError={(e) => {
                    e.currentTarget.src = '/profile-placeholder.svg'
                  }}
                  alt="Profile"
                />
              </div>
            </div>
          </div>
        </Section>

        <Section id="education" eyebrow="Education" title="Education">
          <Timeline
            items={profile.education.map((e) => ({
              title: e.title,
              institute: e.institute,
              period: e.period,
              details: e.details,
            }))}
          />
        </Section>

        <Section id="experience" eyebrow="Work" title="Experience">
          <motion.div className="xpList" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
            {profile.experience.map((x, idx) => (
              <motion.article key={idx} className="card xpCard" variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}>
                <div className="xpHead">
                  <div className="logoPlaceholder" aria-hidden="true" />
                  <div className="xpTitle">
                    <h3 className="h3">{x.role}</h3>
                    <p className="muted">{x.company}</p>
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

        <Section id="projects" eyebrow="Projects" title="Projects">
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

        <Section id="skills" eyebrow="Skills" title="Skills">
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

        <Section id="extras" eyebrow="Extras" title="Extras">
          <div className="extrasGrid">
            <div className="card extrasCard">
              <h3 className="h3">Extra‑curricular Activities</h3>
              <ul className="bullets">
                {profile.activities.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>

            <div className="card extrasCard">
              <h3 className="h3">Certifications & Achievements</h3>
              <ul className="bullets">
                {profile.certifications.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>

            <div className="card extrasCard refs">
              <h3 className="h3">Referees</h3>
              <div className="refList">
                {profile.referees.map((r, i) => (
                  <div key={i} className="refItem">
                    <p className="refName">{r.name}</p>
                    <p className="muted">{r.title}</p>
                    <p className="muted small">{r.email} • {r.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section id="contact" eyebrow="Contact" title="Contact">
          <div className="contactCard">
            <div className="contactItem">
              <div className="contactIcon" aria-hidden="true">
                <FaEnvelope />
              </div>
              <div>
                <p className="muted small">Email</p>
                <a className="contactLink" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
              </div>
            </div>

            <div className="contactItem">
              <div className="contactIcon" aria-hidden="true">
                <FaPhoneAlt />
              </div>
              <div>
                <p className="muted small">Phone</p>
                <a className="contactLink" href={`tel:${String(profile.phone).replace(/\s+/g, '')}`}>
                  {profile.phone}
                </a>
              </div>
            </div>

            <div className="contactItem">
              <div className="contactIcon" aria-hidden="true">
                <FaMapMarkerAlt />
              </div>
              <div>
                <p className="muted small">Location</p>
                <p className="p">{profile.location}</p>
              </div>
            </div>

            <div className="contactItem">
              <div className="contactIcon" aria-hidden="true">
                <FaLinkedin />
              </div>
              <div>
                <p className="muted small">LinkedIn</p>
                <button className="linkBtn" type="button" onClick={() => openInNewTab(profile.links.linkedin)}>
                  Open profile
                </button>
              </div>
            </div>

            <div className="contactItem">
              <div className="contactIcon" aria-hidden="true">
                <FaGithub />
              </div>
              <div>
                <p className="muted small">GitHub</p>
                <button className="linkBtn" type="button" onClick={() => openInNewTab(profile.links.github)}>
                  Open profile
                </button>
              </div>
            </div>
          </div>
        </Section>

        <Footer onJump={jumpTo} />
      </main>
    </div>
  )
}
