import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { motion } from 'motion/react';
import { 
  Brain, 
  Sparkles, 
  Zap, 
  BookOpen
} from 'lucide-react';
import { parseExplanation, ParsedSection } from '../utils/explanationParser';

interface ExplanationRendererProps {
  explanation: string;
}

export function highlightClinicalText(text: string): React.ReactNode {
  if (!text) return '';
  
  const regex = /(\(INCORRECTA\)|\(CORRECTA\)|[↑↓→]|[<>=\u2265\u2264]+\s*\d+(?:\.\d+)*(?:\s*(?:%|\/\s*μL|g\/dL|mg\/dL))?|\b\d+(?:\.\d+)*(?:\s*(?:%|\/\s*μL|g\/dL|mg\/dL))\b)/gi;
  
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, index) => {
        const isMatch = regex.test(part);
        if (isMatch) {
          let colorClass = "text-[#F5C042] font-bold";
          if (part.toUpperCase().includes("INCORRECTA")) {
            colorClass = "text-rose-400 font-extrabold bg-rose-950/40 px-1.5 py-0.5 rounded border border-rose-500/30 text-xs";
          } else if (part.toUpperCase().includes("CORRECTA")) {
            colorClass = "text-emerald-400 font-extrabold bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-500/30 text-xs";
          } else if (part === "↑" || part === "↓" || part === "→") {
            colorClass = "text-[#F5C042] font-extrabold mx-0.5 text-base inline-block";
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
    return (
      <strong className="text-white font-extrabold" {...props}>
        {formatMarkdownChildren(children)}
      </strong>
    );
  },
  u: ({ children, ...props }: any) => (
    <u className="text-[#F5C042] font-bold decoration-[#F5C042]/50 underline-offset-4" {...props}>
      {formatMarkdownChildren(children)}
    </u>
  ),
  p: ({ children, ...props }: any) => {
    const textStr = typeof children === 'string' ? children : Array.isArray(children) ? children.map(c => typeof c === 'string' ? c : '').join('') : '';

    if (textStr.trim().startsWith('📖') || textStr.toLowerCase().includes('referencia:')) {
      return (
        <p className="mt-4 pt-3 border-t border-white/10 text-xs text-slate-400 font-medium flex items-center gap-2" {...props}>
          {formatMarkdownChildren(children)}
        </p>
      );
    }

    // If paragraph contains a subheader like **<u>...</u>**
    const hasUnderlineSubheader = textStr.includes('<u>') || textStr.includes('**<u>');
    if (hasUnderlineSubheader) {
      return (
        <div className="mt-4 mb-2 font-bold text-xs uppercase tracking-wider text-[#F5C042]" {...props}>
          {formatMarkdownChildren(children)}
        </div>
      );
    }

    return (
      <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-3" {...props}>
        {formatMarkdownChildren(children)}
      </p>
    );
  },
  ul: ({ children, ...props }: any) => (
    <ul className="space-y-1.5 my-2 pl-1 list-none" {...props}>
      {children}
    </ul>
  ),
  li: ({ children, ...props }: any) => (
    <li className="text-xs md:text-sm text-slate-200 leading-relaxed pl-5 relative before:content-['•'] before:absolute before:left-1 before:top-0 before:text-[#F5C042] before:font-bold" {...props}>
      {formatMarkdownChildren(children)}
    </li>
  ),
  span: ({ children, ...props }: any) => (
    <span {...props}>
      {formatMarkdownChildren(children)}
    </span>
  )
};

export function ExplanationRenderer({ explanation }: ExplanationRendererProps) {
  const [sections, setSections] = useState<ParsedSection[]>([]);

  useEffect(() => {
    setSections(parseExplanation(explanation));
  }, [explanation]);

  const getSectionHeader = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('análisis') || t.includes('analisis')) {
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
    if (t.includes('repaso') || t.includes('punto')) {
      return {
        title: 'REPASO ACTIVO',
        icon: <Zap className="w-4 h-4 text-[#F5C042]" />,
        color: 'text-[#F5C042] border-[#F5C042]/30'
      };
    }
    return {
      title,
      icon: <BookOpen className="w-4 h-4 text-indigo-400" />,
      color: 'text-indigo-400 border-indigo-500/30'
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
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
              <Markdown rehypePlugins={[rehypeRaw]} components={MarkdownComponents}>
                {section.rawText}
              </Markdown>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
}
