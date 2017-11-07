globals.data.factories = {
    title: "À vendre",
    spritesheet: "factories",
    els: [
            {
                spriteIndex: 3,
                title: "Centrale à charbon niveau 1",
                descr: "Cette centrale à charbon vous permettra de produire 600 MW. Le désavantage étant qu'elle produit également 600 kg de CO2 par jour.",
                posTxt: (new MoneyDisplay(100000)).prettyStr(),
                posCB: () => {
                    globals.moneyMgr.buy(1000, () => {
                        console.log("Centrale à charbon achetée");
                    });
                }
            },
            {
                spriteIndex: 4,
                title: "Centrale à charbon niveau 2",
                descr: "Cette centrale à charbon vous permettra de produire 600 MW",
                posCB: () => {console.log("Centrale à charbon achetée")}
            },
            {
                spriteIndex: 5,
                title: "Centrale à charbon niveau 3",
                descr: "Cette centrale à charbon vous permettra de produire 600 MW",
                posCB: () => {console.log("Centrale à charbon achetée")}
            }

    ]
}
