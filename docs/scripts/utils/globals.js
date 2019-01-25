//ce script contient des variables globales reutilisees tout au long du jeu

let globals = {
    UI: {
        buttonOffset: 3,
        smallButtonScale: 2,
    
        posBtnFontSize: 26,
    
        shortTweenDur: 300,
        longTweenDur: 800
    },

    //voir classes/regions.js
    regions: {},//contient les instances de la classe Region
    currentRegion: "", //"" quand en worldview et la key de la region sinon

    //contient des variable en rapport avec les sites de production
    sites: {
        id: 0, //identifiant unique pour chaque site de production (voir classes/regions.js)
        instances: []
    },
    factories: {
        maxLevel: 3,
        upgradeCoeff: 1.3
    },

    data: {}, //voir scripts/data

    initMoney: 25e4,
    CO2Limit: 1e7,
    globalWarmingLimit: 2, //en degres celsius
    beginYear:1799,
    endYear: 2100,
    gameWon: undefined, //type : bool
    gameEnded: false, //pour ne pas appeler plusieurs fois gameEls.fadeCam(...)

    moneyMgr: null,
    productionMgr: null,
    researchMgr: null,
    ecoActionsMgr: null,

    reset: null, // defini ci-dessous,
    initData: null, //defini ci-dessous

    signals: {
        onNewspaperOpen: new Phaser.Signal(),
        onNewspaperClosed: new Phaser.Signal(),
        onFactoryUnlocked: new Phaser.Signal(),
        onRegionEntered: new Phaser.Signal(),
        onNPBtnClicked: new Phaser.Signal()
    },

    showTutorial: true
};