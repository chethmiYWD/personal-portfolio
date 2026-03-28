export default function Footer({ onJump }) {
  return (
    <footer className="footer">
      <div className="footerInner">
        <p className="footerName">Chethmi Dissanayake</p>
        <p className="muted">Colorful portfolio • built with React</p>
        <div className="footerLinks">
          {['about', 'education', 'experience', 'projects', 'skills', 'extras', 'contact'].map((id) => (
            <button key={id} type="button" className="footerLink" onClick={() => onJump(id)}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </div>
        <p className="muted">© {new Date().getFullYear()} Chethmi Dissanayake</p>
      </div>
    </footer>
  )
}
