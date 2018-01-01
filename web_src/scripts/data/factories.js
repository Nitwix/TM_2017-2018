globals.data.factoryShop = {
    title: "À vendre",
    spritesheet: "factories",
    purpose: "factoryShop",
    els: [
        //rien car aucune centrale débloquée au début du jeu
    ]
}

globals.data.factoryResearch = {
    title: "Investir dans la recherche",
    spritesheet: "factories",
    purpose: "factoryResearch",
    els: [
        (new Factory("coalPlant", 0, "Centrale à charbon", 5e2, 15e3, 1, 10, 150, 1.15, "Ceci est une description supplémentaire")).dataObj,
        (new Factory("fuelPlant", 0, "Centrale au fioul", 7e2, 20e3, 1, 10, 150, 1.2, "Ceci est une description supplémentaire")).dataObj,
        (new Factory("gasPlant", 0, "Centrale à gaz", 10e2, 30e3, 1, 10, 150, 1.25, "Ceci est une description supplémentaire")).dataObj,
        (new Factory("hydroPlant", 0, "Barrage", 33e2, 100e3, 1, 10, 150, 1.25, "Ce barrage produira de l'énergie de façon écologique.")).dataObj,
        (new Factory("fissionPlant", 0, "Centrale nucléaire à fission", 160e2, 500e3, 1, 10, 150, 1.1, "Cette centrale risque d'exploser.")).dataObj,
        (new Factory("windTurbines", 0, "Champ d'éoliennes", 33e2, 100e3, 1, 10, 150, 1.25, "Ce type d'énergie est très écologique.")).dataObj,
        (new Factory("solarPanels", 0, "Champ de panneaux solaires", 35e3, 25e3, 1, 10, 150, 1.3, "Ce type d'énergie est très écologique.")).dataObj,
        (new Factory("geothermalPlant", 0, "Centrale géothermique", 35e3, 25e3, 1, 10, 150, 1.3, "Ce type d'énergie est écologique.")).dataObj,
        (new Factory("fusionPlant", 0, "Centrale nucléaire à fusion", 3e5, 1e6, 2, 0, 10e3, 1.25, "C'est le futur.")).dataObj
    ]
}
