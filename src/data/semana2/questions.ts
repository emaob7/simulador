import { Question } from '../../types';

export const questionsSemana2: Question[] = [
  {
    id: 'q1',
    text: 'EN RELACIÓN CON LA HIPERPROLACTINEMIA, SEÑALE LA INCORRECTA:',
    options: [
      'El tratamiento siempre es quirúrgico debido al riesgo de crecimiento tumoral.',
      'Concentraciones de prolactina mayores de 200 μg/L sugieren prolactinoma.',
      'El hipotiroidismo primario puede asociarse a hiperprolactinemia por aumento de TRH.',
      'La resonancia magnética hipofisaria es obligatoria ante PRL persistentemente elevada.',
      'Cabergolina y bromocriptina son fármacos de primera línea en prolactinomas.'
    ],
    correctOptionIndex: 0,
    explanation: 'El tratamiento inicial de los prolactinomas es médico con agonistas dopaminérgicos, que reducen tanto la secreción como el volumen tumoral. La cirugía se reserva para casos refractarios o con compromiso visual agudo no responsivo a fármacos.\n\n💡 Puntos Clave:\n- Fármaco de elección: La Cabergolina es más eficaz y tiene menos efectos secundarios que la bromocriptina.\n- Correlación diagnóstica: Niveles de PRL >200 μg/L son altamente sugestivos de macroprolactinoma.\n- Mecanismo TRH: En hipotiroidismo primario, la TRH elevada estimula directamente la secreción de prolactina.\n- Diagnóstico por imagen: La RM hipofisaria es el estudio de elección para localizar micro o macroadenomas.',
    pagina: 'Harrison, 20.ª ed., págs. 2675–2676.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 1: FISIOLOGÍA ENDOCRINA E HIPOFISARIA',
    subtema: 'Hiperprolactinemia',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q2',
    text: 'EN RELACIÓN CON LAS CAUSAS DE HIPOTIROIDISMO, SEÑALE LA INCORRECTA:',
    options: [
      'El síndrome del túnel carpiano es una manifestación frecuente del hipotiroidismo.',
      'El tratamiento del hipotiroidismo subclínico está indicado cuando la TSH es ≥10 mUI/L.',
      'La causa más frecuente de hipotiroidismo a nivel mundial es la tiroiditis de Hashimoto.',
      'El hipotiroidismo puede asociarse a elevación de la presión arterial diastólica.',
      'Los anticuerpos contra TPO y tiroglobulina son marcadores de autoinmunidad tiroidea.'
    ],
    correctOptionIndex: 2,
    explanation: 'A nivel mundial, la causa principal de hipotiroidismo es la deficiencia de yodo. La tiroiditis de Hashimoto es la causa más común solo en áreas con aporte adecuado de yodo.\n\n💡 Puntos Clave:\n- Signo típico: El síndrome del túnel carpiano se produce por depósito de mucopolisacáridos que comprimen el nervio mediano.\n- Umbral TSH: El tratamiento del hipotiroidismo subclínico es mandatorio si TSH ≥ 10 mUI/L.\n- Hemodinámica: El hipotiroidismo aumenta las resistencias periféricas, elevando la presión arterial diastólica.\n- Anticuerpos: Los anti-TPO son los mejores predictores de progresión a hipotiroidismo clínico franco.',
    pagina: 'Harrison, 20.ª ed., cap. 376.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 2: PATOLOGÍA TIROIDEA',
    subtema: 'Hipotiroidismo',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q3',
    text: 'EN RELACIÓN CON LA ENFERMEDAD DE GRAVES Y SU TRATAMIENTO, SEÑALE LA INCORRECTA:',
    options: [
      'Es la causa más frecuente de tirotoxicosis y se debe a autoanticuerpos estimulantes del receptor de TSH.',
      'La presencia de anticuerpos contra peroxidasa tiroidea (TPO) confirma el diagnóstico de enfermedad de Graves.',
      'Los betabloqueantes se utilizan para el control sintomático de la tirotoxicosis, sin modificar la síntesis hormonal.',
      'El tabaquismo es un factor de riesgo importante para el desarrollo y la progresión de la oftalmopatía.',
      'El tratamiento definitivo puede realizarse con yodo radioactivo o tiroidectomía según el caso clínico.'
    ],
    correctOptionIndex: 1,
    explanation: 'El diagnóstico de Graves se confirma con anticuerpos estimulantes del receptor de TSH (TRAb/TSI). Los anti-TPO son marcadores de autoinmunidad tiroidea general y no son específicos para diagnosticar Graves.\n\n💡 Puntos Clave:\n- Clínica específica: La oftalmopatía infiltrativa y el mixedema pretibial son exclusivos de la enfermedad de Graves.\n- Control adrenérgico: El propranolol es fundamental para manejar la taquicardia y el temblor mientras actúan los antitiroideos.\n- Factor de riesgo: El tabaquismo triplica el riesgo de desarrollar oftalmopatía y dificulta su tratamiento.\n- Gammagrafía: Muestra una captación de yodo radioactivo elevada de forma difusa y homogénea.',
    pagina: 'Harrison, 20.ª ed., pág. 2703.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 2: PATOLOGÍA TIROIDEA',
    subtema: 'Enfermedad de Graves',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q4',
    text: 'EN RELACIÓN CON EL NÓDULO TIROIDEO SOLITARIO HIPERFUNCIONAL (ADENOMA TÓXICO), SEÑALE LA INCORRECTA:',
    options: [
      'Produce tirotoxicosis por secreción autónoma de hormonas tiroideas.',
      'Suele acompañarse de TSH suprimida con tirotoxicosis generalmente leve.',
      'Se asocia a anticuerpos estimulantes del receptor de TSH y curso autoinmunitario.',
      'En la gammagrafía tiroidea se observa un nódulo caliente con supresión del resto de la glándula.',
      'El yodo radioactivo constituye el tratamiento definitivo preferido en la mayoría de los casos.'
    ],
    correctOptionIndex: 2,
    explanation: 'El adenoma tóxico se debe a una mutación somática que causa autonomía funcional de las células foliculares; no es una enfermedad autoinmune y no presenta anticuerpos estimulantes del receptor de TSH.\n\n💡 Puntos Clave:\n- Imagen gammagráfica: Patrón de "Nódulo Caliente" con el tejido sano circundante "apagado".\n- Terapia definitiva: El Yodo radioactivo (I131) es de elección al concentrarse exclusivamente en el nódulo autónomo.\n- Clínica: A diferencia de Graves, no presenta manifestaciones extratiroideas (oftalmopatía).\n- Diagnóstico: TSH suprimida con elevación de T4 libre y, frecuentemente, una elevación desproporcionada de T3.',
    pagina: 'Harrison, 20.ª ed., pág. 2713.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 2: PATOLOGÍA TIROIDEA',
    subtema: 'Adenoma Tóxico',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q5',
    text: 'En relación con los principales tipos de cáncer de tiroides (papilar, folicular y medular), señale la INCORRECTA:',
    options: [
      'El carcinoma papilar es el tipo más frecuente y suele diseminarse por vía linfática.',
      'El carcinoma folicular se asocia con mayor frecuencia a metástasis hematógenas.',
      'El carcinoma medular deriva de células foliculares y suele captar yodo radioactivo.',
      'La calcitonina es un marcador útil para el diagnóstico y seguimiento del carcinoma medular.',
      'El tratamiento del carcinoma medular de tiroides es fundamentalmente quirúrgico.'
    ],
    correctOptionIndex: 2,
    explanation: 'El carcinoma medular deriva de las células C parafoliculares (productoras de calcitonina), las cuales no atrapan yodo. Por lo tanto, el tratamiento con yodo radioactivo es ineficaz en este tipo de cáncer.\n\n💡 Puntos Clave:\n- Tipo Papilar: Histología característica con núcleos en "vidrio esmerilado" y cuerpos de psamoma.\n- Tipo Folicular: Diseminación hematógena a hueso y pulmón; el diagnóstico requiere ver invasión capsular.\n- Marcador Medular: La Calcitonina es el marcador más sensible para detectar persistencia o recurrencia tumoral.\n- Cirugía: La tiroidectomía total es el pilar terapéutico, asociada a linfadenectomía en el tipo medular.',
    pagina: 'Harrison, 20.ª ed., pág. 2715.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 2: PATOLOGÍA TIROIDEA',
    subtema: 'Cáncer de Tiroides',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q6',
    text: 'EN RELACIÓN CON EL SÍNDROME DE CUSHING, SEÑALE LA INCORRECTA:',
    options: [
      'A nivel global, la causa más frecuente del síndrome de Cushing es un adenoma hipofisario productor de ACTH.',
      'El síndrome de Cushing puede ser dependiente o independiente de ACTH.',
      'La secreción ectópica de ACTH se identifica con mayor frecuencia en varones.',
      'La enfermedad de Cushing es más frecuente en mujeres, excepto en los casos prepuberales.',
      'El uso médico de glucocorticoides constituye la causa más común de síndrome de Cushing.'
    ],
    correctOptionIndex: 0,
    explanation: 'La causa global más común del síndrome de Cushing es exógena (uso iatrogénico de glucocorticoides). El adenoma hipofisario (Enfermedad de Cushing) es la causa más frecuente solo dentro del Cushing de origen endógeno.\n\n💡 Puntos Clave:\n- ACTH Independiente: La causa endógena más común es el adenoma suprarrenal unilateral.\n- Cushing Ectópico: Clásicamente asociado al carcinoma microcítico de pulmón en varones.\n- Diferencia clave: Enfermedad de Cushing (hipófisis) vs. Síndrome de Cushing (término general).\n- Diagnóstico inicial: Medición de niveles de ACTH; si <5 pg/mL, el origen es suprarrenal.',
    pagina: 'Harrison, 20.ª ed., cap. 373.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 4: PATOLOGÍA SUPRARRENAL',
    subtema: 'Síndrome de Cushing',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q7',
    text: 'EN RELACIÓN CON EL ABORDAJE DIAGNÓSTICO DEL SÍNDROME DE CUSHING, SEÑALE LA INCORRECTA:',
    options: [
      'La metirapona y el ketoconazol son los fármacos orales con eficacia establecida en el síndrome de Cushing.',
      'Un cortisol elevado a medianoche en plasma o saliva es un criterio válido para confirmar hipercortisolismo.',
      'Una ACTH plasmática <5 pg/mL orienta a síndrome de Cushing dependiente de ACTH.',
      'La prueba de dexametasona en dosis bajas evalúa la falta de supresión del eje hipotálamo-hipófisis-suprarrenal.',
      'En casos dependientes de ACTH, la prueba de CRH ayuda a diferenciar enfermedad de Cushing de secreción ectópica.'
    ],
    correctOptionIndex: 2,
    explanation: 'Una ACTH suprimida (<5 pg/mL) indica que el origen del hipercortisolismo es independiente de ACTH (suprarrenal). El Cushing dependiente de ACTH (hipofisario o ectópico) presenta niveles normales o elevados de ACTH.\n\n💡 Puntos Clave:\n- Tamizaje: Cortisol libre urinario 24h, test de Nugent (dexa 1mg) o cortisol salival nocturno.\n- Localización: Solo se solicitan pruebas de imagen (RM hipófisis o TC supra) después de confirmar hipercortisolismo bioquímico.\n- Cateterismo: El cateterismo de senos petrosos es el Gold Standard para diferenciar Cushing hipofisario de ectópico.\n- Tratamiento médico: El Ketoconazol es el inhibidor enzimático suprarrenal más utilizado para el control preoperatorio.',
    pagina: 'Harrison, 20.ª ed., cap. 373.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 4: PATOLOGÍA SUPRARRENAL',
    subtema: 'Síndrome de Cushing',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q8',
    text: 'EN RELACIÓN CON EL DIAGNÓSTICO Y TRATAMIENTO DEL FEOCROMOCITOMA, SEÑALE LA INCORRECTA:',
    options: [
      'Las metanefrinas plasmáticas o urinarias son pruebas de alta sensibilidad.',
      'La localización tumoral se realiza con TC o RM una vez documentado el exceso de catecolaminas.',
      'El tratamiento definitivo consiste en resección quirúrgica del tumor.',
      'Es imprescindible la preparación preoperatoria con bloqueo alfa-adrenérgico.',
      'Los betabloqueadores deben iniciarse antes del bloqueo alfa para controlar la hipertensión.'
    ],
    correctOptionIndex: 4,
    explanation: 'Nunca se debe dar un bloqueador β antes que uno α. Esto causaría una vasoconstricción masiva periférica por receptores α no antagonizados, provocando una crisis hipertensiva fatal.\n\n💡 Puntos Clave:\n- Diagnóstico bioquímico: La prueba más sensible es la determinación de metanefrinas fraccionadas.\n- Bloqueo preoperatorio: Se utiliza Fenoxibenzamina (α-bloqueo irreversible) durante 10-14 días.\n- Localización: TC/RM abdominal; si son negativas, se utiliza gammagrafía con MIBG.\n- Regla del 10: 10% bilaterales, 10% extra-suprarrenales, 10% malignos y 10% hereditarios.',
    pagina: 'Harrison, 20.ª ed., pág. 2729.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 4: PATOLOGÍA SUPRARRENAL',
    subtema: 'Feocromocitoma',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q9',
    text: 'EN RELACIÓN CON LOS OBJETIVOS TERAPÉUTICOS EN ADULTOS CON DIABETES, SEÑALE LA INCORRECTA:',
    options: [
      'Un objetivo general de HbA1c en adultos no gestantes es <7,0%',
      'La glucosa plasmática capilar en ayunas debe mantenerse entre 80–130 mg/mL.',
      'La glucosa plasmática capilar posprandial (pico) debe ser <180 mg/100 mL',
      'El objetivo general de presión arterial es <140/90 mmHg',
      'Los objetivos glucémicos deben individualizarse según edad y comorbilidades'
    ],
    correctOptionIndex: 1,
    explanation: 'El rango de 80-130 mg/dL es el objetivo preprandial (antes de comidas), no estrictamente de ayuno. El valor de ayuno estricto deseable suele ser ligeramente inferior para optimizar el control de la HbA1c.\n\n💡 Puntos Clave:\n- HbA1c general: <7,0% es el estándar; se puede relajar a <8% en pacientes ancianos o con complicaciones graves.\n- Pico posprandial: Debe ser inferior a 180 mg/dL medido 1-2 horas después del inicio de la comida.\n- Presión Arterial: El objetivo ADA actual es <130/80 mmHg, aunque Harrison 20.ª citaba tradicionalmente <140/90.\n- Individualización: Es el principio fundamental para evitar hipoglucemias iatrogénicas peligrosas.',
    pagina: 'Harrison, 20.ª ed., Cuadro 397-2.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 3: DIABETES Y METABOLISMO',
    subtema: 'Diabetes',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q10',
    text: 'EN RELACIÓN CON LA METFORMINA, SEÑALE LA INCORRECTA:',
    options: [
      'Disminuye la producción hepática de glucosa y mejora la utilización periférica.',
      'Reduce la glucosa plasmática en ayunas y mejora el perfil lipídico.',
      'Es eficaz como monoterapia y en combinación con otros antidiabéticos o insulina.',
      'Su uso se asocia con un aumento significativo del riesgo de acidosis metabólica en la mayoría de los pacientes.',
      'Puede producir disminución de las concentraciones de vitamina B12 con el uso prolongado.'
    ],
    correctOptionIndex: 3,
    explanation: 'La acidosis láctica es una complicación extremadamente rara y no ocurre en la "mayoría de los pacientes". Solo es un riesgo real en presencia de insuficiencia renal severa, hipoxia tisular o falla hepática.\n\n💡 Puntos Clave:\n- Mecanismo de acción: Activación de la cinasa de AMP (AMPK), reduciendo la gluconeogénesis hepática.\n- Contraindicación renal: No iniciar si TFG <45; suspender si TFG <30.\n- Efecto nutricional: Requiere control de niveles de Vitamina B12 por riesgo de malabsorción ileal crónica.\n- Eficacia: Es el fármaco de primera línea por su potencia, seguridad y bajo riesgo de hipoglucemia.',
    pagina: 'Harrison, 20.ª ed., pág. 2865.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 3: DIABETES Y METABOLISMO',
    subtema: 'Diabetes',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q11',
    text: 'EN RELACIÓN CON EL TRATAMIENTO INICIAL DE LA CETOACIDOSIS DIABÉTICA, SEÑALE LA INCORRECTA:',
    options: [
      'La reposición inicial debe realizarse con solución salina al 0,9% durante las primeras horas.',
      'La insulina regular intravenosa debe iniciarse de inmediato, incluso si el potasio sérico es <3,3 mEq/L.',
      'La glucemia capilar debe monitorizarse cada 1–2 horas durante la fase inicial.',
      'El potasio debe reponerse cuando sus concentraciones descienden durante el tratamiento.',
      'Se debe añadir glucosa a los líquidos intravenosos cuando la glucemia alcanza ~250 mg/dL.'
    ],
    correctOptionIndex: 1,
    explanation: 'Es una contraindicación absoluta. Si el potasio es <3,3 mEq/L, se debe reponer potasio primero y posponer la insulina, ya que esta desplaza el K+ al interior celular y puede causar arritmias letales.\n\n💡 Puntos Clave:\n- Reposición hídrica: Es el primer paso; se inicia con NaCl 0,9% a 1 litro/hora inicialmente.\n- Insulina IV: Bolo de 0.1 U/kg seguido de infusión; el objetivo es frenar la cetogénesis, no solo bajar la glucosa.\n- Cambio de suero: Al llegar a glucosa de 200-250 mg/dL, se añade Dextrosa 5% para prevenir hipoglucemia.\n- Criterio de resolución: pH >7.3, bicarbonato ≥ 18 mEq/L y Anion Gap normalizado.',
    pagina: 'Harrison, 20.ª ed., pág. 2871.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 3: DIABETES Y METABOLISMO',
    subtema: 'Diabetes',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q12',
    text: 'EN RELACIÓN CON LOS BISFOSFONATOS UTILIZADOS EN EL TRATAMIENTO DE LA OSTEOPOROSIS, SEÑALE LA CORRECTA:',
    options: [
      'Los bisfosfonatos alteran de manera específica la función de los osteoclastos y aumentan su número',
      'El alendronato ha demostrado disminuir el recambio óseo e incrementar la masa ósea vertebral, además de reducir el riesgo de fractura.',
      'Los bisfosfonatos carecen de efectos adversos graves y pueden utilizarse sin restricción renal',
      'La osteonecrosis del maxilar es una complicación frecuente en pacientes con osteoporosis tratados con dosis habituales',
      'La fractura atípica de fémur ocurre típicamente en el cuello femoral tras traumatismos de alta energía'
    ],
    correctOptionIndex: 1,
    explanation: 'Los bisfosfonatos son potentes antiresortivos que inhiben la actividad de los osteoclastos y promueven su apoptosis, lo que reduce significativamente el riesgo de fracturas vertebrales y de cadera.\n\n💡 Puntos Clave:\n- Administración: Requieren ayuno, un vaso grande de agua y permanecer erguido 30 min para evitar esofagitis.\n- Contraindicación: No deben usarse si la TFG es <35 mL/min.\n- Complicación rara: La osteonecrosis de mandíbula es rara en dosis para osteoporosis, siendo más frecuente en dosis oncológicas.\n- Fracturas atípicas: Son fracturas subtrocantéreas o diafisarias de fémur tras un uso muy prolongado (>5 años).',
    pagina: 'Harrison, 20.ª ed., pág. 2955.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 6: METABOLISMO ÓSEO',
    subtema: 'Osteoporosis',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q13',
    text: 'VARÓN DE 52 AÑOS, FATIGA, DOLOR ARTICULAR, PIEL OSCURA, DIABETES RECIENTE, FERRITINA ELEVADA. ¿DIAGNÓSTICO?',
    options: [
      'Cirrosis hepática alcohólica',
      'Hepatitis crónica viral C',
      'Hemocromatosis hereditaria.',
      'Enfermedad de Wilson',
      'Insuficiencia suprarrenal primaria'
    ],
    correctOptionIndex: 2,
    explanation: 'Es el cuadro clásico de "Diabetes Bronce": hiperpigmentación cutánea, diabetes mellitus de inicio reciente y ferritina muy elevada debido a la sobrecarga de hierro hereditaria.\n\n💡 Puntos Clave:\n- Genética: Se asocia a la mutación del gen HFE (homocigotos C282Y).\n- Cribado: La prueba inicial es la saturación de transferrina (>45%) y ferritina sérica elevada.\n- Afectación articular: Artropatía por depósitos de pirofosfato cálcico, típicamente en 2.ª y 3.ª metacarpofalángica.\n- Tratamiento: El pilar son las flebotomías periódicas para mantener niveles de ferritina <50 ng/mL.',
    pagina: 'Harrison, 20.ª ed., cap. 299-300.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 3: DIABETES Y METABOLISMO',
    subtema: 'Hemocromatosis',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q14',
    text: 'Mujer de 45 años, fatiga, mareos, hiperpigmentación en pliegues y mucosas, hiponatremia, hiperpotasemia. ¿Diagnóstico?',
    options: [
      'Insuficiencia suprarrenal secundaria.',
      'Insuficiencia suprarrenal primaria (enfermedad de Addison).',
      'Síndrome de secreción inapropiada de ADH.',
      'Hipopituitarismo.',
      'Crisis tiroidea.'
    ],
    correctOptionIndex: 1,
    explanation: 'La insuficiencia suprarrenal primaria cursa con déficit de cortisol y aldosterona. La hiperpigmentación es clave (por aumento de ACTH/MSH) y la hiperpotasemia confirma el déficit de mineralocorticoides.\n\n💡 Puntos Clave:\n- Confirmación: Test de estimulación con ACTH (Cosintropina); el cortisol debe subir a >18 μg/dL a los 60 min.\n- Etiología: En países desarrollados es autoinmune; en países en desarrollo, la Tuberculosis es una causa común.\n- Tratamiento: Reposición con Hidrocortisona (glucocorticoide) y Fludrocortisona (mineralocorticoide).\n- Crisis Adrenal: Es una emergencia médica tratada con bolos de 100mg de Hidrocortisona y solución salina agresiva.',
    pagina: 'Harrison, 20.ª ed., pág. 2735.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 4: PATOLOGÍA SUPRARRENAL',
    subtema: 'Insuficiencia Suprarrenal',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q15',
    text: '¿Cuál de las siguientes afirmaciones sobre el hipopituitarismo adquirido es INCORRECTA?',
    options: [
      'La causa más frecuente en adultos son los adenomas hipofisarios.',
      'La radiación craneal puede producir hipopituitarismo tardío, con afectación progresiva de varias hormonas, especialmente GH.',
      'La hipofisitis linfocítica es una enfermedad autoinmunitaria más frecuente en mujeres durante el embarazo o posparto.',
      'El síndrome de la silla turca vacía puede cursar con función hipofisaria normal.',
      'La apoplejía hipofisaria es un cuadro de inicio insidioso y de instauración lenta.'
    ],
    correctOptionIndex: 4,
    explanation: 'La apoplejía hipofisaria es un síndrome clínico agudo causado por la hemorragia o el infarto brusco de la glándula (frecuentemente sobre un adenoma previo). Se caracteriza por una aparición súbita de cefalea intensa, colapso cardiovascular y compromiso visual, lo que la diferencia de los cuadros de instauración lenta.\n\n💡 Puntos Clave:\n- Etiología principal: Los adenomas hipofisarios y sus tratamientos (cirugía/radiación) constituyen la causa más común de hipopituitarismo en adultos.\n- Sensibilidad a la radiación: Tras radioterapia craneal, la hormona del crecimiento (GH) suele ser la primera en afectarse, seguida por las gonadotropinas y la ACTH.\n- Hipofisitis Linfocítica: Se asocia clásicamente al embarazo (tercer trimestre o posparto) y puede simular radiológicamente un adenoma.\n- Silla Turca Vacía: Generalmente es un hallazgo incidental; la mayoría de los pacientes mantienen una función hipofisaria normal, aunque se debe vigilar la aparición de hipopituitarismo leve.',
    pagina: 'Harrison, 20.ª ed., pág. 2665.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 1: FISIOLOGÍA ENDOCRINA E HIPOFISARIA',
    subtema: 'Hipopituitarismo',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q16',
    text: '¿Cuál de las siguientes afirmaciones sobre la acromegalia es INCORRECTA?',
    options: [
      'La acromegalia se debe con mayor frecuencia a secreción ectópica de GHRH por tumores carcinoides o pancreáticos, siendo los adenomas hipofisarios una causa poco común.',
      'En raras ocasiones, tumores no hipofisarios pueden secretar GH directamente y producir el cuadro clínico.',
      'El exceso de GH se asocia a crecimiento de partes blandas, visceromegalia, resistencia a la insulina y aumento del riesgo cardiovascular.',
      'El tratamiento inicial suele ser quirúrgico, pudiendo complementarse con análogos de somatostatina o radioterapia.',
      'La enfermedad puede manifestarse con rasgos faciales toscos, crecimiento acral y complicaciones metabólicas progresivas.'
    ],
    correctOptionIndex: 0,
    explanation: 'Harrison establece que más del 98% de los casos de acromegalia se deben a un adenoma hipofisario secretor de GH. La secreción ectópica de GHRH es una causa extremadamente rara (<1%).\n\n💡 Puntos Clave:\n- Screening inicial: La medición de IGF-1 sérica es la mejor prueba inicial (es estable y refleja la secreción integrada de GH).\n- Confirmación diagnóstica: Falta de supresión de GH por debajo de 1 ng/mL tras una carga oral de glucosa (75g).\n- Complicación metabólica: El exceso de GH produce resistencia a la insulina, provocando intolerancia a la glucosa o diabetes franca en un 25-50% de pacientes.\n- Tratamiento de elección: La cirugía transesfenoidal es el tratamiento de primera línea para la mayoría de los pacientes (micro y macroadenomas).',
    pagina: 'Harrison, 20.ª ed, pág. 2678–2679.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 1: FISIOLOGÍA ENDOCRINA E HIPOFISARIA',
    subtema: 'Acromegalia',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q17',
    text: '¿Cuál de las siguientes afirmaciones sobre el síndrome de secreción inadecuada de ADH (SIADH) es INCORRECTA?',
    options: [
      'Se caracteriza por hiponatremia con osmolaridad plasmática baja y orina inapropiadamente concentrada.',
      'Puede ser causado por neoplasias, enfermedades del SNC, fármacos o secreción ectópica de ADH.',
      'La secreción de ADH ocurre de manera independiente de la osmolaridad plasmática.',
      'Los pacientes suelen presentar hipovolemia clínica evidente con signos de deshidratación.',
      'Puede asociarse a concentraciones urinarias elevadas de sodio.'
    ],
    correctOptionIndex: 3,
    explanation: 'El SIADH se define fundamentalmente como un estado de hiponatremia euvolémica. Aunque hay una ligera expansión del volumen de agua corporal total debido a la retención hídrica mediada por la ADH, esta no es suficiente para causar edema clínico o hipertensión, y bajo ninguna circunstancia produce hipovolemia o deshidratación (cuadros que, por el contrario, estimularían la ADH de forma apropiada).\n\n💡 Puntos Clave:\n- Criterios diagnósticos: Hiponatremia con osmolaridad plasmática baja (<275 mOsm/kg), osmolaridad urinaria inapropiadamente elevada (>100 mOsm/kg) y sodio urinario elevado (>40 mmol/L) en ausencia de déficit de volumen.\n- Etiología clásica: El carcinoma de pulmón de células pequeñas es la causa más frecuente de secreción ectópica de ADH.\n- Diagnóstico diferencial: Se deben excluir siempre el hipotiroidismo severo y la insuficiencia suprarrenal (déficit de glucocorticoides), ya que ambos pueden simular un SIADH al elevar los niveles de ADH.\n- Tratamiento inicial: La restricción hídrica es el pilar del tratamiento; en casos de hiponatremia severa sintomática se requiere solución salina hipertónica al 3% con corrección lenta para evitar la mielinólisis pontina.',
    pagina: 'Harrison, 20.ª ed, pág. 2689.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 1: FISIOLOGÍA ENDOCRINA E HIPOFISARIA',
    subtema: 'SIADH',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q18',
    text: '¿Cuál de las siguientes afirmaciones sobre las tiroiditis es INCORRECTA?',
    options: [
      'La tiroiditis subaguda (de De Quervain) suele presentarse tras infección viral, con dolor cervical irradiado, VSG elevada, captación baja de yodo y curso trifásico (tirotoxicosis–hipotiroidismo–recuperación).',
      'La tiroiditis aguda supurativa es generalmente de origen viral, de curso subclínico y se presenta con dolor y compromiso sistémico.',
      'La tiroiditis asintomática (silenciosa) puede cursar con fase tirotoxica leve seguida de hipotiroidismo transitorio, con baja captación de yodo.',
      'La tiroiditis de Riedel es una forma rara, fibrosante, dura, que puede simular malignidad y causar síntomas compresivos.',
      'La tiroiditis inducida por fármacos (como interferón o amiodarona) puede alterar la función tiroidea generando tanto hipo como hipertiroidismo.'
    ],
    correctOptionIndex: 1,
    explanation: 'La tiroiditis aguda supurativa es de origen bacteriano (no viral), siendo los patógenos más comunes Staphylococcus y Streptococcus. Además, es un cuadro clínico grave y agudo, no subclínico, que suele originarse por una persistencia del conducto tirogloso o fístulas del seno piriforme.\n\n💡 Puntos Clave:\n- Tiroiditis Subaguda (De Quervain): Es la causa más frecuente de tiroides dolorosa; se asocia a pródromos virales y presenta una VSG extremadamente elevada (>50-100 mm/h).\n- Captación de Iodo (RAIU): Tanto en la tiroiditis subaguda como en la silenciosa, la captación de yodo está disminuida debido a la destrucción glandular, lo que permite el diagnóstico diferencial con la Enfermedad de Graves.\n- Tiroiditis de Riedel: Se caracteriza por una fibrosis densa que invade estructuras adyacentes; al tacto es "pétrea" (dura como madera) y se asocia a otras fibrosclerosis sistémicas.\n- Tiroiditis por Fármacos: La amiodarona es el fármaco clásico; puede causar hipotiroidismo (efecto Wolff-Chaikoff) o tirotoxicosis (tipo I por exceso de yodo o tipo II por efecto tóxico directo).',
    pagina: 'Harrison, Medicina Interna, 20.ª ed, pág. 2708.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 2: PATOLOGÍA TIROIDEA',
    subtema: 'Tiroiditis',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q19',
    text: '¿Cuál de las siguientes afirmaciones sobre el bocio multinodular no tóxico es INCORRECTA?',
    options: [
      'Es más frecuente en mujeres y en regiones con deficiencia de yodo.',
      'Puede ser asintomático o producir síntomas compresivos como disfagia o disnea.',
      'El riesgo de malignidad es similar al de los nódulos tiroideos solitarios.',
      'Se asocia habitualmente a hipertiroidismo clínico manifiesto desde etapas tempranas.',
      'Puede detectarse como hallazgo incidental en estudios de imagen.'
    ],
    correctOptionIndex: 3,
    explanation: 'Por definición, el bocio multinodular no tóxico cursa con eutiroidismo (niveles de TSH normales). Aunque puede evolucionar hacia la autonomía funcional y convertirse en bocio multinodular tóxico, esto suele ocurrir de forma insidiosa tras décadas de evolución, no en etapas tempranas.\n\n💡 Puntos Clave:\n- Definición y Función: Se caracteriza por el aumento de tamaño de la glándula con múltiples nódulos y niveles de TSH normales.\n- Epidemiología: Su prevalencia aumenta con la edad y es mucho más común en mujeres y en zonas con aporte deficitario de yodo (bocio endémico).\n- Clínica Compresiva: El crecimiento retroesternal puede causar el signo de Pemberton (congestión facial al elevar los brazos) por obstrucción del flujo venoso en el estrecho torácico superior.\n- Manejo: En pacientes asintomáticos con TSH normal, la conducta suele ser observación con ecografía seriada. La cirugía (tiroidectomía) se indica ante síntomas compresivos o sospecha de malignidad.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed, pág. 2711.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 2: PATOLOGÍA TIROIDEA',
    subtema: 'Bocio Multinodular',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q20',
    text: '¿Cuál de las siguientes afirmaciones sobre los síndromes de neoplasia endocrina múltiple (MEN) es INCORRECTA?',
    options: [
      'En el MEN1, el hiperparatiroidismo primario suele ser la manifestación inicial más frecuente y aparece a edades más tempranas que en casos esporádicos.',
      'En el MEN2A, el feocromocitoma puede ser bilateral y coexistir con carcinoma medular de tiroides e hiperparatiroidismo.',
      'El carcinoma medular de tiroides en MEN2 se origina de las células C y puede preceder a otras manifestaciones clínicas.',
      'Los tumores pancreáticos endocrinos son característicos del MEN2 y explican gran parte de su morbimortalidad.',
      'Tanto MEN1 como MEN2 se heredan de forma autosómica dominante, pero están asociados a mutaciones en genes distintos.'
    ],
    correctOptionIndex: 3,
    explanation: 'Los tumores pancreáticos endocrinos (como gastrinomas o insulinomas) son un componente fundamental del MEN1 (formando parte de las "3 P": Paratiroides, Páncreas y Pituitaria). El MEN2 (A y B) se caracteriza por el Carcinoma Medular de Tiroides y el Feocromocitoma, pero no incluye afectación pancreática en su espectro clínico.\n\n💡 Puntos Clave:\n- MEN1 (Síndrome de Wermer): Tríada clásica de Paratiroides (95%), Páncreas endocrino (30-80%) e Hipófisis/Pituitaria (15-50%). Gen: MENIN (Cromosoma 11q13).\n- MEN2 (Síndrome de Sipple): El Carcinoma Medular de Tiroides (CMT) está presente en prácticamente el 100%. El MEN2A añade feocromocitoma e hiperparatiroidismo. El MEN2B añade feocromocitoma, neuromas mucosos y hábito marfanoide. Gen: RET (Cromosoma 10).\n- Manifestación Inicial: En el MEN1, el hiperparatiroidismo es casi siempre la primera manifestación (detectable hacia los 20-25 años). En el MEN2, el CMT suele ser la patología que dicta el pronóstico y el manejo quirúrgico temprano.\n- Diagnóstico Diferencial Rápido: Si ves un caso con úlceras pépticas refractarias (Zollinger-Ellison/Gastrinoma) e hipercalcemia, piensa inmediatamente en MEN1. Si ves CMT y crisis hipertensivas, piensa en MEN2.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed, pág. 2747–2753.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 5: NEOPLASIAS ENDOCRINAS',
    subtema: 'MEN',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q21',
    text: 'EN RELACIÓN CON LOS RECEPTORES NUCLEARES Y SU MECANISMO DE ACCIÓN, SEÑALE LA OPCIÓN CORRECTA:',
    options: [
      'Los receptores de tipo II, en ausencia de ligando, se encuentran unidos a proteínas coactivadoras que mantienen una transcripción basal.',
      'Los receptores de esteroides (tipo I) se caracterizan por formar homodímeros y unirse a secuencias de DNA dispuestas como palíndromos.',
      'La unión de la hormona a los receptores nucleares de tipo II induce el reclutamiento de corepresores para silenciar la expresión génica.',
      'El dominio de los "dedos de zinc" es la estructura del receptor nuclear que determina la especificidad de unión por el ligando hormonal.'
    ],
    correctOptionIndex: 1,
    explanation: '✅ Respuesta correcta: B\n\n📖 ANÁLISIS DE PREGUNTA\nLos receptores nucleares se dividen según su unión al DNA y dimerización. Los de tipo I (esteroides) forman homodímeros y reconocen palíndromos, mientras que los de tipo II (tiroideos, vit D) suelen formar heterodímeros con RXR. En ausencia de hormona, los de tipo II están unidos a corepresores, y es la unión del ligando la que provoca su disociación para reclutar coactivadores.\n\n💡 PUNTOS CLAVE (REPASO ACTIVO):\n- Dimerización: Tipo I = Homodímeros; Tipo II = Heterodímeros (generalmente con RXR).\n- Estado de reposo: Los receptores tipo II (como el TR) suprimen activamente la transcripción mediante corepresores cuando no hay hormona.\n- Especificidad: El dominio de unión a la hormona es variable; el dominio de dedos de zinc es altamente conservado y se une al DNA.',
    pagina: 'Harrison. Cap. 370. Mecanismos de acción hormonal. Pág: 2657.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 1: FISIOLOGÍA ENDOCRINA E HIPOFISARIA',
    subtema: 'Mecanismos de Acción Hormonal y Fisiología de la Adenohipófisis',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q22',
    text: 'EN RELACIÓN CON LA REGULACIÓN Y SECRECIÓN DE LAS HORMONAS DE LA ADENOHIPÓFISIS, SEÑALE LA OPCIÓN CORRECTA:',
    options: [
      'La somatostatina ejerce un efecto estimulador dual sobre la secreción de la hormona del crecimiento y la tirotropina (TSH).',
      'El IGF-I actúa como el principal mediador de la retroalimentación positiva sobre las neuronas hipotalámicas de GHRH.',
      'La administración pulsátil de GnRH es el estímulo fisiológico necesario para mantener la sensibilidad de los gonadotropos.',
      'Los glucocorticoides intensifican la expresión del gen de la POMC en la hipófisis para aumentar la producción de ACTH ante el estrés.'
    ],
    correctOptionIndex: 2,
    explanation: '✅ Respuesta correcta: C\n\n📖 ANÁLISIS DE PREGUNTA\nLa fisiología del eje reproductivo depende críticamente del patrón de liberación de GnRH. Los pulsos intermitentes mantienen la sensibilidad hipofisaria, mientras que la exposición continua desensibiliza a los gonadotropos. La somatostatina es inhibidora de GH y TSH. El IGF-I ejerce retroalimentación negativa. Los glucocorticoides tienen un efecto supresor potente sobre el gen POMC.\n\n💡 PUNTOS CLAVE (REPASO ACTIVO):\n- Pulsatilidad: Esencial para GnRH; su pérdida anula la función de las células gonadotropas.\n- Inhibidores hipotalámicos: La dopamina inhibe prolactina; la somatostatina inhibe GH y TSH.\n- POMC: Es el precursor de ACTH; su transcripción es frenada por el cortisol.',
    pagina: 'Harrison. Cap. 370. Mecanismos de acción hormonal. Pág: 2659.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 1: FISIOLOGÍA ENDOCRINA E HIPOFISARIA',
    subtema: 'Mecanismos de Acción Hormonal y Fisiología de la Adenohipófisis',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q23',
    text: 'CON RESPECTO AL TRANSPORTE Y METABOLISMO DE LAS HORMONAS TIROIDEAS, SEÑALE LA OPCIÓN CORRECTA:',
    options: [
      'En el síndrome del eutiroideo enfermo, el aumento de la rT3 se debe exclusivamente a una sobreproducción enzimática periférica acelerada.',
      'El salsalato es un fármaco que desplaza a la T4 de su unión con la globulina transportadora (TBG), alterando los niveles totales.',
      'La desyodinasa de tipo I es la principal vía enzimática encargada de mediar la inactivación de las hormonas T4 y T3.',
      'La globulina transportadora de hormonas sexuales (SHBG) aumenta significativamente ante estados de resistencia a la insulina.'
    ],
    correctOptionIndex: 1,
    explanation: '✅ Respuesta correcta: B\n\n📖 ANÁLISIS DE PREGUNTA\nLas proteínas transportadoras determinan el reservorio hormonal, pero solo la hormona libre es activa. Fármacos como el salsalato pueden desplazar a la T4 de la TBG. En el síndrome del eutiroideo enfermo, la rT3 sube por una depuración disminuida. La inactivación de T4 y T3 es mediada por la desyodinasa tipo III. La SHBG disminuye con la resistencia a la insulina.\n\n💡 PUNTOS CLAVE (REPASO ACTIVO):\n- Hormona Libre: Es la única fracción disponible para interactuar con receptores y ejercer efectos biológicos.\n- Efecto estrogénico: Los estrógenos aumentan la TBG, elevando la T4 total pero manteniendo la libre normal.\n- Potencia: La T3 tiene una afinidad de 10 a 15 veces mayor por el receptor que la T4.',
    pagina: 'Harrison. Cap. 370. Mecanismos de acción hormonal. Pág: 2659.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 1: FISIOLOGÍA ENDOCRINA E HIPOFISARIA',
    subtema: 'Mecanismos de Acción Hormonal y Fisiología de la Adenohipófisis',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q24',
    text: 'EN RELACIÓN CON LOS CRITERIOS DIAGNÓSTICOS DE LA DIABETES MELLITUS, SEÑALE LA OPCIÓN CORRECTA:',
    options: [
      'Una glucosa plasmática en ayuno mayor a 126 mg/dL es suficiente para el diagnóstico, siempre que el ayuno sea de al menos 4 horas.',
      'El valor de la hemoglobina A1c obtenido mediante métodos de "punto de atención" (point-of-care) es válido para fines diagnósticos.',
      'En ausencia de hiperglucemia inequívoca, los criterios diagnósticos deben confirmarse repitiendo las pruebas en un día distinto.',
      'Una glucemia al azar mayor a 200 mg/dL permite el diagnóstico de diabetes incluso en ausencia de síntomas clásicos.'
    ],
    correctOptionIndex: 2,
    explanation: '✅ Respuesta correcta: C\n\n📖 ANÁLISIS DE PREGUNTA\nEl diagnóstico requiere confirmación si no hay crisis de hiperglucemia. El ayuno debe ser de al menos 8 horas, no 4 horas (distractor A). La HbA1c de "punto de atención" no debe usarse para diagnóstico según los estándares actuales (distractor B). La glucemia al azar >200 mg/dL solo es diagnóstica en presencia de síntomas clásicos de hiperglucemia (distractor D).',
    pagina: 'Harrison. Cap. 396. Diabetes mellitus: diagnóstico, clasificación y fisiopatología. Pág: 2852.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 3: DIABETES Y METABOLISMO',
    subtema: 'DIABETES MELLITUS',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q25',
    text: 'SOBRE LA PATOGENIA DE LA DIABETES MELLITUS TIPO 2, SEÑALE LA INCORRECTA:',
    options: [
      'La resistencia a la insulina en el músculo esquelético altera principalmente la formación de glucógeno (vía no oxidativa).',
      'En las etapas iniciales, la tolerancia a la glucosa se mantiene normal gracias a una hiperinsulinemia compensatoria.',
      'El aumento de la producción hepática de glucosa es un evento tardío que sólo ocurre tras la falla total de la célula beta.',
      'La resistencia hepática a la insulina se manifiesta por la incapacidad de suprimir la gluconeogénesis.'
    ],
    correctOptionIndex: 2,
    explanation: '✅ Respuesta correcta: C\n\n📖 ANÁLISIS DE PREGUNTA\nLa producción hepática de glucosa aumenta de forma temprana, aunque suele ser posterior a la resistencia en el músculo. No requiere la falla total de la célula beta para manifestarse.\n\n💡 PUNTOS CLAVE (REPASO ACTIVO):\n- Músculo: Principal sitio de resistencia periférica.\n- Hígado: Responsable de la hiperglucemia en ayuno por exceso de producción.\n- Obesidad: Presente en >80% de los pacientes con DM2.',
    pagina: 'Harrison. Cap. 396. Diabetes mellitus: diagnóstico, clasificación y fisiopatología. Pág: 2856-7.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 3: DIABETES Y METABOLISMO',
    subtema: 'DIABETES MELLITUS',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q26',
    text: 'CON RESPECTO A LA DIABETES MELLITUS TIPO 1, SEÑALE LA OPCIÓN CORRECTA:',
    options: [
      'La mayoría de los pacientes presentan el fenotipo clínico de deficiencia absoluta de insulina de forma súbita, sin un periodo previo de deterioro funcional.',
      'La "luna de miel" es una fase transitoria donde las células beta residuales producen suficiente insulina para controlar la glucemia.',
      'El desarrollo de la DM tipo 1 está limitado exclusivamente a individuos menores de 20 años debido a su base autoinmunitaria.',
      'Los autoanticuerpos contra antígenos de las células beta aparecen únicamente después de que se manifiesta la hiperglucemia clínica.'
    ],
    correctOptionIndex: 1,
    explanation: '✅ Respuesta correcta: B\n\n📖 ANÁLISIS DE PREGUNTA\nExiste un deterioro progresivo previo a la diabetes clínica, no es súbito (distractor A). Puede desarrollarse a cualquier edad (distractor C). Los autoanticuerpos suelen aparecer mucho antes de la hiperglucemia franca (distractor D).\n\n💡 PUNTOS CLAVE (REPASO ACTIVO):\n- Umbral: Se requiere perder el 70-80% de las células beta para la clínica.\n- Péptido C: Refleja la producción de insulina endógena.\n- Etapa 1: Presencia de dos o más autoanticuerpos con normoglucemia.',
    pagina: 'Harrison. Cap. 396. Diabetes mellitus: diagnóstico, clasificación y fisiopatología. Pág: 2854-5.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 3: DIABETES Y METABOLISMO',
    subtema: 'DIABETES MELLITUS',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q27',
    text: 'EN LA CETOACIDOSIS DIABÉTICA, SEÑALE LA OPCIÓN CORRECTA SOBRE LAS ALTERACIONES ELECTROLÍTICAS:',
    options: [
      'Los niveles séricos de potasio se encuentran disminuidos al momento del diagnóstico debido a la diuresis osmótica.',
      'El déficit de sodio corporal total se ve reflejado por una hiponatremia significativa en los análisis de laboratorio.',
      'Las concentraciones séricas de potasio pueden estar elevadas inicialmente debido a la acidosis y la pérdida de volumen.',
      'La presencia de hiperamilasemia en la cetoacidosis diabética es un marcador de pancreatitis aguda concurrente.'
    ],
    correctOptionIndex: 2,
    explanation: '✅ Respuesta correcta: C\n\n📖 ANÁLISIS DE PREGUNTA\nEn la cetoacidosis diabética hay déficit de potasio total, pero la acidosis desplaza el potasio al exterior celular elevándolo falsamente en suero inicialmente. La hiponatremia suele ser facticia por el efecto osmótico de la glucosa. La amilasa elevada suele ser salival (distractor D).\n\n💡 PUNTOS CLAVE (REPASO ACTIVO):\n- Potasio: Debe reponerse cuando los niveles séricos sean normales o bajos una vez iniciada la insulina.\n- Sodio corregido: Se añade 1.6 mEq por cada 100 mg/dL de glucosa extra.\n- Anion Gap: Elevado por cetoácidos.',
    pagina: 'Harrison. Cap. 397. Diabetes mellitus: control y tratamiento. Pág: 2871.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 3: DIABETES Y METABOLISMO',
    subtema: 'DIABETES MELLITUS',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q28',
    text: 'SOBRE LAS COMPLICACIONES CRÓNICAS MICROVASCULARES, SEÑALE LA OPCIÓN CORRECTA:',
    options: [
      'La nefropatía diabética es una complicación que se desarrolla independientemente de la duración o el grado de hiperglucemia.',
      'La retinopatía diabética proliferativa se caracteriza fundamentalmente por la presencia de microaneurismas y exudados algodonosos.',
      'La albuminuria persistente (cociente albúmina/creatinina >30 mg/g) es un marcador temprano de daño renal e indicador de riesgo cardiovascular.',
      'La pérdida de la sensibilidad protectora en los pies suele ser el último signo en aparecer en la evolución de la neuropatía distal.'
    ],
    correctOptionIndex: 2,
    explanation: '✅ Respuesta correcta: C\n\n📖 ANÁLISIS DE PREGUNTA\nEl daño microvascular se correlaciona estrictamente con la duración de la hiperglucemia (distractor A). Microaneurismas y exudados son típicos de la retinopatía NO proliferativa (distractor B). La albuminuria es un marcador clave de riesgo (progresión renal y cardiovascular).\n\n💡 PUNTOS CLAVE (REPASO ACTIVO):\n- Retinopatía: Principal causa de ceguera en edad laboral.\n- Nefropatía: Se inicia con hiperfiltración glomerular.\n- Neuropatía: La pérdida de sensibilidad es un signo temprano crítico para prevenir úlceras.',
    pagina: 'Harrison. Cap. 398. Diabetes mellitus: complicaciones. Pág: 2878-9.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 3: DIABETES Y METABOLISMO',
    subtema: 'DIABETES MELLITUS',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q29',
    text: 'EN RELACIÓN CON EL ESTADO HIPEROSMOLAR HIPERGLUCÉMICO, SEÑALE LA OPCIÓN INCORRECTA:',
    options: [
      'El déficit relativo de insulina es suficiente para evitar la cetogénesis pero no para prevenir la hiperglucemia marcada.',
      'El cuadro clínico suele desarrollarse de forma aguda en menos de 24 horas, similar a la cetoacidosis diabética.',
      'La hiperglucemia induce una diuresis osmótica profunda que provoca una deshidratación más grave que en la cetoacidosis diabética.',
      'Se caracteriza por una osmolalidad plasmática efectiva superior a 320-350 mOsm/kg.'
    ],
    correctOptionIndex: 1,
    explanation: '✅ Respuesta correcta: B (Incorrecta)\n\n📖 ANÁLISIS DE PREGUNTA\nEl estado hiperosmolar hiperglucémico (EHH) tiene un inicio INSIDIOSO (días o semanas), a diferencia de la cetoacidosis que es aguda. El resto de las opciones describen correctamente el cuadro clínico del EHH.\n\n💡 PUNTOS CLAVE (REPASO ACTIVO):\n- Perfil típico: Anciano con DM2, confusión y deshidratación grave.\n- Glucosa: Suele superar los 600 mg/dL.\n- Osmolalidad: Elevada (>320 mOsm/kg).',
    pagina: 'Harrison. Cap. 397. Diabetes mellitus: control y tratamiento. Pág: 2872.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 3: DIABETES Y METABOLISMO',
    subtema: 'DIABETES MELLITUS',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q30',
    text: 'SOBRE LA REGULACIÓN DEL EJE HIPOTÁLAMO-HIPÓFISIS-SUPRARRENAL, SEÑALE LA OPCIÓN CORRECTA:',
    options: [
      'La secreción de cortisol presenta su nadir o punto mínimo de concentración en las primeras horas de la mañana (06:00).',
      'Los glucocorticoides ejercen un efecto de retroalimentación positiva sobre el gen de la POMC para asegurar la respuesta al estrés.',
      'La liberación de ACTH es pulsátil y su ritmo circadiano depende más de la variación en la amplitud que de la frecuencia de los pulsos.',
      'La arginina-vasopresina (AVP) actúa como un inhibidor potente de la liberación de ACTH mediada por CRH.'
    ],
    correctOptionIndex: 2,
    explanation: '✅ Respuesta correcta: C\n\n📖 ANÁLISIS DE PREGUNTA\nLa amplitud de los pulsos de ACTH determina el ritmo circadiano. El pico es a las 08:30 (acrofase) y el nadir a medianoche (distractor A). El feedback es negativo y suprime la POMC (distractor B). La AVP estimula la liberación de ACTH (distractor D).\n\n💡 PUNTOS CLAVE (REPASO ACTIVO):\n- POMC: Precursor de ACTH, MSH y endorfinas.\n- Estrés: La inflamación activa el eje mediante citocinas (IL-6).\n- Ritmo: Alterado en el Síndrome de Cushing (pérdida del nadir nocturno).',
    pagina: 'Harrison. Cap. 379. Trastornos de la corteza suprarrenal. Pág: 2720.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 4: PATOLOGÍA SUPRARRENAL',
    subtema: 'PATOLOGÍA SUPRARRENAL',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q31',
    text: 'EN LA INSUFICIENCIA SUPRARRENAL PRIMARIA (ENFERMEDAD DE ADDISON), SEÑALE LA OPCIÓN CORRECTA:',
    options: [
      'La hiperpigmentación es un signo característico que resulta de la deficiencia de péptidos derivados de la POMC.',
      'La hiponatremia y la hiperpotasemia son consecuencias directas de la pérdida de la secreción de mineralocorticoides.',
      'La glándula suprarrenal permanece intacta y su función puede recuperarse mediante la administración de ACTH exógena.',
      'A diferencia de la forma secundaria, en la primaria no existe alteración en la secreción de andrógenos suprarrenales.'
    ],
    correctOptionIndex: 1,
    explanation: '✅ Respuesta correcta: B\n\n📖 ANÁLISIS DE PREGUNTA\nLa deficiencia de aldosterona causa pérdida de sodio y retención de potasio. La pigmentación es por exceso de ACTH/POMC (no deficiencia). En la insuficiencia primaria hay destrucción de la glándula (no permanece intacta). Los andrógenos se pierden tanto en la forma primaria como en la secundaria.\n\n💡 PUNTOS CLAVE (REPASO ACTIVO):\n- Etiología: La suprarrenalitis autoinmunitaria es la causa más común en países desarrollados.\n- Hipotensión: Ortostática que progresa a shock en crisis aguda.\n- Diagnóstico: Cortisol bajo con ACTH elevada.',
    pagina: 'Harrison. Cap. 379. Trastornos de la corteza suprarrenal. Pág: 2733',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 4: PATOLOGÍA SUPRARRENAL',
    subtema: 'PATOLOGÍA SUPRARRENAL',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q32',
    text: 'CON RESPECTO AL DIAGNÓSTICO DEL SÍNDROME DE CUSHING, SEÑALE LA OPCIÓN CORRECTA:',
    options: [
      'La prueba de supresión con dosis bajas de dexametasona se utiliza para confirmar la hipercortisolemia autónoma.',
      'Una concentración de ACTH disminuida (suprimida) orienta hacia una causa hipofisaria (Enfermedad de Cushing).',
      'El muestreo de seno petroso inferior es el primer estudio de imagen indicado ante la sospecha clínica de Cushing.',
      'La medición de cortisol a medianoche es una prueba poco sensible debido a que los sujetos sanos también presentan niveles altos a esa hora.'
    ],
    correctOptionIndex: 0,
    explanation: '✅ Respuesta correcta: A\n\n📖 ANÁLISIS DE PREGUNTA\nLa ACTH suprimida indica causa suprarrenal, no hipofisaria (distractor B). El diagnóstico de Cushing debe ser bioquímico antes de pedir imágenes; el seno petroso no es el primer estudio. El cortisol a medianoche es muy sensible porque en sanos debe estar en su punto más bajo (nadir).\n\n💡 PUNTOS CLAVE (REPASO ACTIVO):\n- Causa más frecuente: Adenoma hipofisario (Enfermedad de Cushing).\n- Clínica: Obesidad central, estrías violáceas (>1 cm), debilidad proximal.\n- Cushing ectópico: Sugerido por hipopotasemia grave e hiperpigmentación de inicio rápido.',
    pagina: 'Harrison. Cap. 379. Trastornos de la corteza suprarrenal. Pág: 2720.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 4: PATOLOGÍA SUPRARRENAL',
    subtema: 'PATOLOGÍA SUPRARRENAL',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q33',
    text: 'SOBRE EL ALDOSTERONISMO PRIMARIO, SEÑALE LA OPCIÓN INCORRECTA:',
    options: [
      'La causa más frecuente es la hiperplasia micronodular bilateral, superando en prevalencia a los adenomas unilaterales.',
      'La prueba de detección aceptada es la cuantificación de la razón aldosterona:renina (ARR) en plasma.',
      'Los B-bloqueadores son fármacos que no interfieren con la interpretación de la razón aldosterona:renina.',
      'El tratamiento quirúrgico (suprarrenalectomía laparoscópica) es la opción preferida para los adenomas unilaterales.'
    ],
    correctOptionIndex: 2,
    explanation: '✅ Respuesta correcta: C (Incorrecta)\n\n📖 ANÁLISIS DE PREGUNTA\nLos beta-bloqueadores pueden causar falsos positivos en la ARR al suprimir la renina. La causa más común es la hiperplasia bilateral. La cirugía es el estándar para adenomas unilaterales confirmados.\n\n💡 PUNTOS CLAVE (REPASO ACTIVO):\n- Diagnóstico: TC de cortes finos para etiología; muestreo venoso para lateralización.\n- Tratamiento médico: Antagonistas de mineralocorticoides (espironolactona) para hiperplasia bilateral.\n- Riesgo: Mayor daño cardiovascular comparado con hipertensión esencial.',
    pagina: 'Harrison. Cap. 379. Trastornos de la corteza suprarrenal. Pág: 2729.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 4: PATOLOGÍA SUPRARRENAL',
    subtema: 'PATOLOGÍA SUPRARRENAL',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q34',
    text: 'EN EL MANEJO DE LA HIPERPLASIA SUPRARRENAL CONGÉNITA POR DEFICIENCIA DE 21-HIDROXILASA, SEÑALE LA OPCIÓN CORRECTA:',
    options: [
      'El objetivo del tratamiento es la supresión total de la 17-hidroxiprogesterona hasta alcanzar niveles indetectables.',
      'El exceso de andrógenos en niñas recién nacidas puede provocar virilización grave (genitales ambiguos).',
      'La administración de glucocorticoides debe suspenderse durante situaciones de estrés para evitar la supresión del crecimiento.',
      'La deficiencia de mineralocorticoides solo ocurre en la forma "virilizante simple" de la enfermedad.'
    ],
    correctOptionIndex: 1,
    explanation: '✅ Respuesta correcta: B\n\n📖 ANÁLISIS DE PREGUNTA\nLa deficiencia de 21-hidroxilasa desvía la síntesis hacia andrógenos, causando virilización. La supresión total de 17-OHP indicaría sobretratamiento (distractor A). En estrés la dosis debe aumentarse (no suspenderse). La pérdida de sal ocurre en la forma "clásica perdedora de sal" (distractor D).\n\n💡 PUNTOS CLAVE (REPASO ACTIVO):\n- Marcador: 17-hidroxiprogesterona (17-OHP).\n- Genética: Autosómica recesiva (gen CYP21A2).\n- Forma no clásica: Puede simular síndrome de ovarios poliquísticos en mujeres jóvenes.',
    pagina: 'Harrison. Cap. 379. Trastornos de la corteza suprarrenal. Pág: 2738.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 4: PATOLOGÍA SUPRARRENAL',
    subtema: 'PATOLOGÍA SUPRARRENAL',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q35',
    text: 'SOBRE LOS INCIDENTALOMAS SUPRARRENALES, SEÑALE LA OPCIÓN CORRECTA:',
    options: [
      'El tamaño de la masa es un parámetro confiable para distinguir con muy alta especificidad una lesión benigna de una maligna.',
      'La mayoría de los nódulos identificados incidentalmente son adenomas corticales hormonalmente activos.',
      'Las lesiones ricas en lípidos presentan una densidad baja en la tomografía sin contraste (densidad <10 Unidades Hounsfield).',
      'El muestreo de venas suprarrenales debe realizarse de forma sistemática en todos los pacientes con una masa >1 cm.'
    ],
    correctOptionIndex: 2,
    explanation: '✅ Respuesta correcta: C\n\n📖 ANÁLISIS DE PREGUNTA\nLas masas ricas en lípidos (típicas de adenomas benignos) tienen baja densidad en TC (<10 HU). El tamaño es sensible pero poco específico (distractor A). La mayoría son inactivos (distractor B). El muestreo venoso solo se indica en casos específicos de aldosteronismo confirmado.\n\n💡 PUNTOS CLAVE (REPASO ACTIVO):\n- Evaluación: Siempre excluir feocromocitoma y Cushing subclínico.\n- Densidad >20 HU: Aumenta la sospecha de malignidad o feocromocitoma.\n- Umbral quirúrgico: Masa >4 cm suele sugerir necesidad de resección.',
    pagina: 'Harrison. Cap. 379. Trastornos de la corteza suprarrenal. Pág: 2731.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 4: PATOLOGÍA SUPRARRENAL',
    subtema: 'PATOLOGÍA SUPRARRENAL',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q36',
    text: 'SOBRE LA REGULACIÓN DEL EJE TIROIDEO Y EL "PUNTO DE AJUSTE", SEÑALE LA OPCIÓN CORRECTA:',
    options: [
      'El punto de ajuste del eje hipotálamo-hipófisis-tiroides lo establece la concentración circulante de tiroxina (T4).',
      'La dopamina y los glucocorticoides en dosis fisiológicas pueden ser estimuladores de la secreción de TSH.',
      'La TSH es el marcador más sensible para valorar la acción de las hormonas tiroideas a nivel tisular.',
      'La TRH es el único regulador capaz de inhibir de forma directa la expresión del gen de la subunidad B de la TSH.'
    ],
    correctOptionIndex: 2,
    explanation: '✅ Respuesta correcta: C\n\n📖 ANÁLISIS DE PREGUNTA\nEl punto de ajuste lo establece la TSH en respuesta a T4/T3. Dopamina y glucocorticoides suprimen la TSH solo en dosis farmacológicas. Las hormonas tiroideas son las que inhiben directamente la subunidad B de la TSH.\n\n💡 PUNTOS CLAVE (REPASO ACTIVO):\n- TSH: Hormona glucoproteínica con subunidad alfa común (LH, FSH, hCG).\n- T3: Principal mediador de la retroalimentación negativa sobre TRH y TSH.\n- Semivida: T4 (7 días), T3 (1 día), TSH (prolongada en comparación con otras peptídicas).',
    pagina: 'Harrison. Cap. 375. Trastornos de la glándula tiroides. Pág: 2692.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 2: PATOLOGÍA TIROIDEA',
    subtema: 'PATOLOGÍA TIROIDEA',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q37',
    text: 'EN RELACIÓN CON EL HIPOTIROIDISMO CONGÉNITO, SEÑALE LA OPCIÓN CORRECTA:',
    options: [
      'La disgenesia de la glándula tiroides es responsable de menos del 10% de los casos de hipotiroidismo neonatal.',
      'El paso transplacentario de hormona tiroidea materna es casi nulo, dejando al feto desprotegido.',
      'El síndrome de Pendred se asocia con bocio, sordera sensitivoneural y mutaciones en el gen del NIS.',
      'El desarrollo de estas alteraciones es dos veces más frecuente en mujeres que en varones.'
    ],
    correctOptionIndex: 3,
    explanation: '✅ Respuesta correcta: D\n\n📖 ANÁLISIS DE PREGUNTA\nLa disgenesia causa el 80-85% de los casos. El paso placentario ocurre y da apoyo parcial al feto. El síndrome de Pendred es por mutación en el gen PENDRINA (transporte apical), no NIS (basolateral).\n\n💡 PUNTOS CLAVE (REPASO ACTIVO):\n- Causa más común mundial: Sigue siendo la deficiencia de yodo.\n- Tamizaje: Esencial para prevenir retraso intelectual permanente.\n- Evolución: La mayoría son permanentes, pero los mediados por anticuerpos maternos son transitorios.',
    pagina: 'Harrison. Cap. 376. Hipotiroidismo. Pág: 2698-9.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 2: PATOLOGÍA TIROIDEA',
    subtema: 'PATOLOGÍA TIROIDEA',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q38',
    text: 'SOBRE LA ENFERMEDAD DE GRAVES, SEÑALE LA OPCIÓN INCORRECTA:',
    options: [
      'La oftalmopatía tiroidea puede ocurrir en ausencia de hipertiroidismo en el 10% de los pacientes (oftalmopatía eutiroidea).',
      'El bocio se debe principalmente a los efectos de las inmunoglobulinas estimulantes de tiroides (TSI) mediados por el receptor de TSH.',
      'El tabaquismo es un factor de riesgo mayor para el desarrollo y progresión de la oftalmopatía.',
      'La dermopatía tiroidea (mixedema pretibial) aparece en la mayoría de los pacientes con enfermedad de Graves.'
    ],
    correctOptionIndex: 3,
    explanation: '✅ Respuesta correcta: D (Incorrecta)\n\n📖 ANÁLISIS DE PREGUNTA\nLa dermopatía es infrecuente (<5%) y suele asociarse a oftalmopatía grave. El tabaco es el factor ambiental evitable más importante y un factor de riesgo mayor para la oftalmopatía.\n\n💡 PUNTOS CLAVE (REPASO ACTIVO):\n- Tirotoxicosis apática: Manifestación enmascarada en ancianos (fatiga, pérdida de peso).\n- Oftalmopatía: Empeora con el tratamiento con yodo radiactivo si no se previene con corticoides.\n- Genética: Asociación con HLA-DR y polimorfismos en CTLA-4.',
    pagina: 'Harrison. Cap. 377. Hipertiroidismo. Pág: 2703.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 2: PATOLOGÍA TIROIDEA',
    subtema: 'PATOLOGÍA TIROIDEA',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q39',
    text: 'CON RESPECTO A LA TIROIDITIS SUBAGUDA (DE QUERVAIN), SEÑALE LA OPCIÓN CORRECTA:',
    options: [
      'Se caracteriza por una fase inicial de hipotiroidismo profundo seguida de una fase de recuperación tirotóxica.',
      'La captación de yodo radiactivo se encuentra marcadamente elevada durante la fase tirotóxica inicial.',
      'El diagnóstico se apoya en una velocidad de eritrosedimentación elevada y una glándula dolorosa a la palpación.',
      'Los antitiroideos son el tratamiento de elección para controlar los síntomas de la fase de tirotoxicosis.'
    ],
    correctOptionIndex: 2,
    explanation: '✅ Respuesta correcta: C\n\n📖 ANÁLISIS DE PREGUNTA\nLa fase inicial es tirotóxica por liberación de hormona preformada. La captación es baja (<5%) porque el tejido está dañado y la TSH suprimida. El tratamiento son AINES o glucocorticoides; los antitiroideos no son útiles ya que no hay exceso de síntesis.\n\n💡 PUNTOS CLAVE (REPASO ACTIVO):\n- Histología: Células gigantes multinucleadas y granulomas.\n- Evolución: Tres fases (Tirotóxica -> Hipotiroidea -> Recuperación).\n- Hipotiroidismo permanente: Ocurre solo en el 15% de los casos.',
    pagina: 'Harrison. Cap. 377. Hipertiroidismo. Pág: 2708.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 2: PATOLOGÍA TIROIDEA',
    subtema: 'PATOLOGÍA TIROIDEA',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q40',
    text: 'EN EL MANEJO DEL HIPOTIROIDISMO CON LEVOTIROXINA, SEÑALE LA OPCIÓN CORRECTA:',
    options: [
      'En pacientes con peso normal, una TSH elevada a pesar de dosis >200 µg/día sugiere habitualmente mala absorción o mal apego terapéutico.',
      'Los suplementos de hierro y calcio mejoran la absorción gástrica de la levotiroxina y pueden tomarse simultáneamente.',
      'Los estrógenos orales disminuyen los requerimientos de levotiroxina al acelerar la depuración de la hormona.',
      'La dosis de sustitución debe ser lo suficientemente alta como para suprimir la TSH por debajo de los límites normales en todos los pacientes.'
    ],
    correctOptionIndex: 0,
    explanation: '✅ Respuesta correcta: A\n\n📖 ANÁLISIS DE PREGUNTA\nHierro y calcio bloquean la absorción gástrica. Los estrógenos aumentan la TBG, lo que suele requerir un aumento de la dosis de T4. El objetivo es normalizar la TSH, no suprimirla (excepto en cáncer de tiroides).\n\n💡 PUNTOS CLAVE (REPASO ACTIVO):\n- Semivida: T4 dura 7 días; se requiere 1 mes para alcanzar el estado estable.\n- Toma: Ayuno, al menos 30-60 min antes del desayuno.\n- Interacciones: Rifampicina y fenitoína aumentan el metabolismo de T4.',
    pagina: 'Harrison. Cap. 376. Hipotiroidismo. Pág: 2702-3.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 2: PATOLOGÍA TIROIDEA',
    subtema: 'PATOLOGÍA TIROIDEA',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q41',
    text: 'SOBRE EL SÍNDROME DEL EUTIROIDEO ENFERMO, SEÑALE LA OPCIÓN CORRECTA:',
    options: [
      'El patrón más frecuente es la reducción de T3 con aumento compensatorio de la TSH por encima de 20 mIU/L.',
      'El aumento de la rT3 se debe principalmente a una sobreproducción acelerada por activación de la desyodinasa tipo I.',
      'En pacientes con hipoperfusión grave, la activación de la desyodinasa tipo III en músculo e hígado acelera el metabolismo de T4 y T3.',
      'Las concentraciones de TSH son un marcador confiable para descartar enfermedad tiroidea en pacientes críticos tratados con dopamina.'
    ],
    correctOptionIndex: 2,
    explanation: '✅ Respuesta correcta: C\n\n📖 ANÁLISIS DE PREGUNTA\nEl patrón más frecuente es reducción de T3 total y libre con TSH normal o baja. El rT3 sube por depuración disminuida. La dopamina suprime la TSH e induce a error en pacientes críticos.\n\n💡 PUNTOS CLAVE (REPASO ACTIVO):\n- T3: La magnitud del descenso se correlaciona con la gravedad de la enfermedad.\n- Pronóstico: T4 baja en pacientes críticos es un marcador de mal pronóstico.\n- Recuperación: La TSH puede subir transitoriamente durante la mejoría clínica.',
    pagina: 'Harrison. Cap. 377. Hipertiroidismo. Pág: 2708.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 2: PATOLOGÍA TIROIDEA',
    subtema: 'PATOLOGÍA TIROIDEA',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q42',
    text: 'SOBRE LOS RECEPTORES ACOPLADOS A PROTEÍNA G (GPCR), SEÑALE LA OPCIÓN CORRECTA:',
    options: [
      'Las mutaciones activadoras de Gsa causan el síndrome de McCune-Albright al inhibir la producción de AMP cíclico.',
      'El receptor de la TSH está acoplado a la subunidad Gsa, que activa a la adenilil ciclasa incrementando el AMP cíclico.',
      'Las mutaciones inactivadoras de Gsa en la línea germinal simulan las acciones de la hormona paratiroidea (PTH).',
      'El receptor de la ACTH es un receptor nuclear de tipo II que requiere dimerización con RXR para su función.'
    ],
    correctOptionIndex: 1,
    explanation: '✅ Respuesta correcta: B\n\n📖 ANÁLISIS DE PREGUNTA\nEl receptor de la TSH activa la subunidad Gsa, aumentando el AMPc. McCune-Albright se debe a mutaciones activadoras que INCREMENTAN el AMPc (distractor A). La inactivación de Gsa causa resistencia a hormonas como la PTH (pseudohipoparatiroidismo), no simula sus acciones (distractor C). El receptor de ACTH es un GPCR, no un receptor nuclear (distractor D).',
    pagina: 'Harrison. Cap. 370. Mecanismos de acción hormonal. Pág: 2655-7.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 1: FISIOLOGÍA ENDOCRINA E HIPOFISARIA',
    subtema: 'ADENOHIPÓFISIS, NEUROHIPÓFISIS Y ACCIÓN HORMONAL',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q43',
    text: 'EN RELACIÓN CON LA PROLACTINA, SEÑALE LA OPCIÓN INCORRECTA:',
    options: [
      'Es la única hormona hipofisaria cuyo mecanismo de regulación central predominante es inhibitorio (mediado por dopamina).',
      'La hiperprolactinemia inhibe la función reproductora al suprimir la secreción pulsátil de GnRH hipotalámica.',
      'Las concentraciones de prolactina aumentan de manera fisiológica unas 10 veces durante el embarazo y persisten elevadas si se inicia la lactancia.',
      'La TRH actúa como el principal inhibidor fisiológico de la secreción de prolactina en condiciones normales.'
    ],
    correctOptionIndex: 3,
    explanation: '✅ Respuesta correcta: D (Incorrecta)\n\n📖 ANÁLISIS DE PREGUNTA\nLa dopamina es el principal inhibidor de la prolactina. La TRH es en realidad un factor estimulador de su liberación. La hiperprolactinemia causa hipogonadismo hipogonadotrópico al interferir con la pulsatilidad de la GnRH.',
    pagina: 'Harrison. Cap. 371. Hipófisis anterior: fisiología de las hormonas hipofisarias. Pág: 2660-1.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 1: FISIOLOGÍA ENDOCRINA E HIPOFISARIA',
    subtema: 'ADENOHIPÓFISIS, NEUROHIPÓFISIS Y ACCIÓN HORMONAL',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q44',
    text: 'SOBRE LA HORMONA DEL CRECIMIENTO (GH), SEÑALE LA OPCIÓN CORRECTA:',
    options: [
      'El IGF-I es el principal mediador de la retroalimentación positiva sobre el eje de la hormona del crecimiento.',
      'La GH induce la retención de nitrógeno, aumenta la masa corporal magra y estimula la lipogénesis epiploica.',
      'El receptor de GH genera una proteína de unión (GHBP) soluble a partir de un fragmento de su dominio extracelular.',
      'La administración de somatostatina estimula de forma selectiva la liberación de GHRH en el hipotálamo.'
    ],
    correctOptionIndex: 2,
    explanation: '✅ Respuesta correcta: C\n\n📖 ANÁLISIS DE PREGUNTA\nEl receptor de GH puede desprender su dominio extracelular para formar la GHBP. El IGF-I ejerce retroalimentación negativa, no positiva. La GH es lipolítica (reduce grasa), no lipogénica. La somatostatina es el principal inhibidor de la liberación de GH.',
    pagina: 'Harrison. Cap. 371. Hipófisis anterior: fisiología de las hormonas hipofisarias. Pág: 2662.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 1: FISIOLOGÍA ENDOCRINA E HIPOFISARIA',
    subtema: 'ADENOHIPÓFISIS, NEUROHIPÓFISIS Y ACCIÓN HORMONAL',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q45',
    text: 'EN EL DIAGNÓSTICO DIFERENCIAL DE LA DIABETES INSÍPIDA, SEÑALE LA OPCIÓN CORRECTA:',
    options: [
      'La polidipsia primaria se caracteriza por una osmolalidad urinaria elevada en presencia de hiponatremia plasmática.',
      'En la diabetes insípida nefrógena, la concentración plasmática de vasopresina (AVP) suele estar baja o indetectable.',
      'La presencia de la "zona brillante" hipofisaria en la RMN es un hallazgo normal que suele desaparecer en la diabetes insípida hipofisaria.',
      'La prueba de privación de agua permite diferenciar con 100% de precisión entre la forma parcial y polidipsia primaria.'
    ],
    correctOptionIndex: 2,
    explanation: '✅ Respuesta correcta: C\n\n📖 ANÁLISIS DE PREGUNTA\nLa neurohipófisis normal brilla en T1 debido a fosfolípidos relacionados con el almacenamiento de AVP; su ausencia es típica de la diabetes insípida central. En la forma nefrógena, la AVP está elevada debido a la resistencia periférica. La polidipsia primaria cursa con osmolalidad urinaria diluida (baja).',
    pagina: 'Harrison. Cap. 374. Trastornos de la neurohipófisis. Pág: 2685.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 1: FISIOLOGÍA ENDOCRINA E HIPOFISARIA',
    subtema: 'ADENOHIPÓFISIS, NEUROHIPÓFISIS Y ACCIÓN HORMONAL',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q46',
    text: 'SOBRE EL SÍNDROME DE SECRECIÓN INAPROPIADA DE HORMONA ANTIDIURÉTICA (SIADH), SEÑALE LA OPCIÓN INCORRECTA:',
    options: [
      'Se caracteriza por hiponatremia hipotónica asociada a una volemia normal (euvolémica).',
      'La medición de los niveles plasmáticos de AVP es el estándar de oro para diferenciar el SIADH de otros tipos de hiponatremia.',
      'El cortisol plasmático matinal debe medirse para descartar insuficiencia suprarrenal secundaria como causa de la hiponatremia.',
      'Los niveles de urea y ácido úrico suelen estar bajos debido a la expansión del volumen intravascular y el aumento de la depuración.'
    ],
    correctOptionIndex: 1,
    explanation: '✅ Respuesta correcta: B (Incorrecta)\n\n📖 ANÁLISIS DE PREGUNTA\nLa medición de AVP no es el estándar de oro porque está elevada en casi todas las hiponatremias (ya sea de forma apropiada o inapropiada). El diagnóstico es clínico y bioquímico (hiponatremia, osmolaridad urinaria >100 mOsm/kg, sodio urinario >40 mEq/L y euvolemia).',
    pagina: 'Harrison. Cap. 374. Trastornos de la neurohipófisis. Pág: 2689.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 1: FISIOLOGÍA ENDOCRINA E HIPOFISARIA',
    subtema: 'ADENOHIPÓFISIS, NEUROHIPÓFISIS Y ACCIÓN HORMONAL',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q47',
    text: 'EN RELACIÓN CON EL TRANSPORTE DE HORMONAS TIROIDEAS Y ESTEROIDEAS, SEÑALE LA OPCIÓN CORRECTA:',
    options: [
      'La megalina es una proteína que transporta exclusivamente la hormona del crecimiento hacia el núcleo celular.',
      'La globulina transportadora de hormonas sexuales (SHBG) aumenta ante estados de resistencia a la insulina y obesidad.',
      'Las alteraciones transitorias en las proteínas de unión no afectan la fracción libre a largo plazo debido a los ciclos de retroalimentación.',
      'La mayoría de las hormonas esteroideas se almacenan en grandes gránulos secretorios para su liberación inmediata.'
    ],
    correctOptionIndex: 2,
    explanation: '✅ Respuesta correcta: C\n\n📖 ANÁLISIS DE PREGUNTA\nLos mecanismos de retroalimentación ajustan la secreción para mantener estable la fracción libre a pesar de cambios en los transportadores. La SHBG disminuye en obesidad y resistencia a la insulina. Las hormonas esteroideas no se almacenan, se secretan inmediatamente tras su síntesis.',
    pagina: 'Harrison. Cap. 370. Mecanismos de acción hormonal. Pág: 2654 y Cap. 375. Trastornos de la glándula tiroides. Pág: 2695.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 1: FISIOLOGÍA ENDOCRINA E HIPOFISARIA',
    subtema: 'ADENOHIPÓFISIS, NEUROHIPÓFISIS Y ACCIÓN HORMONAL',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q48',
    text: 'SOBRE LOS RECEPTORES NUCLEARES DE TIPO I (ESTEROIDES), SEÑALE LA OPCIÓN CORRECTA:',
    options: [
      'Se localizan predominantemente anclados a la membrana plasmática en espera del ligando.',
      'Tras la unión de la hormona, forman heterodímeros con el receptor X del ácido retinoico (RXR).',
      'Reconocen secuencias de DNA específicas que suelen estar dispuestas como palíndromos.',
      'Mantienen una unión fuerte con proteínas correpresoras en ausencia de la hormona.'
    ],
    correctOptionIndex: 2,
    explanation: '✅ Respuesta correcta: C\n\n📖 ANÁLISIS DE PREGUNTA\nLos receptores de tipo I (como el de glucocorticoides o estrógenos) forman homodímeros y reconocen secuencias palindrómicas. Los que forman heterodímeros con RXR son los de tipo II. Los receptores tipo I se encuentran en el citoplasma o núcleo, a menudo unidos a proteínas de choque térmico.',
    pagina: 'Harrison. Cap. 370. Mecanismos de acción hormonal. Pág: 2657.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 1: FISIOLOGÍA ENDOCRINA E HIPOFISARIA',
    subtema: 'ADENOHIPÓFISIS, NEUROHIPÓFISIS Y ACCIÓN HORMONAL',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q49',
    text: 'Mujer de 34 años consulta por aumento de peso, debilidad muscular proximal, amenorrea e hipertensión. Al examen: obesidad centrípeta, facies redondeada, giba dorsal y estrías violáceas. Se documenta hipercortisolismo endógeno. ACTH: 32 pg/mL. Prueba de dexametasona 8 mg: supresión >60%. RM hipófisis: nódulo de 5 mm. TC tórax normal. ¿Cuál es el siguiente paso diagnóstico más apropiado?',
    options: [
      'Cirugía transesfenoidal directa de la lesión hipofisaria',
      'Repetir RM hipofisaria con cortes más finos',
      'Cateterismo de senos petrosos inferiores con dosaje de ACTH',
      'Búsqueda de tumor ectópico productor de ACTH con PET-CT'
    ],
    correctOptionIndex: 2,
    explanation: '✅ Respuesta correcta: C\n\n📖 ANÁLISIS DE PREGUNTA\nLa paciente tiene un Cushing ACTH-dependiente. La prueba de supresión con dosis alta sugiere origen hipofisario, pero un microadenoma de 5 mm puede ser un incidentaloma (presente en 10% de población sana). Para confirmar que el ACTH proviene de la hipófisis antes de operar, el cateterismo de senos petrosos es el estándar de oro.',
    pagina: 'Harrison. Cap. 379. Trastornos de la corteza suprarrenal. Pág: 2726.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 1: FISIOLOGÍA ENDOCRINA E HIPOFISARIA',
    subtema: 'ADENOHIPÓFISIS, NEUROHIPÓFISIS Y ACCIÓN HORMONAL',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q50',
    text: 'Varón de 23 años con Diabetes mellitus tipo 1 consulta por 24 h de vómitos, dolor abdominal y respiración agitada. Refiere que suspendió la insulina por un cuadro gripal. Al examen: somnoliento, deshidratado, TA 90/60 mmHg, FC 122 lpm, FR 32 rpm con respiración de Kussmaul. Glucemia capilar 540 mg/dL. Laboratorio inicial: pH 7.08, HCO₃⁻ 6 mEq/L, pCO₂ 18 mmHg, Na⁺ 128 mEq/L, K⁺ 5.6 mEq/L, Cl⁻ 92 mEq/L, creatinina 1.8 mg/dL, cetonas séricas positivas.\nSe inicia reposición con solución salina 0.9% y perfusión de insulina regular IV a 0.1 U/kg/h. Dos horas después: glucemia 310 mg/dL, pH 7.10, HCO₃⁻ 7 mEq/L, K⁺ 4.9 mEq/L. El residente propone continuar igual esquema hasta normalizar la glucemia.\n¿Cuál es la conducta MÁS adecuada en este momento?',
    options: [
      'Suspender la insulina IV y comenzar insulina subcutánea',
      'Cambiar la solución a dextrosa al 5% con solución salina y continuar insulina IV',
      'Administrar bicarbonato de sodio IV por pH <7.10',
      'Suspender líquidos y priorizar reposición de potasio'
    ],
    correctOptionIndex: 1,
    explanation: '✅ Respuesta correcta: B\n\n📖 ANÁLISIS DE PREGUNTA\nEl paciente cursa una Cetoacidosis diabética con mejoría parcial de la glucemia, pero la acidosis metabólica persiste. En esta fase, cuando la glucemia desciende a ~250–300 mg/dL, no debe suspenderse la insulina, ya que su objetivo principal es corregir la cetosis. Para poder continuar la insulina, se debe agregar dextrosa a los líquidos. No hay indicación de bicarbonato (reservado para pH <6.9). El potasio aún es >4.5 mEq/L.\n\n💡 PUNTOS CLAVE (REPASO ACTIVO):\n- La insulina se mantiene hasta corregir la cetosis, no hasta normalizar la glucemia.\n- Cuando la glucemia baja a ~250 mg/dL, se agrega dextrosa para poder continuar la insulina.\n- El bicarbonato solo se indica en acidosis extrema (pH <6.9).',
    pagina: 'Harrison. Cap. 397. Diabetes mellitus: control y tratamiento. Pág: 2871.',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 3: DIABETES Y METABOLISMO',
    subtema: 'DIABETES MELLITUS',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q51',
    text: '¿Cuál de los siguientes hallazgos define deficiencia de hormona de crecimiento (GH) en el adulto durante la prueba de hipoglucemia inducida por insulina?',
    options: [
      'Respuesta máxima de GH inferior a 3 μg/L durante hipoglucemia',
      'Concentración basal de IGF-1 por debajo del límite inferior normal',
      'Incremento de GH menor de 10 μg/L posterior al estímulo insulínico',
      'Persistencia de glucosa sérica superior a 70 mg/dL tras la prueba',
      'Ausencia completa de secreción detectable de GH en ayunas'
    ],
    correctOptionIndex: 0,
    explanation: 'La hipoglucemia inducida por insulina es la prueba dinámica más útil para confirmar deficiencia de GH en adultos. La disminución de glucosa sérica estimula fisiológicamente la secreción de GH; en individuos normales la respuesta supera 5 μg/L. En pacientes con deficiencia de GH del adulto, la respuesta máxima permanece por debajo de 3 μg/L, criterio diagnóstico establecido en el Harrison.\n\n🔑 Puntos clave:\n • El mejor estudio confirmatorio es la prueba de hipoglucemia inducida por insulina.\n • La hipoglucemia debe alcanzar aproximadamente 40 mg/dL.\n • En sujetos normales, la GH aumenta >5 μg/L.\n • Deficiencia de GH se define por pico de GH <3 μg/L.\n • Está contraindicada en epilepsia, cardiopatía isquémica y enfermedad cerebrovascular',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2668',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 1: FISIOLOGÍA ENDOCRINA E HIPOFISARIA',
    subtema: 'Deficiencia de GH',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q52',
    text: '¿Cuál de las siguientes condiciones constituye una causa fisiológica de hiperprolactinemia?',
    options: [
      'Hipotiroidismo primario con elevación compensadora de TRH',
      'Compresión del infundíbulo por macroadenoma hipofisario',
      'Embarazo y lactancia con estimulación fisiológica de PRL',
      'Insuficiencia renal crónica con disminución de depuración hormonal',
      'Uso prolongado de antagonistas dopaminéricos antipsicóticos'
    ],
    correctOptionIndex: 2,
    explanation: 'La hiperprolactinemia puede originarse por causas fisiológicas, patológicas o farmacológicas. El embarazo y la lactancia representan las principales causas fisiológicas debido al estímulo normal sobre la secreción de prolactina. En contraste, el hipotiroidismo, la insuficiencia renal, la compresión hipofisaria y los fármacos dopaminérgicos producen hiperprolactinemia patológica o secundaria.\n\n🔑 Puntos clave:\n • La hiperprolactinemia es el síndrome hipofisario hipersecretor más frecuente.\n • Los prolactinomas son la causa tumoral más común.\n • Embarazo y lactancia son causas fisiológicas de elevación de PRL.\n • La dopamina inhibe la secreción de prolactina.\n • Antipsicóticos y antidepresivos pueden elevar significativamente la PRL',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2675',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 1: FISIOLOGÍA ENDOCRINA E HIPOFISARIA',
    subtema: 'Hiperprolactinemia',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q53',
    text: '¿Cuál de las siguientes afirmaciones sobre cabergolina y bromocriptina en el tratamiento del prolactinoma es INCORRECTA?',
    options: [
      'La cabergolina posee mayor afinidad por receptores dopaminérgicos D2 que la bromocriptina',
      'La bromocriptina presenta con mayor frecuencia efectos adversos gastrointestinales y neurológicos',
      'La cabergolina suele administrarse una o dos veces por semana debido a su vida media prolongada',
      'La bromocriptina se prefiere durante el embarazo por su mayor experiencia de seguridad clínica',
      'La cabergolina produce menor reducción tumoral que la bromocriptina en macroprolactinomas'
    ],
    correctOptionIndex: 4,
    explanation: 'La afirmación incorrecta es la opción e. La cabergolina no solo posee mayor afinidad por los receptores D2, sino que además logra mejor normalización de prolactina y mayor reducción del tamaño tumoral comparada con la bromocriptina. También presenta menos efectos adversos gastrointestinales y neurológicos. Sin embargo, debido a la amplia experiencia acumulada, la bromocriptina suele preferirse cuando se requiere tratamiento durante el embarazo.\n\n🔑 Puntos clave:\n • La cabergolina tiene mayor afinidad por receptores D2.\n • La cabergolina es más eficaz y mejor tolerada que la bromocriptina.\n • Bromocriptina causa más náuseas, vómitos e hipotensión ortostática.\n • La bromocriptina posee mayor experiencia de seguridad en embarazo.\n • Ambos agonistas dopaminérgicos disminuyen PRL y reducen el volumen tumoral.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., págs. 2676-2677',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 1: FISIOLOGÍA ENDOCRINA E HIPOFISARIA',
    subtema: 'Hiperprolactinemia',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q54',
    text: 'Un varón de 46 años consulta por aumento progresivo del tamaño de manos y pies, cefalea y sudoración excesiva desde hace varios años. Al examen físico presenta prognatismo, macroglosia y piel engrosada. La resonancia magnética evidencia un macroadenoma hipofisario. ¿Cuál es la etiología más probable de este cuadro clínico?',
    options: [
      'Producción ectópica de GHRH por tumor carcinoide bronquial',
      'Adenoma somatotropo hipofisario secretor de GH',
      'Hipersecreción pancreática ectópica de hormona de crecimiento',
      'Adenoma hipofisario productor exclusivo de prolactina',
      'Hamartoma hipotalámico secretor de hormona liberadora'
    ],
    correctOptionIndex: 1,
    explanation: 'La acromegalia se produce en la gran mayoría de casos por un adenoma somatotropo hipofisario productor de GH. La hipersecreción crónica de GH e IGF-1 ocasiona crecimiento acral, prognatismo, macroglosia, hiperhidrosis y visceromegalia. Aunque existen causas ectópicas de producción de GH o GHRH, estas son mucho menos frecuentes comparadas con los adenomas hipofisarios.\n\n🔑 Puntos clave:\n • La causa más frecuente de acromegalia es el adenoma somatotropo.\n • GH e IGF-1 producen crecimiento de tejidos blandos y estructuras óseas.\n • Manifestaciones típicas: prognatismo, macroglosia, hiperhidrosis y crecimiento acral.\n • Los tumores ectópicos productores de GHRH son raros.\n • La RM hipofisaria es fundamental en el diagnóstico etiológico.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2678',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 1: FISIOLOGÍA ENDOCRINA E HIPOFISARIA',
    subtema: 'Acromegalia',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q55',
    text: '¿Cuál de los siguientes efectos adversos se asocia con mayor frecuencia al uso de análogos de somatostatina en pacientes con acromegalia?',
    options: [
      'Hipoglucemia grave secundaria a hiperinsulinismo persistente',
      'Hipertensión arterial severa por retención hidrosalina crónica',
      'Náuseas y molestias abdominales relacionadas con inhibición digestiva',
      'Hipercalcemia sintomática secundaria a aumento de resorción ósea',
      'Taquiarritmias supraventriculares inducidas por estimulación adrenérgica'
    ],
    correctOptionIndex: 2,
    explanation: 'Los análogos de somatostatina, como octreótido y lanreótido, inhiben la motilidad y secreción gastrointestinal, por lo que los efectos adversos más frecuentes son náuseas, distensión abdominal, flatulencia y esteatorrea. Estos síntomas suelen ser transitorios y mejorar en pocas semanas. También pueden producir intolerancia a la glucosa y alteraciones biliares, incluyendo lodo biliar y colelitiasis.\n\n🔑 Puntos clave:\n • Los análogos de somatostatina son útiles en acromegalia.\n • Inhiben secreción hormonal y actividad gastrointestinal.\n • Efectos adversos frecuentes: náuseas, flatulencia y molestias abdominales.\n • Pueden producir colelitiasis o lodo biliar.\n • Existe riesgo de intolerancia a la glucosa o diabetes reciente.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2678',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 1: FISIOLOGÍA ENDOCRINA E HIPOFISARIA',
    subtema: 'Acromegalia',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q56',
    text: '¿Cuál es la manifestación clínica más frecuente en pacientes con síndrome de Cushing?',
    options: [
      'Obesidad o aumento de peso mayor al 15% del peso ideal',
      'Hipertensión arterial asociada a alcalosis hipopotasémica',
      'Estrías violáceas extensas en abdomen y raíces proximales',
      'Debilidad progresiva de músculos proximales de extremidades',
      'Alteraciones de tolerancia a glucosa con diabetes mellitus'
    ],
    correctOptionIndex: 0,
    explanation: 'La manifestación más frecuente del síndrome de Cushing es la obesidad o el aumento significativo de peso, presente en aproximadamente 80% de los pacientes. El exceso crónico de glucocorticoides favorece redistribución central de grasa, incremento ponderal y alteraciones metabólicas. Otros hallazgos comunes incluyen piel delgada, facies de luna llena e hipertensión arterial.\n\n🔑 Puntos clave:\n • El aumento de peso es la manifestación más frecuente del síndrome de Cushing.\n • La obesidad suele ser de distribución central o troncal.\n • Facies de luna llena y piel delgada son hallazgos clásicos.\n • La hipertensión aparece en alrededor de 75% de casos.\n • El hipercortisolismo produce alteraciones metabólicas y musculares.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2678',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 4: PATOLOGÍA SUPRARRENAL',
    subtema: 'Síndrome de Cushing',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q57',
    text: '¿Cuál es la principal causa de muerte en pacientes con hipercortisolismo crónico o síndrome de Cushing?',
    options: [
      'Enfermedades cardiovasculares asociadas a hipercortisolismo',
      'Infecciones oportunistas secundarias a inmunosupresión grave',
      'Tromboembolismo pulmonar relacionado con estado protrombótico',
      'Hemorragia digestiva alta secundaria a úlcera péptica activa',
      'Insuficiencia suprarrenal aguda posterior a supresión hipofisaria'
    ],
    correctOptionIndex: 0,
    explanation: 'El exceso crónico de cortisol incrementa significativamente el riesgo cardiovascular debido a hipertensión arterial, intolerancia a la glucosa, obesidad central y alteraciones metabólicas. Por ello, las enfermedades cardiovasculares constituyen la principal causa de muerte en pacientes con síndrome de Cushing. Además, estos pacientes presentan mayor susceptibilidad a infecciones y aumento del riesgo de suicidio.\n\n🔑 Puntos clave:\n • La principal causa de muerte en síndrome de Cushing es cardiovascular.\n • El hipercortisolismo produce hipertensión, obesidad central y diabetes.\n • Existe inmunosupresión con mayor riesgo de infecciones.\n • Son frecuentes piel delgada, equimosis y debilidad muscular proximal.\n • También aumenta el riesgo psiquiátrico y de suicidio.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2678',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 4: PATOLOGÍA SUPRARRENAL',
    subtema: 'Síndrome de Cushing',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q58',
    text: '¿Cuál de las siguientes afirmaciones sobre el tratamiento farmacológico de la enfermedad de Cushing es INCORRECTA?',
    options: [
      'El pasireótido puede disminuir las concentraciones de ACTH en adenomas hipofisarios',
      'La radioterapia hipofisaria produce curación inmediata en la mayoría de pacientes adultos',
      'El ketoconazol inhibe enzimas de esteroidogénesis dependientes del citocromo P450',
      'La metirapona reduce la síntesis de cortisol mediante inhibición de 11β-hidroxilasa',
      'El tratamiento médico puede utilizarse cuando la cirugía no es posible o fracasa'
    ],
    correctOptionIndex: 1,
    explanation: 'La opción incorrecta es la b. La radioterapia hipofisaria no produce una respuesta inmediata y su efecto suele ser lento y parcial, pudiendo requerir años para alcanzar control hormonal adecuado. Por ello, frecuentemente se combina con tratamiento médico para controlar el hipercortisolismo mientras actúa la radiación. Los fármacos como pasireótido, ketoconazol y metirapona son alternativas útiles cuando la cirugía fracasa, está contraindicada o existe enfermedad persistente.\n\n🔑 Puntos clave:\n • El tratamiento de elección de la enfermedad de Cushing es la resección transesfenoidal selectiva.\n • La radioterapia tiene efecto tardío y menor tasa de curación en adultos.\n • El pasireótido es un análogo de somatostatina con afinidad por receptores SST5.\n • Pasireótido reduce ACTH y puede disminuir volumen tumoral hipofisario.\n • Efectos adversos de pasireótido: hiperglucemia, diabetes e intolerancia a la glucosa.\n • El ketoconazol inhibe enzimas del citocromo P450 implicadas en síntesis de cortisol.\n • Efectos adversos de ketoconazol: hepatotoxicidad, ginecomastia, hipogonadismo y edema.\n • La metirapona inhibe 11β-hidroxilasa y disminuye producción de cortisol.\n • Metirapona puede causar hirsutismo, HTA e hipopotasemia por aumento de andrógenos y mineralocorticoides.\n • El tratamiento médico se usa en enfermedad persistente, recurrente o cuando cirugía no es posible',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2682',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 4: PATOLOGÍA SUPRARRENAL',
    subtema: 'Enfermedad de Cushing',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q59',
    text: 'Un varón de 28 años consulta por poliuria intensa y polidipsia progresiva desde hace varios meses. Refiere despertarse varias veces por la noche para orinar y consumir grandes cantidades de agua. La osmolaridad urinaria es de 120 mOsm/L y el sodio plasmático se encuentra elevado. Tiene antecedente de cirugía transesfenoidal por craneofaringioma hace 6 meses. ¿Cuál es el diagnóstico más probable?',
    options: [
      'Polidipsia primaria por alteración psiquiátrica del mecanismo de sed',
      'Diabetes insípida central secundaria a lesión neurohipofisaria',
      'Diabetes mellitus con diuresis osmótica secundaria a hiperglucemia',
      'Diabetes insípida nefrogénica inducida por resistencia tubular a AVP',
      'Síndrome de secreción inadecuada de ADH posterior a neurocirugía'
    ],
    correctOptionIndex: 1,
    explanation: 'La diabetes insípida central ocurre por disminución de la secreción de AVP (ADH), generalmente secundaria a lesiones hipotalámicas o neurohipofisarias. El antecedente de cirugía por craneofaringioma es un dato clásico. La disminución de AVP impide concentrar la orina, produciendo poliuria con osmolaridad urinaria baja y aumento compensador de la sed. La hipernatremia y la osmolaridad plasmática elevada apoyan el diagnóstico.\n\n🔑 Puntos clave:\n • La diabetes insípida central se produce por déficit de secreción de AVP.\n • Causas frecuentes: cirugía hipofisaria, traumatismo craneal, tumores y craneofaringioma.\n • Se caracteriza por poliuria (>40 mL/kg/día) y polidipsia intensa.\n • La osmolaridad urinaria suele ser <300 mOsm/L.\n • Puede presentarse nicturia, fatiga y deshidratación.\n • La hipernatremia aparece cuando la ingesta de agua es insuficiente.\n • La diabetes insípida nefrogénica ocurre por resistencia renal a AVP.\n • Fármacos asociados a DI nefrogénica: litio, demeclociclina y anfotericina B.\n • La polidipsia primaria suele asociarse a trastornos psiquiátricos.\n • El antecedente neuroquirúrgico orienta fuertemente a diabetes insípida central.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2686',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 1: FISIOLOGÍA ENDOCRINA E HIPOFISARIA',
    subtema: 'Diabetes insípida',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q60',
    text: 'Una mujer de 67 años es llevada a emergencia por confusión progresiva, cefalea y somnolencia. Tiene antecedente de carcinoma microcítico de pulmón diagnosticado recientemente. Los exámenes muestran sodio plasmático de 118 mEq/L, osmolaridad plasmática baja y osmolaridad urinaria inapropiadamente elevada. El examen físico no evidencia edema ni signos de deshidratación. ¿Cuál es el diagnóstico más probable?',
    options: [
      'Síndrome de secreción inapropiada de hormona antidiurética (SIADH)',
      'Hiponatremia hipovolémica secundaria a uso de diuréticos tiazídicos',
      'Diabetes insípida central asociada a lesión metastásica hipofisaria',
      'Polidipsia primaria con supresión fisiológica de vasopresina sérica',
      'Insuficiencia suprarrenal primaria con pérdida renal de sodio'
    ],
    correctOptionIndex: 0,
    explanation: 'El SIADH se caracteriza por hiponatremia hipotónica euvolémica causada por secreción inapropiada de ADH, lo que genera retención de agua libre y disminución del sodio plasmático. El carcinoma microcítico de pulmón es una de las causas clásicas de SIADH ectópico. La osmolaridad urinaria permanece elevada pese a la hiponatremia, ya que la ADH continúa actuando sobre el túbulo colector renal.\n\n🔑 Puntos clave:\n • El SIADH produce hiponatremia hipotónica euvolémica.\n • Existe retención de agua libre con sodio corporal normal.\n • El sodio sérico y la osmolaridad plasmática están disminuidos.\n • La osmolaridad urinaria permanece inapropiadamente elevada.\n • El carcinoma microcítico de pulmón es una causa clásica de SIADH.\n • Otras causas: SNC, infecciones pulmonares, fármacos y neoplasias.\n • Fármacos asociados: carbamazepina, vincristina, ciclofosfamida y desmopresina.\n • Los pacientes suelen estar clínicamente euvolémicos.\n • Síntomas neurológicos: cefalea, confusión, convulsiones y coma.\n • El diagnóstico requiere excluir hipotiroidismo e insuficiencia suprarrenal.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2690',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 1: FISIOLOGÍA ENDOCRINA E HIPOFISARIA',
    subtema: 'SIADH',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q61',
    text: '¿Cuál de las siguientes afirmaciones sobre los estudios de laboratorio en enfermedad tiroidea es INCORRECTA?',
    options: [
      'La TSH sérica es la prueba inicial más sensible para evaluar función tiroidea',
      'Los anticuerpos contra receptor de TSH suelen encontrarse elevados en enfermedad de Graves',
      'La tiroglobulina puede elevarse en tiroiditis, bocio y cáncer diferenciado de tiroides',
      'La TSH aislada permite evaluar adecuadamente la función tiroidea en hipopituitarismo',
      'Los anticuerpos antiperoxidasa tiroidea son frecuentes en enfermedad tiroidea autoinmunitaria'
    ],
    correctOptionIndex: 3,
    explanation: 'La opción incorrecta es la d. En pacientes con enfermedad hipofisaria o hipotalámica, la TSH puede encontrarse baja, normal o incluso ligeramente elevada pese a hipotiroidismo central, por lo que no debe utilizarse como única prueba diagnóstica. En estos casos es indispensable evaluar T4 libre. La TSH sigue siendo la mejor prueba inicial en la mayoría de pacientes con función hipotálamo-hipofisaria intacta.\n\n🔑 Puntos clave:\n • La TSH es la prueba inicial más sensible para evaluar función tiroidea primaria.\n • En hipotiroidismo central, la TSH puede ser normal o inadecuadamente baja.\n • La T4 libre es fundamental cuando existe sospecha de enfermedad hipofisaria.\n • Los anticuerpos anti-TPO se asocian principalmente a tiroiditis autoinmunitaria.\n • Los TRAb (anticuerpos contra receptor de TSH) son característicos de enfermedad de Graves.\n • Más del 90% de pacientes con Graves presentan TRAb elevados.\n • La tiroglobulina aumenta en bocio, tiroiditis y cáncer diferenciado de tiroides.\n • La tiroglobulina se utiliza principalmente en seguimiento de cáncer diferenciado de tiroides.\n • La biotina puede interferir con inmunoensayos tiroideos y alterar resultados.\n • La TSH puede permanecer suprimida semanas después de corregir tirotoxicosis.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2698',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 2: PATOLOGÍA TIROIDEA',
    subtema: 'Patología Tiroidea',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q62',
    text: 'Una mujer de 45 años consulta por fatiga progresiva, intolerancia al frío, estreñimiento y aumento de peso en los últimos meses. Al examen físico presenta piel seca, edema periorbitario y bradicardia. Los estudios muestran TSH elevada y T4 libre disminuida. ¿Cuál es la etiología más probable de este cuadro clínico?',
    options: [
      'Hipotiroidismo secundario por insuficiencia hipofisaria adquirida',
      'Tiroiditis subaguda posterior a infección viral respiratoria',
      'Tiroiditis autoinmunitaria de Hashimoto',
      'Hipotiroidismo inducido por exceso agudo de yodo exógeno',
      'Deficiencia congénita de síntesis hormonal tiroidea'
    ],
    correctOptionIndex: 2,
    explanation: 'La tiroiditis de Hashimoto es la causa más frecuente de hipotiroidismo en áreas con suficiente aporte de yodo. Se trata de una enfermedad autoinmunitaria caracterizada por destrucción progresiva de la glándula tiroides, generando disminución de T4 y elevación compensadora de TSH. Los síntomas clásicos incluyen fatiga, intolerancia al frío, estreñimiento, piel seca, aumento de peso y bradicardia.\n\n🔑 Puntos clave:\n • La causa más frecuente de hipotiroidismo primario es Hashimoto.\n • En zonas con deficiencia de yodo, la principal causa sigue siendo déficit de yodo.\n • Síntomas frecuentes: fatiga, frío, estreñimiento y aumento de peso.\n • Signos clásicos: piel seca, mixedema, bradicardia e hiporreflexia.\n • El hipotiroidismo primario cursa con TSH alta y T4 libre baja.\n • Los anticuerpos anti-TPO suelen encontrarse elevados en Hashimoto.\n • El mixedema corresponde a infiltración cutánea por glucosaminoglucanos.\n • El hipotiroidismo secundario presenta TSH baja o inapropiadamente normal.\n • Fármacos asociados: amiodarona, litio e interferón alfa.\n • El tratamiento estándar es levotiroxina ajustada según TSH.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., págs. 2698-2699',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 2: PATOLOGÍA TIROIDEA',
    subtema: 'Tiroiditis de Hashimoto',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q63',
    text: '¿Cuál de las siguientes afirmaciones sobre estudios de imagen en enfermedad tiroidea es INCORRECTA?',
    options: [
      'La ecografía tiroidea permite diferenciar con certeza absoluta nódulos benignos de malignos',
      'La gammagrafía tiroidea evalúa la distribución funcional del radioisótopo en la glándula',
      'Los adenomas tóxicos suelen mostrar aumento focal de captación de radioyodo',
      'La captación de yodo radiactivo disminuye en tiroiditis destructiva y exceso de yodo',
      'La biopsia por aspiración con aguja fina es útil en nódulos tiroideos sospechosos'
    ],
    correctOptionIndex: 0,
    explanation: 'La opción incorrecta es la a. Aunque la ecografía tiroidea es fundamental para estratificar riesgo de malignidad mediante características sospechosas, no permite diferenciar con certeza absoluta entre nódulos benignos y malignos. La confirmación diagnóstica suele requerir biopsia por aspiración con aguja fina (BAAF). La gammagrafía y la captación de yodo radiactivo ayudan a evaluar la función tiroidea y distinguir causas de tirotoxicosis.\n\n🔑 Puntos clave:\n • La ecografía es el estudio inicial más útil para evaluar nódulos tiroideos.\n • Hallazgos ecográficos sospechosos: microcalcificaciones, hipocogenicidad marcada, bordes irregulares y aumento de vascularidad.\n • La BAAF está indicada en nódulos con características sospechosas.\n • Los nódulos “calientes” en gammagrafía suelen ser hiperfuncionantes y raramente malignos.\n • Los adenomas tóxicos muestran aumento focal de captación de radioyodo.\n • La enfermedad de Graves presenta captación difusa aumentada.\n • La tiroiditis subaguda y la exposición a yodo disminuyen la captación de radioyodo.\n • La gammagrafía evalúa función; la ecografía evalúa anatomía y características estructurales.\n • La captación de yodo radiactivo ayuda en el diagnóstico diferencial de tirotoxicosis.\n • La BAAF es el método diagnóstico más importante para descartar cáncer tiroideo.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2698',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 2: PATOLOGÍA TIROIDEA',
    subtema: 'Patología Tiroidea - Imagen',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q64',
    text: '¿Cuál de las siguientes afirmaciones sobre hipotiroidismo subclínico es INCORRECTA?',
    options: [
      'La levotiroxina está indicada cuando la TSH es mayor de 10 mUI/L',
      'El tratamiento puede considerarse en pacientes sintomáticos con TSH menor de 10 mUI/L',
      'El embarazo constituye una indicación para iniciar tratamiento con levotiroxina',
      'La presencia de anticuerpos anti-TPO positivos puede favorecer la decisión terapéutica',
      'El tratamiento inicial recomendado consiste en dosis altas de levotiroxina para normalizar rápidamente la TSH'
    ],
    correctOptionIndex: 4,
    explanation: 'La opción incorrecta es la e. En el hipotiroidismo subclínico, el tratamiento se inicia con dosis bajas de levotiroxina (25–50 μg/día), ajustándose gradualmente según la respuesta clínica y los niveles de TSH. El uso de dosis altas iniciales no está recomendado debido al riesgo de efectos adversos cardiovasculares y sobretratamiento.\n\n🔑 Puntos clave:\n • El hipotiroidismo subclínico presenta TSH elevada con T4 libre normal.\n • Muchos pacientes son asintomáticos o tienen síntomas leves e inespecíficos.\n • Se recomienda tratar cuando TSH >10 mUI/L.\n • También se considera tratamiento en embarazo o deseo gestacional.\n • Los anticuerpos anti-TPO positivos aumentan probabilidad de progresión a hipotiroidismo franco.\n • Pacientes sintomáticos pueden beneficiarse de prueba terapéutica.\n • La levotiroxina se inicia con dosis bajas y ajustes progresivos.\n • El control de TSH se realiza aproximadamente cada 6–8 semanas tras cambios de dosis.\n • El sobretratamiento puede causar fibrilación auricular y pérdida ósea.\n • Si no se inicia tratamiento, debe realizarse seguimiento periódico de TSH',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2702',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 2: PATOLOGÍA TIROIDEA',
    subtema: 'Hipotiroidismo Subclínico',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q65',
    text: '¿Cuál es la manifestación cardiovascular más frecuente del hipertiroidismo?',
    options: [
      'Hipertensión arterial sistólica con presión diastólica elevada',
      'Taquicardia sinusal persistente incluso durante el reposo',
      'Fibrilación auricular paroxística en adultos jóvenes eutiroideos',
      'Insuficiencia cardíaca congestiva con fracción de eyección reducida',
      'Bradicardia refleja secundaria a aumento del gasto cardíaco'
    ],
    correctOptionIndex: 1,
    explanation: 'La manifestación cardiovascular más frecuente del hipertiroidismo es la taquicardia sinusal, secundaria al aumento del efecto simpático y del gasto cardíaco inducido por exceso de hormonas tiroideas. Puede presentarse incluso en reposo y durante el sueño. Aunque la fibrilación auricular es una complicación importante, especialmente en adultos mayores, es menos frecuente que la taquicardia sinusal.\n\n🔑 Puntos clave:\n • La taquicardia sinusal es el hallazgo cardiovascular más frecuente del hipertiroidismo.\n • El exceso de T3 aumenta sensibilidad β-adrenérgica y gasto cardíaco.\n • La fibrilación auricular es más común en pacientes mayores de 50 años.\n • Manifestaciones típicas: pérdida de peso, hiperactividad, intolerancia al calor y temblor fino.\n • La piel suele ser caliente, húmeda y aterciopelada.\n • Puede existir debilidad muscular proximal e hiperreflexia.\n • La enfermedad de Graves es la causa más frecuente de hipertiroidismo.\n • Graves puede asociar oftalmopatía infiltrativa y mixedema pretibial.\n • La tirotoxicosis apatética es más frecuente en adultos mayores.\n • El aumento del apetito con pérdida de peso es altamente sugestivo de hipertiroidismo.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2704',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 2: PATOLOGÍA TIROIDEA',
    subtema: 'Hipertiroidismo',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q66',
    text: '¿Cuál de las siguientes afirmaciones sobre el tratamiento de la enfermedad de Graves es INCORRECTA?',
    options: [
      'El propranolol puede utilizarse para controlar taquicardia y síntomas adrenérgicos',
      'El propiltiouracilo se prefiere durante el primer trimestre del embarazo',
      'El yodo radiactivo está contraindicado durante el embarazo y la lactancia',
      'El metimazol constituye el fármaco de elección durante el primer trimestre de gestación',
      'La tirotoxicosis grave puede requerir glucocorticoides y manejo intensivo hospitalario'
    ],
    correctOptionIndex: 3,
    explanation: 'La opción incorrecta es la d. Durante el primer trimestre del embarazo, el antitiroideo de elección es el propiltiouracilo (PTU), debido al riesgo teratogénico asociado al metimazol, incluyendo aplasia cutis y atresias congénitas. Posteriormente, suele cambiarse a metimazol para disminuir el riesgo de hepatotoxicidad relacionado con PTU. El yodo radiactivo está absolutamente contraindicado durante embarazo y lactancia.\n\n🔑 Puntos clave:\n • La enfermedad de Graves puede tratarse con antitiroideos, yodo radiactivo o cirugía.\n • Metimazol es generalmente el antitiroideo de elección fuera del embarazo temprano.\n • PTU se prefiere durante el primer trimestre del embarazo.\n • Metimazol se asocia a embriopatía: aplasia cutis y atresia esofágica/coanal.\n • PTU presenta mayor riesgo de hepatotoxicidad grave.\n • El yodo radiactivo está contraindicado en embarazo y lactancia.\n • El propranolol controla síntomas adrenérgicos y reduce conversión periférica de T4 a T3.\n • La oftalmopatía de Graves puede empeorar tras yodo radiactivo.\n • La tormenta tiroidea es una emergencia con fiebre, delirio y falla multiorgánica.\n • En tormenta tiroidea se utilizan β-bloqueadores, PTU, yodo y glucocorticoides.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., págs. 2706-2707',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 2: PATOLOGÍA TIROIDEA',
    subtema: 'Enfermedad de Graves',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q67',
    text: 'Una mujer de 29 años consulta por palpitaciones, pérdida de peso y nerviosismo de 4 meses de evolución. Presenta T4 libre elevada y TSH suprimida. La gammagrafía tiroidea evidencia captación marcadamente disminuida de radioyodo. No presenta dolor cervical ni oftalmopatía. Refiere consumo frecuente de “suplementos metabólicos” para pérdida de peso. ¿Cuál de los siguientes hallazgos apoyaría MÁS el diagnóstico de tirotoxicosis facticia?',
    options: [
      'Elevación marcada de anticuerpos contra receptor de TSH',
      'Incremento difuso de captación tiroidea en gammagrafía funcional',
      'Concentración sérica disminuida de tiroglobulina circulante',
      'Presencia de bocio difuso con hiperplasia folicular tiroidea',
      'Velocidad de sedimentación globular notablemente incrementada'
    ],
    correctOptionIndex: 2,
    explanation: 'La tirotoxicosis facticia se produce por administración exógena de hormona tiroidea. Debido a la supresión de la actividad tiroidea endógena, la tiroglobulina sérica suele encontrarse disminuida. La captación de radioyodo también es baja, lo que ayuda a diferenciarla de enfermedad de Graves o adenomas hiperfuncionantes. La ausencia de bocio, oftalmopatía y dolor cervical aporta información clínica importante en el diagnóstico diferencial.\n\n🔑 Puntos clave:\n • La tirotoxicosis facticia ocurre por consumo exógeno de hormona tiroidea.\n • La TSH está suprimida con T4/T3 elevadas.\n • La captación de radioyodo suele ser muy baja o ausente.\n • La tiroglobulina baja es un dato orientador importante.\n • Graves presenta captación difusa aumentada y TRAb positivos.\n • La tiroiditis subaguda suele acompañarse de dolor cervical y VSG elevada.\n • El adenoma tóxico produce captación focal aumentada.\n • La anamnesis farmacológica es fundamental.\n • Muchos casos se relacionan con suplementos “naturales” para adelgazar.\n • La gammagrafía es clave en el diagnóstico diferencial de tirotoxicosis.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2708',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 2: PATOLOGÍA TIROIDEA',
    subtema: 'Tirotoxicosis facticia',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q68',
    text: '¿Cuál de las siguientes afirmaciones sobre las distintas formas de tiroiditis es INCORRECTA?',
    options: [
      'La tiroiditis aguda bacteriana en niños puede asociarse a persistencia del seno piriforme izquierdo',
      'La tiroiditis subaguda de De Quervain típicamente presenta captación difusa aumentada de radioyodo',
      'La tiroiditis de Riedel puede producir síntomas compresivos por fibrosis invasiva cervical',
      'La tiroiditis aguda suele acompañarse de fiebre, eritema local y leucocitosis',
      'La tiroiditis subaguda frecuentemente cursa con dolor cervical y velocidad de sedimentación elevada'
    ],
    correctOptionIndex: 1,
    explanation: 'La opción incorrecta es la b. La tiroiditis subaguda es una tiroiditis destructiva, por lo que la captación de radioyodo se encuentra disminuida debido a liberación pasiva de hormonas tiroideas preformadas. La captación aumentada es característica de estados hiperfuncionantes como la enfermedad de Graves. La tiroiditis aguda corresponde a una infección bacteriana supurativa, mientras que la tiroiditis de Riedel es un proceso fibrótico infiltrativo raro.\n\n🔑 Puntos clave:\n • La tiroiditis subaguda de De Quervain suele ser postviral y dolorosa.\n • Virus asociados: coxsackievirus, adenovirus y echovirus.\n • La VSG elevada es característica de tiroiditis subaguda.\n • La captación de radioyodo está disminuida en tiroiditis destructivas.\n • La tiroiditis aguda es una infección bacteriana supurativa tiroidea.\n • Staphylococcus aureus y Streptococcus son causas frecuentes.\n • En niños, la causa predisponente clásica es persistencia del seno piriforme izquierdo.\n • La tiroiditis aguda puede producir abscesos, sepsis y mediastinitis.\n • La tiroiditis de Riedel produce fibrosis extensa y glándula “pétrea”.\n • Riedel puede generar disfagia, disnea y síntomas compresivos cervicales.\n • Tiroiditis de Riedel: IgG4\n • Las tiroiditis destructivas cursan en fases: tirotoxicosis → hipotiroidismo → recuperación.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., págs. 2708-2709',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 2: PATOLOGÍA TIROIDEA',
    subtema: 'Tiroiditis',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q69',
    text: 'Un varón de 72 años consulta por pérdida de peso progresiva, fibrilación auricular de reciente diagnóstico y disnea leve de esfuerzo. Niega dolor cervical u oftalmopatía. Al examen físico se evidencia una glándula tiroidea irregular y multinodular de larga evolución. La TSH está suprimida y la gammagrafía tiroidea muestra múltiples áreas de captación heterogénea con regiones hiperfuncionantes y otras hipocaptantes. ¿Cuál de los siguientes hallazgos sería MÁS compatible con el diagnóstico sospechado?',
    options: [
      'Captación difusa homogénea de radioyodo asociada a TRAb positivos',
      'Incremento marcado de velocidad de sedimentación con dolor tiroideo intenso',
      'Desarrollo progresivo de autonomía funcional en múltiples nódulos tiroideos',
      'Captación casi ausente de radioyodo por destrucción folicular aguda',
      'Elevación inapropiada de TSH con macroadenoma hipofisario visible en RM'
    ],
    correctOptionIndex: 2,
    explanation: 'El cuadro corresponde a bocio multinodular tóxico, una causa frecuente de hipertiroidismo en adultos mayores. La enfermedad se desarrolla lentamente por aparición progresiva de autonomía funcional en distintos nódulos tiroideos, lo que produce secreción independiente de hormona tiroidea y supresión de TSH. La gammagrafía típicamente muestra captación heterogénea con múltiples áreas hiperfuncionantes. A diferencia de Graves, no suele existir oftalmopatía ni captación difusa homogénea.\n\n🔑 Puntos clave:\n • El bocio multinodular tóxico (BMNT) es una causa frecuente de hipertiroidismo en ancianos.\n • Se origina por autonomía funcional progresiva de múltiples nódulos tiroideos.\n • Es más frecuente en regiones con deficiencia de yodo.\n • La evolución suele ser lenta y muchos pacientes permanecen asintomáticos durante años.\n • En adultos mayores puede manifestarse inicialmente con fibrilación auricular o pérdida de peso.\n • La gammagrafía muestra captación heterogénea con áreas hiperfuncionantes e hipocaptantes.\n • Graves muestra captación difusa homogénea y TRAb positivos.\n • La tiroiditis subaguda presenta dolor cervical y VSG elevada.\n • La tirotoxicosis facticia y las tiroiditis destructivas presentan captación baja de radioyodo.\n • El signo de Pemberton sugiere extensión retroesternal del bocio.\n • Síntomas compresivos: disfagia, disnea, tos o congestión venosa cervical.\n • Existe riesgo de malignidad en nódulos dominantes o sospechosos.\n • El tratamiento puede incluir antitiroideos, yodo radiactivo o cirugía según edad y compresión local',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2712',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 2: PATOLOGÍA TIROIDEA',
    subtema: 'Bocio multinodular tóxico',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q70',
    text: 'Una mujer de 48 años consulta por palpitaciones, intolerancia al calor y pérdida de peso leve de evolución progresiva. Al examen físico se palpa un nódulo tiroideo único, móvil e indoloro de 3.5 cm. La TSH está suprimida y la gammagrafía tiroidea demuestra captación intensa focal con inhibición del resto del tejido tiroideo. ¿Cuál es el diagnóstico más probable?',
    options: [
      'Enfermedad de Graves con hiperestimulación autoinmunitaria difusa',
      'Tiroiditis subaguda con liberación transitoria de hormona tiroidea',
      'Adenoma hipofisario productor de TSH con tirotoxicosis central',
      'Nódulo tiroideo solitario hiperfuncionante (adenoma tóxico)',
      'Bocio multinodular tóxico con autonomía funcional heterogénea'
    ],
    correctOptionIndex: 3,
    explanation: 'El adenoma tóxico corresponde a un nódulo tiroideo autónomo capaz de producir hormona tiroidea independientemente de la TSH. La gammagrafía es diagnóstica al demostrar captación focal aumentada (“nódulo caliente”) con supresión del resto del parénquima tiroideo. A diferencia de Graves, no existe captación difusa ni oftalmopatía. El bocio multinodular tóxico presenta múltiples áreas hiperfuncionantes y no un único nódulo dominante.\n\n🔑 Puntos clave:\n • El adenoma tóxico es un nódulo hiperfuncionante autónomo.\n • Habitualmente se presenta como nódulo único >3 cm.\n • La TSH suele encontrarse suprimida.\n • La gammagrafía muestra captación focal aumentada con supresión del resto de la glándula.\n • El término clásico es “nódulo caliente”.\n • La causa más frecuente son mutaciones activadoras del receptor de TSH.\n • El riesgo de malignidad suele ser bajo en nódulos hiperfuncionantes.\n • Graves presenta captación difusa homogénea y TRAb positivos.\n • El bocio multinodular tóxico muestra múltiples focos hiperfuncionantes.\n • La tiroiditis destructiva presenta captación baja de radioyodo.\n • El tratamiento preferido suele ser yodo radiactivo.\n • La cirugía se considera en nódulos grandes o síntomas compresivos.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2711',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 2: PATOLOGÍA TIROIDEA',
    subtema: 'Adenoma tóxico',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q71',
    text: '¿Cuál de las siguientes características permite diferenciar al carcinoma folicular del carcinoma papilar de tiroides?',
    options: [
      'Presencia frecuente de multifocalidad y compromiso ganglionar cervical',
      'Diseminación predominante por vía linfática hacia cadenas regionales',
      'Identificación histológica de núcleos claros tipo “ojo de huérfana Annie”',
      'Necesidad de demostrar invasión capsular o vascular para el diagnóstico',
      'Asociación con antecedente de irradiación cervical durante la infancia'
    ],
    correctOptionIndex: 3,
    explanation: 'La principal diferencia diagnóstica entre carcinoma folicular y papilar es que el carcinoma folicular requiere demostración histológica de invasión capsular o vascular para confirmar malignidad. El carcinoma papilar, en cambio, se reconoce por sus características nucleares típicas, como los núcleos claros tipo “ojo de huérfana Annie”, además de su tendencia a multifocalidad y diseminación linfática.\n\n🔑 Puntos clave:\n • El carcinoma papilar es el cáncer tiroideo más frecuente.\n • El papilar se disemina principalmente por vía linfática.\n • El folicular se disemina más por vía hematógena (hueso y pulmón).\n • El carcinoma papilar presenta núcleos “ojo de huérfana Annie”.\n • El diagnóstico de carcinoma folicular exige invasión capsular o vascular.\n • La citología por PAAF no siempre diferencia adenoma vs carcinoma folicular.\n • El papilar suele ser multifocal y asociado a ganglios cervicales.\n • La radiación cervical es factor de riesgo importante para carcinoma papilar.\n • El pronóstico del papilar suele ser excelente en estadios tempranos.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2716',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 2: PATOLOGÍA TIROIDEA',
    subtema: 'Carcinoma de Tiroides',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q72',
    text: 'Un hombre de 34 años consulta por diarrea crónica, pérdida de peso y una masa tiroidea cervical. Los estudios muestran elevación marcada de calcitonina sérica y la biopsia confirma carcinoma medular de tiroides. ¿Cuál de las siguientes afirmaciones sobre esta neoplasia es INCORRECTA?',
    options: [
      'Puede presentarse de forma esporádica o familiar asociada a mutaciones RET',
      'El carcinoma medular familiar suele ser menos agresivo que el asociado a MEN 2B',
      'La elevación sérica de calcitonina constituye un marcador útil de recurrencia tumoral',
      'Las células tumorales derivan del epitelio folicular y captan radioyodo de forma eficiente',
      'El tratamiento principal consiste en resección quirúrgica completa de la lesión'
    ],
    correctOptionIndex: 3,
    explanation: 'La opción incorrecta es la d. El carcinoma medular de tiroides deriva de las células C parafoliculares productoras de calcitonina y no de las células foliculares tiroideas. Por esta razón, no capta radioyodo y el tratamiento con yodo radiactivo no es útil. La calcitonina sérica es un marcador fundamental tanto para diagnóstico como para seguimiento y detección de recurrencia.\n\n🔑 Puntos clave:\n • El carcinoma medular representa aproximadamente 5% de los cánceres tiroideos.\n • Se origina en células C parafoliculares productoras de calcitonina.\n • Puede ser esporádico o hereditario asociado a mutaciones RET.\n • Se relaciona con MEN 2A y MEN 2B.\n • MEN 2B suele asociarse a formas más agresivas.\n • La calcitonina sérica es marcador tumoral clave.\n • También puede elevarse el CEA (antígeno carcinoembrionario).\n • No capta radioyodo porque no deriva de células foliculares.\n • El tratamiento principal es cirugía tiroidea completa.\n • Debe realizarse estudio genético RET en pacientes diagnosticados.\n • El tamizaje familiar es fundamental en formas hereditarias.\n • La enfermedad avanzada puede requerir terapias paliativas sistémicas.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2716',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 2: PATOLOGÍA TIROIDEA',
    subtema: 'Carcinoma Medular de Tiroides',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q73',
    text: 'Un nódulo tiroideo sometido a biopsia por aspiración con aguja fina muestra una citología compatible con “neoplasia folicular”. ¿A qué categoría de la clasificación Bethesda corresponde este resultado?',
    options: [
      'Categoría II',
      'Categoría III',
      'Categoría IV',
      'Categoría V',
      'Categoría VI'
    ],
    correctOptionIndex: 2,
    explanation: 'La categoría IV de Bethesda corresponde a “Neoplasia folicular” o “sospechosa de neoplasia folicular” y se asocia con un riesgo intermedio de malignidad (15–30%). La citología no permite distinguir adenoma folicular de carcinoma folicular, ya que el diagnóstico definitivo requiere demostrar invasión capsular o vascular en el estudio histopatológico.\n\n🔑 Puntos clave:\n • El sistema Bethesda clasifica citología tiroidea en seis categorías diagnósticas.\n • Bethesda I: muestra insuficiente o no diagnóstica.\n • Bethesda II: benigno con muy bajo riesgo de malignidad.\n • Bethesda III (AUS/FLUS): atipia indeterminada con riesgo bajo-intermedio.\n • Bethesda IV: neoplasia folicular con riesgo aproximado de 15–30%.\n • Bethesda V: sospechoso de malignidad con riesgo elevado (60–75%).\n • Bethesda VI: malignidad confirmada citológicamente (97–100%).',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2718',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 2: PATOLOGÍA TIROIDEA',
    subtema: 'Nódulo Tiroideo',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q74',
    text: '¿Cuál de las siguientes afirmaciones sobre la etiología del síndrome de Cushing es CORRECTA?',
    options: [
      'La causa más frecuente de síndrome de Cushing endógeno es el carcinoma suprarrenal productor de cortisol',
      'La secreción ectópica de ACTH ocurre principalmente en adenomas hipofisarios corticotropos pequeños',
      'Los macroadenomas hipofisarios representan la mayoría de casos de enfermedad de Cushing',
      'El uso crónico de glucocorticoides constituye la causa más frecuente de síndrome de Cushing',
      'La hiperplasia suprarrenal macronodular ACTH-independiente se asocia típicamente a concentraciones elevadas de ACTH'
    ],
    correctOptionIndex: 3,
    explanation: 'La causa más frecuente de síndrome de Cushing es el uso exógeno de glucocorticoides. Entre las causas endógenas, la enfermedad de Cushing secundaria a adenoma hipofisario productor de ACTH es la más común. La secreción ectópica de ACTH suele originarse en tumores neuroendocrinos, especialmente carcinoma microcítico pulmonar y carcinoides. Los adenomas hipofisarios corticotropos suelen ser microadenomas y no macroadenomas.\n\n🔑 Puntos clave:\n • La causa más frecuente global de síndrome de Cushing es el uso de glucocorticoides exógenos.\n • La enfermedad de Cushing corresponde específicamente a adenoma hipofisario productor de ACTH.\n • La enfermedad de Cushing es la causa endógena más frecuente.\n • Más del 90% de los casos hipofisarios corresponden a microadenomas.\n • Los macroadenomas corticotropos son menos frecuentes pero más agresivos localmente.\n • La secreción ectópica de ACTH suele originarse en carcinoma microcítico pulmonar o tumores carcinoides.\n • La producción ectópica de ACTH es más frecuente en varones.\n • El adenoma suprarrenal productor de cortisol produce hipercortisolismo ACTH-independiente.\n • El carcinoma suprarrenal puede secretar cortisol y andrógenos simultáneamente.\n • La hiperplasia suprarrenal macronodular ACTH-independiente cursa con ACTH baja.\n • Mutaciones PRKACA pueden encontrarse en adenomas suprarrenales productores de cortisol.\n • El exceso crónico de cortisol genera HTA, diabetes, osteoporosis e inmunosupresión.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., págs. 2723-2724',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 4: PATOLOGÍA SUPRARRENAL',
    subtema: 'Patología Suprarrenal (Síndrome de Cushing)',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q75',
    text: '¿Cuál de las siguientes manifestaciones clínicas NO es típica del síndrome de Cushing?',
    options: [
      'Hipopotasemia e hipertensión diastólica por efecto mineralocorticoide',
      'Hiperpigmentación intensa en cuadros por secreción ectópica de ACTH',
      'Debilidad muscular proximal secundaria a catabolismo proteico',
      'Hipoglucemia recurrente por aumento de sensibilidad a la insulina',
      'Estrías violáceas amplias asociadas a fragilidad cutánea'
    ],
    correctOptionIndex: 3,
    explanation: 'La opción incorrecta es la d. El exceso de glucocorticoides genera resistencia a la insulina y aumento de gluconeogénesis hepática, favoreciendo hiperglucemia y diabetes mellitus, no hipoglucemia. Las demás manifestaciones reflejan los efectos catabólicos, mineralocorticoides y endocrinológicos del hipercortisolismo crónico.\n\n🔑 Puntos clave:\n • El cortisol aumenta gluconeogénesis y resistencia a la insulina.\n • Son frecuentes hiperglucemia y diabetes mellitus.\n • El exceso de cortisol produce catabolismo muscular y debilidad proximal.\n • Las estrías violáceas anchas reflejan adelgazamiento dérmico.\n • La fragilidad capilar causa equimosis fáciles.\n • El cortisol puede activar receptores mineralocorticoides.\n • Esto ocasiona hipertensión, hipopotasemia y alcalosis metabólica.\n • La secreción ectópica de ACTH puede producir hiperpigmentación intensa.\n • Los síntomas psiquiátricos incluyen depresión, irritabilidad y psicosis.\n • Existe aumento del riesgo tromboembólico y cardiovascular.\n • La osteoporosis y fracturas vertebrales son complicaciones frecuentes.\n • El síndrome de Cushing puede causar hipogonadismo y amenorrea.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2725',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 4: PATOLOGÍA SUPRARRENAL',
    subtema: 'Patología Suprarrenal (Síndrome de Cushing)',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q76',
    text: 'Una mujer de 38 años consulta por aumento progresivo de peso, hipertensión arterial de difícil control y debilidad muscular proximal. Al examen físico presenta obesidad centrípeta, estrías violáceas amplias y equimosis fáciles. El cortisol libre urinario en 24 horas está elevado en tres determinaciones consecutivas. La ACTH plasmática reporta 2 pg/mL. ¿Cuál es el diagnóstico más probable?',
    options: [
      'Enfermedad de Cushing secundaria a microadenoma hipofisario',
      'Producción ectópica de ACTH por carcinoma microcítico pulmonar',
      'Síndrome de Cushing independiente de ACTH de origen suprarrenal',
      'Pseudo-Cushing asociado a obesidad y depresión mayor crónica',
      'Hiperplasia hipofisaria reactiva secundaria a secreción elevada de CRH'
    ],
    correctOptionIndex: 2,
    explanation: 'Una ACTH plasmática suprimida (<5 pg/mL) en un paciente con hipercortisolismo confirmado orienta a síndrome de Cushing ACTH-independiente, generalmente secundario a adenoma, carcinoma o hiperplasia suprarrenal productora de cortisol. En los cuadros ACTH-dependientes, la ACTH suele encontrarse normal o elevada.\n\n🔑 Puntos clave:\n • El diagnóstico inicial de Cushing puede realizarse con cortisol libre urinario elevado.\n • También se utilizan cortisol salival nocturno y prueba de supresión con dexametasona.\n • ACTH baja (<5 pg/mL) indica origen suprarrenal ACTH-independiente.\n • ACTH normal o alta (>15 pg/mL) orienta a causas ACTH-dependientes.\n • La enfermedad de Cushing corresponde a adenoma hipofisario productor de ACTH.\n • La secreción ectópica de ACTH suele producir cuadros más graves e hipopotasemia.\n • La RM hipofisaria se utiliza en sospecha de enfermedad de Cushing.\n • La prueba con CRH y dexametasona ayuda en el diagnóstico diferencial.\n • El muestreo de seno petroso inferior diferencia origen hipofisario vs ectópico.\n • Las causas suprarrenales incluyen adenoma, carcinoma e hiperplasia bilateral.\n • Manifestaciones clásicas: obesidad centrípeta, estrías violáceas y debilidad proximal.\n • El hipercortisolismo aumenta riesgo cardiovascular, infeccioso y tromboembólico.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2726',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 4: PATOLOGÍA SUPRARRENAL',
    subtema: 'Patología Suprarrenal (Síndrome de Cushing)',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q77',
    text: 'Una mujer con obesidad centrípeta, estrías violáceas y debilidad muscular proximal presenta cortisol libre urinario elevado en 24 horas. La ACTH plasmática reporta 3 pg/mL (baja). Según el algoritmo diagnóstico del síndrome de Cushing, ¿cuál es el siguiente paso más apropiado?',
    options: [
      'Solicitar resonancia magnética hipofisaria con prueba de CRH',
      'Realizar muestreo de seno petroso inferior para localizar secreción ectópica',
      'Solicitar tomografía o resonancia de glándulas suprarrenales',
      'Repetir cortisol salival nocturno para confirmar origen hipofisario',
      'Iniciar búsqueda de carcinoma microcítico pulmonar productor de ACTH'
    ],
    correctOptionIndex: 2,
    explanation: 'En el algoritmo diagnóstico del síndrome de Cushing, una vez confirmado el hipercortisolismo, se mide ACTH plasmática. Cuando la ACTH está baja (<5 pg/mL), el cuadro corresponde a síndrome de Cushing ACTH-independiente, lo que orienta a origen suprarrenal. El siguiente paso consiste en estudiar las glándulas suprarrenales mediante TC o RM para identificar adenoma, carcinoma o hiperplasia suprarrenal.\n\n🔑 Puntos clave:\n • Paso 1: confirmar hipercortisolismo.\n • Pruebas iniciales: cortisol libre urinario, cortisol salival nocturno y supresión con dexametasona.\n • Paso 2: medir ACTH plasmática.\n • ACTH baja (<5 pg/mL) → síndrome de Cushing ACTH-independiente.\n • Las causas principales son adenoma suprarrenal, carcinoma suprarrenal e hiperplasia bilateral.\n • El siguiente paso es imagen suprarrenal (TC o RM).\n • ACTH normal o alta (>15 pg/mL) → síndrome ACTH-dependiente.\n • En ACTH elevada se solicitan RM hipofisaria y pruebas dinámicas.\n • El muestreo de seno petroso inferior diferencia origen hipofisario vs ectópico.\n • La enfermedad de Cushing corresponde a adenoma hipofisario productor de ACTH.\n • La secreción ectópica de ACTH suele producir hipopotasemia marcada.\n • Manifestaciones clásicas: obesidad centrípeta, estrías violáceas y debilidad proximal.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2726',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 4: PATOLOGÍA SUPRARRENAL',
    subtema: 'Patología Suprarrenal (Síndrome de Cushing)',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q78',
    text: 'Un hombre de 42 años consulta por hipertensión arterial resistente al tratamiento y debilidad muscular. Los laboratorios muestran hipopotasemia persistente y alcalosis metabólica. La actividad de renina plasmática está suprimida y la concentración de aldosterona plasmática elevada. ¿Cuál es el diagnóstico más probable?',
    options: [
      'Hiperaldosteronismo primario por adenoma suprarrenal productor de aldosterona',
      'Hipertensión renovascular con activación secundaria del sistema renina-angiotensina',
      'Síndrome de Cushing ACTH-dependiente con exceso secundario de mineralocorticoides',
      'Feocromocitoma productor de catecolaminas con vasoconstricción sostenida',
      'Hiperplasia suprarrenal congénita por déficit parcial de 21-hidroxilasa'
    ],
    correctOptionIndex: 0,
    explanation: 'El hiperaldosteronismo primario debe sospecharse en pacientes con hipertensión e hipopotasemia. La combinación de aldosterona elevada con renina suprimida es característica y refleja secreción autónoma de aldosterona independiente del sistema renina-angiotensina. La causa más frecuente es el adenoma suprarrenal productor de aldosterona o la hiperplasia suprarrenal bilateral.\n\n🔑 Puntos clave:\n • El hiperaldosteronismo primario es una causa frecuente de hipertensión secundaria.\n • Debe sospecharse en hipertensión resistente o asociada a hipopotasemia.\n • La aldosterona aumenta reabsorción de sodio y excreción renal de potasio.\n • Produce hipertensión, hipopotasemia y alcalosis metabólica.\n • La renina plasmática suele estar suprimida.\n • El índice aldosterona/renina (ARR) es la prueba de tamizaje inicial.\n • ARR elevado sugiere hiperaldosteronismo primario.\n • La prueba confirmatoria clásica es la sobrecarga salina con falta de supresión de aldosterona.\n • Las causas más frecuentes son adenoma productor de aldosterona e hiperplasia bilateral.\n • La TC suprarrenal ayuda a identificar lesiones >1 cm.\n • El muestreo venoso suprarrenal diferencia enfermedad unilateral vs bilateral.\n • Adenoma unilateral → adrenalectomía laparoscópica.\n • Hiperplasia bilateral → tratamiento con antagonistas mineralocorticoides (espironolactona/eplerenona).\n • La espironolactona puede causar ginecomastia y disfunción sexual.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., págs. 2728-2729',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 4: PATOLOGÍA SUPRARRENAL',
    subtema: 'Patología Suprarrenal (Hiperaldosteronismo)',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q79',
    text: 'Una mujer de 36 años consulta por fatiga progresiva, pérdida de peso, náuseas y mareos al ponerse de pie. Al examen físico presenta hiperpigmentación en pliegues palmares y mucosa oral. Los laboratorios muestran hiponatremia e hiperpotasemia. ¿Cuál es el diagnóstico más probable?',
    options: [
      'Insuficiencia suprarrenal secundaria por adenoma hipofisario no funcionante',
      'Síndrome de Cushing ACTH-dependiente de origen hipofisario',
      'Insuficiencia suprarrenal primaria autoinmunitaria (enfermedad de Addison)',
      'Hiperaldosteronismo primario por adenoma suprarrenal unilateral',
      'Feocromocitoma productor de catecolaminas con activación simpática crónica'
    ],
    correctOptionIndex: 2,
    explanation: 'La insuficiencia suprarrenal primaria se caracteriza por destrucción de la corteza suprarrenal con déficit de glucocorticoides y mineralocorticoides. La hiperpigmentación ocurre por aumento compensatorio de ACTH y péptidos derivados de POMC con actividad melanocítica. La combinación de hiponatremia e hiperpotasemia es clásica por déficit de aldosterona. La causa más frecuente es suprarrenalitis autoinmunitaria.\n\n🔑 Puntos clave:\n • La causa más frecuente de insuficiencia suprarrenal primaria es autoinmunitaria.\n • La enfermedad de Addison produce déficit de cortisol y aldosterona.\n • La ACTH está elevada en insuficiencia suprarrenal primaria.\n • La hiperpigmentación es característica por exceso de ACTH.\n • Hiponatremia e hiperpotasemia son hallazgos clásicos.\n • La hipotensión ortostática es frecuente por pérdida de sodio y volumen.\n • La insuficiencia suprarrenal secundaria afecta principalmente glucocorticoides.\n • En insuficiencia secundaria no suele haber hiperpigmentación ni hiperpotasemia.\n • El uso crónico de glucocorticoides es causa frecuente de insuficiencia suprarrenal secundaria.\n • La suspensión brusca de glucocorticoides puede precipitar crisis suprarrenal.\n • La crisis adrenal puede manifestarse con shock, vómitos e hipoglucemia.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., págs. 2734-2735',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 4: PATOLOGÍA SUPRARRENAL',
    subtema: 'Patología Suprarrenal (Insuficiencia Suprarrenal)',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q80',
    text: 'Un paciente con sospecha de insuficiencia suprarrenal presenta fatiga, pérdida de peso e hipotensión. ¿Cuál de los siguientes hallazgos orienta MÁS hacia insuficiencia suprarrenal primaria y NO secundaria?',
    options: [
      'Hipoglucemia por déficit de glucocorticoides',
      'Fatiga crónica y debilidad generalizada',
      'Hiperpigmentación cutánea con hiperpotasemia',
      'Náuseas, anorexia y pérdida ponderal progresiva',
      'Hiponatremia secundaria a déficit de cortisol'
    ],
    correctOptionIndex: 2,
    explanation: 'La insuficiencia suprarrenal primaria (enfermedad de Addison) compromete tanto glucocorticoides como mineralocorticoides, lo que produce hiperpotasemia por déficit de aldosterona. Además, el aumento compensatorio de ACTH genera hiperpigmentación cutánea. En la insuficiencia suprarrenal secundaria, el problema se origina en hipófisis o hipotálamo, por lo que la aldosterona suele conservarse y no aparece hiperpigmentación.\n\n🔑 Puntos clave:\n • Insuficiencia suprarrenal primaria = daño directo de la glándula suprarrenal.\n • Insuficiencia suprarrenal secundaria = alteración hipotálamo-hipofisaria o supresión por glucocorticoides.\n • La causa más frecuente de insuficiencia primaria es suprarrenalitis autoinmunitaria.\n • La causa más frecuente de insuficiencia secundaria es suspensión o uso crónico de glucocorticoides.\n • Primaria → ACTH elevada.\n • Secundaria → ACTH baja o inapropiadamente normal.\n • Primaria → hiperpigmentación por exceso de ACTH.\n • Secundaria → NO hay hiperpigmentación.\n • Primaria → déficit de aldosterona con hiperpotasemia.\n • Secundaria → aldosterona generalmente conservada.\n • Ambas pueden presentar hiponatremia y fatiga.\n • Hipotensión y pérdida de peso son frecuentes en ambas formas.\n • La crisis adrenal puede causar shock e hipoglucemia.\n • El tratamiento incluye glucocorticoides; en primaria también mineralocorticoides.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., págs. 2734-2735',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 4: PATOLOGÍA SUPRARRENAL',
    subtema: 'Patología Suprarrenal (Insuficiencia Suprarrenal)',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q81',
    text: 'Una mujer de 61 años con antecedente de lupus eritematoso sistémico tratado con glucocorticoides durante varios años acude a emergencia por hipotensión severa, náuseas, vómitos y confusión. Hace 5 días presentó una infección respiratoria febril y disminuyó por cuenta propia la dosis de prednisona porque “se sentía mejor”. Los laboratorios muestran hiponatremia, glucosa de 52 mg/dL y potasio sérico normal. ¿Cuál es el diagnóstico más probable?',
    options: [
      'Crisis suprarrenal secundaria por supresión crónica del eje hipotálamo-hipófisis-suprarrenal',
      'Enfermedad de Addison autoinmunitaria con destrucción primaria de corteza suprarrenal',
      'Hiperaldosteronismo primario descompensado por infección sistémica',
      'Síndrome de secreción inadecuada de ADH asociado a neumonía viral',
      'Feocromocitoma con hipotensión secundaria a agotamiento catecolaminérgico'
    ],
    correctOptionIndex: 0,
    explanation: 'El antecedente de uso crónico de glucocorticoides y la suspensión/reducción brusca durante una infección sugieren crisis suprarrenal secundaria por supresión del eje HPA. La presencia de hipoglucemia e hiponatremia es típica. El potasio normal ayuda a diferenciarla de insuficiencia suprarrenal primaria, donde existe déficit de aldosterona e hiperpotasemia. La infección actuó como desencadenante del aumento de demanda fisiológica de cortisol.\n\n🔑 Puntos clave:\n • El uso crónico de glucocorticoides es la causa más frecuente de insuficiencia suprarrenal secundaria.\n • La suspensión brusca puede precipitar crisis adrenal.\n • Las infecciones son desencadenantes frecuentes de crisis suprarrenal.\n • En insuficiencia secundaria la ACTH está baja o normal inapropiadamente.\n • La aldosterona suele conservarse en insuficiencia secundaria.\n • Por eso el potasio puede permanecer normal.\n • En Addison primaria existe hiperpotasemia e hiperpigmentación.\n • La hiponatremia ocurre por aumento compensatorio de ADH.\n • La hipoglucemia es frecuente por déficit de cortisol.\n • Manifestaciones típicas: hipotensión, vómitos, dolor abdominal y alteración del sensorio.\n • El tratamiento inmediato es hidrocortisona IV y expansión agresiva de volumen.\n • Los glucocorticoides crónicos siempre deben retirarse de forma gradual.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., págs. 2734-2735',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 4: PATOLOGÍA SUPRARRENAL',
    subtema: 'Patología Suprarrenal (Insuficiencia Suprarrenal)',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q82',
    text: '¿Cuál de las siguientes afirmaciones sobre la hiperplasia suprarrenal congénita es CORRECTA?',
    options: [
      'La deficiencia de 21-hidroxilasa disminuye la producción de andrógenos suprarrenales',
      'La hiperplasia suprarrenal congénita clásica suele cursar con ACTH suprimida',
      'La elevación de 17-hidroxiprogesterona es un hallazgo característico',
      'La forma no clásica suele diagnosticarse en el período neonatal inmediato',
      'El tratamiento con glucocorticoides está contraindicado por riesgo de supresión adrenal'
    ],
    correctOptionIndex: 2,
    explanation: 'La hiperplasia suprarrenal congénita por deficiencia de 21-hidroxilasa produce disminución de cortisol con aumento compensatorio de ACTH y acumulación de precursores esteroideos, especialmente 17-hidroxiprogesterona. Este exceso se desvía hacia síntesis androgénica suprarrenal, causando virilización y alteraciones del desarrollo sexual.\n\n🔑 Puntos clave:\n • La deficiencia de 21-hidroxilasa es la causa más frecuente de HSC.\n • Produce déficit de cortisol con aumento compensatorio de ACTH.\n • La ACTH elevada genera hiperplasia suprarrenal.\n • La 17-hidroxiprogesterona elevada es marcador diagnóstico clásico.\n • Existe aumento de producción androgénica suprarrenal.\n • Las formas clásicas pueden producir pérdida de sal.\n • Hiponatremia e hiperpotasemia sugieren déficit mineralocorticoide.\n • Las niñas pueden presentar genitales ambiguos.\n • La forma no clásica suele aparecer en adolescencia o adultez joven.\n • Manifestaciones tardías: hirsutismo, acné y oligomenorrea.\n • El tratamiento incluye glucocorticoides ± mineralocorticoides.\n • Las dosis deben aumentarse en situaciones de estrés fisiológico.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2738',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 4: PATOLOGÍA SUPRARRENAL',
    subtema: 'Patología Suprarrenal (Hiperplasia Suprarrenal Congénita)',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q83',
    text: 'Un varón de 38 años acude a consulta por episodios recurrentes de cefalea intensa, palpitaciones y sudoración profusa que aparecen de forma súbita y duran varios minutos. Refiere sensación de ansiedad durante las crisis. En el examen físico, durante uno de los episodios, presenta presión arterial de 190/110 mmHg y taquicardia. El médico sospecha un feocromocitoma.\n¿Cuál de las siguientes manifestaciones constituye, junto con las demás descritas, la tríada clásica de esta enfermedad? (Harrison, Medicina Interna, 20.ª ed., pág. 2740)',
    options: [
      'Hiperhidrosis',
      'Dolor abdominal',
      'Pérdida de peso',
      'Hipotensión ortostática',
      'Poliuria'
    ],
    correctOptionIndex: 0,
    explanation: 'El feocromocitoma es un tumor productor de catecolaminas cuya presentación clásica consiste en la tríada de cefalea, palpitaciones e hiperhidrosis (sudoración profusa), generalmente asociada a hipertensión episódica o sostenida.\n\n🟩 Concepto clave:\nFeocromocitoma = Cefalea + Palpitaciones + Hiperhidrosis + Hipertensión.\n\n💡 Puntos clave:\n• La hipertensión es la manifestación más frecuente.\n• Los paroxismos pueden desencadenarse por cirugía, ejercicio, cambios posturales o fármacos.\n• El exceso de catecolaminas puede producir arritmias, edema pulmonar e insuficiencia cardíaca.\n• Regla de los "10": 10% bilaterales, 10% extraadrenales y 10% malignos.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2740',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 7: CASOS CLÍNICOS',
    subtema: 'Feocromocitoma (Casos Clínicos)',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q84',
    text: 'Un varón de 35 años consulta por episodios recurrentes de cefalea intensa, palpitaciones y sudoración profusa acompañados de cifras tensionales de hasta 220/120 mmHg. Los episodios son súbitos, duran varios minutos y se desencadenan ocasionalmente con el ejercicio. Los estudios bioquímicos muestran elevación marcada de metanefrinas plasmáticas. Se decide realizar estudios de imagen para localizar la lesión responsable.\n¿Cuál es la localización más frecuente de este tumor? (Harrison, Medicina Interna, 20.ª ed., pág. 2741)',
    options: [
      'Cuerpo carotídeo',
      'Vejiga urinaria',
      'Tronco simpático torácico',
      'Médula suprarrenal',
      'Órgano de Zuckerkandl'
    ],
    correctOptionIndex: 3,
    explanation: 'La combinación de crisis hipertensivas paroxísticas, cefalea, palpitaciones y sudoración sugiere un tumor productor de catecolaminas. La mayoría de estas neoplasias se originan en la médula suprarrenal, mientras que las localizadas fuera de ella reciben el nombre de paragangliomas.\n\n🟩 Concepto clave:\n80% de los tumores productores de catecolaminas se localizan en la médula suprarrenal.\n\n💡 Perla de examen:\nSi el caso menciona cefalea + palpitaciones + diaforesis + hipertensión paroxística, piensa inmediatamente en un tumor productor de catecolaminas y recuerda que su localización más frecuente es la médula suprarrenal.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2741',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 7: CASOS CLÍNICOS',
    subtema: 'Feocromocitoma (Casos Clínicos)',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q85',
    text: 'Una mujer de 28 años consulta por pérdida de peso de 8 kg en los últimos 3 meses, palpitaciones, intolerancia al calor y nerviosismo. Al examen físico presenta bocio difuso, taquicardia y retracción palpebral. Los análisis muestran TSH suprimida y elevación de T4 libre. Se sospecha una enfermedad autoinmunitaria como causa del cuadro.\n¿Cuál de los siguientes estudios permite establecer el diagnóstico de certeza de esta enfermedad? (Harrison, Medicina Interna, 20.ª ed., pág. 2706)',
    options: [
      'Dosaje sérico de tiroglobulina',
      'Captación tiroidea de radioyodo (¹²³I)',
      'Resonancia magnética de hipófisis',
      'Ecografía cervical simple',
      'Velocidad de eritrosedimentación'
    ],
    correctOptionIndex: 1,
    explanation: 'La paciente presenta un cuadro típico de hipertiroidismo autoinmunitario. Según Harrison, el diagnóstico se establece mediante estudios de captación tiroidea con radioisótopos, que permiten demostrar una captación difusa aumentada característica.\n\n🟩 Concepto clave:\nTSH baja + T4 libre elevada + captación difusa aumentada de radioyodo = enfermedad de Graves.\n\n💡 Perla de examen:\nAnte un paciente con hipertiroidismo, bocio difuso y oftalmopatía, el estudio clásico para confirmar el origen autoinmunitario es la captación tiroidea con radioyodo.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2706',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 7: CASOS CLÍNICOS',
    subtema: 'Enfermedad de Graves (Casos Clínicos)',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q86',
    text: 'Un niño de 8 años es llevado a consulta por fiebre, odinofagia y dolor intenso en la región anterior del cuello de inicio agudo. Al examen físico presenta aumento de volumen doloroso de la glándula tiroides, eritema local y disfagia. Los análisis muestran leucocitosis y elevación de reactantes de fase aguda.\n¿Cuál es el hallazgo de laboratorio más característico que apoya este diagnóstico? (Harrison, Medicina Interna, 20.ª ed., pág. 2708)',
    options: [
      'Anticuerpos anti-TPO positivos',
      'Hipercalcemia persistente',
      'Velocidad de eritrosedimentación (VSG) marcadamente elevada',
      'TSH elevada con T4 libre disminuida',
      'Anticuerpos contra receptor de TSH positivos'
    ],
    correctOptionIndex: 2,
    explanation: 'La presentación aguda con fiebre, dolor tiroideo, eritema local y leucocitosis es sugestiva de tiroiditis aguda supurativa. En niños, esta entidad suele asociarse a una anomalía congénita conocida como persistencia del seno (o receso) piriforme, que facilita la diseminación de infecciones desde la faringe hacia la glándula tiroides.\n\n🟩 Concepto clave:\nNiño + tiroiditis aguda supurativa → buscar persistencia del seno piriforme.\n\n💡 Perla de examen:\nCuando un examen mencione un niño con infección tiroidea recurrente o absceso tiroideo, la asociación clásica es una fístula originada en el seno piriforme, generalmente del lado izquierdo.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2708',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 7: CASOS CLÍNICOS',
    subtema: 'Tiroiditis (Casos Clínicos)',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q87',
    text: 'Una mujer de 32 años consulta por dolor en la región anterior del cuello de dos semanas de evolución. Refiere que los síntomas comenzaron una semana después de un cuadro viral de vías respiratorias superiores. Presenta malestar general, febrícula, palpitaciones y pérdida de peso. Al examen físico se evidencia una glándula tiroides aumentada de tamaño y muy dolorosa a la palpación. Los análisis muestran TSH disminuida, T4 libre elevada y velocidad de eritrosedimentación marcadamente aumentada.\n¿Cuál de los siguientes hallazgos sería más característico de esta enfermedad? (Harrison, Medicina Interna, 20.ª ed., pág. 2708)',
    options: [
      'Captación de yodo radiactivo aumentada',
      'Anticuerpos anti-TPO fuertemente positivos',
      'Captación de yodo radiactivo disminuida',
      'Producción aumentada de hormonas por hiperfunción glandular',
      'Oftalmopatía infiltrativa'
    ],
    correctOptionIndex: 2,
    explanation: 'La paciente presenta una tiroiditis subaguda (de De Quervain): antecedente viral, dolor tiroideo, VSG elevada y fase inicial de tirotoxicosis. A diferencia del hipertiroidismo por aumento de síntesis hormonal, aquí existe destrucción folicular con liberación de hormonas previamente almacenadas, por lo que la captación de yodo radiactivo está disminuida.\n\n🟩 Concepto clave:\nDolor tiroideo + antecedente viral + VSG elevada + captación baja de yodo = Tiroiditis subaguda.\n\n💡 Perla de examen:\nLa evolución clásica ocurre en tres fases:\n• Fase tirotóxica: T4 elevada, TSH baja.\n• Fase hipotiroidea transitoria: disminuyen las hormonas tiroideas.\n• Recuperación: la mayoría recupera función tiroidea normal en meses.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2708',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 7: CASOS CLÍNICOS',
    subtema: 'Tiroiditis (Casos Clínicos)',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q88',
    text: 'Una mujer de 67 años con fibrilación auricular recibe amiodarona desde hace varios años. Consulta por pérdida de peso, nerviosismo y palpitaciones. Los estudios muestran TSH disminuida y T4 libre elevada. El endocrinólogo explica que la amiodarona contiene una gran cantidad de yodo y que normalmente la glándula tiroides posee un mecanismo de autorregulación para evitar la síntesis excesiva de hormonas tiroideas.\n¿A qué mecanismo fisiológico se refiere? (Harrison, Medicina Interna, 20.ª ed., pág. 2708)',
    options: [
      'Efecto Jod-Basedow',
      'Efecto Plummer',
      'Fenómeno de Marine-Lenhart',
      'Autorregulación mediada por TSI',
      'Efecto Wolff-Chaikoff'
    ],
    correctOptionIndex: 4,
    explanation: 'El efecto Wolff-Chaikoff es un mecanismo de autorregulación por el cual una carga elevada de yodo inhibe transitoriamente la organificación del yodo y la síntesis de hormonas tiroideas. La mayoría de las personas escapan posteriormente de este efecto y mantienen una función tiroidea normal.\n\n🟩 Concepto clave:\nExceso de yodo → inhibición transitoria de la síntesis hormonal → efecto Wolff-Chaikoff.\n\n💡 Perla de examen:\nLa tirotoxicosis inducida por amiodarona tipo 1 suele aparecer cuando el paciente no logra escapar del efecto del yodo o presenta una enfermedad tiroidea previa susceptible al fenómeno de Jod-Basedow.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2708',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 7: CASOS CLÍNICOS',
    subtema: 'Tiroides y Amiodarona (Casos Clínicos)',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q89',
    text: 'Una mujer de 72 años consulta por palpitaciones, pérdida de peso de varios meses de evolución y disnea de esfuerzo. Refiere antecedentes de bocio de larga data. Al examen físico presenta bocio nodular de superficie irregular y fibrilación auricular. Los análisis muestran TSH suprimida con T4 libre discretamente elevada.\n¿Cuál es el tratamiento definitivo de elección para esta paciente? (Harrison, Medicina Interna, 20.ª ed., pág. 2713)',
    options: [
      'Metimazol de por vida',
      'Propranolol como tratamiento único',
      'Levotiroxina supresiva',
      'Observación periódica',
      'Yodo radiactivo'
    ],
    correctOptionIndex: 4,
    explanation: 'La paciente presenta hallazgos compatibles con bocio multinodular tóxico, caracterizado por autonomía funcional de múltiples nódulos tiroideos. En estos pacientes, el tratamiento de elección definitivo suele ser el yodo radiactivo (¹³¹I), que destruye selectivamente las áreas hiperfuncionantes autónomas.\n\n🟩 Concepto clave:\nBocio multinodular tóxico → tratamiento de elección definitivo: yodo radiactivo.\n\n💡 Perla de examen:\nA diferencia de la enfermedad de Graves, el bocio multinodular tóxico suele presentarse en adultos mayores y es frecuente que debute con fibrilación auricular, pérdida de peso o manifestaciones cardiovasculares.\n\n🔑 Dato para recordar: La principal diferencia con el bocio multinodular no tóxico es la presencia de autonomía funcional de los nódulos, que producen hormona tiroidea independientemente de la TSH.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2713',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 7: CASOS CLÍNICOS',
    subtema: 'Bocio multinodular tóxico (Casos Clínicos)',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q90',
    text: 'Una mujer de 45 años consulta por palpitaciones, pérdida de peso de 5 kg y nerviosismo progresivo. Al examen físico no presenta oftalmopatía ni bocio difuso. La palpación cervical revela un nódulo único de aproximadamente 2,5 cm en el lóbulo derecho de la tiroides. Los análisis muestran TSH suprimida con T4 libre ligeramente elevada. Se realiza una gammagrafía tiroidea para confirmar la sospecha diagnóstica.\n¿Cuál de los siguientes hallazgos es más probable encontrar? (Harrison, Medicina Interna, 20.ª ed., pág. 2713)',
    options: [
      'Captación difusa aumentada en toda la glándula',
      'Ausencia completa de captación tiroidea',
      'Captación aumentada en un nódulo con supresión del resto del tejido tiroideo',
      'Captación heterogénea en múltiples nódulos bilaterales',
      'Captación normal en toda la glándula'
    ],
    correctOptionIndex: 2,
    explanation: 'La paciente presenta un nódulo tiroideo autónomo hiperfuncionante (adenoma tóxico). Estos nódulos producen hormona tiroidea independientemente de la TSH, lo que ocasiona supresión de la TSH y por ende, hipofunción / supresión de la captación en el resto de la glándula tiroidea normal circundante.\n\n🟩 Concepto clave:\nNódulo único + TSH baja + gammagrafía con nódulo caliente = adenoma tóxico.\n\n💡 Perla de examen:\n🔑 La mayoría de estos pacientes presentan un nódulo de 2-3 cm y síntomas leves de tirotoxicosis.\n🔑 El hallazgo gammagráfico clásico es un "nódulo caliente" con disminución o ausencia de captación en el resto de la glándula.\n🔑 El tratamiento de elección suele ser yodo radiactivo, ya que destruye selectivamente el tejido autónomo hiperfuncionante.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2713',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 7: CASOS CLÍNICOS',
    subtema: 'Adenoma tóxico (Casos Clínicos)',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q91',
    text: 'Una mujer de 35 años consulta por una masa cervical indolora de crecimiento lento. Al examen físico se identifica un nódulo tiroideo de 2 cm. Se realiza tiroidectomía y el estudio anatomopatológico demuestra una neoplasia con estructuras papilares y núcleos claros con surcos nucleares. La paciente pregunta sobre la posibilidad de diseminación de su enfermedad.\n¿Cuál es la vía de diseminación más característica de este tumor? (Harrison, Medicina Interna, 20.ª ed., pág. 2715)',
    options: [
      'Diseminación peritoneal',
      'Invasión directa traqueal como forma inicial habitual',
      'Diseminación linfática hacia ganglios cervicales',
      'Diseminación hematógena exclusiva al hígado',
      'Diseminación temprana al sistema nervioso central'
    ],
    correctOptionIndex: 2,
    explanation: 'El carcinoma papilar se caracteriza por metastatizar principalmente por vía linfática. Es frecuente encontrar compromiso de ganglios cervicales al diagnóstico, incluso en pacientes jóvenes.\n\n🟩 Concepto clave:\nPapilar → vía linfática.\nFolicular → vía hematógena.\n\n💡 Perla de examen:\nLa presencia de adenopatías cervicales no empeora significativamente el excelente pronóstico que suele tener este tumor.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2715',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 7: CASOS CLÍNICOS',
    subtema: 'Cáncer de tiroides (Casos Clínicos)',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q92',
    text: 'Un hombre de 42 años consulta por una masa cervical de crecimiento progresivo. La ecografía muestra un nódulo sólido tiroideo de 2,5 cm. Se realiza tiroidectomía y el estudio anatomopatológico confirma una neoplasia originada en las células parafoliculares (células C) de la tiroides. Durante la evaluación, el endocrinólogo considera la posibilidad de una forma hereditaria de la enfermedad.\n¿Cuál de los siguientes estudios debe solicitarse de manera rutinaria en este paciente? (Harrison, Medicina Interna, 20.ª ed., pág. 2717)',
    options: [
      'Anticuerpos anti-TPO',
      'Mutación del gen BRAF',
      'Estudio de mutaciones del gen RET',
      'Anticuerpos contra receptor de TSH',
      'Mutación del gen RAS'
    ],
    correctOptionIndex: 2,
    explanation: 'El carcinoma medular de tiroides puede presentarse de forma esporádica o familiar. Debido a su asociación con los síndromes MEN 2A y MEN 2B, todo paciente diagnosticado debe ser evaluado para mutaciones del protooncogén RET, ya que esto tiene implicancias para el paciente y sus familiares.\n\n🟩 Concepto clave:\nCarcinoma medular de tiroides → buscar mutación RET.\n\n💡 Perla de examen:\n🔑 Si encuentras un carcinoma medular, piensa inmediatamente en MEN 2A o MEN 2B.\n🔑 Antes de la cirugía debe descartarse un feocromocitoma, ya que puede coexistir en estos síndromes.\n🔑 El marcador sérico característico es la calcitonina.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2717',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 7: CASOS CLÍNICOS',
    subtema: 'Cáncer de tiroides (Casos Clínicos)',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q93',
    text: 'Una mujer de 34 años consulta por aumento progresivo de peso en los últimos dos años. Refiere debilidad muscular proximal, irregularidad menstrual y aparición de equimosis ante traumatismos mínimos. Al examen físico presenta obesidad centrípeta, facies redondeada, hipertensión arterial y estrías violáceas abdominales. Los estudios hormonales confirman hipercortisolismo endógeno ACTH-dependiente.\n¿Cuál es la causa más frecuente de este cuadro? (Harrison, Medicina Interna, 20.ª ed., pág. 2724)',
    options: [
      'Carcinoma suprarrenal productor de cortisol',
      'Secreción ectópica de ACTH',
      'Adenoma hipofisario corticotropo',
      'Hiperplasia suprarrenal nodular',
      'Administración crónica de glucocorticoides'
    ],
    correctOptionIndex: 2,
    explanation: 'La paciente presenta manifestations clásicas de síndrome de Cushing. Cuando el hipercortisolismo es ACTH-dependiente endógeno, la causa más frecuente es un adenoma hipofisario productor de ACTH, entidad conocida como enfermedad de Cushing.\n\n🟩 Concepto clave:\nEnfermedad de Cushing = adenoma hipofisario secretor de ACTH.\n\n💡 Perla de examen:\n🔑 No confundir:\n• Síndrome de Cushing: conjunto de manifestaciones por exceso de cortisol, independientemente de la causa.\n• Enfermedad de Cushing: exceso de cortisol secundario a un adenoma hipofisario productor de ACTH.\n🔑 La causa global más frecuente de síndrome de Cushing es el uso crónico de glucocorticoides exógenos, pero la causa endógena más frecuente es el adenoma hipofisario corticotropo.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2724',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 7: CASOS CLÍNICOS',
    subtema: 'Síndrome de Cushing (Casos Clínicos)',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q94',
    text: 'Una mujer de 38 años consulta por aumento progresivo de peso, debilidad muscular proximal y aparición de estrías violáceas en el abdomen durante el último año. Al examen físico presenta obesidad centrípeta, hipertensión arterial y facies redondeada. Ante la sospecha de hipercortisolismo, el endocrinólogo solicita una prueba de cribado.\n¿Cuál de los siguientes estudios forma parte de las pruebas iniciales recomendadas para confirmar este diagnóstico? (Harrison, Medicina Interna, 20.ª ed., pág. 2726)',
    options: [
      'Dosaje sérico de ACTH',
      'Resonancia magnética de hipófisis',
      'Cortisol libre urinario de 24 horas',
      'Cateterismo de senos petrosos inferiores',
      'Tomografía computarizada de suprarrenales'
    ],
    correctOptionIndex: 2,
    explanation: 'La paciente presenta manifestaciones clásicas de síndrome de Cushing. Antes de buscar la causa, debe demostrarse bioquímicamente la existencia de hipercortisolismo. Una de las pruebas iniciales recomendadas es la medición del cortisol libre urinario en 24 horas, que suele encontrarse elevada.\n\n🟩 Concepto clave:\nSospecha de Cushing → primero confirmar hipercortisolismo.\n\n💡 Perla de examen:\nLas tres pruebas de cribado clásicas son:\n• Cortisol libre urinario de 24 horas.\n• Prueba de supresión con dexametasona nocturna (1 mg).\n• Cortisol salival nocturno.\n🔑 ACTH no se solicita inicialmente para confirmar el diagnóstico; se mide después para diferenciar causas ACTH-dependientes e independientes.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2726',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 7: CASOS CLÍNICOS',
    subtema: 'Síndrome de Cushing (Casos Clínicos)',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q95',
    text: 'Una mujer de 48 años consulta por hipertensión arterial resistente al tratamiento. Presenta debilidad muscular y potasio sérico de 2,8 mEq/L. Los estudios hormonales confirman hiperaldosteronismo primario.\n¿Cuál es la etiología más frecuente de este trastorno? (Harrison, Medicina Interna, 20.ª ed., pág. 2728)',
    options: [
      'Carcinoma suprarrenal',
      'Hiperplasia suprarrenal bilateral micronodular',
      'Feocromocitoma',
      'Adenoma hipofisario productor de ACTH',
      'Hiperplasia suprarrenal congénita'
    ],
    correctOptionIndex: 1,
    explanation: 'El hiperaldosteronismo primario se caracteriza por producción autónoma de aldosterona, causando hipertensión e hipopotasemia. Según Harrison, la causa más frecuente es la hiperplasia suprarrenal bilateral micronodular, superando en frecuencia al adenoma productor de aldosterona (síndrome de Conn).\n\n🟩 Concepto clave:\nHiperaldosteronismo primario → etiología más frecuente: hiperplasia suprarrenal bilateral.\n\n💡 Perla de examen:\n🔑 Si la pregunta dice síndrome de Conn, la respuesta es adenoma productor de aldosterona.\n🔑 Si la pregunta dice etiología más frecuente del hiperaldosteronismo primario, según este Harrison, la respuesta es hiperplasia suprarrenal bilateral micronodular.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2728',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 7: CASOS CLÍNICOS',
    subtema: 'Hiperaldosteronismo (Casos Clínicos)',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q96',
    text: 'Una mujer de 46 años consulta por hipertensión arterial de difícil control a pesar del uso de cuatro antihipertensivos. Refiere debilidad muscular, calambres frecuentes y parestesias. Los exámenes muestran hipopotasemia persistente. El endocrinólogo sospecha hiperaldosteronismo primario y decide solicitar la prueba de tamizaje inicial.\n¿Cuál de los siguientes estudios es el más apropiado para el cribado inicial de esta enfermedad? (Harrison, Medicina Interna, 20.ª ed., pág. 2730)',
    options: [
      'Tomografía computarizada de suprarrenales',
      'Prueba de supresión con dexametasona',
      'Relación aldosterona-renina (ARR)',
      'Metanefrinas plasmáticas libres',
      'Cateterismo de venas suprarrenales'
    ],
    correctOptionIndex: 2,
    explanation: 'La paciente presenta hallazgos sugestivos de hiperaldosteronismo primario (hipertensión resistente e hipopotasemia). El estudio de elección para el tamizaje es la relación aldosterona-renina (ARR). Una aldosterona elevada con renina suprimida produce una ARR aumentada, orientando al diagnóstico.\n\n🟩 Concepto clave:\nHiperaldosteronismo primario → primer paso diagnóstico = relación aldosterona-renina (ARR).\n\n💡 Perla de examen:\n🔑 Sospechar hiperaldosteronismo en:\n• Hipertensión resistente (≥ 3 fármacos).\n• Hipertensión + hipopotasemia espontánea o de fácil inducción por diuréticos.\n• Masa suprarrenal incidental.\n• Hipertensión de inicio temprano con antecedentes de accidente cerebrovascular prematuro o muerte súbita.\n🔑 Después de un ARR positivo, se realizan pruebas de confirmación (vía carga salina u otras) antes de definir la etiología.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2730',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 7: CASOS CLÍNICOS',
    subtema: 'Hiperaldosteronismo (Casos Clínicos)',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q97',
    text: 'Una mujer de 34 años consulta por fatiga progresiva, pérdida de peso de varios meses y mareos al ponerse de pie. Refiere además náuseas ocasionales y deseo intenso por consumir alimentos salados. Al examen físico presenta presión arterial de 90/60 mmHg e hiperpigmentación de pliegues cutáneos y mucosa oral. Los estudios hormonales confirman insuficiencia suprarrenal primaria.\n¿Cuál es la etiología más frecuente de este trastorno en países industrializados? (Harrison, Medicina Interna, 20.ª ed., pág. 2733)',
    options: [
      'Tuberculosis suprarrenal',
      'Metástasis suprarrenales bilaterales',
      'Hemorragia suprarrenal bilateral',
      'Suprarrenalitis autoinmunitaria aislada',
      'Adrenoleucodistrofia'
    ],
    correctOptionIndex: 3,
    explanation: 'La paciente presenta un cuadro típico de insuficiencia suprarrenal primaria (enfermedad de Addison): hiperpigmentación, hipotensión, pérdida de peso y deseo de sal. En los países industrializados, la causa más frecuente es la destrucción autoinmunitaria de la corteza suprarrenal (suprarrenalitis autoinmunitaria).\n\n🟩 Concepto clave:\nAddison en países desarrollados → causa más frecuente: suprarrenalitis autoinmunitaria.\n\n💡 Perla de examen:\n🔑 La insuficiencia suprarrenal primaria se caracteriza por:\n• Cortisolemia ↓\n• Aldosterona ↓\n• ACTH ↑\n• Hiperpigmentación cutáneo-mucosa (por estimulación de los receptores de MSH por exceso de POMC/ACTH).\n🔑 Puede presentarse de forma aislada o como parte de los síndromes poliglandulares autoinmunitarios (APS).',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2733',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 7: CASOS CLÍNICOS',
    subtema: 'Insuficiencia suprarrenal (Casos Clínicos)',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q98',
    text: 'Una mujer de 52 años con antecedente de artritis reumatoide tratada con prednisona durante varios años consulta por fatiga intensa, anorexia, pérdida de peso y mareos. Hace dos semanas suspendió la medicación por cuenta propia. Al examen físico presenta hipotensión arterial, pero no se observa hiperpigmentación cutánea ni mucosa. Los estudios hormonales sugieren insuficiencia suprarrenal.\n¿Cuál es la causa más probable de este cuadro? (Harrison, Medicina Interna, 20.ª ed., pág. 2735)',
    options: [
      'Destrucción autoinmunitaria de la corteza suprarrenal',
      'Tuberculosis suprarrenal bilateral',
      'Supresión del eje hipotálamo-hipófisis-suprarrenal por glucocorticoides exógenos',
      'Hemorragia suprarrenal bilateral',
      'Adrenoleucodistrofia'
    ],
    correctOptionIndex: 2,
    explanation: 'La paciente desarrolla insuficiencia suprarrenal tras la suspensión brusca de glucocorticoides. Según Harrison, la causa más frecuente de insuficiencia suprarrenal secundaria es la supresión yatrogénica del eje HHA por uso crónico de glucocorticoides exógenos.\n\n🟩 Concepto clave:\nInsuficiencia suprarrenal secundaria → causa más frecuente: suspensión de glucocorticoides exógenos.\n\n💡 Perla de examen:\n🔑 Diferencia clásica entre insuficiencia suprarrenal primaria y secundaria:\n• Primaria (Addison): hiperpigmentación frecuente por ACTH elevada.\n• Secundaria: no hay hiperpigmentación porque la ACTH está baja o inapropiadamente normal.\n🔑 Todo paciente que recibe corticoides prolongadamente debe suspenderlos de forma gradual para evitar la supresión del eje hipotálamo-hipófisis-suprarrenal.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2735',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 7: CASOS CLÍNICOS',
    subtema: 'Insuficiencia suprarrenal (Casos Clínicos)',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q99',
    text: 'Un recién nacido de sexo femenino es llevado a evaluación por presentar genitales ambiguos al nacimiento. Durante la primera semana de vida desarrolla vómitos, rechazo de la alimentación, deshidratación e hiponatremia. Los estudios hormonales muestran aumento de ACTH y elevación marcada de 17-hidroxiprogesterona.\n¿Cuál es el defecto enzimático más frecuente responsable de este cuadro? (Harrison, Medicina Interna, 20.ª ed., pág. 2738)',
    options: [
      'Deficiencia de 11β-hidroxilasa',
      'Deficiencia de 17α-hidroxilasa',
      'Deficiencia de 21-hidroxilasa (CYP21A2)',
      'Deficiencia de aromatasa',
      'Deficiencia de 5α-reductasa'
    ],
    correctOptionIndex: 2,
    explanation: 'La combinación de genitales ambiguos en una recién nacida, crisis perdedora de sal y elevación de 17-hidroxiprogesterona es característica de la hiperplasia suprarrenal congénita clásica. Aproximadamente el 90-95% de los casos se deben a déficit de 21-hidroxilasa.\n\n🟩 Concepto clave:\nHSC + pérdida de sal + ↑17-OHP = déficit de 21-hidroxilasa.\n\n💡 Perla de examen:\n🔑 En niñas suele manifestarse con virilización genital al nacimiento.\n🔑 En varones puede pasar desapercibida inicialmente y debutar con una crisis suprarrenal en las primeras semanas de vida.\n🔑 El marcador bioquímico más importante para el diagnóstico es la 17-hidroxiprogesterona elevada.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2738',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 7: CASOS CLÍNICOS',
    subtema: 'Hiperplasia suprarrenal congénita (Casos Clínicos)',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q100',
    text: 'Un hombre de 58 años con diabetes mellitus tipo 2 acude a control. Tiene obesidad (IMC 34 kg/m²), antecedente de infarto de miocardio hace 2 años y HbA1c de 8,4% a pesar de tratamiento con metformina. El médico decide agregar un fármaco que, además de mejorar el control glucémico, haya demostrado disminuir eventos cardiovasculares y favorecer la pérdida de peso.\n¿Cuál de los siguientes grupos farmacológicos sería la mejor elección? (Harrison, Medicina Interna, 20.ª ed., pág. 2866)',
    options: [
      'Sulfonilureas',
      'Inhibidores de DPP-4',
      'Tiazolidinedionas',
      'Meglitinidas',
      'Inhibidores del cotransportador sodio-glucosa tipo 2 (SGLT2)'
    ],
    correctOptionIndex: 4,
    explanation: 'El paciente tiene diabetes tipo 2 asociada a obesidad y enfermedad cardiovascular establecida. Los inhibidores de SGLT2 (canagliflozina, dapagliflozina, empagliflozina) reducen la glucemia mediante glucosuria y han demostrado beneficios cardiovasculares, además de favorecer la pérdida de peso.\n\n🟩 Concepto clave:\nDM2 + enfermedad cardiovascular → pensar en SGLT2.\n\n💡 Perla de examen:\n🔑 Si la pregunta menciona beneficio cardiovascular y pérdida de peso, las respuestas más rentables suelen ser:\n• SGLT2 → glucosuria, protección cardiovascular y renal.\n• Agonistas GLP-1 → pérdida de peso importante y beneficio cardiovascular.\n🔑 Efecto adverso clásico de los SGLT2:\ninfecciones genitales e urinarias por glucosuria.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2866',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 7: CASOS CLÍNICOS',
    subtema: 'Diabetes mellitus (Casos Clínicos)',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q101',
    text: 'Una mujer de 52 años con diabetes mellitus tipo 2 recién diagnosticada presenta HbA1c de 8,1% e IMC de 32 kg/m². No tiene antecedentes cardiovasculares ni insuficiencia renal. Se decide iniciar el fármaco de primera línea.\n¿Cuál es el principal mecanismo de acción del medicamento indicado? (Harrison, Medicina Interna, 20.ª ed., pág. 2866)',
    options: [
      'Aumento de la secreción de insulina por células β',
      'Disminución de la producción hepática de glucosa',
      'Retraso del vaciamiento gástrico',
      'Incremento de la excreción urinaria de glucosa',
      'Inhibición de DPP-4'
    ],
    correctOptionIndex: 1,
    explanation: 'La metformina es el fármaco de primera línea para el tratamiento de la diabetes mellitus tipo 2. Su mecanismo de acción principal consiste en disminuir la producción hepática de glucosa (gluconeogénesis) mediante la activación de la proteína cinasa activada por AMP (AMPK), además de mejorar la sensibilidad periférica a la insulina.\n\n🟩 Concepto clave:\nMetformina → Disminución de la producción hepática de glucosa.\n\n💡 Perla de examen:\n🔑 Es el tratamiento inicial de elección en DM2.\n🔑 No produce aumento de peso.\n🔑 Puede ocasionar diarrea y náuseas.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2866',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 7: CASOS CLÍNICOS',
    subtema: 'Diabetes mellitus (Casos Clínicos)',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q102',
    text: 'Un hombre de 76 años con diabetes mellitus tipo 2 es llevado a emergencia por confusión, sudoración profusa y pérdida transitoria de la conciencia. Su esposa refiere que el paciente desayunó poco esa mañana, pero tomó toda su medicación habitual. La glucemia capilar al ingreso es de 38 mg/dL.\n¿Cuál de los siguientes fármacos es el responsable más probable de este cuadro? (Harrison, Medicina Interna, 20.ª ed., pág. 2866)',
    options: [
      'Metformina',
      'Empagliflozina',
      'Glibenclamida',
      'Sitagliptina',
      'Acarbosa'
    ],
    correctOptionIndex: 2,
    explanation: 'La hipoglucemia es el efecto adverso más importante de las sulfonilureas. El riesgo aumenta en pacientes ancianos, con ingesta insuficiente de alimentos o insuficiencia renal. La glibenclamida es una de las sulfonilureas más frecuentemente asociadas a episodios de hipoglucemia grave.\n\n🟩 Concepto clave:\nSulfonilureas → ↑ secreción de insulina → hipoglucemia y aumento de peso.\n\n💡 Perla de examen:\n🔑 Anciano + hipoglucemia severa + antidiabético oral = pensar primero en una sulfonilurea.\n🔑 Las sulfonilureas incluyen:\n• Glibenclamida\n• Glipizida\n• Glimepirida\n• Gliclazida',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2866',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 7: CASOS CLÍNICOS',
    subtema: 'Diabetes mellitus (Casos Clínicos)',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q103',
    text: 'Un hombre de 64 años con diabetes mellitus tipo 2 es hospitalizado por dolor torácico y se le realiza una angiografía coronaria con medio de contraste yodado. Dos días después desarrolla náuseas, malestar general, dolor abdominal y respiración rápida. Los exámenes muestran:\n• pH: 7,28\n• HCO₃⁻: 14 mEq/L\n• Lactato sérico elevado\n• Creatinina: 3,1 mg/dL (previa: 0,9 mg/dL)\n¿Cuál de los siguientes fármacos utilizados para su diabetes es el más probable responsable de esta complicación? (Harrison, Medicina Interna, 20.ª ed., pág. 2866)',
    options: [
      'Glimepirida',
      'Sitagliptina',
      'Empagliflozina',
      'Metformina',
      'Pioglitazona'
    ],
    correctOptionIndex: 3,
    explanation: 'El paciente desarrolló una lesión renal aguda inducida por contraste, lo que favoreció la acumulación de metformina. Aunque es infrecuente, la complicación más temida es la acidosis láctica asociada a metformina, caracterizada por acidosis metabólica con elevación del lactato.\n\n🟩 Concepto clave:\nContraste yodado + insuficiencia renal aguda + acidosis láctica = pensar en metformina.\n\n💡 Perla de examen:\n🔑 Antes de un procedimiento con contraste yodado debe considerarse la suspensión temporal de la metformina en pacientes con riesgo de de deterioro renal.\n🔑 Si la pregunta menciona estudio contrastado, insuficiencia renal aguda e hiperlactatemia, la respuesta suele ser metformina.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2866',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 7: CASOS CLÍNICOS',
    subtema: 'Diabetes mellitus (Casos Clínicos)',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q104',
    text: 'Una mujer de 57 años con diabetes mellitus tipo 2 acude a consulta por aumento progresivo de peso desde hace 6 meses. Refiere además episodios recurrentes de sudoración, temblor y palpitaciones que mejoran tras ingerir alimentos. Hace algunos meses se añadió un nuevo antidiabético oral a su tratamiento habitual.\n¿Cuál es el mecanismo de acción más probable del fármaco responsable de este cuadro? (Harrison, Medicina Interna, 20.ª ed., pág. 2866)',
    options: [
      'Disminución de la producción hepática de glucosa por activación de AMPK',
      'Inhibición de la reabsorción tubular renal de glucosa y sodio',
      'Estimulación de receptores nucleares que aumentan sensibilidad a insulina',
      'Cierre de canales de potasio ATP dependientes en células beta',
      'Inhibición de la degradación periférica de incretinas intestinales'
    ],
    correctOptionIndex: 3,
    explanation: 'La paciente presenta hipoglucemia y aumento de peso, efectos adversos clásicos de las sulfonilureas. Estos fármacos estimulan la secreción de insulina mediante el cierre de los canales de potasio sensibles a ATP de la célula β pancreática.\n\n🟩 Concepto clave:\nSulfonilureas → cierre canal K⁺ ATP → ↑ insulina → hipoglucemia + aumento de peso.\n\n💡 Perla de examen:\n🔑 Si el caso menciona aumento de peso e hipoglucemia, las respuestas más probables suelen ser:\n• Glibenclamida\n• Glimepirida\n• Gliclazida',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2866',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 7: CASOS CLÍNICOS',
    subtema: 'Diabetes mellitus (Casos Clínicos)',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q105',
    text: 'Un hombre de 19 años con diabetes mellitus tipo 1 es llevado a emergencia por vómitos, dolor abdominal y respiración profunda de varias horas de evolución. Su madre refiere que suspendió la administración de insulina durante dos días por una infección respiratoria. Al examen físico presenta deshidratación, taquicardia y respiración de Kussmaul. Los exámenes muestran glucosa de 480 mg/dL, pH de 7,12 y cetonas positivas en sangre y orina.\n¿Cuál de los siguientes mecanismos fisiopatológicos explica principalmente el desarrollo de este cuadro? (Harrison, Medicina Interna, 20.ª ed., pág. 2872)',
    options: [
      'Incremento de glucagón con aumento de la gluconeogénesis hepática',
      'Estimulación de incretinas con aumento de la secreción de insulina',
      'Inhibición de lipólisis con disminución de ácidos grasos libres',
      'Disminución de cortisol con reducción de producción hepática de glucosa',
      'Activación de GLUT4 con incremento de captación periférica de glucosa'
    ],
    correctOptionIndex: 0,
    explanation: 'La cetoacidosis diabética ocurre por un déficit relativo o absoluto de insulina asociado a un aumento de hormonas contrarreguladoras, especialmente glucagón. Esto incrementa la gluconeogénesis y glucogenólisis hepática, favoreciendo la hiperglucemia y la producción de cuerpos cetónicos.\n\n🟩 Concepto clave:\n↓ Insulina + ↑ Glucagón = hiperglucemia + cetosis + acidosis metabólica.\n\n💡 Perla de examen:\n🔑 Los hallazgos clásicos son:\n• Hiperglucemia\n• Acidosis metabólica con anión gap elevado\n• Cetonemia o cetonuria\n• Respiración de Kussmaul\n🔑 El desencadenante más frecuente es una infección o la suspensión de insulina.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2872',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 7: CASOS CLÍNICOS',
    subtema: 'Manejo agudo de las complicaciones de la diabetes (Casos Clínicos)',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q106',
    text: 'Un varón de 18 años con diabetes mellitus tipo 1 ingresa a emergencia por cetoacidosis diabética. Presenta deshidratación severa, respiración de Kussmaul, glucosa de 620 mg/dL y pH de 7,05. Se inicia tratamiento con líquidos intravenosos e insulina. Durante las siguientes horas comienza con cefalea intensa, irritabilidad y deterioro progresivo del nivel de conciencia.\n¿Cuál es la complicación más temida de esta enfermedad y su tratamiento? (Harrison, Medicina Interna, 20.ª ed., pág. 2872)',
    options: [
      'Hipoglucemia grave secundaria a insulina',
      'Hipopotasemia con arritmias ventriculares',
      'Edema cerebral secundario al tratamiento',
      'Insuficiencia renal aguda por deshidratación',
      'Tromboembolismo pulmonar por hemoconcentración'
    ],
    correctOptionIndex: 2,
    explanation: 'Aunque es poco frecuente, el edema cerebral es la complicación más grave y potencialmente mortal de la cetoacidosis diabética, especialmente en niños y adolescentes. Suele aparecer durante las primeras horas del tratamiento y se manifiesta con cefalea, alteración del sensorio, bradicardia y deterioro neurológico progresivo.\n\n🟩 Concepto clave:\nCAD + deterioro neurológico durante el tratamiento = edema cerebral hasta demostrar lo contrario.\n\n💡 Perla de examen:\n🔑 Si el paciente con CAD desarrolla:\n• Cefalea\n• Somnolencia\n• Confusión\n• Disminución del nivel de conciencia\n👉 Piensa en edema cerebral.\n🔑 El tratamiento de elección es:\n• Manitol intravenoso o\n• Solución salina hipertónica',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2872',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 7: CASOS CLÍNICOS',
    subtema: 'Manejo agudo de las complicaciones de la diabetes (Casos Clínicos)',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q107',
    text: 'Un hombre de 82 años con diabetes mellitus tipo 2 es llevado a emergencia por somnolencia progresiva. Presenta antecedente de neumonía desde hace una semana y disminución importante de la ingesta de agua. Al examen físico se encuentra severamente deshidratado, con presión arterial de 90/60 mmHg y Glasgow de 12 puntos. Los exámenes muestran glucosa de 920 mg/dL, osmolaridad plasmática elevada y cetonas negativas.\n¿Cuál es la complicación más frecuente responsable de muerte en pacientes con este cuadro? (Harrison, Medicina Interna, 20.ª ed., pág. 2873)',
    options: [
      'Edema cerebral',
      'Arritmias por hipopotasemia',
      'Eventos tromboembólicos',
      'Insuficiencia suprarrenal aguda',
      'Pancreatitis hemorrágica'
    ],
    correctOptionIndex: 2,
    explanation: 'El estado hiperosmolar hiperglucémico produce una deshidratación extrema y un estado de hipercoagulabilidad secundario a la hemoconcentración. Por ello, las complicaciones trombóticas (ACV, trombosis venosa profunda, embolia pulmonar, infarto) representan una causa importante de morbimortalidad.\n\n🟩 Concepto clave:\nEHH → deshidratación severa → hipercoagulabilidad → trombosis.\n\n💡 Perla de examen:\n🔑 Si el paciente es un adulto mayor con glucosa >600 mg/dL, alteración neurológica y poca cetosis, piensa en EHH.\n🔑 Complicación clásica preguntable:\nFenómenos tromboembólicos.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2873',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 7: CASOS CLÍNICOS',
    subtema: 'Manejo agudo de las complicaciones de la diabetes (Casos Clínicos)',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q108',
    text: 'Una mujer de 48 años con diabetes mellitus tipo 1 desde los 14 años acude a control oftalmológico. El especialista identifica neovascularización del disco óptico.\n¿Cuál es la complicación visual más temida asociada a este hallazgo? (Harrison, Medicina Interna, 20.ª ed., pág. 2877)',
    options: [
      'Catarata subcapsular posterior',
      'Desprendimiento de retina por tracción',
      'Neuropatía óptica isquémica',
      'Degeneración macular senil',
      'Oclusión de arteria central de la retina'
    ],
    correctOptionIndex: 1,
    explanation: 'La neovascularización define la retinopatía diabética proliferativa. Los vasos anormales pueden acompañarse de fibrosis y producir tracción sobre la retina, ocasionando desprendimiento retiniano y pérdida visual severa.\n\n🟩 Concepto clave:\nNeovascularización = retinopatía proliferativa.\nRetinopatía proliferativa → desprendimiento de retina por tracción.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2877',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 7: CASOS CLÍNICOS',
    subtema: 'Complicaciones crónicas de la diabetes (Casos Clínicos)',
    module: 'Semana 2 - Medicina Interna'
  },
  {
    id: 'q109',
    text: 'Un hombre de 60 años con diabetes mellitus tipo 2 desde hace 18 años consulta por hormigueo progresivo en ambos pies. Refiere sensación de quemazón nocturna y dificultad para percibir cambios de temperatura. Al examen físico presenta disminución de la sensibilidad vibratoria y pérdida de la percepción al monofilamento en ambos pies.\n¿Cuál es la forma más frecuente de neuropatía diabética que presenta este paciente? (Harrison, Medicina Interna, 20.ª ed., pág. 2880)',
    options: [
      'Neuropatía autonómica cardiovascular',
      'Mononeuropatía diabética',
      'Radiculopatía lumbosacra',
      'Polineuropatía distal simétrica',
      'Neuropatía craneal diabética'
    ],
    correctOptionIndex: 3,
    explanation: 'La polineuropatía distal simétrica (DSPN) es la forma más común de neuropatía diabética. Se caracteriza por compromiso sensitivo distal de distribución en "guante y calcetín", con síntomas como ardor, parestesias, hormigueo y dolor nocturno.\n\n🟩 Concepto clave:\nLa neuropatía diabética más frecuente es la polineuropatía distal simétrica.\n\n💡 Perla de examen:\n🔑 Palabras que deben hacerte pensar en DSPN:\n• Ardor en pies\n• Hormigueo bilateral\n• Empeoramiento nocturno\n• Pérdida de sensibilidad al monofilamento\n🔑 Es responsable de gran parte de las úlceras y amputaciones relacionadas con el pie diabético.',
    pagina: 'Harrison, Medicina Interna, 20.ª ed., pág. 2880',
    materia: 'Medicina Interna',
    semana: 2,
    tema: 'MÓDULO 7: CASOS CLÍNICOS',
    subtema: 'Complicaciones crónicas de la diabetes (Casos Clínicos)',
    module: 'Semana 2 - Medicina Interna'
  }];
