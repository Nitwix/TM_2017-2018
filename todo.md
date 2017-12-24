# À faire
## Petits objectifs
- dessiner la carte du monde
- dessiner Conseil
- (maybe) afficher l'icone Mondio dans smallDialog quand on veut acheter qqch
- ajouter un compteur de population
- ajouter une mesure de la production de CO<sub>2</sub> de la population
- ajouter des évènements historiques affichés dans un newspaper
- ajouter l'explosion aléatoire des centrales à fission
    - affiche un newspaper
    - fait diminuer la population
    - le site de production sur lequel la centrale se trouvait coûte **très** cher à décontaminer/redébloquer
- faire des recherche concernant le taux de carbon dans l'atmosphère et son évolution
- ajouter une tint à la camera en fonction de la concentration de CO<sub>2</sub> dans l'atmosphère
- corriger le bug du nb de page du newspaper de factoryResearch/factoryShop
- corriger le bug du newspaper ouvert par un site puis par researchBtn

## Grands objectifs
- commencer la rédaction du document écrit
- classe TimeMgr
    - _maybe_ mettre un résumé des productions de l'année à la fin de chaque année
- faire la musique du jeu + les effets sonores
- faire des recherches concernant les centrales; trouver :
    - la production d'énergie
    - le prix de construction
    - le prix de destruction
    - la production de CO<sub>2</sub>
    - le "CO<sub>2</sub>" gris de construction des centrales
- trouver des 'conseils écologiques' et leur effet:
    - encourager l'utilisation des transports publiques
    (diminue la prod. de CO2 de la population)
    - etc...
    - **ces conseils s'afficheront dans des smallDialog**
- ajouter un bouton *recherche*
    - permet de débloquer peu à peu les nouveaux types de centrales (aléatoirement)
- ajouter un bouton *statistiques (nombres)*
    - les pages contiennent les valeurs des différents indicateurs (quantité de mondios, prod. d'énergie, de CO2, population, etc...)
- ajouter un bouton *statistiques (graphes)* //pas sûr
    - affiche un graphe des différentes valeurs sur des pages différentes



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
