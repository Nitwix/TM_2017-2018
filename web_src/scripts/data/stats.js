globals.data.stats = {
    title: "Statistiques",
    spritesheet: "statsIcons", //n'existe pas encore
    els: [
        {
            spriteIndex: 0,
            title: "Mondios",
            descr: `Vous possédez ${globals.moneyMgr.totVal.toReadableStr()} Mondios.\nVous gagnez environ ${Math.round(globals.productionMgr.mondioProduction)} Mondios par semaine.`
        },
        {
            spriteIndex: 1,
            title: "Production électrique",
            descr: `Vos centrales à travers le monde produisent ${Math.round(globals.productionMgr.totPower)} Watts`
        },
        {
            spriteIndex: 2,
            title: "Emissions de CO2",
            descr: `Vos centrales ont émi environ ${Math.round(globals.productionMgr.totCO2)}(kg?) de CO2 dans l'atmosphère.\nElles émettent environ ${Math.round(globals.productionMgr.CO2Production)}(kg?) de CO2 par semaine.`
        }
        /*
        à rajouter:
        - peut-être : population
        - température
        - besoin d'énergie
        */
    ]
};