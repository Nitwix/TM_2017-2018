class ResearchMgr{
    constructor(){
        //la probabilité est une série géométrique telle que
        //a(k) = c*r^k
        //a(0) = c*r^0 = c : premier terme de la série => probabilité après premier investissement
        //et Sn quand n->+infiny
        //Sn = c / (1-r) = 100

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

    _setupUnlockData(){
        const serieLimit = 100;
        for(let key in this._unlockData){
            let facProb = this._unlockData[key];
            facProb.r = 1 - (facProb.c / serieLimit);
            facProb.k = 0;
            facProb.partSum = 0;
        }
    }

    increaseUnlockProb(facType){
        //sum += c * r**k;
        let facProb = this._unlockData[facType]
        let {c,r,k} = facProb;
        let ak = c * r**k;
        facProb.partSum = Phaser.Math.roundTo(facProb.partSum + ak, -3);
        facProb.k++;
        // console.log(facProb);
        this.getFacObj(facType).unlockProb = facProb.partSum;
        // debugger;

        // ATTENTION si on change le 'purpose' du newspaper
        if(gameEls.newspaper && gameEls.newspaper.data.purpose == "factoryResearch"){
            gameEls.newspaper.softUpdate(globals.data.factoryResearch);
        }
    }

    getFacObj(facType){
        for(let facData of globals.data.factoryResearch.els){
            if(facData.fac.type == facType){
                return facData.fac;
            }
        }

        console.log("not found :(");
    }


    rndUnlockUpdate(){
        //fonction appellée à chaque update de timeMgr

        //utilisation de 'globals' car appelé depuis timeMgr
        let unlockData = globals.researchMgr._unlockData;

        //parcours des unlockProbs pour débloquer aléatoirement un type de centrale
        let unlockedFacNames = []; //arr de strings
        for (let key in unlockData){
            let facProb = unlockData[key];
            let rnd = game.math.random(0,100);
            if(rnd < facProb.partSum){

                //ajoute le nom dans la liste des centrales débloquées
                let title = globals.researchMgr.getFacObj(key).title; //obtenir le nom des centrales
                unlockedFacNames.push(title);

                facProb.partSum = -Infinity;
                // console.log(facType);
                globals.researchMgr.unlockFacType(key);


            }
        }

        //afficher le newspaper avec le nom des usines débloquées
        let dialText = "";
        if(unlockedFacNames.length === 1){
            dialText = `Félicitations, mon cher président! Vous avez débloqué un nouveau type de centrale: ${ unlockedFacNames[0] }! Vous pouvez désormais installer celle-ci sur n'importe quel site de production libre.`;
        }else if(unlockedFacNames.length > 1){
            dialText = `Félicitations, mon cher président! Vous avez débloqué plusieurs nouveaux types de centrale: ${unlockedFacNames.join(", ")}! Vous pouvez désormais installer celles-ci sur n'importe quel site de production libre.`;
        }

        if(dialText != ""){
            let dialog = new Dialog([dialText]);
            dialog.onComplete.addOnce(() => {
                globals.signals.onFactoryUnlocked.dispatch();
            }, this);
            dialog.start();
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
