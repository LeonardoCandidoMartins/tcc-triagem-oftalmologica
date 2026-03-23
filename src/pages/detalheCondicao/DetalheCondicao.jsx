import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./DetalheCondicao.module.css";
import BackButton from "../../components/BackButton";
import styleNavBar from "../../components/navbar/Navbar.module.css";
import {
  faHouse,
  faCircleInfo,
  faGear,
  faBookBookmark
} from "@fortawesome/free-solid-svg-icons";

function DetalheCondicao() {
  const { state } = useLocation();
  const { nomeCondicao } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(state || null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (state) return; // já temos o item via navigate

    const nomeDecodificado = decodeURIComponent(nomeCondicao || "");
    fetch("/data/olhosVermelhos.json")
      .then((res) => res.json())
      .then((data) => {
        const lista = data.olhosVermelhos || [];
        const encontrado = lista.find((c) => c.nome === nomeDecodificado);
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
  }, [state, nomeCondicao]);

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
    tratamentos = [],
    referencias = [],
  } = item;

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

        <h1 className={styles.titulo}>{nome}</h1>

        <div className={styles.imagemWrapper}>
          {foto && foto !== "lorem" ? (
            <img src={foto} alt={nome} className={styles.imagem} />
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

export default DetalheCondicao;
