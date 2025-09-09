import { Route, Routes } from 'react-router-dom'
import NotFoundPage from '../src/pages/notFoundPage/NotFoundPage.jsx'

import Home from "../src/pages/home/Home.jsx";
import Sobre from "../src/pages/sobre/Sobre.jsx";
import Configuracoes from "../src/pages/configuracoes/Configuracoes.jsx";
import Navbar from "../src/components/navbar/Navbar.jsx";
import TraumaOcular from "../src/pages/traumaOcular/TraumaOcular.jsx";
import OlhoVermelho from "../src/pages/olhoVermelho/OlhoVermelho.jsx";
import DetalheCondicao from "../src/pages/detalheCondicao/DetalheCondicao.jsx";
import DetalheTrauma from "../src/pages/detalheTrauma/DetalheTrauma.jsx";
import AuxilioTriagem from "../src/pages/auxilioTriagem/AuxilioTriagem.jsx";
import TratamentoOcular from "../src/pages/tratamentoOcular/TratamentoOcular.jsx";
import LuzCobalto from '../src/pages/luzCobalto/LuzCobalto.jsx';
import Estabelecimentos from '../src/pages/estabelecimentos/Estabelecimentos.jsx';


const AppRoutes = () => {
  return (
    <Routes>
        <Route path='*' element={<NotFoundPage />} />                       

        <Route path='/' element={<Home />} />                           
        <Route path='/sobre' element={<Sobre />} />                         
        <Route path='/configuracoes' element={<Configuracoes />} />         
        <Route path='/navbar' element={<Navbar />} />                       
        <Route path="/trauma-ocular" element={<TraumaOcular />} />
          <Route path="/detalhe-trauma" element={<DetalheTrauma />} />         
        <Route path='/olho-vermelho' element={<OlhoVermelho />} />          
        <Route path='/detalhe-condicao' element={<DetalheCondicao />} />            
        <Route path='/auxilio-triagem' element={<AuxilioTriagem />} />      
        <Route path='/tratamento-ocular' element={<TratamentoOcular />} />  
        <Route path='/luz-cobalto' element={<LuzCobalto />} />
        <Route path='/estabelecimentos' element={<Estabelecimentos />} />
    </Routes>
  )
}

export default AppRoutes