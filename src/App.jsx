//nao irei importar mais estilização, pois não será mais uma pagina, ele apenas importa do index.jsx
import AppRoutes from '../routes';
import ScrollToTop from '../routes/ScrollToTop';

function App() {
  return (
    <>
      <ScrollToTop />
      <AppRoutes />
    </>
  );
}

export default App;