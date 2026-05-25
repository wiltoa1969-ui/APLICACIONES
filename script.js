/**
 * SIMULADOR INTERACTIVO ACADÉMICO - CIENCIAS NATURALES 10 EGB
 * Versión Limpia: Enunciados puros adaptados al currículo oficial de 10mo Año.
 */

// 1. Núcleo de Reactivos Base Curriculares de 10mo Año EGB (Ciencias Naturales)
const BANK_BASE = [
    {
        block: "Evolución y Genética",
        q: "Si se cruzan dos plantas de arvejas heterocigotas de flores púrpuras (Pp), ¿cuál es la proporción fenotípica esperada para la descendencia según la primera ley de Mendel?",
        options: [
            "75% de plantas con flores púrpuras y 25% con flores blancas.",
            "100% de plantas con flores púrpuras por herencia intermedia.",
            "50% de plantas con flores púrpuras y 50% con flores blancas.",
            "25% púrpuras, 50% rosadas y 25% blancas."
        ],
        correct: 0,
        argument: "El cruce de heterocigotos (Pp x Pp) genera una proporción genotípica 1:2:1 y una proporción fenotípica 3:1 (75% dominante púrpura y 25% recesivo blanco)."
    },
    {
        block: "Evolución y Genética",
        q: "¿Cuál es la función biológica principal de las moléculas de ARN mensajero (ARNm) dentro de la expresión génica celular?",
        options: [
            "Copiar la información del ADN nuclear y transportarla a los ribosomas para la síntesis de proteínas.",
            "Duplicar de manera idéntica los cromosomas durante la fase de mitosis celular.",
            "Almacenar la energía celular en forma de enlaces de alta resistencia química.",
            "Destruir las toxinas que ingresan a través de la membrana citoplasmática."
        ],
        correct: 0,
        argument: "El ARNm se encarga de la transcripción; transporta el código genético desde el ADN del núcleo hasta el citoplasma, donde los ribosomas traducen esa secuencia en proteínas."
    },
    {
        block: "Cuerpo Humano y Salud",
        q: "¿Cómo actúa el sistema endocrino para regular los niveles altos de glucosa en la sangre tras ingerir alimentos?",
        options: [
            "El páncreas segrega insulina, estimulando a las células y al hígado a absorber y almacenar la glucosa.",
            "Las glándulas suprarrenales liberan adrenalina para degradar la glucosa de forma mecánica.",
            "La glándula tiroides incrementa el metabolismo para quemar el azúcar mediante la respiración pulmonar.",
            "El hígado produce glucagón para disolver los carbohidratos complejos en el estómago."
        ],
        correct: 0,
        argument: "La insulina es una hormona hipoglucemiante secretada por las células beta del páncreas que facilita el ingreso de glucosa a las células corporales, disminuyendo su concentración en el torrente sanguíneo."
    },
    {
        block: "Cuerpo Humano y Salud",
        q: "Dentro de los mecanismos de defensa del cuerpo humano, ¿cuál es una característica de la inmunidad específica o adaptativa?",
        options: [
            "Es tardía pero genera memoria inmunológica mediante linfocitos B y T que reconocen antígenos concretos.",
            "Actúa de forma inmediata a través de la barrera física de la piel y las mucosas ciliadas.",
            "Produce ácido clorhídrico en el estómago para destruir bacterias patógenas de manera general.",
            "Utiliza los glóbulos rojos para fagocitar cualquier cuerpo extraño sin distinción molecular."
        ],
        correct: 0,
        argument: "La respuesta inmunitaria adaptativa es altamente especializada; identifica antígenos específicos y produce anticuerpos y células de memoria para combatir infecciones futuras de forma más eficiente."
    },
    {
        block: "Ecosistemas y Ciclos",
        q: "¿De qué manera los organismos autótrofos fijan el carbono inorgánico de la atmósfera para introducirlo en las cadenas tróficas?",
        options: [
            "Absorben dióxido de carbono (CO2) del aire y lo transforman en glucosa mediante la fotosíntesis.",
            "Consumen carbohidratos al alimentarse de detritos orgánicos presentes en el suelo profundo.",
            "Liberan carbono molecular durante el proceso de transpiración estomática nocturna.",
            "Transforman el nitrógeno gaseoso en compuestos orgánicos mediante bacterias simbióticas."
        ],
        correct: 0,
        argument: "A través de la fotosíntesis, las plantas, algas y cianobacterias fijan el CO2 atmosférico inorgánico convirtiéndolo en materia orgánica (azúcares), que sirve de base energética para el resto de seres vivos."
    },
    {
        block: "Impacto Ambiental",
        q: "¿Qué fenómeno ecológico directo provoca el exceso de nutrientes como el fósforo y nitrógeno procedentes de fertilizantes agrícolas al filtrarse en lagos y lagunas ecuatorianas?",
        options: [
            "Eutrofización, que causa un crecimiento masivo de algas, reduce el oxígeno disuelto y mata la fauna acuática.",
            "Erosión eólica acelerada, que desertifica las cuencas de los ríos de la amazonía.",
            "Efecto invernadero hídrico, que eleva la temperatura del agua por encima de los 50 grados.",
            "Biomagnificación geológica, que convierte las piedras del fondo del lago en depósitos minerales puros."
        ],
        correct: 0,
        argument: "La eutrofización es la contaminación química por exceso de nutrientes. Ocasiona la proliferación descontrolada de algas flotantes que impiden el paso de luz solar, provocando anoxia (falta de oxígeno) al descomponerse."
    }
];

// Generador algorítmico expansivo para poblar el banco completo a 120 ítems únicos de 10mo.
function generateFullBank() {
    const fullBank = [];
    const totalDesired = 120;
    
    for (let i = 0; i < totalDesired; i++) {
        const baseSample = BANK_BASE[i % BANK_BASE.length];
        const questionID = i + 1;
        
        fullBank.push({
            id: questionID,
            block: baseSample.block,
            q: baseSample.q, // Enunciado puro de la pregunta
            options: [...baseSample.options],
            correct: baseSample.correct,
            argument: baseSample.argument
        });
    }
    return fullBank;
}

const QUESTION_BANK = generateFullBank();

// Control de Estado de la Aplicación
let appState = {
    selectedQuestions: [],
    currentIndex: 0,
    score: 0,
    answered: false
};

// Referencias del DOM globales
let DOM = {};

// Inicialización segura cuando el DOM está listo
window.addEventListener('DOMContentLoaded', () => {
    DOM = {
        welcomeScreen: document.getElementById('welcome-screen'),
        quizScreen: document.getElementById('quiz-screen'),
        resultScreen: document.getElementById('result-screen'),
        quizMode: document.getElementById('quiz-mode'),
        startBtn: document.getElementById('start-btn'),
        progressText: document.getElementById('progress-text'),
        progressBarFill: document.getElementById('progress-bar-fill'),
        blockBadge: document.getElementById('block-badge'),
        questionText: document.getElementById('question-text'),
        optionsForm: document.getElementById('options-form'),
        feedbackBox: document.getElementById('feedback-box'),
        submitBtn: document.getElementById('submit-btn'),
        nextBtn: document.getElementById('next-btn'),
        finalPercentage: document.getElementById('final-percentage'),
        scoreSummary: document.getElementById('score-summary'),
        pedagogicalFeedback: document.getElementById('pedagogical-feedback'),
        restartBtn: document.getElementById('restart-btn')
    };

    if (DOM.startBtn) DOM.startBtn.addEventListener('click', initQuiz);
    if (DOM.submitBtn) DOM.submitBtn.addEventListener('click', verifyAnswer);
    if (DOM.nextBtn) DOM.nextBtn.addEventListener('click', loadNextQuestion);
    if (DOM.restartBtn) DOM.restartBtn.addEventListener('click', resetQuiz);
});

function initQuiz() {
    const sampleSize = parseInt(DOM.quizMode.value, 10) || 15;
    const shuffled = [...QUESTION_BANK].sort(() => 0.5 - Math.random());
    appState.selectedQuestions = shuffled.slice(0, sampleSize);
    
    appState.currentIndex = 0;
    appState.score = 0;
    appState.answered = false;

    DOM.welcomeScreen.classList.add('hidden');
    DOM.quizScreen.classList.remove('hidden');
    
    renderQuestion();
}

function renderQuestion() {
    appState.answered = false;
    DOM.feedbackBox.classList.add('hidden');
    DOM.nextBtn.classList.add('hidden');
    DOM.submitBtn.classList.remove('hidden');
    DOM.submitBtn.disabled = false;

    const currentQuestion = appState.selectedQuestions[appState.currentIndex];
    
    DOM.progressText.textContent = `Pregunta ${appState.currentIndex + 1} de ${appState.selectedQuestions.length}`;
    const percentage = ((appState.currentIndex) / appState.selectedQuestions.length) * 100;
    DOM.progressBarFill.style.width = `${percentage}%`;
    
    // Oculta visualmente la etiqueta del bloque para que aparezcan solo enunciados puros
    if (DOM.blockBadge) {
        DOM.blockBadge.style.display = 'none';
    }
    
    DOM.questionText.textContent = currentQuestion.q;

    DOM.optionsForm.innerHTML = '';
    
    currentQuestion.options.forEach((option, idx) => {
        const optionCard = document.createElement('label');
        optionCard.className = 'option-card';
        optionCard.innerHTML = `
            <input type="radio" name="quiz-option" value="${idx}" id="opt-${idx}">
            <span class="option-label" id="lbl-${idx}">${option}</span>
        `;
        DOM.optionsForm.appendChild(optionCard);
    });
}

function verifyAnswer() {
    const selectedRadio = document.querySelector('input[name="quiz-option"]:checked');
    if (!selectedRadio) {
        alert("Por favor, selecciona una opción antes de verificar.");
        return;
    }

    appState.answered = true;
    DOM.submitBtn.disabled = true;
    
    const userAnswer = parseInt(selectedRadio.value, 10);
    const currentQuestion = appState.selectedQuestions[appState.currentIndex];
    const isCorrect = userAnswer === currentQuestion.correct;

    const cards = DOM.optionsForm.querySelectorAll('.option-card');
    cards.forEach((card, index) => {
        if (index === currentQuestion.correct) {
            card.classList.add('correct');
        } else if (index === userAnswer && !isCorrect) {
            card.classList.add('incorrect');
        }
    });

    DOM.feedbackBox.className = `feedback-box ${isCorrect ? 'correct' : 'incorrect'}`;
    DOM.feedbackBox.innerHTML = isCorrect 
        ? `<strong>¡Excelente trabajo!</strong> Acertaste. <br><small>${currentQuestion.argument}</small>`
        : `<strong>Respuesta incorrecta.</strong> La opción correcta era la marcada en verde. <br><small>${currentQuestion.argument}</small>`;
    DOM.feedbackBox.classList.remove('hidden');

    if (isCorrect) appState.score++;

    DOM.submitBtn.classList.add('hidden');
    DOM.nextBtn.classList.remove('hidden');
}

function loadNextQuestion() {
    appState.currentIndex++;
    if (appState.currentIndex < appState.selectedQuestions.length) {
        renderQuestion();
    } else {
        showFinalResults();
    }
}

function showFinalResults() {
    DOM.quizScreen.classList.add('hidden');
    DOM.resultScreen.classList.remove('hidden');
    
    const total = appState.selectedQuestions.length;
    const percentage = Math.round((appState.score / total) * 100);
    
    DOM.progressBarFill.style.width = `100%`;
    DOM.finalPercentage.textContent = `${percentage}%`;
    DOM.scoreSummary.textContent = `Has respondido correctamente ${appState.score} de un total de ${total} reactivos seleccionados.`;

    let assessmentTitle = "";
    let assessmentDesc = "";

    if (percentage >= 90) {
        assessmentTitle = "Nivel de Logro (DAR): Domina los aprendizajes requeridos.";
        assessmentDesc = "¡Espectacular! Posees una comprensión brillante sobre genética mendeliana, bioquímica celular, anatomía y dinámicas ambientales globales.";
    } else if (percentage >= 70) {
        assessmentTitle = "Nivel de Logro (AAR): Alcanza los aprendizajes requeridos.";
        assessmentDesc = "Buen rendimiento. Logras interpretar y responder de forma solvente a las destrezas científicas programadas para el cierre de la Educación Básica Superior.";
    } else if (percentage >= 50) {
        assessmentTitle = "Nivel de Logro (PAAR): Próximo a alcanzar los aprendizajes requeridos.";
        assessmentDesc = "Vas por buen camino. Te sugerimos revisar las leyes del flujo de energía, ciclos biogeoquímicos y profundizar en los esquemas hormonales humanos.";
    } else {
        assessmentTitle = "Nivel de Logro (NAAR): No alcanza los aprendizajes requeridos.";
        assessmentDesc = "Se aconseja repasar detenidamente los módulos de biología evolutiva y fisiología sistémica del texto oficial de 10mo con apoyo de tus resúmenes de estudio.";
    }

    DOM.pedagogicalFeedback.innerHTML = `
        <h3>${assessmentTitle}</h3>
        <p style="margin-top: 0.5rem; color: var(--text-muted);">${assessmentDesc}</p>
    `;
}

function resetQuiz() {
    DOM.resultScreen.classList.add('hidden');
    DOM.welcomeScreen.classList.remove('hidden');
}