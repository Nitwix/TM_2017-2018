# À faire

- dessiner la carte du monde
- faire la musique du jeu + les effets sonores
- dessiner Conseil
- classe TimeMgr
    - appelle le ProductionMgr tous les 1/32 de yearTime (32s)
    - yearTime peut être accéléré ou ralenti 
- (maybe) afficher l'icone Mondio dans smallDialog quand on veut acheter qqch
- classe ProductionMgr
    - but: gérer la production d'énergie et de mondios
    - appelé à chaque ~update de TimeMgr
    - appelé chaque fois qu'on achète un site de production ou qu'on l'upgrade
- ajouter la méthode "set fac(facObj)" à la classe Site qui permettra de contrôler quelle icone de site de production est affichée
    - prendra en argument le type et niveau de l'usine
    - fera apelle à ProductionMgr pour mettre à jour la production selon le type et niveau de l'usine
    - mettra à jour l'objet factory attaché au site
    - mettra à jour l'affichage du site du bouton
- ajouter la méthode "upgrade" à la classe Site qui permettra de d'améliorer le site de production
    - fera apelle à ProductionMgr pour mettre à jour la production par rapport au niveau de l'usine
    - mettra à jour l'affichage du site du bouton

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
