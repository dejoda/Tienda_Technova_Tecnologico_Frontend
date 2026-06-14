
import {
  Link
} from "react-router";

import {
  IconCameraFilled,
  IconMovie,
  IconPhoneCallFilled
} from "@tabler/icons-react";

import "./style/Footer.css";

const Footer = () => {

  return (

    <footer className="site-footer">

      <div className="footer-inner">

        {/* =========================
            BRAND
           ========================= */}
        <div className="footer-brand">

          <div
            className="logo-mark-small"
            aria-hidden
          >

            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
            >

              <path
                d="M3 12c0-4.97 4.03-9 9-9"
                stroke="#ff2d95"
                strokeWidth="1.5"
                strokeLinecap="round"
              />

              <path
                d="M21 12c0 4.97-4.03 9-9 9"
                stroke="#7b61ff"
                strokeWidth="1.5"
                strokeLinecap="round"
              />

            </svg>

          </div>

          <h3 className="brand-title">
            TECHNOVA
          </h3>

          <p className="slogan">

            Tecnología moderna para tu día a día.
            Productos de calidad con innovación
            constante.

          </p>

        </div>

        {/* =========================
            LINKS
           ========================= */}
        <div className="footer-grid">

          {/* PRODUCTOS */}
          <div className="col">

            <h4>Productos</h4>

            <ul>

              <li>
                <Link to="/productos?categoria=Laptops">
                  Laptops
                </Link>
              </li>

              <li>
                <Link to="/productos?categoria=Mouses">
                  Mouses
                </Link>
              </li>

              <li>
                <Link to="/productos?categoria=Teclados">
                  Teclados
                </Link>
              </li>

            </ul>

          </div>

          {/* EMPRESA */}
          <div className="col">

            <h4>Empresa</h4>

            <ul>

              <li>
                <Link to="/nosotros">
                  Nosotros
                </Link>
              </li>

              <li>
                <Link to="/soporte">
                  Soporte
                </Link>
              </li>

              <li>
                <Link to="/contacto">
                  Contacto
                </Link>
              </li>

            </ul>

          </div>

          {/* REDES */}
          <div className="col">

            <h4>Síguenos</h4>

            <div className="social-icons">

              <a
                href="tel:+51999999999"
                aria-label="Teléfono"
              >
                <IconPhoneCallFilled />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <IconCameraFilled />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
              >
                <IconMovie stroke={2} />
              </a>

            </div>

          </div>

        </div>

      </div>

      {/* =========================
          BOTTOM
         ========================= */}
      <div className="footer-bottom">

        <span>
          © {new Date().getFullYear()} TECHNOVA
        </span>

        <div className="legal">

          <Link to="/terminos">
            Términos
          </Link>

          <Link to="/privacidad">
            Privacidad
          </Link>

        </div>

      </div>

    </footer>
  );
};

export default Footer;
