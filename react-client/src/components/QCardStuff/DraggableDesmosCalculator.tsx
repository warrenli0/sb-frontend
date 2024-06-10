import React, { useEffect, useRef, useState } from 'react';

declare const window: any;

interface DraggableCalcProps {
    showCalc: boolean;
}

const DraggableDesmosCalculator: React.FC<DraggableCalcProps> = ({ showCalc }) => {
  const [position, setPosition] = useState({ x: 50, y: window.innerHeight - 475 });
  const draggingRef = useRef(false);
  const offsetRef = useRef({ x: 0, y: 0 });
  const calculatorRef = useRef<HTMLDivElement | null>(null);
  const desmosCalculator = useRef<any>(null); // Use to store Desmos calculator instance

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    offsetRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (draggingRef.current) {
      const newX = e.clientX - offsetRef.current.x;
      const newY = e.clientY - offsetRef.current.y;

      const boundedX = Math.max(0, Math.min(newX, window.innerWidth - 300)); // Adjusted for calculator width
      const boundedY = Math.max(0, Math.min(newY, window.innerHeight - 300)); // Adjusted for calculator height

      setPosition({
        x: boundedX,
        y: boundedY,
      });
    }
  };

  const handleMouseUp = () => {
    draggingRef.current = false;
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    if (calculatorRef.current && !desmosCalculator.current) {
      desmosCalculator.current = window.Desmos.GraphingCalculator(calculatorRef.current, {
        keypad: true,
      });
    }

    return () => {
      if (desmosCalculator.current) {
        desmosCalculator.current.destroy();
        desmosCalculator.current = null;
      }
    };
  }, [calculatorRef]);

  return (
    <div
      className={`absolute w-[600px] h-[400px] bg-white border border-gray-300 rounded-lg shadow-lg ${showCalc ? 'absolute' : 'hidden'}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      <div
        className="w-full h-8 bg-[#3483F9] text-white font-semibold flex items-center justify-center cursor-move"
        onMouseDown={handleMouseDown}
      >
       Calculator
      </div>
      <div ref={calculatorRef} className="w-full h-[calc(100%-2rem)]"></div>
    </div>
  );
};

export default DraggableDesmosCalculator;
