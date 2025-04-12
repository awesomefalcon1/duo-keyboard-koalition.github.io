import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
//import Footer from './components/Footer';


function App() {

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-black text-white">
        <main className="flex-grow container mx-auto px-4 py-12">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          
        </main>
        {/* 
        <Footer handleDiscordJoin={handleDiscordJoin} />
      Footer */}
        </div>
    </Router>
  );
}

export default App;
