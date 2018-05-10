# Plan de la soutenance de mon TM

## Présentation du sujet et des objectifs

### Choix du sujet

- intérêt pour info. et jv
- Idéé initiale: Ecosia: on peut changer le monde réel grâce au monde virtuel

### Objectifs initiaux

- Jeu de gestion présentant différents aspects de l'écologie
- évènements historiques au cours du jeu
- => joueur doit réfléchir à ses actions -> le fait réfléchir à des solutions pour l'écologie

### Objectifs finaux

- Jeu de gestion présentant **un aspect** de l'écologie: transition énergétique
- evènements historiques abandonnées car trop long
- actions écologiques (voyager moins en avion, manger moins/pas de viande, transports publics, acheter local, ...)
  - [image bouton action écologiques]
- objs. du jeu calqués sur Accord de Paris sur le climat (1800-2100, <2°C)

## Présentation des résultats de la recherche

### Difficultés rencontrées

- mise à jour du newspaper
  - erreur de conception: pas prévu pour être mis à jour
  - 1ère version: détruire tous les éléments du newspaper et tous les recréer (le plus simple du point du vue du code) => **lent**
  - 2ème version: juste mettre à jour textes du newspaper (plus compliqué car il faut parcourir tous les objets de texte et les mettre à jour) => **rapide**

- ajustements des valeurs
  - bcp. de tests nécessaires pour ajuster les valeurs et obtenir un jeu équilibré
  - jeu équilibré != jeu réaliste -> très difficile de trouver des valeurs réalistes

<!-- ### Jeu fini

- le jeu tel que vous l'avez vu... -->

## Présentation de choses intéressantes dans le code

- parler de poly.js & montrer les polygones des régions (en rose)

## Possibles questions & réponses

- 2.1.1 : "en effet, ce n’est pas ce que l’on produit et ce que l’on consomme qui pose un problème, c’est la façon dont nous le faisons."
  - ce que je voulais dire par là: on ne peut pas arrêter le cycle économique, il faut l'adapter.
- 2.1.2 : "montrer que n’importe qui peut agir pour le bien de la planète."
  - n'importe qui a le pouvoir d'un président
- 2.2 : manque : Le joueur doit rechercher de nouvelles centrales énergétiques
- 3.2 : unité de temps du jeu: semaine?
  - Pas vraiment une semaine, 1/32 ème d'année, plus simple pour la gestion du temps
- 4.4, l.41: ecoActionsMgr pas encore ajouté dans le jeu, prévu
- 4.7, l.4: inutile
