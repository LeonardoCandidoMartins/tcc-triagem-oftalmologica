import { Link } from "react-router-dom";

import styleNavBar from "./Navbar.module.css";

function Navbar() {
  return (
    <nav className={styleNavBar.navbar}>
      <Link to="/" aria-label="Início" title="Início">
        <FontAwesomeIcon icon={faHouse} />
      </Link>
      <Link to="/sobre" aria-label="Sobre" title="Sobre">
        <FontAwesomeIcon icon={faCircleInfo} />
      </Link>
      <Link to="/configuracoes" aria-label="Configurações" title="Configurações">
        <FontAwesomeIcon icon={faGear} />
      </Link>
    </nav>
  );
}
//vou deletar este componente e usar Navbar sendo apenas um arquivo css, que dái cada tela tela seu proprio NavBar

export default Navbar;

