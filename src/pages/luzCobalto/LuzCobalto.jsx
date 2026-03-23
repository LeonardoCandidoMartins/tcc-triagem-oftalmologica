import { useState } from 'react';
import styles from './LuzCobalto.module.css';
import styleNavBar from "../../components/navbar/Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BackButton from "../../components/BackButton";
import { Link } from 'react-router-dom';
import {
  faHouse,
  faCircleInfo,
  faGear,
  faBookBookmark
} from "@fortawesome/free-solid-svg-icons";

function AzulCobalto() {
  const [brilho, setBrilho] = useState(100); // valor de 0 a 100

  const handleBrilhoChange = (e) => {
    setBrilho(e.target.value);
  }

  return (
    <div className={styles.page}>
      <nav className={styleNavBar.navbar}>
        <Link to="/" aria-label="Início" title="Início">
          <FontAwesomeIcon icon={faHouse} />
        </Link>
        <Link to="/sobre" aria-label="Sobre" title="Sobre">
          <FontAwesomeIcon icon={faCircleInfo} />
        </Link>
        <Link to="/referencias" aria-label="Referências" title="Referências">
          <FontAwesomeIcon icon={faBookBookmark} />
        </Link>
        <Link to="/configuracoes" aria-label="Configurações" title="Configurações">
          <FontAwesomeIcon icon={faGear} />
        </Link>
      </nav>

      <div style={{ filter: `brightness(${brilho}%)` }} className={styles.backgroudDiv}>
        <BackButton />
      </div>

      <div
        className={styles.container}
        style={{ filter: `brightness(${brilho}%)` }}
      >
        <h1 className={styles.titulo}>Tela Azul Cobalto</h1>

        <div className={styles.aviso}>
          ⚠️ Verifique se o modo leitura do aparelho está desligado para não interferir na exibição da cor.
        </div>

        <div className={styles.barraBrilho}>
          <label htmlFor="brilho">Ajuste o brilho:</label>
          <input
            type="range"
            id="brilho"
            min="10"
            max="200"
            value={brilho}
            onChange={handleBrilhoChange}
          />
          <span>{brilho}%</span>
        </div>
      </div>
    </div>
  );
}

export default AzulCobalto;
