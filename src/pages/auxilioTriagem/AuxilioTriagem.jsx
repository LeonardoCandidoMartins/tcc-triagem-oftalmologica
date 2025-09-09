import { useState } from 'react';
import styles from './AuxilioTriagem.module.css'; // Importa os estilos CSS Modules
import styleNavBar from "../../components/navbar/Navbar.module.css";
import { Link } from 'react-router-dom';

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
  const [etapaAtual, setEtapaAtual] = useState('inicio');
  const [history, setHistory] = useState([]);
  const [respostas, setRespostas] = useState([]);

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
      <Link to="/">Início</Link>
      <Link to="/sobre">Sobre</Link>
      <Link to="/configuracoes">Configurações</Link>
    </nav>
    
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