import { Link } from "react-router-dom";

import styleNavBar from "./Navbar.module.css";

function Navbar() {
  return (
    <>
      <nav className={styleNavBar.navbar}>
        <Link to="/">Início</Link>
        <Link to="/sobre">Sobre</Link>
        <Link to="/configuracoes">Configurações</Link>
      </nav>
    </>
  );
}
//vou deletar este componente e usar Navbar sendo apenas um arquivo css, que dái cada tela tela seu proprio NavBar

export default Navbar;

