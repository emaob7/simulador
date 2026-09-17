# Simulador de Exámenes CONAREM (Simulador Emma / Simulator) — Contexto Oficial

> **DOCUMENTO DE CONTEXTO UNIVERSAL PARA ASISTENTES DE IA**  
> (ChatGPT, Claude, Codex, Cursor, Antigravity, Copilot, etc.)  
> Leé este documento antes de realizar cualquier cambio en el proyecto para evitar confundir repositorios, sobrescribir versiones o alterar la arquitectura.

---

## 1. Identidad y Rutas del Proyecto

- **Nombre Oficial:** Simulador de Exámenes Médicos CONAREM (Simulador Emma / Simulator).
- **Propietario / Autor:** Dr. Rodney Duarte.
- **Ruta Local Oficial (Workspace Principal):** `C:\Users\Rodney Duarte\Documents\APPS\Simulator`
- **Ruta Espejo Codex:** `C:\Users\Rodney Duarte\Documents\Codex\2026-08-21\hola-chatgpt-te-pongo-en-contexto\work\simulador`
- **Carpeta de Contexto Compartido:** `C:\Users\Rodney Duarte\Documents\Aplicaciones CONAREM\`
- **Repositorios Git:**
  - **Upstream / Colaboración principal:** `https://github.com/emaob7/simulador.git` (rama `main`)
  - **Repositorio de Respaldo Rodney:** `https://github.com/roeyduary-creator/Simulator.git` (rama `main`)
- **Infraestructura Cloud:** Google Firebase
  - **Firebase Project ID:** `simulator-5ff8c`
  - **Hosting Oficial:** [https://simulator-5ff8c.web.app](https://simulator-5ff8c.web.app) / [https://simulator-5ff8c.firebaseapp.com](https://simulator-5ff8c.firebaseapp.com)

---

## 2. Diferenciación en el Ecosistema Digital CONAREM

| Aplicación | URL de Producción | Repositorio / Ruta Local | Propósito y Función |
| :--- | :--- | :--- | :--- |
| **Simulador de Exámenes (Este Proyecto)** | `https://simulator-5ff8c.web.app` | `C:\Users\Rodney Duarte\Documents\APPS\Simulator` | **Simulador de Exámenes por Semanas (1 a 20+):** Modo examen real cronometrado, modo práctica por temas, scoring, percentil y guardado en Firestore. |
| **Banco de Preguntas MBARETE (BancaDate)** | `https://bancadate.web.app` | `C:\Users\Rodney Duarte\Documents\Aplicaciones CONAREM\MbareteBank` | **Banco Histórico Oficial (2019–2026):** 2.064 preguntas históricas reales del CONAREM clasificadas por año y subtema. |
| **Portal de Alumnos (Sistema CONAREM)** | `https://portal-conarem-dr-rodney.vercel.app` | `C:\Users\Rodney Duarte\Documents\portal-conarem-dr-rodney` | **Dashboard / Hub Central de Estudio:** Cronograma de 32 semanas, clases, slides, resúmenes, y accesos a Drive/Anki. |
| **Fanpage de Venta Dr. Rodney** | `https://fanpage-dr-rodney.vercel.app` | `C:\Users\Rodney Duarte\Documents\fanpage-dr-rodney` | **Página de Conversión y Captación:** Información del curso, beneficios y enlace a WhatsApp. |

> [!CAUTION]
> **NUNCA confundir** este proyecto con el Banco Mbarete ni con el Portal de Alumnos. Cada uno tiene su propio repositorio, base de datos y despliegue independiente.

---

## 3. Stack Tecnológico y Arquitectura

- **Framework:** React 19 (TypeScript)
- **Bundler & Tooling:** Vite, ESLint, PostCSS, Tailwind CSS
- **Iconografía & Animaciones:** Lucide React, Canvas-Confetti, Tailwind Animations
- **Backend & Auth:** Firebase v11+ (Firebase Authentication con Google, Cloud Firestore para persistencia de datos)
- **Estilos & Tema:** Tema oscuro profundo `#10100F` con acentos en **Dorado Prestige (`#C6A84A`)**, fondos de tarjeta `#141414` / `#1C1C1A`, bordes sutiles `border-white/[0.08]`.

### Estructura de Directorios Clave (`src/`)

```text
src/
├── data/                    # Bancos semanales de preguntas (semana1 a semana20)
│   ├── semana1/questions.ts
│   ├── ...
│   └── semana20/questions.ts
├── components/              # Componentes de UI (Modales, Navbar, Resultados, etc.)
├── services/                # Servicios de Firebase y lógica de negocio
├── utils/
│   ├── studyCatalog.ts      # Taxonomía central de materias y temas para el modo estudio
│   ├── normalizer.ts        # Normalizador de texto y agrupación de subtemas
│   └── ...
├── types.ts                 # Interfaces TypeScript principales (Question, Session, etc.)
├── App.tsx                  # Orquestador principal de vistas y estados
└── main.tsx                 # Entrada de la aplicación React
```

---

## 4. Estructura y Formato del Banco de Preguntas

Cada semana reside en `src/data/semanaX/questions.ts` y exporta un array de tipo `Question[]` (`semanaXQuestions`).

### Modelo de Datos (`Question` en `src/types.ts`)

```typescript
export type Materia = 'Medicina Interna' | 'Pediatría' | 'Cirugía' | 'Ginecología y Obstetricia';

export interface Question {
  id: string;                     // ID único (ej: "semana20_gyo_q001")
  text: string;                   // Enunciado completo de la pregunta
  options: string[];              // Array de opciones (A, B, C, D o 4 alternativas)
  correctOptionIndex: number;     // Índice 0-based de la opción correcta (0 a 3)
  explanation: string;            // Justificación médica oficial con bibliografía
  materia: Materia;               // Materia troncal CONAREM
  semana: number;                 // Número de semana (1 a 20)
  tema: string;                   // Tema principal de la semana
  subtema: string;                // Subtema específico
  module: string;                 // Módulo o bloque temático
  pagina?: string;                // Referencia de página de libro (opcional)
  docx_tema?: string;             // Tema de origen del documento .docx
  subtema_grupo?: string;         // Agrupación normalizada
}
```

---

## 5. Inventario de Semanas Cargadas (Semanas 1 a 20)

| Semana | Materia Troncal | Temas Principales Cubiertos |
| :---: | :--- | :--- |
| **S1** | Pediatría | Neonatología (Adaptación neonatal, APGAR, Reanimación, Ictericia, Prematurez, SDR). |
| **S2** | Medicina Interna | Endocrinología (Diabetes Mellitus, Cetoacidosis, Tiroides, Suprarrenal, Hipófisis). |
| **S3** | Cirugía General | Infecciones quirúrgicas, Cicatrización de heridas, Patología de piel y partes blandas. |
| **S4** | Ginecología y Obstetricia | Anatomía pélvica, Trastornos anatómicos y del desarrollo, Prolapso de órganos pélvicos. |
| **S5** | Pediatría | Nutrición infantil, Lactancia materna, Desnutrición y Antropometría pediátrica. |
| **S6** | Medicina Interna | Oncohematología (Anemias, Leucemias, Linfomas) y Cuidados Críticos. |
| **S7** | Cirugía General | Traumatismos (ATLS), Manejo del politraumatizado, Quemaduras y Reanimación. |
| **S8** | Ginecología y Obstetricia | Endocrinología de la reproducción, Infecciones ginecológicas (EPI/ITS), Dolor pélvico. |
| **S9** | Pediatría | Crecimiento y Desarrollo (CRED), Hitos del desarrollo, Esquema Nacional de Vacunación. |
| **S10** | Medicina Interna | Cardiología (HTA, Insuficiencia Cardíaca, Cardiopatía Isquémica, Arritmias, Valvulopatías). |
| **S11** | Cirugía General | Patología quirúrgica de Esófago y Estómago (ERGE, Acalasia, Cáncer gástrico, Úlcera péptica). |
| **S12** | Ginecología y Obstetricia | Amenorreas primarias y secundarias, Menopausia/Climaterio, Métodos Anticonceptivos. |
| **S13** | Pediatría | Emergencias Pediátricas (Shock, Paro cardiorrespiratorio PALS, Dificultad respiratoria, Convulsiones). |
| **S14** | Medicina Interna | Reumatología (LES, AR, Vasculitis) y Neumología (Asma, EPOC, Neumonías, TBC). |
| **S15** | Cirugía General | Cirugía Torácica (Neumotórax, Hemotórax, Derrames) y Patología mamaria (Benigna y Cáncer). |
| **S16** | Ginecología y Obstetricia | Sangrado Uterino Anormal (SUA/PALM-COEIN), SOP, Patología uterina benigna, Endometriosis. |
| **S17** | Pediatría | Infectología Pediátrica (Exantemáticas, Meningitis, ITU, Diarreas agudas, Neumonías pediátricas). |
| **S18** | Medicina Interna | Neurología (ACV, Cefaleas, Epilepsia) y Nefrología (IRA, ERC, Glomerulopatías, Trastornos hidroelectrolíticos). |
| **S19** | Cirugía General | Patología quirúrgica de Hígado, Vías Biliares y Páncreas (Colelitiasis, Coledocolitiasis, Colecistitis, Pancreatitis). |
| **S20** | Ginecología y Obstetricia | Fisiología materna, Implantación, Anormalidades placentarias, Embriología y desarrollo fetal, Atención prenatal, Imágenes obstétricas y Diagnóstico prenatal (**169 preguntas oficiales**). |

---

## 6. Taxonomía y Catálogo de Estudio (`studyCatalog.ts`)

El archivo `src/utils/studyCatalog.ts` es el núcleo de navegación para el **Modo Estudio / Práctica Temática**.

1. **`STUDY_TOPICS`:** Contiene la lista de todos los temas registrados con su `id`, `materia` y `label`.
2. **`resolveTopicId(question)`:** Mapea la pregunta según su semana y tema para asignarle su tarjeta temática.
3. **`classifyQuestionForStudy(question)`:** Clasifica la pregunta con **mecanismo de fallback seguro**. Si una semana no tiene mapeo explícito, recurre a la materia general en lugar de provocar un fallo en tiempo de ejecución.

> [!IMPORTANT]
> Al agregar una nueva semana (Semana 21+), es obligatorio registrar sus temas en `STUDY_TOPICS` y en el `switch (question.semana)` de `resolveTopicId` en `studyCatalog.ts`.

---

## 7. Reglas Médicas y Fuentes de Información

1. **Fidelidad Literal:** Las preguntas provienen de los tests y resúmenes oficiales creados por Dr. Rodney, ubicados en `C:\Users\Rodney Duarte\Documents\Conarem 2027\`.
2. **No Inventar Respuestas:** Jamás generar claves arbitrarias. Si falta una respuesta o justificación en un `.docx`, consultar o transcribir fielmente según bibliografía oficial INS.
3. **Bibliografía Oficial CONAREM (Paraguay):**
   - *Medicina Interna:* Harrison Principios de Medicina Interna (21ª ed.).
   - *Pediatría:* Nelson Tratado de Pediatría (21ª ed.) y Normas del MSPyBS.
   - *Cirugía:* Sabiston Tratado de Cirugía (21ª ed.) y Schwartz Principios de Cirugía (11ª ed.).
   - *Ginecología y Obstetricia:* Williams Obstetricia (26ª ed.) y Williams Ginecología (4ª ed.).

---

## 8. Guía de Comandos y Despliegue

### Compilación y Desarrollo Local

```powershell
# Ejecutar servidor de desarrollo
npm run dev

# Compilar para producción (Vite)
# NOTA EN WINDOWS: Si PowerShell bloquea scripts de npm, usar cmd.exe:
cmd.exe /c "npm.cmd run build"
```

### Despliegue a Firebase

El proyecto Firebase configurado es `simulator-5ff8c`.

```powershell
# Desplegar aplicación web (Hosting)
node ./node_modules/firebase-tools/lib/bin/firebase.js deploy --project simulator-5ff8c --only hosting
# O con el binario local:
.\node_modules\.bin\firebase.cmd deploy --project simulator-5ff8c --only hosting

# Desplegar Reglas de Seguridad de Firestore
.\node_modules\.bin\firebase.cmd deploy --project simulator-5ff8c --only firestore:rules
```

### Git y Versionado

El repositorio tiene dos remotos configurados:
- `origin`: `https://github.com/emaob7/simulador.git` (rama principal de desarrollo)
- `myrepo`: `https://github.com/roeyduary-creator/Simulator.git` (rama de respaldo)

Para guardar cambios:
```powershell
git add .
git commit -m "feat(semanaXX): descripcion de los cambios"
git push origin main
```

---

## 9. Protocolo para Agregar Nuevas Semanas (Semana 21 en adelante)

Cuando el usuario pida integrar una nueva semana, seguir este procedimiento exacto:

1. **Extraer y parsear preguntas:**
   - Leer los archivos `.docx` provistos por el usuario desde `C:\Users\Rodney Duarte\Documents\Conarem 2027\[ESPECIALIDAD]\`.
   - Extraer enunciados, opciones (A, B, C, D), índice correcto y explicaciones justificadas.
2. **Crear el archivo de datos:**
   - Crear `src/data/semanaXX/questions.ts` exportando `semanaXXQuestions: Question[]`.
3. **Registrar en `App.tsx`:**
   - Importar `semanaXXQuestions` en `src/App.tsx`.
   - Concatenar `semanaXXQuestions` en el array `allQuestions`.
   - Agregar el caso correspondiente en la función `getWeekThemeTitle(weekNumber)`.
4. **Actualizar Taxonomía en `studyCatalog.ts`:**
   - Agregar los nuevos temas en el array `topics`.
   - Agregar el `case XX:` dentro de `resolveTopicId(question)`.
5. **Compilar y Desplegar:**
   - Correr `npm run build` para validar que no haya errores de TypeScript.
   - Desplegar con Firebase Hosting.
6. **Confirmar con Rodney:** Explicar claramente las preguntas cargadas, temas agregados y estado del despliegue.

---

## 10. Trato y Comunicación

- **Tono:** Cercano, profesional, directo y resolutivo.
- **Forma verbal:** Español con voseo rioplatense/paraguayo (*"vos"*, *"mirá"*, *"acordate"*, *"fijate"*).
- **Proactividad:** Validar siempre tipos de TypeScript, compilación y despliegue antes de dar por terminada una tarea.
