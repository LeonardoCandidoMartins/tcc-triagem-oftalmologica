import { useState } from 'react';
import styles from './LuzCobalto.module.css';
import styleNavBar from "../../components/navbar/Navbar.module.css";
import { Link } from 'react-router-dom';

function AzulCobalto() {
  const [brilho, setBrilho] = useState(100); // valor de 0 a 100

  const handleBrilhoChange = (e) => {
    setBrilho(e.target.value);
  }

  return (
    <>
      <nav className={styleNavBar.navbar}>
        <Link to="/">Início</Link>
        <Link to="/sobre">Sobre</Link>
        <Link to="/configuracoes">Configurações</Link>
      </nav>

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
    </>
  );
}

export default AzulCobalto;
