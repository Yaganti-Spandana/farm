import "./Footer.css"

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-content">

        <p className="footer-line">
          © {year} All Rights Reserved | Developed by{" "}
          <a
            href="https://yaganti-spandana.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="dev-link"
          >
            SPANDANA YAGANTI
          </a>
        </p>

      </div>
    </footer>
  )
}

export default Footer