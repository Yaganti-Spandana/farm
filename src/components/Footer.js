import "./Footer.css"

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-content">

        <p className="footer-text">
          © {year} All Rights Reserved
        </p><br></br>
        <p className="footer-dev">
          Developed by 
        </p>
        <a
          href="https://yaganti-spandana.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-btn"
        >
        <p className="footer-dev">
         <span>SPANDANA YAGANTI</span>
        </p>
        </a>

      </div>
    </footer>
  )
}

export default Footer