function updateStatsData(){
    let data = {
        title: "Statistiques", //ATTENTION!!! ce nom est utilisé dans game.js pour définir quel objet data il faut fournir à newspaper.updateContent(data)
        spritesheet: "statsIcons",
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
                descr: `Vos centrales ont émis environ ${Math.round(globals.productionMgr.totCO2)}kg de CO2 dans l'atmosphère.\nElles émettent environ ${Math.round(globals.productionMgr.CO2Production)}kg de CO2 par semaine.`
            },
            {
                spriteIndex: 3,
                title: "Réchauffement global",
                descr: `Votre planète est ${Phaser.Math.roundTo(globals.productionMgr.globalWarming, -3)} degrés plus chaude qu'au début de l'ère industrielle`
            }
            /*
            à rajouter:
            - peut-être : population
            - besoin d'énergie
            */
        ]
    };
    return data;
}
