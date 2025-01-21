import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

// Reed-Solomon Generator Polynomial for error correction
const GENERATOR_POLYNOMIAL = [1, 1, 1, 0, 1];

const QRCodeGenerator = () => {
  const [text, setText] = useState('Hello World!');
  const [matrix, setMatrix] = useState([]);
  
  // Convert text to binary
  const textToBinary = (text) => {
    let binary = '';
    for (let i = 0; i < text.length; i++) {
      binary += text.charCodeAt(i).toString(2).padStart(8, '0');
    }
    return binary;
  };

  // Generate QR code matrix
  const generateMatrix = (binary) => {
    // For simplicity, we'll create a 21x21 Version 1 QR code
    const size = 21;
    const matrix = Array(size).fill().map(() => Array(size).fill(0));

    // Add finder patterns (the three large squares in corners)
    const addFinderPattern = (row, col) => {
      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
          if (
            i === 0 || i === 6 || j === 0 || j === 6 || // Outer square
            (i >= 2 && i <= 4 && j >= 2 && j <= 4) // Inner square
          ) {
            matrix[row + i][col + j] = 1;
          }
        }
      }
    };

    // Add finder patterns at corners
    addFinderPattern(0, 0); // Top-left
    addFinderPattern(0, size - 7); // Top-right
    addFinderPattern(size - 7, 0); // Bottom-left

    // Add timing patterns (the dotted lines between finder patterns)
    for (let i = 8; i < size - 8; i++) {
      matrix[6][i] = i % 2; // Horizontal timing pattern
      matrix[i][6] = i % 2; // Vertical timing pattern
    }

    // Add alignment pattern (center)
    const centerStart = Math.floor(size / 2) - 2;
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (
          i === 0 || i === 4 || j === 0 || j === 4 || // Outer square
          (i === 2 && j === 2) // Center dot
        ) {
          matrix[centerStart + i][centerStart + j] = 1;
        }
      }
    }

    // Add data bits in a simple spiral pattern
    let row = size - 1;
    let col = size - 1;
    let direction = -1;
    let binaryIndex = 0;

    while (binaryIndex < binary.length && row >= 0 && col >= 0) {
      if (matrix[row][col] === 0) {
        matrix[row][col] = binary[binaryIndex] === '1' ? 1 : 0;
        binaryIndex++;
      }
      
      // Move to next position
      if (direction === -1) {
        if (col > 0) col--;
        else {
          row--;
          direction = 1;
        }
      } else {
        if (col < size - 1) col++;
        else {
          row--;
          direction = -1;
        }
      }
    }

    return matrix;
  };

  useEffect(() => {
    const binary = textToBinary(text);
    const newMatrix = generateMatrix(binary);
    setMatrix(newMatrix);
  }, [text]);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>QR Code Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to generate QR code"
            className="w-full"
          />
          
          <div className="flex justify-center">
            <svg
              viewBox="0 0 210 210"
              className="w-64 h-64 border border-gray-200"
            >
              {matrix.map((row, i) =>
                row.map((cell, j) => (
                  <rect
                    key={`${i}-${j}`}
                    x={j * 10}
                    y={i * 10}
                    width="10"
                    height="10"
                    fill={cell ? 'black' : 'white'}
                  />
                ))
              )}
            </svg>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QRCodeGenerator;
