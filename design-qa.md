# Design QA — Ingreso y Analíticas

## Alcance

- Pantalla de ingreso: solo acceso con Google.
- Vista de Analíticas: jerarquía editorial, resumen dinámico, sesión pendiente, especialidades, prioridad y mapa de estudio.
- El Simulador y las demás vistas quedaron fuera del rediseño.

## Fuentes visuales

- Ingreso: `C:\Users\Rodney Duarte\.codex\generated_images\01a025f2-50cd-7e32-9b2a-2456197b197a\exec-9878fca2-7dde-40f5-95f3-6cdf9f40f941.png`
- Analíticas: `C:\Users\RODNEY~1\AppData\Local\Temp\codex-clipboard-8910fec5-e8b9-482c-a6a5-ff3530316fb9.png`

## Implementación verificada

- Ingreso desktop: `work/qa-login-v2.png` — viewport 1440 × 1000, sesión cerrada.
- Analíticas desktop: `work/qa-dashboard-v2.png` — viewport 1440 × 1000, datos locales realistas, sesión pendiente y Medicina Interna seleccionada.
- Ingreso móvil: `work/qa-login-mobile.png` — viewport 390 × 844.
- Analíticas móvil final: `work/qa-dashboard-mobile-v2.png` — viewport 390 × 844.

## Comparación lado a lado

- Ingreso: `work/qa-login-comparison-final.png`
- Analíticas: `work/qa-dashboard-comparison-final.png`
- Foco de ingreso: `work/qa-login-focus-v1.png`
- Foco de Analíticas: `work/qa-dashboard-focus-v1.png`

Las comparaciones revisaron composición, jerarquía, proporciones, espaciado, contraste, bordes y densidad. La diferencia de cifras en Analíticas es intencional: la implementación usa datos dinámicos del banco y del progreso, no valores fijos de la referencia. El shell lateral existente también se conserva por indicación del usuario.

## Hallazgos y correcciones

- P1: el primer pase de Analíticas podía ampliar el ancho del documento en móvil. Se limitó el ancho intrínseco de la vista y se volvió a capturar a 390 px; no queda desplazamiento horizontal.
- P2: el primer pase de ingreso usaba una cabecera sans y texto adicional. Se alineó con la referencia editorial usando serif, el mensaje breve de acceso y separación correcta del ícono de Google.
- P2: el encabezado de Analíticas mostraba una descripción genérica. Se cambió por fecha dinámica y semana activa cuando existe una sesión pendiente, conservando el contenido funcional.
- P0: ninguno.

## Historial

1. Captura inicial desktop de ambas vistas.
2. Comparación conjunta con las referencias.
3. Ajustes de tipografía y contenido en ingreso, y encabezado dinámico en Analíticas.
4. Nueva captura desktop y segunda comparación conjunta.
5. Prueba móvil; corrección del desbordamiento horizontal de Analíticas.
6. Captura móvil final y validación de lectura, controles y responsividad.

## Resultado final

passed
