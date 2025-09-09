import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import listaStyles from "../../components/lista/Lista.module.css";
import styleNavBar from "../../components/navbar/Navbar.module.css";
import { Link } from 'react-router-dom';

function OlhoVermelho() {
  const [condicoes, setCondicoes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/olhosVermelhos.json")
      .then((res) => res.json())
      .then((data) => setCondicoes(data.olhosVermelhos))
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
          <Link to="/">Início</Link>
          <Link to="/sobre">Sobre</Link>
          <Link to="/configuracoes">Configurações</Link>
        </nav>
    <div className={listaStyles.listaContainer}>
      <h1 className={listaStyles.listaTitle}>Olho Vermelho</h1>
      <ul className={listaStyles.listaLista}>
        {condicoes.map((item, index) => (
          <li
            key={index}
            className={listaStyles.listaItem}
            onClick={() => handleClick(item)}
          >
            <div className={listaStyles.listaImagem}></div>
            <span className={listaStyles.listaTexto}>{item.nome}</span>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}

export default OlhoVermelho;
