# Plan et idées pour le jeu de mon Travail de Maturité

## Brainstorm

- jeu de gestion de ressources (style cookie clicker) 

- débute environ en 1850 (début de la révolution industrielle et de l'utilisation de combustibles fossiles) 

- se termine lorsque : le joueur a dépassé une augmentation de 2°C (objectif de l'augmentation de moins de 2 degrés celsius fixé par l'accord de Paris)

- idée pour titre: De Révolution à Evolution

- évènements historiques réels interviennent dans le jeu

- vitesse du temps : ~30 s/année de jeu

- cycle économique:
	- de l'énergie est produite
	- l'énergie est utilisée pour produire des ressources → de l'argent
	- l'argent peut être investit dans des usines ou dans des centrales de production d'énergie

- onglet avec un graph en temps réel du niveau de CO<sub>2</sub> et de la température par rapport à la période préindustrielle

- investissement dans la recherche dans la fusion nucléaire possible avec centrale disponible vers 2030 selon les investissements

- 2 conseillers : un pro écologique et un pro ressources fossiles avec des points de réputation auprès de ces 2 conseillers
- une action écologique rapporte des points de réputation auprès de ton conseiller écologique et vice versa 

- carte rapprochée : 
	- affiche une région 
	- un certain nombre de sites de production d'énergie 
	- un certain nombre de sites de production de produits de consommation 
	- un certain nombre de sites de production de ressources
	- les deux derniers produisent des $

- les sites de production (voir ci-dessus) nécessitent de l'énergie pour fonctionner

- fission nucléaire disponible mais conséquences aléatoire : explosion de centrale, population intoxiquée par déchets, ...

- scénario :
    - narrateurs/guides : conseiller écologique : Conseil
    - joueur : président du monde (Ou ministre de l'énergie et des ressources)

- Mettre une icone : demander Conseil/conseil 

- La carte du monde est sur la table du président et les boutons du l'UI se trouvent "sur la table"

## Différentes ressources par région:

Région | Augmente CO<sub>2</sub> | N'augmente pas le CO<sub>2</sub>
-------|-------------------------|-------------------------
Royaume-Uni | charbon | 
Europe continentale | charbon | barrages hydroélectriques
Afrique | ? chercher production d'énergie en afrique ? |
Amérique du nord | charbon, pétrole, gaz naturel | 
Asie | charbon |
Amérique du sud | forêt primaire → palme, bétail, bois | Exploitation durable, consommation de moins de viande
Toutes régions | Coupe de bois | Énergie solaire, éoliennes, fission nucléaire (avec conséquences), fusion nucléaire


## Production des éléments de jeu

Type | Niveau | Production | Prix | Production de CO<sub>2</sub>
-----|--------|------------|------|-------------------------
Mine de charbon | 1 | 20 kg/jour | 200$ | 1 kg/jour
 _ | 2 et suivants | *2 | 400$ | *3


 ## Investissments dans la recherche de nouvelles énergies

 - chaque "jour de jeu", il y a une probabilité que l'on débloque une nouvelle façon de produire de l'énergie
 - plus on investit dans la recherche d'une technologie, plus on augmente la probabilité de "découvrir" cette façon de produire de l'énergie
 - une fois qu'on a découvert la méthode, on peut commencer à l'installer dans les régions compatibles
 - on ne peut commencer à investir dans la recherche qu'à partir d'une certaine année
 	- centrales thermiques : ~1880
 	- centrales nucléaires : ~1940
 	- etc...



## Réflexions

- si on joue le président du monde et que c'est nous qui causons le changement climatique, on se rend compte que c'est à chacun de choisir ou non de freiner ce changement

- on demande le nom du joueur pour que celui-ci se sente plus impliqué dans le jeu et qu'il comprenne que lui aussi peut faire la différence

- Conseil est humble et reflète la sagesse
- Nemo représente la "science sans conscience" et le renfermement (pas sûr)


## Points de vues techniques

- déterminer comment rendre les régions clickables [idée : chaque région est un polygone](http://phaser.io/examples/v2/geometry/polygon-contains)
- carte de base possible des régions: ![lien](http://www.worldometers.info/img/7-continents-of-the-world.gif)


## Scénario "en gros"

- (1800-1810) tutoriel
	- début avec 1000$
	- installation de mine de charbon 1
	- installation de usine 1
- (1811) Royaume-Uni
	- installation de plus de trucs jusqu'à débloquer la suite
- (1831) Europe continentale	
- (1851) Amérique du nord
- (1871) Afrique
- (1891) Asie
- (1911) Amérique du sud


## Scénario détaillé

### Tutoriel

- "Bien le bonjour, président! Je me présente : Conseil. Je serai votre guide et conseiller durant toute la durée de votre mandat. C'est moi qui vous informerai des nouvelles du monde, de ses problèmes et qui vous proposerai  des possibles solutions."
- "Vous présiderez durant... eh bien, si tout se passe bien, 300 ans. Vous prendrez de nombreuses décisions durant votre carrière et certaines d'entre elles auront des conséquences dans un futur plus ou moins lointain. Donc réflechissez lourdement avant de prendre une décision."
- "Au fait, j'ai une fâcheuse tendance à oublier les prénoms... Vous pourriez me rappeler le votre?"
- [boite pour entrer son prénom]
- Excusez-moi, j'nai pas très bien entendu. [prénom] c'est cela ?
- 




## Sources
- [Ressources aux USA](https://fr.wikipedia.org/wiki/%C3%89tats-Unis#Situation_g.C3.A9n.C3.A9rale)
- [Fôret amazonienne, explication](https://www.notre-planete.info/actualites/actu_891_causes_solutions_deforestation.php)
- [Premières centrales nucléaires à fission](https://fr.wikipedia.org/wiki/Centrale_nucl%C3%A9aire#Ann.C3.A9es_1950_:_premi.C3.A8res_centrales)
- [Centrales thermiques](https://fr.wikipedia.org/wiki/Centrale_thermique#Centrales_.C3.A0_turbines_.C3.A0_combustion)