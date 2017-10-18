//ce script contient des variables globales réutilisées tout au long du jeu

var globals = {};


globals.UI = {};

globals.UI.buttonOffset = 3;
globals.UI.smallButtonScale = 2;

//voir utils/regions.js
globals.regions = {}; //array contenant les instances de la classe Region

//contient des variable en rapport avec les sites de production
globals.sites = {};
globals.sites.index = 0; //index unique pour chaque site de production (voir utils/regions.js)
globals.sites.maxLevel = 3;