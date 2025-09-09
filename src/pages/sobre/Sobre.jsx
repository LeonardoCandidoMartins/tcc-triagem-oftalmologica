import styles from './Sobre.module.css';
import cardBaseConteudoStyles from '../../components/cardBaseConteudo/CardBaseConteudo.module.css'
import styleNavBar from "../../components/navbar/Navbar.module.css";
import { Link } from 'react-router-dom';

function Sobre() {
  return (
    <>
        <nav className={styleNavBar.navbar}>
          <Link to="/">Início</Link>
          <Link to="/sobre">Sobre</Link>
          <Link to="/configuracoes">Configurações</Link>
        </nav>
    <div className={styles.container}>
      <h1 className={styles.titulo}>Sobre o Projeto</h1>
      <div className={`${cardBaseConteudoStyles.card} ${styles.card}`}>
        <h2>Introdução</h2>
        <p className={styles.texto}>
          Este projeto foi desenvolvido com o intuito de fornecer uma ferramenta prática e eficiente para o atendimento em pronto socorros de pacientes com problemas oculares. Com uma interface intuitiva e recursos de navegação, o aplicativo permite que os profissionais de saúde acessem rapidamente informações cruciais para o diagnóstico e tratamento dos pacientes.
        </p>
        <h2>Tecnologias Utilizadas</h2>
        <p className={styles.texto}>
        O projeto foi criado utilizando React, uma biblioteca JavaScript popular para o desenvolvimento de interfaces de usuário. A escolha do React foi baseada em sua capacidade de criar aplicações de página única (SPA) com uma experiência de usuário fluida e responsiva. Além disso, o uso de CSS Modules permite a estilização modular e a reutilização de componentes, garantindo uma manutenção mais fácil e uma melhor organização do código. O projeto também inclui uma estrutura de navegação baseada em rotas, permitindo que os usuários acessem diferentes seções do aplicativo de forma eficiente. Em resumo, este projeto representa uma solução moderna e eficiente para o atendimento em pronto socorros, com uma interface amigável e recursos práticos para os profissionais de saúde. 
          {/* Este é um projeto desenvolvido com React para demonstrar a estrutura de uma SPA moderna. Aqui você encontra recursos de navegação, estilização com CSS Modules e uma interface responsiva. */}
        </p>
      </div>
    </div>
    </>
  );
}

export default Sobre;
