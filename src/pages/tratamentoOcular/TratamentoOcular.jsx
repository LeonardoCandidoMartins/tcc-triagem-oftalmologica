import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import listaStyles from "../../components/lista/Lista.module.css";
import styleNavBar from "../../components/navbar/Navbar.module.css";

function TratamentoOcular() {
  const [tratamentos, setTratamentos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/tratamentosOculares.json")
      .then((res) => res.json())
      .then((data) => setTratamentos(data || []))
      .catch((err) => console.error("Erro ao carregar tratamentos:", err));
  }, []);

  const handleClick = (tratamento) => {
    navigate(`/tratamento/${encodeURIComponent(tratamento.nome)}`, {
      state: tratamento,
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
        <h1 className={listaStyles.listaTitle}>Tratamento Ocular</h1>
        <ul className={listaStyles.listaLista}>
          {tratamentos.map((item, index) => (
            <li
              key={item.nome || index}
              className={listaStyles.listaItem}
              onClick={() => handleClick(item)}
            >
              <div className={listaStyles.listaImagem}>
  {item.foto && <img src={item.foto} alt={item.nome} className={listaStyles.imagemReal} />}
</div>
              <span className={listaStyles.listaTexto}>{item.nome}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default TratamentoOcular;
