import "./footer.css"

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-content">

        <p className="footer-text">
          © {year} All Rights Reserved
        </p>
        <a
          href="https://yaganti-spandana.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-btn"
        >
        <p className="footer-dev">
          Developed by <span>SPANDANA YAGANTI</span>
        </p>
        </a>

      </div>
    </footer>
  )
}

export default Footer