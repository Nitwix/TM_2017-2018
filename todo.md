# À faire
## Bugs à fixer

## Pour la version à rendre pour le TM
<!-- - faire la musique du jeu (+ les effets sonores) -->
<!-- - Ajouter un besoin en énergie qui doit être satisfait qui augmente en fonction de la population
    - à afficher dans stats (besoin et population)
    - cause une fin du jeu si pas satisfait pendant x ans de suite -->

- faire des recherches concernant les centrales; trouver :
    - la production d'énergie
    - le prix de construction
    - le prix de destruction
    - la production de CO<sub>2</sub>
    - le "CO<sub>2</sub>" gris de construction des centrales

- ajuster (à la fin) pour que le jeu soit plus intéressant.
    - la somme de départ
    - la valeur limite de CO2
    - le taux watt -> mondio
    - les valeurs de production des centrales
    - le "c" de recherche des centrales

## Petits objectifs
- dessiner Conseil
- (maybe) afficher l'icone Mondio dans smallDialog quand on veut acheter qqch
- ajouter des évènements historiques affichés dans un newspaper
- ajouter l'explosion aléatoire des centrales à fission
    - affiche un newspaper
    - fait diminuer la population
    - le site de production sur lequel la centrale se trouvait coûte **très** cher à décontaminer/redébloquer
- faire des recherches concernant le taux de carbon dans l'atmosphère et son évolution
- ajouter un bouton pause
- augmenter le prix de recherche à chaque recherche
- diminuer le taux de CO2 à chaque update (CO2Absorbtion ou un truc du genre)


## Grands objectifs
- commencer la rédaction du document écrit
- Réinitialisation des sites de production, des usines et de plusieurs autres choses après la fin du jeu
- modes de difficulté
- Interventions de Conseil
<!--
- classe TimeMgr
    - _maybe_ mettre un résumé des productions de l'année à la fin de chaque année
-->


- trouver des 'conseils écologiques' et leur effet:
    - encourager l'utilisation des transports publiques
    (diminue la prod. de CO2 de la population)
    - etc...
    - **ces conseils s'afficheront dans un newspaper**
    - ajouter une mesure de la production de CO<sub>2</sub> de la population qui est modifiée en fonctions des ecoActions
- ajouter un bouton *statistiques (graphes)* //pas sûr
    - affiche un graphe des différentes valeurs sur des pages différentes
- ajouter des niveaux de difficulté



# Fait
- création de la strucutre de fichier de base (06.09.2017)
- ajout d'un bouton plein écran (23.09.2017)
- faire une police d'écriture (trouvé : 23.09.2017)
- faire le bouton "Jouer" (26.09.2017)
- dessiner les boutons de l'ui (26.09.2017)
- faire le système de dialogues (01.10.2017)
- faire les transitions entre la carte globale et les régions (03.10.2017)
- SmallDialog terminé (24.10.2017)
- classe MoneyMgr (04.11.2017)
- trouver une structure pour définir le prix de déverouillage de base des sites de production (-> data/factories.js) (07.11.2017)
- finir la fenêtre de débloquage des usines (newspaper.js) (18.11.2017)
- classe TimeMgr (version de base fonctionne : 19.11.2017)
    - appelle le ProductionMgr tous les 1/32 de yearTime (32s)
- classe ProductionMgr (version de base fonctionne: 19.11.2017)
    - but: gérer la production d'énergie et de mondios
    - appelé à chaque ~update de TimeMgr
    - appelé chaque fois qu'on achète un site de production ou qu'on l'upgrade
- ajouter la méthode "set fac(facObj)" à la classe Site qui permettra de contrôler quelle icone de site de production est affichée (19.11.2017)
    - prend un objet de type Factory en argument
- ajouter la méthode "upgrade" à la classe Site qui permettra de d'améliorer le site de production (19.11.2017)
    - fera apelle à ProductionMgr pour mettre à jour la production par rapport au niveau de l'usine
    - mettra à jour l'affichage du site du bouton
- ajouter la possibilité de détruire une centrale (coûte de l'argent) (30.11.2017)
- classe TimeMgr (17.12.2017)
    - yearTime peut être accéléré ou ralenti
    - afficher l'année
- ajouter un bouton *recherche* (26.12.2017)
    - permet de débloquer peu à peu les nouveaux types de centrales (aléatoirement)
- dessiner la carte du monde (26.12.2017)
- ajouter un bouton *statistiques (nombres)* (08.01.2018)
    - les pages contiennent les valeurs des différents indicateurs (quantité de mondios, prod. d'énergie, de CO2, population, etc...)
- ajouter une tint à la camera en fonction de la concentration de CO<sub>2</sub> dans l'atmosphère (16.01.2018)
- afficher l'augmentation de temperature depuis le début du jeu (en fonction de totCO2) (21.01.2018)
- => nécessite de pouvoir mettre à jour les textes des newspaper pendant qu'il est ouvert (24.01.2018)
- recherche (25.01.2018)
    - progression avec série géométrique
    - afficher la progression dans le newspaper
- afficher d'autres infos sur les centrales dans la description (dans newspaper) (26.01.2018)
- augmenter hitbox des boutons (09.02.2018)
- Tutoriel ! (18.02.2018)
