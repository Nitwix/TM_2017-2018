//TODO: class FactoryData

globals.data.factories = {
    title: "À vendre",
    spritesheet: "factories",
    els: {
            coalCentral: {
                factoryType: "coalCentral",
                title: "Centrale à charbon",
                descr: "Cette centrale à charbon vous permettra de produire 600 MW. Le désavantage étant qu'elle produit également 600 kg de CO2 par jour.",
                price: 10000
            },
            oilCentral: {
                factoryType: "oilCentral",
                title: "Centrale à pétrole",
                descr: "Cette centrale produira de l'énergie que vous pourrez revendre ensuite.",
                price: 50000
            },
            gasCentral: {
                factoryType: "gasCentral",
                title: "Centrale à gaz",
                descr: "Cette centrale produira de l'énergie que vous pourrez revendre ensuite.",
                price: 100000
            },
        }
}
