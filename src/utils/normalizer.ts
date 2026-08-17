export interface SubtemaInfo {
  normalizado: string;
  grupo: string;
}

export function toTitleCase(str: string): string {
  if (!str) return str;
  const lowerWords = ["de", "del", "la", "y", "en", "el", "los", "las", "a", "con", "para", "por", "un", "una", "o", "u", "vs", "vs."];
  return str
    .toLowerCase()
    .split(/\s+/)
    .map((word, index) => {
      if (word.length === 0) return "";
      if (index > 0 && lowerWords.includes(word)) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function cleanGroupName(grupo: string, semana?: number, normalizado?: string): string {
  const s = semana ? Number(semana) : undefined;
  const norm = normalizado ? normalizado.trim() : "";
  
  if (s === 1) {
    if (norm === "Reanimación Neonatal") return "Reanimación Neonatal";
    if (norm === "Defectos de la Pared Abdominal" || norm === "Enterocolitis Necrotizante (ecn)") return "Patología Digestiva y Quirúrgica";
    if (norm === "Sepsis Neonatal") return "Infecciones Neonatales";
    if (norm === "Enfermedad De Membrana Hialina (emh)" || norm === "Síndrome De Aspiración De Meconio (salam)" || norm === "Taquipnea Transitoria Del Recién Nacido" || norm === "Ductus Arterioso (dap)") return "Patología Respiratoria y Cardiovascular";
    if (norm === "Parálisis Obstétricas" || norm === "Traumatismo Obstétrico" || norm === "Encefalopatía Hipóxico-isquémica") return "Trauma Obstétrico y Neurología";
    return "Recién Nacido Sano y Transición";
  }
  
  if (s === 2) {
    if (norm === "Diabetes Mellitus") return "Diabetes Mellitus";
    if (norm === "Osteoporosis") return "Metabolismo Óseo y Mineral";
    if (norm === "Hemocromatosis" || norm === "Men") return "Genética y MEN";
    if (["Feocromocitoma", "Hiperaldosteronismo", "Hiperplasia Suprarrenal Congénita", "Insuficiencia Suprarrenal", "Incidentaloma Suprarrenal", "Síndrome de Cushing", "Suprarrenal"].includes(norm)) {
      return "Suprarrenal";
    }
    if (["Graves", "Hipertiroidismo", "Hipotiroidismo", "Nódulo Tiroideo", "Tiroiditis", "Cáncer de Tiroides", "Tiroides"].includes(norm)) {
      return "Tiroides";
    }
    return "Hipotálamo e Hipófisis";
  }
  
  if (s === 3) {
    if (["Osteogénesis Imperfecta", "Síndrome de Ehlers-danlos", "Síndrome de Marfan"].includes(norm)) return "Colagenopatías Hereditarias";
    if (["Carcinoma Basocelular", "Carcinoma Espinocelular Cutáneo", "Hidradenitis Supurativa", "Infecciones por Hpv", "Melanoma Cutáneo", "Sarcoma de Kaposi", "Síndrome de Stevens-johnson y Ten"].includes(norm)) {
      return "Dermatología Oncológica e Inflamatoria";
    }
    if (["Abscesos Hepáticos", "Infecciones Necrosantes", "Infecciones de Tejidos Blandos", "Infecciones del Sitio Quirúrgico (ssi)", "Infección del Sitio Quirúrgico", "Necrosis Pancreática Infectada", "Profilaxis Antibiótica", "Septicemia y Choque Séptico", "Tipos de Peritonitis", "Variables de Perfusión Tisular en Sirs"].includes(norm)) {
      return "Infecciones Quirúrgicas y Sepsis";
    }
    return "Cicatrización y Heridas";
  }
  
  if (s === 4) {
    if (["Conductos Mesonéfricos", "Conductos Paramesonéfricos", "Determinación del Sexo Gonadal", "Disgenesia Gonadal 46,xy", "Embriología de la Vagina", "Estructuras Urogenitales Embrionarias", "Ligamento Gubernáculo"].includes(norm)) {
      return "Embriología Genitourinaria";
    }
    if (["Anomalías del Clítoris", "Asignación de Género en Dsd", "Defectos del Himen", "Estrías Gonadales", "Exceso de Andrógenos en Feto Femenino", "Extrofia Vesical", "Síndrome de Mayer-rokitansky-küster-hauser", "Síndrome de Turner"].includes(norm)) {
      return "Diferenciación Sexual y Malformaciones";
    }
    if (["Clasificación Pop-q", "Factores de Riesgo", "Tratamiento con Pesarios"].includes(norm)) {
      return "Piso Pélvico y Prolapso";
    }
    return "Anatomía Pélvica y Sostén";
  }
  
  if (s === 5) {
    if (norm === "Evaluación Antropométrica") return "Crecimiento y Desarrollo";
    if (["Alimentación Complementaria", "Guías Alimentarias del Paraguay", "Ictericia por Lactancia y Leche Materna", "Lactancia Materna", "Requerimientos y Alimentación Complementaria", "Síndrome de Realimentación"].includes(norm)) {
      return "Lactancia y Nutrición Infantil";
    }
    if (["Desnutrición Aguda", "Desnutrición Crónica", "Desnutrición Grave", "Desnutrición Infantil", "Manejo de la Desnutrición"].includes(norm)) {
      return "Desnutrición y Realimentación";
    }
    if (norm === "Obesidad Infantil") return "Trastornos por Exceso (Obesidad)";
    return "Enfermedades Carenciales (Avitaminosis)";
  }
  
  if (s === 6) {
    if (["Insuficiencia Respiratoria y SDRA", "Sepsis y Choque", "Soporte Cardiovascular Crítico y RCP"].includes(norm)) {
      return "Cuidados Críticos";
    }
    if (["Anemia Hemolítica", "Anemia Megaloblástica y Ferropénica", "Anemias"].includes(norm)) {
      return "Anemias";
    }
    if (["Insuficiencia Medular (Anemia Aplásica/Mielodisplasia)", "Neoplasias Mieloproliferativas", "Leucemia Aguda", "Leucemia Crónica y Mieloma Múltiple", "Linfomas", "Insuficiencia Medular y Neoplasias Mieloproliferativas"].includes(norm)) {
      return "Neoplasias Hematológicas";
    }
    if (norm === "Trastornos de la Coagulación") return "Hemostasia y Coagulación";
    return "Urgencias Oncológicas y Soporte";
  }
  
  if (s === 7) {
    if (norm === "Evaluación Inicial y Reanimación en Trauma" || norm === "Trauma Craneoencefálico") {
      return "Evaluación Inicial y Soporte Vital";
    }
    if (norm === "Choque Hemorrágico" || norm === "Toracotomía en Urgencias") {
      return "Choque y Reanimación";
    }
    if (norm === "Trauma Abdominal" || norm === "Trauma Torácico" || norm === "Trauma de Extremidades y Vascular") {
      return "Trauma por Regiones";
    }
    if (norm === "Síndrome de Compartimento Abdominal") return "Trauma Complejo y Control de Daños";
    return "Quemaduras y Lesiones por Inhalación";
  }

  if (s === 8) {
    if (grupo.includes("Infecciones Ginecológicas")) return "Infecciones Ginecológicas";
    if (grupo.includes("Dolor Pélvico Crónico")) return "Dolor Pélvico Crónico";
    return "Endocrinología de la Reproducción";
  }

  if (s === 10) {
    if (grupo.includes("Hipertensión") || norm.includes("Hipertensión") || norm.includes("Hipertension")) return "Hipertensión Arterial y Emergencias Vasculares";
    if (grupo.includes("Evaluación y Diagnóstico")) return "Evaluación y Diagnóstico Cardiovascular";
    if (grupo.includes("Arritmias y Conducción")) return "Arritmias y Conducción";
    if (grupo.includes("Insuficiencia Cardíaca")) return "Insuficiencia Cardíaca y Miocardiopatías";
    if (grupo.includes("Valvulopatías")) return "Valvulopatías y Enfermedades Pericárdicas";
    if (grupo.includes("Síndromes Coronarios")) return "Síndromes Coronarios Agudos (SCA)";
    return "Cardiología General";
  }

  if (s === 11) {
    if (grupo.includes("Esófago") || grupo.includes("Esofagitis") || grupo.includes("Reflujo") || grupo.includes("Hernia") || grupo.includes("Motilidad") || grupo.includes("Acalasia")) {
      return "Patologías del Esófago";
    }
    return "Patologías del Estómago";
  }

  if (s === 14) {
    if (grupo.includes("Reumatología")) {
      return "Reumatología";
    }
    return "Neumología";
  }

  if (s === 16) {
    if (norm.includes("Poliquístico") || norm.includes("SOP") || grupo.includes("Poliquísticos") || norm.includes("Hormonas") || norm.includes("Rotterdam") || norm.includes("Metformina") || norm.includes("Hirsutismo")) {
      return "Síndrome de Ovarios Poliquísticos (SOP)";
    }
    if (norm.includes("Sangrado") || norm.includes("SUA") || grupo.includes("Sangrado") || norm.includes("FIGO") || norm.includes("Etario") || norm.includes("Pólipo") || norm.includes("Polipo") || norm.includes("Menstruales")) {
      return "Sangrado Uterino Anormal (SUA)";
    }
    if (norm.includes("Leiomioma") || norm.includes("Adenomiosis") || norm.includes("Benigna") || norm.includes("Hematometra") || grupo.includes("Benigna")) {
      return "Patología Uterina Benigna";
    }
    if (norm.includes("Endometriosis") || grupo.includes("Endometriosis")) {
      return "Endometriosis";
    }
    return grupo;
  }
  
  return grupo.replace(/^(Módulo|Modulo)\s+[IVXLC\d]+:\s*/i, "").trim();
}

function normalizeS1(rawSubtema: string, questionText: string, questionId?: string): { grupo: string, normalizado: string } {
  const text = questionText.toLowerCase();
  const sub = rawSubtema.toLowerCase();
  const id = questionId ? questionId.trim() : rawSubtema.trim();

  const normalizado = toTitleCase(rawSubtema);

  if (
    id === 'neo_q6' || id === 'neo_q7' || id === 'neo_q30' || id === 'neo_q31' || id === 'neo_q32' || id === 'neo_q33' ||
    sub.includes('reanimación') || sub.includes('reanimacion') ||
    text.includes('reanimación neonatal') || text.includes('reanimacion neonatal') ||
    text.includes('vpp') || text.includes('compresiones') || text.includes('adrenalina')
  ) {
    return { grupo: "Módulo VI: Reanimación Neonatal", normalizado: "Reanimación Neonatal" };
  }
  if (id === 'neo_q18' || text.includes('onfalocele') || text.includes('gastrosquisis')) {
    return { grupo: "Módulo V: Misceláneas y Patología Quirúrgica Neonatal", normalizado: "Defectos de la Pared Abdominal" };
  }
  if (id === 'neo_q42' || id === 'neo_q43' || sub.includes('sepsis') || text.includes('sepsis') || text.includes('gentamicina') || text.includes('ampicilina')) {
    return { grupo: "Módulo IV: Atención del Recién Nacido con Patología Infecciosa", normalizado: "Sepsis Neonatal" };
  }
  if (id === 'neo_q40' || sub.includes('taquipnea') || text.includes('taquipnea transitoria') || text.includes('pulmón húmedo') || text.includes('pulmon humedo')) {
    return { grupo: "Módulo III: Atención del Recién Nacido con Patología Respiratoria", normalizado: "Taquipnea Transitoria Del Recién Nacido" };
  }
  if (id === 'neo_q41' || sub.includes('salam') || text.includes('líquido amniótico meconial') || text.includes('liquido amniotico meconial') || text.includes('salam') || text.includes('aspiración de meconio') || text.includes('aspiracion de meconio')) {
    return { grupo: "Módulo III: Atención del Recién Nacido con Patología Respiratoria", normalizado: "Síndrome De Aspiración De Meconio (salam)" };
  }
  if (id === 'neo_q8' || id === 'neo_q35' || id === 'neo_q36' || sub.includes('hialina') || text.includes('membrana hialina') || text.includes('surfactante')) {
    return { grupo: "Módulo III: Atención del Recién Nacido con Patología Respiratoria", normalizado: "Enfermedad De Membrana Hialina (emh)" };
  }
  if (id === 'neo_q9' || id === 'neo_q19' || id === 'neo_q37' || id === 'neo_q38' || sub.includes('ductus') || text.includes('ductus') || text.includes('dap') || text.includes('indometacina') || text.includes('ibuprofeno')) {
    return { grupo: "Módulo II: Atención del Recién Nacido que Requiere Cuidados Especiales", normalizado: "Ductus Arterioso (dap)" };
  }
  if (id === 'neo_q10' || id === 'neo_q39' || sub.includes('enterocolitis') || sub.includes('ecn') || text.includes('enterocolitis') || text.includes('ecn') || text.includes('criterios de bell') || text.includes('neumatosis')) {
    return { grupo: "Módulo II: Atención del Recién Nacido que Requiere Cuidados Especiales", normalizado: "Enterocolitis Necrotizante (ecn)" };
  }
  if (id === 'neo_q4' || sub.includes('parálisis') || sub.includes('paralisis') || text.includes('plexo braquial') || text.includes('erb-duchenne') || text.includes('klumpke')) {
    return { grupo: "Módulo II: Atención del Recién Nacido que Requiere Cuidados Especiales", normalizado: "Parálisis Obstétricas" };
  }
  if (id === 'neo_q16' || text.includes('cefalohematoma') || text.includes('caput succedaneum')) {
    return { grupo: "Módulo II: Atención del Recién Nacido que Requiere Cuidados Especiales", normalizado: "Traumatismo Obstétrico" };
  }
  if (
    id === 'neo_q34' || 
    sub.includes('encefalopatía') || sub.includes('encefalopatia') || 
    text.includes('encefalopatía') || text.includes('encefalopatia') || 
    text.includes('hipóxico-isquémica') || text.includes('hipoxico-isquemica') || 
    text.includes('ehi')
  ) {
    return { grupo: "Módulo II: Atención del Recién Nacido que Requiere Cuidados Especiales", normalizado: "Encefalopatía Hipóxico-isquémica" };
  }
  if (text.includes('calor') || text.includes('evaporación') || text.includes('evaporacion') || text.includes('temperatura') || text.includes('cordón') || text.includes('cordon') || text.includes('clampaje') || text.includes('clampeo') || text.includes('ligadura') || text.includes('primera hora') || text.includes('alarma') || text.includes('soplo') || text.includes('cianosis')) {
    return { grupo: "Módulo I: Atención del Recién Nacido Sano", normalizado: "Termorregulación y Adaptación" };
  }
  return { grupo: "Módulo I: Atención del Recién Nacido Sano", normalizado: normalizado };
}

function normalizeS2(rawSubtema: string, questionText: string, questionId?: string): { grupo: string, normalizado: string } {
  const text = questionText.toLowerCase();
  const sub = rawSubtema.toLowerCase();
  const id = questionId ? questionId.trim() : rawSubtema.trim();
  
  const normalizado = toTitleCase(rawSubtema);
  
  if (id === 'q49') {
    return { grupo: "Módulo IV: Enfermedades de la Corteza Suprarrenal y Médula", normalizado: "Síndrome de Cushing" };
  }
  if (id === 'q23' || id === 'q47') {
    return { grupo: "Módulo I: Fundamentos del Sistema Endocrino", normalizado: "Fisiología Endocrina y Acción Hormonal" };
  }
  if (id === 'q61') {
    return { grupo: "Módulo III: Patología de la Glándula Tiroides", normalizado: "Hipotiroidismo" };
  }
  if (id === 'q63') {
    return { grupo: "Módulo III: Patología de la Glándula Tiroides", normalizado: "Nódulo Tiroideo" };
  }
  
  if (sub.includes('men') || text.includes('neoplasias endocrinas múltiples') || text.includes('neoplasia endocrina múltiple') || text.includes('men 1') || text.includes('men 2') || text.includes('men1') || text.includes('men2')) {
    return { grupo: "Módulo VIII: Síndromes Poliendocrinos y Genéticos", normalizado: "Men" };
  }
  if (sub.includes('hemocromatosis') || text.includes('hemocromatosis') || text.includes('wilson') || text.includes('porfiria')) {
    return { grupo: "Módulo VIII: Síndromes Poliendocrinos y Genéticos", normalizado: "Hemocromatosis" };
  }
  if (text.includes('poliendocrino') || text.includes('aps-1') || text.includes('aps-2')) {
    return { grupo: "Módulo VIII: Síndromes Poliendocrinos y Genéticos", normalizado: normalizado };
  }
  if (sub.includes('osteoporosis') || text.includes('osteoporosis') || text.includes('paget') || text.includes('alendronato') || text.includes('denosumab') || text.includes('fractura de cadera') || text.includes('densitometría')) {
    return { grupo: "Módulo VII: Metabolismo Óseo y Mineral", normalizado: "Osteoporosis" };
  }
  if (text.includes('hiperparatiroidismo') || text.includes('paratiroides') || text.includes('pth') || text.includes('osteítis fibrosa')) {
    return { grupo: "Módulo VII: Metabolismo Óseo y Mineral", normalizado: normalizado };
  }
  if (text.includes('vitamina d') || text.includes('calcio') || text.includes('fósforo') || text.includes('hipocalcemia') || text.includes('hipercalcemia')) {
    return { grupo: "Módulo VII: Metabolismo Óseo y Mineral", normalizado: normalizado };
  }
  if (sub.includes('suprarrenal') || sub.includes('cushing') || sub.includes('addison') || sub.includes('feocromocitoma') || sub.includes('aldosteronismo') || sub.includes('hiperplasia') || sub.includes('incidentaloma') || text.includes('cortisol') || text.includes('aldosterona') || text.includes('suprarrenal') || text.includes('feocromocitoma') || text.includes('cushing') || text.includes('addison')) {
    let specific = "Suprarrenal";
    if (id === 'q30') {
      return { grupo: "Módulo I: Fundamentos del Sistema Endocrino", normalizado: "Fisiología Endocrina y Acción Hormonal" };
    }
    if (sub.includes('cushing') || text.includes('cushing') || text.includes('cortisol') || id === 'q32' || (id >= 'q74' && id <= 'q77') || id === 'q93' || id === 'q94') specific = "Síndrome de Cushing";
    else if (sub.includes('feocromocitoma') || text.includes('feocromocitoma') || id === 'q83' || id === 'q84') specific = "Feocromocitoma";
    else if (sub.includes('aldosteronismo') || text.includes('aldosterona') || text.includes('conn') || id === 'q33' || id === 'q78' || id === 'q95' || id === 'q96') specific = "Hiperaldosteronismo";
    else if (sub.includes('insuficiencia suprarrenal') || sub.includes('addison') || text.includes('addison') || text.includes('crisis suprarrenal') || id === 'q31' || id === 'q79' || id === 'q80' || id === 'q81' || id === 'q97' || id === 'q98') specific = "Insuficiencia Suprarrenal";
    else if (sub.includes('hiperplasia') || text.includes('hiperplasia') || text.includes('21-hidroxilasa') || id === 'q34' || id === 'q82' || id === 'q99') specific = "Hiperplasia Suprarrenal Congénita";
    else if (sub.includes('incidentaloma') || text.includes('incidentaloma') || id === 'q35') specific = "Incidentaloma Suprarrenal";
    return { grupo: "Módulo IV: Enfermedades de la Corteza Suprarrenal y Médula", normalizado: specific };
  }
  if (sub.includes('hipofis') || sub.includes('prolactin') || sub.includes('pituit') || sub.includes('acromegalia') || sub.includes('siadh') || sub.includes('insípida') || sub.includes('insipida') || sub.includes('gh') || text.includes('hipófisis') || text.includes('adenohipófisis') || text.includes('neurohipófisis') || text.includes('prolactin') || text.includes('acromegalia') || text.includes('gh') || text.includes('siadh') || text.includes('hipopituitarismo') || text.includes('sheehan')) {
    let specific = normalizado;
    if (sub.includes('prolactin') || text.includes('prolactin') || id === 'q1' || id === 'q52' || id === 'q53') specific = "Hiperprolactinemia";
    else if (sub.includes('acromegalia') || text.includes('acromegalia') || id === 'q16' || id === 'q54' || id === 'q55') specific = "Acromegalia";
    else if (sub.includes('siadh') || sub.includes('insípida') || sub.includes('insipida') || text.includes('siadh') || text.includes('insípida') || text.includes('insipida') || id === 'q17' || id === 'q45' || id === 'q46' || id === 'q59' || id === 'q60') specific = "Diabetes Insípida y SIADH";
    else if (sub.includes('hipopituitarismo') || text.includes('hipopituitarismo') || text.includes('sheehan') || id === 'q15') specific = "Hipopituitarismo";
    else if (sub.includes('deficiencia de gh') || sub.includes('gh') || text.includes('gh') || id === 'q51') specific = "Deficiencia de GH";
    else {
      return { grupo: "Módulo I: Fundamentos del Sistema Endocrino", normalizado: "Fisiología Endocrina y Acción Hormonal" };
    }
    return { grupo: "Módulo II: Eje Hipotálamo-Hipófisis", normalizado: specific };
  }
  if (sub.includes('tiroid') || sub.includes('bocio') || sub.includes('adenoma') || sub.includes('graves') || sub.includes('tirotoxicosis') || sub.includes('toxic') || sub.includes('tirox') || text.includes('tiroid') || text.includes('tsh') || text.includes('t4') || text.includes('t3') || text.includes('levotiroxina')) {
    let specific = "Tiroides";
    if (id === 'q36') {
      return { grupo: "Módulo I: Fundamentos del Sistema Endocrino", normalizado: "Fisiología Endocrina y Acción Hormonal" };
    }
    if (sub.includes('graves') || text.includes('graves')) specific = "Graves";
    else if (sub.includes('tiroiditis') || text.includes('tiroiditis') || text.includes('hashimoto') || text.includes('quervain')) specific = "Tiroiditis";
    else if (sub.includes('carcinoma') || sub.includes('cáncer') || sub.includes('cancer') || text.includes('carcinoma') || text.includes('cáncer') || text.includes('cancer')) specific = "Cáncer de Tiroides";
    else if (sub.includes('bocio') || text.includes('bocio') || sub.includes('nódulo') || sub.includes('nodulo') || text.includes('nódulo') || text.includes('nodulo') || sub.includes('adenoma') || text.includes('adenoma')) specific = "Nódulo Tiroideo";
    else if (sub.includes('hipotiroid') || text.includes('hipotiroid') || text.includes('levotiroxina') || text.includes('eutiroideo') || text.includes('tsh') || text.includes('t4') || text.includes('t3')) specific = "Hipotiroidismo";
    else if (sub.includes('hipertiroid') || text.includes('hipertiroid') || text.includes('tirotoxicosis') || text.includes('amiodarona')) specific = "Hipertiroidismo";
    return { grupo: "Módulo III: Patología de la Glándula Tiroides", normalizado: specific };
  }
  if (sub.includes('diabetes') || text.includes('diabetes') || text.includes('insulina') || text.includes('glucosa') || text.includes('metformina') || text.includes('sglt2') || text.includes('glp-1') || text.includes('hipoglucemia') || text.includes('cetoacidosis') || text.includes('hba1c') || text.includes('nefropatía diabética') || text.includes('pie diabético') || text.includes('dislipidemia') || text.includes('síndrome metabólico')) {
    return { grupo: "Módulo VI: Diabetes Mellitus y Metabolismo", normalizado: "Diabetes Mellitus" };
  }
  return { grupo: "Módulo I: Fundamentos del Sistema Endocrino", normalizado: normalizado };
}

function normalizeS3(rawSubtema: string, questionText: string, questionId?: string): { grupo: string, normalizado: string } {
  const text = questionText.toLowerCase();
  const sub = rawSubtema.toLowerCase();
  const id = questionId ? questionId.trim() : rawSubtema.trim();

  const normalizado = toTitleCase(rawSubtema);

  if (id === 'q1_s3' || id === 'q2_s3' || id === 'q3_s3' || id === 'q4_s3' || id === 'q5_s3' || id === 'q6_s3' || id === 'q7_s3' || id === 'q8_s3' || id === 'q37_s3' || id === 'q38_s3' || id === 'q39_s3' || sub.includes('melanoma') || sub.includes('basocelular') || sub.includes('espinocelular') || sub.includes('epidermoide') || sub.includes('carcinoma') || sub.includes('cancer') || sub.includes('cáncer') || sub.includes('merkel') || sub.includes('kaposi') || sub.includes('hidradenitis') || sub.includes('stevens-johnson') || sub.includes('net') || sub.includes('pioderma') || sub.includes('hpv')) {
    let specific = normalizado;
    if (sub.includes('melanoma')) specific = "Melanoma Cutáneo";
    else if (sub.includes('basocelular')) specific = "Carcinoma Basocelular";
    else if (sub.includes('espinocelular') || sub.includes('epidermoide')) specific = "Carcinoma Espinocelular Cutáneo";
    return { grupo: "Módulo V: Patología Oncológica e Inflamatoria Cutánea", normalizado: specific };
  }
  if (sub.includes('ehlers-danlos') || sub.includes('marfan') || sub.includes('osteogénesis') || sub.includes('osteogenesis') || sub.includes('epidermólisis') || sub.includes('acrodermatitis')) {
    return { grupo: "Módulo III: Patología del Tejido Conectivo (Defectos Hereditarios)", normalizado: normalizado };
  }
  if (id === 'q10_s3' || id === 'q11_s3' || id === 'q12_s3' || id === 'q13_s3' || id === 'q14_s3' || id === 'q15_s3' || id === 'q16_s3' || id === 'q17_s3' || id === 'q18_s3' || id === 'q19_s3' || id === 'q20_s3' || id === 'q31_s3' || id === 'q32_s3' || id === 'q33_s3' || id === 'q34_s3' || id === 'q35_s3' || sub.includes('infección') || sub.includes('infeccion') || sub.includes('sepsis') || sub.includes('choque') || sub.includes('site') || sub.includes('sitio') || sub.includes('ssi') || sub.includes('profilaxis') || sub.includes('absceso') || sub.includes('pancreática') || sub.includes('sirs') || sub.includes('peritonitis') || sub.includes('fournier') || sub.includes('tejidos blandos')) {
    return { grupo: "Módulo IV: Infecciones Quirúrgicas y Sepsis", normalizado: normalizado };
  }
  return { grupo: "Módulo II: Fisiología y Alteraciones de la Cicatrización", normalizado: normalizado };
}

function normalizeS4(rawSubtema: string, questionText: string, questionId?: string): { grupo: string, normalizado: string } {
  const text = questionText.toLowerCase();
  const sub = rawSubtema.toLowerCase();
  const id = questionId ? questionId.trim() : rawSubtema.trim();

  const normalizado = toTitleCase(rawSubtema);

  if (id === 'q34_s4' || id === 'q35_s4' || id === 'q36_s4' || id === 'q38_s4' || sub.includes('pop-q') || sub.includes('pesarios') || sub.includes('factores de riesgo') || sub.includes('prolapso') || text.includes('pop-q') || text.includes('pesario') || text.includes('prolapso')) {
    return { grupo: "Módulo IV: Patología del Piso Pélvico", normalizado: normalizado };
  }
  if (id === 'q5_s4' || id === 'q6_s4' || id === 'q7_s4' || id === 'q8_s4' || id === 'q9_s4' || id === 'q10_s4' || id === 'q11_s4' || id === 'q13_s4' || id === 'q15_s4' || sub.includes('turner') || sub.includes('swyer') || sub.includes('mayer-rokitansky') || sub.includes('extrofia') || sub.includes('himen') || sub.includes('clítoris') || sub.includes('clitoris') || sub.includes('dsd') || sub.includes('gonadales') || sub.includes('andrógenos')) {
    return { grupo: "Módulo III: Alteraciones del Desarrollo y Malformaciones", normalizado: normalizado };
  }
  if (id === 'q1_s4' || id === 'q2_s4' || id === 'q3_s4' || id === 'q4_s4' || id === 'q12_s4' || id === 'q14_s4' || sub.includes('embrionarias') || sub.includes('gonadal') || sub.includes('mesonéfricos') || sub.includes('mesonefricos') || sub.includes('paramesonéfricos') || sub.includes('paramesonefricos') || sub.includes('embriología') || sub.includes('embriologia') || sub.includes('gubernáculo') || text.includes('müller') || text.includes('wolff')) {
    return { grupo: "Módulo II: Embriología Genital", normalizado: normalizado };
  }
  return { grupo: "Módulo I: Anatomía Normal y Sistemas de Soporte", normalizado: normalizado };
}

function normalizeS5(rawSubtema: string, questionText: string, questionId?: string): { grupo: string, normalizado: string } {
  const text = questionText.toLowerCase();
  const sub = rawSubtema.toLowerCase();

  const normalizado = toTitleCase(rawSubtema);
  
  if (sub.includes("antropometr") || text.includes("edad corregida") || text.includes("prematuro") || text.includes("curvas de fenton") || text.includes("fenton") || text.includes("31 semanas") || text.includes("1.250 g") || text.includes("1250 g") || text.includes("28 semanas") || text.includes("32 semanas")) {
    return { grupo: "Módulo I: Evaluación del Crecimiento y Desarrollo", normalizado: "Evaluación Antropométrica" };
  }
  if (text.includes("obesidad") || text.includes("sobrepeso") || text.includes("semáforo") || text.includes("semaforo") || sub.includes("obesidad")) {
    return { grupo: "Módulo V: Trastornos de la Nutrición por Exceso", normalizado: "Obesidad Infantil" };
  }
  if (text.includes("vitamina a") || text.includes("xeroftalmía") || text.includes("ceguera nocturna") || text.includes("bitôt") || text.includes("bitot") || text.includes("tiamina") || text.includes("vitamina b1") || text.includes("beriberi") || text.includes("wernicke") || text.includes("niacina") || text.includes("vitamina b3") || text.includes("pelagra") || text.includes("fólico") || text.includes("vitamina b12") || text.includes("cobalamina") || text.includes("vitamina c") || text.includes("escorbuto") || text.includes("ascórbico") || text.includes("vitamina d") || text.includes("raquitismo") || text.includes("vitamina e") || text.includes("alfa-tocoferol") || text.includes("zinc") || text.includes("dermatitis periorificial")) {
    return { grupo: "Módulo IV: Enfermedades Carenciales (Avitaminosis y Minerales)", normalizado: normalizado };
  }
  if (sub.includes("desnutri") || text.includes("realimentación") || text.includes("realimentacion") || (text.includes("talla/edad") && (text.includes("crónica") || text.includes("cronica") || text.includes("lineal") || text.includes("-2.8 de") || text.includes("-2.2 de") || text.includes("-2.4 de"))) || text.includes("kwashiorkor") || text.includes("edematosa") || text.includes("marasmo") || text.includes("emaciación") || text.includes("derivación hospitalaria") || text.includes("referencia urgente") || text.includes("-2,5 de") || text.includes("-2.5 de")) {
    let specific = normalizado;
    if (text.includes("realimentación") || text.includes("realimentacion")) specific = "Síndrome de Realimentación";
    else if (text.includes("kwashiorkor") || text.includes("marasmo")) specific = "Desnutrición Aguda";
    else if (text.includes("talla/edad")) specific = "Desnutrición Crónica";
    return { grupo: "Módulo III: Desnutrición y Complicaciones", normalizado: specific };
  }
  if (text.includes("complementaria") || text.includes("omega 3") || text.includes("grasas dietéticas") || text.includes("proteínas") || text.includes("fibra dietética") || text.includes("contraindicado") || text.includes("miel") || text.includes("diarrea")) {
    return { grupo: "Módulo II: Alimentación en la Primera Infancia", normalizado: "Alimentación Complementaria" };
  }
  return { grupo: "Módulo II: Alimentación en la Primera Infancia", normalizado: normalizado };
}

function normalizeS6(rawSubtema: string, questionText: string, questionId?: string): { grupo: string, normalizado: string } {
  const text = questionText.toLowerCase();
  const sub = rawSubtema.toLowerCase();
  const id = questionId ? questionId.trim() : rawSubtema.trim();

  const normalizado = toTitleCase(rawSubtema);

  // ID overrides for new questions (semana6_med_q76 to semana6_med_q94)
  if (id >= 'semana6_med_q76' && id <= 'semana6_med_q84') {
    let subtheme = "Sepsis y Choque";
    if (id === 'semana6_med_q78' || id === 'semana6_med_q81') {
      subtheme = "Insuficiencia Respiratoria y SDRA";
    } else if (id === 'semana6_med_q80') {
      subtheme = "Choque Cardiógeno y Reanimación";
    } else if (id === 'semana6_med_q77' || id === 'semana6_med_q82' || id === 'semana6_med_q83' || id === 'semana6_med_q84') {
      subtheme = "Soporte Cardiovascular Crítico y RCP";
    }
    return { grupo: "Módulo I: Cuidados Intensivos y Soporte Crítico", normalizado: subtheme };
  }
  if (id >= 'semana6_med_q85' && id <= 'semana6_med_q90') {
    return { grupo: "Módulo V: Urgencias Oncológicas y Cuidados de Soporte en Cáncer", normalizado: "Urgencias Oncológicas y Soporte" };
  }
  if (id === 'semana6_med_q91') {
    return { grupo: "Módulo III: Neoplasias Hematológicas (Mieloide y Linfoide)", normalizado: "Neoplasias Mieloproliferativas" };
  }
  if (id >= 'semana6_med_q92' && id <= 'semana6_med_q94') {
    return { grupo: "Módulo IV: Hemostasia, Coagulación y Transfusión", normalizado: "Trastornos de la Coagulación" };
  }

  // Módulo I: Cuidados Intensivos y Soporte Crítico
  if (
    id === 'semana6_med_q01' || id === 'semana6_med_q04' || id === 'semana6_med_q07' || id === 'semana6_med_q08' || id === 'semana6_med_q09' || id === 'semana6_med_q13' || id === 'semana6_med_q14' ||
    id === 'semana6_med_q02' || id === 'semana6_med_q05' || id === 'semana6_med_q17' ||
    id === 'semana6_med_q27' || id === 'semana6_med_q28' ||
    sub.includes("respiratoria") || sub.includes("sepsis") || sub.includes("choque") || sub.includes("reanimación") ||
    text.includes("sofa") || text.includes("qsofa") || text.includes("sepsis") || text.includes("séptico") || text.includes("sdra") || text.includes("cardiogénico") || text.includes("rcp")
  ) {
    let specific = "Sepsis y Choque";
    if (id === 'semana6_med_q02' || id === 'semana6_med_q05' || id === 'semana6_med_q17' || text.includes("sdra") || sub.includes("respiratoria")) {
      specific = "Insuficiencia Respiratoria y SDRA";
    } else if (id === 'semana6_med_q27' || id === 'semana6_med_q28' || text.includes("rcp") || text.includes("paro cardiaco")) {
      specific = "Soporte Cardiovascular Crítico y RCP";
    }
    return { grupo: "Módulo I: Cuidados Intensivos y Soporte Crítico", normalizado: specific };
  }

  // Módulo V: Urgencias Oncológicas y Cuidados de Soporte en Cáncer
  if (
    id === 'semana6_med_q22' || id === 'semana6_med_q24' || id === 'semana6_med_q29' || id === 'semana6_med_q30' || id === 'semana6_med_q35' ||
    sub.includes("urgencia") || sub.includes("oncolog") ||
    text.includes("lisis tumoral") || text.includes("vena cava superior") || text.includes("compresión de la médula") || text.includes("urgencia oncológica")
  ) {
    return { grupo: "Módulo V: Urgencias Oncológicas y Cuidados de Soporte en Cáncer", normalizado: "Urgencias Oncológicas y Soporte" };
  }

  // Módulo III: Neoplasias Hematológicas (Mieloide y Linfoide)
  if (
    id === 'semana6_med_q12' || id === 'semana6_med_q20' || id === 'semana6_med_q25' || id === 'semana6_med_q37' || id === 'semana6_med_q38' || id === 'semana6_med_q64' || id === 'semana6_med_q65' || id === 'semana6_med_q66' || id === 'semana6_med_q67' || id === 'semana6_med_q68' || id === 'semana6_med_q69' || id === 'semana6_med_q70' || id === 'semana6_med_q71' ||
    id === 'semana6_med_q03' || id === 'semana6_med_q21' || id === 'semana6_med_q72' || id === 'semana6_med_q73' || id === 'semana6_med_q74' || id === 'semana6_med_q75' ||
    id === 'semana6_med_q06' || id === 'semana6_med_q10' || id === 'semana6_med_q11' || id === 'semana6_med_q16' || id === 'semana6_med_q18' ||
    id === 'semana6_med_q19' ||
    sub.includes("linfoma") || sub.includes("leucemia") || sub.includes("mieloproliferativa") || sub.includes("plasmática") || sub.includes("mieloma") || text.includes("leucemia") || text.includes("linfoma") || text.includes("mieloma") || text.includes("mielofibrosis") || text.includes("policitemia")
  ) {
    let specific = normalizado;
    if (id === 'semana6_med_q03' || id === 'semana6_med_q21' || (id >= 'semana6_med_q72' && id <= 'semana6_med_q75')) {
      specific = "Leucemia Aguda";
    } else if (id === 'semana6_med_q06' || id === 'semana6_med_q10' || id === 'semana6_med_q11' || id === 'semana6_med_q16' || id === 'semana6_med_q18') {
      specific = "Leucemia Crónica y Mieloma Múltiple";
    } else if (id === 'semana6_med_q19') {
      specific = "Linfomas";
    } else {
      if (id === 'semana6_med_q20' || id === 'semana6_med_q25' || id === 'semana6_med_q69' || id === 'semana6_med_q70' || id === 'semana6_med_q71') {
        specific = "Neoplasias Mieloproliferativas";
      } else {
        specific = "Insuficiencia Medular (Anemia Aplásica/Mielodisplasia)";
      }
    }
    return { grupo: "Módulo III: Neoplasias Hematológicas (Mieloide y Linfoide)", normalizado: specific };
  }

  // Módulo IV: Hemostasia, Coagulación y Transfusión
  if (
    id === 'semana6_med_q26' || id === 'semana6_med_q33' || id === 'semana6_med_q39' || id === 'semana6_med_q40' ||
    sub.includes("coagulación") || sub.includes("hemostasia") || sub.includes("transfusión") || text.includes("hemofilia") || text.includes("coagulación") || text.includes("trombosis") || text.includes("antitrombóticos") || text.includes("plaquetaria")
  ) {
    return { grupo: "Módulo IV: Hemostasia, Coagulación y Transfusión", normalizado: "Trastornos de la Coagulación" };
  }

  // Módulo II: Trastornos de los Eritrocitos (Anemias)
  let specific = "Anemias";
  if (
    id === 'semana6_med_q15' || id === 'semana6_med_q23' || id === 'semana6_med_q36' || id === 'semana6_med_q41' || (id >= 'semana6_med_q56' && id <= 'semana6_med_q63') ||
    text.includes("hemólisis") || text.includes("hemolítica") || text.includes("haptoglobina") || text.includes("hpn")
  ) {
    specific = "Anemia Hemolítica";
  } else if (
    id === 'semana6_med_q31' || id === 'semana6_med_q32' || id === 'semana6_med_q34' || (id >= 'semana6_med_q42' && id <= 'semana6_med_q55') ||
    text.includes("megaloblástica") || text.includes("ferropenia") || text.includes("ferritina")
  ) {
    specific = "Anemia Megaloblástica y Ferropénica";
  }
  return { grupo: "Módulo II: Trastornos de los Eritrocitos (Anemias)", normalizado: specific };
}

function normalizeS7(rawSubtema: string, questionText: string, questionId?: string): { grupo: string, normalizado: string } {
  const text = questionText.toLowerCase();
  const sub = rawSubtema.toLowerCase();
  const id = questionId ? questionId.trim() : rawSubtema.trim();

  const normalizado = toTitleCase(rawSubtema);

  // Módulo V: Quemaduras (Fisiopatología, Reanimación y Cuidado)
  if (
    sub.includes('quemadura') || sub.includes('quemado') || text.includes('quemadura') || text.includes('quemado') || text.includes('parkland') || text.includes('lisa y browder') || text.includes('jackson') || text.includes('inhalación') || text.includes('monóxido') || text.includes('cianuro')
  ) {
    let specific = "Fisiopatología y Clasificación de Quemaduras";
    if (id === 'semana7_cir_q39' || id === 'semana7_cir_q42' || id === 'semana7_cir_q43' || id === 'semana7_cir_q44' || id === 'semana7_cir_q45' || text.includes("química") || text.includes("ácido") || text.includes("álcali") || text.includes("fluorhídrico")) {
      specific = "Quemaduras Químicas";
    } else if (id === 'semana7_cir_q38' || id === 'semana7_cir_q40' || text.includes("eléctrica") || text.includes("voltaje") || text.includes("rabdomiólisis")) {
      specific = "Quemaduras Eléctricas";
    } else if (id === 'semana7_cir_q50' || id === 'semana7_cir_q51' || id === 'semana7_cir_q81' || id === 'semana7_cir_q82' || text.includes("inhalación") || text.includes("monóxido") || text.includes("carboxihemoglobina") || text.includes("cianuro")) {
      specific = "Lesión por Inhalación y Toxicología";
    }
    return { grupo: "Módulo V: Quemaduras (Fisiopatología, Reanimación y Cuidado)", normalizado: specific };
  }

  // Módulo IV: Estrategias Quirúrgicas Críticas en Trauma
  if (id === 'semana7_cir_q33' || id === 'semana7_cir_q67' || text.includes('intravesical') || text.includes('compartimento abdominal') || text.includes('laparotomía descompresiva') || text.includes('control de daños') || text.includes('tríada letal')) {
    return { grupo: "Módulo IV: Estrategias Quirúrgicas Críticas en Trauma", normalizado: "Síndrome de Compartimento Abdominal" };
  }

  // Módulo II: Choque y Reanimación
  if (id === 'semana7_cir_q10' || id === 'semana7_cir_q12' || id === 'semana7_cir_q13' || id === 'semana7_cir_q14' || id === 'semana7_cir_q56' || id === 'semana7_cir_q57' || id === 'semana7_cir_q58' || id === 'semana7_cir_q59' || id === 'semana7_cir_q61' || text.includes('choque hemorrágico') || text.includes('reanimación inicial') || text.includes('clase ii') || text.includes('toracotomía en urgencias')) {
    let specific = "Choque Hemorrágico";
    if (id === 'semana7_cir_q10' || text.includes("toracotomía")) {
      specific = "Toracotomía en Urgencias";
    }
    return { grupo: "Módulo II: Choque y Reanimación", normalizado: specific };
  }

  // Módulo I: Evaluación Primaria y Soporte Vital (ATLS)
  if (id === 'semana7_cir_q11' || id === 'semana7_cir_q60' || id === 'semana7_cir_q72' || id === 'semana7_cir_q01' || id === 'semana7_cir_q02' || id === 'semana7_cir_q03' || id === 'semana7_cir_q06' || id === 'semana7_cir_q34' || id === 'semana7_cir_q53' || id === 'semana7_cir_q54' || id === 'semana7_cir_q71' || text.includes('valoración primaria') || text.includes('vía respiratoria') || text.includes('glasgow') || text.includes('atls') || text.includes('embarazada traumatizada')) {
    let specific = "Evaluación Inicial y Reanimación en Trauma";
    if (id === 'semana7_cir_q11' || id === 'semana7_cir_q60' || id === 'semana7_cir_q72' || text.includes("glasgow") || text.includes("gcs")) {
      specific = "Trauma Craneoencefálico";
    }
    return { grupo: "Módulo I: Evaluación Primaria y Soporte Vital (ATLS)", normalizado: specific };
  }

  // Módulo III: Trauma por Regiones Anatómicas
  let specificTrauma = "Trauma Abdominal";
  if (id === 'semana7_cir_q04' || id === 'semana7_cir_q05' || id === 'semana7_cir_q07' || id === 'semana7_cir_q08' || id === 'semana7_cir_q09' || id === 'semana7_cir_q20' || id === 'semana7_cir_q55' || text.includes("torácico") || text.includes("neumotórax") || text.includes("hemotórax") || text.includes("taponamiento")) {
    specificTrauma = "Trauma Torácico";
  } else if (id === 'semana7_cir_q28' || id === 'semana7_cir_q29' || id === 'semana7_cir_q66' || text.includes("extremidad") || text.includes("tobillo-brazo") || text.includes("arterial")) {
    specificTrauma = "Trauma de Extremidades y Vascular";
  }
  return { grupo: "Módulo III: Trauma por Regiones Anatómicas", normalizado: specificTrauma };
}

function normalizeS8(rawSubtema: string, questionText: string, questionId?: string): { grupo: string, normalizado: string } {
  const text = questionText.toLowerCase();
  const sub = rawSubtema.toLowerCase();
  const id = questionId ? questionId.trim() : rawSubtema.trim();

  // 1. Exact or near-exact matching for the 7 new consolidated subthemes (case-insensitive)
  if (sub.includes('hipotálamo-hipófisis') || sub.includes('hipotalamo-hipofisis') || sub.includes('glucoproteicas')) {
    return {
      grupo: "Módulo I: Endocrinología de la Reproducción",
      normalizado: "Eje Hipotálamo-Hipófisis y Hormonas Glucoproteicas"
    };
  }
  if (sub.includes('esteroidogénesis') || sub.includes('esteroidogenesis') || sub.includes('dinámica folicular') || sub.includes('dinamica folicular')) {
    return {
      grupo: "Módulo I: Endocrinología de la Reproducción",
      normalizado: "Esteroidogénesis y Dinámica Folicular Ovárica"
    };
  }
  if (sub.includes('ciclo ovárico') || sub.includes('ciclo ovarico') || sub.includes('implantación') || sub.includes('implantacion')) {
    return {
      grupo: "Módulo I: Endocrinología de la Reproducción",
      normalizado: "Ciclo Ovárico, Endometrial e Implantación"
    };
  }
  if (sub.includes('microbioma') || sub.includes('vaginosis') || sub.includes('vaginitis')) {
    return {
      grupo: "Módulo II: Infecciones Ginecológicas",
      normalizado: "Microbioma Vaginal, Vaginosis y Vaginitis"
    };
  }
  if (sub.includes('its ulcerativas') || sub.includes('lesiones dermatológicas') || sub.includes('lesiones dermatologicas')) {
    return {
      grupo: "Módulo II: Infecciones Ginecológicas",
      normalizado: "ITS Ulcerativas y Lesiones Dermatológicas Genitales"
    };
  }
  if (sub.includes('its no ulcerativas') || sub.includes('patología infecciosa') || sub.includes('patologia infecciosa')) {
    return {
      grupo: "Módulo II: Infecciones Ginecológicas",
      normalizado: "ITS No Ulcerativas y Patología Infecciosa Local/Sistémica"
    };
  }
  if (sub.includes('vih') || sub.includes('sida') || sub.includes('tamizaje de vih')) {
    return {
      grupo: "Módulo II: Infecciones Ginecológicas",
      normalizado: "Diagnóstico y Tamizaje de la Infección por VIH"
    };
  }
  if (sub.includes('dolor pélvico') || sub.includes('dolor pelvico') || sub.includes('endometriosis') || sub.includes('adherencias')) {
    return {
      grupo: "Módulo III: Dolor Pélvico Crónico",
      normalizado: "Dolor Pélvico Crónico"
    };
  }

  // 2. Question ID based fallback (just in case they are called with original raw fields)
  if (id.startsWith('semana8_endo_')) {
    const num = parseInt(id.replace('semana8_endo_q', ''));
    if ((num >= 1 && num <= 4) || num === 8 || (num >= 9 && num <= 12)) {
      return {
        grupo: "Módulo I: Endocrinología de la Reproducción",
        normalizado: "Eje Hipotálamo-Hipófisis y Hormonas Glucoproteicas"
      };
    }
    if ((num >= 5 && num <= 7) || (num >= 13 && num <= 15)) {
      return {
        grupo: "Módulo I: Endocrinología de la Reproducción",
        normalizado: "Esteroidogénesis y Dinámica Folicular Ovárica"
      };
    }
    if (num >= 16 && num <= 23) {
      return {
        grupo: "Módulo I: Endocrinología de la Reproducción",
        normalizado: "Ciclo Ovárico, Endometrial e Implantación"
      };
    }
  }

  if (id.startsWith('semana8_inf_')) {
    const num = parseInt(id.replace('semana8_inf_q', ''));
    if ((num >= 1 && num <= 4) || (num >= 13 && num <= 17)) {
      return {
        grupo: "Módulo II: Infecciones Ginecológicas",
        normalizado: "Microbioma Vaginal, Vaginosis y Vaginitis"
      };
    }
    if ((num >= 5 && num <= 12) || (num >= 23 && num <= 25)) {
      return {
        grupo: "Módulo II: Infecciones Ginecológicas",
        normalizado: "ITS Ulcerativas y Lesiones Dermatológicas Genitales"
      };
    }
    if ((num >= 18 && num <= 22) || (num >= 26 && num <= 28)) {
      return {
        grupo: "Módulo II: Infecciones Ginecológicas",
        normalizado: "ITS No Ulcerativas y Patología Infecciosa Local/Sistémica"
      };
    }
    if (num === 29 || num === 30) {
      return {
        grupo: "Módulo II: Infecciones Ginecológicas",
        normalizado: "Diagnóstico y Tamizaje de la Infección por VIH"
      };
    }
  }

  // 3. Keyword / text-based fallback (for robustness)
  if (
    text.includes('lh') || text.includes('fsh') || text.includes('hcg') || text.includes('gnrh') ||
    text.includes('hipotálamo') || text.includes('hipófisis')
  ) {
    return {
      grupo: "Módulo I: Endocrinología de la Reproducción",
      normalizado: "Eje Hipotálamo-Hipófisis y Hormonas Glucoproteicas"
    };
  }
  if (text.includes('colesterol') || text.includes('esteroide') || text.includes('andrógeno') || text.includes('folicular') || text.includes('ovárica') || text.includes('ovarica')) {
    return {
      grupo: "Módulo I: Endocrinología de la Reproducción",
      normalizado: "Esteroidogénesis y Dinámica Folicular Ovárica"
    };
  }
  if (text.includes('ciclo') || text.includes('endometrio') || text.includes('implantación') || text.includes('implantacion') || text.includes('lutea') || text.includes('lútea')) {
    return {
      grupo: "Módulo I: Endocrinología de la Reproducción",
      normalizado: "Ciclo Ovárico, Endometrial e Implantación"
    };
  }
  if (
    text.includes('vaginosis') || text.includes('vaginitis') || text.includes('clue cells') ||
    text.includes('células guía') || text.includes('candidiasis') || text.includes('candidosis') || text.includes('tricomoniasis')
  ) {
    return {
      grupo: "Módulo II: Infecciones Ginecológicas",
      normalizado: "Microbioma Vaginal, Vaginosis y Vaginitis"
    };
  }
  if (
    text.includes('sífilis') || text.includes('sifilis') || text.includes('chancro') ||
    text.includes('herpes') || text.includes('linfogranuloma') || text.includes('molusco')
  ) {
    return {
      grupo: "Módulo II: Infecciones Ginecológicas",
      normalizado: "ITS Ulcerativas y Lesiones Dermatológicas Genitales"
    };
  }
  if (
    text.includes('gonorrea') || text.includes('gonococo') || text.includes('clamidia') ||
    text.includes('chlamydia') || text.includes('bartholin') || text.includes('choque tóxico') || text.includes('choque toxico')
  ) {
    return {
      grupo: "Módulo II: Infecciones Ginecológicas",
      normalizado: "ITS No Ulcerativas y Patología Infecciosa Local/Sistémica"
    };
  }
  if (text.includes('vih') || text.includes('sida') || text.includes('elisa') || text.includes('wester')) {
    return {
      grupo: "Módulo II: Infecciones Ginecológicas",
      normalizado: "Diagnóstico y Tamizaje de la Infección por VIH"
    };
  }

  // 4. Ultimate generic fallback
  const normalizado = toTitleCase(rawSubtema);
  if (
    sub.includes('infección') || sub.includes('infeccion') || sub.includes('its') || sub.includes('vih')
  ) {
    return { grupo: "Módulo II: Infecciones Ginecológicas", normalizado };
  }
  return { grupo: "Módulo I: Endocrinología de la Reproducción", normalizado };
}

function normalizeS9(rawSubtema: string, questionText: string, questionId?: string): { grupo: string, normalizado: string } {
  const sub = rawSubtema.toLowerCase();
  if (sub.includes('vacuna') || sub.includes('inmunizaci') || sub.includes('esquema')) {
    return {
      grupo: "Módulo I: Inmunizaciones",
      normalizado: "Vacunas"
    };
  }
  return {
    grupo: "Módulo II: Crecimiento y Desarrollo",
    normalizado: "Crecimiento y Desarrollo"
  };
}

function normalizeS10(rawSubtema: string, questionText: string, questionId?: string): { grupo: string, normalizado: string } {
  const sub = rawSubtema.toLowerCase().trim();
  const text = questionText.toLowerCase();
  const normalizado = toTitleCase(rawSubtema);

  if (sub.includes('hipertens') || sub.includes('presión arterial') || sub.includes('presion arterial') || text.includes('hipertensión') || text.includes('hipertension') || text.includes('crisis hipertensiva')) {
    return { grupo: "Módulo VI: Hipertensión Arterial y Emergencias Vasculares", normalizado: sub.includes('crisis') ? "Crisis Hipertensiva" : "Hipertensión Arterial" };
  }

  // Exact mappings for raw subthemes to maintain clean structure and module groupings
  if (sub === 'examen físico cardiovascular' || sub === 'examen fisico cardiovascular') {
    return { grupo: "Módulo I: Evaluación y Diagnóstico Cardiovascular", normalizado: "Examen Físico Cardiovascular" };
  }
  if (sub === 'electrocardiografía (ecg)' || sub === 'electrocardiografia (ecg)' || sub === 'electrocardiografía' || sub === 'electrocardiografia') {
    return { grupo: "Módulo I: Evaluación y Diagnóstico Cardiovascular", normalizado: "Electrocardiografía (ECG)" };
  }
  if (sub === 'métodos de imagen cardiovascular' || sub === 'metodos de imagen cardiovascular') {
    return { grupo: "Módulo I: Evaluación y Diagnóstico Cardiovascular", normalizado: "Métodos de Imagen Cardiovascular" };
  }
  if (sub === 'epidemiología y factores de riesgo' || sub === 'epidemiologia y factores de riesgo') {
    return { grupo: "Módulo I: Evaluación y Diagnóstico Cardiovascular", normalizado: "Epidemiología y Factores de Riesgo" };
  }
  if (sub === 'eje eléctrico (ecg)' || sub === 'eje electrico (ecg)') {
    return { grupo: "Módulo I: Evaluación y Diagnóstico Cardiovascular", normalizado: "Eje Eléctrico (ECG)" };
  }
  if (sub === 'alteraciones electrolíticas (ecg)' || sub === 'alteraciones electroliticas (ecg)') {
    return { grupo: "Módulo I: Evaluación y Diagnóstico Cardiovascular", normalizado: "Alteraciones Electrolíticas (ECG)" };
  }
  if (sub === 'hipertrofia ventricular (ecg)') {
    return { grupo: "Módulo I: Evaluación y Diagnóstico Cardiovascular", normalizado: "Hipertrofia Ventricular (ECG)" };
  }
  if (sub === 'crecimiento auricular (ecg)') {
    return { grupo: "Módulo I: Evaluación y Diagnóstico Cardiovascular", normalizado: "Crecimiento Auricular (ECG)" };
  }

  if (sub === 'antiarrítmicos y tratamiento' || sub === 'antiarritmicos y tratamiento') {
    return { grupo: "Módulo II: Arritmias y Conducción", normalizado: "Antiarrítmicos y Tratamiento" };
  }
  if (sub === 'bloqueos de rama') {
    return { grupo: "Módulo II: Arritmias y Conducción", normalizado: "Bloqueos de Rama" };
  }
  if (sub === 'bloqueos auriculoventriculares (av)' || sub === 'bloqueos auriculoventriculares') {
    return { grupo: "Módulo II: Arritmias y Conducción", normalizado: "Bloqueos Auriculoventriculares (AV)" };
  }
  if (sub === 'taquicardias supraventriculares (tsv)' || sub === 'arritmias supraventriculares') {
    return { grupo: "Módulo II: Arritmias y Conducción", normalizado: "Taquicardias Supraventriculares (TSV)" };
  }
  if (sub === 'fibrilación auricular (fa)' || sub === 'fibrilacion auricular (fa)' || sub === 'fibrilación auricular' || sub === 'fibrilacion auricular') {
    return { grupo: "Módulo II: Arritmias y Conducción", normalizado: "Fibrilación Auricular (FA)" };
  }
  if (sub === 'arritmias ventriculares y paro' || sub === 'arritmias ventriculares and paro') {
    return { grupo: "Módulo II: Arritmias y Conducción", normalizado: "Arritmias Ventriculares y Paro" };
  }

  if (sub === 'insuficiencia cardíaca' || sub === 'insuficiencia cardiaca') {
    return { grupo: "Módulo III: Insuficiencia Cardíaca y Miocardiopatías", normalizado: "Insuficiencia Cardíaca" };
  }
  if (sub === 'miocardiopatías' || sub === 'miocardiopatias' || sub === 'miocardiopatía' || sub === 'miocardiopatia') {
    return { grupo: "Módulo III: Insuficiencia Cardíaca y Miocardiopatías", normalizado: "Miocardiopatías" };
  }

  if (sub === 'valvulopatías' || sub === 'valvulopatias' || sub === 'valvulopatía' || sub === 'valvulopatia') {
    return { grupo: "Módulo IV: Valvulopatías y Enfermedades Pericárdicas", normalizado: "Valvulopatías" };
  }
  if (sub === 'enfermedades pericárdicas' || sub === 'enfermedades pericardicas' || sub === 'enfermedad pericárdica' || sub === 'enfermedad pericardica') {
    return { grupo: "Módulo IV: Valvulopatías y Enfermedades Pericárdicas", normalizado: "Enfermedades Pericárdicas" };
  }
  if (sub === 'tromboembolismo pulmonar') {
    return { grupo: "Módulo IV: Valvulopatías y Enfermedades Pericárdicas", normalizado: "Tromboembolismo Pulmonar" };
  }

  if (sub === 'síndromes coronarios agudos (sca)' || sub === 'sindromes coronarios agudos (sca)' || sub === 'síndrome coronario agudo' || sub === 'sindrome coronario agudo' || sub === 'síndrome coronario agudo (scasest)' || sub === 'infarto agudo de miocardio (scacest)') {
    return { grupo: "Módulo V: Síndromes Coronarios Agudos (SCA)", normalizado: "Síndromes Coronarios Agudos (SCA)" };
  }
  if (sub === 'síndrome de wellens' || sub === 'sindrome de wellens') {
    return { grupo: "Módulo V: Síndromes Coronarios Agudos (SCA)", normalizado: "Síndrome de Wellens" };
  }

  // Fallback checks using substring matching on the raw subtheme if no exact match is found
  if (sub.includes('imagen') || sub.includes('eco') || sub.includes('resonancia') || sub.includes('tomografia') || sub.includes('pet')) {
    return { grupo: "Módulo I: Evaluación y Diagnóstico Cardiovascular", normalizado: "Métodos de Imagen Cardiovascular" };
  }
  if (sub.includes('electrolit')) {
    return { grupo: "Módulo I: Evaluación y Diagnóstico Cardiovascular", normalizado: "Alteraciones Electrolíticas (ECG)" };
  }
  if (sub.includes('bloqueo av')) {
    return { grupo: "Módulo II: Arritmias y Conducción", normalizado: "Bloqueos Auriculoventriculares (AV)" };
  }
  if (sub.includes('wellens')) {
    return { grupo: "Módulo V: Síndromes Coronarios Agudos (SCA)", normalizado: "Síndrome de Wellens" };
  }
  if (sub.includes('pericard') || sub.includes('taponamiento')) {
    return { grupo: "Módulo IV: Valvulopatías y Enfermedades Pericárdicas", normalizado: "Enfermedades Pericárdicas" };
  }
  if (sub.includes('coronar') || sub.includes('infarto') || sub.includes('isquem')) {
    return { grupo: "Módulo V: Síndromes Coronarios Agudos (SCA)", normalizado: "Síndromes Coronarios Agudos (SCA)" };
  }
  if (sub.includes('insuficiencia card') || sub.includes('ic')) {
    return { grupo: "Módulo III: Insuficiencia Cardíaca y Miocardiopatías", normalizado: "Insuficiencia Cardíaca" };
  }
  if (sub.includes('miocardio')) {
    return { grupo: "Módulo III: Insuficiencia Cardíaca y Miocardiopatías", normalizado: "Miocardiopatías" };
  }
  if (sub.includes('valvulo')) {
    return { grupo: "Módulo IV: Valvulopatías y Enfermedades Pericárdicas", normalizado: "Valvulopatías" };
  }
  if (sub.includes('electrocardi') || sub.includes('ecg')) {
    return { grupo: "Módulo I: Evaluación y Diagnóstico Cardiovascular", normalizado: "Electrocardiografía (ECG)" };
  }

  // Final fallback using the original broad text checks as a last resort
  if (
    sub.includes('epidemiolog') || sub.includes('riesgo') || 
    sub.includes('examen f') || sub.includes('exploraci') || sub.includes('pulso') || 
    text.includes('onda p') || text.includes('qrs') || text.includes('onda t')
  ) {
    return {
      grupo: "Módulo I: Evaluación y Diagnóstico Cardiovascular",
      normalizado: sub.includes('epidemiolog') ? "Epidemiología y Factores de Riesgo" : "Examen Físico Cardiovascular"
    };
  }

  if (
    sub.includes('arritmia') || sub.includes('bloqueo') || sub.includes('conducci') ||
    sub.includes('antiarr') || sub.includes('flúter') || sub.includes('fluter') ||
    sub.includes('fibrilaci') || sub.includes('wpw') || sub.includes('wolff') ||
    sub.includes('reentrada') || sub.includes('tachycardi') || sub.includes('bradiar') ||
    text.includes('antiarrítmico') || text.includes('bloqueo') || text.includes('taquicardia') ||
    text.includes('fibrilación') || text.includes('flúter') || text.includes('flutter')
  ) {
    return {
      grupo: "Módulo II: Arritmias y Conducción",
      normalizado: (sub.includes('antiarr') || text.includes('antiarrítmico')) ? "Antiarrítmicos y Tratamiento" :
                   (sub.includes('fibrilaci') && text.includes('ventricular')) ? "Arritmias Ventriculares y Paro" :
                   (sub.includes('fibrilaci') && text.includes('auricular')) ? "Fibrilación Auricular (FA)" :
                   "Arritmias y Trastornos de Conducción"
    };
  }

  return {
    grupo: "Módulo I: Evaluación y Diagnóstico Cardiovascular",
    normalizado
  };
}


function normalizeS12(rawSubtema: string, questionText: string, questionId?: string): { grupo: string, normalizado: string } {
  const sub = rawSubtema.toLowerCase().trim();
  const normalizado = toTitleCase(rawSubtema);

  if (
    sub.includes("amenorrea") || sub.includes("menstrual") || sub.includes("asherman") ||
    sub.includes("müller") || sub.includes("muller") || sub.includes("disgenesia") || sub.includes("hipogonadismo") ||
    sub.includes("galactosemia") || sub.includes("prolactina") || sub.includes("tiroidismo") ||
    sub.includes("gonadal") || sub.includes("conductos") || sub.includes("eugonadotrópica")
  ) {
    return { grupo: "Módulo I: Fisiopatología y Diagnóstico de las Amenorreas", normalizado };
  }

  if (
    sub.includes("anticoncep") || sub.includes("aco") || sub.includes("parche") ||
    sub.includes("anillo") || sub.includes("diu") || sub.includes("cobre") ||
    sub.includes("progestágeno") || sub.includes("progestageno") || sub.includes("etonogestrel") ||
    sub.includes("medroxiprogesterona") || sub.includes("lactancia") || sub.includes("esterilización") ||
    sub.includes("esterilizacion") || sub.includes("elegibilidad")
  ) {
    return { grupo: "Módulo II: Métodos Anticonceptivos y Planificación Familiar", normalizado };
  }

  return { grupo: "Módulo III: Climaterio, Menopausia y Salud Femenina", normalizado };
}

function normalizeS13(rawSubtema: string, questionText: string, questionId?: string): { grupo: string, normalizado: string } {
  const sub = rawSubtema.toLowerCase().trim();
  const normalizado = toTitleCase(rawSubtema);

  if (
    sub.includes("arritmia") || sub.includes("bradicardia") || sub.includes("taquicardia") ||
    sub.includes("paro") || sub.includes("pals") || sub.includes("soporte avanzado") ||
    sub.includes("algoritmo")
  ) {
    return { grupo: "Módulo II: Arritmias Pediátricas, Paro Cardiorrespiratorio y Soporte Avanzado (PALS)", normalizado };
  }

  if (
    sub.includes("shock") || sub.includes("hemodinámico") || sub.includes("hemodinamico")
  ) {
    return { grupo: "Módulo III: Fisiología, Tipos y Manejo Hemodinámico del Shock", normalizado };
  }

  if (
    sub.includes("trauma") || sub.includes("politraumatizado") || sub.includes("presión intracraneal") ||
    sub.includes("presion intracraneal") || sub.includes("ppc") || sub.includes("neurocuidados") ||
    sub.includes("hipertensión intracraneal") || sub.includes("hipertension intracraneal")
  ) {
    return { grupo: "Módulo IV: Trauma Pediátrico, Neurocuidados y Presión Intracraneal", normalizado };
  }

  if (
    sub.includes("ahogamiento") || sub.includes("quemadura") || sub.includes("sctq") ||
    sub.includes("inhalación") || sub.includes("inhalacion")
  ) {
    return { grupo: "Módulo V: Emergencias Ambientales (Ahogamiento y Quemaduras)", normalizado };
  }

  return { grupo: "Módulo I: Evaluación y Soporte Vital Pediátrico (TEP, BLS y Soporte Inicial)", normalizado };
}

function normalizeS11(rawSubtema: string, questionText: string, questionId?: string): { grupo: string, normalizado: string } {
  let sub = rawSubtema.toLowerCase().trim();
  const text = questionText.toLowerCase();
  let normalizado = toTitleCase(rawSubtema);

  // If subtheme is generic, try to guess from the question text
  if (sub === 'general' || sub === '') {
    if (text.includes('deglución') || text.includes('deglucion') || text.includes('fase faríngea')) {
      sub = 'fisiología de la deglución';
      normalizado = 'Fisiología de la Deglución';
    } else if (text.includes('peristalsis') || text.includes('peristáltica')) {
      sub = 'peristalsis esofágica';
      normalizado = 'Peristalsis Esofágica';
    } else if (text.includes('estrechamiento') || text.includes('cricofaríngeo')) {
      sub = 'estrechamientos anatómicos';
      normalizado = 'Estrechamientos Anatómicos';
    } else if (text.includes('nissen') || text.includes('funduplicatura de nissen')) {
      sub = 'técnica de funduplicatura de nissen';
      normalizado = 'Técnica de Funduplicatura de Nissen';
    } else if (text.includes('collis') || text.includes('gastroplastia')) {
      sub = 'gastroplastia de collis';
      normalizado = 'Gastroplastia de Collis';
    } else if (text.includes('toupet')) {
      sub = 'funduplicatura de toupet';
      normalizado = 'Funduplicatura de Toupet';
    } else if (text.includes('deslizamiento') || text.includes('paraesofágica') || text.includes('tipo iii') || text.includes('tipo i')) {
      sub = 'clasificación de hernia hiatal';
      normalizado = 'Clasificación de Hernia Hiatal';
    }
  }

  if (sub.includes('reflujo') || sub.includes('barrett') || sub.includes('esofagitis') || sub.includes('nissen') || sub.includes('toupet') || sub.includes('collis')) {
    return { grupo: "Enfermedad por Reflujo y Esofagitis", normalizado };
  }
  if (sub.includes('hernia') || sub.includes('hiatal')) {
    return { grupo: "Hernia Hiatal y Diafragmática", normalizado };
  }
  if (sub.includes('acalasia') || sub.includes('motilidad') || sub.includes('heller') || sub.includes('deglución') || sub.includes('deglucion') || sub.includes('peristalsis') || sub.includes('estrechamiento') || sub.includes('schatzki') || sub.includes('anillo')) {
    return { grupo: "Trastornos de Motilidad Esofágica", normalizado };
  }
  if (sub.includes('cáncer') || sub.includes('cancer') || sub.includes('tumor') || sub.includes('caústic') || sub.includes('caustic') || sub.includes('perforac') || sub.includes('perforaci')) {
    return { grupo: "Patología Tumoral y Emergencias Esofágicas", normalizado };
  }
  if (sub.includes('anatomía') || sub.includes('anatomia') || sub.includes('irrigac') || sub.includes('hormona') || sub.includes('diagnóstico de la enf') || sub.includes('diagnostico de la enf')) {
    return { grupo: "Anatomía y Fisiología Gástrica", normalizado };
  }
  if (sub.includes('ulcerosa') || sub.includes('péptica') || sub.includes('peptica') || sub.includes('sangrante')) {
    return { grupo: "Enfermedad Ulcerosa Péptica", normalizado };
  }
  if (sub.includes('adenocarcinoma') || sub.includes('gastrico') || sub.includes('gástrico') || sub.includes('linfoma')) {
    return { grupo: "Neoplasias Gástricas", normalizado };
  }

  return { grupo: "Cirugía de Esófago y Estómago", normalizado };
}

function normalizeS14(rawSubtema: string, questionText: string, questionId?: string): { grupo: string, normalizado: string } {
  const sub = rawSubtema.toLowerCase().trim();
  const text = questionText.toLowerCase();
  const normalizado = toTitleCase(rawSubtema);

  if (questionId?.startsWith('neumo_')) {
    return { grupo: "Neumología", normalizado };
  }

  if (questionId?.startsWith('reumato_')) {
    return { grupo: "Reumatología", normalizado };
  }

  if (
    sub.includes('reuma') || sub.includes('artritis') || sub.includes('lupus') || sub.includes('gosa') ||
    sub.includes('espondilo') || sub.includes('sjögren') || sub.includes('sjogren') || sub.includes('esclerosis') ||
    sub.includes('esclerodermia') || sub.includes('antifosfolípido') || sub.includes('antifosfolipido') || sub.includes('saf') ||
    sub.includes('conjuntivo') || sub.includes('vasculit') || sub.includes('granulomatosis') || sub.includes('poliangitis') ||
    sub.includes('miopatía') || sub.includes('miopatia') || sub.includes('takayasu') || sub.includes('churg') ||
    sub.includes('strauss') || sub.includes('psoriá') || sub.includes('psoria') || sub.includes('reactiva') ||
    sub.includes('anquilosante') || sub.includes('nodosa') ||
    text.includes('artritis') || text.includes('lupus') || text.includes('esclerosis sistémica') || text.includes('vasculitis')
  ) {
    return { grupo: "Reumatología", normalizado };
  }

  return { grupo: "Neumología", normalizado };
}

function normalizeS15(rawSubtema: string, questionText: string, questionId?: string): { grupo: string, normalizado: string } {
  const sub = rawSubtema.toLowerCase().trim();
  const normalizado = toTitleCase(rawSubtema);

  if (
    sub.includes('mama') || sub.includes('mastectomía') || sub.includes('mastectomia') || 
    sub.includes('carcinoma') || sub.includes('andi') || sub.includes('fibroadenoma') || 
    sub.includes('filoides') || sub.includes('mondor') || sub.includes('ginecomastia') || 
    sub.includes('telorrea') || sub.includes('paget') || sub.includes('brca') || sub.includes('tamoxifeno')
  ) {
    return { grupo: "Mamas (Patología Benigna, Maligna y Cirugía)", normalizado };
  }
  if (
    sub.includes('pared') || sub.includes('costal') || sub.includes('estern') || 
    sub.includes('desmoide') || sub.includes('condro') || sub.includes('osteosarcoma')
  ) {
    return { grupo: "Módulo I: Pared Torácica y Neoplasias de Pared", normalizado };
  }
  if (
    sub.includes('mediastin') || sub.includes('timoma') || sub.includes('quiste') || 
    sub.includes('germinal') || sub.includes('vaina del nervio') || sub.includes('ganglionar')
  ) {
    return { grupo: "Módulo III: Patología Mediastínica", normalizado };
  }
  if (
    sub.includes('pleur') || sub.includes('derrame') || sub.includes('empiema') || 
    sub.includes('mesotelioma') || sub.includes('quilotórax') || sub.includes('quilotorax') || 
    sub.includes('light')
  ) {
    return { grupo: "Módulo IV: Pleura y Derrame Pleural", normalizado };
  }
  return { grupo: "Módulo II: Neoplasias Pulmonares y Resección Torácica", normalizado };
}

function normalizeS16(rawSubtema: string, questionText: string, questionId?: string): { grupo: string, normalizado: string } {
  const sub = rawSubtema.toLowerCase().trim();
  const normalizado = toTitleCase(rawSubtema);

  if (sub.includes('poliqu') || sub.includes('sop') || sub.includes('hormonas') || sub.includes('rotterdam') || sub.includes('hirsutismo') || sub.includes('metformina') || sub.includes('hairan') || sub.includes('hipertecosis')) {
    return { grupo: "Síndrome de Ovarios Poliquísticos (SOP)", normalizado };
  }
  if (sub.includes('sangrado') || sub.includes('sua') || sub.includes('figo') || sub.includes('menstrual') || sub.includes('etario') || sub.includes('pólipo') || sub.includes('polipo') || sub.includes('coagulopat') || sub.includes('ablación') || sub.includes('ablacion')) {
    return { grupo: "Sangrado Uterino Anormal (SUA)", normalizado };
  }
  if (sub.includes('leiomioma') || sub.includes('adenomiosis') || sub.includes('hematometra') || sub.includes('benigna')) {
    return { grupo: "Patología Uterina Benigna", normalizado };
  }
  if (sub.includes('endometriosis')) {
    return { grupo: "Endometriosis", normalizado };
  }
  return { grupo: "Ginecología", normalizado };
}

function analyzeSubtemaRaw(
  rawSubtema: string | undefined,
  materia?: string,
  _semana?: number | string,
  questionText?: string,
  questionId?: string
): SubtemaInfo {
  if (!rawSubtema) return { normalizado: "General", grupo: "General" };

  if (rawSubtema.startsWith("Módulo ") || rawSubtema.startsWith("Modulo ")) {
    return { normalizado: rawSubtema, grupo: rawSubtema };
  }

  // Diccionario para evitar doble normalización y resolver temas ya formateados
  if (!questionId) {
    const customModules: Record<string, string> = {
      // Semana 6
      "Sepsis y Choque": "Módulo I: Cuidados Intensivos y Soporte Crítico",
      "Insuficiencia Respiratoria y SDRA": "Módulo I: Cuidados Intensivos y Soporte Crítico",
      "Soporte Cardiovascular Crítico y RCP": "Módulo I: Cuidados Intensivos y Soporte Crítico",
      "Anemia Megaloblástica y Ferropénica": "Módulo II: Trastornos de los Eritrocitos (Anemias)",
      "Anemia Hemolítica": "Módulo II: Trastornos de los Eritrocitos (Anemias)",
      "Anemias": "Módulo II: Trastornos de los Eritrocitos (Anemias)",
      "Insuficiencia Medular y Neoplasias Mieloproliferativas": "Módulo III: Neoplasias Hematológicas (Mieloide y Linfoide)",
      "Insuficiencia Medular (Anemia Aplásica/Mielodisplasia)": "Módulo III: Neoplasias Hematológicas (Mieloide y Linfoide)",
      "Neoplasias Mieloproliferativas": "Módulo III: Neoplasias Hematológicas (Mieloide y Linfoide)",
      "Leucemia Aguda": "Módulo III: Neoplasias Hematológicas (Mieloide y Linfoide)",
      "Leucemia Crónica y Mieloma Múltiple": "Módulo III: Neoplasias Hematológicas (Mieloide y Linfoide)",
      "Linfomas": "Módulo III: Neoplasias Hematológicas (Mieloide y Linfoide)",
      "Trastornos de la Coagulación": "Módulo IV: Hemostasia, Coagulación y Transfusión",
      "Urgencias Oncológicas y Soporte": "Módulo V: Urgencias Oncológicas y Cuidados de Soporte en Cáncer",
      // Semana 7
      "Evaluación Inicial y Reanimación en Trauma": "Módulo I: Evaluación Primaria y Soporte Vital (ATLS)",
      "Trauma Craneoencefálico": "Módulo I: Evaluación Primaria y Soporte Vital (ATLS)",
      "Choque Hemorrágico": "Módulo II: Choque y Reanimación",
      "Toracotomía en Urgencias": "Módulo II: Choque y Reanimación",
      "Trauma Torácico": "Módulo III: Trauma por Regiones Anatómicas",
      "Trauma Abdominal": "Módulo III: Trauma por Regiones Anatómicas",
      "Trauma de Extremidades y Vascular": "Módulo III: Trauma por Regiones Anatómicas",
      "Síndrome de Compartimento Abdominal": "Módulo IV: Estrategias Quirúrgicas Críticas en Trauma",
      "Fisiopatología y Clasificación de Quemaduras": "Módulo V: Quemaduras (Fisiopatología, Reanimación y Cuidado)",
      "Quemaduras Químicas": "Módulo V: Quemaduras (Fisiopatología, Reanimación y Cuidado)",
      "Quemaduras Eléctricas": "Módulo V: Quemaduras (Fisiopatología, Reanimación y Cuidado)",
      "Lesión por Inhalación y Toxicología": "Módulo V: Quemaduras (Fisiopatología, Reanimación y Cuidado)"
    };

    const matchedMod = customModules[rawSubtema];
    if (matchedMod) {
      return { normalizado: rawSubtema, grupo: matchedMod };
    }
  }

  let semanaNum = _semana !== undefined ? Number(_semana) : undefined;
  
  let activeSemana = semanaNum;
  if (!activeSemana) {
    const lower = rawSubtema.toLowerCase().trim();
    if (lower.includes("diabetes") || lower.includes("tiroid") || lower.includes("cushing") || lower.includes("prolactina") || lower.includes("suprarrenal") || lower.includes("feocromocitoma")) activeSemana = 2;
    else if (lower.includes("neonatal") || lower.includes("recién nacido") || lower.includes("asfixia")) activeSemana = 1;
    else if (lower.includes("cicatriz") || lower.includes("queloides") || lower.includes("melanoma")) activeSemana = 3;
    else if (lower.includes("pelvis") || lower.includes("vagina") || lower.includes("prolapso")) activeSemana = 4;
    else if (lower.includes("nutricion") || lower.includes("desnutrición") || lower.includes("antropometría")) activeSemana = 5;
    else if (lower.includes("anemias") || lower.includes("leucemia") || lower.includes("linfoma") || lower.includes("sepsis")) activeSemana = 6;
    else if (lower.includes("trauma") || lower.includes("quemadura")) activeSemana = 7;
    else if (lower.includes("endometriosis") || lower.includes("vaginitis") || lower.includes("vaginosis") || lower.includes("ginecología") || lower.includes("gonadotropina") || lower.includes("reproducción") || lower.includes("ovulación")) activeSemana = 8;
    else if (lower.includes("vacuna") || lower.includes("inmuniza") || lower.includes("desarrollo") || lower.includes("crecimiento")) activeSemana = 9;
    else if (lower.includes("soplo") || lower.includes("arritmia") || lower.includes("cardio") || lower.includes("valvulo") || lower.includes("pericard") || lower.includes("infarto") || lower.includes("coronario") || lower.includes("soplos") || lower.includes("cardiología") || lower.includes("cardiologia")) activeSemana = 10;
    else if (lower.includes("esófago") || lower.includes("esofago") || lower.includes("estómago") || lower.includes("estomago") || lower.includes("hiatal") || lower.includes("acalasia") || lower.includes("reflujo") || lower.includes("gastrectomía") || lower.includes("gastrectomia") || lower.includes("gástric") || lower.includes("gastric")) activeSemana = 11;
    else if (lower.includes("amenorrea") || lower.includes("anticoncep") || lower.includes("menopausia") || lower.includes("asherman") || lower.includes("müller")) activeSemana = 12;
    else if (lower.includes("pediatr") || lower.includes("tep") || lower.includes("bls") || lower.includes("pals") || lower.includes("ahogamiento") || lower.includes("politraumatizado")) activeSemana = 13;
    else if (lower.includes("neumo") || lower.includes("asma") || lower.includes("epoc") || lower.includes("reuma") || lower.includes("artritis") || lower.includes("lupus")) activeSemana = 14;
    else if (lower.includes("torácica") || lower.includes("toracica") || lower.includes("mediastino") || lower.includes("pleura") || lower.includes("quilotórax") || lower.includes("timoma")) activeSemana = 15;
    else if (lower.includes("poliqu") || lower.includes("sop") || lower.includes("sangrado") || lower.includes("sua") || lower.includes("leiomioma") || lower.includes("adenomiosis")) activeSemana = 16;
  }

  let mod: { grupo: string, normalizado: string } | null = null;
  if (activeSemana === 1) mod = normalizeS1(rawSubtema, questionText || "", questionId);
  else if (activeSemana === 2) mod = normalizeS2(rawSubtema, questionText || "", questionId);
  else if (activeSemana === 3) mod = normalizeS3(rawSubtema, questionText || "", questionId);
  else if (activeSemana === 4) mod = normalizeS4(rawSubtema, questionText || "", questionId);
  else if (activeSemana === 5) mod = normalizeS5(rawSubtema, questionText || "", questionId);
  else if (activeSemana === 6) mod = normalizeS6(rawSubtema, questionText || "", questionId);
  else if (activeSemana === 7) mod = normalizeS7(rawSubtema, questionText || "", questionId);
  else if (activeSemana === 8) mod = normalizeS8(rawSubtema, questionText || "", questionId);
  else if (activeSemana === 9) mod = normalizeS9(rawSubtema, questionText || "", questionId);
  else if (activeSemana === 10) mod = normalizeS10(rawSubtema, questionText || "", questionId);
  else if (activeSemana === 11) mod = normalizeS11(rawSubtema, questionText || "", questionId);
  else if (activeSemana === 12) mod = normalizeS12(rawSubtema, questionText || "", questionId);
  else if (activeSemana === 13) mod = normalizeS13(rawSubtema, questionText || "", questionId);
  else if (activeSemana === 14) mod = normalizeS14(rawSubtema, questionText || "", questionId);
  else if (activeSemana === 15) mod = normalizeS15(rawSubtema, questionText || "", questionId);
  else if (activeSemana === 16) mod = normalizeS16(rawSubtema, questionText || "", questionId);

  if (mod) {
    return { normalizado: mod.normalizado, grupo: mod.grupo };
  }

  const normalizado = toTitleCase(rawSubtema);
  return { normalizado, grupo: "General" };
}

export function analyzeSubtema(
  rawSubtema: string | undefined,
  materia?: string,
  _semana?: number | string,
  questionText?: string,
  questionId?: string
): SubtemaInfo {
  const res = analyzeSubtemaRaw(rawSubtema, materia, _semana, questionText, questionId);
  let semanaNum = _semana !== undefined ? Number(_semana) : undefined;
  if (!semanaNum && rawSubtema) {
    const lower = rawSubtema.toLowerCase().trim();
    if (lower.includes("diabetes") || lower.includes("tiroid") || lower.includes("cushing") || lower.includes("prolactina") || lower.includes("suprarrenal") || lower.includes("feocromocitoma")) semanaNum = 2;
    else if (lower.includes("neonatal") || lower.includes("recién nacido") || lower.includes("asfixia")) semanaNum = 1;
    else if (lower.includes("cicatriz") || lower.includes("queloides") || lower.includes("melanoma")) semanaNum = 3;
    else if (lower.includes("pelvis") || lower.includes("vagina") || lower.includes("prolapso")) semanaNum = 4;
    else if (lower.includes("nutricion") || lower.includes("desnutrición") || lower.includes("antropometría")) semanaNum = 5;
    else if (lower.includes("anemias") || lower.includes("leucemia") || lower.includes("linfoma") || lower.includes("sepsis")) semanaNum = 6;
    else if (lower.includes("trauma") || lower.includes("quemadura")) semanaNum = 7;
    else if (lower.includes("endometriosis") || lower.includes("vaginitis") || lower.includes("vaginosis") || lower.includes("ginecología") || lower.includes("gonadotropina") || lower.includes("reproducción") || lower.includes("ovulación")) semanaNum = 8;
    else if (lower.includes("vacuna") || lower.includes("inmuniza") || lower.includes("desarrollo") || lower.includes("crecimiento")) semanaNum = 9;
    else if (lower.includes("soplo") || lower.includes("arritmia") || lower.includes("cardio") || lower.includes("valvulo") || lower.includes("pericard") || lower.includes("infarto") || lower.includes("coronario") || lower.includes("soplos") || lower.includes("cardiología") || lower.includes("cardiologia")) semanaNum = 10;
    else if (lower.includes("esófago") || lower.includes("esofago") || lower.includes("estómago") || lower.includes("estomago") || lower.includes("hiatal") || lower.includes("acalasia") || lower.includes("reflujo") || lower.includes("gastrectomía") || lower.includes("gastrectomia") || lower.includes("gástric") || lower.includes("gastric")) semanaNum = 11;
  }
  return {
    normalizado: res.normalizado,
    grupo: cleanGroupName(res.grupo, semanaNum, res.normalizado)
  };
}
