class ResearchMgr{
    constructor(){
        //probabilité de débloquer les centrales à chaque update (en pourcents)
        this._unlockProbs = {
            coalPlant: 0,
            fuelPlant: 0,
            gasPlant: 0,
            hydroPlant: 0,
            fissionPlant: 95,
            windTurbines: 0,
            solarPanels: 0,
            geothermalPlant: 0,
            fusionPlant: 0
        };
        globals.timeMgr.addCallback(this.rndUnlockUpdate);
    }

    augmentUnlockProb(facType, amount){
        this._unlockProbs[facType] += amount;
    }


    rndUnlockUpdate(){
        //fonction appellée à chaque update de timeMgr

        //utilisation de 'globals' car appelé depuis timeMgr
        let unlockProbs = globals.researchMgr._unlockProbs;

        //parcours des unlockProbs pour débloquer aléatoirement un type de centrale
        for (let facType in unlockProbs){
            let rnd = game.math.random(0,100);
            if(rnd < unlockProbs[facType]){
                unlockProbs[facType] = -Infinity;
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
            }else{
                newFacResEls.push(dataObj);
            }
        }
        globals.data.factoryResearch.els = newFacResEls;
    }

}