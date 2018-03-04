class ResearchMgr{
    constructor(){
        //plus c est grand, plus la somme partielle augmente rapidement
        this._unlockData = {
            coalPlant: {c: 10},
            fuelPlant: {c: 2},
            gasPlant: {c: 2},
            hydroPlant: {c: 5},
            fissionPlant: {c: .2},
            windTurbines: {c: .1},
            solarPanels: {c: .05},
            geothermalPlant: {c: .02},
            fusionPlant: {c: .01}
        };
        this._setupUnlockData();

        globals.timeMgr.addYUCallback(this.rndUnlockUpdate);
    }

    increaseUnlockProb(facType){
        let facProb = this._unlockData[facType];
        let {c,r,k} = facProb;
        let ak = c * r**k;
        facProb.partSum = Phaser.Math.roundTo(facProb.partSum + ak, -3);
        facProb.k++;
        this.getFacObj(facType).unlockProb = facProb.partSum;

        // ATTENTION si on change le 'purpose' du newspaper
        if(gameEls.newspaper && gameEls.newspaper.data.purpose == "factoryResearch"){
            gameEls.newspaper.softUpdate(globals.data.factoryResearch);
        }
    }

    //methode appellee a chaque update de timeMgr
    rndUnlockUpdate(){
        //utilisation de 'globals' car appel depuis timeMgr
        let unlockData = globals.researchMgr._unlockData;

        //parcours des unlockProbs pour debloquer aleatoirement un type de centrale
        let unlockedFacNames = []; //arr de strings
        for (let key in unlockData){
            let facProb = unlockData[key];
            let rnd = Phaser.Math.random(0,100);
            if(rnd < facProb.partSum){
                //ajoute le nom dans la liste des centrales debloquees
                let title = globals.researchMgr.getFacObj(key).title; //obtenir le nom des centrales
                unlockedFacNames.push(title);

                facProb.partSum = -Infinity;
                globals.researchMgr.unlockFacType(key);
            }
        }
        //...
        //afficher le newspaper avec le nom des usines debloquees
        let dialText = "";
        if(unlockedFacNames.length === 1){
            dialText = `Felicitations, mon cher president! Vous avez debloque un nouveau type de centrale: ${ unlockedFacNames[0] }! Vous pouvez desormais installer celle-ci sur n'importe quel site de production libre.`;
        }else if(unlockedFacNames.length > 1){
            dialText = `Felicitations, mon cher president! Vous avez debloque plusieurs nouveaux types de centrale: ${unlockedFacNames.join(", ")}! Vous pouvez desormais installer celles-ci sur n'importe quel site de production libre.`;
        }

        if(dialText != ""){
            let dialog = new Dialog([dialText]);
            dialog.onComplete.addOnce(() => {
                globals.signals.onFactoryUnlocked.dispatch();
            }, this);
            dialog.start();
        }
    }

    _setupUnlockData() {
        const serieLimit = 100;
        for (let key in this._unlockData) {
            let facProb = this._unlockData[key];
            facProb.r = 1 - (facProb.c / serieLimit);
            facProb.k = 0;
            facProb.partSum = 0;
        }
    }

    getFacObj(facType) {
        for (let facData of globals.data.factoryResearch.els) {
            if (facData.fac.type == facType) {
                return facData.fac;
            }
        }

        console.log("not found :(");
    }

    //deverouille un type de centrale
    unlockFacType(facType){
        gameEls.stopTmpEls();

        let newFacResEls = [];
        //la boucle transfere l'usine debloquee de globals.data.factoryResearch.els vers globals.data.factoryShop.els
        for(let dataObjId in globals.data.factoryResearch.els){
            let dataObj = globals.data.factoryResearch.els[dataObjId];
            if(dataObj.fac.type == facType){
                globals.data.factoryShop.els.push(dataObj);


                //pour que le dialog ne se ferme pas immediatement lorsqu'on spamme le bouton pour investir dans la recherche
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
