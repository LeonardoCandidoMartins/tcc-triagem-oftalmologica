// src/pages/Configuracoes.jsx
import styles from "./Configuracoes.module.css";
import interruptorStyles from "../../components/interruptor/Interruptor.module.css";
import cardBaseConteudoStyles from "../../components/cardBaseConteudo/CardBaseConteudo.module.css";
import styleNavBar from "../../components/navbar/Navbar.module.css";
import { Link } from "react-router-dom";

function Configuracoes() {
  return (
    <>
      <nav className={styleNavBar.navbar}>
        <Link to="/">Início</Link>
        <Link to="/sobre">Sobre</Link>
        <Link to="/configuracoes">Configurações</Link>
      </nav>

      <div className={styles.container}>
        <h1 className={styles.titulo}>Configurações</h1>
        <div className={`${cardBaseConteudoStyles.card} ${styles.card}`}>

          <div className={styles.opcao}>
            <p>Modo noturno ?</p>
            <div className={styles.interruptor}>
              <label className={interruptorStyles.switch}>
                <input type="checkbox" id="idModoNoturno" />
                <span className={interruptorStyles.slider}></span>
              </label>
            </div>
          </div>

          <div className={styles.opcao}>
            <p>Censurar imagens ?</p>
            <div className={styles.interruptor}>
              <label className={interruptorStyles.switch}>
                <input type="checkbox" id="idSensurarImagem" />
                <span className={interruptorStyles.slider}></span>
              </label>
            </div>
          </div>

          <div className={styles.opcao}>
            <p>Esconder botão de Baixar Aplicativo ?</p>
            <div className={styles.interruptor}>
              <label className={interruptorStyles.switch}>
                <input type="checkbox" id="idEsconderBaixarApp" />
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
