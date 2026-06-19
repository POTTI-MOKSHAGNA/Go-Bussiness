import './App.css';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';
import NotFound from './components/NotFound';
import ReferralDetail from './components/ReferralDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route exact path="/referral/:id" element={<ProtectedRoute><ReferralDetail /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
