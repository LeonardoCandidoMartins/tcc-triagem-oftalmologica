import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import listaStyles from "../../components/lista/Lista.module.css";
import styleNavBar from "../../components/navbar/Navbar.module.css";
import { Link } from 'react-router-dom';

function TraumaOcular() {
  const [condicoes, setCondicoes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/traumasOculares.json")
      .then((res) => res.json())
      .then((data) => setCondicoes(data.traumasOculares || []))
      .catch((err) => console.error("Erro ao carregar dados do JSON:", err));
  }, []);

  const handleClick = (condicao) => {
    navigate(`/trauma/${encodeURIComponent(condicao.nome)}`, {
      state: condicao, // <- envia o objeto inteiro como no OlhoVermelho
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
      <h1 className={listaStyles.listaTitle}>Trauma Ocular</h1>
      <ul className={listaStyles.listaLista}>
        {condicoes.map((item, index) => (
          <li
            key={item.nome || index}
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

export default TraumaOcular;
