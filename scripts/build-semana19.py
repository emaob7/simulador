import os
import re
import json
import docx

def parse_docx(path, start_q_num, group_name, default_ref, materia="Cirugía", semana=19):
    doc = docx.Document(path)
    lines = []
    for p in doc.paragraphs:
        for l in p.text.split('\n'):
            l_str = l.strip()
            if l_str:
                lines.append(l_str)
                
    ans_indices = [i for i, l in enumerate(lines) if 'Respuesta correcta:' in l]
    questions = []
    
    for i, ans_idx in enumerate(ans_indices):
        ans_line = lines[ans_idx]
        m_let = re.search(r'([a-e])\)', ans_line.lower())
        correct_letter = m_let.group(1) if m_let else ''
        correct_idx = ord(correct_letter) - ord('a') if correct_letter else -1
        
        # scan backwards for options
        k = ans_idx - 1
        opts = []
        while k >= 0:
            line = lines[k]
            m_opt = re.match(r'^([a-e])\)\s*(.*)', line)
            if m_opt:
                opts.insert(0, m_opt.group(2).strip())
                k -= 1
            else:
                break
                
        # scan backwards for question text, tema, subtema
        q_lines = []
        tema = ''
        subtema = ''
        while k >= 0:
            line = lines[k]
            if line.startswith('Subtema:'):
                subtema = line.replace('Subtema:', '').strip()
            elif line.startswith('Tema:'):
                tema = line.replace('Tema:', '').strip()
                break
            elif re.match(r'^Pregunta\s*\d+', line, re.IGNORECASE):
                pass
            elif 'Referencia:' in line or 'Schwartz' in line:
                break
            else:
                q_lines.insert(0, line)
            k -= 1
            
        q_text = ' '.join(q_lines).strip()
        
        # scan forward for explanation
        exp_lines = []
        ref = default_ref
        f = ans_idx + 1
        while f < len(lines):
            line = lines[f]
            if 'Referencia:' in line or 'Schwartz' in line:
                ref = line.strip()
                exp_lines.append(line.strip())
                break
            if f in ans_indices:
                break
            exp_lines.append(line)
            f += 1
            
        exp_text = '\n'.join(exp_lines).strip()
        
        q_id = f"semana19_cx_q{start_q_num + i:03d}"
        
        questions.append({
            "id": q_id,
            "text": q_text,
            "options": opts,
            "correctOptionIndex": correct_idx,
            "explanation": exp_text,
            "materia": materia,
            "semana": semana,
            "tema": group_name,
            "subtema": subtema or tema or group_name,
            "subtema_grupo": group_name,
            "docx_tema": tema or group_name,
            "module": f"Semana {semana} - {materia}",
            "pagina": ref
        })
        
    return questions

def main():
    higado_path = r"C:\Users\Rodney Duarte\Documents\Conarem 2027\Cx\test higado.docx"
    vb_path = r"C:\Users\Rodney Duarte\Documents\Conarem 2027\Cx\test vb.docx"
    
    q_higado = parse_docx(
        higado_path,
        start_q_num=1,
        group_name="Hígado",
        default_ref="Schwartz, Principios de Cirugía, 11.ª edición, capítulo 31: Hígado."
    )
    print(f"Preguntas de Hígado: {len(q_higado)}")
    
    q_vb = parse_docx(
        vb_path,
        start_q_num=len(q_higado) + 1,
        group_name="Vesícula biliar y sistema biliar extrahepático",
        default_ref="Schwartz, Principios de Cirugía, 11.ª edición, capítulo 32: Vesícula biliar y sistema biliar extrahepático."
    )
    print(f"Preguntas de Vesícula biliar: {len(q_vb)}")
    
    all_questions = q_higado + q_vb
    print(f"Total Semana 19: {len(all_questions)}")
    
    # Validaciones críticas
    for q in all_questions:
        assert len(q["options"]) == 5, f"Pregunta {q['id']} no tiene 5 opciones ({len(q['options'])})"
        assert 0 <= q["correctOptionIndex"] <= 4, f"Pregunta {q['id']} índice inválido {q['correctOptionIndex']}"
        assert len(q["text"]) > 10, f"Pregunta {q['id']} texto demasiado corto"
        assert len(q["explanation"]) > 20, f"Pregunta {q['id']} sin explicación"
    
    out_dir = r"src\data\semana19"
    os.makedirs(out_dir, exist_ok=True)
    out_file = os.path.join(out_dir, "questions.ts")
    
    ts_content = "import { Question } from '../../types';\n\n"
    ts_content += "export const questionsSemana19: Question[] = "
    ts_content += json.dumps(all_questions, ensure_ascii=False, indent=2)
    ts_content += ";\n"
    
    with open(out_file, "w", encoding="utf-8") as f:
        f.write(ts_content)
        
    print(f"Archivo generado con éxito en: {out_file}")

if __name__ == "__main__":
    main()
