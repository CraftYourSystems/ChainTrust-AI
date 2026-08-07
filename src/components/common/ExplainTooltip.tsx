"use client";

import React, { useState } from "react";
import { HelpCircle } from "lucide-react";

interface ExplainTooltipProps {
  term: string;
  explanation: string;
}

export const ExplainTooltip: React.FC<ExplainTooltipProps> = ({ term, explanation }) => {
  const [show, setShow] = useState(false);

  return (
    <span className="relative inline-flex items-center gap-1 group cursor-pointer">
      <span className="font-semibold text-slate-700 underline decoration-dashed decoration-slate-300 underline-offset-2">
        {term}
      </span>
      <HelpCircle 
        className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-600 transition" 
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={() => setShow(!show)}
      />

      {show && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-3 bg-slate-900 text-white text-xs rounded-xl shadow-2xl z-50 border border-slate-800 animate-in fade-in zoom-in duration-150 pointer-events-none">
          <span className="font-bold text-amber-400 block mb-1 uppercase text-[10px] tracking-wider font-mono">
            ⓘ {term} Explained
          </span>
          <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
            {explanation}
          </p>
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
        </div>
      )}
    </span>
  );
};
