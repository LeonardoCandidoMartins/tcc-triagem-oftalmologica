import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./DetalheTrauma.module.css";
import styleNavBar from "../../components/navbar/Navbar.module.css";
import { Link } from 'react-router-dom';

function DetalheTrauma() {
  const { state } = useLocation();
  const { nome } = useParams(); // nome vem encodeURIComponent
  const navigate = useNavigate();

  const [item, setItem] = useState(state || null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    // Se veio via state (navegação interna), já temos os dados
    if (state) return;

    // Fallback: entrou direto na URL -> buscar no JSON pelo nome
    const nomeDecodificado = decodeURIComponent(nome || "");
    fetch("public/data/traumasOculares.json")
      .then((res) => res.json())
      .then((data) => {
        const lista = data.traumasOculares || [];
        const encontrado = lista.find((t) => t.nome === nomeDecodificado);
        if (!encontrado) {
          setErro("Condição não encontrada.");
          return;
        }
        setItem(encontrado);
      })
      .catch((err) => {
        console.error(err);
        setErro("Erro ao carregar os dados.");
      });
  }, [state, nome]);

  if (erro) {
    return (
      <div className={styles.container}>
        <p>{erro}</p>
        <button onClick={() => navigate(-1)}>Voltar</button>
      </div>
    );
  }

  if (!item) {
    return <div className={styles.container}>Carregando…</div>;
  }

  const { nome: titulo, foto, descricao, tratamentos = [], referencias = [] } = item;

  return (
    <>
                <nav className={styleNavBar.navbar}>
                  <Link to="/">Início</Link>
                  <Link to="/sobre">Sobre</Link>
                  <Link to="/configuracoes">Configurações</Link>
                </nav>
    <div className={styles.container}>
      <button className={styles.voltar} onClick={() => navigate(-1)}>
        ← Voltar
      </button>

      <h1 className={styles.titulo}>{titulo}</h1>

      <div className={styles.imagemWrapper}>
        {foto && foto !== "lorem" ? (
          <img src={foto} alt={titulo} className={styles.imagem} />
        ) : (
          <div className={styles.placeholder}>Sem imagem</div>
        )}
      </div>

      <p className={styles.descricao}>{descricao}</p>

      <h2 className={styles.subtitulo}>Tratamentos</h2>
      <ul className={styles.lista}>
        {tratamentos.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>

      <h2 className={styles.subtitulo}>Referências</h2>
      <ul className={styles.lista}>
        {referencias.map((ref, i) => (
          <li key={i}>{ref}</li>
        ))}
      </ul>
    </div>
    </>
  );
}

export default DetalheTrauma;
