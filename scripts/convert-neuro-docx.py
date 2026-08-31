import os, re, docx, json

doc_path = r"C:\Users\Rodney Duarte\Documents\Conarem 2027\MI\neuro test parte dos.docx"
doc = docx.Document(doc_path)

# Expand paragraphs splitting by newline so no lines are lost
paragraphs = []
for p in doc.paragraphs:
    txt = p.text.strip()
    if not txt:
        continue
    for line in txt.split('\n'):
        line_clean = line.strip()
        if line_clean:
            paragraphs.append(line_clean)

ans_indices = []
for i, p in enumerate(paragraphs):
    if 'Respuesta correcta:' in p:
        ans_indices.append(i)

print(f"Total de respuestas: {len(ans_indices)}")

subtopic_mapping = [
    # Q1 - Q18: Demencias
    ("Demencias", 18),
    # Q19 - Q24: Trastornos del movimiento
    ("Trastornos del movimiento", 6),
    # Q25 - Q27: Pares craneales
    ("Pares craneales", 3),
    # Q28 - Q37: Esclerosis múltiple
    ("Esclerosis múltiple", 10),
    # Q38 - Q44: Síndrome de Guillain-Barré y Miller Fisher
    ("Síndrome de Guillain-Barré y Miller Fisher", 7)
]

subtopic_list = []
for st, count in subtopic_mapping:
    subtopic_list.extend([st] * count)

questions = []

for q_idx, ans_i in enumerate(ans_indices, 1):
    q_id = f"semana18_med_q{163 + q_idx}"
    subtopic = subtopic_list[q_idx - 1]
    
    # 1. Find options and prompt
    opt_lines = []
    opt_start_idx = ans_i
    for k in range(ans_i - 1, max(0, ans_i - 10), -1):
        line = paragraphs[k]
        if re.search(r'^[a-e]\)', line) or re.search(r'\n[a-e]\)', line):
            opt_lines.insert(0, line)
            opt_start_idx = k
        elif opt_lines:
            break
            
    combined_opts = '\n'.join(opt_lines)
    matches = list(re.finditer(r'([a-e])\)\s*([\s\S]*?)(?=(?:[a-e]\)|\Z))', combined_opts))
    options = []
    if len(matches) == 5:
        for m in matches:
            options.append(m.group(2).strip())
    else:
        raw_opts = re.split(r'[a-e]\)', combined_opts)[1:]
        options = [o.strip() for o in raw_opts]

    # Prompt is the paragraph right before opt_start_idx
    prompt_idx = opt_start_idx - 1
    prompt = paragraphs[prompt_idx]
    if prompt.startswith("Tema:") or prompt.startswith("Subtema:"):
        prompt = paragraphs[prompt_idx - 1]
    prompt = re.sub(r'^(?:Pregunta\s+\d+\s*|Tema:[^\n]*\s*|Subtema:[^\n]*\s*)+', '', prompt).strip()

    # 2. Correct option
    ans_text = paragraphs[ans_i]
    ans_match = re.search(r'([a-e])\)', ans_text)
    if ans_match:
        correct_letter = ans_match.group(1).lower()
        correct_idx = ord(correct_letter) - ord('a')
    else:
        correct_idx = 0
        correct_letter = 'a'

    correct_option_text = options[correct_idx] if correct_idx < len(options) else ""

    # 3. Explanation
    next_q_start = ans_indices[q_idx] if q_idx < len(ans_indices) else len(paragraphs)
    expl_end_idx = next_q_start
    for k in range(next_q_start - 1, ans_i, -1):
        p = paragraphs[k]
        if p.startswith("Pregunta ") or p.startswith("Tema: Neurología") or (k < next_q_start - 6 and p.endswith("?")):
            expl_end_idx = k

    raw_expl_paragraphs = paragraphs[ans_i + 1 : expl_end_idx]
    
    formatted_expl_lines = []
    in_conceptos = False
    in_repaso = False
    
    for p in raw_expl_paragraphs:
        if p.startswith("Tema: Neurología") or p.startswith("Subtema:") or p.startswith("Pregunta "):
            continue
        if "🧠 ANÁLISIS DE LA PREGUNTA" in p:
            formatted_expl_lines.append("🧠 ANÁLISIS DE LA PREGUNTA")
            in_conceptos = False
            in_repaso = False
            continue
        elif "🔑 CONCEPTOS CLAVE" in p:
            formatted_expl_lines.append("\n🔑 CONCEPTOS CLAVE")
            in_conceptos = True
            in_repaso = False
            continue
        elif "⚡ REPASO ACTIVO" in p:
            formatted_expl_lines.append("\n⚡ REPASO ACTIVO")
            in_conceptos = False
            in_repaso = True
            continue
        elif "📖 Referencia:" in p or "📖 Referencia" in p:
            formatted_expl_lines.append(f"\n{p}")
            in_conceptos = False
            in_repaso = False
            continue
            
        line_clean = p
        # Des-lettering in analysis
        line_clean = re.sub(r'^(?:La\s+opción\s+[a-eA-E]\s+(?:es\s+la\s+correcta|es\s+correcta)|Respuesta\s+correcta:[^\n]*)', f'«{correct_option_text}» es la correcta', line_clean, flags=re.IGNORECASE)
        
        if in_conceptos:
            if not line_clean.startswith('-') and not line_clean.startswith('•'):
                line_clean = f"- {line_clean}"
            formatted_expl_lines.append(line_clean)
        elif in_repaso:
            if line_clean.endswith(':') and len(line_clean) < 60:
                formatted_expl_lines.append(f"\n**{line_clean}**")
            else:
                if not line_clean.startswith('-') and not line_clean.startswith('•'):
                    line_clean = f"- {line_clean}"
                formatted_expl_lines.append(line_clean)
        else:
            formatted_expl_lines.append(line_clean)

    explanation = '\n\n'.join(formatted_expl_lines).strip()
    explanation = re.sub(r'\n\n(- [^\n]+)', r'\n\1', explanation)
    explanation = re.sub(r'\n\n(\*\*[^\*]+\*\*:?)\n\n', r'\n\n\1\n', explanation)

    pagina = "Harrison 21.ª ed., cap. 431-440"

    q_obj = {
        "id": q_id,
        "text": prompt,
        "options": options,
        "correctOptionIndex": correct_idx,
        "explanation": explanation,
        "materia": "Medicina Interna",
        "semana": 18,
        "tema": "Neurología",
        "subtema": subtopic,
        "module": "Neurología",
        "pagina": pagina
    }
    questions.append(q_obj)

print(f"Preguntas convertidas exitosamente: {len(questions)}")

with open('scripts/neuro-part2-parsed.json', 'w', encoding='utf-8') as f:
    json.dump(questions, f, ensure_ascii=False, indent=2)
