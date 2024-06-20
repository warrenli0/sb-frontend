import React, { useState, useRef, useEffect } from 'react';

interface DraggableNotepadCalcProps {
    showNote: boolean;
    setshowNote: React.Dispatch<React.SetStateAction<boolean>>;
    isCorrect: boolean | null;
}

const DraggableNotepad: React.FC<DraggableNotepadCalcProps> = ({ showNote, setshowNote, isCorrect }) => {
  const notepadRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 100, y: 100 });
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={notepadRef}
      className={`w-[600px] h-[400px] z-20 bg-white shadow-lg ${showNote ? 'fixed' : 'hidden'}`}
      style={{ top: `${position.y}px`, left: `${position.x}px` }}
    >
      <div
        className="w-full bg-blue-500 h-8 text-white font-semibold p-2 flex items-center justify-center cursor-move"
        onMouseDown={handleMouseDown}>
        Notepad
        <div className='absolute right-2 text-sm font-medium cursor-pointer hover:text-[#ffe49e] transition-colors' onClick={() => { setshowNote(false) }}>Close</div>
      </div>
      <textarea className={` ${(isCorrect != null) ? 'w-[50%] border-l-2 border-b-2 border-r-1' : 'w-[100%] border-x-2 border-b-2'} h-[calc(100%-2rem)] p-2 resize-none outline-none border-slate-300`} disabled={(isCorrect != null)} placeholder='Your notes here...' />
      <textarea className={` ${(isCorrect != null) ? ' w-[50%] h-[calc(100%-2rem)] p-2 resize-none outline-none border-r-2 border-b-2 border-l-1  border-slate-300' : 'hidden'}`} placeholder={`${(isCorrect ? 'Why is your answer correct?' : 'Why is your answer incorrect?')}`}/>
    </div>
  );
};

export default DraggableNotepad;