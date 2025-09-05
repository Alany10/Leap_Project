import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CreateForm from './pages/CreateForm';
import AllForms from './pages/AllForms';
import ViewForm from './pages/ViewForm';

function App() {
  return (
    <Router>
      <Header />
      <div style={{ padding: '10px', minHeight: 'calc(100vh - 120px)' }}>
        {/* minHeight räknar bort header + footer */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateForm />} />
          <Route path="/all" element={<AllForms />} />
          <Route path="/view/:id" element={<ViewForm />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
