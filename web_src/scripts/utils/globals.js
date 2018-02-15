//ce script contient des variables globales réutilisées tout au long du jeu

var globals = {
    UI: {},

    //voir utils/regions.js
    regions: {},//contient les instances de la classe Region
    currentRegion: "", //"" quand en worldview et la key de la région sinon

    //contient des variable en rapport avec les sites de production
    sites: {
        id: 0, //identifiant unique pour chaque site de production (voir utils/regions.js)
        instances: []
    },
    factories: {
        maxLevel: 3,
        upgradeCoeff: 1.3
    },

    data: {}, //voir scripts/data

    initMoney: 25e6,
    CO2Limit: 1e7,
    globalWarmingLimit: 3, //en degrés celsius
    beginYear:1799,
    endYear: 2100,
    gameWon: undefined, //type : bool
    gameEnded: false, //pour ne pas appeler plusieurs fois gameEls.fadeCam(...)

    moneyMgr: null,
    productionMgr: null,
    researchMgr: null,
    ecoActionsMgr: null,

    reset: null, // défini ci-dessous,
    initData: null, //défini ci-dessous

    signals: {
        onNewspaperOpen: new Phaser.Signal(),
        onNewspaperClosed: new Phaser.Signal(),
        onFactoryUnlocked: new Phaser.Signal(),
        onRegionEntered: new Phaser.Signal(),
    }
};

globals.reset = function(){
    globals.gameEnded = false;
    globals.sites.instances = [];

    globals.sites.id = 0;

    //reset data factories
}

// globals.initData = function(){
//     initStatsData();
// }


globals.UI = {
    buttonOffset: 3,
    smallButtonScale: 2,

    posBtnFontSize: 26,

    shortTweenDur: 300,
    longTweenDur: 800
};



// globals.sites.dialogDisplayed = ""; //"" quand en 'world view' et 's...' si box d'unlock/upgrade ouverte
// remplacé par gameEls.smallDialog

// globals.dialogDisplayed = false;
// remplacé par gameEls.dialog
