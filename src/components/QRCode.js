import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

function QRCode() {
  return (
    <section className="max-w-3xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-6">Scan Our QR Code</h2>
      <div className="bg-white p-8 rounded-lg inline-block">
        <QRCodeSVG 
          value="https://discord.gg/6GaWZAawUc"
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

export default QRCode;
