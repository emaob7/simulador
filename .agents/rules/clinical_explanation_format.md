# 🩺 Estándar Jerárquico de Explicaciones Médicas y Motor de Renderizado (Dr. Rodney CONAREM)

Esta regla establece la estructura obligatoria, la jerarquía visual y la sintaxis Markdown para todas las explicaciones clínicas del ecosistema (simulador web, baúles Obsidian, parsers y asistentes clínicos).

---

## 1. Estructura Jerárquica Obligatoria (3 Pilares Clínicos)

Toda explicación debe estructurarse en tres bloques principales claramente identificados, seguidos por la referencia bibliográfica formal:

```markdown
🧠 ANÁLISIS DE LA PREGUNTA
[Justificación clínica directa de la opción correcta y/o descarte inmediato de las opciones incorrectas].

🔑 CONCEPTOS CLAVE
- [Perla clínica o regla mnemotécnica fundamental 1].
- [Perla clínica o regla mnemotécnica fundamental 2].
- [Diferencial diagnóstico o trampa frecuente del examen].

⚡ REPASO ACTIVO

#### Nombre del Subtema o Categoría
- **A:** Explicación de la opción A (INCORRECTA).
- **B:** Explicación de la opción B (CORRECTA) → Mecanismo o justificación fisiopatológica.
- **C:** Explicación de la opción C (INCORRECTA).
- **D:** Explicación de la opción D (INCORRECTA).
- **E:** Explicación de la opción E (INCORRECTA).

#### Clasificación / Fisiopatología / Criterios
- **Condición / Fármaco 1** → Hallazgo patognomónico / Dosis / Conducta.
- **Condición / Fármaco 2** → Hallazgo patognomónico / Dosis / Conducta.

📖 Referencia: Autor/Libro, Edición, Capítulo N, pág. X (o Cuadro X-Y).
```

---

## 2. Reglas de Sintaxis para Activación de Componentes del Motor

### A. Subtítulos Dorados de Categoría (`####`)
- **Sintaxis**: Utiliza `#### Subtítulo` o `**<u>Subtítulo:</u>**`.
- **Renderizado UI**: Produce un encabezado en mayúsculas dorado (`#E0AF26`) con indicador de luz (*glowing dot*) integrado.

### B. Badges de Opciones `[A]`–`[E]`
- **Sintaxis**: Escribe `- **A:** `, `- **B:** `, `- **C:** `, `- **D:** `, `- **E:** ` al inicio de cada viñeta.
- **Renderizado UI**: El componente `strong` detecta `/^[A-E]:?$/` y genera un chip/badge interactivo dorado con protección `translate="no"` / `notranslate`.

### C. Flechas de Asociación Clínica (`→`, `↑`, `↓`)
- **Sintaxis**: Utiliza `→` para relaciones de causa-efecto (`- **Fármaco** → Dosis`), y `↑` / `↓` para variaciones analíticas (`↑ LH`, `↓ FSH`).
- **Renderizado UI**: Se formatean automáticamente en negrita dorada brillante `#E0AF26`.

### D. Etiquetas de Verificación `(CORRECTA)` e `(INCORRECTA)`
- **Sintaxis**: Añade `(CORRECTA)` o `(INCORRECTA)`.
- **Renderizado UI**:
  - `(CORRECTA)` $\rightarrow$ Badge esmeralda brillante.
  - `(INCORRECTA)` $\rightarrow$ Badge carmesí/rosa de alerta.

### E. Referencia Bibliográfica
- **Sintaxis**: La última línea debe iniciar con `📖 Referencia:` o `Referencia:`.
- **Renderizado UI**: Se renderiza en un pie de página con divisor sutil e icono `BookOpen`.
