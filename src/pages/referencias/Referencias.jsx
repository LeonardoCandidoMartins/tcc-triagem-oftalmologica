import { useEffect, useState } from "react";
import styles from "./Referencias.module.css";
import cardBaseConteudoStyles from "../../components/cardBaseConteudo/CardBaseConteudo.module.css";
import styleNavBar from "../../components/navbar/Navbar.module.css";
import BackButton from "../../components/BackButton";
import { Link } from "react-router-dom";
import {
  faHouse,
  faCircleInfo,
  faGear,
  faBookBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Referencias() {
  const referenciasExtras = [
    "KANSKI, Jack J.; BOWLING, Brad. Oftalmologia clinica: uma abordagem sistematica. 8. ed. Rio de Janeiro: Elsevier, 2016.",
    "KRACHMER, Jay H.; MANNIS, Mark J.; HOLLAND, Edward J. Cornea. 4. ed. Philadelphia: Elsevier, 2017.",
    "TASMAN, William; JAAGER, Edward A. Duane’s ophthalmology. Philadelphia: Lippincott Williams & Wilkins.",
    "WILLS EYE HOSPITAL. Manual de doencas oculares. 7. ed. Porto Alegre: Artmed, 2018.",
    "YANOFF, Myron; DUKER, Jay S. Ophthalmology. Elsevier.",
  ];

  const [referencias, setReferencias] = useState([]);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/data/olhosVermelhos.json").then((res) => res.json()),
      fetch("/data/traumasOculares.json").then((res) => res.json()),
    ])
      .then(([olhosData, traumasData]) => {
        const olhos = olhosData?.olhosVermelhos || [];
        const traumas = traumasData?.traumasOculares || [];
        const todas = [...olhos, ...traumas]
          .flatMap((item) => item?.referencias || [])
          .map((ref) => (ref || "").trim())
          .filter(Boolean);

        const unicas = Array.from(new Set([...todas, ...referenciasExtras]));
        unicas.sort((a, b) => a.localeCompare(b, "pt-BR"));
        setReferencias(unicas);
        setCarregando(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar referencias:", err);
        setErro("Nao foi possivel carregar as referencias.");
        setCarregando(false);
      });
  }, []);

  const descricao =
    "Esta página consolida as principais fontes bibliográficas utilizadas no conteúdo do aplicativo.";

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
        <h1 className={styles.titulo}>Referências</h1>
        <div className={`${cardBaseConteudoStyles.card} ${styles.card}`}>
          <p className={styles.descricao}>{descricao}</p>

          {erro ? (
            <p className={styles.erro}>{erro}</p>
          ) : carregando ? (
            <p className={styles.listaVazia}>Carregando referencias...</p>
          ) : referencias.length === 0 ? (
            <p className={styles.listaVazia}>Nenhuma referencia encontrada.</p>
          ) : (
            <ul className={styles.lista}>
              {referencias.map((ref, index) => (
                <li key={`${ref}-${index}`} className={styles.listaItem}>
                  {ref}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default Referencias;
