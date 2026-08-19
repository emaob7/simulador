import React, { useMemo } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { motion } from 'motion/react';
import { 
  Brain, 
  Sparkles, 
  Zap, 
  BookOpen
} from 'lucide-react';
import { parseExplanation } from '../utils/explanationParser';

interface ExplanationRendererProps {
  explanation?: string;
}

export function highlightClinicalText(text: string): React.ReactNode {
  if (!text) return '';
  
  const regex = /(\b(?:INCORRECTA|CORRECTA|FALSA|VERDADERA)\b|\(INCORRECTA\)|\(CORRECTA\)|[↑↓→←↔]|[<>=\u2265\u2264]+\s*\d+(?:\.\d+)*(?:\s*(?:%|\/\s*μL|g\/dL|mg\/dL|mmHg|mL(?:\/kg(?:\/(?:h|min))?)?|cm|mm|lpm|°C|mUI\/mL|UI\/mL|pg\/mL|ng\/dL|μg\/dL))?|\b\d+(?:\.\d+)*(?:\s*(?:%|\/\s*μL|g\/dL|mg\/dL|mmHg|mL(?:\/kg(?:\/(?:h|min))?)?|cm|mm|lpm|°C|mUI\/mL|UI\/mL|pg\/mL|ng\/dL|μg\/dL))\b)/gi;
  
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, index) => {
        const isMatch = regex.test(part);
        if (isMatch) {
          let colorClass = "text-[#E0AF26] font-bold";
          const upper = part.toUpperCase();
          if (upper.includes("INCORRECTA") || upper.includes("FALSA")) {
            colorClass = "text-rose-400 font-extrabold bg-rose-950/40 px-1.5 py-0.5 rounded border border-rose-500/30 text-xs inline-block";
          } else if (upper.includes("CORRECTA") || upper.includes("VERDADERA")) {
            colorClass = "text-emerald-400 font-extrabold bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-500/30 text-xs inline-block";
          } else if (part === "↑" || part === "↓" || part === "→" || part === "←" || part === "↔") {
            colorClass = "text-[#E0AF26] font-extrabold mx-1 text-sm inline-block";
          }
          return (
            <span key={index} className={colorClass}>
              {part}
            </span>
          );
        }
        return part;
      })}
    </>
  );
}

function formatMarkdownChildren(children: React.ReactNode): React.ReactNode {
  if (typeof children === 'string') {
    return highlightClinicalText(children);
  }
  if (Array.isArray(children)) {
    return children.map((child, i) => {
      if (typeof child === 'string') {
        return <React.Fragment key={i}>{highlightClinicalText(child)}</React.Fragment>;
      }
      return child;
    });
  }
  return children;
}

const MarkdownComponents = {
  strong: ({ children, ...props }: any) => {
    const textStr = typeof children === 'string' ? children.trim() : '';
    // If it's an option letter e.g., "A:", "B:", "C:", "D:", "E:", "A", "B"
    if (/^[A-E]:?$/i.test(textStr)) {
      return (
        <span
          translate="no"
          className="notranslate inline-flex items-center justify-center min-w-[22px] h-[20px] px-1.5 mr-2 rounded bg-[#E0AF26]/15 border border-[#E0AF26]/40 text-[#E0AF26] font-black text-xs align-middle select-none"
        >
          {textStr.replace(':', '')}
        </span>
      );
    }

    return (
      <strong className="text-white font-extrabold" {...props}>
        {formatMarkdownChildren(children)}
      </strong>
    );
  },
  u: ({ children, ...props }: any) => (
    <u className="text-[#E0AF26] font-bold decoration-[#E0AF26]/50 underline-offset-4" {...props}>
      {formatMarkdownChildren(children)}
    </u>
  ),
  p: ({ children, ...props }: any) => {
    const textStr = typeof children === 'string' ? children : Array.isArray(children) ? children.map(c => typeof c === 'string' ? c : '').join('') : '';

    if (textStr.trim().startsWith('📖') || textStr.toLowerCase().includes('referencia:')) {
      const cleanRef = textStr
        .replace(/^📖\s*/, '')
        .replace(/^[Rr]eferencia:\s*/i, '')
        .replace(/^📖\s*/, '')
        .replace(/^[Rr]eferencia:\s*/i, '')
        .trim();

      return (
        <p className="mt-4 pt-3 border-t border-white/10 text-xs text-[#A6A6A6] font-medium flex items-center gap-2" {...props}>
          <BookOpen className="w-3.5 h-3.5 text-[#E0AF26] flex-shrink-0" />
          <span className="font-bold text-white">Referencia:</span> {formatMarkdownChildren(cleanRef)}
        </p>
      );
    }

    const hasUnderlineSubheader = textStr.includes('<u>') || textStr.includes('**<u>');
    if (hasUnderlineSubheader) {
      return (
        <div className="mt-4 mb-2 font-bold text-xs uppercase tracking-wider text-[#E0AF26]" {...props}>
          {formatMarkdownChildren(children)}
        </div>
      );
    }

    return (
      <p className="text-xs md:text-sm text-[#FAF9F6] leading-relaxed mb-3" {...props}>
        {formatMarkdownChildren(children)}
      </p>
    );
  },
  h4: ({ children, ...props }: any) => (
    <div className="mt-4 mb-2 pt-2 border-t border-white/5 font-black text-xs uppercase tracking-wider text-[#E0AF26] flex items-center gap-1.5" {...props}>
      <span className="w-1.5 h-1.5 rounded-full bg-[#E0AF26] shadow-[0_0_6px_#E0AF26]" />
      <span>{formatMarkdownChildren(children)}</span>
    </div>
  ),
  ul: ({ children, ...props }: any) => (
    <ul className="space-y-2.5 my-2.5 pl-0 list-none" {...props}>
      {children}
    </ul>
  ),
  li: ({ children, ...props }: any) => (
    <li className="text-xs md:text-sm text-[#FAF9F6] leading-relaxed pl-6 py-0.5 relative before:content-['•'] before:absolute before:left-1 before:top-0 before:text-[#E0AF26] before:font-black before:text-base" {...props}>
      {formatMarkdownChildren(children)}
    </li>
  ),
  span: ({ children, ...props }: any) => (
    <span {...props}>
      {formatMarkdownChildren(children)}
    </span>
  )
};

export function ExplanationRenderer({ explanation = '' }: ExplanationRendererProps) {
  const sections = useMemo(() => parseExplanation(explanation || ''), [explanation]);

  const getSectionHeader = (title: string = '') => {
    const t = (title || '').toLowerCase();
    if (t.includes('análisis') || t.includes('analisis') || t.includes('por qué') || t.includes('porque') || t.includes('correcta')) {
      return {
        title: 'ANÁLISIS DE LA PREGUNTA',
        icon: <Brain className="w-4 h-4 text-sky-400" />,
        color: 'text-sky-400 border-sky-500/30'
      };
    }
    if (t.includes('concepto') || t.includes('perla')) {
      return {
        title: 'CONCEPTOS CLAVE',
        icon: <Sparkles className="w-4 h-4 text-emerald-400" />,
        color: 'text-emerald-400 border-emerald-500/30'
      };
    }
    if (t.includes('repaso') || t.includes('punto') || t.includes('clave conarem') || t.includes('clave')) {
      return {
        title: 'REPASO ACTIVO',
        icon: <Zap className="w-4 h-4 text-[#E0AF26]" />,
        color: 'text-[#E0AF26] border-[#C6A84A]/30'
      };
    }
    return {
      title: title || 'EXPLICACIÓN',
      icon: <BookOpen className="w-4 h-4 text-indigo-400" />,
      color: 'text-indigo-400 border-indigo-500/30'
    };
  };

  if (!sections || sections.length === 0) {
    return (
      <div className="text-xs text-[#FAF9F6] whitespace-pre-wrap leading-relaxed">
        {explanation}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="w-full space-y-6 bg-transparent p-0"
    >
      {sections.map((section, sIdx) => {
        const header = getSectionHeader(section.title);

        return (
          <div key={sIdx} className="space-y-3 pt-2">
            <div className={`flex items-center gap-2 pb-1.5 border-b border-white/10 ${header.color}`}>
              {header.icon}
              <h5 className="text-xs md:text-sm font-black uppercase tracking-wider">
                {header.title}
              </h5>
            </div>

            <div className="pl-1 md:pl-2">
              <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={MarkdownComponents}>
                {section.rawText}
              </Markdown>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
}
