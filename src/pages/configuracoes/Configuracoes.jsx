// src/pages/Configuracoes.jsx
import styles from "./Configuracoes.module.css";
import interruptorStyles from "../../components/interruptor/Interruptor.module.css";
import cardBaseConteudoStyles from "../../components/cardBaseConteudo/CardBaseConteudo.module.css";
import styleNavBar from "../../components/navbar/Navbar.module.css";
import BackButton from "../../components/BackButton";
import { Link } from "react-router-dom";
import { useSettings } from "../../context/SettingsContext";
import {
  faHouse,
  faCircleInfo,
  faGear,
  faBookBookmark
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Configuracoes() {
  const { settings, updateSetting } = useSettings();

  return (
    <>
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

      <div className={styles.container}>
        <BackButton />
        <h1 className={styles.titulo}>Configurações</h1>
        <div className={`${cardBaseConteudoStyles.card} ${styles.card}`}>

          <div className={styles.opcao}>
            <p>Modo noturno ?</p>
            <div className={styles.interruptor}>
              <label className={interruptorStyles.switch}>
                <input
                  type="checkbox"
                  id="idModoNoturno"
                  checked={settings.darkMode}
                  onChange={(e) => updateSetting("darkMode", e.target.checked)}
                />
                <span className={interruptorStyles.slider}></span>
              </label>
            </div>
          </div>

          <div className={styles.opcao}>
            <p>Censurar imagens ?</p>
            <div className={styles.interruptor}>
              <label className={interruptorStyles.switch}>
                <input
                  type="checkbox"
                  id="idSensurarImagem"
                  checked={settings.censorImages}
                  onChange={(e) => updateSetting("censorImages", e.target.checked)}
                />
                <span className={interruptorStyles.slider}></span>
              </label>
            </div>
          </div>

          <div className={styles.opcao}>
            <p>Esconder botão de Baixar Aplicativo ?</p>
            <div className={styles.interruptor}>
              <label className={interruptorStyles.switch}>
                <input
                  type="checkbox"
                  id="idEsconderBaixarApp"
                  checked={settings.hideInstallButton}
                  onChange={(e) =>
                    updateSetting("hideInstallButton", e.target.checked)
                  }
                />
                <span className={interruptorStyles.slider}></span>
              </label>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Configuracoes;
