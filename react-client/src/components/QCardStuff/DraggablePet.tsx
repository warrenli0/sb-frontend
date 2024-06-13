import React, { useState, useRef } from 'react';
import petBeach from '../PetStuff/pet_images/pet-beach.png';
import cocoTemp from '../PetStuff/pet_images/coco-placeholder.png';

interface DraggablePetProps {
    showPet: boolean;
}

const DraggablePet: React.FC<DraggablePetProps> = ({ showPet }) => {
    const [position, setPosition] = useState({ x: 0, y: window.innerHeight - 272 });
    const draggingRef = useRef(false);
    const offsetRef = useRef({ x: 0, y: 0 });
  
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      draggingRef.current = true;
      offsetRef.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };
    };
  
    const handleMouseMove = (e: MouseEvent) => {
      if (draggingRef.current) {
        // Calculate new position
        const newX = e.clientX - offsetRef.current.x;
        const newY = e.clientY - offsetRef.current.y;
        
        // Prevent moving off the left or right edge
        const boundedX = Math.max(0, Math.min(newX, window.innerWidth - 192));
        
        // Prevent moving off the top or bottom edge
        const boundedY = Math.max(0, Math.min(newY, window.innerHeight - 272));
  
        // Update position
        setPosition({
          x: boundedX,
          y: boundedY,
        });
      }
    };

  const handleMouseUp = () => {
    draggingRef.current = false;
  };

  React.useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div
      className={`w-48 h-48 bg-[#3483F9] z-30 border-2 border-[#040033] overflow-hidden rounded-sm cursor-pointer  ${showPet ? 'absolute' : 'hidden'} `}
      style={{ position: 'absolute', left: `${position.x}px`, top: `${position.y}px` }}
      onMouseDown={handleMouseDown}
    >
        <img className='absolute bottom-0' draggable="false" src={petBeach}/>
        <img className='absolute bottom-2 right-3 h-36' draggable="false" src={cocoTemp}/>
    </div>
  );
};

export default DraggablePet;