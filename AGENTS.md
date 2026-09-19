# IDENTIDAD DEL PROYECTO: SIMULADOR DE EXÁMENES (SIMULADOR EMMA / SIMULATOR)

> [!CRITICAL]
> REGLA DE ORO PARA CUALQUIER ASISTENTE DE IA (ChatGPT, Claude, Antigravity, Cursor, Copilot):
> Este es el repositorio OFICIAL del Simulador de Exámenes Médicos CONAREM de Dr. Rodney.
> NUNCA lo reemplaces por prototipos antiguos ni cambies su diseño o estructura.
> Para leer todo el detalle y la guía paso a paso, consultá `CONTEXTO.md` o `C:\Users\Rodney Duarte\Documents\Aplicaciones CONAREM\CONTEXTO_SIMULADOR.md`.

## 1. Identificación y Rutas
- **Nombre:** Simulador de Exámenes CONAREM (Simulador Emma)
- **Ruta Local Oficial y única carpeta de trabajo:** `C:\Users\Rodney Duarte\Documents\Aplicaciones CONAREM\Simulator`
- **Copia retirada:** `C:\Users\Rodney Duarte\Documents\APPS\Simulator` se conserva solo como respaldo histórico. No editar, compilar ni desplegar desde allí.
- **Ruta Espejo Codex:** `C:\Users\Rodney Duarte\Documents\Codex\2026-08-21\hola-chatgpt-te-pongo-en-contexto\work\simulador`
- **Carpeta de Contexto Compartido:** `C:\Users\Rodney Duarte\Documents\Aplicaciones CONAREM\`
- **Repositorio Git Oficial (Emma):** `https://github.com/emaob7/simulador.git`
- **Repositorio Git Propio (Rodney):** `https://github.com/roeyduary-creator/Simulator.git`
- **Proyecto Firebase:** `simulator-5ff8c`
- **URL de Producción:** https://simulator-5ff8c.web.app / https://simulator-5ff8c.firebaseapp.com

## 2. Marcadores Inconfundibles de Verificación
Antes de compilar o desplegar, verifica SIEMPRE:
1. `git remote -v` debe contener `emaob7/simulador` o `roeyduary-creator/Simulator`.
2. `src/data/` DEBE contener desde `semana1` hasta `semana21` (`src/data/semana21/questions.ts`).
3. `index.html` DEBE tener: `<title>Simulador CONAREM | Dr. Rodney</title>` con tema `#10100F`.
4. Antes de modificar preguntas, leer la sección 10 de `CONTEXTO.md` (reglas de calidad del banco y barajado).

## 3. Comandos de Compilación y Despliegue
- **Compilar:** `cmd.exe /c "npm run build"`
- **Desplegar Hosting:** `node ./node_modules/firebase-tools/lib/bin/firebase.js deploy --project simulator-5ff8c --only hosting` (o `.\node_modules\.bin\firebase.cmd deploy --project simulator-5ff8c --only hosting`)
- **Desplegar Reglas:** `.\node_modules\.bin\firebase.cmd deploy --project simulator-5ff8c --only firestore:rules`
