import styles from './TratamentoOcular.module.css'
import listaStyles from '../../components/lista/Lista.module.css'
import styleNavBar from "../../components/navbar/Navbar.module.css";
import { Link } from 'react-router-dom';

function tratamentoOcular () {
  const condicoes = [
    "Medicamentos oculares",
    "Tampão ocular",
    "Como aplicar colírio"
  ]
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
        {condicoes.map((item, index) => (
          <li key={index} className={listaStyles.listaItem}>
            <div className={listaStyles.listaImagem}></div>
            <span className={listaStyles.listaTexto}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
    </>
  )
}

export default tratamentoOcular;