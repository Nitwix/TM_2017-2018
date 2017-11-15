# Plan et idées pour le jeu de mon Travail de Maturité

## Brainstorm

- jeu de gestion de ressources

- monnaie : le Mondio (M)

- débute environ en 1800 (début de la révolution industrielle et de l'utilisation de combustibles fossiles)

- se termine lorsque : le joueur a dépassé une augmentation de 2°C (objectif de l'augmentation de moins de 2 degrés celsius fixé par l'accord de Paris) ou l'année > 2100

- idée pour titre: De Révolution à Evolution

- évènements historiques réels interviennent dans le jeu (journal jeté sur la table avec news)

- vitesse du temps : 32 s/année de jeu de base (possibilité d'accélérer)

- onglet avec un graph en temps réel du niveau de CO<sub>2</sub> et de la température par rapport à la période préindustrielle

- 2 conseillers : un pro écologique et un pro ressources fossiles avec des points de réputation auprès de ces 2 conseillers
- une action écologique rapporte des points de réputation auprès de ton conseiller écologique et vice versa

- carte rapprochée :
	- affiche une région
    - plusieurs emplacements disponibles pour sites de production

- fission nucléaire disponible mais conséquences aléatoire : explosion de centrale, population intoxiquée par déchets, ...

- les graphismes du bureau évoluent au cours du temps

- scénario :
    - narrateurs/guides : conseiller écologique : Conseil
    - joueur : président du monde (Ou ministre de l'énergie et des ressources)

- Mettre une icone : demander Conseil/conseil

- La carte du monde est sur la table du président et les boutons du l'UI se trouvent "sur la table"

- pouvoir accélérer / ralentir le temps


## Cycle économique

<!-- ### Première alternative:

- 2 types de sites:
    - Les sites de production **d'énergie** (mines, éoliennes, panneaux solaires,...)
    - Les sites de production de marchandises (montres, chocolat, fromage, mines de diamant, ...)
- Les sites de production d'énergie produisent directement de l'énergie
- Les sites de production de ressources consomment cette énergie et produisent des Mondio
- Les Mondio sont réinvestits pour produire plus
- Il serait peut-être possible de prendre un emprunt à la banque
==> Ne transmets pas le message voulu -->

<!-- ### Deuxième alternative:

- 3 types de sites:
    - Les sites de production de **ressources énergétiques** (mines, ...)
    - Les sites de production de matières premières (or, fer, diamant, cotton, ...)
    - Les sites de production de produits finis (acier, tissus, voitures, ...)
- Les sites de production de ressources énergétiques produisent du combustible qui peut être vendu ou utilisé pour produire de l'énergie (par défaut: énergie)
- Les sites de production de matières premières nécessitent de l'énergie
- Les sites de production produits finis utilisent des matières premières pour produire des produits finis

==> TROP COMPLIQUÉ -->

### Troisième alternative

- Les usines de production d'énergie produisent de l'énergie qui est comptabilisée mais convertie instantanemment en mondios
- Les mondios permettent d'acheter des nouvelles usines
- Les évènements aléatoires (avec réponse) influencent la demande énergetique et la production de CO<sub>2</sub>
- Il faut satisfaire la demande énergétique globale
- Le but final est d'atteindre une demande énergétique stable (et donc un arrêt de la croissance)

<!-- ## Différentes ressources par région:

Région | Augmente CO<sub>2</sub> | N'augmente pas le CO<sub>2</sub>
-------|-------------------------|-------------------------
Europe | charbon | barrages hydroélectriques
Afrique | diamant, uranium |
Amérique du nord | charbon, pétrole, gaz naturel |
Asie | charbon |
Amérique du sud | forêt primaire → palme, bétail, bois | Exploitation durable (produit moins)
Toutes régions | Coupe de bois | Énergie solaire, éoliennes, fission nucléaire (avec conséquences), fusion nucléaire, géothermie

==> Peut-être à mettre mais compliqué -->

## Centrales de production d'énergie

Type | Niveau | Production d'énergie [W] | Prix | Production de CO<sub>2</sub> en tonne/année
-----|--------|------------|------|-------------------------
Centrale à charbon | 1 | 500 W | 50.00k | 5
 &nbsp; | ++ | x2 | x2 | x3


## Investissments dans la recherche de nouvelles énergies

- chaque "jour de jeu", il y a une probabilité que l'on débloque une nouvelle façon de produire de l'énergie
- plus on investit dans la recherche d'une technologie, plus on augmente la probabilité de "découvrir" cette façon de produire de l'énergie
- une fois qu'on a découvert la méthode, on peut commencer à l'installer dans les régions compatibles
- on ne peut commencer à investir dans la recherche qu'à partir d'une certaine année
    - éoliennes : ~1900
    - panneaux solaires photovoltaïques : ~1905
    - centrales nucléaires : ~1930
    - centrales à fusion : ~1970



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
	- début avec (assez pour tuto)M
	- déblocage d'un site de production d'énergie et d'un site de production de ressources
	- installation de mine de charbon 1
	- installation de usine 1
- le déblocage de sites de production coûte de l'argent
- des évènements aléatoires se produisent durant la partie


## Scénario détaillé

### Tutoriel

- "Bien le bonjour, président! Je me présente : Conseil. Je serai votre guide et conseiller durant toute la durée de votre mandat. C'est moi qui vous informerai des nouvelles du monde, de ses problèmes et qui vous proposerai  des possibles solutions."
- "Vous présiderez durant... eh bien, si tout se passe bien, 300 ans. Vous prendrez de nombreuses décisions durant votre carrière et certaines d'entre elles auront des conséquences dans un futur plus ou moins lointain. Donc réflechissez lourdement avant de prendre une décision."
- "Au fait, j'ai une fâcheuse tendance à oublier les prénoms... Vous pourriez me rappeler le votre?"
- [boite pour entrer son prénom]
- Excusez-moi, j'nai pas très bien entendu. [prénom] c'est cela ?
