/* ==========================================
   TAB KHADY'S
   script.js
   Partie 3A
========================================== */

/* ===========================
   VARIABLES
=========================== */

const pages = document.querySelectorAll(".page");

const accueil = document.getElementById("accueil");
const selection = document.getElementById("selection");
const apprentissage = document.getElementById("apprentissage");
const quiz = document.getElementById("quiz");
const resultat = document.getElementById("resultat");

const btnCommencer = document.getElementById("btnCommencer");
const btnExercice = document.getElementById("btnExercice");

const btnAccueil = document.getElementById("btnAccueil");
const btnRejouer = document.getElementById("btnRejouer");

const tableButtons = document.querySelectorAll(".table-btn");
const retourButtons = document.querySelectorAll(".btnRetour");

const titreTable = document.getElementById("titreTable");
const listeMultiplication = document.getElementById("listeMultiplication");

/* ===========================
   VARIABLES DU JEU
=========================== */

let tableChoisie = 2;

let questions = [];

let indexQuestion = 0;

let score = 0;

/* ===========================
   CHANGER DE PAGE
=========================== */

function afficherPage(pageActive) {

    pages.forEach(page => {

        page.classList.remove("active");

    });

    pageActive.classList.add("active");

}

/* ===========================
   BOUTON COMMENCER
=========================== */

btnCommencer.addEventListener("click", () => {

    afficherPage(selection);

});

/* ===========================
   CHOIX DE LA TABLE
=========================== */

tableButtons.forEach(button => {

    button.addEventListener("click", () => {

        tableChoisie = Number(button.dataset.table);

        afficherTable();

        afficherPage(apprentissage);

    });

});

/* ===========================
   AFFICHER LA TABLE
=========================== */

function afficherTable() {

    titreTable.textContent = `Table de ${tableChoisie}`;

    listeMultiplication.innerHTML = "";

    for (let i = 1; i <= 12; i++) {

        const ligne = document.createElement("div");

        ligne.className = "ligne";

        ligne.textContent = `${tableChoisie} × ${i} = ${tableChoisie * i}`;

        listeMultiplication.appendChild(ligne);

    }

}

/* ===========================
   RETOUR
=========================== */

retourButtons.forEach(button => {

    button.addEventListener("click", () => {

        afficherPage(selection);

    });

});

/* ===========================
   BOUTON EXERCICE
=========================== */

btnExercice.addEventListener("click", () => {

    /*
      La logique du quiz
      sera ajoutée dans
      la Partie 3B.
    */

    afficherPage(quiz);

});


/* ==========================================
   TAB KHADY'S
   script.js
   Partie 3B-1
========================================== */

/* ===========================
   ÉLÉMENTS DU QUIZ
=========================== */

const question = document.getElementById("question");
const reponse = document.getElementById("reponse");
const btnValider = document.getElementById("btnValider");
const message = document.getElementById("message");

const progress = document.getElementById("progress");
const progressText = document.getElementById("progressText");

/* ===========================
   GÉNÉRATION DES QUESTIONS
=========================== */

function genererQuestions() {

    questions = [];

    for (let i = 1; i <= 12; i++) {

        questions.push({

            a: tableChoisie,

            b: i,

            resultat: tableChoisie * i

        });

    }

    melangerQuestions();

}

/* ===========================
   MÉLANGE DES QUESTIONS
=========================== */

function melangerQuestions() {

    for (let i = questions.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [questions[i], questions[j]] =
        [questions[j], questions[i]];

    }

}

/* ===========================
   DÉMARRER LE QUIZ
=========================== */

function demarrerQuiz() {

    genererQuestions();

    score = 0;

    indexQuestion = 0;

    message.textContent = "";

    reponse.value = "";

    afficherQuestion();

}

/* ===========================
   AFFICHER UNE QUESTION
=========================== */

function afficherQuestion() {

    const q = questions[indexQuestion];

    question.textContent =
        `${q.a} × ${q.b} = ?`;

    reponse.value = "";

    reponse.focus();

    mettreAJourProgression();

}

/* ===========================
   BARRE DE PROGRESSION
=========================== */

function mettreAJourProgression() {

    const pourcentage =
        (indexQuestion / questions.length) * 100;

    progress.style.width = pourcentage + "%";

    progressText.textContent =
        `${indexQuestion} / ${questions.length}`;

}

/* ===========================
   MODIFICATION DU BOUTON
   EXERCICE
=========================== */

/*
Supprime ce bloc de la Partie 3A :

btnExercice.addEventListener("click", () => {

    afficherPage(quiz);

});

et remplace-le par celui-ci :
*/

btnExercice.addEventListener("click", () => {

    demarrerQuiz();

    afficherPage(quiz);

});

/* ===========================
   TOUCHE ENTRÉE
=========================== */

reponse.addEventListener("keydown", function(e){

    if(e.key === "Enter"){

        btnValider.click();

    }

});
/* ==========================================
   TAB KHADY'S
   script.js
   Partie 3B-2
========================================== */

/* ===========================
   VALIDER UNE RÉPONSE
=========================== */

btnValider.addEventListener("click", verifierReponse);

function verifierReponse() {

    // Vérifie qu'une réponse a été saisie
    if (reponse.value === "") {

        message.style.color = "#DC2626";
        message.textContent = "Veuillez saisir une réponse.";
        reponse.focus();
        return;

    }

    const q = questions[indexQuestion];
    const valeur = Number(reponse.value);

    if (valeur === q.resultat) {

        score++;

        message.style.color = "#16A34A";
        message.textContent = "✅ Bonne réponse !";

    } else {

        message.style.color = "#DC2626";
        message.textContent =
            `❌ Mauvaise réponse ! La bonne réponse était ${q.resultat}.`;

    }

    // Désactive temporairement le bouton
    btnValider.disabled = true;

    // Passe automatiquement à la question suivante
    setTimeout(() => {

        indexQuestion++;

        mettreAJourProgression();

        if (indexQuestion >= questions.length) {

            terminerQuiz();

        } else {

            afficherQuestion();

            message.textContent = "";

        }

        btnValider.disabled = false;

    }, 1200);

}

/* ===========================
   TERMINER LE QUIZ
=========================== */

function terminerQuiz() {

    progress.style.width = "100%";
    progressText.textContent =
        `${questions.length} / ${questions.length}`;

    afficherResultat();

}
/* ==========================================
   TAB KHADY'S
   script.js
   Partie 3C
========================================== */

/* ===========================
   ÉLÉMENTS DE LA PAGE RÉSULTAT
=========================== */

const emoji = document.querySelector(".emoji");
const scoreFinal = document.getElementById("scoreFinal");

/* ===========================
   AFFICHER LE RÉSULTAT
=========================== */

function afficherResultat() {

    const pourcentage = Math.round((score / questions.length) * 100);

    let messageFinal = "";

    if (pourcentage === 100) {

        emoji.textContent = "🏆";
        messageFinal = "Excellent ! Tu maîtrises parfaitement cette table.";

    } else if (pourcentage >= 80) {

        emoji.textContent = "🥇";
        messageFinal = "Très bon travail ! Continue comme ça.";

    } else if (pourcentage >= 60) {

        emoji.textContent = "👍";
        messageFinal = "Bon effort ! Encore un peu d'entraînement.";

    } else {

        emoji.textContent = "💪";
        messageFinal = "Ne te décourage pas ! Réessaie pour progresser.";

    }

    scoreFinal.innerHTML = `
        <strong>${score} / ${questions.length}</strong><br>
        ${pourcentage}% de réussite<br><br>
        ${messageFinal}
    `;

    afficherPage(resultat);

}

/* ===========================
   RÉINITIALISER LE QUIZ
=========================== */

function reinitialiserQuiz() {

    questions = [];
    indexQuestion = 0;
    score = 0;

    progress.style.width = "0%";
    progressText.textContent = "0 / 12";

    message.textContent = "";
    reponse.value = "";

}

/* ===========================
   BOUTON REJOUER
=========================== */

btnRejouer.addEventListener("click", () => {

    reinitialiserQuiz();

    afficherPage(selection);

});

/* ===========================
   BOUTON ACCUEIL
=========================== */

btnAccueil.addEventListener("click", () => {

    reinitialiserQuiz();

    afficherPage(accueil);

});

/* ===========================
   BONUS :
   DOUBLE-CLIC SUR UNE TABLE
   POUR LANCER DIRECTEMENT LE QUIZ
=========================== */

tableButtons.forEach(button => {

    button.addEventListener("dblclick", () => {

        tableChoisie = Number(button.dataset.table);

        demarrerQuiz();

        afficherPage(quiz);

    });

});

/* ===========================
   MESSAGE DANS LA CONSOLE
=========================== */

console.log("📚 Tab Khady's est prêt !");
console.log("Bon apprentissage des tables de multiplication !");