globals.data.factoryShop = {
    title: "À vendre",
    spritesheet: "factories",
    purpose: "factoryShop",
    els: [
        //rien car aucune centrale débloquée au début du jeu
        // (new Factory({
        //     type:"coalPlant",
        //     title:"Centrale à charbon",
        //     power:5e2,
        //     constructionPrice: 15e3,
        //     destrCoeff:2,
        //     CO2Production:30,
        //     grayCO2:30,
        //     upgradeCoeff:1.15,
        //     addDescr: "Les centrales à charbon causent des problèmes environnementaux."
        // })).dataObj,
    ]
}

globals.data.factoryResearch = {
    title: "Investir dans la recherche",
    spritesheet: "factories",
    purpose: "factoryResearch",
    els: [
        (new Factory({
            type:"coalPlant",
            title:"Centrale à charbon",
            power:5e2,
            constructionPrice: 15e3,
            destrCoeff:2,
            CO2Production:1,
            grayCO2:150,
            upgradeCoeff:1.15,
            addDescr: "Les centrales à charbon causent des problèmes environnementaux."
        })).dataObj,

        (new Factory({
            type:"fuelPlant",
            title:"Centrale au fioul",
            power:7e2,
            constructionPrice: 25e3,
            destrCoeff:1,
            CO2Production:10,
            grayCO2:150,
            upgradeCoeff:1.2,
            addDescr: ""
        })).dataObj,

        (new Factory({
            type:"gasPlant",
            title:"Centrale à gaz",
            power:10e2,
            constructionPrice: 30e3,
            destrCoeff:1,
            CO2Production:10,
            grayCO2:150,
            upgradeCoeff:1.25,
            addDescr:"pV=nRT"
        })).dataObj,

        (new Factory({
            type:"hydroPlant",
            title:"Barrage hydroélectrique",
            power:33e2,
            constructionPrice:100e3,
            destrCoeff:1,
            CO2Production:0,
            grayCO2:150,
            upgradeCoeff:1.25,
            addDescr:"Ce barrage produira de l'énergie de façon écologique."
        })).dataObj,

        (new Factory({
            type:"fissionPlant",
            title:"Centrale nucléaire à fission",
            power:160e2,
            constructionPrice:500e3,
            destrCoeff:1,
            CO2Production:0,
            grayCO2:150,
            upgradeCoeff:1.1,
            addDescr:"Cette centrale risque d'exploser."
        })).dataObj,

        (new Factory({
            type:"windTurbines",
            title:"Champ d'éoliennes",
            power:33e2,
            constructionPrice:100e3,
            destrCoeff:1,
            CO2Production:0,
            grayCO2:150,
            upgradeCoeff:1.25,
            addDescr:"Ce type d'énergie est très écologique."
        })).dataObj,

        (new Factory({
            type:"solarPanels",
            title:"Champ de panneaux solaires",
            power:35e3,
            constructionPrice:25e3,
            destrCoeff:.2,
            CO2Production:0,
            grayCO2:150,
            upgradeCoeff:1.3,
            addDescr:"En plus d'être très joli à voir, ce type de production ne contribue pas à l'effet de serre"
        })).dataObj,

        (new Factory({
            type:"geothermalPlant",
            title:"Centrale géothermique",
            power:35e3,
            constructionPrice:25e3,
            destrCoeff:1,
            CO2Production:0,
            grayCO2:150,
            upgradeCoeff:1.3,
            addDescr:"Ce type d'énergie est écologique. La fumée que vous voyez n'est que de la vapeur d'eau"
        })).dataObj,

        (new Factory({
            type:"fusionPlant",
            title:"Centrale nucléaire à fusion",
            power:3e5,
            constructionPrice:1e6,
            destrCoeff:2,
            CO2Production:0,
            grayCO2:10e3,
            upgradeCoeff:1.25,
            addDescr:"C'est le futur."
        })).dataObj
    ]
}

/*
{
    type:,

    title:,
    power:,
    constructionPrice:,
    destrCoeff:,
    CO2Production:,
    grayCO2:,
    upgradeCoeff:,
    addDescr:
}
*/
