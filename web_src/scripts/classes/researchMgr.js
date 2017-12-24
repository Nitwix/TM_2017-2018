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

    rndUnlockUpdate(){
        let unlockProbs = globals.researchMgr._unlockProbs;
        for (let facType in unlockProbs){
            let rnd = game.math.random(0,100);
            if(rnd < unlockProbs[facType]){
                unlockProbs[facType] = -Infinity;
                console.log(facType);
                globals.researchMgr.unlockFacType(facType);
            }
        }
    }

    unlockFacType(facType){
        let newFacResEls = [];
        for(let dataObjId in globals.data.factoryResearch.els){
            let dataObj = globals.data.factoryResearch.els[dataObjId];
            if(dataObj.fac.type == facType){
                globals.data.factoryShop.els.push(dataObj);
            }else{
                newFacResEls.push(dataObj);
            }
        }
        globals.data.factoryResearch.els = newFacResEls;
        console.log(globals.data.factoryResearch.els);
    }

}