class Tutorial{
    constructor(){

        this._callbacks = [
            () => {
                let txts = [
                    "Bien le bonjour, président(e)! Je me présente : Conseil. Je serai votre guide et conseiller durant toute la durée de votre mandat.",
                    "Vous présiderez durant... eh bien, si tout se passe bien, 300 ans. Vous prendrez de nombreuses décisions durant votre carrière et certaines d'entre elles auront des conséquences dans un futur plus ou moins lointain. Réfléchissez donc sagement avant de prendre une décision.",
                    "Pour commencer, vous pourriez investir une certaine somme dans la recherche d'un type de centrale électrique. Appuyez donc sur le bouton 'Recherche'."
                ];
                let dial = new Dialog(txts);
                dial.onComplete.addOnce(this.nextStep, this);
                dial.start();
            },
            () => {
                gameEls.researchBtn.switchBlink(true);
                globals.signals.onNewspaperOpen.addOnce(() => {
                    gameEls.researchBtn.switchBlink(false);
                    this.nextStep();
                }, this);
            },
            () => {
                let txts = [
                    "Dans cet onglet, vous pouvez investir dans la recherche de centrales électriques, ce qui augmentera votre probabilité de les débloquer.",
                    "Plus la probabilité est élevée, plus vous aurez de chance de débloquer la centrale, mais gardez tout de même un peu d'argent pour pouvoir la construire!",
                ];
                let dial = new Dialog(txts);
                dial.onComplete.addOnce(this.nextStep, this);
                dial.start();
            },
            () => {
                let txts = [
                    "Si vous voulez diminuer le temps que ça vous prendra pour déverouiller une centrale, cliquez sur la flèche de droite à côté de l'affichage de l'année."
                ];
                let dial = new Dialog(txts);
                globals.signals.onNPBtnClicked.addOnce(() => {
                    dial.start();
                }, this);
                dial.onComplete.addOnce(this.nextStep, this);
            },
            () => {
                let txts = [
                    "Vous devriez installer la centrale que vous avez débloquée en Europe, car c'est là que commence la révolution industrielle!",
                    "Pour ce faire, cliquez sur l'Europe."
                ];
                let dial = new Dialog(txts);
                globals.signals.onFactoryUnlocked.addOnce(() => {
                    dial.start();
                }, this);
                dial.onComplete.addOnce(this.nextStep, this);
            },
            () => {
                let txts = [
                    "Bien, maintenant cliquez donc sur le site de production se trouvant en Angleterre et dévérouillez-le."
                ];
                let dial = new Dialog(txts);
                globals.signals.onRegionEntered.addOnce(() => {
                    dial.start();
                }, this);
                dial.onComplete.addOnce(this.nextStep, this);
            },
            () => {
                let txts = [
                    "Voilà la centrale que vous venez de débloquer! Vous pouvez la construire sur le site de production."
                ];
                let dial = new Dialog(txts);
                globals.signals.onNewspaperOpen.addOnce(() => {
                    dial.start();
                }, this);

                globals.signals.onNewspaperClosed.addOnce(this.nextStep, this);
            },
            () => {
                let txts = [
                    "Excellent! Maintenant qu'une de vos centrales est en fonctionnement, pourquoi ne pas aller jeter un coup d'oeil aux différentes statistiques de votre planète.",
                    "Vous pouvez y accéder via l'onglet 'Statistiques'."
                ];
                let dial = new Dialog(txts);
                dial.start();
                dial.onComplete.addOnce(this.nextStep, this);
            },
            () => {
                gameEls.statsBtn.switchBlink(true);
                let txts = [
                    "Ici, vous pouvez avoir un aperçu de plusieurs données importantes concernant l'état de vos ressources et de votre planète.",
                    "Pensez à vérifier vos statistiques de temps en temps, cela pourrait s'avérer utile!"
                ];
                let dial = new Dialog(txts);
                globals.signals.onNewspaperOpen.addOnce(() => {
                    gameEls.statsBtn.switchBlink(false);
                    dial.start();
                }, this);
                dial.onComplete.addOnce(this.nextStep, this);
            },
            () => {
                let txts = [
                    "Voilà, j'ai fini de vous expliquer ce que vous deviez savoir. Maintenant, vous savez ce qu'il vous reste à faire:",
                    "Mener votre planète au mieux à travers cette période difficile, en trouvant une équilibre entre profit et écologie.",
                    "Sur ce, bonne chance, et à bientôt!"
                ];
                let dial = new Dialog(txts);
                globals.signals.onNewspaperClosed.addOnce(() => {
                    dial.start();
                }, this);
            }
        ];

        this._callbackIndex = 0;

        this._signal = new Phaser.Signal();
    }

    setNextSignalCB(){
        this._signal.addOnce(this._callbacks[this._callbackIndex], this);
        this._callbackIndex++;
    }

    dispatchEvent(){
        this._signal.dispatch();
    }

    nextStep(){
        this.setNextSignalCB();
        this.dispatchEvent();
    }

    start(){
        this.nextStep();
    }


}
