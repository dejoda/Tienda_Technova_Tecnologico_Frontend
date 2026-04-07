import { IconCameraFilled, IconMovie, IconPhoneCallFilled } from "@tabler/icons-react";
import "./style/Footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-inner">

        <div className="footer-brand">
          <div className="logo-mark-small" aria-hidden>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M3 12c0-4.97 4.03-9 9-9" stroke="#ff2d95" strokeWidth="1.4" strokeLinecap="round"/>
              <path d="M21 12c0 4.97-4.03 9-9 9" stroke="#7b61ff" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </div>

          <div className="brand-text">TECHNOVA</div>
          <div className="slogan">Tecnología moderna para tu día a día</div>
        </div>

        <div className="footer-links">

          <div className="col">
            <h4>Productos</h4>
            <ul>
              <li><a href="#">Laptops</a></li>
              <li><a href="#">Mouses</a></li>
              <li><a href="#">Teclados</a></li>
            </ul>
          </div>

          <div className="col">
            <h4>Empresa</h4>
            <ul>
              <li><a href="#">Nosotros</a></li>
              <li><a href="#">Soporte</a></li>
              <li><a href="#">Contacto</a></li>
            </ul>
          </div>

          <div className="col social">
            <h4>Síguenos</h4>
            <div className="social-icons">
              <a href="#"><IconPhoneCallFilled /></a>
              <a href="#"><IconCameraFilled /></a>
              <a href="#"><IconMovie stroke={2} /></a>
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          <div>© {new Date().getFullYear()} TECHNOVA. Todos los derechos reservados.</div>

          <div className="legal">
            <a href="#">Términos</a>
            <span>·</span>
            <a href="#">Privacidad</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;