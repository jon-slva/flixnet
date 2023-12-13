import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ResultsPage from './pages/ResultsPage/ResultsPage';
import FormPage from './pages/FormPage/FormPage';
import Header from './components/Header/Header';
import './App.css';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/results' element={<ResultsPage />} />
          <Route path='/form' element={<FormPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
