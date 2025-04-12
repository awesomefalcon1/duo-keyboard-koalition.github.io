import React from 'react';
//import { QRCodeSVG } from 'qrcode.react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { ExternalLink } from 'lucide-react';
/*
function QRCodeGenerator({ value = 'https://discord.gg/6GaWZAawUc', label }) {
    return (
        <div className="text-center">
            <Card className="inline-block bg-white border-primary/30">
                <CardContent className="p-4">
                    <QRCodeSVG 
                        value={value}
                        size={200}
                        level="H"
                    />
                </CardContent>
            </Card>
            {label && <p className="mt-2 text-gray-300">{label}</p>}
        </div>
    );
}
*/
function Home() {

  return (
    <section className="container mx-auto px-4 mb-16">
      {/* Full-width header */}
      <div className="w-full text-center mb-12 py-16 bg-gradient-to-b from-gray-800/80 to-gray-900/90 border-2 border-primary/30 rounded-xl shadow-2xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary animate-pulse mb-6">Our Journey Continues Elsewhere!</h1>
        <p className="text-gray-200 text-xl md:text-2xl max-w-3xl mx-auto">
          The Duo Keyboard Koalition has <span className="text-primary font-bold">evolved and expanded</span> beyond this space!
        </p>
        <p className="text-white mt-6 max-w-2xl mx-auto">
          This legacy site will remain available for reference purposes only.
        </p>
      </div>
      
      {/* Three cards in a row */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Application Card */}
        <Card className="bg-gray-800/70 border border-primary/40 shadow-lg">
          <CardHeader>
            <CardTitle className="text-primary text-xl">Main Application</CardTitle>
            <CardDescription className="text-gray-400">
              Our flagship platform with full features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">
              Visit our full-featured web application with enhanced community resources and tools:
            </p>
          </CardContent>
          <CardFooter>
            <a href="https://duo-keyboard-koalition.com" className="w-full">
              <Button variant="outline" className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-white">
                duo-keyboard-koalition.com <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </CardFooter>
        </Card>
        
        {/* Blog & Static Content Card */}
        <Card className="bg-gray-800/70 border border-primary/40 shadow-lg">
          <CardHeader>
            <CardTitle className="text-primary text-xl">Blog & Static Content</CardTitle>
            <CardDescription className="text-gray-400">
              Articles, Tales, and Legendary Epics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">
              Check out our comprehensive blog series and static resources:
            </p>
          </CardContent>
          <CardFooter>
            <a href="http://www.duo-keyboard-koalition.xyz/" className="w-full">
              <Button variant="outline" className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-white">
                duo-keyboard-koalition.xyz <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </CardFooter>
        </Card>
        
        {/* Discord Community Card */}
        <Card className="bg-gray-800/70 border border-primary/40 shadow-lg">
          <CardHeader>
            <CardTitle className="text-primary text-xl">Join Our Discord Community</CardTitle>
            <CardDescription className="text-gray-400">
              Connect with keyboard enthusiasts
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <p className="text-gray-300 mb-4">Join our active Discord server community:</p>
            <div className="flex flex-col w-full gap-4">
              <a href="https://discord.com/invite/6GaWZAawUc" className="w-full">
                <Button variant="outline" className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-white">
                  Join Discord Server <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
              

            </div>
          </CardContent>
        </Card>

      
      </div>
        {/* Additional Card for QR Code 
                    <Button 
                variant="secondary" 
                className="w-full" 
                onClick={() => setShowQRCode(!showQRCode)}
              >
                {showQRCode ? "Hide QR Code" : "Show QR Code"}
              </Button>
              
              {showQRCode && (
                <div className="mt-2 transition-all duration-300 ease-in-out">
                  <QRCodeGenerator 
                    value="https://discord.com/invite/6GaWZAawUc" 
                    label="Scan to join our Discord server"
                  />
                </div>
              )}
              */}
    </section>
  );
}

export default Home;