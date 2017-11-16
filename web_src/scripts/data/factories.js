//TODO: se calmer sérieusement sur les prix et les coefficients

globals.data.factories = {
    title: "À vendre",
    spritesheet: "factories",
    els: [
        (new Factory("coalCentral", 0, "Centrale à charbon", 50*10**3, 5*10**6, 1, 10, 150, 1.5, "Ceci est une description supplémentaire")).dataObj,
        (new Factory("fuelCentral", 0, "Centrale au fioul", 80*10**3, 7*10**4, 1, 10, 150, 1.5, "Ceci est une description supplémentaire")).dataObj,
        (new Factory("gasCentral", 0, "Centrale à gaz", 120*10**3, 9*10**4, 1, 10, 150, 1.5, "Ceci est une description supplémentaire")).dataObj,

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
