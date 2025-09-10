import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import styles from "./DetalheTratamento.module.css";
import styleNavBar from "../../components/navbar/Navbar.module.css";

function DetalheTratamento() {
  const { state } = useLocation();
  const { nomeTratamento } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(state || null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (state) return;

    const nomeDecodificado = decodeURIComponent(nomeTratamento || "");
    fetch("/data/tratamentosOculares.json")
      .then((res) => res.json())
      .then((data) => {
        const encontrado = data.find((t) => t.nome === nomeDecodificado);
        if (!encontrado) {
          setErro("Tratamento não encontrado.");
          return;
        }
        setItem(encontrado);
      })
      .catch((err) => {
        console.error(err);
        setErro("Erro ao carregar os dados.");
      });
  }, [state, nomeTratamento]);

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

  const {
    nome,
    foto,
    descricao,
    itensNecessarios = [],
    preOperatorio = [],
    posOperatorio = [],
    consideracoes = [],
  } = item;

  return (
    <>
      <nav className={styleNavBar.navbar}>
        <Link to="/">Início</Link>
        <Link to="/sobre">Sobre</Link>
        <Link to="/configuracoes">Configurações</Link>
      </nav>

      <div className={styles.container}>
        {/* <button className={styles.voltar} onClick={() => navigate(-1)}>
          ← Voltar
        </button> */}

        <h1 className={styles.titulo}>{nome}</h1>

        <div className={styles.imagemWrapper}>
          {foto && foto !== "lorem" ? (
            <img src={foto} alt={nome} className={styles.imagem} />
          ) : (
            <div className={styles.placeholder}>Sem imagem</div>
          )}
        </div>

        <p className={styles.descricao}>{descricao}</p>

        <h2 className={styles.subtitulo}>Itens Necessários</h2>
        <ul className={styles.lista}>
          {itensNecessarios.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>

        <h2 className={styles.subtitulo}>Pré-Operatório</h2>
        <ul className={styles.lista}>
          {preOperatorio.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>

        <h2 className={styles.subtitulo}>Pós-Operatório</h2>
        <ul className={styles.lista}>
          {posOperatorio.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>

        <h2 className={styles.subtitulo}>Considerações</h2>
        <ul className={styles.lista}>
          {consideracoes.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default DetalheTratamento;
