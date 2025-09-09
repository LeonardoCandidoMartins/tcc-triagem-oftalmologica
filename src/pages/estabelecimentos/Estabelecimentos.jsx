import { useEffect, useState } from 'react';
import styles from './Estabelecimentos.module.css';
import styleNavBar from "../../components/navbar/Navbar.module.css";
import { Link } from 'react-router-dom';

function Estabelecimentos() {
  const [medicos, setMedicos] = useState([]);
  const [search, setSearch] = useState('');
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    fetch('/data/medicos.json')
      .then(res => res.json())
      .then(data => setMedicos(data))
      .catch(err => console.error('Erro ao carregar JSON:', err));
  }, []);

  const handleExpand = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  }

  const filteredMedicos = medicos.filter(m =>
    m.nome.toLowerCase().includes(search.toLowerCase()) ||
    m.endereco.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <nav className={styleNavBar.navbar}>
        <Link to="/">Início</Link>
        <Link to="/sobre">Sobre</Link>
        <Link to="/configuracoes">Configurações</Link>
      </nav>

      <div className={styles.container}>
        <h1 className={styles.titulo}>Estabelecimentos de Oftalmologia</h1>

        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Buscar por nome ou cidade..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className={styles.grid}>
          {filteredMedicos.map((medico, index) => (
            <div
              key={index}
              className={`${styles.card} ${expandedCard === index ? styles.expanded : ''}`}
              onClick={() => handleExpand(index)}
            >
              <h2>{medico.nome}</h2>
              <p><strong>Contato:</strong> {medico.contato}</p>
              <p><strong>Endereço:</strong> {medico.endereco}</p>

              {expandedCard === index && (
                <>
                  <p>
                    <strong>Site:</strong>{' '}
                    <a href={medico.site} target="_blank" rel="noopener noreferrer">
                      {medico.site}
                    </a>
                  </p>
                  <p>
                    <strong>Mapa:</strong>{' '}
                    <a href={medico.linkgooglemaps} target="_blank" rel="noopener noreferrer">
                      Abrir no Google Maps
                    </a>
                  </p>
                  <div
                    className={styles.mapa}
                    dangerouslySetInnerHTML={{ __html: medico.iframe }}
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Estabelecimentos;
