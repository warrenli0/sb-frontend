import React from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

interface LatexRendererProps {
  latex: string;
  inline?: boolean;
}

const LatexRenderer: React.FC<LatexRendererProps> = ({ latex, inline = false }) => {
  return (
    <div className="latex-container">
      {inline ? <InlineMath math={latex} /> : <BlockMath math={latex} />}
    </div>
  );
};

export default LatexRenderer;
