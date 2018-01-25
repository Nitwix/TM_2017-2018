class ResearchMgr{
    constructor(){
        //probabilité de débloquer les centrales à chaque update (en pourcents)
        //arrays avec [prob, r], r étant une constante
        //plus r est grand, plus la probabilité tend *lentement* vers une valeur élevée
        this._unlockData = {
            coalPlant: [1.1, 1.5],
            fuelPlant: [1, 1.7],
            gasPlant: [1, 1.9,
            hydroPlant: [1, 2.1],
            fissionPlant: [1, 1.1],
            windTurbines: [1, 1.1],
            solarPanels: [1, 1.1],
            geothermalPlant: [1, 1.1],
            fusionPlant: [1, 1.1]
        };
        globals.timeMgr.addYUCallback(this.rndUnlockUpdate);
    }

    increaseUnlockProb(facType){
        //nProb = (1/prob) ^ r, r étant une constante
        let newProb = Phaser.Math.roundTo(1/this._unlockData[facType][0] ** this._unlockData[facType][1], -3);
        this._unlockData[facType][0] += newProb;
        console.log(this._unlockData[facType]);

    }


    rndUnlockUpdate(){
        //fonction appellée à chaque update de timeMgr

        //utilisation de 'globals' car appelé depuis timeMgr
        let unlockData = globals.researchMgr._unlockData;

        //parcours des unlockProbs pour débloquer aléatoirement un type de centrale
        for (let facType in unlockData){
            let rnd = game.math.random(0,100);
            if(rnd < unlockData[facType][0]){
                unlockData[facType][0] = -Infinity;
                // console.log(facType);
                globals.researchMgr.unlockFacType(facType);
            }
        }
    }

    //déverouille un type de centrale
    unlockFacType(facType){
        gameEls.stopTmpEls();

        let newFacResEls = [];
        //la boucle transfère l'usine débloquée de globals.data.factoryResearch.els vers globals.data.factoryShop.els
        for(let dataObjId in globals.data.factoryResearch.els){
            let dataObj = globals.data.factoryResearch.els[dataObjId];
            if(dataObj.fac.type == facType){
                globals.data.factoryShop.els.push(dataObj);
                let dialog = new Dialog([`Félicitations, mon cher président! Vous avez débloqué un nouveau type de centrale: ${dataObj.title}! Vous pouvez désormais installer celle-ci sur n'importe quel site de production libre.`]);
                dialog.start();

                //pour que le dialog ne se ferme pas immédiatement lorsqu'on spamme le bouton pour investir dans la recherche
                game.input.enabled = false;
                let tmpInputDisable = game.time.create();
                tmpInputDisable.add(500, () => {
                    game.input.enabled = true;
                }, this);
                tmpInputDisable.start();
            }else{
                newFacResEls.push(dataObj);
            }
        }
        globals.data.factoryResearch.els = newFacResEls;
    }

}
