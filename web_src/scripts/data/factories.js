//TODO: se calmer sérieusement sur les prix et les coefficients

globals.data.factories = {
    title: "À vendre",
    spritesheet: "factories",
    els: [
        (new Factory("coalPlant", 0, "Centrale à charbon", 5e2, 15e3, 1, 10, 150, 1.15, "Ceci est une description supplémentaire")).dataObj,
        (new Factory("fuelPlant", 0, "Centrale au fioul", 7e2, 20e3, 1, 10, 150, 1.2, "Ceci est une description supplémentaire")).dataObj,
        (new Factory("gasPlant", 0, "Centrale à gaz", 10e2, 30e3, 1, 10, 150, 1.25, "Ceci est une description supplémentaire")).dataObj,
        (new Factory("dam", 0, "Barrage", 33e2, 100e3, 1, 10, 150, 1.25, "Ce barrage produira de l'énergie de façon écologique.")).dataObj,
        (new Factory("fissionPlant", 0, "Centrale nucléaire à fission", 160e2, 500e3, 1, 10, 150, 1.1, "Cette centrale risque d'exploser.")).dataObj,
        (new Factory("windTurbines", 0, "Champ d'éoliennes", 33e2, 100e3, 1, 10, 150, 1.25, "Ce type d'énergie est très écologique.")).dataObj,
        (new Factory("solarPanels", 0, "Champ de panneaux solaires", 35e3, 25e3, 1, 10, 150, 1.3, "Ce type d'énergie est très écologique.")).dataObj,

    ]
            // coalCentral: {
            //     factoryType: "coalCentral",
            //     title: "Centrale à charbon",
            //     descr: "Cette centrale à charbon vous permettra de produire 600 MW. Le désavantage étant qu'elle produit également 600 kg de CO2 par jour.",
            //     price: 10000
            // },
            // oilCentral: {
            //     factoryType: "oilCentral",
            //     title: "Centrale à pétrole",
            //     descr: "Cette centrale produira de l'énergie que vous pourrez revendre ensuite.",
            //     price: 50000
            // },
            // gasCentral: {
            //     factoryType: "gasCentral",
            //     title: "Centrale à gaz",
            //     descr: "Cette centrale produira de l'énergie que vous pourrez revendre ensuite.",
            //     price: 100000
            // },

}
