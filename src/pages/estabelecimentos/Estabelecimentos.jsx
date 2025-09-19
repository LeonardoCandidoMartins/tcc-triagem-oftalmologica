import { useEffect, useState } from 'react';
import styles from './Estabelecimentos.module.css';
import styleNavBar from "../../components/navbar/Navbar.module.css";
import { Link } from 'react-router-dom';
import listaStyles from "../../components/lista/Lista.module.css";

function Estabelecimentos() {

    const [estabelecimentos, setEstabelecimentos] = useState([]);

    useEffect(() => {
        fetch('/data/estabelecimentos.json')
            .then((resposta) => {
                if (!resposta.ok) {
                    throw new Error('Erro ao carregar o JSON: ' + resposta.status);
                }
                return resposta.json();
            })
            .then((data) => {
                setEstabelecimentos(data);
            })
            .catch((error) => {
                console.error('Erro:', error);
            });
    }, []);

    return (
        <>
            <nav className={styleNavBar.navbar}>
                <Link to="/">Início</Link>
                <Link to="/sobre">Sobre</Link>
                <Link to="/configuracoes">Configurações</Link>
            </nav>

            <div className={listaStyles.listaContainer}>
                <h1 className={listaStyles.listaTitle}>Estabelecimentos de Oftalmologia</h1>
                <ul className={listaStyles.listaLista}>

                    {estabelecimentos.map((item, index) => (
                        <li className={listaStyles.listaItem} key={index}>
                            <details className={listaStyles.details}>
                                
                                <summary className={listaStyles.listaResumo}>
                                    <div className={listaStyles.listaImagem}>
                                        {item.foto && ( <img src={item.foto} alt={item.nome} className={listaStyles.imagemReal} /> )}
                                    </div>
                                    <span className={listaStyles.listaTexto}>{item.nome}</span>
                                </summary>

                                <div className={listaStyles.listaInfo}>
                                    <p><strong>Contato:</strong> {item.contato}</p>
                                    <p><strong>Endereço:</strong> {item.endereco}</p>
                                    <p><strong>Site:</strong> {item.site ? <a href={item.site} target="_blank" rel="noopener noreferrer">{item.site}</a> : 'Não informado'}</p>
                                    <p><strong>Google Maps:</strong> {item.linkGoogleMaps ? <a href={item.linkGoogleMaps} target="_blank" rel="noopener noreferrer">Abrir no Maps</a> : 'Não disponível'}</p>
                                </div>
                            </details>
                        </li>
                    ))}

                </ul>
            </div>
        </>
    );
}

export default Estabelecimentos;
