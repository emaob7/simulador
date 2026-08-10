import { Question } from '../../types';

export const questionsSemana1: Question[] = [
  {
    id: 'neo_q1',
    text: 'EN RELACIÓN CON LA ATENCIÓN INMEDIATA DEL RECIÉN NACIDO SANO, SEÑALE LA OPCIÓN INCORRECTA:',
    options: [
      'El recién nacido sano debe permanecer con su madre siempre que sea posible y no se justifica la separación rutinaria para observación.',
      'Tras el nacimiento, el recién nacido debe ser secado, retirado del contacto con la madre y trasladado a una superficie térmica para su evaluación inicial.',
      'El contacto piel a piel debe iniciarse al nacimiento y mantenerse al menos durante la primera hora de vida, evitando interrupciones innecesarias.',
      'El cordón umbilical debe pinzarse y cortarse de forma oportuna, una vez que cesan las pulsaciones, aproximadamente entre 1 y 3 minutos después del nacimiento.',
      'La lactancia materna debe iniciarse dentro de la primera hora de vida.'
    ],
    correctOptionIndex: 1,
    explanation: '✅ ¿Por qué es la respuesta correcta?\nIncorrecta: En el RN sano no se permite la separación; el secado y evaluación se hacen sobre el abdomen materno para asegurar el contacto piel a piel, estabilizar la temperatura y favorecer el apego.\n\n💡 Puntos Clave:\n- Termorregulación: El contacto piel a piel inmediato es la medida más eficaz para evitar la pérdida de calor por evaporación y conducción.\n- Pinzamiento Oportuno: Esperar 1-3 minutos aumenta las reservas de hierro hasta los 6 meses de vida. Solo es inmediato en desprendimiento de placenta, madre VIH+ o asfixia.\n- Profilaxis Obligatoria: Vitamina K1 (1 mg IM) para evitar enfermedad hemorrágica; gotas oftálmicas (eritromicina o nitrato de plata) para evitar conjuntivitis neonatal gonocócica.\n- Tamizaje: El cribado metabólico y auditivo se inicia idealmente antes del alta (después de las 24-48 horas de ingesta de leche).',
    pagina: 'Manual de Atención Neonatal, 2.ª ed., pág. 16',
    materia: 'Pediatría',
    semana: 1,
    tema: 'Neonatología',
    subtema: 'Atención inmediata del recién nacido',
    module: 'Semana 1 - Pediatría'
  },
  {
    id: 'neo_q2',
    text: 'EN RELACIÓN CON EL EXAMEN FÍSICO ORDENADO EN SENTIDO CÉFALO-CAUDAL DEL RECIÉN NACIDO SANO, SEÑALE LA OPCIÓN INCORRECTA:',
    options: [
      'La fontanela posterior suele cerrarse alrededor de los 18 meses y la fontanela anterior cerca de los 3 meses de vida.',
      'El flujo vaginal blanquecino en la recién nacida puede observarse como un hallazgo fisiológico normal.',
      'La fimosis en el recién nacido varón suele ser fisiológica y no requiere tratamiento inmediato.',
      'El examen físico del recién nacido debe realizarse al nacer, dentro de las primeras 12 horas y nuevamente al cumplir 24 horas de vida.',
      'El primer control postnatal del recién nacido sano debe realizarse después de las 48 horas del alta, siempre que no existan factores de riesgo.'
    ],
    correctOptionIndex: 0,
    explanation: '✅ ¿Por qué es la respuesta correcta?\nIncorrecta: Tiempos invertidos. La posterior cierra a los 2-3 meses (pequeña) y la anterior a los 9-18 meses (grande).\n\n💡 Puntos Clave:\n- Fontanelas: La fontanela anterior persistente puede asociarse a hipotiroidismo congénito o raquitismo. Si está abombada indica hipertensión endocraneana (meningitis, hemorragia).\n- Caput vs Cefalohematoma:\n  - Caput: Edema blando, respeta suturas, aparece al nacer, resuelve en 48h.\n  - Cefalohematoma: Sangre subperióstica, no respeta suturas, aparece tras horas, puede causar ictericia al reabsorberse.\n- Suturas: El cabalgamiento óseo es normal por el paso por el canal del parto. La craneosinostosis (cierre prematuro) es patológica.',
    pagina: 'Manual de Atención Neonatal, 2.ª ed., págs. 35–36',
    materia: 'Pediatría',
    semana: 1,
    tema: 'Neonatología',
    subtema: 'RECIEN NACIDO NORMAL',
    module: 'Semana 1 - Pediatría'
  },
  {
    id: 'neo_q3',
    text: 'Son hallazgos normales de la piel y anexos del recién nacido, EXCEPTO:',
    options: [
      'Vernix caseosa.',
      'Lanugo.',
      'Petequias.',
      'Milium.',
      'Mancha mongólica.'
    ],
    correctOptionIndex: 2,
    explanation: '✅ ¿Por qué es la respuesta correcta?\nLas petequias indican patología (sepsis, TORCH) si son generalizadas; el resto son hallazgos fisiológicos benignos.\n\n💡 Puntos Clave:\n- Eritema Tóxico Neonatal: El exantema más común. Pápulas amarillentas sobre base roja. El frotis revela abundantes eosinófilos. Es benigno y desaparece en 1 semana.\n- Ictericia Fisiológica: Inicia después de las 24 horas, alcanza el pico al 3er-5to día y no requiere tratamiento si los niveles son bajos.\n- Ictericia Patológica: Inicia antes de las 24 horas, dura más de 2 semanas o tiene niveles de bilirrubina muy elevados.\n- Mancha Mongólica: Melanocitosis dérmica en región sacra. Benigna, no confundir con maltrato.',
    pagina: 'Manual de Atención Neonatal, 2.ª ed., pág. 38',
    materia: 'Pediatría',
    semana: 1,
    tema: 'Neonatología',
    subtema: 'RECIEN NACIDO NORMAL',
    module: 'Semana 1 - Pediatría'
  },
  {
    id: 'neo_q4',
    text: 'EN RELACIÓN CON LAS PARÁLISIS OBSTÉTRICAS DEL PLEXO BRAQUIAL EN EL RECIÉN NACIDO, SEÑALE LA OPCIÓN CORRECTA:',
    options: [
      'La parálisis de Klumpke compromete las raíces C5–C6 y se caracteriza por el brazo en aducción y rotación interna.',
      'La parálisis de Erb-Duchenne compromete las raíces C5–C6, con hombro en rotación interna y codo extendido, conservándose la prensión palmar.',
      'La parálisis de Klumpke se presenta con compromiso predominante del hombro y ausencia del reflejo de Moro.',
      'En la parálisis de Erb-Duchenne es frecuente la ptosis y miosis ipsilateral por compromiso simpático.'
    ],
    correctOptionIndex: 1,
    explanation: '✅ ¿Por qué es la respuesta correcta?\nErb-Duchenne (C5-C6): Afecta hombro/codo (propina de camarero), pero la mano está sana porque C8-T1 no están dañadas, permitiendo la prensión palmar.\n\n💡 Puntos Clave:\n- Erb-Duchenne (Superior): Raíces C5-C6. Brazo en aducción, rotación interna y codo extendido. Moro ausente de ese lado. Puede asociarse a parálisis del nervio frénico (dificultad respiratoria).\n- Klumpke (Inferior): Raíces C8-T1. Mano en garra, prensión palmar ausente. Puede presentar síndrome de Horner (ptosis, miosis, anhidrosis) por afectación de fibras simpáticas de T1.\n- Manejo: Fisioterapia precoz y seguimiento. La mayoría recupera la función en meses.',
    pagina: 'Manual de Atención Neonatal, 2.ª ed., págs. 42–43',
    materia: 'Pediatría',
    semana: 1,
    tema: 'Neonatología',
    subtema: 'Atención inmediata del recién nacido',
    module: 'Semana 1 - Pediatría'
  },
  {
    id: 'neo_q5',
    text: 'EN RELACIÓN CON LAS MEDIDAS PARA DISMINUIR EL RIESGO DE SÍNDROME DE MUERTE SÚBITA DEL LACTANTE, SEÑALE LA OPCIÓN INCORRECTA:',
    options: [
      'Colocar al lactante boca arriba cada vez que se lo acueste para dormir.',
      'Mantener la cuna libre de objetos blandos, almohadas, peluches o ropa de cama suelta.',
      'Evitar el sobreabrigo y mantener una temperatura ambiental adecuada en la habitación.',
      'Hacer dormir al lactante en la misma cama que los padres para facilitar la observación nocturna.',
      'Mantener al lactante alejado del humo del tabaco y de ambientes con fumadores.'
    ],
    correctOptionIndex: 3,
    explanation: '✅ ¿Por qué es la respuesta correcta?\nIncorrecta: El colecho es un factor de riesgo mayor. Se recomienda co-habitación (misma pieza) pero no colecho (misma cama) para evitar asfixia accidental.\n\n💡 Puntos Clave:\n- Posición Segura: Siempre boca arriba (decúbito supino). La posición de lado es inestable y aumenta el riesgo.\n- Superficie de Sueño: Colchón firme, sin protectores acolchados ("chichoneras"), juguetes ni mantas sueltas.\n- Factores Protectores: Lactancia materna exclusiva y uso de chupete (una vez establecida la lactancia) reducen el riesgo de SMSL.\n- Tabaquismo: El humo del tabaco ambiental es el principal factor de riesgo modificable después de la posición al dormir.',
    pagina: 'Manual de Atención Neonatal, 2.ª ed., pág. 57',
    materia: 'Pediatría',
    semana: 1,
    tema: 'Neonatología',
    subtema: 'MUERTE SÚBITA DEL LACTANTE (SMSL)',
    module: 'Semana 1 - Pediatría'
  },
  {
    id: 'neo_q6',
    text: 'RECIÉN NACIDO A TÉRMINO, PARTO VAGINAL, LÍQUIDO AMNIÓTICO CLARO. AL MINUTO DE VIDA PRESENTA RESPIRACIÓN IRREGULAR TIPO BOQUEANTE, CON ESCASA ELEVACIÓN TORÁCICA. FC 90 LPM. SE LO ESTIMULA Y SECA ADECUADAMENTE, SIN MEJORÍA DEL PATRÓN RESPIRATORIO. ¿CONDUCTA INICIAL MÁS ADECUADA?',
    options: [
      'Administrar oxígeno suplementario a flujo libre y reevaluar en 1 minuto.',
      'Aspirar secreciones de vía aérea de forma rutinaria.',
      'Iniciar compresiones torácicas externas de inmediato.',
      'Administrar adrenalina endotraqueal.',
      'Iniciar ventilación a presión positiva (VPP).'
    ],
    correctOptionIndex: 4,
    explanation: '✅ ¿Por qué es la respuesta correcta?\nAnte apnea, boqueo (gasping) o FC < 100 lpm, el paso inmediato y más importante del algoritmo de reanimación es iniciar VPP para expandir los pulmones.\n\n💡 Puntos Clave:\n- Minuto de Oro: Plazo máximo de 60 segundos para iniciar VPP si el RN no respira eficazmente.\n- Oxígeno Inicial: En RN a término se inicia VPP con aire ambiente (21% O2). En prematuros <35 semanas se inicia con 21-30%.\n- Aspiración: Solo si hay obstrucción evidente por secreciones o sangre. No se aspira de rutina porque puede causar bradicardia por reflejo vagal.',
    pagina: 'Manual de Atención Neonatal, 2.ª ed., pág. 105',
    materia: 'Pediatría',
    semana: 1,
    tema: 'Neonatología',
    subtema: 'REANIMACIÓN NEONATAL',
    module: 'Semana 1 - Pediatría'
  },
  {
    id: 'neo_q7',
    text: 'RECIÉN NACIDO A TÉRMINO QUE RECIBE VENTILACIÓN A PRESIÓN POSITIVA (VPP) POR RESPIRACIÓN TIPO GASPING. TRAS 30 SEGUNDOS DE VPP, SE OBSERVA BUENA EXCURSIÓN TORÁCICA. LA FRECUENCIA CARDÍACA ES DE 80 LATIDOS POR MINUTO. ¿CUÁL ES LA CONDUCTA MÁS ADECUADA?',
    options: [
      'Reevaluar VPP y corregir técnica si es necesario.',
      'Suspender VPP y observar evolución clínica.',
      'Iniciar compresiones torácicas inmediatamente.',
      'Administrar adrenalina por vía endotraqueal.',
      'Intubar sin realizar maniobras previas.'
    ],
    correctOptionIndex: 0,
    explanation: '✅ ¿Por qué es la respuesta correcta?\nSi la FC es 60-99, se debe optimizar la técnica de VPP (MR. SOPA) antes de decidir el paso a compresiones, ya que la ventilación efectiva suele resolver la bradicardia.\n\n💡 Puntos Clave:\n- MR. SOPA: M (Máscara: ajuste), R (Reposicionar vía aérea), S (Succión: boca/nariz), O (Open: boca abierta), P (Presión: aumentar), A (Alternativa: vía aérea avanzada/tubo).\n- Compresiones: Solo si FC < 60 tras 30 segundos de VPP efectiva que logre expandir el tórax. Técnica de dos pulgares con relación 3:1 (90 compresiones y 30 ventilaciones por minuto).',
    pagina: 'Manual de Atención Neonatal, 2.ª ed., pág. 109',
    materia: 'Pediatría',
    semana: 1,
    tema: 'Neonatología',
    subtema: 'REANIMACIÓN NEONATAL',
    module: 'Semana 1 - Pediatría'
  },
  {
    id: 'neo_q8',
    text: 'RECIÉN NACIDO PREMATURO DE 30 SEMANAS DE EG, A LAS 2 HORAS DE VIDA con TAQUIPNEA, RETRACCIONES INTERCOSTALES, ALETEO NASAL Y QUEJIDO ESPIRATORIO. RX DE TÓRAX: PULMÓN CON VOLUMEN REDUCIDO, DISMINUCIÓN DE ESPACIOS INTERCOSTALES Y PATRÓN RETICULOGRANULAR DIFUSO. GASES: HIPOXEMIA. ¿DIAGNÓSTICO MÁS PROBABLE?',
    options: [
      'Taquipnea transitoria del recién nacido.',
      'Neumonía connatal.',
      'Enfermedad de la membrana hialina.',
      'Aspiración meconial.',
      'Malformación pulmonar congénita.'
    ],
    correctOptionIndex: 2,
    explanation: '✅ ¿Por qué es la respuesta correcta?\nCuadro típico de prematuro con déficit de surfactante. La radiografía muestra pulmones "pequeños" (colapsados) con aspecto de "vidrio esmerilado" (reticulogranular difuso).\n\n💡 Puntos Clave:\n- Causa: Déficit de surfactante producido por los neumocitos tipo II.\n- Factores de Riesgo: Prematuridad, diabetes materna, cesárea sin trabajo de parto.\n- Prevención: Corticoides prenatales (betametasona) para inducir la madurez pulmonar entre las 24 y 34 semanas de gestación.\n- Tratamiento: Surfactante exógeno endotraqueal y soporte ventilatorio (idealmente CPAP nasal).',
    pagina: 'Manual de Atención Neonatal, 2.ª ed., pág. 167',
    materia: 'Pediatría',
    semana: 1,
    tema: 'Neonatología',
    subtema: 'ENFERMEDAD DE MEMBRANA HIALINA (EMH)',
    module: 'Semana 1 - Pediatría'
  },
  {
    id: 'neo_q9',
    text: '¿Cuál es el tratamiento de elección farmacológico para la cardiopatía más frecuente en el recién nacido prematuro, el ductus arterioso persistente?',
    options: [
      'Furosemida endovenosa para disminuir la sobrecarga pulmonar.',
      'Ibuprofeno endovenoso para el cierre del ductus.',
      'Prostaglandinas E1 para mantener el ductus permeable.',
      'Cirugía correctiva inmediata en todos los casos diagnosticados.',
      'Oxigenoterapia exclusiva hasta el cierre espontáneo del ductus.'
    ],
    correctOptionIndex: 1,
    explanation: '✅ ¿Por qué es la respuesta correcta?\nEl Ibuprofeno inhibe la síntesis de prostaglandinas (que mantienen el ductus abierto), induciendo el cierre del conducto arterioso en el prematuro.\n\n💡 Puntos Clave:\n- Clínica: Soplo continuo "en maquinaria de Gibson", pulsos saltones, precordio hiperdinámico.\n- Cierre: Ibuprofeno o Indometacina (Inhibidores de la COX). Paracetamol es una alternativa en caso de contraindicación de AINES (sangrado o insuficiencia renal).\n- Mantenimiento: Las Prostaglandinas E1 se usan para mantener el ductus abierto en cardiopatías ductus-dependientes (como la transposición de grandes vasos).',
    pagina: 'Manual de Atención Neonatal, 2.ª ed., pág. 177',
    materia: 'Pediatría',
    semana: 1,
    tema: 'Neonatología',
    subtema: 'DUCTUS ARTERIOSO (DAP)',
    module: 'Semana 1 - Pediatría'
  },
  {
    id: 'neo_q10',
    text: '¿CUÁL ES EL FACTOR PREDISPONENTE INDIVIDUAL MÁS IMPORTANTE PARA EL DESARROLLO DE ENTEROCOLITIS NECROTIZANTE (ECN) EN EL RECIÉN NACIDO?',
    options: [
      'Colonización intestinal.',
      'Alimentación enteral con leches de fórmula.',
      'Persistencia del ductus arterioso.',
      'Eventos de hipoxia o hipoperfusión peri y postnatal.',
      'Prematuridad.'
    ],
    correctOptionIndex: 4,
    explanation: '✅ ¿Por qué es la respuesta correcta?\nLa prematuridad es el factor de riesgo crítico debido a la inmadurez de la mucosa, la baja motilidad y la respuesta inmune deficiente del intestino del neonato pretérmino.\n\n💡 Puntos Clave:\n- Clínica: Distensión abdominal marcada, intolerancia alimentaria, restos hemáticos en heces.\n- Imagen Patognomónica: Neumatosis intestinal (aire en la pared del intestino). El gas en el sistema porta o el neumoperitoneo indican mayor gravedad.\n- Prevención: La leche materna es el factor protector más importante; la alimentación con fórmula es un factor de riesgo.\n- Manejo: Reposo intestinal (NPO), antibióticos de amplio espectro y cirugía en caso de perforación intestinal.',
    pagina: 'Manual de Atención Neonatal, 2.ª ed., pág. 182',
    materia: 'Pediatría',
    semana: 1,
    tema: 'Neonatología',
    subtema: 'ENTEROCOLITIS NECROTIZANTE (ECN)',
    module: 'Semana 1 - Pediatría'
  },
  {
    id: 'neo_q11',
    text: 'El aumento de tamaño y secreción de la glándula mamaria de un RN de término de sexo masculino:',
    options: [
      'Sugiere hiperplasia suprarrenal',
      'Sugiere afectación hipofisiaria',
      'Es siempre patológica',
      'Es una manifestación transitoria'
    ],
    correctOptionIndex: 3,
    explanation: '✅ ¿Por qué es la respuesta correcta?\nCorrecta:  Efecto de estrógenos maternos; fenómeno fisiológico y autolimitado.\n\n💡 Puntos Clave:\n- Fisiológico: Paso de estrógenos maternos → estimulan tejido mamario neonatal.\n- Presentación: Aumento de tamaño ± secreción (“leche de bruja”).\n- Conducta: No manipular ni drenar → se resuelve solo.',
    pagina: 'Manual de Neonatología, pág. 56',
    materia: 'Pediatría',
    semana: 1,
    tema: 'Neonatología',
    subtema: 'RECIEN NACIDO NORMAL',
    module: 'Semana 1 - Pediatría'
  },
  {
    id: 'neo_q12',
    text: '¿Cuál de los siguientes no está asociada con fontanela anterior grande?',
    options: [
      'Osteogénesis imperfecta',
      'Trisomías 13, 18 y 21',
      'Prematuridad',
      'Atresia congénita de vías biliares',
      'Hipotiroidismo'
    ],
    correctOptionIndex: 3,
    explanation: '✅ ¿Por qué es la respuesta correcta?\nCorrecta:  Las demás condiciones retrasan la osificación → fontanela grande.\n\n💡 Puntos Clave:\n- Fontanela grande: Indica retraso en la osificación del cráneo.\n- Causas clásicas: Hipotiroidismo y trisomías → alteran desarrollo óseo.\n- Prematuridad: Huesos menos osificados → fontanelas más amplias.\n- Trampa: No confundir con causas no óseas (ej: hepatobiliares).',
    pagina: 'Nelson. Tratado de Pediatría, 21ª edición, pág. 869',
    materia: 'Pediatría',
    semana: 1,
    tema: 'Neonatología',
    subtema: 'RECIEN NACIDO NORMAL',
    module: 'Semana 1 - Pediatría'
  },
  {
    id: 'neo_q13',
    text: '¿Cuál de los siguientes trastornos está relacionado con una fontanela anterior pequeña?',
    options: [
      'Disostosis',
      'Hipofosfatasia',
      'Hipertiroidismo congénito',
      'Raquitismo de déficit de Vit D',
      'Rubeola congénita'
    ],
    correctOptionIndex: 2,
    explanation: '✅ ¿Por qué es la respuesta correcta?\nCorrecta:  Acelera la osificación → cierre precoz.\n\n💡 Puntos Clave:\n- Fontanela pequeña: Indica osificación acelerada o cierre precoz.\n- Hipertiroidismo: Aumenta metabolismo óseo → cierre temprano.\n- Diferencial: Raquitismo e hipofosfatasia → fontanelas grandes.',
    pagina: 'Nelson. Tratado de Pediatría, 21ª edición, pág. 869',
    materia: 'Pediatría',
    semana: 1,
    tema: 'Neonatología',
    subtema: 'RECIEN NACIDO NORMAL',
    module: 'Semana 1 - Pediatría'
  },
  {
    id: 'neo_q14',
    text: 'Un RN que al minuto de nacer presenta llanto débil, FC 90, ligera flexión de extremidades, reacción discreta a los estímulos (mueca) y cianosis, le corresponde una calificación de APGAR de:',
    options: [
      '1',
      '2',
      '3',
      '4'
    ],
    correctOptionIndex: 3,
    explanation: '✅ ¿Por qué es la respuesta correcta?\nCorrecta:  FC <100 (1) + llanto débil (1) + flexión (1) + mueca (1) + cianosis (0).\n\n💡 Puntos Clave:\n- APGAR: Evalúa adaptación inmediata, no causa.\n- Componentes: FC, respiración, tono, reflejos y color.\n- Error clave: APGAR bajo no significa necesariamente hipoxia.',
    pagina: 'Manual de Atención Neonatal, pág. 19. Nelson 21ª edición, pág. 872',
    materia: 'Pediatría',
    semana: 1,
    tema: 'Neonatología',
    subtema: 'Atención inmediata del recién nacido',
    module: 'Semana 1 - Pediatría'
  },
  {
    id: 'neo_q15',
    text: 'Atención inmediata del recién nacido',
    options: [
      'Vérnix caseosa',
      'Lanugo',
      'Petequias',
      'Milium',
      'Mancha mongólica'
    ],
    correctOptionIndex: 2,
    explanation: '✅ ¿Por qué es la respuesta correcta?\nCorrecta: Si son generalizadas sugieren patología (sepsis, TORCH).\n\n💡 Puntos Clave:\n- Normales: Vérnix, lanugo, milium y mancha mongólica.\n- Petequias: Si son generalizadas → sospechar sepsis o TORCH.\n- Clave examen: Diferenciar lesiones benignas vs patológicas.',
    pagina: 'Manual de Atención Neonatal, 2ª edición, pág. 38',
    materia: 'Pediatría',
    semana: 1,
    tema: 'Neonatología',
    subtema: 'RECIEN NACIDO NORMAL',
    module: 'Semana 1 - Pediatría'
  },
  {
    id: 'neo_q16',
    text: 'Respecto al cefalohematoma en el RN puede decirse que:',
    options: [
      'Cruza la línea media del cráneo',
      'Nunca se asocia fractura del cráneo subyacente',
      'Se reabsorbe en general entre las 2 semanas y los 3 meses',
      'Nunca se calcifica'
    ],
    correctOptionIndex: 2,
    explanation: '✅ ¿Por qué es la respuesta correcta?\nCorrecta: Colección subperióstica que evoluciona a resolución espontánea.\n\n💡 Puntos Clave:\n- Cefalohematoma: Sangrado subperióstico limitado por suturas.\n- No cruza línea media: Diferencia clave con caput succedaneum.\n- Complicaciones: Puede asociarse a fractura o calcificarse.',
    pagina: 'Nelson. Tratado de Pediatría, 21ª edición, pág. 914',
    materia: 'Pediatría',
    semana: 1,
    tema: 'Neonatología',
    subtema: 'RECIEN NACIDO NORMAL',
    module: 'Semana 1 - Pediatría'
  },
  {
    id: 'neo_q17',
    text: 'Con respecto al score de APGAR se puede afirmar lo siguiente, excepto que:',
    options: [
      'Es un método práctico de evaluación del RN en forma inmediata al parto',
      'Puede ser realizado en el abdomen de la madre',
      'La puntuación de 10 indica el mejor estado posible de un RN',
      'Un bajo puntaje siempre significa hipoxia-acidosis fetal'
    ],
    correctOptionIndex: 3,
    explanation: '✅ ¿Por qué es la respuesta correcta?\nCorrecta:  No es específico; múltiples causas pueden disminuir el APGAR.\n\n💡 Puntos Clave:\n- Evalúa adaptación neonatal.\n- No diagnostica hipoxia.\n- Trampa clásica de examen.',
    pagina: 'Nelson. Tratado de Pediatría, 21ª edición, pág. 872',
    materia: 'Pediatría',
    semana: 1,
    tema: 'Neonatología',
    subtema: 'Atención inmediata del recién nacido',
    module: 'Semana 1 - Pediatría'
  },
  {
    id: 'neo_q18',
    text: 'Los siguientes son correctos con respecto al onfalocele EXCEPTO que:',
    options: [
      'Es cubierto por membrana transparente',
      'Está frecuentemente asociado a otras malformaciones',
      'La inserción del cordón umbilical distal en el saco lo diferencia de otros defectos de la pared',
      'Es lateral al muñón umbilical'
    ],
    correctOptionIndex: 3,
    explanation: '✅ ¿Por qué es la respuesta correcta?\nCorrecta: El onfalocele es medial; lo lateral corresponde a gastrosquisis.\n\n💡 Puntos Clave:\n- Onfalocele: Defecto en línea media cubierto por membrana.\n- Cordón: Se inserta dentro del saco.\n- Gastrosquisis: Lateral, sin membrana y con vísceras expuestas.\n- Perla: Onfalocele se asocia más a malformaciones.',
    pagina: 'Nelson. Tratado de Pediatría, 21ª edición, pág. 871 y 975',
    materia: 'Pediatría',
    semana: 1,
    tema: 'Neonatología',
    subtema: 'RECIEN NACIDO NORMAL',
    module: 'Semana 1 - Pediatría'
  },
  {
    id: 'neo_q19',
    text: 'El ibuprofeno en el recién nacido prematuro se utiliza para:',
    options: [
      'Abrir el ductus arterioso',
      'Mantener el ductus abierto',
      'Cerrar el ductus arterioso',
      'Mejorar la contractilidad cardíaca'
    ],
    correctOptionIndex: 2,
    explanation: '✅ ¿Por qué es la respuesta correcta?\nCorrecta: Inhibe prostaglandinas → favorece el cierre del ductus.\n\n💡 Puntos Clave:\n- Ibuprofeno: Inhibe COX → disminuye prostaglandinas → cierre del ductus.\n- Alternativa: Indometacina (misma acción).\n- Uso: Ductus persistente en prematuros.',
    pagina: 'Manual de Atención Neonatal, 2ª edición, pág. 177',
    materia: 'Pediatría',
    semana: 1,
    tema: 'Neonatología',
    subtema: 'DUCTUS ARTERIOSO (DAP)',
    module: 'Semana 1 - Pediatría'
  },
  {
    id: 'neo_q20',
    text: 'En la atención inmediata del RN cuando no cambiamos las compresas mojadas favorecemos la pérdida de calor por:',
    options: [
      'Convección',
      'Conducción',
      'Radiación',
      'Evaporación'
    ],
    correctOptionIndex: 3,
    explanation: '✅ ¿Por qué es la respuesta correcta?\nCorrecta: El líquido sobre la piel se evapora y arrastra calor → principal mecanismo en RN húmedo.\n\n💡 Puntos Clave:\n- Evaporación: Principal pérdida de calor al nacer (piel húmeda).\n- Prevención: Secado inmediato y retiro de compresas mojadas.\n- Otros mecanismos:\n  - Conducción → contacto con superficies frías.\n  - Convección → aire frío alrededor.\n  - Radiación → pérdida hacia objetos fríos cercanos.',
    pagina: 'Nelson. Tratado de Pediatría, 21ª edición, pág. 872',
    materia: 'Pediatría',
    semana: 1,
    tema: 'Neonatología',
    subtema: 'Atención inmediata del recién nacido',
    module: 'Semana 1 - Pediatría'
  },
  {
    id: 'neo_q21',
    text: '¿CUÁL ES EL PRINCIPAL BENEFICIO DEL CLAMPAJE OPORTUNO DEL CORDÓN UMBILICAL?',
    options: [
      'Disminuir el riesgo de infección',
      'Aumentar las reservas de hierro en el recién nacido',
      'Evitar la ictericia neonatal',
      'Reducir la necesidad de lactancia materna',
      'Disminuir la frecuencia respiratoria'
    ],
    correctOptionIndex: 1,
    explanation: '✅ Respuesta correcta: Aumentar las reservas de hierro en el recién nacido\n📖 Explicación:\nEs correcta porque el clampaje tardío permite el paso adicional de sangre desde la placenta al recién nacido, incrementando sus reservas de hierro para los primeros meses de vida.\n💡 Puntos Clave:\n• ¿Beneficio principal? → ↑ reservas de hierro\n• Importancia: previene anemia en meses posteriores\n• Mecanismo: transfusión placentaria adicional\n• Relevancia: clave en RN sin aporte externo de hierro\n• Idea de examen: clampaje tardío = prevención de anemia',
    pagina: 'Manual de Atención Neonatal, 2.ª ed., pág. 16',
    materia: 'Pediatría',
    semana: 1,
    tema: 'Neonatología',
    subtema: 'Atención inmediata del recién nacido',
    module: 'Semana 1 - Pediatría'
  },
  {
    id: 'neo_q22',
    text: '¿A QUÉ DISTANCIA DE LA PIEL DEBE REALIZARSE LA LIGADURA DEL CORDÓN UMBILICAL?',
    options: [
      '0.5 cm',
      '1 cm',
      '2 cm',
      '3 cm',
      '5 cm'
    ],
    correctOptionIndex: 2,
    explanation: '✅ Respuesta correcta: 2 cm\n📖 Explicación:\nEs correcta porque la ligadura del cordón umbilical se realiza idealmente a 2 cm de la piel para permitir un adecuado manejo del muñón y evitar complicaciones.\n💡 Puntos Clave:\n• Distancia estándar: 2 cm de la piel\n• Técnica: uso de clamp o doble ligadura\n• Corte: a 1 cm de la ligadura\n• Objetivo: seguridad y adecuado muñón umbilical\n• Antisepsia: clorhexidina o alcohol 70%',
    pagina: 'Manual de Atención Neonatal, 2.ª ed., pág. 16',
    materia: 'Pediatría',
    semana: 1,
    tema: 'Neonatología',
    subtema: 'Atención inmediata del recién nacido',
    module: 'Semana 1 - Pediatría'
  },
  {
    id: 'neo_q23',
    text: 'EN RELACIÓN A LAS INTERVENCIONES EN LA PRIMERA HORA DE VIDA DEL RECIÉN NACIDO, TODAS SON CORRECTAS EXCEPTO:',
    options: [
      'Ligadura oportuna del cordón umbilical',
      'Inicio precoz de lactancia materna',
      'Contacto piel a piel continuo',
      'Baño inmediato del recién nacido',
      'Supervisión de la adaptación neonatal'
    ],
    correctOptionIndex: 3,
    explanation: '✅ Respuesta correcta: Baño inmediato del recién nacido\n📖 Explicación:\nEs correcta porque el baño inmediato no forma parte de las intervenciones clave iniciales, ya que puede favorecer la pérdida de calor y afectar la adaptación neonatal.\n💡 Puntos Clave:\n• ¿Baño inmediato? → NO recomendado\n• Riesgo: hipotermia\n• Prioridad: mantener calor y adaptación\n• Intervenciones reales: piel a piel + lactancia\n• Idea de examen: evitar intervenciones innecesarias tempranas',
    pagina: 'Manual de Atención Neonatal, 2.ª ed., pág. 17',
    materia: 'Pediatría',
    semana: 1,
    tema: 'Neonatología',
    subtema: 'Atención inmediata del recién nacido',
    module: 'Semana 1 - Pediatría'
  },
  {
    id: 'neo_q24',
    text: 'EN RELACIÓN A LAS INTERVENCIONES EN LA PRIMERA HORA DE VIDA DEL RECIÉN NACIDO SANO, TODAS SON CORRECTAS EXCEPTO:',
    options: [
      'Contacto piel a piel con la madre',
      'Inicio de lactancia materna precoz',
      'Verificación de temperatura a los 15 minutos',
      'Separación rutinaria del recién nacido de la madre',
      'Favorecer el vínculo madre-hijo'
    ],
    correctOptionIndex: 3,
    explanation: '✅ Respuesta correcta: Separación rutinaria del recién nacido de la madre\n📖 Explicación:\nEs correcta porque el recién nacido sano no debe separarse de su madre si está vigoroso, ya que esto forma parte de las intervenciones clave para favorecer su adaptación y bienestar.\n💡 Puntos Clave:\n• ¿RN sano se separa? → NO\n• Condición: respiración espontánea, buen tono, vigoroso\n• Intervenciones clave: piel a piel + lactancia precoz\n• Control importante: temperatura a los 15 min\n• Idea de examen: primera hora = contacto continuo madre-hijo',
    pagina: 'Manual de Atención Neonatal, 2.ª ed., pág. 17',
    materia: 'Pediatría',
    semana: 1,
    tema: 'Neonatología',
    subtema: 'Atención inmediata del recién nacido',
    module: 'Semana 1 - Pediatría'
  },
  {
    id: 'neo_q25',
    text: 'RECIÉN NACIDO A TÉRMINO, A LOS 5 MINUTOS DE VIDA PRESENTA FRECUENCIA CARDÍACA DE 110 LPM, LLANTO DÉBIL, CIERTA FLEXIÓN DE EXTREMIDADES, MUECAS AL ESTÍMULO Y ACROCIANOSIS. ¿CUÁL ES EL PUNTAJE DE APGAR CORRESPONDIENTE?',
    options: [
      '5',
      '6',
      '7',
      '8',
      '9'
    ],
    correctOptionIndex: 1,
    explanation: '✅ Respuesta correcta: 6\n📖 Explicación:\nEs correcta porque el RN presenta: FC >100 (2 puntos), respiración débil (1 punto), tono con cierta flexión (1 punto), irritabilidad con muecas (1 punto) y acrocianosis (1 punto), sumando un total de 6 puntos.\n💡 Puntos Clave (Escala de Apgar):\n• Frecuencia cardíaca: 2 (≥ 100 lpm)\n• Esfuerzo respiratorio: 1 (Debil / irregular)\n• Tono muscular: 1 (Flexión de extremidades)\n• Irritabilidad refleja: 1 (Muecas)\n• Color: 1 (Acrocianosis)',
    pagina: 'Manual de Atención Neonatal, 2.ª ed., pág. 19',
    materia: 'Pediatría',
    semana: 1,
    tema: 'Neonatología',
    subtema: 'Atención inmediata del recién nacido',
    module: 'Semana 1 - Pediatría'
  },
  {
    id: 'neo_q26',
    text: 'RECIÉN NACIDO A TÉRMINO EVALUADO AL MINUTO DE VIDA PRESENTA FRECUENCIA CARDÍACA DE 90 LPM, RESPIRACIÓN IRREGULAR CON LLANTO DÉBIL, MOVIMIENTOS ACTIVOS, LLANTO VIGOROSO AL ESTÍMULO Y CUERPO ROSADO CON EXTREMIDADES CIANÓTICAS. ¿CUÁL ES SU PUNTAJE DE APGAR?',
    options: [
      '5',
      '7',
      '6',
      '8',
      '9'
    ],
    correctOptionIndex: 1,
    explanation: '✅ Respuesta correcta: 7\n📖 Explicación:\nEs correcta porque el RN presenta: FC <100 (1 punto), respiración débil (1 punto), tono activo (2 puntos), irritabilidad con llanto (2 puntos) y acrocianosis (1 punto), sumando 7 puntos.\n💡 Puntos Clave (Escala de Apgar):\n• Frecuencia cardíaca: 1 (< 100 lpm)\n• Esfuerzo respiratorio: 1 (Debil / irregular)\n• Tono muscular: 2 (Movimiento activo)\n• Irritabilidad refleja: 2 (Llanto / respuesta vigorosa)\n• Color: 1 (Acrocianosis)',
    pagina: 'Manual de Atención Neonatal, 2.ª ed., pág. 19',
    materia: 'Pediatría',
    semana: 1,
    tema: 'Neonatología',
    subtema: 'Atención inmediata del recién nacido',
    module: 'Semana 1 - Pediatría'
  },
  {
    id: 'neo_q27',
    text: 'RECIÉN NACIDO PRESENTA DIFERENCIA DE PRESIÓN ARTERIAL MAYOR A 10 MMHG ENTRE MIEMBROS SUPERIORES E INFERIORES. ¿CUÁL ES LA INTERPRETACIÓN?',
    options: [
      'Hallazgo normal',
      'Variación fisiológica',
      'Error de medición',
      'Signo de alarma hemodinámica',
      'Adaptación neonatal'
    ],
    correctOptionIndex: 3,
    explanation: '✅ Respuesta correcta: Signo de alarma hemodinámica\n📖 Explicación:\nEs correcta porque una diferencia mayor a 10 mmHg entre miembros superiores e inferiores no es normal y sugiere alteración circulatoria.\n💡 Puntos Clave (Repaso rápido):\n• PA debe ser similar en 4 miembros\n• Diferencia >10 mmHg = anormal\n• Evaluar pulsos periféricos\n• Sospechar patología cardiovascular\n• Idea de examen: comparar MS vs MI siempre',
    pagina: 'Manual de Atención Neonatal, 2.ª ed., pág. 37',
    materia: 'Pediatría',
    semana: 1,
    tema: 'Neonatología',
    subtema: 'Atención inmediata del recién nacido',
    module: 'Semana 1 - Pediatría'
  },
  {
    id: 'neo_q28',
    text: 'RECIÉN NACIDO DE 36 HORAS NO HA PRESENTADO MICCIÓN. ¿CUÁL ES LA CONDUCTA CORRECTA?',
    options: [
      'Considerar hallazgo normal',
      'Esperar hasta 72 horas',
      'Estimular lactancia',
      'No requiere evaluación',
      'Considerarlo signo de alarma'
    ],
    correctOptionIndex: 4,
    explanation: '✅ Respuesta correcta: Considerarlo signo de alarma\n📖 Explicación:\nEs correcta porque la ausencia de micción después de 24 horas es anormal y requiere evaluación.\n💡 Puntos Clave (Repaso rápido):\n• Micción esperada: <24 h\n• 24 h sin orinar = alarma\n• Deposición: <48 h\n• Evaluar función renal y estado general\n• Idea de examen: tiempos clave = micción 24 h, meconio 48 h',
    pagina: 'Manual de Atención Neonatal, 2.ª ed., pág. 37',
    materia: 'Pediatría',
    semana: 1,
    tema: 'Neonatología',
    subtema: 'RECIEN NACIDO NORMAL',
    module: 'Semana 1 - Pediatría'
  },
  {
    id: 'neo_q29',
    text: 'EN LA EVALUACIÓN CLÍNICA DEL RECIÉN NACIDO, TODOS LOS SIGUIENTES SON SIGNOS DE ALARMA EXCEPTO:',
    options: [
      'Frecuencia respiratoria mayor a 60/min',
      'Chorro de orina débil',
      'Soplo diastólico',
      'Soplo sistólico en las primeras 24 horas de vida',
      'Retracción subcostal'
    ],
    correctOptionIndex: 3,
    explanation: '✅ Respuesta correcta: Soplo sistólico en las primeras 24 horas de vida\n📖 Explicación:\nEs correcta porque el soplo sistólico en las primeras 24 horas puede ser un hallazgo normal transitorio, mientras que los demás corresponden a signos de alarma que requieren evaluación.\n💡 Puntos Clave (Normal vs Alarma):\n• Respiratorio: FR >60/min → alarma\n• Signos de dificultad: retracciones, quejido, aleteo\n• Cardíaco: soplo diastólico → siempre patológico\n• Soplo sistólico <24 h → puede ser fisiológico\n• Excreción: chorro urinario débil → alarma\n• Idea de examen: diastólico = malo, sistólico temprano = puede ser normal',
    pagina: 'Manual de Atención Neonatal, 2.ª ed., pág. 37',
    materia: 'Pediatría',
    semana: 1,
    tema: 'Neonatología',
    subtema: 'Atención inmediata del recién nacido',
    module: 'Semana 1 - Pediatría'
  },
  {
    id: 'neo_q30',
    text: 'DURANTE LA ASPIRACIÓN DE SECRECIONES EN UN RECIÉN NACIDO, ¿CUÁL ES UN SIGNO DE ALARMA QUE OBLIGA A SUSPENDER EL PROCEDIMIENTO?',
    options: [
      'Llanto vigoroso',
      'Frecuencia cardíaca de 120 lpm',
      'Color rosado',
      'Bradicardia (<100 lpm)',
      'Movimientos activos'
    ],
    correctOptionIndex: 3,
    explanation: '✅ Respuesta correcta: Bradicardia (<100 lpm)\n📖 Explicación:\nEs correcta porque la bradicardia durante la aspiración indica estimulación vagal, por lo que debe suspenderse inmediatamente el procedimiento.\n💡 Puntos Clave (Repaso activo):\n• Complicación principal: bradicardia vagal\n• Punto de corte: <100 lpm\n• Conducta: suspender aspiración\n• Reevaluar: FC y color\n• Idea de examen: aspiración → riesgo vagal',
    pagina: 'Manual de Atención Neonatal, 2.ª ed., pág. 101',
    materia: 'Pediatría',
    semana: 1,
    tema: 'Neonatología',
    subtema: 'REANIMACIÓN NEONATAL',
    module: 'Semana 1 - Pediatría'
  },
  {
    id: 'neo_q31',
    text: 'EN RELACIÓN A LA LIMPIEZA DE VÍAS AÉREAS EN EL RECIÉN NACIDO, TODAS SON CORRECTAS EXCEPTO:',
    options: [
      'Se realiza solo si hay obstrucción por secreciones',
      'Se puede usar perita de goma para aspiración',
      'Primero se limpia la boca y luego la nariz',
      'Se debe aspirar profundamente la faringe de forma rutinaria',
      'Puede facilitar la respiración espontánea'
    ],
    correctOptionIndex: 3,
    explanation: '✅ Respuesta correcta: Se debe aspirar profundamente la faringe de forma rutinaria\n📖 Explicación:\nEs correcta porque la aspiración profunda y vigorosa no se recomienda de forma rutinaria, ya que puede estimular el nervio vago y provocar bradicardia o apnea.\n💡 Puntos Clave (Repaso activo):\n• ¿Cuándo aspirar? → Solo si hay obstrucción\n• Orden: boca → nariz\n• Método: paño, succión suave o perita\n• Riesgo: estimulación vagal → bradicardia/apnea\n• Idea de examen: aspiración rutinaria profunda = ❌',
    pagina: 'Manual de Atención Neonatal, 2.ª ed., pág. 101',
    materia: 'Pediatría',
    semana: 1,
    tema: 'Neonatología',
    subtema: 'REANIMACIÓN NEONATAL',
    module: 'Semana 1 - Pediatría'
  },
  {
    id: 'neo_q32',
    text: 'RECIÉN NACIDO A TÉRMINO PRESENTA APNEA AL NACER. SE INICIAN PASOS INICIALES Y LUEGO VENTILACIÓN A PRESIÓN POSITIVA (VPP) CON ADECUADA EXPANSIÓN TORÁCICA. DESPUÉS DE 30 SEGUNDOS, LA FRECUENCIA CARDÍACA ES DE 50 LATIDOS POR MINUTO. ¿CUÁL ES LA CONDUCTA MÁS ADECUADA?',
    options: [
      'Iniciar compresiones torácicas coordinadas con ventilación',
      'Continuar solo con ventilación a presión positiva',
      'Suspender la ventilación y observar',
      'Administrar oxígeno a flujo libre sin compresiones',
      'Iniciar lactancia materna'
    ],
    correctOptionIndex: 0,
    explanation: '✅ Respuesta correcta: Iniciar compresiones torácicas coordinadas con ventilación\n📖 Explicación:\nEs correcta porque si la frecuencia cardíaca permanece <60 lpm después de al menos 30 segundos de ventilación efectiva, se deben iniciar compresiones torácicas junto con VPP.\n💡 Puntos Clave (Repaso activo):\n• Indicación de compresiones: FC <60 lpm\n• Requisito previo: ≥30 seg de VPP efectiva\n• Verificar: expansión torácica adecuada\n• Conducta: iniciar compresiones + VPP\n• Relación: 3:1',
    pagina: 'Manual de Atención Neonatal, 2.ª ed., pág. 111',
    materia: 'Pediatría',
    semana: 1,
    tema: 'Neonatología',
    subtema: 'REANIMACIÓN NEONATAL',
    module: 'Semana 1 - Pediatría'
  },
  {
    id: 'neo_q33',
    text: 'EN RELACIÓN A LA ADMINISTRACIÓN DE ADRENALINA EN LA REANIMACIÓN NEONATAL, TODAS SON CORRECTAS EXCEPTO:',
    options: [
      'Está indicada si la FC es <60 lpm pese a ventilación y compresiones efectivas',
      'Debe administrarse antes de iniciar la ventilación a presión positiva',
      'Puede administrarse por vía venosa umbilical como primera elección',
      'Puede utilizarse la vía endotraqueal si no se logra acceso venoso',
      'Se puede repetir cada 3 a 5 minutos si persiste la bradicardia'
    ],
    correctOptionIndex: 1,
    explanation: '✅ Respuesta correcta: Debe administrarse antes de iniciar la ventilación a presión positiva\n📖 Explicación:\nEs correcta porque la adrenalina se indica solo después de que la ventilación efectiva y las compresiones torácicas no logran aumentar la frecuencia cardíaca; nunca antes de iniciar la VPP.\n💡 Puntos Clave (Repaso activo):\n• Indicación: FC <60 lpm tras VPP + compresiones\n• Secuencia: VPP → compresiones → adrenalina\n• Vía preferida: vena umbilical\n• Alternativa: vía endotraqueal\n• Repetición: cada 3–5 minutos\n• Idea de examen: adrenalina = último paso',
    pagina: 'Manual de Atención Neonatal, 2.ª ed., pág. 111',
    materia: 'Pediatría',
    semana: 1,
    tema: 'Neonatología',
    subtema: 'REANIMACIÓN NEONATAL',
    module: 'Semana 1 - Pediatría'
  },
  {
    id: 'neo_q34',
    text: 'RECIÉN NACIDO PRESENTA HIPERALERTA E IRRITABILIDAD, TONO MUSCULAR NORMAL, REFLEJOS AUMENTADOS, REFLEJO DE MORO HIPERACTIVO, SUCCIÓN DÉBIL Y CONVULSIONES RARAS. ¿A QUÉ CLASIFICACIÓN DE ENCEFALOPATÍA HIPÓXICO-ISQUÉMICA CORRESPONDE?',
    options: [
      'Grado I (leve)',
      'Grado II (moderada)',
      'Grado III (severa)',
      'Estado transicional normal',
      'Depresión neonatal leve'
    ],
    correctOptionIndex: 0,
    explanation: '✅ Respuesta correcta: Grado I (leve)\n📖 Explicación:\nEs correcta porque los hallazgos de hiperalerta, irritabilidad y reflejos aumentados corresponden a encefalopatía hipóxico-isquémica leve (Grado I).\n💡 Puntos Clave (Repaso activo – Clasificación EHI):\n• Grado I (leve): hiperalerta, irritabilidad, reflejos ↑, Moro hiperactivo, convulsiones raras\n• Grado II (moderada): estupor, hipotonía, reflejos ↓, Moro débil, convulsiones frecuentes\n• Grado III (severa): coma, flacidez, reflejos ausentes, Moro ausente, convulsiones infrecuentes o ausentes',
    pagina: 'Manual de Atención Neonatal, 2.ª ed., pág. 124',
    materia: 'Pediatría',
    semana: 1,
    tema: 'Neonatología',
    subtema: 'Encefalopatía hipóxico-isquémica',
    module: 'Semana 1 - Pediatría'
  },
  {
    id: 'neo_q35',
    text: 'EN RELACIÓN A LA ENFERMEDAD DE MEMBRANA HIALINA (SÍNDROME DE DIFICULTAD RESPIRATORIA NEONATAL), TODOS LOS SIGUIENTES SON FACTORES QUE AUMENTAN SU INCIDENCIA EXCEPTO:',
    options: [
      'Menor edad gestacional',
      'Asfixia perinatal',
      'Sexo masculino',
      'Administración prenatal de corticoides',
      'Hijo de madre diabética'
    ],
    correctOptionIndex: 3,
    explanation: '✅ Respuesta correcta: Administración prenatal de corticoides\n📖 Explicación:\nEs correcta porque la administración prenatal de corticoides disminuye la incidencia de SDR al acelerar la maduración pulmonar y la producción de surfactante, mientras que los demás factores aumentan el riesgo.\n💡 Puntos Clave (Repaso activo):\n• Fisiopatología: déficit de surfactante → atelectasia\n• Factores que AUMENTAN riesgo: Prematuridad (↓ edad gestacional), Asfixia perinatal, Sexo masculino, Hijo de madre diabética\n• Factores PROTECTORES (↓ incidencia): Corticoides prenatales, Rotura prolongada de membranas, Betamiméticos\n• Idea de examen: corticoides = maduración pulmonar',
    pagina: 'Manual de Atención Neonatal, 2.ª ed., pág. 166',
    materia: 'Pediatría',
    semana: 1,
    tema: 'Neonatología',
    subtema: 'ENFERMEDAD DE MEMBRANA HIALINA (EMH)',
    module: 'Semana 1 - Pediatría'
  },
  {
    id: 'neo_q36',
    text: 'EN RELACIÓN AL DIAGNÓSTICO DE LA ENFERMEDAD DE MEMBRANA HIALINA, TODOS LOS SIGUIENTES HALLAZGOS SON CORRECTOS EXCEPTO:',
    options: [
      'Presencia de dificultad respiratoria en un RN prematuro',
      'Hipercapnia con alcalosis respiratoria',
      'Radiografía con volumen pulmonar reducido',
      'Hipoxemia de moderada a severa',
      'Presencia de broncogramas aéreos'
    ],
    correctOptionIndex: 1,
    explanation: '✅ Respuesta correcta: Hipercapnia con alcalosis respiratoria\n📖 Explicación:\nEs correcta porque en la enfermedad de membrana hialina la hipercapnia se asocia a acidosis respiratoria o mixta, no a alcalosis respiratoria.\n💡 Puntos Clave (Repaso activo):\n• Clínica: taquipnea, retracciones, quejido, cianosis\n• Inicio: desde minutos hasta primeras horas\n• Radiología: Volumen pulmonar ↓, Patrón reticulogranular difuso, Broncograma aéreo\n• Laboratorio: Hipoxemia, Hipercapnia, Acidosis (no alcalosis)\n• Idea de examen: SDR = hipoxemia + acidosis',
    pagina: 'Manual de Atención Neonatal, 2.ª ed., pág. 166',
    materia: 'Pediatría',
    semana: 1,
    tema: 'Neonatología',
    subtema: 'ENFERMEDAD DE MEMBRANA HIALINA (EMH)',
    module: 'Semana 1 - Pediatría'
  },
  {
    id: 'neo_q37',
    text: 'EN RELACIÓN AL DUCTUS ARTERIOSO PERSISTENTE (DAP), TODAS LAS SIGUIENTES AFIRMACIONES SON CORRECTAS EXCEPTO:',
    options: [
      'Es más frecuente en recién nacidos prematuros',
      'Puede presentar cortocircuito de izquierda a derecha',
      'Se asocia a mayor incidencia en RN con enfermedad de membrana hialina',
      'Puede reabrirse en presencia de hipoxia o sepsis',
      'El cierre funcional ocurre entre las 4 a 8 semanas de vida'
    ],
    correctOptionIndex: 4,
    explanation: '✅ Respuesta correcta: El cierre funcional ocurre entre las 4 a 8 semanas de vida\n📖 Explicación:\nEs correcta porque el cierre funcional del ductus ocurre en las primeras 24 a 72 horas de vida, mientras que el cierre anatómico se da entre las 4 a 8 semanas.\n💡 Puntos Clave (Repaso activo):\n• Cierre funcional: 24–72 horas\n• Cierre anatómico: 4–8 semanas\n• Más frecuente en prematuros\n• Asociación: enfermedad de membrana hialina\n• Puede reabrirse: hipoxia, sepsis\n• Fisiopatología: shunt izquierda → derecha\n• Idea de examen: funcional temprano, anatómico tardío',
    pagina: 'Manual de Atención Neonatal, 2.ª ed., pág. 174',
    materia: 'Pediatría',
    semana: 1,
    tema: 'Neonatología',
    subtema: 'DUCTUS ARTERIOSO (DAP)',
    module: 'Semana 1 - Pediatría'
  },
  {
    id: 'neo_q38',
    text: 'RECIÉN NACIDO PREMATURO DE 30 SEMANAS, CON 5 DÍAS DE VIDA, PRESENTA TAQUICARDIA PERSISTENTE, DIFICULTAD RESPIRATORIA PROGRESIVA, PULSOS AMPLIOS Y PRESIÓN DIFERENCIAL AUMENTADA. A LA AUSCULTACIÓN SE DETECTA SOPLO SISTÓLICO EN REGIÓN INFRACLAVICULAR IZQUIERDA. LA ECOCARDIOGRAFÍA CONFIRMA DUCTUS ARTERIOSO PERSISTENTE HEMODINÁMICAMENTE SIGNIFICATIVO. ¿CUÁL ES EL TRATAMIENTO INICIAL MÁS ADECUADO?',
    options: [
      'Administración de indometacina o ibuprofeno',
      'Inicio inmediato de adrenalina',
      'Ventilación mecánica invasiva obligatoria',
      'Administración de surfactante exógeno',
      'Cierre quirúrgico inmediato'
    ],
    correctOptionIndex: 0,
    explanation: '✅ Respuesta correcta: Administración de indometacina o ibuprofeno\n📖 Explicación:\nEs correcta porque el tratamiento inicial del ductus arterioso persistente hemodinámicamente significativo en el RN prematuro es farmacológico con inhibidores de prostaglandinas como indometacina o ibuprofeno, que favorecen el cierre del ductus.\n💡 Puntos Clave (Repaso activo):\n• Tratamiento inicial → AINEs (indometacina/ibuprofeno)\n• Mecanismo → inhiben prostaglandinas → cierre ductal\n• Indicación → DAP hemodinámicamente significativo\n• Si falla → considerar cierre quirúrgico\n• Clínica típica: soplo + pulsos amplios + dificultad respiratoria\n• Idea de examen: DAP sintomático = primero médico',
    pagina: 'Manual de Atención Neonatal, 2.ª ed., pág. 175',
    materia: 'Pediatría',
    semana: 1,
    tema: 'Neonatología',
    subtema: 'DUCTUS ARTERIOSO (DAP)',
    module: 'Semana 1 - Pediatría'
  },
  {
    id: 'neo_q39',
    text: 'RECIÉN NACIDO PREMATURO DE 32 SEMANAS, DE 5 DÍAS DE VIDA, PRESENTA DISTENSIÓN ABDOMINAL PROGRESIVA, INTOLERANCIA ALIMENTARIA Y VÓMITOS BILIOSOS. AL EXAMEN SE EVIDENCIA LETARGIA Y DISMINUCIÓN DE RUIDOS HIDROAÉREOS. SE SOSPECHA ENTEROCOLITIS NECROTIZANTE. ¿CUÁL ES EL ESTUDIO AUXILIAR MÁS IMPORTANTE PARA CONFIRMAR EL DIAGNÓSTICO?',
    options: [
      'Ecografía abdominal',
      'Radiografía simple de abdomen',
      'Tomografía abdominal',
      'Hemocultivo',
      'Endoscopía digestiva'
    ],
    correctOptionIndex: 1,
    explanation: '✅ Respuesta correcta: Radiografía simple de abdomen\n📖 Explicación:\nEs correcta porque la radiografía abdominal es el método diagnóstico más importante, ya que permite identificar neumatosis intestinal, hallazgo característico de enterocolitis necrotizante.\n💡 Puntos Clave (Repaso activo):\n• Método clave: radiografía abdominal\n• Hallazgo típico: neumatosis intestinal\n• Otros hallazgos: gas portal, neumoperitoneo\n• Clínica: distensión + residuo gástrico + vómitos biliosos\n• Signos sistémicos: letargia, mala perfusión\n• Idea de examen: ECN = Rx + neumatosis',
    pagina: 'Manual de Atención Neonatal, 2.ª ed., pág. 182',
    materia: 'Pediatría',
    semana: 1,
    tema: 'Neonatología',
    subtema: 'ENTEROCOLITIS NECROTIZANTE (ECN)',
    module: 'Semana 1 - Pediatría'
  },
  {
    id: 'neo_q40',
    text: 'EN RELACIÓN A LA TAQUIPNEA TRANSITORIA DEL RECIÉN NACIDO, TODAS LAS SIGUIENTES AFIRMACIONES SON CORRECTAS EXCEPTO:',
    options: [
      'Es una causa frecuente y benigna de dificultad respiratoria neonatal',
      'Puede presentarse en recién nacidos de término o prematuros tardíos',
      'Se caracteriza por dificultad respiratoria que inicia en las primeras horas de vida',
      'Requiere ventilación mecánica en la mayoría de los casos',
      'Es una patología generalmente transitoria y de buen pronóstico'
    ],
    correctOptionIndex: 3,
    explanation: '✅ Respuesta correcta: Requiere ventilación mecánica en la mayoría de los casos\n📖 Explicación:\nEs correcta porque la taquipnea transitoria del recién nacido raramente requiere ventilación mecánica, siendo una enfermedad autolimitada que responde a manejo de soporte.\n💡 Puntos Clave (Repaso activo):\n• Enfermedad benigna y transitoria\n• Mecanismo principal → retención de líquido pulmonar fetal\n• Inicio: nacimiento o primeras horas\n• Pico: primeras 12 horas\n• FiO₂ usual <40%\n• Resolución: 24–48 h (máx. 72 h)\n• Rx: hiperinsuflación + líquido en cisuras\n• Idea de examen: TTN = curso leve + autolimitado',
    pagina: 'Manual de Atención Neonatal, 2.ª ed., pág. 288',
    materia: 'Pediatría',
    semana: 1,
    tema: 'Neonatología',
    subtema: 'Taquipnea transitoria del recién nacido',
    module: 'Semana 1 - Pediatría'
  },
  {
    id: 'neo_q41',
    text: 'RECIÉN NACIDO POSTÉRMINO PRESENTA DIFICULTAD RESPIRATORIA DESDE EL NACIMIENTO, CON TAQUIPNEA, QUEJIDO ESPIRATORIO Y CIANOSIS. AL EXAMEN PRESENTA SOBREDISTENSIÓN TORÁCICA Y ESTERTORES. LA RADIOGRAFÍA DE TÓRAX MUESTRA ÁREAS PARCHEADAS DE CONSOLIDACIÓN ALTERNANDO CON ZONAS DE HIPERINSUFLACIÓN. ¿CUÁL ES EL DIAGNÓSTICO MÁS PROBABLE?',
    options: [
      'Síndrome de aspiración de meconio',
      'Taquipnea transitoria del recién nacido',
      'Enfermedad de membrana hialina',
      'Neumonía neonatal',
      'Neumotórax'
    ],
    correctOptionIndex: 0,
    explanation: '✅ Respuesta correcta: Síndrome de aspiración de meconio\n📖 Explicación:\nEs correcta porque el patrón radiológico de áreas parcheadas de consolidación con hiperinsuflación, junto a dificultad respiratoria inmediata y sobredistensión torácica, es característico del síndrome de aspiración de meconio.\n💡 Puntos Clave (Repaso activo):\n• RN postérmino → factor de riesgo\n• Inicio → inmediato al nacimiento\n• Clínica → taquipnea, quejido, cianosis\n• Rx → parcheado + hiperinsuflación\n• Fisiopatología → obstrucción + atrapamiento aéreo\n• Idea de examen: patrón mixto = meconio',
    pagina: 'Manual de Atención Neonatal, 2.ª ed., pág. 299',
    materia: 'Pediatría',
    semana: 1,
    tema: 'Neonatología',
    subtema: 'Síndrome de aspiración de meconio (SALAM)',
    module: 'Semana 1 - Pediatría'
  },
  {
    id: 'neo_q42',
    text: 'RECIÉN NACIDO DE TÉRMINO, ASINTOMÁTICO, CON ANTECEDENTE DE RUPTURA PROLONGADA DE MEMBRANAS (>18 HORAS). AL EXAMEN FÍSICO SE ENCUENTRA ESTABLE, SIN SIGNOS DE INFECCIÓN. ¿CUÁL ES LA CONDUCTA MÁS ADECUADA?',
    options: [
      'Realizar hemograma, hemocultivo e iniciar antibióticos',
      'Realizar hemograma y mantener observación clínica',
      'Realizar hemograma, PCR y punción lumbar',
      'Iniciar antibióticos y solicitar hemocultivo',
      'Solo observación clínica sin estudios iniciales'
    ],
    correctOptionIndex: 1,
    explanation: '✅ Respuesta correcta: Realizar hemograma y mantener observación clínica\n📖 Explicación:\nEs correcta porque en un RN asintomático con un solo factor de riesgo, el manejo inicial es estudio básico (hemograma) y vigilancia clínica, sin iniciar antibióticos.\n💡 Puntos Clave (Repaso activo – Algoritmo):\n• RN término asintomático con 1–2 factores → hemograma + observación 48–72 h; tratar solo si se altera o aparece clínica.\n• Con ≥3 factores → hemograma, PCR, hemocultivos e inicio de antibióticos.\n• RN prematuro → ≥2 factores → estudio completo + antibióticos\n• Regla de oro: cambio clínico = tratar como sepsis.',
    pagina: 'Manual de Atención Neonatal, 2.ª ed., pág. 342-343',
    materia: 'Pediatría',
    semana: 1,
    tema: 'Neonatología',
    subtema: 'Sepsis neonatal',
    module: 'Semana 1 - Pediatría'
  },
  {
    id: 'neo_q43',
    text: 'EN RELACIÓN A LA SEPSIS NEONATAL TEMPRANA, TODOS LOS SIGUIENTES ENUNCIADOS SON CORRECTOS EXCEPTO:',
    options: [
      'Se presenta generalmente antes de las 72 horas de vida y se asocia a factores de riesgo perinatales',
      'Los gérmenes más frecuentes incluyen Escherichia coli, Streptococcus del grupo B y Listeria monocytogenes',
      'Se caracteriza por mayor incidencia de meningitis en comparación con la sepsis tardía',
      'Puede presentar alteraciones en reactantes de fase aguda como PCR y procalcitonina',
      'Puede acompañarse de alteraciones hematológicas como leucopenia o relación I/T >0,2'
    ],
    correctOptionIndex: 2,
    explanation: '✅ Respuesta correcta: Se caracteriza por mayor incidencia de meningitis en comparación con la sepsis tardía\n📖 Explicación:\nEs correcta porque la mayor incidencia de meningitis se observa en la sepsis neonatal tardía, no en la temprana.\n💡 Puntos Clave (Repaso activo):\n• Sepsis temprana → <72 h, origen perinatal\n• Gérmenes típicos → E. coli, SGB, Listeria\n• Sepsis tardía → >72 h, ↑ riesgo de meningitis\n• Reactantes de fase aguda → PCR, procalcitonina\n• Hematológicos → leucocitos alterados, I/T >0,2\n• Idea de examen: meningitis = tardía',
    pagina: 'Manual de Atención Neonatal, 2.ª ed., pág. 346',
    materia: 'Pediatría',
    semana: 1,
    tema: 'Neonatología',
    subtema: 'Sepsis neonatal',
    module: 'Semana 1 - Pediatría'
  }
];
