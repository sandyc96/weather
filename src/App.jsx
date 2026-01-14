import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyHeader from './components/MyHeader';
import MyFooter from './components/MyFooter';
import { CountyProvider } from './contexts/CountyContext';
import { DataProvider } from './contexts/DataContext';
import Weather from './pages/Weather';
import Location from './pages/Location';

function App() {
  return (
    <>
      <BrowserRouter>
        <header>
          <MyHeader />
        </header>
        <main>
          <CountyProvider>
            <DataProvider>
              <Routes>
                <Route path='/' element={<Weather />} />
                <Route path='/:county' element={<Location />} />
              </Routes>
            </DataProvider>
          </CountyProvider>
        </main>
        <footer>
          <MyFooter />
        </footer>
      </BrowserRouter>
    </>
  );
}

export default App;
