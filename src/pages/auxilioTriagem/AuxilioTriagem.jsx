import { useState } from 'react';
import styles from './AuxilioTriagem.module.css'; // Importa os estilos CSS Modules
import BackButton from '../../components/BackButton';
import styleNavBar from "../../components/navbar/Navbar.module.css";
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faCircleInfo,
  faGear
} from "@fortawesome/free-solid-svg-icons";

const fluxo = {
  inicio: {
    pergunta: 'Há história de trauma?',
    opcoes: {
      SIM: 'trauma',
      NAO: 'exposicaoQuimica',
    },
  },
  trauma: {
    acao: [
      'Inspeção do olho e anexos',
      'Testar a acuidade visual',
      'Encaminhar ao especialista',
    ],
  },
  exposicaoQuimica: {
    pergunta: 'Exposição química?',
    opcoes: {
      SIM: 'quimica',
      NAO: 'corpoEstranho',
    },
  },
  quimica: {
    acao: [
      'Lavagem com solução salina',
      'Remover partículas',
      'Encaminhar ao especialista',
    ],
  },
  corpoEstranho: {
    pergunta: 'Corpo estranho?',
    opcoes: {
      SIM: 'inspecaoCorpoEstranho',
      NAO: 'fotofobia',
    },
  },
  inspecaoCorpoEstranho: {
    acao: [
      'Inspeção do olho para corpo estranho',
      'Encaminhar ao especialista',
    ],
  },
  fotofobia: {
    pergunta: 'Dor com exposição à luz?',
    opcoes: {
      SIM: 'avaliacaoFluoresceina',
      NAO: 'acuidadeEDor',
    },
  },
  avaliacaoFluoresceina: {
    pergunta: 'Córnea normal?',
    opcoes: {
      SIM: 'pupilas',
      NAO: 'ceratite',
    },
  },
  pupilas: {
    pergunta: 'Pupilas contraídas?',
    opcoes: {
      SIM: 'uveite',
      NAO: 'glaucoma',
    },
  },
  ceratite: {
    resultado: 'Ceratite ou Úlcera de Córnea',
  },
  uveite: {
    resultado: 'Provável Uveíte',
  },
  glaucoma: {
    resultado: 'Provável Glaucoma Agudo',
  },
  acuidadeEDor: {
    pergunta: 'Acuidade diminuída e dor?',
    opcoes: {
      SIM: 'especialista',
      NAO: 'secrecao',
    },
  },
  especialista: {
    acao: ['Encaminhar ao especialista'],
  },
  secrecao: {
    pergunta: 'Há secreção?',
    opcoes: {
      SIM: 'tipoSecrecao',
      NAO: 'hemorragia',
    },
  },
  tipoSecrecao: {
    pergunta: 'Secreção purulenta?',
    opcoes: {
      SIM: 'bacteriana',
      NAO: 'viralOuAlergica',
    },
  },
  bacteriana: {
    resultado: 'Conjuntivite Bacteriana',
  },
  viralOuAlergica: {
    resultado: 'Conjuntivite Viral ou Alérgica',
  },
  hemorragia: {
    resultado: 'Hemorragia Subconjuntival',
  },
};

export default function FluxogramaTriagem() {
  const navigate = useNavigate();
  const [etapaAtual, setEtapaAtual] = useState('inicio');
  const [history, setHistory] = useState([]);
  const [respostas, setRespostas] = useState([]);
  const [aceiteAviso, setAceiteAviso] = useState(false);

  const etapa = fluxo[etapaAtual];

  function handleResposta(resposta) {
    const proximaEtapa = etapa.opcoes?.[resposta];
    // Adição de verificação para garantir que proximaEtapa exista antes de continuar
    if (!proximaEtapa) {
      console.warn(`Próxima etapa não encontrada para a resposta: ${resposta}`);
      return;
    }

    setHistory((prev) => [...prev, etapaAtual]);
    setRespostas((prev) => [...prev, { pergunta: etapa.pergunta, resposta }]);
    setEtapaAtual(proximaEtapa);
  }

  function handleVoltar() {
    if (history.length === 0) return;
    const novaHistory = [...history];
    const anterior = novaHistory.pop(); // Remove o último item do histórico
    setHistory(novaHistory);
    setRespostas((prev) => prev.slice(0, -1)); // Remove a última resposta
    setEtapaAtual(anterior);
  }

  function reiniciar() {
    setEtapaAtual('inicio');
    setHistory([]);
    setRespostas([]);
  }

  return (
    <>
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

      <BackButton />
      {!aceiteAviso && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Aviso Importante</h2>
            <p>
              Esta ferramenta de apoio não substitui avaliação, julgamento ou
              análise clínica profissional.
              <br />
              Ao clicar em OK, você confirma que
              entendeu as condições de uso e que a decisão final depende de
              avaliação clínica adequada.
            </p>
            <div className={styles.modalActions}>
              <button
                onClick={() => navigate('/')}
                className={styles.sairButton}
              >
                Sair
              </button>
              <button onClick={() => setAceiteAviso(true)}>OK</button>
            </div>
          </div>
        </div>
      )}
      <div className={styles.container}>
        <div className={styles.card}>
          {etapa.pergunta && (
            <>
              <h2>{etapa.pergunta}</h2>
              <div className={styles.optionsContainer}>
                {Object.keys(etapa.opcoes).map((resp) => (
                  <button key={resp} onClick={() => handleResposta(resp)}>
                    {resp}
                  </button>
                ))}
              </div>
              {history.length > 0 && (
                // Usando a nova classe para o botão de voltar
                <button onClick={handleVoltar} className={styles.voltarButton}>
                  ← Voltar
                </button>
              )}
            </>
          )}

          {etapa.acao && (
            <>
              <h3>Ações:</h3>
              <ul>
                {etapa.acao.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              {/* Usando a nova classe para o botão de reiniciar */}
              <button onClick={reiniciar} className={styles.reiniciarButton}>
                Reiniciar
              </button>
            </>
          )}

          {etapa.resultado && (
            <>
              {/* Usando a nova classe para o texto do diagnóstico */}
              <h2 className={styles.diagnostico}>Diagnóstico: {etapa.resultado}</h2>
              <h3>Respostas anteriores:</h3>
              <ul>
                {respostas.map((r, i) => (
                  <li key={i}>
                    <strong>{r.pergunta}</strong>: {r.resposta}
                  </li>
                ))}
              </ul>
              {/* Usando a nova classe para o botão de reiniciar */}
              <button onClick={reiniciar} className={styles.reiniciarButton}>
                Reiniciar
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
