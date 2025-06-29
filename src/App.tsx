import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import Roadmap from './pages/Roadmap';
import Footer from './components/Footer';
import { Button } from './components/ui/button';
import { Calendar, Map, Home as HomeIcon } from 'lucide-react';

function App() {
  const handleDiscordJoin = () => {
    window.open('https://discord.com/invite/6GaWZAawUc', '_blank');
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-black text-white">
        {/* Navigation */}
        <nav className="bg-gray-900/80 backdrop-blur-sm border-b border-primary/20 sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-2">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-PjQ7yXSb2U4BqTmLgAhrHSc15WVDmA.png"
                  alt="DKK Logo"
                  className="w-8 h-8"
                />
                <span className="text-primary font-bold text-lg">DKK</span>
              </div>
              
              <div className="flex items-center gap-4">
                <a href="/">
                  <Button variant="ghost" className="text-gray-300 hover:text-primary">
                    <HomeIcon className="h-4 w-4 mr-2" />
                    Home
                  </Button>
                </a>
                <a href="/schedule">
                  <Button variant="ghost" className="text-gray-300 hover:text-primary">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule
                  </Button>
                </a>
                <a href="/roadmap">
                  <Button variant="ghost" className="text-gray-300 hover:text-primary">
                    <Map className="h-4 w-4 mr-2" />
                    Roadmap
                  </Button>
                </a>
                <Button
                  onClick={handleDiscordJoin}
                  className="bg-primary text-black hover:bg-primary/90"
                >
                  Join Alliance
                </Button>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-grow container mx-auto px-4 py-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/roadmap" element={<Roadmap />} />
          </Routes>
        </main>
        
        <Footer handleDiscordJoin={handleDiscordJoin} />
      </div>
    </Router>
  );
}

export default App;