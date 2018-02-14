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
                dial.onComplete.addOnce(() => {
                    this.nextStep();
                }, this);
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
                dial.onComplete.addOnce(() => {
                    this.nextStep();
                }, this);
                dial.start();
            },
            () => {
                
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