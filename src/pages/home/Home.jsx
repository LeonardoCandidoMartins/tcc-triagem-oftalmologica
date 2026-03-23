import styles from "./Home.module.css";
import styleNavBar from "../../components/navbar/Navbar.module.css";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSettings } from "../../context/SettingsContext";
import {
  faEye,
  faDroplet,
  faStethoscope,
  faLightbulb,
  faHospital,
  faHouse,
  faCircleInfo,
  faGear,
  faDownload,
  faBookBookmark
} from "@fortawesome/free-solid-svg-icons";

function Home() {
  const { settings } = useSettings();
  const [installPrompt, setInstallPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      console.log("beforeinstallprompt event fired");
      event.preventDefault();
      setInstallPrompt(event);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  async function handleInstallApp() {
    if (!installPrompt) {
      alert("Instalação não disponível ainda.");
      return;
    }

    installPrompt.prompt();

    const choice = await installPrompt.userChoice;

    if (choice.outcome === "accepted") {
      console.log("App instalado");
    }

    setInstallPrompt(null);
  }

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
        <h1 className={styles.titulo}>Bem-vindo</h1>
        <p className={styles.subtitulo}>
          Escolha uma das categorias para começar:
        </p>
        <br />
        <br />
        <br />

        <div className={styles.prateleira}>
          <Link to="/trauma-ocular" className={`${styles.card} ${styles.c1}`}>
            <FontAwesomeIcon icon={faEye} className={styles.icon} />
            Traumas Oculares
          </Link>
          <Link to="/olho-vermelho" className={`${styles.card} ${styles.c2}`}>
            <FontAwesomeIcon icon={faDroplet} className={styles.icon} />
            Olhos Vermelhos
          </Link>
          <Link to="/auxilio-triagem" className={`${styles.card} ${styles.c3}`}>
            <FontAwesomeIcon icon={faStethoscope} className={styles.icon} />
            Auxílio de Triagem Oftalmológica
          </Link>
          {/* <Link to="/tratamento-ocular" className={`${styles.card} ${styles.c4}`}>
            Listar tipos de Tratamentos Oculares
            <FontAwesomeIcon icon={faSyringe} className={styles.icon} />
          </Link> */}
          <Link to="/luz-cobalto" className={`${styles.card} ${styles.c5}`}>
            <FontAwesomeIcon icon={faLightbulb} className={styles.icon} />
            Emitir Luz Azul Cobalto
          </Link>
          <Link to="/estabelecimentos" className={`${styles.card} ${styles.c6}`}>
            <FontAwesomeIcon icon={faHospital} className={styles.icon} />
            Estabelecimentos Especializados
          </Link>
        </div>
        <br />
        <br />
        <br />

        {installPrompt && !settings.hideInstallButton && (
          <button onClick={handleInstallApp}>
            <FontAwesomeIcon icon={faDownload} /> Baixar aplicativo
          </button>
        )}
      </div>
    </>
  );
}

export default Home;
