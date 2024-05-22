import React, { useState } from 'react';
//import 'katex/dist/katex.min.css';
//import { InlineMath, BlockMath } from 'react-katex';
//import MathJax from 'react-mathjax2';
import { MathJaxContext, MathJax } from 'better-react-mathjax';

const LatexComponent = () => {
    const latexLines = [
        'c = \\pm\\sqrt{a^2 + b^2}',
        'E = mc^2',
        '\\frac{a}{b} = c',
      ];
      return (
        <MathJaxContext>
          <div>
            {latexLines.map((line, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <MathJax>{`\\(${line}\\)`}</MathJax>
              </div>
            ))}
          </div>
        </MathJaxContext>
      );
  };
  
  export default LatexComponent;