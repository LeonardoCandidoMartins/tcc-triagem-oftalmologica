import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import listaStyles from "../../components/lista/Lista.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BackButton from "../../components/BackButton";
import styleNavBar from "../../components/navbar/Navbar.module.css";
import {
  faHouse,
  faCircleInfo,
  faGear,
  faBookBookmark
} from "@fortawesome/free-solid-svg-icons";
import image_fallback from "../../../public/web-app-manifest-192x192.png";

function OlhoVermelho() {
  const [condicoes, setCondicoes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/olhosVermelhos.json")
      .then((res) => res.json())
      .then((data) => setCondicoes(data.olhosVermelhos || []))
      .catch((err) => console.error("Erro ao carregar dados do JSON:", err));
  }, []);

  const handleClick = (condicao) => {
    navigate(`/condicao/${encodeURIComponent(condicao.nome)}`, {
      state: condicao,
    });
  };

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

      <div className={listaStyles.listaContainer}>
        <BackButton />
        <h1 className={listaStyles.listaTitle}>Olho Vermelho</h1>

        <input
          aria-label="Pesquisar olho vermelho"
          placeholder="Pesquisar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={listaStyles.searchInput}
        />

        <ul className={listaStyles.listaLista}>
          {(condicoes || [])
            .filter((item) => {
              if (!searchTerm) return true;
              const nome = (item.nome || "").toLowerCase();
              return nome.includes(searchTerm.trim().toLowerCase());
            })
            .map((item, index) => (
              <li
                key={item.nome || index}
                className={listaStyles.listaItem}
                onClick={() => handleClick(item)}
              >
                <div className={listaStyles.listaImagem}>
                  {item.foto && (
                    <img
                      src={item.foto}
                      alt={item.nome}
                      className={listaStyles.imagemReal}
                      onError={(e) => { e.target.src = image_fallback; }}
                    />
                  )}
                </div>
                <span className={listaStyles.listaTexto}>{item.nome}</span>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default OlhoVermelho;
