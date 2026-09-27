# Chapitre exemple — Récursivité

La récursivité, c’est une fonction qui se résout en s’appelant elle-même, avec un **cas de base** qui arrête la descente.

## 1. Cas de base vs cas récursif

Sans cas de base, la pile d’appels explose (stack overflow). Le cas récursif doit **réduire** le problème (n → n-1, liste → queue, etc.).

## 2. Pile d’appels

Chaque appel empile un cadre (paramètres, adresse de retour). Comprendre la pile explique pourquoi une récursion trop profonde plante, et pourquoi on parle parfois de récursion terminale.

## 3. Diviser pour régner

Beaucoup d’algo (recherche dichotomique, merge sort) : on coupe, on résout les morceaux, on recombine. Ce n’est pas « magique » : c’est un contrat (préconditions) + une combinaison.

## Mini pièges d’examen

- Oublier le cas `n == 0` ou `liste vide`.
- Faire deux appels récursifs alors qu’un suffit (complexité exponentielle inutile).
- Muter une structure partagée entre appels.
