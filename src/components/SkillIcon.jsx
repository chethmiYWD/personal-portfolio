import React from 'react'
import * as SI from 'react-icons/si'
import { FaCode } from 'react-icons/fa6'

const get = (key) => SI[key]

const ICONS = {
  Java: get('SiJava') || FaCode,
  Python: get('SiPython') || FaCode,
  HTML: get('SiHtml5') || FaCode,
  HTML5: get('SiHtml5') || FaCode,
  CSS: get('SiCss3') || FaCode,
  JavaScript: get('SiJavascript') || FaCode,
  SQL: get('SiMicrosoftsqlserver') || FaCode,
  React: get('SiReact') || FaCode,
  Angular: get('SiAngular') || FaCode,
  'Spring Boot': get('SiSpringboot') || FaCode,
  'Node.js': get('SiNodedotjs') || FaCode,
  Groovy: get('SiApachegroovy') || FaCode,
  Jenkins: get('SiJenkins') || FaCode,
  GitHub: get('SiGithub') || FaCode,
  GitLab: get('SiGitlab') || FaCode,
  Postman: get('SiPostman') || FaCode,
  Jira: get('SiJira') || FaCode,
  MySQL: get('SiMysql') || FaCode,
}

export default function SkillIcon({ name }) {
  const Icon = ICONS[name] || null
  if (!Icon) return null
  return (
    <span className="skillIcon" aria-hidden="true">
      <Icon />
    </span>
  )
}
