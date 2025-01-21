import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

function QRCodeGenerator() {
    const [qrValue, setQrValue] = React.useState('https://discord.gg/6GaWZAawUc');
    return (
        <section className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 mt-6 text-white">Or Generate your own</h2>
          <div className="mb-8">
            <input 
              type="text"
              value={qrValue}
              onChange={(e) => setQrValue(e.target.value)}
              className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
              placeholder="Enter URL or text for QR code"
            />
          </div>
          <div className="bg-white p-8 rounded-lg inline-block">
            <QRCodeSVG 
              value={qrValue}
              size={256}
              level="H"
            />
          </div>
          <p className="mt-4 text-gray-400">
            Scan this code to join our Discord community
          </p>
        </section>
      );
      }
export default QRCodeGenerator;
