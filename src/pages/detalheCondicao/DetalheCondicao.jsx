import { useLocation, useNavigate } from "react-router-dom";
import styles from "./DetalheCondicao.module.css";
import styleNavBar from "../../components/navbar/Navbar.module.css";
import { Link } from 'react-router-dom';

function DetalheCondicao() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className={styles.container}>
        <p>Nenhuma condição foi selecionada.</p>
        <button onClick={() => navigate(-1)}>Voltar</button>
      </div>
    );
  }

  const { nome, foto, descricao, tratamentos, referencias } = state;

  return (
    <>
        <nav className={styleNavBar.navbar}>
          <Link to="/">Início</Link>
          <Link to="/sobre">Sobre</Link>
          <Link to="/configuracoes">Configurações</Link>
        </nav>
    <div className={styles.container}>
      <h1>{nome}</h1>
      <img src={foto} alt={nome} className={styles.imagem} />
      <p>{descricao}</p>

      <h2>Tratamentos</h2>
      <ul>
        {tratamentos.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>

      <h2>Referências</h2>
      <ul>
        {referencias.map((ref, i) => (
          <li key={i}>{ref}</li>
        ))}
      </ul>

      <button onClick={() => navigate(-1)}>Voltar</button>
    </div>
    </>
  );
}

export default DetalheCondicao;
