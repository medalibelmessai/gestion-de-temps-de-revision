/** Prompts Cursor collés tels quels dans le Chat (Ctrl+L) ou Cmd/Ctrl+K. */
window.RevisionPrompts = {
  bloc1: [
    {
      title: "Synthèse des concepts durs",
      hint: "Chat · @cours.md",
      text: `@cours.md Fais-moi une synthèse explicative des 3 concepts les plus complexes de ce chapitre avec des analogies simples. Évite le jargon tant que tu n'as pas donné l'idée en français courant.`,
    },
    {
      title: "Schéma conceptuel",
      hint: "Chat",
      text: `À partir du chapitre ouvert, génère un schéma conceptuel en Mermaid (flowchart) : nœuds = idées, flèches = relations. Puis un résumé exécutif de 8 lignes max à relire demain matin.`,
    },
  ],
  bloc2: [
    {
      title: "Générer un exercice (trous)",
      hint: "Ctrl+K dans tp_revision.js",
      text: `Génère un exercice de niveau examen sur [notion X]. Mets le sujet en commentaire. Laisse des trous à remplir dans le code (TODO). Ne donne pas la solution.`,
    },
    {
      title: "Correction sans spoiler",
      hint: "Chat · @tp_revision.js",
      text: `@tp_revision.js Analyse mon code, donne-moi une note sur 10 et indique-moi mes erreurs sans me donner la solution immédiatement. Pose-moi une question pour m'aider à corriger moi-même.`,
    },
  ],
  bloc3: [
    {
      title: "Cause racine d'une erreur",
      hint: "Chat · coller l'erreur",
      text: `Voici mon erreur : [Message d'erreur]. Explique-moi la cause racine (pourquoi ça casse) puis montre la correction optimale selon les meilleures pratiques. Distingue bien cause et symptôme.`,
    },
    {
      title: "Refactoring du jour",
      hint: "Chat · sélectionner le fichier",
      text: `Optimise ce code pour réduire la complexité. Ajoute des commentaires explicatifs seulement là où l'intention n'est pas évidente. Ne change pas le comportement.`,
    },
  ],
  bloc4: [
    {
      title: "Examinateur QCM (1 par 1)",
      hint: "Chat · @cours.md",
      text: `@cours.md Pose-moi 5 questions à choix multiples (QCM) sur ce chapitre, une par une. Attends ma réponse avant de poser la suivante. Après chaque réponse : correct/incorrect + 2 phrases d'explication, sans enchaîner tout de suite.`,
    },
    {
      title: "Fiche flash 60 secondes",
      hint: "Chat",
      text: `Donne-moi 5 flashcards (question / réponse) sur ce que j'ai vu aujourd'hui. Format compact. Pas de nouveau chapitre.`,
    },
  ],
};
