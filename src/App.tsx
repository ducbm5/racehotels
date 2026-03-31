import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ListingPage from './pages/ListingPage';
import DetailPage from './pages/DetailPage';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hotels/:city" element={<ListingPage />} />
          <Route path="/hotels/:city/:hotel" element={<DetailPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}
