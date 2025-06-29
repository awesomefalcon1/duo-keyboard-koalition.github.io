import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ExternalLink, Users, Trophy, Network, Rocket } from 'lucide-react';

function Home() {
  return (
    <section className="container mx-auto px-4 mb-16">
      {/* Hero Section */}
      <div className="w-full text-center mb-12 py-16 bg-gradient-to-b from-gray-800/80 to-gray-900/90 border-2 border-primary/30 rounded-xl shadow-2xl">
        <div className="flex justify-center mb-6">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-PjQ7yXSb2U4BqTmLgAhrHSc15WVDmA.png"
            alt="Duo Keyboard Koalition Logo"
            className="w-24 h-24 md:w-32 md:h-32 animate-pulse"
          />
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 tracking-tight">
          Duo Keyboard Koalition
        </h1>
        <p className="text-gray-200 text-xl md:text-2xl max-w-3xl mx-auto mb-4">
          The Premier <span className="text-primary font-bold">Hackathon Alliance</span> & Strategic Network
        </p>
        <p className="text-white max-w-2xl mx-auto mb-6">
          Unite. Coordinate. Dominate. We're not just participants—we're a faction that transforms hackathons into strategic victories.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-300">
          <span className="bg-primary/20 px-3 py-1 rounded-full">Multi-Team Coordination</span>
          <span className="bg-primary/20 px-3 py-1 rounded-full">Project Preservation</span>
          <span className="bg-primary/20 px-3 py-1 rounded-full">Incubator Ready</span>
          <span className="bg-primary/20 px-3 py-1 rounded-full">Hackathon LinkedIn</span>
        </div>
      </div>

      {/* Mission Cards */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card className="bg-gray-800/70 border border-primary/40 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Trophy className="h-6 w-6 text-primary" />
              <CardTitle className="text-primary text-xl">Strategic Hackathon Dominance</CardTitle>
            </div>
            <CardDescription className="text-gray-400">
              Coordinated teams, shared intelligence, collective victory
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              We deploy multiple coordinated teams to hackathons, sharing resources, strategies, and support. 
              When one team wins, the entire Koalition benefits.
            </p>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>• Cross-team logistics coordination</li>
              <li>• Prize strategy optimization</li>
              <li>• Real-time project collaboration</li>
              <li>• Collective bargaining power</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/70 border border-primary/40 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Rocket className="h-6 w-6 text-primary" />
              <CardTitle className="text-primary text-xl">Project Preservation & Incubation</CardTitle>
            </div>
            <CardDescription className="text-gray-400">
              From hackathon prototype to market-ready startup
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              We don't let winning projects die after the hackathon. Our infrastructure preserves, 
              refines, and prepares projects for real-world incubators and investors.
            </p>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>• Project documentation & preservation</li>
              <li>• Post-hackathon development support</li>
              <li>• Incubator preparation assistance</li>
              <li>• Investor connection facilitation</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Platform Access Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <Card className="bg-gray-800/70 border border-primary/40 shadow-lg">
          <CardHeader>
            <CardTitle className="text-primary text-xl">Main Platform</CardTitle>
            <CardDescription className="text-gray-400">
              Full-featured alliance management system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">
              Access our comprehensive platform for team coordination, project management, and strategic planning.
            </p>
          </CardContent>
          <CardFooter>
            <a href="https://duo-keyboard-koalition.com" className="w-full">
              <Button variant="outline" className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-white">
                Launch Platform <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </CardFooter>
        </Card>
        
        <Card className="bg-gray-800/70 border border-primary/40 shadow-lg">
          <CardHeader>
            <CardTitle className="text-primary text-xl">Knowledge Base</CardTitle>
            <CardDescription className="text-gray-400">
              Strategies, case studies, and war stories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">
              Learn from our victories, understand our methods, and access the collective wisdom of the Koalition.
            </p>
          </CardContent>
          <CardFooter>
            <a href="http://www.duo-keyboard-koalition.xyz/" className="w-full">
              <Button variant="outline" className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-white">
                Access Knowledge <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </CardFooter>
        </Card>
        
        <Card className="bg-gray-800/70 border border-primary/40 shadow-lg">
          <CardHeader>
            <CardTitle className="text-primary text-xl">Join the Alliance</CardTitle>
            <CardDescription className="text-gray-400">
              Connect with elite hackathon strategists
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">
              Ready to level up your hackathon game? Join our Discord to connect with the network.
            </p>
          </CardContent>
          <CardFooter>
            <a href="https://discord.com/invite/6GaWZAawUc" className="w-full">
              <Button variant="outline" className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-white">
                Join Discord <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </CardFooter>
        </Card>
      </div>

      {/* Value Proposition */}
      <div className="bg-gray-800/50 border border-primary/20 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-primary mb-4">Why Join the Koalition?</h2>
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <Users className="h-8 w-8 text-primary mb-2" />
            <h3 className="font-semibold text-white mb-1">Network Effect</h3>
            <p className="text-gray-400 text-sm">Connect with proven winners and strategic thinkers</p>
          </div>
          <div className="flex flex-col items-center">
            <Trophy className="h-8 w-8 text-primary mb-2" />
            <h3 className="font-semibold text-white mb-1">Higher Win Rate</h3>
            <p className="text-gray-400 text-sm">Coordinated teams have statistically better outcomes</p>
          </div>
          <div className="flex flex-col items-center">
            <Rocket className="h-8 w-8 text-primary mb-2" />
            <h3 className="font-semibold text-white mb-1">Post-Hackathon Value</h3>
            <p className="text-gray-400 text-sm">Turn weekend projects into real businesses</p>
          </div>
          <div className="flex flex-col items-center">
            <Network className="h-8 w-8 text-primary mb-2" />
            <h3 className="font-semibold text-white mb-1">Strategic Advantage</h3>
            <p className="text-gray-400 text-sm">Intelligence sharing and resource pooling</p>
          </div>
        </div>
      </div>

      {/* Legacy Notice */}
      <div className="mt-12 text-center">
        <p className="text-gray-500 text-sm">
          This legacy site remains for historical reference. Our active operations have moved to the platforms above.
        </p>
      </div>
    </section>
  );
}

export default Home;