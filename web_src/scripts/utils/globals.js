//ce script contient des variables globales réutilisées tout au long du jeu

var globals = {};


globals.UI = {
    buttonOffset: 3,
    smallButtonScale: 2,

    posBtnFontSize: 26
};

//voir utils/regions.js
globals.regions = {}; //array contenant les instances de la classe Region
globals.currentRegion = ""; //"" quand en worldview et la key de la région sinon

//contient des variable en rapport avec les sites de production
globals.sites = {};
globals.sites.id = 0; //identifiant unique pour chaque site de production (voir utils/regions.js)
globals.sites.maxLevel = 3;

globals.sites.dialogDisplayed = ""; //"" quand en 'world view' et 's...' si box d'unlock/upgrade ouverte

globals.dialogDisplayed = false;

globals.data = {}; //voir scripts/data/
