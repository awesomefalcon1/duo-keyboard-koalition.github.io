import { Users, Trophy, Network } from 'lucide-react';

interface FooterProps {
  handleDiscordJoin: () => void;
}

export default function Footer({ handleDiscordJoin }: FooterProps) {
  return (
    <footer className="bg-gray-900 py-8 border-t border-primary/20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-6">
          <div>
            <div className="flex items-center mb-4">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-PjQ7yXSb2U4BqTmLgAhrHSc15WVDmA.png"
                alt="DKK Logo"
                className="w-8 h-8 mr-2"
              />
              <span className="text-primary font-bold">Duo Keyboard Koalition</span>
            </div>
            <p className="text-gray-400 text-sm">
              The premier hackathon alliance transforming weekend warriors into strategic victors.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-3">Our Mission</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              <li className="flex items-center"><Users className="h-3 w-3 mr-2 text-primary" />Multi-team coordination</li>
              <li className="flex items-center"><Trophy className="h-3 w-3 mr-2 text-primary" />Strategic dominance</li>
              <li className="flex items-center"><Network className="h-3 w-3 mr-2 text-primary" />Project preservation</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-3">Connect</h4>
            <div className="flex flex-col gap-2">
              <button 
                className="text-gray-400 hover:text-[#5865F2] text-sm text-left"
                onClick={handleDiscordJoin}
              >
                Discord Alliance Hub
              </button>
              <a href="https://duo-keyboard-koalition.com" className="text-gray-400 hover:text-primary text-sm">Main Platform</a>
              <a href="http://www.duo-keyboard-koalition.xyz/" className="text-gray-400 hover:text-primary text-sm">Knowledge Base</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-4 flex justify-between items-center">
          <span className="text-gray-500 text-sm">© 2024 Duo Keyboard Koalition - Strategic Hackathon Alliance</span>
          <span className="text-gray-500 text-sm">Unite. Coordinate. Dominate.</span>
        </div>
      </div>
    </footer>
  );
}