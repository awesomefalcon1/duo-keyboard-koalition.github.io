import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

function QRCodeGenerator() {
    const [qrValue, setQrValue] = React.useState('https://discord.gg/6GaWZAawUc');

    const handleDownload = () => {
        const svg = document.querySelector('svg');
        const svgData = new XMLSerializer().serializeToString(svg);
        const blob = new Blob([svgData], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'qrcode.svg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'QR Code',
                    text: 'Check out this QR Code',
                    url: qrValue
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        }
    };

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
            <div className="mt-4 space-x-4">
                <button
                    onClick={handleDownload}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                    Download SVG
                </button>
                {navigator.share && (
                    <button
                        onClick={handleShare}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Share
                    </button>
                )}
            </div>
            <p className="mt-4 text-gray-400">
                Scan this code to join our Discord community
            </p>
        </section>
    );
}

export default QRCodeGenerator;