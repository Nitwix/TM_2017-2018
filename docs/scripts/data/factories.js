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
            power:500,
            constructionPrice: 90e2,
            destrCoeff:2,
            CO2Production:1e1,
            addDescr: "Les centrales à charbon causent des problèmes environnementaux."
        })).dataObj,

        (new Factory({
            type:"fuelPlant",
            title:"Centrale au fioul",
            power:1000,
            constructionPrice: 85e3,
            destrCoeff:2,
            CO2Production:1e2,
            addDescr: ""
        })).dataObj,

        (new Factory({
            type:"gasPlant",
            title:"Centrale à gaz",
            power:1500,
            constructionPrice: 120e3,
            destrCoeff:2,
            CO2Production:1e3,
            addDescr:""
        })).dataObj,

        (new Factory({
            type:"hydroPlant",
            title:"Barrage hydroélectrique",
            power:2000,
            constructionPrice: 25e4,
            destrCoeff:4,
            CO2Production:0,
            addDescr:""
        })).dataObj,

        (new Factory({
            type:"fissionPlant",
            title:"Centrale nucléaire à fission",
            power:10000,
            constructionPrice: 50e5,
            destrCoeff:12,
            CO2Production:0,
            addDescr:"Les bénéfices en valent-ils vraiment la peine?"
        })).dataObj,

        (new Factory({
            type:"geothermalPlant",
            title:"Centrale géothermique",
            power:3000,
            constructionPrice: 55e4,
            destrCoeff:2,
            CO2Production:0,
            addDescr:"La fumée que vous voyez n'est que de la vapeur d'eau."
        })).dataObj,

        (new Factory({
            type:"windTurbines",
            title:"Champ d'éoliennes",
            power:6000,
            constructionPrice: 50e5,
            destrCoeff:1.5,
            CO2Production:0,
            addDescr:""
        })).dataObj,

        (new Factory({
            type:"solarPanels",
            title:"Champ de panneaux solaires",
            power:7500,
            constructionPrice: 45e6,
            destrCoeff:.2,
            CO2Production:0,
            addDescr:"Ces panneaux peuvent être facilement détruits si besoin."
        })).dataObj,

        (new Factory({
            type:"fusionPlant",
            title:"Centrale nucléaire à fusion",
            power:30000,
            constructionPrice: 80e6,
            destrCoeff:6,
            CO2Production:0,
            addDescr:"Cette centrale est un bon compromis entre économie et écologie"
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
