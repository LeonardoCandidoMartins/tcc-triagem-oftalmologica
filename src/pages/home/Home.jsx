import styles from "./Home.module.css";
import styleNavBar from "../../components/navbar/Navbar.module.css";
import { Link } from 'react-router-dom';

// Importa os ícones do Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faEye, 
  faDroplet, 
  faStethoscope, 
  faSyringe, 
  faLightbulb, 
  faHospital 
} from "@fortawesome/free-solid-svg-icons";

function Home() {
  return (
    <>
      <nav className={styleNavBar.navbar}>
        <Link to="/">Início</Link>
        <Link to="/sobre">Sobre</Link>
        <Link to="/configuracoes">Configurações</Link>
      </nav>

      <div className={styles.container}>
        <h1 className={styles.titulo}>Bem-vindo</h1>
        <p className={styles.subtitulo}>
          Escolha uma das categorias para começar:
        </p>

        <div className={styles.prateleira}>
          <Link to="/trauma-ocular" className={`${styles.card} ${styles.c1}`}>
            Listar tipos de Traumas Oculares 
            <FontAwesomeIcon icon={faEye} className={styles.icon} />
          </Link>
          <Link to="/olho-vermelho" className={`${styles.card} ${styles.c2}`}>
            Listar tipos de Olhos Vermelhos
            <FontAwesomeIcon icon={faDroplet} className={styles.icon} />
          </Link>
          <Link to="/auxilio-triagem" className={`${styles.card} ${styles.c3}`}>
            Auxílio de Triagem Oftalmológica
            <FontAwesomeIcon icon={faStethoscope} className={styles.icon} />
          </Link>
          <Link to="/tratamento-ocular" className={`${styles.card} ${styles.c4}`}>
            Listar tipos de Tratamentos Oculares
            <FontAwesomeIcon icon={faSyringe} className={styles.icon} />
          </Link>
          <Link to="/luz-cobalto" className={`${styles.card} ${styles.c5}`}>
            Emitir Luz Azul Cobalto
            <FontAwesomeIcon icon={faLightbulb} className={styles.icon} />
          </Link>
          <Link to="/estabelecimentos" className={`${styles.card} ${styles.c6}`}>
            Estabelecimentos Especializados
            <FontAwesomeIcon icon={faHospital} className={styles.icon} />
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
