import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Let's Connect</h3>
            <p className="footer-text">
              Always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Email</h4>
            <a href="mailto:hello@example.com" className="footer-link" data-cursor="magnetic">
              hello@example.com
            </a>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Social</h4>
            <div className="footer-social">
              <a href="#" className="footer-link" data-cursor="magnetic">LinkedIn</a>
              <a href="#" className="footer-link" data-cursor="magnetic">Twitter</a>
              <a href="#" className="footer-link" data-cursor="magnetic">Dribbble</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Premium Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer



