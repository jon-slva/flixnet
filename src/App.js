import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ResultsPage from './pages/ResultsPage/ResultsPage';
import FormPage from './pages/FormPage/FormPage';
import Header from './components/Header/Header';
import './App.scss';

function App() {
	return (
		<>
			<BrowserRouter
			// basename='/flixnet'
			>
				<Header />
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/form' element={<FormPage />} />
					<Route path='/results' element={<ResultsPage />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
