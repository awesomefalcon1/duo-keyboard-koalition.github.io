import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
//import { ExternalLink } from 'lucide-react';
import { Card, CardContent } from "./components/ui/card"
import Header from './components/Header';
//import QRCode from './components/QRCode';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Events from './components/Events';
import Wins from './components/Wins';

function App() {
  const handleDiscordJoin = () => {
    window.open('https://discord.gg/6GaWZAawUc', '_blank');
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-black text-white">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/events" element={<Events />} />
            <Route path="/wins" element={<Wins />} />
          </Routes>
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <h2 className="text-3xl font-bold mb-6">Links Work in progress</h2>
              <ul className="space-y-4 list-none">
                <li>
                  <Link to="https://duo-keyboard-koalition.github.io/edenhouse/" className="text-blue-500 hover:text-blue-600">About</Link>
                </li>
                <li>
                  <Link to="https://duo-keyboard-koalition.github.io/qr-code/" className="text-blue-500 hover:text-blue-600">QR Code</Link>
                </li>
              </ul>
            </CardContent>
        </Card>
          
        </main>
        <Footer handleDiscordJoin={handleDiscordJoin} />
      </div>
    </Router>
  );
}

export default App;
